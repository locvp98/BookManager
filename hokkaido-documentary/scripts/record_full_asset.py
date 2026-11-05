from pathlib import Path
import sys,json,hashlib,shutil
from PIL import Image
root=Path(__file__).resolve().parents[1]
sid,source=sys.argv[1:3]
asset=next(x for x in json.loads((root/'production/full/image-prompts.json').read_text()) if x['id']==sid)
source=Path(source);dest=root/asset['path'];dest.parent.mkdir(parents=True,exist_ok=True)
im=Image.open(source);im.verify();shutil.copy(source,dest)
asset.update(status='generated; awaiting visual review',bytes=dest.stat().st_size,dimensions=Image.open(dest).size,sha256=hashlib.sha256(dest.read_bytes()).hexdigest())
(root/f'production/full/assets/{sid}.json').write_text(json.dumps(asset,ensure_ascii=False,indent=2))
print(sid,asset['dimensions'],asset['bytes'],flush=True)
