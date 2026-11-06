from pathlib import Path
import json,math,shutil
import numpy as np
from scipy.io import netcdf_file
from scipy.interpolate import RegularGridInterpolator
from scipy.ndimage import gaussian_filter
from PIL import Image
R=Path(__file__).resolve().parents[1];D=R/'public/full/maps';D.mkdir(exist_ok=True);S=R/'production/full/sources'
regions={}
for name in ['sagami','suruga','toyama']:
 with netcdf_file(S/f'gebco-{name}.nc','r',mmap=False) as ds:
  lat=ds.variables['latitude'].data.copy();lon=ds.variables['longitude'].data.copy();z=ds.variables['elevation'].data.copy().astype(float)
 assert np.max(z)<32767
 regions[name]=(lon,lat,z,RegularGridInterpolator((lat,lon),z,bounds_error=False,fill_value=None))
 print(name,z.shape,z.min(),z.max(),flush=True)
# Real terrain colors, slightly shaded; no made-up valleys or sharpening as substitute for detail.
colors=np.array([[9,28,53],[15,49,76],[26,79,104],[54,116,137],[102,156,164],[175,203,187],[58,93,67],[119,126,89],[175,165,139],[227,225,214]],float)
levels=np.array([-6000,-3000,-1800,-1000,-200,-1,0,600,1500,3000],float)
def rgb(z,dx=500):
 out=np.stack([np.interp(z,levels,colors[:,j]) for j in range(3)],-1);gy,gx=np.gradient(z,dx);light=np.clip((.6-.45*gx+.6*gy)/np.sqrt(1+gx*gx+gy*gy),-.7,.9);return np.clip(out*(.82+.36*light[...,None]),0,255).astype('uint8')
meta=json.loads((R/'public/maps/kanto-satellite.json').read_text());w,h=meta['width'],meta['height'];x0,y0=np.array(meta['tileOrigin'])*256;world=524288
# Mercator raster aligns perfectly to the satellite atlas, full native resolution.
lon=(x0+np.arange(w)+.5)/world*360-180;lat=np.degrees(np.arctan(np.sinh(np.pi*(1-2*(y0+np.arange(h)+.5)/world))))
fn=regions['sagami'][3];out=np.empty((h,w),float)
for y in range(0,h,128):
 ll,aa=np.meshgrid(lon,lat[y:y+128]);out[y:y+128]=fn(np.stack([aa,ll],-1))
Image.fromarray(rgb(out,80)).save(D/'sagami-bathymetry.jpg',quality=95,subsampling=0)
# Source-resolution depth textures for actual-data small multiples and profiles.
for name,(lo,la,z,_) in regions.items():
 Image.fromarray(rgb(z[::-1])).save(D/f'{name}-depth.jpg',quality=95,subsampling=0)
# Continuous sample functions used in profiles; no smoothing of geological detail.
def profile(a,b,n=241):
 lo=np.linspace(a[0],b[0],n);la=np.linspace(a[1],b[1],n);z=fn(np.stack([la,lo],-1));km=np.hypot((b[0]-a[0])*111.195*math.cos(math.radians((a[1]+b[1])/2)),(b[1]-a[1])*111.195)
 return {'from':a,'to':b,'distanceKm':km,'heights':np.round(z).astype(int).tolist()}
profiles={'odawara':profile([139.156,35.25],[139.35,35.04]),'westShelf':profile([139.21,35.31],[139.25,35.03]),'eastShelf':profile([139.55,35.28],[139.50,35.00]),'shonan':profile([139.37,35.34],[139.37,34.98]),'trough':profile([139.0,34.9],[140.2,34.9]),'seamount':profile([139.15,35.05],[139.50,35.05]),'deepSetting':profile([139.35,35.25],[139.35,34.85])}
# Meshes carry real sampled heights and correct lon/lat, ready for deterministic 3D.
boxes={'bay':[138.95,34.85,139.78,35.40],'regional':[138.60,34.4,140.35,35.8],'tanzawa':[138.85,35.08,139.65,35.70],'oshima':[139.27,34.63,139.52,34.86],'canyon':[139.12,35.02,139.47,35.28]}
meshes={}
for name,(west,south,east,north) in boxes.items():
 n=181;ll,aa=np.meshgrid(np.linspace(west,east,n),np.linspace(north,south,n));z=fn(np.stack([aa,ll],-1));meshes[name]={'bounds':[west,south,east,north],'width':n,'height':n,'heights':np.round(z).astype(int).tolist(),'source':'GEBCO2020 15arcsec; interpolated display grid, not increased source detail'}
# Simplified boundary lines preserve source coordinates. No guessed active fault geometry.
pb=json.loads((S/'pb2002.geojson').read_text());lines=[]
for f in pb['features']:
 coords=f['geometry']['coordinates'];typ=f['geometry']['type'];seqs=[coords] if typ=='LineString' else coords if typ=='MultiLineString' else []
 for seq in seqs:
  if any(136<=p[0]<=144 and 30<=p[1]<=38 for p in seq):lines.append({'coordinates':seq,'properties':f['properties']})
# Underlying world texture reuse is allowed source data, not an old rendered shot.
shutil.copy2('/workspace/BookManager/hokkaido-documentary/public/maps/world-day.jpg',D/'world-day.jpg')
info={'regions':{k:{'bounds':[float(v[0].min()),float(v[1].min()),float(v[0].max()),float(v[1].max())],'grid':[len(v[0]),len(v[1])],'range':[float(v[2].min()),float(v[2].max())]} for k,v in regions.items()},'profiles':profiles,'meshes':meshes,'plateBoundaries':lines,'sourceResolutionArcseconds':15,'sourceDoi':'10.5285/a29c5465-b138-234d-e053-6c86abc040b9','source':'GEBCO2020 via NOAA ERDDAP; elevations in meters, not for navigation'}
(D/'geodata.json').write_text(json.dumps(info,separators=(',',':'))+'\n')
(R/'src/full/geodata.ts').write_text('export const geo = '+json.dumps(info,separators=(',',':'))+' as const;\n')
print('MAP DATA READY',len(lines),'PB2002 lines; profiles',[(k,min(v['heights'])) for k,v in profiles.items()],flush=True)
