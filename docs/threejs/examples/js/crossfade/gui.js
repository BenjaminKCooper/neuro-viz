function initGUI(){var t=new dat.GUI;t.add(transitionParams,"useTexture").onChange(function(t){transition.useTexture(t)}),t.add(transitionParams,"loopTexture"),t.add(transitionParams,"texture",{Perlin:0,Squares:1,Cells:2,Distort:3,Gradient:4,Radial:5}).onChange(function(t){transition.setTexture(t)}).listen(),t.add(transitionParams,"textureThreshold",0,1,.01).onChange(function(t){transition.setTextureThreshold(t)}),t.add(transitionParams,"animateTransition"),t.add(transitionParams,"transition",0,1,.01).listen(),t.add(transitionParams,"transitionSpeed",.5,5,.01)}var transitionParams={useTexture:!0,transition:.5,transitionSpeed:2,texture:5,loopTexture:!0,animateTransition:!0,textureThreshold:.3};