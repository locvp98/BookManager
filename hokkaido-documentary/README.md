# Hokkaido documentary — 40-second preview

New project, independent from America Satellite. Japanese narration supplied by the
user, 22:05 total. Only the first 40 seconds have been authored for preview review.

## Run

Install Node.js and dependencies with `npm ci`, then `npm run studio`.
Composition: `HokkaidoPreview40`, 1920×1080, 30fps, 1200 frames.
Use `npm run render:preview` to export with Chromium at `/usr/bin/chromium`.

The source includes 8 individually editable scenes and their separate compositions.
Story/asset manifests, input checks and source credits are in `production/`.
The original uploaded audio and SRT are retained in `public/`. Map data is cached;
rendering does not request external tiles. The new rural illustration is synthetic.

The full-length video has not been produced. Preview approval may lead to a separate
full storyboard and new illustration generation; do not stretch these 8 scenes
across the full audio.

## Review exports

`preview/hokkaido-preview-40s-720p30.mp4` is the lightweight phone preview.
`preview/hokkaido-preview-40s-1080p30.mp4` is the full-resolution preview.
Both contain the same 40-second edit and audio. Git LFS is used for MP3/MP4 files;
run `git lfs install` and `git lfs pull` after cloning. Install Noto Sans CJK JP
for Japanese map annotations. QA results and contact sheets are in `production/`.
