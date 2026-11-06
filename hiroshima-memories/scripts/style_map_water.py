from pathlib import Path
import json,urllib.request,concurrent.futures,time
import numpy as np
from PIL import Image,ImageFilter
R=Path(__file__).resolve().parents[1];D=R/'public/maps';meta=json.loads((D/'hiroshima-regional.json').read_text());x0,y0=meta['tileOrigin'];w,h=meta['width'],meta['height'];cache=D/'tile-cache';z=meta['zoom'];coords=[(x,y) for y in range(y0,y0+h//256) for x in range(x0,x0+w//256)];maskMap=Image.new('RGB',(w,h))
def get(q):
 x,y=q;p=cache/f'gsi-std-{z}-{x}-{y}.png'
 if not p.exists():
  for attempt in range(3):
   try:p.write_bytes(urllib.request.urlopen(f'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',timeout=35).read());break
   except Exception:
    if attempt==2:raise
    time.sleep(attempt+1)
 return q,p
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
 for i,((x,y),p) in enumerate(pool.map(get,coords)):
  with Image.open(p) as im:maskMap.paste(im.convert('RGB'),((x-x0)*256,(y-y0)*256))
  if i%60==0:print('GSI MASK',i+1,'/',len(coords),flush=True)
maskMap.save(R/'production/gsi-water-source.png');a=np.array(maskMap).astype(float)
# GSI standard water is blue; preserve coast geometry at the same native tile zoom.
mask=(a[:,:,2]>a[:,:,0]+12)&(a[:,:,2]>a[:,:,1]+3)&(a[:,:,1]>a[:,:,0]+5)
from scipy.ndimage import label
components,count=label(mask);sizes=np.bincount(components.ravel());keep=sizes>500;keep[0]=False;mask=keep[components]
m=Image.fromarray((mask*255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(.3));raw=R/'production/hiroshima-regional-raw.jpg'
if not raw.exists():
 import shutil;shutil.copy2(D/'hiroshima-regional.jpg',raw)
with Image.open(raw) as photo:
 sea=Image.new('RGB',photo.size,(20,56,70));styled=Image.composite(sea,photo,m);styled.save(D/'hiroshima-regional.jpg',quality=97,subsampling=0)
(D/'water-style.json').write_text(json.dumps({'method':'Actual Esri land imagery plus cartographically styled water. Water/coastline mask derived from actual GSI standard-map tiles at matching zoom, not invented topography or blurred geography. Uniform navy is a cartographic style, not observed sea color or depth.','source':'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png','zoom':z,'maskEdgeAntialiasPixels':.3,'waterPixels':int(mask.sum()),'noLandBlur':True},indent=2)+'\n');print('WATER STYLE READY',int(mask.sum()),flush=True)
