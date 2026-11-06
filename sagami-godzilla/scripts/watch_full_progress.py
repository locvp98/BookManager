"""Append real render observations to a timestamped production log."""
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
import json,time,fcntl
from full_progress import report,R
p=R/'out/full';lock=(p/'progress-watch.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
while True:
 d=report();now=datetime.now(ZoneInfo('Asia/Ho_Chi_Minh')).isoformat(timespec='seconds');logs=list((p/'map-clips').glob('*.render.log'));active=''
 if logs:
  latest=max(logs,key=lambda x:x.stat().st_mtime);lines=latest.read_text(errors='replace').splitlines();active=latest.stem+': '+(lines[-1] if lines else '') if d['groups']['map']['verified']<38 else 'all map rendering complete'
 record={'timeVietnam':now,**d,'latestRendererLine':active}
 with (p/'progress-timeline.jsonl').open('a') as f:f.write(json.dumps(record,ensure_ascii=False)+'\n')
 text=f"{now} | stage {d['stage']} | encoded QA {d.get('encodedShotChecks',0)}/154 | images {d['groups']['image']['verified']}/116 | maps {d['groups']['map']['verified']}/38 | sources {d['sourcePercent']}% | assembly {d.get('assembly',{})} | {active}"
 with (p/'progress-timeline.log').open('a') as f:f.write(text+'\n')
 print(text,flush=True)
 if d['finalVerified']:break
 time.sleep(30)
