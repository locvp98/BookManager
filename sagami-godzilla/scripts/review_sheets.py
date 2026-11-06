from pathlib import Path
import argparse
from PIL import Image,ImageOps,ImageDraw
r=Path(__file__).resolve().parents[1];p=argparse.ArgumentParser();p.add_argument('--from-id',type=int,default=1);p.add_argument('--to-id',type=int,default=114);a=p.parse_args()
for first in range(a.from_id,a.to_id+1,16):
 ids=[i for i in range(first,min(first+16,a.to_id+1)) if (r/f'public/full/scenes/image-{i:03}.png').exists()]
 sheet=Image.new('RGB',(1280,((len(ids)+3)//4)*210),'#071827');draw=ImageDraw.Draw(sheet)
 for j,i in enumerate(ids):
  p=r/f'public/full/scenes/image-{i:03}.png'
  with Image.open(p) as im:thumb=ImageOps.fit(im,(320,180))
  x=j%4*320;y=j//4*210;sheet.paste(thumb,(x,y));draw.text((x+10,y+186),p.stem,fill='white')
 sheet.save(r/f'production/full/review-{first:03}-{min(first+15,a.to_id):03}.jpg',quality=89)
