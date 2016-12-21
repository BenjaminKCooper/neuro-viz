module("Line3"),test("constructor/equals",function(){var e=new THREE.Line3;ok(e.start.equals(zero3),"Passed!"),ok(e.end.equals(zero3),"Passed!"),e=new THREE.Line3(two3.clone(),one3.clone()),ok(e.start.equals(two3),"Passed!"),ok(e.end.equals(one3),"Passed!")}),test("copy/equals",function(){var e=new THREE.Line3(zero3.clone(),one3.clone()),o=(new THREE.Line3).copy(e);ok(o.start.equals(zero3),"Passed!"),ok(o.end.equals(one3),"Passed!"),e.start=zero3,e.end=one3,ok(o.start.equals(zero3),"Passed!"),ok(o.end.equals(one3),"Passed!")}),test("set",function(){var e=new THREE.Line3;e.set(one3,one3),ok(e.start.equals(one3),"Passed!"),ok(e.end.equals(one3),"Passed!")}),test("at",function(){var e=new THREE.Line3(one3.clone(),new THREE.Vector3(1,1,2));ok(e.at(-1).distanceTo(new THREE.Vector3(1,1,0))<1e-4,"Passed!"),ok(e.at(0).distanceTo(one3.clone())<1e-4,"Passed!"),ok(e.at(1).distanceTo(new THREE.Vector3(1,1,2))<1e-4,"Passed!"),ok(e.at(2).distanceTo(new THREE.Vector3(1,1,3))<1e-4,"Passed!")}),test("closestPointToPoint/closestPointToPointParameter",function(){var e=new THREE.Line3(one3.clone(),new THREE.Vector3(1,1,2));ok(0==e.closestPointToPointParameter(zero3.clone(),!0),"Passed!");var o=e.closestPointToPoint(zero3.clone(),!0);ok(o.distanceTo(new THREE.Vector3(1,1,1))<1e-4,"Passed!"),ok(e.closestPointToPointParameter(zero3.clone(),!1)==-1,"Passed!");var n=e.closestPointToPoint(zero3.clone(),!1);ok(n.distanceTo(new THREE.Vector3(1,1,0))<1e-4,"Passed!"),ok(1==e.closestPointToPointParameter(new THREE.Vector3(1,1,5),!0),"Passed!");var s=e.closestPointToPoint(new THREE.Vector3(1,1,5),!0);ok(s.distanceTo(new THREE.Vector3(1,1,2))<1e-4,"Passed!"),ok(0==e.closestPointToPointParameter(one3.clone(),!0),"Passed!");var t=e.closestPointToPoint(one3.clone(),!0);ok(t.distanceTo(one3.clone())<1e-4,"Passed!")});