THREE.ResolutionNode=function(e){THREE.Vector2Node.call(this),this.requestUpdate=!0,this.renderer=e},THREE.ResolutionNode.prototype=Object.create(THREE.Vector2Node.prototype),THREE.ResolutionNode.prototype.constructor=THREE.ResolutionNode,THREE.ResolutionNode.prototype.updateFrame=function(e){var t=this.renderer.getSize();this.x=t.width,this.y=t.height};