"""Original synthetic West-African highlife-inspired instrumental prototype cue.
No sampled commercial tracks. Copyright status for AI-assisted works varies by law;
this demo makes no claim about exclusive rights or about matching an existing song.
"""
import numpy as np, wave
from pathlib import Path
SR=22050; BPM=114; BEAT=60/BPM; BARS=18; DURATION=BARS*4*BEAT
n=int(SR*DURATION); track=np.zeros(n,np.float32); rng=np.random.default_rng(240925)

def add(at, wave_data, level=1):
    start=int(at*SR); stop=min(n,start+len(wave_data))
    if start<n:track[max(0,start):stop]+=wave_data[max(0,-start):stop-start]*level

def pluck(freq,dur=.28,flavor=.0):
    t=np.arange(int(SR*dur))/SR
    env=(1-np.exp(-65*t))*np.exp(-9*t)
    trem=1+.06*np.sin(2*np.pi*5.5*t)
    w=(np.sin(2*np.pi*freq*t)+.33*np.sin(2*np.pi*2*freq*t)+.13*np.sin(2*np.pi*3*freq*t))
    return (w*env*trem).astype(np.float32)

def bass(freq,dur=.39):
    t=np.arange(int(SR*dur))/SR
    env=np.exp(-5.7*t)*np.minimum(1,45*t)
    w=np.sin(2*np.pi*freq*t)+.17*np.sin(2*np.pi*2*freq*t)
    return (w*env).astype(np.float32)

def kick():
    t=np.arange(int(SR*.27))/SR
    phase=2*np.pi*(64*t+100*.028*(1-np.exp(-t/.028)))
    return (np.sin(phase)*np.exp(-19*t)).astype(np.float32)

def snare():
    t=np.arange(int(SR*.19))/SR;noise=rng.normal(size=t.size)
    return (noise*np.exp(-28*t)+.3*np.sin(2*np.pi*166*t)*np.exp(-25*t)).astype(np.float32)

def hat(open=False):
    t=np.arange(int(SR*(.2 if open else .06)))/SR;noise=rng.normal(size=t.size)
    hp=noise-np.convolve(noise,np.ones(15)/15,mode='same')
    return (hp*np.exp((-22 if open else -75)*t)).astype(np.float32)

prog=[(174.61,[174.61,220,261.63,349.23]),(196,[196,246.94,293.66,392]),(130.81,[164.81,196,233.08,293.66]),(174.61,[174.61,220,261.63,349.23])]
for bar in range(BARS):
    root,chord=prog[bar%4]; b0=bar*4*BEAT
    for j in range(4):
        t=b0+j*BEAT
        add(t,kick(),.40 if j in (0,2) else .22)
        if j in (1,3):add(t,snare(),.16)
        add(t,hat(j==3),.055)
        add(t+.5*BEAT,hat(),.038)
    for beat_index, duration_scale in [(0,.38),(1.5,.24),(2,.38),(3.5,.22)]:
        f=root * (1 if beat_index in (0,2) else 1.5)
        add(b0+beat_index*BEAT,bass(f/2),.36)
    guitar=[(0,.0),(1,.5),(2,0),(2,.75),(3,.5)]
    for j,(b,cross) in enumerate(guitar):
        freq=chord[(j+bar)%4] * (2 if j%3==1 else 1)
        add(b0+(b+cross)*BEAT,pluck(freq,.29),.17)
        add(b0+(b+cross)*BEAT+.12,pluck(freq*1.005,.20),.047)
    if bar%4 in (1,3):
        for j,idx in enumerate([1,2,3,2,1]):
            add(b0+(j*.65+.28)*BEAT,pluck(chord[idx%4]*2,.16),.075)
# Soft leveling and short fade, no abrupt ending.
fade=int(.8*SR);track[:int(.09*SR)]*=np.linspace(0,1,int(.09*SR));track[-fade:]*=np.linspace(1,0,fade)
track=.78*np.tanh(track*1.4); pcm=np.int16(np.clip(track,-1,1)*32767)
out=Path(__file__).with_name('original-highlife-demo.wav')
with wave.open(str(out),'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
print('Produced',out,'duration',round(DURATION,2),'seconds')