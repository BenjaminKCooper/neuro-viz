var SetColorCommand=function(t,e,i){Command.call(this),this.type="SetColorCommand",this.name="Set "+e,this.updatable=!0,this.object=t,this.attributeName=e,this.oldValue=void 0!==t?this.object[this.attributeName].getHex():void 0,this.newValue=i};SetColorCommand.prototype={execute:function(){this.object[this.attributeName].setHex(this.newValue),this.editor.signals.objectChanged.dispatch(this.object)},undo:function(){this.object[this.attributeName].setHex(this.oldValue),this.editor.signals.objectChanged.dispatch(this.object)},update:function(t){this.newValue=t.newValue},toJSON:function(){var t=Command.prototype.toJSON.call(this);return t.objectUuid=this.object.uuid,t.attributeName=this.attributeName,t.oldValue=this.oldValue,t.newValue=this.newValue,t},fromJSON:function(t){Command.prototype.fromJSON.call(this,t),this.object=this.editor.objectByUuid(t.objectUuid),this.attributeName=t.attributeName,this.oldValue=t.oldValue,this.newValue=t.newValue}};