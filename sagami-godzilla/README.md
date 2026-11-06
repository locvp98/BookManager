# Sagami Bay × Godzilla — preview

New project using satellite-documentary skill at commit 3d5d2fa. Only the opening 40 seconds are produced; full film has not been started.

## Preview

- 1920×1080, 30fps, 1,200 frames, 40.000s, H.264/AAC; 720p lightweight copy also included.
- User narration from 0–40s, preserved with a 0.2s tail fade. No burned-in subtitles or decorative corner brackets.
- Three independently generated new illustrations. Linear 100–120% push-in; 12-frame dissolves.
- One continuous real satellite map shot, with cue-aligned Sagami/Tokyo Bay comparison, Kanagawa locator and Miura Peninsula highlight. Map beats are not counted as new scenes.
- Every exported preview frame decoded without error; see `preview/*.validation.json` for dimensions, duration, audio and SHA-256.

## Review

`production/preview-contact-sheet.jpg` and `production/final-transition-review.jpg` show source and final MP4 frames including each dissolve and the final frame. These are outside-video reports.

Source timing/camera animations are deterministic and frame-driven. This environment exposes still-frame inspection but no interactive video playback tool; real-time playback review remains pending and is explicitly recorded in `production/map-diversity-review.json`. A successful decode is not a claim of complete artistic QA for a future full film.

Read `production/editorial-notes.md` before full production: the 24:35.76 narration contains repeated/broken phrases and possible film-title transcription errors. Narration was not silently rewritten. Generated cinema/monster images are fictional illustrations, not actual film stills or verification of release/plot statements.

Sources and geographic conventions: `production/SOURCES.md`. The 2D satellite map is not presented as a 3D DEM or a quantitative bathymetric map.

## Run

```bash
npm ci
npm run studio
npm run typecheck
npm run render:preview
python3 scripts/finalize_preview.py
```

Map tile cache can be regenerated with `python3 scripts/cache_map.py`; the ready-to-use satellite atlas is included. Dependencies were reused locally via a gitignored node_modules symlink; the checked-in package/lockfile permits an independent install.
