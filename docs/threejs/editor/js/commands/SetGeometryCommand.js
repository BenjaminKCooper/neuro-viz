var SetGeometryCommand=function(e,t){Command.call(this),this.type="SetGeometryCommand",this.name="Set Geometry",this.updatable=!0,this.object=e,this.oldGeometry=void 0!==e?e.geometry:void 0,this.newGeometry=t};SetGeometryCommand.prototype={execute:function(){this.object.geometry.dispose(),this.object.geometry=this.newGeometry,this.object.geometry.computeBoundingSphere(),this.editor.signals.geometryChanged.dispatch(this.object),this.editor.signals.sceneGraphChanged.dispatch()},undo:function(){this.object.geometry.dispose(),this.object.geometry=this.oldGeometry,this.object.geometry.computeBoundingSphere(),this.editor.signals.geometryChanged.dispatch(this.object),this.editor.signals.sceneGraphChanged.dispatch()},update:function(e){this.newGeometry=e.newGeometry},toJSON:function(){var e=Command.prototype.toJSON.call(this);return e.objectUuid=this.object.uuid,e.oldGeometry=this.object.geometry.toJSON(),e.newGeometry=this.newGeometry.toJSON(),e},fromJSON:function(e){function t(e){var t=new THREE.ObjectLoader;return t.parseGeometries([e])[e.uuid]}Command.prototype.fromJSON.call(this,e),this.object=this.editor.objectByUuid(e.objectUuid),this.oldGeometry=t(e.oldGeometry),this.newGeometry=t(e.newGeometry)}};