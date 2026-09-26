(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fh="186",v0=0,Rd=1,b0=2,Ya=1,_0=2,Er=3,os=0,An=1,tn=2,ao=0,kr=1,Hs=2,Id=3,Pd=4,w0=5,zs=100,M0=101,S0=102,T0=103,E0=104,A0=200,C0=201,R0=202,I0=203,Ef=204,Af=205,P0=206,L0=207,k0=208,N0=209,D0=210,U0=211,z0=212,O0=213,F0=214,Cc=0,Rc=1,Ic=2,qr=3,Pc=4,Lc=5,kc=6,Nc=7,Bh=0,B0=1,H0=2,Oi=0,Cf=1,Rf=2,If=3,Hh=4,Pf=5,Lf=6,kf=7,Nf=300,ss=301,Ys=302,Ul=303,zl=304,El=306,sl=1e3,ro=1001,Dc=1002,En=1003,G0=1004,aa=1005,Ln=1006,Ol=1007,Zo=1008,ni=1009,Df=1010,Uf=1011,$r=1012,Gh=1013,Bi=1014,bi=1015,Hi=1016,Vh=1017,Wh=1018,Yr=1020,zf=35902,Of=35899,Ff=1021,Bf=1022,_i=1023,ho=1026,jo=1027,Xh=1028,qh=1029,rs=1030,$h=1031,Yh=1033,Ja=33776,Ka=33777,Za=33778,ja=33779,Uc=35840,zc=35841,Oc=35842,Fc=35843,Bc=36196,Hc=37492,Gc=37496,Vc=37488,Wc=37489,rl=37490,Xc=37491,qc=37808,$c=37809,Yc=37810,Jc=37811,Kc=37812,Zc=37813,jc=37814,Qc=37815,eh=37816,th=37817,nh=37818,ih=37819,oh=37820,sh=37821,rh=36492,ah=36494,lh=36495,ch=36283,hh=36284,al=36285,dh=36286,V0=3200,ll=0,W0=1,oo="",Wn="srgb",cl="srgb-linear",hl="linear",Vt="srgb",Fl=7680,X0=519,q0=512,$0=513,Y0=514,Jh=515,J0=516,K0=517,Kh=518,Z0=519,Hf=35044,Ld="300 es",zi=2e3,Jr=2001;function j0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function dl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Q0(){const n=dl("canvas");return n.style.display="block",n}const kd={};function ul(...n){const e="THREE."+n.shift();console.log(e,...n)}function Gf(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function et(...n){n=Gf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Lt(...n){n=Gf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Gs(...n){const e=n.join(" ");e in kd||(kd[e]=!0,et(...n))}function em(n,e,t){return new Promise(function(i,o){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:o();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const tm={[Cc]:Rc,[Ic]:kc,[Pc]:Nc,[qr]:Lc,[Rc]:Cc,[kc]:Ic,[Nc]:Pc,[Lc]:qr};class hs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const o=i[e];if(o!==void 0){const s=o.indexOf(t);s!==-1&&o.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const o=i.slice(0);for(let s=0,r=o.length;s<r;s++)o[s].call(this,e);e.target=null}}}const Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nd=1234567;const Nr=Math.PI/180,Kr=180/Math.PI;function Fi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Cn[n&255]+Cn[n>>8&255]+Cn[n>>16&255]+Cn[n>>24&255]+"-"+Cn[e&255]+Cn[e>>8&255]+"-"+Cn[e>>16&15|64]+Cn[e>>24&255]+"-"+Cn[t&63|128]+Cn[t>>8&255]+"-"+Cn[t>>16&255]+Cn[t>>24&255]+Cn[i&255]+Cn[i>>8&255]+Cn[i>>16&255]+Cn[i>>24&255]).toLowerCase()}function pt(n,e,t){return Math.max(e,Math.min(t,n))}function Zh(n,e){return(n%e+e)%e}function nm(n,e,t,i,o){return i+(n-e)*(o-i)/(t-e)}function im(n,e,t){return n!==e?(t-n)/(e-n):0}function Dr(n,e,t){return(1-t)*n+t*e}function om(n,e,t,i){return Dr(n,e,1-Math.exp(-t*i))}function sm(n,e=1){return e-Math.abs(Zh(n,e*2)-e)}function rm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function am(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function lm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function cm(n,e){return n+Math.random()*(e-n)}function hm(n){return n*(.5-Math.random())}function dm(n){n!==void 0&&(Nd=n);let e=Nd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function um(n){return n*Nr}function fm(n){return n*Kr}function pm(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function mm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function gm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ym(n,e,t,i,o){const s=Math.cos,r=Math.sin,a=s(t/2),l=r(t/2),c=s((e+i)/2),d=r((e+i)/2),u=s((e-i)/2),f=r((e-i)/2),h=s((i-e)/2),p=r((i-e)/2);switch(o){case"XYX":n.set(a*d,l*u,l*f,a*c);break;case"YZY":n.set(l*f,a*d,l*u,a*c);break;case"ZXZ":n.set(l*u,l*f,a*d,a*c);break;case"XZX":n.set(a*d,l*p,l*h,a*c);break;case"YXY":n.set(l*h,a*d,l*p,a*c);break;case"ZYZ":n.set(l*p,l*h,a*d,a*c);break;default:et("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function vi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Vf={DEG2RAD:Nr,RAD2DEG:Kr,generateUUID:Fi,clamp:pt,euclideanModulo:Zh,mapLinear:nm,inverseLerp:im,lerp:Dr,damp:om,pingpong:sm,smoothstep:rm,smootherstep:am,randInt:lm,randFloat:cm,randFloatSpread:hm,seededRandom:dm,degToRad:um,radToDeg:fm,isPowerOfTwo:pm,ceilPowerOfTwo:mm,floorPowerOfTwo:gm,setQuaternionFromProperEuler:ym,normalize:qt,denormalize:vi},Md=class Md{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6],this.y=o[1]*t+o[4]*i+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),o=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*o+e.x,this.y=s*o+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Md.prototype.isVector2=!0;let Ce=Md;class lo{constructor(e=0,t=0,i=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=o}static slerpFlat(e,t,i,o,s,r,a){let l=i[o+0],c=i[o+1],d=i[o+2],u=i[o+3],f=s[r+0],h=s[r+1],p=s[r+2],y=s[r+3];if(u!==y||l!==f||c!==h||d!==p){let g=l*f+c*h+d*p+u*y;g<0&&(f=-f,h=-h,p=-p,y=-y,g=-g);let m=1-a;if(g<.9995){const M=Math.acos(g),E=Math.sin(M);m=Math.sin(m*M)/E,a=Math.sin(a*M)/E,l=l*m+f*a,c=c*m+h*a,d=d*m+p*a,u=u*m+y*a}else{l=l*m+f*a,c=c*m+h*a,d=d*m+p*a,u=u*m+y*a;const M=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=M,c*=M,d*=M,u*=M}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,o,s,r){const a=i[o],l=i[o+1],c=i[o+2],d=i[o+3],u=s[r],f=s[r+1],h=s[r+2],p=s[r+3];return e[t]=a*p+d*u+l*h-c*f,e[t+1]=l*p+d*f+c*u-a*h,e[t+2]=c*p+d*h+a*f-l*u,e[t+3]=d*p-a*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,o){return this._x=e,this._y=t,this._z=i,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,o=e._y,s=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(o/2),u=a(s/2),f=l(i/2),h=l(o/2),p=l(s/2);switch(r){case"XYZ":this._x=f*d*u+c*h*p,this._y=c*h*u-f*d*p,this._z=c*d*p+f*h*u,this._w=c*d*u-f*h*p;break;case"YXZ":this._x=f*d*u+c*h*p,this._y=c*h*u-f*d*p,this._z=c*d*p-f*h*u,this._w=c*d*u+f*h*p;break;case"ZXY":this._x=f*d*u-c*h*p,this._y=c*h*u+f*d*p,this._z=c*d*p+f*h*u,this._w=c*d*u-f*h*p;break;case"ZYX":this._x=f*d*u-c*h*p,this._y=c*h*u+f*d*p,this._z=c*d*p-f*h*u,this._w=c*d*u+f*h*p;break;case"YZX":this._x=f*d*u+c*h*p,this._y=c*h*u+f*d*p,this._z=c*d*p-f*h*u,this._w=c*d*u-f*h*p;break;case"XZY":this._x=f*d*u-c*h*p,this._y=c*h*u-f*d*p,this._z=c*d*p+f*h*u,this._w=c*d*u+f*h*p;break;default:et("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,o=Math.sin(i);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],o=t[4],s=t[8],r=t[1],a=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=i+a+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(s-c)*h,this._z=(r-o)*h}else if(i>a&&i>u){const h=2*Math.sqrt(1+i-a-u);this._w=(d-l)/h,this._x=.25*h,this._y=(o+r)/h,this._z=(s+c)/h}else if(a>u){const h=2*Math.sqrt(1+a-i-u);this._w=(s-c)/h,this._x=(o+r)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-i-a);this._w=(r-o)/h,this._x=(s+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const o=Math.min(1,t/i);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,o=e._y,s=e._z,r=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+r*a+o*c-s*l,this._y=o*d+r*l+s*a-i*c,this._z=s*d+r*c+i*l-o*a,this._w=r*d-i*a-o*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,o=e._y,s=e._z,r=e._w,a=this.dot(e);a<0&&(i=-i,o=-o,s=-s,r=-r,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+o*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+o*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),o=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(o*Math.sin(e),o*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Sd=class Sd{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,o=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*o,this.y=s[1]*t+s[4]*i+s[7]*o,this.z=s[2]*t+s[5]*i+s[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,o=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*o+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*o+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*o+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*o+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,o=this.z,s=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*o-a*i),d=2*(a*t-s*o),u=2*(s*i-r*t);return this.x=t+l*c+r*u-a*d,this.y=i+l*d+a*c-s*u,this.z=o+l*u+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,o=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*o,this.y=s[1]*t+s[5]*i+s[9]*o,this.z=s[2]*t+s[6]*i+s[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,o=e.y,s=e.z,r=t.x,a=t.y,l=t.z;return this.x=o*l-s*a,this.y=s*r-i*l,this.z=i*a-o*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Bl.copy(this).projectOnVector(e),this.sub(Bl)}reflect(e){return this.sub(Bl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,o=this.z-e.z;return t*t+i*i+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const o=Math.sin(t)*e;return this.x=o*Math.sin(i),this.y=Math.cos(t)*e,this.z=o*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sd.prototype.isVector3=!0;let F=Sd;const Bl=new F,Dd=new lo,Td=class Td{constructor(e,t,i,o,s,r,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,o,s,r,a,l,c)}set(e,t,i,o,s,r,a,l,c){const d=this.elements;return d[0]=e,d[1]=o,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,o=t.elements,s=this.elements,r=i[0],a=i[3],l=i[6],c=i[1],d=i[4],u=i[7],f=i[2],h=i[5],p=i[8],y=o[0],g=o[3],m=o[6],M=o[1],E=o[4],_=o[7],R=o[2],A=o[5],N=o[8];return s[0]=r*y+a*M+l*R,s[3]=r*g+a*E+l*A,s[6]=r*m+a*_+l*N,s[1]=c*y+d*M+u*R,s[4]=c*g+d*E+u*A,s[7]=c*m+d*_+u*N,s[2]=f*y+h*M+p*R,s[5]=f*g+h*E+p*A,s[8]=f*m+h*_+p*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],o=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*r*d-t*a*c-i*s*d+i*a*l+o*s*c-o*r*l}invert(){const e=this.elements,t=e[0],i=e[1],o=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=d*r-a*c,f=a*l-d*s,h=c*s-r*l,p=t*u+i*f+o*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/p;return e[0]=u*y,e[1]=(o*c-d*i)*y,e[2]=(a*i-o*r)*y,e[3]=f*y,e[4]=(d*t-o*l)*y,e[5]=(o*s-a*t)*y,e[6]=h*y,e[7]=(i*l-c*t)*y,e[8]=(r*t-i*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,o,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*a)+r+e,-o*c,o*l,-o*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return Gs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return Gs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return Gs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let o=0;o<9;o++)if(t[o]!==i[o])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Td.prototype.isMatrix3=!0;let st=Td;const Hl=new st,Ud=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zd=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xm(){const n={enabled:!0,workingColorSpace:cl,spaces:{},convert:function(o,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Vt&&(o.r=co(o.r),o.g=co(o.g),o.b=co(o.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(o.applyMatrix3(this.spaces[s].toXYZ),o.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Vt&&(o.r=Vs(o.r),o.g=Vs(o.g),o.b=Vs(o.b))),o},workingToColorSpace:function(o,s){return this.convert(o,this.workingColorSpace,s)},colorSpaceToWorking:function(o,s){return this.convert(o,s,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===oo?hl:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,s=this.workingColorSpace){return o.fromArray(this.spaces[s].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,s,r){return o.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,s){return Gs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(o,s)},toWorkingColorSpace:function(o,s){return Gs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(o,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[cl]:{primaries:e,whitePoint:i,transfer:hl,toXYZ:Ud,fromXYZ:zd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:e,whitePoint:i,transfer:Vt,toXYZ:Ud,fromXYZ:zd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),n}const Et=xm();function co(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let gs;class vm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{gs===void 0&&(gs=dl("canvas")),gs.width=e.width,gs.height=e.height;const o=gs.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),i=gs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const o=i.getImageData(0,0,e.width,e.height),s=o.data;for(let r=0;r<s.length;r++)s[r]=co(s[r]/255)*255;return i.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(co(t[i]/255)*255):t[i]=co(t[i]);return{data:t,width:e.width,height:e.height}}else return et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bm=0;class jh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Fi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},o=this.data;if(o!==null){let s;if(Array.isArray(o)){s=[];for(let r=0,a=o.length;r<a;r++)o[r].isDataTexture?s.push(Gl(o[r].image)):s.push(Gl(o[r]))}else s=Gl(o);i.url=s}return t||(e.images[this.uuid]=i),i}}function Gl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(et("Texture: Unable to serialize Texture."),{})}let _m=0;const Vl=new F;class kn extends hs{constructor(e=kn.DEFAULT_IMAGE,t=kn.DEFAULT_MAPPING,i=ro,o=ro,s=Ln,r=Zo,a=_i,l=ni,c=kn.DEFAULT_ANISOTROPY,d=oo){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Fi(),this.name="",this.source=new jh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=o,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vl).x}get height(){return this.source.getSize(Vl).y}get depth(){return this.source.getSize(Vl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){et(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){et(`Texture.setValues(): property '${t}' does not exist.`);continue}o&&i&&o.isVector2&&i.isVector2||o&&i&&o.isVector3&&i.isVector3||o&&i&&o.isMatrix3&&i.isMatrix3?o.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sl:e.x=e.x-Math.floor(e.x);break;case ro:e.x=e.x<0?0:1;break;case Dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sl:e.y=e.y-Math.floor(e.y);break;case ro:e.y=e.y<0?0:1;break;case Dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=Nf;kn.DEFAULT_ANISOTROPY=1;const Ed=class Ed{constructor(e=0,t=0,i=0,o=1){this.x=e,this.y=t,this.z=i,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,o){return this.x=e,this.y=t,this.z=i,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,o=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*o+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*o+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*o+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*o+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,o,s;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,_=(h+1)/2,R=(m+1)/2,A=(d+f)/4,N=(u+y)/4,b=(p+g)/4;return E>_&&E>R?E<.01?(i=0,o=.707106781,s=.707106781):(i=Math.sqrt(E),o=A/i,s=N/i):_>R?_<.01?(i=.707106781,o=0,s=.707106781):(o=Math.sqrt(_),i=A/o,s=b/o):R<.01?(i=.707106781,o=.707106781,s=0):(s=Math.sqrt(R),i=N/s,o=b/s),this.set(i,o,s,t),this}let M=Math.sqrt((g-p)*(g-p)+(u-y)*(u-y)+(f-d)*(f-d));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(u-y)/M,this.z=(f-d)/M,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ed.prototype.isVector4=!0;let rn=Ed;class wm extends hs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rn(0,0,e,t),this.scissorTest=!1,this.viewport=new rn(0,0,e,t),this.textures=[];const o={width:e,height:t,depth:i.depth},s=new kn(o),r=i.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let o=0,s=this.textures.length;o<s;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=i,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new jh(o)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends wm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Wf extends kn{constructor(e=null,t=1,i=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:o},this.magFilter=En,this.minFilter=En,this.wrapR=ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mm extends kn{constructor(e=null,t=1,i=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:o},this.magFilter=En,this.minFilter=En,this.wrapR=ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Tl=class Tl{constructor(e,t,i,o,s,r,a,l,c,d,u,f,h,p,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,o,s,r,a,l,c,d,u,f,h,p,y,g)}set(e,t,i,o,s,r,a,l,c,d,u,f,h,p,y,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=o,m[1]=s,m[5]=r,m[9]=a,m[13]=l,m[2]=c,m[6]=d,m[10]=u,m[14]=f,m[3]=h,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tl().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,o=1/ys.setFromMatrixColumn(e,0).length(),s=1/ys.setFromMatrixColumn(e,1).length(),r=1/ys.setFromMatrixColumn(e,2).length();return t[0]=i[0]*o,t[1]=i[1]*o,t[2]=i[2]*o,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,o=e.y,s=e.z,r=Math.cos(i),a=Math.sin(i),l=Math.cos(o),c=Math.sin(o),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=r*d,h=r*u,p=a*d,y=a*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+p*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=p+h*c,t[10]=r*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,p=c*d,y=c*u;t[0]=f+y*a,t[4]=p*a-h,t[8]=r*c,t[1]=r*u,t[5]=r*d,t[9]=-a,t[2]=h*a-p,t[6]=y+f*a,t[10]=r*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,p=c*d,y=c*u;t[0]=f-y*a,t[4]=-r*u,t[8]=p+h*a,t[1]=h+p*a,t[5]=r*d,t[9]=y-f*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const f=r*d,h=r*u,p=a*d,y=a*u;t[0]=l*d,t[4]=p*c-h,t[8]=f*c+y,t[1]=l*u,t[5]=y*c+f,t[9]=h*c-p,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const f=r*l,h=r*c,p=a*l,y=a*c;t[0]=l*d,t[4]=y-f*u,t[8]=p*u+h,t[1]=u,t[5]=r*d,t[9]=-a*d,t[2]=-c*d,t[6]=h*u+p,t[10]=f-y*u}else if(e.order==="XZY"){const f=r*l,h=r*c,p=a*l,y=a*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+y,t[5]=r*d,t[9]=h*u-p,t[2]=p*u-h,t[6]=a*d,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sm,e,Tm)}lookAt(e,t,i){const o=this.elements;return Kn.subVectors(e,t),Kn.lengthSq()===0&&(Kn.z=1),Kn.normalize(),bo.crossVectors(i,Kn),bo.lengthSq()===0&&(Math.abs(i.z)===1?Kn.x+=1e-4:Kn.z+=1e-4,Kn.normalize(),bo.crossVectors(i,Kn)),bo.normalize(),la.crossVectors(Kn,bo),o[0]=bo.x,o[4]=la.x,o[8]=Kn.x,o[1]=bo.y,o[5]=la.y,o[9]=Kn.y,o[2]=bo.z,o[6]=la.z,o[10]=Kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,o=t.elements,s=this.elements,r=i[0],a=i[4],l=i[8],c=i[12],d=i[1],u=i[5],f=i[9],h=i[13],p=i[2],y=i[6],g=i[10],m=i[14],M=i[3],E=i[7],_=i[11],R=i[15],A=o[0],N=o[4],b=o[8],C=o[12],S=o[1],V=o[5],$=o[9],T=o[13],I=o[2],k=o[6],L=o[10],Z=o[14],j=o[3],ne=o[7],ce=o[11],pe=o[15];return s[0]=r*A+a*S+l*I+c*j,s[4]=r*N+a*V+l*k+c*ne,s[8]=r*b+a*$+l*L+c*ce,s[12]=r*C+a*T+l*Z+c*pe,s[1]=d*A+u*S+f*I+h*j,s[5]=d*N+u*V+f*k+h*ne,s[9]=d*b+u*$+f*L+h*ce,s[13]=d*C+u*T+f*Z+h*pe,s[2]=p*A+y*S+g*I+m*j,s[6]=p*N+y*V+g*k+m*ne,s[10]=p*b+y*$+g*L+m*ce,s[14]=p*C+y*T+g*Z+m*pe,s[3]=M*A+E*S+_*I+R*j,s[7]=M*N+E*V+_*k+R*ne,s[11]=M*b+E*$+_*L+R*ce,s[15]=M*C+E*T+_*Z+R*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],o=e[8],s=e[12],r=e[1],a=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],p=e[3],y=e[7],g=e[11],m=e[15],M=l*h-c*f,E=a*h-c*u,_=a*f-l*u,R=r*h-c*d,A=r*f-l*d,N=r*u-a*d;return t*(y*M-g*E+m*_)-i*(p*M-g*R+m*A)+o*(p*E-y*R+m*N)-s*(p*_-y*A+g*N)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],o=e[8],s=e[1],r=e[5],a=e[9],l=e[2],c=e[6],d=e[10];return t*(r*d-a*c)-i*(s*d-a*l)+o*(s*c-r*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],o=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],p=e[12],y=e[13],g=e[14],m=e[15],M=t*a-i*r,E=t*l-o*r,_=t*c-s*r,R=i*l-o*a,A=i*c-s*a,N=o*c-s*l,b=d*y-u*p,C=d*g-f*p,S=d*m-h*p,V=u*g-f*y,$=u*m-h*y,T=f*m-h*g,I=M*T-E*$+_*V+R*S-A*C+N*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return e[0]=(a*T-l*$+c*V)*k,e[1]=(o*$-i*T-s*V)*k,e[2]=(y*N-g*A+m*R)*k,e[3]=(f*A-u*N-h*R)*k,e[4]=(l*S-r*T-c*C)*k,e[5]=(t*T-o*S+s*C)*k,e[6]=(g*_-p*N-m*E)*k,e[7]=(d*N-f*_+h*E)*k,e[8]=(r*$-a*S+c*b)*k,e[9]=(i*S-t*$-s*b)*k,e[10]=(p*A-y*_+m*M)*k,e[11]=(u*_-d*A-h*M)*k,e[12]=(a*C-r*V-l*b)*k,e[13]=(t*V-i*C+o*b)*k,e[14]=(y*E-p*R-g*M)*k,e[15]=(d*R-u*E+f*M)*k,this}scale(e){const t=this.elements,i=e.x,o=e.y,s=e.z;return t[0]*=i,t[4]*=o,t[8]*=s,t[1]*=i,t[5]*=o,t[9]*=s,t[2]*=i,t[6]*=o,t[10]*=s,t[3]*=i,t[7]*=o,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,o))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),o=Math.sin(t),s=1-i,r=e.x,a=e.y,l=e.z,c=s*r,d=s*a;return this.set(c*r+i,c*a-o*l,c*l+o*a,0,c*a+o*l,d*a+i,d*l-o*r,0,c*l-o*a,d*l+o*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,o,s,r){return this.set(1,i,s,0,e,1,r,0,t,o,1,0,0,0,0,1),this}compose(e,t,i){const o=this.elements,s=t._x,r=t._y,a=t._z,l=t._w,c=s+s,d=r+r,u=a+a,f=s*c,h=s*d,p=s*u,y=r*d,g=r*u,m=a*u,M=l*c,E=l*d,_=l*u,R=i.x,A=i.y,N=i.z;return o[0]=(1-(y+m))*R,o[1]=(h+_)*R,o[2]=(p-E)*R,o[3]=0,o[4]=(h-_)*A,o[5]=(1-(f+m))*A,o[6]=(g+M)*A,o[7]=0,o[8]=(p+E)*N,o[9]=(g-M)*N,o[10]=(1-(f+y))*N,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,i){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let r=ys.set(o[0],o[1],o[2]).length();const a=ys.set(o[4],o[5],o[6]).length(),l=ys.set(o[8],o[9],o[10]).length();s<0&&(r=-r),mi.copy(this);const c=1/r,d=1/a,u=1/l;return mi.elements[0]*=c,mi.elements[1]*=c,mi.elements[2]*=c,mi.elements[4]*=d,mi.elements[5]*=d,mi.elements[6]*=d,mi.elements[8]*=u,mi.elements[9]*=u,mi.elements[10]*=u,t.setFromRotationMatrix(mi),i.x=r,i.y=a,i.z=l,this}makePerspective(e,t,i,o,s,r,a=zi,l=!1){const c=this.elements,d=2*s/(t-e),u=2*s/(i-o),f=(t+e)/(t-e),h=(i+o)/(i-o);let p,y;if(l)p=s/(r-s),y=r*s/(r-s);else if(a===zi)p=-(r+s)/(r-s),y=-2*r*s/(r-s);else if(a===Jr)p=-r/(r-s),y=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,o,s,r,a=zi,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-o),f=-(t+e)/(t-e),h=-(i+o)/(i-o);let p,y;if(l)p=1/(r-s),y=r/(r-s);else if(a===zi)p=-2/(r-s),y=-(r+s)/(r-s);else if(a===Jr)p=-1/(r-s),y=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let o=0;o<16;o++)if(t[o]!==i[o])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Tl.prototype.isMatrix4=!0;let Ct=Tl;const ys=new F,mi=new Ct,Sm=new F(0,0,0),Tm=new F(1,1,1),bo=new F,la=new F,Kn=new F,Od=new Ct,Fd=new lo;class di{constructor(e=0,t=0,i=0,o=di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,o=this._order){return this._x=e,this._y=t,this._z=i,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const o=e.elements,s=o[0],r=o[4],a=o[8],l=o[1],c=o[5],d=o[9],u=o[2],f=o[6],h=o[10];switch(t){case"XYZ":this._y=Math.asin(pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-pt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,h),this._y=0);break;default:et("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Od,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fd.setFromEuler(this),this.setFromQuaternion(Fd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class Qh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Em=0;const Bd=new F,xs=new lo,Ji=new Ct,ca=new F,lr=new F,Am=new F,Cm=new lo,Hd=new F(1,0,0),Gd=new F(0,1,0),Vd=new F(0,0,1),Wd={type:"added"},Rm={type:"removed"},vs={type:"childadded",child:null},Wl={type:"childremoved",child:null};class xn extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=Fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xn.DEFAULT_UP.clone();const e=new F,t=new di,i=new lo,o=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ct},normalMatrix:{value:new st}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=xn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Hd,e)}rotateY(e){return this.rotateOnAxis(Gd,e)}rotateZ(e){return this.rotateOnAxis(Vd,e)}translateOnAxis(e,t){return Bd.copy(e).applyQuaternion(this.quaternion),this.position.add(Bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hd,e)}translateY(e){return this.translateOnAxis(Gd,e)}translateZ(e){return this.translateOnAxis(Vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ca.copy(e):ca.set(e,t,i);const o=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(lr,ca,this.up):Ji.lookAt(ca,lr,this.up),this.quaternion.setFromRotationMatrix(Ji),o&&(Ji.extractRotation(o.matrixWorld),xs.setFromRotationMatrix(Ji),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wd),vs.child=e,this.dispatchEvent(vs),vs.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rm),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wd),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,o=this.children.length;i<o;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const o=this.children;for(let s=0,r=o.length;s<r;s++)o[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,e,Am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Cm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,o=t.length;i<o;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,o=t.length;i<o;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,o=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*o,s[13]+=i-s[1]*t-s[5]*i-s[9]*o,s[14]+=o-s[2]*t-s[6]*i-s[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,o=t.length;i<o;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(a=>({...a})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));o.material=a}else o.material=s(e.materials,this.material);if(this.children.length>0){o.children=[];for(let a=0;a<this.children.length;a++)o.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];o.animations.push(s(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),u=r(e.shapes),f=r(e.skeletons),h=r(e.animations),p=r(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),p.length>0&&(i.nodes=p)}return i.object=o,i;function r(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const o=e.children[i];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xn.DEFAULT_UP=new F(0,1,0);xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Kt extends xn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Im={type:"move"};class Xl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let o=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const y of e.hand.values()){const g=t.getJointPose(y,i),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,p=.005;c.inputState.pinching&&f>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(o=t.getPose(e.targetRaySpace,i),o===null&&s!==null&&(o=s),o!==null&&(a.matrix.fromArray(o.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,o.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(o.linearVelocity)):a.hasLinearVelocity=!1,o.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(o.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return a!==null&&(a.visible=o!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Kt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_o={h:0,s:0,l:0},ha={h:0,s:0,l:0};function ql(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,o=Et.workingColorSpace){return this.r=e,this.g=t,this.b=i,Et.colorSpaceToWorking(this,o),this}setHSL(e,t,i,o=Et.workingColorSpace){if(e=Zh(e,1),t=pt(t,0,1),i=pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=ql(r,s,e+1/3),this.g=ql(r,s,e),this.b=ql(r,s,e-1/3)}return Et.colorSpaceToWorking(this,o),this}setStyle(e,t=Wn){function i(s){s!==void 0&&parseFloat(s)<1&&et("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=o[1],a=o[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:et("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=o[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wn){const i=Xf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=co(e.r),this.g=co(e.g),this.b=co(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wn){return Et.workingToColorSpace(Rn.copy(this),e),Math.round(pt(Rn.r*255,0,255))*65536+Math.round(pt(Rn.g*255,0,255))*256+Math.round(pt(Rn.b*255,0,255))}getHexString(e=Wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.workingToColorSpace(Rn.copy(this),t);const i=Rn.r,o=Rn.g,s=Rn.b,r=Math.max(i,o,s),a=Math.min(i,o,s);let l,c;const d=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=d<=.5?u/(r+a):u/(2-r-a),r){case i:l=(o-s)/u+(o<s?6:0);break;case o:l=(s-i)/u+2;break;case s:l=(i-o)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Et.workingColorSpace){return Et.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=Wn){Et.workingToColorSpace(Rn.copy(this),e);const t=Rn.r,i=Rn.g,o=Rn.b;return e!==Wn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(o*255)})`}offsetHSL(e,t,i){return this.getHSL(_o),this.setHSL(_o.h+e,_o.s+t,_o.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_o),e.getHSL(ha);const i=Dr(_o.h,ha.h,t),o=Dr(_o.s,ha.s,t),s=Dr(_o.l,ha.l,t);return this.setHSL(i,o,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,o=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*o,this.g=s[1]*t+s[4]*i+s[7]*o,this.b=s[2]*t+s[5]*i+s[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rn=new ot;ot.NAMES=Xf;class ed{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ot(e),this.near=t,this.far=i}clone(){return new ed(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class qf extends xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const gi=new F,Ki=new F,$l=new F,Zi=new F,bs=new F,_s=new F,Xd=new F,Yl=new F,Jl=new F,Kl=new F,Zl=new rn,jl=new rn,Ql=new rn;class hi{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,o){o.subVectors(i,t),gi.subVectors(e,t),o.cross(gi);const s=o.lengthSq();return s>0?o.multiplyScalar(1/Math.sqrt(s)):o.set(0,0,0)}static getBarycoord(e,t,i,o,s){gi.subVectors(o,t),Ki.subVectors(i,t),$l.subVectors(e,t);const r=gi.dot(gi),a=gi.dot(Ki),l=gi.dot($l),c=Ki.dot(Ki),d=Ki.dot($l),u=r*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,h=(c*l-a*d)*f,p=(r*d-a*l)*f;return s.set(1-h-p,p,h)}static containsPoint(e,t,i,o){return this.getBarycoord(e,t,i,o,Zi)===null?!1:Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getInterpolation(e,t,i,o,s,r,a,l){return this.getBarycoord(e,t,i,o,Zi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zi.x),l.addScaledVector(r,Zi.y),l.addScaledVector(a,Zi.z),l)}static getInterpolatedAttribute(e,t,i,o,s,r){return Zl.setScalar(0),jl.setScalar(0),Ql.setScalar(0),Zl.fromBufferAttribute(e,t),jl.fromBufferAttribute(e,i),Ql.fromBufferAttribute(e,o),r.setScalar(0),r.addScaledVector(Zl,s.x),r.addScaledVector(jl,s.y),r.addScaledVector(Ql,s.z),r}static isFrontFacing(e,t,i,o){return gi.subVectors(i,t),Ki.subVectors(e,t),gi.cross(Ki).dot(o)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,o){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,i,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gi.subVectors(this.c,this.b),Ki.subVectors(this.a,this.b),gi.cross(Ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,o,s){return hi.getInterpolation(e,this.a,this.b,this.c,t,i,o,s)}containsPoint(e){return hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,o=this.b,s=this.c;let r,a;bs.subVectors(o,i),_s.subVectors(s,i),Yl.subVectors(e,i);const l=bs.dot(Yl),c=_s.dot(Yl);if(l<=0&&c<=0)return t.copy(i);Jl.subVectors(e,o);const d=bs.dot(Jl),u=_s.dot(Jl);if(d>=0&&u<=d)return t.copy(o);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return r=l/(l-d),t.copy(i).addScaledVector(bs,r);Kl.subVectors(e,s);const h=bs.dot(Kl),p=_s.dot(Kl);if(p>=0&&h<=p)return t.copy(s);const y=h*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(_s,a);const g=d*p-h*u;if(g<=0&&u-d>=0&&h-p>=0)return Xd.subVectors(s,o),a=(u-d)/(u-d+(h-p)),t.copy(o).addScaledVector(Xd,a);const m=1/(g+y+f);return r=y*m,a=f*m,t.copy(i).addScaledVector(bs,r).addScaledVector(_s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Uo{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,yi):yi.fromBufferAttribute(s,r),yi.applyMatrix4(e.matrixWorld),this.expandByPoint(yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),da.copy(i.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}const o=e.children;for(let s=0,r=o.length;s<r;s++)this.expandByObject(o[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yi),yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),ua.subVectors(this.max,cr),ws.subVectors(e.a,cr),Ms.subVectors(e.b,cr),Ss.subVectors(e.c,cr),wo.subVectors(Ms,ws),Mo.subVectors(Ss,Ms),Bo.subVectors(ws,Ss);let t=[0,-wo.z,wo.y,0,-Mo.z,Mo.y,0,-Bo.z,Bo.y,wo.z,0,-wo.x,Mo.z,0,-Mo.x,Bo.z,0,-Bo.x,-wo.y,wo.x,0,-Mo.y,Mo.x,0,-Bo.y,Bo.x,0];return!ec(t,ws,Ms,Ss,ua)||(t=[1,0,0,0,1,0,0,0,1],!ec(t,ws,Ms,Ss,ua))?!1:(fa.crossVectors(wo,Mo),t=[fa.x,fa.y,fa.z],ec(t,ws,Ms,Ss,ua))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ji),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ji=[new F,new F,new F,new F,new F,new F,new F,new F],yi=new F,da=new Uo,ws=new F,Ms=new F,Ss=new F,wo=new F,Mo=new F,Bo=new F,cr=new F,ua=new F,fa=new F,Ho=new F;function ec(n,e,t,i,o){for(let s=0,r=n.length-3;s<=r;s+=3){Ho.fromArray(n,s);const a=o.x*Math.abs(Ho.x)+o.y*Math.abs(Ho.y)+o.z*Math.abs(Ho.z),l=e.dot(Ho),c=t.dot(Ho),d=i.dot(Ho);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const mn=new F,pa=new Ce;let Pm=0;class ii extends hs{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Hf,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let o=0,s=this.itemSize;o<s;o++)this.array[e+o]=t.array[i+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix3(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=vi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,o){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),o=qt(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=o,this}setXYZW(e,t,i,o,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),o=qt(o,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=o,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class $f extends ii{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yf extends ii{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gt extends ii{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Lm=new Uo,hr=new F,tc=new F;class ds{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Lm.setFromPoints(e).getCenter(i);let o=0;for(let s=0,r=e.length;s<r;s++)o=Math.max(o,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hr.subVectors(e,this.center);const t=hr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),o=(i-this.radius)*.5;this.center.addScaledVector(hr,o/i),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hr.copy(e.center).add(tc)),this.expandByPoint(hr.copy(e.center).sub(tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let km=0;const si=new Ct,nc=new xn,Ts=new F,Zn=new Uo,dr=new Uo,Mn=new F;class nn extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=Fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(j0(e)?Yf:$f)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new st().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return si.makeRotationFromQuaternion(e),this.applyMatrix4(si),this}rotateX(e){return si.makeRotationX(e),this.applyMatrix4(si),this}rotateY(e){return si.makeRotationY(e),this.applyMatrix4(si),this}rotateZ(e){return si.makeRotationZ(e),this.applyMatrix4(si),this}translate(e,t,i){return si.makeTranslation(e,t,i),this.applyMatrix4(si),this}scale(e,t,i){return si.makeScale(e,t,i),this.applyMatrix4(si),this}lookAt(e){return nc.lookAt(e),nc.updateMatrix(),this.applyMatrix4(nc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let o=0,s=e.length;o<s;o++){const r=e[o];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new gt(i,3))}else{const i=Math.min(e.length,t.count);for(let o=0;o<i;o++){const s=e[o];t.setXYZ(o,s.x,s.y,s.z||0)}e.length>t.count&&et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Uo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,o=t.length;i<o;i++){const s=t[i];Zn.setFromBufferAttribute(s),this.morphTargetsRelative?(Mn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(Mn),Mn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(Mn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const a=t[s];dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Mn.addVectors(Zn.min,dr.min),Zn.expandByPoint(Mn),Mn.addVectors(Zn.max,dr.max),Zn.expandByPoint(Mn)):(Zn.expandByPoint(dr.min),Zn.expandByPoint(dr.max))}Zn.getCenter(i);let o=0;for(let s=0,r=e.count;s<r;s++)Mn.fromBufferAttribute(e,s),o=Math.max(o,i.distanceToSquared(Mn));if(t)for(let s=0,r=t.length;s<r;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Mn.fromBufferAttribute(a,c),l&&(Ts.fromBufferAttribute(e,c),Mn.add(Ts)),o=Math.max(o,i.distanceToSquared(Mn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,o=t.normal,s=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new ii(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const a=[],l=[];for(let b=0;b<i.count;b++)a[b]=new F,l[b]=new F;const c=new F,d=new F,u=new F,f=new Ce,h=new Ce,p=new Ce,y=new F,g=new F;function m(b,C,S){c.fromBufferAttribute(i,b),d.fromBufferAttribute(i,C),u.fromBufferAttribute(i,S),f.fromBufferAttribute(s,b),h.fromBufferAttribute(s,C),p.fromBufferAttribute(s,S),d.sub(c),u.sub(c),h.sub(f),p.sub(f);const V=1/(h.x*p.y-p.x*h.y);isFinite(V)&&(y.copy(d).multiplyScalar(p.y).addScaledVector(u,-h.y).multiplyScalar(V),g.copy(u).multiplyScalar(h.x).addScaledVector(d,-p.x).multiplyScalar(V),a[b].add(y),a[C].add(y),a[S].add(y),l[b].add(g),l[C].add(g),l[S].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let b=0,C=M.length;b<C;++b){const S=M[b],V=S.start,$=S.count;for(let T=V,I=V+$;T<I;T+=3)m(e.getX(T+0),e.getX(T+1),e.getX(T+2))}const E=new F,_=new F,R=new F,A=new F;function N(b){R.fromBufferAttribute(o,b),A.copy(R);const C=a[b];E.copy(C),E.sub(R.multiplyScalar(R.dot(C))).normalize(),_.crossVectors(A,C);const V=_.dot(l[b])<0?-1:1;r.setXYZW(b,E.x,E.y,E.z,V)}for(let b=0,C=M.length;b<C;++b){const S=M[b],V=S.start,$=S.count;for(let T=V,I=V+$;T<I;T+=3)N(e.getX(T+0)),N(e.getX(T+1)),N(e.getX(T+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new ii(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const o=new F,s=new F,r=new F,a=new F,l=new F,c=new F,d=new F,u=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){const p=e.getX(f+0),y=e.getX(f+1),g=e.getX(f+2);o.fromBufferAttribute(t,p),s.fromBufferAttribute(t,y),r.fromBufferAttribute(t,g),d.subVectors(r,s),u.subVectors(o,s),d.cross(u),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),a.add(d),l.add(d),c.add(d),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)o.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),r.fromBufferAttribute(t,f+2),d.subVectors(r,s),u.subVectors(o,s),d.cross(u),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Mn.fromBufferAttribute(e,t),Mn.normalize(),e.setXYZ(t,Mn.x,Mn.y,Mn.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,u=a.normalized,f=new c.constructor(l.length*d);let h=0,p=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?h=l[y]*a.data.stride+a.offset:h=l[y]*d;for(let m=0;m<d;m++)f[p++]=c[h++]}return new ii(f,d,u)}if(this.index===null)return et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,i=this.index.array,o=this.attributes;for(const a in o){const l=o[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,i);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const o={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(o[l]=d,s=!0)}s&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const o=e.attributes;for(const c in o){const d=o[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],u=s[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hf,this.updateRanges=[],this.version=0,this.uuid=Fi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let o=0,s=this.stride;o<s;o++)this.array[e+o]=t.array[i+o];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Dn=new F;class fl{constructor(e,t,i,o=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=o}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=vi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),o=qt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=o,this}setXYZW(e,t,i,o,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),o=qt(o,this.array),s=qt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=o,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ul("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const o=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[o+s])}return new ii(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ul("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const o=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[o+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ic=new F,Dm=new F,Um=new st;class Ao{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,o){return this.normal.set(e,t,i),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const o=ic.subVectors(i,t).cross(Dm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const o=e.delta(ic),s=this.normal.dot(o);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(o,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Um.getNormalMatrix(e),o=this.coplanarPoint(ic).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-o.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let zm=0;class po extends hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=Fi(),this.name="",this.type="Material",this.blending=kr,this.side=os,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ef,this.blendDst=Af,this.blendEquation=zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=qr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=X0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fl,this.stencilZFail=Fl,this.stencilZPass=Fl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){et(`Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){et(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(i):o&&o.isVector2&&i&&i.isVector2||o&&o.isEuler&&i&&i.isEuler||o&&o.isVector3&&i&&i.isVector3?o.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function o(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(t){const s=o(e.textures),r=o(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ot().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ao().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ce().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const o=t.length;i=new Array(o);for(let s=0;s!==o;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pl extends po{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Es;const ur=new F,As=new F,Cs=new F,Rs=new Ce,fr=new Ce,Jf=new Ct,ma=new F,pr=new F,ga=new F,qd=new Ce,oc=new Ce,$d=new Ce;class uh extends xn{constructor(e=new pl){if(super(),this.isSprite=!0,this.type="Sprite",Es===void 0){Es=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Nm(t,5);Es.setIndex([0,1,2,0,2,3]),Es.setAttribute("position",new fl(i,3,0,!1)),Es.setAttribute("uv",new fl(i,2,3,!1))}this.geometry=Es,this.material=e,this.center=new Ce(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Lt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),As.setFromMatrixScale(this.matrixWorld),Jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Cs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&As.multiplyScalar(-Cs.z);const i=this.material.rotation;let o,s;i!==0&&(s=Math.cos(i),o=Math.sin(i));const r=this.center;ya(ma.set(-.5,-.5,0),Cs,r,As,o,s),ya(pr.set(.5,-.5,0),Cs,r,As,o,s),ya(ga.set(.5,.5,0),Cs,r,As,o,s),qd.set(0,0),oc.set(1,0),$d.set(1,1);let a=e.ray.intersectTriangle(ma,pr,ga,!1,ur);if(a===null&&(ya(pr.set(-.5,.5,0),Cs,r,As,o,s),oc.set(0,1),a=e.ray.intersectTriangle(ma,ga,pr,!1,ur),a===null))return;const l=e.ray.origin.distanceTo(ur);l<e.near||l>e.far||t.push({distance:l,point:ur.clone(),uv:hi.getInterpolation(ur,ma,pr,ga,qd,oc,$d,new Ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ya(n,e,t,i,o,s){Rs.subVectors(n,t).addScalar(.5).multiply(i),o!==void 0?(fr.x=s*Rs.x-o*Rs.y,fr.y=o*Rs.x+s*Rs.y):fr.copy(Rs),n.copy(e),n.x+=fr.x,n.y+=fr.y,n.applyMatrix4(Jf)}const Qi=new F,sc=new F,xa=new F,va=new F;class Al{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qi.copy(this.origin).addScaledVector(this.direction,t),Qi.distanceToSquared(e))}distanceSqToSegment(e,t,i,o){sc.copy(e).add(t).multiplyScalar(.5),xa.copy(t).sub(e).normalize(),va.copy(this.origin).sub(sc);const s=e.distanceTo(t)*.5,r=-this.direction.dot(xa),a=va.dot(this.direction),l=-va.dot(xa),c=va.lengthSq(),d=Math.abs(1-r*r);let u,f,h,p;if(d>0)if(u=r*l-a,f=r*a-l,p=s*d,u>=0)if(f>=-p)if(f<=p){const y=1/d;u*=y,f*=y,h=u*(u+r*f+2*a)+f*(r*u+f+2*l)+c}else f=s,u=Math.max(0,-(r*f+a)),h=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(r*f+a)),h=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-r*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),h=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(u=Math.max(0,-(r*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),h=-u*u+f*(f+2*l)+c);else f=r>0?-s:s,u=Math.max(0,-(r*f+a)),h=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),o&&o.copy(sc).addScaledVector(xa,f),h}intersectSphere(e,t){if(e.radius<0)return null;Qi.subVectors(e.center,this.origin);const i=Qi.dot(this.direction),o=Qi.dot(Qi)-i*i,s=e.radius*e.radius;if(o>s)return null;const r=Math.sqrt(s-o),a=i-r,l=i+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,o,s,r,a,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,o=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,o=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,r=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,r=(e.min.y-f.y)*d),i>r||s>o||((s>i||isNaN(i))&&(i=s),(r<o||isNaN(o))&&(o=r),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||a>o)||((a>i||i!==i)&&(i=a),(l<o||o!==o)&&(o=l),o<0)?null:this.at(i>=0?i:o,t)}intersectsBox(e){return this.intersectBox(e,Qi)!==null}intersectTriangle(e,t,i,o,s){const r=this.origin,a=this.direction,l=a.x,c=a.y,d=a.z,u=e.x-r.x,f=e.y-r.y,h=e.z-r.z,p=t.x-r.x,y=t.y-r.y,g=t.z-r.z,m=i.x-r.x,M=i.y-r.y,E=i.z-r.z,_=Math.abs(l),R=Math.abs(c),A=Math.abs(d);let N,b,C,S,V,$,T,I,k,L,Z,j;if(_>=R&&_>=A?(C=l,$=u,k=p,j=m,l>=0?(N=c,b=d,S=f,V=h,T=y,I=g,L=M,Z=E):(N=d,b=c,S=h,V=f,T=g,I=y,L=E,Z=M)):R>=A?(C=c,$=f,k=y,j=M,c>=0?(N=d,b=l,S=h,V=u,T=g,I=p,L=E,Z=m):(N=l,b=d,S=u,V=h,T=p,I=g,L=m,Z=E)):(C=d,$=h,k=g,j=E,d>=0?(N=l,b=c,S=u,V=f,T=p,I=y,L=m,Z=M):(N=c,b=l,S=f,V=u,T=y,I=p,L=M,Z=m)),C===0)return null;const ne=N/C,ce=b/C,pe=1/C,De=S-ne*$,Fe=V-ce*$,rt=T-ne*k,dt=I-ce*k,Rt=L-ne*j,ie=Z-ce*j,de=Rt*dt-ie*rt,Be=De*ie-Fe*Rt,tt=rt*Fe-dt*De;if(o){if(de<0||Be<0||tt<0)return null}else if((de<0||Be<0||tt<0)&&(de>0||Be>0||tt>0))return null;const Oe=de+Be+tt;if(Oe===0)return null;const ut=pe*(de*$+Be*k+tt*j);return(Oe>0?ut<0:ut>0)?null:this.at(ut/Oe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xi extends po{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yd=new Ct,Go=new Al,ba=new ds,Jd=new F,_a=new F,wa=new F,Ma=new F,rc=new F,Sa=new F,Kd=new F,Ta=new F;class ae extends xn{constructor(e=new nn,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const o=t[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=o.length;s<r;s++){const a=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,o=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(o,e);const a=this.morphTargetInfluences;if(s&&a){Sa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],u=s[l];d!==0&&(rc.fromBufferAttribute(u,e),r?Sa.addScaledVector(rc,d):Sa.addScaledVector(rc.sub(t),d))}t.add(Sa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,o=this.material,s=this.matrixWorld;o!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(s),Go.copy(e.ray).recast(e.near),!(ba.containsPoint(Go.origin)===!1&&(Go.intersectSphere(ba,Jd)===null||Go.origin.distanceToSquared(Jd)>(e.far-e.near)**2))&&(Yd.copy(s).invert(),Go.copy(e.ray).applyMatrix4(Yd),!(i.boundingBox!==null&&Go.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Go)))}_computeIntersections(e,t,i){let o;const s=this.geometry,r=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,y=f.length;p<y;p++){const g=f[p],m=r[g.materialIndex],M=Math.max(g.start,h.start),E=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let _=M,R=E;_<R;_+=3){const A=a.getX(_),N=a.getX(_+1),b=a.getX(_+2);o=Ea(this,m,e,i,c,d,u,A,N,b),o&&(o.faceIndex=Math.floor(_/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const p=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let g=p,m=y;g<m;g+=3){const M=a.getX(g),E=a.getX(g+1),_=a.getX(g+2);o=Ea(this,r,e,i,c,d,u,M,E,_),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,y=f.length;p<y;p++){const g=f[p],m=r[g.materialIndex],M=Math.max(g.start,h.start),E=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let _=M,R=E;_<R;_+=3){const A=_,N=_+1,b=_+2;o=Ea(this,m,e,i,c,d,u,A,N,b),o&&(o.faceIndex=Math.floor(_/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const p=Math.max(0,h.start),y=Math.min(l.count,h.start+h.count);for(let g=p,m=y;g<m;g+=3){const M=g,E=g+1,_=g+2;o=Ea(this,r,e,i,c,d,u,M,E,_),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}}}function Om(n,e,t,i,o,s,r,a){let l;if(e.side===An?l=i.intersectTriangle(r,s,o,!0,a):l=i.intersectTriangle(o,s,r,e.side===os,a),l===null)return null;Ta.copy(a),Ta.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ta);return c<t.near||c>t.far?null:{distance:c,point:Ta.clone(),object:n}}function Ea(n,e,t,i,o,s,r,a,l,c){n.getVertexPosition(a,_a),n.getVertexPosition(l,wa),n.getVertexPosition(c,Ma);const d=Om(n,e,t,i,_a,wa,Ma,Kd);if(d){const u=new F;hi.getBarycoord(Kd,_a,wa,Ma,u),o&&(d.uv=hi.getInterpolatedAttribute(o,a,l,c,u,new Ce)),s&&(d.uv1=hi.getInterpolatedAttribute(s,a,l,c,u,new Ce)),r&&(d.normal=hi.getInterpolatedAttribute(r,a,l,c,u,new F),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new F,materialIndex:0};hi.getNormal(_a,wa,Ma,f.normal),d.face=f,d.barycoord=u}return d}class Kf extends kn{constructor(e=null,t=1,i=1,o,s,r,a,l,c=En,d=En,u,f){super(null,r,a,l,c,d,o,s,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zd extends ii{constructor(e,t,i,o=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Is=new Ct,jd=new Ct,Aa=[],Qd=new Uo,Fm=new Ct,mr=new ae,gr=new ds;class yr extends ae{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zd(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<i;o++)this.setMatrixAt(o,Fm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Uo),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Is),Qd.copy(e.boundingBox).applyMatrix4(Is),this.boundingBox.union(Qd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ds),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Is),gr.copy(e.boundingSphere).applyMatrix4(Is),this.boundingSphere.union(gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,o=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let a=0;a<i.length;a++)i[a]=o[r+a]}raycast(e,t){const i=this.matrixWorld,o=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(i),e.ray.intersectsSphere(gr)!==!1))for(let s=0;s<o;s++){this.getMatrixAt(s,Is),jd.multiplyMatrices(i,Is),mr.matrixWorld=jd,mr.raycast(e,Aa);for(let r=0,a=Aa.length;r<a;r++){const l=Aa[r];l.instanceId=s,l.object=this,t.push(l)}Aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Zd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,o=i.length+1;this.morphTexture===null&&(this.morphTexture=new Kf(new Float32Array(o*this.count),o,this.count,Xh,bi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=o*e;return s[l]=a,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Vo=new ds,Bm=new Ce(.5,.5),Ca=new F;class td{constructor(e=new Ao,t=new Ao,i=new Ao,o=new Ao,s=new Ao,r=new Ao){this.planes=[e,t,i,o,s,r]}set(e,t,i,o,s,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(o),a[4].copy(s),a[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zi,i=!1){const o=this.planes,s=e.elements,r=s[0],a=s[1],l=s[2],c=s[3],d=s[4],u=s[5],f=s[6],h=s[7],p=s[8],y=s[9],g=s[10],m=s[11],M=s[12],E=s[13],_=s[14],R=s[15];if(o[0].setComponents(c-r,h-d,m-p,R-M).normalize(),o[1].setComponents(c+r,h+d,m+p,R+M).normalize(),o[2].setComponents(c+a,h+u,m+y,R+E).normalize(),o[3].setComponents(c-a,h-u,m-y,R-E).normalize(),i)o[4].setComponents(l,f,g,_).normalize(),o[5].setComponents(c-l,h-f,m-g,R-_).normalize();else if(o[4].setComponents(c-l,h-f,m-g,R-_).normalize(),t===zi)o[5].setComponents(c+l,h+f,m+g,R+_).normalize();else if(t===Jr)o[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vo)}intersectsSprite(e){Vo.center.set(0,0,0);const t=Bm.distanceTo(e.center);return Vo.radius=.7071067811865476+t,Vo.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vo)}intersectsSphere(e){const t=this.planes,i=e.center,o=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const o=t[i];if(Ca.x=o.normal.x>0?e.max.x:e.min.x,Ca.y=o.normal.y>0?e.max.y:e.min.y,Ca.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zf extends po{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ml=new F,gl=new F,eu=new Ct,xr=new Al,Ra=new ds,ac=new F,tu=new F;class Hm extends xn{constructor(e=new nn,t=new Zf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let o=1,s=t.count;o<s;o++)ml.fromBufferAttribute(t,o-1),gl.fromBufferAttribute(t,o),i[o]=i[o-1],i[o]+=ml.distanceTo(gl);e.setAttribute("lineDistance",new gt(i,1))}else et("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,o=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(o),Ra.radius+=s,e.ray.intersectsSphere(Ra)===!1)return;eu.copy(o).invert(),xr.copy(e.ray).applyMatrix4(eu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const h=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let y=h,g=p-1;y<g;y+=c){const m=d.getX(y),M=d.getX(y+1),E=Ia(this,e,xr,l,m,M,y);E&&t.push(E)}if(this.isLineLoop){const y=d.getX(p-1),g=d.getX(h),m=Ia(this,e,xr,l,y,g,p-1);m&&t.push(m)}}else{const h=Math.max(0,r.start),p=Math.min(f.count,r.start+r.count);for(let y=h,g=p-1;y<g;y+=c){const m=Ia(this,e,xr,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){const y=Ia(this,e,xr,l,p-1,h,p-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const o=t[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=o.length;s<r;s++){const a=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ia(n,e,t,i,o,s,r){const a=n.geometry.attributes.position;if(ml.fromBufferAttribute(a,o),gl.fromBufferAttribute(a,s),t.distanceSqToSegment(ml,gl,ac,tu)>i)return;ac.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ac);if(!(c<e.near||c>e.far))return{distance:c,point:tu.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const nu=new F,iu=new F;class Gm extends Hm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let o=0,s=t.count;o<s;o+=2)nu.fromBufferAttribute(t,o),iu.fromBufferAttribute(t,o+1),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+nu.distanceTo(iu);e.setAttribute("lineDistance",new gt(i,1))}else et("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fh extends po{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ou=new Ct,ph=new Al,Pa=new ds,La=new F;class su extends xn{constructor(e=new nn,t=new fh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,o=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Pa.copy(i.boundingSphere),Pa.applyMatrix4(o),Pa.radius+=s,e.ray.intersectsSphere(Pa)===!1)return;ou.copy(o).invert(),ph.copy(e.ray).applyMatrix4(ou);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,r.start),h=Math.min(c.count,r.start+r.count);for(let p=f,y=h;p<y;p++){const g=c.getX(p);La.fromBufferAttribute(u,g),ru(La,g,l,o,e,t,this)}}else{const f=Math.max(0,r.start),h=Math.min(u.count,r.start+r.count);for(let p=f,y=h;p<y;p++)La.fromBufferAttribute(u,p),ru(La,p,l,o,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const o=t[i[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=o.length;s<r;s++){const a=o[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ru(n,e,t,i,o,s,r){const a=ph.distanceSqToPoint(n);if(a<t){const l=new F;ph.closestPointToPoint(n,l),l.applyMatrix4(i);const c=o.ray.origin.distanceTo(l);if(c<o.near||c>o.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class jf extends kn{constructor(e=[],t=ss,i,o,s,r,a,l,c,d){super(e,t,i,o,s,r,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qf extends kn{constructor(e,t,i,o,s,r,a,l,c){super(e,t,i,o,s,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zr extends kn{constructor(e,t,i=Bi,o,s,r,a=En,l=En,c,d=ho,u=1){if(d!==ho&&d!==jo)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,o,s,r,a,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Vm extends Zr{constructor(e,t=Bi,i=ss,o,s,r=En,a=En,l,c=ho){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,i,o,s,r,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ep extends kn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class je extends nn{constructor(e=1,t=1,i=1,o=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:o,heightSegments:s,depthSegments:r};const a=this;o=Math.floor(o),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],u=[];let f=0,h=0;p("z","y","x",-1,-1,i,t,e,r,s,0),p("z","y","x",1,-1,i,t,-e,r,s,1),p("x","z","y",1,1,e,i,t,o,r,2),p("x","z","y",1,-1,e,i,-t,o,r,3),p("x","y","z",1,-1,e,t,i,o,s,4),p("x","y","z",-1,-1,e,t,-i,o,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(u,2));function p(y,g,m,M,E,_,R,A,N,b,C){const S=_/N,V=R/b,$=_/2,T=R/2,I=A/2,k=N+1,L=b+1;let Z=0,j=0;const ne=new F;for(let ce=0;ce<L;ce++){const pe=ce*V-T;for(let De=0;De<k;De++){const Fe=De*S-$;ne[y]=Fe*M,ne[g]=pe*E,ne[m]=I,c.push(ne.x,ne.y,ne.z),ne[y]=0,ne[g]=0,ne[m]=A>0?1:-1,d.push(ne.x,ne.y,ne.z),u.push(De/N),u.push(1-ce/b),Z+=1}}for(let ce=0;ce<b;ce++)for(let pe=0;pe<N;pe++){const De=f+pe+k*ce,Fe=f+pe+k*(ce+1),rt=f+(pe+1)+k*(ce+1),dt=f+(pe+1)+k*ce;l.push(De,Fe,dt),l.push(Fe,rt,dt),j+=6}a.addGroup(h,j,C),h+=j,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new je(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pi extends nn{constructor(e=1,t=32,i=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:o},t=Math.max(3,t);const s=[],r=[],a=[],l=[],c=new F,d=new Ce;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const h=i+u/t*o;c.x=e*Math.cos(h),c.y=e*Math.sin(h),r.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(r[f]/e+1)/2,d.y=(r[f+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class it extends nn{constructor(e=1,t=1,i=1,o=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:o,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;o=Math.floor(o),s=Math.floor(s);const d=[],u=[],f=[],h=[];let p=0;const y=[],g=i/2;let m=0;M(),r===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(h,2));function M(){const _=new F,R=new F;let A=0;const N=(t-e)/i;for(let b=0;b<=s;b++){const C=[],S=b/s,V=S*(t-e)+e;for(let $=0;$<=o;$++){const T=$/o,I=T*l+a,k=Math.sin(I),L=Math.cos(I);R.x=V*k,R.y=-S*i+g,R.z=V*L,u.push(R.x,R.y,R.z),_.set(k,N,L).normalize(),f.push(_.x,_.y,_.z),h.push(T,1-S),C.push(p++)}y.push(C)}for(let b=0;b<o;b++)for(let C=0;C<s;C++){const S=y[C][b],V=y[C+1][b],$=y[C+1][b+1],T=y[C][b+1];(e>0||C!==0)&&(d.push(S,V,T),A+=3),(t>0||C!==s-1)&&(d.push(V,$,T),A+=3)}c.addGroup(m,A,0),m+=A}function E(_){const R=p,A=new Ce,N=new F;let b=0;const C=_===!0?e:t,S=_===!0?1:-1;for(let $=1;$<=o;$++)u.push(0,g*S,0),f.push(0,S,0),h.push(.5,.5),p++;const V=p;for(let $=0;$<=o;$++){const I=$/o*l+a,k=Math.cos(I),L=Math.sin(I);N.x=C*L,N.y=g*S,N.z=C*k,u.push(N.x,N.y,N.z),f.push(0,S,0),A.x=k*.5+.5,A.y=L*.5*S+.5,h.push(A.x,A.y),p++}for(let $=0;$<o;$++){const T=R+$,I=V+$;_===!0?d.push(I,I+1,T):d.push(I+1,I,T),b+=3}c.addGroup(m,b,_===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new it(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qo extends it{constructor(e=1,t=1,i=32,o=1,s=!1,r=0,a=Math.PI*2){super(0,e,t,i,o,s,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:o,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(e){return new Qo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nd extends nn{constructor(e=[],t=[],i=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:o};const s=[],r=[];a(o),c(i),d(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(r,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const E=new F,_=new F,R=new F;for(let A=0;A<t.length;A+=3)h(t[A+0],E),h(t[A+1],_),h(t[A+2],R),l(E,_,R,M)}function l(M,E,_,R){const A=R+1,N=[];for(let b=0;b<=A;b++){N[b]=[];const C=M.clone().lerp(_,b/A),S=E.clone().lerp(_,b/A),V=A-b;for(let $=0;$<=V;$++)$===0&&b===A?N[b][$]=C:N[b][$]=C.clone().lerp(S,$/V)}for(let b=0;b<A;b++)for(let C=0;C<2*(A-b)-1;C++){const S=Math.floor(C/2);C%2===0?(f(N[b][S+1]),f(N[b+1][S]),f(N[b][S])):(f(N[b][S+1]),f(N[b+1][S+1]),f(N[b+1][S]))}}function c(M){const E=new F;for(let _=0;_<s.length;_+=3)E.x=s[_+0],E.y=s[_+1],E.z=s[_+2],E.normalize().multiplyScalar(M),s[_+0]=E.x,s[_+1]=E.y,s[_+2]=E.z}function d(){const M=new F;for(let E=0;E<s.length;E+=3){M.x=s[E+0],M.y=s[E+1],M.z=s[E+2];const _=g(M)/2/Math.PI+.5,R=m(M)/Math.PI+.5;r.push(_,1-R)}p(),u()}function u(){for(let M=0;M<r.length;M+=6){const E=r[M+0],_=r[M+2],R=r[M+4],A=Math.max(E,_,R),N=Math.min(E,_,R);A>.9&&N<.1&&(E<.2&&(r[M+0]+=1),_<.2&&(r[M+2]+=1),R<.2&&(r[M+4]+=1))}}function f(M){s.push(M.x,M.y,M.z)}function h(M,E){const _=M*3;E.x=e[_+0],E.y=e[_+1],E.z=e[_+2]}function p(){const M=new F,E=new F,_=new F,R=new F,A=new Ce,N=new Ce,b=new Ce;for(let C=0,S=0;C<s.length;C+=9,S+=6){M.set(s[C+0],s[C+1],s[C+2]),E.set(s[C+3],s[C+4],s[C+5]),_.set(s[C+6],s[C+7],s[C+8]),A.set(r[S+0],r[S+1]),N.set(r[S+2],r[S+3]),b.set(r[S+4],r[S+5]),R.copy(M).add(E).add(_).divideScalar(3);const V=g(R);y(A,S+0,M,V),y(N,S+2,E,V),y(b,S+4,_,V)}}function y(M,E,_,R){R<0&&M.x===1&&(r[E]=M.x-1),_.x===0&&_.z===0&&(r[E]=R/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nd(e.vertices,e.indices,e.radius,e.detail)}}class Gi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){et("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,o=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(o),t.push(s),o=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let o=0;const s=i.length;let r;t?r=t:r=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(o=Math.floor(a+(l-a)/2),c=i[o]-r,c<0)a=o+1;else if(c>0)l=o-1;else{l=o;break}if(o=l,i[o]===r)return o/(s-1);const d=i[o],f=i[o+1]-d,h=(r-d)/f;return(o+h)/(s-1)}getTangent(e,t){let o=e-1e-4,s=e+1e-4;o<0&&(o=0),s>1&&(s=1);const r=this.getPoint(o),a=this.getPoint(s),l=t||(r.isVector2?new Ce:new F);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new F,o=[],s=[],r=[],a=new F,l=new Ct;for(let h=0;h<=e;h++){const p=h/e;o[h]=this.getTangentAt(p,new F)}s[0]=new F,r[0]=new F;let c=Number.MAX_VALUE;const d=Math.abs(o[0].x),u=Math.abs(o[0].y),f=Math.abs(o[0].z);d<=c&&(c=d,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(o[0],i).normalize(),s[0].crossVectors(o[0],a),r[0].crossVectors(o[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),r[h]=r[h-1].clone(),a.crossVectors(o[h-1],o[h]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(pt(o[h-1].dot(o[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(a,p))}r[h].crossVectors(o[h],s[h])}if(t===!0){let h=Math.acos(pt(s[0].dot(s[e]),-1,1));h/=e,o[0].dot(a.crossVectors(s[0],s[e]))>0&&(h=-h);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(o[p],h*p)),r[p].crossVectors(o[p],s[p])}return{tangents:o,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class id extends Gi{constructor(e=0,t=0,i=1,o=1,s=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=o,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ce){const i=t,o=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=o;for(;s>o;)s-=o;s<Number.EPSILON&&(r?s=0:s=o),this.aClockwise===!0&&!r&&(s===o?s=-o:s=s-o);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,h=c-this.aY;l=f*d-h*u+this.aX,c=f*u+h*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Wm extends id{constructor(e,t,i,o,s,r){super(e,t,i,i,o,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function od(){let n=0,e=0,t=0,i=0;function o(s,r,a,l){n=s,e=a,t=-3*s+3*r-2*a-l,i=2*s-2*r+a+l}return{initCatmullRom:function(s,r,a,l,c){o(r,a,c*(a-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,a,l,c,d,u){let f=(r-s)/c-(a-s)/(c+d)+(a-r)/d,h=(a-r)/d-(l-r)/(d+u)+(l-a)/u;f*=d,h*=d,o(r,a,f,h)},calc:function(s){const r=s*s,a=r*s;return n+e*s+t*r+i*a}}}const au=new F,lu=new F,lc=new od,cc=new od,hc=new od;class Xm extends Gi{constructor(e=[],t=!1,i="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=o}getPoint(e,t=new F){const i=t,o=this.points,s=o.length,r=(s-(this.closed?0:1))*e;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,d;this.closed||a>0?c=o[(a-1)%s]:(lu.subVectors(o[0],o[1]).add(o[0]),c=lu);const u=o[a%s],f=o[(a+1)%s];if(this.closed||a+2<s?d=o[(a+2)%s]:(au.subVectors(o[s-1],o[s-2]).add(o[s-1]),d=au),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),h),y=Math.pow(u.distanceToSquared(f),h),g=Math.pow(f.distanceToSquared(d),h);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),lc.initNonuniformCatmullRom(c.x,u.x,f.x,d.x,p,y,g),cc.initNonuniformCatmullRom(c.y,u.y,f.y,d.y,p,y,g),hc.initNonuniformCatmullRom(c.z,u.z,f.z,d.z,p,y,g)}else this.curveType==="catmullrom"&&(lc.initCatmullRom(c.x,u.x,f.x,d.x,this.tension),cc.initCatmullRom(c.y,u.y,f.y,d.y,this.tension),hc.initCatmullRom(c.z,u.z,f.z,d.z,this.tension));return i.set(lc.calc(l),cc.calc(l),hc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(new F().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cu(n,e,t,i,o){const s=(i-e)*.5,r=(o-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+r)*l+(-3*t+3*i-2*s-r)*a+s*n+t}function qm(n,e){const t=1-n;return t*t*e}function $m(n,e){return 2*(1-n)*n*e}function Ym(n,e){return n*n*e}function Ur(n,e,t,i){return qm(n,e)+$m(n,t)+Ym(n,i)}function Jm(n,e){const t=1-n;return t*t*t*e}function Km(n,e){const t=1-n;return 3*t*t*n*e}function Zm(n,e){return 3*(1-n)*n*n*e}function jm(n,e){return n*n*n*e}function zr(n,e,t,i,o){return Jm(n,e)+Km(n,t)+Zm(n,i)+jm(n,o)}class tp extends Gi{constructor(e=new Ce,t=new Ce,i=new Ce,o=new Ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=o}getPoint(e,t=new Ce){const i=t,o=this.v0,s=this.v1,r=this.v2,a=this.v3;return i.set(zr(e,o.x,s.x,r.x,a.x),zr(e,o.y,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qm extends Gi{constructor(e=new F,t=new F,i=new F,o=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=o}getPoint(e,t=new F){const i=t,o=this.v0,s=this.v1,r=this.v2,a=this.v3;return i.set(zr(e,o.x,s.x,r.x,a.x),zr(e,o.y,s.y,r.y,a.y),zr(e,o.z,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class np extends Gi{constructor(e=new Ce,t=new Ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ce){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class eg extends Gi{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ip extends Gi{constructor(e=new Ce,t=new Ce,i=new Ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ce){const i=t,o=this.v0,s=this.v1,r=this.v2;return i.set(Ur(e,o.x,s.x,r.x),Ur(e,o.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tg extends Gi{constructor(e=new F,t=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new F){const i=t,o=this.v0,s=this.v1,r=this.v2;return i.set(Ur(e,o.x,s.x,r.x),Ur(e,o.y,s.y,r.y),Ur(e,o.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class op extends Gi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ce){const i=t,o=this.points,s=(o.length-1)*e,r=Math.floor(s),a=s-r,l=o[r===0?r:r-1],c=o[r],d=o[r>o.length-2?o.length-1:r+1],u=o[r>o.length-3?o.length-1:r+2];return i.set(cu(a,l.x,c.x,d.x,u.x),cu(a,l.y,c.y,d.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const o=e.points[t];this.points.push(new Ce().fromArray(o))}return this}}var hu=Object.freeze({__proto__:null,ArcCurve:Wm,CatmullRomCurve3:Xm,CubicBezierCurve:tp,CubicBezierCurve3:Qm,EllipseCurve:id,LineCurve:np,LineCurve3:eg,QuadraticBezierCurve:ip,QuadraticBezierCurve3:tg,SplineCurve:op});class ng extends Gi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hu[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),o=this.getCurveLengths();let s=0;for(;s<o.length;){if(o[s]>=i){const r=o[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-r/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,o=this.curves.length;i<o;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let o=0,s=this.curves;o<s.length;o++){const r=s[o],a=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const o=e.curves[t];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const o=this.curves[t];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const o=e.curves[t];this.curves.push(new hu[o.type]().fromJSON(o))}return this}}class mh extends ng{constructor(e){super(),this.type="Path",this.currentPoint=new Ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new np(this.currentPoint.clone(),new Ce(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,o){const s=new ip(this.currentPoint.clone(),new Ce(e,t),new Ce(i,o));return this.curves.push(s),this.currentPoint.set(i,o),this}bezierCurveTo(e,t,i,o,s,r){const a=new tp(this.currentPoint.clone(),new Ce(e,t),new Ce(i,o),new Ce(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new op(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,o,s,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,o,s,r),this}absarc(e,t,i,o,s,r){return this.absellipse(e,t,i,i,o,s,r),this}ellipse(e,t,i,o,s,r,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,o,s,r,a,l),this}absellipse(e,t,i,o,s,r,a,l){const c=new id(e,t,i,o,s,r,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class sp extends mh{constructor(e){super(e),this.uuid=Fi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,o=this.holes.length;i<o;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const o=e.holes[t];this.holes.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const o=this.holes[t];e.holes.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const o=e.holes[t];this.holes.push(new mh().fromJSON(o))}return this}}function ig(n,e,t=2){const i=e&&e.length,o=i?e[0]*t:n.length;let s=rp(n,0,o,t,!0);const r=[];if(!s||s.next===s.prev)return r;let a,l,c;if(i&&(s=lg(n,e,s,t)),n.length>80*t){a=n[0],l=n[1];let d=a,u=l;for(let f=t;f<o;f+=t){const h=n[f],p=n[f+1];h<a&&(a=h),p<l&&(l=p),h>d&&(d=h),p>u&&(u=p)}c=Math.max(d-a,u-l),c=c!==0?32767/c:0}return jr(s,r,t,a,l,c,0),r}function rp(n,e,t,i,o){let s;if(o===vg(n,e,t,i)>0)for(let r=e;r<t;r+=i)s=du(r/i|0,n[r],n[r+1],s);else for(let r=t-i;r>=e;r-=i)s=du(r/i|0,n[r],n[r+1],s);return s&&Js(s,s.next)&&(ea(s),s=s.next),s}function as(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Js(t,t.next)||an(t.prev,t,t.next)===0)){if(ea(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function jr(n,e,t,i,o,s,r){if(!n)return;!r&&s&&fg(n,i,o,s);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?sg(n,i,o,s):og(n)){e.push(l.i,n.i,c.i),ea(n),n=c.next,a=c.next;continue}if(n=c,n===a){r?r===1?(n=rg(as(n),e),jr(n,e,t,i,o,s,2)):r===2&&ag(n,e,t,i,o,s):jr(as(n),e,t,i,o,s,1);break}}}function og(n){const e=n.prev,t=n,i=n.next;if(an(e,t,i)>=0)return!1;const o=e.x,s=t.x,r=i.x,a=e.y,l=t.y,c=i.y,d=Math.min(o,s,r),u=Math.min(a,l,c),f=Math.max(o,s,r),h=Math.max(a,l,c);let p=i.next;for(;p!==e;){if(p.x>=d&&p.x<=f&&p.y>=u&&p.y<=h&&Ar(o,a,s,l,r,c,p.x,p.y)&&an(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function sg(n,e,t,i){const o=n.prev,s=n,r=n.next;if(an(o,s,r)>=0)return!1;const a=o.x,l=s.x,c=r.x,d=o.y,u=s.y,f=r.y,h=Math.min(a,l,c),p=Math.min(d,u,f),y=Math.max(a,l,c),g=Math.max(d,u,f),m=gh(h,p,e,t,i),M=gh(y,g,e,t,i);let E=n.prevZ,_=n.nextZ;for(;E&&E.z>=m&&_&&_.z<=M;){if(E.x>=h&&E.x<=y&&E.y>=p&&E.y<=g&&E!==o&&E!==r&&Ar(a,d,l,u,c,f,E.x,E.y)&&an(E.prev,E,E.next)>=0||(E=E.prevZ,_.x>=h&&_.x<=y&&_.y>=p&&_.y<=g&&_!==o&&_!==r&&Ar(a,d,l,u,c,f,_.x,_.y)&&an(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;E&&E.z>=m;){if(E.x>=h&&E.x<=y&&E.y>=p&&E.y<=g&&E!==o&&E!==r&&Ar(a,d,l,u,c,f,E.x,E.y)&&an(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;_&&_.z<=M;){if(_.x>=h&&_.x<=y&&_.y>=p&&_.y<=g&&_!==o&&_!==r&&Ar(a,d,l,u,c,f,_.x,_.y)&&an(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function rg(n,e){let t=n;do{const i=t.prev,o=t.next.next;!Js(i,o)&&lp(i,t,t.next,o)&&Qr(i,o)&&Qr(o,i)&&(e.push(i.i,t.i,o.i),ea(t),ea(t.next),t=n=o),t=t.next}while(t!==n);return as(t)}function ag(n,e,t,i,o,s){let r=n;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&gg(r,a)){let l=cp(r,a);r=as(r,r.next),l=as(l,l.next),jr(r,e,t,i,o,s,0),jr(l,e,t,i,o,s,0);return}a=a.next}r=r.next}while(r!==n)}function lg(n,e,t,i){const o=[];for(let s=0,r=e.length;s<r;s++){const a=e[s]*i,l=s<r-1?e[s+1]*i:n.length,c=rp(n,a,l,i,!1);c===c.next&&(c.steiner=!0),o.push(mg(c))}o.sort(cg);for(let s=0;s<o.length;s++)t=hg(o[s],t);return t}function cg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),o=(e.next.y-e.y)/(e.next.x-e.x);t=i-o}return t}function hg(n,e){const t=dg(n,e);if(!t)return e;const i=cp(t,n);return as(i,i.next),as(t,t.next)}function dg(n,e){let t=e;const i=n.x,o=n.y;let s=-1/0,r;if(Js(n,t))return t;do{if(Js(n,t.next))return t.next;if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const u=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>s&&(s=u,r=t.x<t.next.x?t:t.next,u===i))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let d=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&ap(o<c?i:s,o,l,c,o<c?s:i,o,t.x,t.y)){const u=Math.abs(o-t.y)/(i-t.x);Qr(t,n)&&(u<d||u===d&&(t.x>r.x||t.x===r.x&&ug(r,t)))&&(r=t,d=u)}t=t.next}while(t!==a);return r}function ug(n,e){return an(n.prev,n,e.prev)<0&&an(e.next,n,n.next)<0}function fg(n,e,t,i){let o=n;do o.z===0&&(o.z=gh(o.x,o.y,e,t,i)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==n);o.prevZ.nextZ=null,o.prevZ=null,pg(o)}function pg(n){let e,t=1;do{let i=n,o;n=null;let s=null;for(e=0;i;){e++;let r=i,a=0;for(let c=0;c<t&&(a++,r=r.nextZ,!!r);c++);let l=t;for(;a>0||l>0&&r;)a!==0&&(l===0||!r||i.z<=r.z)?(o=i,i=i.nextZ,a--):(o=r,r=r.nextZ,l--),s?s.nextZ=o:n=o,o.prevZ=s,s=o;i=r}s.nextZ=null,t*=2}while(e>1);return n}function gh(n,e,t,i,o){return n=(n-t)*o|0,e=(e-i)*o|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function mg(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function ap(n,e,t,i,o,s,r,a){return(o-r)*(e-a)>=(n-r)*(s-a)&&(n-r)*(i-a)>=(t-r)*(e-a)&&(t-r)*(s-a)>=(o-r)*(i-a)}function Ar(n,e,t,i,o,s,r,a){return!(n===r&&e===a)&&ap(n,e,t,i,o,s,r,a)}function gg(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!yg(n,e)&&(Qr(n,e)&&Qr(e,n)&&xg(n,e)&&(an(n.prev,n,e.prev)||an(n,e.prev,e))||Js(n,e)&&an(n.prev,n,n.next)>0&&an(e.prev,e,e.next)>0)}function an(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Js(n,e){return n.x===e.x&&n.y===e.y}function lp(n,e,t,i){const o=Na(an(n,e,t)),s=Na(an(n,e,i)),r=Na(an(t,i,n)),a=Na(an(t,i,e));return!!(o!==s&&r!==a||o===0&&ka(n,t,e)||s===0&&ka(n,i,e)||r===0&&ka(t,n,i)||a===0&&ka(t,e,i))}function ka(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Na(n){return n>0?1:n<0?-1:0}function yg(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&lp(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Qr(n,e){return an(n.prev,n,n.next)<0?an(n,e,n.next)>=0&&an(n,n.prev,e)>=0:an(n,e,n.prev)<0||an(n,n.next,e)<0}function xg(n,e){let t=n,i=!1;const o=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&o<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function cp(n,e){const t=yh(n.i,n.x,n.y),i=yh(e.i,e.x,e.y),o=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=o,o.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function du(n,e,t,i){const o=yh(n,e,t);return i?(o.next=i.next,o.prev=i,i.next.prev=o,i.next=o):(o.prev=o,o.next=o),o}function ea(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function yh(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function vg(n,e,t,i){let o=0;for(let s=e,r=t-i;s<t;s+=i)o+=(n[r]-n[s])*(n[s+1]+n[r+1]),r=s;return o}class bg{static triangulate(e,t,i=2){return ig(e,t,i)}}class Or{static area(e){const t=e.length;let i=0;for(let o=t-1,s=0;s<t;o=s++)i+=e[o].x*e[s].y-e[s].x*e[o].y;return i*.5}static isClockWise(e){return Or.area(e)<0}static triangulateShape(e,t){const i=[],o=[],s=[];uu(e),fu(i,e);let r=e.length;t.forEach(uu);for(let l=0;l<t.length;l++)o.push(r),r+=t[l].length,fu(i,t[l]);const a=bg.triangulate(i,o);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function uu(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function fu(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ci extends nd{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,o=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(o,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ci(e.radius,e.detail)}}class sd extends nn{constructor(e=[new Ce(0,-.5),new Ce(.5,0),new Ce(0,.5)],t=12,i=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:o},t=Math.floor(t),o=pt(o,0,Math.PI*2);const s=[],r=[],a=[],l=[],c=[],d=1/t,u=new F,f=new Ce,h=new F,p=new F,y=new F;let g=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,h.x=m*1,h.y=-g,h.z=m*0,y.copy(h),h.normalize(),l.push(h.x,h.y,h.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,h.x=m*1,h.y=-g,h.z=m*0,p.copy(h),h.x+=y.x,h.y+=y.y,h.z+=y.z,h.normalize(),l.push(h.x,h.y,h.z),y.copy(p)}for(let M=0;M<=t;M++){const E=i+M*d*o,_=Math.sin(E),R=Math.cos(E);for(let A=0;A<=e.length-1;A++){u.x=e[A].x*_,u.y=e[A].y,u.z=e[A].x*R,r.push(u.x,u.y,u.z),f.x=M/t,f.y=A/(e.length-1),a.push(f.x,f.y);const N=l[3*A+0]*_,b=l[3*A+1],C=l[3*A+0]*R;c.push(N,b,C)}}for(let M=0;M<t;M++)for(let E=0;E<e.length-1;E++){const _=E+M*e.length,R=_,A=_+e.length,N=_+e.length+1,b=_+1;s.push(R,A,b),s.push(N,b,A)}this.setIndex(s),this.setAttribute("position",new gt(r,3)),this.setAttribute("uv",new gt(a,2)),this.setAttribute("normal",new gt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sd(e.points,e.segments,e.phiStart,e.phiLength)}}class Sn extends nn{constructor(e=1,t=1,i=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:o};const s=e/2,r=t/2,a=Math.floor(i),l=Math.floor(o),c=a+1,d=l+1,u=e/a,f=t/l,h=[],p=[],y=[],g=[];for(let m=0;m<d;m++){const M=m*f-r;for(let E=0;E<c;E++){const _=E*u-s;p.push(_,-M,0),y.push(0,0,1),g.push(E/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){const E=M+c*m,_=M+c*(m+1),R=M+1+c*(m+1),A=M+1+c*m;h.push(E,_,A),h.push(_,R,A)}this.setIndex(h),this.setAttribute("position",new gt(p,3)),this.setAttribute("normal",new gt(y,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sn(e.width,e.height,e.widthSegments,e.heightSegments)}}class rd extends nn{constructor(e=.5,t=1,i=32,o=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:o,thetaStart:s,thetaLength:r},i=Math.max(3,i),o=Math.max(1,o);const a=[],l=[],c=[],d=[];let u=e;const f=(t-e)/o,h=new F,p=new Ce;for(let y=0;y<=o;y++){for(let g=0;g<=i;g++){const m=s+g/i*r;h.x=u*Math.cos(m),h.y=u*Math.sin(m),l.push(h.x,h.y,h.z),c.push(0,0,1),p.x=(h.x/t+1)/2,p.y=(h.y/t+1)/2,d.push(p.x,p.y)}u+=f}for(let y=0;y<o;y++){const g=y*(i+1);for(let m=0;m<i;m++){const M=m+g,E=M,_=M+i+1,R=M+i+2,A=M+1;a.push(E,_,A),a.push(_,R,A)}}this.setIndex(a),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rd(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ad extends nn{constructor(e=new sp([new Ce(0,.5),new Ce(-.5,-.5),new Ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],o=[],s=[],r=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(a,l,d),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(s,3)),this.setAttribute("uv",new gt(r,2));function c(d){const u=o.length/3,f=d.extractPoints(t);let h=f.shape;const p=f.holes;Or.isClockWise(h)===!1&&(h=h.reverse());for(let g=0,m=p.length;g<m;g++){const M=p[g];Or.isClockWise(M)===!0&&(p[g]=M.reverse())}const y=Or.triangulateShape(h,p);for(let g=0,m=p.length;g<m;g++){const M=p[g];h=h.concat(M)}for(let g=0,m=h.length;g<m;g++){const M=h[g];o.push(M.x,M.y,0),s.push(0,0,1),r.push(M.x,M.y)}for(let g=0,m=y.length;g<m;g++){const M=y[g],E=M[0]+u,_=M[1]+u,R=M[2]+u;i.push(E,_,R),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return _g(t,e)}static fromJSON(e,t){const i=[];for(let o=0,s=e.shapes.length;o<s;o++){const r=t[e.shapes[o]];i.push(r)}return new ad(i,e.curveSegments)}}function _g(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const o=n[t];e.shapes.push(o.uuid)}else e.shapes.push(n.uuid);return e}class Pn extends nn{constructor(e=1,t=32,i=16,o=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:o,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+a,Math.PI);let c=0;const d=[],u=new F,f=new F,h=[],p=[],y=[],g=[];for(let m=0;m<=i;m++){const M=[],E=m/i,_=r+E*a,R=e*Math.cos(_),A=Math.sqrt(e*e-R*R);let N=0;m===0&&r===0?N=.5/t:m===i&&l===Math.PI&&(N=-.5/t);for(let b=0;b<=t;b++){const C=b/t,S=o+C*s;u.x=-A*Math.cos(S),u.y=R,u.z=A*Math.sin(S),p.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),g.push(C+N,1-E),M.push(c++)}d.push(M)}for(let m=0;m<i;m++)for(let M=0;M<t;M++){const E=d[m][M+1],_=d[m][M],R=d[m+1][M],A=d[m+1][M+1];(m!==0||r>0)&&h.push(E,_,A),(m!==i-1||l<Math.PI)&&h.push(_,R,A)}this.setIndex(h),this.setAttribute("position",new gt(p,3)),this.setAttribute("normal",new gt(y,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Hn extends nn{constructor(e=1,t=.4,i=12,o=48,s=Math.PI*2,r=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:o,arc:s,thetaStart:r,thetaLength:a},i=Math.floor(i),o=Math.floor(o);const l=[],c=[],d=[],u=[],f=new F,h=new F,p=new F;for(let y=0;y<=i;y++){const g=r+y/i*a;for(let m=0;m<=o;m++){const M=m/o*s;h.x=(e+t*Math.cos(g))*Math.cos(M),h.y=(e+t*Math.cos(g))*Math.sin(M),h.z=t*Math.sin(g),c.push(h.x,h.y,h.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),p.subVectors(h,f).normalize(),d.push(p.x,p.y,p.z),u.push(m/o),u.push(y/i)}}for(let y=1;y<=i;y++)for(let g=1;g<=o;g++){const m=(o+1)*y+g-1,M=(o+1)*(y-1)+g-1,E=(o+1)*(y-1)+g,_=(o+1)*y+g;l.push(m,M,_),l.push(M,E,_)}this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Ks(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const o=n[t][i];if(pu(o))o.isRenderTargetTexture?(et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=o.clone();else if(Array.isArray(o))if(pu(o[0])){const s=[];for(let r=0,a=o.length;r<a;r++)s[r]=o[r].clone();e[t][i]=s}else e[t][i]=o.slice();else e[t][i]=o}}return e}function Un(n){const e={};for(let t=0;t<n.length;t++){const i=Ks(n[t]);for(const o in i)e[o]=i[o]}return e}function pu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function wg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function hp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const Mg={clone:Ks,merge:Un};var Sg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends po{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sg,this.fragmentShader=Tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=wg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const r=this.uniforms[o].value;r&&r.isTexture?t.uniforms[o]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[o]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[o]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[o]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[o]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[o]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[o]={type:"m4",value:r.toArray()}:t.uniforms[o]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const o in this.extensions)this.extensions[o]===!0&&(i[o]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const o=e.uniforms[i];switch(this.uniforms[i]={},o.type){case"t":this.uniforms[i].value=t[o.value]||null;break;case"c":this.uniforms[i].value=new ot().setHex(o.value);break;case"v2":this.uniforms[i].value=new Ce().fromArray(o.value);break;case"v3":this.uniforms[i].value=new F().fromArray(o.value);break;case"v4":this.uniforms[i].value=new rn().fromArray(o.value);break;case"m3":this.uniforms[i].value=new st().fromArray(o.value);break;case"m4":this.uniforms[i].value=new Ct().fromArray(o.value);break;default:this.uniforms[i].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Eg extends Ei{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wo extends po{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yl extends po{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Bh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ag extends po{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cg extends po{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ld extends xn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Da extends ld{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const dc=new Ct,mu=new F,gu=new F;class dp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new td,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new rn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;mu.setFromMatrixPosition(e.matrixWorld),t.position.copy(mu),gu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,o){dc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(dc,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,r=o?o.z/s.x:1,a=o?o.w/s.y:1,l=o?o.x/s.x:0,c=o?o.y/s.y:0;e.coordinateSystem===Jr||e.reversedDepth?t.set(.5*r,0,0,.5*r+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(dc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ua=new F,za=new lo,Ai=new F;class up extends xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ua,za,Ai),Ai.x===1&&Ai.y===1&&Ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,za,Ai.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ua,za,Ai),Ai.x===1&&Ai.y===1&&Ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,za,Ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const So=new F,yu=new Ce,xu=new Ce;class Yn extends up{constructor(e=50,t=1,i=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Kr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kr*2*Math.atan(Math.tan(Nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){So.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(So.x,So.y).multiplyScalar(-e/So.z),So.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(So.x,So.y).multiplyScalar(-e/So.z)}getViewSize(e,t){return this.getViewBounds(e,yu,xu),t.subVectors(xu,yu)}setViewOffset(e,t,i,o,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=o,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Nr*.5*this.fov)/this.zoom,i=2*t,o=this.aspect*i,s=-.5*o;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*o/l,t-=r.offsetY*i/c,o*=r.width/l,i*=r.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+o,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Rg extends dp{constructor(){super(new Yn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ig extends ld{constructor(e,t,i=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=o,this.shadow=new Rg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class cd extends up{constructor(e=-1,t=1,i=1,o=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=o,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,o,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=o,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let s=i-e,r=i+e,a=o+t,l=o-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Pg extends dp{constructor(){super(new cd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Oa extends ld{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xn.DEFAULT_UP),this.updateMatrix(),this.target=new xn,this.shadow=new Pg}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ps=-90,Ls=1;class Lg extends xn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Yn(Ps,Ls,e,t);o.layers=this.layers,this.add(o);const s=new Yn(Ps,Ls,e,t);s.layers=this.layers,this.add(s);const r=new Yn(Ps,Ls,e,t);r.layers=this.layers,this.add(r);const a=new Yn(Ps,Ls,e,t);a.layers=this.layers,this.add(a);const l=new Yn(Ps,Ls,e,t);l.layers=this.layers,this.add(l);const c=new Yn(Ps,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,o,s,r,a,l]=t;for(const c of t)this.remove(c);if(e===zi)i.up.set(0,1,0),i.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Jr)i.up.set(0,-1,0),i.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,2,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,o),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class kg extends Yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vu=new Ct;class Ng{constructor(e,t,i=0,o=1/0){this.ray=new Al(e,t),this.near=i,this.far=o,this.camera=null,this.layers=new Qh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Lt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vu),this}intersectObject(e,t=!0,i=[]){return xh(e,this,i,t),i.sort(bu),i}intersectObjects(e,t=!0,i=[]){for(let o=0,s=e.length;o<s;o++)xh(e[o],this,i,t);return i.sort(bu),i}}function bu(n,e){return n.distance-e.distance}function xh(n,e,t,i){let o=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(o=!1),o===!0&&i===!0){const s=n.children;for(let r=0,a=s.length;r<a;r++)xh(s[r],e,t,!0)}}const Ad=class Ad{constructor(e,t,i,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,o){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=o,this}};Ad.prototype.isMatrix2=!0;let _u=Ad;function wu(n,e,t,i){const o=Dg(i);switch(t){case Ff:return n*e;case Xh:return n*e/o.components*o.byteLength;case qh:return n*e/o.components*o.byteLength;case rs:return n*e*2/o.components*o.byteLength;case $h:return n*e*2/o.components*o.byteLength;case Bf:return n*e*3/o.components*o.byteLength;case _i:return n*e*4/o.components*o.byteLength;case Yh:return n*e*4/o.components*o.byteLength;case Ja:case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Za:case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zc:case Fc:return Math.max(n,16)*Math.max(e,8)/4;case Uc:case Oc:return Math.max(n,8)*Math.max(e,8)/2;case Bc:case Hc:case Vc:case Wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Gc:case rl:case Xc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $c:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Zc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case jc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Qc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case eh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case th:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case nh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ih:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case sh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case rh:case ah:case lh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ch:case hh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case al:case dh:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dg(n){switch(n){case ni:case Df:return{byteLength:1,components:1};case $r:case Uf:case Hi:return{byteLength:2,components:1};case Vh:case Wh:return{byteLength:2,components:4};case Bi:case Gh:case bi:return{byteLength:4,components:1};case zf:case Of:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fh}}));typeof window<"u"&&(window.__THREE__?et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function fp(){let n=null,e=!1,t=null,i=null;function o(s,r){i=n.requestAnimationFrame(o),t(s,r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(o),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Ug(n){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,d),a.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,d);else{u.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<u.length;h++){const p=u[f],y=u[h];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++f,u[f]=y)}u.length=f+1;for(let h=0,p=u.length;h<p;h++){const y=u[h];n.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function o(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:o,remove:s,update:r}}var zg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Og=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ty=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ny=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,oy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ry=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ay=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ly=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,cy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fy="gl_FragColor = linearToOutputTexel( gl_FragColor );",py=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,my=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,yy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,by=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_y=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,My=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ty=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ey=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ay=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ry=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Iy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Py=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ly=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ky=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ny=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Uy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Oy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fy=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,By=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$y=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ky=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ux=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,fx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_x=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ax=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ix=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Px=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ox=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ev=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ov=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ft={alphahash_fragment:zg,alphahash_pars_fragment:Og,alphamap_fragment:Fg,alphamap_pars_fragment:Bg,alphatest_fragment:Hg,alphatest_pars_fragment:Gg,aomap_fragment:Vg,aomap_pars_fragment:Wg,batching_pars_vertex:Xg,batching_vertex:qg,begin_vertex:$g,beginnormal_vertex:Yg,bsdfs:Jg,iridescence_fragment:Kg,bumpmap_pars_fragment:Zg,clipping_planes_fragment:jg,clipping_planes_pars_fragment:Qg,clipping_planes_pars_vertex:ey,clipping_planes_vertex:ty,color_fragment:ny,color_pars_fragment:iy,color_pars_vertex:oy,color_vertex:sy,common:ry,cube_uv_reflection_fragment:ay,defaultnormal_vertex:ly,displacementmap_pars_vertex:cy,displacementmap_vertex:hy,emissivemap_fragment:dy,emissivemap_pars_fragment:uy,colorspace_fragment:fy,colorspace_pars_fragment:py,envmap_fragment:my,envmap_common_pars_fragment:gy,envmap_pars_fragment:yy,envmap_pars_vertex:xy,envmap_physical_pars_fragment:Ry,envmap_vertex:vy,fog_vertex:by,fog_pars_vertex:_y,fog_fragment:wy,fog_pars_fragment:My,gradientmap_pars_fragment:Sy,lightmap_pars_fragment:Ty,lights_lambert_fragment:Ey,lights_lambert_pars_fragment:Ay,lights_pars_begin:Cy,lights_toon_fragment:Iy,lights_toon_pars_fragment:Py,lights_phong_fragment:Ly,lights_phong_pars_fragment:ky,lights_physical_fragment:Ny,lights_physical_pars_fragment:Dy,lights_fragment_begin:Uy,lights_fragment_maps:zy,lights_fragment_end:Oy,lightprobes_pars_fragment:Fy,logdepthbuf_fragment:By,logdepthbuf_pars_fragment:Hy,logdepthbuf_pars_vertex:Gy,logdepthbuf_vertex:Vy,map_fragment:Wy,map_pars_fragment:Xy,map_particle_fragment:qy,map_particle_pars_fragment:$y,metalnessmap_fragment:Yy,metalnessmap_pars_fragment:Jy,morphinstance_vertex:Ky,morphcolor_vertex:Zy,morphnormal_vertex:jy,morphtarget_pars_vertex:Qy,morphtarget_vertex:ex,normal_fragment_begin:tx,normal_fragment_maps:nx,normal_pars_fragment:ix,normal_pars_vertex:ox,normal_vertex:sx,normalmap_pars_fragment:rx,clearcoat_normal_fragment_begin:ax,clearcoat_normal_fragment_maps:lx,clearcoat_pars_fragment:cx,iridescence_pars_fragment:hx,opaque_fragment:dx,packing:ux,premultiplied_alpha_fragment:fx,project_vertex:px,dithering_fragment:mx,dithering_pars_fragment:gx,roughnessmap_fragment:yx,roughnessmap_pars_fragment:xx,shadowmap_pars_fragment:vx,shadowmap_pars_vertex:bx,shadowmap_vertex:_x,shadowmask_pars_fragment:wx,skinbase_vertex:Mx,skinning_pars_vertex:Sx,skinning_vertex:Tx,skinnormal_vertex:Ex,specularmap_fragment:Ax,specularmap_pars_fragment:Cx,tonemapping_fragment:Rx,tonemapping_pars_fragment:Ix,transmission_fragment:Px,transmission_pars_fragment:Lx,uv_pars_fragment:kx,uv_pars_vertex:Nx,uv_vertex:Dx,worldpos_vertex:Ux,background_vert:zx,background_frag:Ox,backgroundCube_vert:Fx,backgroundCube_frag:Bx,cube_vert:Hx,cube_frag:Gx,depth_vert:Vx,depth_frag:Wx,distance_vert:Xx,distance_frag:qx,equirect_vert:$x,equirect_frag:Yx,linedashed_vert:Jx,linedashed_frag:Kx,meshbasic_vert:Zx,meshbasic_frag:jx,meshlambert_vert:Qx,meshlambert_frag:ev,meshmatcap_vert:tv,meshmatcap_frag:nv,meshnormal_vert:iv,meshnormal_frag:ov,meshphong_vert:sv,meshphong_frag:rv,meshphysical_vert:av,meshphysical_frag:lv,meshtoon_vert:cv,meshtoon_frag:hv,points_vert:dv,points_frag:uv,shadow_vert:fv,shadow_frag:pv,sprite_vert:mv,sprite_frag:gv},ke={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},ki={basic:{uniforms:Un([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Un([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Un([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Un([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Un([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new ot(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Un([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Un([ke.points,ke.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Un([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Un([ke.common,ke.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Un([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Un([ke.sprite,ke.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:Un([ke.common,ke.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:Un([ke.lights,ke.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};ki.physical={uniforms:Un([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const Fa={r:0,b:0,g:0},yv=new Ct,pp=new st;pp.set(-1,0,0,0,1,0,0,0,1);function xv(n,e,t,i,o,s){const r=new ot(0);let a=o===!0?0:1,l,c,d=null,u=0,f=null;function h(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const _=M.backgroundBlurriness>0;E=e.get(E,_)}return E}function p(M){let E=!1;const _=h(M);_===null?g(r,a):_&&_.isColor&&(g(_,1),E=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(M,E){const _=h(E);_&&(_.isCubeTexture||_.mapping===El)?(c===void 0&&(c=new ae(new je(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Ks(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(yv.makeRotationFromEuler(E.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pp),c.material.toneMapped=Et.getTransfer(_.colorSpace)!==Vt,(d!==_||u!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=_,u=_.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ae(new Sn(2,2),new Ei({name:"BackgroundMaterial",uniforms:Ks(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:os,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Et.getTransfer(_.colorSpace)!==Vt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||u!==_.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=_,u=_.version,f=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,E){M.getRGB(Fa,hp(n)),t.buffers.color.setClear(Fa.r,Fa.g,Fa.b,E,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(M,E=1){r.set(M),a=E,g(r,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(r,a)},render:p,addToRenderList:y,dispose:m}}function vv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},o=f(null);let s=o,r=!1;function a(V,$,T,I,k){let L=!1;const Z=u(V,I,T,$);s!==Z&&(s=Z,c(s.object)),L=h(V,I,T,k),L&&p(V,I,T,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(L||r)&&(r=!1,_(V,$,T,I),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return n.createVertexArray()}function c(V){return n.bindVertexArray(V)}function d(V){return n.deleteVertexArray(V)}function u(V,$,T,I){const k=I.wireframe===!0;let L=i[$.id];L===void 0&&(L={},i[$.id]=L);const Z=V.isInstancedMesh===!0?V.id:0;let j=L[Z];j===void 0&&(j={},L[Z]=j);let ne=j[T.id];ne===void 0&&(ne={},j[T.id]=ne);let ce=ne[k];return ce===void 0&&(ce=f(l()),ne[k]=ce),ce}function f(V){const $=[],T=[],I=[];for(let k=0;k<t;k++)$[k]=0,T[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:$,enabledAttributes:T,attributeDivisors:I,object:V,attributes:{},index:null}}function h(V,$,T,I){const k=s.attributes,L=$.attributes;let Z=0;const j=T.getAttributes();for(const ne in j)if(j[ne].location>=0){const pe=k[ne];let De=L[ne];if(De===void 0&&(ne==="instanceMatrix"&&V.instanceMatrix&&(De=V.instanceMatrix),ne==="instanceColor"&&V.instanceColor&&(De=V.instanceColor)),pe===void 0||pe.attribute!==De||De&&pe.data!==De.data)return!0;Z++}return s.attributesNum!==Z||s.index!==I}function p(V,$,T,I){const k={},L=$.attributes;let Z=0;const j=T.getAttributes();for(const ne in j)if(j[ne].location>=0){let pe=L[ne];pe===void 0&&(ne==="instanceMatrix"&&V.instanceMatrix&&(pe=V.instanceMatrix),ne==="instanceColor"&&V.instanceColor&&(pe=V.instanceColor));const De={};De.attribute=pe,pe&&pe.data&&(De.data=pe.data),k[ne]=De,Z++}s.attributes=k,s.attributesNum=Z,s.index=I}function y(){const V=s.newAttributes;for(let $=0,T=V.length;$<T;$++)V[$]=0}function g(V){m(V,0)}function m(V,$){const T=s.newAttributes,I=s.enabledAttributes,k=s.attributeDivisors;T[V]=1,I[V]===0&&(n.enableVertexAttribArray(V),I[V]=1),k[V]!==$&&(n.vertexAttribDivisor(V,$),k[V]=$)}function M(){const V=s.newAttributes,$=s.enabledAttributes;for(let T=0,I=$.length;T<I;T++)$[T]!==V[T]&&(n.disableVertexAttribArray(T),$[T]=0)}function E(V,$,T,I,k,L,Z){Z===!0?n.vertexAttribIPointer(V,$,T,k,L):n.vertexAttribPointer(V,$,T,I,k,L)}function _(V,$,T,I){y();const k=I.attributes,L=T.getAttributes(),Z=$.defaultAttributeValues;for(const j in L){const ne=L[j];if(ne.location>=0){let ce=k[j];if(ce===void 0&&(j==="instanceMatrix"&&V.instanceMatrix&&(ce=V.instanceMatrix),j==="instanceColor"&&V.instanceColor&&(ce=V.instanceColor)),ce!==void 0){const pe=ce.normalized,De=ce.itemSize,Fe=e.get(ce);if(Fe===void 0)continue;const rt=Fe.buffer,dt=Fe.type,Rt=Fe.bytesPerElement,ie=dt===n.INT||dt===n.UNSIGNED_INT||ce.gpuType===Gh;if(ce.isInterleavedBufferAttribute){const de=ce.data,Be=de.stride,tt=ce.offset;if(de.isInstancedInterleavedBuffer){for(let Oe=0;Oe<ne.locationSize;Oe++)m(ne.location+Oe,de.meshPerAttribute);V.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Oe=0;Oe<ne.locationSize;Oe++)g(ne.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Oe=0;Oe<ne.locationSize;Oe++)E(ne.location+Oe,De/ne.locationSize,dt,pe,Be*Rt,(tt+De/ne.locationSize*Oe)*Rt,ie)}else{if(ce.isInstancedBufferAttribute){for(let de=0;de<ne.locationSize;de++)m(ne.location+de,ce.meshPerAttribute);V.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let de=0;de<ne.locationSize;de++)g(ne.location+de);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let de=0;de<ne.locationSize;de++)E(ne.location+de,De/ne.locationSize,dt,pe,De*Rt,De/ne.locationSize*de*Rt,ie)}}else if(Z!==void 0){const pe=Z[j];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(ne.location,pe);break;case 3:n.vertexAttrib3fv(ne.location,pe);break;case 4:n.vertexAttrib4fv(ne.location,pe);break;default:n.vertexAttrib1fv(ne.location,pe)}}}}M()}function R(){C();for(const V in i){const $=i[V];for(const T in $){const I=$[T];for(const k in I){const L=I[k];for(const Z in L)d(L[Z].object),delete L[Z];delete I[k]}}delete i[V]}}function A(V){if(i[V.id]===void 0)return;const $=i[V.id];for(const T in $){const I=$[T];for(const k in I){const L=I[k];for(const Z in L)d(L[Z].object),delete L[Z];delete I[k]}}delete i[V.id]}function N(V){for(const $ in i){const T=i[$];for(const I in T){const k=T[I];if(k[V.id]===void 0)continue;const L=k[V.id];for(const Z in L)d(L[Z].object),delete L[Z];delete k[V.id]}}}function b(V){for(const $ in i){const T=i[$],I=V.isInstancedMesh===!0?V.id:0,k=T[I];if(k!==void 0){for(const L in k){const Z=k[L];for(const j in Z)d(Z[j].object),delete Z[j];delete k[L]}delete T[I],Object.keys(T).length===0&&delete i[$]}}}function C(){S(),r=!0,s!==o&&(s=o,c(s.object))}function S(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:b,releaseStatesOfProgram:N,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function bv(n,e,t){let i;function o(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function r(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function a(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let f=0;for(let h=0;h<d;h++)f+=c[h];t.update(f,i,1)}this.setMode=o,this.render=s,this.renderInstances=r,this.renderMultiDraw=a}function _v(n,e,t,i){let o;function s(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");o=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function r(N){return!(N!==_i&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(N){const b=N===Hi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==ni&&N!==bi&&!b&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(et("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:_,maxSamples:R,samples:A}}function wv(n){const e=this;let t=null,i=0,o=!1,s=!1;const r=new Ao,a=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||i!==0||o;return o=f,i=u.length,h},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const p=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,m=n.get(u);if(!o||p===null||p.length===0||s&&!g)s?d(null):c();else{const M=s?0:i,E=M*4;let _=m.clippingState||null;l.value=_,_=d(p,f,E,h);for(let R=0;R!==E;++R)_[R]=t[R];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,f,h,p){const y=u!==null?u.length:0;let g=null;if(y!==0){if(g=l.value,p!==!0||g===null){const m=h+y*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,_=h;E!==y;++E,_+=4)r.copy(u[E]).applyMatrix4(M,a),r.normal.toArray(g,_),g[_+3]=r.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}const Fs=4,Mv=6,Sv=20,Tv=256,vr=new cd,Mu=new ot;let uc=null,fc=0,pc=0,mc=!1;const Ev=new F,Xo=new F;class Su{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,o=100,s={}){const{size:r=256,position:a=Ev}=s;uc=this._renderer.getRenderTarget(),fc=this._renderer.getActiveCubeFace(),pc=this._renderer.getActiveMipmapLevel(),mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,o,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Au(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(uc,fc,pc),this._renderer.xr.enabled=mc,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===Ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uc=this._renderer.getRenderTarget(),fc=this._renderer.getActiveCubeFace(),pc=this._renderer.getActiveMipmapLevel(),mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:Hi,format:_i,colorSpace:cl,depthBuffer:!1},o=Tu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tu(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Av(s)),this._blurMaterial=Rv(s,e,t),this._ggxMaterial=Cv(s,e,t)}return o}_compileMaterial(e){const t=new ae(new nn,e);this._renderer.compile(t,vr)}_sceneToCubeUV(e,t,i,o,s){const l=new Yn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Mu),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(o),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new je,new xi({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,g=y.material;let m=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(Mu),m=!0);for(let E=0;E<6;E++){const _=E%3;_===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[E],s.y,s.z)):_===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[E]));const R=this._cubeSize;ks(o,_*R,E>2?R:0,R,R),u.setRenderTarget(o),m&&u.render(y,l),u.render(e,l)}u.toneMapping=h,u.autoClear=f,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,o=e.mapping===ss||e.mapping===Ys;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Au()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eu());const s=o?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ks(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,vr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const o=this._lodMeshes.length;for(let s=1;s<o;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const o=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,a=this._lodMeshes[i];a.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),f=c*1.25,h=u*f,{_lodMax:p}=this,y=this._sizeLods[i],g=3*y*(i>p-Fs?i-p+Fs:0),m=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,ks(s,g,m,3*y,2*y),o.setRenderTarget(s),o.render(a,vr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,ks(e,g,m,3*y,2*y),o.setRenderTarget(e),o.render(a,vr)}_blur(e,t,i,o){const s=this._pingPongRenderTarget,r=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,r),this._blurPass(s,e,i,i,r)}_blurPass(e,t,i,o,s){const r=this._renderer,a=this._blurMaterial,l=this._lodMeshes[o];l.material=a;const c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[o],u=3*d*(o>this._lodMax-Fs?o-this._lodMax+Fs:0),f=4*(this._cubeSize-d);ks(t,u,f,3*d,2*d),r.setRenderTarget(t),r.render(l,vr)}}function Av(n){const e=[],t=[];let i=n;const o=n-Fs+1+Mv;for(let s=0;s<o;s++){const r=Math.pow(2,i);e.push(r);const a=1/(r-2),l=-a,c=1+a,d=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,f=6,h=3,p=new Float32Array(h*f*u),y=new Float32Array(h*f*u);for(let m=0;m<u;m++){const M=m%3*2/3-1,E=m>2?0:-1,_=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];p.set(_,h*f*m);for(let R=0;R<f;R++){const A=d[R*2]*2-1,N=d[R*2+1]*2-1;m===0?Xo.set(1,N,A):m===1?Xo.set(-A,1,-N):m===2?Xo.set(-A,N,1):m===3?Xo.set(-1,N,-A):m===4?Xo.set(-A,-1,N):Xo.set(A,N,-1),Xo.toArray(y,(m*f+R)*h)}}const g=new nn;g.setAttribute("position",new ii(p,h)),g.setAttribute("outputDirection",new ii(y,h)),t.push(new ae(g,null)),i>Fs&&i--}return{lodMeshes:t,sizeLods:e}}function Tu(n,e,t){const i=new Si(n,e,t);return i.texture.mapping=El,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(n,e,t,i,o){n.viewport.set(e,t,i,o),n.scissor.set(e,t,i,o)}function Cv(n,e,t){return new Ei({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Tv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Cl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ao,depthTest:!1,depthWrite:!1})}function Rv(n,e,t){return new Ei({name:"SphericalGaussianBlur",defines:{SAMPLES:Sv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Cl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ao,depthTest:!1,depthWrite:!1})}function Eu(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ao,depthTest:!1,depthWrite:!1})}function Au(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ao,depthTest:!1,depthWrite:!1})}function Cl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class mp extends Si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},o=[i,i,i,i,i,i];this.texture=new jf(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new je(5,5,5),s=new Ei({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:An,blending:ao});s.uniforms.tEquirect.value=t;const r=new ae(o,s),a=t.minFilter;return t.minFilter===Zo&&(t.minFilter=Ln),new Lg(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,o=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,o);e.setRenderTarget(s)}}function Iv(n){let e=new WeakMap,t=new WeakMap,i=null;function o(f,h=!1){return f==null?null:h?r(f):s(f)}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===Ul||h===zl)if(e.has(f)){const p=e.get(f).texture;return a(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const y=new mp(p.height);return y.fromEquirectangularTexture(n,f),e.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function r(f){if(f&&f.isTexture){const h=f.mapping,p=h===Ul||h===zl,y=h===ss||h===Ys;if(p||y){let g=t.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Su(n)),g=p?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const M=f.image;return p&&M&&M.height>0||y&&M&&l(M)?(i===null&&(i=new Su(n)),g=p?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",d),g.texture):null}}}return f}function a(f,h){return h===Ul?f.mapping=ss:h===zl&&(f.mapping=Ys),f}function l(f){let h=0;const p=6;for(let y=0;y<p;y++)f[y]!==void 0&&h++;return h===p}function c(f){const h=f.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function d(f){const h=f.target;h.removeEventListener("dispose",d);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:o,dispose:u}}function Pv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const o=n.getExtension(i);return e[i]=o,o}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const o=t(i);return o===null&&Gs("WebGLRenderer: "+i+" extension not supported."),o}}}function Lv(n,e,t,i){const o={},s=new WeakMap;function r(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",r),delete o[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return o[f.id]===!0||(f.addEventListener("dispose",r),o[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(u){const f=[],h=u.index,p=u.attributes.position;let y=0;if(p===void 0)return;if(h!==null){const M=h.array;y=h.version;for(let E=0,_=M.length;E<_;E+=3){const R=M[E+0],A=M[E+1],N=M[E+2];f.push(R,A,A,N,N,R)}}else{const M=p.array;y=p.version;for(let E=0,_=M.length/3-1;E<_;E+=3){const R=E+0,A=E+1,N=E+2;f.push(R,A,A,N,N,R)}}const g=new(p.count>=65535?Yf:$f)(f,1);g.version=y;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function d(u){const f=s.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function kv(n,e,t){let i;function o(u){i=u}let s,r;function a(u){s=u.type,r=u.bytesPerElement}function l(u,f){n.drawElements(i,f,s,u*r),t.update(f,i,1)}function c(u,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,u*r,h),t.update(f,i,h))}function d(u,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,h);let y=0;for(let g=0;g<h;g++)y+=f[g];t.update(y,i,1)}this.setMode=o,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Nv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,a){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Lt("WebGLInfo: Unknown draw mode:",r);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:i}}function Dv(n,e,t){const i=new WeakMap,o=new rn;function s(r,a,l){const c=r.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let S=function(){b.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var h=S;f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let _=0;p===!0&&(_=1),y===!0&&(_=2),g===!0&&(_=3);let R=a.attributes.position.count*_,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const N=new Float32Array(R*A*4*u),b=new Wf(N,R,A,u);b.type=bi,b.needsUpdate=!0;const C=_*4;for(let V=0;V<u;V++){const $=m[V],T=M[V],I=E[V],k=R*A*4*V;for(let L=0;L<$.count;L++){const Z=L*C;p===!0&&(o.fromBufferAttribute($,L),N[k+Z+0]=o.x,N[k+Z+1]=o.y,N[k+Z+2]=o.z,N[k+Z+3]=0),y===!0&&(o.fromBufferAttribute(T,L),N[k+Z+4]=o.x,N[k+Z+5]=o.y,N[k+Z+6]=o.z,N[k+Z+7]=0),g===!0&&(o.fromBufferAttribute(I,L),N[k+Z+8]=o.x,N[k+Z+9]=o.y,N[k+Z+10]=o.z,N[k+Z+11]=I.itemSize===4?o.w:1)}}f={count:u,texture:b,size:new Ce(R,A)},i.set(a,f),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const y=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",y),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Uv(n,e,t,i,o){let s=new WeakMap;function r(c){const d=o.render.frame,u=c.geometry,f=e.get(c,u);if(s.get(f)!==d&&(e.update(f),s.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==d&&(h.update(),s.set(h,d))}return f}function a(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:a}}const zv={[Cf]:"LINEAR_TONE_MAPPING",[Rf]:"REINHARD_TONE_MAPPING",[If]:"CINEON_TONE_MAPPING",[Hh]:"ACES_FILMIC_TONE_MAPPING",[Lf]:"AGX_TONE_MAPPING",[kf]:"NEUTRAL_TONE_MAPPING",[Pf]:"CUSTOM_TONE_MAPPING"};function Ov(n,e,t,i,o,s){const r=new Si(e,t,{type:n,depthBuffer:o,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,l=null;const c=new nn;c.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new gt([0,2,0,0,2,0],2));const d=new Eg({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ae(c,d),f=new cd(-1,1,1,-1,0,1);let h=null,p=null,y=!1,g,m=null,M=[],E=!1;this.setSize=function(_,R){r.setSize(_,R),a!==null&&a.setSize(_,R),l!==null&&l.setSize(_,R);for(let A=0;A<M.length;A++){const N=M[A];N.setSize&&N.setSize(_,R)}},this.setEffects=function(_){M=_,E=M.length>0&&M[0].isRenderPass===!0;const R=r.width,A=r.height;M.length>0&&a===null&&(a=new Si(R,A,{type:Hi,depthBuffer:!1,stencilBuffer:!1}),l=new Si(R,A,{type:Hi,depthBuffer:!1,stencilBuffer:!1}));for(let N=0;N<M.length;N++){const b=M[N];b.setSize&&b.setSize(R,A)}},this.begin=function(_,R){if(y||_.toneMapping===Oi&&M.length===0)return!1;if(m=R,R!==null){const A=R.width,N=R.height;(r.width!==A||r.height!==N)&&this.setSize(A,N)}return E===!1&&_.setRenderTarget(r),g=_.toneMapping,_.toneMapping=Oi,!0},this.hasRenderPass=function(){return E},this.end=function(_,R){_.toneMapping=g,y=!0;let A=r,N=a;for(let b=0;b<M.length;b++){const C=M[b];C.enabled!==!1&&(C.render(_,N,A,R),C.needsSwap!==!1&&(A=N,N=N===a?l:a))}if(h!==_.outputColorSpace||p!==_.toneMapping){h=_.outputColorSpace,p=_.toneMapping,d.defines={},Et.getTransfer(h)===Vt&&(d.defines.SRGB_TRANSFER="");const b=zv[p];b&&(d.defines[b]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=A.texture,_.setRenderTarget(m),_.render(u,f),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){r.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}const gp=new kn,vh=new Zr(1,1),yp=new Wf,xp=new Mm,vp=new jf,Cu=[],Ru=[],Iu=new Float32Array(16),Pu=new Float32Array(9),Lu=new Float32Array(4);function tr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const o=e*t;let s=Cu[o];if(s===void 0&&(s=new Float32Array(o),Cu[o]=s),e!==0){i.toArray(s,0);for(let r=1,a=0;r!==e;++r)a+=t,n[r].toArray(s,a)}return s}function vn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Rl(n,e){let t=Ru[e];t===void 0&&(t=new Int32Array(e),Ru[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Fv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vn(t,e))return;n.uniform2fv(this.addr,e),bn(t,e)}}function Hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vn(t,e))return;n.uniform3fv(this.addr,e),bn(t,e)}}function Gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vn(t,e))return;n.uniform4fv(this.addr,e),bn(t,e)}}function Vv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bn(t,e)}else{if(vn(t,i))return;Lu.set(i),n.uniformMatrix2fv(this.addr,!1,Lu),bn(t,i)}}function Wv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bn(t,e)}else{if(vn(t,i))return;Pu.set(i),n.uniformMatrix3fv(this.addr,!1,Pu),bn(t,i)}}function Xv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(vn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bn(t,e)}else{if(vn(t,i))return;Iu.set(i),n.uniformMatrix4fv(this.addr,!1,Iu),bn(t,i)}}function qv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $v(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vn(t,e))return;n.uniform2iv(this.addr,e),bn(t,e)}}function Yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vn(t,e))return;n.uniform3iv(this.addr,e),bn(t,e)}}function Jv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vn(t,e))return;n.uniform4iv(this.addr,e),bn(t,e)}}function Kv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Zv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vn(t,e))return;n.uniform2uiv(this.addr,e),bn(t,e)}}function jv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vn(t,e))return;n.uniform3uiv(this.addr,e),bn(t,e)}}function Qv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vn(t,e))return;n.uniform4uiv(this.addr,e),bn(t,e)}}function e1(n,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(n.uniform1i(this.addr,o),i[0]=o);let s;this.type===n.SAMPLER_2D_SHADOW?(vh.compareFunction=t.isReversedDepthBuffer()?Kh:Jh,s=vh):s=gp,t.setTexture2D(e||s,o)}function t1(n,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(n.uniform1i(this.addr,o),i[0]=o),t.setTexture3D(e||xp,o)}function n1(n,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(n.uniform1i(this.addr,o),i[0]=o),t.setTextureCube(e||vp,o)}function i1(n,e,t){const i=this.cache,o=t.allocateTextureUnit();i[0]!==o&&(n.uniform1i(this.addr,o),i[0]=o),t.setTexture2DArray(e||yp,o)}function o1(n){switch(n){case 5126:return Fv;case 35664:return Bv;case 35665:return Hv;case 35666:return Gv;case 35674:return Vv;case 35675:return Wv;case 35676:return Xv;case 5124:case 35670:return qv;case 35667:case 35671:return $v;case 35668:case 35672:return Yv;case 35669:case 35673:return Jv;case 5125:return Kv;case 36294:return Zv;case 36295:return jv;case 36296:return Qv;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return t1;case 35680:case 36300:case 36308:case 36293:return n1;case 36289:case 36303:case 36311:case 36292:return i1}}function s1(n,e){n.uniform1fv(this.addr,e)}function r1(n,e){const t=tr(e,this.size,2);n.uniform2fv(this.addr,t)}function a1(n,e){const t=tr(e,this.size,3);n.uniform3fv(this.addr,t)}function l1(n,e){const t=tr(e,this.size,4);n.uniform4fv(this.addr,t)}function c1(n,e){const t=tr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function h1(n,e){const t=tr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function d1(n,e){const t=tr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function u1(n,e){n.uniform1iv(this.addr,e)}function f1(n,e){n.uniform2iv(this.addr,e)}function p1(n,e){n.uniform3iv(this.addr,e)}function m1(n,e){n.uniform4iv(this.addr,e)}function g1(n,e){n.uniform1uiv(this.addr,e)}function y1(n,e){n.uniform2uiv(this.addr,e)}function x1(n,e){n.uniform3uiv(this.addr,e)}function v1(n,e){n.uniform4uiv(this.addr,e)}function b1(n,e,t){const i=this.cache,o=e.length,s=Rl(t,o);vn(i,s)||(n.uniform1iv(this.addr,s),bn(i,s));let r;this.type===n.SAMPLER_2D_SHADOW?r=vh:r=gp;for(let a=0;a!==o;++a)t.setTexture2D(e[a]||r,s[a])}function _1(n,e,t){const i=this.cache,o=e.length,s=Rl(t,o);vn(i,s)||(n.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==o;++r)t.setTexture3D(e[r]||xp,s[r])}function w1(n,e,t){const i=this.cache,o=e.length,s=Rl(t,o);vn(i,s)||(n.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==o;++r)t.setTextureCube(e[r]||vp,s[r])}function M1(n,e,t){const i=this.cache,o=e.length,s=Rl(t,o);vn(i,s)||(n.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==o;++r)t.setTexture2DArray(e[r]||yp,s[r])}function S1(n){switch(n){case 5126:return s1;case 35664:return r1;case 35665:return a1;case 35666:return l1;case 35674:return c1;case 35675:return h1;case 35676:return d1;case 5124:case 35670:return u1;case 35667:case 35671:return f1;case 35668:case 35672:return p1;case 35669:case 35673:return m1;case 5125:return g1;case 36294:return y1;case 36295:return x1;case 36296:return v1;case 35678:case 36198:case 36298:case 36306:case 35682:return b1;case 35679:case 36299:case 36307:return _1;case 35680:case 36300:case 36308:case 36293:return w1;case 36289:case 36303:case 36311:case 36292:return M1}}class T1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=o1(t.type)}}class E1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=S1(t.type)}}class A1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const o=this.seq;for(let s=0,r=o.length;s!==r;++s){const a=o[s];a.setValue(e,t[a.id],i)}}}const gc=/(\w+)(\])?(\[|\.)?/g;function ku(n,e){n.seq.push(e),n.map[e.id]=e}function C1(n,e,t){const i=n.name,o=i.length;for(gc.lastIndex=0;;){const s=gc.exec(i),r=gc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===o){ku(t,c===void 0?new T1(a,n,e):new E1(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new A1(a),ku(t,u)),t=u}}}class Qa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(t,r),l=e.getUniformLocation(t,a.name);C1(a,l,this)}const o=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(r):s.push(r);o.length>0&&(this.seq=o.concat(s))}setValue(e,t,i,o){const s=this.map[t];s!==void 0&&s.setValue(e,i,o)}setOptional(e,t,i){const o=t[i];o!==void 0&&this.setValue(e,i,o)}static upload(e,t,i,o){for(let s=0,r=t.length;s!==r;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,o)}}static seqWithValue(e,t){const i=[];for(let o=0,s=e.length;o!==s;++o){const r=e[o];r.id in t&&i.push(r)}return i}}function Nu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const R1=37297;let I1=0;function P1(n,e){const t=n.split(`
`),i=[],o=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=o;r<s;r++){const a=r+1;i.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return i.join(`
`)}const Du=new st;function L1(n){Et._getMatrix(Du,Et.workingColorSpace,n);const e=`mat3( ${Du.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(n)){case hl:return[e,"LinearTransferOETF"];case Vt:return[e,"sRGBTransferOETF"];default:return et("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Uu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+P1(n.getShaderSource(e),a)}else return s}function k1(n,e){const t=L1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const N1={[Cf]:"Linear",[Rf]:"Reinhard",[If]:"Cineon",[Hh]:"ACESFilmic",[Lf]:"AgX",[kf]:"Neutral",[Pf]:"Custom"};function D1(n,e){const t=N1[e];return t===void 0?(et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ba=new F;function U1(){Et.getLuminanceCoefficients(Ba);const n=Ba.x.toFixed(4),e=Ba.y.toFixed(4),t=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function z1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function O1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function F1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let o=0;o<i;o++){const s=n.getActiveAttrib(e,o),r=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[r]={type:s.type,location:n.getAttribLocation(e,r),locationSize:a}}return t}function Cr(n){return n!==""}function zu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ou(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const B1=/^[ \t]*#include +<([\w\d./]+)>/gm;function bh(n){return n.replace(B1,G1)}const H1=new Map;function G1(n,e){let t=ft[e];if(t===void 0){const i=H1.get(e);if(i!==void 0)t=ft[i],et('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return bh(t)}const V1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fu(n){return n.replace(V1,W1)}function W1(n,e,t,i){let o="";for(let s=parseInt(e);s<parseInt(t);s++)o+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return o}function Bu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const X1={[Ya]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function q1(n){return X1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $1={[ss]:"ENVMAP_TYPE_CUBE",[Ys]:"ENVMAP_TYPE_CUBE",[El]:"ENVMAP_TYPE_CUBE_UV"};function Y1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":$1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const J1={[Ys]:"ENVMAP_MODE_REFRACTION"};function K1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":J1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Z1={[Bh]:"ENVMAP_BLENDING_MULTIPLY",[B0]:"ENVMAP_BLENDING_MIX",[H0]:"ENVMAP_BLENDING_ADD"};function j1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Z1[n.combine]||"ENVMAP_BLENDING_NONE"}function Q1(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function eb(n,e,t,i){const o=n.getContext(),s=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=q1(t),c=Y1(t),d=K1(t),u=j1(t),f=Q1(t),h=z1(t),p=O1(s),y=o.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),m.length>0&&(m+=`
`)):(g=[Bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),m=[Bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?ft.tonemapping_pars_fragment:"",t.toneMapping!==Oi?D1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,k1("linearToOutputTexel",t.outputColorSpace),U1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),r=bh(r),r=zu(r,t),r=Ou(r,t),a=bh(a),a=zu(a,t),a=Ou(a,t),r=Fu(r),a=Fu(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Ld?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ld?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=M+g+r,_=M+m+a,R=Nu(o,o.VERTEX_SHADER,E),A=Nu(o,o.FRAGMENT_SHADER,_);o.attachShader(y,R),o.attachShader(y,A),t.index0AttributeName!==void 0?o.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&o.bindAttribLocation(y,0,"position"),o.linkProgram(y);function N(V){if(n.debug.checkShaderErrors){const $=o.getProgramInfoLog(y)||"",T=o.getShaderInfoLog(R)||"",I=o.getShaderInfoLog(A)||"",k=$.trim(),L=T.trim(),Z=I.trim();let j=!0,ne=!0;if(o.getProgramParameter(y,o.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(o,y,R,A);else{const ce=Uu(o,R,"vertex"),pe=Uu(o,A,"fragment");Lt("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(y,o.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+k+`
`+ce+`
`+pe)}else k!==""?et("WebGLProgram: Program Info Log:",k):(L===""||Z==="")&&(ne=!1);ne&&(V.diagnostics={runnable:j,programLog:k,vertexShader:{log:L,prefix:g},fragmentShader:{log:Z,prefix:m}})}o.deleteShader(R),o.deleteShader(A),b=new Qa(o,y),C=F1(o,y)}let b;this.getUniforms=function(){return b===void 0&&N(this),b};let C;this.getAttributes=function(){return C===void 0&&N(this),C};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=o.getProgramParameter(y,R1)),S},this.destroy=function(){i.releaseStatesOfProgram(this),o.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=I1++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=A,this}let tb=0;class nb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const o=this._getShaderCacheForMaterial(e);return o.has(t)===!1&&(o.add(t),t.usedTimes++),o.has(i)===!1&&(o.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ib(e),t.set(e,i)),i}}class ib{constructor(e){this.id=tb++,this.code=e,this.usedTimes=0}}function ob(n){return n===rs||n===rl||n===al}function sb(n,e,t,i,o,s){const r=new Qh,a=new nb,l=new Set,c=[],d=new Map,u=i.logarithmicDepthBuffer;let f=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function y(b,C,S,V,$,T){const I=V.fog,k=$.geometry,L=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?V.environment:null,Z=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,j=e.get(b.envMap||L,Z),ne=j&&j.mapping===El?j.image.height:null,ce=h[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&et("WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const pe=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,De=pe!==void 0?pe.length:0;let Fe=0;k.morphAttributes.position!==void 0&&(Fe=1),k.morphAttributes.normal!==void 0&&(Fe=2),k.morphAttributes.color!==void 0&&(Fe=3);let rt,dt,Rt,ie;if(ce){const Gt=ki[ce];rt=Gt.vertexShader,dt=Gt.fragmentShader}else{rt=b.vertexShader,dt=b.fragmentShader;const Gt=a.getVertexShaderStage(b),Tt=a.getFragmentShaderStage(b);a.update(b,Gt,Tt),Rt=Gt.id,ie=Tt.id}const de=n.getRenderTarget(),Be=n.state.buffers.depth.getReversed(),tt=$.isInstancedMesh===!0,Oe=$.isBatchedMesh===!0,ut=!!b.map,Qe=!!b.matcap,at=!!j,yt=!!b.aoMap,Ut=!!b.lightMap,lt=!!b.bumpMap&&b.wireframe===!1,Ht=!!b.normalMap,cn=!!b.displacementMap,ze=!!b.emissiveMap,_t=!!b.metalnessMap,Qt=!!b.roughnessMap,q=b.anisotropy>0,_n=b.clearcoat>0,kt=b.dispersion>0,D=b.retroreflectivity>0,w=b.iridescence>0,Y=b.sheen>0,K=b.transmission>0,te=q&&!!b.anisotropyMap,be=_n&&!!b.clearcoatMap,we=_n&&!!b.clearcoatNormalMap,oe=_n&&!!b.clearcoatRoughnessMap,le=w&&!!b.iridescenceMap,Re=w&&!!b.iridescenceThicknessMap,$e=Y&&!!b.sheenColorMap,Ie=Y&&!!b.sheenRoughnessMap,Me=!!b.specularMap,qe=!!b.specularColorMap,Je=!!b.specularIntensityMap,Ke=K&&!!b.transmissionMap,X=K&&!!b.thicknessMap,Se=!!b.gradientMap,re=!!b.alphaMap,Te=b.alphaTest>0,Ne=!!b.alphaHash,me=!!b.extensions;let Ge=Oi;b.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Ge=n.toneMapping);const He={shaderID:ce,shaderType:b.type,shaderName:b.name,vertexShader:rt,fragmentShader:dt,defines:b.defines,customVertexShaderID:Rt,customFragmentShaderID:ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&$._colorsTexture!==null,instancing:tt,instancingColor:tt&&$.instanceColor!==null,instancingMorph:tt&&$.morphTexture!==null,outputColorSpace:de===null?n.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Et.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:ut,matcap:Qe,envMap:at,envMapMode:at&&j.mapping,envMapCubeUVHeight:ne,aoMap:yt,lightMap:Ut,bumpMap:lt,normalMap:Ht,displacementMap:cn,emissiveMap:ze,normalMapObjectSpace:Ht&&b.normalMapType===W0,normalMapTangentSpace:Ht&&b.normalMapType===ll,packedNormalMap:Ht&&b.normalMapType===ll&&ob(b.normalMap.format),metalnessMap:_t,roughnessMap:Qt,anisotropy:q,anisotropyMap:te,clearcoat:_n,clearcoatMap:be,clearcoatNormalMap:we,clearcoatRoughnessMap:oe,dispersion:kt,retroreflection:D,iridescence:w,iridescenceMap:le,iridescenceThicknessMap:Re,sheen:Y,sheenColorMap:$e,sheenRoughnessMap:Ie,specularMap:Me,specularColorMap:qe,specularIntensityMap:Je,transmission:K,transmissionMap:Ke,thicknessMap:X,gradientMap:Se,opaque:b.transparent===!1&&b.blending===kr&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:Te,alphaHash:Ne,combine:b.combine,mapUv:ut&&p(b.map.channel),aoMapUv:yt&&p(b.aoMap.channel),lightMapUv:Ut&&p(b.lightMap.channel),bumpMapUv:lt&&p(b.bumpMap.channel),normalMapUv:Ht&&p(b.normalMap.channel),displacementMapUv:cn&&p(b.displacementMap.channel),emissiveMapUv:ze&&p(b.emissiveMap.channel),metalnessMapUv:_t&&p(b.metalnessMap.channel),roughnessMapUv:Qt&&p(b.roughnessMap.channel),anisotropyMapUv:te&&p(b.anisotropyMap.channel),clearcoatMapUv:be&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:we&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&p(b.sheenRoughnessMap.channel),specularMapUv:Me&&p(b.specularMap.channel),specularColorMapUv:qe&&p(b.specularColorMap.channel),specularIntensityMapUv:Je&&p(b.specularIntensityMap.channel),transmissionMapUv:Ke&&p(b.transmissionMap.channel),thicknessMapUv:X&&p(b.thicknessMap.channel),alphaMapUv:re&&p(b.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ht||q),vertexNormals:!!k.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!k.attributes.uv&&(ut||re),fog:!!I,useFog:b.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||k.attributes.normal===void 0&&Ht===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Be,skinning:$.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:Fe,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:T.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&S.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:ut&&b.map.isVideoTexture===!0&&Et.getTransfer(b.map.colorSpace)===Vt,decodeVideoTextureEmissive:ze&&b.emissiveMap.isVideoTexture===!0&&Et.getTransfer(b.emissiveMap.colorSpace)===Vt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===tn,flipSided:b.side===An,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:me&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&b.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return He.vertexUv1s=l.has(1),He.vertexUv2s=l.has(2),He.vertexUv3s=l.has(3),l.clear(),He}function g(b){const C=[];if(b.shaderID?C.push(b.shaderID):(C.push(b.customVertexShaderID),C.push(b.customFragmentShaderID)),b.defines!==void 0)for(const S in b.defines)C.push(S),C.push(b.defines[S]);return b.isRawShaderMaterial===!1&&(m(C,b),M(C,b),C.push(n.outputColorSpace)),C.push(b.customProgramCacheKey),C.join()}function m(b,C){b.push(C.precision),b.push(C.outputColorSpace),b.push(C.envMapMode),b.push(C.envMapCubeUVHeight),b.push(C.mapUv),b.push(C.alphaMapUv),b.push(C.lightMapUv),b.push(C.aoMapUv),b.push(C.bumpMapUv),b.push(C.normalMapUv),b.push(C.displacementMapUv),b.push(C.emissiveMapUv),b.push(C.metalnessMapUv),b.push(C.roughnessMapUv),b.push(C.anisotropyMapUv),b.push(C.clearcoatMapUv),b.push(C.clearcoatNormalMapUv),b.push(C.clearcoatRoughnessMapUv),b.push(C.iridescenceMapUv),b.push(C.iridescenceThicknessMapUv),b.push(C.sheenColorMapUv),b.push(C.sheenRoughnessMapUv),b.push(C.specularMapUv),b.push(C.specularColorMapUv),b.push(C.specularIntensityMapUv),b.push(C.transmissionMapUv),b.push(C.thicknessMapUv),b.push(C.combine),b.push(C.fogExp2),b.push(C.sizeAttenuation),b.push(C.morphTargetsCount),b.push(C.morphAttributeCount),b.push(C.numSunLights),b.push(C.numDirLights),b.push(C.numPointLights),b.push(C.numSpotLights),b.push(C.numSpotLightMaps),b.push(C.numHemiLights),b.push(C.numRectAreaLights),b.push(C.numSunLightShadows),b.push(C.numDirLightShadows),b.push(C.numPointLightShadows),b.push(C.numSpotLightShadows),b.push(C.numSpotLightShadowsWithMaps),b.push(C.numLightProbes),b.push(C.shadowMapType),b.push(C.toneMapping),b.push(C.numClippingPlanes),b.push(C.numClipIntersection),b.push(C.depthPacking)}function M(b,C){r.disableAll(),C.instancing&&r.enable(0),C.instancingColor&&r.enable(1),C.instancingMorph&&r.enable(2),C.matcap&&r.enable(3),C.envMap&&r.enable(4),C.normalMapObjectSpace&&r.enable(5),C.normalMapTangentSpace&&r.enable(6),C.clearcoat&&r.enable(7),C.iridescence&&r.enable(8),C.alphaTest&&r.enable(9),C.vertexColors&&r.enable(10),C.vertexAlphas&&r.enable(11),C.vertexUv1s&&r.enable(12),C.vertexUv2s&&r.enable(13),C.vertexUv3s&&r.enable(14),C.vertexTangents&&r.enable(15),C.anisotropy&&r.enable(16),C.alphaHash&&r.enable(17),C.batching&&r.enable(18),C.dispersion&&r.enable(19),C.retroreflection&&r.enable(24),C.batchingColor&&r.enable(20),C.gradientMap&&r.enable(21),C.packedNormalMap&&r.enable(22),C.vertexNormals&&r.enable(23),b.push(r.mask),r.disableAll(),C.fog&&r.enable(0),C.useFog&&r.enable(1),C.flatShading&&r.enable(2),C.logarithmicDepthBuffer&&r.enable(3),C.reversedDepthBuffer&&r.enable(4),C.skinning&&r.enable(5),C.morphTargets&&r.enable(6),C.morphNormals&&r.enable(7),C.morphColors&&r.enable(8),C.premultipliedAlpha&&r.enable(9),C.shadowMapEnabled&&r.enable(10),C.doubleSided&&r.enable(11),C.flipSided&&r.enable(12),C.useDepthPacking&&r.enable(13),C.dithering&&r.enable(14),C.transmission&&r.enable(15),C.sheen&&r.enable(16),C.opaque&&r.enable(17),C.pointsUvs&&r.enable(18),C.decodeVideoTexture&&r.enable(19),C.decodeVideoTextureEmissive&&r.enable(20),C.alphaToCoverage&&r.enable(21),C.numLightProbeGrids>0&&r.enable(22),C.hasPositionAttribute&&r.enable(23),b.push(r.mask)}function E(b){const C=h[b.type];let S;if(C){const V=ki[C];S=Mg.clone(V.uniforms)}else S=b.uniforms;return S}function _(b,C){let S=d.get(C);return S!==void 0?++S.usedTimes:(S=new eb(n,C,b,o),c.push(S),d.set(C,S)),S}function R(b){if(--b.usedTimes===0){const C=c.indexOf(b);c[C]=c[c.length-1],c.pop(),d.delete(b.cacheKey),b.destroy()}}function A(b){a.remove(b)}function N(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:E,acquireProgram:_,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:N}}function rb(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function o(r,a,l){n.get(r)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:o,dispose:s}}function ab(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Hu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gu(){const n=[];let e=0;const t=[],i=[],o=[];function s(){e=0,t.length=0,i.length=0,o.length=0}function r(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,p,y,g,m){let M=n[e];return M===void 0?(M={id:f.id,object:f,geometry:h,material:p,materialVariant:r(f),groupOrder:y,renderOrder:f.renderOrder,z:g,group:m},n[e]=M):(M.id=f.id,M.object=f,M.geometry=h,M.material=p,M.materialVariant=r(f),M.groupOrder=y,M.renderOrder=f.renderOrder,M.z=g,M.group=m),e++,M}function l(f,h,p,y,g,m,M){M.reversedDepth===!0&&(g=-g);const E=a(f,h,p,y,g,m);p.transmission>0?i.push(E):p.transparent===!0?o.push(E):t.push(E)}function c(f,h,p,y,g,m){const M=a(f,h,p,y,g,m);p.transmission>0?i.unshift(M):p.transparent===!0?o.unshift(M):t.unshift(M)}function d(f,h){t.length>1&&t.sort(f||ab),i.length>1&&i.sort(h||Hu),o.length>1&&o.sort(h||Hu)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:o,init:s,push:l,unshift:c,finish:u,sort:d}}function lb(){let n=new WeakMap;function e(i,o){const s=n.get(i);let r;return s===void 0?(r=new Gu,n.set(i,[r])):o>=s.length?(r=new Gu,s.push(r)):r=s[o],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function cb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new ot};break;case"SpotLight":t={position:new F,direction:new F,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function hb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let db=0;function ub(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function fb(n){const e=new cb,t=hb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const o=new F,s=new Ct,r=new Ct;function a(c){let d=0,u=0,f=0;for(let $=0;$<9;$++)i.probe[$].set(0,0,0);let h=0,p=0,y=0,g=0,m=0,M=0,E=0,_=0,R=0,A=0,N=0,b=0,C=0,S=0;c.sort(ub);for(let $=0,T=c.length;$<T;$++){const I=c[$],k=I.color,L=I.intensity,Z=I.distance;let j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===rs?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*L,u+=k.g*L,f+=k.b*L;else if(I.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(I.sh.coefficients[ne],L);S++}else if(I.isSunLight){const ne=e.get(I);if(ne.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ce=I.shadow,pe=t.get(I);pe.shadowIntensity=ce.intensity,pe.shadowBias=ce.bias,pe.shadowNormalBias=ce.normalBias,pe.shadowRadius=ce.radius,pe.shadowMapSize.copy(ce.mapSize).multiply(ce.getFrameExtents()),i.sunShadow[p]=pe,i.sunShadowMap[p]=j;const De=ce.getViewportCount();for(let Fe=0;Fe<De;Fe++)i.sunShadowMatrix[y+Fe]=ce.getMatrix(Fe),i.sunShadowCascade[y+Fe]=ce._cascadeData[Fe];y+=De,p++}i.sun[h]=ne,h++}else if(I.isDirectionalLight){const ne=e.get(I);if(ne.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ce=I.shadow,pe=t.get(I);pe.shadowIntensity=ce.intensity,pe.shadowBias=ce.bias,pe.shadowNormalBias=ce.normalBias,pe.shadowRadius=ce.radius,pe.shadowMapSize=ce.mapSize,i.directionalShadow[g]=pe,i.directionalShadowMap[g]=j,i.directionalShadowMatrix[g]=I.shadow.matrix,R++}i.directional[g]=ne,g++}else if(I.isSpotLight){const ne=e.get(I);ne.position.setFromMatrixPosition(I.matrixWorld),ne.color.copy(k).multiplyScalar(L),ne.distance=Z,ne.coneCos=Math.cos(I.angle),ne.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),ne.decay=I.decay,i.spot[M]=ne;const ce=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,ce.updateMatrices(I),I.castShadow&&C++),i.spotLightMatrix[M]=ce.matrix,I.castShadow){const pe=t.get(I);pe.shadowIntensity=ce.intensity,pe.shadowBias=ce.bias,pe.shadowNormalBias=ce.normalBias,pe.shadowRadius=ce.radius,pe.shadowMapSize=ce.mapSize,i.spotShadow[M]=pe,i.spotShadowMap[M]=j,N++}M++}else if(I.isRectAreaLight){const ne=e.get(I);ne.color.copy(k).multiplyScalar(L),ne.halfWidth.set(I.width*.5,0,0),ne.halfHeight.set(0,I.height*.5,0),i.rectArea[E]=ne,E++}else if(I.isPointLight){const ne=e.get(I);if(ne.color.copy(I.color).multiplyScalar(I.intensity),ne.distance=I.distance,ne.decay=I.decay,I.castShadow){const ce=I.shadow,pe=t.get(I);pe.shadowIntensity=ce.intensity,pe.shadowBias=ce.bias,pe.shadowNormalBias=ce.normalBias,pe.shadowRadius=ce.radius,pe.shadowMapSize=ce.mapSize,pe.shadowCameraNear=ce.camera.near,pe.shadowCameraFar=ce.camera.far,i.pointShadow[m]=pe,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=I.shadow.matrix,A++}i.point[m]=ne,m++}else if(I.isHemisphereLight){const ne=e.get(I);ne.skyColor.copy(I.color).multiplyScalar(L),ne.groundColor.copy(I.groundColor).multiplyScalar(L),i.hemi[_]=ne,_++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_FLOAT_1,i.rectAreaLTC2=ke.LTC_FLOAT_2):(i.rectAreaLTC1=ke.LTC_HALF_1,i.rectAreaLTC2=ke.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;const V=i.hash;(V.sunLength!==h||V.directionalLength!==g||V.pointLength!==m||V.spotLength!==M||V.rectAreaLength!==E||V.hemiLength!==_||V.numSunShadows!==p||V.numDirectionalShadows!==R||V.numPointShadows!==A||V.numSpotShadows!==N||V.numSpotMaps!==b||V.numLightProbes!==S)&&(i.sun.length=h,i.directional.length=g,i.spot.length=M,i.rectArea.length=E,i.point.length=m,i.hemi.length=_,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=N,i.spotShadowMap.length=N,i.spotLightMatrix.length=N+b-C,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=S,V.sunLength=h,V.directionalLength=g,V.pointLength=m,V.spotLength=M,V.rectAreaLength=E,V.hemiLength=_,V.numSunShadows=p,V.numDirectionalShadows=R,V.numPointShadows=A,V.numSpotShadows=N,V.numSpotMaps=b,V.numLightProbes=S,i.version=db++)}function l(c,d){let u=0,f=0,h=0,p=0,y=0,g=0;const m=d.matrixWorldInverse;for(let M=0,E=c.length;M<E;M++){const _=c[M];if(_.isSunLight){const R=i.sun[u];R.direction.setFromMatrixPosition(_.matrixWorld),R.direction.transformDirection(m),u++}else if(_.isDirectionalLight){const R=i.directional[f];R.direction.setFromMatrixPosition(_.matrixWorld),o.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(m),f++}else if(_.isSpotLight){const R=i.spot[p];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(_.matrixWorld),o.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const R=i.rectArea[y];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(m),r.identity(),s.copy(_.matrixWorld),s.premultiply(m),r.extractRotation(s),R.halfWidth.set(_.width*.5,0,0),R.halfHeight.set(0,_.height*.5,0),R.halfWidth.applyMatrix4(r),R.halfHeight.applyMatrix4(r),y++}else if(_.isPointLight){const R=i.point[h];R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){const R=i.hemi[g];R.direction.setFromMatrixPosition(_.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:i}}function Vu(n){const e=new fb(n),t=[],i=[],o=[];function s(f){u.camera=f,t.length=0,i.length=0,o.length=0}function r(f){t.push(f)}function a(f){i.push(f)}function l(f){o.push(f)}function c(){e.setup(t)}function d(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:a,pushLightProbeGrid:l}}function pb(n){let e=new WeakMap;function t(o,s=0){const r=e.get(o);let a;return r===void 0?(a=new Vu(n),e.set(o,[a])):s>=r.length?(a=new Vu(n),r.push(a)):a=r[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const mb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,yb=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],xb=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Wu=new Ct,br=new F,yc=new F;function vb(n,e,t){let i=new td;const o=new Ce,s=new Ce,r=new rn,a=new Ag,l=new Cg,c={},d=t.maxTextureSize,u={[os]:An,[An]:os,[tn]:tn},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:mb,fragmentShader:gb}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const p=new nn;p.setAttribute("position",new ii(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ae(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ya;let m=this.type;this.render=function(A,N,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===_0&&(et("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ya);const C=n.getRenderTarget(),S=n.getActiveCubeFace(),V=n.getActiveMipmapLevel(),$=n.state;$.setBlending(ao),$.buffers.depth.getReversed()===!0?$.buffers.color.setClear(0,0,0,0):$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const T=m!==this.type;T&&N.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=A.length;I<k;I++){const L=A[I],Z=L.shadow;if(Z===void 0){et("WebGLShadowMap:",L,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;o.copy(Z.mapSize);const j=Z.getFrameExtents();o.multiply(j),s.copy(Z.mapSize),(o.x>d||o.y>d)&&(o.x>d&&(s.x=Math.floor(d/j.x),o.x=s.x*j.x,Z.mapSize.x=s.x),o.y>d&&(s.y=Math.floor(d/j.y),o.y=s.y*j.y,Z.mapSize.y=s.y));const ne=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=ne,Z.map===null||T===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Er){if(L.isPointLight){et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Si(o.x,o.y,{format:rs,type:Hi,minFilter:Ln,magFilter:Ln,generateMipmaps:!1}),Z.map.texture.name=L.name+".shadowMap",Z.map.depthTexture=new Zr(o.x,o.y,bi),Z.map.depthTexture.name=L.name+".shadowMapDepth",Z.map.depthTexture.format=ho,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=En,Z.map.depthTexture.magFilter=En}else L.isPointLight?(Z.map=new mp(o.x),Z.map.depthTexture=new Vm(o.x,Bi)):(Z.map=new Si(o.x,o.y),Z.map.depthTexture=new Zr(o.x,o.y,Bi)),Z.map.depthTexture.name=L.name+".shadowMap",Z.map.depthTexture.format=ho,this.type===Ya?(Z.map.depthTexture.compareFunction=ne?Kh:Jh,Z.map.depthTexture.minFilter=Ln,Z.map.depthTexture.magFilter=Ln):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=En,Z.map.depthTexture.magFilter=En);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==o.x||Z.map.height!==o.y)&&Z.map.setSize(o.x,o.y);const ce=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();L.isPointLight!==!0&&Z.updateMatrices(L,b);for(let pe=0;pe<ce;pe++){const De=Z.getCamera(pe);if(L.isPointLight){const Fe=Z.camera,rt=Z.matrix,dt=L.distance||Fe.far;dt!==Fe.far&&(Fe.far=dt,Fe.updateProjectionMatrix()),br.setFromMatrixPosition(L.matrixWorld),Fe.position.copy(br),yc.copy(Fe.position),yc.add(yb[pe]),Fe.up.copy(xb[pe]),Fe.lookAt(yc),Fe.updateMatrixWorld(),rt.makeTranslation(-br.x,-br.y,-br.z),Wu.multiplyMatrices(Fe.projectionMatrix,Fe.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Wu,Fe.coordinateSystem,Fe.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(Z.map),n.clear());const Fe=Z.getViewport(pe);r.set(s.x*Fe.x,s.y*Fe.y,s.x*Fe.z,s.y*Fe.w),$.viewport(r)}i=Z.getFrustum(pe),_(N,b,De,L,this.type)}Z.isPointLightShadow!==!0&&this.type===Er&&M(Z,b),Z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(C,S,V)};function M(A,N){const b=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null?A.mapPass=new Si(o.x,o.y,{format:rs,type:Hi}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(N,null,b,f,y,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(N,null,b,h,y,null)}function E(A,N,b,C){let S=null;const V=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)S=V;else if(S=b.isPointLight===!0?l:a,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const $=S.uuid,T=N.uuid;let I=c[$];I===void 0&&(I={},c[$]=I);let k=I[T];k===void 0&&(k=S.clone(),I[T]=k,N.addEventListener("dispose",R)),S=k}if(S.visible=N.visible,S.wireframe=N.wireframe,C===Er?S.side=N.shadowSide!==null?N.shadowSide:N.side:S.side=N.shadowSide!==null?N.shadowSide:u[N.side],S.alphaMap=N.alphaMap,S.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,S.map=N.map,S.clipShadows=N.clipShadows,S.clippingPlanes=N.clippingPlanes,S.clipIntersection=N.clipIntersection,S.displacementMap=N.displacementMap,S.displacementScale=N.displacementScale,S.displacementBias=N.displacementBias,S.wireframeLinewidth=N.wireframeLinewidth,S.linewidth=N.linewidth,b.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const $=n.properties.get(S);$.light=b}return S}function _(A,N,b,C,S){if(A.visible===!1)return;if(A.layers.test(N.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===Er)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const T=e.update(A),I=A.material;if(Array.isArray(I)){const k=T.groups;for(let L=0,Z=k.length;L<Z;L++){const j=k[L],ne=I[j.materialIndex];if(ne&&ne.visible){const ce=E(A,ne,C,S);A.onBeforeShadow(n,A,N,b,T,ce,j),n.renderBufferDirect(b,null,T,ce,A,j),A.onAfterShadow(n,A,N,b,T,ce,j)}}}else if(I.visible){const k=E(A,I,C,S);A.onBeforeShadow(n,A,N,b,T,k,null),n.renderBufferDirect(b,null,T,k,A,null),A.onAfterShadow(n,A,N,b,T,k,null)}}const $=A.children;for(let T=0,I=$.length;T<I;T++)_($[T],N,b,C,S)}function R(A){A.target.removeEventListener("dispose",R);for(const b in c){const C=c[b],S=A.target.uuid;S in C&&(C[S].dispose(),delete C[S])}}}function bb(n,e){function t(){let X=!1;const Se=new rn;let re=null;const Te=new rn(0,0,0,0);return{setMask:function(Ne){re!==Ne&&!X&&(n.colorMask(Ne,Ne,Ne,Ne),re=Ne)},setLocked:function(Ne){X=Ne},setClear:function(Ne,me,Ge,He,Gt){Gt===!0&&(Ne*=He,me*=He,Ge*=He),Se.set(Ne,me,Ge,He),Te.equals(Se)===!1&&(n.clearColor(Ne,me,Ge,He),Te.copy(Se))},reset:function(){X=!1,re=null,Te.set(-1,0,0,0)}}}function i(){let X=!1,Se=!1,re=null,Te=null,Ne=null;return{setReversed:function(me){if(Se!==me){const Ge=e.get("EXT_clip_control");me?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Se=me;const He=Ne;Ne=null,this.setClear(He)}},getReversed:function(){return Se},setTest:function(me){me?de(n.DEPTH_TEST):Be(n.DEPTH_TEST)},setMask:function(me){re!==me&&!X&&(n.depthMask(me),re=me)},setFunc:function(me){if(Se&&(me=tm[me]),Te!==me){switch(me){case Cc:n.depthFunc(n.NEVER);break;case Rc:n.depthFunc(n.ALWAYS);break;case Ic:n.depthFunc(n.LESS);break;case qr:n.depthFunc(n.LEQUAL);break;case Pc:n.depthFunc(n.EQUAL);break;case Lc:n.depthFunc(n.GEQUAL);break;case kc:n.depthFunc(n.GREATER);break;case Nc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Te=me}},setLocked:function(me){X=me},setClear:function(me){Ne!==me&&(Ne=me,Se&&(me=1-me),n.clearDepth(me))},reset:function(){X=!1,re=null,Te=null,Ne=null,Se=!1}}}function o(){let X=!1,Se=null,re=null,Te=null,Ne=null,me=null,Ge=null,He=null,Gt=null;return{setTest:function(Tt){X||(Tt?de(n.STENCIL_TEST):Be(n.STENCIL_TEST))},setMask:function(Tt){Se!==Tt&&!X&&(n.stencilMask(Tt),Se=Tt)},setFunc:function(Tt,zn,fi){(re!==Tt||Te!==zn||Ne!==fi)&&(n.stencilFunc(Tt,zn,fi),re=Tt,Te=zn,Ne=fi)},setOp:function(Tt,zn,fi){(me!==Tt||Ge!==zn||He!==fi)&&(n.stencilOp(Tt,zn,fi),me=Tt,Ge=zn,He=fi)},setLocked:function(Tt){X=Tt},setClear:function(Tt){Gt!==Tt&&(n.clearStencil(Tt),Gt=Tt)},reset:function(){X=!1,Se=null,re=null,Te=null,Ne=null,me=null,Ge=null,He=null,Gt=null}}}const s=new t,r=new i,a=new o,l=new WeakMap,c=new WeakMap;let d={},u={},f={},h=new WeakMap,p=[],y=null,g=!1,m=null,M=null,E=null,_=null,R=null,A=null,N=null,b=new ot(0,0,0),C=0,S=!1,V=null,$=null,T=null,I=null,k=null;const L=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,j=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ne)[1]),Z=j>=1):ne.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),Z=j>=2);let ce=null,pe={};const De=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),rt=new rn().fromArray(De),dt=new rn().fromArray(Fe);function Rt(X,Se,re,Te){const Ne=new Uint8Array(4),me=n.createTexture();n.bindTexture(X,me),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<re;Ge++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Te,0,n.RGBA,n.UNSIGNED_BYTE,Ne):n.texImage2D(Se+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ne);return me}const ie={};ie[n.TEXTURE_2D]=Rt(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=Rt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=Rt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=Rt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),de(n.DEPTH_TEST),r.setFunc(qr),lt(!1),Ht(Rd),de(n.CULL_FACE),yt(ao);function de(X){d[X]!==!0&&(n.enable(X),d[X]=!0)}function Be(X){d[X]!==!1&&(n.disable(X),d[X]=!1)}function tt(X,Se){return f[X]!==Se?(n.bindFramebuffer(X,Se),f[X]=Se,X===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Se),X===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function Oe(X,Se){let re=p,Te=!1;if(X){re=h.get(Se),re===void 0&&(re=[],h.set(Se,re));const Ne=X.textures;if(re.length!==Ne.length||re[0]!==n.COLOR_ATTACHMENT0){for(let me=0,Ge=Ne.length;me<Ge;me++)re[me]=n.COLOR_ATTACHMENT0+me;re.length=Ne.length,Te=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,Te=!0);Te&&n.drawBuffers(re)}function ut(X){return y!==X?(n.useProgram(X),y=X,!0):!1}const Qe={[zs]:n.FUNC_ADD,[M0]:n.FUNC_SUBTRACT,[S0]:n.FUNC_REVERSE_SUBTRACT};Qe[T0]=n.MIN,Qe[E0]=n.MAX;const at={[A0]:n.ZERO,[C0]:n.ONE,[R0]:n.SRC_COLOR,[Ef]:n.SRC_ALPHA,[D0]:n.SRC_ALPHA_SATURATE,[k0]:n.DST_COLOR,[P0]:n.DST_ALPHA,[I0]:n.ONE_MINUS_SRC_COLOR,[Af]:n.ONE_MINUS_SRC_ALPHA,[N0]:n.ONE_MINUS_DST_COLOR,[L0]:n.ONE_MINUS_DST_ALPHA,[U0]:n.CONSTANT_COLOR,[z0]:n.ONE_MINUS_CONSTANT_COLOR,[O0]:n.CONSTANT_ALPHA,[F0]:n.ONE_MINUS_CONSTANT_ALPHA};function yt(X,Se,re,Te,Ne,me,Ge,He,Gt,Tt){if(X===ao){g===!0&&(Be(n.BLEND),g=!1);return}if(g===!1&&(de(n.BLEND),g=!0),X!==w0){if(X!==m||Tt!==S){if((M!==zs||R!==zs)&&(n.blendEquation(n.FUNC_ADD),M=zs,R=zs),Tt)switch(X){case kr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hs:n.blendFunc(n.ONE,n.ONE);break;case Id:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Lt("WebGLState: Invalid blending: ",X);break}else switch(X){case kr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Id:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pd:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",X);break}E=null,_=null,A=null,N=null,b.set(0,0,0),C=0,m=X,S=Tt}return}Ne=Ne||Se,me=me||re,Ge=Ge||Te,(Se!==M||Ne!==R)&&(n.blendEquationSeparate(Qe[Se],Qe[Ne]),M=Se,R=Ne),(re!==E||Te!==_||me!==A||Ge!==N)&&(n.blendFuncSeparate(at[re],at[Te],at[me],at[Ge]),E=re,_=Te,A=me,N=Ge),(He.equals(b)===!1||Gt!==C)&&(n.blendColor(He.r,He.g,He.b,Gt),b.copy(He),C=Gt),m=X,S=!1}function Ut(X,Se){X.side===tn?Be(n.CULL_FACE):de(n.CULL_FACE);let re=X.side===An;Se&&(re=!re),lt(re),X.blending===kr&&X.transparent===!1?yt(ao):yt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),r.setFunc(X.depthFunc),r.setTest(X.depthTest),r.setMask(X.depthWrite),s.setMask(X.colorWrite);const Te=X.stencilWrite;a.setTest(Te),Te&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),ze(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?de(n.SAMPLE_ALPHA_TO_COVERAGE):Be(n.SAMPLE_ALPHA_TO_COVERAGE)}function lt(X){V!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),V=X)}function Ht(X){X!==v0?(de(n.CULL_FACE),X!==$&&(X===Rd?n.cullFace(n.BACK):X===b0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Be(n.CULL_FACE),$=X}function cn(X){X!==T&&(Z&&n.lineWidth(X),T=X)}function ze(X,Se,re){X?(de(n.POLYGON_OFFSET_FILL),(I!==Se||k!==re)&&(I=Se,k=re,r.getReversed()&&(Se=-Se),n.polygonOffset(Se,re))):Be(n.POLYGON_OFFSET_FILL)}function _t(X){X?de(n.SCISSOR_TEST):Be(n.SCISSOR_TEST)}function Qt(X){X===void 0&&(X=n.TEXTURE0+L-1),ce!==X&&(n.activeTexture(X),ce=X)}function q(X,Se,re){re===void 0&&(ce===null?re=n.TEXTURE0+L-1:re=ce);let Te=pe[re];Te===void 0&&(Te={type:void 0,texture:void 0},pe[re]=Te),(Te.type!==X||Te.texture!==Se)&&(ce!==re&&(n.activeTexture(re),ce=re),n.bindTexture(X,Se||ie[X]),Te.type=X,Te.texture=Se)}function _n(){const X=pe[ce];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function kt(){try{n.compressedTexImage2D(...arguments)}catch(X){Lt("WebGLState:",X)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(X){Lt("WebGLState:",X)}}function w(){try{n.texSubImage2D(...arguments)}catch(X){Lt("WebGLState:",X)}}function Y(){try{n.texSubImage3D(...arguments)}catch(X){Lt("WebGLState:",X)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(X){Lt("WebGLState:",X)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(X){Lt("WebGLState:",X)}}function be(){try{n.texStorage2D(...arguments)}catch(X){Lt("WebGLState:",X)}}function we(){try{n.texStorage3D(...arguments)}catch(X){Lt("WebGLState:",X)}}function oe(){try{n.texImage2D(...arguments)}catch(X){Lt("WebGLState:",X)}}function le(){try{n.texImage3D(...arguments)}catch(X){Lt("WebGLState:",X)}}function Re(X){return u[X]!==void 0?u[X]:n.getParameter(X)}function $e(X,Se){u[X]!==Se&&(n.pixelStorei(X,Se),u[X]=Se)}function Ie(X){rt.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),rt.copy(X))}function Me(X){dt.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),dt.copy(X))}function qe(X,Se){let re=c.get(Se);re===void 0&&(re=new WeakMap,c.set(Se,re));let Te=re.get(X);Te===void 0&&(Te=n.getUniformBlockIndex(Se,X.name),re.set(X,Te))}function Je(X,Se){const Te=c.get(Se).get(X);l.get(Se)!==Te&&(n.uniformBlockBinding(Se,Te,X.__bindingPointIndex),l.set(Se,Te))}function Ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},u={},ce=null,pe={},f={},h=new WeakMap,p=[],y=null,g=!1,m=null,M=null,E=null,_=null,R=null,A=null,N=null,b=new ot(0,0,0),C=0,S=!1,V=null,$=null,T=null,I=null,k=null,rt.set(0,0,n.canvas.width,n.canvas.height),dt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:de,disable:Be,bindFramebuffer:tt,drawBuffers:Oe,useProgram:ut,setBlending:yt,setMaterial:Ut,setFlipSided:lt,setCullFace:Ht,setLineWidth:cn,setPolygonOffset:ze,setScissorTest:_t,activeTexture:Qt,bindTexture:q,unbindTexture:_n,compressedTexImage2D:kt,compressedTexImage3D:D,texImage2D:oe,texImage3D:le,pixelStorei:$e,getParameter:Re,updateUBOMapping:qe,uniformBlockBinding:Je,texStorage2D:be,texStorage3D:we,texSubImage2D:w,texSubImage3D:Y,compressedTexSubImage2D:K,compressedTexSubImage3D:te,scissor:Ie,viewport:Me,reset:Ke}}function _b(n,e,t,i,o,s,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,d=new WeakMap,u=new Set;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(D,w){return p?new OffscreenCanvas(D,w):dl("canvas")}function g(D,w,Y){let K=1;const te=kt(D);if((te.width>Y||te.height>Y)&&(K=Y/Math.max(te.width,te.height)),K<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const be=Math.floor(K*te.width),we=Math.floor(K*te.height);f===void 0&&(f=y(be,we));const oe=w?y(be,we):f;return oe.width=be,oe.height=we,oe.getContext("2d").drawImage(D,0,0,be,we),et("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+be+"x"+we+")."),oe}else return"data"in D&&et("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),D;return D}function m(D){return D.generateMipmaps}function M(D){n.generateMipmap(D)}function E(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(D,w,Y,K,te,be=!1){if(D!==null){if(n[D]!==void 0)return n[D];et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let we;K&&(we=e.get("EXT_texture_norm16"),we||et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=w;if(w===n.RED&&(Y===n.FLOAT&&(oe=n.R32F),Y===n.HALF_FLOAT&&(oe=n.R16F),Y===n.UNSIGNED_BYTE&&(oe=n.R8),Y===n.UNSIGNED_SHORT&&we&&(oe=we.R16_EXT),Y===n.SHORT&&we&&(oe=we.R16_SNORM_EXT)),w===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(oe=n.R8UI),Y===n.UNSIGNED_SHORT&&(oe=n.R16UI),Y===n.UNSIGNED_INT&&(oe=n.R32UI),Y===n.BYTE&&(oe=n.R8I),Y===n.SHORT&&(oe=n.R16I),Y===n.INT&&(oe=n.R32I)),w===n.RG&&(Y===n.FLOAT&&(oe=n.RG32F),Y===n.HALF_FLOAT&&(oe=n.RG16F),Y===n.UNSIGNED_BYTE&&(oe=n.RG8),Y===n.UNSIGNED_SHORT&&we&&(oe=we.RG16_EXT),Y===n.SHORT&&we&&(oe=we.RG16_SNORM_EXT)),w===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(oe=n.RG8UI),Y===n.UNSIGNED_SHORT&&(oe=n.RG16UI),Y===n.UNSIGNED_INT&&(oe=n.RG32UI),Y===n.BYTE&&(oe=n.RG8I),Y===n.SHORT&&(oe=n.RG16I),Y===n.INT&&(oe=n.RG32I)),w===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(oe=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(oe=n.RGB16UI),Y===n.UNSIGNED_INT&&(oe=n.RGB32UI),Y===n.BYTE&&(oe=n.RGB8I),Y===n.SHORT&&(oe=n.RGB16I),Y===n.INT&&(oe=n.RGB32I)),w===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(oe=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(oe=n.RGBA16UI),Y===n.UNSIGNED_INT&&(oe=n.RGBA32UI),Y===n.BYTE&&(oe=n.RGBA8I),Y===n.SHORT&&(oe=n.RGBA16I),Y===n.INT&&(oe=n.RGBA32I)),w===n.RGB&&(Y===n.UNSIGNED_SHORT&&we&&(oe=we.RGB16_EXT),Y===n.SHORT&&we&&(oe=we.RGB16_SNORM_EXT),Y===n.UNSIGNED_INT_5_9_9_9_REV&&(oe=n.RGB9_E5),Y===n.UNSIGNED_INT_10F_11F_11F_REV&&(oe=n.R11F_G11F_B10F)),w===n.RGBA){const le=be?hl:Et.getTransfer(te);Y===n.FLOAT&&(oe=n.RGBA32F),Y===n.HALF_FLOAT&&(oe=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(oe=le===Vt?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT&&we&&(oe=we.RGBA16_EXT),Y===n.SHORT&&we&&(oe=we.RGBA16_SNORM_EXT),Y===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function R(D,w){let Y;return D?w===null||w===Bi||w===Yr?Y=n.DEPTH24_STENCIL8:w===bi?Y=n.DEPTH32F_STENCIL8:w===$r&&(Y=n.DEPTH24_STENCIL8,et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Bi||w===Yr?Y=n.DEPTH_COMPONENT24:w===bi?Y=n.DEPTH_COMPONENT32F:w===$r&&(Y=n.DEPTH_COMPONENT16),Y}function A(D,w){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==En&&D.minFilter!==Ln?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function N(D){const w=D.target;w.removeEventListener("dispose",N),C(w),w.isVideoTexture&&d.delete(w),w.isHTMLTexture&&u.delete(w)}function b(D){const w=D.target;w.removeEventListener("dispose",b),V(w)}function C(D){const w=i.get(D);if(w.__webglInit===void 0)return;const Y=D.source,K=h.get(Y);if(K){const te=K[w.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(D),Object.keys(K).length===0&&h.delete(Y)}i.remove(D)}function S(D){const w=i.get(D);n.deleteTexture(w.__webglTexture);const Y=D.source,K=h.get(Y);delete K[w.__cacheKey],r.memory.textures--}function V(D){const w=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let te=0;te<w.__webglFramebuffer[K].length;te++)n.deleteFramebuffer(w.__webglFramebuffer[K][te]);else n.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)n.deleteFramebuffer(w.__webglFramebuffer[K]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const Y=D.textures;for(let K=0,te=Y.length;K<te;K++){const be=i.get(Y[K]);be.__webglTexture&&(n.deleteTexture(be.__webglTexture),r.memory.textures--),i.remove(Y[K])}i.remove(D)}let $=0;function T(){$=0}function I(){return $}function k(D){$=D}function L(){const D=$;return D>=o.maxTextures&&et("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+o.maxTextures),$+=1,D}function Z(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function j(D,w){const Y=i.get(D);if(D.isVideoTexture&&q(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&Y.__version!==D.version){const K=D.image;if(K===null)et("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)et("WebGLRenderer: Texture marked for update but image is incomplete");else{Be(Y,D,w);return}}else D.isExternalTexture&&(Y.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+w)}function ne(D,w){const Y=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){Be(Y,D,w);return}else D.isExternalTexture&&(Y.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+w)}function ce(D,w){const Y=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){Be(Y,D,w);return}t.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+w)}function pe(D,w){const Y=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&Y.__version!==D.version){tt(Y,D,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+w)}const De={[sl]:n.REPEAT,[ro]:n.CLAMP_TO_EDGE,[Dc]:n.MIRRORED_REPEAT},Fe={[En]:n.NEAREST,[G0]:n.NEAREST_MIPMAP_NEAREST,[aa]:n.NEAREST_MIPMAP_LINEAR,[Ln]:n.LINEAR,[Ol]:n.LINEAR_MIPMAP_NEAREST,[Zo]:n.LINEAR_MIPMAP_LINEAR},rt={[q0]:n.NEVER,[Z0]:n.ALWAYS,[$0]:n.LESS,[Jh]:n.LEQUAL,[Y0]:n.EQUAL,[Kh]:n.GEQUAL,[J0]:n.GREATER,[K0]:n.NOTEQUAL};function dt(D,w){if(w.type===bi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ln||w.magFilter===Ol||w.magFilter===aa||w.magFilter===Zo||w.minFilter===Ln||w.minFilter===Ol||w.minFilter===aa||w.minFilter===Zo)&&et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,De[w.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,De[w.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,De[w.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,Fe[w.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,Fe[w.minFilter]),w.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,rt[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===En||w.minFilter!==aa&&w.minFilter!==Zo||w.type===bi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,o.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Rt(D,w){let Y=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",N));const K=w.source;let te=h.get(K);te===void 0&&(te={},h.set(K,te));const be=Z(w);if(be!==D.__cacheKey){te[be]===void 0&&(te[be]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),te[be].usedTimes++;const we=te[D.__cacheKey];we!==void 0&&(te[D.__cacheKey].usedTimes--,we.usedTimes===0&&S(w)),D.__cacheKey=be,D.__webglTexture=te[be].texture}return Y}function ie(D,w,Y){return Math.floor(Math.floor(D/Y)/w)}function de(D,w,Y,K){const be=D.updateRanges;if(be.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,Y,K,w.data);else{be.sort(($e,Ie)=>$e.start-Ie.start);let we=0;for(let $e=1;$e<be.length;$e++){const Ie=be[we],Me=be[$e],qe=Ie.start+Ie.count,Je=ie(Me.start,w.width,4),Ke=ie(Ie.start,w.width,4);Me.start<=qe+1&&Je===Ke&&ie(Me.start+Me.count-1,w.width,4)===Je?Ie.count=Math.max(Ie.count,Me.start+Me.count-Ie.start):(++we,be[we]=Me)}be.length=we+1;const oe=t.getParameter(n.UNPACK_ROW_LENGTH),le=t.getParameter(n.UNPACK_SKIP_PIXELS),Re=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let $e=0,Ie=be.length;$e<Ie;$e++){const Me=be[$e],qe=Math.floor(Me.start/4),Je=Math.ceil(Me.count/4),Ke=qe%w.width,X=Math.floor(qe/w.width),Se=Je,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,Ke,X,Se,re,Y,K,w.data)}D.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,oe),t.pixelStorei(n.UNPACK_SKIP_PIXELS,le),t.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function Be(D,w,Y){let K=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=n.TEXTURE_3D);const te=Rt(D,w),be=w.source;t.bindTexture(K,D.__webglTexture,n.TEXTURE0+Y);const we=i.get(be);if(be.version!==we.__version||te===!0){if(t.activeTexture(n.TEXTURE0+Y),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const re=Et.getPrimaries(Et.workingColorSpace),Te=w.colorSpace===oo?null:Et.getPrimaries(w.colorSpace),Ne=w.colorSpace===oo||re===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne)}t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment);let le=g(w.image,!1,o.maxTextureSize);le=_n(w,le);const Re=s.convert(w.format,w.colorSpace),$e=s.convert(w.type);let Ie=_(w.internalFormat,Re,$e,w.normalized,w.colorSpace,w.isVideoTexture);dt(K,w);let Me;const qe=w.mipmaps,Je=w.isVideoTexture!==!0,Ke=we.__version===void 0||te===!0,X=be.dataReady,Se=A(w,le);if(w.isDepthTexture)Ie=R(w.format===jo,w.type),Ke&&(Je?t.texStorage2D(n.TEXTURE_2D,1,Ie,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Ie,le.width,le.height,0,Re,$e,null));else if(w.isDataTexture)if(qe.length>0){Je&&Ke&&t.texStorage2D(n.TEXTURE_2D,Se,Ie,qe[0].width,qe[0].height);for(let re=0,Te=qe.length;re<Te;re++)Me=qe[re],Je?X&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,Re,$e,Me.data):t.texImage2D(n.TEXTURE_2D,re,Ie,Me.width,Me.height,0,Re,$e,Me.data);w.generateMipmaps=!1}else Je?(Ke&&t.texStorage2D(n.TEXTURE_2D,Se,Ie,le.width,le.height),X&&de(w,le,Re,$e)):t.texImage2D(n.TEXTURE_2D,0,Ie,le.width,le.height,0,Re,$e,le.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Je&&Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ie,qe[0].width,qe[0].height,le.depth);for(let re=0,Te=qe.length;re<Te;re++)if(Me=qe[re],w.format!==_i)if(Re!==null)if(Je){if(X)if(w.layerUpdates.size>0){const Ne=wu(Me.width,Me.height,w.format,w.type);for(const me of w.layerUpdates){const Ge=Me.data.subarray(me*Ne/Me.data.BYTES_PER_ELEMENT,(me+1)*Ne/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,me,Me.width,Me.height,1,Re,Ge)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,le.depth,Re,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ie,Me.width,Me.height,le.depth,0,Me.data,0,0);else et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,le.depth,Re,$e,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ie,Me.width,Me.height,le.depth,0,Re,$e,Me.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Je&&Ke&&t.texStorage2D(n.TEXTURE_2D,Se,Ie,qe[0].width,qe[0].height);for(let re=0,Te=qe.length;re<Te;re++)Me=qe[re],w.format!==_i?Re!==null?Je?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,Re,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ie,Me.width,Me.height,0,Me.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?X&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,Re,$e,Me.data):t.texImage2D(n.TEXTURE_2D,re,Ie,Me.width,Me.height,0,Re,$e,Me.data)}else if(w.isDataArrayTexture)if(Je){if(Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ie,le.width,le.height,le.depth),X)if(w.layerUpdates.size>0){const re=wu(le.width,le.height,w.format,w.type);for(const Te of w.layerUpdates){const Ne=le.data.subarray(Te*re/le.data.BYTES_PER_ELEMENT,(Te+1)*re/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Te,le.width,le.height,1,Re,$e,Ne)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Re,$e,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,le.width,le.height,le.depth,0,Re,$e,le.data);else if(w.isData3DTexture)Je?(Ke&&t.texStorage3D(n.TEXTURE_3D,Se,Ie,le.width,le.height,le.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Re,$e,le.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,le.width,le.height,le.depth,0,Re,$e,le.data);else if(w.isFramebufferTexture){if(Ke)if(Je)t.texStorage2D(n.TEXTURE_2D,Se,Ie,le.width,le.height);else{let re=le.width,Te=le.height;for(let Ne=0;Ne<Se;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Ie,re,Te,0,Re,$e,null),re>>=1,Te>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),le.parentNode!==re){re.appendChild(le),u.add(w),re.onpaint=Te=>{const Ne=Te.changedElements;for(const me of u)Ne.includes(me.image)&&(me.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,le);else{const Ne=n.RGBA,me=n.RGBA,Ge=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ne,me,Ge,le)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(qe.length>0){if(Je&&Ke){const re=kt(qe[0]);t.texStorage2D(n.TEXTURE_2D,Se,Ie,re.width,re.height)}for(let re=0,Te=qe.length;re<Te;re++)Me=qe[re],Je?X&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Re,$e,Me):t.texImage2D(n.TEXTURE_2D,re,Ie,Re,$e,Me);w.generateMipmaps=!1}else if(Je){if(Ke){const re=kt(le);t.texStorage2D(n.TEXTURE_2D,Se,Ie,re.width,re.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Re,$e,le)}else t.texImage2D(n.TEXTURE_2D,0,Ie,Re,$e,le);m(w)&&M(K),we.__version=be.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function tt(D,w,Y){if(w.image.length!==6)return;const K=Rt(D,w),te=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+Y);const be=i.get(te);if(te.version!==be.__version||K===!0){t.activeTexture(n.TEXTURE0+Y);const we=Et.getPrimaries(Et.workingColorSpace),oe=w.colorSpace===oo?null:Et.getPrimaries(w.colorSpace),le=w.colorSpace===oo||we===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const Re=w.isCompressedTexture||w.image[0].isCompressedTexture,$e=w.image[0]&&w.image[0].isDataTexture,Ie=[];for(let me=0;me<6;me++)!Re&&!$e?Ie[me]=g(w.image[me],!0,o.maxCubemapSize):Ie[me]=$e?w.image[me].image:w.image[me],Ie[me]=_n(w,Ie[me]);const Me=Ie[0],qe=s.convert(w.format,w.colorSpace),Je=s.convert(w.type),Ke=_(w.internalFormat,qe,Je,w.normalized,w.colorSpace),X=w.isVideoTexture!==!0,Se=be.__version===void 0||K===!0,re=te.dataReady;let Te=A(w,Me);dt(n.TEXTURE_CUBE_MAP,w);let Ne;if(Re){X&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,Ke,Me.width,Me.height);for(let me=0;me<6;me++){Ne=Ie[me].mipmaps;for(let Ge=0;Ge<Ne.length;Ge++){const He=Ne[Ge];w.format!==_i?qe!==null?X?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge,0,0,He.width,He.height,qe,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge,Ke,He.width,He.height,0,He.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge,0,0,He.width,He.height,qe,Je,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge,Ke,He.width,He.height,0,qe,Je,He.data)}}}else{if(Ne=w.mipmaps,X&&Se){Ne.length>0&&Te++;const me=kt(Ie[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,Ke,me.width,me.height)}for(let me=0;me<6;me++)if($e){X?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Ie[me].width,Ie[me].height,qe,Je,Ie[me].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ke,Ie[me].width,Ie[me].height,0,qe,Je,Ie[me].data);for(let Ge=0;Ge<Ne.length;Ge++){const Gt=Ne[Ge].image[me].image;X?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge+1,0,0,Gt.width,Gt.height,qe,Je,Gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge+1,Ke,Gt.width,Gt.height,0,qe,Je,Gt.data)}}else{X?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,qe,Je,Ie[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ke,qe,Je,Ie[me]);for(let Ge=0;Ge<Ne.length;Ge++){const He=Ne[Ge];X?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge+1,0,0,qe,Je,He.image[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ge+1,Ke,qe,Je,He.image[me])}}}m(w)&&M(n.TEXTURE_CUBE_MAP),be.__version=te.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function Oe(D,w,Y,K,te,be){const we=s.convert(Y.format,Y.colorSpace),oe=s.convert(Y.type),le=_(Y.internalFormat,we,oe,Y.normalized,Y.colorSpace),Re=i.get(w),$e=i.get(Y);if($e.__renderTarget=w,!Re.__hasExternalTextures){const Ie=Math.max(1,w.width>>be),Me=Math.max(1,w.height>>be);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,be,le,Ie,Me,w.depth,0,we,oe,null):t.texImage2D(te,be,le,Ie,Me,0,we,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Qt(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,te,$e.__webglTexture,0,_t(w)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,te,$e.__webglTexture,be),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(D,w,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,D),w.depthBuffer){const K=w.depthTexture,te=K&&K.isDepthTexture?K.type:null,be=R(w.stencilBuffer,te),we=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Qt(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(w),be,w.width,w.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(w),be,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,be,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,D)}else{const K=w.textures;for(let te=0;te<K.length;te++){const be=K[te],we=s.convert(be.format,be.colorSpace),oe=s.convert(be.type),le=_(be.internalFormat,we,oe,be.normalized,be.colorSpace);Qt(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(w),le,w.width,w.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(w),le,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,le,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(D,w,Y){const K=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(w.depthTexture);if(te.__renderTarget=w,(!te.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K){if(te.__webglInit===void 0&&(te.__webglInit=!0,w.depthTexture.addEventListener("dispose",N)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),dt(n.TEXTURE_CUBE_MAP,w.depthTexture);const Re=s.convert(w.depthTexture.format),$e=s.convert(w.depthTexture.type);let Ie;w.depthTexture.format===ho?Ie=n.DEPTH_COMPONENT24:w.depthTexture.format===jo&&(Ie=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,Ie,w.width,w.height,0,Re,$e,null)}}else j(w.depthTexture,0);const be=te.__webglTexture,we=_t(w),oe=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+Y:n.TEXTURE_2D,le=w.depthTexture.format===jo?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(w.depthTexture.format===ho)Qt(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,oe,be,0,we):n.framebufferTexture2D(n.FRAMEBUFFER,le,oe,be,0);else if(w.depthTexture.format===jo)Qt(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,oe,be,0,we):n.framebufferTexture2D(n.FRAMEBUFFER,le,oe,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function at(D){const w=i.get(D),Y=D.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==D.depthTexture){const K=D.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const te=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",te)};K.addEventListener("dispose",te),w.__depthDisposeCallback=te}w.__boundDepthTexture=K}if(D.depthTexture&&!w.__autoAllocateDepthBuffer)if(Y)for(let K=0;K<6;K++)Qe(w.__webglFramebuffer[K],D,K);else{const K=D.texture.mipmaps;K&&K.length>0?Qe(w.__webglFramebuffer[0],D,0):Qe(w.__webglFramebuffer,D,0)}else if(Y){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=n.createRenderbuffer(),ut(w.__webglDepthbuffer[K],D,!1);else{const te=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=w.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,be),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,be)}}else{const K=D.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),ut(w.__webglDepthbuffer,D,!1);else{const te=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,be),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,be)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function yt(D,w,Y){const K=i.get(D);w!==void 0&&Oe(K.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&at(D)}function Ut(D){const w=D.texture,Y=i.get(D),K=i.get(w);D.addEventListener("dispose",b);const te=D.textures,be=D.isWebGLCubeRenderTarget===!0,we=te.length>1;if(we||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=w.version,r.memory.textures++),be){Y.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(w.mipmaps&&w.mipmaps.length>0){Y.__webglFramebuffer[oe]=[];for(let le=0;le<w.mipmaps.length;le++)Y.__webglFramebuffer[oe][le]=n.createFramebuffer()}else Y.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){Y.__webglFramebuffer=[];for(let oe=0;oe<w.mipmaps.length;oe++)Y.__webglFramebuffer[oe]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(we)for(let oe=0,le=te.length;oe<le;oe++){const Re=i.get(te[oe]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),r.memory.textures++)}if(D.samples>0&&Qt(D)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let oe=0;oe<te.length;oe++){const le=te[oe];Y.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[oe]);const Re=s.convert(le.format,le.colorSpace),$e=s.convert(le.type),Ie=_(le.internalFormat,Re,$e,le.normalized,le.colorSpace,D.isXRRenderTarget===!0),Me=_t(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,Ie,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,Y.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),ut(Y.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(be){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),dt(n.TEXTURE_CUBE_MAP,w);for(let oe=0;oe<6;oe++)if(w.mipmaps&&w.mipmaps.length>0)for(let le=0;le<w.mipmaps.length;le++)Oe(Y.__webglFramebuffer[oe][le],D,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,le);else Oe(Y.__webglFramebuffer[oe],D,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(w)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let oe=0,le=te.length;oe<le;oe++){const Re=te[oe],$e=i.get(Re);let Ie=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ie=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ie,$e.__webglTexture),dt(Ie,Re),Oe(Y.__webglFramebuffer,D,Re,n.COLOR_ATTACHMENT0+oe,Ie,0),m(Re)&&M(Ie)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(oe=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,K.__webglTexture),dt(oe,w),w.mipmaps&&w.mipmaps.length>0)for(let le=0;le<w.mipmaps.length;le++)Oe(Y.__webglFramebuffer[le],D,w,n.COLOR_ATTACHMENT0,oe,le);else Oe(Y.__webglFramebuffer,D,w,n.COLOR_ATTACHMENT0,oe,0);m(w)&&M(oe),t.unbindTexture()}D.depthBuffer&&at(D)}function lt(D){const w=D.textures;for(let Y=0,K=w.length;Y<K;Y++){const te=w[Y];if(m(te)){const be=E(D),we=i.get(te).__webglTexture;t.bindTexture(be,we),M(be),t.unbindTexture()}}}const Ht=[],cn=[];function ze(D){if(D.samples>0){if(Qt(D)===!1){const w=D.textures,Y=D.width,K=D.height;let te=n.COLOR_BUFFER_BIT;const be=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(D),oe=w.length>1;if(oe)for(let Re=0;Re<w.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const le=D.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Re=0;Re<w.length;Re++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[Re]);const $e=i.get(w[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$e,0)}n.blitFramebuffer(0,0,Y,K,0,0,Y,K,te,n.NEAREST),l===!0&&(Ht.length=0,cn.length=0,Ht.push(n.COLOR_ATTACHMENT0+Re),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(Ht.push(be),cn.push(be),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,cn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let Re=0;Re<w.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,we.__webglColorRenderbuffer[Re]);const $e=i.get(w[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,$e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){const w=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function _t(D){return Math.min(o.maxSamples,D.samples)}function Qt(D){const w=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function q(D){const w=r.render.frame;d.get(D)!==w&&(d.set(D,w),D.update())}function _n(D,w){const Y=D.colorSpace,K=D.format,te=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Y!==cl&&Y!==oo&&(Et.getTransfer(Y)===Vt?(K!==_i||te!==ni)&&et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",Y)),w}function kt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=T,this.getTextureUnits=I,this.setTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=ne,this.setTexture3D=ce,this.setTextureCube=pe,this.rebindTextures=yt,this.setupRenderTarget=Ut,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=Qt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function wb(n,e){function t(i,o=oo){let s;const r=Et.getTransfer(o);if(i===ni)return n.UNSIGNED_BYTE;if(i===Vh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===zf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Of)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Df)return n.BYTE;if(i===Uf)return n.SHORT;if(i===$r)return n.UNSIGNED_SHORT;if(i===Gh)return n.INT;if(i===Bi)return n.UNSIGNED_INT;if(i===bi)return n.FLOAT;if(i===Hi)return n.HALF_FLOAT;if(i===Ff)return n.ALPHA;if(i===Bf)return n.RGB;if(i===_i)return n.RGBA;if(i===ho)return n.DEPTH_COMPONENT;if(i===jo)return n.DEPTH_STENCIL;if(i===Xh)return n.RED;if(i===qh)return n.RED_INTEGER;if(i===rs)return n.RG;if(i===$h)return n.RG_INTEGER;if(i===Yh)return n.RGBA_INTEGER;if(i===Ja||i===Ka||i===Za||i===ja)if(r===Vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ja)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ka)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ja)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ka)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uc||i===zc||i===Oc||i===Fc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Uc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bc||i===Hc||i===Gc||i===Vc||i===Wc||i===rl||i===Xc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Bc||i===Hc)return r===Vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Gc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Vc)return s.COMPRESSED_R11_EAC;if(i===Wc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===rl)return s.COMPRESSED_RG11_EAC;if(i===Xc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===qc||i===$c||i===Yc||i===Jc||i===Kc||i===Zc||i===jc||i===Qc||i===eh||i===th||i===nh||i===ih||i===oh||i===sh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===qc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$c)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Yc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Kc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qc)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===eh)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===th)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===nh)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ih)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oh)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sh)return r===Vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===rh||i===ah||i===lh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===rh)return r===Vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ah)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ch||i===hh||i===al||i===dh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ch)return s.COMPRESSED_RED_RGTC1_EXT;if(i===hh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===al)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===dh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Yr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Mb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ep(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ei({vertexShader:Mb,fragmentShader:Sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ae(new Sn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Eb extends hs{constructor(e,t){super();const i=this;let o=null,s=1,r=null,a="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,p=null;const y=typeof XRWebGLBinding<"u",g=new Tb,m={},M=t.getContextAttributes();let E=null,_=null;const R=[],A=[],N=new Ce;let b=null,C=null;const S=new Yn;S.viewport=new rn;const V=new Yn;V.viewport=new rn;const $=[S,V],T=new kg;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let de=R[ie];return de===void 0&&(de=new Xl,R[ie]=de),de.getTargetRaySpace()},this.getControllerGrip=function(ie){let de=R[ie];return de===void 0&&(de=new Xl,R[ie]=de),de.getGripSpace()},this.getHand=function(ie){let de=R[ie];return de===void 0&&(de=new Xl,R[ie]=de),de.getHandSpace()};function L(ie){const de=A.indexOf(ie.inputSource);if(de===-1)return;const Be=R[de];Be!==void 0&&(Be.update(ie.inputSource,ie.frame,c||r),Be.dispatchEvent({type:ie.type,data:ie.inputSource}))}function Z(){o.removeEventListener("select",L),o.removeEventListener("selectstart",L),o.removeEventListener("selectend",L),o.removeEventListener("squeeze",L),o.removeEventListener("squeezestart",L),o.removeEventListener("squeezeend",L),o.removeEventListener("end",Z),o.removeEventListener("inputsourceschange",j);for(let ie=0;ie<R.length;ie++){const de=A[ie];de!==null&&(A[ie]=null,R[ie].disconnect(de))}I=null,k=null,g.reset();for(const ie in m)delete m[ie];if(e.setRenderTarget(E),h=null,f=null,u=null,o=null,_=null,Rt.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(N.width,N.height,!1),C!==null){const ie=C.camera;ie.fov=C.fov,ie.zoom=C.zoom,ie.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,i.isPresenting===!0&&et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,i.isPresenting===!0&&et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(o,t)),u},this.getFrame=function(){return p},this.getSession=function(){return o},this.setSession=async function(ie){if(o=ie,o!==null){if(E=e.getRenderTarget(),o.addEventListener("select",L),o.addEventListener("selectstart",L),o.addEventListener("selectend",L),o.addEventListener("squeeze",L),o.addEventListener("squeezestart",L),o.addEventListener("squeezeend",L),o.addEventListener("end",Z),o.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(N),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Be=null,tt=null,Oe=null;M.depth&&(Oe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Be=M.stencil?jo:ho,tt=M.stencil?Yr:Bi);const ut={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(ut),o.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Si(f.textureWidth,f.textureHeight,{format:_i,type:ni,depthTexture:new Zr(f.textureWidth,f.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,Be),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const Be={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(o,t,Be),o.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new Si(h.framebufferWidth,h.framebufferHeight,{format:_i,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await o.requestReferenceSpace(a),Rt.setContext(o),Rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(ie){for(let de=0;de<ie.removed.length;de++){const Be=ie.removed[de],tt=A.indexOf(Be);tt>=0&&(A[tt]=null,R[tt].disconnect(Be))}for(let de=0;de<ie.added.length;de++){const Be=ie.added[de];let tt=A.indexOf(Be);if(tt===-1){for(let ut=0;ut<R.length;ut++)if(ut>=A.length){A.push(Be),tt=ut;break}else if(A[ut]===null){A[ut]=Be,tt=ut;break}if(tt===-1)break}const Oe=R[tt];Oe&&Oe.connect(Be)}}const ne=new F,ce=new F;function pe(ie,de,Be){ne.setFromMatrixPosition(de.matrixWorld),ce.setFromMatrixPosition(Be.matrixWorld);const tt=ne.distanceTo(ce),Oe=de.projectionMatrix.elements,ut=Be.projectionMatrix.elements,Qe=Oe[14]/(Oe[10]-1),at=Oe[14]/(Oe[10]+1),yt=(Oe[9]+1)/Oe[5],Ut=(Oe[9]-1)/Oe[5],lt=(Oe[8]-1)/Oe[0],Ht=(ut[8]+1)/ut[0],cn=Qe*lt,ze=Qe*Ht,_t=tt/(-lt+Ht),Qt=_t*-lt;if(de.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Qt),ie.translateZ(_t),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Oe[10]===-1)ie.projectionMatrix.copy(de.projectionMatrix),ie.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const q=Qe+_t,_n=at+_t,kt=cn-Qt,D=ze+(tt-Qt),w=yt*at/_n*q,Y=Ut*at/_n*q;ie.projectionMatrix.makePerspective(kt,D,w,Y,q,_n),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function De(ie,de){de===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(de.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(o===null)return;let de=ie.near,Be=ie.far;g.texture!==null&&(g.depthNear>0&&(de=g.depthNear),g.depthFar>0&&(Be=g.depthFar)),T.near=V.near=S.near=de,T.far=V.far=S.far=Be,(I!==T.near||k!==T.far)&&(o.updateRenderState({depthNear:T.near,depthFar:T.far}),I=T.near,k=T.far),T.layers.mask=ie.layers.mask|6,S.layers.mask=T.layers.mask&-5,V.layers.mask=T.layers.mask&-3;const tt=ie.parent,Oe=T.cameras;De(T,tt);for(let ut=0;ut<Oe.length;ut++)De(Oe[ut],tt);Oe.length===2?pe(T,S,V):T.projectionMatrix.copy(S.projectionMatrix),C===null&&ie.isPerspectiveCamera&&(C={camera:ie,fov:ie.fov,zoom:ie.zoom}),Fe(ie,T,tt)};function Fe(ie,de,Be){Be===null?ie.matrix.copy(de.matrixWorld):(ie.matrix.copy(Be.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(de.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(de.projectionMatrix),ie.projectionMatrixInverse.copy(de.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Kr*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(ie){l=ie,f!==null&&(f.fixedFoveation=ie),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(T)},this.getCameraTexture=function(ie){return m[ie]};let rt=null;function dt(ie,de){if(d=de.getViewerPose(c||r),p=de,d!==null){const Be=d.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let tt=!1;Be.length!==T.cameras.length&&(T.cameras.length=0,tt=!0);for(let at=0;at<Be.length;at++){const yt=Be[at];let Ut=null;if(h!==null)Ut=h.getViewport(yt);else{const Ht=u.getViewSubImage(f,yt);Ut=Ht.viewport,at===0&&(e.setRenderTargetTextures(_,Ht.colorTexture,Ht.depthStencilTexture),e.setRenderTarget(_))}let lt=$[at];lt===void 0&&(lt=new Yn,lt.layers.enable(at),lt.viewport=new rn,$[at]=lt),lt.matrix.fromArray(yt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(yt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),at===0&&(T.matrix.copy(lt.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),tt===!0&&T.cameras.push(lt)}const Oe=o.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&y){u=i.getBinding();const at=u.getDepthInformation(Be[0]);at&&at.isValid&&at.texture&&g.init(at,o.renderState)}if(Oe&&Oe.includes("camera-access")&&y){e.state.unbindTexture(),u=i.getBinding();for(let at=0;at<Be.length;at++){const yt=Be[at].camera;if(yt){let Ut=m[yt];Ut||(Ut=new ep,m[yt]=Ut);const lt=u.getCameraImage(yt);Ut.sourceTexture=lt}}}}for(let Be=0;Be<R.length;Be++){const tt=A[Be],Oe=R[Be];tt!==null&&Oe!==void 0&&Oe.update(tt,de,c||r)}rt&&rt(ie,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),p=null}const Rt=new fp;Rt.setAnimationLoop(dt),this.setAnimationLoop=function(ie){rt=ie},this.dispose=function(){}}}const Ab=new Ct,bp=new st;bp.set(-1,0,0,0,1,0,0,0,1);function Cb(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,hp(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function o(g,m,M,E,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),d(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),f(g,m),m.isMeshPhysicalMaterial&&h(g,m,_)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),y(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,M,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===An&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===An&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),E=M.envMap,_=M.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Ab.makeRotationFromEuler(_)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bp),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function d(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===An&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:o}}function Rb(n,e,t,i){let o={},s={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,R){const A=R.program;i.uniformBlockBinding(_,A)}function c(_,R){let A=o[_.id];A===void 0&&(g(_),A=d(_),o[_.id]=A,_.addEventListener("dispose",M));const N=R.program;i.updateUBOMapping(_,N);const b=e.render.frame;s[_.id]!==b&&(f(_),s[_.id]=b)}function d(_){const R=u();_.__bindingPointIndex=R;const A=n.createBuffer(),N=_.__size,b=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,N,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,A),A}function u(){for(let _=0;_<a;_++)if(r.indexOf(_)===-1)return r.push(_),_;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const R=o[_.id],A=_.uniforms,N=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let b=0,C=A.length;b<C;b++){const S=A[b];if(Array.isArray(S))for(let V=0,$=S.length;V<$;V++)h(S[V],b,V,N);else h(S,b,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(_,R,A,N){if(y(_,R,A,N)===!0){const b=_.__offset,C=_.value;if(Array.isArray(C)){let S=0;for(let V=0;V<C.length;V++){const $=C[V],T=m($);p($,_.__data,S),typeof $!="number"&&typeof $!="boolean"&&!$.isMatrix3&&!ArrayBuffer.isView($)&&(S+=T.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(C,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,_.__data)}}function p(_,R,A){typeof _=="number"||typeof _=="boolean"?R[0]=_:_.isMatrix3?(R[0]=_.elements[0],R[1]=_.elements[1],R[2]=_.elements[2],R[3]=0,R[4]=_.elements[3],R[5]=_.elements[4],R[6]=_.elements[5],R[7]=0,R[8]=_.elements[6],R[9]=_.elements[7],R[10]=_.elements[8],R[11]=0):ArrayBuffer.isView(_)?R.set(new _.constructor(_.buffer,_.byteOffset,R.length)):_.toArray(R,A)}function y(_,R,A,N){const b=_.value,C=R+"_"+A;if(N[C]===void 0)return typeof b=="number"||typeof b=="boolean"?N[C]=b:ArrayBuffer.isView(b)?N[C]=b.slice():N[C]=b.clone(),!0;{const S=N[C];if(typeof b=="number"||typeof b=="boolean"){if(S!==b)return N[C]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(S.equals(b)===!1)return S.copy(b),!0}}return!1}function g(_){const R=_.uniforms;let A=0;const N=16;for(let C=0,S=R.length;C<S;C++){const V=Array.isArray(R[C])?R[C]:[R[C]];for(let $=0,T=V.length;$<T;$++){const I=V[$],k=Array.isArray(I.value)?I.value:[I.value];for(let L=0,Z=k.length;L<Z;L++){const j=k[L],ne=m(j),ce=A%N,pe=ce%ne.boundary,De=ce+pe;A+=pe,De!==0&&N-De<ne.storage&&(A+=N-De),I.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=A,A+=ne.storage}}}const b=A%N;return b>0&&(A+=N-b),_.__size=A,_.__cache={},this}function m(_){const R={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(R.boundary=4,R.storage=4):_.isVector2?(R.boundary=8,R.storage=8):_.isVector3||_.isColor?(R.boundary=16,R.storage=12):_.isVector4?(R.boundary=16,R.storage=16):_.isMatrix3?(R.boundary=48,R.storage=48):_.isMatrix4?(R.boundary=64,R.storage=64):_.isTexture?et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(R.boundary=16,R.storage=_.byteLength):et("WebGLRenderer: Unsupported uniform value type.",_),R}function M(_){const R=_.target;R.removeEventListener("dispose",M);const A=r.indexOf(R.__bindingPointIndex);r.splice(A,1),n.deleteBuffer(o[R.id]),delete o[R.id],delete s[R.id]}function E(){for(const _ in o)n.deleteBuffer(o[_]);r=[],o={},s={}}return{bind:l,update:c,dispose:E}}const Ib=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ci=null;function Pb(){return Ci===null&&(Ci=new Kf(Ib,16,16,rs,Hi),Ci.name="DFG_LUT",Ci.minFilter=Ln,Ci.magFilter=Ln,Ci.wrapS=ro,Ci.wrapT=ro,Ci.generateMipmaps=!1,Ci.needsUpdate=!0),Ci}class Lb{constructor(e={}){const{canvas:t=Q0(),context:i=null,depth:o=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:h=ni}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const y=h,g=new Set([Yh,$h,qh]),m=new Set([ni,Bi,$r,Yr,Vh,Wh]),M=new Uint32Array(4),E=new Int32Array(4),_=new F;let R=null,A=null;const N=[],b=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let V=!1,$=null,T=null,I=null,k=null;this._outputColorSpace=Wn;let L=0,Z=0,j=null,ne=-1,ce=null;const pe=new rn,De=new rn;let Fe=null;const rt=new ot(0);let dt=0,Rt=t.width,ie=t.height,de=1,Be=null,tt=null;const Oe=new rn(0,0,Rt,ie),ut=new rn(0,0,Rt,ie);let Qe=!1;const at=new td;let yt=!1,Ut=!1;const lt=new Ct,Ht=new F,cn=new rn,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function Qt(){return j===null?de:1}let q=i;function _n(v,P){return t.getContext(v,P)}let kt,D,w,Y,K,te,be,we,oe,le,Re,$e,Ie,Me,qe,Je,Ke,X,Se,re,Te,Ne,me;try{const v={alpha:!0,depth:o,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fh}`),t.addEventListener("webglcontextlost",Gt,!1),t.addEventListener("webglcontextrestored",Tt,!1),t.addEventListener("webglcontextcreationerror",zn,!1),q===null){const P="webgl2";if(q=_n(P,v),q===null)throw _n(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ge()}catch(v){throw t.removeEventListener("webglcontextlost",Gt,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",zn,!1),Lt("WebGLRenderer: "+v.message),v}function Ge(){kt=new Pv(q),kt.init(),Te=new wb(q,kt),D=new _v(q,kt,e,Te),w=new bb(q,kt),D.reversedDepthBuffer&&f&&w.buffers.depth.setReversed(!0),T=q.createFramebuffer(),I=q.createFramebuffer(),k=q.createFramebuffer(),Y=new Nv(q),K=new rb,te=new _b(q,kt,w,K,D,Te,Y),be=new Iv(S),we=new Ug(q),Ne=new vv(q,we),oe=new Lv(q,we,Y,Ne),le=new Uv(q,oe,we,Ne,Y),X=new Dv(q,D,te),qe=new wv(K),Re=new sb(S,be,kt,D,Ne,qe),$e=new Cb(S,K),Ie=new lb,Me=new pb(kt),Ke=new xv(S,be,w,le,p,l),Je=new vb(S,le,D),me=new Rb(q,Y,D,w),Se=new bv(q,kt,Y),re=new kv(q,kt,Y),Y.programs=Re.programs,S.capabilities=D,S.extensions=kt,S.properties=K,S.renderLists=Ie,S.shadowMap=Je,S.state=w,S.info=Y}y!==ni&&(C=new Ov(y,t.width,t.height,a,o,s));const He=new Eb(S,q);this.xr=He,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const v=kt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=kt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(v){v!==void 0&&(de=v,this.setSize(Rt,ie,!1))},this.getSize=function(v){return v.set(Rt,ie)},this.setSize=function(v,P,B=!0){if(He.isPresenting){et("WebGLRenderer: Can't change size while VR device is presenting.");return}Rt=v,ie=P,t.width=Math.floor(v*de),t.height=Math.floor(P*de),B===!0&&(t.style.width=v+"px",t.style.height=P+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(Rt*de,ie*de).floor()},this.setDrawingBufferSize=function(v,P,B){Rt=v,ie=P,de=B,t.width=Math.floor(v*B),t.height=Math.floor(P*B),this.setViewport(0,0,v,P)},this.setEffects=function(v){if(y===ni){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let P=0;P<v.length;P++)if(v[P].isOutputPass===!0){et("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(pe)},this.getViewport=function(v){return v.copy(Oe)},this.setViewport=function(v,P,B,G){v.isVector4?Oe.set(v.x,v.y,v.z,v.w):Oe.set(v,P,B,G),w.viewport(pe.copy(Oe).multiplyScalar(de).round())},this.getScissor=function(v){return v.copy(ut)},this.setScissor=function(v,P,B,G){v.isVector4?ut.set(v.x,v.y,v.z,v.w):ut.set(v,P,B,G),w.scissor(De.copy(ut).multiplyScalar(de).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(v){w.setScissorTest(Qe=v)},this.setOpaqueSort=function(v){Be=v},this.setTransparentSort=function(v){tt=v},this.getClearColor=function(v){return v.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(v=!0,P=!0,B=!0){let G=0;if(v){let z=!1;if(j!==null){const ee=j.texture.format;z=g.has(ee)}if(z){const ee=j.texture.type,ue=m.has(ee),se=Ke.getClearColor(),he=Ke.getClearAlpha(),ge=se.r,Le=se.g,Xe=se.b;ue?(M[0]=ge,M[1]=Le,M[2]=Xe,M[3]=he,q.clearBufferuiv(q.COLOR,0,M)):(E[0]=ge,E[1]=Le,E[2]=Xe,E[3]=he,q.clearBufferiv(q.COLOR,0,E))}else G|=q.COLOR_BUFFER_BIT}P&&(G|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),B&&(G|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&q.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),$=v},this.dispose=function(){t.removeEventListener("webglcontextlost",Gt,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",zn,!1),Ke.dispose(),Ie.dispose(),Me.dispose(),K.dispose(),be.dispose(),le.dispose(),Ne.dispose(),me.dispose(),Re.dispose(),He.dispose(),He.removeEventListener("sessionstart",us),He.removeEventListener("sessionend",ra),$i.stop()};function Gt(v){v.preventDefault(),ul("WebGLRenderer: Context Lost."),V=!0}function Tt(){ul("WebGLRenderer: Context Restored."),V=!1;const v=Y.autoReset,P=Je.enabled,B=Je.autoUpdate,G=Je.needsUpdate,z=Je.type;Ge(),Y.autoReset=v,Je.enabled=P,Je.autoUpdate=B,Je.needsUpdate=G,Je.type=z}function zn(v){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function fi(v){const P=v.target;P.removeEventListener("dispose",fi),ar(P)}function ar(v){zo(v),K.remove(v)}function zo(v){const P=K.get(v).programs;P!==void 0&&(P.forEach(function(B){Re.releaseProgram(B)}),v.isShaderMaterial&&Re.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,B,G,z,ee){P===null&&(P=ze);const ue=z.isMesh&&z.matrixWorld.determinantAffine()<0,se=H(v,P,B,G,z);w.setMaterial(G,ue);let he=B.index,ge=1;if(G.wireframe===!0){if(he=oe.getWireframeAttribute(B),he===void 0)return;ge=2}const Le=B.drawRange,Xe=B.attributes.position;let Ee=Le.start*ge,xt=(Le.start+Le.count)*ge;ee!==null&&(Ee=Math.max(Ee,ee.start*ge),xt=Math.min(xt,(ee.start+ee.count)*ge)),he!==null?(Ee=Math.max(Ee,0),xt=Math.min(xt,he.count)):Xe!=null&&(Ee=Math.max(Ee,0),xt=Math.min(xt,Xe.count));const It=xt-Ee;if(It<0||It===1/0)return;Ne.setup(z,G,se,B,he);let Pt,vt=Se;if(he!==null&&(Pt=we.get(he),vt=re,vt.setIndex(Pt)),z.isMesh)G.wireframe===!0?(w.setLineWidth(G.wireframeLinewidth*Qt()),vt.setMode(q.LINES)):vt.setMode(q.TRIANGLES);else if(z.isLine){let en=G.linewidth;en===void 0&&(en=1),w.setLineWidth(en*Qt()),z.isLineSegments?vt.setMode(q.LINES):z.isLineLoop?vt.setMode(q.LINE_LOOP):vt.setMode(q.LINE_STRIP)}else z.isPoints?vt.setMode(q.POINTS):z.isSprite&&vt.setMode(q.TRIANGLES);if(z.isBatchedMesh)if(kt.get("WEBGL_multi_draw"))vt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const en=z._multiDrawStarts,Ue=z._multiDrawCounts,wn=z._multiDrawCount,wt=he?we.get(he).bytesPerElement:1,On=K.get(G).currentProgram.getUniforms();for(let Nn=0;Nn<wn;Nn++)On.setValue(q,"_gl_DrawID",Nn),vt.render(en[Nn]/wt,Ue[Nn])}else if(z.isInstancedMesh)vt.renderInstances(Ee,It,z.count);else if(B.isInstancedBufferGeometry){const en=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ue=Math.min(B.instanceCount,en);vt.renderInstances(Ee,It,Ue)}else vt.render(Ee,It)};function qi(v,P,B,G){$!==null&&v.isNodeMaterial&&$.setObject(G,v),yt===!0&&qe.setState(v,B,!1),v.transparent===!0&&v.side===tn&&v.forceSinglePass===!1?(v.side=An,v.needsUpdate=!0,ps(v,P,G),v.side=os,v.needsUpdate=!0,ps(v,P,G),v.side=tn):ps(v,P,G)}this.compile=function(v,P,B=null){B===null&&(B=v),$!==null&&$.renderStart(v,P,B),A=Me.get(B),A.init(P),b.push(A),B.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),v!==B&&v.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),A.setupLights(),$!==null&&$.updateLights(A.state.lightsArray),Ut=this.localClippingEnabled,yt=qe.init(this.clippingPlanes,Ut),yt===!0&&qe.setGlobalState(this.clippingPlanes,P),$!==null&&Je.render(A.state.shadowsArray,B,P);const G=new Set;return v.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ee=z.material;if(ee)if(Array.isArray(ee))for(let ue=0;ue<ee.length;ue++){const se=ee[ue];qi(se,B,P,z),G.add(se)}else qi(ee,B,P,z),G.add(ee)}),A=b.pop(),$!==null&&$.renderEnd(),G},this.compileAsync=function(v,P,B=null){const G=this.compile(v,P,B);return new Promise(z=>{function ee(){if(G.forEach(function(ue){const he=K.get(ue).currentProgram;(he===void 0||he.isReady())&&G.delete(ue)}),G.size===0){z(v);return}setTimeout(ee,10)}kt.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let yo=null;function sa(v){yo&&yo(v)}function us(){$i.stop()}function ra(){$i.start()}const $i=new fp;$i.setAnimationLoop(sa),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(v){yo=v,He.setAnimationLoop(v),v===null?$i.stop():$i.start()},He.addEventListener("sessionstart",us),He.addEventListener("sessionend",ra),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;$!==null&&$.renderStart(v,P);const B=He.enabled===!0&&He.isPresenting===!0,G=C!==null&&(j===null||B)&&C.begin(S,j);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(P),P=He.getCamera()),v.isScene===!0&&v.onBeforeRender(S,v,P,j),A=Me.get(v,b.length),A.init(P),A.state.textureUnits=te.getTextureUnits(),b.push(A),lt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),at.setFromProjectionMatrix(lt,zi,P.reversedDepth),Ut=this.localClippingEnabled,yt=qe.init(this.clippingPlanes,Ut),R=Ie.get(v,N.length),R.init(),N.push(R),He.enabled===!0&&He.isPresenting===!0){const ue=S.xr.getDepthSensingMesh();ue!==null&&dn(ue,P,-1/0,S.sortObjects)}dn(v,P,0,S.sortObjects),R.finish(),$!==null&&$.updateLights(A.state.lightsArray),S.sortObjects===!0&&R.sort(Be,tt),_t=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,_t&&Ke.addToRenderList(R,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),yt===!0&&qe.beginShadows();const z=A.state.shadowsArray;if(Je.render(z,v,P),yt===!0&&qe.endShadows(),(G&&C.hasRenderPass())===!1){const ue=R.opaque,se=R.transmissive;if(A.setupLights(),P.isArrayCamera){const he=P.cameras;if(se.length>0)for(let ge=0,Le=he.length;ge<Le;ge++){const Xe=he[ge];fs(ue,se,v,Xe)}_t&&Ke.render(v);for(let ge=0,Le=he.length;ge<Le;ge++){const Xe=he[ge];pi(R,v,Xe,Xe.viewport)}}else se.length>0&&fs(ue,se,v,P),_t&&Ke.render(v),pi(R,v,P)}j!==null&&Z===0&&(te.updateMultisampleRenderTarget(j),te.updateRenderTargetMipmap(j)),G&&C.end(S),v.isScene===!0&&v.onAfterRender(S,v,P),Ne.resetDefaultState(),ne=-1,ce=null,b.pop(),b.length>0?(A=b[b.length-1],te.setTextureUnits(A.state.textureUnits),yt===!0&&qe.setGlobalState(S.clippingPlanes,A.state.camera)):A=null,N.pop(),N.length>0?R=N[N.length-1]:R=null,$!==null&&$.renderEnd()};function dn(v,P,B,G){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLightProbeGrid)A.pushLightProbeGrid(v);else if(v.isLight)A.pushLight(v),v.castShadow&&A.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(at)){G&&cn.setFromMatrixPosition(v.matrixWorld).applyMatrix4(lt);const ue=le.update(v),se=v.material;se.visible&&R.push(v,ue,se,B,cn.z,null,P)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(at))){const ue=le.update(v),se=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),cn.copy(v.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),cn.copy(ue.boundingSphere.center)),cn.applyMatrix4(v.matrixWorld).applyMatrix4(lt)),Array.isArray(se)){const he=ue.groups;for(let ge=0,Le=he.length;ge<Le;ge++){const Xe=he[ge],Ee=se[Xe.materialIndex];Ee&&Ee.visible&&R.push(v,ue,Ee,B,cn.z,Xe,P)}}else se.visible&&R.push(v,ue,se,B,cn.z,null,P)}}const ee=v.children;for(let ue=0,se=ee.length;ue<se;ue++)dn(ee[ue],P,B,G)}function pi(v,P,B,G){const{opaque:z,transmissive:ee,transparent:ue}=v;A.setupLightsView(B),yt===!0&&qe.setGlobalState(S.clippingPlanes,B),G&&w.viewport(pe.copy(G)),z.length>0&&Oo(z,P,B),ee.length>0&&Oo(ee,P,B),ue.length>0&&Oo(ue,P,B),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function fs(v,P,B,G){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[G.id]===void 0){const Ee=kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[G.id]=new Si(1,1,{generateMipmaps:!0,type:Ee?Hi:ni,minFilter:Zo,samples:Math.max(4,D.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Et.workingColorSpace})}const ee=A.state.transmissionRenderTarget[G.id],ue=G.viewport||pe;ee.setSize(ue.z*S.transmissionResolutionScale,ue.w*S.transmissionResolutionScale);const se=S.getRenderTarget(),he=S.getActiveCubeFace(),ge=S.getActiveMipmapLevel();S.setRenderTarget(ee),S.getClearColor(rt),dt=S.getClearAlpha(),dt<1&&S.setClearColor(16777215,.5),S.clear(),_t&&Ke.render(B);const Le=S.toneMapping;S.toneMapping=Oi;const Xe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),A.setupLightsView(G),yt===!0&&qe.setGlobalState(S.clippingPlanes,G),Oo(v,B,G),te.updateMultisampleRenderTarget(ee),te.updateRenderTargetMipmap(ee),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let xt=0,It=P.length;xt<It;xt++){const Pt=P[xt],{object:vt,geometry:en,material:Ue,group:wn}=Pt;if(Ue.side===tn&&vt.layers.test(G.layers)){const wt=Ue.side;Ue.side=An,Ue.needsUpdate=!0,Fo(vt,B,G,en,Ue,wn),Ue.side=wt,Ue.needsUpdate=!0,Ee=!0}}Ee===!0&&(te.updateMultisampleRenderTarget(ee),te.updateRenderTargetMipmap(ee))}S.setRenderTarget(se,he,ge),S.setClearColor(rt,dt),Xe!==void 0&&(G.viewport=Xe),S.toneMapping=Le}function Oo(v,P,B){const G=P.isScene===!0?P.overrideMaterial:null;for(let z=0,ee=v.length;z<ee;z++){const ue=v[z],{object:se,geometry:he,group:ge}=ue;let Le=ue.material;Le.allowOverride===!0&&G!==null&&(Le=G),se.layers.test(B.layers)&&Fo(se,P,B,he,Le,ge)}}function Fo(v,P,B,G,z,ee){$!==null&&z.isNodeMaterial&&$.setObject(v,z),v.onBeforeRender(S,P,B,G,z,ee),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),z.onBeforeRender(S,P,B,G,v,ee),z.transparent===!0&&z.side===tn&&z.forceSinglePass===!1?(z.side=An,z.needsUpdate=!0,S.renderBufferDirect(B,P,G,z,v,ee),z.side=os,z.needsUpdate=!0,S.renderBufferDirect(B,P,G,z,v,ee),z.side=tn):S.renderBufferDirect(B,P,G,z,v,ee),v.onAfterRender(S,P,B,G,z,ee)}function ps(v,P,B){P.isScene!==!0&&(P=ze);const G=K.get(v),z=A.state.lights,ee=A.state.shadowsArray,ue=z.state.version,se=Re.getParameters(v,z.state,ee,P,B,A.state.lightProbeGridArray),he=Re.getProgramCacheKey(se);let ge=G.programs;G.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,G.fog=P.fog;const Le=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;G.envMap=be.get(v.envMap||G.environment,Le),G.envMapRotation=G.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,ge===void 0&&(v.addEventListener("dispose",fi),ge=new Map,G.programs=ge);let Xe=ge.get(he);if(Xe!==void 0){if(G.currentProgram===Xe&&G.lightsStateVersion===ue)return O(v,se),Xe}else se.uniforms=Re.getUniforms(v),$!==null&&v.isNodeMaterial&&$.build(v,B,se),v.onBeforeCompile(se,S),Xe=Re.acquireProgram(se,he),ge.set(he,Xe),G.uniforms=se.uniforms;const Ee=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ee.clippingPlanes=qe.uniform),O(v,se),G.needsLights=J(v),G.lightsStateVersion=ue,G.needsLights&&(Ee.ambientLightColor.value=z.state.ambient,Ee.lightProbe.value=z.state.probe,Ee.sunLights.value=z.state.sun,Ee.sunLightShadows.value=z.state.sunShadow,Ee.directionalLights.value=z.state.directional,Ee.directionalLightShadows.value=z.state.directionalShadow,Ee.spotLights.value=z.state.spot,Ee.spotLightShadows.value=z.state.spotShadow,Ee.rectAreaLights.value=z.state.rectArea,Ee.ltc_1.value=z.state.rectAreaLTC1,Ee.ltc_2.value=z.state.rectAreaLTC2,Ee.pointLights.value=z.state.point,Ee.pointLightShadows.value=z.state.pointShadow,Ee.hemisphereLights.value=z.state.hemi,Ee.sunShadowMatrix.value=z.state.sunShadowMatrix,Ee.sunShadowCascade.value=z.state.sunShadowCascade,Ee.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ee.spotLightMatrix.value=z.state.spotLightMatrix,Ee.spotLightMap.value=z.state.spotLightMap,Ee.pointShadowMatrix.value=z.state.pointShadowMatrix),G.lightProbeGrid=A.state.lightProbeGridArray.length>0,G.currentProgram=Xe,G.uniformsList=null,Xe}function x(v){if(v.uniformsList===null){const P=v.currentProgram.getUniforms();v.uniformsList=Qa.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function O(v,P){const B=K.get(v);B.outputColorSpace=P.outputColorSpace,B.batching=P.batching,B.batchingColor=P.batchingColor,B.instancing=P.instancing,B.instancingColor=P.instancingColor,B.instancingMorph=P.instancingMorph,B.skinning=P.skinning,B.morphTargets=P.morphTargets,B.morphNormals=P.morphNormals,B.morphColors=P.morphColors,B.morphTargetsCount=P.morphTargetsCount,B.numClippingPlanes=P.numClippingPlanes,B.numIntersection=P.numClipIntersection,B.vertexAlphas=P.vertexAlphas,B.vertexTangents=P.vertexTangents,B.toneMapping=P.toneMapping}function U(v,P){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;_.setFromMatrixPosition(P.matrixWorld);for(let B=0,G=v.length;B<G;B++){const z=v[B];if(z.texture!==null&&z.boundingBox.containsPoint(_))return z}return null}function H(v,P,B,G,z){P.isScene!==!0&&(P=ze),te.resetTextureUnits();const ee=P.fog,ue=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?P.environment:null,se=j===null?S.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Et.workingColorSpace,he=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,ge=be.get(G.envMap||ue,he),Le=G.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Xe=!!B.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ee=!!B.morphAttributes.position,xt=!!B.morphAttributes.normal,It=!!B.morphAttributes.color;let Pt=Oi;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Pt=S.toneMapping);const vt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,en=vt!==void 0?vt.length:0,Ue=K.get(G),wn=A.state.lights;if(yt===!0&&(Ut===!0||v!==ce)){const Zt=v===ce&&G.id===ne;qe.setState(G,v,Zt)}let wt=!1;G.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==wn.state.version||Ue.outputColorSpace!==se||z.isBatchedMesh&&Ue.batching===!1||!z.isBatchedMesh&&Ue.batching===!0||z.isBatchedMesh&&Ue.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Ue.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Ue.instancing===!1||!z.isInstancedMesh&&Ue.instancing===!0||z.isSkinnedMesh&&Ue.skinning===!1||!z.isSkinnedMesh&&Ue.skinning===!0||z.isInstancedMesh&&Ue.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ue.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ue.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ue.instancingMorph===!1&&z.morphTexture!==null||Ue.envMap!==ge||G.fog===!0&&Ue.fog!==ee||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==qe.numPlanes||Ue.numIntersection!==qe.numIntersection)||Ue.vertexAlphas!==Le||Ue.vertexTangents!==Xe||Ue.morphTargets!==Ee||Ue.morphNormals!==xt||Ue.morphColors!==It||Ue.toneMapping!==Pt||Ue.morphTargetsCount!==en||!!Ue.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(wt=!0):(wt=!0,Ue.__version=G.version);let On=Ue.currentProgram;wt===!0&&(On=ps(G,P,z),$&&G.isNodeMaterial&&$.onUpdateProgram(G,On,Ue));let Nn=!1,pn=!1,Yi=!1;const Yt=On.getUniforms(),un=Ue.uniforms;if(w.useProgram(On.program)&&(Nn=!0,pn=!0,Yi=!0),G.id!==ne&&(ne=G.id,pn=!0),Ue.needsLights){const Zt=U(A.state.lightProbeGridArray,z);Ue.lightProbeGrid!==Zt&&(Ue.lightProbeGrid=Zt,pn=!0)}if(Nn||ce!==v){w.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Yt.setValue(q,"projectionMatrix",v.projectionMatrix),Yt.setValue(q,"viewMatrix",v.matrixWorldInverse);const vo=Yt.map.cameraPosition;vo!==void 0&&vo.setValue(q,Ht.setFromMatrixPosition(v.matrixWorld)),D.logarithmicDepthBuffer&&Yt.setValue(q,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Yt.setValue(q,"isOrthographic",v.isOrthographicCamera===!0),ce!==v&&(ce=v,pn=!0,Yi=!0)}if(Ue.needsLights&&(wn.state.sunShadowMap.length>0&&Yt.setValue(q,"sunShadowMap",wn.state.sunShadowMap,te),wn.state.directionalShadowMap.length>0&&Yt.setValue(q,"directionalShadowMap",wn.state.directionalShadowMap,te),wn.state.spotShadowMap.length>0&&Yt.setValue(q,"spotShadowMap",wn.state.spotShadowMap,te),wn.state.pointShadowMap.length>0&&Yt.setValue(q,"pointShadowMap",wn.state.pointShadowMap,te)),z.isSkinnedMesh){Yt.setOptional(q,z,"bindMatrix"),Yt.setOptional(q,z,"bindMatrixInverse");const Zt=z.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),Yt.setValue(q,"boneTexture",Zt.boneTexture,te))}z.isBatchedMesh&&(Yt.setOptional(q,z,"batchingTexture"),Yt.setValue(q,"batchingTexture",z._matricesTexture,te),Yt.setOptional(q,z,"batchingIdTexture"),Yt.setValue(q,"batchingIdTexture",z._indirectTexture,te),Yt.setOptional(q,z,"batchingColorTexture"),z._colorsTexture!==null&&Yt.setValue(q,"batchingColorTexture",z._colorsTexture,te));const xo=B.morphAttributes;if((xo.position!==void 0||xo.normal!==void 0||xo.color!==void 0)&&X.update(z,B,On),(pn||Ue.receiveShadow!==z.receiveShadow)&&(Ue.receiveShadow=z.receiveShadow,Yt.setValue(q,"receiveShadow",z.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&P.environment!==null&&(un.envMapIntensity.value=P.environmentIntensity),un.dfgLUT!==void 0&&(un.dfgLUT.value=Pb()),pn){if(Yt.setValue(q,"toneMappingExposure",S.toneMappingExposure),Ue.needsLights&&W(un,Yi),ee&&G.fog===!0&&$e.refreshFogUniforms(un,ee),$e.refreshMaterialUniforms(un,G,de,ie,A.state.transmissionRenderTarget[v.id]),Ue.needsLights&&Ue.lightProbeGrid){const Zt=Ue.lightProbeGrid;un.probesSH.value=Zt.texture,un.probesMin.value.copy(Zt.boundingBox.min),un.probesMax.value.copy(Zt.boundingBox.max),un.probesResolution.value.copy(Zt.resolution)}Qa.upload(q,x(Ue),un,te)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Qa.upload(q,x(Ue),un,te),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Yt.setValue(q,"center",z.center),Yt.setValue(q,"modelViewMatrix",z.modelViewMatrix),Yt.setValue(q,"normalMatrix",z.normalMatrix),Yt.setValue(q,"modelMatrix",z.matrixWorld),G.uniformsGroups!==void 0){const Zt=G.uniformsGroups;for(let vo=0,ms=Zt.length;vo<ms;vo++){const Cd=Zt[vo];me.update(Cd,On),me.bind(Cd,On)}}return On}function W(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.sunLights.needsUpdate=P,v.sunLightShadows.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function J(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(v,P,B){const G=K.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),K.get(v.texture).__webglTexture=P,K.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:B,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,P){const B=K.get(v);B.__webglFramebuffer=P,B.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(v,P=0,B=0){j=v,L=P,Z=B;let G=null,z=!1,ee=!1;if(v){const se=K.get(v);if(se.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(q.FRAMEBUFFER,se.__webglFramebuffer),pe.copy(v.viewport),De.copy(v.scissor),Fe=v.scissorTest,w.viewport(pe),w.scissor(De),w.setScissorTest(Fe),ne=-1;return}else if(se.__webglFramebuffer===void 0)te.setupRenderTarget(v);else if(se.__hasExternalTextures)te.rebindTextures(v,K.get(v.texture).__webglTexture,K.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Le=v.depthTexture;if(se.__boundDepthTexture!==Le){if(Le!==null&&K.has(Le)&&(v.width!==Le.image.width||v.height!==Le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(v)}}const he=v.texture;(he.isData3DTexture||he.isDataArrayTexture||he.isCompressedArrayTexture)&&(ee=!0);const ge=K.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(ge[P])?G=ge[P][B]:G=ge[P],z=!0):v.samples>0&&te.useMultisampledRTT(v)===!1?G=K.get(v).__webglMultisampledFramebuffer:Array.isArray(ge)?G=ge[B]:G=ge,pe.copy(v.viewport),De.copy(v.scissor),Fe=v.scissorTest}else pe.copy(Oe).multiplyScalar(de).floor(),De.copy(ut).multiplyScalar(de).floor(),Fe=Qe;if(B!==0&&(G=T),w.bindFramebuffer(q.FRAMEBUFFER,G)&&w.drawBuffers(v,G),w.viewport(pe),w.scissor(De),w.setScissorTest(Fe),z){const se=K.get(v.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+P,se.__webglTexture,B)}else if(ee){const se=P;for(let he=0;he<v.textures.length;he++){const ge=K.get(v.textures[he]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+he,ge.__webglTexture,B,se)}}else if(v!==null&&B!==0){const se=K.get(v.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,se.__webglTexture,B)}ne=-1};function Q(v){const P=K.get(v);return(P.__readFormat!==v.format||P.__readType!==v.type)&&(P.__readFormat=v.format,P.__readType=v.type,P.__formatReadable=D.textureFormatReadable(v.format),P.__typeReadable=D.textureTypeReadable(v.type)),P}this.readRenderTargetPixels=function(v,P,B,G,z,ee,ue,se=0){if(!(v&&v.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=K.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ue!==void 0&&(he=he[ue]),he){w.bindFramebuffer(q.FRAMEBUFFER,he);try{const ge=v.textures[se],Le=ge.format,Xe=ge.type;v.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+se);const Ee=Q(ge);if(Ee.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-G&&B>=0&&B<=v.height-z&&q.readPixels(P,B,G,z,Te.convert(Le),Te.convert(Xe),ee)}finally{const ge=j!==null?K.get(j).__webglFramebuffer:null;w.bindFramebuffer(q.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(v,P,B,G,z,ee,ue,se=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=K.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ue!==void 0&&(he=he[ue]),he)if(P>=0&&P<=v.width-G&&B>=0&&B<=v.height-z){w.bindFramebuffer(q.FRAMEBUFFER,he);const ge=v.textures[se],Le=ge.format,Xe=ge.type;v.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+se);const Ee=Q(ge);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const xt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,xt),q.bufferData(q.PIXEL_PACK_BUFFER,ee.byteLength,q.STREAM_READ),q.readPixels(P,B,G,z,Te.convert(Le),Te.convert(Xe),0),q.bindBuffer(q.PIXEL_PACK_BUFFER,null);const It=j!==null?K.get(j).__webglFramebuffer:null;w.bindFramebuffer(q.FRAMEBUFFER,It);const Pt=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await em(q,Pt,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,xt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,ee),q.bindBuffer(q.PIXEL_PACK_BUFFER,null),q.deleteBuffer(xt),q.deleteSync(Pt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,P=null,B=0){const G=Math.pow(2,-B),z=Math.floor(v.image.width*G),ee=Math.floor(v.image.height*G),ue=P!==null?P.x:0,se=P!==null?P.y:0;te.setTexture2D(v,0),q.copyTexSubImage2D(q.TEXTURE_2D,B,0,0,ue,se,z,ee),w.unbindTexture()},this.copyTextureToTexture=function(v,P,B=null,G=null,z=0,ee=0){let ue,se,he,ge,Le,Xe,Ee,xt,It;const Pt=v.isCompressedTexture?v.mipmaps[ee]:v.image;if(B!==null)ue=B.max.x-B.min.x,se=B.max.y-B.min.y,he=B.isBox3?B.max.z-B.min.z:1,ge=B.min.x,Le=B.min.y,Xe=B.isBox3?B.min.z:0;else{const un=Math.pow(2,-z);ue=Math.floor(Pt.width*un),se=Math.floor(Pt.height*un),v.isDataArrayTexture?he=Pt.depth:v.isData3DTexture?he=Math.floor(Pt.depth*un):he=1,ge=0,Le=0,Xe=0}G!==null?(Ee=G.x,xt=G.y,It=G.z):(Ee=0,xt=0,It=0);const vt=Te.convert(P.format),en=Te.convert(P.type);let Ue;P.isData3DTexture?(te.setTexture3D(P,0),Ue=q.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(te.setTexture2DArray(P,0),Ue=q.TEXTURE_2D_ARRAY):(te.setTexture2D(P,0),Ue=q.TEXTURE_2D),w.activeTexture(q.TEXTURE0),w.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,P.flipY),w.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),w.pixelStorei(q.UNPACK_ALIGNMENT,P.unpackAlignment);const wn=w.getParameter(q.UNPACK_ROW_LENGTH),wt=w.getParameter(q.UNPACK_IMAGE_HEIGHT),On=w.getParameter(q.UNPACK_SKIP_PIXELS),Nn=w.getParameter(q.UNPACK_SKIP_ROWS),pn=w.getParameter(q.UNPACK_SKIP_IMAGES);w.pixelStorei(q.UNPACK_ROW_LENGTH,Pt.width),w.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Pt.height),w.pixelStorei(q.UNPACK_SKIP_PIXELS,ge),w.pixelStorei(q.UNPACK_SKIP_ROWS,Le),w.pixelStorei(q.UNPACK_SKIP_IMAGES,Xe);const Yi=v.isDataArrayTexture||v.isData3DTexture,Yt=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){const un=K.get(v),xo=K.get(P),Zt=K.get(un.__renderTarget),vo=K.get(xo.__renderTarget);w.bindFramebuffer(q.READ_FRAMEBUFFER,Zt.__webglFramebuffer),w.bindFramebuffer(q.DRAW_FRAMEBUFFER,vo.__webglFramebuffer);for(let ms=0;ms<he;ms++)Yi&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,K.get(v).__webglTexture,z,Xe+ms),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,K.get(P).__webglTexture,ee,It+ms)),q.blitFramebuffer(ge,Le,ue,se,Ee,xt,ue,se,q.DEPTH_BUFFER_BIT,q.NEAREST);w.bindFramebuffer(q.READ_FRAMEBUFFER,null),w.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(z!==0||v.isRenderTargetTexture||K.has(v)){const un=K.get(v),xo=K.get(P);w.bindFramebuffer(q.READ_FRAMEBUFFER,I),w.bindFramebuffer(q.DRAW_FRAMEBUFFER,k);for(let Zt=0;Zt<he;Zt++)Yi?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,un.__webglTexture,z,Xe+Zt):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,un.__webglTexture,z),Yt?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,xo.__webglTexture,ee,It+Zt):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,xo.__webglTexture,ee),z!==0?q.blitFramebuffer(ge,Le,ue,se,Ee,xt,ue,se,q.COLOR_BUFFER_BIT,q.NEAREST):Yt?q.copyTexSubImage3D(Ue,ee,Ee,xt,It+Zt,ge,Le,ue,se):q.copyTexSubImage2D(Ue,ee,Ee,xt,ge,Le,ue,se);w.bindFramebuffer(q.READ_FRAMEBUFFER,null),w.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Yt?v.isDataTexture||v.isData3DTexture?q.texSubImage3D(Ue,ee,Ee,xt,It,ue,se,he,vt,en,Pt.data):P.isCompressedArrayTexture?q.compressedTexSubImage3D(Ue,ee,Ee,xt,It,ue,se,he,vt,Pt.data):q.texSubImage3D(Ue,ee,Ee,xt,It,ue,se,he,vt,en,Pt):v.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,ee,Ee,xt,ue,se,vt,en,Pt.data):v.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,ee,Ee,xt,Pt.width,Pt.height,vt,Pt.data):q.texSubImage2D(q.TEXTURE_2D,ee,Ee,xt,ue,se,vt,en,Pt);w.pixelStorei(q.UNPACK_ROW_LENGTH,wn),w.pixelStorei(q.UNPACK_IMAGE_HEIGHT,wt),w.pixelStorei(q.UNPACK_SKIP_PIXELS,On),w.pixelStorei(q.UNPACK_SKIP_ROWS,Nn),w.pixelStorei(q.UNPACK_SKIP_IMAGES,pn),ee===0&&P.generateMipmaps&&q.generateMipmap(Ue),w.unbindTexture()},this.initRenderTarget=function(v){K.get(v).__webglFramebuffer===void 0&&te.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?te.setTextureCube(v,0):v.isData3DTexture?te.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?te.setTexture2DArray(v,0):te.setTexture2D(v,0),w.unbindTexture()},this.resetState=function(){L=0,Z=0,j=null,w.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}const ti=Object.freeze({key:"key-to-winnie",book:"book-to-longroom",bell:"new-year-bell-to-winnie",tree:"tree-by-stair",petition:"petition-public-stair",recast:"recast-bell"}),Ft=n=>({op:"literal",value:n}),Pe=(n,e)=>({op:"ref",fact:{era:n,key:e}}),ye=(n,e,t)=>({op:"eq",left:Pe(n,e),right:Ft(t)}),fn=(n,e,t)=>({op:"if",condition:n,then:Ft(e),else:Ft(t)}),jt=(...n)=>({op:"all",args:n}),Nt=n=>({op:"not",arg:n}),ln={kind:"boolean"},St=(...n)=>({kind:"enum",values:n}),na=[],_p=[],mt=(n,e,t,i,o="author-chain",s="consequence")=>{na.push({address:{era:n,key:e},type:t,phase:s}),_p.push({id:`era${n}.${e}`,target:{era:n,key:e},expression:i,sourceId:o})};mt(0,"choices.available",ln,Ft(!0),"author-childhood","arrival");for(const n of["choice.bellWinnie","choice.treeStair"])na.push({address:{era:0,key:n},phase:"choice",type:ln});mt(0,"childhood.bellShared",ln,Pe(0,"choice.bellWinnie"),"author-childhood");mt(0,"tree.position",St("arch","stair"),fn(Pe(0,"choice.treeStair"),"stair","arch"),"author-childhood");mt(1,"childhood.bellShared",ln,Pe(0,"childhood.bellShared"),"author-childhood","arrival");mt(1,"tree.position",St("arch","stair"),Pe(0,"tree.position"),"author-childhood","arrival");mt(1,"choices.available",ln,Ft(!0),"author-chain","arrival");mt(1,"fire.tallowStored",ln,Ft(!0),"backstore-source","arrival");mt(1,"fire.transformerHot",ln,Ft(!0),"backstore-source","arrival");mt(1,"fire.happens",ln,jt(Pe(1,"fire.tallowStored"),Pe(1,"fire.transformerHot")),"author-fire","arrival");for(const n of["choice.keyWinnie","choice.bookLongroom"])na.push({address:{era:1,key:n},phase:"choice",type:ln});mt(1,"bellKey.holder",St("jonah","winnie"),fn(Pe(1,"choice.keyWinnie"),"winnie","jonah"));mt(1,"courtBook.keeper",St("winnie","jonah"),fn(Pe(1,"choice.bookLongroom"),"jonah","winnie"));mt(1,"fire.alarmTime",St("prompt","late"),fn(ye(1,"bellKey.holder","winnie"),"prompt","late"),"author-fire");mt(1,"workshop.fate",St("saved","burned"),fn(ye(1,"fire.alarmTime","prompt"),"saved","burned"),"author-fire");mt(1,"courtBook.lost",ln,jt(Pe(1,"fire.happens"),ye(1,"bellKey.holder","jonah"),ye(1,"courtBook.keeper","winnie")),"author-fire");mt(1,"friendship",St("close","strained","estranged"),fn(jt(ye(1,"bellKey.holder","winnie"),Nt(Pe(1,"childhood.bellShared"))),"estranged","close"));for(const[n,e]of[["workshop.fate",St("saved","burned")],["courtBook.keeper",St("winnie","jonah")],["courtBook.lost",ln],["fire.alarmTime",St("prompt","late")],["friendship",St("close","strained","estranged")],["childhood.bellShared",ln],["tree.position",St("arch","stair")]])mt(2,n,e,Pe(1,n),"author-chain","arrival");const Xn=ye(2,"workshop.fate","saved"),wp=Pe(2,"courtBook.lost");mt(2,"workshop.use",St("coop","garages"),fn(Xn,"coop","garages"));mt(2,"rope.state",St("polished","stub"),fn(Xn,"polished","stub"));mt(2,"plaque.present",ln,Xn);mt(2,"plaque.dedication",St("none","court","court-and-jonah"),{op:"if",condition:Xn,then:fn(ye(2,"friendship","close"),"court-and-jonah","court"),else:Ft("none")});mt(2,"tree.liftedSteps",ln,ye(2,"tree.position","stair"),"author-childhood");mt(2,"lintel.scorch",St("backwall","lintel"),fn(Xn,"backwall","lintel"));mt(2,"courtBook.location",St("workshop","longroom","none"),{op:"if",condition:wp,then:Ft("none"),else:fn(ye(2,"courtBook.keeper","jonah"),"longroom","workshop")});mt(2,"courtBook.entry",St("rang","didnotring","none"),{op:"if",condition:wp,then:Ft("none"),else:fn(Xn,"rang","didnotring")});mt(2,"winnie.memory",St("accurate","kind"),fn(Xn,"accurate","kind"),"winnie-memory");mt(2,"choices.available",ln,Ft(!0),"author-present","arrival");mt(2,"courtBook.publicUseRecorded",ln,Nt(Pe(1,"courtBook.lost")),"author-stair","arrival");mt(2,"bell.location",St("longroom"),Ft("longroom"),"author-bell","arrival");mt(2,"bell.crackedAt",St("fire-1958","frost-1991"),fn(ye(1,"fire.alarmTime","prompt"),"fire-1958","frost-1991"),"author-bell","arrival");for(const n of["choice.petitionPublic","choice.recastBell"])na.push({address:{era:2,key:n},phase:"choice",type:ln});mt(2,"stair.public",ln,jt(Pe(2,"choice.petitionPublic"),Pe(2,"courtBook.publicUseRecorded")),"author-stair");mt(2,"bell.future",St("ringing","stored"),fn(Pe(2,"choice.recastBell"),"ringing","stored"),"author-bell");for(const[n,e]of[["workshop.fate",St("saved","burned")],["courtBook.keeper",St("winnie","jonah")],["courtBook.lost",ln],["courtBook.entry",St("rang","didnotring","none")],["courtBook.publicUseRecorded",ln],["friendship",St("close","strained","estranged")],["tree.position",St("arch","stair")],["tree.liftedSteps",ln],["plaque.dedication",St("none","court","court-and-jonah")],["stair.public",ln],["bell.future",St("ringing","stored")],["bell.crackedAt",St("fire-1958","frost-1991")]])mt(3,n,e,Pe(2,n),"author-present","arrival");const Ni=ye(3,"workshop.fate","saved");mt(3,"workshop.use",St("cafe","garages"),fn(Ni,"cafe","garages"),"author-present");mt(3,"maya.business",St("cafe","bicycle-stall"),fn(Ni,"cafe","bicycle-stall"),"author-present");mt(3,"courtBook.location",St("cafe","library","none"),{op:"if",condition:Pe(3,"courtBook.lost"),then:Ft("none"),else:fn(ye(3,"courtBook.keeper","jonah"),"library","cafe")},"author-present");mt(3,"bell.location",St("bracket","cafe-window","storeroom"),{op:"if",condition:ye(3,"bell.future","ringing"),then:Ft("bracket"),else:fn(Ni,"cafe-window","storeroom")},"author-bell");mt(3,"bell.occasion",St("cafe-opening","court-reopening","silent"),{op:"if",condition:ye(3,"bell.future","ringing"),then:fn(Ni,"cafe-opening","court-reopening"),else:Ft("silent")},"author-bell");mt(3,"tree.occludesBracket",ln,ye(3,"tree.position","arch"),"author-childhood");mt(3,"stair.steps",St("level","repaired","lifted"),{op:"if",condition:Pe(3,"tree.liftedSteps"),then:fn(Pe(3,"stair.public"),"repaired","lifted"),else:Ft("level")},"author-stair");const kb=[{id:"author-present",kind:"authored",description:"The 2026 court inherits the adjacent 1991 history; a surviving workshop becomes Maya’s café, otherwise she runs a bicycle stall."},{id:"author-stair",kind:"authored",description:"A public-stair petition succeeds only with the surviving Court Book’s public-use record. Root damage prompts repair, not loss of an established right of way."},{id:"author-bell",kind:"authored",description:"The old bell cracked during the hard 1958 alarm, or the winter before the 1991 visit. Recasting takes place after the visit; storage preserves a silent object."},{id:"opening-source",kind:"document",description:"The present-day opening programme displayed in the courtyard."},{id:"petition-source",kind:"document",description:"The 1991 petition and its written disposition; distinguishes a request from a successful public-use claim."},{id:"stair-source",kind:"physical",description:"Public stair, gate and visible repairs to the bottom steps."},{id:"bell-repair-source",kind:"document",description:"The dated repair note and 1991 consignment instruction beside the old cracked bell."},{id:"bell-present-source",kind:"physical",description:"The recast bell or the stored cracked original, at its current inspectable location."},{id:"library-copy-source",kind:"document",description:"A labelled facsimile displayed in the Long Room; the Court Book original is held by the local library."},{id:"maya-account",kind:"belief",description:"Maya’s present-day account of her business and what her family told her; attributable testimony."},{id:"theo-account",kind:"belief",description:"Theo’s account of the stair and bell; attributable testimony, never an omniscient fact writer."},{id:"author-childhood",kind:"authored",description:"31 December 1926: Amos chooses the midnight ringer, and Ida plants a bare-root pear for Tom Hale. Childhood trust affects the later key conversation; tree placement affects the place, not the fire."},{id:"childhood-bell-source",kind:"physical",description:"The bell rope prepared for the coming midnight ceremony, not evidence that midnight has already happened."},{id:"pear-source",kind:"physical",description:"The memorial pear tree and its locally visible growth around arch or stair."},...["amos","ida","winnie","jonah"].map(n=>({id:`${n}-childhood-account`,kind:"belief",description:`${n}'s words on New Year's Eve 1926; testimony, not a world-fact writer.`})),{id:"author-chain",kind:"authored",description:"Joint authored causal chain; not a player observation."},{id:"author-fire",kind:"authored",description:"Workshop fire on the night of 14–15 November 1958, starting around 2 a.m. on the 15th. Key controls alarm, Book location controls survival."},{id:"key-source",kind:"physical",description:"The bell-rope key in March 1958."},{id:"book-source",kind:"document",description:"The Court Book, with a dated entry in Winnies hand."},{id:"workshop-source",kind:"physical",description:"Courtyard-facing workshop frontage and scorch marks."},{id:"rope-source",kind:"physical",description:"Bell rope and cleat."},{id:"plaque-source",kind:"physical",description:"Workshop wall, including whether a plate is visible."},{id:"tea-source",kind:"physical",description:"Tea laid on the gallery table."},{id:"echo-source",kind:"document",description:"Framed Aldermoor Echo report, 15 November 1958."},{id:"winnie-memory",kind:"belief",description:"Winnies 1991 recollection, kind and mistaken in the late-alarm history."},{id:"backstore-source",kind:"physical",description:"Tallow stock and the hot transformer in the March 1958 workshop back store."},{id:"cupboard-source",kind:"physical",description:"Visible contents of the Long Room cupboard in 1991."},{id:"stan-account",kind:"belief",description:"Stans recollection of carrying water on the fire night."},{id:"jonah-account",kind:"belief",description:"Jonahs own account of his absence and friendship."},{id:"winnie-account",kind:"belief",description:"Winnies 1991 words when shown a particular trace; testimony, not a world-fact writer."}],Nb={version:"court-b2-v2",eras:[0,1,2,3],facts:na,rules:_p,sources:kb,interventions:[{id:ti.petition,era:2,target:{era:2,key:"choice.petitionPublic"},availableWhen:Pe(2,"choices.available"),sourceId:"author-stair"},{id:ti.recast,era:2,target:{era:2,key:"choice.recastBell"},availableWhen:Pe(2,"choices.available"),sourceId:"author-bell"},{id:ti.bell,era:0,target:{era:0,key:"choice.bellWinnie"},availableWhen:Pe(0,"choices.available"),sourceId:"author-childhood"},{id:ti.tree,era:0,target:{era:0,key:"choice.treeStair"},availableWhen:Pe(0,"choices.available"),sourceId:"author-childhood"},{id:ti.key,era:1,target:{era:1,key:"choice.keyWinnie"},availableWhen:Pe(1,"choices.available"),sourceId:"author-chain"},{id:ti.book,era:1,target:{era:1,key:"choice.bookLongroom"},availableWhen:Pe(1,"choices.available"),sourceId:"author-chain"}]},fe=(n,e,t,i,...o)=>({id:n,when:e,text:t,grounding:o.map(s=>({era:i,key:s}))}),Ye=(n,e,t,i,o,s,r,a=Ft(!0),l)=>({id:n,era:e,zoneId:t,subjectId:i,sourceId:o,kind:s,availableWhen:a,variants:r,...l?{evidenceAny:l}:{}}),Xu=[fe("rang",ye(2,"courtBook.entry","rang"),"15 November 1958, in Winnie’s hand: “Rang at two. Twelve came. Back wall lost, bench saved.” An earlier entry records the stair and gallery as a public way for Court residents.",2,"courtBook.entry","courtBook.publicUseRecorded"),fe("didnotring",ye(2,"courtBook.entry","didnotring"),"15 November 1958, in Winnie’s hand: “The bell did not ring. Jonah was at Castle St. Nobody’s fault. W.H.” An earlier entry records the stair and gallery as a public way for Court residents.",2,"courtBook.entry","courtBook.publicUseRecorded")],Db=[Ye("bell-1926",0,"courtyard","bell-rope","childhood-bell-source","physical",[fe("amos",Nt(Pe(0,"childhood.bellShared")),"Amos has coiled the bell rope high on its cleat, ready for midnight. Winnie waits below it.",0,"childhood.bellShared"),fe("winnie",Pe(0,"childhood.bellShared"),"The rope hangs within Winnie’s reach. Amos has drawn a chalk mark where she should stand at midnight.",0,"childhood.bellShared")]),Ye("tree-1926",0,"courtyard","pear-tree","pear-source","physical",[fe("arch",ye(0,"tree.position","arch"),"A bare-root pear stands in fresh earth beside the arch. A wooden label reads “For Tom Hale, 1925”. Frost gathers on Ida’s spade.",0,"tree.position"),fe("stair",ye(0,"tree.position","stair"),"A bare-root pear stands beside the bottom stair, where Tom sat in the evenings. Its wooden label reads “For Tom Hale, 1925”.",0,"tree.position")]),Ye("amos-1926",0,"courtyard","amos-account","amos-childhood-account","testimony",[fe("office",Nt(Pe(0,"childhood.bellShared")),"“One false alarm emptied the works. The bell is an office, not a toy. My Jonah knows that.”",0,"childhood.bellShared"),fe("trust",Pe(0,"childhood.bellShared"),"“At midnight, Winnie. One pull when I nod. Your father knew how to make the whole Court listen.”",0,"childhood.bellShared")]),Ye("ida-1926",0,"courtyard","ida-account","ida-childhood-account","testimony",[fe("arch",ye(0,"tree.position","arch"),"“Tom rang the works bell from here. Amos says the roots will trouble the arch. Let them remember Tom first.”",0,"tree.position"),fe("stair",ye(0,"tree.position","stair"),"“He sat on that bottom step when his shift was done. A pear tree will give someone else shade there.”",0,"tree.position")]),Ye("winnie-1926",0,"courtyard","winnie-account","winnie-childhood-account","testimony",[fe("waiting",Nt(Pe(0,"childhood.bellShared")),"“Dad let me hold the end once. Amos says it doesn’t count. Jonah gets to do everything.”",0,"childhood.bellShared"),fe("chosen",Pe(0,"childhood.bellShared"),"“Midnight. He said midnight. Will you tell me when it’s nearly time? I don’t want to miss it.”",0,"childhood.bellShared")]),Ye("jonah-1926",0,"courtyard","jonah-account","jonah-childhood-account","testimony",[fe("family",Nt(Pe(0,"childhood.bellShared")),"“Dad says it’ll be my job one day. Winnie can watch beside me.”",0,"childhood.bellShared"),fe("shared",Pe(0,"childhood.bellShared"),"“Dad said she could. I’ll show her where to put her hands. It pulls harder than you think.”",0,"childhood.bellShared")]),Ye("tree-1958",1,"courtyard","pear-tree","pear-source","physical",[fe("arch",ye(1,"tree.position","arch"),"The pear’s bare branches reach beside the arch. Its old wooden dedication is held by a loose wire around the trunk.",1,"tree.position"),fe("stair",ye(1,"tree.position","stair"),"The pear has grown beside the stair. A thick root meets the lowest step; the dedication to Tom remains on the trunk.",1,"tree.position")]),Ye("tree-1991",2,"courtyard","pear-tree","pear-source","physical",[fe("arch",ye(2,"tree.position","arch"),"Pear branches cross the arch’s brickwork below the bell bracket. The public stair’s bottom steps lie level.",2,"tree.position","tree.liftedSteps"),fe("stair",ye(2,"tree.position","stair"),"Pear roots have lifted the bottom steps. Rain collects along their raised edges; the worn treads still lead up to the gallery.",2,"tree.position","tree.liftedSteps")]),Ye("key-1958",1,"courtyard","bell-key","key-source","physical",[fe("jonah",ye(1,"bellKey.holder","jonah"),"Jonah keeps the bell-rope key on his ring. “My father left it to me.”",1,"bellKey.holder"),fe("winnie",ye(1,"bellKey.holder","winnie"),"The bell-rope key lies beside Winnie’s bench. She works late, below the bell.",1,"bellKey.holder")]),Ye("book-1958",1,"workshop","court-book","book-source","document",[fe("workshop",ye(1,"courtBook.keeper","winnie"),"The Court Book lies open in the workshop office. Winnie adds today’s small repairs.",1,"courtBook.keeper"),fe("longroom",ye(1,"courtBook.keeper","jonah"),"A note on Winnie’s desk: “Court Book moved to Long Room cupboard. W.H.”",1,"courtBook.keeper")]),Ye("workshop-1991",2,"courtyard","workshop","workshop-source","physical",[fe("coop",Xn,"The co-op workshop is open. Fresh shavings lie beneath the back wall, still scorched, which was patched rather than rebuilt.",2,"workshop.use"),fe("garages",ye(2,"workshop.use","garages"),"Brick infill divides the old workshop frontage into lock-up garages.",2,"workshop.use")]),Ye("scorch-1991",2,"courtyard","fire-trace","workshop-source","physical",[fe("backwall",Xn,"A dark scorch survives on the workshop’s back wall; the old bench remains below it.",2,"lintel.scorch"),fe("lintel",ye(2,"lintel.scorch","lintel"),"A scorched timber lintel crosses one garage. New brickwork meets its blackened edge.",2,"lintel.scorch")]),Ye("rope-1991",2,"courtyard","bell-rope","rope-source","physical",[fe("polished",Xn,"The bell rope is smooth where a pair of hands has polished it. The cleat is clean.",2,"rope.state"),fe("stub",ye(2,"rope.state","stub"),"A cut rope stub hangs above a dusty cleat. This alone cannot tell you who rang it in 1958.",2,"rope.state")]),Ye("plaque-1991",2,"courtyard","workshop-plaque","plaque-source","physical",[fe("present",ye(2,"plaque.dedication","court"),"A brass plate reads: “To the Court, who came when the bell rang, 15.xi.58.”",2,"plaque.present","plaque.dedication"),fe("credited",ye(2,"plaque.dedication","court-and-jonah"),"A brass plate reads: “To the Court, who came when the bell rang — and to J.P., who gave the key. 15.xi.58.”",2,"plaque.present","plaque.dedication"),fe("absent",{op:"not",arg:Pe(2,"plaque.present")},"No commemorative plate is visible on the garage wall.",2,"plaque.present")]),Ye("book-workshop-1991",2,"workshop","court-book","book-source","document",Xu,ye(2,"courtBook.location","workshop")),Ye("book-longroom-1991",2,"longroom","court-book","book-source","document",Xu,ye(2,"courtBook.location","longroom")),Ye("echo-1991",2,"longroom","fire-report","echo-source","document",[fe("prompt",Xn,"Aldermoor Echo, 15 November 1958: “Courtyard bell raised the alarm at two. Residents’ bucket chain saved the workshop.”",2,"fire.alarmTime"),fe("late",ye(2,"fire.alarmTime","late"),"Aldermoor Echo, 15 November 1958: “Alarm raised by passers-by at 3.40. The courtyard bell remained silent; workshop and office destroyed.”",2,"fire.alarmTime")]),Ye("winnie-1991",2,"gallery","winnie-account","winnie-memory","testimony",[fe("accurate",jt(Xn,ye(2,"friendship","estranged")),"“I rang it myself. Twelve came. Jonah never forgave me the key.”",2,"winnie.memory","friendship"),fe("reconciled",jt(Xn,ye(2,"friendship","close")),"“I rang it myself. Twelve came. He gave me the key. I never let him forget it was his to give.”",2,"winnie.memory","friendship"),fe("kind",jt(ye(2,"winnie.memory","kind"),Nt(Pe(2,"childhood.bellShared"))),"“Jonah rang the bell the moment he saw the smoke. Nobody could have done more.”",2,"winnie.memory","childhood.bellShared"),fe("kind-shared",jt(ye(2,"winnie.memory","kind"),Pe(2,"childhood.bellShared")),"“He’d have rung it if he’d been here. He knew how. So did I.”",2,"winnie.memory","childhood.bellShared")]),Ye("jonah-saved-1991",2,"longroom","jonah-account","jonah-account","testimony",[fe("regret",jt(ye(2,"friendship","estranged"),ye(2,"courtBook.keeper","winnie")),"“She was right to have it. I didn’t say so.”",2,"friendship","courtBook.keeper"),fe("regret-book",jt(ye(2,"friendship","estranged"),ye(2,"courtBook.keeper","jonah")),"“She was right to have it. I didn’t say so.” Then: “The Book’s in our cupboard. Always was the Court’s, not hers.”",2,"friendship","courtBook.keeper"),fe("shared",ye(2,"friendship","close"),"“She’d rung it before. Dad let her, once. I just remembered that in time.”",2,"friendship","childhood.bellShared")],Xn,[{inspectionId:"plaque-1991",variantId:"present"},{inspectionId:"plaque-1991",variantId:"credited"},{inspectionId:"echo-1991",variantId:"prompt"},{inspectionId:"rope-1991",variantId:"polished"},{inspectionId:"book-workshop-1991"},{inspectionId:"book-longroom-1991",variantId:"rang"}]),Ye("stan-1991",2,"courtyard","stan-account","stan-account","testimony",[fe("bucket-chain",Ft(!0),"“I carried water from the pump till I couldn’t feel my hands.”",2,"fire.alarmTime")],ye(2,"fire.alarmTime","prompt")),Ye("winnie-book-1991",2,"gallery","winnie-account","winnie-memory","testimony",[fe("lost-book",Ft(!0),"“The Book went in the fire. It was on my desk, in the workshop office.”",2,"courtBook.location","courtBook.lost")],ye(2,"courtBook.location","none")),Ye("cupboard-1991",2,"longroom","court-cupboard","cupboard-source","physical",[fe("no-book",Ft(!0),"Rent books stand beside a wrapped bell clapper. The shelf has no green Court Book; an empty shelf alone cannot tell you where it went.",2,"courtBook.location")],{op:"not",arg:ye(2,"courtBook.location","longroom")}),Ye("backstore-1958",1,"workshop","workshop-backstore","backstore-source","physical",[fe("stock-and-transformer",Ft(!0),"Old tallow stock is stacked beneath the transformer. Its casing gives off heat and a strained hum.",1,"fire.tallowStored","fire.transformerHot")]),Ye("jonah-admission-1991",2,"longroom","jonah-account","jonah-account","testimony",[fe("admission",Ft(!0),"“I wasn’t here. I let her tell it her way.”",2,"fire.alarmTime","friendship")],ye(2,"fire.alarmTime","late"),[{inspectionId:"echo-1991",variantId:"late"},{inspectionId:"book-longroom-1991",variantId:"didnotring"}]),Ye("jonah-on-book-1991",2,"longroom","jonah-on-book","jonah-account","testimony",[fe("didnotring",ye(2,"courtBook.entry","didnotring"),"“Nobody’s fault. She wrote that the same night. And then she told everyone I rang it.” Then: “Thirty-three years she’s carried that for me.”",2,"courtBook.entry","winnie.memory"),fe("rang",ye(2,"courtBook.entry","rang"),"“She didn’t put my name in it. She could have — ‘Jonah was at Castle Street.’ She left it out.”",2,"courtBook.entry","courtBook.publicUseRecorded")],{op:"not",arg:ye(2,"courtBook.entry","none")},[{inspectionId:"book-longroom-1991",variantId:"didnotring"},{inspectionId:"book-longroom-1991",variantId:"rang"},{inspectionId:"book-workshop-1991",variantId:"rang"}]),Ye("jonah-on-echo-1991",2,"longroom","jonah-on-echo","jonah-account","testimony",[fe("alarm",Ft(!0),"“Twelve came. I read that on the late train back from Castle Street. Half the names I’d collected rent from that night had been on her bucket chain.”",2,"fire.alarmTime")],ye(2,"fire.alarmTime","prompt"),[{inspectionId:"echo-1991",variantId:"prompt"}]),Ye("jonah-on-rope-1991",2,"longroom","jonah-on-rope","jonah-account","testimony",[fe("stub",ye(2,"rope.state","stub"),"“Council cut it in ’72. Nobody’d rung it since the fire anyway.”",2,"rope.state"),fe("polished",ye(2,"rope.state","polished"),"“One pair of hands. She’s never let anyone else ring it.”",2,"rope.state")],Ft(!0),[{inspectionId:"rope-1991"}]),Ye("jonah-on-fire-damage-1991",2,"longroom","jonah-on-fire-damage","jonah-account","testimony",[fe("lintel",Ft(!0),"“Tallow and a bad transformer. The insurers had a word for it. I had a few others.”",2,"lintel.scorch")],ye(2,"lintel.scorch","lintel"),[{inspectionId:"scorch-1991",variantId:"lintel"}]),Ye("jonah-on-plaque-1991",2,"longroom","jonah-on-plaque","jonah-account","testimony",[fe("paid",ye(2,"plaque.dedication","court"),"“I paid for that plate. She doesn’t know.”",2,"plaque.present","plaque.dedication"),fe("credited",ye(2,"plaque.dedication","court-and-jonah"),"“J.P. She insisted. All I did was give her a key. She was the one who stayed.”",2,"plaque.present","plaque.dedication")],Pe(2,"plaque.present"),[{inspectionId:"plaque-1991",variantId:"present"},{inspectionId:"plaque-1991",variantId:"credited"}]),Ye("winnie-on-echo-1991",2,"gallery","winnie-on-echo","winnie-account","testimony",[fe("late",jt(ye(2,"fire.alarmTime","late"),Nt(Pe(2,"childhood.bellShared"))),"She folds it along its old crease. “Papers get things wrong.” A pause. “Not that, though.”",2,"fire.alarmTime","winnie.memory"),fe("prompt",ye(2,"fire.alarmTime","prompt"),"“They spelled Stan’s name wrong. He never minded.”",2,"fire.alarmTime")],{op:"any",args:[ye(2,"fire.alarmTime","prompt"),Nt(Pe(2,"childhood.bellShared"))]},[{inspectionId:"echo-1991"}]),Ye("winnie-on-book-1991",2,"gallery","winnie-on-book","winnie-account","testimony",[fe("didnotring",jt(ye(2,"courtBook.entry","didnotring"),Nt(Pe(2,"childhood.bellShared"))),"She reads her own hand for a long time. “I wrote that the next morning. I’d forgotten I was fair to him.” Then: “Don’t tell him I told it the other way. He knows.”",2,"courtBook.entry","winnie.memory"),fe("rang",ye(2,"courtBook.entry","rang"),"“Twelve. I counted them twice.”",2,"courtBook.entry","courtBook.publicUseRecorded")],{op:"any",args:[ye(2,"courtBook.entry","rang"),jt(ye(2,"courtBook.entry","didnotring"),Nt(Pe(2,"childhood.bellShared")))]},[{inspectionId:"book-longroom-1991"},{inspectionId:"book-workshop-1991"}]),Ye("winnie-on-rope-1991",2,"gallery","winnie-on-rope","winnie-account","testimony",[fe("stub",Ft(!0),"“I used to stand under it and wait for somebody to let me.”",2,"rope.state","childhood.bellShared")],jt(ye(2,"rope.state","stub"),Nt(Pe(2,"childhood.bellShared"))),[{inspectionId:"rope-1991",variantId:"stub"}]),Ye("winnie-on-plaque-1991",2,"gallery","winnie-on-plaque","winnie-account","testimony",[fe("court",ye(2,"plaque.dedication","court"),"“The Court paid for that. Everyone put in.”",2,"plaque.dedication"),fe("credited",ye(2,"plaque.dedication","court-and-jonah"),"“He gave me the key. I made them put his initials on it. He pretended to mind.”",2,"plaque.dedication","friendship")],Pe(2,"plaque.present"),[{inspectionId:"plaque-1991",variantId:"present"},{inspectionId:"plaque-1991",variantId:"credited"}]),Ye("friendship-1991",2,"gallery","gallery-tea","tea-source","physical",[fe("one",ye(2,"friendship","estranged"),"One cup is laid on Winnie’s gallery table. Jonah passes beneath without looking up.",2,"friendship"),fe("two",ye(2,"friendship","close"),"Two cups wait on the gallery table. Winnie calls down to Jonah that the tea is ready.",2,"friendship")]),Ye("petition-1991",2,"longroom","stair-petition","petition-source","document",[fe("unsigned",Nt(Pe(2,"choice.petitionPublic")),"A petition to keep the stair public lies unsigned beside the gate plan. The form asks for a written record of residents’ use.",2,"choice.petitionPublic"),fe("supported",jt(Pe(2,"choice.petitionPublic"),Pe(2,"courtBook.publicUseRecorded")),"The signed petition includes a copy of the Court Book’s old public-way entry. A note asks that unsafe steps be repaired without closing the route.",2,"choice.petitionPublic","courtBook.publicUseRecorded"),fe("unsupported",jt(Pe(2,"choice.petitionPublic"),Nt(Pe(2,"courtBook.publicUseRecorded"))),"The petition is signed. Its evidence box is empty: no surviving Court Book entry can be attached. A signature alone does not establish the right of way.",2,"choice.petitionPublic","courtBook.publicUseRecorded")]),Ye("winnie-petition-1991",2,"gallery","winnie-petition","winnie-account","testimony",[fe("unsupported",jt(Pe(2,"choice.petitionPublic"),Nt(Pe(2,"courtBook.publicUseRecorded"))),"“They wanted it in writing. It was all written down once.”",2,"choice.petitionPublic","courtBook.publicUseRecorded"),fe("supported",jt(Pe(2,"choice.petitionPublic"),Pe(2,"courtBook.publicUseRecorded")),"“That’s the Book’s own page. It’s all written down.”",2,"choice.petitionPublic","courtBook.publicUseRecorded"),fe("unsigned",Nt(Pe(2,"choice.petitionPublic")),"“I’ve drawn up a petition. It’s on his table in the Long Room. It wants signing and taking in by the thirtieth, and my knees won’t do that stair in the wet.”",2,"choice.petitionPublic")]),Ye("jonah-stair-1991",2,"longroom","jonah-stair-reasons","jonah-account","testimony",[fe("lifted",Pe(2,"tree.liftedSteps"),"“The council wants a gate on that stair, and so do my insurers. One bad fall on those steps and I lose the building. The pear’s had the bottom three up for years. You’ll have seen them.”",2,"tree.liftedSteps"),fe("level",Nt(Pe(2,"tree.liftedSteps")),"“The council wants a gate on that stair, and so do my insurers. One bad fall on those steps and I lose the building. Eight flats, and a public stair nobody is responsible for. You see the problem.”",2,"tree.liftedSteps")]),Ye("winnie-stair-1991",2,"gallery","winnie-stair-reasons","winnie-account","testimony",[fe("close",ye(2,"friendship","close"),"“It’s been the Court’s way up since the candle works. My dad sat on that bottom step every night of his life. Jonah says it’s the insurers. It is the insurers. He’s not a bad man, he’s a careful one.”",2,"friendship"),fe("estranged",ye(2,"friendship","estranged"),"“It’s been the Court’s way up since the candle works. My dad sat on that bottom step every night of his life. Jonah says it’s the insurers. Jonah always has a reason.”",2,"friendship")]),Ye("jonah-bell-1991",2,"longroom","jonah-bell-reasons","jonah-account","testimony",[fe("cost",Ft(!0),"“The foundry’ll recast it. New metal, same bell, same name on it. It’d cost me more than the gate. And a new bell tells everyone the old one cracked on a Pell’s watch. Folk will ask how.”",2,"bell.location","bell.crackedAt")]),Ye("winnie-bell-1991",2,"gallery","winnie-bell-reasons","winnie-account","testimony",[fe("alarm",ye(2,"bell.crackedAt","fire-1958"),"“They had it down in March. It cracked the night I rang it for the fire. It’s rung cracked ever since. I never minded. Jonah’s to decide whether it’s recast. It’s his money. Go and tell him what you think.”",2,"bell.location","bell.crackedAt"),fe("frost",ye(2,"bell.crackedAt","frost-1991"),"“They had it down in March. It cracked in the frost. Nobody’s rung it since the fire, and a bell that isn’t rung goes to nothing. Jonah’s to decide whether it’s recast. It’s his money. Go and tell him what you think.”",2,"bell.location","bell.crackedAt")]),Ye("bell-longroom-1991",2,"longroom","cracked-bell","bell-present-source","physical",[fe("down",Ft(!0),"The old Court bell rests on sacking by the Long Room’s south wall. Its lip is cracked; the bracket over the arch is bare. The bell is still here while its future is being decided.",2,"bell.location","bell.crackedAt")]),Ye("bell-repair-1991",2,"longroom","bell-repair-note","bell-repair-source","document",[fe("alarm",ye(2,"bell.crackedAt","fire-1958"),"The repair note identifies a crack after the hard alarm of 15 November 1958. The old bell awaits a decision: send it to be recast, or keep it silent.",2,"bell.crackedAt"),fe("frost",ye(2,"bell.crackedAt","frost-1991"),"The repair note dates the crack to this past winter’s frost. The old bell awaits a decision: send it to be recast, or keep it silent.",2,"bell.crackedAt")]),Ye("bell-consignment-1991",2,"longroom","bell-consignment","bell-repair-source","document",[fe("recast",Pe(2,"choice.recastBell"),"The consignment is signed: send the cracked bell to the foundry for recasting. The collection date is still ahead; no replacement has arrived.",2,"choice.recastBell"),fe("store",Nt(Pe(2,"choice.recastBell")),"A label says to wrap and keep the cracked original. The foundry’s recasting form remains unsigned.",2,"choice.recastBell")]),Ye("workshop-2026",3,"courtyard","workshop","workshop-source","physical",[fe("cafe",Ni,"Maya’s café occupies the old workshop. The patched back wall and a strip of scorched timber remain beside the counter.",3,"workshop.use"),fe("garages",Nt(Ni),"The old frontage is still divided into garages. Beneath the arch, Maya’s bicycle tools hang above a folding repair stand.",3,"workshop.use","maya.business")]),Ye("stair-2026",3,"courtyard","public-stair","stair-source","physical",[fe("public",Pe(3,"stair.public"),"The foot of the stair is open. A small sign reads “Public way — please leave clear”.",3,"stair.public"),fe("gated",Nt(Pe(3,"stair.public")),"A locked gate spans the foot of the stair. A sign says “Residents only”.",3,"stair.public")]),Ye("stair-record-2026",3,"longroom","stair-record","petition-source","document",[fe("public",Pe(3,"stair.public"),"The 1991 decision preserves public use of the stair, citing the petition and the Court Book’s earlier public-way entry. Repairs are required where the steps are unsafe.",3,"stair.public","courtBook.publicUseRecorded"),fe("gated-with-book",jt(Nt(Pe(3,"stair.public")),Pe(3,"courtBook.publicUseRecorded")),"The 1991 file approved the gate plan. No public-stair petition was submitted. The old Court Book entry was not put before the meeting.",3,"stair.public","courtBook.publicUseRecorded"),fe("gated-without-book",jt(Nt(Pe(3,"stair.public")),Nt(Pe(3,"courtBook.publicUseRecorded"))),"The 1991 file approved the gate plan. It records no surviving written evidence of public use; the lost Court Book could not be consulted.",3,"stair.public","courtBook.publicUseRecorded")]),Ye("tree-2026",3,"courtyard","pear-tree","pear-source","physical",[fe("arch",Pe(3,"tree.occludesBracket"),"Summer pear leaves cover the bell bracket from below. The tree’s old dedication to Tom Hale is almost grown into its trunk. The gallery offers another angle.",3,"tree.position","tree.occludesBracket"),fe("stair-repaired",jt(ye(3,"tree.position","stair"),ye(3,"stair.steps","repaired")),"The pear stands beside the stair. New stone has been laid around its thick roots, leaving the public steps level.",3,"tree.position","stair.steps"),fe("stair-lifted",jt(ye(3,"tree.position","stair"),ye(3,"stair.steps","lifted")),"The pear’s roots still lift the bottom steps behind the gate. A worn label on the trunk remembers Tom Hale.",3,"tree.position","stair.steps")]),Ye("bell-bracket-2026",3,"gallery","bell-bracket-view","bell-present-source","physical",[fe("ringing",ye(3,"bell.location","bracket"),"From the gallery, the bell is visible on the old bracket. Its new casting carries the date 1991; a rope reaches down beside the arch.",3,"bell.location","bell.future"),fe("empty",Nt(ye(3,"bell.location","bracket")),"From the gallery, the old bracket is plainly empty. The bare hook does not tell you where the bell went.",3,"bell.location")],Pe(3,"stair.public")),Ye("bell-bracket-yard-2026",3,"courtyard","bell-bracket-yard-view","bell-present-source","physical",[fe("ringing",ye(3,"bell.location","bracket"),"From the courtyard, the bell is visible on the old bracket above the arch. Its new casting carries the date 1991; a rope reaches down beside the arch.",3,"bell.location","bell.future","tree.occludesBracket"),fe("empty",Nt(ye(3,"bell.location","bracket")),"From the courtyard, the old bracket above the arch is plainly empty. The bare hook does not tell you where the bell went.",3,"bell.location","tree.occludesBracket")],Nt(Pe(3,"tree.occludesBracket"))),Ye("plaque-2026",3,"courtyard","workshop-plaque","plaque-source","physical",[fe("present",ye(3,"plaque.dedication","court"),"The old brass plate beside Maya’s café reads: “To the Court, who came when the bell rang, 15.xi.58.”",3,"plaque.dedication"),fe("credited",ye(3,"plaque.dedication","court-and-jonah"),"The old brass plate beside Maya’s café reads: “To the Court, who came when the bell rang — and to J.P., who gave the key. 15.xi.58.”",3,"plaque.dedication"),fe("absent",ye(3,"plaque.dedication","none"),"No commemorative plate is visible on the garage wall.",3,"plaque.dedication")]),Ye("bell-window-2026",3,"workshop","stored-bell","bell-present-source","physical",[fe("stored",Ft(!0),"The old bell stands in Maya’s café window. A crack crosses its lip; its clapper has been tied still. The display label says “Original Court bell — kept, not recast”.",3,"bell.location","bell.future")],ye(3,"bell.location","cafe-window")),Ye("bell-storeroom-2026",3,"longroom","stored-bell","bell-present-source","physical",[fe("stored",Ft(!0),"The cracked bell rests on a padded shelf in Theo’s storeroom, off the Long Room. The wrapping is marked “Keep original”. Nothing here can ring it.",3,"bell.location","bell.future")],ye(3,"bell.location","storeroom")),Ye("opening-notice-2026",3,"courtyard","opening-notice","opening-source","document",[fe("cafe",ye(3,"bell.occasion","cafe-opening"),"Today: Maya’s café opens. The notice invites the Court to gather under the recast bell for its opening peal.",3,"bell.occasion","maya.business"),fe("court",ye(3,"bell.occasion","court-reopening"),"Today: the Court reopens. The notice invites neighbours to gather under the arch for a peal from the recast bell, beside Maya’s bicycle stall.",3,"bell.occasion","maya.business"),fe("silent-cafe",jt(ye(3,"bell.occasion","silent"),Ni),"Today: Maya’s café opens. A handwritten addition invites neighbours to see the old bell in the window.",3,"bell.occasion","maya.business"),fe("silent-stall",jt(ye(3,"bell.occasion","silent"),Nt(Ni)),"Today: the Court reopens. Maya offers free bicycle checks beneath the arch. There is no bell peal on the programme.",3,"bell.occasion","maya.business")]),Ye("book-cafe-2026",3,"workshop","court-book","book-source","document",[fe("original",Ft(!0),"The original green Court Book is kept behind Maya’s counter. “Rang at two. Twelve came. Back wall lost, bench saved.” Its earlier public-way entry records the stair and gallery for Court residents.",3,"courtBook.location","courtBook.entry","courtBook.publicUseRecorded")],ye(3,"courtBook.location","cafe")),Ye("book-copy-2026",3,"longroom","court-book-facsimile","library-copy-source","document",[fe("rang",ye(3,"courtBook.entry","rang"),"Label: “Chandler’s Court Book, 1931–1962, deposited by T. Pell. Facsimile — original Court Book held by the local library.” The copy reads “Rang at two. Twelve came. Back wall lost, bench saved”, alongside the old public-way entry.",3,"courtBook.location","courtBook.entry","courtBook.publicUseRecorded"),fe("didnotring",ye(3,"courtBook.entry","didnotring"),"Label: “Chandler’s Court Book, 1931–1962, deposited by T. Pell. Facsimile — original Court Book held by the local library.” The copy reads “The bell did not ring. Jonah was at Castle St. Nobody’s fault. W.H.”, alongside the old public-way entry.",3,"courtBook.location","courtBook.entry","courtBook.publicUseRecorded")],ye(3,"courtBook.location","library")),Ye("maya-2026",3,"courtyard","maya-account","maya-account","testimony",[fe("cafe",Ni,"“Nan’s bench was along that wall. We kept the scorch when we put the counter in. It seemed wrong to paint over the reason we still had a place.”",3,"maya.business"),fe("stall",Nt(Ni),"“Nan’s workshop was where those garages are. I mend bikes out here. She’d have had something to say about working in the rain.”",3,"maya.business")]),Ye("maya-stair-2026",3,"courtyard","maya-stair-account","maya-account","testimony",[fe("public",Pe(3,"stair.public"),"“Public way. Always has been, apparently. People cut through to the flats all day.”",3,"stair.public"),fe("unsupported",jt(Nt(Pe(3,"stair.public")),Pe(2,"choice.petitionPublic")),"“Nan always said the stair was ours. Nobody could prove it.”",3,"stair.public","courtBook.publicUseRecorded"),fe("unsigned",jt(Nt(Pe(3,"stair.public")),Nt(Pe(2,"choice.petitionPublic"))),"“Theo keeps the gate locked. He’ll let you up if you ask. Nan never asked.”",3,"stair.public")]),Ye("theo-2026",3,"longroom","theo-account","theo-account","testimony",[fe("public",Pe(3,"stair.public"),"“Grandad wanted the gate. The Court had their book and their signatures. We repaired the steps; people still come through.”",3,"stair.public"),fe("gated",Nt(Pe(3,"stair.public")),"“Grandad said the gate was about safety. The papers are here if you want his reasons. I wasn’t at that meeting.”",3,"stair.public")])];function el(n,e,t){const i=n.eras.find(o=>o.era===e)?.facts.find(o=>o.address.key===t);if(!i)throw new Error(`Missing evaluated fact ${e}:${t}`);return i.value}function Il(n){const e=(t,i)=>el(n,t,i);return{e1926:{bellShared:e(0,"childhood.bellShared")===!0,treePosition:e(0,"tree.position")},e1958:{bellKeyHolder:e(1,"bellKey.holder"),courtBookKeeper:e(1,"courtBook.keeper"),childhoodBellShared:e(1,"childhood.bellShared")===!0,treePosition:e(1,"tree.position")},e1991:{workshopUse:e(2,"workshop.use"),ropeState:e(2,"rope.state"),plaquePresent:e(2,"plaque.present")===!0,plaqueDedication:e(2,"plaque.dedication"),scorch:e(2,"lintel.scorch"),courtBookLocation:e(2,"courtBook.location"),friendship:e(2,"friendship"),bucketChain:e(2,"fire.alarmTime")==="prompt",treePosition:e(2,"tree.position"),liftedSteps:e(2,"tree.liftedSteps")===!0},d1991:{petitionSigned:e(2,"choice.petitionPublic")===!0,recastSigned:e(2,"choice.recastBell")===!0,publicUseRecorded:e(2,"courtBook.publicUseRecorded")===!0,bellCrackedAt:e(2,"bell.crackedAt")},e2026:{workshopUse:e(3,"workshop.use"),mayaBusiness:e(3,"maya.business"),stairPublic:e(3,"stair.public")===!0,stairSteps:e(3,"stair.steps"),courtBookLocation:e(3,"courtBook.location"),courtBookEntry:e(3,"courtBook.entry"),bellLocation:e(3,"bell.location"),bellOccasion:e(3,"bell.occasion"),treeOccludesBracket:e(3,"tree.occludesBracket")===!0,plaqueDedication:e(3,"plaque.dedication"),treePosition:e(3,"tree.position"),friendship:e(3,"friendship")}}}function ia(n,e){return n===0?e.e1926.treePosition:n===1?e.e1958.treePosition:n===2?e.e1991.treePosition:e.e2026.treePosition}function hd(n,e){return n===0||n===1||(n===2?e.e1991.workshopUse==="coop":e.e2026.workshopUse==="cafe")}function Ub(n,e){return n!==3||e.e2026.stairPublic}const Ii={x0:-10,x1:10,z0:-8,z1:8},ht={x0:-1.6,x1:1.6,depth:3.5,height:3.6},We={x0:2,x1:10,z0:-14,z1:-8,door:[3,4.2],window:[4.7,9.5]},Ns=[[3,5.1],[5.4,7.5],[7.8,9.8]],Ve={x0:7,x1:10,z0:-14,z1:-11,door:[7.6,8.6]},At={x0:10,x1:16,z0:-6,z1:4,door:[-1.7,-.3]},hn={x0:11.2,x1:15.7,z0:4,z1:6.8,door:[13,14.2]},zt={x0:2.28,x1:2.46,z0:6.55,z1:8,y1:2.1},nt={x0:2.5,x1:8.4,z0:6.6,z1:8},Ae=3.2,Wt={x0:2,x1:10,z0:-8,z1:-6.4},qn={x0:8.4,x1:10,z0:-8,z1:8},Jt={x:-4,z:1.2},nr={arch:{x:-4.4,z:-5.4},stair:{x:1.3,z:6.45}},Mp=nr.arch,bt={x:1.82,z:-7.8},Gn={x:2.5,z:-7.83},ri=6.6,_h=n=>Math.max(0,Math.min(Ae,(n-nt.x0)/(nt.x1-nt.x0)*Ae));function zb(n,e={}){const t=[{...Ii,y:0},{x0:ht.x0,x1:ht.x1,z0:-8-ht.depth,z1:-8,y:0},{x0:At.x0-.4,x1:At.x1,z0:At.z0,z1:At.z1,y:0},{x0:nt.x0,x1:nt.x1,z0:nt.z0,z1:nt.z1,y:i=>_h(i),solid:!0},{x0:nt.x1,x1:10,z0:nt.z0,z1:nt.z1,y:Ae,solid:!0},{...qn,y:Ae},{...Wt,y:Ae}];return n&&t.push({x0:We.x0,x1:We.x1,z0:We.z0,z1:We.z1+.4,y:0}),e.storeroom&&t.push({x0:hn.x0,x1:hn.x1,z0:hn.z0-.4,z1:hn.z1,y:0}),t}const Fr=9;function jn(n,e,t,i,o=[],s=0,r=Fr,a=.3,l){let c=t;for(const[d,u]of[...o].sort((f,h)=>f[0]-h[0]))d>c&&n.push({x0:c,x1:d,z0:e-a/2,z1:e+a/2,y0:s,y1:r,tag:l}),c=Math.max(c,u);c<i&&n.push({x0:c,x1:i,z0:e-a/2,z1:e+a/2,y0:s,y1:r,tag:l})}function Qn(n,e,t,i,o=[],s=0,r=Fr,a=.3,l){let c=t;for(const[d,u]of[...o].sort((f,h)=>f[0]-h[0]))d>c&&n.push({x0:e-a/2,x1:e+a/2,z0:c,z1:d,y0:s,y1:r,tag:l}),c=Math.max(c,u);c<i&&n.push({x0:e-a/2,x1:e+a/2,z0:c,z1:i,y0:s,y1:r,tag:l})}const _r=(n,e,t,i,o=0,s=2,r)=>({x0:n-t/2,x1:n+t/2,z0:e-i/2,z1:e+i/2,y0:o,y1:s,tag:r}),Sp=[[2.2,-6.5],[5.2,-6.5],[8.5,-6.5],[8.5,-3],[8.5,.6],[8.5,4.2]];function Ob(n,e=Mp,t=.5,i={}){const o=[];jn(o,-8,-10,10,n?[[ht.x0,ht.x1],[We.door[0],We.door[1]]]:[[ht.x0,ht.x1]],0,Ae-.1),jn(o,-8,-10,10,[],Ae+.1+1.9,Fr),jn(o,-8.15,-10,2,[[ht.x0,ht.x1]],Ae-.1,Ae+2.1),jn(o,-8,2,10,[],Ae-.1,Ae+2.1),Qn(o,10,-8,8,[[At.door[0],At.door[1]]],0,Ae-.1),Qn(o,10.15,-8,8,[],Ae-.1,Fr),jn(o,8,-10,10),Qn(o,-10,-8,8),Qn(o,ht.x0,-8-ht.depth,-8),Qn(o,ht.x1,-8-ht.depth,-8),jn(o,-8-ht.depth+.2,ht.x0,ht.x1,[],0,Fr,.3,"street"),n&&(jn(o,We.z0,We.x0,We.x1),Qn(o,We.x0,We.z0,We.z1),Qn(o,We.x1,We.z0,We.z1),Qn(o,Ve.x0,Ve.z0,Ve.z1),jn(o,Ve.z1,Ve.x0,Ve.x1,[[Ve.door[0],Ve.door[1]]],0,2.4),o.push(_r(5.4,-13.4,3,.8,0,1,"bench"))),Qn(o,At.x1,At.z0,At.z1),jn(o,At.z0,At.x0+.3,At.x1),jn(o,At.z1,At.x0+.3,At.x1,i.storeroom?[[hn.door[0],hn.door[1]]]:[]),i.storeroom&&(jn(o,hn.z1,hn.x0,hn.x1),Qn(o,hn.x0,hn.z0,hn.z1),Qn(o,hn.x1,hn.z0,hn.z1)),o.push(_r(13,-1,1.2,4.6,0,.9,"table")),jn(o,nt.z0,nt.x0+.3,nt.x1,[],.2,Ae+1.1,.12),jn(o,Wt.z1,Wt.x0,qn.x0,[],Ae+.05,Ae+1.1,.12),Qn(o,Wt.x0,Wt.z0,Wt.z1,[],Ae+.05,Ae+1.1,.12),Qn(o,qn.x0,Wt.z1,nt.z0,[],Ae+.05,Ae+1.1,.12);for(const[s,r]of Sp)o.push(_r(s,r,.24,.24,0,Ae));return o.push(_r(Jt.x,Jt.z,.7,.7,0,1.6,"pump")),e&&o.push(_r(e.x,e.z,t,t,0,3,"tree")),o}function uo(n,e,t){return e>2.2?"gallery":n>At.x0-.1?"longroom":t<-7.9&&n>We.x0?"workshop":"courtyard"}const wh={courtyard:"The courtyard",workshop:"The workshop",longroom:"The Long Room",gallery:"The gallery"},Tp=[{id:"yard",label:"The yard, by the south houses",zone:"courtyard",x:-1.2,y:0,z:5.6,yaw:-.18,pitch:.06},{id:"arch",label:"Under the bell",zone:"courtyard",x:.7,y:0,z:-4.4,yaw:-.22,pitch:.3},{id:"workshop",label:"The workshop",zone:"workshop",x:4.2,y:0,z:-9.2,yaw:.1,pitch:-.05},{id:"garages",label:"The workshop front",zone:"courtyard",x:5.8,y:0,z:-3.2,yaw:0,pitch:.12},{id:"anchor",label:"The Long Room door",zone:"courtyard",x:8.9,y:0,z:-1,yaw:-Math.PI/2,pitch:0},{id:"longroom",label:"The Long Room",zone:"longroom",x:12.2,y:0,z:2.2,yaw:.5,pitch:0},{id:"gallery",label:"The gallery, Winnie's door",zone:"gallery",x:9.1,y:Ae,z:-5,yaw:1.2,pitch:-.08},{id:"stair",label:"The foot of the public stair",zone:"courtyard",x:-.9,y:0,z:4.1,yaw:-2.2,pitch:.08}],Zs=n=>Tp.find(e=>e.id===n),Fb={courtyard:{id:"enter-courtyard",label:"from the arch",zone:"courtyard",x:.45,y:0,z:-8.9,yaw:Math.PI,pitch:.04},workshop:{id:"enter-workshop",label:"just inside the door",zone:"workshop",x:3.6,y:0,z:-8.9,yaw:0,pitch:0},longroom:{id:"enter-longroom",label:"just inside the door",zone:"longroom",x:10.6,y:0,z:-1,yaw:-Math.PI/2,pitch:0},gallery:{id:"enter-gallery",label:"at the head of the public stair",zone:"gallery",x:9.2,y:Ae,z:7.3,yaw:0,pitch:-.04}},ai={0:{amos:{x:3.1,y:0,z:-6.1,facing:Math.PI-.5},winnie:{x:1.75,y:0,z:-7.05,facing:Math.PI-.2},jonah:{x:2.6,y:0,z:-5.5,facing:Math.PI+.3},ida:{x:-3.7,y:0,z:-4.7,facing:.95}},1:{jonah:{x:3,y:0,z:-5.3,facing:-1.95},winnie:{x:4.35,y:0,z:-5.2,facing:2},neighbour:{x:Jt.x+.1,y:0,z:Jt.z+1.25,facing:Math.PI},child:{x:-3,y:0,z:-3.8,facing:-.8}},2:{winnie:{x:6.75,y:Ae,z:-7.6,facing:Math.PI,seated:!0},jonah:{x:13.7,y:0,z:1.4,facing:2.6},stan:{x:5,y:0,z:-7,facing:Math.PI-.3,seated:!0},teen:{x:-6.5,y:0,z:7.35,facing:.1}},3:{maya:{x:-.95,y:0,z:-8.7,facing:2.7},theo:{x:13.75,y:0,z:1.5,facing:2.5},customer:{x:8.05,y:0,z:-5.75,facing:Math.PI/2,seated:!0},neighbour:{x:-2.9,y:0,z:-6.3,facing:-2.3},listener:{x:-1.1,y:0,z:-3.9,facing:.2}}},Mh={x:2.1,y:0,z:5.75,facing:2.33},Sh={x:5.2,y:0,z:-6.35,facing:Math.PI-.35};function Bb(n,e,t,i="bicycle-stall"){return n===0&&e==="ida"&&t==="stair"?Mh:n===3&&e==="maya"&&i==="cafe"?Sh:ai[n][e]}const Ep={0:{hand:{path:[[4.2,-7.4],[5.2,-3.2],[-1.8,3.6],[-4.6,7.1],[-1.8,3.6],[5.2,-3.2]],speed:.2},dipper:{path:[[4,-7.3],[6.6,-2.5],[7.4,4.6],[6.6,-2.5]],speed:.24},lamplighter:{path:[[-8.6,5],[-8.6,-3.5],[-6.2,-6.4],[-8.6,-3.5]],speed:.16}},1:{joiner:{path:[[-8.8,-4.5],[-2.8,-2],[-2.8,3.5],[-8.8,3.5]],speed:.28},wireless:{path:[[-9.4,2.5],[-4.6,-1.2],[1.4,-2.8],[-4.6,-1.2]],speed:.22}},2:{umbrella:{path:[[-9.4,2.5],[-3,3.8],[.9,4.8],[-3,3.8]],speed:.2}},3:{cyclist:{path:[[-9.3,2.6],[-5.6,.2],[-2.6,-4.2],[-5.6,.2]],speed:.22},scooter:{path:[[-8.4,6.2],[-1.5,5.4],[1.6,3.2],[-1.5,5.4]],speed:.3}}},Bn={x:9.3,y:1.3,z:-1},ko=1.62,Ha=.34,xc=.55,Ap=.42,Hb=.22,qu=.45,Ga=1.2,Gb=1.1;class Vb{x=0;y=0;z=0;yaw=0;pitch=0;vy=0;boxes=[];floors=[];turnGoal=null;pitchGoal=null;approachGoal=null;moved=0;movers=[];setWorld(e,t=[],i=Mp,o=.5,s={}){this.boxes=[...Ob(e,i,o,s),...t],this.floors=zb(e,s)}canStand(e,t,i=this.y){return!this.blocked(e,t,i)}get stuck(){return this.blocked(this.x,this.z,this.y)}unstick(e=3){if(!this.stuck)return!0;for(let t=.1;t<=e;t+=.1){const i=Math.max(8,Math.round(t*24));for(let o=0;o<i;o++){const s=o/i*Math.PI*2,r=this.x+Math.cos(s)*t,a=this.z+Math.sin(s)*t;if(!this.blocked(r,a,this.y))return this.x=r,this.z=a,!0}}return!1}place(e,t,i,o,s){this.x=e,this.y=t,this.z=i,o!==void 0&&(this.yaw=o),s!==void 0&&(this.pitch=s),this.vy=0,this.turnGoal=null,this.pitchGoal=null,this.approachGoal=null}approach(e,t){this.approachGoal={x:e,z:t}}floorAt(e,t,i){let o=null;for(const s of this.floors){if(e<s.x0||e>s.x1||t<s.z0||t>s.z1)continue;const r=typeof s.y=="number"?s.y:s.y(e,t);if(r>i+qu){if(s.solid)return null;continue}(o===null||r>o)&&(o=r)}return o}blocked(e,t,i){for(const o of this.boxes){if(o.y1<=i+.3||o.y0>=i+1.75)continue;if(o.round){const a=(o.x1-o.x0)/2+Ha;if((e-(o.x0+o.x1)/2)**2+(t-(o.z0+o.z1)/2)**2<a*a)return!0;continue}const s=Math.max(o.x0,Math.min(e,o.x1)),r=Math.max(o.z0,Math.min(t,o.z1));if((e-s)**2+(t-r)**2<Ha*Ha)return!0}return this.floorAt(e,t,i)===null}update(e,t){if(this.yaw+=t.turn*e*1.9,t.pitch&&(this.pitch=Math.max(-Ga,Math.min(Ga,this.pitch+t.pitch*e*Gb)),this.pitchGoal=null),this.turnGoal!==null){const m=Math.atan2(Math.sin(this.turnGoal-this.yaw),Math.cos(this.turnGoal-this.yaw));this.yaw+=m*(1-Math.exp(-e*3.2)),(Math.abs(m)<.01||t.turn||t.forward||t.strafe)&&(this.turnGoal=null)}if(this.pitchGoal!==null){const m=this.pitchGoal-this.pitch;this.pitch+=m*(1-Math.exp(-e*3.2)),(Math.abs(m)<.005||t.turn||t.forward||t.strafe)&&(this.pitchGoal=null)}const i=t.run?4.6:2.6,o=-Math.sin(this.yaw),s=-Math.cos(this.yaw),r=Math.cos(this.yaw),a=-Math.sin(this.yaw);let l=o*t.forward+r*t.strafe,c=s*t.forward+a*t.strafe,d=i;if(t.forward||t.strafe||t.turn)this.approachGoal=null;else if(this.approachGoal){const m=this.approachGoal.x-this.x,M=this.approachGoal.z-this.z,E=Math.hypot(m,M);E<.03?this.approachGoal=null:(l=m/E,c=M/E,d=Math.min(1.8,E/Math.max(e,.001)))}const u=Math.hypot(l,c);u>1&&(l/=u,c/=u);const f=d*e,h=Math.max(1,Math.ceil(f/.1)),p=this.x,y=this.z;for(let m=0;m<h;m++){const M=l*f/h,E=c*f/h;!this.blocked(this.x+M,this.z,this.y)&&!this.crowded(this.x+M,this.z)&&(this.x+=M),!this.blocked(this.x,this.z+E,this.y)&&!this.crowded(this.x,this.z+E)&&(this.z+=E);const _=this.floorAt(this.x,this.z,this.y);_!==null&&_>this.y&&(this.y=_)}const g=this.floorAt(this.x,this.z,this.y)??this.y;this.y>g+.001?(this.vy-=18*e,this.y=Math.max(g,this.y+this.vy*e),this.y-g<.02&&g-this.y>-.3,this.y-g<qu*.7&&(this.y=g,this.vy=0)):(this.y=g,this.vy=0),this.moved=Math.hypot(this.x-p,this.z-y),this.approachGoal&&f>1e-4&&this.moved<f*.2&&(this.approachGoal=null)}crowded(e,t){const i=Ap+Ha;for(const o of this.movers){const s=Math.hypot(e-o.x,t-o.z);if(s<i&&s<Math.hypot(this.x-o.x,this.z-o.z))return!0}return!1}look(e,t){this.yaw-=e,this.pitch=Math.max(-Ga,Math.min(Ga,this.pitch-t)),this.turnGoal=null,this.pitchGoal=null}eyeBlocked(e,t,i){const o=this.y+ko;for(const s of this.boxes)if(!(s.y1<=o-.25||s.y0>=o+.25)&&e>s.x0-i&&e<s.x1+i&&t>s.z0-i&&t<s.z1+i)return!0;return!1}eye(){const e=-Math.sin(this.yaw),t=-Math.cos(this.yaw);let i=xc;for(let r=.05;r<=xc;r+=.05)if(this.eyeBlocked(this.x+e*r,this.z+t*r,.02)){i=r-.05;break}let o=Math.max(0,xc-i),s=0;for(let r=.05;r<=o+1e-6&&!this.eyeBlocked(this.x-e*r,this.z-t*r,.12);r+=.05)s=r;return o=s,{x:this.x-e*o,z:this.z-t*o,pulled:o}}}class Ws{skip=0;reset(e=1){this.skip=Math.max(this.skip,e)}filter(e,t){if(this.skip>0)return this.skip--,null;if(!Number.isFinite(e)||!Number.isFinite(t)||Math.abs(e)>Ws.JUMP||Math.abs(t)>Ws.JUMP)return null;const i=o=>Math.max(-60,Math.min(Ws.CLAMP,o));return[i(e),i(t)]}static JUMP=220;static CLAMP=60}const js={x:5.7,z:-7.6},$n={x:15,z:2.9},io={x:13.25,y:.82,z:-.5},Th={x:-1.15,z:-9.9},Co={x:7.3,z:-5.9},xl={x:3.5,z:-11.3},li={x:8.6,z:-8.72},es={x:14.6,z:-4.95},ts={x:15.25,z:5.4},Xs={x:-2.05,y:1.5,z:-7.82};function Cp(n,e){if(n===0)return["amos","ida","winnie","jonah"];if(n===1)return["jonah","winnie","neighbour","child"];if(n===2)return["winnie","jonah",...e.e1991.bucketChain?["stan"]:[],"teen"];const t=e.e2026;return["maya","theo",t.workshopUse==="cafe"?"customer":"neighbour",...t.bellOccasion!=="silent"?["listener"]:[]]}function Rp(n,e,t){return Bb(n,e,ia(n,t),t.e2026.mayaBusiness)}const eo=(n,e,t,i,o=0,s=1.8,r)=>({x0:n-t/2,x1:n+t/2,z0:e-i/2,z1:e+i/2,y0:o,y1:s,tag:r});function Ip(n,e){const t=[];for(const i of Cp(n,e)){const o=Rp(n,i,e),s=o.seated?Hb:Ap;t.push({...eo(o.x,o.z,2*s,2*s,o.y,o.y+1.7,`person:${i}`),round:!0})}if(n===2&&(t.push(eo(js.x,js.z,.5,.5,Ae,Ae+.8,"tea-table")),t.push(eo($n.x,$n.z,.9,.9,0,.8,"bell-1991"))),n===3){const i=e.e2026;i.stairPublic||t.push({x0:zt.x0,x1:zt.x1,z0:zt.z0,z1:zt.z1,y0:0,y1:zt.y1,tag:"gate"}),i.mayaBusiness==="bicycle-stall"&&t.push(eo(Th.x,Th.z,.7,1,0,1.4,"stall")),i.workshopUse==="cafe"&&(t.push(eo(Co.x,Co.z,.7,.7,0,.8,"cafe-table")),t.push(eo(xl.x,xl.z,.7,.7,0,.8,"cafe-table")),t.push(eo(li.x,li.z,.6,.45,0,.9,"window-plinth"))),t.push(eo(es.x,es.z,1.1,.6,0,1.1,"display-case")),t.push(eo(ts.x,ts.z,.6,2.2,0,2,"store-shelf"))}return t}function Wb(n,e){return{workshopOpen:hd(n,e),galleryOpen:Ub(n,e),options:{storeroom:n===3},tree:nr[ia(n,e)],treeWidth:n===0?.3:.5,solids:Ip(n,e)}}const vc={x:0,y:5.3,z:-7.25};function Xb(){const n=[],e=Math.PI/180,t=10.5;for(const[i,o,s]of[[1.5,.28,0],[1.95,.34,.5]])for(let r=-88+s*t;r<=-14;r+=t){const a=Math.cos(r*e),l=Math.max(1,Math.round(200*a/t));for(let c=0;c<=l;c++){const d=-100+200*(c+(s?.5:0))/l;d>100||d>62&&r>-22||n.push({x:vc.x+i*a*Math.sin(d*e),y:vc.y+i*Math.sin(r*e),z:vc.z+i*a*Math.cos(d*e),r:o})}}return n}const qb=[{x:-3.2,y:4.2,z:-5.6,r:1},{x:-2.1,y:4.5,z:-6.1,r:.8},{x:-1.2,y:4.3,z:-6.3,r:.6}],Ti=n=>`${n.era}:${n.key}`,bc=["arrival","choice","consequence"],ns=n=>!!n&&typeof n=="object"&&!Array.isArray(n),Rr=n=>typeof n=="string"&&/^[a-zA-Z][a-zA-Z0-9_.-]{0,79}$/.test(n),Eh=n=>ns(n)&&Number.isInteger(n.era)&&Number(n.era)>=0&&Number(n.era)<=3&&Rr(n.key);function $b(n){return ns(n)?n.kind==="boolean"?!0:n.kind==="integer"?Number.isSafeInteger(n.min)&&Number.isSafeInteger(n.max)&&Number(n.min)<=Number(n.max):n.kind==="enum"&&Array.isArray(n.values)&&n.values.length>0&&n.values.length<=64&&new Set(n.values).size===n.values.length&&[...n.values].every(e=>typeof e=="string"&&e.length<=256):!1}function Yb(n,e){return n.kind!==e.kind?!1:n.kind==="integer"&&e.kind==="integer"?n.min>=e.min&&n.max<=e.max:n.kind==="enum"&&e.kind==="enum"?n.values.every(t=>e.values.includes(t)):!0}function Pp(n,e){const{facts:t,eras:i,target:o,choice:s=!1,extra:r={}}=e,a=[],l=(h,p={})=>{a.length<100&&a.push({code:"expression",message:h,...p})};let c=0;const d=new Set,u=(h,p)=>{if(++c>128||p>12){l("Expression exceeds 128 nodes or depth 12.",r);return}if(!ns(h)){l("Expression must be an object.",r);return}const y=m=>{m&&m.kind!=="boolean"&&l("Logical condition requires a boolean.",r)},g=m=>u(m,p+1);switch(h.op){case"literal":if(typeof h.value=="boolean")return{kind:"boolean"};if(typeof h.value=="number"&&Number.isSafeInteger(h.value))return{kind:"integer",min:h.value,max:h.value};if(typeof h.value=="string"&&h.value.length<=256)return{kind:"enum",values:[h.value]};l("Literal must be boolean, bounded string or safe integer.",r);return;case"ref":{if(!Eh(h.fact)){l("Invalid fact reference.",r);return}const m=Ti(h.fact),M=t.get(m);if(!M){l(`Missing input fact ${m}.`,r);return}d.add(m);const E=M.address.era===o.address.era,_=i[i.indexOf(o.address.era)-1];return(e.inspection?M.address.era<=o.address.era:s?E&&M.phase==="arrival":o.phase==="arrival"?E&&M.phase==="arrival"||M.address.era===_:E)||l(`Illegal phase/era read of ${m} from ${Ti(o.address)}.`,r),M.type}case"all":case"any":if(!Array.isArray(h.args)||h.args.length>128){l("Logical arguments must be a bounded array.",r);return}for(const m of h.args)y(g(m));return{kind:"boolean"};case"not":return y(g(h.arg)),{kind:"boolean"};case"eq":case"lt":case"lte":{const m=g(h.left),M=g(h.right);return m&&M&&(m.kind!==M.kind||h.op!=="eq"&&m.kind!=="integer")&&l("Comparison operands have incompatible types.",r),{kind:"boolean"}}case"if":{y(g(h.condition));const m=g(h.then),M=g(h.else);if(!m||!M)return;if(m.kind!==M.kind){l("Conditional branches must have the same value type.",r);return}return m.kind==="integer"&&M.kind==="integer"?{kind:"integer",min:Math.min(m.min,M.min),max:Math.max(m.max,M.max)}:m.kind==="enum"&&M.kind==="enum"?{kind:"enum",values:[...new Set([...m.values,...M.values])]}:{kind:"boolean"}}default:l("Unknown expression operation.",r);return}};return{type:u(n,0),dependencies:[...d],issues:a}}function Lp(n){const e=[],t=(h,p={})=>{e.length<100&&e.push({code:"content",message:h,...p})};if(!ns(n)||!Rr(n.version)||!Array.isArray(n.eras)||n.eras.length<1||n.eras.length>4||!Array.isArray(n.facts)||n.facts.length>2e3||!Array.isArray(n.rules)||n.rules.length>2e3||!Array.isArray(n.interventions)||n.interventions.length>6||!Array.isArray(n.sources)||n.sources.length>2e3)return{ok:!1,issues:[{code:"content-shape",message:"Content needs a version, 1–4 eras, up to 2,000 facts/rules/sources and up to six interventions."}]};const i=n.eras;i.some((h,p)=>!Number.isInteger(h)||h<0||h>3||p>0&&h<=i[p-1])&&t("Eras must be distinct and increasing from 0 through 3.");const o=new Set;for(const h of n.sources)!ns(h)||!Rr(h.id)||o.has(h.id)||!["authored","physical","document","belief"].includes(String(h.kind))||typeof h.description!="string"||h.description.length>8e3?t("Sources need unique IDs, a declared kind and a bounded description."):o.add(h.id);const s=new Map;for(const h of n.facts){if(!ns(h)||!Eh(h.address)||!i.includes(h.address.era)||!bc.includes(h.phase)||!$b(h.type)){t("A fact needs a declared era/key, phase and bounded type.");continue}const p=Ti(h.address);s.has(p)?t(`Duplicate fact ${p}.`,{fact:h.address}):s.set(p,h)}const r=new Map,a=new Set;for(const[h,p]of[["rule",n.rules],["choice",n.interventions]])for(const y of p){if(!ns(y)||!Rr(y.id)||!Eh(y.target)){t("A writer needs an ID and target fact.");continue}const g=h==="rule"?{ruleId:y.id,fact:y.target}:{interventionId:y.id,fact:y.target},m=Ti(y.target),M=s.get(m);if(a.has(y.id)&&t(`Duplicate writer ID ${y.id}.`,g),a.add(y.id),(!Rr(y.sourceId)||!o.has(y.sourceId))&&t("Writer source does not exist.",g),!M){t(`Missing output fact ${m}.`,g);continue}r.has(m)&&t(`Conflicting writers for ${m}.`,g),(h==="choice"?M.phase!=="choice"||M.type.kind!=="boolean"||y.era!==M.address.era:M.phase==="choice")&&t("Writer does not match the output phase/type/era.",g);const E=h==="rule"?y.expression:y.availableWhen,_=Pp(E,{facts:s,eras:i,target:M,choice:h==="choice",extra:g});for(const R of _.issues)t(R.message,R);_.type&&!Yb(_.type,h==="choice"?{kind:"boolean"}:M.type)&&t("Expression can produce a value outside its declared output type.",g),r.set(m,{fact:M,writer:y,kind:h,dependencies:_.dependencies})}for(const[h,p]of s)r.has(h)||t(`Fact ${h} has no writer.`,{fact:p.address});if(e.length)return{ok:!1,issues:e};const l=new Map,c=new Map;for(const[h,p]of r){l.set(h,p.dependencies.length);for(const y of p.dependencies){const g=c.get(y)??[];g.push(h),c.set(y,g)}}const d=(h,p)=>{const y=r.get(h).fact,g=r.get(p).fact;return y.address.era-g.address.era||bc.indexOf(y.phase)-bc.indexOf(g.phase)||(h<p?-1:h>p?1:0)},u=[...l].filter(([,h])=>h===0).map(([h])=>h).sort(d),f=[];for(;u.length;){const h=u.shift();f.push(r.get(h));for(const p of c.get(h)??[]){const y=l.get(p)-1;l.set(p,y),y===0&&u.push(p)}u.sort(d)}return f.length!==r.size?{ok:!1,issues:[...l].filter(([,h])=>h>0).map(([h])=>({code:"dependency-cycle",message:`Cycle prevents evaluation of ${h}.`,fact:r.get(h).fact.address}))}:{ok:!0,value:{content:n,ordered:f}}}class Ds extends Error{constructor(e,t){super(`${e||"expression"}: ${t}`),this.path=e,this.name="ExpressionError"}}function kp(n,e){const t=new Map,i=[];let o=0;const s=(l,c)=>{if(typeof l!="boolean")throw new Ds(c,"Expected a boolean.");return l},r=(l,c,d)=>{if(++o>128||d>12)throw new Ds(c,"Expression budget exceeded.");const u=(h,p)=>r(h,c?`${c}.${p}`:p,d+1);let f;switch(l.op){case"literal":f=l.value;break;case"ref":{const h=`${l.fact.era}:${l.fact.key}`;let p=t.get(h);p||(p=Object.freeze({fact:Object.freeze({...l.fact}),value:e(l.fact)}),t.set(h,p)),f=p.value;break}case"all":case"any":{const h=l.args.map((p,y)=>s(u(p,`args.${y}`),`${c}.args.${y}`));f=l.op==="all"?h.every(Boolean):h.some(Boolean);break}case"not":f=!s(u(l.arg,"arg"),c);break;case"eq":{const h=u(l.left,"left"),p=u(l.right,"right");if(typeof h!=typeof p)throw new Ds(c,"Equality operands must have the same type.");f=h===p;break}case"lt":case"lte":{const h=u(l.left,"left"),p=u(l.right,"right");if(typeof h!="number"||typeof p!="number")throw new Ds(c,"Ordered comparisons require numbers.");f=l.op==="lt"?h<p:h<=p;break}case"if":{f=s(u(l.condition,"condition"),c)?u(l.then,"then"):u(l.else,"else");break}default:throw new Ds(c,"Unknown expression operation.")}if(!["boolean","string","number"].includes(typeof f)||typeof f=="number"&&!Number.isSafeInteger(f))throw new Ds(c,"Values must be boolean, string or safe integer.");return typeof f=="boolean"&&i.push(Object.freeze({path:c,value:f})),f},a=r(n,"",0);return Object.freeze({value:a,reads:Object.freeze([...t.values()]),predicates:Object.freeze(i)})}function ir(n,e=[]){const t=Lp(n);if(!t.ok)return t;const i=t.value,o=new Set(i.content.interventions.map(c=>c.id));if(!Array.isArray(e)||e.length>6||[...e].some(c=>typeof c!="string"||!o.has(c))||new Set(e).size!==e.length)return{ok:!1,issues:[{code:"choices",message:"Choose each declared intervention at most once, up to six."}]};const s=Object.freeze([...e].sort()),r=new Set(s),a=new Map;for(const c of i.ordered){const d=c.kind==="rule"?c.writer.expression:c.writer.availableWhen,u=kp(d,p=>{const y=a.get(Ti(p));if(!y)throw new Error(`Validated dependency missing: ${Ti(p)}`);return y.value}),f=c.kind==="rule"?{kind:"rule",ruleId:c.writer.id,sourceId:c.writer.sourceId,reads:u.reads,predicates:u.predicates}:{kind:"choice",interventionId:c.writer.id,sourceId:c.writer.sourceId,status:r.has(c.writer.id)?u.value?"selected":"inapplicable":"default",reads:u.reads,predicates:u.predicates},h=c.kind==="rule"?u.value:r.has(c.writer.id)&&u.value===!0;a.set(Ti(c.fact.address),Object.freeze({address:Object.freeze({...c.fact.address}),phase:c.fact.phase,value:h,trace:Object.freeze(f)}))}const l=Object.freeze(i.content.eras.map(c=>Object.freeze({era:c,facts:Object.freeze([...a.values()].filter(d=>d.address.era===c))})));return{ok:!0,value:Object.freeze({historyId:JSON.stringify([i.content.version,s]),contentVersion:i.content.version,choices:s,eras:l})}}const Va=n=>!!n&&typeof n=="object"&&!Array.isArray(n),To=n=>typeof n=="string"&&/^[a-zA-Z][a-zA-Z0-9_.-]{0,79}$/.test(n),Li=(n,e)=>({ok:!1,issues:[{code:n,message:e}]});function no(n){switch(n.op){case"literal":return Object.freeze({op:n.op,value:n.value});case"ref":return Object.freeze({op:n.op,fact:Object.freeze({...n.fact})});case"all":case"any":return Object.freeze({op:n.op,args:Object.freeze(n.args.map(no))});case"not":return Object.freeze({op:n.op,arg:no(n.arg)});case"eq":case"lt":case"lte":return Object.freeze({op:n.op,left:no(n.left),right:no(n.right)});case"if":return Object.freeze({op:n.op,condition:no(n.condition),then:no(n.then),else:no(n.else)})}}function Jb(n,e){const t=Lp(n);if(!t.ok)return t;if(!Array.isArray(e)||e.length>300)return Li("inspection-budget","Provide at most 300 authored inspections.");const{content:i}=t.value,o=new Map(i.facts.map(p=>[Ti(p.address),p])),s=new Map(i.sources.map(p=>[p.id,p])),r=new Set,a=[],l=p=>{a.length<100&&a.push({code:"inspection",message:p})};for(const p of e){if(!Va(p)||!To(p.id)||r.has(p.id)||!To(p.zoneId)||!To(p.subjectId)||!To(p.sourceId)||!s.has(p.sourceId)||!i.eras.includes(p.era)||!["physical","document","testimony"].includes(String(p.kind))||!Array.isArray(p.variants)||p.variants.length<1||p.variants.length>16){l("Inspection IDs, era, source, kind and 1–16 variants must be valid.");continue}r.add(p.id),p.kind==="physical"&&s.get(p.sourceId).kind!=="physical"&&l(`${p.id}: physical observation needs a physical source.`),p.kind==="document"&&s.get(p.sourceId).kind!=="document"&&l(`${p.id}: document observation needs a document source.`),p.kind==="testimony"&&s.get(p.sourceId).kind==="authored"&&l(`${p.id}: testimony needs a factual or belief source, not only an author note.`);const y=m=>{const M=Pp(m,{facts:o,eras:i.eras,inspection:!0,target:{address:{era:p.era,key:"inspection"},phase:"consequence",type:{kind:"boolean"}}});for(const E of M.issues)l(`${p.id}: ${E.message}`);M.type&&M.type.kind!=="boolean"&&l(`${p.id}: inspection predicate must be boolean.`)};y(p.availableWhen),p.evidenceAny!==void 0&&(!Array.isArray(p.evidenceAny)||p.evidenceAny.length<1||p.evidenceAny.length>16||p.evidenceAny.some(m=>!Va(m)||!To(m.inspectionId)||m.variantId!==void 0&&!To(m.variantId)))&&l(`${p.id}: evidence gate needs 1–16 valid inspection references.`);const g=new Set;for(const m of p.variants){if(!Va(m)||!To(m.id)||g.has(m.id)||typeof m.text!="string"||!m.text.trim()||m.text.length>4e3||!Array.isArray(m.grounding)||m.grounding.length<1||m.grounding.length>32){l(`${p.id}: variant needs an ID, text and 1–32 grounding facts.`);continue}g.add(m.id),y(m.when);for(const M of m.grounding)(!Va(M)||!Number.isInteger(M.era)||!To(M.key)||!o.has(Ti(M))||Number(M.era)>Number(p.era))&&l(`${p.id}: grounding must cite existing current or earlier facts.`)}}if(a.length)return{ok:!1,issues:a};const c=new Map(e.map(p=>[p.id,p]));for(const p of c.values())for(const y of p.evidenceAny??[]){const g=c.get(y.inspectionId);(!g||y.variantId!==void 0&&!g.variants.some(m=>m.id===y.variantId))&&l(`${p.id}: evidence gate cites an unknown inspection or variant.`)}const d=new Set,u=new Set,f=p=>{if(d.has(p)){l("Evidence gates must not contain a cycle.");return}if(!u.has(p)){d.add(p);for(const y of c.get(p)?.evidenceAny??[])f(y.inspectionId);d.delete(p),u.add(p)}};for(const p of c.keys())f(p);if(a.length)return{ok:!1,issues:a};const h=e.map(p=>Object.freeze({id:p.id,era:p.era,zoneId:p.zoneId,subjectId:p.subjectId,sourceId:p.sourceId,kind:p.kind,availableWhen:no(p.availableWhen),...p.evidenceAny?{evidenceAny:Object.freeze(p.evidenceAny.map(y=>Object.freeze({inspectionId:y.inspectionId,...y.variantId===void 0?{}:{variantId:y.variantId}})))}:{},variants:Object.freeze(p.variants.map(y=>Object.freeze({id:y.id,text:y.text,when:no(y.when),grounding:Object.freeze(y.grounding.map(g=>Object.freeze({...g})))})))}));return{ok:!0,value:Object.freeze({contentVersion:i.version,inspections:Object.freeze(h)})}}function Np(n,e,t,i,o=[]){if(o.length>2e3)return Li("evidence-budget","The notebook observation limit has been reached.");const s=new Map;for(const r of o){if(r.historyId!==n.historyId)continue;const a=e.inspections.find(d=>d.id===r.inspectionId);if(!a)continue;const l=$u(n,e,a.id,{era:a.era,zoneId:a.zoneId},s);if(!l.ok||!Kb(r,l.value))continue;const c=s.get(a.id)??new Set;c.add(l.value.variantId),s.set(a.id,c)}return $u(n,e,t,i,s)}function Kb(n,e){return n.id===e.id&&n.historyId===e.historyId&&n.era===e.era&&n.subjectId===e.subjectId&&n.sourceId===e.sourceId&&n.inspectionId===e.inspectionId&&n.variantId===e.variantId&&n.kind===e.kind&&n.text===e.text}function $u(n,e,t,i,o){if(n.contentVersion!==e.contentVersion)return Li("inspection-version","Inspection catalog does not match this history.");const s=e.inspections.find(c=>c.id===t);if(!s||s.era!==i.era||s.zoneId!==i.zoneId)return Li("inspection-location","Inspect this source in its own era and zone.");if(s.evidenceAny&&!s.evidenceAny.some(c=>c.variantId===void 0?!!o.get(c.inspectionId)?.size:o.get(c.inspectionId)?.has(c.variantId)))return Li("inspection-evidence","This conversation needs something you have discovered in this history.");if(!n.eras.find(c=>c.era===i.era))return Li("inspection-era","This era is absent from the history.");const a=new Map(n.eras.filter(c=>c.era<=i.era).flatMap(c=>c.facts.map(d=>[Ti(d.address),d.value]))),l=c=>{const d=kp(c,u=>{const f=a.get(Ti(u));if(f===void 0)throw new Error("Missing inspection fact.");return f});if(typeof d.value!="boolean")throw new Error("Inspection condition must be boolean.");return d.value};try{if(!l(s.availableWhen))return Li("inspection-unavailable","This source is unavailable here in the current history.");const c=s.variants.filter(u=>l(u.when));if(c.length!==1)return Li("inspection-variant","An accessible inspection must have exactly one authored variant.");const d=c[0];return{ok:!0,value:Object.freeze({id:JSON.stringify([n.historyId,s.id,d.id]),historyId:n.historyId,era:i.era,subjectId:s.subjectId,sourceId:s.sourceId,inspectionId:s.id,variantId:d.id,kind:s.kind,text:d.text})}}catch(c){return Li("inspection-evaluation",c instanceof Error?c.message:"Inspection could not be evaluated.")}}function Dp(n,e){const t=new Map(e.map(i=>[i.id,i]));return Object.freeze([...t.values()].map(i=>Object.freeze({observation:i,status:i.historyId===n.historyId?"current":"former-history"})))}function Zb(n,e,t,i){if(n.contentVersion!==e.contentVersion||!n.eras.some(r=>r.era===i)||!e.eras.some(r=>r.era===i))return Li("comparison-context","Compare the same authored era and content version.");const o=new Map;for(const r of new Map(t.map(a=>[a.id,a])).values()){if(r.era!==i||r.historyId!==n.historyId&&r.historyId!==e.historyId)continue;const a=o.get(r.subjectId)??{before:[],after:[]};r.historyId===n.historyId&&a.before.push(r),r.historyId===e.historyId&&a.after.push(r),o.set(r.subjectId,a)}const s=r=>JSON.stringify(r.map(a=>JSON.stringify([a.kind,a.sourceId,a.text])).sort());return{ok:!0,value:Object.freeze([...o].sort(([r],[a])=>r<a?-1:r>a?1:0).map(([r,a])=>Object.freeze({subjectId:r,era:i,before:Object.freeze(a.before),after:Object.freeze(a.after),status:a.before.length?a.after.length?s(a.before)===s(a.after)?"same-observations":"changed-observations":"uninspected-after":"uninspected-before"})))}}const Ah=1,Tn=Object.freeze({bytes:2*1024*1024,histories:64,undo:32,observations:2e3,notes:200,noteCharacters:4e3}),Xt=(n,e)=>({ok:!1,issues:[{code:n,message:e}]}),$o=n=>!!n&&typeof n=="object"&&!Array.isArray(n),Yo=(n,e)=>Object.keys(n).length===e.length&&e.every(t=>Object.hasOwn(n,t)),vl=n=>typeof n=="string"&&/^[a-zA-Z][a-zA-Z0-9_.-]{0,79}$/.test(n),wr=(n,e)=>Array.isArray(n)&&n.length<=e,Yu=["id","historyId","era","subjectId","sourceId","inspectionId","variantId","kind","text"];function Up(n){return Object.freeze({...n,histories:Object.isFrozen(n.histories)?n.histories:Object.freeze(n.histories.map(e=>Object.freeze({historyId:e.historyId,choices:Object.freeze([...e.choices])}))),slots:Object.freeze({...n.slots}),undo:Object.freeze([...n.undo]),redo:Object.freeze([...n.redo]),position:Object.freeze({...n.position}),observations:Object.isFrozen(n.observations)?n.observations:Object.freeze(n.observations.map(e=>Object.freeze({...e}))),notes:Object.isFrozen(n.notes)?n.notes:Object.freeze(n.notes.map(e=>Object.freeze({...e})))})}const Qs=new WeakMap,Ch=n=>new TextEncoder().encode(JSON.stringify(n)).byteLength;function zp(n,e){return new Map([...new Set(Object.values(n.slots))].filter(t=>t!==null&&e.has(t)).map(t=>[t,e.get(t)]))}function jb(n,e,t){return Qs.set(n,{context:e,content:e.content,catalog:e.catalog,allowedPositions:e.allowedPositions,canVisit:e.canVisit,version:e.content.version,evaluations:zp(n,t),bytes:Ch(n),fields:new Map(Object.keys(n).map(i=>[i,Ch(n[i])]))}),n}function mo(n,e){const t=Qs.get(n);return t?.context===e&&t.content===e.content&&t.catalog===e.catalog&&t.allowedPositions===e.allowedPositions&&t.canVisit===e.canVisit&&t.version===e.content.version&&e.catalog.contentVersion===t.version?{ok:!0,value:n}:dd(n,e)}function oi(n,e,t,i){try{const o=Qs.get(n),s=new Map(o.evaluations);if(i&&s.set(i.historyId,i),!s.has(e.slots.working)){const d=e.histories.find(f=>f.historyId===e.slots.working);if(!d)return Xt("save-history","Working history is missing.");const u=ir(t.content,d.choices);if(!u.ok)return u;s.set(u.value.historyId,u.value)}if(e.histories.length>Tn.histories||e.observations.length>Tn.observations||e.notes.length>Tn.notes)return Xt("save-budget","Session exceeds a history, observation or note limit.");const r=e.position;if(!$o(r)||!Yo(r,["era","zoneId"])||!vl(r.zoneId)||!t.allowedPositions.some(d=>d.era===r.era&&d.zoneId===r.zoneId)||!s.get(e.slots.working)?.eras.some(d=>d.era===r.era))return Xt("save-position","Position must be an explicitly allowed era and zone.");if(t.canVisit&&!t.canVisit(s.get(e.slots.working),r))return Xt("save-position","Position is inaccessible in the working history.");let a=o.bytes;const l=new Map(o.fields);for(const d of Object.keys(e))if(e[d]!==n[d]){const u=Ch(e[d]);a+=u-l.get(d),l.set(d,u)}if(a>Tn.bytes)return Xt("save-size","Save exceeds 2 MiB.");const c=Up(e);return Qs.set(c,{...o,evaluations:zp(c,s),bytes:a,fields:l}),{ok:!0,value:c}}catch{return Xt("save-invalid","Session or scene context could not be validated.")}}function Op(n,e,t){const i=[],o=new Set,s=r=>{const a=r.evidenceAny?.find(c=>{const d=t.get(c.inspectionId);return d&&(c.variantId===void 0||d.variantId===c.variantId)});if(!a||o.has(a.inspectionId))return;o.add(a.inspectionId);const l=e.inspections.find(c=>c.id===a.inspectionId);l&&(s(l),i.push(t.get(l.id)))};return s(n),i}function Fp(n){try{const e=JSON.stringify(n);return typeof e!="string"?Xt("save-shape","Save must be a JSON object."):new TextEncoder().encode(e).byteLength>Tn.bytes?Xt("save-size","Save exceeds 2 MiB."):{ok:!0,value:e}}catch{return Xt("save-json","Save must contain serializable JSON data.")}}function Qb(n){return Fp({saveVersion:n.saveVersion,contentVersion:n.contentVersion,histories:n.histories,slots:n.slots,undo:n.undo,redo:n.redo,position:n.position,observations:n.observations,notes:n.notes})}function dd(n,e){try{return e_(n,e)}catch{return Xt("save-invalid","Save or scene context could not be validated.")}}function e_(n,e){const t=typeof n=="string"?{ok:!0,value:n}:Fp(n);if(!t.ok)return t;if(t.value.length>Tn.bytes||new TextEncoder().encode(t.value).byteLength>Tn.bytes)return Xt("save-size","Save exceeds 2 MiB.");let i;try{i=JSON.parse(t.value)}catch{return Xt("save-json","Save is not valid JSON.")}if(!$o(i)||!Yo(i,["saveVersion","contentVersion","histories","slots","undo","redo","position","observations","notes"]))return Xt("save-shape","Save has missing or unexpected fields.");if(i.saveVersion!==Ah)return Xt("save-version","Save format version is unsupported.");if(i.contentVersion!==e.content.version||e.catalog.contentVersion!==e.content.version)return Xt("save-content-version","Save and inspection catalog must match the authored content version.");if(!wr(i.histories,Tn.histories)||i.histories.length===0||!wr(i.undo,Tn.undo)||!wr(i.redo,Tn.undo)||!wr(i.observations,Tn.observations)||!wr(i.notes,Tn.notes))return Xt("save-budget","Save exceeds a history, undo, observation or note limit.");const o=[],s=new Map;for(const y of i.histories){if(!$o(y)||!Yo(y,["historyId","choices"])||typeof y.historyId!="string"||!Array.isArray(y.choices))return Xt("save-history","Each history needs its identity and choice set.");const g=ir(e.content,y.choices);if(!g.ok)return g;if(y.historyId!==g.value.historyId||s.has(y.historyId))return Xt("save-history","History identity is mismatched or repeated.");s.set(y.historyId,g.value),o.push({historyId:y.historyId,choices:g.value.choices})}const r=y=>typeof y=="string"&&s.has(y);if(!$o(i.slots)||!Yo(i.slots,["baseline","working","comparison"])||!r(i.slots.baseline)||!r(i.slots.working)||!(i.slots.comparison===null||r(i.slots.comparison))||!i.undo.every(r)||!i.redo.every(r))return Xt("save-slots","Slots and undo/redo must reference replayed histories.");const a=s.get(i.slots.working),l=i.position;if(!$o(l)||!Yo(l,["era","zoneId"])||!vl(l.zoneId)||!e.content.eras.includes(l.era)||!e.allowedPositions.some(y=>y.era===l.era&&y.zoneId===l.zoneId))return Xt("save-position","Position must be an explicitly allowed era and zone.");const c=Object.freeze({era:l.era,zoneId:l.zoneId});if(e.canVisit&&!e.canVisit(a,c))return Xt("save-position","Position is inaccessible in the working history.");const d=[],u=new Set,f=new Map;for(const y of i.observations){if(!$o(y)||!Yo(y,Yu)||!r(y.historyId)||typeof y.inspectionId!="string")return Xt("save-observation","Observation fields or history are invalid.");const g=e.catalog.inspections.find(_=>_.id===y.inspectionId);if(!g||!e.allowedPositions.some(_=>_.era===g.era&&_.zoneId===g.zoneId))return Xt("save-observation","Observation source has no allowed scene location.");const m={era:g.era,zoneId:g.zoneId};if(e.canVisit&&!e.canVisit(s.get(y.historyId),m))return Xt("save-observation","Observation location was inaccessible in its recorded history.");const M=f.get(y.historyId)??new Map,E=Np(s.get(y.historyId),e.catalog,g.id,m,Op(g,e.catalog,M));if(!E.ok)return E;if(Yu.some(_=>y[_]!==E.value[_])||u.has(E.value.id))return Xt("save-observation","Observation differs from its authored source, variant, payload or identity, or is repeated.");u.add(E.value.id),d.push(E.value),M.set(g.id,E.value),f.set(y.historyId,M)}const h=[],p=new Set;for(const y of i.notes){if(!$o(y)||!Yo(y,["id","historyId","era","kind","text"])||!vl(y.id)||p.has(y.id)||!r(y.historyId)||!e.content.eras.includes(y.era)||y.kind!=="player-note"||typeof y.text!="string"||y.text.length>Tn.noteCharacters)return Xt("save-note","Notes need unique IDs, a known history/era and at most 4,000 characters.");p.add(y.id),h.push({id:y.id,historyId:y.historyId,era:y.era,kind:"player-note",text:y.text})}return{ok:!0,value:jb(Up({saveVersion:Ah,contentVersion:e.content.version,histories:o,slots:{baseline:i.slots.baseline,working:i.slots.working,comparison:i.slots.comparison},undo:i.undo,redo:i.redo,position:c,observations:d,notes:h}),e,s)}}function t_(n,e,t=[]){const i=ir(n.content,t);if(!i.ok)return i;const{historyId:o}=i.value;return dd({saveVersion:Ah,contentVersion:n.content.version,histories:[{historyId:o,choices:i.value.choices}],slots:{baseline:o,working:o,comparison:null},undo:[],redo:[],position:e,observations:[],notes:[]},n)}function Ju(n,e,t,i=n.position){const o=mo(n,t);if(!o.ok)return o;n=o.value;const s=ir(t.content,e);if(!s.ok)return s;const{historyId:r}=s.value;if(r===n.slots.working)return oi(n,{...n,position:i},t);const a=n.histories.some(l=>l.historyId===r)?n.histories:[...n.histories,{historyId:r,choices:s.value.choices}];return oi(n,{...n,histories:a,slots:{...n.slots,working:r},undo:[...n.undo,n.slots.working].slice(-Tn.undo),redo:[],position:i},t,s.value)}function Ku(n,e,t=n.position){const i=mo(n,e);return i.ok?(n=i.value,n.undo.length?oi(n,{...n,slots:{...n.slots,working:n.undo.at(-1)},undo:n.undo.slice(0,-1),redo:[...n.redo,n.slots.working].slice(-Tn.undo),position:t},e):oi(n,{...n,position:t},e)):i}function n_(n,e,t=n.position){const i=mo(n,e);return i.ok?(n=i.value,n.redo.length?oi(n,{...n,slots:{...n.slots,working:n.redo.at(-1)},redo:n.redo.slice(0,-1),undo:[...n.undo,n.slots.working].slice(-Tn.undo),position:t},e):oi(n,{...n,position:t},e)):i}function _c(n,e,t){const i=mo(n,t);return i.ok?(n=i.value,oi(n,{...n,slots:{...n.slots,[e]:n.slots.working}},t)):i}function i_(n,e,t){const i=mo(n,t);if(!i.ok)return i;n=i.value;const o=n.histories.find(a=>a.historyId===e);if(!o)return Xt("comparison-history","Choose a history already retained in this session.");const s=Qs.get(n).evaluations.get(e),r=s?{ok:!0,value:s}:ir(t.content,o.choices);return r.ok?oi(n,{...n,slots:{...n.slots,comparison:e}},t,r.value):r}function o_(n,e){const t=mo(n,e);return t.ok?(n=t.value,oi(n,{...n,slots:{...n.slots,comparison:null}},e)):t}function Zu(n,e,t){const i=mo(n,t);return i.ok?(n=i.value,oi(n,{...n,position:e},t)):i}function ju(n,e,t){const i=mo(n,t);if(!i.ok)return i;n=i.value;const o=Qs.get(n).evaluations.get(n.slots.working),s=t.catalog.inspections.find(l=>l.id===e);if(!s)return Xt("inspection-location","Inspect this source in its own era and zone.");const r=new Map(n.observations.filter(l=>l.historyId===o.historyId).map(l=>[l.inspectionId,l])),a=Np(o,t.catalog,e,n.position,Op(s,t.catalog,r));return a.ok?n.observations.some(l=>l.id===a.value.id)?oi(n,n,t):oi(n,{...n,observations:[...n.observations,a.value]},t):a}function s_(n,e,t,i){const o=mo(n,i);return o.ok?(n=o.value,!vl(e)||n.notes.some(s=>s.id===e)||typeof t!="string"||t.length>Tn.noteCharacters?Xt("save-note","Notes need unique IDs and at most 4,000 characters."):oi(n,{...n,notes:[...n.notes,{id:e,historyId:n.slots.working,era:n.position.era,kind:"player-note",text:t}]},i)):o}const r_=["1926","March 1958","1991","2026"],Mr=n=>n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),a_=n=>({physical:"Observed detail",document:"Document",testimony:"Testimony","player-note":"My note"})[n];function l_(n,e,t,i="Chandler’s Court — field notebook"){if(t!=="text"&&t!=="html"||typeof i!="string"||i.length>200||e.length>2200||e.some(a=>typeof a.text!="string"||a.text.length>4e3))return{ok:!1,issues:[{code:"notebook-export",message:"Notebook export exceeds its text or entry limit."}]};const o=new Map,s=Dp(n,e).map(({observation:a,status:l})=>(l==="former-history"&&!o.has(a.historyId)&&o.set(a.historyId,o.size+1),{era:r_[a.era],kind:a_(a.kind),history:l==="current"?"Current history":`Former history ${o.get(a.historyId)}`,text:a.text})),r="Recorded observations, documents, testimony and your own notes. Testimony is a person’s account, not confirmation. Former-history entries keep the words recorded there; they do not establish what is true in the current history.";return t==="text"?{ok:!0,value:`${i}

${r}

${s.length?s.map(a=>`${a.era} · ${a.kind} · ${a.history}
${a.text}`).join(`

`):"No entries collected."}
`}:{ok:!0,value:`<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${Mr(i)}</title>
<style>body{max-width:48rem;margin:3rem auto;padding:0 1.4rem;font:18px/1.6 Georgia,serif;color:#28271f;background:#fbf8ef}h1{font-size:2rem;line-height:1.2}header p{color:#575447}article{border-top:1px solid #b6ad95;margin-top:1.6rem;padding-top:1rem;break-inside:avoid}h2{font:600 .9rem/1.5 system-ui,sans-serif;margin:0}article p{white-space:pre-wrap;margin:.7rem 0}@media print{body{margin:0;max-width:none;background:white;font-size:12pt}}</style>
<header><h1>${Mr(i)}</h1><p>${Mr(r)}</p></header>
<main>${s.length?s.map(a=>`<article><h2>${Mr(`${a.era} · ${a.kind} · ${a.history}`)}</h2><p>${Mr(a.text)}</p></article>`).join(`
`):"<p>No entries collected.</p>"}</main></html>`}}const Qu=[{id:"ringing",title:"The Ringing Court",requirements:[{id:"fire-night-ringing",label:"A record of the bell ringing on the fire night",any:[["plaque-1991","present"],["plaque-1991","credited"],["book-workshop-1991","rang"],["book-longroom-1991","rang"],["echo-1991","prompt"]]},{id:"present-bell",label:"An observed present-day bell or announced peal",any:[["bell-bracket-2026","ringing"],["bell-bracket-yard-2026","ringing"],["bell-window-2026","stored"],["opening-notice-2026","cafe"],["opening-notice-2026","court"]]}]},{id:"kept",title:"The Kept Court",requirements:[{id:"earlier-book",label:"A Court Book entry read in 1991",any:[["book-workshop-1991","rang"],["book-workshop-1991","didnotring"],["book-longroom-1991","rang"],["book-longroom-1991","didnotring"]]},{id:"present-book",label:"The present-day Book or its identified facsimile",any:[["book-cafe-2026","original"],["book-copy-2026","rang"],["book-copy-2026","didnotring"]]}]},{id:"kind",title:"The Kind Court",requirements:[{id:"shared-table",label:"The shared tea table observed in 1991",any:[["friendship-1991","two"]]},{id:"kind-testimony",label:"A kindly or reconciled account heard in 1991",any:[["winnie-1991","kind"],["winnie-1991","reconciled"],["jonah-saved-1991","shared"]]}]}],to=(n,e)=>({ok:!1,issues:[{code:n,message:e}]}),ef=n=>!!n&&typeof n=="object"&&!Array.isArray(n),tf=(n,e)=>Object.keys(n).length===e.length&&e.every(t=>Object.hasOwn(n,t)),c_=["id","historyId","era","subjectId","sourceId","inspectionId","variantId","kind","text"],h_=["id","historyId","era","kind","text"],ud=n=>(n&&typeof n=="object"&&!Object.isFrozen(n)&&(Object.values(n).forEach(ud),Object.freeze(n)),n),nf=n=>ud({entryId:n.id,column:n.kind==="player-note"?"Inferred":n.kind==="testimony"?"Said":"Seen",entry:{...n}});function Bp(n,e,t){if(!t||typeof t.historyId!="string"||!t.historyId||t.historyId.length>32768||typeof t.contentVersion!="string"||t.contentVersion!==n?.contentVersion)return to("account-context","Use the current history and its matching inspection catalog.");if(!Array.isArray(e)||e.length>2200||!Array.isArray(n.inspections)||n.inspections.length>300)return to("account-budget","Account evidence exceeds the notebook or catalog budget.");const i=new Map(n.inspections.map(d=>[d.id,d]));for(const d of Qu)for(const u of d.requirements)for(const[f,h]of u.any)if(!i.get(f)?.variants.some(p=>p.id===h))return to("account-catalog","This catalog does not contain the account evidence definitions.");const o=[],s=[],r=new Set;let a=0,l=0;for(const d of e){if(!ef(d))return to("account-entry","Use validated notebook entries.");const u=Object.hasOwn(d,"observation")?d.observation:d;if(!ef(u)||typeof u.historyId!="string")return to("account-entry","Use validated notebook entries.");if(u.historyId!==t.historyId)continue;if(typeof u.id!="string"||!u.id||r.has(u.id))return to("account-entry","Current notebook entry IDs must be unique.");if(r.add(u.id),u.kind==="player-note"){if(++l>200||!tf(u,h_)||![0,1,2,3].includes(u.era)||typeof u.text!="string"||u.text.length>4e3)return to("account-entry","Use bounded, validated player notes.");s.push(nf(u));continue}if(++a>2e3||!tf(u,c_))return to("account-entry","Use bounded, validated observations.");const f=i.get(u.inspectionId),h=f?.variants.find(p=>p.id===u.variantId);if(!f||!h||u.id!==JSON.stringify([t.historyId,f.id,h.id])||u.era!==f.era||u.subjectId!==f.subjectId||u.sourceId!==f.sourceId||u.kind!==f.kind||u.text!==h.text)return to("account-entry","An observation differs from its recorded catalog source or wording.");o.push(nf(u))}const c=Qu.map(d=>{const u=d.requirements.map(({id:y,label:g,any:m})=>({id:y,label:g,citations:o.filter(M=>{const E=M.entry;return m.some(([_,R])=>E.inspectionId===_&&E.variantId===R)})})),f=u.filter(y=>!y.citations.length).map(({id:y,label:g})=>({id:y,label:g})),h=[...new Map(u.flatMap(y=>y.citations).map(y=>[y.entryId,y])).values()],p=f.length===0?"supported":f.length===u.length?"unsupported":"partially-supported";return{id:d.id,title:d.title,status:p,requirements:u,missing:f,citations:h}});return{ok:!0,value:ud({accounts:c,inferences:s})}}const d_={0:"New Year's Eve 1926",1:"March 1958",2:"April 1991",3:"June 2026"},u_={"bell-key":"The bell-rope key","court-book":"The Court Book",workshop:"The workshop front","fire-trace":"Fire damage","bell-rope":"The bell rope","workshop-plaque":"The wall beside the rope","fire-report":"The Echo cutting","winnie-account":"Winnie's account","jonah-account":"Jonah's account of the fire","gallery-tea":"Winnie's tea table","stan-account":"Stan's account","court-cupboard":"The Long Room cupboard","workshop-backstore":"The back store","jonah-on-book":"Jonah on the Court Book","jonah-on-echo":"Jonah on the Echo cutting","jonah-on-rope":"Jonah on the bell rope","jonah-on-fire-damage":"Jonah on the fire damage","jonah-on-plaque":"Jonah on the brass plate","pear-tree":"The pear tree","amos-account":"Amos on the New Year bell","ida-account":"Ida on the pear tree","winnie-on-echo":"Winnie on the Echo cutting","winnie-on-book":"Winnie on the Court Book","winnie-on-rope":"Winnie on the bell rope","winnie-on-plaque":"Winnie on the brass plate","stair-petition":"Winnie's petition","bell-repair-note":"The repair note on the old bell","bell-consignment":"The label on the old bell","public-stair":"The foot of the stair","stair-record":"The 1991 stair file","stored-bell":"The old bell","court-book-facsimile":"The Court Book facsimile","opening-notice":"Today's notice","bell-bracket-view":"The bell bracket, from the gallery","maya-account":"Maya's account","theo-account":"Theo's account","bell-bracket-yard-view":"The bell bracket, from the courtyard","cracked-bell":"The old bell, down off its bracket","winnie-petition":"Winnie on her petition","winnie-stair-reasons":"Winnie on the stair","winnie-bell-reasons":"Winnie on the bell","jonah-stair-reasons":"Jonah on the stair","jonah-bell-reasons":"Jonah on the bell","maya-stair-account":"Maya on the stair"},f_={"winnie-account":"Winnie on the New Year bell","jonah-account":"Jonah on the New Year bell","bell-rope":"The bell rope, before midnight"},Pl={"winnie-memory":"Winnie, 73","winnie-account":"Winnie, 73","jonah-account":"Jonah, 71","stan-account":"Stan","amos-childhood-account":"Amos Pell","ida-childhood-account":"Ida Hale","winnie-childhood-account":"Winnie, 8","jonah-childhood-account":"Jonah, 6","maya-account":"Maya","theo-account":"Theo Pell"},Ll=(n,e=2)=>(e===0?f_[n]:void 0)??u_[n]??n.replace(/[-.]/g," ");function p_(n){const e=n.kind==="testimony"?"Said":"Seen",t=n.kind==="testimony"?Pl[n.sourceId]??"Someone":Ll(n.subjectId,n.era);return`${e}, ${d_[n.era]??n.era} — ${t}`}const m_=["ringing","kept","kind"],g_=64,y_=12,x_=4e3,v_={ringing:"The Ringing Court",kept:"The Kept Court",kind:"The Kind Court"},b_={ringing:"It rang when it mattered.",kept:"It was written down, and the writing survived.",kind:"They stayed friends, and it was told kindly."},wi=(n,e)=>{for(const[t,i]of e){const o=n.find(s=>s.inspectionId===t&&s.variantId===i);if(o)return o}},bl="If it cost anything, it isn’t in the notebook yet.";function __(n){const e=wi(n,[["plaque-1991","credited"],["plaque-1991","present"],["book-workshop-1991","rang"],["book-longroom-1991","rang"],["echo-1991","prompt"]]),t=wi(n,[["opening-notice-2026","cafe"],["opening-notice-2026","court"],["bell-bracket-yard-2026","ringing"],["bell-bracket-2026","ringing"],["bell-window-2026","stored"]]);if(!e||!t)return null;const i=[{obs:e,lead:e.inspectionId==="plaque-1991"?"Then I’ll tell them it rang. Somebody thought it mattered enough to put it in brass:":e.inspectionId==="echo-1991"?"Then I’ll tell them it rang. The Echo printed it at the time:":"Then I’ll tell them it rang. Nan wrote it in the Court Book herself:"},{obs:t,lead:t.inspectionId==="opening-notice-2026"?"And it rings again. It’s on today’s notice:":t.inspectionId==="bell-window-2026"?"It doesn’t ring now. It’s in my window with its clapper tied, but it’s the same bell:":"And it’s back up on its bracket. You saw it yourself:"}],o=wi(n,[["winnie-1991","accurate"],["winnie-1991","reconciled"],["friendship-1991","one"]]);return o?(o.variantId==="accurate"?i.push({obs:o,lead:"It cost her, though. She told you so herself:"}):o.variantId==="reconciled"?i.push({obs:o,lead:"And she remembered whose key it was:"}):i.push({obs:o,lead:"I don’t know what it cost them. You saw her table:"}),{picks:i}):{picks:i,tail:bl}}function w_(n){const e=wi(n,[["book-longroom-1991","didnotring"],["book-workshop-1991","didnotring"],["book-longroom-1991","rang"],["book-workshop-1991","rang"]]),t=wi(n,[["book-cafe-2026","original"],["book-copy-2026","didnotring"],["book-copy-2026","rang"]]);if(!e||!t)return null;const i=[{obs:e,lead:"Then I’ll tell them what was written down. Nan put it in the Court Book, in her own hand:",after:e.variantId==="didnotring"?"“Nobody’s fault.” She wrote that. I’d like people to know she wrote that.":void 0},{obs:t,lead:t.inspectionId==="book-cafe-2026"?"And the Book’s still here. It lives behind my counter:":"The Book itself went to the library. Theo keeps a copy in the Long Room:"}],o=wi(n,[["echo-1991","late"],["workshop-2026","garages"],["workshop-1991","garages"],["scorch-1991","lintel"]]);o&&i.push({obs:o,lead:"The paper came through. The workshop didn’t:"});const s=wi(n,[["stair-record-2026","public"],["stair-record-2026","gated-with-book"]]);return s&&i.push({obs:s,lead:s.variantId==="public"?"And because it came through, the stair’s still ours:":"It could have kept the stair open, too. Nobody took it to the meeting:"}),{picks:i,tail:o?void 0:bl}}function M_(n){const e=wi(n,[["friendship-1991","two"]]),t=wi(n,[["winnie-1991","kind"],["winnie-1991","reconciled"],["jonah-saved-1991","shared"]]);if(!e||!t)return null;const i=[{obs:e,lead:"Then I’ll tell them they stayed friends. You saw the table on the gallery:"},{obs:t,lead:t.variantId==="kind"?"And Nan told you it her way:":t.variantId==="reconciled"?"And Nan told you about the key:":"And Jonah told you how it started:"}];if(t.variantId==="kind"){const r=wi(n,[["jonah-admission-1991","admission"],["book-longroom-1991","didnotring"],["book-copy-2026","didnotring"],["echo-1991","late"]]);if(!r)return{picks:i,tail:"I can’t tell you if it’s true. It’s kind, and it was hers."};const a=r.inspectionId==="jonah-admission-1991"?"It isn’t what happened. Jonah told you as much:":r.inspectionId==="echo-1991"?"It isn’t what happened. The paper says so:":"It isn’t what happened. Her own Book says so:";return i.push({obs:r,lead:a,after:r.inspectionId==="echo-1991"?"So it’s a story told gently, and wrongly, and the workshop went all the same.":"So it’s a story told gently, and wrongly."}),{picks:i}}const o=t.inspectionId==="jonah-saved-1991"?t:wi(n,[["jonah-saved-1991","shared"]]),s=`It began before the fire, as he tells it. ${bl}`;return o===t?{picks:[i[0],{...i[1],after:s}]}:o?(i.push({obs:o,lead:"Jonah told you how it started:",after:s}),{picks:i}):{picks:i,tail:bl}}const Hp={ringing:__,kept:w_,kind:M_};function Gp(n,e){const t=Hp[n](e);return t?t.picks.map(i=>i.obs.id):[]}function of(n,e){const t=Hp[n](e);if(!t)return null;const i=[];for(const o of t.picks)i.push({kind:"maya",text:o.lead}),i.push({kind:"quote",entryId:o.obs.id,text:o.obs.text,cite:p_(o.obs)}),o.after&&i.push({kind:"maya",text:o.after});return t.tail&&i.push({kind:"maya",text:t.tail}),{accountId:n,title:v_[n],parts:i}}function sf(n){return n.parts.map(e=>e.kind==="maya"?e.text:`    ${e.text}
    (${e.cite})`).join(`
`)}function S_(n,e,t,i){const o=l=>({ok:!1,issues:[{code:"chosen-account",message:l}]});if(!Array.isArray(n)||n.length>g_)return o("The save lists too many accounts given to Maya.");const s=new Map(t.map(l=>[l.id,l])),r=[],a=new Set;for(const l of n){if(!l||typeof l!="object"||Array.isArray(l)||Object.keys(l).sort().join()!=="accountId,historyId,sources")return o("An account given to Maya is malformed.");const{historyId:c,accountId:d,sources:u}=l;if(typeof c!="string"||!e.has(c)||a.has(c))return o("An account given to Maya does not match the saved histories.");if(!m_.includes(d))return o("An account given to Maya is not one of the three readings.");if(!Array.isArray(u)||!u.length||u.length>y_||new Set(u).size!==u.length||u.some(g=>typeof g!="string"))return o("An account given to Maya cites its evidence wrongly.");const f=u.map(g=>s.get(g));if(f.some(g=>!g||g.historyId!==c))return o("An account given to Maya cites evidence that was not collected in that history.");const h=f,p=Bp(i,h,{historyId:c,contentVersion:i.contentVersion});if(!p.ok||p.value.accounts.find(g=>g.id===d)?.status!=="supported")return o("An account given to Maya is not supported by the evidence it cites.");const y=Gp(d,h);if(y.length!==u.length||y.some(g=>!u.includes(g)))return o("An account given to Maya cites evidence it does not quote.");a.add(c),r.push(Object.freeze({historyId:c,accountId:d,sources:Object.freeze([...u])}))}return{ok:!0,value:r}}function T_(n){return{supported:n.filter(e=>e.status==="supported"),partial:n.filter(e=>e.status==="partially-supported")}}function E_(n,e){const t={ringing:["Maya looks up at the arch for a while.","“Nan would have said it was only a bell. It wasn’t only a bell.”"],kept:["Maya turns the notebook round and reads it again.","“Paper. Of all the things to come through.”"],kind:["Maya smiles, mostly to herself.","“It’s a kind thing to leave behind. I’ll take kind.”"]}[n],i={bell:"[Over the arch the recast bell rings for the morning. People under it stop talking, and listen.]",cafe:"[The espresso machine hisses. Cups, chairs, the ordinary noise of a morning.]",stall:"[Under the arch a bicycle bell rings twice. Somebody laughs. Then the ordinary noise of a morning.]"}[e],o={ringing:"Whoever asks, from now on, will be told it rang.",kept:"Somewhere a page in Winnie’s hand stays exactly as she wrote it.",kind:"Nobody puts two cups out on the gallery any more. The story does that now."}[n];return{reaction:t,sound:i,last:o}}const rf=["Then we don’t know yet.","That’s all right. It’s waited this long. Keep looking."],Vp="The key still turns.",tl=["courtyard","workshop","longroom","gallery"],qs=[0,1,2,3];function nl(n,e){const{era:t,zoneId:i}=e;return i==="workshop"?t===0||t===1?!0:t===2?el(n,2,"workshop.use")==="coop":el(n,3,"workshop.use")==="cafe":i==="gallery"&&t===3?el(n,3,"stair.public")===!0:!0}const af="afterimage-place",A_=2.5*1024*1024,C_=64*qs.length*tl.length,Wa=(n,e,t)=>JSON.stringify([n,e,t]);function lf(n){try{const[e,t,i]=JSON.parse(n);return{historyId:e,era:t,zoneId:i}}catch{return null}}class R_{context;catalog;state;evaluations=new Map;visits=new Set;previous=null;chosen=new Map;constructor(e,t,i){const o=Jb(e,t);if(!o.ok)throw new Error(`Inspection catalog invalid: ${JSON.stringify(o.issues)}`);this.catalog=o.value;const s=qs.flatMap(a=>tl.map(l=>Object.freeze({era:a,zoneId:l})));this.context=Object.freeze({content:e,catalog:o.value,allowedPositions:Object.freeze(s),canVisit:nl});const r=t_(this.context,i);if(!r.ok)throw new Error(r.issues.map(a=>`${a.code}: ${a.message}`).join("; "));this.state=r.value}apply(e){return e.ok?(this.state=e.value,!0):!1}remember(){this.previous=this.state.slots.comparison}history(e){let t=this.evaluations.get(e);if(!t){const i=this.state.histories.find(s=>s.historyId===e);if(!i)throw new Error(`Unknown history ${e}`);t=this.evaluateChoices(i.choices),this.evaluations.set(e,t);const o=new Set([this.state.slots.working,this.state.slots.comparison,this.state.slots.baseline,e]);for(const s of this.evaluations.keys())o.has(s)||this.evaluations.delete(s)}return t}evaluateChoices(e){const t=ir(this.context.content,e);if(!t.ok)throw new Error(JSON.stringify(t.issues));return t.value}get evaluation(){return this.history(this.state.slots.working)}get comparisonEvaluation(){return this.state.slots.comparison?this.history(this.state.slots.comparison):null}get choices(){return this.evaluation.choices}get canUndo(){return this.state.undo.length>0}get canRedo(){return this.state.redo.length>0}get position(){return this.state.position}has(e){return this.choices.includes(e)}canVisitHere(e,t){return nl(this.evaluation,{era:e,zoneId:t})}move(e,t){const i=this.state.position.era===e&&this.state.position.zoneId===t||this.apply(Zu(this.state,{era:e,zoneId:t},this.context));return i&&this.visits.add(Wa(this.state.slots.working,e,t)),i}visited(e,t,i){return this.visits.has(Wa(e,t,i))}beenTo(e){for(const t of this.visits)if(lf(t)?.era===e)return!0;return!1}safePosition(e){const t=this.state.position;return nl(this.evaluateChoices(e),t)?{...t}:{era:t.era,zoneId:"courtyard"}}setChoice(e,t){if(this.has(e)===t)return!1;const i=t?[...this.choices,e]:this.choices.filter(s=>s!==e),o=this.state;return this.worthComparing(this.state.slots.working,this.choiceEra(e))&&!this.apply(_c(this.state,"comparison",this.context))?!1:this.apply(Ju(this.state,i,this.context,this.safePosition(i)))?((this.state.slots.comparison!==o.slots.comparison||!this.previous)&&this.remember(),!0):(this.state=o,!1)}step(e){const t=e==="undo"?this.state.undo.at(-1):this.state.redo.at(-1);if(!t)return!1;const i=this.state.histories.find(r=>r.historyId===t).choices,o=this.state;if(!this.apply(_c(this.state,"comparison",this.context)))return!1;const s=e==="undo"?Ku:n_;return this.apply(s(this.state,this.context,this.safePosition(i)))?(this.remember(),!0):(this.state=o,!1)}undo(){return this.step("undo")}choiceEra(e){return this.context.content.interventions.find(t=>t.id===e)?.era??1}worthComparing(e,t=1){return this.state.slots.comparison===null?!0:qs.some(i=>i>t&&tl.some(o=>this.visits.has(Wa(e,i,o))))||this.state.observations.some(i=>i.historyId===e&&i.era>t)}returnTo(e){if(e===this.state.slots.working)return!1;const t=this.state.histories.find(a=>a.historyId===e);if(!t)return!1;const i=this.safePosition(t.choices),o={era:this.state.position.era,zoneId:"courtyard"},s=_c(this.state,"comparison",this.context);if(!s.ok)return!1;let r=s.value;if(r.undo.includes(e)){for(;r.slots.working!==e&&r.undo.length;){const l=Ku(r,this.context,o);if(!l.ok)return!1;r=l.value}if(r.slots.working!==e)return!1;const a=Zu(r,i,this.context);if(!a.ok)return!1;r=a.value}else{const a=Ju(r,t.choices,this.context,i);if(!a.ok)return!1;r=a.value}return this.state=r,this.remember(),!0}redo(){return this.step("redo")}keep(){return this.apply(o_(this.state,this.context))?(this.previous=null,!0):!1}comparisonTarget(e){const t=e==="original"?this.state.slots.baseline:this.previous;return t&&t!==this.state.slots.working&&this.state.histories.some(i=>i.historyId===t)?t:null}compareWith(e){const t=this.comparisonTarget(e);return t?this.state.slots.comparison===t?!0:this.apply(i_(this.state,t,this.context)):!1}comparing(){const e=this.state.slots.comparison;return!e||e===this.state.slots.working?null:e===this.previous?"previous":e===this.state.slots.baseline?"original":"previous"}notesElsewhere(e,t){return this.state.observations.filter(i=>i.era===e&&!t.includes(i.historyId)).length}wouldStale(e,t){const i=t?[...this.choices,e]:this.choices.filter(s=>s!==e);if(this.evaluateChoices(i).historyId===this.evaluation.historyId)return[];const o=this.evaluation.historyId;return this.state.observations.filter(s=>s.historyId===o)}inspect(e){const t=this.state.observations.length,i=ju(this.state,e,this.context);if(!i.ok)return{error:i.issues.map(a=>a.message).join(" "),code:i.issues[0]?.code??"unknown"};this.state=i.value;const o=this.evaluation.historyId,s=i.value.observations.length>t;return{observation:s?i.value.observations.at(-1):i.value.observations.find(a=>a.inspectionId===e&&a.historyId===o),isNew:s}}canInspect(e){return this.hasInspection(e)&&ju(this.state,e,this.context).ok}addNote(e){const t=e.trim();if(!t)return null;let i=this.state.notes.length+1;for(;this.state.notes.some(o=>o.id===`note-${i}`);)i++;return this.apply(s_(this.state,`note-${i}`,t.slice(0,4e3),this.context))?this.state.notes.at(-1):null}entries(){return[...this.state.observations,...this.state.notes]}notebook(){return Dp(this.evaluation,this.entries())}currentFrom(e){const t=this.evaluation.historyId;return this.state.observations.filter(i=>i.historyId===t&&e.includes(i.inspectionId))}hasInspection(e){return this.catalog.inspections.some(t=>t.id===e)}inspection(e){return this.catalog.inspections.find(t=>t.id===e)}compare(e){const t=this.comparisonEvaluation;if(!t||t.historyId===this.evaluation.historyId)return[];const i=Zb(t,this.evaluation,this.state.observations,e);return i.ok?i.value:[]}save(){const e=Qb(this.state);if(!e.ok)return null;const t=[...this.visits].map(lf).filter(i=>!!i);return JSON.stringify({format:af,version:2,session:JSON.parse(e.value),visits:t,accounts:[...this.chosen.values()]})}load(e){if(typeof e!="string"||e.length>A_)return"The save is too large.";let t;try{t=JSON.parse(e)}catch{return"The save is not valid JSON."}const i=!!t&&typeof t=="object"&&!Array.isArray(t)&&t.format===af;let o=t,s=[],r=[];if(i){const u=t,f=Object.keys(u).sort().join();if(u.version===1&&f==="format,session,version,visits")o=u.session,s=u.visits;else if(u.version===2&&f==="accounts,format,session,version,visits")o=u.session,s=u.visits,r=u.accounts;else return"Unsupported place save version."}const a=dd(o,this.context);if(!a.ok)return a.issues.map(u=>u.message).join(" ");const l=new Set(a.value.histories.map(u=>u.historyId));if(!Array.isArray(s)||s.length>C_)return"The save lists too many visited places.";const c=new Set;for(const u of s){if(!u||typeof u!="object"||Array.isArray(u))return"A visited place in the save is malformed.";const{historyId:f,era:h,zoneId:p,...y}=u;if(Object.keys(y).length||typeof f!="string"||!l.has(f)||!qs.includes(h)||!tl.includes(p))return"A visited place in the save does not match its histories.";c.add(Wa(f,h,p))}const d=S_(r,l,a.value.observations,this.catalog);return d.ok?(this.state=a.value,this.visits=c,this.previous=a.value.slots.comparison,this.evaluations.clear(),this.chosen=new Map(d.value.map(u=>[u.historyId,u])),null):d.issues.map(u=>u.message).join(" ")}exportNotebook(e){const t=this.entries(),i=l_(this.evaluation,t,e);if(!i.ok)return null;const o=this.chosenAccounts(),s=Math.max(0,I_-t.length),r=o.slice(0,s),a=o.length-r.length;if(!o.length)return i.value;const l="What you told Maya: your own reading of the evidence, one per history. It is an interpretation, not a verdict; you can tell her something else.",c=y=>`${y.text.title} · ${y.status==="current"?"Current history":"An earlier history"}`,d=a?`${a} more ${a===1?"account":"accounts"} not included: the notebook export is full.`:"";if(e==="text"){const y=r.map(g=>`${c(g)}
${sf(g.text)}`).join(`

`);return`${i.value}
— What you told Maya —

${l}

${y}${d?`

${d}`:""}
`}const u=y=>y.replace(/[&<>"']/g,g=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[g]),f=y=>y.kind==="maya"?`<p>${u(y.text)}</p>`:`<blockquote><p>${u(y.text)}</p><footer>${u(y.cite)}</footer></blockquote>`,h=`<section class="told"><style>.told{margin-top:2.4rem;border-top:3px double #b6ad95;padding-top:1rem}.told blockquote{margin:.4rem 0 .8rem 1.2rem;padding-left:.8rem;border-left:3px solid #b6ad95}.told footer{font:.8rem system-ui,sans-serif;color:#575447}</style><h2>What you told Maya</h2><p>${u(l)}</p>${r.map(y=>`<article><h2>${u(c(y))}</h2>${y.text.parts.map(f).join("")}</article>`).join(`
`)}${d?`<p>${u(d)}</p>`:""}</section>`,p=i.value.lastIndexOf("</main>");return p<0?null:`${i.value.slice(0,p)}${h}${i.value.slice(p)}`}eligibility(){const e=Bp(this.catalog,this.entries(),this.evaluation);return e.ok?e.value.accounts:[]}chooseAccount(e){if(this.eligibility().find(r=>r.id===e)?.status!=="supported")return null;const t=this.evaluation.historyId,i=this.state.observations.filter(r=>r.historyId===t),o=Gp(e,i),s=of(e,i.filter(r=>o.includes(r.id)));return!s||sf(s).length>x_?null:(this.chosen.delete(t),this.chosen.set(t,Object.freeze({historyId:t,accountId:e,sources:Object.freeze(o)})),s)}accountText(e){const t=e.sources.map(i=>this.state.observations.find(o=>o.id===i)).filter(i=>!!i);return t.length===e.sources.length?of(e.accountId,t):null}chosenHere(){return this.chosen.get(this.evaluation.historyId)}chosenAccounts(){const e=this.evaluation.historyId;return[...this.chosen.values()].reverse().sort((t,i)=>+(i.historyId===e)-+(t.historyId===e)).flatMap(t=>{const i=this.accountText(t),o=this.state.histories.find(s=>s.historyId===t.historyId);return i&&o?[{record:t,text:i,status:t.historyId===e?"current":"former-history"}]:[]})}}const I_=2200,cf=new Map;function Jn(n){let e=2166136261;for(let t=0;t<n.length;t++)e=Math.imul(e^n.charCodeAt(t),16777619);return()=>{e+=1831565813;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Vi(n,e){const t=document.createElement("canvas");return t.width=n,t.height=e,[t,t.getContext("2d")]}function Wi(n,e=!0,t=!0){const i=new Qf(n);return e&&(i.wrapS=i.wrapT=sl),i.colorSpace=t?Wn:oo,i.anisotropy=4,i}function Xi(n,e){let t=cf.get(n);return t||(t=e(),cf.set(n,t)),t}const er=(n,e,t)=>`hsl(${n},${e}%,${t}%)`;function wc(n="old"){return Xi(`brick-${n}`,()=>{const[e,t]=Vi(256,256),i=Jn(`brick${n}`);t.fillStyle=n==="old"?"#b4a595":"#c9bfb3",t.fillRect(0,0,256,256);const o=20,s=256/o,r=32;for(let a=0;a<o;a++){const l=a%2?r/2:0;for(let c=-r;c<256+r;c+=r){const d=i(),u=n==="old"?8+i()*14:6+i()*8,f=n==="old"?38+i()*22:52+i()*16;let h=n==="old"?30+i()*16:36+i()*10;d<.07&&(h-=12),d>.95&&(h+=12),t.fillStyle=er(u,f,h),t.fillRect(c+l+1,a*s+1,r-2,s-2),t.fillStyle=`rgba(0,0,0,${.05+i()*.1})`,t.fillRect(c+l+1,a*s+s-3,r-2,2);for(let p=0;p<3;p++)t.fillStyle=`rgba(255,255,255,${i()*.07})`,t.fillRect(c+l+2+i()*(r-6),a*s+2+i()*(s-5),2+i()*4,1+i()*2)}}return Wi(e)})}function P_(){return Xi("cobbles",()=>{const[n,e]=Vi(512,512),t=Jn("cobbles");e.fillStyle="#2b2622",e.fillRect(0,0,512,512);const i=16,o=512/i;for(let s=0;s<i;s++){let a=-20+s%2*14;for(;a<530;){const l=22+t()*16,c=38+t()*20,d=25+t()*20,u=e.createRadialGradient(a+l/2-3,s*o+o/2-4,2,a+l/2,s*o+o/2,l*.7);u.addColorStop(0,er(d,10,c+12)),u.addColorStop(1,er(d,12,c-10)),e.fillStyle=u,e.beginPath(),e.ellipse(a+l/2,s*o+o/2,l/2-2,o/2-2,(t()-.5)*.2,0,Math.PI*2),e.fill(),a+=l}}return Wi(n)})}function hf(){return Xi("stone",()=>{const[n,e]=Vi(256,256),t=Jn("stone");e.fillStyle="#8f8574",e.fillRect(0,0,256,256);for(let i=0;i<4;i++)for(let o=0;o<3;o++){const s=o*86+i%2*40,r=i*64;e.fillStyle=er(34+t()*10,14+t()*10,50+t()*12),e.fillRect(s+2,r+2,82,60),e.fillRect(s+2-256,r+2,82,60);for(let a=0;a<60;a++)e.fillStyle=`rgba(${t()>.5?"255,255,255":"0,0,0"},${t()*.06})`,e.fillRect(s+t()*84,r+t()*62,2,2)}return Wi(n)})}function df(){return Xi("plaster",()=>{const[n,e]=Vi(256,256),t=Jn("plaster");e.fillStyle="#e8e0d0",e.fillRect(0,0,256,256);for(let i=0;i<900;i++){const o=200+t()*55;e.fillStyle=`rgba(${o},${o-6},${o-16},0.10)`,e.beginPath(),e.arc(t()*256,t()*256,3+t()*20,0,Math.PI*2),e.fill()}return Wi(n)})}function L_(){return Xi("planks",()=>{const[n,e]=Vi(256,256),t=Jn("planks");for(let i=0;i<8;i++){e.fillStyle=er(28+t()*8,30+t()*10,26+t()*10),e.fillRect(i*32,0,32,256),e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(i*32,0,2,256);for(let o=0;o<14;o++)e.fillStyle=`rgba(0,0,0,${.05+t()*.08})`,e.fillRect(i*32+3+t()*26,t()*256,1,20+t()*60)}return Wi(n)})}function k_(){return Xi("slate",()=>{const[n,e]=Vi(256,256),t=Jn("slate");e.fillStyle="#23262b",e.fillRect(0,0,256,256);for(let i=0;i<12;i++)for(let o=-20;o<256;o+=22)e.fillStyle=er(215,8+t()*6,20+t()*10),e.fillRect(o+i%2*11+1,i*21.3+1,20,20);return Wi(n)})}function Jo(){return Xi("glow",()=>{const[n,e]=Vi(128,128),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.5,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),Wi(n,!1)})}function Mt(n,e){return Xi(`sign-${n}`,()=>{const[t,i]=Vi(e.w,e.h),o=Jn(n);i.fillStyle=e.bg,i.fillRect(0,0,e.w,e.h);for(let a=0;a<(e.noise??0);a++)i.fillStyle=`rgba(0,0,0,${o()*.06})`,i.fillRect(o()*e.w,o()*e.h,1+o()*3,1+o()*3);e.border&&(i.strokeStyle=e.border,i.lineWidth=Math.max(2,e.h*.04),i.strokeRect(i.lineWidth,i.lineWidth,e.w-i.lineWidth*2,e.h-i.lineWidth*2)),i.fillStyle=e.fg,i.textAlign="center",i.textBaseline="middle";const s=e.lines.reduce((a,l)=>a+l.size*1.25,0);let r=e.h/2-s/2;for(const a of e.lines)i.font=`${a.style??""} ${a.size}px ${a.font??"Georgia, serif"}`,i.fillText(a.text,e.w/2,r+a.size*.62),r+=a.size*1.25;return Wi(t,!1)})}function N_(n,e){return Xi(`news-${n}`,()=>{const[t,i]=Vi(256,320),o=Jn(n);i.fillStyle="#e4dcc6",i.fillRect(0,0,256,320),i.fillStyle="#1f1b16",i.font="bold 15px Georgia, serif",i.textAlign="left",i.fillText("ALDERMOOR ECHO",14,26),i.fillRect(14,32,228,1.5),i.font="bold 19px Georgia, serif";const s=e.split(" ");let r="",a=58;for(const l of s)i.measureText(`${r} ${l}`).width>226?(i.fillText(r,14,a),r=l,a+=22):r=r?`${r} ${l}`:l;for(i.fillText(r,14,a),a+=16;a<306;a+=7)i.fillStyle=`rgba(40,34,28,${.35+o()*.3})`,i.fillRect(14,a,100+o()*128,2.2);return Wi(t,!1)})}function D_(){return Xi("puddles",()=>{const[n,e]=Vi(256,256),t=Jn("puddles");e.fillStyle="#b0b0b0",e.fillRect(0,0,256,256);for(let i=0;i<26;i++){const o=e.createRadialGradient(0,0,0,0,0,1);o.addColorStop(0,"#101010"),o.addColorStop(.7,"#202020"),o.addColorStop(1,"rgba(176,176,176,0)"),e.save(),e.translate(t()*256,t()*256),e.scale(12+t()*30,6+t()*14),e.fillStyle=o,e.beginPath(),e.arc(0,0,1,0,Math.PI*2),e.fill(),e.restore()}return Wi(n,!0,!1)})}const uf=new Map;function Ko(n){let e=uf.get(n);return e||(e=new yl({color:n,flatShading:!0}),uf.set(n,e)),e}const ff=new Map;function Mc(n){let e=ff.get(n);return e||(e=new yl({color:n,emissive:n,emissiveIntensity:.34}),ff.set(n,e)),e}function ct(n,e,t=0,i=0,o=0){const s=new ae(n,Ko(e));return s.position.set(t,i,o),s}function pf(n){const e=(n.height??1.72)/1.72*(n.child?.62:1),t=new Kt,i=new Kt;i.scale.setScalar(e),t.add(i);const o=n.skin??"#d9a988",s=[],r=n.seated?.48:.86;for(const h of[-1,1]){const p=new Kt;p.position.set(h*.1,r,0);const y=ct(new it(.07,.06,.82,6),n.trousers??"#2d2a2a",0,-.41,0),g=ct(new je(.11,.07,.24),"#1a1512",0,-.83,-.05);p.add(y,g),n.seated&&(p.rotation.x=-Math.PI/2*.95,y.position.y=-.38),i.add(p),s.push(p)}n.skirt&&!n.seated&&i.add(ct(new it(.2,.3,.5,8),n.skirt,0,.72,0));const a=new Kt;a.position.y=r,i.add(a);const l=ct(new it(.19,.25,.66,8),n.coat,0,.33,0);a.add(l),!n.seated&&!n.skirt&&a.add(ct(new it(.25,.27,.22,8),n.coat,0,-.02,0)),n.apron&&a.add(ct(new je(.34,.62,.03),n.apron,0,.14,-.23)),n.scarf&&a.add(ct(new Hn(.13,.05,5,10),n.scarf,0,.66,0).rotateX(Math.PI/2)),n.stoop&&(a.rotation.x=-n.stoop);const c=[];for(const h of[-1,1]){const p=new Kt;p.position.set(h*.25,.6,0),p.add(ct(new it(.06,.05,.6,6),n.coat,0,-.3,0));const y=new ae(new ci(.05,1),Mc(o));y.position.set(0,-.62,0),p.add(y),p.rotation.z=h*.08,a.add(p),c.push(p)}const d=new Kt;d.position.y=.66+.2,a.add(d),d.add(new ae(new Pn(.13,16,12),Mc(o)));const u=new ae(new je(.03,.05,.04),Mc(o));u.position.set(0,-.01,-.13),d.add(u);const f=n.hair??"#3b2a1e";if(n.hat!=="scarf"){const h=ct(new Pn(.137,10,6,0,Math.PI*2,0,Math.PI*.55),f,0,.02,.01);h.rotation.x=.5,d.add(h)}n.hairUp==="bun"&&d.add(ct(new ci(.06,1),f,0,.05,.13)),n.hairUp==="tail"&&d.add(ct(new it(.035,.015,.2,6),f,0,-.04,.15).rotateX(.35));for(const h of[-1,1])d.add(ct(new Pn(.014,5,4),"#1d1612",h*.045,.02,-.118));if(d.add(ct(new je(.05,.008,.01),"#9a6250",0,-.055,-.118)),n.hat==="trilby")d.add(ct(new it(.21,.21,.02,10),n.hatColor??"#3a3430",0,.08,0)),d.add(ct(new it(.1,.13,.12,8),n.hatColor??"#3a3430",0,.14,0));else if(n.hat==="cap")d.add(ct(new Pn(.145,8,4,0,Math.PI*2,0,Math.PI*.4),n.hatColor??"#4a4640",0,.04,0)),d.add(ct(new je(.2,.02,.1),n.hatColor??"#4a4640",0,.06,-.14));else if(n.hat==="bowler")d.add(ct(new it(.19,.19,.018,12),n.hatColor??"#1c1a19",0,.075,0)),d.add(ct(new Pn(.13,10,6,0,Math.PI*2,0,Math.PI*.5),n.hatColor??"#1c1a19",0,.08,0));else if(n.hat==="scarf"){const h=n.hatColor??"#8a3b3b",p=.95;d.add(ct(new Pn(.152,14,8,Math.PI*1.5+p,Math.PI*2-2*p,0,Math.PI*.64),h,0,.01,.005)),d.add(ct(new Pn(.154,14,4,0,Math.PI*2,0,Math.PI*.26),h,0,.012,.012)),d.add(ct(new ci(.035,0),h,0,-.1,.1))}if(n.carry==="ledger"&&c[1].add(ct(new je(.05,.3,.22),"#5b2e22",.02,-.5,-.05)),n.carry==="clipboard"&&c[1].add(ct(new je(.03,.3,.22),"#8a6b45",.02,-.5,-.1)),n.carry==="bucket"&&c[0].add(ct(new it(.13,.1,.24,8,1,!0),"#8f9296",0,-.72,0)),n.carry==="mug"&&(c[1].rotation.x=-.9,c[1].add(ct(new it(.045,.04,.09,7),"#e8e2d4",0,-.62,-.03))),n.carry==="stick"&&c[1].add(ct(new it(.015,.015,.9,5),"#3b2a1e",.02,-.72,-.1).rotateX(.2)),n.carry==="wireless"&&(c[0].rotation.x=c[1].rotation.x=-.9,a.add(ct(new je(.42,.3,.22),"#6b4a2e",0,.38,-.36)),a.add(ct(new Sn(.3,.14),"#caa36a",0,.4,-.475).rotateY(Math.PI))),n.carry==="pole"&&(c[1].rotation.x=-.35,c[1].add(ct(new it(.014,.014,2.6,5),"#4a3524",.02,.3,-.05).rotateX(-.25)),c[1].add(ct(new je(.06,.08,.06),"#c9a24c",.02,1.55,-.38))),n.carry==="basket"&&c[0].add(ct(new it(.16,.12,.18,8,1,!0),"#a07a48",0,-.72,0)),n.carry==="reach"&&(c[1].rotation.x=-1.1,c[1].rotation.z=.25),n.carry==="hand"&&(c[0].rotation.x=-.5,c[0].rotation.z=-.35),n.carry==="bike"){const h=new Kt;h.position.set(.45,0,-.1),h.rotation.y=Math.PI/2,i.add(h);for(const p of[-.5,.5]){const y=ct(new Hn(.33,.025,5,16),"#141414",p,.34,0);h.add(y)}h.add(ct(new je(.95,.04,.04),n.hatColor??"#2d5a57",0,.62,0)),h.add(ct(new je(.04,.04,.45),"#141414",.46,.9,0)),c[1].rotation.x=-.4}if(n.carry==="scooter"){const h=new Kt;h.position.set(0,0,0),i.add(h),h.add(ct(new je(.14,.04,.7),"#3a8ac8",0,.08,0)),h.add(ct(new it(.02,.02,.9,5),"#999999",0,.5,-.33)),h.add(ct(new je(.4,.03,.03),"#222222",0,.95,-.33)),c[0].rotation.x=c[1].rotation.x=-.6}if(n.carry==="plank"&&c[1].add(ct(new je(.06,.16,2),"#b08a5a",.05,-.55,.2)),n.umbrella){const h=new Kt;h.add(ct(new Qo(.6,.28,8,1,!0),n.umbrella,0,.14,0)),h.add(ct(new it(.01,.01,.9,4),"#222",0,-.3,0)),h.position.set(.1,1.2,-.05),c[1].rotation.x=-.5,a.add(h)}return t.traverse(h=>{h.isMesh&&(h.castShadow=!1)}),{group:t,head:d,body:a,legs:s,arms:c,phase:Math.random()*10,facing:0,seated:!!n.seated,headY:e*(r+.86)}}const Sc=new F,Wp=n=>Math.atan2(Math.sin(n),Math.cos(n));function Tc(n,e,t,i){return n+Wp(e-n)*Math.min(1,i*t)}const U_=1.4;function z_(n,e,t,i,o=!1){const s=t+n.phase;n.body.scale.y=1+Math.sin(s*1.6)*.008,n.attention=o?U_:Math.max(0,(n.attention??0)-e);const r=n.attention>0;n.group.getWorldPosition(Sc);const a=i.x-Sc.x,l=i.z-Sc.z,c=Math.hypot(a,l),d=Math.atan2(-a,-l);if(n.path){const h=n.path;if(r){for(const _ of n.legs)_.rotation.x*=Math.max(0,1-e*8);n.arms[0].rotation.x>-.5&&(n.arms[0].rotation.x*=Math.max(0,1-e*8)),n.group.position.y*=Math.max(0,1-e*8),n.group.rotation.y=Tc(n.group.rotation.y,d,5,e),n.head.rotation.y+=(0-n.head.rotation.y)*Math.min(1,e*3);return}const p=h.points.length;{const _=h.t+e*h.speed,R=Math.floor(_)%p,A=_-Math.floor(_),N=h.points[R],b=h.points[(R+1)%p],C=N.x+(b.x-N.x)*A,S=N.z+(b.z-N.z)*A;if(Math.hypot(i.x-C,i.z-S)<.9&&Math.hypot(i.x-C,i.z-S)<c){for(const $ of n.legs)$.rotation.x*=Math.max(0,1-e*8);n.group.position.y*=Math.max(0,1-e*8);return}}h.t+=e*h.speed;const y=Math.floor(h.t)%p,g=h.t-Math.floor(h.t),m=h.points[y],M=h.points[(y+1)%p];n.group.position.lerpVectors(m,M,g),n.group.rotation.y=Tc(n.group.rotation.y,Math.atan2(-(M.x-m.x),-(M.z-m.z)),6,e);const E=Math.sin(s*6.5)*.5;n.legs[0].rotation.x=E,n.legs[1].rotation.x=-E,n.arms[0].rotation.x>-.5&&(n.arms[0].rotation.x=-E*.5),n.group.position.y=Math.abs(Math.sin(s*6.5))*.03;return}const u=r&&!n.seated?d:n.facing;n.group.rotation.y=Tc(n.group.rotation.y,u,4,e);let f=Math.sin(s*.3)*.25;(n.lookAt!==!1||r)&&c<6&&(f=Math.max(-1.1,Math.min(1.1,Wp(d-n.group.rotation.y)))),n.head.rotation.y+=(f-n.head.rotation.y)*Math.min(1,e*3)}function Xp(n,e){const t=new Kt;t.name=`court-${n}`;const i=[],o=[],s=[],r={},a={};let l=new Set;const c=Ip(n,e),d=n===0,u=n===1,f=n===2,h=n===3,p=d||u,y=e.e1991,g=e.e1958,m=e.e1926,M=e.d1991,E=e.e2026,_=hd(n,e),R=h&&E.workshopUse==="cafe",A=ia(n,e),N=nr[A],b=Jn(`court-${n}`),C=x=>(i.push(x),x),S=x=>C(new yl(x)),V=x=>C(new Wo(x)),$=f,T={brick:V({map:wc("old"),color:d?"#b8907c":u?"#b39486":h?"#b89a8a":"#9c8378",roughness:$?.62:.95}),newBrick:V({map:wc("new"),color:"#c9a898",roughness:$?.6:.9}),stone:V({map:hf(),color:d?"#bdb2a0":u?"#b5aa98":h?"#c4bba8":"#a39a8a",roughness:$?.55:.9}),plaster:S({map:df(),color:p?"#e6d2b0":"#d8d4c8"}),plasterWorkshop:S({map:df(),color:d?"#cdb58e":u?"#d9c29a":h?"#efe6d4":"#cfd3cf"}),planks:S({map:L_(),color:"#b89878"}),slate:S({map:k_(),color:d?"#a8aebd":u?"#8a90a0":"#9aa0a4",side:tn}),iron:V({color:"#23211f",roughness:.6,metalness:.4}),wood:S({color:"#5a3a22"}),darkWood:S({color:"#3a2618"}),coopGreen:S({color:d?"#3b3a2c":u?"#2f5d45":h?"#2d5a57":"#4c6e5c"}),pellRed:S({color:p?"#6e1f1c":"#5e2a26"}),blueDoor:S({color:p?"#35557a":"#4b6a88"}),black:S({color:"#0d0b0a"}),glassDay:V({color:"#39444c",roughness:.08,metalness:.3}),glowWarm:S({color:"#2a1a08",emissive:"#ffb45a",emissiveIntensity:1.1}),glowWarmDim:S({color:"#1c1208",emissive:"#e98f3e",emissiveIntensity:.55}),glowCool:S({color:"#10161a",emissive:"#dff0ff",emissiveIntensity:1.2}),curtain:S({color:p?"#7a3a2a":"#8b8a6a"}),net:S({color:"#e8e6dc",transparent:!0,opacity:.8}),rope:S({color:d?"#b8a27a":u?"#cbb68c":h?"#d6c49a":y.ropeState==="polished"?"#5a3f25":"#6d6454"}),gas:S({color:"#2a2210",emissive:"#ffe2a0",emissiveIntensity:1.3}),brass:V({color:"#c9a24c",roughness:.35,metalness:.8}),soot:S({color:"#000",transparent:!0,opacity:.85,depthWrite:!1})},I=(x,O=t)=>(O.add(x),x),k=x=>C(x);function L(x,O,U,H,W,J,Q,v=t){const P=new ae(k(new je(x,O,U)),H);return P.position.set(W,J,Q),I(P,v)}function Z(x,O,U,H,W,J,Q,v=1.3){const P=k(new je(x,O,U)),B=P.attributes.uv,G=P.attributes.normal;for(let ee=0;ee<B.count;ee++){const ue=Math.abs(G.getX(ee)),se=Math.abs(G.getY(ee)),he=ue>.5?U:x,ge=se>.5?U:O;B.setXY(ee,B.getX(ee)*he/v,B.getY(ee)*ge/v)}const z=new ae(P,H);return z.position.set(W,J,Q),I(z)}function j(x,O,U,H,W,J,Q=0,v=t){const P=new ae(k(new Sn(x,O)),U);return P.position.set(H,W,J),P.rotation.y=Q,I(P,v)}const ne={"+z":0,"-z":Math.PI,"-x":-Math.PI/2,"+x":Math.PI/2},ce=(x,O)=>x==="+z"?O:x==="-z"?-O:x==="-x"?O:-O;function pe(x,O,U,H,W){switch(x){case"+z":return new F(U,H,O+W);case"-z":return new F(U,H,O-W);case"-x":return new F(O-W,H,U);case"+x":return new F(O+W,H,U)}}function De(x,O,U,H,W,J,Q,v=[],P=1.3){const B=Math.min(ce(x,U),ce(x,H)),G=Math.max(ce(x,U),ce(x,H)),z=new sp;z.moveTo(B,W),z.lineTo(G,W),z.lineTo(G,J),z.lineTo(B,J),z.lineTo(B,W);for(const ge of v){const Le=Math.min(ce(x,ge.a0),ce(x,ge.a1)),Xe=Math.max(ce(x,ge.a0),ce(x,ge.a1)),Ee=new mh;if(ge.arch){const xt=(Xe-Le)/2,It=ge.y1-xt;Ee.moveTo(Le,ge.y0),Ee.lineTo(Le,It),Ee.absarc((Le+Xe)/2,It,xt,Math.PI,0,!0),Ee.lineTo(Xe,ge.y0),Ee.lineTo(Le,ge.y0)}else Ee.moveTo(Le,ge.y0),Ee.lineTo(Le,ge.y1),Ee.lineTo(Xe,ge.y1),Ee.lineTo(Xe,ge.y0),Ee.lineTo(Le,ge.y0);z.holes.push(Ee)}const ee=k(new ad(z,12)),ue=ee.attributes.uv;for(let ge=0;ge<ue.count;ge++)ue.setXY(ge,ue.getX(ge)/P,ue.getY(ge)/P);const se=new ae(ee,Q),he=pe(x,O,0,0,0);return se.position.set(x==="+z"||x==="-z"?0:he.x,0,x==="+x"||x==="-x"?0:he.z),se.rotation.y=ne[x],I(se)}function Fe(x,O,U,H,W=T.stone,J=.28,Q=!0){const v=Math.abs(U.a1-U.a0),P=U.y1-U.y0,B=(U.a0+U.a1)/2,G=new Kt,z=ne[x],ee=(he,ge,Le,Xe)=>{he.position.copy(pe(x,O,ge,Le,Xe)),he.rotation.y=z,G.add(he)},ue=(U.a1-U.a0)/2,se=()=>new ae(k(new je(.1,P,J)),W);return ee(se(),B-ue-0,U.y0+P/2,-J/2+.03),ee(se(),B+ue+0,U.y0+P/2,-J/2+.03),G.children[0].position.copy(pe(x,O,U.a0,U.y0+P/2,-J/2+.03)),G.children[1].position.copy(pe(x,O,U.a1,U.y0+P/2,-J/2+.03)),ee(new ae(k(new je(v+.3,.16,J+.02)),W),B,U.y1+.07,-J/2+.04),Q&&U.y0>.05&&ee(new ae(k(new je(v+.25,.08,J+.1)),W),B,U.y0-.04,-J/2+.08),H&&ee(new ae(k(new Sn(v,P)),H),B,U.y0+P/2,-J+.02),I(G),G}function rt(x,O,U,H,W=1,J=1.5,Q=!1,v=!0){const P={a0:U-W/2,a1:U+W/2,y0:H,y1:H+J},B=p?Q?T.glowWarm:T.glowWarmDim:T.glassDay,G=Fe(x,O,P,B),z=ne[x],ee=(ue,se,he,ge)=>{const Le=new ae(k(new je(ue,se,.04)),T.darkWood);Le.position.copy(pe(x,O,he,ge,-.2)),Le.rotation.y=z,G.add(Le)};if(ee(W,.05,U,H+J/2),ee(.04,J,U,H+J/2),v&&b()>.25){const ue=f&&b()>.5?T.net:T.curtain;for(const se of[-1,1]){const he=new ae(k(new Sn(W*.26,J*.96)),ue);he.position.copy(pe(x,O,U+se*W*.36*(x==="-z"||x==="+x"?-1:1),H+J/2,-.23)),he.rotation.y=z,G.add(he)}}return P}function dt(x,O,U,H,W=1,J=2.2,Q=!1){const v={a0:U-W/2,a1:U+W/2,y0:0,y1:J};if(Fe(x,O,v,Q?null:H,T.stone,.3,!1),!Q){const P=new ae(k(new Pn(.035,6,4)),T.brass);P.position.copy(pe(x,O,U+W*.35*(x==="-z"||x==="+x"?-1:1),1,-.24)),I(P)}return v}function Rt(x,O,U){const H=new ae(k(new it(.34,.34,.04,14)),S({color:U}));H.position.set(x,.76,O),I(H),L(.05,.74,.05,T.iron,x,.37,O);for(const W of[.8,3.9]){const J=x+Math.cos(W)*.55,Q=O+Math.sin(W)*.55;L(.36,.04,.36,T.iron,J,.45,Q),L(.03,.45,.03,T.iron,J,.22,Q)}}function ie(x,O,U,H,W=0){const J=new Kt;J.position.set(x,W,O),J.rotation.y=U,I(J);for(const G of[-.52,.52]){const z=new ae(k(new Hn(.33,.025,5,18)),T.black);z.position.set(G,.34,0),J.add(z)}const Q=new ae(k(new je(.95,.04,.04)),S({color:H}));Q.position.set(0,.62,0),J.add(Q);const v=new ae(k(new je(.04,.4,.04)),S({color:H}));v.position.set(-.1,.45,0),v.rotation.z=.5,J.add(v);const P=new ae(k(new je(.04,.04,.45)),T.black);P.position.set(.48,.92,0),J.add(P);const B=new ae(k(new je(.22,.05,.1)),T.black);return B.position.set(-.3,.86,0),J.add(B),J}const de=new ot(d?"#2a4282":u?"#0b1026":h?"#3f7fcf":"#8f9a9c"),Be=new ot(d?"#eaa06a":u?"#3b2f4a":h?"#d3e6f2":"#c7cdc8"),tt=C(new Ei({side:An,depthWrite:!1,fog:!1,uniforms:{top:{value:de},horizon:{value:Be}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 horizon; varying vec3 vDir; void main(){ float k = pow(clamp(vDir.y,0.0,1.0),${d?"0.32":"0.55"}); gl_FragColor = vec4(mix(horizon, top, k), 1.0); }`})),Oe=new ae(k(new Pn(180,24,12)),tt);if(Oe.renderOrder=-1,I(Oe),p){const x=[];for(let U=0;U<(d?40:260);U++){const H=b()*Math.PI*2,W=.25+b()*1.2;x.push(Math.cos(H)*Math.cos(W)*170,Math.sin(W)*170,Math.sin(H)*Math.cos(W)*170)}const O=k(new nn);if(O.setAttribute("position",new gt(x,3)),I(new su(O,C(new fh({color:"#cfd6ff",size:1.1,sizeAttenuation:!1,fog:!1})))),u){const U=new ae(k(new Pi(5,20)),C(new xi({color:"#f3ecd6",fog:!1})));U.position.set(-60,70,120),U.lookAt(0,0,0),I(U)}else{const U=new ae(k(new Pi(.9,8)),C(new xi({color:"#fff6e0",fog:!1})));U.position.set(-150,38,30),U.lookAt(0,0,0),I(U)}}const ut=new ed(d?"#4a4258":u?"#1b1a2c":h?"#d6e4ec":"#aeb5b2",f?14:h?30:16,f?62:h?110:75);if(d){I(new Da("#7f8fc4","#4a3424",1.35));const x=new Oa("#ffb27a",.55);x.position.set(-30,12,8),I(x)}else if(u){I(new Da("#51608f","#3a2a1c",1.25));const x=new Oa("#8ea0d8",.35);x.position.set(-20,30,25),I(x)}else if(h){I(new Da("#e6f0ff","#7a6448",1.9));const x=new Oa("#fff0d2",1.7);x.position.set(30,24,6),I(x)}else{I(new Da("#dfe6e6","#4a4238",2.1));const x=new Oa("#e8ecea",1);x.position.set(-18,30,14),I(x)}const Qe=(x,O,U,H,W,J=14,Q=0)=>{const v=new Ig(x,O,J,1.6);if(v.position.set(U,H,W),I(v),Q){const P=new uh(C(new pl({map:Jo(),color:x,transparent:!0,depthWrite:!1,blending:Hs,opacity:.8})));P.scale.setScalar(Q),P.position.set(U,H,W),I(P)}return v},at=V({map:P_(),color:d?"#b9b6b8":u?"#a9a39c":h?"#a8a097":"#8c8580",roughness:$?.5:.95,roughnessMap:$?D_():null,metalness:$?.15:0}),yt=new ae(k(new Sn(20,16)),at);yt.rotation.x=-Math.PI/2,yt.position.set(0,0,0);const Ut=yt.geometry.attributes.uv;for(let x=0;x<Ut.count;x++)Ut.setXY(x,Ut.getX(x)*10,Ut.getY(x)*8);I(yt);const lt=new ae(k(new Sn(60,8)),at);lt.rotation.x=-Math.PI/2,lt.position.set(0,-.01,-15.5),I(lt);const Ht=lt.geometry.attributes.uv;for(let x=0;x<Ht.count;x++)Ht.setXY(x,Ht.getX(x)*30,Ht.getY(x)*4);const cn=new ae(k(new Sn(3.2,4)),at);cn.rotation.x=-Math.PI/2,cn.position.set(0,.002,-10),I(cn);for(const[x,O,U,H]of[[20,.25,0,-7.85],[20,.25,0,7.85],[.25,16,-9.85,0],[.25,16,9.85,0]])L(x,.04,O,T.stone,U,.02,H);if(p){const x=S({color:"#e8ecf4",alphaMap:Jo(),transparent:!0,opacity:d?.6:.5,depthWrite:!1});for(let O=0;O<(d?44:26);O++){const U=new ae(k(new Sn(2.5+b()*3,2.5+b()*3)),x);U.rotation.x=-Math.PI/2;const H=b();U.position.set(H<.5?(b()<.5?-9.3:9.3)+(b()-.5):(b()-.5)*18,.012,H<.5?(b()-.5)*15:(b()<.5?-7.3:7.3)+(b()-.5)),U.scale.set(1,.5+b(),1),I(U)}}else{const x=Ko("#4f6b35");for(let O=0;O<40;O++){const U=new ae(k(new Qo(.05+b()*.05,.12+b()*.12,4)),x),H=Math.floor(b()*3);U.position.set(H===0?-9.6+b()*.3:(b()-.5)*18,.06,H===1?7.6:H===2?-7.6:(b()-.5)*14),I(U)}}const ze=-8,_t=[{a0:ht.x0,a1:ht.x1,y0:0,y1:ht.height,arch:!0}];_t.push(dt("+z",ze,-8.4,T.blueDoor),dt("+z",ze,-4.2,T.wood));for(const x of[-6.7,-2.9])_t.push(rt("+z",ze,x,.9,1,1.4,p&&x<-5));for(const x of[-8.4,-6.3,-4.2,-2.6])_t.push(rt("+z",ze,x,4,.9,1.4,p&&x>-7));if(d){const x={a0:We.door[0],a1:We.door[1],y0:0,y1:2.35};_t.push(x),Fe("+z",ze,x,null,T.stone,.3,!1);const O=L(.05,2.25,1.1,T.coopGreen,We.door[0]+.06,1.12,ze-.62);O.rotation.y=.9;const U={a0:We.window[0],a1:We.window[1],y0:.75,y1:2.65};_t.push(U),Fe("+z",ze,U,null,T.darkWood);for(let J=We.window[0]+.6;J<We.window[1]-.1;J+=.6)L(.04,1.9,.04,T.darkWood,J,1.7,ze-.12);for(let J=1.2;J<2.6;J+=.48)L(We.window[1]-We.window[0],.04,.04,T.darkWood,(We.window[0]+We.window[1])/2,J,ze-.12);const H=j(We.window[1]-We.window[0],1.9,C(new Wo({color:"#ffcf96",emissive:"#6a3a14",transparent:!0,opacity:.35,roughness:.9})),(We.window[0]+We.window[1])/2,1.7,ze-.1);H.renderOrder=2;const W=Mt("fascia-0",{w:1024,h:128,bg:"#2a2418",fg:"#e8d7a6",border:"#8a7448",noise:400,lines:[{text:"MERCER & SONS  ·  TALLOW CHANDLERS",size:54,style:"bold"}]});j(7.4,.62,S({map:W}),6.3,2.98,ze+.02),Qe("#ffb06a",6,3.6,2,ze+.9,7,0)}else if(_){const x={a0:We.door[0],a1:We.door[1],y0:0,y1:2.35};_t.push(x),Fe("+z",ze,x,null,T.stone,.3,!1);const O=L(.05,2.25,1.1,T.coopGreen,We.door[0]+.06,1.12,ze-.62);O.rotation.y=.35;const U={a0:We.window[0],a1:We.window[1],y0:.75,y1:2.65};_t.push(U),Fe("+z",ze,U,null,T.darkWood);for(let J=We.window[0]+1.2;J<We.window[1]-.2;J+=1.2)L(.05,1.9,.05,T.darkWood,J,1.7,ze-.12);const H=j(We.window[1]-We.window[0],1.9,C(new Wo({color:u?"#ffd9a0":"#c8d6de",transparent:!0,opacity:u?.08:h?.1:.16,roughness:.05})),(We.window[0]+We.window[1])/2,1.7,ze-.1);u&&Qe("#ffbf78",9,3.7,2.2,ze+1.1,7.5,0),H.renderOrder=2;const W=h?Mt("fascia-cafe",{w:1024,h:128,bg:"#2d4a46",fg:"#f4e4b4",border:"#c9a24c",noise:60,lines:[{text:"THE LAMPLIGHT  ·  CAFÉ",size:60,style:"bold"}]}):Mt(`fascia-${n}`,{w:1024,h:128,bg:u?"#1f3b2c":"#3f5a4b",fg:u?"#f0d488":"#d8cfa8",border:u?"#c9a24c":"#8d8a70",noise:u?200:1600,lines:[{text:"LAMPLIGHT CO-OP  ·  LAMPS & WIRELESSES MENDED",size:52,style:"bold"}]});if(j(7.4,.62,S({map:W}),6.3,2.98,ze+.02),h){const J=L(We.window[1]-We.window[0]+.3,.05,1.1,S({color:"#c9d8cf"}),(We.window[0]+We.window[1])/2,2.72,ze+.55);J.rotation.x=-.25;for(let P=We.window[0];P<We.window[1];P+=.6){const B=L(.3,.052,1.1,S({color:"#2d5a57"}),P+.3,2.725,ze+.55);B.rotation.x=-.25}const Q=Mt("chalkboard",{w:256,h:320,bg:"#20262a",fg:"#f0ece0",lines:[{text:"OPEN",size:48,style:"bold",font:"Arial, sans-serif"},{text:"flat white 3.10",size:26,font:"Segoe Script, cursive"},{text:"pear cake",size:26,font:"Segoe Script, cursive"}]}),v=j(.5,.62,S({map:Q,side:tn}),2.55,.5,ze+.45,0);v.rotation.x=-.12}else if(u){const J=Mt("neon",{w:512,h:128,bg:"#000000",fg:"#ff4a6e",lines:[{text:"Wireless",size:88,font:"Brush Script MT, Segoe Script, cursive",style:"italic bold"}]}),Q=C(new xi({map:J,transparent:!0,blending:Hs,depthWrite:!1,color:"#ffffff"}));j(1.6,.4,Q,8.4,2.25,ze-.14),Qe("#ff3d64",3,8.4,2.2,ze+.6,5,1.8)}else{const J=Mt("neon-dead",{w:512,h:128,bg:"#000000",fg:"#6a2a36",lines:[{text:"Wireless",size:88,font:"Brush Script MT, Segoe Script, cursive",style:"italic bold"}]});j(1.6,.4,C(new xi({map:J,transparent:!0,opacity:.8})),8.4,2.25,ze-.14)}}else{for(const[U,H]of Ns)_t.push({a0:U,a1:H,y0:0,y1:2.2});const x=(U,H,W,J)=>{const Q=new ae(k(new Sn(H-U,J-W)),T.newBrick),v=Q.geometry.attributes.uv;for(let P=0;P<v.count;P++)v.setXY(P,v.getX(P)*(H-U)/1.3,v.getY(P)*(J-W)/1.3);Q.position.set((U+H)/2,(W+J)/2,ze+.012),I(Q)};x(We.door[0]-.05,We.window[1]+.05,2.2,2.75),x(Ns[0][1],Ns[1][0],0,2.75),x(Ns[1][1],Ns[2][0],0,2.75),Ns.forEach(([U,H],W)=>{const J=H-U,Q=(U+H)/2,v=S({color:["#6f8590","#7b8b86","#6c7a8c"][W]});L(J-.04,2.18,.06,v,Q,1.09,ze-.12);for(let G=.3;G<2.1;G+=.3)L(J-.1,.03,.02,S({color:"#56666e"}),Q,G,ze-.08);const P=W===1,B=L(J+.3,.24,.3,P?S({color:"#1d1714"}):T.wood,Q,2.32,ze-.02);if(P){r.lintel=B;const G=new ae(k(new Sn(J+.8,1.8)),C(new xi({map:fs(),transparent:!0,depthWrite:!1,color:"#000"})));G.position.set(Q,3.2,ze+.02),I(G),L(.04,.26,.32,T.black,Q+.3,2.32,ze-.02).rotation.z=.4}});const O=Mt("private",{w:512,h:160,bg:"#f2efe6",fg:"#a3221c",border:"#a3221c",lines:[{text:"PRIVATE GARAGES",size:46,style:"bold",font:"Arial, sans-serif"},{text:"NO PARKING  ·  PELL PROPERTIES",size:30,font:"Arial, sans-serif"}]});j(.9,.28,S({map:O}),5.25,1.7,ze+.03)}const Qt=dt("+z",ze,5,T.blueDoor,.95,2.1);Qt.y0+=Ae,Qt.y1+=Ae,_t.push(Qt),Fe("+z",ze,Qt,T.blueDoor,T.stone,.3,!1);const q={a0:8.6,a1:9.5,y0:Ae,y1:Ae+2.1};_t.push(q),Fe("+z",ze,q,T.wood,T.stone,.3,!1);for(const x of[3.3,6.6,7.7])_t.push(rt("+z",ze,x,Ae+.8,.85,1.3,p&&x!==7.7));De("+z",ze,-10,10,0,ri,T.brick,_t);for(let x=0;x<=14;x++){const O=Math.PI*(x/14),U=(ht.x1-ht.x0)/2+.16,H=ht.height-(ht.x1-ht.x0)/2,W=L(x===7?.3:.24,.32,.12,T.stone,Math.cos(O)*U,H+Math.sin(O)*U,ze+.05);W.rotation.z=O-Math.PI/2}for(const x of[ht.x0-.1,ht.x1+.1])for(let O=.2;O<2;O+=.45)L(.3,.36,.1,T.stone,x+(Math.round(O/.45)%2?0:x<0?-.05:.05),O,ze+.05);const _n=Mt("datestone",{w:256,h:96,bg:"#9c907c",fg:"#4a4034",lines:[{text:"CHANDLER'S COURT",size:26,style:"bold"},{text:"1861",size:30}]});j(.9,.34,S({map:_n}),0,4.38,ze+.03);for(const x of[ht.x0,ht.x1])j(ht.depth,2,T.brick,x,1,ze-ht.depth/2,x<0?Math.PI/2:-Math.PI/2);const kt=new ae(k(new it(1.6,1.6,ht.depth,14,1,!0,Math.PI/2,Math.PI)),C(new yl({map:wc("old"),color:"#8a7064",side:An})));kt.position.set(0,2,ze-ht.depth/2),kt.rotation.set(Math.PI/2,0,0),I(kt);const D=We.z0-1.6,w=ht.x1+.3;De("-z",ze-ht.depth,-10,w,0,ri,T.brick,[{a0:ht.x0,a1:ht.x1,y0:0,y1:ht.height,arch:!0}]),De("-x",w,D,ze-ht.depth,0,ri,T.brick);const Y=[];for(const x of[4.5,7.5])Y.push(rt("-z",D,x,1.2,.9,1.3,p),rt("-z",D,x,4.1,.9,1.3,p&&x>5));De("-z",D,w,14,0,ri,T.brick,Y),L(14-w,.2,We.z0-D+.4,T.slate,(w+14)/2,ri+.1,(D+We.z0)/2-.2),Fo("z",-10,10,ze,ze-6,ri);const K=-19.5,te=[];for(let x=-9;x<=9;x+=3)te.push(rt("+z",K,x,1,1,1.4,p&&b()>.4)),te.push(rt("+z",K,x+.5,4,1,1.4,p&&b()>.5));if(De("+z",K,-14,14,0,7.5,T.brick,te),L(28,.6,.4,T.slate,0,7.7,K-.1),d)Qe("#ffe2a0",8,-2.8,3.4,-13.4,12,1.3),L(.08,3.4,.08,T.iron,-2.8,1.7,-13.4),L(.24,.3,.24,T.gas,-2.8,3.45,-13.4);else if(u){Qe("#ffcf8a",8,3.2,3.6,-14.2,12,1.4),L(.08,3.6,.08,T.iron,3.2,1.8,-14.2);const x=new Kt;for(const H of[-.45,.45]){const W=new ae(k(new Hn(.3,.025,5,16)),T.iron);W.position.set(H,.32,0),x.add(W)}const O=new ae(k(new je(.9,.04,.04)),S({color:"#1d3a2a"}));O.position.set(0,.55,0),x.add(O);const U=new ae(k(new je(.4,.25,.35)),T.wood);U.position.set(.55,.75,0),x.add(U),x.position.set(-1.2,0,-11.4),x.rotation.y=Math.PI/2-.1,x.rotation.z=.05,I(x)}else if(h){const x=new Kt,O=new ae(k(new je(3.4,.75,1.6)),V({color:"#dfe3e6",roughness:.25,metalness:.4}));O.position.y=.62,x.add(O);const U=new ae(k(new je(2,.55,1.5)),V({color:"#1d2830",roughness:.1,metalness:.5}));U.position.set(-.1,1.24,0),x.add(U);for(const[H,W]of[[-1.1,.8],[1.1,.8],[-1.1,-.8],[1.1,-.8]]){const J=new ae(k(new it(.3,.3,.2,10)),T.black);J.rotation.x=Math.PI/2,J.position.set(H,.3,W),x.add(J)}x.position.set(-3.5,0,-17.6),I(x),ie(2.6,-16.9,.1,"#2d5a57")}else{const x=new Kt,O=new ae(k(new je(3.6,.7,1.6)),V({color:"#9b2a24",roughness:.3,metalness:.3}));O.position.y=.6,x.add(O);const U=new ae(k(new je(2,.55,1.5)),V({color:"#29343a",roughness:.1,metalness:.4}));U.position.set(-.2,1.2,0),x.add(U);for(const[v,P]of[[-1.2,.8],[1.2,.8],[-1.2,-.8],[1.2,-.8]]){const B=new ae(k(new it(.3,.3,.2,10)),T.black);B.rotation.x=Math.PI/2,B.position.set(v,.3,P),x.add(B)}x.position.set(1.5,0,-17.6),I(x);const H=Mt("agent",{w:512,h:384,bg:"#f4f1e8",fg:"#1b3f6b",border:"#1b3f6b",lines:[{text:"PELL",size:96,style:"bold",font:"Arial, sans-serif"},{text:"PROPERTIES",size:56,font:"Arial, sans-serif"},{text:"Courtyard flats",size:40,font:"Arial, sans-serif"},{text:"COMING SOON",size:44,style:"bold",font:"Arial, sans-serif"}]}),W=new ae(k(new Sn(.9,.68)),S({map:H,side:tn})),J=new Kt;J.position.set(-2.5,3.2,ze+.5),I(J),L(.05,.05,.9,T.iron,-2.5,3.25,ze+.45),W.position.set(0,-.36,.35),J.add(W),s.push((v,P)=>{J.rotation.x=Math.sin(P*1.7)*.06+Math.sin(P*4.3)*.03});const Q=new ae(k(new Pn(.4,12,6,0,Math.PI*2,0,Math.PI*.3)),S({color:"#d9d9d2",side:tn}));Q.rotation.x=-1.2,Q.position.set(-6,5.8,ze+.3),I(Q)}const be=new Kt;be.position.set(0,5.35,ze+.55),I(be);const we=new ae(k(new je(.08,.08,.9)),T.iron);we.position.set(0,.35,-.2),be.add(we);const oe=new ae(k(new je(.06,.8,.06)),T.iron);oe.position.set(0,0,-.45),oe.rotation.x=.8,be.add(oe);const le=new ae(k(new Hn(.16,.02,4,12,Math.PI*1.4)),T.iron);le.position.set(0,.15,-.35),le.rotation.y=Math.PI/2,be.add(le);const Re=[[0,.02],[.2,0],[.25,.04],[.22,.1],[.17,.3],[.15,.42],[.1,.48],[0,.5]].map(([x,O])=>new Ce(x,O)),$e=k(new sd(Re,14));if(d||u||h&&E.bellLocation==="bracket"){const x=new ae($e,V({color:d?"#5a4526":u?"#3d3322":"#b58a4c",roughness:h?.3:.45,metalness:.75,side:tn}));x.position.set(0,-.3,.2),be.add(x),r.bell=x}else{const x=new ae(k(new Hn(.06,.015,4,10,Math.PI*1.5)),T.iron);x.position.set(0,.12,.2),be.add(x),r.bracket=x}r.bracketArm=we;function Me(x,O,U,H=1){const W=new Kt;W.position.set(x,O,U),W.scale.setScalar(H*1.6),I(W);const J=new ae($e,V({color:"#7a7456",roughness:.55,metalness:.35,side:tn}));W.add(J);for(const Q of[0,Math.PI/2,Math.PI,-Math.PI/2]){const v=new ae(k(new je(.014,.2,.014)),T.black);v.position.set(Math.cos(Q)*.215,.1,Math.sin(Q)*.215),v.rotation.set(0,-Q,.3),W.add(v)}return W}L(.12,.12,.12,T.iron,bt.x,4.9,bt.z),L(.02,.02,1,T.rope,bt.x*.5,5,ze+.4).rotation.y=.9;const qe=d?m.bellShared?1:2.75:u?1.15:h?1.1:y.ropeState==="stub"?3.3:1.1;if(!h||E.bellLocation==="bracket"){const x=new ae(k(new it(.032,.032,4.9-qe,6)),T.rope);x.position.set(bt.x,(4.9+qe)/2,bt.z+.06),I(x),r.rope=x}if(d)if(L(.26,.05,.06,T.iron,bt.x,m.bellShared?1.3:2.55,bt.z+.06),m.bellShared){const x=S({color:"#f2efe6",transparent:!0,opacity:.8,depthWrite:!1});for(const O of[.6,-.6]){const U=L(.5,.004,.05,x,bt.x-.05,.014,bt.z+.65);U.rotation.y=O}r.chalk=L(.02,.02,.02,x,bt.x-.05,.01,bt.z+.65)}else for(let x=0;x<3;x++){const O=new ae(k(new Hn(.16-x*.015,.03,5,14)),T.rope);O.position.set(bt.x,2.5-x*.07,bt.z+.12),O.rotation.x=.2,I(O)}else if(u)L(.26,.5,.2,T.darkWood,bt.x,.95,bt.z+.1),L(.06,.08,.03,T.brass,bt.x,1.12,bt.z+.21);else if(h){if(L(.26,.05,.06,E.bellLocation==="bracket"?T.iron:S({color:"#9a8474"}),bt.x,1.3,bt.z+.06),E.plaqueDedication!=="none"){const U=E.plaqueDedication==="court-and-jonah",H=U?Mt("plaque-credited",{w:512,h:380,bg:"#b8913e",fg:"#3a2a10",border:"#6d5320",lines:[{text:"To the Court,",size:42,style:"italic"},{text:"who came when the bell rang",size:36,style:"italic"},{text:"— and to J.P.,",size:42,style:"italic"},{text:"who gave the key.",size:42,style:"italic"},{text:"15 · xi · 58",size:36}]}):Mt("plaque",{w:512,h:300,bg:"#b8913e",fg:"#3a2a10",border:"#6d5320",lines:[{text:"To the Court,",size:48,style:"italic"},{text:"who came when",size:48,style:"italic"},{text:"the bell rang",size:48,style:"italic"},{text:"15 · xi · 58",size:40}]}),W=U?.3:.24;r.plaque=L(.4,W,.02,T.brass,Gn.x,1.55,Gn.z+.08),j(.37,W-.03,V({map:H,roughness:.3,metalness:.6}),Gn.x,1.55,Gn.z+.095)}const x=E.bellOccasion==="cafe-opening"?["TODAY","The Lamplight Café opens","Opening peal of","the recast Court bell · 10 am"]:E.bellOccasion==="court-reopening"?["TODAY","The Court reopens","Gather under the arch","for a peal of the recast bell"]:E.workshopUse==="cafe"?["TODAY","The Lamplight Café opens","Come and see","the old bell in the window"]:["TODAY","The Court reopens","Free bicycle checks","under the arch (Maya)"],O=Mt(`notice-2026-${E.bellOccasion}-${E.workshopUse}`,{w:320,h:400,bg:"#f7f2e4",fg:"#2a3a3a",border:"#2d5a57",noise:60,lines:[{text:x[0],size:44,style:"bold",font:"Arial, sans-serif"},{text:x[1],size:26,font:"Arial, sans-serif"},{text:x[2],size:24,font:"Arial, sans-serif"},{text:x[3],size:22,font:"Arial, sans-serif"}]});r.notice=j(.34,.42,S({map:O}),Xs.x,Xs.y,Xs.z+.02)}else{const x=y.ropeState==="stub"?S({color:"#7c7870"}):T.iron;if(L(.26,.05,.06,x,bt.x,1.3,bt.z+.06),L(.05,.12,.05,x,bt.x,1.25,bt.z+.04),y.ropeState==="polished"){const O=new ae(k(new Hn(.1,.022,5,12)),V({color:"#3d2715",roughness:.25}));O.position.set(bt.x,1.18,bt.z+.08),I(O);const U=new ae(k(new it(.035,.035,.7,6)),V({color:"#6a4424",roughness:.15}));U.position.set(bt.x,1.6,bt.z+.06),I(U)}else{const O=new ae(k(new Qo(.04,.1,5)),T.rope);O.position.set(bt.x,qe-.04,bt.z+.06),O.rotation.x=Math.PI,I(O)}if(y.plaquePresent){const O=y.plaqueDedication==="court-and-jonah",U=O?Mt("plaque-credited",{w:512,h:380,bg:"#b8913e",fg:"#3a2a10",border:"#6d5320",lines:[{text:"To the Court,",size:42,style:"italic"},{text:"who came when the bell rang",size:36,style:"italic"},{text:"— and to J.P.,",size:42,style:"italic"},{text:"who gave the key.",size:42,style:"italic"},{text:"15 · xi · 58",size:36}]}):Mt("plaque",{w:512,h:300,bg:"#b8913e",fg:"#3a2a10",border:"#6d5320",lines:[{text:"To the Court,",size:48,style:"italic"},{text:"who came when",size:48,style:"italic"},{text:"the bell rang",size:48,style:"italic"},{text:"15 · xi · 58",size:40}]}),H=O?.3:.24,W=L(.4,H,.02,T.brass,Gn.x,1.55,Gn.z+.08);j(.37,H-.03,V({map:U,roughness:.35,metalness:.6}),Gn.x,1.55,Gn.z+.095),r.plaque=W}else{const O=S({color:"#e6e3da",transparent:!0,opacity:.55,depthWrite:!1});for(let U=0;U<6;U++){const H=new ae(k(new rd(.2,.23,4,1)),O);H.rotation.set(-Math.PI/2,0,Math.PI/4),H.position.set(2.8,.013,-6.6+U*.44),I(H)}}}if(L(.05,.05,.5,T.iron,-2.3,3.6,ze+.25),L(.22,.34,.22,d?T.gas:u?T.glowWarm:S({color:"#3a3a36"}),-2.3,3.35,ze+.5),u&&(Qe("#ffbe6e",14,-2.3,3.25,ze+.7,13,2.2),L(.2,.16,.12,T.glowWarm,2.2,3,7.8),Qe("#ffcf8a",8,2.2,2.8,7.2,9,1)),d){Qe("#ffe2a0",16,-2.3,3.25,ze+.7,14,2);for(const[x,O,U]of[[9.6,-4.6,3],[-9.6,1.8,3],[2.2,7.6,3]])L(.2,.3,.2,T.gas,x,U,O),L(x>9||x<-9?.4:.05,.05,x>9||x<-9?.05:.4,T.iron,x+(x>9?.2:x<-9?-.2:0),U+.2,O+(O>7?.2:0)),Qe("#ffe2a0",9,x+(x>9?-.3:x<-9?.3:0),U-.2,O+(O>7?-.3:0),10,1.5);Qe("#ffd08a",7,2.4,2.6,-5.2,6,0),L(.16,.24,.16,T.glowWarm,2.35,2.5,-6.35)}if(_){const x=We;Z(x.x1-x.x0,.02,x.z1-x.z0,T.planks,(x.x0+x.x1)/2,.005,(x.z0+x.z1)/2,2),Z(x.x1-x.x0,.05,x.z1-x.z0,T.plasterWorkshop,(x.x0+x.x1)/2,Ae-.1,(x.z0+x.z1)/2,3),De("-z",ze-.3,x.x0,x.x1,0,Ae,T.plasterWorkshop,[{a0:x.door[0],a1:x.door[1],y0:0,y1:2.35},{a0:x.window[0],a1:x.window[1],y0:.75,y1:2.65}],2.5),De("+z",x.z0,x.x0,Ve.x0,0,Ae,T.plasterWorkshop,[{a0:3,a1:4,y0:0,y1:2.1}],2.5),j(x.z1-x.z0,Ae,T.plasterWorkshop,x.x0+.01,Ae/2,(x.z0+x.z1)/2,Math.PI/2),j(x.z1-x.z0,Ae,T.plasterWorkshop,x.x1-.01,Ae/2,(x.z0+x.z1)/2,-Math.PI/2),De("+x",Ve.x0,Ve.z0,Ve.z1,0,Ae,T.plasterWorkshop,[],2.5),De("-x",Ve.x0-.02,Ve.z0,Ve.z1,0,Ae,T.plasterWorkshop,[],2.5),De("+z",Ve.z1,Ve.x0,Ve.x1,0,Ae,T.plasterWorkshop,[{a0:Ve.door[0],a1:Ve.door[1],y0:0,y1:2.2}],2.5),De("-z",Ve.z1-.02,Ve.x0,Ve.x1,0,Ae,T.plasterWorkshop,[{a0:Ve.door[0],a1:Ve.door[1],y0:0,y1:2.2}],2.5),De("+z",x.z0,Ve.x0,Ve.x1,0,Ae,T.plasterWorkshop,[],2.5),L(1.4,2.4,1.4,S({color:"#1a140f",side:An}),3.5,1.2,x.z0-.7);for(let U=0;U<4;U++)L(.5,.4,.5,T.wood,3.1+U%2*.55,.2+Math.floor(U/2)*.42,x.z0-.8);if(u&&(L(.4,.5,.35,S({color:"#3d4a44"}),3.95,.25,x.z0-1.1),Qe("#ff7a3a",.8,3.7,.8,x.z0-.9,2.5)),d){for(let W=0;W<3;W++){const J=new ae(k(new it(.24,.24,.5,10)),T.wood);J.position.set(3.2+W%2*.55,.25+(W===2?.5:0),x.z0-.9),I(J)}for(const W of[-13.35,-12.55]){L(3,.05,.05,T.darkWood,5.4,1.95,W);for(const v of[3.95,6.85])L(.06,1.95,.06,T.darkWood,v,.97,W);const J=new yr(k(new it(.018,.022,.42,5)),S({color:"#efe4c6"}),44),Q=new Ct;for(let v=0;v<44;v++)Q.makeTranslation(4.1+(v>>1)*.13,1.66,W+(v%2?.04:-.04)),J.setMatrixAt(v,Q);I(J)}const U=new ae(k(new it(.55,.5,.9,14)),T.iron);U.position.set(5.4,.45,-10.6),I(U);const H=new ae(k(new Pi(.5,14)),S({color:"#d8c89a",emissive:"#3a2a10"}));H.rotation.x=-Math.PI/2,H.position.set(5.4,.86,-10.6),I(H),Qe("#ff8a3a",1.6,5.4,.3,-10.1,3);for(let W=.8;W<2.6;W+=.6)L(.34,.04,3,T.wood,x.x0+.24,W,-11.2);for(let W=0;W<9;W++)L(.24,.12,.3,S({color:["#8a6a44","#b09468","#6b5238"][W%3]}),x.x0+.26,.88+Math.floor(W/3)*.6,-12.4+W%3*.9);for(const[W,J]of[[4.6,-11.2],[6.8,-12.6]])L(.02,.6,.02,T.iron,W,2.85,J),L(.1,.12,.1,T.gas,W,2.5,J);Qe("#ffd9a0",12,4.6,2.4,-11.2,10,1),Qe("#ffd9a0",9,6.8,2.4,-12.6,9,.8)}else if(h){L(3,1,.8,S({color:"#6b4a32"}),5.4,.5,-13.4),L(3.1,.06,.9,S({color:"#d9d2c2"}),5.4,1.03,-13.4);const U=L(.6,.45,.4,V({color:"#b8bcc0",roughness:.25,metalness:.8}),6.2,1.29,-13.55);r.espresso=U,L(.5,.06,.1,T.black,6.2,1.2,-13.32),L(.18,.22,.18,S({color:"#e8e2d4"}),4.6,1.17,-13.3),L(.3,.2,.25,S({color:"#2a2a2c"}),5.2,1.16,-13.35),L(.12,.18,.2,T.iron,3.95,1.1,-13.4);const H=new ae(k(new Sn(3.6,2.9)),C(new xi({map:fs(),transparent:!0,opacity:.35,depthWrite:!1,color:"#000"})));H.position.set(5.2,1.75,We.z0+.02),I(H),r.scorchStrip=L(.16,1.6,.05,S({color:"#1c1512"}),6.75,1.9,We.z0+.04),L(.3,1.75,.02,S({color:"#e8dcc0"}),6.75,1.9,We.z0+.015),L(1.6,.04,.28,T.wood,4.9,1.4,-13.84),L(1.6,.04,.28,T.wood,4.9,1.95,-13.84);for(let W=0;W<6;W++)L(.14,.2,.14,S({color:["#c8a86a","#e8e2d4","#7a8a6a"][W%3]}),4.3+W*.26,2.07,-13.84);if(E.courtBookLocation==="cafe"){const W=L(.08,.34,.26,S({color:"#2f4a33"}),4.7,1.59,-13.84);r.courtBook=W}for(const W of[4.2,5.6,7])L(.01,.7,.01,T.black,W,2.75,-12.2),L(.22,.14,.22,T.glowWarm,W,2.35,-12.2);Qe("#ffe0b0",10,5.4,2.3,-11.6,10,0),Rt(xl.x,xl.z,"#e8e2d4");for(let W=.8;W<2.6;W+=.6)L(.34,.04,3,T.wood,We.x0+.24,W,-11.2);for(let W=0;W<9;W++)L(.16,.22,.16,S({color:["#c8a86a","#8a5a3a","#e8e2d4"][W%3]}),We.x0+.26,.93+Math.floor(W/3)*.6,-12.4+W%3*.9);if(L(.6,.9,.45,S({color:"#3a3a36"}),li.x,.45,li.z),E.bellLocation==="cafe-window"){r.windowBell=Me(li.x,.92,li.z);const W=Mt("bell-card",{w:256,h:128,bg:"#f4efe2",fg:"#2a2622",lines:[{text:"Original Court bell",size:26,style:"italic"},{text:"kept, not recast",size:24}]});j(.3,.15,S({map:W}),li.x+.2,.93,li.z+.23)}else L(.3,.25,.3,S({color:"#4f6b35"}),li.x,1.02,li.z)}else{L(3,.08,.8,T.wood,5.4,.95,-13.4);for(const H of[4.1,6.7])L(.08,.95,.7,T.darkWood,H,.47,-13.4);const U=["#6b4a2e","#8a5a36","#3d2c20","#b08a5a"];for(let H=0;H<4;H++){const W=L(.42,.34,.26,S({color:U[H]}),4.3+H*.7,1.16,-13.55);j(.28,.14,S({color:"#c9a86a"}),W.position.x,1.18,-13.41)}L(.2,.3,.2,S({color:"#c4b69a"}),6.4,1.15,-13.2);for(let H=.8;H<2.6;H+=.6)L(.34,.04,3,T.wood,x.x0+.24,H,-11.2);for(let H=0;H<9;H++)L(.2+b()*.1,.18+b()*.15,.2,S({color:["#6b4a2e","#8f8a7a","#5a6a70","#b0a080"][H%4]}),x.x0+.26,.92+Math.floor(H/3)*.6,-12.4+H%3*.9)}if(f){L(.5,.26,.16,S({color:"#1c1c1e"}),5,1.12,-13.1),L(.5,.42,.42,S({color:"#2a2a2c"}),6.2,1.2,-13.5),j(.36,.28,S({color:"#3a4a52",emissive:"#223038"}),6.2,1.22,-13.28);for(const U of[4.4,7])L(1.3,.05,.1,T.glowCool,U,3,-10.5);if(Qe("#e6f2ff",12,5.5,2.8,-10.6,12),Qe("#e6f2ff",5,6.5,2.6,-8.6,8,0),y.scorch==="backwall"){const U=new ae(k(new Sn(3.6,2.9)),C(new xi({map:fs(),transparent:!0,depthWrite:!1,color:"#000"})));U.position.set(5.2,1.75,x.z0+.02),I(U),r.backwall=U}}else if(u){for(const[U,H]of[[4.6,-11.2],[6.8,-12.6]])L(.01,.8,.01,T.black,U,2.75,H),L(.08,.1,.08,T.glowWarm,U,2.3,H);Qe("#ffb35a",16,4.6,2.2,-11.2,11,1.2),Qe("#ffb35a",12,6.8,2.2,-12.6,10,1),L(.18,.2,.18,S({color:"#b8b8b0"}),3.5,1.08,-12.95)}L(1.2,.06,.7,T.wood,Ve.x1-1.1,.78,Ve.z0+.7);for(const[U,H]of[[-.5,-.28],[.5,-.28],[-.5,.28],[.5,.28]])L(.05,.78,.05,T.darkWood,Ve.x1-1.1+U,.39,Ve.z0+.7+H);L(.08,1.9,1.4,T.wood,Ve.x1-.2,.95,-12.4);for(let U=.5;U<1.9;U+=.45)L(.34,.03,1.36,T.wood,Ve.x1-.35,U,-12.4);const O=u?g.courtBookKeeper==="winnie":f&&y.courtBookLocation==="workshop";if(h&&Qe("#ffe0b0",3,Ve.x1-1,1.8,Ve.z0+1,4,0),O?u?(Je(Ve.x1-1.1,.82,Ve.z0+.7,!0),Qe("#ffc47a",6,Ve.x1-1,1.4,Ve.z0+.8,4,.7)):Je(Ve.x1-.35,1.45,-12.4,!1):h?L(.4,.3,.3,S({color:"#a0784a"}),Ve.x1-1.3,.96,Ve.z0+.7):d?(L(.34,.05,.26,S({color:"#4a2e22"}),Ve.x1-1.1,.835,Ve.z0+.7),L(.03,.16,.03,S({color:"#efe4c6"}),Ve.x1-.7,.89,Ve.z0+.6),Qe("#ffc47a",3,Ve.x1-.7,1.1,Ve.z0+.7,3.5,.4)):u&&(j(.2,.14,S({color:"#efe9d8"}),Ve.x1-1,.815,Ve.z0+.7).rotation.x=-Math.PI/2,Qe("#ffc47a",5,Ve.x1-1,1.4,Ve.z0+.8,4,.7)),f)for(let U=0;U<7;U++)L(.04,.26,.2,S({color:["#c7c0a8","#b8b39a","#a9a38c"][U%3]}),Ve.x1-.35,1.02,-12.9+U*.07)}function Je(x,O,U,H){const W=new Kt;W.position.set(x,O,U),I(W);const J=S({color:"#2f4a33"});if(H){const Q=Mt("book-pages",{w:256,h:160,bg:"#efe6cf",fg:"#3a3040",lines:[{text:"3 March.  S. Sołtys & family",size:15,font:"Segoe Script, cursive",style:"italic"},{text:"to No. 4.  Welcome.",size:15,font:"Segoe Script, cursive",style:"italic"},{text:"Co-op: 2 wirelesses, 1 lamp",size:15,font:"Segoe Script, cursive",style:"italic"}]}),v=new ae(k(new je(.5,.02,.34)),J);W.add(v);const P=new ae(k(new Sn(.47,.31)),S({map:Q}));P.rotation.x=-Math.PI/2,P.position.y=.025,W.add(P)}else{const Q=new ae(k(new je(.28,.36,.08)),J);Q.rotation.y=Math.PI/2,W.add(Q)}r.courtBook=W}const Ke=At.x0,X=[],Se={a0:At.door[0],a1:At.door[1],y0:0,y1:2.4};X.push(Se),Fe("-x",Ke,Se,null,T.stone,.32,!1);const re=L(1.3,2.35,.05,T.pellRed,Ke+.32+.65,1.18,At.door[0]-.05);re.rotation.y=-.12,L(.05,.1,.06,T.brass,Ke+1.5,1.05,At.door[0]-.09),r.anchor=re;const Te=new ae(k(new Pi(.6,12,0,Math.PI)),p?T.glowWarm:T.glassDay);Te.position.set(Ke-.03,2.5,-1),Te.rotation.y=-Math.PI/2,I(Te);const Ne=Mt("longroom-plate",{w:256,h:64,bg:"#2a2622",fg:"#d9c48a",lines:[{text:"LONG ROOM",size:34,style:"bold"}]});j(.6,.15,S({map:Ne}),Ke+.02,2.2,.2,-Math.PI/2+Math.PI);for(const x of[-4.3,1.9])X.push(rt("-x",Ke,x,.9,1.3,1.5,p,!1));for(const x of[-6.4,-3.2,3.2,6.2])X.push(rt("-x",Ke,x,Ae+.8,.9,1.3,p&&x<0));const me={a0:.2,a1:1.1,y0:Ae,y1:Ae+2.1};X.push(me),Fe("-x",Ke,me,T.wood,T.stone,.3,!1),De("-x",Ke,-8,8,0,ri,T.brick,X),Fo("x",-8,8,Ke,Ke+6,ri);{const x=At;Z(x.x1-x.x0,.02,x.z1-x.z0,T.planks,(x.x0+x.x1)/2,.005,(x.z0+x.z1)/2,2),Z(x.x1-x.x0,.05,x.z1-x.z0,T.plaster,(x.x0+x.x1)/2,Ae-.1,(x.z0+x.z1)/2,3),De("+x",x.x0+.3,x.z0,x.z1,0,Ae,T.plaster,[Se,{a0:-4.3-.65,a1:-4.3+.65,y0:.9,y1:2.4},{a0:1.9-.65,a1:1.9+.65,y0:.9,y1:2.4}],2.5),j(x.x1-x.x0,Ae,T.plaster,(x.x0+x.x1)/2,Ae/2,x.z0+.01,0),h?De("-z",x.z1-.01,x.x0,x.x1,0,Ae,T.plaster,[{a0:hn.door[0],a1:hn.door[1],y0:0,y1:2.2}],2.5):j(x.x1-x.x0,Ae,T.plaster,(x.x0+x.x1)/2,Ae/2,x.z1-.01,Math.PI),j(x.z1-x.z0,Ae,T.plaster,x.x1-.01,Ae/2,(x.z0+x.z1)/2,-Math.PI/2);for(const Q of[x.z0+.03,x.z1-.03])L(x.x1-x.x0,.06,.03,T.wood,(x.x0+x.x1)/2,1,Q);L(1.1,.06,4.4,T.wood,13,.78,-1);for(const[Q,v]of[[-.45,-2],[.45,-2],[-.45,2],[.45,2]])L(.06,.78,.06,T.darkWood,13+Q,.39,-1+v);for(let Q=0;Q<4;Q++)for(const v of[-1,1])L(.42,.04,.42,T.wood,13+v*.85,.45,-2.6+Q*1.1),L(.04,.5,.42,T.wood,13+v*1.05,.72,-2.6+Q*1.1);if(L(2,1.2,.04,S({color:"#9a7650"}),12.4,1.6,x.z0+.04),(d?["Works closes 4 o'clock: 31st inst.","New Year bell at midnight","Thank you all: I. Hale"]:u?["Coal Thursday","Co-op: wireless mending at cost","New Year bell at midnight"]:h?["Summer fair: Saturday","Bikes in the racks","Found: one key"]:["Residents' meeting: the stair","Bin day Tuesday","Lost: grey cat, answers to Biscuit"]).forEach((Q,v)=>{const P=Mt(`note-${n}-${v}`,{w:256,h:192,bg:["#f1ead8","#e7e0c4","#f4efe2"][v],fg:"#2a2622",noise:120,lines:[{text:Q.split(":")[0],size:22,style:"bold"},...Q.includes(":")?[{text:Q.split(":")[1].trim(),size:18}]:[]]});j(.44,.33,S({map:P}),11.7+v*.55+(v===2?.25:0),1.72-v%2*.35,x.z0+.07).rotation.z=(b()-.5)*.12}),f){const Q=y.bucketChain?"COURT BELL RAISES ALARM":"FIRE GUTS COURT WORKSHOP";L(.5,.62,.03,T.darkWood,13.05,1.55,x.z0+.08);const v=j(.42,.53,S({map:N_(`echo-${Q}`,Q)}),13.05,1.55,x.z0+.1);r.echo=v;const P=Mt("plans",{w:512,h:384,bg:"#dfe8ef",fg:"#2c4a6a",noise:300,lines:[{text:"CHANDLER'S COURT",size:30,style:"bold",font:"Arial, sans-serif"},{text:"Proposed conversion: 8 flats",size:24,font:"Arial, sans-serif"},{text:"Gate to stair (secure access)",size:24,font:"Arial, sans-serif"}]});j(.9,.66,S({map:P}),13,.815,.4).rotation.x=-Math.PI/2;for(const se of[12.2,13.8])L(1.3,.05,.1,T.glowCool,se,3.02,-1);Qe("#e8f2ff",14,13,2.8,-1,12);const B=M.petitionSigned?Mt(`petition-signed-${M.publicUseRecorded}`,{w:256,h:340,bg:"#f4f0e4",fg:"#1d2a3a",noise:150,lines:[{text:"PETITION",size:26,style:"bold",font:"Arial, sans-serif"},{text:"Keep the stair public",size:18,font:"Arial, sans-serif"},{text:"W. Hale",size:22,font:"Segoe Script, cursive",style:"italic"},{text:"S. Sołtys   R. Sołtys",size:18,font:"Segoe Script, cursive",style:"italic"},{text:"and 23 more",size:16,font:"Arial, sans-serif"},{text:M.publicUseRecorded?"Attached: Court Book entry":"Evidence: (none attached)",size:15,font:"Arial, sans-serif",style:"bold"}]}):Mt("petition-blank",{w:256,h:340,bg:"#f4f0e4",fg:"#1d2a3a",noise:150,lines:[{text:"PETITION",size:26,style:"bold",font:"Arial, sans-serif"},{text:"Keep the stair public",size:18,font:"Arial, sans-serif"},{text:"1. ______________",size:18,font:"Arial, sans-serif"},{text:"2. ______________",size:18,font:"Arial, sans-serif"},{text:"Written record of",size:15,font:"Arial, sans-serif"},{text:"residents' use: ______",size:15,font:"Arial, sans-serif"}]}),G=j(.3,.4,S({map:B}),io.x,io.y,io.z);if(G.rotation.x=-Math.PI/2,G.rotation.z=.12,r.petition=G,M.petitionSigned&&M.publicUseRecorded){const se=j(.22,.3,S({color:"#e8e0c8"}),io.x+.25,io.y-.003,io.z+.05);se.rotation.x=-Math.PI/2,se.rotation.z=-.2}L(.9,.06,.9,S({color:"#9a8466"}),$n.x,.03,$n.z),r.oldBell=Me($n.x,.06,$n.z);const z=M.recastSigned?Mt("consign-recast",{w:256,h:160,bg:"#f2e6c8",fg:"#3a2010",border:"#7a4a20",lines:[{text:"TO THE FOUNDRY",size:28,style:"bold",font:"Arial, sans-serif"},{text:"for recasting",size:22,font:"Arial, sans-serif"},{text:"collect 16 May",size:20,font:"Arial, sans-serif"}]}):Mt("consign-keep",{w:256,h:160,bg:"#f2e6c8",fg:"#3a2010",border:"#7a4a20",lines:[{text:"KEEP",size:34,style:"bold",font:"Arial, sans-serif"},{text:"ORIGINAL",size:28,style:"bold",font:"Arial, sans-serif"},{text:"wrap and store",size:18,font:"Arial, sans-serif"}]}),ee=j(.34,.21,S({map:z,side:tn}),$n.x-.44,.5,$n.z-.12,-1.88);r.consignment=ee;const ue=Mt(`repair-note-${M.bellCrackedAt}`,{w:256,h:320,bg:"#f7f5ec",fg:"#2a2622",noise:120,lines:[{text:"REPAIR NOTE",size:24,style:"bold",font:"Arial, sans-serif"},{text:"Court bell, cracked",size:18,font:"Arial, sans-serif"},{text:M.bellCrackedAt==="fire-1958"?"since the alarm of":"frost damage,",size:18,font:"Arial, sans-serif"},{text:M.bellCrackedAt==="fire-1958"?"15 Nov 1958":"winter 1990–91",size:18,font:"Arial, sans-serif"},{text:"Recast, or keep?",size:18,font:"Arial, sans-serif",style:"bold"}]});r.repairNote=j(.3,.38,S({map:ue}),$n.x,1.5,x.z1-.03,Math.PI)}else if(h){for(const he of[12.2,13.8])L(1,.04,.5,T.glowCool,he,3.03,-1);Qe("#fff4e6",14,13,2.8,-1,12),L(.36,.02,.25,S({color:"#2a2a2e"}),13.2,.82,1);const Q=L(.36,.24,.02,S({color:"#2a2a2e",emissive:"#1a2a3a"}),13.2,.94,1.12);Q.rotation.x=-.25;const v=Mt("stair-file",{w:256,h:192,bg:"#c8b48a",fg:"#2a2016",lines:[{text:"STAIR",size:40,style:"bold",font:"Arial, sans-serif"},{text:"1991",size:34,font:"Arial, sans-serif"}]});L(.3,.06,.24,S({color:"#b89f72"}),12.6,.84,-.3);const P=j(.26,.2,S({map:v}),12.6,.875,-.3);P.rotation.x=-Math.PI/2,r.stairFile=P;const B=es;L(1.1,.9,.6,T.darkWood,B.x,.45,B.z);const G=L(1.06,.3,.56,C(new Wo({color:"#dfeef2",transparent:!0,opacity:.22,roughness:.05})),B.x,1.06,B.z);if(G.renderOrder=2,E.courtBookLocation==="library"){const he=Mt("facsimile-pages",{w:320,h:200,bg:"#efe6cf",fg:"#3a3040",lines:[{text:"15 Nov. 1958",size:20,font:"Segoe Script, cursive",style:"italic"},...E.courtBookEntry==="rang"?[{text:"Rang at two. Twelve came.",size:18,font:"Segoe Script, cursive",style:"italic"}]:[{text:"The bell did not ring.",size:18,font:"Segoe Script, cursive",style:"italic"},{text:"Nobody’s fault. W.H.",size:18,font:"Segoe Script, cursive",style:"italic"}]]}),ge=j(.5,.32,S({map:he}),B.x,.915,B.z);ge.rotation.x=-Math.PI/2,r.facsimile=ge;const Le=Mt("facsimile-label",{w:512,h:128,bg:"#f7f3ea",fg:"#2a2622",lines:[{text:"Chandler’s Court Book, 1931–1962",size:28,style:"italic"},{text:"FACSIMILE · original in Aldermoor Library, deposited by T. Pell",size:18,font:"Arial, sans-serif"}]}),Xe=j(.5,.125,S({map:Le}),B.x,.93,B.z+.24);Xe.rotation.x=-1.1}else for(let he=0;he<3;he++){const ge=j(.22,.16,S({color:["#8a8278","#a09888","#6e685e"][he]}),B.x-.33+he*.33,.915,B.z);ge.rotation.x=-Math.PI/2}const z=hn;Z(z.x1-z.x0,.02,z.z1-z.z0,T.planks,(z.x0+z.x1)/2,.005,(z.z0+z.z1)/2,2),Z(z.x1-z.x0,.05,z.z1-z.z0,T.plaster,(z.x0+z.x1)/2,Ae-.1,(z.z0+z.z1)/2,3),j(z.x1-z.x0,Ae,T.plaster,(z.x0+z.x1)/2,Ae/2,z.z1-.01,Math.PI),j(z.z1-z.z0,Ae,T.plaster,z.x0+.01,Ae/2,(z.z0+z.z1)/2,Math.PI/2),j(z.z1-z.z0,Ae,T.plaster,z.x1-.01,Ae/2,(z.z0+z.z1)/2,-Math.PI/2),De("+z",x.z1+.02,z.x0,z.x1,0,Ae,T.plaster,[{a0:z.door[0],a1:z.door[1],y0:0,y1:2.2}],2.5);const ee=L(1.1,2.15,.05,T.wood,z.door[0]-.5,1.08,x.z1+.5);ee.rotation.y=1.3;const ue=Mt("store-plate",{w:256,h:64,bg:"#2a2622",fg:"#d9c48a",lines:[{text:"STORE",size:36,style:"bold"}]});j(.4,.1,S({map:ue}),(z.door[0]+z.door[1])/2,2.35,x.z1-.04,Math.PI),Qe("#fff2dc",6,13.5,2.6,5.4,6,0),L(.2,.05,.2,T.glowCool,13.5,3.05,5.4);const se=ts;for(let he=.3;he<2;he+=.55)L(.55,.04,2.2,T.wood,se.x,he,se.z);L(.04,2,2.2,T.darkWood,se.x+.28,1,se.z);for(let he=0;he<5;he++)he!==2&&L(.2,.22,.2,S({color:["#c8c0b0","#7a8a9a","#b04a3a"][he%3]}),se.x-.05,1.53+he%2*.55,se.z-.8+he*.4);if(E.bellLocation==="storeroom"){L(.5,.08,.7,S({color:"#6a7a8a"}),se.x-.05,.9,se.z),r.storeBell=Me(se.x-.05,.94,se.z,.8);const he=Mt("keep-original",{w:256,h:96,bg:"#f2e6c8",fg:"#3a2010",lines:[{text:"Keep original",size:30,style:"bold",font:"Arial, sans-serif"}]});j(.24,.09,S({map:he,side:tn}),se.x-.33,.8,se.z+.2,-Math.PI/2)}else{const he=new ae(k(new Hn(.2,.05,6,16)),S({color:"#d6c49a"}));he.position.set(se.x-.05,.98,se.z),he.rotation.x=Math.PI/2,I(he)}}else L(.01,.9,.01,T.black,13,2.7,-1),L(.4,.14,.4,d?T.gas:S({color:"#2f5d45"}),13,2.2,-1),Qe(d?"#ffe2a0":"#ffb760",18,13,2,-1,12,1.4),L(.6,.8,.5,T.iron,15.4,.4,2.8),L(.12,2.4,.12,T.iron,15.4,2,2.8),Qe("#ff8a3a",2.5,15.2,.4,2.6,3);if(L(.5,2.1,1.3,T.darkWood,x.x1-.27,1.05,-2.2),L(.02,1.9,.02,T.black,x.x1-.52,1.05,-2.2),L(.04,.08,.04,T.brass,x.x1-.53,1.15,-2.14),u?g.courtBookKeeper==="jonah":f&&y.courtBookLocation==="longroom"){const Q=L(.08,.34,.06,S({color:"#2f4a33"}),x.x1-.55,1.4,-2.55);r.courtBook=Q}}const Ge=8,He=[];for(const x of[-8.2,-4.6,-1])He.push(dt("-z",Ge,x,b()>.5?T.wood:T.blueDoor));for(const x of[-6.4,-2.8,1.2])He.push(rt("-z",Ge,x,.9,1,1.4,p));for(const x of[-8.2,-6.4,-4.6,-2.8,-1])He.push(rt("-z",Ge,x,4.1,.9,1.3,p&&b()>.3));for(const x of[4.2,6.8])He.push(rt("-z",Ge,x,4.6,.8,1.2,p));De("-z",Ge,-10,10,0,ri,T.brick,He),Fo("z",-10,10,Ge,Ge+6,ri);const Gt=16,Tt=(nt.x1-nt.x0)/Gt,zn=f&&y.liftedSteps||h&&E.stairSteps==="lifted",ar=h&&E.stairSteps==="repaired"?V({map:hf(),color:"#ddd6c8",roughness:.85}):null;for(let x=0;x<Gt;x++){const O=nt.x0+x*Tt,U=_h(O+Tt),H=Z(Tt+.01,U,nt.z1-nt.z0,ar&&x<3?ar:T.stone,O+Tt/2,U/2,(nt.z0+nt.z1)/2,1);ar&&x===0&&(r.repairedSteps=H),zn&&x<3&&(H.position.y+=.07-x*.02,H.rotation.x=(x%2?-1:1)*.05,H.rotation.z=.04,x===0&&(r.liftedSteps=H))}if(zn){const x=j(.9,.35,C(new Wo({color:"#2c3432",roughness:.05,metalness:.2})),nt.x0-.3,.016,nt.z0+.35);x.rotation.x=-Math.PI/2}Z(10-nt.x1,Ae,nt.z1-nt.z0,T.stone,(nt.x1+10)/2,Ae/2,(nt.z0+nt.z1)/2,1);const zo=[];for(let x=nt.x0+.2;x<=nt.x1+.01;x+=(nt.x1-nt.x0-.2)/8)zo.push(new F(x,_h(x)+.95,nt.z0+.05));for(const x of zo)L(.035,.95,.035,T.iron,x.x,x.y-.47,x.z);for(let x=0;x<zo.length-1;x++){const O=zo[x],U=zo[x+1],H=O.distanceTo(U),W=L(H,.05,.05,T.iron,(O.x+U.x)/2,(O.y+U.y)/2,O.z);W.rotation.z=Math.atan2(U.y-O.y,U.x-O.x)}if(h&&!E.stairPublic){const x=T.iron;for(let U=zt.z0+.08;U<zt.z1;U+=.14)L(.03,zt.y1-.1,.03,x,(zt.x0+zt.x1)/2,(zt.y1-.1)/2+.05,U);for(const U of[.15,1.1,zt.y1-.05])L(.05,.05,zt.z1-zt.z0,x,(zt.x0+zt.x1)/2,U,(zt.z0+zt.z1)/2);L(.1,.16,.08,T.brass,zt.x0-.02,1.1,zt.z0+.12);const O=Mt("residents-only",{w:384,h:160,bg:"#1d2a3a",fg:"#f4f1e8",lines:[{text:"RESIDENTS ONLY",size:44,style:"bold",font:"Arial, sans-serif"},{text:"Pell Properties",size:26,font:"Arial, sans-serif"}]});j(.5,.21,S({map:O,side:tn}),zt.x0-.03,1.5,(zt.z0+zt.z1)/2,-Math.PI/2),r.gate=L(.02,.02,.02,x,zt.x0,1,(zt.z0+zt.z1)/2)}else if(h){const x=Mt("public-way",{w:384,h:160,bg:"#2d5a57",fg:"#f4f1e8",lines:[{text:"PUBLIC WAY",size:44,style:"bold",font:"Arial, sans-serif"},{text:"please leave clear",size:28,font:"Arial, sans-serif"}]});L(.05,1.3,.05,T.iron,2.3,.65,nt.z0-.08);const O=j(.44,.18,S({map:x,side:tn}),2.3,1.35,nt.z0-.1,0);O.rotation.y=-1.95,r.publicWay=O}if(f){L(.06,1.3,.06,S({color:"#5c5f5a"}),2.4,.65,nt.z0-.05);const x=Mt("council",{w:384,h:480,bg:"#f7f5ec",fg:"#1d2a3a",border:"#1d2a3a",noise:200,lines:[{text:"ALDERMOOR COUNCIL",size:30,style:"bold",font:"Arial, sans-serif"},{text:"Notice of proposed",size:24,font:"Arial, sans-serif"},{text:"GATE TO PUBLIC STAIR",size:28,style:"bold",font:"Arial, sans-serif"},{text:"Objections by 30.4.91",size:24,font:"Arial, sans-serif"}]}),O=j(.36,.45,S({map:x,side:tn}),2.36,1.3,nt.z0-.12,0);O.rotation.y=-1.95}const qi=-10,yo=[];for(const x of[-5.5,2.5])yo.push(dt("+x",qi,x,b()>.5?T.pellRed:T.wood));for(const x of[-3.2,-.7,4.8])yo.push(rt("+x",qi,x,.9,1,1.4,p&&x>0));for(const x of[-6,-3.2,-.7,2.5,5.2])yo.push(rt("+x",qi,x,4.1,.9,1.3,p&&b()>.4));De("+x",qi,-8,8,0,ri,T.brick,yo),Fo("x",-8,8,qi,qi-6,ri);const sa=T.stone;Z(Wt.x1-Wt.x0,.2,Wt.z1-Wt.z0,sa,(Wt.x0+Wt.x1)/2,Ae-.1,(Wt.z0+Wt.z1)/2,1.2),Z(qn.x1-qn.x0,.2,nt.z0-Wt.z1,sa,(qn.x0+qn.x1)/2,Ae-.1,(Wt.z1+nt.z0)/2,1.2);for(const[x,O]of Sp)L(.14,Ae,.14,T.iron,x,Ae/2,O),L(.3,.12,.3,T.iron,x,Ae-.22,O);const us=(x,O,U,H)=>{const W=Math.hypot(U-x,H-O),J=Math.atan2(-(H-O),U-x),Q=L(W,.05,.07,T.darkWood,(x+U)/2,Ae+1,(O+H)/2);Q.rotation.y=J;const v=L(W,.03,.03,T.iron,(x+U)/2,Ae+.12,(O+H)/2);v.rotation.y=J;const P=Math.floor(W/.14),B=new yr(k(new je(.02,.9,.02)),T.iron,P),G=new Ct;for(let z=0;z<P;z++){const ee=(z+.5)/P;G.makeTranslation(x+(U-x)*ee,Ae+.55,O+(H-O)*ee),B.setMatrixAt(z,G)}I(B)};us(Wt.x0,Wt.z1,qn.x0,Wt.z1),us(Wt.x0,Wt.z0,Wt.x0,Wt.z1),us(qn.x0,Wt.z1,qn.x0,nt.z0);for(const[x,O]of[[4,-7.7],[9.7,-3],[9.7,3]])L(.14,.14,.14,d?T.gas:u?T.glowWarm:S({color:"#d8d6cc"}),x,Ae+2.35,O),p&&Qe(d?"#ffe2a0":"#ffbf70",7,x,Ae+2.2,O+(O<-7?.4:0),8,1);if(f){const x=js.x,O=js.z,U=Ae;L(.55,.04,.55,S({color:"#e9e4d6"}),x,U+.72,O),L(.06,.72,.06,T.iron,x,U+.36,O);const H=new ae(k(new Pn(.1,10,8)),V({color:"#5a2f1a",roughness:.3}));H.position.set(x-.12,U+.83,O),H.scale.y=.85,I(H),L(.02,.02,.1,V({color:"#5a2f1a",roughness:.3}),x-.02,U+.84,O).rotation.y=.4;const W=y.friendship==="estranged"?1:2;for(let Q=0;Q<W;Q++){const v=new ae(k(new it(.045,.035,.07,10)),S({color:"#f2eee4"}));v.position.set(x-.1+Q*.22,U+.78,O+.12),I(v);const P=new ae(k(new it(.075,.075,.01,12)),S({color:"#f2eee4"}));P.position.set(x-.1+Q*.22,U+.745,O+.12),I(P)}r.tea=H;const J=(Q,v,P,B=!1)=>{const G=new Kt;if(G.position.set(Q,U,v),G.rotation.y=P,I(G),B){const ue=new ae(k(new je(.42,.9,.05)),S({color:"#7a8a6a"}));ue.position.set(0,.45,0),ue.rotation.x=-.15,G.add(ue);return}const z=new ae(k(new je(.42,.04,.42)),S({color:"#7a8a6a"}));z.position.y=.45,G.add(z);const ee=new ae(k(new je(.42,.45,.04)),S({color:"#7a8a6a"}));ee.position.set(0,.7,.2),G.add(ee);for(const[ue,se]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]]){const he=new ae(k(new je(.03,.45,.03)),T.iron);he.position.set(ue,.22,se),G.add(he)}};W===2?J(x-.72,O+.05,-Math.PI/2+.2):J(x-.75,-7.85,0,!0),J(6.75,O,Math.PI),L(1.2,.18,.2,S({color:"#7a4a32"}),3.6,Ae+1.12,-6.52);for(let Q=0;Q<5;Q++){const v=new ae(k(new ci(.08,0)),Ko(Q%2?"#c8323a":"#3f6a34"));v.position.set(3.1+Q*.25,Ae+1.27,-6.52),I(v)}}if(h){L(1.2,.18,.2,S({color:"#9a5a3a"}),5,Ae+1.12,-6.52);for(let U=0;U<5;U++){const H=new ae(k(new ci(.09,0)),Ko(U%2?"#d8404a":"#4f7a3a"));H.position.set(4.5+U*.25,Ae+1.28,-6.52),I(H)}const x=[new F(-1.9,3.3,-7.9),new F(9.8,3.3,-3)],O=["#c8323a","#f0c040","#2d5a57","#f4f1e8","#3a6a9a"];for(let U=0;U<=26;U++){const H=U/26,W=x[0].clone().lerp(x[1],H);W.y-=Math.sin(H*Math.PI)*.7;const J=new ae(k(new Qo(.1,.22,3)),Ko(O[U%O.length]));J.position.copy(W),J.position.y-=.12,J.rotation.x=Math.PI,I(J)}}{const x=Jt.x,O=Jt.z;L(1.1,.35,.6,T.stone,x+.1,.17,O+.55),p?j(.9,.45,C(new Wo({color:"#cfe0ea",roughness:.15,metalness:.1})),x+.1,.34,O+.55).rotation.x=-Math.PI/2:j(.9,.45,C(new Wo({color:"#2c3432",roughness:.05})),x+.1,.3,O+.55).rotation.x=-Math.PI/2;const U=V(h?{color:"#3f8a5c",roughness:.55,metalness:.15,emissive:"#0c2014"}:f?{color:"#5d6660",roughness:.5,metalness:.35,emissive:"#101412"}:{color:"#6a6e72",roughness:.4,metalness:.5,emissive:p?"#1c2024":"#000000"}),H=new ae(k(new it(.13,.17,1.4,10)),U);H.position.set(x,.7,O),I(H);const W=new ae(k(new Pn(.16,10,6)),U);W.position.set(x,1.45,O),I(W),L(.08,.08,.42,U,x,1.05,O+.24);const J=L(.05,.05,.8,p?V({color:"#9a9288",roughness:.3,metalness:.7,emissive:"#1e1c1a"}):U,x,1.4,O-.35);if(J.rotation.x=p?-.35:.3,d){const Q=new ae(k(new it(.2,.22,.5,8)),S({color:"#c9a860"}));Q.position.set(x,.55,O),I(Q)}if(f){const Q=L(.03,.5,.03,S({color:"#8a8478"}),x,1.15,O-.6);Q.rotation.x=.2;const v=Mt("sticker",{w:256,h:128,bg:"#f0e04a",fg:"#1a1a1a",lines:[{text:"NOT DRINKING",size:34,style:"bold",font:"Arial, sans-serif"},{text:"WATER",size:34,style:"bold",font:"Arial, sans-serif"}]});j(.2,.1,S({map:v}),x,.95,O+.135)}}if(d){const x=N.x,O=N.z,U=S({color:"#3a2a1e"}),H=new ae(k(new Pi(.42,14)),S({color:"#1a120c"}));H.rotation.x=-Math.PI/2,H.position.set(x,.015,O),I(H);const W=new ae(k(new Hn(.46,.08,5,16)),U);W.rotation.x=-Math.PI/2,W.position.set(x,.03,O),W.scale.z=.5,I(W);const J=new ae(k(new Pn(.45,8,5,0,Math.PI*2,0,Math.PI/2)),U);J.scale.set(1.1,.5,.8),J.position.set(x+.85,0,O-.35),I(J);const Q=new ae(k(new Pn(.46,8,5,0,Math.PI*2,0,Math.PI/5)),S({color:"#d8dce6",transparent:!0,opacity:.5}));Q.scale.set(1.1,.5,.8),Q.position.copy(J.position),I(Q);const v=new Kt;v.position.set(x+.95,.15,O-.3),v.rotation.z=-.25,I(v);const P=new ae(k(new it(.02,.02,.95,5)),T.wood);P.position.y=.55,v.add(P);const B=new ae(k(new je(.2,.26,.02)),V({color:"#b8bcc4",roughness:.4,metalness:.6}));B.position.y=0,v.add(B);const G=new ae(k(new je(.16,.03,.03)),T.wood);G.position.y=1.03,v.add(G);const z=S({color:"#8a6a4a",emissive:"#2a1a0c"}),ee=new ae(k(new it(.028,.045,1.7,6)),z);ee.position.set(x,.8,O),ee.rotation.z=.04,I(ee);const ue=Jn("whip");for(let ge=0;ge<6;ge++){const Le=new ae(k(new it(.01,.018,.4+ue()*.3,4)),z),Xe=ue()*Math.PI*2,Ee=1.1+ge*.1;Le.position.set(x+Math.cos(Xe)*.1,Ee+.1,O+Math.sin(Xe)*.1),Le.rotation.set(Math.sin(Xe)*.8,0,-Math.cos(Xe)*.8),I(Le)}for(let ge=0;ge<5;ge++){const Le=new ae(k(new it(.006,.012,.3,4)),S({color:"#6a5038"})),Xe=ge/5*Math.PI*2;Le.position.set(x+Math.cos(Xe)*.12,.03,O+Math.sin(Xe)*.12),Le.rotation.set(Math.sin(Xe)*1.3,0,-Math.cos(Xe)*1.3),I(Le)}const se=Mt("tom-label",{w:256,h:96,bg:"#c8b48a",fg:"#2a2016",lines:[{text:"For Tom Hale",size:34,style:"italic"},{text:"1925",size:30}]}),he=j(.2,.075,S({map:se,side:tn}),x+.05,.75,O+.04);he.rotation.y=A==="arch"?.6:-.6,r.tree=ee}else{const x=u?.82:h?1.1:1,O=S({color:u?"#3a2e26":"#2e2520"}),U=new ae(k(new it(.14*x,.22*x,2.4*x,7)),O);U.position.set(N.x,1.2*x,N.z),I(U),r.tree=U;const H=Jn("pear"),W=[],J=(P,B,G,z,ee)=>{const ue=P.clone().addScaledVector(B,G),se=new ae(k(new it(z*.6,z,G,5)),O);if(se.position.copy(P).lerp(ue,.5),se.quaternion.setFromUnitVectors(new F(0,1,0),B.clone().normalize()),I(se),ee===0){W.push(ue);return}for(let he=0;he<3;he++){const ge=B.clone().add(new F((H()-.5)*1.3,.3+H()*.4,(H()-.5)*1.3-(A==="stair"?.35:0))).normalize();J(ue,ge,G*.72,z*.6,ee-1)}};if(J(new F(N.x,2.3*x,N.z),new F(0,1,0),1*x,.14*x,3),f){const B=new yr(k(new ci(.1,0)),S({color:"#f7e4ea",flatShading:!0}),W.length*14),G=new Ct,z=new lo,ee=new F,ue=new ot;let se=0;for(const ge of W)for(let Le=0;Le<14;Le++)ee.setScalar(.5+H()*1),z.setFromEuler(new di(H()*3,H()*3,0)),G.compose(ge.clone().add(new F((H()-.5)*.9,(H()-.5)*.6,(H()-.5)*.9)),z,ee),B.setMatrixAt(se,G),B.setColorAt(se++,ue.set(H()>.8?"#9bbf6a":H()>.5?"#fff4f6":"#f4d6e0"));I(B),r.blossom=B;const he=S({color:"#f3e3e8"});for(let ge=0;ge<70;ge++){const Le=new ae(k(new Pi(.03,5)),he);Le.rotation.x=-Math.PI/2;const Xe=H()*Math.PI*2,Ee=H()*2.8;Le.position.set(N.x+Math.cos(Xe)*Ee,.012,N.z+Math.sin(Xe)*Ee*.8),I(Le)}}if(h){const P=S({color:"#6f9c46",emissive:"#24400f",flatShading:!0}),B=W.map(It=>It.clone()),G=W.map(()=>.75);if(A==="arch"){const It=new ae(k(new it(.06,.12,5,6)),O),Pt=new F(N.x+.1,2.6,N.z),vt=new F(-.2,4.1,-6.6);It.position.copy(Pt).lerp(vt,.5),It.quaternion.setFromUnitVectors(new F(0,1,0),vt.clone().sub(Pt).normalize()),I(It);for(const pn of qb)B.push(new F(pn.x,pn.y,pn.z)),G.push(pn.r);const en=Xb(),Ue=new yr(k(new ci(1,0)),P,en.length),wn=new Ct,wt=new lo,On=new ot,Nn=Jn("shell");en.forEach((pn,Yi)=>{wt.setFromEuler(new di(Nn()*3,Nn()*3,0)),wn.compose(new F(pn.x,pn.y,pn.z),wt,new F(pn.r,pn.r,pn.r)),Ue.setMatrixAt(Yi,wn),Ue.setColorAt(Yi,On.set(Nn()>.6?"#6f9844":Nn()>.3?"#4f7a34":"#5e8a3a"))}),I(Ue),r.canopy=Ue}const z=40,ee=new yr(k(new ci(.16,0)),P,B.length*z),ue=new Ct,se=new lo,he=new F,ge=new ot;let Le=0;B.forEach((It,Pt)=>{const vt=G[Pt];for(let en=0;en<z;en++)he.setScalar(.8+H()*1.1),se.setFromEuler(new di(H()*3,H()*3,0)),ue.compose(It.clone().add(new F((H()-.5)*2*vt,(H()-.5)*1.2*vt,(H()-.5)*2*vt)),se,he),ee.setMatrixAt(Le,ue),ee.setColorAt(Le++,ge.set(H()>.7?"#7aa04a":H()>.4?"#4f7a34":"#628c3c"))}),I(ee),r.leaves=ee;const Xe=C(new xi({color:"#fff2c8",map:Jo(),transparent:!0,opacity:.35,depthWrite:!1,blending:Hs}));for(let It=0;It<16;It++){const Pt=new ae(k(new Pi(.3+H()*.4,10)),Xe);Pt.rotation.x=-Math.PI/2;const vt=H()*Math.PI*2,en=.6+H()*2.4;Pt.position.set(N.x+.8+Math.cos(vt)*en,.015,N.z+.6+Math.sin(vt)*en*.7),I(Pt)}const Ee=C(new xi({color:"#000",map:Jo(),transparent:!0,opacity:.18,depthWrite:!1})),xt=new ae(k(new Pi(2.6,16)),Ee);xt.rotation.x=-Math.PI/2,xt.position.set(N.x+.8,.012,N.z+.5),I(xt)}if(A==="arch")for(let P=0;P<8;P++){const B=P/8*Math.PI*2;L(.03,.4,.03,T.iron,N.x+Math.cos(B)*.5,.2,N.z+Math.sin(B)*.5)}const Q=Mt("tom-label-old",{w:256,h:96,bg:u?"#8a7a5a":"#6a624e",fg:"#1e1810",noise:900,lines:[{text:"For Tom Hale",size:34,style:"italic"},{text:"1925",size:30}]}),v=j(.2,.075,S({map:Q,side:tn}),N.x+(A==="arch"?.2:-.1),1.3,N.z+(A==="arch"?.12:-.2));if(v.rotation.y=A==="arch"?1:-2.4,A==="stair"){const P=S({color:"#3a2e24"}),B=f?4:1;for(let G=0;G<B;G++){const z=1.25+G*.25,ee=new ae(k(new it(.05,.1,z,6)),P),ue=-.25+G*.22;ee.position.set(N.x+Math.cos(ue)*z/2,.04,N.z+Math.sin(ue)*z/2+.1),ee.rotation.set(0,-ue,Math.PI/2),I(ee)}}}if(d){const x=new Kt;x.position.set(-7.6,0,4.8),x.rotation.y=.5,I(x);const O=new ae(k(new je(1.4,.3,.8)),T.wood);O.position.y=.6,x.add(O);for(const W of[-.45,.45]){const J=new ae(k(new it(.35,.35,.06,12)),T.darkWood);J.rotation.x=Math.PI/2,J.position.set(0,.35,W),x.add(J)}for(let W=0;W<3;W++){const J=new ae(k(new je(.4,.26,.5)),S({color:"#a58a5e"}));J.position.set(-.45+W*.45,.88,0),x.add(J)}const U=new ae(k(new it(.28,.22,.5,10,1,!0)),T.iron);U.position.set(-7.2,.55,-2.6),I(U);for(const W of[0,2.1,4.2])L(.03,.4,.03,T.iron,-7.2+Math.cos(W)*.2,.2,-2.6+Math.sin(W)*.2);L(.4,.06,.4,T.glowWarm,-7.2,.72,-2.6);const H=Qe("#ff8a3a",5,-7.2,1.1,-2.6,7,1.2);s.push((W,J)=>{H.intensity=4.5+Math.sin(J*7.3)*.6+Math.sin(J*13.1)*.4}),L(.6,.6,.6,T.wood,-9.3,.3,-1.6)}else if(u){const x=new Kt;x.position.set(-7.6,0,4.8),x.rotation.y=.5,I(x);const O=new ae(k(new je(1.4,.3,.8)),T.wood);O.position.y=.6,x.add(O);for(const H of[-.45,.45]){const W=new ae(k(new it(.35,.35,.06,12)),T.darkWood);W.rotation.x=Math.PI/2,W.position.set(0,.35,H),x.add(W)}for(let H=0;H<2;H++){const W=new ae(k(new ci(.3,0)),Ko("#26221e"));W.position.set(-.3+H*.55,.9,0),W.scale.set(1,.75,1),x.add(W)}L(.5,.6,.5,V({color:"#8e9296",roughness:.5,metalness:.6}),-9.3,.3,-1.6),L(.45,.3,.35,S({color:"#9a2a22"}),-3.7,.15,7.4);const U=2.6;L(.02,.02,5,S({color:"#ddd"}),-9.9+2.5*0+.02,U,5.4).rotation.y=0;for(let H=0;H<5;H++)j(.4,.55,S({color:["#e8e2d4","#9fb4c8","#e8e2d4","#c89a8a","#dcd4b4"][H],side:tn}),-9.88,U-.3,3.4+H*.9,Math.PI/2)}else if(h){for(let x=0;x<4;x++)L(.05,.75,.6,T.iron,-9.55,.38,-1.5+x*1.1);ie(-9.2,-1.5,Math.PI/2,"#b0443a"),ie(-9.2,.7,Math.PI/2,"#3a6a9a");for(const[x,O]of[["#2f4f3a",-3.4],["#3a4a6a",-2.7]])L(.6,1,.6,S({color:x}),-9.4,.5,O);for(const x of[-6.8,-3.2]){L(.9,.45,.4,S({color:"#8a6a4a"}),x,.22,7.55);for(let O=0;O<4;O++){const U=new ae(k(new ci(.14,0)),Ko(O%2?"#e0a030":"#4f7a3a"));U.position.set(x-.3+O*.2,.55,7.55),I(U)}}if(R){Rt(Co.x,Co.z,"#e8e2d4"),L(.04,2.3,.04,T.iron,Co.x,1.15,Co.z);const x=new ae(k(new Qo(1.2,.4,8,1,!0)),S({color:"#2d5a57",side:tn}));x.position.set(Co.x,2.3,Co.z),I(x)}else{const x=Th;L(.06,1.1,.06,T.iron,x.x,.55,x.z),L(.5,.04,.5,T.iron,x.x,.02,x.z),ie(x.x+.05,x.z,0,"#c8a030",1.15);const O=Mt("stall-board",{w:512,h:256,bg:"#2a3a3a",fg:"#f0e4c0",lines:[{text:"MAYA'S BIKES",size:54,style:"bold",font:"Arial, sans-serif"},{text:"repairs · checks · tea",size:32,font:"Arial, sans-serif"}]});r.stall=j(1.1,.55,S({map:O}),ht.x0+.02,1.9,x.z+.1,Math.PI/2);for(let U=0;U<5;U++)L(.03,.22,.04,T.iron,ht.x0+.05,1.2,x.z-.5+U*.25);for(const U of[.9,1.25]){const H=new ae(k(new Hn(.33,.025,5,18)),T.black);H.position.set(ht.x0+.08,.34,x.z+U),H.rotation.y=Math.PI/2,I(H)}}}else{L(.6,1,.7,S({color:"#2f4f3a"}),-9.3,.5,-1.6),L(.64,.06,.74,S({color:"#2f4f3a"}),-9.3,1.02,-1.6);const x=new Kt;x.position.set(-7.4,0,6.8),x.rotation.set(0,.3,1.45),I(x);for(const H of[-.35,.35]){const W=new ae(k(new Hn(.24,.03,5,14)),T.black);W.position.set(H,.1,0),x.add(W)}const O=new ae(k(new je(.7,.05,.05)),S({color:"#1e7ac8"}));O.position.set(0,.15,0),x.add(O);const U=new ae(k(new it(.3,.3,.8,10)),S({color:"#3a4f36"}));U.position.set(-5.6,.4,7.45),I(U)}if(u){const O=new Float32Array(2100),U=new Float32Array(700);for(let J=0;J<700;J++)O[J*3]=(b()-.5)*19,O[J*3+1]=b()*9,O[J*3+2]=(b()-.5)*15.4,U[J]=.35+b()*.4;const H=k(new nn);H.setAttribute("position",new ii(O,3));const W=new su(H,C(new fh({color:"#f4f6ff",map:Jo(),size:.07,transparent:!0,opacity:.9,depthWrite:!1})));I(W),s.push((J,Q)=>{for(let v=0;v<700;v++)O[v*3+1]-=U[v]*J,O[v*3]+=Math.sin(Q*.7+v)*.15*J,O[v*3+1]<0&&(O[v*3+1]+=9);H.attributes.position.needsUpdate=!0})}else if(f){const O=new Float32Array(8400),U=new Float32Array(1400*3);for(let J=0;J<1400;J++)U[J*3]=(b()-.5)*19.4,U[J*3+1]=b()*10,U[J*3+2]=(b()-.5)*15.4;const H=k(new nn);H.setAttribute("position",new ii(O,3));const W=new Gm(H,C(new Zf({color:"#dfe7ec",transparent:!0,opacity:.35,depthWrite:!1})));W.frustumCulled=!1,I(W),s.push(J=>{for(let Q=0;Q<1400;Q++){U[Q*3+1]-=9*J,U[Q*3+1]<0&&(U[Q*3+1]+=10);const v=U[Q*3],P=U[Q*3+1],B=U[Q*3+2];O.set([v,P,B,v+.03,P+.38,B],Q*6)}H.attributes.position.needsUpdate=!0})}const ra=Ep[n],$i=new Set(Cp(n,e)),dn=(x,O,U=!0)=>{if(!$i.has(O))return null;const H=Rp(n,O,e),W=pf({...x,seated:H.seated});return W.group.position.set(H.x,H.y,H.z),W.facing=H.facing,W.group.rotation.y=H.facing,W.lookAt=U,I(W.group),o.push(W),r[O]=W.group,a[O]=W,W.name=O,W},pi=(x,O)=>{const{path:U,speed:H}=ra[O],W=pf(x);return W.group.position.set(U[0][0],0,U[0][1]),W.path={points:U.map(([J,Q])=>new F(J,0,Q)),speed:H,t:b()*U.length},I(W.group),o.push(W),r[O]=W.group,a[O]=W,W.name=O,W};d?(dn({coat:"#2c2a2e",trousers:"#232124",hat:"bowler",scarf:"#5a4a3a",height:1.78,stoop:.06,hair:"#8a8278",skin:"#d6a88a"},"amos"),dn({coat:"#26222a",skirt:"#1e1b20",hat:"scarf",hatColor:"#1c1a1e",apron:"#d8cfb8",carry:"reach",height:1.64,skin:"#e0b194"},"ida"),dn({coat:"#8a2e26",skirt:"#3a3040",trousers:"#3a3040",hat:"scarf",hatColor:"#c8b890",height:2,child:!0,hair:"#6a3a1e",skin:"#e8b89a"},"winnie"),dn({coat:"#4a4a3a",trousers:"#2a2a28",hat:"cap",hatColor:"#3a3630",height:1.82,child:!0,carry:"hand",skin:"#dcae90"},"jonah"),pi({coat:"#5a4a3a",trousers:"#2e2a26",hat:"cap",hatColor:"#3a3430",apron:"#cfc4a8",height:1.74},"hand"),pi({coat:"#4a3a4a",skirt:"#2a2430",hat:"scarf",hatColor:"#7a5a3a",carry:"basket",height:1.6},"dipper"),pi({coat:"#2e3440",trousers:"#22262e",hat:"cap",hatColor:"#2a2e36",carry:"pole",height:1.76},"lamplighter")):u?(dn({coat:"#4a4d52",trousers:"#2b2b2e",hat:"trilby",hatColor:"#2e2a26",scarf:"#7a1f22",carry:"ledger",height:1.8,skin:"#dcae90"},"jonah"),dn({coat:"#3f6a52",skirt:"#4a3a30",trousers:"#3a302a",scarf:"#b0463a",apron:"#d8cfb8",height:1.66,hair:"#5a2e1c",hairUp:"bun",skin:"#e0b194"},"winnie"),pi({coat:"#6b5238",trousers:"#34302a",hat:"cap",hatColor:"#3d3a33",carry:"plank",height:1.78,skin:"#d8a888"},"joiner"),dn({coat:"#6a4a5a",skirt:"#2e2a30",hat:"scarf",hatColor:"#d8c890",carry:"bucket",height:1.6},"neighbour",!1),dn({coat:"#a8452e",trousers:"#2f3140",hat:"cap",hatColor:"#28303c",child:!0},"child"),pi({coat:"#3b3f48",trousers:"#262626",hat:"trilby",carry:"wireless",height:1.74},"wireless")):h?(dn({coat:"#3a5a78",trousers:"#2a2a30",apron:R?"#e8e2d4":"#4a3e32",hair:"#7a4a2a",hairUp:"tail",height:1.68,skin:"#e0b194"},"maya"),dn({coat:"#e8e6e0",trousers:"#2f3a4a",hair:"#6a5238",height:1.82,carry:"clipboard",skin:"#dcae90"},"theo"),dn({coat:"#7a8a5a",trousers:"#3a3a40",hair:"#9a8a78",carry:"mug",skin:"#c89a7a"},"customer"),dn({coat:"#c85a3a",trousers:"#2a3a5a",hair:"#e0c090",carry:"bike",height:1.66},"neighbour"),dn({coat:"#e0c8a0",skirt:"#4a5a7a",hair:"#3a2a1e",height:1.62,skin:"#b88a6a"},"listener"),pi({coat:"#3a3a3a",trousers:"#5a6a7a",hair:"#1a1a1a",carry:"bike",height:1.8},"cyclist"),pi({coat:"#e04a6a",trousers:"#3a4a7a",hair:"#6a3a1e",child:!0,carry:"scooter"},"scooter")):(dn({coat:"#6a4a6a",skirt:"#4a4a52",trousers:"#3a3a3a",hair:"#e8e4dc",height:1.6,stoop:.12,scarf:"#c8b89a",skin:"#e2b8a0"},"winnie"),dn({coat:"#4d5236",trousers:"#2f2e2a",hat:"cap",hatColor:"#5a5448",carry:"clipboard",height:1.76,stoop:.08,hair:"#cfcac0",skin:"#d8ad94"},"jonah"),dn({coat:"#5a4a3a",trousers:"#3a342c",hat:"cap",hatColor:"#4a453c",carry:"mug",stoop:.1,hair:"#dcdcd4"},"stan"),pi({coat:"#b0443a",trousers:"#2a2c34",umbrella:"#233a5a",hair:"#5a3a28",height:1.68},"umbrella"),dn({coat:"#2c4a8a",trousers:"#3a4a6a",hair:"#2a1a12",height:1.7},"teen")),t.traverse(x=>{x.matrixAutoUpdate=!0});function fs(){return O_()}function Oo(x,O,U,H,W,J=2.5){const Q=k(new nn),v=x.distanceTo(O)/J,P=x.distanceTo(H)/J;return Q.setAttribute("position",new gt([x,O,U,x,U,H].flatMap(B=>[B.x,B.y,B.z]),3)),Q.setAttribute("uv",new gt([0,0,v,0,v,P,0,0,v,P,0,P],2)),Q.computeVertexNormals(),I(new ae(Q,W))}function Fo(x,O,U,H,W,J){const Q=J+1.9,v=(H+W)/2,P=.35*Math.sign(H-W),B=(z,ee,ue)=>x==="z"?new F(z,ee,ue):new F(ue,ee,z);Oo(B(O-.3,J-.1,H+P),B(U+.3,J-.1,H+P),B(U+.3,Q,v),B(O-.3,Q,v),T.slate),Oo(B(O-.3,J-.1,W-P),B(U+.3,J-.1,W-P),B(U+.3,Q,v),B(O-.3,Q,v),T.slate);const G=U-O+.6;x==="z"?L(G,.14,.2,S({color:"#5a3a30"}),(O+U)/2,Q+.03,v):L(.2,.14,G,S({color:"#5a3a30"}),v,Q+.03,(O+U)/2);for(let z=O+2.5;z<U-1;z+=5.5){const ee=x==="z"?L(.9,1.8,.6,T.brick,z,Q+.2,v):L(.6,1.8,.9,T.brick,v,Q+.2,z);for(let ue=0;ue<2;ue++){const se=new ae(k(new it(.1,.12,.35,8)),S({color:"#8a4a32"}));se.position.set(ee.position.x+(x==="z"?-.2+ue*.4:0),Q+1.27,ee.position.z+(x==="x"?-.2+ue*.4:0)),I(se)}u&&b()>.3&&ps(ee.position.x,Q+1.4,ee.position.z),u&&b()>.6&&(L(.03,1.2,.03,T.iron,ee.position.x+.3,Q+1.6,ee.position.z),L(1,.03,.03,T.iron,ee.position.x+.3,Q+2,ee.position.z),L(.7,.03,.03,T.iron,ee.position.x+.3,Q+1.8,ee.position.z))}x==="z"?L(U-O+.6,.12,.14,T.iron,(O+U)/2,J-.12,H+P):L(.14,.12,U-O+.6,T.iron,H+P,J-.12,(O+U)/2)}function ps(x,O,U){const H=[],W=C(new pl({map:Jo(),color:"#6b6878",transparent:!0,opacity:.25,depthWrite:!1}));for(let J=0;J<6;J++){const Q=new uh(W);Q.position.set(x,O+J*.5,U),Q.scale.setScalar(.6+J*.3),I(Q),H.push(Q)}s.push(J=>{for(const Q of H)Q.position.y+=J*.35,Q.position.x+=J*.12,Q.scale.addScalar(J*.12),Q.position.y>O+3&&(Q.position.set(x,O,U),Q.scale.setScalar(.6))})}return{root:t,era:n,sky:Be,fog:ut,solids:c,tree:N,treeWidth:d?.3:.5,exposure:d?1.1:u?1.05:1,marks:r,update(x,O,U){for(const H of s)H(x,O);for(const H of o)z_(H,x,O,U,l.has(H.name??""))},attend(x){l=new Set(x)},figure(x){return a[x]??null},dispose(){t.removeFromParent();for(const x of i)x.dispose();for(const x of o)x.group.traverse(O=>{const U=O;U.isMesh&&U.geometry.dispose()})}}}let Xa=null;function O_(){if(Xa)return Xa;const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d"),t=Jn("soot");for(let i=0;i<90;i++){const o=256-Math.pow(t(),.7)*230,s=30+(256-o)*.45,r=128+(t()-.5)*s*1.6,a=18+t()*40,l=e.createRadialGradient(r,o,0,r,o,a),c=.1+o/256*.22;l.addColorStop(0,`rgba(0,0,0,${c})`),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(0,0,256,256)}return Xa=new Qf(n),Xa}const F_={0:"[The key turns. Frost, gaslight, and the last of the light over the roofs: New Year's Eve.]",1:"[The key turns. The air goes cold: a March evening.]",2:"[The key turns. Rain on the cobbles.]",3:"[The key turns. Warm air, coffee and bicycles: a summer morning.]"};class B_{constructor(e){this.caption=e}ctx=null;master;bed=null;timers=[];muted=!1;get started(){return!!this.ctx}start(){if(this.ctx)return;const e=window.AudioContext??window.webkitAudioContext;e&&(this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:.7,this.master.connect(this.ctx.destination))}setMuted(e){this.muted=e,this.ctx&&this.master.gain.setTargetAtTime(e?0:.7,this.ctx.currentTime,.1)}get isMuted(){return this.muted}noise(e=2){const t=this.ctx,i=t.createBuffer(1,t.sampleRate*e,t.sampleRate),o=i.getChannelData(0);for(let s=0;s<o.length;s++)o[s]=Math.random()*2-1;return i}loopNoise(e,t,i,o,s){const r=this.ctx,a=r.createBufferSource();a.buffer=this.noise(3),a.loop=!0;const l=r.createBiquadFilter();l.type=t,l.frequency.value=i,l.Q.value=o;const c=r.createGain();return c.gain.value=s,a.connect(l).connect(c).connect(e),a.start(),{src:a,g:c,f:l}}every(e,t){const i=()=>{t(),this.timers.push(window.setTimeout(i,e()))};this.timers.push(window.setTimeout(i,e()))}silence(){for(const e of this.timers)clearTimeout(e);if(this.timers=[],this.ctx&&this.bed){const e=this.bed;e.gain.setTargetAtTime(0,this.ctx.currentTime,.3),setTimeout(()=>e.disconnect(),2e3),this.bed=null}}setEra(e,t={}){if(this.silence(),!this.ctx)return;const i=this.ctx,o=i.createGain();if(o.gain.value=0,o.connect(this.master),o.gain.setTargetAtTime(1,i.currentTime+.3,.8),this.bed=o,e===0)this.loopNoise(o,"highpass",3200,.4,.035),this.loopNoise(o,"lowpass",300,.5,.05),this.every(()=>2600+Math.random()*4200,()=>this.hammer(o)),this.every(()=>9e3+Math.random()*9e3,()=>this.voices(o)),this.timers.push(window.setTimeout(()=>this.voices(o,!0),2200));else if(e===1){const s=this.loopNoise(o,"bandpass",380,.6,.12),r=i.createOscillator(),a=i.createGain();r.frequency.value=.07,a.gain.value=200,r.connect(a).connect(s.f.frequency),r.start(),this.every(()=>16e3+Math.random()*12e3,()=>this.wireless(o)),this.every(()=>38e3+Math.random()*2e4,()=>this.kettle(o)),this.timers.push(window.setTimeout(()=>this.wireless(o),2500))}else e===3?(this.loopNoise(o,"lowpass",700,.4,.035),this.every(()=>7e3+Math.random()*9e3,()=>this.swifts(o)),this.every(()=>11e3+Math.random()*1e4,()=>this.bikeBell(o)),this.every(()=>14e3+Math.random()*12e3,()=>this.chatter(o)),t.cafe?(this.every(()=>16e3+Math.random()*14e3,()=>this.espresso(o)),this.timers.push(window.setTimeout(()=>this.espresso(o,!0),2600))):this.timers.push(window.setTimeout(()=>this.freewheel(o,!0),2600)),this.timers.push(window.setTimeout(()=>this.chatter(o,!0),5200))):(this.loopNoise(o,"highpass",1800,.3,.16),this.loopNoise(o,"lowpass",500,.5,.08),this.every(()=>90+Math.random()*300,()=>this.drip(o)),this.every(()=>2500+Math.random()*5e3,()=>this.clack(o)),this.every(()=>2e4+Math.random()*15e3,()=>this.cassette(o)),this.timers.push(window.setTimeout(()=>this.cassette(o),3e3)))}bell(e=1,t="[The Court bell rings]"){if(this.caption(t,!0),!this.ctx)return;const i=this.ctx,o=[.5,1,1.183,1.506,2,2.514,2.662,3.011,4.166];for(let s=0;s<e;s++){const r=i.currentTime+s*2.2+.05,a=i.createGain();a.gain.value=.22,a.connect(this.master),o.forEach((l,c)=>{const d=i.createOscillator(),u=i.createGain();d.frequency.value=196*l,d.type="sine";const f=[.5,.9,.5,.45,.35,.25,.2,.15,.08][c];u.gain.setValueAtTime(0,r),u.gain.linearRampToValueAtTime(f,r+.004),u.gain.exponentialRampToValueAtTime(1e-4,r+(c<2?7:3.5/(1+c*.3))),d.connect(u).connect(a),d.start(r),d.stop(r+7.5)})}}travel(e){if(this.caption(F_[e],!0),!this.ctx)return;const t=this.ctx,i=t.currentTime,o=t.createBufferSource();o.buffer=this.noise(.05);const s=t.createBiquadFilter();s.type="bandpass",s.frequency.value=2400,s.Q.value=4;const r=t.createGain();r.gain.value=.5,o.connect(s).connect(r).connect(this.master),o.start(i),[392,523.25,659.25,783.99].forEach((a,l)=>{const c=t.createOscillator(),d=t.createGain();c.type="triangle",c.frequency.value=a*[.6,.75,1,1.2][e],d.gain.setValueAtTime(0,i+.1+l*.12),d.gain.linearRampToValueAtTime(.05,i+.3+l*.12),d.gain.exponentialRampToValueAtTime(1e-4,i+2.6),c.connect(d).connect(this.master),c.start(i),c.stop(i+2.8)})}step(e){if(!this.ctx)return;const t=this.ctx,i=t.createBufferSource();i.buffer=this.noise(.08);const o=t.createBiquadFilter();o.type="bandpass",o.frequency.value=e===2?900+Math.random()*300:e===3?700+Math.random()*200:e===0?620+Math.random()*160:420+Math.random()*120,o.Q.value=1.5;const s=t.createGain();s.gain.setValueAtTime(e===2?.08:.12,t.currentTime),s.gain.exponentialRampToValueAtTime(.001,t.currentTime+.09),i.connect(o).connect(s).connect(this.master),i.start()}note(){if(!this.ctx)return;const e=this.ctx,t=e.currentTime;for(const[i,o]of[[880,0],[1318.5,.07]]){const s=e.createOscillator(),r=e.createGain();s.frequency.value=i,s.type="sine",r.gain.setValueAtTime(0,t+o),r.gain.linearRampToValueAtTime(.05,t+o+.01),r.gain.exponentialRampToValueAtTime(1e-4,t+o+.5),s.connect(r).connect(this.master),s.start(t+o),s.stop(t+o+.6)}}wireless(e){this.caption("[A wireless in the co-op plays a jingle through the crackle]");const t=this.ctx,i=t.currentTime,o=t.createBiquadFilter();o.type="bandpass",o.frequency.value=1200,o.Q.value=.9;const s=t.createGain();s.gain.value=.05,o.connect(s).connect(e),[523,659,784,659,698,587,523,0,587,698,880,784].forEach((c,d)=>{if(!c)return;const u=t.createOscillator(),f=t.createGain();u.type="square",u.frequency.value=c,f.gain.setValueAtTime(0,i+d*.22),f.gain.linearRampToValueAtTime(.5,i+d*.22+.01),f.gain.exponentialRampToValueAtTime(.01,i+d*.22+.2),u.connect(f).connect(o),u.start(i+d*.22),u.stop(i+d*.22+.22)});const a=t.createBufferSource();a.buffer=this.noise(3);const l=t.createGain();l.gain.value=.25,a.connect(l).connect(o),a.start(i),a.stop(i+2.9)}hammer(e){const t=this.ctx,i=t.currentTime,o=1+Math.floor(Math.random()*3);for(let s=0;s<o;s++){const r=t.createBufferSource();r.buffer=this.noise(.06);const a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=520+Math.random()*120,a.Q.value=5;const l=t.createGain();l.gain.setValueAtTime(.09,i+s*.32),l.gain.exponentialRampToValueAtTime(.001,i+s*.32+.12),r.connect(a).connect(l).connect(e),r.start(i+s*.32)}}voices(e,t=!1,i=!0){t&&this.caption('[The candle works is letting out early: voices, clogs on the frozen cobbles, someone calls "Happy New Year, when it comes!"]');const o=this.ctx,s=o.currentTime;for(let r=0;r<6;r++){const a=o.createOscillator(),l=o.createGain(),c=o.createBiquadFilter();a.type="sawtooth",a.frequency.setValueAtTime(140+Math.random()*120,s+r*.25),a.frequency.linearRampToValueAtTime(120+Math.random()*160,s+r*.25+.3),c.type="bandpass",c.frequency.value=700+Math.random()*500,c.Q.value=2,l.gain.setValueAtTime(0,s+r*.25),l.gain.linearRampToValueAtTime(.012,s+r*.25+.05),l.gain.linearRampToValueAtTime(0,s+r*.25+.35),a.connect(c).connect(l).connect(e),a.start(s+r*.25),a.stop(s+r*.25+.4)}if(i)for(let r=0;r<4;r++)this.timers.push(window.setTimeout(()=>this.hammer(e),300+r*420))}kettle(e){this.caption("[Somewhere up on the gallery, a kettle whistles]");const t=this.ctx,i=t.currentTime,o=t.createOscillator(),s=t.createGain();o.frequency.setValueAtTime(1500,i),o.frequency.linearRampToValueAtTime(2300,i+2.5),s.gain.setValueAtTime(0,i),s.gain.linearRampToValueAtTime(.02,i+1.8),s.gain.linearRampToValueAtTime(0,i+3.4),o.connect(s).connect(e),o.start(i),o.stop(i+3.5)}drip(e){const t=this.ctx,i=t.currentTime,o=t.createOscillator(),s=t.createGain();o.frequency.setValueAtTime(1200+Math.random()*1400,i),o.frequency.exponentialRampToValueAtTime(400,i+.06),s.gain.setValueAtTime(.02,i),s.gain.exponentialRampToValueAtTime(1e-4,i+.08),o.connect(s).connect(e),o.start(i),o.stop(i+.1)}clack(e){const t=this.ctx,i=t.currentTime;for(let o=0;o<2;o++){const s=t.createBufferSource();s.buffer=this.noise(.05);const r=t.createBiquadFilter();r.type="bandpass",r.frequency.value=700,r.Q.value=3;const a=t.createGain();a.gain.setValueAtTime(.1,i+o*.13),a.gain.exponentialRampToValueAtTime(.001,i+o*.13+.05),s.connect(r).connect(a).connect(e),s.start(i+o*.13)}}espresso(e,t=!1){this.caption(t?"[In the café, an espresso machine hisses and knocks out its grounds]":"[The espresso machine hisses]");const i=this.ctx,o=i.currentTime,s=i.createBufferSource();s.buffer=this.noise(2.5);const r=i.createBiquadFilter();r.type="highpass",r.frequency.value=2500;const a=i.createGain();a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(.05,o+.2),a.gain.linearRampToValueAtTime(0,o+2.3),s.connect(r).connect(a).connect(e),s.start(o),s.stop(o+2.5);for(let l=0;l<3;l++)this.timers.push(window.setTimeout(()=>this.clack(e),2700+l*180))}bikeBell(e){this.caption("[A bicycle bell rings twice under the arch]");const t=this.ctx,i=t.currentTime;for(let o=0;o<2;o++)for(const s of[1,2.76]){const r=t.createOscillator(),a=t.createGain();r.frequency.value=2100*s,a.gain.setValueAtTime(.02/s,i+o*.18),a.gain.exponentialRampToValueAtTime(1e-4,i+o*.18+.5),r.connect(a).connect(e),r.start(i+o*.18),r.stop(i+o*.18+.55)}}freewheel(e,t=!1){t&&this.caption("[Under the arch, a freewheel ticks as Maya spins a wheel]");const i=this.ctx,o=i.currentTime;for(let s=0;s<26;s++){const r=i.createBufferSource();r.buffer=this.noise(.01);const a=i.createBiquadFilter();a.type="bandpass",a.frequency.value=4200,a.Q.value=6;const l=i.createGain(),c=o+s*(.04+s*.004);l.gain.setValueAtTime(.06,c),l.gain.exponentialRampToValueAtTime(.001,c+.02),r.connect(a).connect(l).connect(e),r.start(c)}}chatter(e,t=!1){t&&this.caption("[Chatter and laughter across the yard]"),this.voices(e,!1,!1)}swifts(e){const t=this.ctx,i=t.currentTime;for(let o=0;o<5;o++){const s=t.createOscillator(),r=t.createGain(),a=i+o*.09+Math.random()*.05;s.frequency.setValueAtTime(5200,a),s.frequency.exponentialRampToValueAtTime(3600,a+.07),r.gain.setValueAtTime(.008,a),r.gain.exponentialRampToValueAtTime(1e-4,a+.08),s.connect(r).connect(e),s.start(a),s.stop(a+.09)}}cassette(e){this.caption("[A cassette radio in a window plays a wobbly synth-pop tune]");const t=this.ctx,i=t.currentTime,o=t.createBiquadFilter();o.type="lowpass",o.frequency.value=2200;const s=t.createGain();s.gain.value=.035,o.connect(s).connect(e);const r=t.createOscillator(),a=t.createGain();r.frequency.value=.6,a.gain.value=6,r.connect(a),r.start(i),r.stop(i+6),[[220,277,330],[196,247,294],[175,220,262],[196,247,294]].forEach((c,d)=>c.forEach(u=>{const f=t.createOscillator(),h=t.createGain();f.type="sawtooth",f.frequency.value=u,a.connect(f.detune),h.gain.setValueAtTime(0,i+d*1.4),h.gain.linearRampToValueAtTime(.3,i+d*1.4+.05),h.gain.linearRampToValueAtTime(0,i+d*1.4+1.35),f.connect(h).connect(o),f.start(i+d*1.4),f.stop(i+d*1.4+1.4)}))}}const mf=n=>n.e1991.workshopUse==="coop",qo=Ae,Fn=nr.arch,Eo=nr.stair,Os=n=>e=>(n===0?e.e1926:n===1?e.e1958:n===2?e.e1991:e.e2026).treePosition==="arch",Sr=n=>e=>!Os(n)(e),gf=ai[0].ida,Ri=n=>n.e2026.workshopUse==="cafe",yf=ai[3].maya,xf=ai[3].theo,Po=[{id:"bell26",era:0,at:[2.5,1.25,-6.2],stand:[2.6,0,-3.6],label:"Talk to the bell-keeper and the children",talk:"bell1926",reach:3.9,figures:["amos","winnie","jonah"]},{id:"ida26arch",era:0,at:[gf.x,1.5,gf.z],stand:[-2.6,0,-2.9],label:"Talk to the woman with the pear sapling",talk:"ida1926",reach:3.6,figures:["ida"],when:Os(0)},{id:"ida26stair",era:0,at:[Mh.x,1.5,Mh.z],stand:[.9,0,3.6],label:"Talk to the woman with the pear sapling",talk:"ida1926",reach:3.6,figures:["ida"],when:Sr(0)},{id:"rope26",era:0,at:[bt.x,1.7,bt.z+.1],stand:[.7,0,-5.9],label:"Look at the bell rope",inspectionId:"bell-1926",size:.3},{id:"tree26arch",era:0,at:[Fn.x,.9,Fn.z],stand:[-4.3,0,-3.3],label:"Look at the new pear tree",inspectionId:"tree-1926",size:.45,when:Os(0)},{id:"tree26stair",era:0,at:[Eo.x,.9,Eo.z],stand:[.2,0,4.8],label:"Look at the new pear tree",inspectionId:"tree-1926",size:.45,when:Sr(0)},{id:"works26",era:0,at:[5.4,1.3,-13.35],stand:[5.4,0,-11.4],label:"Look at the dipping frames",size:.8,glance:()=>"Racks of tallow dips hang cooling from the frames, in pairs by their wicks. The vats are banked low for the holiday."},{id:"store26",era:0,at:[3.5,1.2,-13.9],stand:[3.6,0,-12.2],label:"Look into the back store",size:.5,glance:()=>"Casks of tallow stacked to the ceiling. It smells of mutton fat and cold."},{id:"office26",era:0,at:[Ve.x1-1.1,.95,Ve.z0+.7],stand:[8.3,0,-12],label:"Look at the office desk",size:.45,glance:()=>'The works wages book, shut. "Paid 31st, early, by order of Mr Mercer."'},{id:"board26",era:0,at:[12.4,1.6,At.z0+.12],stand:[12.4,0,-4],label:"Read the noticeboard",size:.6,glance:()=>`Court notices: "Works closes at four o'clock, 31st inst." "New Year bell at midnight. A. Pell, bell-keeper." "Thank you all, for everything this year. I. Hale."`},{id:"cupboard26",era:0,at:[At.x1-.2,1.2,-2.2],stand:[14.2,0,-2.2],label:"Open the Long Room cupboard",size:.6,glance:()=>'Rent books, lamp oil, and a spare bell clapper wrapped in sacking. "A. PELL" is burnt into the lid.'},{id:"pump26",era:0,at:[Jt.x,1.1,Jt.z],stand:[Jt.x+1.2,0,Jt.z+.6],label:"Look at the pump",size:.4,glance:()=>"The iron pump, its handle worn bright. Straw is bound round the pipe against the frost."},{id:"hand26",era:0,at:[4.8,1.5,-3.2],label:"Talk to the candle-maker going home",figures:["hand"],aside:`"Out at four, and paid! Mr Mercer's one kindness a year."`},{id:"dipper26",era:0,at:[6.6,1.5,-2.5],label:"Talk to the woman with the basket",figures:["dipper"],aside:`"Can't stop, love, I've a pudding to see to. Happy New Year, when it comes."`},{id:"lamplighter26",era:0,at:[-8.6,1.5,0],label:"Talk to the lamplighter",figures:["lamplighter"],aside:`"Last round of the year. They'll want every mantle lit for the bell."`},{id:"anchor26",era:0,at:[Bn.x+.7,Bn.y,Bn.z],stand:[8.9,0,-1],label:"Turn the key in the Long Room door",travel:!0,reach:2.6,size:.6},{id:"rope58",era:1,at:[bt.x,1.3,bt.z+.1],stand:[1.2,0,-6.2],label:"Look at the bell rope and its box",inspectionId:"key-1958",size:.3},{id:"pair58",era:1,at:[3.68,1.55,-5.25],stand:[3.6,0,-3],label:"Talk to Jonah and Winnie",talk:"pair1958",reach:3.8,figures:["jonah","winnie"]},{id:"book58",era:1,at:[Ve.x1-1.1,.95,Ve.z0+.7],stand:[8.3,0,-12],label:"Look at the office desk",inspectionId:"book-1958",size:.45},{id:"backstore58",era:1,at:[3.5,1.2,-13.9],stand:[3.6,0,-12.2],label:"Look into the back store",inspectionId:"backstore-1958",size:.5},{id:"board58",era:1,at:[12.4,1.6,At.z0+.12],stand:[12.4,0,-4],label:"Read the noticeboard",size:.6,glance:()=>'Court notices: "Coal Thursday." "The co-op mends any Court wireless at cost. W. Hale." "New Year bell at midnight as usual. J. Pell."'},{id:"cupboard58",era:1,at:[At.x1-.2,1.2,-2.2],stand:[14.2,0,-2.2],label:"Open the Long Room cupboard",size:.6,glance:n=>n.e1958.courtBookKeeper==="jonah"?"The Pells' cupboard: rent books, a spare clapper in sacking, and on its own shelf now, the Court Book.":"The Pells' cupboard: rent books, and a spare bell clapper wrapped in sacking."},{id:"pump58",era:1,at:[Jt.x,1.1,Jt.z],stand:[Jt.x+1.2,0,Jt.z+.6],label:"Look at the pump",size:.4,glance:()=>"The old iron pump. Its handle is worn bright, and there is ice in the trough."},{id:"tree58arch",era:1,at:[Fn.x,1.6,Fn.z],stand:[Fn.x+1.8,0,Fn.z+.5],label:"Look at the pear tree",inspectionId:"tree-1958",size:.6,when:Os(1)},{id:"tree58stair",era:1,at:[Eo.x,1.4,Eo.z],stand:[2.1,0,4.7],label:"Look at the pear tree",inspectionId:"tree-1958",size:.6,when:Sr(1)},{id:"joiner58",era:1,at:[-2.8,1.5,0],label:"Talk to the joiner with the plank",figures:["joiner"],aside:`He stops, plank on his shoulder. "Sołtys. Number six, since Christmas. Mind the plank, it's for the co-op's shelves."`},{id:"wireless58",era:1,at:[.3,1.5,-2],label:"Talk to the man with the wireless",figures:["wireless"],aside:`"Valve's gone again. Mrs Hale'll have it singing by Friday."`},{id:"neighbour58",era:1,at:[Jt.x+.1,1.5,Jt.z+1.25],label:"Talk to the woman at the pump",figures:["neighbour"],aside:`"Froze again. I've been at this handle ten minutes." She laughs. "Go on, love, before your feet freeze with it."`},{id:"child58",era:1,at:[-3,1,-3.8],label:"Talk to the boy with the ball",figures:["child"],aside:`"It's my ball. You can have a kick after, if you like."`},{id:"anchor58",era:1,at:[Bn.x+.7,Bn.y,Bn.z],stand:[8.9,0,-1],label:"Turn the key in the Long Room door",travel:!0,reach:2.6,size:.6},{id:"rope91",era:2,at:[bt.x,1.6,bt.z+.1],stand:[1.2,0,-6.2],label:"Look at the bell rope",inspectionId:"rope-1991",size:.25},{id:"plaque91",era:2,at:[Gn.x,1.55,Gn.z],stand:[2.8,0,-6],label:"Look at the wall beside the rope",inspectionId:"plaque-1991",size:.25},{id:"front91",era:2,at:[4,1.5,-7.95],stand:[3.9,0,-5.9],label:"Look at the workshop front",inspectionId:"workshop-1991",size:.9},{id:"lintel91",era:2,at:[6.45,2.45,-7.95],stand:[6.4,0,-4.8],label:"Look at the blackened lintel",inspectionId:"scorch-1991",size:.6,when:n=>n.e1991.scorch==="lintel"},{id:"backwall91",era:2,at:[7.1,1.5,-8],stand:[7,0,-5.4],label:"Look through the co-op window at the back wall",inspectionId:"scorch-1991",size:.7,when:n=>n.e1991.scorch==="backwall"},{id:"office91",era:2,at:[Ve.x1-.25,1.45,-12.4],stand:[8.3,0,-12],label:"Take down the book on the office shelf",inspectionId:"book-workshop-1991",read:!0,size:.35,when:n=>mf(n)&&n.e1991.courtBookLocation==="workshop"},{id:"officeglance91",era:2,at:[Ve.x1-.25,1.45,-12.4],stand:[8.3,0,-12],label:"Look at the office shelf",size:.35,when:n=>mf(n)&&n.e1991.courtBookLocation!=="workshop",glance:()=>"Valve boxes, a tin of fuses, co-op accounts in a row of cheap exercise books."},{id:"echo91",era:2,at:[13.05,1.55,At.z0+.12],stand:[12.9,0,-4],label:"Read the framed newspaper cutting",inspectionId:"echo-1991",size:.3},{id:"cupboard91",era:2,at:[At.x1-.2,1.2,-2.2],stand:[14.2,0,-2.2],label:"Take the green book from the cupboard",inspectionId:"book-longroom-1991",read:!0,size:.6,when:n=>n.e1991.courtBookLocation==="longroom"},{id:"cupboardempty91",era:2,at:[At.x1-.2,1.2,-2.2],stand:[14.2,0,-2.2],label:"Open the Long Room cupboard",inspectionId:"cupboard-1991",size:.6,when:n=>n.e1991.courtBookLocation!=="longroom"},{id:"tea91",era:2,at:[js.x,qo+.8,js.z],stand:[6.1,qo,-6.9],label:"Look at Winnie's tea table",inspectionId:"friendship-1991",size:.35},{id:"winnie91",era:2,at:[ai[2].winnie.x,qo+1.05,ai[2].winnie.z],stand:[7.9,qo,-7],label:"Talk to Winnie",talk:"winnie1991",reach:3.2,figures:["winnie"]},{id:"jonah91",era:2,at:[13.7,1.5,1.4],stand:[12.1,0,2.3],label:"Talk to Jonah",talk:"jonah1991",reach:3.4,figures:["jonah"]},{id:"stan91",era:2,at:[5,1,-6.9],stand:[5,0,-5.4],label:"Say hello to the old man by the co-op",talk:"stan1991",when:n=>n.e1991.bucketChain,figures:["stan"]},{id:"pump91",era:2,at:[Jt.x,1.1,Jt.z],stand:[Jt.x+1.2,0,Jt.z+.6],label:"Look at the pump",size:.4,glance:()=>"The pump handle is chained down. A council sticker: NOT DRINKING WATER."},{id:"tree91arch",era:2,at:[Fn.x,1.8,Fn.z],stand:[Fn.x+1.8,0,Fn.z+.5],label:"Look at the pear tree",inspectionId:"tree-1991",size:.7,when:Os(2)},{id:"tree91stair",era:2,at:[Eo.x+.5,.6,Eo.z+.3],stand:[2.1,0,4.7],label:"Look at the pear tree and the bottom steps",inspectionId:"tree-1991",size:.7,when:Sr(2)},{id:"stair91",era:2,at:[2.4,1.3,6.55],stand:[.9,0,5.2],label:"Read the notice at the foot of the stair",size:.25,glance:()=>"Aldermoor Council. Notice of proposed gate to the public stair, Chandler's Court. Objections by 30 April 1991."},{id:"umbrella91",era:2,at:[-3,1.5,3.8],label:"Talk to the man with the umbrella",figures:["umbrella"],aside:`"Only cutting through, love. Don't tell Mr Pell."`},{id:"teen91",era:2,at:[-6.5,1.5,7.35],label:"Talk to the lad with the headphones",figures:["teen"],aside:`He lifts one side of his headphones. "Mr Pell's in the Long Room, if it's about the flats."`},{id:"petition91",era:2,at:[io.x,io.y,io.z],stand:[11.9,0,-.6],label:"Read Winnie's petition beside the gate plans",inspectionId:"petition-1991",size:.3,reach:2.4},{id:"bellnote91",era:2,at:[$n.x,1.5,3.9],stand:[14,0,2.2],label:"Read the repair note above the old bell",inspectionId:"bell-repair-1991",size:.3},{id:"bell91",era:2,at:[$n.x+.1,.45,$n.z+.2],stand:[15,0,1.75],label:"Look at the old bell on its sacking",inspectionId:"bell-longroom-1991",size:.45},{id:"consign91",era:2,at:[$n.x-.44,.5,$n.z-.12],stand:[13.8,0,2.5],label:"Read the label on the old bell",inspectionId:"bell-consignment-1991",size:.3},{id:"anchor91",era:2,at:[Bn.x+.7,Bn.y,Bn.z],stand:[8.9,0,-1],label:"Turn the key in the Long Room door",travel:!0,reach:2.6,size:.6},{id:"maya2026stall",era:3,at:[yf.x,1.5,yf.z],stand:[-.2,0,-6.9],label:"Talk to Maya",talk:"maya2026",reach:3.6,figures:["maya"],when:n=>!Ri(n)},{id:"maya2026cafe",era:3,at:[Sh.x,1.5,Sh.z],stand:[4.5,0,-4.7],label:"Talk to Maya",talk:"maya2026",reach:3.6,figures:["maya"],when:Ri},{id:"front2026cafe",era:3,at:[4,1.5,-7.95],stand:[3.9,0,-5.9],label:"Look at Maya's café",inspectionId:"workshop-2026",size:.9,when:Ri},{id:"front2026garages",era:3,at:[4,1.5,-7.95],stand:[3.9,0,-5.9],label:"Look at the old workshop front",inspectionId:"workshop-2026",size:.9,when:n=>!Ri(n)},{id:"notice2026",era:3,at:[Xs.x,Xs.y,Xs.z],stand:[-1.7,0,-5.9],label:"Read today's notice by the arch",inspectionId:"opening-notice-2026",size:.35},{id:"stair2026",era:3,at:[2.4,1.1,7.3],stand:[.6,0,5.2],label:"Look at the foot of the stair",inspectionId:"stair-2026",size:.6},{id:"tree2026arch",era:3,at:[Fn.x+.6,2.4,Fn.z-.3],stand:[Fn.x+1.8,0,Fn.z+.5],label:"Look at the pear tree",inspectionId:"tree-2026",size:.8,when:Os(3)},{id:"tree2026stair",era:3,at:[Eo.x+.5,.6,Eo.z+.3],stand:[2.1,0,4.7],label:"Look at the pear tree and the bottom steps",inspectionId:"tree-2026",size:.7,when:Sr(3)},{id:"bracketyard2026",era:3,at:[0,5.1,-7.35],stand:[.7,0,-4.4],label:"Look up at the bell bracket",inspectionId:"bell-bracket-yard-2026",size:.4,reach:5.2,when:n=>!n.e2026.treeOccludesBracket},{id:"rope2026",era:3,at:[bt.x,1.6,bt.z+.1],stand:[1.2,0,-6.2],label:"Look at the pier beside the arch",size:.3,glance:n=>n.e2026.bellLocation==="bracket"?"A new rope runs down the pier to a bright iron cleat.":"The pulley over the arch is bare. The old cleat has been painted over with the pier."},{id:"plaque2026",era:3,at:[Gn.x,1.55,Gn.z],stand:[2.8,0,-6],label:"Look at the brass plate",inspectionId:"plaque-2026",size:.25,when:n=>n.e2026.plaqueDedication!=="none"},{id:"plaquewall2026",era:3,at:[Gn.x,1.55,Gn.z],stand:[2.8,0,-6],label:"Look at the wall beside the rope",inspectionId:"plaque-2026",size:.25,when:n=>n.e2026.plaqueDedication==="none"},{id:"pump2026",era:3,at:[Jt.x,1.1,Jt.z],stand:[Jt.x+1.2,0,Jt.z+.6],label:"Look at the pump",size:.4,glance:()=>"The old pump, painted green, with herbs growing in the trough. A card asks you not to lock bikes to it."},{id:"customer2026",era:3,at:[ai[3].customer.x,1,ai[3].customer.z],label:"Talk to the man with the coffee",figures:["customer"],when:Ri,aside:`"First morning, and she's already out of the almond croissants."`},{id:"neighbour2026",era:3,at:[ai[3].neighbour.x,1.5,ai[3].neighbour.z],label:"Talk to the woman with the bike",figures:["neighbour"],when:n=>!Ri(n),aside:'"Slow puncture. Maya says ten minutes, which means twenty."'},{id:"listener2026",era:3,at:[ai[3].listener.x,1.5,ai[3].listener.z],label:"Talk to the woman looking up at the bell",figures:["listener"],when:n=>n.e2026.bellOccasion!=="silent",aside:`"I've lived here eleven years and never heard it. It's louder than you'd think."`},{id:"cyclist2026",era:3,at:[-5.6,1.5,.2],label:"Talk to the man wheeling a bike",figures:["cyclist"],aside:'"Morning! Mind the kid on the scooter, she takes no prisoners."'},{id:"scooter2026",era:3,at:[-1.5,1,5.4],label:"Talk to the girl on the scooter",figures:["scooter"],aside:`"I'm not allowed past the arch. That's the rule."`},{id:"window2026",era:3,at:[li.x,1.15,li.z],stand:[8.1,0,-9.9],label:"Look at the bell in the café window",inspectionId:"bell-window-2026",size:.35,when:n=>Ri(n)&&n.e2026.bellLocation==="cafe-window"},{id:"bookcafe2026",era:3,at:[4.7,1.55,-13.85],stand:[4.8,0,-12.1],label:"Open the green book behind the counter",inspectionId:"book-cafe-2026",read:!0,size:.3,when:n=>Ri(n)&&n.e2026.courtBookLocation==="cafe"},{id:"scorch2026",era:3,at:[6.75,1.8,-13.95],stand:[6.4,0,-12.1],label:"Look at the scorched strip beside the counter",size:.3,when:Ri,glance:()=>'A strip of old timber, still black from the fire, framed in the new plaster. A card beside it: "Kept. 15.xi.58."'},{id:"counter2026",era:3,at:[5.9,1.25,-13.3],stand:[5.6,0,-11.7],label:"Look at the counter",size:.5,when:Ri,glance:()=>"An espresso machine, a till, a jar of biscotti. The counter stands where a workbench stood; its old vice is bolted to the end."},{id:"theo2026",era:3,at:[xf.x,1.5,xf.z],stand:[12.1,0,2.3],label:"Talk to Theo",talk:"theo2026",reach:3.4,figures:["theo"]},{id:"stairfile2026",era:3,at:[12.6,.86,-.3],stand:[11.5,0,-.3],label:"Read the 1991 stair file on the table",inspectionId:"stair-record-2026",size:.3,reach:2},{id:"facsimile2026",era:3,at:[es.x,1.15,es.z],stand:[14.4,0,-3.6],label:"Look at the book in the glass case",inspectionId:"book-copy-2026",read:!0,size:.4,when:n=>n.e2026.courtBookLocation==="library"},{id:"case2026",era:3,at:[es.x,1.15,es.z],stand:[14.4,0,-3.6],label:"Look in the glass case",size:.4,when:n=>n.e2026.courtBookLocation!=="library",glance:()=>"Photographs of the Court under glass: a candle works outing, a coronation tea, the yard under snow. The captions are in Theo's neat hand."},{id:"storebell2026",era:3,at:[ts.x-.05,1.1,ts.z],stand:[13.9,0,5.4],label:"Look at the bell on the storeroom shelf",inspectionId:"bell-storeroom-2026",size:.4,when:n=>n.e2026.bellLocation==="storeroom"},{id:"storeshelf2026",era:3,at:[ts.x-.05,1.1,ts.z],stand:[13.9,0,5.4],label:"Look at the storeroom shelves",size:.4,when:n=>n.e2026.bellLocation!=="storeroom",glance:()=>"Paint tins, a stepladder, boxes of light bulbs, a coil of new rope. Nothing old."},{id:"cupboard2026",era:3,at:[At.x1-.2,1.2,-2.2],stand:[14.2,0,-2.2],label:"Open the old Long Room cupboard",size:.6,glance:()=>"The Pells' old cupboard, empty now but for a box of 1970s rent books and a smell of lamp oil."},{id:"board2026",era:3,at:[12,1.6,At.z0+.12],stand:[12,0,-4],label:"Read the noticeboard",size:.6,glance:()=>`Court notices: "Summer fair, Saturday." "Bikes in the racks please, not on the pump." "Found: one key (not the Long Room's)."`},{id:"bracket2026",era:3,at:[0,5.1,-7.35],stand:[2.75,qo,-7],label:"Look across at the bell bracket",inspectionId:"bell-bracket-2026",size:.4},{id:"winniedoor2026",era:3,at:[5,qo+1.2,-7.85],stand:[5,qo,-6.95],label:"Look at the blue door",size:.4,glance:()=>'A blue door on the gallery, repainted more than once. A small card by the bell push: "W. Hale lived here, 1958–2004."'},{id:"anchor2026",era:3,at:[Bn.x+.7,Bn.y,Bn.z],stand:[8.9,0,-1],label:"Turn the key in the Long Room door",travel:!0,reach:2.6,size:.6}];function H_(n,e){if(n.inspectionId){const s=e(n.inspectionId);if(s)return s}const[t,i,o]=n.stand??n.at;return uo(t,i,o)}const G_=[{evidence:"echo-1991",variantId:"late",reaction:"jonah-admission-1991",label:"the Echo cutting"},{evidence:"echo-1991",variantId:"prompt",reaction:"jonah-on-echo-1991",label:"the Echo cutting"},{evidence:"book-longroom-1991",reaction:"jonah-on-book-1991",label:"the Court Book entry"},{evidence:"book-workshop-1991",reaction:"jonah-on-book-1991",label:"the Court Book entry"},{evidence:"rope-1991",reaction:"jonah-on-rope-1991",label:"the bell rope"},{evidence:"scorch-1991",variantId:"lintel",reaction:"jonah-on-fire-damage-1991",label:"the scorched lintel"},{evidence:"plaque-1991",variantId:"present",reaction:"jonah-on-plaque-1991",label:"the brass plate"},{evidence:"plaque-1991",variantId:"credited",reaction:"jonah-on-plaque-1991",label:"the brass plate"}],V_=[{evidence:"echo-1991",reaction:"winnie-on-echo-1991",label:"the Echo cutting"},{evidence:"book-longroom-1991",reaction:"winnie-on-book-1991",label:"the Court Book entry"},{evidence:"book-workshop-1991",reaction:"winnie-on-book-1991",label:"the Court Book entry"},{evidence:"rope-1991",variantId:"stub",reaction:"winnie-on-rope-1991",label:"the bell rope"},{evidence:"plaque-1991",variantId:"present",reaction:"winnie-on-plaque-1991",label:"the brass plate"},{evidence:"plaque-1991",variantId:"credited",reaction:"winnie-on-plaque-1991",label:"the brass plate"}],W_={"jonah-admission-1991:admission":[{narr:"He reads it for a long time."},{say:"I wasn’t here. I let her tell it her way."}],"jonah-on-book-1991:didnotring":[{narr:"He touches the initials."},{say:"Nobody’s fault. She wrote that the same night. And then she told everyone I rang it."},{narr:"He closes the book carefully."},{say:"Thirty-three years she’s carried that for me."}],"jonah-on-rope-1991:stub":[{say:"Council cut it in ’72. Nobody’d rung it since the fire anyway."}],"jonah-on-fire-damage-1991:lintel":[{say:"Tallow and a bad transformer. The insurers had a word for it. I had a few others."}],"jonah-on-echo-1991:alarm":[{say:"Twelve came. I read that on the late train back from Castle Street. Half the names I’d collected rent from that night had been on her bucket chain."}],"jonah-on-book-1991:rang":[{say:"She didn’t put my name in it. She could have — ‘Jonah was at Castle Street.’ She left it out."},{narr:"He looks up at the gallery."}],"jonah-on-rope-1991:polished":[{say:"One pair of hands. She’s never let anyone else ring it."}],"jonah-on-plaque-1991:paid":[{say:"I paid for that plate. She doesn’t know."}],"jonah-on-plaque-1991:credited":[{narr:"He laughs, once, and shakes his head."},{say:"J.P. She insisted."},{say:"All I did was give her a key. She was the one who stayed."}]},X_={"winnie-on-echo-1991:late":[{narr:"She folds it along its old crease."},{say:"Papers get things wrong."},{narr:"A pause."},{say:"Not that, though."}],"winnie-on-book-1991:didnotring":[{narr:"She reads her own hand for a long time."},{say:"I wrote that the next morning. I’d forgotten I was fair to him."},{say:"Don’t tell him I told it the other way. He knows."}],"winnie-on-rope-1991:stub":[{say:"I used to stand under it and wait for somebody to let me."}],"winnie-on-book-1991:rang":[{say:"Twelve. I counted them twice."}],"winnie-on-plaque-1991:court":[{say:"The Court paid for that. Everyone put in."}],"winnie-on-echo-1991:prompt":[{say:"They spelled Stan’s name wrong. He never minded."}],"winnie-on-plaque-1991:credited":[{say:"He gave me the key. I made them put his initials on it. He pretended to mind."}]},q_=4.6,$_=.5,Y_=6.5,J_=.62,qp=(n=.2)=>Math.min(4,2.9+1.6*n),K_=(n,e=.2)=>Math.atan2(e+.3,Math.max(n,.3))+.22;function Rh(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function _l(n){return Math.hypot(n[0],n[1],n[2])}function $p(n,e){const t=_l(n)*_l(e);return t===0?0:Math.acos(Math.max(-1,Math.min(1,(n[0]*e[0]+n[1]*e[1]+n[2]*e[2])/t)))}function Ih(n,e){const t=$p([n[0],0,n[2]],[e[0],0,e[2]]),i=Math.abs(Math.atan2(n[1],Math.hypot(n[0],n[2]))-Math.atan2(e[1],Math.hypot(e[0],e[2])));return Math.hypot(t,Math.max(0,i-.35)*.6)}function Z_(n,e,t){let i=null,o=1/0,s=!1,r=null,a=1/0,l=1/0,c=1/0,d=null,u=1/0;for(const f of n){const h=Rh(f.at,e),p=_l(h);if(f.character){if(p>Math.max(f.reach??0,q_))continue;const M=Ih(h,t);if(M>$_)continue;const E=p+1.2*M;f.minor?E<u&&(u=E,d=f):E<a&&(a=E,r=f,l=M);continue}if(p>(f.reach??qp(f.size)))continue;const y=$p(h,t),g=K_(p,f.size);if(y>g)continue;const m=p*(.55+.45*y/g);m<o&&(o=m,i=f,s=y/g<.4,c=y)}return!r&&d&&(r=d,l=Ih(Rh(d.at,e),t)),i&&(!r||s&&c<=l+.05)?i:r??i}function j_(n,e,t){return n.filter(i=>{if(!i.character)return!1;const o=Rh(i.at,e);return _l(o)<=Y_&&Ih(o,t)<=J_})}const Q_=(n,e,t)=>`${n} ${n===1?e:t}`,Yp={0:{after:"New Year's Eve 1926",same:"this evening"},1:{after:"March 1958",same:"this March"},2:{after:"April 1991",same:"this April"}};function ew(n,e=1){return`Your notebook entries from after ${Yp[e].after}, in this history: ${n}. ${n?"They describe the history you are in now. After this change they stay in the notebook, marked “former history”, and some may no longer hold.":"Nothing you have noted yet depends on this."} You can undo this afterwards from the notebook.`}function tw(n,e=1){return n?`Your entries from ${Yp[e].same}: ${n}. They will be marked former history too, until you look again.`:""}function nw(n,e){const t=`Nothing recorded in ${n} in either of these histories yet.`;return e?`${t} Your ${Q_(e,"note","notes")} from ${n} in other histories ${e===1?"is":"are"} in the notebook, under former history.`:t}function iw(n){return`E — ${n.charAt(0).toLowerCase()}${n.slice(1)}`}const Br=ti.key,Hr=ti.book,Gr=ti.bell,Bs=ti.tree,Vr=ti.petition,Wr=ti.recast,fo={0:{year:"1926",when:"New Year's Eve · dusk, a hard frost",long:"New Year's Eve 1926, at dusk",note:"New Year's Eve 1926"},1:{year:"1958",when:"March · a winter evening",long:"March 1958, a winter evening",note:"March 1958"},2:{year:"1991",when:"April · a drizzly afternoon",long:"April 1991, a drizzly afternoon",note:"April 1991"},3:{year:"2026",when:"June · a summer morning",long:"this summer morning, 2026 (Maya’s present)",note:"June 2026"}},ow="Why did the bell stop ringing? Nan Winnie always said Jonah rang it the night of the fire. Theo Pell next door says his grandad always swore nobody did.",xe=n=>document.getElementById(n),_e=new R_(Nb,Db,{era:3,zoneId:"courtyard"});let Ze=3,Dt=Il(_e.evaluation),sn;const ve=new Vb,on=new B_(ls);let Bt="title",ei=null,is="courtyard",Lo=!1,ta=!1,Jp=0;const Kp=[];window.addEventListener("error",n=>Kp.push(String(n.message)));const No=xe("view"),Vn=new Lb({canvas:No,antialias:!0,powerPreference:"high-performance"});Vn.setPixelRatio(Math.min(window.devicePixelRatio,1.5));Vn.outputColorSpace=Wn;Vn.toneMapping=Hh;const Xr=new qf,$t=new Yn(68,1,.05,400);function Zp(){Vn.setSize(window.innerWidth,window.innerHeight,!1),$t.aspect=window.innerWidth/window.innerHeight,$t.updateProjectionMatrix()}window.addEventListener("resize",Zp);Zp();function sw(n,e){return hd(n,e)}let jp=0;function kl(){const n=performance.now();sn&&sn.dispose(),Dt=Il(_e.evaluation),sn=Xp(Ze,Dt),yd.clear(),Xr.add(sn.root),Xr.fog=sn.fog,Xr.background=sn.sky,Vn.toneMappingExposure=sn.exposure;const e=Wb(Ze,Dt);ve.setWorld(e.workshopOpen,e.solids,e.tree,e.treeWidth,e.options),fd(),jp=performance.now()-n}function rw(n=ve.x,e=ve.z){return Ze===3&&!Dt.e2026.stairPublic&&e>nt.z0-.1&&n>zt.x0-.05&&n<10.3}function Qp(n){return n==="gallery"?{id:"safe-stair-foot",label:"the foot of the stair",zone:"courtyard",x:1.2,y:0,z:4.6,yaw:-.9,pitch:.05}:Zs(n==="workshop"?"garages":"yard")}function or(){const n=uo(ve.x,ve.y,ve.z);let e=!1;if(!_e.canVisitHere(Ze,n)||rw()){const t=Qp(n==="courtyard"?"gallery":n);ve.place(t.x,t.y,t.z,t.yaw,t.pitch),e=!0}return ve.stuck&&(ve.unstick(),e=!0),e}function Ph(n){const e=[];return(_e.beenTo(0)||n.includes(Gr)||n.includes(Bs))&&(e.push(n.includes(Gr)?"Winnie rings the New Year in":"Amos rings the New Year in"),e.push(n.includes(Bs)?"Pear by the stair":"Pear by the arch")),(_e.beenTo(1)||n.includes(Br)||n.includes(Hr))&&(e.push(n.includes(Br)?"Key with Winnie":"Key with Jonah"),e.push(n.includes(Hr)?"Book in the Long Room cupboard":"Book in Winnie's office")),(_e.beenTo(2)||n.includes(Vr)||n.includes(Wr))&&(e.push(n.includes(Vr)?"Stair petition signed":"No stair petition"),e.push(n.includes(Wr)?"Bell sent to be recast":"Bell kept as it is")),e.join(" · ")||"Not yet explored"}function Nl(){return Ph(_e.choices)+(_e.state.slots.baseline===_e.state.slots.working?" (as you found it)":"")}function fd(){xe("era-year").textContent=fo[Ze].year,xe("era-when").textContent=fo[Ze].when,xe("era-history").textContent=`History: ${Nl()}`}const il=xe("captions");function e0(){il.innerHTML=""}let Lh=[];function Us(n,e){Lh.push(window.setTimeout(e,n))}function pd(){for(const n of Lh)clearTimeout(n);Lh=[]}function ls(n,e=!1){if(!n)return;const t=document.createElement("div");for(t.textContent=n,e&&(t.className="essential"),il.appendChild(t);il.children.length>4;)il.firstChild.remove();setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),1e3)},e?8e3:5500)}let vf=0;function qa(n,e,t=!1){const i=xe("look");i.innerHTML="";const o=document.createElement("span");o.className=`tag${t?" glance":""}`,o.textContent=n;const s=document.createElement("span");s.textContent=e,i.append(o,s),i.classList.add("on"),clearTimeout(vf),vf=window.setTimeout(()=>i.classList.remove("on"),Math.max(5e3,e.length*70))}function t0(n){xe("hint").textContent=n}const gn=new Set,aw=()=>document.activeElement instanceof HTMLTextAreaElement||document.activeElement instanceof HTMLInputElement;window.addEventListener("keydown",n=>{if(aw()){n.key==="Escape"&&document.activeElement.blur();return}const e=n.key.toLowerCase();if(Bt!=="title"){if(Bt==="talk"){/^[1-9]$/.test(e)&&(xe("talk-options").querySelectorAll("button")[Number(e)-1]?.click(),n.preventDefault()),e==="escape"&&Ir?.();return}if(Bt&&["pagedown","pageup","home","end","arrowdown","arrowup"].includes(e)){const t=n0();if(t){const i=t.clientHeight*.85;e==="home"?t.scrollTop=0:e==="end"?t.scrollTop=t.scrollHeight:t.scrollTop+=e==="pagedown"?i:e==="pageup"?-i:e==="arrowdown"?60:-60,n.preventDefault();return}}if(e==="escape"&&Bt){ui(),n.preventDefault();return}if(e==="n"){$s("notebook"),n.preventDefault();return}if(e==="m"){$s("map"),n.preventDefault();return}if(e==="h"||e==="?"){$s("help"),n.preventDefault();return}if(!Bt){if((e==="e"||e==="enter")&&!n.repeat){(document.activeElement===No||document.activeElement===document.body)&&(Ml(),n.preventDefault());return}["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift","q","r","f","pageup","pagedown"].includes(e)&&(gn.add(e),(e.startsWith("arrow")||e.startsWith("page"))&&n.preventDefault())}}});window.addEventListener("keyup",n=>{const e=n.key.toLowerCase();(e==="arrowleft"||e==="arrowright")&&gn.has(e)&&(!Bt||ta||Lo)&&(ve.yaw+=(e==="arrowleft"?1:-1)*zh*Math.min(1,Math.max(0,(performance.now()-Oh)/1e3))),gn.delete(e)});window.addEventListener("blur",()=>gn.clear());function n0(){if(!Bt||Bt==="title"||Bt==="talk")return null;const n=document.getElementById(`panel-${Bt}`);return n?n.querySelector(".scroller")??n:null}window.addEventListener("wheel",n=>{const e=n0();!e||e.contains(n.target)||(e.scrollTop+=n.deltaY*(n.deltaMode===1?32:n.deltaMode===2?e.clientHeight:1),n.preventDefault())},{passive:!1});let Di=null;const md=new Ws,i0=new Ws;document.addEventListener("pointerlockchange",()=>md.reset(2));window.addEventListener("focus",()=>{md.reset(1),i0.reset(1)});No.addEventListener("mousedown",n=>{Bt||(Di={x:n.clientX,y:n.clientY,moved:0},No.focus())});window.addEventListener("mousemove",n=>{if(document.pointerLockElement===No){const o=md.filter(n.movementX,n.movementY);o&&ve.look(o[0]*.0024,o[1]*.0024);return}if(!Di)return;const e=n.clientX-Di.x,t=n.clientY-Di.y;Di.moved+=Math.abs(e)+Math.abs(t),Di.x=n.clientX,Di.y=n.clientY;const i=i0.filter(e,t);i&&ve.look(i[0]*.005,i[1]*.005)});window.addEventListener("mouseup",n=>{if(!Di)return;const e=Di.moved<6;if(Di=null,!e||Bt)return;if(document.pointerLockElement===No){Ml();return}const t=dw(n.clientX,n.clientY);if(t){Ml(t);return}try{No.requestPointerLock?.()}catch{}});function o0(n){return!(n.era!==Ze||n.when&&!n.when(Dt)||n.inspectionId&&!_e.hasInspection(n.inspectionId))}function s0(n){return o0(n)&&_e.canVisitHere(Ze,Dl(n))}function lw(n){return Dl(n)===is}const Io=new F,Ui=new F,Ot=new F;function r0(){const n=[];for(const e of Po){if(!o0(e)||!lw(e))continue;if(!e.figures){n.push({id:e.id,at:e.at,reach:e.reach,size:e.size});continue}const t=!!e.aside&&yd.has(e.id);e.figures.length>1&&n.push({id:e.id,at:e.at,reach:e.reach,character:!0});for(const i of e.figures){const o=sn.figure(i);o&&(o.group.getWorldPosition(Ot),n.push({id:e.id,at:[Ot.x,Ot.y+o.headY-.2,Ot.z],reach:t?2.7:e.reach,character:!t,minor:!!e.aside,figure:t?void 0:i}))}}return n}const gd=n=>Po.find(e=>e.id===n)??null;function cw(n){$t.getWorldDirection(Io);const e=Z_(n,[$t.position.x,$t.position.y,$t.position.z],[Io.x,Io.y,Io.z]);return e?gd(e.id):null}let wl=[];const yd=new Set;function hw(n){$t.getWorldDirection(Io);const e=ei&&!ei.aside,t=j_(n.filter(i=>!(e&&gd(i.id)?.aside)),[$t.position.x,$t.position.y,$t.position.z],[Io.x,Io.y,Io.z]);return[...new Set([...wl,...t.flatMap(i=>i.figure?[i.figure]:[])])]}function dw(n,e){let t=null,i=1/0;for(const o of r0()){if(Ui.set(...o.at),Ui.distanceTo($t.position)>Math.max(o.reach??qp(o.size),o.character?4.6:0)+1.2||(Ui.project($t),Ui.z>1))continue;const s=(Ui.x+1)/2*window.innerWidth,r=(1-Ui.y)/2*window.innerHeight,a=Math.hypot(s-n,r-e);a<(o.character?110:70)&&a<i&&(i=a,t=gd(o.id))}return t}function Ml(n=ei){if(!(!n||Lo||ta||Bt)){if(Jp++,n.travel){fw();return}if(n.talk){_w(n.talk);return}if(n.aside){yd.add(n.id),qa("In passing · not a clue in your notebook",n.aside,!0);return}if(n.glance){qa("A look · not a clue in your notebook",n.glance(Dt),!0);return}if(n.inspectionId){const e=_e.inspect(n.inspectionId);if("error"in e){qa("Nothing to note","There is nothing more to see here just now.",!0);return}const t=e.observation,i=t.kind==="testimony"?"Said":"Seen";if(e.isNew&&on.note(),n.read){uw(t,e.isNew);return}qa(e.isNew?`${i} · noted in Maya's notebook`:`${i} · already in the notebook`,t.text)}}}function uw(n,e){const i=[...n.text.matchAll(/“([^”]+)”/g)].map(c=>c[1]).at(-1)??n.text,o=n.inspectionId==="book-copy-2026";xe("book-h").textContent=o?"The Court Book, a facsimile":"The Court Book",xe("book-where").textContent=o?"Under glass in the Long Room. The original is in the library.":n.era===3?"Behind the counter of Maya’s café.":n.inspectionId==="book-longroom-1991"?"From the Long Room cupboard, April 1991.":"From the shelf in the workshop office, April 1991.";const s=/(\d{1,2} November 1958)/.exec(n.text)?.[1]??"15 November 1958",r=xe("book-page");r.innerHTML="";const a=document.createElement("div");a.className="book-date",a.textContent=s;const l=document.createElement("p");l.className="book-hand",l.textContent=i,r.append(a,l),xe("book-noted-tag").textContent=e?"Seen · noted in Maya’s notebook":"Seen · already in the notebook",xe("book-noted").textContent=n.text,sr("book")}const kh=n=>new Promise(e=>setTimeout(e,n)),Sl=window.matchMedia("(prefers-reduced-motion: reduce)").matches;async function xd(n,e){const t=xe("fade");xe("fade-year").textContent=n?.year??"",xe("fade-when").textContent=n?.when??"",t.classList.toggle("quick",!n),t.classList.add("on"),ta=!0;const i=ve.yaw;try{await kh(Sl?200:n?750:260);const o=Math.atan2(Math.sin(ve.yaw-i),Math.cos(ve.yaw-i)),s=ve.yaw;e(),ve.yaw!==s&&o&&(ve.yaw+=o),await kh(Sl?150:n?650:120)}finally{t.classList.remove("on"),ta=!1}}async function fw(){const n=new go("The Long Room door",[]);n.say(null,"The key turns stiffly in the lock. The door will open onto the same courtyard, in another year.");const e=qs.filter(i=>i!==Ze).map(i=>({id:String(i),label:fo[i].long}));e.push({id:"leave",label:"Not now"});const t=await n.ask(e);n.close(),t!=="leave"&&await vd(Number(t))}async function vd(n){if(!Lo&&n!==Ze){Lo=!0,xe("look").classList.remove("on"),pd(),on.silence(),e0(),on.travel(n);try{await xd(fo[n],()=>{Ze=n,kl(),or(),Mi(),Math.hypot(ve.x-Bn.x,ve.z-Bn.z)<2.5&&(ve.turnGoal=1.25),on.setEra(Ze,{cafe:Ze===3&&Dt.e2026.workshopUse==="cafe"})})}finally{Lo=!1}a0()}}function a0(){if(pd(),Ze===0)Us(1400,()=>on.bell(2,"[The Court bell rings twice: the candle works is letting out early for New Year's Eve]"));else if(Ze===1)Us(1400,()=>on.bell(3,"[The Court bell rings three times, for the end of the day shift]"));else if(Ze===2)Us(1600,()=>ls("[Rain on the cobbles. The bell bracket over the arch is empty.]",!0));else{const n=Dt.e2026;n.bellOccasion==="cafe-opening"?Us(1800,()=>on.bell(4,"[The recast Court bell rings out over the arch: the café is opening]")):n.bellOccasion==="court-reopening"?Us(1800,()=>on.bell(4,"[The recast Court bell rings out over the arch: the Court is reopening, and people gather under it]")):Us(1800,()=>ls("[Chatter and bicycles under the arch. No bell rings.]",!0))}}function Mi(){is=uo(ve.x,ve.y,ve.z);const n=!_e.beenTo(Ze);!_e.move(Ze,is)&&or()&&(is=uo(ve.x,ve.y,ve.z),_e.move(Ze,is)),n&&fd()}function sr(n){ui(!1),Bt=n;const e=xe(`panel-${n}`);e.hidden=!1,document.body.classList.add("panel-open"),document.body.classList.toggle("talking",n==="talk"),document.pointerLockElement&&document.exitPointerLock(),gn.clear(),n==="notebook"&&oa(),n==="map"&&(xw(),e.querySelector(".scroller")?.scrollTo(0,0)),n==="compare"&&(In=Ze,rr()),e.querySelector("[data-close], button")?.focus()}function ui(n=!0){if(!Bt||Bt==="title")return;const e=document.getElementById(`panel-${Bt}`);e&&(e.hidden=!0),Bt=null,document.body.classList.remove("panel-open","talking"),n&&No.focus()}function $s(n){Bt===n?ui():sr(n)}document.querySelectorAll("[data-close]").forEach(n=>n.addEventListener("click",()=>ui()));xe("btn-notebook").addEventListener("click",()=>$s("notebook"));xe("btn-map").addEventListener("click",()=>$s("map"));xe("btn-help").addEventListener("click",()=>$s("help"));xe("btn-sound").addEventListener("click",()=>{on.setMuted(!on.isMuted),xe("btn-sound").textContent=on.isMuted?"Sound off":"Sound on",xe("btn-sound").setAttribute("aria-pressed",String(!on.isMuted))});function pw(n){const e=document.createElement("li"),t=n.observation;n.status==="former-history"&&e.classList.add("former");const i=document.createElement("div");i.className="meta";const o=(r,a="")=>{const l=document.createElement("span");l.textContent=r,a&&(l.className=a),i.appendChild(l)};if(o(fo[t.era]?.note??String(t.era)),t.kind!=="player-note"){const r=_e.inspection(t.inspectionId);t.kind==="testimony"?o(Pl[t.sourceId]??"Someone","who"):o(Ll(t.subjectId,t.era),"who"),t.kind==="document"&&o("read"),r&&o(wh[r.zoneId]??r.zoneId)}else o("your note");if(n.status==="former-history"){const r=document.createElement("span");r.className="former-tag",r.textContent="former history",r.title="Recorded in a history you have since changed. Look again to see what is true now.",i.appendChild(r)}const s=document.createElement("div");return s.className="text",s.textContent=t.text,e.append(i,s),e}function oa(){xe("nb-maya").innerHTML="";const n=document.createElement("span");n.textContent=`“${ow}”`;const e=document.createElement("cite");e.textContent="— Maya Sołtys-Hale, first page";const t=document.createElement("span");t.className="ps",t.textContent="The key is for the Long Room. Red door, east side of the yard. When you think you know, come and tell me. I’m here, this morning.",xe("nb-maya").append(n,t,e),xe("nb-current").textContent=Nl(),xe("nb-undo").disabled=!_e.canUndo,xe("nb-redo").disabled=!_e.canRedo,xe("nb-compare").disabled=!_e.comparisonTarget("previous")&&!_e.comparisonTarget("original"),mw();const i=_e.notebook(),o={seen:[],said:[],inferred:[]};for(const r of i)o[r.observation.kind==="player-note"?"inferred":r.observation.kind==="testimony"?"said":"seen"].push(r);const s={seen:"Nothing yet. Walk up to things and press E.",said:"Nobody has told you anything yet.",inferred:"Your own conclusions go here."};for(const[r,a]of Object.entries(o)){const l=xe(`nb-${r}`);if(l.innerHTML="",a.sort((c,d)=>c.status===d.status?0:c.status==="current"?-1:1),!a.length){const c=document.createElement("li");c.className="empty",c.textContent=s[r],l.appendChild(c)}for(const c of a)l.appendChild(pw(c))}}function bf(n,e=!1){const t=document.createElement("div");t.className=`told-account${e?" compact":""}`;for(const i of n.parts)if(i.kind==="maya"){const o=document.createElement("p");o.className="maya-line",o.textContent=i.text,t.appendChild(o)}else{const o=document.createElement("blockquote"),s=document.createElement("p");s.textContent=i.text;const r=document.createElement("footer");r.textContent=i.cite,o.append(s,r),t.appendChild(o)}return t}function mw(){const n=xe("nb-told");n.innerHTML="";const e=document.createElement("h3");e.id="nb-told-h",e.textContent="What you told Maya",n.appendChild(e);const t=_e.chosenAccounts(),i=t.find(s=>s.status==="current");if(i){const s=document.createElement("div");s.className="told-title",s.textContent=i.text.title;const r=document.createElement("span");r.className="told-note",r.textContent="your reading, in this history",s.appendChild(r),n.append(s,bf(i.text))}else{const s=document.createElement("p");s.className="told-none",s.textContent=Ze===3?"Nothing yet, in this history. When you think you know, tell Maya: she is in the courtyard.":"Nothing yet, in this history. When you think you know, go back to 2026 and tell Maya.",n.appendChild(s)}const o=t.filter(s=>s.status==="former-history");if(o.length){const s=document.createElement("details");s.className="told-former";const r=document.createElement("summary");r.textContent=`In other histories (${o.length})`,s.appendChild(r);for(const[a,l]of o.entries()){const c=document.createElement("div");c.className="told-title",c.textContent=l.text.title;const d=document.createElement("span");d.className="former-tag",d.textContent="former history",c.appendChild(d);const u=document.createElement("div");u.className="told-history",u.textContent=`Earlier history ${a+1}`,s.append(c,u,bf(l.text,!0))}n.appendChild(s)}}xe("nb-undo").addEventListener("click",()=>{bd(()=>_e.undo(),"Undone. You are back in the history you changed."),oa()});xe("nb-redo").addEventListener("click",()=>{bd(()=>_e.redo(),"Redone."),oa()});xe("nb-compare").addEventListener("click",()=>sr("compare"));xe("nb-note-form").addEventListener("submit",n=>{n.preventDefault();const e=xe("nb-note");_e.addNote(e.value)&&(e.value="",oa())});xe("nb-save").addEventListener("click",()=>{const n=_e.save();if(!n){xe("nb-status").textContent="Could not save.";return}try{localStorage.setItem("afterimage-save",n)}catch{}c0("afterimage-save.json",n,"application/json"),xe("nb-status").textContent="Saved (downloaded, and kept in this browser)."});xe("nb-load").addEventListener("click",()=>xe("load-file").click());xe("load-file").addEventListener("change",async n=>{const e=n.target.files?.[0];e&&l0(await e.text())});function l0(n){const e=_e.load(n);if(xe("nb-status").textContent=e?`That save could not be loaded: ${e}`:"Loaded.",!e){pd(),e0(),Ze=_e.position.era,kl();const t=Tp.find(i=>i.zone===_e.position.zoneId)??Zs("yard");ve.place(t.x,t.y,t.z,t.yaw,t.pitch),or(),Mi(),on.setEra(Ze,{cafe:Ze===3&&Dt.e2026.workshopUse==="cafe"}),Bt==="notebook"&&oa()}return e}xe("nb-export").addEventListener("click",()=>{const n=_e.exportNotebook("html");n&&c0("afterimage-notebook.html",n,"text/html"),xe("nb-status").textContent=n?"Notebook exported.":"Could not export."});function c0(n,e,t){const i=document.createElement("a");i.href=URL.createObjectURL(new Blob([e],{type:t})),i.download=n,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),1e3)}function bd(n,e){return n()?(h0(),ls(e,!0),!0):!1}function h0(){const n=Ze===3&&Dt.e2026.workshopUse==="cafe";kl();const e=_e.position;if(e.zoneId!==uo(ve.x,ve.y,ve.z)){const t=e.zoneId==="courtyard"?Qp(uo(ve.x,ve.y,ve.z)):Zs(e.zoneId);ve.place(t.x,t.y,t.z,t.yaw,t.pitch)}or(),Mi(),Ze===3&&n!==(Dt.e2026.workshopUse==="cafe")&&on.setEra(3,{cafe:!n})}let In=3,Ro="previous";const Nh={previous:{head:"Before your last change",undo:"Undo: return to before",done:"Undone. You are back in the history as it was before."},original:{head:"As you found it",undo:"Return to the history as you found it",done:"You are back in the history as you found it."}},Tr=new Map;function gw(n,e,t){const i=`${n}|${e}|${t.id}`,o=Tr.get(i);if(o)return o;const s=Il(_e.history(n)),r=Xp(e,s),a=new qf;a.add(r.root),a.fog=r.fog,a.background=r.sky;const l=new Yn(68,16/9,.05,400);l.position.set(t.x,t.y+ko,t.z),l.rotation.set(t.pitch,t.yaw,0,"YXZ"),r.update(.016,3,l.position);const c=480,d=270,u=Vn.toneMappingExposure;Vn.toneMappingExposure=r.exposure;const f=Vn.getSize(new Ce);Vn.setSize(c,d,!1),Vn.render(a,l);const h=document.createElement("canvas");h.width=c,h.height=d,h.getContext("2d").drawImage(Vn.domElement,0,0,c,d),Vn.setSize(f.x,f.y,!1),Vn.toneMappingExposure=u,r.dispose();const p=h.toDataURL("image/jpeg",.85);return Tr.size>24&&Tr.delete(Tr.keys().next().value),Tr.set(i,p),p}const yw={0:["arch","yard","stair","workshop","longroom"],1:["arch","yard","stair","workshop","longroom"],2:["arch","garages","yard","stair","gallery","longroom"],3:["arch","garages","yard","stair","gallery","longroom","workshop"]};async function rr(){if(!_e.compareWith(Ro)){const r=Ro==="previous"?"original":"previous";_e.compareWith(r)&&(Ro=r)}const n=_e.comparisonTarget("previous")!==null&&_e.comparisonTarget("previous")===_e.comparisonTarget("original");for(const r of["previous","original"]){const a=xe(`cmp-vs-${r}`);a.disabled=!_e.comparisonTarget(r),a.setAttribute("aria-checked",String(Ro===r))}xe("cmp-vs-same").textContent=n?"Your last change was your first: these are the same history.":"",xe("cmp-before-label").textContent=Nh[Ro].head,xe("cmp-undo").textContent=Nh[Ro].undo;const e=_e.comparisonEvaluation,t=_e.evaluation,i=r=>{xe(`cmp-tab-${r}`).setAttribute("aria-selected",String(In===r))};if(i(0),i(1),i(2),i(3),xe("cmp-views").innerHTML="",xe("cmp-rows").innerHTML="",!e||e.historyId===t.historyId){xe("cmp-before").textContent="—",xe("cmp-after").textContent=Nl(),xe("cmp-rows").textContent="There is no other history to compare yet. Change something in 1926, 1958 or 1991 first.";return}xe("cmp-before").textContent=Ph(e.choices)+(e.historyId===_e.state.slots.baseline?" (as you found it)":""),xe("cmp-after").textContent=Ph(t.choices);for(const r of yw[In]){const a=Zs(r),l=_e.visited(e.historyId,In,a.zone),c=_e.visited(t.historyId,In,a.zone);if(!l&&!c)continue;const d=document.createElement("div");d.className="cmp-view";const u=document.createElement("h4");u.textContent=a.label,d.appendChild(u);const f=document.createElement("div");f.className="cmp-pair";for(const[h,p,y]of[[e.historyId,l,"Before"],[t.historyId,c,"Now"]]){const g=document.createElement("figure"),m=document.createElement("figcaption");m.textContent=y;const M=!nl(_e.history(h),{era:In,zoneId:a.zone});if(p&&!M){const E=document.createElement("img");E.alt=`${a.label}, ${fo[In].year}, ${y.toLowerCase()}`,E.src=gw(h,In,a),g.append(E,m)}else{const E=document.createElement("div");E.className="unseen",E.textContent="Not seen in this history yet.",g.append(E,m)}f.appendChild(g)}d.appendChild(f),xe("cmp-views").appendChild(d),await kh(0)}const o=_e.compare(In);if(!o.length){const r=document.createElement("p");r.className="cmp-empty",r.textContent=nw(fo[In].year,_e.notesElsewhere(In,[e.historyId,t.historyId])),xe("cmp-rows").appendChild(r)}const s={"same-observations":"the same","changed-observations":"different","uninspected-before":"not looked at before","uninspected-after":"not looked at since the change"};for(const r of o){const a=document.createElement("div");a.className="cmp-row";const l=document.createElement("h4");l.textContent=Ll(r.subjectId,In);const c=document.createElement("span");c.className="st",c.textContent=`· ${s[r.status]}`,l.appendChild(c),a.appendChild(l);for(const d of[r.before,r.after]){const u=document.createElement("p");d.length?u.textContent=d.map(f=>(f.kind==="testimony"?`${Pl[f.sourceId]??""}: `:"")+f.text).join(" / "):(u.className="none",u.textContent="Not recorded in this history."),a.appendChild(u)}xe("cmp-rows").appendChild(a)}}xe("cmp-tab-0").addEventListener("click",()=>{In=0,rr()});xe("cmp-tab-1").addEventListener("click",()=>{In=1,rr()});xe("cmp-tab-2").addEventListener("click",()=>{In=2,rr()});xe("cmp-tab-3").addEventListener("click",()=>{In=3,rr()});xe("cmp-keep").addEventListener("click",()=>{_e.keep(),ls("You keep this history.",!0),ui(),fd()});xe("cmp-undo").addEventListener("click",()=>{const n=_e.comparisonEvaluation;n&&bd(()=>_e.returnTo(n.historyId),Nh[Ro].done),ui()});for(const n of["previous","original"])xe(`cmp-vs-${n}`).addEventListener("click",()=>{Ro=n,rr()});function xw(){const i=_=>(_+12)*18,o=_=>(_+21)*18,s=(_,R,A,N,b,C="")=>`<rect x="${i(_)}" y="${o(R)}" width="${(A-_)*18}" height="${(N-R)*18}" fill="${b}" ${C}/>`,r=(_,R,A,N=11)=>`<text x="${i(_)}" y="${o(R)}" font-size="${N}" text-anchor="middle" font-family="Georgia" fill="#3a3024">${A}</text>`,a=sw(Ze,Dt),l=_e.canVisitHere(Ze,"gallery"),c=nr[ia(Ze,Dt)],d=ve.yaw,u=i(ve.x),f=o(ve.z),h=Po.filter(_=>s0(_)&&!_.travel&&!(_.aside&&!_.stand)),p=h.map(_=>`<circle cx="${i(_.at[0])}" cy="${o(_.at[2])}" r="3.5" fill="${_.figures?"#9a3b26":"#2f5d45"}" opacity="0.8"><title>${_.label.replace(/[<&"]/g,"")}</title></circle>`).join(""),y=a?Ze===0?"candle works":Ze===1?"workshop":Ze===2?"co-op":"café":"garages",g=`<svg viewBox="0 0 540 558" role="img" aria-label="Plan of Chandler's Court. You are marked in red.">
    ${s(-12,-21,18,-12.2,"#d8ccb0")}${r(3,-16.5,"Chandler Street")}
    ${s(-11,-14,Ii.x0,13,"#b89a82")}${s(Ii.x1,-14,18,13,"#b89a82")}${s(-11,-14,18,Ii.z0,"#b89a82")}${s(-11,Ii.z1,18,13,"#b89a82")}
    ${s(Ii.x0,Ii.z0,Ii.x1,Ii.z1,"#e9dfc6")}
    ${s(-1.6,-12.2,1.6,Ii.z0,"#e9dfc6")}${r(0,-9,"arch",10)}
    ${s(We.x0,We.z0,We.x1,We.z1,a?"#e3cfa8":"#9a8a78",'stroke="#6a5a40"')}${r(5.5,-11,y)}
    ${a?s(Ve.x0,Ve.z0,Ve.x1,Ve.z1,"#dcc49a",'stroke="#6a5a40"')+r(8.5,-12.3,Ze===3?"back room":"office",9):""}
    ${s(At.x0,At.z0,At.x1,At.z1,"#e3cfa8",'stroke="#6a5a40"')}${r(13,-.5,"Long Room")}
    ${Ze===3?s(hn.x0,hn.z0,hn.x1,hn.z1,"#dcc49a",'stroke="#6a5a40"')+r(13.4,5.8,"store",9):""}
    ${s(nt.x0,nt.z0,10,nt.z1,"#cfc2a4",'stroke="#6a5a40"')}${r(5.5,7.6,l?"stair":"stair (gated)",9)}
    ${Ze===3&&!l?`<rect x="${i(zt.x0-.1)}" y="${o(zt.z0)}" width="${.35*18}" height="${(zt.z1-zt.z0)*18}" fill="#23211f"/>`:""}
    ${s(Wt.x0,Wt.z0,Wt.x1,Wt.z1,"none",'stroke="#7a6a50" stroke-dasharray="4 3"')}${s(qn.x0,qn.z0,qn.x1,qn.z1,"none",'stroke="#7a6a50" stroke-dasharray="4 3"')}${r(5.5,-6.9,"gallery (above)",9)}
    <circle cx="${i(Jt.x)}" cy="${o(Jt.z)}" r="5" fill="#3a3a38"/>${r(Jt.x,Jt.z+1.1,"pump",9)}
    <circle cx="${i(c.x)}" cy="${o(c.z)}" r="${Ze===0?4:9}" fill="${Ze===2?"#e8c8d4":Ze===3?"#6f9a4a":"#6a5a48"}"/>${r(c.x,c.z+(c.z>5?-1:1.4),Ze===0?"new pear tree":"pear tree",9)}
    <rect x="${i(9.6)}" y="${o(-1.7)}" width="${.8*18}" height="${1.4*18}" fill="#9a3b26"/>${r(12.3,-2.1,"key door",9)}
    ${p}
    <g transform="translate(${u},${f}) rotate(${-d*180/Math.PI})"><path d="M0,-10 L6,6 L0,2 L-6,6 Z" fill="#c0281c" stroke="#fff" stroke-width="1.5"/></g>
  </svg>`;xe("map-plan").innerHTML=g;const m=xe("map-places");m.innerHTML="";for(const _ of["courtyard","workshop","longroom","gallery"]){if(!_e.canVisitHere(Ze,_))continue;const R=Fb[_],A=document.createElement("button");A.dataset.zone=_,A.textContent=_==="workshop"&&Ze===3?"Maya's café":wh[_];const N=document.createElement("span");N.className="era-note",N.textContent=R.label,A.appendChild(N),A.addEventListener("click",()=>{ui(),vw(R.x,R.y,R.z,R.yaw,R.pitch)}),m.appendChild(A)}if(Ze===3&&!l){const _=document.createElement("p");_.className="map-note",_.textContent="The gallery: the stair is gated (residents only).",m.appendChild(_)}const M=xe("map-things");M.innerHTML="";for(const _ of["courtyard","workshop","longroom","gallery"]){const R=h.filter(b=>Dl(b)===_&&b.stand);if(!R.length)continue;const A=document.createElement("div");A.className="thing-group";const N=document.createElement("b");N.textContent=_==="workshop"&&Ze===3?"Maya's café":wh[_],A.appendChild(N);for(const b of R){const C=document.createElement("button");C.className=`thing${b.figures?" person":""}`,C.dataset.thing=b.id,C.textContent=b.label.replace(/^(Look at|Look into|Look through|Look up at|Look across at|Look in|Read|Open|Take down|Take|Talk to|Say hello to) /,"").replace(/^./,S=>S.toUpperCase()),C.addEventListener("click",()=>{ui(),Dh(b)}),A.appendChild(C)}M.appendChild(A)}const E=xe("map-travel");E.innerHTML="";for(const _ of qs.filter(R=>R!==Ze)){const R=document.createElement("button");R.dataset.era=String(_),R.textContent=`Go to the Long Room door and turn the key to ${fo[_].long}`,R.addEventListener("click",()=>{ui(),Dh(Po.find(A=>A.travel&&A.era===Ze),_)}),E.appendChild(R)}}function Dl(n){return H_(n,e=>_e.inspection(e)?.zoneId)}async function vw(n,e,t,i,o=0){await xd(null,()=>{ve.place(n,e,t,i,o),or(),Mi()})}function bw(n){const e=n.figures?.length===1?n.figures[0]:null,t=e?sn.figure(e):null;return t?(t.group.getWorldPosition(Ot),[Ot.x,Ot.y+t.headY-.1,Ot.z]):n.at}async function Dh(n,e){const[t,i,o]=n.stand,[s,r,a]=bw(n),l=(M,E,_)=>({yaw:Math.atan2(-(s-M),-(a-_)),pitch:Math.atan2(r-(E+ko),Math.hypot(s-M,a-_))}),c=t-s,d=o-a,u=Math.hypot(c,d)||1;let f=t+c/u*1,h=o+d/u*1;const p=(M,E)=>ve.canStand(M,E,i)&&uo(M,i,E)===uo(t,i,o);let y=!n.travel;for(let M=0;M<=1&&y;M+=.1)y=p(f+(t-f)*M,h+(o-h)*M);y||(f=t,h=o);const g=l(f,i,h),m=l(t,i,o);if(await xd(null,()=>{ve.place(f,i,h,g.yaw,g.pitch),or(),Mi(),(f!==t||h!==o)&&(ve.approach(t,o),ve.turnGoal=m.yaw,ve.pitchGoal=m.pitch)}),n.travel&&e!==void 0){await vd(e);return}n.travel&&Ml(n)}let Ir=null;function d0(n){const e=n.map(I=>sn.figure(I)).filter(I=>!!I);if(!e.length)return;const t=e.map(I=>(I.group.getWorldPosition(Ot),{x:Ot.x,z:Ot.z,y:Ot.y+I.headY*.67})),i=t.reduce((I,k)=>I+k.x,0)/t.length,o=t.reduce((I,k)=>I+k.z,0)/t.length,s=t.reduce((I,k)=>I+k.y,0)/t.length,r=Math.tan(Vf.degToRad($t.fov/2)),a=r*$t.aspect,l=xe("panel-talk").getBoundingClientRect(),c=window.innerWidth,d=window.innerHeight,u=l.left>c*.4,f=Math.atan(a),p=-(u?Math.atan((2*l.left/c-1)*a):f),y=f,g=(p+y)/2,m=(y-p)*(t.length>1?.55:.8),M=I=>Math.atan2(Math.sin(I),Math.cos(I));let E=i-ve.x,_=o-ve.z;const R=Math.hypot(E,_)||1,A=E/R,N=_/R,b=(I,k)=>{const L=Math.atan2(-(i-I),-(o-k)),Z=t.map(j=>L+M(Math.atan2(-(j.x-I),-(j.z-k))-L));return{mid:L,lo:Math.min(...Z),hi:Math.max(...Z)}};let C=Math.min(Math.max(R,t.length>1?2.6:1.7),3);for(;C<4.5;C+=.2){const I=b(i-A*C,o-N*C);if(I.hi-I.lo<=m)break}let S=ve.x,V=ve.z;Math.abs(C-R)>.15&&(S=i-A*C,V=o-N*C,ve.approach(S,V));const $=b(S,V);ve.turnGoal=($.lo+$.hi)/2-g,E=i-S,_=o-V;const T=u?-.05:Math.min(.6,1-Math.max(0,l.top)/d);ve.pitchGoal=Math.atan2(s-(ve.y+ko),Math.hypot(E,_))-Math.atan(T*r)}class go{constructor(e,t=[]){sr("talk"),wl=t,requestAnimationFrame(()=>d0(t)),xe("talk-h").textContent=e,xe("talk-lines").innerHTML="",xe("talk-options").innerHTML="",xe("talk-preview").hidden=!0}say(e,t,i=""){const o=document.createElement("p");if(e){const a=document.createElement("span");a.className=`who ${e.split(/[ ,]/)[0].toLowerCase()}`,a.textContent=e,o.appendChild(a)}const s=document.createElement("span");if(s.textContent=t,e||(s.className="narr"),o.appendChild(s),i){const a=document.createElement("span");a.className="noted",a.textContent=i,o.appendChild(a)}xe("talk-lines").appendChild(o);const r=xe("talk-lines");for(;r.children.length>7;)r.firstChild.remove();r.scrollTop=r.scrollHeight}clear(){xe("talk-lines").innerHTML=""}ask(e){return new Promise(t=>{const i=xe("talk-options");i.innerHTML="";let o=0;for(const r of e){if(r.off!==void 0){const c=document.createElement("div");c.className="option-off",c.dataset.id=r.id;const d=document.createElement("span");d.className="off-label",d.textContent=r.label;const u=document.createElement("span");u.className="off-why",u.textContent=r.off,c.append(d,u),i.appendChild(c);continue}const a=document.createElement("button");a.dataset.id=r.id;const l=document.createElement("span");if(l.className="n",l.textContent=String(++o),a.append(l,document.createTextNode(r.label)),r.now){const c=document.createElement("span");c.className="now",c.textContent=typeof r.now=="string"?`· ${r.now}`:"· as it stands",a.appendChild(c)}if(r.sub){const c=document.createElement("span");c.className="sub",c.textContent=r.sub,a.appendChild(c)}a.addEventListener("click",()=>{Ir=null,t(r.id)}),i.appendChild(a)}Ir=()=>{Ir=null,t("leave")},i.querySelector("button")?.focus();const s=xe("talk-lines");s.scrollTop=s.scrollHeight,requestAnimationFrame(()=>{s.scrollTop=s.scrollHeight})})}preview(e,t,i){const o=_e.wouldStale(e,t),s=xe("talk-preview");s.innerHTML="",s.hidden=!1,xe("panel-talk").classList.add("previewing");const r=document.createElement("h3");r.textContent="Before you decide",s.appendChild(r);const a=o.filter(f=>f.era>i),l=o.filter(f=>f.era===i),c=o.filter(f=>f.era<i),d=document.createElement("p");d.className="preview-line",d.textContent=ew(a.length,i),s.appendChild(d);const u=tw(l.length+c.length,i);if(u){const f=document.createElement("p");f.className="preview-same",f.textContent=u,s.appendChild(f)}if(o.length){const f=document.createElement("details");f.className="preview-which";const h=document.createElement("summary");h.textContent="show which",f.appendChild(h);const p=document.createElement("ul");for(const y of[...a,...l,...c]){const g=document.createElement("li");g.textContent=`${fo[y.era].year} · ${y.kind==="testimony"?Pl[y.sourceId]??"Testimony":Ll(y.subjectId,y.era)}`,p.appendChild(g)}f.appendChild(p),s.appendChild(f)}return this.ask([{id:"yes",label:"Do it"},{id:"no",label:"Not yet"}]).then(f=>(s.hidden=!0,xe("panel-talk").classList.remove("previewing"),f==="yes"))}close(){Ir=null,wl=[],Bt==="talk"&&ui()}}function Do(n,e){_e.setChoice(n,e)&&(h0(),ls('History changed. Anything you noted before is kept, marked "former history".',!0))}async function _w(n){if(n==="bell1926")return ww();if(n==="ida1926")return Mw();if(n==="pair1958")return Sw();if(n==="winnie1991")return Tw();if(n==="jonah1991")return Ew();if(n==="stan1991")return Lw();if(n==="maya2026")return _d();if(n==="theo2026")return Pw()}const cs=n=>n?"· noted under Said":"";function yn(n,e,t){if(!_e.hasInspection(t))return!1;const i=_e.inspect(t);return"error"in i?!1:(n.say(e,i.observation.text,cs(i.isNew)),i.isNew&&on.note(),!0)}let _f=!1,wf=!1;async function ww(){const n=new go("Under the arch, New Year's Eve 1926",["amos","winnie","jonah"]);for(_f?n.say("Amos Pell","Still about? It's no night for standing still."):(n.say(null,"Amos Pell, the bell-keeper, under the arch in his good coat. His boy Jonah, six, holds on to it. Winnie Hale, eight, stands a little apart below the rope, looking up at the bell."),n.say("Amos Pell","Mind the ice. The works is out early, it being the last night of the year."),_f=!0);await n.ask([{id:"bell",label:"Who rings the New Year in, at midnight?"},{id:"leave",label:"Leave them to it"}])!=="leave";){n.clear();const t=_e.has(Gr);t?(n.say(null,"The rope hangs down within her reach now. Amos has chalked a cross on the cobbles where she is to stand."),yn(n,"Amos Pell","amos-1926"),yn(n,"Winnie, 8","winnie-1926")):(n.say("Amos Pell","I do. Twelve pulls at midnight, same as every year I've had the keeping of it."),yn(n,"Amos Pell","amos-1926"),n.say(null,"Winnie's father, Tom Hale, rang the bell for the works. He died last year."),yn(n,"Winnie, 8","winnie-1926"),yn(n,"Jonah, 6","jonah-1926"));const i=await n.ask([{id:"amos",label:"Ring it yourself, Amos. It's your office.",now:!t},{id:"winnie",label:"Let Winnie ring it at midnight. It was her father’s bell.",now:t},{id:"back",label:"Say nothing yet"}]);if(i==="leave")break;if(i==="back")continue;const o=i==="winnie";if(o===t){n.say(null,"That is how it already stands.");continue}await n.preview(Gr,o,0)&&(Do(Gr,o),n.clear(),o?(n.say(null,"Amos looks at the girl for a long moment. Then he unhooks the coil from the high cleat and lets the rope down to her height."),yn(n,"Amos Pell","amos-1926"),yn(n,"Jonah, 6","jonah-1926"),yn(n,"Winnie, 8","winnie-1926")):(n.say(null,"Amos coils the rope back up onto the high cleat, out of reach."),n.say("Amos Pell","Midnight, then. Same as always."),n.say(null,"Winnie looks at her boots.")))}n.close()}async function Mw(){const n=new go("The new pear tree, New Year's Eve 1926",["ida"]),e=()=>_e.has(Bs)?"by the foot of the stair":"by the arch";for(wf?n.say(null,`Ida is treading the earth in round the sapling, ${e()}.`):(n.say(null,`Ida Hale, in black under her candle-maker's apron, holds a bare-root pear upright in a fresh hole ${e()}. A spade stands in the heap of frozen earth.`),wf=!0),yn(n,"Ida Hale","ida-1926");await n.ask([{id:"tree",label:"Where should the tree go?"},{id:"leave",label:"Leave her to it"}])!=="leave";){n.clear();const i=_e.has(Bs);n.say("Amos Pell","(calling across the yard) I've seen what a pear does to brickwork, Ida. Give it thirty years and that pier's in the street."),n.say("Ida Hale","Tom rang the works bell from under that arch. Twenty years he rang it."),n.say("Amos Pell","Then put it where folk'll sit under it. By the stair."),n.say("Ida Hale","He did sit there. Every evening on the bottom step, when his shift was done.");const o=await n.ask([{id:"arch",label:"By the arch, where he rang the bell.",now:!i},{id:"stair",label:"By the stair, where he sat.",now:i},{id:"back",label:"Say nothing yet"}]);if(o==="leave")break;if(o==="back")continue;const s=o==="stair";if(s===i){n.say(null,"That is how it already stands.");continue}await n.preview(Bs,s,0)&&(Do(Bs,s),n.clear(),n.say(null,s?"Ida lifts the sapling out, roots and all, and carries it across the yard. Amos brings the spade, and digs the new hole himself.":"Ida carries the sapling back to the arch and sets it in the first hole. Amos says nothing, and hands her the spade."),requestAnimationFrame(()=>d0(["ida"])),yn(n,"Ida Hale","ida-1926"))}n.close()}let Mf=!1;async function Sw(){const n=new go("The co-op doorway, March 1958",["jonah","winnie"]);for(Mf?n.say("Winnie, 40","Back again?"):(n.say(null,"Jonah Pell, rent book under his arm, and Winnie Hale in the light from the co-op door. Both of them are looking up at the bell."),n.say("Jonah, 38","Evening. You'll be the one with the Long Room key."),n.say("Winnie, 40","Then you can settle something for us."),Mf=!0);;){const e=await n.ask([{id:"key",label:"The bell-rope key"},{id:"book",label:"Where the Court Book should live"},{id:"leave",label:"Leave them to it"}]);if(e==="leave")break;if(n.clear(),e==="key"){const t=Dt.e1958.childhoodBellShared;n.say("Jonah, 38","My father kept this key thirty years. His father before him."),n.say("Jonah, 38","One false ring and the whole Court's in the yard in its nightclothes. Dad never forgot the night that happened."),n.say("Winnie, 40","And you're at Castle Street three nights a week, collecting for the Mercers."),n.say("Winnie, 40","I'm at my bench under that bell till all hours. If something happens at night, who's here to ring it?"),t?(n.say("Winnie, 40","I've rung it before, Jonah. Your dad let me, New Year's Eve, 'twenty-six. You showed me where to put my hands."),n.say(null,"Jonah almost smiles."),n.say("Jonah, 38","You hung off it like washing.")):(n.say(null,"Jonah looks at the rope-box, not at her."),n.say("Jonah, 38","Dad never let anyone but a Pell touch it. Not even you."));const i=_e.has(Br),o=await n.ask([{id:"jonah",label:"Keep it, Jonah. It's your family's.",now:!i},{id:"winnie",label:t?"Leave it with Winnie. She's rung it before; your dad let her.":"Leave it with Winnie. She's here at night.",now:i},{id:"back",label:"Say nothing yet"}]);if(o==="leave")break;if(o==="back")continue;const s=o==="winnie";if(s===i){n.say(null,"That is how it already stands.");continue}if(!await n.preview(Br,s,1))continue;Do(Br,s),n.clear(),s&&t?(n.say(null,"Jonah works the key off his ring. It doesn't take him long."),n.say("Jonah, 38","Dad let you once. I suppose that makes it twice."),n.say("Winnie, 40","I won't ring it for nothing, Jonah."),n.say("Jonah, 38","I know. You never did.")):s?(n.say(null,"Jonah works the key off his ring, slowly."),n.say("Jonah, 38","Fine. On the nail inside your door, then."),n.say("Winnie, 40","I won't ring it for nothing, Jonah."),n.say("Jonah, 38","I know you won't. That's not what I mind.")):(n.say("Winnie, 40","Suit yourselves."),n.say("Jonah, 38","It stays with the Pells. I'll not be far."))}else{n.say("Winnie, 40","I write in it every day. Rents, repairs, who's poorly, who's wed."),n.say("Jonah, 38","It's the Court's record, Win, not the co-op's. Court papers go in the Long Room cupboard. Always have."),n.say("Winnie, 40","Under your lock. So I come knocking every time a pipe bursts."),n.say("Jonah, 38","Under a lock nobody can lose. Your office is all solder and paraffin.");const t=_e.has(Hr),i=await n.ask([{id:"office",label:"Winnie keeps it in her office.",now:!t},{id:"cupboard",label:"Put it in the Long Room cupboard.",now:t},{id:"back",label:"Say nothing yet"}]);if(i==="leave")break;if(i==="back")continue;const o=i==="cupboard";if(o===t){n.say(null,"That is how it already stands.");continue}if(!await n.preview(Hr,o,1))continue;Do(Hr,o),n.clear(),o?(n.say("Winnie, 40","Fine. I'll carry it over tonight. I'll want it back Sundays."),n.say("Jonah, 38","It'll be there Sundays. Always.")):(n.say("Jonah, 38","Your office, then. Mind the paraffin."),n.say("Winnie, 40","I always do."))}}n.close()}function u0(n,e){const t=new Set;return n.filter(i=>t.has(i.label)||!_e.hasInspection(i.reaction)||!_e.currentFrom([i.evidence]).some(o=>!i.variantId||o.variantId===i.variantId)||e&&!_e.canInspect(i.reaction)?!1:(t.add(i.label),!0))}function f0(n,e,t,i,o){if(o&&on.note(),!t){n.say(e,i,cs(o));return}const s=t.map(r=>"say"in r).lastIndexOf(!0);t.forEach((r,a)=>"say"in r?n.say(e,`“${r.say}”`,a===s?cs(o):""):n.say(null,r.narr))}async function Tw(){const n=new go("The gallery, April 1991",["winnie"]);for(n.say(null,"Winnie Hale, seventy-three, in her coat on the gallery, a blanket over her knees."),Dt.e1991.friendship==="estranged"?n.say("Winnie, 73","Mind the wet step, love. I'd offer you a cup, but I only put the one out these days."):n.say("Winnie, 73","Mind the wet step, love. Sit down, there's a cup going. Jonah'll be up when he's done with his plans.");;){const e=u0(V_,!0),t=[{id:"fire",label:"Ask about the night of the fire, in '58"},{id:"book",label:"Ask about the Court Book"},{id:"stair",label:"Ask about the gate on the stair"},{id:"bell",label:"Ask about the bell, down off its bracket"}];e.forEach((o,s)=>t.push({id:`show:${s}`,label:`Show her what you found: ${o.label}`})),t.push({id:"leave",label:"Say goodbye"});const i=await n.ask(t);if(i==="stair"){n.clear(),await p0(n,"winnie");continue}if(i==="bell"){n.clear(),Cw(n);continue}if(i.startsWith("show:")){const o=_e.inspect(e[Number(i.slice(5))].reaction);"error"in o?n.say("Winnie, 73","Oh, that was a long time ago."):f0(n,"Winnie, 73",X_[`${o.observation.inspectionId}:${o.observation.variantId}`],o.observation.text,o.isNew)}else if(i==="fire"){const o=_e.inspect("winnie-1991");if("error"in o){n.say("Winnie, 73","Oh, that was a long time ago.");continue}n.say("Winnie, 73",o.observation.text,cs(o.isNew)),o.isNew&&on.note()}else if(i==="book"){const o=_e.hasInspection("winnie-book-1991")?_e.inspect("winnie-book-1991"):null;o&&!("error"in o)?(n.say("Winnie, 73",o.observation.text,cs(o.isNew)),o.isNew&&on.note()):Dt.e1991.courtBookLocation==="longroom"?n.say("Winnie, 73","Jonah keeps it in the Long Room cupboard. He'll let you look."):n.say("Winnie, 73","On my office shelf, love, where it's always been.")}else break}n.close()}async function Ew(){const n=new go("The Long Room, April 1991",["jonah"]);n.say(null,"Jonah Pell, seventy-one, over a set of plans spread on the Long Room table."),n.say("Jonah, 71","Pell. Landlord now, for my sins."),n.say(null,"The plans on the table are for a gate across the foot of the stair."),Dt.e1991.friendship==="estranged"?n.say(null,"He glances up towards the gallery, and away again."):n.say("Jonah, 71","Winnie's got the pot on, if you're going up. Tell her I'll not be long.");const e=()=>{for(const i of["jonah-saved-1991","jonah-admission-1991"]){if(!_e.hasInspection(i))continue;const o=_e.inspect(i);if(!("error"in o))return o}return null},t=i=>{const o=_e.inspect(i.reaction);if(!("error"in o)){f0(n,"Jonah, 71",W_[`${o.observation.inspectionId}:${o.observation.variantId}`],o.observation.text,o.isNew);return}n.say(null,"He reads it for a long time.");const s=e();s?(n.say("Jonah, 71",s.observation.text,cs(s.isNew)),s.isNew&&on.note()):n.say("Jonah, 71","That was a long time ago. Winnie tells it better than I would.")};for(;;){const i=u0(G_,!1),o=[{id:"fire",label:"Ask about the night of the fire, in '58"},{id:"stair",label:"Ask about the gate on the stair"},{id:"bell",label:"Ask about the cracked bell"}];i.forEach((a,l)=>o.push({id:`show:${l}`,label:`Show him what you found: ${a.label}`})),o.push({id:"leave",label:"Say goodbye"});const s=await n.ask(o);if(s==="leave")break;if(s==="stair"){n.clear(),await p0(n,"jonah");continue}if(s==="bell"){n.clear(),await Aw(n);continue}if(s.startsWith("show:")){t(i[Number(s.slice(5))]);continue}const r=e();r?(n.say("Jonah, 71",r.observation.text,cs(r.isNew)),r.isNew&&on.note()):(n.say("Jonah, 71","That was a long time ago. Winnie tells it better than I would."),n.say(null,"He goes back to his plans. He might say more if you had something to show him."))}n.close()}async function p0(n,e){const t=Dt.e1991.friendship!=="estranged",i=Dt.e1991.liftedSteps,o=_e.has(Vr);e==="jonah"?(yn(n,"Jonah, 71","jonah-stair-1991")||n.say("Jonah, 71","The council wants a gate on that stair, and so do my insurers."),t?(n.say("Jonah, 71","Winnie's got a petition going. Right of way since the candle works, she says."),n.say(null,"He taps the form beside his plans."),n.say("Jonah, 71","She's not wrong. It always has been.")):(n.say(null,"He taps a form beside his plans without looking at it."),n.say("Jonah, 71","Winnie's petition. Right of way since the candle works. She didn't bring it down herself.")),n.say("Jonah, 71",o?"Signed and handed in. The council will make of it what it makes of it.":"It wants signing and handing in by the thirtieth, if you're minded. I'll not stop you.")):(n.say("Winnie, 73",o?"You signed my petition. I heard.":"They're putting a gate on my stair."),yn(n,"Winnie, 73","winnie-stair-1991")||n.say("Winnie, 73","It's been the Court's way up since the candle works."),i&&n.say("Winnie, 73","The steps want mending, I'll give him that. The pear's had them up."),yn(n,"Winnie, 73","winnie-petition-1991"));const s=await n.ask([{id:"sign",label:"Sign Winnie's petition and hand it in.",now:o},{id:"gate",label:"Leave it. Let the gate go ahead.",now:!o},{id:"back",label:"Say nothing yet"}]);if(s!=="sign"&&s!=="gate")return;const r=s==="sign";if(r===o){n.say(null,"That is how it already stands.");return}await n.preview(Vr,r,2)&&(Do(Vr,r),n.clear(),r?(n.say(null,"You sign under Winnie's name, where twenty-odd neighbours have already signed."),Dt.d1991.publicUseRecorded?n.say(null,"Pinned to the back is a copy of something handwritten, an old entry from the Court Book."):n.say(null,"The form's box for a written record of residents' use stays empty. There is nothing to attach."),e==="winnie"?yn(n,"Winnie, 73","winnie-petition-1991"):n.say("Jonah, 71",Dt.d1991.publicUseRecorded?"She would have found it in writing. She always does.":"They'll want it in writing. The council always does.")):e==="jonah"?(n.say("Jonah, 71","Gate it is, then."),n.say(null,"He squares the plans on the table.")):n.say("Winnie, 73","Well. I've been up and down it sixty years. I'll manage with a key."))}async function Aw(n){const e=Dt.e1991.friendship!=="estranged";n.say(null,"He nods at the old bell, down on its sacking by the south wall."),Dt.d1991.bellCrackedAt==="fire-1958"?(n.say("Jonah, 71","Cracked the night of the fire. She rang it hard enough to wake the dead, and it never sounded right after."),n.say("Jonah, 71","She rang it cracked for thirty years, mind.")):n.say("Jonah, 71","Frost got into it this winter. Thirty-odd years nobody rang it, and the cold did what the fire never did."),yn(n,"Jonah, 71","jonah-bell-1991")||n.say("Jonah, 71","The foundry'll recast it. It'd cost me more than the gate."),n.say("Jonah, 71",e?"Winnie wants it ringing again. She says a Court without a bell's just a yard.":"Winnie wants it ringing. She's told everyone but me.");const t=_e.has(Wr),i=await n.ask([{id:"recast",label:"Send it to be recast.",now:t},{id:"keep",label:"Wrap it and keep it.",now:!t},{id:"back",label:"Say nothing yet"}]);if(i!=="recast"&&i!=="keep")return;const o=i==="recast";if(o===t){n.say(null,"That is how it already stands.");return}await n.preview(Wr,o,2)&&(Do(Wr,o),n.clear(),o?(n.say(null,"Jonah signs the foundry's form and ties the label to the bell himself."),n.say("Jonah, 71","They collect in three weeks. It'll be a while before it hangs again.")):(n.say(null,"Jonah writes KEEP ORIGINAL on the label, in capitals."),n.say("Jonah, 71","It's done its ringing.")))}function Cw(n){yn(n,"Winnie, 73","winnie-bell-1991")||n.say("Winnie, 73","Jonah's to decide whether it's recast. It's his money.")}let Sf=!1;async function _d(n){const e=Dt.e2026,t=e.workshopUse==="cafe",i=new go(t?"The Lamplight Café, this morning":"Under the arch, this morning",["maya"]);if(!Sf){i.say(null,t?"In the doorway of her café, Maya Sołtys-Hale unties her apron and comes out to meet you.":"Under the arch, Maya Sołtys-Hale straightens up from a bicycle on its stand and wipes her hands on a rag."),i.say("Maya","You came. Good. Hold these."),i.say(null,"She puts an old iron key in your hand, and a notebook with a split spine."),i.say("Maya","The key's for the Long Room. Red door, east side. Nan Winnie always said it opens onto whichever year you need. I've never had the nerve to try."),i.say("Maya","The notebook's mine. Everything anyone's ever told me about the bell. It doesn't add up."),await i.ask([{id:"take",label:"Take the key and the notebook"}]),Sf=!0,i.close();return}n!=="tell"&&i.say("Maya",t?"Coffee's on me, if you've found anything.":"Anything? Mind the oil. If you've found something, I'll stop for it.");for(let o=!0;;o=!1){const s=_e.chosenHere(),r=o&&n==="tell"?"tell":await i.ask([{id:"tell",label:s?"Tell Maya what you found (again)":"Tell Maya what you found",sub:s?`You told her: ${s&&m0[s.accountId]}`:void 0},{id:"work",label:t?"Ask about her café":"Ask about her bicycle stall"},{id:"stair",label:"Ask about the stair"},{id:"bell",label:"Ask about the bell"},{id:"leave",label:"Say goodbye"}]);if(r==="leave")break;if(i.clear(),r==="tell"){if(await Rw(i))return;i.clear();continue}if(r==="work"){yn(i,"Maya","maya-2026")||i.say("Maya","Busy. Good busy.");continue}if(r==="stair"){yn(i,"Maya","maya-stair-2026")||i.say("Maya","Ask Theo. It’s his gate, or it isn’t.");continue}e.bellLocation==="bracket"?i.say("Maya",e.bellOccasion==="cafe-opening"?"It's ringing for my opening. Theo's grandad had it recast in '91. Nobody's ever told me why.":"It rang for the reopening. First time I've heard it, and I grew up here."):e.bellLocation==="cafe-window"?i.say("Maya","It's in my window. Cracked right across. People touch it for luck."):i.say("Maya","Theo's got it in his storeroom. 'Keep original.' I say a bell nobody can hear isn't kept, it's buried.")}i.close()}const m0={ringing:"The Ringing Court",kept:"The Kept Court",kind:"The Kind Court"};async function Rw(n){const e=_e.chosenHere();n.say("Maya","So what do I tell people about the bell?");const{supported:t,partial:i}=T_(_e.eligibility()),o=_e.notebook().filter(l=>l.status==="current"&&l.observation.kind==="player-note").at(-1)?.observation;if(!t.length)return o?(n.say("Maya","You've got a theory, I can hear it. I won't tell people a theory. Show me something I can point to, and I'll say it."),n.say("Your theory (not yet shown)",o.text)):(n.say("Maya",rf[0]),n.say("Maya",rf[1])),await n.ask([...i.map(l=>({id:l.id,label:l.title,off:`Not enough in the notebook yet: ${l.missing.map(c=>c.label.charAt(0).toLowerCase()+c.label.slice(1)).join("; ")}.`})),{id:"later",label:"I'll keep looking"}]),!1;e&&n.say(null,`Last time, you told her ${m0[e.accountId]}.`);const s=n.ask([...t.map(l=>({id:l.id,label:l.title,sub:b_[l.id],now:e?.accountId===l.id?"what you told her":void 0})),...i.map(l=>({id:l.id,label:l.title,off:`Not enough in the notebook yet: ${l.missing.map(c=>c.label.charAt(0).toLowerCase()+c.label.slice(1)).join("; ")}.`})),{id:"later",label:"Not yet. I want to look again."}]);if(o){const l=document.createElement("p");l.textContent="Your own theory stays in the notebook.",xe("talk-options").appendChild(l)}const r=await s;if(!t.some(l=>l.id===r))return!1;const a=_e.chooseAccount(r);return a?(n.close(),Iw(a),!0):!1}let Uh=[];function wd(){for(const n of Uh)clearTimeout(n);Uh=[]}function Iw(n){wd();const e=Dt.e2026,t=e.bellOccasion!=="silent"?"bell":e.workshopUse==="cafe"?"cafe":"stall",i=E_(n.accountId,t);xe("end-h").textContent=n.title;const o=xe("end-account");o.innerHTML="";let s=0;const r=m=>(m.classList.add("reveal"),m.style.animationDelay=`${Sl?0:.35+s++*.55}s`,m);for(const m of n.parts)if(m.kind==="maya"){const M=document.createElement("p");M.className="maya-line",M.textContent=m.text,o.appendChild(r(M))}else{const M=document.createElement("blockquote");M.dataset.entry=m.entryId;const E=document.createElement("p");E.textContent=m.text;const _=document.createElement("footer");_.textContent=m.cite,M.append(E,_),o.appendChild(r(M))}const a=xe("end-beat");a.innerHTML="",s+=1;for(const m of i.reaction){const M=document.createElement("p");M.className=m.startsWith("“")?"end-say":"end-narr",M.textContent=m,a.appendChild(r(M))}const l=document.createElement("p");l.className="end-sound",l.textContent=i.sound,a.appendChild(r(l));const c=Sl?0:(.35+(s-1)*.55)*1e3;s+=1;const d=document.createElement("p");d.className="end-last",d.textContent=i.last,a.appendChild(r(d));const u=document.createElement("p");u.className="end-key",u.textContent=Vp,a.appendChild(r(u)),r(xe("end-actions")),Uh.push(window.setTimeout(()=>{Bt==="ending"&&t==="bell"&&on.bell(3,"")},c));const f=t==="bell"&&!e.treeOccludesBracket,h=0,p=f?5.1:2.2,y=f?-7.35:-8.2,g=Math.hypot(ve.x-h,ve.z-y);if(g>4){const m=Math.tan(Vf.degToRad($t.fov/2))*$t.aspect,M=window.innerWidth>760?Math.atan(.45*m):0;ve.turnGoal=Math.atan2(-(h-ve.x),-(y-ve.z))-M,ve.pitchGoal=Math.max(-.1,Math.min(.35,Math.atan2(p-(ve.y+ko),g)*.8))}g0={accountId:n.accountId,sound:t,parts:n.parts.length},sr("ending"),xe("end-scroll").scrollTop=0}let g0=null;xe("end-walk").addEventListener("click",()=>{wd(),ui(),ls(Vp,!0)});xe("end-again").addEventListener("click",()=>{wd(),ui(),_d("tell")});async function Pw(){const n=Dt.e2026,e=new go("The Long Room, this morning",["theo"]);for(e.say(null,"Theo Pell, at the Long Room table with a laptop and a cold coffee."),e.say("Theo Pell","You'll be Maya's friend with the key. Theo. I look after the place for the family.");;){const t=await e.ask([{id:"stair",label:"Ask about the stair"},{id:"bell",label:"Ask about the bell"},{id:"book",label:"Ask about the Court Book"},{id:"leave",label:"Say goodbye"}]);if(t==="leave")break;if(e.clear(),t==="stair"){yn(e,"Theo Pell","theo-2026")||e.say("Theo Pell","Ask me something easier.");continue}if(t==="bell"){n.bellLocation==="bracket"?e.say("Theo Pell",n.stairPublic?"Grandad had it recast in '91. Cost him more than the gate he never got to build, Dad said. He never said why he did it.":"Grandad had it recast in '91. Cost him more than the gate, Dad said. He never said why he did it."):n.bellLocation==="cafe-window"?e.say("Theo Pell","Maya's got it in her window. Grandad let Winnie's lot have it. It's where it belongs, probably."):e.say("Theo Pell","Through there, on the storeroom shelf. Grandad's label: keep original. I haven't the heart to argue with a label.");continue}n.courtBookLocation==="library"?e.say("Theo Pell","The original's in the library. I deposited it; that's a facsimile in the case."):n.courtBookLocation==="cafe"?e.say("Theo Pell","Maya's got the original behind her counter. Winnie's hand, near enough all the way through."):e.say("Theo Pell","It burned in '58, with the workshop. Grandad said there was a lot in it.")}e.close()}async function Lw(){const n=new go("The co-op door, April 1991",["stan"]);n.say(null,"Stan Sołtys, on a kitchen chair by the co-op door, a mug in both hands. He nods at the pump."),yn(n,"Stan","stan-1991")||n.say("Stan","Mind the puddles."),await n.ask([{id:"leave",label:"Nod back"}]),n.close()}let Pr=0;const so=new uh(new pl({map:Jo(),color:"#ffe2a8",transparent:!0,depthWrite:!1,depthTest:!1,blending:Hs,opacity:.25}));so.renderOrder=10;so.visible=!1;Xr.add(so);const zh=1.9;let Oh=performance.now(),Lr=0,Ec=0,ol=0,y0=0,$a=0,Ac=0;const Tf=xe("prompt"),kw=xe("reticle");function x0(n){const e=Math.max(0,(n-Oh)/1e3),t=Math.min(.25,e);Oh=n,Lr+=t,$a++,Ac+=e,$a>=30&&(y0=Math.round($a/Math.max(.001,Ac)),$a=0,Ac=0),ve.movers.length=0;for(const s of Object.keys(Ep[Ze])){const r=sn.figure(s);r&&(r.group.getWorldPosition(Ot),ve.movers.push({x:Ot.x,z:Ot.z}))}if(!Bt&&(Lo||ta)){const s=(gn.has("arrowleft")?1:0)-(gn.has("arrowright")?1:0);ve.update(t,{forward:0,strafe:0,turn:s,run:!1}),ve.yaw+=s*zh*(Math.min(1,e)-t)}else if(Bt)ve.update(t,{forward:0,strafe:0,turn:0,run:!1});else{const s=(gn.has("w")||gn.has("arrowup")?1:0)-(gn.has("s")||gn.has("arrowdown")?1:0),r=(gn.has("d")?1:0)-(gn.has("a")?1:0),a=(gn.has("arrowleft")?1:0)-(gn.has("arrowright")?1:0),l=(gn.has("r")||gn.has("pageup")?1:0)-(gn.has("f")||gn.has("pagedown")?1:0);ve.update(t,{forward:s,strafe:r,turn:a,run:gn.has("shift"),pitch:l}),ve.yaw+=a*zh*(Math.min(1,e)-t),Ec+=ve.moved,Ec>.72&&(Ec=0,on.step(Ze)),uo(ve.x,ve.y,ve.z)!==is&&Mi()}const i=ve.eye();Pr+=(i.pulled-Pr)*Math.min(1,t*12),$t.position.set(ve.x+Math.sin(ve.yaw)*Pr,ve.y+ko,ve.z+Math.cos(ve.yaw)*Pr),$t.rotation.set(ve.pitch,ve.yaw,0,"YXZ"),$t.updateMatrixWorld();const o=r0();ei=Bt||Lo?null:cw(o),sn.attend(Lo?[]:Bt&&Bt!=="talk"?wl:hw(o)),Tf.textContent=ei?iw(ei.label):"",Tf.classList.toggle("on",!!ei),kw.classList.toggle("on",!!ei),so.visible=!!ei&&!ei.figures,so.visible&&(so.position.set(...ei.at),so.scale.setScalar(.3+1.6*(ei.size??.2)),so.material.opacity=(Ze>=2?.3:.18)+.07*Math.sin(Lr*3.2)),sn.update(t,Lr,$t.position),Vn.render(Xr,$t),ol&&!Bt&&(Jp>=3||Lr-ol>60)&&(ol=0,setTimeout(()=>t0(""),3e3)),requestAnimationFrame(x0)}async function Nw(){xe("title").hidden=!0,Bt=null,on.start(),on.setEra(Ze,{cafe:Ze===3&&Dt.e2026.workshopUse==="cafe"}),a0(),await _d(),sr("notebook"),t0("Walk with W A S D or the arrow keys. Look up and down with R and F. Drag, or click the view, to look. Press E on anything that catches your eye. N opens the notebook, M the map."),ol=Math.max(Lr,.001)}xe("btn-begin").addEventListener("click",()=>{Nw()});{const n=Il(_e.evaluation),e=Po.find(a=>a.talk==="maya2026"&&(!a.when||a.when(n))),[t,i,o]=e.stand,[s,,r]=e.at;ve.place(t,i,o,Math.atan2(-(s-t),-(r-o)),.02)}kl();Mi();xe("btn-begin").focus();requestAnimationFrame(x0);window.__afterimage={state:()=>({stageMs:jp,fps:y0,era:Ze,zone:is,panel:Bt,focused:ei?.id??null,highlight:so.visible,pos:[ve.x,ve.y,ve.z,ve.yaw,ve.pitch],choices:[..._e.choices],history:Nl(),canUndo:_e.canUndo,entries:_e.notebook().map(n=>({kind:n.observation.kind,status:n.status,text:n.observation.text})),errors:Kp}),scene:()=>({cups:Dt.e1991.friendship==="estranged"?1:2,plaque:Dt.e1991.plaqueDedication,tree:ia(Ze,Dt),marks:Object.keys(sn.marks),bellUp:!!sn.marks.bell,gate:!!sn.marks.gate,now:Dt.e2026}),view:n=>{const e=Zs(n);ve.place(e.x,e.y,e.z,e.yaw,e.pitch),Mi()},face:n=>{const e=Po.find(a=>a.id===n),[t,i,o]=e.stand,s=e.at[0]-t,r=e.at[2]-o;ve.place(t,i,o,Math.atan2(-s,-r),Math.atan2(e.at[1]-(i+ko),Math.hypot(s,r))),Mi()},facts:()=>Dt,person:n=>{const e=sn.figure(n);return e?(e.group.getWorldPosition(Ot),{x:Ot.x,y:Ot.y,z:Ot.z,yaw:e.group.rotation.y,attention:e.attention??0}):null},approachPerson:(n,e=3)=>{const t=sn.figure(n);if(!t)return!1;t.group.getWorldPosition(Ot);const i=ve.x-Ot.x,o=ve.z-Ot.z,s=Math.hypot(i,o)||1,r=Ot.x+i/s*e,a=Ot.z+o/s*e;return ve.place(r,ve.y,a,Math.atan2(-(Ot.x-r),-(Ot.z-a)),Math.atan2(Ot.y+1.4-(ve.y+ko),e)),Mi(),!0},camera:()=>({x:$t.position.x,y:$t.position.y,z:$t.position.z,walker:[ve.x,ve.y,ve.z],pull:Pr,near:$t.near}),place:(n,e,t,i,o=0)=>{ve.place(n,e,t,i,o),Mi()},screenOf:n=>{const e=sn.figure(n);if(!e)return null;e.group.getWorldPosition(Ot);const t=i=>(Ui.set(Ot.x,Ot.y+i,Ot.z).project($t),[(Ui.x+1)/2*window.innerWidth,(1-Ui.y)/2*window.innerHeight,Ui.z]);return e.seated?{feet:t(.1),torso:t(.75),head:t(1.2)}:{feet:t(.1),torso:t(1.1),head:t(1.6)}},accounts:()=>({eligibility:_e.eligibility().map(n=>({id:n.id,status:n.status,missing:n.missing.map(e=>e.label)})),here:_e.chosenHere()??null,all:_e.chosenAccounts().map(n=>({id:n.record.accountId,status:n.status,sources:n.record.sources.length,text:n.text.parts.map(e=>e.text).join(`
`)})),ending:g0}),saveText:()=>_e.save(),loadText:n=>l0(n),exportText:n=>_e.exportNotebook(n),travel:n=>vd(n),debugChoose:n=>Do(n,!0),debugSet:n=>{for(const e of Object.values(ti))_e.has(e)!==n.includes(e)&&Do(e,n.includes(e));return[..._e.choices]},goto:n=>Dh(Po.find(e=>e.id===n)),reachable:()=>Po.filter(n=>s0(n)&&!n.travel&&n.stand).map(n=>({id:n.id,zone:Dl(n),inspectionId:n.inspectionId??null,talk:n.talk??null,person:!!n.figures})),sightline:n=>{const e=sn.marks[n];if(!e)return null;const t=sn.figure(n),o=(t?t.head.getWorldPosition(new F):new Uo().setFromObject(e).getCenter(new F)).clone().sub($t.position),s=o.length(),r=new Ng($t.position.clone(),o.normalize(),.05,s+.5);r.camera=$t;const a=r.intersectObject(sn.root,!0).filter(u=>u.object.visible&&!u.object.isSprite&&!u.object.isPoints&&!u.object.isLineSegments),l=u=>{for(let f=u;f;f=f.parent)if(f===e)return!0;return!1},c=a[0],d=u=>{for(let h=u;h;h=h.parent){const p=Object.entries(sn.marks).find(([,y])=>y===h);if(p)return p[0]}const f=new F;return u.getWorldPosition(f),`${u.type}@${f.x.toFixed(2)},${f.y.toFixed(2)},${f.z.toFixed(2)}`};return{visible:!c||l(c.object)||c.distance>=s-.08,dist:s,firstHit:c?{at:c.distance,what:d(c.object)}:null}}};
