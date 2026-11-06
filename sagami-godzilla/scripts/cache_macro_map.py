from pathlib import Path
import math,json,urllib.request,concurrent.futures,time
from PIL import Image
R=Path(__file__).resolve().parents[1];z=9;n=2**z
bounds=[136.5,31.0,144.8,38.0]
def tile(lon,lat):return ((lon+180)/360*n,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n)
x0,y1=tile(bounds[0],bounds[1]);x1,y0=tile(bounds[2],bounds[3]);x0,y0,x1,y1=map(math.floor,[x0,y0,x1,y1]);cache=R/'public/maps/tile-cache';cache.mkdir(exist_ok=True)
coords=[(x,y) for y in range(y0,y1+1) for x in range(x0,x1+1)]
def get(c):
 x,y=c;p=cache/f'{z}-{x}-{y}.jpg';url=f'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
 if not p.exists():
  for i in range(4):
   try:
    b=urllib.request.urlopen(url,timeout=30).read();p.write_bytes(b)
    with Image.open(p) as im:assert im.size==(256,256)
    break
   except Exception:
    if i==3:raise
    time.sleep(i+1)
 return c,p
atlas=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256))
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
 for i,((x,y),p) in enumerate(pool.map(get,coords)):
  with Image.open(p) as im:atlas.paste(im,((x-x0)*256,(y-y0)*256))
  if i%40==0:print('cached',i+1,'/',len(coords),flush=True)
atlas.save(R/'public/full/maps/pacific-satellite.jpg',quality=96,subsampling=0)
meta={'zoom':z,'tileOrigin':[x0,y0],'width':atlas.width,'height':atlas.height,'tiles':len(coords),'source':'Esri World Imagery','urlTemplate':'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}','attribution':'Esri, Maxar, Earthstar Geographics, and the GIS User Community','projection':'Web Mercator EPSG:3857','boundsRequested':bounds}
(R/'public/full/maps/pacific-satellite.json').write_text(json.dumps(meta,indent=2)+'\n')
thumb=atlas.copy();thumb.thumbnail((1400,900));thumb.save(R/'production/full/pacific-source-review.jpg')
print('SATELLITE READY',atlas.size,flush=True)
