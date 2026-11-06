from pathlib import Path
import urllib.request,concurrent.futures,json,time
R=Path(__file__).resolve().parents[1];src=R/'production/full/sources';src.mkdir(exist_ok=True)
urls={
'etopo-sagami.nc':'https://www.ngdc.noaa.gov/thredds/ncss/grid/global/etopo2022/15s/15s_bed_elev_netcdf/ETOPO_2022_v1_15s_N45E135_bed.nc?var=z&north=36.7&west=137.7&east=141.5&south=34.1&horizStride=1&accept=netcdf3',
'gebco-info.json':'https://coastwatch.pfeg.noaa.gov/erddap/info/GEBCO_2020/index.json',
'pb2002.geojson':'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json',
'jma-kanto.html':'https://www.data.jma.go.jp/eqev/data/1923_09_01_kanto/index.html',
'jma-oshima.html':'https://www.data.jma.go.jp/vois/data/tokyo/317_Izu-Oshima/317_index.html',
'jamstec-hatsushima.html':'https://www.jamstec.go.jp/j/about/press_release/20100129/',
}
def fetch(x):
 n,u=x
 try:
  with urllib.request.urlopen(u,timeout=60) as f:b=f.read()
  (src/n).write_bytes(b);return n,len(b),'OK'
 except Exception as e:return n,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for r in pool.map(fetch,urls.items()):print(r,flush=True)
(src/'requested-urls.json').write_text(json.dumps(urls,indent=2)+'\n')
