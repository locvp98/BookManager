from pathlib import Path
import urllib.request,urllib.parse,concurrent.futures
R=Path(__file__).resolve().parents[1];src=R/'production/full/sources'
regions={'sagami':(34.1,36.7,137.7,141.5),'suruga':(34.3,35.4,138.0,139.1),'toyama':(36.5,37.8,136.6,138.0)}
def get(item):
 name,(south,north,west,east)=item;q=f'elevation[({south}):1:({north})][({west}):1:({east})]';url='https://coastwatch.pfeg.noaa.gov/erddap/griddap/GEBCO_2020.nc?'+urllib.parse.quote(q,safe='():,')
 with urllib.request.urlopen(url,timeout=180) as f:b=f.read()
 (src/f'gebco-{name}.nc').write_bytes(b);print(name,len(b),'downloaded',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(get,regions.items()))
