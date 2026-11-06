from pathlib import Path
import numpy as np,json
from scipy.io import netcdf_file
R=Path(__file__).resolve().parents[1]
with netcdf_file(R/'production/full/sources/gebco-sagami.nc','r',mmap=False) as ds:lo=ds.variables['longitude'].data.copy();la=ds.variables['latitude'].data.copy();z=ds.variables['elevation'].data.copy().astype(float)
result={}
for num,b in [(17,[139.10,35.00,139.55,35.30]),(20,[139.08,34.88,139.58,35.26]),(15,[138.95,34.9,139.6,35.45])]:
 xi=np.where((lo>=b[0])&(lo<=b[2]))[0];yi=np.where((la>=b[1])&(la<=b[3]))[0];levels={}
 for level in [0,-200,-500,-750,-1000,-1250,-1500,-1750,-2000]:
  segments=[]
  for y in yi[:-1]:
   for x in xi[:-1]:
    pts=[(lo[x],la[y],z[y,x]),(lo[x+1],la[y],z[y,x+1]),(lo[x+1],la[y+1],z[y+1,x+1]),(lo[x],la[y+1],z[y+1,x])];hit=[]
    for a,c in zip(pts,pts[1:]+pts[:1]):
     if (a[2]<level)!=(c[2]<level):
      t=(level-a[2])/(c[2]-a[2]);hit.append([round(float(a[0]+t*(c[0]-a[0])),7),round(float(a[1]+t*(c[1]-a[1])),7)])
    if len(hit)==2:segments.append(hit)
    elif len(hit)==4:segments.extend([hit[:2],hit[2:]])
  levels[str(level)]=segments
 result[str(num)]={'levels':levels,'method':'Marching squares on GEBCO2020 native15arcsec grid; linear interpolation, no invented valley lines'}
(R/'src/full/contours.ts').write_text('export const contours = '+json.dumps(result,separators=(',',':'))+' as const;\n')
(R/'public/full/maps/contours.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
print({k:{l:len(v) for l,v in d['levels'].items()} for k,d in result.items()})
