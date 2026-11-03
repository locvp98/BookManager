# SatelliteFull — complete narrated composition

This composition follows all 268 cues and the entire 23:16 Japanese narration from the supplied SRT and MP3. It has no subtitles, labels or other on-screen text. The composition is 1920 × 1080 at 30 fps.

Open `npm run studio`, then choose **SatelliteFull**. The 23-minute edit has 60 separately timed illustrative shots plus 31 standalone map or comparison shots. Each map segment is followed by a related illustrative scene within the same audio passage, so geography and real-world examples have their own screen time. The sequence follows the narration’s main ideas: the coastal lights and dark interior, the 100th meridian and rain shadow, settlement and the Dust Bowl, irrigation and the Ogallala aquifer, modern farming, rural population changes, energy, and the future of the plains. The 60 illustrative shots use varied camera moves across the existing and 12 newly generated 16:9 artworks; the same image is not repeated in adjacent illustration shots. Generated art is illustrative rather than archival footage. Map overlays include animated paths, rain and moisture movement, urban light links, well pulses, and comparative wipes. The rainfall and rain-shadow overlays are conceptual explanations, not measured climate data. No shot displays captions or text.

Render the full version with:

```sh
cd /workspace/BookManager/america-satellite
npx --no-install remotion render src/index.ts SatelliteFull out/satellite-full-1080p-30fps.mp4 --browser-executable=/usr/bin/chromium --gl=swangle --concurrency=4 --crf=18
```

The source audio and map data are local. The composition is separate from the 40-second **SatellitePreviewV2**. The full export keeps the requested 1080p/30 fps settings.

See `public/v2/SOURCES.md` for the satellite map source and map-interpretation limits. The original narration's statistical claims have not been independently fact-checked.
