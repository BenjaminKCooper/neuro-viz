THREE.PMREMCubeUVPacker=function(t,e){this.cubeLods=t,this.numLods=e;var a=4*t[0].width,n=t[0].texture,i={format:n.format,magFilter:n.magFilter,minFilter:n.minFilter,type:n.type,generateMipmaps:n.generateMipmaps,anisotropy:n.anisotropy,encoding:n.encoding};this.CubeUVRenderTarget=new THREE.WebGLRenderTarget(a,a,i),this.CubeUVRenderTarget.texture.mapping=THREE.CubeUVReflectionMapping,this.camera=new THREE.OrthographicCamera(.5*-a,.5*a,.5*-a,.5*a,0,1e3),this.scene=new THREE.Scene,this.scene.add(this.camera),this.objects=[];var r=[];r.push(new THREE.Vector2(0,0)),r.push(new THREE.Vector2(1,0)),r.push(new THREE.Vector2(2,0)),r.push(new THREE.Vector2(0,1)),r.push(new THREE.Vector2(1,1)),r.push(new THREE.Vector2(2,1));var o=a;a=t[0].width;var u=0,s=4;this.numLods=Math.log2(t[0].width)-2;for(var p=0;p<this.numLods;p++){var c=.5*(o-o/s);a>16&&(s*=2);for(var v=a>16?6:1,l=0,m=0,E=a,d=0;d<v;d++){for(var h=0;h<6;h++){var g=this.getShader();g.uniforms.envMap.value=this.cubeLods[p].texture,g.envMap=this.cubeLods[p].texture,g.uniforms.faceIndex.value=h,g.uniforms.mapSize.value=E;var f=(g.uniforms.testColor.value,new THREE.Mesh(new THREE.PlaneGeometry(E,E,0),g));f.position.x=r[h].x*E-c+l,f.position.y=r[h].y*E-c+u+m,f.material.side=THREE.DoubleSide,this.scene.add(f),this.objects.push(f)}m+=1.75*E,l+=1.25*E,E/=2}u+=2*a,a>16&&(a/=2)}},THREE.PMREMCubeUVPacker.prototype={constructor:THREE.PMREMCubeUVPacker,update:function(t){var e=t.gammaInput,a=t.gammaOutput,n=t.toneMapping,i=t.toneMappingExposure;t.gammaInput=!1,t.gammaOutput=!1,t.toneMapping=THREE.LinearToneMapping,t.toneMappingExposure=1,t.render(this.scene,this.camera,this.CubeUVRenderTarget,!1),t.toneMapping=n,t.toneMappingExposure=i,t.gammaInput=e,t.gammaOutput=a},getShader:function(){var t=new THREE.ShaderMaterial({uniforms:{faceIndex:{value:0},mapSize:{value:0},envMap:{value:null},testColor:{value:new THREE.Vector3(1,1,1)}},vertexShader:"precision highp float;\t\t\t\tvarying vec2 vUv;\t\t\t\tvoid main() {\t\t\t\t\tvUv = uv;\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\t\t\t\t}",fragmentShader:"precision highp float;\t\t\t\tvarying vec2 vUv;\t\t\t\tuniform samplerCube envMap;\t\t\t\tuniform float mapSize;\t\t\t\tuniform vec3 testColor;\t\t\t\tuniform int faceIndex;\t\t\t\t\t\t\t\tvoid main() {\t\t\t\t\tvec3 sampleDirection;\t\t\t\t\tvec2 uv = vUv;\t\t\t\t\tuv = uv * 2.0 - 1.0;\t\t\t\t\tuv.y *= -1.0;\t\t\t\t\tif(faceIndex == 0) {\t\t\t\t\t\tsampleDirection = normalize(vec3(1.0, uv.y, -uv.x));\t\t\t\t\t} else if(faceIndex == 1) {\t\t\t\t\t\tsampleDirection = normalize(vec3(uv.x, 1.0, uv.y));\t\t\t\t\t} else if(faceIndex == 2) {\t\t\t\t\t\tsampleDirection = normalize(vec3(uv.x, uv.y, 1.0));\t\t\t\t\t} else if(faceIndex == 3) {\t\t\t\t\t\tsampleDirection = normalize(vec3(-1.0, uv.y, uv.x));\t\t\t\t\t} else if(faceIndex == 4) {\t\t\t\t\t\tsampleDirection = normalize(vec3(uv.x, -1.0, -uv.y));\t\t\t\t\t} else {\t\t\t\t\t\tsampleDirection = normalize(vec3(-uv.x, uv.y, -1.0));\t\t\t\t\t}\t\t\t\t\tvec4 color = envMapTexelToLinear( textureCube( envMap, sampleDirection ) );\t\t\t\t\tgl_FragColor = linearToOutputTexel( color );\t\t\t\t}",blending:THREE.CustomBlending,premultipliedAlpha:!1,blendSrc:THREE.OneFactor,blendDst:THREE.ZeroFactor,blendSrcAlpha:THREE.OneFactor,blendDstAlpha:THREE.ZeroFactor,blendEquation:THREE.AddEquation});return t}};