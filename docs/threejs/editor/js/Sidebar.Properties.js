Sidebar.Properties=function(e){function a(e){s(e.target.textContent)}function s(e){switch(n.setClass(""),d.setClass(""),i.setClass(""),r.setDisplay("none"),c.setDisplay("none"),C.setDisplay("none"),e){case"OBJECT":n.setClass("selected"),r.setDisplay("");break;case"GEOMETRY":d.setClass("selected"),c.setDisplay("");break;case"MATERIAL":i.setClass("selected"),C.setDisplay("")}}var t=(e.signals,new UI.Span),n=new UI.Text("OBJECT").onClick(a),d=new UI.Text("GEOMETRY").onClick(a),i=new UI.Text("MATERIAL").onClick(a),l=new UI.Div;l.setId("tabs"),l.add(n,d,i),t.add(l);var r=(new UI.Span).add(new Sidebar.Object(e));t.add(r);var c=(new UI.Span).add(new Sidebar.Geometry(e));t.add(c);var C=(new UI.Span).add(new Sidebar.Material(e));return t.add(C),s("OBJECT"),t};