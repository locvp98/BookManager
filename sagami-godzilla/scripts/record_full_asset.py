from pathlib import Path
import sys,json,hashlib,shutil
from PIL import Image
R=Path(__file__).resolve().parents[1];sid,src=sys.argv[1:3];dst=R/f'public/full/scenes/{sid}.png';shutil.copy2(src,dst)
with Image.open(dst) as im:size=im.size
prompts=json.loads((R/'production/full/image-prompts.json').read_text());p=next(x for x in prompts if x['id']==sid)
a=R/'production/full/assets';a.mkdir(exist_ok=True)
record={'id':sid,'path':str(dst.relative_to(R)),'origin':'generated-new-for-sagami-full','prompt':p['prompt'],'sourceGeneratedFile':src,'dimensions':size,'sha256':hashlib.sha256(dst.read_bytes()).hexdigest(),'review':'pending','fictionalOrConceptualIllustration':True}
(a/(sid+'.json')).write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
print(sid,'created',size)
