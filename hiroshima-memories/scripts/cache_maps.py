from pathlib import Path
import math,json,urllib.request,concurrent.futures,time
from PIL import Image
R=Path(__file__).resolve().parents[1];cache=R/'public/maps/tile-cache';cache.mkdir(exist_ok=True)
def xy(lon,lat,z):return ((lon+180)/360*2**z,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z)
def build(name,z,bounds):
 west,south,east,north=bounds;a,d=xy(west,south,z);b,c=xy(east,north,z);x0,y0,x1,y1=map(math.floor,[a,c,b,d]);coords=[(x,y) for y in range(y0,y1+1) for x in range(x0,x1+1)];atlas=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256))
 def get(q):
  x,y=q;p=cache/f'{z}-{x}-{y}.jpg';url=f'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  if not p.exists():
   for attempt in range(4):
    try:
     b=urllib.request.urlopen(url,timeout=35).read();p.write_bytes(b)
     with Image.open(p) as im:assert im.size==(256,256)
     break
    except Exception:
     if attempt==3:raise
     time.sleep(attempt+1)
  return q,p
 with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
  for i,((x,y),p) in enumerate(pool.map(get,coords)):
   with Image.open(p) as im:atlas.paste(im,((x-x0)*256,(y-y0)*256))
   if i%40==0:print(name,i+1,'/',len(coords),flush=True)
 atlas.save(R/f'public/maps/{name}.jpg',quality=96,subsampling=0);meta={'zoom':z,'tileOrigin':[x0,y0],'width':atlas.width,'height':atlas.height,'boundsRequested':bounds,'tileCount':len(coords),'source':'Esri World Imagery','attribution':'Esri, Maxar, Earthstar Geographics and the GIS User Community','projection':'Web Mercator EPSG:3857'};(R/f'public/maps/{name}.json').write_text(json.dumps(meta,indent=2)+'\n');print(name,'READY',atlas.size,flush=True)
build('hiroshima-regional',14,[132.18,34.20,132.59,34.46])
build('miyajima-detail',17,[132.312,34.291,132.328,34.302])
build('dome-detail',17,[132.447,34.391,132.461,34.400])
