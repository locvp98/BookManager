from pathlib import Path
import json,math
from PIL import Image,ImageDraw
import numpy as np
R=Path(__file__).resolve().parents[1];D=R/'public/full/maps';out=D/'backgrounds';out.mkdir(exist_ok=True)
def panel(center,span,box,kind='sat'):
 return {'center':center,'span':span,'box':box,'kind':kind}
v={
3:[panel([140.1,34.7],6.4,[0,0,1920,1080],'macro')],
5:[panel([139.35,35.34],.95,[40,160,1840,560])],
6:[panel([139.65,35.24],.55,[70,200,550,650]),panel([139.0,34.95],.55,[685,200,550,650]),panel([139.39,34.75],.55,[1300,200,550,650])],
7:[panel([139.28,35.48],1.2,[0,0,1920,1080],'sat')],
8:[panel([139.45,35.30],.62,[70,160,850,320]),panel([139.13,35.17],.62,[1000,160,850,320])],
9:[panel([139.38,35.1],1.8,[0,0,1920,1080])],
11:[panel([139.38,35.18],1.25,[1450,90,390,260])],
14:[],
15:[panel([139.25,35.16],.55,[55,160,815,810],'bathy')],
16:[panel([139.37,35.16],2.35,[70,130,1780,300],'bathy')],
17:[panel([139.32,35.15],.36,[0,0,1920,1080],'bathy')],
18:[panel([139.36,35.13],.8,[80,170,1760,820],'bathy')],
19:[panel([140.0,34.95],4.6,[70,180,1780,400],'macro')],
20:[panel([139.32,35.05],.43,[70,180,1060,730],'bathy')],
21:[panel([139.5,35.05],1.6,[1440,100,400,250])],
22:[panel([139.4,35.2],1.3,[1500,85,340,220])],
23:[panel([140.1,35.0],5.8,[1400,90,440,300],'macro')],
24:[panel([139.45,35.45],2.2,[0,0,1920,1080])],
25:[panel([140,35.1],4.0,[70,160,1020,800],'macro')],
26:[panel([139.45,35.4],1.9,[70,100,1780,280])],
29:[panel([139.6,34.8],3.5,[70,200,900,700],'macro')],
30:[panel([139.3,35.1],.95,[70,160,590,780],'bathy')],
31:[panel([139.4,35.22],1.5,[70,135,1780,370])],
32:[panel([139.18,35.02],.25,[70,160,950,800],'hatsu')],
33:[panel([139.21,35.05],.65,[1510,80,340,230],'bathy')],
34:[panel([139.28,35.14],.65,[70,190,600,740],'bathy')],
35:[panel([139.32,35.1],.8,[70,180,850,720],'sat')],
36:[panel([139.4,35.1],1.4,[1490,90,350,230])],
37:[panel([139.39,35.02],.82,[70,160,1050,810],'bathy')],
38:[panel([139.5,35.12],2.0,[670,90,580,230])],
39:[panel([139.37,35.25],.53,[1340,80,510,290])]
}
meta=json.loads((R/'public/maps/kanto-satellite.json').read_text());sat=Image.open(R/'public/maps/kanto-satellite.jpg');bathy=Image.open(D/'sagami-bathymetry.jpg');macro=Image.open(D/'pacific-satellite.jpg');mm=json.loads((D/'pacific-satellite.json').read_text())
hm=json.loads((D/'hatsushima-satellite.json').read_text());hs=Image.open(D/'hatsushima-satellite.jpg');hdm=json.loads((D/'kanto-hd-satellite.json').read_text());hds=Image.open(D/'kanto-hd-satellite.jpg')
def world(lon,lat,z):
 n=256*2**z;return ((lon+180)/360*n,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n)
for num,panels in v.items():
 im=Image.new('RGB',(1920,1080),'#071a28')
 for p in panels:
  candidates=[(mm,macro)] if p['kind']=='macro' else [(meta,bathy)] if p['kind']=='bathy' else [(hm,hs)] if p['kind']=='hatsu' else [(hdm,hds),(meta,sat)]
  box=p['box']
  for m,source in candidates:
   x,y=world(*p['center'],m['zoom']);w=p['span']/360*256*2**m['zoom'];h=w*box[3]/box[2];ox,oy=m['tileOrigin'];rect=(x-w/2-ox*256,y-h/2-oy*256,x+w/2-ox*256,y+h/2-oy*256)
   if rect[0]>=0 and rect[1]>=0 and rect[2]<=source.width and rect[3]<=source.height:break
  assert rect[0]>=0 and rect[1]>=0 and rect[2]<=source.width and rect[3]<=source.height,(num,p,rect,source.size)

  crop=source.transform((box[2],box[3]),Image.Transform.EXTENT,rect,resample=Image.Resampling.BICUBIC);im.paste(crop,(box[0],box[1]))
 if num in [17,20]:
  im=Image.new('RGB',(1920,1080),'#071a28')
  if num==20:ImageDraw.Draw(im).rectangle((70,180,1130,910),fill='#d8dfd8')
 im.save(out/f'map-{num:03}.jpg',quality=95,subsampling=0)
# Equal physical scale for three bay panels; source grids are equirectangular.
from scipy.io import netcdf_file
from scipy.interpolate import RegularGridInterpolator
from map_palette import rgb
im=Image.new('RGB',(1920,1080),'#071a28')
for i,(name,c) in enumerate([('sagami',[139.32,35.15]),('suruga',[138.60,34.93]),('toyama',[137.25,37.0])]):
 with netcdf_file(R/f'production/full/sources/gebco-{name}.nc','r',mmap=False) as ds:lo=ds.variables['longitude'].data.copy();la=ds.variables['latitude'].data.copy();z=ds.variables['elevation'].data.copy()
 w,h=550,650;km=90;lonspan=km/(111.195*math.cos(math.radians(c[1])));latspan=km*h/w/111.195
 ll,aa=np.meshgrid(np.linspace(c[0]-lonspan/2,c[0]+lonspan/2,w),np.linspace(c[1]+latspan/2,c[1]-latspan/2,h));fn=RegularGridInterpolator((la,lo),z,bounds_error=False,fill_value=np.nan);zz=fn(np.stack([aa,ll],-1));valid=np.isfinite(zz);zz=np.nan_to_num(zz,nan=0);color=rgb(zz,km*1000/w);color[~valid]=[7,26,40];im.paste(Image.fromarray(color),(70+i*615,200))
im.save(out/'map-014.jpg',quality=95,subsampling=0)
(D/'views.json').write_text(json.dumps(v,separators=(',',':'))+'\n')
print('BAKED',len(v)+1,'map backgrounds',flush=True)
