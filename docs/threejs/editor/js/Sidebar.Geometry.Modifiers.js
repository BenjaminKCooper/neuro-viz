Sidebar.Geometry.Modifiers=function(e,t){var n=e.signals,o=(new UI.Row).setPaddingLeft("90px"),r=t.geometry,a=new UI.Button("Compute Vertex Normals");return a.onClick(function(){r.computeVertexNormals(),r instanceof THREE.BufferGeometry?r.attributes.normal.needsUpdate=!0:r.normalsNeedUpdate=!0,n.geometryChanged.dispatch(t)}),o.add(a),o};