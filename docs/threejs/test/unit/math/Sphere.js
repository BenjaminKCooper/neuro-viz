module("Sphere"),test("constructor",function(){var e=new THREE.Sphere;ok(e.center.equals(zero3),"Passed!"),ok(0==e.radius,"Passed!"),e=new THREE.Sphere(one3.clone(),1),ok(e.center.equals(one3),"Passed!"),ok(1==e.radius,"Passed!")}),test("copy",function(){var e=new THREE.Sphere(one3.clone(),1),n=(new THREE.Sphere).copy(e);ok(n.center.equals(one3),"Passed!"),ok(1==n.radius,"Passed!"),e.center=zero3,e.radius=0,ok(n.center.equals(one3),"Passed!"),ok(1==n.radius,"Passed!")}),test("set",function(){var e=new THREE.Sphere;ok(e.center.equals(zero3),"Passed!"),ok(0==e.radius,"Passed!"),e.set(one3,1),ok(e.center.equals(one3),"Passed!"),ok(1==e.radius,"Passed!")}),test("empty",function(){var e=new THREE.Sphere;ok(e.empty(),"Passed!"),e.set(one3,1),ok(!e.empty(),"Passed!")}),test("containsPoint",function(){var e=new THREE.Sphere(one3.clone(),1);ok(!e.containsPoint(zero3),"Passed!"),ok(e.containsPoint(one3),"Passed!")}),test("distanceToPoint",function(){var e=new THREE.Sphere(one3.clone(),1);ok(e.distanceToPoint(zero3)-.732<.001,"Passed!"),ok(e.distanceToPoint(one3)===-1,"Passed!")}),test("intersectsSphere",function(){var e=new THREE.Sphere(one3.clone(),1),n=new THREE.Sphere(zero3.clone(),1),o=new THREE.Sphere(zero3.clone(),.25);ok(e.intersectsSphere(n),"Passed!"),ok(!e.intersectsSphere(o),"Passed!")}),test("intersectsPlane",function(){var e=new THREE.Sphere(zero3.clone(),1),n=new THREE.Plane(new THREE.Vector3(0,1,0),1),o=new THREE.Plane(new THREE.Vector3(0,1,0),1.25),s=new THREE.Plane(new THREE.Vector3(0,-1,0),1.25);ok(e.intersectsPlane(n),"Passed!"),ok(!e.intersectsPlane(o),"Passed!"),ok(!e.intersectsPlane(s),"Passed!")}),test("clampPoint",function(){var e=new THREE.Sphere(one3.clone(),1);ok(e.clampPoint(new THREE.Vector3(1,1,3)).equals(new THREE.Vector3(1,1,2)),"Passed!"),ok(e.clampPoint(new THREE.Vector3(1,1,-3)).equals(new THREE.Vector3(1,1,0)),"Passed!")}),test("getBoundingBox",function(){var e=new THREE.Sphere(one3.clone(),1);ok(e.getBoundingBox().equals(new THREE.Box3(zero3,two3)),"Passed!"),e.set(zero3,0),ok(e.getBoundingBox().equals(new THREE.Box3(zero3,zero3)),"Passed!")}),test("applyMatrix4",function(){var e=new THREE.Sphere(one3.clone(),1),n=(new THREE.Matrix4).makeTranslation(1,-2,1);ok(e.clone().applyMatrix4(n).getBoundingBox().equals(e.getBoundingBox().applyMatrix4(n)),"Passed!")}),test("translate",function(){var e=new THREE.Sphere(one3.clone(),1);e.translate(one3.clone().negate()),ok(e.center.equals(zero3),"Passed!")});