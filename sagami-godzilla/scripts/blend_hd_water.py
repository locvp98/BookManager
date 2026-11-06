"""Georeferenced mosaic: preserve detailed land and use seamless source water."""
from pathlib import Path
import json,shutil
import numpy as np
from scipy.ndimage import binary_erosion,gaussian_filter
from PIL import Image
R=Path(__file__).resolve().parents[1];D=R/'public/full/maps';S=R/'production/full/sources';raw=S/'raw-kanto-hd-satellite.jpg'
if not raw.exists():shutil.copy2(D/'kanto-hd-satellite.jpg',raw)
main=Image.open(R/'public/maps/kanto-satellite.jpg').convert('RGB');hd=Image.open(raw).convert('RGB');a=json.loads((R/'public/maps/kanto-satellite.json').read_text());b=json.loads((D/'kanto-hd-satellite.json').read_text());factor=2**(a['zoom']-b['zoom']);x=b['tileOrigin'][0]*256*factor-a['tileOrigin'][0]*256;y=b['tileOrigin'][1]*256*factor-a['tileOrigin'][1]*256
base=np.array(main.transform(hd.size,Image.Transform.EXTENT,(x,y,x+hd.width*factor,y+hd.height*factor),resample=Image.Resampling.BICUBIC)).astype(np.float32);high=np.array(hd).astype(np.float32)
# Mask is derived only from the existing source photograph, not a fabricated coast.
water=(base[:,:,2]>base[:,:,0]+4)&(base[:,:,2]>base[:,:,1]-15)&(base[:,:,0]<120)&(base[:,:,1]<160)
water=binary_erosion(water,iterations=2);weight=gaussian_filter(water.astype(np.float32),.6)
output=np.clip(high*(1-weight[:,:,None])+base*weight[:,:,None],0,255).astype('uint8');Image.fromarray(output).save(D/'kanto-hd-satellite.jpg',quality=96,subsampling=0)
record={'method':'Georeferenced multi-resolution mosaic; high-resolution land, seamless water from source z11 image','waterMask':'photographic blue-water classification with2pixel coast protection and0.6pixel source-edge feather; not an authoritative shoreline dataset','rawHdSource':str(raw.relative_to(R)),'baseWaterSource':'public/maps/kanto-satellite.jpg','metadata':'kanto-hd-satellite.json','geographicCoordinatesUnchanged':True,'noInventedGeographicFeatures':True}
(D/'hd-mosaic-method.json').write_text(json.dumps(record,indent=2)+'\n');print('HD MOSAIC READY',hd.size,'water coverage',float(water.mean()),flush=True)
