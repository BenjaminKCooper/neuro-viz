Sidebar.History=function(e){var n=e.signals,t=e.config,a=e.history,i=new UI.Panel;i.add(new UI.Text("HISTORY"));var r=new UI.THREE.Boolean(t.getKey("settings/history"),"persistent");r.setPosition("absolute").setRight("8px"),r.onChange(function(){var i=this.getValue();if(t.setKey("settings/history",i),i){alert("The history will be preserved across sessions.\nThis can have an impact on performance when working with textures.");var r=a.undos[a.undos.length-1],s=void 0!==r?r.id:0;e.history.enableSerialization(s)}else n.historyChanged.dispatch()}),i.add(r),i.add(new UI.Break,new UI.Break);var s=!1,o=new UI.Outliner(e);o.onChange(function(){s=!0,e.history.goToState(parseInt(o.getValue())),s=!1}),i.add(o);var d=function(){function e(e){var n=document.createElement("div");return n.value=e.id,n}var n=[];!function(t){for(var a=0,i=t.length;a<i;a++){var r=t[a],s=e(r);s.innerHTML="&nbsp;"+r.name,n.push(s)}}(a.undos),function(t,a){for(var i=t.length-1;i>=0;i--){var r=t[i],s=e(r);s.innerHTML="&nbsp;"+r.name,s.style.opacity=.3,n.push(s)}}(a.redos,"&nbsp;"),o.setOptions(n)};return d(),n.editorCleared.add(d),n.historyChanged.add(d),n.historyChanged.add(function(e){o.setValue(void 0!==e?e.id:null)}),i};