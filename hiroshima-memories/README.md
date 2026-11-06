# Hiroshima tourism memories

New documentary project from the supplied Japanese narration and SRT about15 Hiroshima destinations. This stage creates only a40-second opening preview,1920×1080 at30fps.

- Five independently generated illustrative reconstructions, never reused from older films.
- One geographic scene with a real Hiroshima-region satellite view and two independently georeferenced close-ups of Miyajima and the Genbaku Dome.
- Native zoom14 regional imagery and zoom17 close-ups; no geographic blur. GSI-derived navy water styling removes inconsistent photographic ocean seams while preserving real coast geometry.
- Narration supplies the timeline; no burned narration subtitles. Short map place names only. No decorative corner brackets.
- Smooth linear100%→120% photo motion over each shot and12-frame hold dissolves.

`production/editorial-notes.md` separates illustrative reconstruction from verified geography and lists later transcript questions requiring audit before any full production.

## Run

```bash
npm run studio
npm run render:preview
python3 scripts/qa_preview.py
```

Studio: `http://localhost:3003/HiroshimaPreview40` on the cloud execution machine. The downloadable preview, when validated, is placed in `preview/`.

Source imagery attribution: Esri, Maxar, Earthstar Geographics and the GIS User Community; map-water mask: Geospatial Information Authority of Japan standard-map tiles. Per-asset generation intent, hashes and visual checks are recorded in `production/asset-manifest.json`.
