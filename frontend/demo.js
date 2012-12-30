/*
 * lightgl.js
 * http://github.com/evanw/lightgl.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var GL=function(){function J(){e.MODELVIEW=E|1;e.PROJECTION=E|2;var b=new o,c=new o;e.modelviewMatrix=new o;e.projectionMatrix=new o;var a=[],d=[],f,i;e.matrixMode=function(g){switch(g){case e.MODELVIEW:f="modelviewMatrix";i=a;break;case e.PROJECTION:f="projectionMatrix";i=d;break;default:throw"invalid matrix mode "+g;}};e.loadIdentity=function(){o.identity(e[f])};e.loadMatrix=function(g){g=g.m;for(var h=e[f].m,k=0;k<16;k++)h[k]=g[k]};e.multMatrix=function(g){e.loadMatrix(o.multiply(e[f],g,c))};e.perspective=
function(g,h,k,m){e.multMatrix(o.perspective(g,h,k,m,b))};e.frustum=function(g,h,k,m,j,n){e.multMatrix(o.frustum(g,h,k,m,j,n,b))};e.ortho=function(g,h,k,m,j,n){e.multMatrix(o.ortho(g,h,k,m,j,n,b))};e.scale=function(g,h,k){e.multMatrix(o.scale(g,h,k,b))};e.translate=function(g,h,k){e.multMatrix(o.translate(g,h,k,b))};e.rotate=function(g,h,k,m){e.multMatrix(o.rotate(g,h,k,m,b))};e.lookAt=function(g,h,k,m,j,n,p,y,K){e.multMatrix(o.lookAt(g,h,k,m,j,n,p,y,K,b))};e.pushMatrix=function(){i.push(Array.prototype.slice.call(e[f].m))};
e.popMatrix=function(){var g=i.pop();e[f].m=F?new Float32Array(g):g};e.project=function(g,h,k,m,j,n){m=m||e.modelviewMatrix;j=j||e.projectionMatrix;n=n||e.getParameter(e.VIEWPORT);g=j.transformPoint(m.transformPoint(new l(g,h,k)));return new l(n[0]+n[2]*(g.x*0.5+0.5),n[1]+n[3]*(g.y*0.5+0.5),g.z*0.5+0.5)};e.unProject=function(g,h,k,m,j,n){m=m||e.modelviewMatrix;j=j||e.projectionMatrix;n=n||e.getParameter(e.VIEWPORT);g=new l((g-n[0])/n[2]*2-1,(h-n[1])/n[3]*2-1,k*2-1);return o.inverse(o.multiply(j,m,
b),c).transformPoint(g)};e.matrixMode(e.MODELVIEW)}function L(){var b={mesh:new q({coords:true,colors:true,triangles:false}),mode:-1,coord:[0,0,0,0],color:[1,1,1,1],pointSize:1,shader:new z("uniform float pointSize;varying vec4 color;varying vec4 coord;void main(){color=gl_Color;coord=gl_TexCoord;gl_Position=gl_ModelViewProjectionMatrix*gl_Vertex;gl_PointSize=pointSize;}","uniform sampler2D texture;uniform float pointSize;uniform bool useTexture;varying vec4 color;varying vec4 coord;void main(){gl_FragColor=color;if(useTexture)gl_FragColor*=texture2D(texture,coord.xy);}")};
e.pointSize=function(c){b.shader.uniforms({pointSize:c})};e.begin=function(c){if(b.mode!=-1)throw"mismatched gl.begin() and gl.end() calls";b.mode=c;b.mesh.colors=[];b.mesh.coords=[];b.mesh.vertices=[]};e.color=function(c,a,d,f){b.color=arguments.length==1?c.toArray().concat(1):[c,a,d,f||1]};e.texCoord=function(c,a){b.coord=arguments.length==1?c.toArray(2):[c,a]};e.vertex=function(c,a,d){b.mesh.colors.push(b.color);b.mesh.coords.push(b.coord);b.mesh.vertices.push(arguments.length==1?c.toArray():[c,
a,d])};e.end=function(){if(b.mode==-1)throw"mismatched gl.begin() and gl.end() calls";b.mesh.compile();b.shader.uniforms({useTexture:!!e.getParameter(e.TEXTURE_BINDING_2D)}).draw(b.mesh,b.mode);b.mode=-1}}function M(){function b(){for(var j in k)if(k[j])return true;return false}function c(j){var n={},p;for(p in j)n[p]=typeof j[p]=="function"?function(y){return function(){y.call(j,arguments)}}(j[p]):j[p];n.original=j;n.x=n.pageX;n.y=n.pageY;for(p=e.canvas;p;p=p.offsetParent){n.x-=p.offsetLeft;n.y-=
p.offsetTop}if(m){n.deltaX=n.x-g;n.deltaY=n.y-h}else{n.deltaX=0;n.deltaY=0;m=true}g=n.x;h=n.y;n.dragging=b();n.preventDefault=function(){n.original.preventDefault()};n.stopPropagation=function(){n.original.stopPropagation()};return n}function a(j){e=i;j=c(j);e.onmousemove&&e.onmousemove(j);j.preventDefault()}function d(j){e=i;k[j.which]=false;if(!b()){document.removeEventListener("mousemove",a);document.removeEventListener("mouseup",d);e.canvas.addEventListener("mousemove",a);e.canvas.addEventListener("mouseup",
d)}j=c(j);e.onmouseup&&e.onmouseup(j);j.preventDefault()}function f(){m=false}var i=e,g=0,h=0,k={},m=false;A(e.canvas,"mousedown",function(j){e=i;if(!b()){document.addEventListener("mousemove",a);document.addEventListener("mouseup",d);e.canvas.removeEventListener("mousemove",a);e.canvas.removeEventListener("mouseup",d)}k[j.which]=true;j=c(j);e.onmousedown&&e.onmousedown(j);j.preventDefault()});e.canvas.addEventListener("mousemove",a);e.canvas.addEventListener("mouseup",d);e.canvas.addEventListener("mouseover",
f);e.canvas.addEventListener("mouseout",f)}function G(b){return{8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"}[b]||(b>=65&&b<=90?String.fromCharCode(b):null)}function A(b,c,a){b.addEventListener(c,a)}function N(){(function(b){e.makeCurrent=function(){e=b}})(e);e.animate=function(){function b(){e=d;var f=(new Date).getTime();e.onupdate&&e.onupdate((f-a)/1E3);e.ondraw&&e.ondraw();c(b);a=f}var c=window.requestAnimationFrame||window.mozRequestAnimationFrame||
window.webkitRequestAnimationFrame||function(f){setTimeout(f,1E3/60)},a=(new Date).getTime(),d=e;b()};e.fullscreen=function(b){function c(){e.canvas.width=window.innerWidth-d-f;e.canvas.height=window.innerHeight-a-i;e.viewport(0,0,e.canvas.width,e.canvas.height);if(b.camera||!("camera"in b)){e.matrixMode(e.PROJECTION);e.loadIdentity();e.perspective(b.fov||45,e.canvas.width/e.canvas.height,b.near||0.1,b.far||1E3);e.matrixMode(e.MODELVIEW)}e.ondraw&&e.ondraw()}b=b||{};var a=b.paddingTop||0,d=b.paddingLeft||
0,f=b.paddingRight||0,i=b.paddingBottom||0;if(!document.body)throw"document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)";document.body.appendChild(e.canvas);document.body.style.overflow="hidden";e.canvas.style.position="absolute";e.canvas.style.left=d+"px";e.canvas.style.top=a+"px";window.addEventListener("resize",c);c()}}function o(){var b=Array.prototype.concat.apply([],arguments);b.length||(b=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.m=F?new Float32Array(b):
b}function w(){this.unique=[];this.indices=[];this.map={}}function x(b,c){this.buffer=null;this.target=b;this.type=c;this.data=[]}function q(b){b=b||{};this.vertexBuffers={};this.indexBuffers={};this.addVertexBuffer("vertices","gl_Vertex");b.coords&&this.addVertexBuffer("coords","gl_TexCoord");b.normals&&this.addVertexBuffer("normals","gl_Normal");b.colors&&this.addVertexBuffer("colors","gl_Color");if(!("triangles"in b)||b.triangles)this.addIndexBuffer("triangles");b.lines&&this.addIndexBuffer("lines")}
function H(b){return new l((b&1)*2-1,(b&2)-1,(b&4)/2-1)}function t(b,c,a){this.t=arguments.length?b:Number.MAX_VALUE;this.hit=c;this.normal=a}function u(){var b=e.getParameter(e.VIEWPORT),c=e.modelviewMatrix.m,a=new l(c[0],c[4],c[8]),d=new l(c[1],c[5],c[9]),f=new l(c[2],c[6],c[10]);c=new l(c[3],c[7],c[11]);this.eye=new l(-c.dot(a),-c.dot(d),-c.dot(f));a=b[0];d=a+b[2];f=b[1];c=f+b[3];this.ray00=e.unProject(a,f,1).subtract(this.eye);this.ray10=e.unProject(d,f,1).subtract(this.eye);this.ray01=e.unProject(a,
c,1).subtract(this.eye);this.ray11=e.unProject(d,c,1).subtract(this.eye);this.viewport=b}function B(b,c,a){for(;(result=b.exec(c))!=null;)a(result)}function z(b,c){function a(k){var m=document.getElementById(k);return m?m.text:k}function d(k,m){var j={},n=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(m);m=n?n[1]+k+m.substr(n[1].length):k+m;B(/\bgl_\w+\b/g,k,function(p){if(!(p in j)){m=m.replace(RegExp("\\b"+p+"\\b","g"),"_"+p);j[p]=true}});return m}function f(k,m){var j=e.createShader(k);e.shaderSource(j,
m);e.compileShader(j);if(!e.getShaderParameter(j,e.COMPILE_STATUS))throw"compile error: "+e.getShaderInfoLog(j);return j}b=a(b);c=a(c);var i=b+c,g={};B(/\b(gl_[^;]*)\b;/g,"uniform mat3 gl_NormalMatrix;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;uniform mat4 gl_ModelViewMatrixInverse;uniform mat4 gl_ProjectionMatrixInverse;uniform mat4 gl_ModelViewProjectionMatrixInverse;",function(k){k=k[1];if(i.indexOf(k)!=
-1){var m=k.replace(/[a-z_]/g,"");g[m]="_"+k}});if(i.indexOf("ftransform")!=-1)g.MVPM="_gl_ModelViewProjectionMatrix";this.usedMatrices=g;b=d("uniform mat3 gl_NormalMatrix;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;uniform mat4 gl_ModelViewMatrixInverse;uniform mat4 gl_ProjectionMatrixInverse;uniform mat4 gl_ModelViewProjectionMatrixInverse;attribute vec4 gl_Vertex;attribute vec4 gl_TexCoord;attribute vec3 gl_Normal;attribute vec4 gl_Color;vec4 ftransform(){return gl_ModelViewProjectionMatrix*gl_Vertex;}",
b);c=d("precision highp float;uniform mat3 gl_NormalMatrix;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;uniform mat4 gl_ModelViewMatrixInverse;uniform mat4 gl_ProjectionMatrixInverse;uniform mat4 gl_ModelViewProjectionMatrixInverse;",c);this.program=e.createProgram();e.attachShader(this.program,f(e.VERTEX_SHADER,b));e.attachShader(this.program,f(e.FRAGMENT_SHADER,c));e.linkProgram(this.program);if(!e.getProgramParameter(this.program,
e.LINK_STATUS))throw"link error: "+e.getProgramInfoLog(this.program);this.attributes={};this.uniformLocations={};var h={};B(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,b+c,function(k){h[k[2]]=1});this.isSampler=h}function s(b,c,a){a=a||{};this.id=e.createTexture();this.width=b;this.height=c;this.format=a.format||e.RGBA;this.type=a.type||e.UNSIGNED_BYTE;e.bindTexture(e.TEXTURE_2D,this.id);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,a.filter||a.magFilter||
e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,a.filter||a.minFilter||e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,a.wrap||a.wrapS||e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,a.wrap||a.wrapT||e.CLAMP_TO_EDGE);e.texImage2D(e.TEXTURE_2D,0,this.format,b,c,0,this.format,this.type,null)}function l(b,c,a){this.x=b||0;this.y=c||0;this.z=a||0}var e,v={create:function(b){b=b||{};var c=document.createElement("canvas");c.width=800;c.height=600;if(!("alpha"in b))b.alpha=
false;try{e=c.getContext("webgl",b)}catch(a){}try{e=e||c.getContext("experimental-webgl",b)}catch(d){}if(!e)throw"WebGL not supported";J();L();M();N();return e},keys:{},Matrix:o,Indexer:w,Buffer:x,Mesh:q,HitTest:t,Raytracer:u,Shader:z,Texture:s,Vector:l};A(document,"keydown",function(b){if(!b.altKey&&!b.ctrlKey&&!b.metaKey){var c=G(b.keyCode);if(c)v.keys[c]=true;v.keys[b.keyCode]=true}});A(document,"keyup",function(b){if(!b.altKey&&!b.ctrlKey&&!b.metaKey){var c=G(b.keyCode);if(c)v.keys[c]=false;v.keys[b.keyCode]=
false}});var E=305397760,F=typeof Float32Array!="undefined";o.prototype={inverse:function(){return o.inverse(this,new o)},transpose:function(){return o.transpose(this,new o)},multiply:function(b){return o.multiply(this,b,new o)},transformPoint:function(b){var c=this.m;return(new l(c[0]*b.x+c[1]*b.y+c[2]*b.z+c[3],c[4]*b.x+c[5]*b.y+c[6]*b.z+c[7],c[8]*b.x+c[9]*b.y+c[10]*b.z+c[11])).divide(c[12]*b.x+c[13]*b.y+c[14]*b.z+c[15])},transformVector:function(b){var c=this.m;return new l(c[0]*b.x+c[1]*b.y+c[2]*
b.z,c[4]*b.x+c[5]*b.y+c[6]*b.z,c[8]*b.x+c[9]*b.y+c[10]*b.z)}};o.inverse=function(b,c){c=c||new o;var a=b.m,d=c.m;d[0]=a[5]*a[10]*a[15]-a[5]*a[14]*a[11]-a[6]*a[9]*a[15]+a[6]*a[13]*a[11]+a[7]*a[9]*a[14]-a[7]*a[13]*a[10];d[1]=-a[1]*a[10]*a[15]+a[1]*a[14]*a[11]+a[2]*a[9]*a[15]-a[2]*a[13]*a[11]-a[3]*a[9]*a[14]+a[3]*a[13]*a[10];d[2]=a[1]*a[6]*a[15]-a[1]*a[14]*a[7]-a[2]*a[5]*a[15]+a[2]*a[13]*a[7]+a[3]*a[5]*a[14]-a[3]*a[13]*a[6];d[3]=-a[1]*a[6]*a[11]+a[1]*a[10]*a[7]+a[2]*a[5]*a[11]-a[2]*a[9]*a[7]-a[3]*a[5]*
a[10]+a[3]*a[9]*a[6];d[4]=-a[4]*a[10]*a[15]+a[4]*a[14]*a[11]+a[6]*a[8]*a[15]-a[6]*a[12]*a[11]-a[7]*a[8]*a[14]+a[7]*a[12]*a[10];d[5]=a[0]*a[10]*a[15]-a[0]*a[14]*a[11]-a[2]*a[8]*a[15]+a[2]*a[12]*a[11]+a[3]*a[8]*a[14]-a[3]*a[12]*a[10];d[6]=-a[0]*a[6]*a[15]+a[0]*a[14]*a[7]+a[2]*a[4]*a[15]-a[2]*a[12]*a[7]-a[3]*a[4]*a[14]+a[3]*a[12]*a[6];d[7]=a[0]*a[6]*a[11]-a[0]*a[10]*a[7]-a[2]*a[4]*a[11]+a[2]*a[8]*a[7]+a[3]*a[4]*a[10]-a[3]*a[8]*a[6];d[8]=a[4]*a[9]*a[15]-a[4]*a[13]*a[11]-a[5]*a[8]*a[15]+a[5]*a[12]*a[11]+
a[7]*a[8]*a[13]-a[7]*a[12]*a[9];d[9]=-a[0]*a[9]*a[15]+a[0]*a[13]*a[11]+a[1]*a[8]*a[15]-a[1]*a[12]*a[11]-a[3]*a[8]*a[13]+a[3]*a[12]*a[9];d[10]=a[0]*a[5]*a[15]-a[0]*a[13]*a[7]-a[1]*a[4]*a[15]+a[1]*a[12]*a[7]+a[3]*a[4]*a[13]-a[3]*a[12]*a[5];d[11]=-a[0]*a[5]*a[11]+a[0]*a[9]*a[7]+a[1]*a[4]*a[11]-a[1]*a[8]*a[7]-a[3]*a[4]*a[9]+a[3]*a[8]*a[5];d[12]=-a[4]*a[9]*a[14]+a[4]*a[13]*a[10]+a[5]*a[8]*a[14]-a[5]*a[12]*a[10]-a[6]*a[8]*a[13]+a[6]*a[12]*a[9];d[13]=a[0]*a[9]*a[14]-a[0]*a[13]*a[10]-a[1]*a[8]*a[14]+a[1]*
a[12]*a[10]+a[2]*a[8]*a[13]-a[2]*a[12]*a[9];d[14]=-a[0]*a[5]*a[14]+a[0]*a[13]*a[6]+a[1]*a[4]*a[14]-a[1]*a[12]*a[6]-a[2]*a[4]*a[13]+a[2]*a[12]*a[5];d[15]=a[0]*a[5]*a[10]-a[0]*a[9]*a[6]-a[1]*a[4]*a[10]+a[1]*a[8]*a[6]+a[2]*a[4]*a[9]-a[2]*a[8]*a[5];a=a[0]*d[0]+a[1]*d[4]+a[2]*d[8]+a[3]*d[12];for(var f=0;f<16;f++)d[f]/=a;return c};o.transpose=function(b,c){c=c||new o;var a=b.m,d=c.m;d[0]=a[0];d[1]=a[4];d[2]=a[8];d[3]=a[12];d[4]=a[1];d[5]=a[5];d[6]=a[9];d[7]=a[13];d[8]=a[2];d[9]=a[6];d[10]=a[10];d[11]=a[14];
d[12]=a[3];d[13]=a[7];d[14]=a[11];d[15]=a[15];return c};o.multiply=function(b,c,a){a=a||new o;b=b.m;c=c.m;var d=a.m;d[0]=b[0]*c[0]+b[1]*c[4]+b[2]*c[8]+b[3]*c[12];d[1]=b[0]*c[1]+b[1]*c[5]+b[2]*c[9]+b[3]*c[13];d[2]=b[0]*c[2]+b[1]*c[6]+b[2]*c[10]+b[3]*c[14];d[3]=b[0]*c[3]+b[1]*c[7]+b[2]*c[11]+b[3]*c[15];d[4]=b[4]*c[0]+b[5]*c[4]+b[6]*c[8]+b[7]*c[12];d[5]=b[4]*c[1]+b[5]*c[5]+b[6]*c[9]+b[7]*c[13];d[6]=b[4]*c[2]+b[5]*c[6]+b[6]*c[10]+b[7]*c[14];d[7]=b[4]*c[3]+b[5]*c[7]+b[6]*c[11]+b[7]*c[15];d[8]=b[8]*c[0]+
b[9]*c[4]+b[10]*c[8]+b[11]*c[12];d[9]=b[8]*c[1]+b[9]*c[5]+b[10]*c[9]+b[11]*c[13];d[10]=b[8]*c[2]+b[9]*c[6]+b[10]*c[10]+b[11]*c[14];d[11]=b[8]*c[3]+b[9]*c[7]+b[10]*c[11]+b[11]*c[15];d[12]=b[12]*c[0]+b[13]*c[4]+b[14]*c[8]+b[15]*c[12];d[13]=b[12]*c[1]+b[13]*c[5]+b[14]*c[9]+b[15]*c[13];d[14]=b[12]*c[2]+b[13]*c[6]+b[14]*c[10]+b[15]*c[14];d[15]=b[12]*c[3]+b[13]*c[7]+b[14]*c[11]+b[15]*c[15];return a};o.identity=function(b){b=b||new o;var c=b.m;c[0]=c[5]=c[10]=c[15]=1;c[1]=c[2]=c[3]=c[4]=c[6]=c[7]=c[8]=c[9]=
c[11]=c[12]=c[13]=c[14]=0;return b};o.perspective=function(b,c,a,d,f){b=Math.tan(b*Math.PI/360)*a;c=b*c;return o.frustum(-c,c,-b,b,a,d,f)};o.frustum=function(b,c,a,d,f,i,g){g=g||new o;var h=g.m;h[0]=2*f/(c-b);h[1]=0;h[2]=(c+b)/(c-b);h[3]=0;h[4]=0;h[5]=2*f/(d-a);h[6]=(d+a)/(d-a);h[7]=0;h[8]=0;h[9]=0;h[10]=-(i+f)/(i-f);h[11]=-2*i*f/(i-f);h[12]=0;h[13]=0;h[14]=-1;h[15]=0;return g};o.ortho=function(b,c,a,d,f,i,g){g=g||new o;var h=g.m;h[0]=2/(c-b);h[1]=0;h[2]=0;h[3]=-(c+b)/(c-b);h[4]=0;h[5]=2/(d-a);h[6]=
0;h[7]=-(d+a)/(d-a);h[8]=0;h[9]=0;h[10]=-2/(i-f);h[11]=-(i+f)/(i-f);h[12]=0;h[13]=0;h[14]=0;h[15]=1;return g};o.scale=function(b,c,a,d){d=d||new o;var f=d.m;f[0]=b;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=c;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=a;f[11]=0;f[12]=0;f[13]=0;f[14]=0;f[15]=1;return d};o.translate=function(b,c,a,d){d=d||new o;var f=d.m;f[0]=1;f[1]=0;f[2]=0;f[3]=b;f[4]=0;f[5]=1;f[6]=0;f[7]=c;f[8]=0;f[9]=0;f[10]=1;f[11]=a;f[12]=0;f[13]=0;f[14]=0;f[15]=1;return d};o.rotate=function(b,c,a,d,f){if(!b||!c&&
!a&&!d)return o.identity(f);f=f||new o;var i=f.m,g=Math.sqrt(c*c+a*a+d*d);b*=Math.PI/180;c/=g;a/=g;d/=g;g=Math.cos(b);b=Math.sin(b);var h=1-g;i[0]=c*c*h+g;i[1]=c*a*h-d*b;i[2]=c*d*h+a*b;i[3]=0;i[4]=a*c*h+d*b;i[5]=a*a*h+g;i[6]=a*d*h-c*b;i[7]=0;i[8]=d*c*h-a*b;i[9]=d*a*h+c*b;i[10]=d*d*h+g;i[11]=0;i[12]=0;i[13]=0;i[14]=0;i[15]=1;return f};o.lookAt=function(b,c,a,d,f,i,g,h,k,m){m=m||new o;var j=m.m;b=new l(b,c,a);d=new l(d,f,i);h=new l(g,h,k);g=b.subtract(d).unit();h=h.cross(g).unit();k=g.cross(h).unit();
j[0]=h.x;j[1]=h.y;j[2]=h.z;j[3]=-h.dot(b);j[4]=k.x;j[5]=k.y;j[6]=k.z;j[7]=-k.dot(b);j[8]=g.x;j[9]=g.y;j[10]=g.z;j[11]=-g.dot(b);j[12]=0;j[13]=0;j[14]=0;j[15]=1;return m};w.prototype={add:function(b){var c=JSON.stringify(b);if(!(c in this.map)){this.map[c]=this.unique.length;this.unique.push(b)}return this.map[c]}};x.prototype={compile:function(b){for(var c=[],a=0;a<this.data.length;a+=1E4)c=Array.prototype.concat.apply(c,this.data.slice(a,a+1E4));a=this.data.length?c.length/this.data.length:0;if(a!=
Math.round(a))throw"buffer elements not of consistent size, average size is "+a;this.buffer=this.buffer||e.createBuffer();this.buffer.length=c.length;this.buffer.spacing=a;e.bindBuffer(this.target,this.buffer);e.bufferData(this.target,new this.type(c),b||e.STATIC_DRAW)}};q.prototype={addVertexBuffer:function(b,c){(this.vertexBuffers[c]=new x(e.ARRAY_BUFFER,Float32Array)).name=b;this[b]=[]},addIndexBuffer:function(b){this.indexBuffers[b]=new x(e.ELEMENT_ARRAY_BUFFER,Uint16Array);this[b]=[]},compile:function(){for(var b in this.vertexBuffers){var c=
this.vertexBuffers[b];c.data=this[c.name];c.compile()}for(var a in this.indexBuffers){c=this.indexBuffers[a];c.data=this[a];c.compile()}},transform:function(b){this.vertices=this.vertices.map(function(a){return b.transformPoint(l.fromArray(a)).toArray()});if(this.normals){var c=b.inverse().transpose();this.normals=this.normals.map(function(a){return c.transformVector(l.fromArray(a)).unit().toArray()})}this.compile();return this},computeNormals:function(){this.normals||this.addVertexBuffer("normals",
"gl_Normal");for(var b=0;b<this.vertices.length;b++)this.normals[b]=new l;for(b=0;b<this.triangles.length;b++){var c=this.triangles[b],a=l.fromArray(this.vertices[c[0]]),d=l.fromArray(this.vertices[c[1]]),f=l.fromArray(this.vertices[c[2]]);a=d.subtract(a).cross(f.subtract(a)).unit();this.normals[c[0]]=this.normals[c[0]].add(a);this.normals[c[1]]=this.normals[c[1]].add(a);this.normals[c[2]]=this.normals[c[2]].add(a)}for(b=0;b<this.vertices.length;b++)this.normals[b]=this.normals[b].unit().toArray();
this.compile();return this},computeWireframe:function(){for(var b=new w,c=0;c<this.triangles.length;c++)for(var a=this.triangles[c],d=0;d<a.length;d++){var f=a[d],i=a[(d+1)%a.length];b.add([Math.min(f,i),Math.max(f,i)])}this.lines||this.addIndexBuffer("lines");this.lines=b.unique;this.compile();return this},getAABB:function(){var b={min:new l(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};b.max=b.min.negative();for(var c=0;c<this.vertices.length;c++){var a=l.fromArray(this.vertices[c]);b.min=
l.min(b.min,a);b.max=l.max(b.max,a)}return b},getBoundingSphere:function(){var b=this.getAABB();b={center:b.min.add(b.max).divide(2),radius:0};for(var c=0;c<this.vertices.length;c++)b.radius=Math.max(b.radius,l.fromArray(this.vertices[c]).subtract(b.center).length());return b}};q.plane=function(b){b=b||{};var c=new q(b);detailX=b.detailX||b.detail||1;detailY=b.detailY||b.detail||1;for(b=0;b<=detailY;b++)for(var a=b/detailY,d=0;d<=detailX;d++){var f=d/detailX;c.vertices.push([2*f-1,2*a-1,0]);c.coords&&
c.coords.push([f,a]);c.normals&&c.normals.push([0,0,1]);if(d<detailX&&b<detailY){f=d+b*(detailX+1);c.triangles.push([f,f+1,f+detailX+1]);c.triangles.push([f+detailX+1,f+1,f+detailX+2])}}c.compile();return c};var I=[[0,4,2,6,-1,0,0],[1,3,5,7,+1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,+1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,+1]];q.cube=function(b){b=new q(b);for(var c=0;c<I.length;c++){for(var a=I[c],d=c*4,f=0;f<4;f++){b.vertices.push(H(a[f]).toArray());b.coords&&b.coords.push([f&1,(f&2)/2]);b.normals&&b.normals.push(a.slice(4,
7))}b.triangles.push([d,d+1,d+2]);b.triangles.push([d+2,d+1,d+3])}b.compile();return b};q.sphere=function(b){b=b||{};var c=new q(b),a=new w;detail=b.detail||6;for(b=0;b<8;b++)for(var d=H(b),f=d.x*d.y*d.z>0,i=[],g=0;g<=detail;g++){for(var h=0;g+h<=detail;h++){var k=g/detail,m=h/detail,j=(detail-g-h)/detail;m={vertex:(new l(k+(k-k*k)/2,m+(m-m*m)/2,j+(j-j*j)/2)).unit().multiply(d).toArray()};if(c.coords)m.coord=d.y>0?[1-k,j]:[j,1-k];i.push(a.add(m))}if(g>0)for(h=0;g+h<=detail;h++){k=(g-1)*(detail+1)+
(g-1-(g-1)*(g-1))/2+h;m=g*(detail+1)+(g-g*g)/2+h;c.triangles.push(f?[i[k],i[m],i[k+1]]:[i[k],i[k+1],i[m]]);g+h<detail&&c.triangles.push(f?[i[m],i[m+1],i[k+1]]:[i[m],i[k+1],i[m+1]])}}c.vertices=a.unique.map(function(n){return n.vertex});if(c.coords)c.coords=a.unique.map(function(n){return n.coord});if(c.normals)c.normals=c.vertices;c.compile();return c};q.load=function(b,c){c=c||{};if(!("coords"in c))c.coords=!!b.coords;if(!("normals"in c))c.normals=!!b.normals;if(!("colors"in c))c.colors=!!b.colors;
if(!("triangles"in c))c.triangles=!!b.triangles;if(!("lines"in c))c.lines=!!b.lines;var a=new q(c);a.vertices=b.vertices;if(a.coords)a.coords=b.coords;if(a.normals)a.normals=b.normals;if(a.colors)a.colors=b.colors;if(a.triangles)a.triangles=b.triangles;if(a.lines)a.lines=b.lines;a.compile();return a};t.prototype={mergeWith:function(b){if(b.t>0&&b.t<this.t){this.t=b.t;this.hit=b.hit;this.normal=b.normal}}};u.prototype={getRayForPixel:function(b,c){b=(b-this.viewport[0])/this.viewport[2];c=1-(c-this.viewport[1])/
this.viewport[3];var a=l.lerp(this.ray00,this.ray10,b),d=l.lerp(this.ray01,this.ray11,b);return l.lerp(a,d,c).unit()}};u.hitTestBox=function(b,c,a,d){var f=a.subtract(b).divide(c),i=d.subtract(b).divide(c),g=l.min(f,i);f=l.max(f,i);g=g.max();f=f.min();if(g>0&&g<f){b=b.add(c.multiply(g));a=a.add(1.0E-6);d=d.subtract(1.0E-6);return new t(g,b,new l((b.x>d.x)-(b.x<a.x),(b.y>d.y)-(b.y<a.y),(b.z>d.z)-(b.z<a.z)))}return null};u.hitTestSphere=function(b,c,a,d){var f=b.subtract(a),i=c.dot(c),g=2*c.dot(f);
f=f.dot(f)-d*d;f=g*g-4*i*f;if(f>0){i=(-g-Math.sqrt(f))/(2*i);b=b.add(c.multiply(i));return new t(i,b,b.subtract(a).divide(d))}return null};u.hitTestTriangle=function(b,c,a,d,f){var i=d.subtract(a),g=f.subtract(a);f=i.cross(g).unit();d=f.dot(a.subtract(b)).divide(f.dot(c));if(d>0){b=b.add(c.multiply(d));var h=b.subtract(a);a=g.dot(g);c=g.dot(i);g=g.dot(h);var k=i.dot(i);i=i.dot(h);h=a*k-c*c;k=(k*g-c*i)/h;i=(a*i-c*g)/h;if(k>=0&&i>=0&&k+i<=1)return new t(d,b,f)}return null};new o;new o;z.prototype={uniforms:function(b){e.useProgram(this.program);
for(var c in b){c in this.uniformLocations||(this.uniformLocations[c]=e.getUniformLocation(this.program,c));var a=this.uniformLocations[c];if(a){var d=b[c];if(d instanceof l)d=[d.x,d.y,d.z];else if(d instanceof o)d=d.m;var f=Object.prototype.toString.call(d);if(f=="[object Array]"||f=="[object Float32Array]")switch(d.length){case 1:e.uniform1fv(a,new Float32Array(d));break;case 2:e.uniform2fv(a,new Float32Array(d));break;case 3:e.uniform3fv(a,new Float32Array(d));break;case 4:e.uniform4fv(a,new Float32Array(d));
break;case 9:e.uniformMatrix3fv(a,false,new Float32Array([d[0],d[3],d[6],d[1],d[4],d[7],d[2],d[5],d[8]]));break;case 16:e.uniformMatrix4fv(a,false,new Float32Array([d[0],d[4],d[8],d[12],d[1],d[5],d[9],d[13],d[2],d[6],d[10],d[14],d[3],d[7],d[11],d[15]]));break;default:throw"don't know how to load uniform \""+c+'" of length '+d.length;}else{f=Object.prototype.toString.call(d);if(f=="[object Number]"||f=="[object Boolean]")(this.isSampler[c]?e.uniform1i:e.uniform1f).call(e,a,d);else throw'attempted to set uniform "'+
c+'" to invalid value '+d;}}}return this},draw:function(b,c){this.drawBuffers(b.vertexBuffers,b.indexBuffers[c==e.LINES?"lines":"triangles"],arguments.length<2?e.TRIANGLES:c)},drawBuffers:function(b,c,a){var d=this.usedMatrices,f=e.modelviewMatrix,i=e.projectionMatrix,g=d.MVMI||d.NM?f.inverse():null,h=d.PMI?i.inverse():null,k=d.MVPM||d.MVPMI?i.multiply(f):null,m={};if(d.MVM)m[d.MVM]=f;if(d.MVMI)m[d.MVMI]=g;if(d.PM)m[d.PM]=i;if(d.PMI)m[d.PMI]=h;if(d.MVPM)m[d.MVPM]=k;if(d.MVPMI)m[d.MVPMI]=k.inverse();
if(d.NM){f=g.m;m[d.NM]=[f[0],f[4],f[8],f[1],f[5],f[9],f[2],f[6],f[10]]}this.uniforms(m);d=0;for(var j in b){m=b[j];f=this.attributes[j]||e.getAttribLocation(this.program,j.replace(/^gl_/,"_gl_"));if(!(f==-1||!m.buffer)){this.attributes[j]=f;e.bindBuffer(e.ARRAY_BUFFER,m.buffer);e.enableVertexAttribArray(f);e.vertexAttribPointer(f,m.buffer.spacing,e.FLOAT,false,0,0);d=m.buffer.length/m.buffer.spacing}}for(j in this.attributes)j in b||e.disableVertexAttribArray(this.attributes[j]);if(d&&(!c||c.buffer))if(c){e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,
c.buffer);e.drawElements(a,c.buffer.length,e.UNSIGNED_SHORT,0)}else e.drawArrays(a,0,d);return this}};var C,r,D;s.prototype={bind:function(b){e.activeTexture(e.TEXTURE0+(b||0));e.bindTexture(e.TEXTURE_2D,this.id)},unbind:function(b){e.activeTexture(e.TEXTURE0+(b||0));e.bindTexture(e.TEXTURE_2D,null)},drawTo:function(b){var c=e.getParameter(e.VIEWPORT);C=C||e.createFramebuffer();r=r||e.createRenderbuffer();e.bindFramebuffer(e.FRAMEBUFFER,C);e.bindRenderbuffer(e.RENDERBUFFER,r);if(this.width!=r.width||
this.height!=r.height){r.width=this.width;r.height=this.height;e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,this.width,this.height)}e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.id,0);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,r);e.viewport(0,0,this.width,this.height);b();e.bindFramebuffer(e.FRAMEBUFFER,null);e.bindRenderbuffer(e.RENDERBUFFER,null);e.viewport(c[0],c[1],c[2],c[3])},swapWith:function(b){var c;c=b.id;b.id=this.id;
this.id=c;c=b.width;b.width=this.width;this.width=c;c=b.height;b.height=this.height;this.height=c}};s.fromImage=function(b,c){c=c||{};var a=new s(b.width,b.height,c);try{e.texImage2D(e.TEXTURE_2D,0,a.format,a.format,a.type,b)}catch(d){if(location.protocol=="file:")throw'image not loaded for security reasons (serve this page over "http://" instead)';else throw"image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)";}c.minFilter&&
c.minFilter!=e.NEAREST&&c.minFilter!=e.LINEAR&&e.generateMipmap(e.TEXTURE_2D);return a};s.fromURL=function(b,c){D=D||function(){var i=document.createElement("canvas").getContext("2d");i.canvas.width=i.canvas.height=128;for(var g=0;g<i.canvas.height;g+=16)for(var h=0;h<i.canvas.width;h+=16){i.fillStyle=(h^g)&16?"#FFF":"#DDD";i.fillRect(h,g,16,16)}return i.canvas}();var a=s.fromImage(D,c),d=new Image,f=e;d.onload=function(){f.makeCurrent();s.fromImage(d,c).swapWith(a)};d.src=b;return a};l.prototype=
{negative:function(){return new l(-this.x,-this.y,-this.z)},add:function(b){return b instanceof l?new l(this.x+b.x,this.y+b.y,this.z+b.z):new l(this.x+b,this.y+b,this.z+b)},subtract:function(b){return b instanceof l?new l(this.x-b.x,this.y-b.y,this.z-b.z):new l(this.x-b,this.y-b,this.z-b)},multiply:function(b){return b instanceof l?new l(this.x*b.x,this.y*b.y,this.z*b.z):new l(this.x*b,this.y*b,this.z*b)},divide:function(b){return b instanceof l?new l(this.x/b.x,this.y/b.y,this.z/b.z):new l(this.x/
b,this.y/b,this.z/b)},equals:function(b){return this.x==b.x&&this.y==b.y&&this.z==b.z},dot:function(b){return this.x*b.x+this.y*b.y+this.z*b.z},cross:function(b){return new l(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x*b.y-this.y*b.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,
this.x),phi:Math.asin(this.y/this.length())}},toArray:function(b){return[this.x,this.y,this.z].slice(0,b||3)},clone:function(){return new l(this.x,this.y,this.z)},init:function(b,c,a){this.x=b;this.y=c;this.z=a;return this}};l.negative=function(b,c){c.x=-b.x;c.y=-b.y;c.z=-b.z;return c};l.add=function(b,c,a){if(c instanceof l){a.x=b.x+c.x;a.y=b.y+c.y;a.z=b.z+c.z}else{a.x=b.x+c;a.y=b.y+c;a.z=b.z+c}return a};l.subtract=function(b,c,a){if(c instanceof l){a.x=b.x-c.x;a.y=b.y-c.y;a.z=b.z-c.z}else{a.x=b.x-
c;a.y=b.y-c;a.z=b.z-c}return a};l.multiply=function(b,c,a){if(c instanceof l){a.x=b.x*c.x;a.y=b.y*c.y;a.z=b.z*c.z}else{a.x=b.x*c;a.y=b.y*c;a.z=b.z*c}return a};l.divide=function(b,c,a){if(c instanceof l){a.x=b.x/c.x;a.y=b.y/c.y;a.z=b.z/c.z}else{a.x=b.x/c;a.y=b.y/c;a.z=b.z/c}return a};l.cross=function(b,c,a){a.x=b.y*c.z-b.z*c.y;a.y=b.z*c.x-b.x*c.z;a.z=b.x*c.y-b.y*c.x;return a};l.unit=function(b,c){var a=b.length();c.x=b.x/a;c.y=b.y/a;c.z=b.z/a;return c};l.fromAngles=function(b,c){return new l(Math.cos(b)*
Math.cos(c),Math.sin(c),Math.sin(b)*Math.cos(c))};l.randomDirection=function(){return l.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))};l.min=function(b,c){return new l(Math.min(b.x,c.x),Math.min(b.y,c.y),Math.min(b.z,c.z))};l.max=function(b,c){return new l(Math.max(b.x,c.x),Math.max(b.y,c.y),Math.max(b.z,c.z))};l.lerp=function(b,c,a){return c.subtract(b).multiply(a).add(b)};l.fromArray=function(b){return new l(b[0],b[1],b[2])};return v}();


/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

function Cubemap(images) {
  this.id = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.id);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.xneg);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.xpos);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.yneg);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.ypos);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.zneg);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, images.zpos);
}

Cubemap.prototype.bind = function(unit) {
    gl.activeTexture(gl.TEXTURE0 + (unit || 0));
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.id);
};

Cubemap.prototype.unbind = function(unit) {
    gl.activeTexture(gl.TEXTURE0 + (unit || 0));
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
};




/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

var helperFunctions = '\
  const float IOR_AIR = 1.0;\
  const float IOR_WATER = 1.333;\
  const vec3 abovewaterColor = vec3(0.25, 1.0, 1.25);\
  const vec3 underwaterColor = vec3(0.4, 0.9, 1.0);\
  const float poolHeight = 1.0;\
  uniform vec3 light;\
  uniform vec3 sphereCenter;\
  uniform float sphereRadius;\
  uniform sampler2D tiles;\
  uniform sampler2D causticTex;\
  uniform sampler2D water;\
  \
  vec2 intersectCube(vec3 origin, vec3 ray, vec3 cubeMin, vec3 cubeMax) {\
    vec3 tMin = (cubeMin - origin) / ray;\
    vec3 tMax = (cubeMax - origin) / ray;\
    vec3 t1 = min(tMin, tMax);\
    vec3 t2 = max(tMin, tMax);\
    float tNear = max(max(t1.x, t1.y), t1.z);\
    float tFar = min(min(t2.x, t2.y), t2.z);\
    return vec2(tNear, tFar);\
  }\
  \
  float intersectSphere(vec3 origin, vec3 ray, vec3 sphereCenter, float sphereRadius) {\
    vec3 toSphere = origin - sphereCenter;\
    float a = dot(ray, ray);\
    float b = 2.0 * dot(toSphere, ray);\
    float c = dot(toSphere, toSphere) - sphereRadius * sphereRadius;\
    float discriminant = b*b - 4.0*a*c;\
    if (discriminant > 0.0) {\
      float t = (-b - sqrt(discriminant)) / (2.0 * a);\
      if (t > 0.0) return t;\
    }\
    return 1.0e6;\
  }\
  \
  vec3 getSphereColor(vec3 point) {\
    vec3 color = vec3(0.5);\
    \
    /* ambient occlusion with walls */\
    color *= 1.0 - 0.9 / pow((1.0 + sphereRadius - abs(point.x)) / sphereRadius, 3.0);\
    color *= 1.0 - 0.9 / pow((1.0 + sphereRadius - abs(point.z)) / sphereRadius, 3.0);\
    color *= 1.0 - 0.9 / pow((point.y + 1.0 + sphereRadius) / sphereRadius, 3.0);\
    \
    /* caustics */\
    vec3 sphereNormal = (point - sphereCenter) / sphereRadius;\
    vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);\
    float diffuse = max(0.0, dot(-refractedLight, sphereNormal)) * 0.5;\
    vec4 info = texture2D(water, point.xz * 0.5 + 0.5);\
    if (point.y < info.r) {\
      vec4 caustic = texture2D(causticTex, 0.75 * (point.xz - point.y * refractedLight.xz / refractedLight.y) * 0.5 + 0.5);\
      diffuse *= caustic.r * 4.0;\
    }\
    color += diffuse;\
    \
    return color;\
  }\
  \
  vec3 getWallColor(vec3 point) {\
    float scale = 0.5;\
    \
    vec3 wallColor;\
    vec3 normal;\
    if (abs(point.x) > 0.999) {\
      wallColor = texture2D(tiles, point.yz * 0.5 + vec2(1.0, 0.5)).rgb;\
      normal = vec3(-point.x, 0.0, 0.0);\
    } else if (abs(point.z) > 0.999) {\
      wallColor = texture2D(tiles, point.yx * 0.5 + vec2(1.0, 0.5)).rgb;\
      normal = vec3(0.0, 0.0, -point.z);\
    } else {\
      wallColor = texture2D(tiles, point.xz * 0.5 + 0.5).rgb;\
      normal = vec3(0.0, 1.0, 0.0);\
    }\
    \
    scale /= length(point); /* pool ambient occlusion */\
    scale *= 1.0 - 0.9 / pow(length(point - sphereCenter) / sphereRadius, 4.0); /* sphere ambient occlusion */\
    \
    /* caustics */\
    vec3 refractedLight = -refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);\
    float diffuse = max(0.0, dot(refractedLight, normal));\
    vec4 info = texture2D(water, point.xz * 0.5 + 0.5);\
    if (point.y < info.r) {\
      vec4 caustic = texture2D(causticTex, 0.75 * (point.xz - point.y * refractedLight.xz / refractedLight.y) * 0.5 + 0.5);\
      scale += diffuse * caustic.r * 2.0 * caustic.g;\
    } else {\
      /* shadow for the rim of the pool */\
      vec2 t = intersectCube(point, refractedLight, vec3(-1.0, -poolHeight, -1.0), vec3(1.0, 2.0, 1.0));\
      diffuse *= 1.0 / (1.0 + exp(-200.0 / (1.0 + 10.0 * (t.y - t.x)) * (point.y + refractedLight.y * t.y - 2.0 / 12.0)));\
      \
      scale += diffuse * 0.5;\
    }\
    \
    return wallColor * scale;\
  }\
';

function Renderer() {
  this.tileTexture = GL.Texture.fromImage(document.getElementById('tiles'), {
    minFilter: gl.LINEAR_MIPMAP_LINEAR,
    wrap: gl.REPEAT,
    format: gl.RGB
  });
  this.lightDir = new GL.Vector(2.0, 2.0, -1.0).unit();
  this.causticTex = new GL.Texture(1024, 1024);
  this.waterMesh = GL.Mesh.plane({ detail: 200 });
  this.waterShaders = [];
  for (var i = 0; i < 2; i++) {
    this.waterShaders[i] = new GL.Shader('\
      uniform sampler2D water;\
      varying vec3 position;\
      void main() {\
        vec4 info = texture2D(water, gl_Vertex.xy * 0.5 + 0.5);\
        position = gl_Vertex.xzy;\
        position.y += info.r;\
        gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);\
      }\
    ', helperFunctions + '\
      uniform vec3 eye;\
      varying vec3 position;\
      uniform samplerCube sky;\
      \
      vec3 getSurfaceRayColor(vec3 origin, vec3 ray, vec3 waterColor) {\
        vec3 color;\
        float q = intersectSphere(origin, ray, sphereCenter, sphereRadius);\
        if (q < 1.0e6) {\
          color = getSphereColor(origin + ray * q);\
        } else if (ray.y < 0.0) {\
          vec2 t = intersectCube(origin, ray, vec3(-1.0, -poolHeight, -1.0), vec3(1.0, 2.0, 1.0));\
          color = getWallColor(origin + ray * t.y);\
        } else {\
          vec2 t = intersectCube(origin, ray, vec3(-1.0, -poolHeight, -1.0), vec3(1.0, 2.0, 1.0));\
          vec3 hit = origin + ray * t.y;\
          if (hit.y < 2.0 / 12.0) {\
            color = getWallColor(hit);\
          } else {\
            color = textureCube(sky, ray).rgb;\
            color += vec3(pow(max(0.0, dot(light, ray)), 5000.0)) * vec3(10.0, 8.0, 6.0);\
          }\
        }\
        if (ray.y < 0.0) color *= waterColor;\
        return color;\
      }\
      \
      void main() {\
        vec2 coord = position.xz * 0.5 + 0.5;\
        vec4 info = texture2D(water, coord);\
        \
        /* make water look more "peaked" */\
        for (int i = 0; i < 5; i++) {\
          coord += info.ba * 0.005;\
          info = texture2D(water, coord);\
        }\
        \
        vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);\
        vec3 incomingRay = normalize(position - eye);\
        \
        ' + (i ? /* underwater */ '\
          normal = -normal;\
          vec3 reflectedRay = reflect(incomingRay, normal);\
          vec3 refractedRay = refract(incomingRay, normal, IOR_WATER / IOR_AIR);\
          float fresnel = mix(0.5, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));\
          \
          vec3 reflectedColor = getSurfaceRayColor(position, reflectedRay, underwaterColor);\
          vec3 refractedColor = getSurfaceRayColor(position, refractedRay, vec3(1.0)) * vec3(0.8, 1.0, 1.1);\
          \
          gl_FragColor = vec4(mix(reflectedColor, refractedColor, (1.0 - fresnel) * length(refractedRay)), 1.0);\
        ' : /* above water */ '\
          vec3 reflectedRay = reflect(incomingRay, normal);\
          vec3 refractedRay = refract(incomingRay, normal, IOR_AIR / IOR_WATER);\
          float fresnel = mix(0.25, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));\
          \
          vec3 reflectedColor = getSurfaceRayColor(position, reflectedRay, abovewaterColor);\
          vec3 refractedColor = getSurfaceRayColor(position, refractedRay, abovewaterColor);\
          \
          gl_FragColor = vec4(mix(refractedColor, reflectedColor, fresnel), 1.0);\
        ') + '\
      }\
    ');
  }
  this.sphereMesh = GL.Mesh.sphere({ detail: 10 });
  this.sphereShader = new GL.Shader(helperFunctions + '\
    varying vec3 position;\
    void main() {\
      position = sphereCenter + gl_Vertex.xyz * sphereRadius;\
      gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);\
    }\
  ', helperFunctions + '\
    varying vec3 position;\
    void main() {\
      gl_FragColor = vec4(getSphereColor(position), 1.0);\
      vec4 info = texture2D(water, position.xz * 0.5 + 0.5);\
      if (position.y < info.r) {\
        gl_FragColor.rgb *= underwaterColor * 1.2;\
      }\
    }\
  ');
  this.cubeMesh = GL.Mesh.cube();
  this.cubeMesh.triangles.splice(4, 2);
  this.cubeMesh.compile();
  this.cubeShader = new GL.Shader(helperFunctions + '\
    varying vec3 position;\
    void main() {\
      position = gl_Vertex.xyz;\
      position.y = ((1.0 - position.y) * (7.0 / 12.0) - 1.0) * poolHeight;\
      gl_Position = gl_ModelViewProjectionMatrix * vec4(position, 1.0);\
    }\
  ', helperFunctions + '\
    varying vec3 position;\
    void main() {\
      gl_FragColor = vec4(getWallColor(position), 1.0);\
      vec4 info = texture2D(water, position.xz * 0.5 + 0.5);\
      if (position.y < info.r) {\
        gl_FragColor.rgb *= underwaterColor * 1.2;\
      }\
    }\
  ');
  this.sphereCenter = new GL.Vector();
  this.sphereRadius = 0;
  var hasDerivatives = !!gl.getExtension('OES_standard_derivatives');
  this.causticsShader = new GL.Shader(helperFunctions + '\
    varying vec3 oldPos;\
    varying vec3 newPos;\
    varying vec3 ray;\
    \
    /* project the ray onto the plane */\
    vec3 project(vec3 origin, vec3 ray, vec3 refractedLight) {\
      vec2 tcube = intersectCube(origin, ray, vec3(-1.0, -poolHeight, -1.0), vec3(1.0, 2.0, 1.0));\
      origin += ray * tcube.y;\
      float tplane = (-origin.y - 1.0) / refractedLight.y;\
      return origin + refractedLight * tplane;\
    }\
    \
    void main() {\
      vec4 info = texture2D(water, gl_Vertex.xy * 0.5 + 0.5);\
      info.ba *= 0.5;\
      vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);\
      \
      /* project the vertices along the refracted vertex ray */\
      vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);\
      ray = refract(-light, normal, IOR_AIR / IOR_WATER);\
      oldPos = project(gl_Vertex.xzy, refractedLight, refractedLight);\
      newPos = project(gl_Vertex.xzy + vec3(0.0, info.r, 0.0), ray, refractedLight);\
      \
      gl_Position = vec4(0.75 * (newPos.xz + refractedLight.xz / refractedLight.y), 0.0, 1.0);\
    }\
  ', (hasDerivatives ? '#extension GL_OES_standard_derivatives : enable\n' : '') + '\
    ' + helperFunctions + '\
    varying vec3 oldPos;\
    varying vec3 newPos;\
    varying vec3 ray;\
    \
    void main() {\
      ' + (hasDerivatives ? '\
        /* if the triangle gets smaller, it gets brighter, and vice versa */\
        float oldArea = length(dFdx(oldPos)) * length(dFdy(oldPos));\
        float newArea = length(dFdx(newPos)) * length(dFdy(newPos));\
        gl_FragColor = vec4(oldArea / newArea * 0.2, 1.0, 0.0, 0.0);\
      ' : '\
        gl_FragColor = vec4(0.2, 0.2, 0.0, 0.0);\
      ' ) + '\
      \
      vec3 refractedLight = refract(-light, vec3(0.0, 1.0, 0.0), IOR_AIR / IOR_WATER);\
      \
      /* compute a blob shadow and make sure we only draw a shadow if the player is blocking the light */\
      vec3 dir = (sphereCenter - newPos) / sphereRadius;\
      vec3 area = cross(dir, refractedLight);\
      float shadow = dot(area, area);\
      float dist = dot(dir, -refractedLight);\
      shadow = 1.0 + (shadow - 1.0) / (0.05 + dist * 0.025);\
      shadow = clamp(1.0 / (1.0 + exp(-shadow)), 0.0, 1.0);\
      shadow = mix(1.0, shadow, clamp(dist * 2.0, 0.0, 1.0));\
      gl_FragColor.g = shadow;\
      \
      /* shadow for the rim of the pool */\
      vec2 t = intersectCube(newPos, -refractedLight, vec3(-1.0, -poolHeight, -1.0), vec3(1.0, 2.0, 1.0));\
      gl_FragColor.r *= 1.0 / (1.0 + exp(-200.0 / (1.0 + 10.0 * (t.y - t.x)) * (newPos.y - refractedLight.y * t.y - 2.0 / 12.0)));\
    }\
  ');
}

Renderer.prototype.updateCaustics = function(water) {
  if (!this.causticsShader) return;
  var this_ = this;
  this.causticTex.drawTo(function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    water.textureA.bind(0);
    this_.causticsShader.uniforms({
      light: this_.lightDir,
      water: 0,
      sphereCenter: this_.sphereCenter,
      sphereRadius: this_.sphereRadius
    }).draw(this_.waterMesh);
  });
};

Renderer.prototype.renderWater = function(water, sky) {
  var tracer = new GL.Raytracer();
  water.textureA.bind(0);
  this.tileTexture.bind(1);
  sky.bind(2);
  this.causticTex.bind(3);
  gl.enable(gl.CULL_FACE);
  for (var i = 0; i < 2; i++) {
    gl.cullFace(i ? gl.BACK : gl.FRONT);
    this.waterShaders[i].uniforms({
      light: this.lightDir,
      water: 0,
      tiles: 1,
      sky: 2,
      causticTex: 3,
      eye: tracer.eye,
      sphereCenter: this.sphereCenter,
      sphereRadius: this.sphereRadius
    }).draw(this.waterMesh);
  }
  gl.disable(gl.CULL_FACE);
};

Renderer.prototype.renderSphere = function() {
  water.textureA.bind(0);
  this.causticTex.bind(1);
  this.sphereShader.uniforms({
    light: this.lightDir,
    water: 0,
    causticTex: 1,
    sphereCenter: this.sphereCenter,
    sphereRadius: this.sphereRadius
  }).draw(this.sphereMesh);
};

Renderer.prototype.renderCube = function() {
  gl.enable(gl.CULL_FACE);
  water.textureA.bind(0);
  this.tileTexture.bind(1);
  this.causticTex.bind(2);
  this.cubeShader.uniforms({
    light: this.lightDir,
    water: 0,
    tiles: 1,
    causticTex: 2,
    sphereCenter: this.sphereCenter,
    sphereRadius: this.sphereRadius
  }).draw(this.cubeMesh);
  gl.disable(gl.CULL_FACE);
};


/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */

// The data in the texture is (position.y, velocity.y, normal.x, normal.z)
function Water() {
  var vertexShader = '\
    varying vec2 coord;\
    void main() {\
      coord = gl_Vertex.xy * 0.5 + 0.5;\
      gl_Position = vec4(gl_Vertex.xyz, 1.0);\
    }\
  ';
  this.plane = GL.Mesh.plane();
  if (!gl.getExtension('OES_texture_float')) {
    var text = 'This demo requires the OES_texture_float extension';
    handleError(text);
    throw text;
  }
  this.textureA = new GL.Texture(256, 256, { type: gl.FLOAT });
  this.textureB = new GL.Texture(256, 256, { type: gl.FLOAT });
  this.dropShader = new GL.Shader(vertexShader, '\
    const float PI = 3.141592653589793;\
    uniform sampler2D texture;\
    uniform vec2 center;\
    uniform float radius;\
    uniform float strength;\
    varying vec2 coord;\
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* add the drop to the height */\
      float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);\
      drop = 0.5 - cos(drop * PI) * 0.5;\
      info.r += drop * strength;\
      \
      gl_FragColor = info;\
    }\
  ');
  this.updateShader = new GL.Shader(vertexShader, '\
    uniform sampler2D texture;\
    uniform vec2 delta;\
    varying vec2 coord;\
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* calculate average neighbor height */\
      vec2 dx = vec2(delta.x, 0.0);\
      vec2 dy = vec2(0.0, delta.y);\
      float average = (\
        texture2D(texture, coord - dx).r +\
        texture2D(texture, coord - dy).r +\
        texture2D(texture, coord + dx).r +\
        texture2D(texture, coord + dy).r\
      ) * 0.25;\
      \
      /* change the velocity to move toward the average */\
      info.g += (average - info.r) * 2.0;\
      \
      /* attenuate the velocity a little so waves do not last forever */\
      info.g *= 0.995;\
      \
      /* move the vertex along the velocity */\
      info.r += info.g;\
      \
      gl_FragColor = info;\
    }\
  ');
  this.normalShader = new GL.Shader(vertexShader, '\
    uniform sampler2D texture;\
    uniform vec2 delta;\
    varying vec2 coord;\
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* update the normal */\
      vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);\
      vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);\
      info.ba = normalize(cross(dy, dx)).xz;\
      \
      gl_FragColor = info;\
    }\
  ');
  this.sphereShader = new GL.Shader(vertexShader, '\
    uniform sampler2D texture;\
    uniform vec3 oldCenter;\
    uniform vec3 newCenter;\
    uniform float radius;\
    varying vec2 coord;\
    \
    float volumeInSphere(vec3 center) {\
      vec3 toCenter = vec3(coord.x * 2.0 - 1.0, 0.0, coord.y * 2.0 - 1.0) - center;\
      float t = length(toCenter) / radius;\
      float dy = exp(-pow(t * 1.5, 6.0));\
      float ymin = min(0.0, center.y - dy);\
      float ymax = min(max(0.0, center.y + dy), ymin + 2.0 * dy);\
      return (ymax - ymin) * 0.1;\
    }\
    \
    void main() {\
      /* get vertex info */\
      vec4 info = texture2D(texture, coord);\
      \
      /* add the old volume */\
      info.r += volumeInSphere(oldCenter);\
      \
      /* subtract the new volume */\
      info.r -= volumeInSphere(newCenter);\
      \
      gl_FragColor = info;\
    }\
  ');
}

Water.prototype.addDrop = function(x, y, radius, strength) {
  var this_ = this;
  this.textureB.drawTo(function() {
    this_.textureA.bind();
    this_.dropShader.uniforms({
      center: [x, y],
      radius: radius,
      strength: strength
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

Water.prototype.moveSphere = function(oldCenter, newCenter, radius) {
  var this_ = this;
  this.textureB.drawTo(function() {
    this_.textureA.bind();
    this_.sphereShader.uniforms({
      oldCenter: oldCenter,
      newCenter: newCenter,
      radius: radius
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

Water.prototype.stepSimulation = function() {
  var this_ = this;
  this.textureB.drawTo(function() {
    this_.textureA.bind();
    this_.updateShader.uniforms({
      delta: [1 / this_.textureA.width, 1 / this_.textureA.height]
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

Water.prototype.updateNormals = function() {
  var this_ = this;
  this.textureB.drawTo(function() {
    this_.textureA.bind();
    this_.normalShader.uniforms({
      delta: [1 / this_.textureA.width, 1 / this_.textureA.height]
    }).draw(this_.plane);
  });
  this.textureB.swapWith(this.textureA);
};

/*
 * WebGL Water
 * http://madebyevan.com/webgl-water/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */


function text2html(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

function handleError(text) {
  var html = text2html(text);
  if (html == 'WebGL not supported') {
    html = 'Your browser does not support WebGL.<br>Please see\
    <a href="http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">\
    Getting a WebGL Implementation</a>.';
  }
  var loading = document.getElementById('loading');
  loading.innerHTML = html;
  loading.style.zIndex = 1;
}

window.onerror = handleError;

var gl = GL.create();
var water;
var cubemap;
var renderer;
var angleX = -25;
var angleY = -200.5;

// Sphere physics info
var useSpherePhysics = false;
var center;
var oldCenter;
var velocity;
var gravity;
var radius;
var paused = false;


window.onload = function() {
  function onresize() {
    gl.canvas.width = 900;
    gl.canvas.height = 500;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.perspective(45, gl.canvas.width / gl.canvas.height, 0.01, 100);
    gl.matrixMode(gl.MODELVIEW);
    draw();
  }

  var loading = document.getElementById('loading');
  loading.innerHTML = '';
  loading.appendChild(gl.canvas);
  gl.clearColor(0, 0, 0, 1);

  water = new Water();
  renderer = new Renderer();
  cubemap = new Cubemap({
    xneg: document.getElementById('xneg'),
    xpos: document.getElementById('xpos'),
    yneg: document.getElementById('ypos'),
    ypos: document.getElementById('ypos'),
    zneg: document.getElementById('zneg'),
    zpos: document.getElementById('zpos')
  });

  center = oldCenter = new GL.Vector(-0.4, -0.75, 0.2);
  velocity = new GL.Vector();
  gravity = new GL.Vector(0, -4, 0);
  radius = 0.25;

  for (var i = 0; i < 20; i++) {
    water.addDrop(Math.random() * 2 - 1, Math.random() * 2 - 1, 0.03, (i & 1) ? 0.01 : -0.01);
  }

  //document.getElementById('loading').innerHTML = '';
  onresize();

  var prevTime = new Date().getTime();
  setInterval(function() {
    var nextTime = new Date().getTime();
    if (!paused) {
      update((nextTime - prevTime) / 1000);
      draw();
    }
    prevTime = nextTime;
  }, 1000 / 60);

  window.onresize = onresize;

  var prevHit;
  var planeNormal;
  var mode = -1;
  var MODE_ADD_DROPS = 0;
  var MODE_MOVE_SPHERE = 1;
  var MODE_ORBIT_CAMERA = 2;

  gl.canvas.addEventListener('click', function(e){
  	 var tracer = new GL.Raytracer();
     var ray = tracer.getRayForPixel(e.x, e.y);
     var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
     water.addDrop(pointOnPlane.x, pointOnPlane.z, 0.03, 0.01);
  },false);
  gl.onmousedown = function(e) {

  	if(!window.slideFlag){
  		return;
  	}
    var tracer = new GL.Raytracer();
    var ray = tracer.getRayForPixel(e.x, e.y);
    var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
    var sphereHitTest = GL.Raytracer.hitTestSphere(tracer.eye, ray, center, radius);
    if (sphereHitTest) {
      mode = MODE_MOVE_SPHERE;
      prevHit = sphereHitTest.hit;
      planeNormal = tracer.getRayForPixel(gl.canvas.width / 2, gl.canvas.height / 2).negative();
    } else if (Math.abs(pointOnPlane.x) < 1 && Math.abs(pointOnPlane.z) < 1) {
      mode = MODE_ADD_DROPS;
      gl.onmousemove(e);
    } else {
      mode = MODE_ORBIT_CAMERA;
    }
  };

  gl.onmouseup = function(e) {
  	if(!window.slideFlag){
  		return;
  	}
    mode = -1;
  };

  gl.onmousemove = function(e) {
  	if(!window.slideFlag){
  		return;
  	}
    switch (mode) {
      case MODE_ADD_DROPS:
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(e.x, e.y);
        var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
        water.addDrop(pointOnPlane.x, pointOnPlane.z, 0.03, 0.01);
        if (paused) {
          water.updateNormals();
          renderer.updateCaustics(water);
        }
        break;
      case MODE_MOVE_SPHERE:
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(e.x, e.y);
        var t = -planeNormal.dot(tracer.eye.subtract(prevHit)) / planeNormal.dot(ray);
        var nextHit = tracer.eye.add(ray.multiply(t));
        center = center.add(nextHit.subtract(prevHit));
        center.x = Math.max(radius - 1, Math.min(1 - radius, center.x));
        center.y = Math.max(radius - 1, Math.min(10, center.y));
        center.z = Math.max(radius - 1, Math.min(1 - radius, center.z));
        prevHit = nextHit;
        if (paused) renderer.updateCaustics(water);
        break;
      case MODE_ORBIT_CAMERA:
        angleY -= e.deltaX;
        angleX -= e.deltaY;
        angleX = Math.max(-90, Math.min(90, angleX));
        break;
    }
    if (paused) draw();
  };

  document.onkeydown = function(e) {
  	if(!window.slideFlag){
  		return;
  	}
    if (e.which == 'S'.charCodeAt(0)) {
    	paused = !paused;
    }
    else if (e.which == 'G'.charCodeAt(0)) {
    	useSpherePhysics = !useSpherePhysics;
    }
    else if (e.which == 'D'.charCodeAt(0) && paused) {
    	draw();
    }
    
  };

  var frame = 0;

  function update(seconds) {
  	if(!window.slideFlag){
  		return;
  	}
    if (seconds > 1) return;
    frame += seconds * 2;

    if (mode == MODE_MOVE_SPHERE) {
      // Start from rest when the player releases the mouse after moving the sphere
      velocity = new GL.Vector();
    } else if (useSpherePhysics) {
      // Fall down with viscosity under water
      var percentUnderWater = Math.max(0, Math.min(1, (radius - center.y) / (2 * radius)));
      velocity = velocity.add(gravity.multiply(seconds - 1.1 * seconds * percentUnderWater));
      velocity = velocity.subtract(velocity.unit().multiply(percentUnderWater * seconds * velocity.dot(velocity)));
      center = center.add(velocity.multiply(seconds));

      // Bounce off the bottom
      if (center.y < radius - 1) {
        center.y = radius - 1;
        velocity.y = Math.abs(velocity.y) * 0.7;
      }
    }

    // Displace water around the sphere
    water.moveSphere(oldCenter, center, radius);
    oldCenter = center;

    // Update the water simulation and graphics
    water.stepSimulation();
    water.stepSimulation();
    water.updateNormals();
    renderer.updateCaustics(water);
  }

  function draw() {
  	if(!window.slideFlag){
  		return;
  	}
    // Change the light direction to the camera look vector when the L key is pressed
    if (GL.keys.D) {
      renderer.lightDir = GL.Vector.fromAngles((90 - angleY) * Math.PI / 180, -angleX * Math.PI / 180);
      if (paused) renderer.updateCaustics(water);
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -4);
    gl.rotate(-angleX, 1, 0, 0);
    gl.rotate(-angleY, 0, 1, 0);
    gl.translate(0, 0.5, 0);

    gl.enable(gl.DEPTH_TEST);
    renderer.sphereCenter = center;
    renderer.sphereRadius = radius;
    renderer.renderCube();
    renderer.renderWater(water, cubemap);
    renderer.renderSphere();
    gl.disable(gl.DEPTH_TEST);
  }
};

