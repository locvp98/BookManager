from pathlib import Path
import urllib.request,concurrent.futures,json
R=Path(__file__).resolve().parents[1];S=R/'production/full/sources'
urls={
'usgs-1923.json':'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1923-09-01&endtime=1923-09-02&minmagnitude=7&maxlatitude=38&minlatitude=32&minlongitude=136&maxlongitude=143',
'erc-sagami.html':'https://www.jishin.go.jp/regional_seismicity/rs_kaiko/k_sagami/',
'jma-oshima-overview.html':'https://www.data.jma.go.jp/vois/data/tokyo/317_Izu-Oshima/317_index.html',
'jamstec-seep.html':'https://www.jamstec.go.jp/j/about/press_release/20150128/',
'godzilla-official.html':'https://godzilla-movie2026.toho.co.jp/'
}
def f(kv):
 n,u=kv
 try:
  with urllib.request.urlopen(u,timeout=45) as h:b=h.read()
  (S/n).write_bytes(b);return n,len(b)
 except Exception as e:return n,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as p:
 for v in p.map(f,urls.items()):print(v,flush=True)
(S/'fact-requested-urls.json').write_text(json.dumps(urls,indent=2)+'\n')
