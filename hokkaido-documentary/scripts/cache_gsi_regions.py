from pathlib import Path
import math,urllib.request,concurrent.futures,json
from PIL import Image
root=Path(__file__).resolve().parents[1];out=root/'public/full/maps';tiles=out/'gsi-cache';tiles.mkdir(exist_ok=True)
def xy(lon,lat,z):return (lon+180)/360*2**z,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z
def lat(y,z):return math.degrees(math.atan(math.sinh(math.pi*(1-2*y/2**z))))
def fetch(t):
 z,x,y=t;p=tiles/f'{z}-{x}-{y}.jpg'
 if not p.exists():
  with urllib.request.urlopen(f'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',timeout=45) as r:p.write_bytes(r.read())
 return x,y,p
regions=[('sapporo',15,[141.305,43.025,141.39,43.09]),('betsukai',12,[144.8,43.1,145.4,43.65]),('kushiro-wetland',13,[144.15,43.0,144.55,43.3])]
metadata={}
for name,z,b in regions:
 x0,y1=xy(b[0],b[1],z);x1,y0=xy(b[2],b[3],z);x0,x1,y0,y1=map(math.floor,[x0,x1,y0,y1]);im=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256))
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
  for x,y,p in ex.map(fetch,[(z,x,y) for y in range(y0,y1+1) for x in range(x0,x1+1)]):im.paste(Image.open(p),((x-x0)*256,(y-y0)*256))
 im.save(out/(name+'-photo.jpg'),quality=95)
 metadata[name]={'bbox':[x0/2**z*360-180,lat(y1+1,z),(x1+1)/2**z*360-180,lat(y0,z)],'projection':'EPSG:3857 tile mosaic','size':im.size,'source':'GSI seamlessphoto; aerial dates vary; source attribution required','zoom':z}
 print(name,im.size,flush=True)
(out/'gsi-regions.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2))
