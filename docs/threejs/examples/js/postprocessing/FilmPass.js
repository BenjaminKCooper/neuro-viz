THREE.FilmPass=function(e,s,i,r){THREE.Pass.call(this),void 0===THREE.FilmShader&&console.error("THREE.FilmPass relies on THREE.FilmShader");var t=THREE.FilmShader;this.uniforms=THREE.UniformsUtils.clone(t.uniforms),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),void 0!==r&&(this.uniforms.grayscale.value=r),void 0!==e&&(this.uniforms.nIntensity.value=e),void 0!==s&&(this.uniforms.sIntensity.value=s),void 0!==i&&(this.uniforms.sCount.value=i),this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.FilmPass.prototype=Object.assign(Object.create(THREE.Pass.prototype),{constructor:THREE.FilmPass,render:function(e,s,i,r,t){this.uniforms.tDiffuse.value=i.texture,this.uniforms.time.value+=r,this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,s,this.clear)}});