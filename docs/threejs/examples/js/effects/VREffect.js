THREE.VREffect=function(e,t){function i(e){h=e,e.length>0?o=e[0]:t&&t("HMD not available")}function r(){var t=f.isPresenting;if(f.isPresenting=void 0!==o&&o.isPresenting,f.isPresenting){var i=o.getEyeParameters("left"),r=i.renderWidth,n=i.renderHeight;t||(p=e.getPixelRatio(),w=e.getSize(),e.setPixelRatio(1),e.setSize(2*r,n,!1))}else t&&(e.setPixelRatio(p),e.setSize(w.width,w.height,m))}function n(e){var t=2/(e.leftTan+e.rightTan),i=(e.leftTan-e.rightTan)*t*.5,r=2/(e.upTan+e.downTan),n=(e.upTan-e.downTan)*r*.5;return{scale:[t,r],offset:[i,n]}}function a(e,t,i,r){t=void 0===t||t,i=void 0===i?.01:i,r=void 0===r?1e4:r;var a=t?-1:1,s=new THREE.Matrix4,o=s.elements,h=n(e);return o[0]=h.scale[0],o[1]=0,o[2]=h.offset[0]*a,o[3]=0,o[4]=0,o[5]=h.scale[1],o[6]=-h.offset[1]*a,o[7]=0,o[8]=0,o[9]=0,o[10]=r/(i-r)*-a,o[11]=r*i/(i-r),o[12]=0,o[13]=0,o[14]=a,o[15]=0,s.transpose(),s}function s(e,t,i,r){var n=Math.PI/180,s={upTan:Math.tan(e.upDegrees*n),downTan:Math.tan(e.downDegrees*n),leftTan:Math.tan(e.leftDegrees*n),rightTan:Math.tan(e.rightDegrees*n)};return a(s,t,i,r)}var o,h,d,l,u=new THREE.Vector3,g=new THREE.Vector3,c=null;"VRFrameData"in window&&(c=new window.VRFrameData),navigator.getVRDisplays&&navigator.getVRDisplays().then(i).catch(function(){console.warn("THREE.VREffect: Unable to get VR Displays")}),this.isPresenting=!1,this.scale=1;var f=this,w=e.getSize(),m=!1,p=e.getPixelRatio();this.getVRDisplay=function(){return o},this.setVRDisplay=function(e){o=e},this.getVRDisplays=function(){return console.warn("THREE.VREffect: getVRDisplays() is being deprecated."),h},this.setSize=function(t,i,r){if(w={width:t,height:i},m=r,f.isPresenting){var n=o.getEyeParameters("left");e.setPixelRatio(1),e.setSize(2*n.renderWidth,n.renderHeight,!1)}else e.setPixelRatio(p),e.setSize(t,i,r)};var v=e.domElement,y=[0,0,.5,1],R=[.5,0,.5,1];window.addEventListener("vrdisplaypresentchange",r,!1),this.setFullScreen=function(e){return new Promise(function(t,i){return void 0===o?void i(new Error("No VR hardware found.")):f.isPresenting===e?void t():void t(e?o.requestPresent([{source:v}]):o.exitPresent())})},this.requestPresent=function(){return this.setFullScreen(!0)},this.exitPresent=function(){return this.setFullScreen(!1)},this.requestAnimationFrame=function(e){return void 0!==o?o.requestAnimationFrame(e):window.requestAnimationFrame(e)},this.cancelAnimationFrame=function(e){void 0!==o?o.cancelAnimationFrame(e):window.cancelAnimationFrame(e)},this.submitFrame=function(){void 0!==o&&f.isPresenting&&o.submitFrame()},this.autoSubmitFrame=!0;var x=new THREE.PerspectiveCamera;x.layers.enable(1);var E=new THREE.PerspectiveCamera;E.layers.enable(2),this.render=function(t,i,r,n){if(o&&f.isPresenting){var a=t.autoUpdate;a&&(t.updateMatrixWorld(),t.autoUpdate=!1);var h=o.getEyeParameters("left"),w=o.getEyeParameters("right");u.fromArray(h.offset),g.fromArray(w.offset),Array.isArray(t)&&(console.warn("THREE.VREffect.render() no longer supports arrays. Use object.layers instead."),t=t[0]);var m,p,v=e.getSize(),P=o.getLayers();if(P.length){var T=P[0];m=null!==T.leftBounds&&4===T.leftBounds.length?T.leftBounds:y,p=null!==T.rightBounds&&4===T.rightBounds.length?T.rightBounds:R}else m=y,p=R;d={x:Math.round(v.width*m[0]),y:Math.round(v.height*m[1]),width:Math.round(v.width*m[2]),height:Math.round(v.height*m[3])},l={x:Math.round(v.width*p[0]),y:Math.round(v.height*p[1]),width:Math.round(v.width*p[2]),height:Math.round(v.height*p[3])},r?(e.setRenderTarget(r),r.scissorTest=!0):(e.setRenderTarget(null),e.setScissorTest(!0)),(e.autoClear||n)&&e.clear(),null===i.parent&&i.updateMatrixWorld(),i.matrixWorld.decompose(x.position,x.quaternion,x.scale),i.matrixWorld.decompose(E.position,E.quaternion,E.scale);var M=this.scale;return x.translateOnAxis(u,M),E.translateOnAxis(g,M),o.getFrameData?(o.depthNear=i.near,o.depthFar=i.far,o.getFrameData(c),x.projectionMatrix.elements=c.leftProjectionMatrix,E.projectionMatrix.elements=c.rightProjectionMatrix):(x.projectionMatrix=s(h.fieldOfView,!0,i.near,i.far),E.projectionMatrix=s(w.fieldOfView,!0,i.near,i.far)),r?(r.viewport.set(d.x,d.y,d.width,d.height),r.scissor.set(d.x,d.y,d.width,d.height)):(e.setViewport(d.x,d.y,d.width,d.height),e.setScissor(d.x,d.y,d.width,d.height)),e.render(t,x,r,n),r?(r.viewport.set(l.x,l.y,l.width,l.height),r.scissor.set(l.x,l.y,l.width,l.height)):(e.setViewport(l.x,l.y,l.width,l.height),e.setScissor(l.x,l.y,l.width,l.height)),e.render(t,E,r,n),r?(r.viewport.set(0,0,v.width,v.height),r.scissor.set(0,0,v.width,v.height),r.scissorTest=!1,e.setRenderTarget(null)):(e.setViewport(0,0,v.width,v.height),e.setScissorTest(!1)),a&&(t.autoUpdate=!0),void(f.autoSubmitFrame&&f.submitFrame())}e.render(t,i,r,n)},this.dispose=function(){window.removeEventListener("vrdisplaypresentchange",r,!1)}};