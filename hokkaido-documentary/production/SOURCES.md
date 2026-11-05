# Hokkaido preview — sources and interpretation

- Voice and subtitle timing: the user's newly supplied MP3/SRT; 243 cues,
  1325.217959-second audio. Preview uses the original continuous first 40 seconds.
- NASA GIBS WMS, `BlueMarble_ShadedRelief_Bathymetry`: offline day imagery.
  `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi`
- NASA GIBS WMS, `VIIRS_CityLights_2012`: historical 2012 night-light composite,
  not a live image or a present-day population dataset. The night scene identifies
  the composite year on screen. NASA imagery is public-domain US government data;
  see https://earthdata.nasa.gov/data/imagery/gibs and https://www.nasa.gov/nasa-brand-center/images-and-media/.
- Natural Earth `ne_10m_admin_0_countries`: public-domain coastlines. Downloaded
  from https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson.
  Only main island rings are used in the equal-area island comparison. They are
  geographic silhouettes, not a claim about administrative boundaries/island groups.
- Land-area annotation is rounded as in narration. Reference: Geospatial Information
  Authority of Japan, https://www.gsi.go.jp/KOKUJYOHO/MENCHO-title.htm .
- Official GSI 2026-07-01 area table inspected: Japan 377,973.68 km²; Hokkaido
  83,422.23 km² (22.071%). Source:
  https://www.gsi.go.jp/KOKUJYOHO/MENCHO/backnumber/GSI-menseki20260701.pdf .
- Population annotation is explicitly rounded and dated to the 2020 Census.
  Official Statistics Bureau report downloaded and inspected:
  https://www.stat.go.jp/data/kokusei/2020/kekka/pdf/outline_01.pdf .
  Japan: 126,146,099; Hokkaido: approximately 5.225 million (section I-2).
  This is approximately 4.14%, displayed as 約4%. The 100-dot graphic shows a share,
  not locations or a measured population-density map.
- Island comparison: spherical Lambert azimuthal equal-area, centered 140E/38N,
  same km-to-pixel scale for Hokkaido, Kyushu and Shikoku. The shapes are displaced
  into a side-by-side comparison and explicitly marked 同じ縮尺で比較.
- Day/night map positioning: geographic coordinates with a common cos(43°) aspect
  correction for raster and vectors. No hand-placed geographic coordinates.
- Illustration `public/scenes/hokkaido-rural.png`: newly AI-generated for this
  narration, not a documentary photograph or historical evidence.
- No narration subtitles, decorative corner frames, camera shake or flashing effects.
