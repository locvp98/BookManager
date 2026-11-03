# America: the dark belt — 40 second review cut

1920×1080, 30 fps, exactly 40 seconds. Japanese narration supplied by the user, first 40 seconds. No captions, titles, place labels or on-screen text.

## Preview and editing

`npm run studio` opens the editable composition `AmericaPreview40` at http://localhost:3000/AmericaPreview40. Each shot has its own timeline row and a standalone scene composition. Timing is authored in `src/Root.tsx`. Camera positions and the illustrative belt are in `src/NightMap.tsx`; the spherical Earth is in `src/Orbit.tsx`.

`npm run typecheck` checks TypeScript. `npm run render:preview` exports the review cut using system Chromium and software WebGL. Remotion packages are pinned together at 4.0.540 in package-lock.json. No API key is required. All composition assets are local.

## Editorial timing

- 0–4.07: orbital approach toward North America at night.
- 4.07–6.30: eastern city-light networks.
- 6.30–8.87: aerial eastern metropolis illustration.
- 8.87–10.80: Pacific coast lights.
- 10.80–12.80: Los Angeles at night illustration.
- 12.80–16.30: reveal the relatively dark Great Plains.
- 16.30–19.43: center-pivot irrigation circles illustration.
- 19.43–24.23: north-to-south geographic scan.
- 24.23–27.53: prairie highway illustration, slow camera push.
- 27.53–30.57: wind turbines over sparse prairie illustration.
- 30.57–33.50: return to the relatively sparse lights.
- 33.50–36.47: tighter crop on the isolated farmstead illustration.
- 36.47–40: satellite pullback establishing scale.

The first and last 0.4 seconds fade. Other shots cross-dissolve over 12 frames. The audio fades over the last 0.35 seconds because this requested 40-second excerpt ends inside the next sentence; the full source is unchanged.

## Assets and interpretation

- Narration: user-provided MP3; SRT used solely for timing, never displayed. Original uploads remain in `/workspace/attachments`.
- `earth-night.jpg` and `earth-day.jpg`: downloaded from https://github.com/vasturiano/three-globe/tree/master/example/img . `america-night.png` is a pixel crop of the night texture used to reduce preview memory. These are existing visual Earth textures, not a current population or light measurement dataset. The 4096-pixel global night plate is suitable for this draft but soft under close zoom. For final production replace it with a properly licensed high-resolution regional night plate. The NASA image host was blocked by the environment's network policy during setup.
- `prairie.png`, `east-city.png`, `la-city.png`, `irrigation.png`, `windfarm.png`: AI-generated illustrative images with frame-driven camera movement, not real drone/video footage or geolocated photographic evidence.
- The dashed Great Plains band is an approximate visual aid. It is not a surveyed boundary, not an 800,000 km² area calculation, and does not assert that nobody lives there. Existing town lights remain visible. Narration statistics have not been independently fact-checked in this preview task.

No background music was added, preserving the supplied voiceover for review. No LA–NY–Paris route is included: that user example was a style reference, while this composition follows the US Great Plains narration.
