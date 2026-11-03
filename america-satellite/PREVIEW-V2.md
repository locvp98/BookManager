# SatellitePreviewV2 — 40-second review

1920 × 1080, 30 fps, 1200 frames. Japanese uploaded narration; no visible text or captions. The earlier composition and MP4 remain available.

Run `npm run studio` and select **SatellitePreviewV2**. Individual V2 scenes are in **SatelliteV2-Scenes**. Edit the authored scene durations in `src/v2/SatellitePreview.tsx`; each scene has a separate timeline row. Map cameras and geographic overlays are in `src/v2/SharpMap.tsx`. Image motion is in `src/v2/CinematicInsert.tsx`.

The regional night map is now 6371 pixels wide, assembled from NASA Black Marble tiles, rather than enlarging the previous 1252-pixel crop. Coast locators, a traced Pacific corridor, a same-scale three-panel comparison, camera-follow scan, progressive belt reveal, two same-scale magnifiers and a scale pullback give each map return a different purpose. See `public/v2/SOURCES.md` for sources and interpretation limits.

The opening follows the first 40 seconds of the SRT. It is a mystery/scale introduction; the later explanation of rainfall, groundwater and history is outside this preview. The LA–NY–Paris example informs the moving-camera style; the preview does not add an unrelated international route.

Render:

```sh
cd /workspace/BookManager/america-satellite
npx --no-install remotion render src/index.ts SatellitePreviewV2 out/satellite-v2-preview-40s.mp4 --browser-executable=/usr/bin/chromium --gl=swangle --concurrency=2 --crf=18
```

The audio fades at the end of the requested excerpt. The complete uploaded audio and SRT remain in `/workspace/attachments`.

The GitHub review copy is `out/satellite-v2-github-40s.mp4`: 1080p H.264 with a capped bitrate to fit GitHub’s per-file limit, plus the original AAC audio. The full-quality local render is retained separately.
