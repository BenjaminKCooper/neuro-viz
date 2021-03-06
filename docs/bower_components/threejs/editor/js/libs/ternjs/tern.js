!function(e,t){return"object"==typeof exports&&"object"==typeof module?t(exports,require("./infer"),require("./signal"),require("acorn"),require("acorn/dist/walk")):"function"==typeof define&&define.amd?define(["exports","./infer","./signal","acorn/dist/acorn","acorn/dist/walk"],t):void t(e.tern||(e.tern={}),tern,tern.signal,acorn,acorn.walk)}(this,function(e,t,n,r,i){"use strict";function s(e,t){this.name=e,this.parent=t,this.scope=this.text=this.ast=this.lineOffsets=null}function o(e,n,r){e.text=r.options.stripCRs?n.replace(/\r\n/g,"\n"):n,t.withContext(r.cx,function(){e.ast=t.parse(e.text,r.passes,{directSourceFile:e,allowReturnOutsideFunction:!0})}),e.lineOffsets=null}function a(e,n,r){if(n.query&&!W.hasOwnProperty(n.query.type))return r("No query type '"+n.query.type+"' defined");var i=n.query;i||r(null,{});var s=n.files||[];s.length&&++e.uses;for(var o=0;o<s.length;++o){var a=s[o];"delete"==a.type?e.delFile(a.name):u(e,a.name,null,"full"==a.type?a.text:null)}var f="number"==typeof n.timeout?[n.timeout]:null;if(!i)return void p(e,f,function(){});var l=W[i.type];if(l.takesFile){if("string"!=typeof i.file)return r(".query.file must be a string");/^#/.test(i.file)||u(e,i.file,null)}p(e,f,function(n){function o(){var t;try{t=l.run(e,i,a)}catch(t){return e.options.debug&&"TernError"!=t.name&&console.error(t.stack),r(t)}r(null,t)}if(n)return r(n);var a=l.takesFile&&g(e,s,i.file);return l.fullFile&&"part"==a.type?r("Can't run a "+i.type+" query on a file fragment"):void t.withContext(e.cx,f?function(){t.withTimeout(f[0],o)}:o)})}function f(e,n){return t.withContext(e.cx,function(){n.scope=e.cx.topScope,e.signal("beforeLoad",n),t.analyze(n.ast,n.name,n.scope,e.passes),e.signal("afterLoad",n)}),n}function u(e,t,n,r){var i=e.findFile(t);if(i)return null!=r&&(i.scope&&(e.needsPurge.push(t),i.scope=null),o(i,r,e)),void(m(e,i.parent)>m(e,n)&&(i.parent=n,i.excluded&&(i.excluded=null)));var a=new s(t,n);e.files.push(a),e.fileMap[t]=a,null!=r?o(a,r,e):e.options.async?(e.startAsyncAction(),e.options.getFile(t,function(t,n){o(a,n||"",e),e.finishAsyncAction(t)})):o(a,e.options.getFile(t)||"",e)}function l(e,t,n){var r=function(){e.off("everythingFetched",r),clearTimeout(i),p(e,t,n)};e.on("everythingFetched",r);var i=setTimeout(r,e.options.fetchTimeout)}function p(e,n,r){if(e.pending)return l(e,n,r);var i=e.fetchError;if(i)return e.fetchError=null,r(i);e.needsPurge.length>0&&t.withContext(e.cx,function(){t.purge(e.needsPurge),e.needsPurge.length=0});for(var s=!0,o=0;o<e.files.length;){for(var a=[];o<e.files.length;++o){var u=e.files[o];null==u.text?s=!1:null!=u.scope||u.excluded||a.push(u)}a.sort(function(t,n){return m(e,t.parent)-m(e,n.parent)});for(var p=0;p<a.length;p++){var u=a[p];if(u.parent&&!x(e,u))u.excluded=!0;else if(n){var c=+new Date;t.withTimeout(n[0],function(){f(e,u)}),n[0]-=+new Date-c}else f(e,u)}}s?r():l(e,n,r)}function c(e){var t=e.indexOf("\n");return t<0?e:e.slice(0,t)}function d(e,t,n){var r=Math.max(0,n-500),i=null;if(!/^\s*$/.test(e))for(;;){var s=t.indexOf(e,r);if(s<0||s>n+500)break;(null==i||Math.abs(i-n)>Math.abs(s-n))&&(i=s),r=s+e.length}return i}function h(e){for(var t=0;e;++t,e=e.prev);return t}function y(e){var t=new Error(e);return t.name="TernError",t}function g(e,n,r){var s=r.match(/^#(\d+)$/);if(!s)return e.findFile(r);var o=n[s[1]];if(!o||"delete"==o.type)throw y("Reference to unknown file "+r);if("full"==o.type)return e.findFile(o.name);var a=o.backing=e.findFile(o.name),f=o.offset;o.offsetLines&&(f={line:o.offsetLines,ch:0}),o.offset=f=U(a,null==o.offsetLines?o.offset:{line:o.offsetLines,ch:0},!0);var u,l,p=c(o.text),g=d(p,a.text,f),v=null==g?Math.max(0,a.text.lastIndexOf("\n",f)):g;return t.withContext(e.cx,function(){t.purge(o.name,v,v+o.text.length);var n,r=o.text;if(n=r.match(/(?:"([^"]*)"|([\w$]+))\s*:\s*function\b/)){var s=i.findNodeAround(o.backing.ast,v,"ObjectExpression");s&&s.node.objType&&(u={type:s.node.objType,prop:n[2]||n[1]})}if(g&&(n=p.match(/^(.*?)\bfunction\b/))){for(var f=n[1].length,c="",d=0;d<f;++d)c+=" ";r=c+r.slice(f),l=!0}var y=t.scopeAt(a.ast,v,a.scope),m=t.scopeAt(a.ast,v+r.length,a.scope),b=o.scope=h(y)<h(m)?m:y;o.ast=t.parse(r,e.passes,{directSourceFile:o,allowReturnOutsideFunction:!0}),t.analyze(o.ast,o.name,b,e.passes);e:if(u||l){var x=t.scopeAt(o.ast,p.length,y);if(!x.fnType)break e;if(u){var w=u.type.getProp(u.prop);w.addType(x.fnType)}else if(l){var F=t.scopeAt(a.ast,v+p.length,a.scope);if(F==y||!F.fnType)break e;var O=F.fnType,A=x.fnType;if(!A||A.name!=O.name&&O.name)break e;for(var d=0,P=Math.min(O.args.length,A.args.length);d<P;++d)O.args[d].propagate(A.args[d]);O.self.propagate(A.self),A.retval.propagate(O.retval)}}}),o}function v(e){var t=0;return i.simple(e,{Expression:function(){++t}}),t}function m(e,t){for(var n=0;t;)t=e.findFile(t).parent,++n;return n}function b(e,t){for(;;){var n=e.findFile(t.parent);if(!n.parent)break;t=n}return t.name}function x(e,t){var n=b(e,t),r=v(t.ast),i=e.budgets[n];return null==i&&(i=e.budgets[n]=e.options.dependencyBudget),!(i<r)&&(e.budgets[n]=i-r,!0)}function w(e){return"number"==typeof e||"object"==typeof e&&"number"==typeof e.line&&"number"==typeof e.ch}function F(e){if(e.query){if("string"!=typeof e.query.type)return".query.type must be a string";if(e.query.start&&!w(e.query.start))return".query.start must be a position";if(e.query.end&&!w(e.query.end))return".query.end must be a position"}if(e.files){if(!Array.isArray(e.files))return"Files property must be an array";for(var t=0;t<e.files.length;++t){var n=e.files[t];if("object"!=typeof n)return".files[n] must be objects";if("string"!=typeof n.name)return".files[n].name must be a string";if("delete"!=n.type){if("string"!=typeof n.text)return".files[n].text must be a string";if("part"==n.type){if(!w(n.offset)&&"number"!=typeof n.offsetLines)return".files[n].offset must be a position"}else if("full"!=n.type)return'.files[n].type must be "full" or "part"'}}}}function O(e,t){for(var n=e.text,r=e.lineOffsets||(e.lineOffsets=[0]),i=0,s=0,o=Math.min(Math.floor(t/J),r.length-1),i=r[o],s=o*J;s<t;){if(++s,i=n.indexOf("\n",i)+1,0===i)return null;s%J===0&&r.push(i)}return i}function A(e,t){if(!e)return{line:0,ch:0};for(var n,r,i=e.lineOffsets||(e.lineOffsets=[0]),s=e.text,o=i.length-1;o>=0;--o)i[o]<=t&&(n=o*J,r=i[o]);for(;;){var a=s.indexOf("\n",r);if(a>=t||a<0)break;r=a+1,++n}return{line:n,ch:t-r}}function P(e){for(var t in e)null==e[t]&&delete e[t];return e}function j(e,t,n){null!=n&&(e[t]=n)}function k(e,t){"string"!=typeof e&&(e=e.name,t=t.name);var n=/^[A-Z]/.test(e),r=/^[A-Z]/.test(t);return n==r?e<t?-1:e==t?0:1:n?1:-1}function C(e,t,n){return"Literal"==e.type&&"string"==typeof e.value&&e.start==t-1&&e.end<=n+1}function T(e,t){for(var n=0;n<e.properties.length;n++){var r=e.properties[n];if(r.key.start<=t&&r.key.end>=t)return r}}function q(e,n,i){function s(r,i,s,o){if((!x&&n.omitObjectPrototype===!1||i!=e.cx.protos.Object||c)&&!(n.filter!==!1&&c&&0!==(n.caseInsensitive?r.toLowerCase():r).indexOf(c)||p&&p.props[r])){for(var a=0;a<d.length;++a){var f=d[a];if((w?f.name:f)==r)return}var u=w?{name:r}:r;if(d.push(u),i&&(n.types||n.docs||n.urls||n.origins)){var l=i.props[r];t.resetGuessing();var h=l.getType();u.guess=t.didGuess(),n.types&&(u.type=t.toString(l)),n.docs&&j(u,"doc",l.doc||h&&h.doc),n.urls&&j(u,"url",l.url||h&&h.url),n.origins&&j(u,"origin",l.origin||h&&h.origin)}n.depths&&(u.depth=s),w&&o&&o(u)}}if(null==n.end)throw y("missing .query.end field");if(e.passes.completion)for(var o=0;o<e.passes.completion.length;o++){var a=e.passes.completion[o](i,n);if(a)return a}for(var f=U(i,n.end),u=f,l=i.text;f&&r.isIdentifierChar(l.charCodeAt(f-1));)--f;if(n.expandWordForward!==!1)for(;u<l.length&&r.isIdentifierChar(l.charCodeAt(u));)++u;var p,c=l.slice(f,u),d=[];n.caseInsensitive&&(c=c.toLowerCase());var h,g,v,m,b,x,w=n.types||n.depths||n.docs||n.urls||n.origins,F=t.findExpressionAround(i.ast,null,f,i.scope);if(F)if("MemberExpression"==F.node.type&&F.node.object.end<f)b=F;else if(C(F.node,f,u)){var O=t.parentNode(F.node,i.ast);"MemberExpression"==O.type&&O.property==F.node&&(b={node:O,state:F.state})}else if("ObjectExpression"==F.node.type){var A=T(F.node,u);A?(x=F,g=m=A.key.name):c||/:\s*$/.test(i.text.slice(0,f))||(x=F,g=m=!0)}if(x)v=t.typeFromContext(i.ast,x),p=x.node.objType;else if(b)g=b.node.property,g="Literal"==g.type?g.value.slice(1):g.name,b.node=b.node.object,v=t.expressionType(b);else if("."==l.charAt(f-1)){for(var P=f-1;P&&("."==l.charAt(P-1)||r.isIdentifierChar(l.charCodeAt(P-1)));)P--;var q=l.slice(P,f-1);q&&(v=t.def.parsePath(q,i.scope).getObjType(),g=c)}if(null!=g){if(e.cx.completingProperty=g,v&&t.forAllPropertiesOf(v,s),!d.length&&n.guess!==!1&&v&&v.guessProperties&&v.guessProperties(function(e,t,n){e!=g&&"✖"!=e&&s(e,t,n)}),!d.length&&c.length>=2&&n.guess!==!1)for(var g in e.cx.props)s(g,e.cx.props[g][0],0);h="memberCompletion"}else t.forAllLocalsAt(i.ast,f,i.scope,s),n.includeKeywords&&X.forEach(function(e){s(e,null,0,function(e){e.isKeyword=!0})}),h="variableCompletion";return e.passes[h]&&e.passes[h].forEach(function(e){e(i,f,u,s)}),n.sort!==!1&&d.sort(k),e.cx.completingProperty=null,{start:V(n,i,f),end:V(n,i,u),isProperty:!!g,isObjectKey:!!m,completions:d}}function E(e,t){var n=t.prefix,r=[];for(var i in e.cx.props)"<i>"==i||n&&0!==i.indexOf(n)||r.push(i);return t.sort!==!1&&r.sort(k),{completions:r}}function N(e,t,n){var r=Y(e,t,n);if(r)return r;throw y("No expression at the given position.")}function M(e){return e&&(e=e.getType())&&e instanceof t.Obj?e:null}function L(e,n,r,i){var s;if(i&&(t.resetGuessing(),s=t.expressionType(i)),e.passes.typeAt){var o=U(r,n.end);e.passes.typeAt.forEach(function(e){s=e(r,o,i,s)})}if(!s)throw y("No type found at the given position.");var a;if("ObjectExpression"==i.node.type&&null!=n.end&&(a=T(i.node,U(r,n.end)))){var f=a.key.name,u=M(t.typeFromContext(r.ast,i));if(u&&u.hasProp(f))s=u.hasProp(f);else{var l=M(s);l&&l.hasProp(f)&&(s=l.hasProp(f))}}return s}function I(e,n,r){var i,s=Y(r,n),o=L(e,n,r,s),a=o;if(o=n.preferFunction?o.getFunctionType()||o.getType():o.getType(),s&&("Identifier"==s.node.type?i=s.node.name:"MemberExpression"!=s.node.type||s.node.computed||(i=s.node.property.name)),null!=n.depth&&"number"!=typeof n.depth)throw y(".query.depth must be a number");var f={guess:t.didGuess(),type:t.toString(a,n.depth),name:o&&o.name,exprName:i};return o&&S(o,f),!f.doc&&a.doc&&(f.doc=a.doc),P(f)}function R(e,n,r){var i=Y(r,n),s=L(e,n,r,i),o={url:s.url,doc:s.doc,type:t.toString(s)},a=s.getType();return a&&S(a,o),P(o)}function S(e,n){n.url||(n.url=e.url),n.doc||(n.doc=e.doc),n.origin||(n.origin=e.origin);var r,i=t.cx().protos;!n.url&&!n.doc&&e.proto&&(r=e.proto.hasCtor)&&e.proto!=i.Object&&e.proto!=i.Function&&e.proto!=i.Array&&(n.url=r.url,n.doc=r.doc)}function G(e,n,r){var i=Y(r,n),s=L(e,n,r,i);if(t.didGuess())return{};var o=_(s),a={url:s.url,doc:s.doc,origin:s.origin};if(s.types)for(var f=s.types.length-1;f>=0;--f){var u=s.types[f];S(u,a),o||(o=_(u))}if(o&&o.node){var l=o.node.sourceFile||e.findFile(o.origin),p=V(n,l,o.node.start),c=V(n,l,o.node.end);a.start=p,a.end=c,a.file=o.origin;var d=Math.max(0,o.node.start-50);a.contextOffset=o.node.start-d,a.context=l.text.slice(d,d+50)}else o&&(a.file=o.origin,ee(e,n,o,a));return P(a)}function $(e,n,r,i,s){function o(e){return function(t,r){if(s)for(var i=r;i!=f;i=i.prev){var o=i.hasProp(s);if(o)throw y("Renaming `"+a+"` to `"+s+"` would make a variable at line "+(A(e,t.start).line+1)+" point to the definition at line "+(A(e,o.name.start).line+1))}l.push({file:e.name,start:V(n,e,t.start),end:V(n,e,t.end)})}}for(var a=i.node.name,f=i.state;f&&!(a in f.props);f=f.prev);if(!f)throw y("Could not find a definition for "+a+" "+!!e.cx.topScope.props.x);var u,l=[];if(f.originNode){if(u="local",s){for(var p=f.prev;p&&!(s in p.props);p=p.prev);p&&t.findRefs(f.originNode,f,s,p,function(e){throw y("Renaming `"+a+"` to `"+s+"` would shadow the definition used at line "+(A(r,e.start).line+1))})}t.findRefs(f.originNode,f,a,f,o(r))}else{u="global";for(var c=0;c<e.files.length;++c){var d=e.files[c];t.findRefs(d.ast,d.scope,a,f,o(d))}}return{refs:l,type:u,name:a}}function K(e,n,r,i){function s(e){return function(t){a.push({file:e.name,start:V(n,e,t.start),end:V(n,e,t.end)})}}var o=t.expressionType(r).getObjType();if(!o)throw y("Couldn't determine type of base object.");for(var a=[],f=0;f<e.files.length;++f){var u=e.files[f];t.findPropRefs(u.ast,u.scope,o,i.name,s(u))}return{refs:a,name:i.name}}function z(e,t,n){var r=N(n,t,!0);if(r&&"Identifier"==r.node.type)return $(e,t,n,r);if(r&&"MemberExpression"==r.node.type&&!r.node.computed){var i=r.node.property;return r.node=r.node.object,K(e,t,r,i)}if(r&&"ObjectExpression"==r.node.type)for(var s=U(n,t.end),o=0;o<r.node.properties.length;++o){var a=r.node.properties[o].key;if(a.start<=s&&a.end>=s)return K(e,t,r,a)}throw y("Not at a variable or property name.")}function B(e,t,n){if("string"!=typeof t.newName)throw y(".query.newName should be a string");var r=N(n,t);if(!r||"Identifier"!=r.node.type)throw y("Not at a variable.");var i=$(e,t,n,r,t.newName),s=i.refs;delete i.refs,i.files=e.files.map(function(e){return e.name});for(var o=i.changes=[],a=0;a<s.length;++a){var f=s[a];f.text=t.newName,o.push(f)}return i}function D(e){return{files:e.files.map(function(e){return e.name})}}var Q=Object.create(null);e.registerPlugin=function(e,t){Q[e]=t};var Z=e.defaultOptions={debug:!1,async:!1,getFile:function(e,t){this.async&&t(null,null)},defs:[],plugins:{},fetchTimeout:1e3,dependencyBudget:2e4,reuseInstances:!0,stripCRs:!1},W={completions:{takesFile:!0,run:q},properties:{run:E},type:{takesFile:!0,run:I},documentation:{takesFile:!0,run:R},definition:{takesFile:!0,run:G},refs:{takesFile:!0,fullFile:!0,run:z},rename:{takesFile:!0,fullFile:!0,run:B},files:{run:D}};e.defineQueryType=function(e,t){W[e]=t},s.prototype.asLineChar=function(e){return A(this,e)};var H=e.Server=function(e){this.cx=null,this.options=e||{};for(var t in Z)e.hasOwnProperty(t)||(e[t]=Z[t]);this.handlers=Object.create(null),this.files=[],this.fileMap=Object.create(null),this.needsPurge=[],this.budgets=Object.create(null),this.uses=0,this.pending=0,this.asyncError=null,this.passes=Object.create(null),this.defs=e.defs.slice(0);for(var n in e.plugins)if(e.plugins.hasOwnProperty(n)&&n in Q){var r=Q[n](this,e.plugins[n]);if(r&&r.defs&&(r.loadFirst?this.defs.unshift(r.defs):this.defs.push(r.defs)),r&&r.passes)for(var i in r.passes)r.passes.hasOwnProperty(i)&&(this.passes[i]||(this.passes[i]=[])).push(r.passes[i])}this.reset()};H.prototype=n.mixin({addFile:function(e,t,n){!n||n in this.fileMap||(n=null),u(this,e,n,t)},delFile:function(e){var t=this.findFile(e);t&&(this.needsPurge.push(t.name),this.files.splice(this.files.indexOf(t),1),delete this.fileMap[e])},reset:function(){this.signal("reset"),this.cx=new t.Context(this.defs,this),this.uses=0,this.budgets=Object.create(null);for(var e=0;e<this.files.length;++e){var n=this.files[e];n.scope=null}},request:function(e,t){var n=F(e);if(n)return t(n);var r=this;a(this,e,function(e,n){t(e,n),r.uses>40&&(r.reset(),p(r,null,function(){}))})},findFile:function(e){return this.fileMap[e]},flush:function(e){var n=this.cx;p(this,null,function(r){return r?e(r):void t.withContext(n,e)})},startAsyncAction:function(){++this.pending},finishAsyncAction:function(e){e&&(this.asyncError=e),0===--this.pending&&this.signal("everythingFetched")}});var J=25,U=e.resolvePos=function(e,t,n){if("number"!=typeof t){var r=O(e,t.line);if(null==r){if(!n)throw y("File doesn't contain a line "+t.line);t=e.text.length}else t=r+t.ch}if(t>e.text.length){if(!n)throw y("Position "+t+" is outside of file.");t=e.text.length}return t},V=e.outputPos=function(e,t,n){if(e.lineCharPositions){var r=A(t,n);return"part"==t.type&&(r.line+=null!=t.offsetLines?t.offsetLines:A(t.backing,t.offset).line),r}return n+("part"==t.type?t.offset:0)},X="break do instanceof typeof case else new var catch finally return void continue for switch while debugger function this with default if throw delete in try".split(" "),Y=e.findQueryExpr=function(e,n,r){if(null==n.end)throw y("missing .query.end field");if(n.variable){var i=t.scopeAt(e.ast,U(e,n.end),e.scope);return{node:{type:"Identifier",name:n.variable,start:n.end,end:n.end+1},state:i}}var s=n.start&&U(e,n.start),o=U(e,n.end),a=t.findExpressionAt(e.ast,s,o,e.scope);return a?a:(a=t.findExpressionAround(e.ast,s,o,e.scope),a&&("ObjectExpression"==a.node.type||r||(null==s?o:s)-a.node.start<20||a.node.end-o<20)?a:null)},_=e.getSpan=function(e){if(e.origin){if(e.originNode){var t=e.originNode;return/^Function/.test(t.type)&&t.id&&(t=t.id),{origin:e.origin,node:t}}return e.span?{origin:e.origin,span:e.span}:void 0}},ee=e.storeSpan=function(e,t,n,r){if(r.origin=n.origin,n.span){var i=/^(\d+)\[(\d+):(\d+)\]-(\d+)\[(\d+):(\d+)\]$/.exec(n.span);r.start=t.lineCharPositions?{line:Number(i[2]),ch:Number(i[3])}:Number(i[1]),r.end=t.lineCharPositions?{line:Number(i[5]),ch:Number(i[6])}:Number(i[4])}else{var s=e.findFile(n.origin);r.start=V(t,s,n.node.start),r.end=V(t,s,n.node.end)}};e.version="0.11.1"});