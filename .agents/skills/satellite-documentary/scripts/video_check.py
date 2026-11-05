#!/usr/bin/env python3
"""Probe and fully decode a video; fail rather than bless an incomplete export."""
import argparse
from fractions import Fraction
import hashlib
import json
from pathlib import Path
import subprocess


def sha256(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as stream:
        for block in iter(lambda: stream.read(4 * 1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def write_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.tmp')
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def probe(path):
    result = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(result.stdout)


def validate(path, frames, fps=30, width=1920, height=1080, audio=False, digest=False):
    path = Path(path).resolve()
    if not path.is_file() or path.stat().st_size == 0:
        raise ValueError(f'Missing/empty video: {path}')
    info = probe(path)
    videos = [s for s in info['streams'] if s['codec_type'] == 'video']
    audios = [s for s in info['streams'] if s['codec_type'] == 'audio']
    if len(videos) != 1:
        raise ValueError('Expected exactly one video stream')
    v = videos[0]
    if (v.get('width'), v.get('height')) != (width, height):
        raise ValueError(f'Wrong dimensions: {v.get("width")}x{v.get("height")}')
    if v.get('codec_name') != 'h264' or v.get('pix_fmt') not in ('yuv420p', 'yuvj420p'):
        raise ValueError(f'Expected H.264 8-bit 4:2:0, got {v.get("codec_name")} {v.get("pix_fmt")}')
    if Fraction(v['avg_frame_rate']) != Fraction(str(fps)):
        raise ValueError(f'Wrong fps: {v["avg_frame_rate"]}')
    expected_duration = frames / fps
    if abs(float(v['duration']) - expected_duration) > 1 / fps + 0.001:
        raise ValueError('Video duration disagrees with the expected frame count')
    if str(v.get('nb_frames', 'N/A')) != 'N/A' and int(v['nb_frames']) != frames:
        raise ValueError(f'Container has {v["nb_frames"]} frames, expected {frames}')
    if audio:
        if len(audios) != 1:
            raise ValueError('Final must contain exactly one narration stream')
        duration = audios[0].get('duration')
        if duration is None or abs(float(duration) - expected_duration) > 0.12:
            raise ValueError('Audio duration does not match the full video within 120 ms')
    elif audios:
        raise ValueError('Chunk must be muted; audio is muxed exactly once in final')

    progress = path.with_name(path.name + '.decode-progress.log')
    error_log = path.with_name(path.name + '.decode-errors.log')
    command = ['ffmpeg', '-hide_banner', '-v', 'error', '-nostats', '-xerror',
               '-err_detect', 'explode', '-i', str(path), '-map', '0:v:0',
               '-map', '0:a?', '-fps_mode', 'passthrough', '-progress', str(progress),
               '-f', 'null', '-']
    with error_log.open('w') as log:
        result = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT)
    if result.returncode or error_log.stat().st_size:
        raise ValueError(f'Full decode failed or reported errors. See {error_log}')
    last = {}
    for line in progress.read_text().splitlines():
        if '=' in line:
            key, value = line.split('=', 1)
            last[key] = value.strip()
    if last.get('progress') != 'end' or int(last.get('frame', -1)) != frames:
        raise ValueError(f'Decoded {last.get("frame")} frames, expected {frames}')
    if any(int(last.get(key, 0)) for key in ('dup_frames', 'drop_frames')):
        raise ValueError('Unexpected frame duplication/drop in decode output')
    report = {
        'path': str(path), 'bytes': path.stat().st_size, 'frames': frames,
        'fps': fps, 'width': width, 'height': height, 'duration': float(v['duration']),
        'codec': v['codec_name'], 'profile': v.get('profile'), 'pixelFormat': v['pix_fmt'],
        'timeBase': v.get('time_base'), 'audio': audios, 'fullDecode': 'passed',
        'decodedFrames': int(last['frame']),
    }
    if digest:
        report['sha256'] = sha256(path)
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('video', type=Path)
    parser.add_argument('--frames', type=int, required=True)
    parser.add_argument('--fps', type=int, default=30)
    parser.add_argument('--width', type=int, default=1920)
    parser.add_argument('--height', type=int, default=1080)
    parser.add_argument('--audio', action='store_true', help='Require one complete audio stream')
    parser.add_argument('--sha256', action='store_true')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    if min(args.frames, args.fps, args.width, args.height) <= 0:
        parser.error('frames/fps/dimensions must be positive')
    report = validate(args.video, args.frames, args.fps, args.width, args.height, args.audio, args.sha256)
    if args.report:
        write_json(args.report, report)
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
