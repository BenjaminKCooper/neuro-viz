THREE.ImageUtils={getNormalMap:function(t,a){function r(t,a){return[t[1]*a[2]-t[2]*a[1],t[2]*a[0]-t[0]*a[2],t[0]*a[1]-t[1]*a[0]]}function e(t,a){return[t[0]-a[0],t[1]-a[1],t[2]-a[2]]}function n(t){var a=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return[t[0]/a,t[1]/a,t[2]/a]}a|=1;var h=t.width,u=t.height,o=document.createElement("canvas");o.width=h,o.height=u;var g=o.getContext("2d");g.drawImage(t,0,0);for(var f=g.getImageData(0,0,h,u).data,s=g.createImageData(h,u),v=s.data,p=0;p<h;p++)for(var i=0;i<u;i++){var l=i-1<0?0:i-1,c=i+1>u-1?u-1:i+1,d=p-1<0?0:p-1,m=p+1>h-1?h-1:p+1,E=[],w=[0,0,f[4*(i*h+p)]/255*a];E.push([-1,0,f[4*(i*h+d)]/255*a]),E.push([-1,-1,f[4*(l*h+d)]/255*a]),E.push([0,-1,f[4*(l*h+p)]/255*a]),E.push([1,-1,f[4*(l*h+m)]/255*a]),E.push([1,0,f[4*(i*h+m)]/255*a]),E.push([1,1,f[4*(c*h+m)]/255*a]),E.push([0,1,f[4*(c*h+p)]/255*a]),E.push([-1,1,f[4*(c*h+d)]/255*a]);for(var D=[],I=E.length,M=0;M<I;M++){var T=E[M],R=E[(M+1)%I];T=e(T,w),R=e(R,w),D.push(n(r(T,R)))}for(var x=[0,0,0],M=0;M<D.length;M++)x[0]+=D[M][0],x[1]+=D[M][1],x[2]+=D[M][2];x[0]/=D.length,x[1]/=D.length,x[2]/=D.length;var H=4*(i*h+p);v[H]=(x[0]+1)/2*255|0,v[H+1]=(x[1]+1)/2*255|0,v[H+2]=255*x[2]|0,v[H+3]=255}return g.putImageData(s,0,0),o},generateDataTexture:function(t,a,r){for(var e=t*a,n=new Uint8Array(3*e),h=Math.floor(255*r.r),u=Math.floor(255*r.g),o=Math.floor(255*r.b),g=0;g<e;g++)n[3*g]=h,n[3*g+1]=u,n[3*g+2]=o;var f=new THREE.DataTexture(n,t,a,THREE.RGBFormat);return f.needsUpdate=!0,f}};