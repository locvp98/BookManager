from pathlib import Path
import subprocess,json
from faster_whisper import WhisperModel
R=Path(__file__).resolve().parents[1];d=R/'out/full/asr';d.mkdir(exist_ok=True)
clips=[('title',12.8,20),('repeated-geology',510.5,527.5),('repeated-volcano',821,837),('eruption-date',878.2,893),('broken-ending',1402,1419.5)]
print('Loading local Japanese speech recognition model',flush=True)
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=2,num_workers=1)
result=[]
for name,a,b in clips:
 p=d/(name+'.wav');subprocess.run(['ffmpeg','-v','error','-y','-ss',str(a),'-i',str(R/'public/narration.mp3'),'-t',str(b-a),'-ar','16000','-ac','1',str(p)],check=True)
 from scipy.io.wavfile import read
 import numpy as np
 rate,audio=read(p);audio=audio.astype(np.float32)/32768
 segments,info=model.transcribe(audio,language='ja',beam_size=3,vad_filter=False)
 words=[{'start':a+s.start,'end':a+s.end,'text':s.text,'averageLogProbability':s.avg_logprob} for s in segments]
 result.append({'clip':name,'sourceRange':[a,b],'segments':words});print(name,words,flush=True)
(R/'production/full/audio-audit-asr.json').write_text(json.dumps({'method':'Local faster-whisper-small Japanese recognition; imperfect machine transcription, not a human listening certificate','audioPreserved':True,'clips':result},ensure_ascii=False,indent=2)+'\n')
