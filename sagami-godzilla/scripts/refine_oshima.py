from pathlib import Path
import math,json,urllib.request,concurrent.futures
import numpy as np
from scipy.interpolate import RegularGridInterpolator
from PIL import Image
R=Path(__file__).resolve().parents[1];D=R/'public/full/maps';cache=D/'oshima-cache';cache.mkdir(exist_ok=True)
def xy(lon,lat,z):return ((lon+180)/360*2**z,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z)
def mosaic(z,kind,bounds):
 west,south,east,north=bounds;x0,y1=xy(west,south,z);x1,y0=xy(east,north,z);x0,y0,x1,y1=map(math.floor,[x0,y0,x1,y1]);out=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256),'white' if kind=='photo' else 'black');jobs=[(x,y) for y in range(y0,y1+1) for x in range(x0,x1+1)]
 def get(c):
  x,y=c;p=cache/f'{kind}-{z}-{x}-{y}.png'
  if not p.exists():
   u=f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png' if kind=='dem' else f'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'
   try:
    b=urllib.request.urlopen(u,timeout=40).read();p.write_bytes(b)
   except Exception:
    if kind=='photo':return c,None
    raise
  return c,p
 ok=0
 with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
  for (x,y),p in pool.map(get,jobs):
   if p:
    with Image.open(p) as im:out.paste(im.convert('RGB'),((x-x0)*256,(y-y0)*256))
    ok+=1
 print(kind,'tiles',ok,'/',len(jobs),flush=True);return out,{'zoom':z,'tileOrigin':[x0,y0],'width':out.width,'height':out.height,'source':'GSI seamless aerial photo' if kind=='photo' else 'Mapzen Terrarium terrain tiles (SRTM and other elevation sources)'}
bounds=[139.26,34.62,139.53,34.87];photo,meta=mosaic(13,'photo',bounds);photo.save(D/'oshima-gsi.jpg',quality=96,subsampling=0);(D/'oshima-gsi.json').write_text(json.dumps(meta,indent=2)+'\n')
dem,dm=mosaic(12,'dem',bounds);a=np.array(dem).astype(float);h=a[:,:,0]*256+a[:,:,1]+a[:,:,2]/256-32768
n=321;west,south,east,north=bounds;lo,la=np.meshgrid(np.linspace(west,east,n),np.linspace(north,south,n));px=(lo+180)/360*256*2**dm['zoom']-dm['tileOrigin'][0]*256;py=(1-np.arcsinh(np.tan(np.radians(la)))/np.pi)/2*256*2**dm['zoom']-dm['tileOrigin'][1]*256
land=RegularGridInterpolator((np.arange(h.shape[0]),np.arange(h.shape[1])),h,bounds_error=False,fill_value=0)(np.stack([py,px],-1))
data=json.loads((D/'geodata.json').read_text())
from scipy.io import netcdf_file
with netcdf_file(R/'production/full/sources/gebco-sagami.nc','r',mmap=False) as ds:
 lat=ds.variables['latitude'].data.copy();lon=ds.variables['longitude'].data.copy();heights=ds.variables['elevation'].data.copy().astype(float)
sea=RegularGridInterpolator((lat,lon),heights,bounds_error=True)(np.stack([la,lo],-1));combined=np.where(land>1,land,np.minimum(sea,-5))
data['meshes']['oshima']={'bounds':bounds,'width':n,'height':n,'heights':np.round(combined).astype(int).tolist(),'source':'Land: Terrarium higher-resolution terrain tiles; sea: GEBCO2020 native15arcsec, interpolated display mesh; no invented bathymetric detail'}
(D/'geodata.json').write_text(json.dumps(data,separators=(',',':'))+'\n');(R/'src/full/geodata.ts').write_text('export const geo = '+json.dumps(data,separators=(',',':'))+' as const;\n');print('OSHIMA REFINED',n,'land max',float(land.max()),flush=True)
