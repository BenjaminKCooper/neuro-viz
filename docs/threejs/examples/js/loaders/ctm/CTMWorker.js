importScripts("lzma.js","ctm.js"),self.onmessage=function(s){for(var e=[],a=0;a<s.data.offsets.length;a++){var t=new CTM.Stream(s.data.data);t.offset=s.data.offsets[a],e[a]=new CTM.File(t)}self.postMessage(e),self.close()};