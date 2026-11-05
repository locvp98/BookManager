#!/usr/bin/env python3
"""Render validated Remotion chunks, resume matching checkpoints, mux narration once."""
import argparse
import contextlib
import fcntl
import hashlib
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import sys
from datetime import datetime, timezone

from video_check import probe, sha256, validate, write_json


def absolute(project, value):
    path = Path(value)
    return (path if path.is_absolute() else project / path).resolve()


def fingerprint(project, config, paths):
    files = set()
    for path in paths:
        if path.is_dir():
            files.update(p.resolve() for p in path.rglob('*') if p.is_file())
        elif path.is_file():
            files.add(path.resolve())
    if not files:
        raise ValueError('No source files to fingerprint')
    h = hashlib.sha256(json.dumps(config, sort_keys=True).encode())
    for path in sorted(files):
        name = str(path.relative_to(project)) if path.is_relative_to(project) else str(path)
        h.update(name.encode() + b'\0' + sha256(path).encode() + b'\0')
    return h.hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--project', type=Path, required=True)
    p.add_argument('--entry', default='src/index.ts')
    p.add_argument('--composition', required=True)
    p.add_argument('--frames', type=int, required=True)
    p.add_argument('--audio', required=True)
    p.add_argument('--output', required=True)
    p.add_argument('--fps', type=int, default=30)
    p.add_argument('--width', type=int, default=1920)
    p.add_argument('--height', type=int, default=1080)
    p.add_argument('--chunk-seconds', type=float, default=30)
    p.add_argument('--concurrency', type=int, default=2)
    p.add_argument('--crf', type=int, default=18)
    p.add_argument('--preset', default='medium')
    p.add_argument('--browser')
    p.add_argument('--gl', help='Optional supported Remotion GL backend, e.g. swangle')
    p.add_argument('--props', help='JSON props file, included in fingerprint')
    p.add_argument('--fingerprint-path', action='append', default=[], help='Additional source/data path')
    p.add_argument('--overwrite', action='store_true', help='Replace an existing final from another source')
    a = p.parse_args()
    if min(a.frames, a.fps, a.width, a.height, a.chunk_seconds, a.concurrency) <= 0:
        p.error('frames/fps/dimensions/chunk seconds/concurrency must be positive')
    if not 0 <= a.crf <= 51 or not math.isfinite(a.chunk_seconds):
        p.error('invalid CRF/chunk size')
    for tool in ('npx', 'ffmpeg', 'ffprobe'):
        if not shutil.which(tool):
            p.error(f'Missing tool: {tool}')
    project = a.project.resolve()
    entry, audio, output = [absolute(project, x) for x in (a.entry, a.audio, a.output)]
    props = absolute(project, a.props) if a.props else None
    if not entry.is_file() or not audio.is_file() or (props and not props.is_file()):
        p.error('entry/audio/props must exist')
    for source_dir in (project / 'src', project / 'public'):
        if output.is_relative_to(source_dir):
            p.error('Output must be outside src/public to keep source fingerprints stable')
    duration = float(probe(audio)['format']['duration'])
    if abs(duration - a.frames / a.fps) > 0.12:
        p.error('Audio and requested frame count differ by more than 120 ms; correct the timeline first')
    config = {k: v for k, v in vars(a).items() if k not in ('overwrite', 'project')}
    config.update(project=str(project), audio=str(audio), output=str(output), entry=str(entry))
    source_paths = [project / d for d in ('src', 'public', 'inputs')]
    source_paths += [project / n for n in ('package.json', 'package-lock.json', 'pnpm-lock.yaml',
        'yarn.lock', 'tsconfig.json', 'remotion.config.ts', 'remotion.config.js',
        'storyboard.json', 'asset-manifest.json', 'brief.json')]
    source_paths += [entry, audio, Path(__file__), Path(__file__).with_name('video_check.py')]
    source_paths += [absolute(project, x) for x in a.fingerprint_path]
    if props:
        source_paths.append(props)
    for extra in a.fingerprint_path:
        if not absolute(project, extra).exists():
            p.error(f'Missing fingerprint path: {extra}')
    print('Hashing source/assets to prevent stale checkpoint reuse.', flush=True)
    source_hash = fingerprint(project, config, source_paths)
    cache = output.parent / 'render-cache' / source_hash[:20]
    cache.mkdir(parents=True, exist_ok=True)
    log_path = cache / 'runner.log'

    def log(message):
        line = f'{datetime.now(timezone.utc).isoformat()} {message}'
        with log_path.open('a') as stream:
            stream.write(line + '\n')
        try:
            print(line, flush=True)
        except BrokenPipeError:
            pass

    lock_file = output.with_name(output.name + '.render.lock').open('a')
    try:
        fcntl.flock(lock_file, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        raise RuntimeError('Another render is already writing this output; inspect its PID/log first')
    report_path = output.with_name(output.name + '.render.json')
    old = {}
    if report_path.is_file():
        with contextlib.suppress(ValueError, OSError):
            old = json.loads(report_path.read_text())
    if output.exists():
        if old.get('fingerprint') == source_hash and old.get('sha256') == sha256(output):
            log(f'COMPLETE: existing final already verified: {output}')
            return
        if old.get('fingerprint') != source_hash and not a.overwrite:
            raise RuntimeError('Existing final is from another/unverified source. Choose a new filename or --overwrite.')

    chunk_size = max(1, round(a.chunk_seconds * a.fps))
    chunks = [(s, min(s + chunk_size, a.frames)) for s in range(0, a.frames, chunk_size)]
    write_json(cache / 'plan.json', {'fingerprint': source_hash, 'config': config,
        'frameConvention': '[start,end)', 'chunks': chunks})
    completed, paths, signatures = 0, [], []

    def progress(stage, **extra):
        write_json(cache / 'progress.json', {
            'fingerprint': source_hash, 'pid': os.getpid(), 'stage': stage,
            'verifiedFrames': completed, 'totalFrames': a.frames,
            'verifiedSeconds': completed / a.fps, 'totalSeconds': a.frames / a.fps,
            'verifiedPercent': round(100 * completed / a.frames, 2),
            'updatedAt': datetime.now(timezone.utc).isoformat(), **extra})

    for index, (start, end) in enumerate(chunks):
        path = cache / f'chunk-{index:05d}.mp4'
        marker = path.with_suffix('.ok.json')
        verified = None
        if path.is_file() and marker.is_file():
            with contextlib.suppress(ValueError, OSError, KeyError):
                saved = json.loads(marker.read_text())
                if (saved['fingerprint'] == source_hash and saved['frames'] == end - start
                        and saved['sha256'] == sha256(path)):
                    verified = saved
        if verified is None:
            progress('rendering', chunk=index + 1, chunks=len(chunks), startFrame=start, endFrame=end)
            partial = path.with_name(path.stem + '.partial.mp4')
            command = ['npx', '--no-install', 'remotion', 'render', str(entry), a.composition,
                str(partial), f'--frames={start}-{end-1}', '--codec=h264', '--pixel-format=yuv420p',
                f'--crf={a.crf}', f'--x264-preset={a.preset}', f'--concurrency={a.concurrency}',
                '--muted', '--overwrite']
            if a.browser:
                command.append(f'--browser-executable={a.browser}')
            if a.gl:
                command.append(f'--gl={a.gl}')
            if props:
                command.append(f'--props={props}')
            render_log = cache / f'chunk-{index:05d}.render.log'
            log(f'Render {index+1}/{len(chunks)}, absolute frames [{start},{end}), log={render_log}')
            with render_log.open('w') as stream:
                result = subprocess.run(command, cwd=project, stdout=stream, stderr=subprocess.STDOUT)
            if result.returncode:
                progress('failed', chunk=index + 1, log=str(render_log))
                raise RuntimeError(f'Chunk failed; verified chunks preserved. See {render_log}')
            progress('validating_chunk', chunk=index + 1)
            verified = validate(partial, end - start, a.fps, a.width, a.height, digest=True)
            partial.replace(path)
            verified.update(path=str(path), fingerprint=source_hash, startFrame=start, endFrame=end)
            write_json(marker, verified)
        else:
            log(f'RESUME: reuse verified chunk {index+1}/{len(chunks)}')
        completed += end - start
        paths.append(path)
        signatures.append(tuple(verified.get(k) for k in ('codec', 'profile', 'pixelFormat',
            'width', 'height', 'fps', 'timeBase')))
        progress('chunk_verified', chunk=index + 1, chunks=len(chunks))
        log(f'Verified {completed}/{a.frames} frames ({100*completed/a.frames:.2f}%), {completed/a.fps:.2f}s')
    if len(set(signatures)) != 1:
        raise RuntimeError('Incompatible chunk codecs/timebases; do not stream-copy mismatched chunks')

    progress('muxing')
    concat_list = cache / 'concat.txt'
    concat_list.write_text(''.join("file '" + str(path).replace("'", "'\\''") + "'\n" for path in paths))
    partial_final = output.with_name(output.stem + '.partial.mp4')
    mux_log = cache / 'mux.log'
    with mux_log.open('w') as stream:
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-f', 'concat', '-safe', '0',
            '-i', str(concat_list), '-i', str(audio), '-map', '0:v:0', '-map', '1:a:0',
            '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(partial_final)],
            stdout=stream, stderr=subprocess.STDOUT, check=True)
    progress('validating_final')
    final = validate(partial_final, a.frames, a.fps, a.width, a.height, audio=True, digest=True)
    partial_final.replace(output)
    final.update(path=str(output), fingerprint=source_hash)
    write_json(report_path, final)
    progress('complete', output=str(output), sha256=final['sha256'])
    log(f'COMPLETE: {output}; all {a.frames} frames decoded, audio checked, sha256={final["sha256"]}')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, ValueError, subprocess.CalledProcessError) as error:
        print(f'ERROR: {error}', file=sys.stderr)
        sys.exit(1)
