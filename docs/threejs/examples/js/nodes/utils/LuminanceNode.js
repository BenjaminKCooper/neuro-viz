THREE.LuminanceNode=function(e){THREE.TempNode.call(this,"fv1"),this.rgb=e},THREE.LuminanceNode.prototype=Object.create(THREE.TempNode.prototype),THREE.LuminanceNode.prototype.constructor=THREE.LuminanceNode,THREE.LuminanceNode.prototype.generate=function(e,n){return e.include("luminance_rgb"),e.format("luminance_rgb("+this.rgb.build(e,"v3")+")",this.getType(e),n)};