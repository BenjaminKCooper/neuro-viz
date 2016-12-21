THREE.Animation=function(i,t){this.root=i,this.data=THREE.AnimationHandler.init(t),this.hierarchy=THREE.AnimationHandler.parse(i),this.currentTime=0,this.timeScale=1,this.isPlaying=!1,this.loop=!0,this.weight=0,this.interpolationType=THREE.AnimationHandler.LINEAR},THREE.Animation.prototype={constructor:THREE.Animation,keyTypes:["pos","rot","scl"],play:function(i,t){this.currentTime=void 0!==i?i:0,this.weight=void 0!==t?t:1,this.isPlaying=!0,this.reset(),THREE.AnimationHandler.play(this)},stop:function(){this.isPlaying=!1,THREE.AnimationHandler.stop(this)},reset:function(){for(var i=0,t=this.hierarchy.length;i<t;i++){var e=this.hierarchy[i];void 0===e.animationCache&&(e.animationCache={animations:{},blending:{positionWeight:0,quaternionWeight:0,scaleWeight:0}});var n=this.data.name,h=e.animationCache.animations,r=h[n];void 0===r&&(r={prevKey:{pos:0,rot:0,scl:0},nextKey:{pos:0,rot:0,scl:0},originalMatrix:e.matrix},h[n]=r);for(var a=0;a<3;a++){for(var s=this.keyTypes[a],o=this.data.hierarchy[i].keys[0],l=this.getNextKeyWith(s,i,1);l.time<this.currentTime&&l.index>o.index;)o=l,l=this.getNextKeyWith(s,i,l.index+1);r.prevKey[s]=o,r.nextKey[s]=l}}},resetBlendWeights:function(){for(var i=0,t=this.hierarchy.length;i<t;i++){var e=this.hierarchy[i],n=e.animationCache;if(void 0!==n){var h=n.blending;h.positionWeight=0,h.quaternionWeight=0,h.scaleWeight=0}}},update:function(){var i=[],t=new THREE.Vector3,e=new THREE.Vector3,n=new THREE.Quaternion,h=function(i,t){var e,n,h,a,s,o,l,y,g,c=[],p=[];return e=(i.length-1)*t,n=Math.floor(e),h=e-n,c[0]=0===n?n:n-1,c[1]=n,c[2]=n>i.length-2?n:n+1,c[3]=n>i.length-3?n:n+2,o=i[c[0]],l=i[c[1]],y=i[c[2]],g=i[c[3]],a=h*h,s=h*a,p[0]=r(o[0],l[0],y[0],g[0],h,a,s),p[1]=r(o[1],l[1],y[1],g[1],h,a,s),p[2]=r(o[2],l[2],y[2],g[2],h,a,s),p},r=function(i,t,e,n,h,r,a){var s=.5*(e-i),o=.5*(n-t);return(2*(t-e)+s+o)*a+(-3*(t-e)-2*s-o)*r+s*h+t};return function(r){if(this.isPlaying!==!1&&(this.currentTime+=r*this.timeScale,0!==this.weight)){var a=this.data.length;(this.currentTime>a||this.currentTime<0)&&(this.loop?(this.currentTime%=a,this.currentTime<0&&(this.currentTime+=a),this.reset()):this.stop());for(var s=0,o=this.hierarchy.length;s<o;s++)for(var l=this.hierarchy[s],y=l.animationCache.animations[this.data.name],g=l.animationCache.blending,c=0;c<3;c++){var p=this.keyTypes[c],m=y.prevKey[p],T=y.nextKey[p];if(this.timeScale>0&&T.time<=this.currentTime||this.timeScale<0&&m.time>=this.currentTime){for(m=this.data.hierarchy[s].keys[0],T=this.getNextKeyWith(p,s,1);T.time<this.currentTime&&T.index>m.index;)m=T,T=this.getNextKeyWith(p,s,T.index+1);y.prevKey[p]=m,y.nextKey[p]=T}var u=(this.currentTime-m.time)/(T.time-m.time),E=m[p],d=T[p];if(u<0&&(u=0),u>1&&(u=1),"pos"===p){if(this.interpolationType===THREE.AnimationHandler.LINEAR){e.x=E[0]+(d[0]-E[0])*u,e.y=E[1]+(d[1]-E[1])*u,e.z=E[2]+(d[2]-E[2])*u;var v=this.weight/(this.weight+g.positionWeight);l.position.lerp(e,v),g.positionWeight+=this.weight}else if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){i[0]=this.getPrevKeyWith("pos",s,m.index-1).pos,i[1]=E,i[2]=d,i[3]=this.getNextKeyWith("pos",s,T.index+1).pos,u=.33*u+.33;var R=h(i,u),v=this.weight/(this.weight+g.positionWeight);g.positionWeight+=this.weight;var H=l.position;if(H.x=H.x+(R[0]-H.x)*v,H.y=H.y+(R[1]-H.y)*v,H.z=H.z+(R[2]-H.z)*v,this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){var f=h(i,1.01*u);t.set(f[0],f[1],f[2]),t.sub(H),t.y=0,t.normalize();var A=Math.atan2(t.x,t.z);l.rotation.set(0,A,0)}}}else if("rot"===p)if(THREE.Quaternion.slerp(E,d,n,u),0===g.quaternionWeight)l.quaternion.copy(n),g.quaternionWeight=this.weight;else{var v=this.weight/(this.weight+g.quaternionWeight);THREE.Quaternion.slerp(l.quaternion,n,l.quaternion,v),g.quaternionWeight+=this.weight}else if("scl"===p){e.x=E[0]+(d[0]-E[0])*u,e.y=E[1]+(d[1]-E[1])*u,e.z=E[2]+(d[2]-E[2])*u;var v=this.weight/(this.weight+g.scaleWeight);l.scale.lerp(e,v),g.scaleWeight+=this.weight}}return!0}}}(),getNextKeyWith:function(i,t,e){var n=this.data.hierarchy[t].keys;for(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?e=e<n.length-1?e:n.length-1:e%=n.length;e<n.length;e++)if(void 0!==n[e][i])return n[e];return this.data.hierarchy[t].keys[0]},getPrevKeyWith:function(i,t,e){var n=this.data.hierarchy[t].keys;for(e=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?e>0?e:0:e>=0?e:e+n.length;e>=0;e--)if(void 0!==n[e][i])return n[e];return this.data.hierarchy[t].keys[n.length-1]}};