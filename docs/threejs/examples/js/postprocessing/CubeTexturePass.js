THREE.CubeTexturePass=function(e,t,a){THREE.Pass.call(this),this.camera=e,this.needsSwap=!1,this.cubeShader=THREE.ShaderLib.cube,this.cubeMesh=new THREE.Mesh(new THREE.BoxBufferGeometry(10,10,10),new THREE.ShaderMaterial({uniforms:this.cubeShader.uniforms,vertexShader:this.cubeShader.vertexShader,fragmentShader:this.cubeShader.fragmentShader,depthTest:!1,depthWrite:!1,side:THREE.BackSide})),this.envMap=t,this.opacity=void 0!==a?a:1,this.cubeScene=new THREE.Scene,this.cubeCamera=new THREE.PerspectiveCamera,this.cubeScene.add(this.cubeMesh)},THREE.CubeTexturePass.prototype=Object.assign(Object.create(THREE.Pass.prototype),{constructor:THREE.CubeTexturePass,render:function(e,t,a,r,i){var s=e.autoClear;e.autoClear=!1,this.cubeCamera.projectionMatrix.copy(this.camera.projectionMatrix),this.cubeCamera.quaternion.setFromRotationMatrix(this.camera.matrixWorld),this.cubeMesh.material.uniforms.tCube.value=this.envMap,this.cubeMesh.material.uniforms.opacity.value=this.opacity,this.cubeMesh.material.transparent=this.opacity<1,e.render(this.cubeScene,this.cubeCamera,this.renderToScreen?null:a,this.clear),e.autoClear=s}});