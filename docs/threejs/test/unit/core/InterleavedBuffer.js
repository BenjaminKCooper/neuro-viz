function checkInstanceAgainstCopy(e,a){ok(a instanceof THREE.InterleavedBuffer,"the clone has the correct type");for(var t=0;t<e.array.length;t++)ok(a.array[t]===e.array[t],"array was copied");ok(a.stride===e.stride,"stride was copied"),ok(a.dynamic===!0,"dynamic was copied")}module("InterleavedBuffer"),test("length and count",function(){var e=new THREE.InterleavedBuffer(new Float32Array([1,2,3,7,8,9]),3);ok(6===e.length,"length is calculated via array length"),ok(2===e.count,"count is calculated via array length / stride")}),test("copy",function(){var e=new Float32Array([1,2,3,7,8,9]),a=new THREE.InterleavedBuffer(e,3);a.setDynamic(!0),checkInstanceAgainstCopy(a,a.copy(a))}),test("clone",function(){var e=new Float32Array([1,2,3,7,8,9]),a=new THREE.InterleavedBuffer(e,3);a.setDynamic(!0),checkInstanceAgainstCopy(a,a.clone())}),test("set",function(){var e=new THREE.InterleavedBuffer(new Float32Array([1,2,3,7,8,9]),3);e.set([0,-1]),ok(0===e.array[0]&&e.array[1]===-1,"replace at first by default")});