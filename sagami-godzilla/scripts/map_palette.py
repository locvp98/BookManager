import numpy as np
colors=np.array([[9,28,53],[15,49,76],[26,79,104],[54,116,137],[102,156,164],[175,203,187],[58,93,67],[119,126,89],[175,165,139],[227,225,214]],float)
levels=np.array([-6000,-3000,-1800,-1000,-200,-1,0,600,1500,3000],float)
def rgb(z,dx=500):
 out=np.stack([np.interp(z,levels,colors[:,j]) for j in range(3)],-1);gy,gx=np.gradient(z,dx);light=np.clip((.6-.45*gx+.6*gy)/np.sqrt(1+gx*gx+gy*gy),-.7,.9);return np.clip(out*(.82+.36*light[...,None]),0,255).astype('uint8')
