"""Timestamp the final comparison and upload stages while the worker is running."""
from pathlib import Path
import json,time,fcntl
from datetime import datetime
from zoneinfo import ZoneInfo
R=Path(__file__).resolve().parents[1];W=R/'out/full';lock=(W/'delivery-watch.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
while True:
 d=json.loads((W/'delivery.json').read_text());lines=(W/'final-delivery.log').read_text(errors='replace').splitlines();scenes=[l for l in lines if l.startswith('SAMPLED ')];now=datetime.now(ZoneInfo('Asia/Ho_Chi_Minh')).isoformat(timespec='seconds');r={'timeVietnam':now,'stage':d['stage'],'comparedScenes':len(scenes),'totalScenes':154,'lastComparedScene':scenes[-1].removeprefix('SAMPLED ') if scenes else None}
 text=f"{now} | {d['stage']} | compared {len(scenes)}/154 scenes | last {r['lastComparedScene']}"
 with (W/'delivery-timeline.log').open('a') as f:f.write(text+'\n')
 with (W/'delivery-timeline.jsonl').open('a') as f:f.write(json.dumps(r)+'\n')
 print(text,flush=True)
 if d['stage'].startswith(('delivered;','delivery stopped','delivery blocked')):break
 time.sleep(30)
