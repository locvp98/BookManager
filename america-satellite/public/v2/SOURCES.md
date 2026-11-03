# SatellitePreviewV2 sources

- `usa-night-6371.jpg`: 6371 × 4514 Mercator mosaic, 494 native level-7 tiles from https://github.com/fasiha/nasa-black-marble-tiles . Source: NASA Earth Observatory / NOAA NGDC, Earth at Night 2012 (Black Marble), 54000 × 27000 source. The repository README describes the original source and GDAL processing. Tile addressing is TMS; this mosaic converts it to a north-up Mercator canvas. Bounding data is in map-bounds.json. NASA imagery is credited here, not on screen, to respect the requested text-free visuals.
- This historical night-light composite is a visual illustration, not current population data. Sparse night lights do not mean that nobody lives there. Cities and town lights remain intact; no lights are erased.
- Pale cyan belt: approximate editorial locator of the western Great Plains, not a surveyed border or a calculation of the narration's 800,000 km² statistic. The narration's population and area claims were not independently verified in this preview.
- `narration-40s.m4a`: first 40 seconds of the newly uploaded MP3, AAC 256 kbps, last 0.35 seconds faded because the excerpt cuts a sentence. Original MP3 is preserved in /workspace/attachments. No new voice, music or subtitles are added.
- `narration-timing.srt`: user-supplied timing reference; never rendered as text.
- City and prairie illustrations reuse the project's existing AI-generated images, animated with frame-driven camera movement. They are illustrative, not documentary drone footage.
- The existing orbital shot uses the project's original Earth texture. The new high-resolution regional plate is used for every flat-map shot and comparison.

- `narration-full.mp3`: the complete user-supplied Japanese narration; `SatelliteFull` uses the full original track. `narration-timing.srt` covers the complete narration through 23:16.527.

- The full version uses 60 separately timed, animated illustration shots alongside 31 standalone map/comparison shots. Twelve newly generated cinematic illustrations in `scenes/` show subjects and historical settings described in narration; they are not archival or geolocated evidence. Existing city, prairie, irrigation, and wind-farm artwork is used only where it fits the narration. The same source image is not used in adjacent illustration shots.
- Map overlays animate city-light connections, geographic routes, moisture and rainfall paths, well markers, and comparison wipes. The pale Great Plains locator, rainfall gradients, rain-shadow paths, and well pulses are explanatory graphics, not surveyed boundaries or measured climate/groundwater data.
