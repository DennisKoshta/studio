(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ys=2*Math.PI,Km=1/2048,Vs=1e-7,ah=i=>{const e=i%1;return e<0?e+1:e},Eo=(i,e)=>i.reduceRight((t,n)=>t*e+n,0),Xl=i=>i.slice(1).map((e,t)=>e*(t+1));function Pf(i){if(!Array.isArray(i)||i.length<3||i.length>64||i[0]?.phase!==0)throw new RangeError("Use 3–64 periodic motion knots starting at phase 0.");for(let o=0;o<i.length;o++){const a=i[o],l=o+1<i.length?i[o+1]?.phase:1;if(!a||!Number.isFinite(a.phase)||a.phase<0||a.phase>=1||!Number.isFinite(a.lift)||a.lift<0||a.lift>100||!Number.isFinite(l)||l-a.phase<Km)throw new RangeError("Motion phases must increase with gaps ≥ 1/2048 turn and lifts must be 0–100 mm.")}const e=i.length,t=i.map((o,a)=>(a+1<e?i[a+1].phase:1)-o.phase),n=t.map(o=>o*Ys),s=i.map((o,a)=>(i[(a+1)%e].lift-o.lift)/n[a]),r=s.map((o,a)=>{const l=(a+e-1)%e,c=s[l];if(c*o<=0)return 0;const u=2*n[a]+n[l],h=n[a]+2*n[l];return(u+h)/(u/c+h/o)});return i.map((o,a)=>{const l=i[(a+1)%e].lift-o.lift,c=n[a]*r[a],u=n[a]*r[(a+1)%e];return{phase:o.phase,span:t[a],angle:n[a],coeff:[o.lift,c,3*l-2*c-u,-2*l+c+u]}})}function va(i,e){const[t,n,s,r]=i.coeff;return{lift:t+e*(n+e*(s+e*r)),velocity:(n+e*(2*s+3*r*e))/i.angle,acceleration:(2*s+6*r*e)/i.angle**2}}function Lf(i,e){const t=ah(e);let n=i.length-1;for(;n>0&&t<i[n].phase;)n--;return va(i[n],(t-i[n].phase)/i[n].span)}function xa(i,e){if(!Number.isFinite(e))throw new RangeError("Motion phase must be finite.");return Lf(Pf(i),e)}const yn=(i,e,t)=>({code:i,severity:"error",message:e,...t===void 0?{}:{phase:ah(t)}});function lh(i){if(!i||i.follower?.kind!=="translating")return{ok:!1,issues:[yn("cam-follower","Only a radial translating roller follower is supported.")]};if(!i||!Number.isFinite(i.baseRadius)||i.baseRadius<10||i.baseRadius>100||!Number.isFinite(i.rollerRadius)||i.rollerRadius<2||i.rollerRadius>15||!Number.isFinite(i.boreRadius)||i.boreRadius<1||i.boreRadius>8)return{ok:!1,issues:[yn("cam-dimensions","Base radius must be 10–100 mm, roller radius 2–15 mm, and bore radius 1–8 mm.")]};if(i.baseRadius-i.boreRadius<2)return{ok:!1,issues:[yn("cam-bore","Leave at least 2 mm of material between the bore and base circle.")]};if(!Number.isFinite(i.pressureLimit)||i.pressureLimit<20*Math.PI/180||i.pressureLimit>60*Math.PI/180)return{ok:!1,issues:[yn("cam-pressure-limit","Pressure limit must be 20–60 degrees, supplied in radians.")]};try{return{ok:!0,value:Pf(i.knots),issues:[]}}catch(e){return{ok:!1,issues:[yn("cam-motion",e instanceof Error?e.message:String(e))]}}}function Yl(i,e,t){const n=i.baseRadius+i.rollerRadius+t.lift,s=Math.sin(e),r=Math.cos(e),o=Math.hypot(n,t.velocity),a=[n*s,n*r],l=[(n*s-t.velocity*r)/o,(n*r+t.velocity*s)/o],c=(n*n+2*t.velocity*t.velocity-n*t.acceleration)/o**3;return{lift:t.lift,pitch:a,normal:l,contact:[a[0]-i.rollerRadius*l[0],a[1]-i.rollerRadius*l[1]],pressureAngle:Math.atan2(Math.abs(t.velocity),n),curvature:c,offsetFactor:1-i.rollerRadius*c}}function Jm(i,e){const t=lh(i);if(!t.ok)return t;if(!Number.isFinite(e))return{ok:!1,issues:[yn("cam-angle","Cam angle must be finite.")]};const n=ah(e/Ys),s=Yl(i,n*Ys,Lf(t.value,n)),r=[];return s.pressureAngle>i.pressureLimit+1e-10&&r.push(yn("cam-pressure","Pressure angle exceeds the selected limit.",n)),s.offsetFactor<=Vs&&r.push(yn("cam-undercut","The roller offset is singular or undercut at this phase.",n)),r.length?{ok:!1,issues:r}:{ok:!0,value:s,issues:[]}}function du(i,e){const t=Array(i.length+e.length-1).fill(0);for(let n=0;n<i.length;n++)for(let s=0;s<e.length;s++)t[n+s]+=i[n]*e[s];return t}function If(i){const e=[...i],t=Math.max(1,...e.map(Math.abs)),n=t*1e-12;for(;e.length>1&&Math.abs(e[e.length-1])<=t*1e-14;)e.pop();if(e.length===1)return[];if(e.length===2){const o=-e[0]/e[1];return o>=0&&o<=1?[o]:[]}const s=[0,...If(Xl(e)).filter(o=>o>0&&o<1),1].sort((o,a)=>o-a),r=[];for(const o of s)Math.abs(Eo(e,o))<=n&&r.push(o);for(let o=1;o<s.length;o++){let a=s[o-1],l=s[o],c=Eo(e,a);const u=Eo(e,l);if(!(c*u>=0)){for(let h=0;h<60;h++){const d=(a+l)/2,f=Eo(e,d);if(f===0){a=l=d;break}c*f<0?l=d:(a=d,c=f)}r.push((a+l)/2)}}return r.sort((o,a)=>o-a).filter((o,a,l)=>a===0||o-l[a-1]>1e-10)}function Df(i,e){let t=0,n=0;for(const s of e){const r=[...s.coeff];r[0]+=i.baseRadius+i.rollerRadius;const o=Xl(r),a=du(Xl(o),r),l=du(o,o),c=a.map((u,h)=>u-(l[h]??0));for(const u of[0,1,...If(c)]){const h=va(s,u),d=Math.atan2(Math.abs(h.velocity),i.baseRadius+i.rollerRadius+h.lift);d>t&&(t=d,n=s.phase+u*s.span)}}return{angle:t,phase:n}}function fu(i,e=0,t){const n=lh(i);return n.ok?(t??=n.value.length,!Number.isSafeInteger(e)||!Number.isSafeInteger(t)||e<0||t>n.value.length||e>=t?{ok:!1,issues:[yn("cam-pressure-range","Use a nonempty range of whole motion segments.")]}:{ok:!0,value:Df(i,n.value.slice(e,t)),issues:[]}):n}const To=(i,e,t)=>(e[0]-i[0])*(t[1]-i[1])-(e[1]-i[1])*(t[0]-i[0]);function jm(i,e,t,n){if(Math.max(i[0],e[0])<Math.min(t[0],n[0])-Vs||Math.max(t[0],n[0])<Math.min(i[0],e[0])-Vs||Math.max(i[1],e[1])<Math.min(t[1],n[1])-Vs||Math.max(t[1],n[1])<Math.min(i[1],e[1])-Vs)return!1;const s=To(i,e,t),r=To(i,e,n),o=To(t,n,i),a=To(t,n,e);return s*r<=0&&o*a<=0}function Qm(i){const e=lh(i);if(!e.ok)return e;const t=e.value,n=Df(i,t),s=[],r=[],o=[];let a=1/0,l=0,c=0;const u=(m,p)=>{m.offsetFactor<a&&(a=m.offsetFactor,l=p),c=Math.max(c,m.pressureAngle)};for(const m of t){const p=Math.max(8,Math.ceil(m.span*1024));for(let S=0;S<p;S++){const _=S/p,w=m.phase+_*m.span,b=Yl(i,w*Ys,va(m,_));r.push(b),o.push(w),u(b,w)}const x=m.phase+m.span;u(Yl(i,x*Ys,va(m,1)),x)}if(n.angle>i.pressureLimit+1e-10&&s.push(yn("cam-pressure",`Peak pressure ${(n.angle*180/Math.PI).toFixed(2)}° exceeds the selected limit.`,n.phase)),a<=Vs&&s.push(yn("cam-undercut","The roller is too large for the sampled pitch curvature; its offset is singular or undercut.",l)),s.length)return{ok:!1,issues:s};const h=r.map(m=>m.contact),d=h.length,f=i.rollerRadius,g=(f-1e-6)**2;for(let m=0;m<d;m++)for(let p=0;p<d;p++){const x=h[m][0]-r[p].pitch[0],S=h[m][1]-r[p].pitch[1];if(Math.abs(x)<f&&Math.abs(S)<f&&x*x+S*S<g)return{ok:!1,issues:[yn("cam-penetration","A sampled roller position penetrates another part of the cam profile.",o[p])]}}for(let m=0;m<d;m++)for(let p=m+2;p<d;p++)if(!(m===0&&p===d-1)&&jm(h[m],h[(m+1)%d],h[p],h[(p+1)%d]))return{ok:!1,issues:[yn("cam-self-intersection","The sampled cam outline intersects itself.",o[m])]};const y=Array.from({length:128},(m,p)=>{const x=-Ys*p/128;return[i.boreRadius*Math.cos(x),i.boreRadius*Math.sin(x)]});return s.push({code:"cam-sampled-checks",severity:"warning",message:`Offset checks use ${d} phases and both knot limits; global roller contact uses ${d} × ${d} point pairs. No interference was detected at this resolution. Polygon checks do not certify the continuous cam.`}),{ok:!0,value:{spec:structuredClone(i),outer:h.reverse(),holes:[y],sampleCount:d,sampledMaxPressure:c,sampledMinOffsetFactor:a,checks:{pressure:"analytic-float",offset:"sampled",globalContact:"sampled"}},issues:s}}const zr=Math.PI/9,Ao=.01,pu=8192,Ro=2*Math.PI,Hr=(i,e)=>({ok:!1,issues:[{code:i,severity:"error",message:e}]}),Ga=(i,e=[])=>({ok:!0,value:i,issues:e});function Nf(i){if(!i||typeof i!="object"||Array.isArray(i)||!Number.isFinite(i.module)||i.module<1||i.module>4||!Number.isInteger(i.teeth)||i.teeth<18||i.teeth>80||!Number.isFinite(i.boreRadius)||i.boreRadius<1||i.boreRadius>8)return Hr("gear-parameters","Use module 1–4 mm, 18–80 whole teeth and a bore radius of 1–8 mm.");const e=i.module*i.teeth/2,t={pitchRadius:e,baseRadius:e*Math.cos(zr),tipRadius:e+i.module,rootRadius:e-1.25*i.module};return t.rootRadius-i.boreRadius<2*i.module?Hr("gear-bore","The bore must leave at least two modules of radial material inside the root circle. This is a geometric guardrail, not a strength rating."):Ga(t)}function mu(i){const e=Nf(i);if(!e.ok)return e;const t=e.value,{rootRadius:n,baseRadius:s,tipRadius:r}=t,o=Math.max(n,s),a=Math.sqrt(Math.max(0,(o/s)**2-1)),l=Math.sqrt((r/s)**2-1),c=Math.tan(zr),u=Math.PI/(2*i.teeth)+c-zr,h=w=>u-(w-Math.atan(w)),d=h(a),f=h(l),g=Ro/i.teeth;if(!(f>0&&d<g/2))return Hr("gear-profile","The tooth profile has no positive tip or root land.");const y=[],m=(w,b)=>{const R=[w*Math.cos(b),w*Math.sin(b)],M=y.at(-1);(!M||Math.hypot(R[0]-M[0],R[1]-M[1])>1e-10)&&y.push(R)},p=(w,b,R)=>{const M=Math.max(1,Math.ceil((R-b)/(2*Math.acos(1-Ao/w))));for(let A=1;A<=M;A++)m(w,b+(R-b)*A/M)},x=[a];for(const[w,b]of[[a,c],[c,l]]){const R=Math.max(1,Math.ceil((b-w)*Math.sqrt(r/(8*Ao))));for(let M=1;M<=R;M++)x.push(w+(b-w)*M/R)}for(let w=0;w<i.teeth;w++){const b=w*g;m(n,b-d);for(const R of x)m(s*Math.hypot(1,R),b-h(R));p(r,b-f,b+f);for(let R=x.length-2;R>=0;R--){const M=x[R];m(s*Math.hypot(1,M),b+h(M))}m(n,b+d),p(n,b+d,b+g-d)}y.pop();const S=Math.max(16,Math.ceil(Ro/(2*Math.acos(1-Ao/i.boreRadius))/4)*4),_=Array.from({length:S},(w,b)=>[i.boreRadius*Math.cos(-Ro*b/S),i.boreRadius*Math.sin(-Ro*b/S)]);return y.length+_.length>pu?Hr("gear-budget",`Gear outlines are limited to ${pu} vertices.`):Ga({spec:{module:i.module,teeth:i.teeth,boreRadius:i.boreRadius},dimensions:t,outer:y,holes:[_],outlineTolerance:Ao,rootModel:"radial-transition"})}function eg(i){if(!i||typeof i!="object"||Array.isArray(i))return Hr("gear-parameters","A gear pair needs module, two tooth counts and bore radius.");const e={module:i.module,teeth:i.teethA,boreRadius:i.boreRadius},t={module:i.module,teeth:i.teethB,boreRadius:i.boreRadius};for(const n of[e,t]){const s=Nf(n);if(!s.ok)return s}return Ga([e,t])}function tg(i){const e=eg(i);if(!e.ok)return e;const t=mu(e.value[0]),n=mu(e.value[1]);if(!t.ok)return t;if(!n.ok)return n;const s=t.value.dimensions,r=n.value.dimensions,o=s.pitchRadius+r.pitchRadius,a=(Math.sqrt(s.tipRadius**2-s.baseRadius**2)+Math.sqrt(r.tipRadius**2-r.baseRadius**2)-o*Math.sin(zr))/(Math.PI*i.module*Math.cos(zr));return Ga({a:t.value,b:n.value,centerDistance:o,contactRatio:a})}const fi=1e-9,Uf=i=>Number.isFinite(i)&&i>=5&&i<=300,qn=(i,e)=>({ok:!1,issues:[{code:i,severity:"error",message:e}]}),kf=i=>i&&[i.ground,i.crank,i.coupler,i.rocker].every(Uf)&&(i.branch===1||i.branch===-1),Ff=i=>i&&[i.crank,i.rod].every(Uf)&&Number.isFinite(i.guideOffset)&&Math.abs(i.guideOffset)<=300&&(i.branch===1||i.branch===-1),Of=i=>Number.isFinite(i)&&Math.abs(i)<=1e6,$s=(i,e,t)=>({id:i,a:e,b:t,angle:Math.atan2(t[1]-e[1],t[0]-e[0]),length:Math.hypot(t[0]-e[0],t[1]-e[1])});function ya(i){if(!kf(i))return qn("link-dimensions","Four-bar lengths must be5–300mm and assembly branch must be +1 or -1.");const e=Math.abs(i.ground-i.crank),t=i.ground+i.crank,n=Math.abs(i.coupler-i.rocker),s=i.coupler+i.rocker,r=e>=n-fi&&t<=s+fi,o=r&&e>n+fi&&t<s-fi;return{ok:!0,value:{fullRotation:o,touchesToggle:r&&!o,reason:o?"The crank can make a full turn without a toggle.":r?"A full turn reaches a singular toggle; use a different length.":"Only a restricted input-angle range can close this linkage."},issues:[]}}function Bf(i){if(!Ff(i))return qn("link-dimensions","Slider-crank lengths must be5–300mm, guide offset within±300mm, and branch +1 or -1.");const e=Math.abs(i.guideOffset)+i.crank,t=i.rod>e+fi,n=Math.abs(i.rod-e)<=fi;return{ok:!0,value:{fullRotation:t,touchesToggle:n,reason:t?"The crank can make a full turn.":n?"The rod reaches a singular vertical toggle.":"The rod cannot reach the guide throughout a full turn."},issues:[]}}function ng(i,e){if(!kf(i))return qn("link-dimensions","Four-bar lengths must be5–300mm and branch +1 or -1.");if(!Of(e))return qn("input-angle","Input angle must be finite and within±1,000,000radians.");const t=[0,0],n=[i.ground,0],s=[i.crank*Math.cos(e),i.crank*Math.sin(e)],r=n[0]-s[0],o=-s[1],a=Math.hypot(r,o),l=Math.abs(i.coupler-i.rocker),c=i.coupler+i.rocker;if(a<fi)return qn("coincident-centres","The moving and fixed circle centres coincide; the coupler pose is not uniquely determined.");if(a<l-fi||a>c+fi)return qn("unreachable","The coupler and rocker circles do not meet at this input angle.");const u=(i.coupler*i.coupler-i.rocker*i.rocker+a*a)/(2*a),h=i.coupler*i.coupler-u*u;if(h<-1e-7)return qn("unreachable","The coupler and rocker cannot close at this input angle.");const d=Math.sqrt(Math.max(0,h)),f=r/a,g=o/a,y=[s[0]+f*u-g*d*i.branch,s[1]+g*u+f*d*i.branch],m=[$s("ground",t,n),$s("crank",t,s),$s("coupler",s,y),$s("rocker",n,y)],p=d<1e-6;return{ok:!0,value:{joints:{A:t,B:s,C:y,D:n},links:m,outputs:{crankAngle:e,couplerAngle:m[2].angle,rockerAngle:m[3].angle,x:y[0],y:y[1]},singular:p},issues:p?[{code:"toggle",severity:"warning",message:"The links are at a singular toggle; motion direction is not determined by this pose alone."}]:[]}}function ig(i,e){if(!Ff(i))return qn("link-dimensions","Slider-crank lengths must be5–300mm, guide offset within±300mm, and branch +1 or -1.");if(!Of(e))return qn("input-angle","Input angle must be finite and within±1,000,000radians.");const t=[0,0],n=[i.crank*Math.cos(e),i.crank*Math.sin(e)],s=i.guideOffset-n[1],r=i.rod*i.rod-s*s;if(r<-1e-7)return qn("unreachable","The connecting rod cannot reach the slider guide at this angle.");const o=Math.sqrt(Math.max(0,r)),a=[n[0]+i.branch*o,i.guideOffset],l=[$s("crank",t,n),$s("rod",n,a)],c=o<1e-6;return{ok:!0,value:{joints:{A:t,B:n,S:a},links:l,outputs:{crankAngle:e,rodAngle:l[1].angle,sliderX:a[0]},singular:c},issues:c?[{code:"toggle",severity:"warning",message:"The connecting rod is vertical at a singular slider toggle."}]:[]}}class qi{constructor(e,t){this.next=null,this.key=e,this.data=t,this.left=null,this.right=null}}function sg(i,e){return i>e?1:i<e?-1:0}function ki(i,e,t){const n=new qi(null,null);let s=n,r=n;for(;;){const o=t(i,e.key);if(o<0){if(e.left===null)break;if(t(i,e.left.key)<0){const a=e.left;if(e.left=a.right,a.right=e,e=a,e.left===null)break}r.left=e,r=e,e=e.left}else if(o>0){if(e.right===null)break;if(t(i,e.right.key)>0){const a=e.right;if(e.right=a.left,a.left=e,e=a,e.right===null)break}s.right=e,s=e,e=e.right}else break}return s.right=e.left,r.left=e.right,e.left=n.right,e.right=n.left,e}function sl(i,e,t,n){const s=new qi(i,e);if(t===null)return s.left=s.right=null,s;t=ki(i,t,n);const r=n(i,t.key);return r<0?(s.left=t.left,s.right=t,t.left=null):r>=0&&(s.right=t.right,s.left=t,t.right=null),s}function gu(i,e,t){let n=null,s=null;if(e){e=ki(i,e,t);const r=t(e.key,i);r===0?(n=e.left,s=e.right):r<0?(s=e.right,e.right=null,n=e):(n=e.left,e.left=null,s=e)}return{left:n,right:s}}function rg(i,e,t){return e===null?i:(i===null||(e=ki(i.key,e,t),e.left=i),e)}function ql(i,e,t,n,s){if(i){n(`${e}${t?"└── ":"├── "}${s(i)}
`);const r=e+(t?"    ":"│   ");i.left&&ql(i.left,r,!1,n,s),i.right&&ql(i.right,r,!0,n,s)}}class ch{constructor(e=sg){this._root=null,this._size=0,this._comparator=e}insert(e,t){return this._size++,this._root=sl(e,t,this._root,this._comparator)}add(e,t){const n=new qi(e,t);this._root===null&&(n.left=n.right=null,this._size++,this._root=n);const s=this._comparator,r=ki(e,this._root,s),o=s(e,r.key);return o===0?this._root=r:(o<0?(n.left=r.left,n.right=r,r.left=null):o>0&&(n.right=r.right,n.left=r,r.right=null),this._size++,this._root=n),this._root}remove(e){this._root=this._remove(e,this._root,this._comparator)}_remove(e,t,n){let s;return t===null?null:(t=ki(e,t,n),n(e,t.key)===0?(t.left===null?s=t.right:(s=ki(e,t.left,n),s.right=t.right),this._size--,s):t)}pop(){let e=this._root;if(e){for(;e.left;)e=e.left;return this._root=ki(e.key,this._root,this._comparator),this._root=this._remove(e.key,this._root,this._comparator),{key:e.key,data:e.data}}return null}findStatic(e){let t=this._root;const n=this._comparator;for(;t;){const s=n(e,t.key);if(s===0)return t;s<0?t=t.left:t=t.right}return null}find(e){return this._root&&(this._root=ki(e,this._root,this._comparator),this._comparator(e,this._root.key)!==0)?null:this._root}contains(e){let t=this._root;const n=this._comparator;for(;t;){const s=n(e,t.key);if(s===0)return!0;s<0?t=t.left:t=t.right}return!1}forEach(e,t){let n=this._root;const s=[];let r=!1;for(;!r;)n!==null?(s.push(n),n=n.left):s.length!==0?(n=s.pop(),e.call(t,n),n=n.right):r=!0;return this}range(e,t,n,s){const r=[],o=this._comparator;let a=this._root,l;for(;r.length!==0||a;)if(a)r.push(a),a=a.left;else{if(a=r.pop(),l=o(a.key,t),l>0)break;if(o(a.key,e)>=0&&n.call(s,a))return this;a=a.right}return this}keys(){const e=[];return this.forEach(({key:t})=>{e.push(t)}),e}values(){const e=[];return this.forEach(({data:t})=>{e.push(t)}),e}min(){return this._root?this.minNode(this._root).key:null}max(){return this._root?this.maxNode(this._root).key:null}minNode(e=this._root){if(e)for(;e.left;)e=e.left;return e}maxNode(e=this._root){if(e)for(;e.right;)e=e.right;return e}at(e){let t=this._root,n=!1,s=0;const r=[];for(;!n;)if(t)r.push(t),t=t.left;else if(r.length>0){if(t=r.pop(),s===e)return t;s++,t=t.right}else n=!0;return null}next(e){let t=this._root,n=null;if(e.right){for(n=e.right;n.left;)n=n.left;return n}const s=this._comparator;for(;t;){const r=s(e.key,t.key);if(r===0)break;r<0?(n=t,t=t.left):t=t.right}return n}prev(e){let t=this._root,n=null;if(e.left!==null){for(n=e.left;n.right;)n=n.right;return n}const s=this._comparator;for(;t;){const r=s(e.key,t.key);if(r===0)break;r<0?t=t.left:(n=t,t=t.right)}return n}clear(){return this._root=null,this._size=0,this}toList(){return ag(this._root)}load(e,t=[],n=!1){let s=e.length;const r=this._comparator;if(n&&Jl(e,t,0,s-1,r),this._root===null)this._root=Zl(e,t,0,s),this._size=s;else{const o=lg(this.toList(),og(e,t),r);s=this._size+s,this._root=Kl({head:o},0,s)}return this}isEmpty(){return this._root===null}get size(){return this._size}get root(){return this._root}toString(e=t=>String(t.key)){const t=[];return ql(this._root,"",!0,n=>t.push(n),e),t.join("")}update(e,t,n){const s=this._comparator;let{left:r,right:o}=gu(e,this._root,s);s(e,t)<0?o=sl(t,n,o,s):r=sl(t,n,r,s),this._root=rg(r,o,s)}split(e){return gu(e,this._root,this._comparator)}*[Symbol.iterator](){let e=this._root;const t=[];let n=!1;for(;!n;)e!==null?(t.push(e),e=e.left):t.length!==0?(e=t.pop(),yield e,e=e.right):n=!0}}function Zl(i,e,t,n){const s=n-t;if(s>0){const r=t+Math.floor(s/2),o=i[r],a=e[r],l=new qi(o,a);return l.left=Zl(i,e,t,r),l.right=Zl(i,e,r+1,n),l}return null}function og(i,e){const t=new qi(null,null);let n=t;for(let s=0;s<i.length;s++)n=n.next=new qi(i[s],e[s]);return n.next=null,t.next}function ag(i){let e=i;const t=[];let n=!1;const s=new qi(null,null);let r=s;for(;!n;)e?(t.push(e),e=e.left):t.length>0?(e=r=r.next=t.pop(),e=e.right):n=!0;return r.next=null,s.next}function Kl(i,e,t){const n=t-e;if(n>0){const s=e+Math.floor(n/2),r=Kl(i,e,s),o=i.head;return o.left=r,i.head=i.head.next,o.right=Kl(i,s+1,t),o}return null}function lg(i,e,t){const n=new qi(null,null);let s=n,r=i,o=e;for(;r!==null&&o!==null;)t(r.key,o.key)<0?(s.next=r,r=r.next):(s.next=o,o=o.next),s=s.next;return r!==null?s.next=r:o!==null&&(s.next=o),n.next}function Jl(i,e,t,n,s){if(t>=n)return;const r=i[t+n>>1];let o=t-1,a=n+1;for(;;){do o++;while(s(i[o],r)<0);do a--;while(s(i[a],r)>0);if(o>=a)break;let l=i[o];i[o]=i[a],i[a]=l,l=e[o],e[o]=e[a],e[a]=l}Jl(i,e,t,a,s),Jl(i,e,a+1,n,s)}const mi=11102230246251565e-32,qt=134217729,cg=(3+8*mi)*mi;function rl(i,e,t,n,s){let r,o,a,l,c=e[0],u=n[0],h=0,d=0;u>c==u>-c?(r=c,c=e[++h]):(r=u,u=n[++d]);let f=0;if(h<i&&d<t)for(u>c==u>-c?(o=c+r,a=r-(o-c),c=e[++h]):(o=u+r,a=r-(o-u),u=n[++d]),r=o,a!==0&&(s[f++]=a);h<i&&d<t;)u>c==u>-c?(o=r+c,l=o-r,a=r-(o-l)+(c-l),c=e[++h]):(o=r+u,l=o-r,a=r-(o-l)+(u-l),u=n[++d]),r=o,a!==0&&(s[f++]=a);for(;h<i;)o=r+c,l=o-r,a=r-(o-l)+(c-l),c=e[++h],r=o,a!==0&&(s[f++]=a);for(;d<t;)o=r+u,l=o-r,a=r-(o-l)+(u-l),u=n[++d],r=o,a!==0&&(s[f++]=a);return(r!==0||f===0)&&(s[f++]=r),f}function hg(i,e){let t=e[0];for(let n=1;n<i;n++)t+=e[n];return t}function uo(i){return new Float64Array(i)}const ug=(3+16*mi)*mi,dg=(2+12*mi)*mi,fg=(9+64*mi)*mi*mi,Es=uo(4),_u=uo(8),vu=uo(12),xu=uo(16),en=uo(4);function pg(i,e,t,n,s,r,o){let a,l,c,u,h,d,f,g,y,m,p,x,S,_,w,b,R,M;const A=i-s,C=t-s,L=e-r,I=n-r;_=A*I,d=qt*A,f=d-(d-A),g=A-f,d=qt*I,y=d-(d-I),m=I-y,w=g*m-(_-f*y-g*y-f*m),b=L*C,d=qt*L,f=d-(d-L),g=L-f,d=qt*C,y=d-(d-C),m=C-y,R=g*m-(b-f*y-g*y-f*m),p=w-R,h=w-p,Es[0]=w-(p+h)+(h-R),x=_+p,h=x-_,S=_-(x-h)+(p-h),p=S-b,h=S-p,Es[1]=S-(p+h)+(h-b),M=x+p,h=M-x,Es[2]=x-(M-h)+(p-h),Es[3]=M;let k=hg(4,Es),N=dg*o;if(k>=N||-k>=N||(h=i-A,a=i-(A+h)+(h-s),h=t-C,c=t-(C+h)+(h-s),h=e-L,l=e-(L+h)+(h-r),h=n-I,u=n-(I+h)+(h-r),a===0&&l===0&&c===0&&u===0)||(N=fg*o+cg*Math.abs(k),k+=A*u+I*a-(L*c+C*l),k>=N||-k>=N))return k;_=a*I,d=qt*a,f=d-(d-a),g=a-f,d=qt*I,y=d-(d-I),m=I-y,w=g*m-(_-f*y-g*y-f*m),b=l*C,d=qt*l,f=d-(d-l),g=l-f,d=qt*C,y=d-(d-C),m=C-y,R=g*m-(b-f*y-g*y-f*m),p=w-R,h=w-p,en[0]=w-(p+h)+(h-R),x=_+p,h=x-_,S=_-(x-h)+(p-h),p=S-b,h=S-p,en[1]=S-(p+h)+(h-b),M=x+p,h=M-x,en[2]=x-(M-h)+(p-h),en[3]=M;const B=rl(4,Es,4,en,_u);_=A*u,d=qt*A,f=d-(d-A),g=A-f,d=qt*u,y=d-(d-u),m=u-y,w=g*m-(_-f*y-g*y-f*m),b=L*c,d=qt*L,f=d-(d-L),g=L-f,d=qt*c,y=d-(d-c),m=c-y,R=g*m-(b-f*y-g*y-f*m),p=w-R,h=w-p,en[0]=w-(p+h)+(h-R),x=_+p,h=x-_,S=_-(x-h)+(p-h),p=S-b,h=S-p,en[1]=S-(p+h)+(h-b),M=x+p,h=M-x,en[2]=x-(M-h)+(p-h),en[3]=M;const H=rl(B,_u,4,en,vu);_=a*u,d=qt*a,f=d-(d-a),g=a-f,d=qt*u,y=d-(d-u),m=u-y,w=g*m-(_-f*y-g*y-f*m),b=l*c,d=qt*l,f=d-(d-l),g=l-f,d=qt*c,y=d-(d-c),m=c-y,R=g*m-(b-f*y-g*y-f*m),p=w-R,h=w-p,en[0]=w-(p+h)+(h-R),x=_+p,h=x-_,S=_-(x-h)+(p-h),p=S-b,h=S-p,en[1]=S-(p+h)+(h-b),M=x+p,h=M-x,en[2]=x-(M-h)+(p-h),en[3]=M;const G=rl(H,vu,4,en,xu);return xu[G-1]}function mg(i,e,t,n,s,r){const o=(e-r)*(t-s),a=(i-s)*(n-r),l=o-a,c=Math.abs(o+a);return Math.abs(l)>=ug*c?l:-pg(i,e,t,n,s,r,c)}var zf={};const pr=(i,e)=>i.ll.x<=e.x&&e.x<=i.ur.x&&i.ll.y<=e.y&&e.y<=i.ur.y,jl=(i,e)=>{if(e.ur.x<i.ll.x||i.ur.x<e.ll.x||e.ur.y<i.ll.y||i.ur.y<e.ll.y)return null;const t=i.ll.x<e.ll.x?e.ll.x:i.ll.x,n=i.ur.x<e.ur.x?i.ur.x:e.ur.x,s=i.ll.y<e.ll.y?e.ll.y:i.ll.y,r=i.ur.y<e.ur.y?i.ur.y:e.ur.y;return{ll:{x:t,y:s},ur:{x:n,y:r}}};let Oi=Number.EPSILON;Oi===void 0&&(Oi=Math.pow(2,-52));const gg=Oi*Oi,yu=(i,e)=>{if(-Oi<i&&i<Oi&&-Oi<e&&e<Oi)return 0;const t=i-e;return t*t<gg*i*e?0:i<e?-1:1};class _g{constructor(){this.reset()}reset(){this.xRounder=new Mu,this.yRounder=new Mu}round(e,t){return{x:this.xRounder.round(e),y:this.yRounder.round(t)}}}class Mu{constructor(){this.tree=new ch,this.round(0)}round(e){const t=this.tree.add(e),n=this.tree.prev(t);if(n!==null&&yu(t.key,n.key)===0)return this.tree.remove(e),n.key;const s=this.tree.next(t);return s!==null&&yu(t.key,s.key)===0?(this.tree.remove(e),s.key):e}}const Gr=new _g,ca=(i,e)=>i.x*e.y-i.y*e.x,Hf=(i,e)=>i.x*e.x+i.y*e.y,bu=(i,e,t)=>{const n=mg(i.x,i.y,e.x,e.y,t.x,t.y);return n>0?-1:n<0?1:0},Ma=i=>Math.sqrt(Hf(i,i)),vg=(i,e,t)=>{const n={x:e.x-i.x,y:e.y-i.y},s={x:t.x-i.x,y:t.y-i.y};return ca(s,n)/Ma(s)/Ma(n)},xg=(i,e,t)=>{const n={x:e.x-i.x,y:e.y-i.y},s={x:t.x-i.x,y:t.y-i.y};return Hf(s,n)/Ma(s)/Ma(n)},Su=(i,e,t)=>e.y===0?null:{x:i.x+e.x/e.y*(t-i.y),y:t},wu=(i,e,t)=>e.x===0?null:{x:t,y:i.y+e.y/e.x*(t-i.x)},yg=(i,e,t,n)=>{if(e.x===0)return wu(t,n,i.x);if(n.x===0)return wu(i,e,t.x);if(e.y===0)return Su(t,n,i.y);if(n.y===0)return Su(i,e,t.y);const s=ca(e,n);if(s==0)return null;const r={x:t.x-i.x,y:t.y-i.y},o=ca(r,e)/s,a=ca(r,n)/s,l=i.x+a*e.x,c=t.x+o*n.x,u=i.y+a*e.y,h=t.y+o*n.y,d=(l+c)/2,f=(u+h)/2;return{x:d,y:f}};class Tn{static compare(e,t){const n=Tn.comparePoints(e.point,t.point);return n!==0?n:(e.point!==t.point&&e.link(t),e.isLeft!==t.isLeft?e.isLeft?1:-1:$i.compare(e.segment,t.segment))}static comparePoints(e,t){return e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:e.y>t.y?1:0}constructor(e,t){e.events===void 0?e.events=[this]:e.events.push(this),this.point=e,this.isLeft=t}link(e){if(e.point===this.point)throw new Error("Tried to link already linked events");const t=e.point.events;for(let n=0,s=t.length;n<s;n++){const r=t[n];this.point.events.push(r),r.point=this.point}this.checkForConsuming()}checkForConsuming(){const e=this.point.events.length;for(let t=0;t<e;t++){const n=this.point.events[t];if(n.segment.consumedBy===void 0)for(let s=t+1;s<e;s++){const r=this.point.events[s];r.consumedBy===void 0&&n.otherSE.point.events===r.otherSE.point.events&&n.segment.consume(r.segment)}}}getAvailableLinkedEvents(){const e=[];for(let t=0,n=this.point.events.length;t<n;t++){const s=this.point.events[t];s!==this&&!s.segment.ringOut&&s.segment.isInResult()&&e.push(s)}return e}getLeftmostComparator(e){const t=new Map,n=s=>{const r=s.otherSE;t.set(s,{sine:vg(this.point,e.point,r.point),cosine:xg(this.point,e.point,r.point)})};return(s,r)=>{t.has(s)||n(s),t.has(r)||n(r);const{sine:o,cosine:a}=t.get(s),{sine:l,cosine:c}=t.get(r);return o>=0&&l>=0?a<c?1:a>c?-1:0:o<0&&l<0?a<c?-1:a>c?1:0:l<o?-1:l>o?1:0}}}let Mg=0;class $i{static compare(e,t){const n=e.leftSE.point.x,s=t.leftSE.point.x,r=e.rightSE.point.x,o=t.rightSE.point.x;if(o<n)return 1;if(r<s)return-1;const a=e.leftSE.point.y,l=t.leftSE.point.y,c=e.rightSE.point.y,u=t.rightSE.point.y;if(n<s){if(l<a&&l<c)return 1;if(l>a&&l>c)return-1;const h=e.comparePoint(t.leftSE.point);if(h<0)return 1;if(h>0)return-1;const d=t.comparePoint(e.rightSE.point);return d!==0?d:-1}if(n>s){if(a<l&&a<u)return-1;if(a>l&&a>u)return 1;const h=t.comparePoint(e.leftSE.point);if(h!==0)return h;const d=e.comparePoint(t.rightSE.point);return d<0?1:d>0?-1:1}if(a<l)return-1;if(a>l)return 1;if(r<o){const h=t.comparePoint(e.rightSE.point);if(h!==0)return h}if(r>o){const h=e.comparePoint(t.rightSE.point);if(h<0)return 1;if(h>0)return-1}if(r!==o){const h=c-a,d=r-n,f=u-l,g=o-s;if(h>d&&f<g)return 1;if(h<d&&f>g)return-1}return r>o?1:r<o||c<u?-1:c>u?1:e.id<t.id?-1:e.id>t.id?1:0}constructor(e,t,n,s){this.id=++Mg,this.leftSE=e,e.segment=this,e.otherSE=t,this.rightSE=t,t.segment=this,t.otherSE=e,this.rings=n,this.windings=s}static fromRing(e,t,n){let s,r,o;const a=Tn.comparePoints(e,t);if(a<0)s=e,r=t,o=1;else if(a>0)s=t,r=e,o=-1;else throw new Error(`Tried to create degenerate segment at [${e.x}, ${e.y}]`);const l=new Tn(s,!0),c=new Tn(r,!1);return new $i(l,c,[n],[o])}replaceRightSE(e){this.rightSE=e,this.rightSE.segment=this,this.rightSE.otherSE=this.leftSE,this.leftSE.otherSE=this.rightSE}bbox(){const e=this.leftSE.point.y,t=this.rightSE.point.y;return{ll:{x:this.leftSE.point.x,y:e<t?e:t},ur:{x:this.rightSE.point.x,y:e>t?e:t}}}vector(){return{x:this.rightSE.point.x-this.leftSE.point.x,y:this.rightSE.point.y-this.leftSE.point.y}}isAnEndpoint(e){return e.x===this.leftSE.point.x&&e.y===this.leftSE.point.y||e.x===this.rightSE.point.x&&e.y===this.rightSE.point.y}comparePoint(e){if(this.isAnEndpoint(e))return 0;const t=this.leftSE.point,n=this.rightSE.point,s=this.vector();if(t.x===n.x)return e.x===t.x?0:e.x<t.x?1:-1;const r=(e.y-t.y)/s.y,o=t.x+r*s.x;if(e.x===o)return 0;const a=(e.x-t.x)/s.x,l=t.y+a*s.y;return e.y===l?0:e.y<l?-1:1}getIntersection(e){const t=this.bbox(),n=e.bbox(),s=jl(t,n);if(s===null)return null;const r=this.leftSE.point,o=this.rightSE.point,a=e.leftSE.point,l=e.rightSE.point,c=pr(t,a)&&this.comparePoint(a)===0,u=pr(n,r)&&e.comparePoint(r)===0,h=pr(t,l)&&this.comparePoint(l)===0,d=pr(n,o)&&e.comparePoint(o)===0;if(u&&c)return d&&!h?o:!d&&h?l:null;if(u)return h&&r.x===l.x&&r.y===l.y?null:r;if(c)return d&&o.x===a.x&&o.y===a.y?null:a;if(d&&h)return null;if(d)return o;if(h)return l;const f=yg(r,this.vector(),a,e.vector());return f===null||!pr(s,f)?null:Gr.round(f.x,f.y)}split(e){const t=[],n=e.events!==void 0,s=new Tn(e,!0),r=new Tn(e,!1),o=this.rightSE;this.replaceRightSE(r),t.push(r),t.push(s);const a=new $i(s,o,this.rings.slice(),this.windings.slice());return Tn.comparePoints(a.leftSE.point,a.rightSE.point)>0&&a.swapEvents(),Tn.comparePoints(this.leftSE.point,this.rightSE.point)>0&&this.swapEvents(),n&&(s.checkForConsuming(),r.checkForConsuming()),t}swapEvents(){const e=this.rightSE;this.rightSE=this.leftSE,this.leftSE=e,this.leftSE.isLeft=!0,this.rightSE.isLeft=!1;for(let t=0,n=this.windings.length;t<n;t++)this.windings[t]*=-1}consume(e){let t=this,n=e;for(;t.consumedBy;)t=t.consumedBy;for(;n.consumedBy;)n=n.consumedBy;const s=$i.compare(t,n);if(s!==0){if(s>0){const r=t;t=n,n=r}if(t.prev===n){const r=t;t=n,n=r}for(let r=0,o=n.rings.length;r<o;r++){const a=n.rings[r],l=n.windings[r],c=t.rings.indexOf(a);c===-1?(t.rings.push(a),t.windings.push(l)):t.windings[c]+=l}n.rings=null,n.windings=null,n.consumedBy=t,n.leftSE.consumedBy=t.leftSE,n.rightSE.consumedBy=t.rightSE}}prevInResult(){return this._prevInResult!==void 0?this._prevInResult:(this.prev?this.prev.isInResult()?this._prevInResult=this.prev:this._prevInResult=this.prev.prevInResult():this._prevInResult=null,this._prevInResult)}beforeState(){if(this._beforeState!==void 0)return this._beforeState;if(!this.prev)this._beforeState={rings:[],windings:[],multiPolys:[]};else{const e=this.prev.consumedBy||this.prev;this._beforeState=e.afterState()}return this._beforeState}afterState(){if(this._afterState!==void 0)return this._afterState;const e=this.beforeState();this._afterState={rings:e.rings.slice(0),windings:e.windings.slice(0),multiPolys:[]};const t=this._afterState.rings,n=this._afterState.windings,s=this._afterState.multiPolys;for(let a=0,l=this.rings.length;a<l;a++){const c=this.rings[a],u=this.windings[a],h=t.indexOf(c);h===-1?(t.push(c),n.push(u)):n[h]+=u}const r=[],o=[];for(let a=0,l=t.length;a<l;a++){if(n[a]===0)continue;const c=t[a],u=c.poly;if(o.indexOf(u)===-1)if(c.isExterior)r.push(u);else{o.indexOf(u)===-1&&o.push(u);const h=r.indexOf(c.poly);h!==-1&&r.splice(h,1)}}for(let a=0,l=r.length;a<l;a++){const c=r[a].multiPoly;s.indexOf(c)===-1&&s.push(c)}return this._afterState}isInResult(){if(this.consumedBy)return!1;if(this._isInResult!==void 0)return this._isInResult;const e=this.beforeState().multiPolys,t=this.afterState().multiPolys;switch(kn.type){case"union":{const n=e.length===0,s=t.length===0;this._isInResult=n!==s;break}case"intersection":{let n,s;e.length<t.length?(n=e.length,s=t.length):(n=t.length,s=e.length),this._isInResult=s===kn.numMultiPolys&&n<s;break}case"xor":{const n=Math.abs(e.length-t.length);this._isInResult=n%2===1;break}case"difference":{const n=s=>s.length===1&&s[0].isSubject;this._isInResult=n(e)!==n(t);break}default:throw new Error(`Unrecognized operation type found ${kn.type}`)}return this._isInResult}}class Eu{constructor(e,t,n){if(!Array.isArray(e)||e.length===0)throw new Error("Input geometry is not a valid Polygon or MultiPolygon");if(this.poly=t,this.isExterior=n,this.segments=[],typeof e[0][0]!="number"||typeof e[0][1]!="number")throw new Error("Input geometry is not a valid Polygon or MultiPolygon");const s=Gr.round(e[0][0],e[0][1]);this.bbox={ll:{x:s.x,y:s.y},ur:{x:s.x,y:s.y}};let r=s;for(let o=1,a=e.length;o<a;o++){if(typeof e[o][0]!="number"||typeof e[o][1]!="number")throw new Error("Input geometry is not a valid Polygon or MultiPolygon");let l=Gr.round(e[o][0],e[o][1]);l.x===r.x&&l.y===r.y||(this.segments.push($i.fromRing(r,l,this)),l.x<this.bbox.ll.x&&(this.bbox.ll.x=l.x),l.y<this.bbox.ll.y&&(this.bbox.ll.y=l.y),l.x>this.bbox.ur.x&&(this.bbox.ur.x=l.x),l.y>this.bbox.ur.y&&(this.bbox.ur.y=l.y),r=l)}(s.x!==r.x||s.y!==r.y)&&this.segments.push($i.fromRing(r,s,this))}getSweepEvents(){const e=[];for(let t=0,n=this.segments.length;t<n;t++){const s=this.segments[t];e.push(s.leftSE),e.push(s.rightSE)}return e}}class bg{constructor(e,t){if(!Array.isArray(e))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");this.exteriorRing=new Eu(e[0],this,!0),this.bbox={ll:{x:this.exteriorRing.bbox.ll.x,y:this.exteriorRing.bbox.ll.y},ur:{x:this.exteriorRing.bbox.ur.x,y:this.exteriorRing.bbox.ur.y}},this.interiorRings=[];for(let n=1,s=e.length;n<s;n++){const r=new Eu(e[n],this,!1);r.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=r.bbox.ll.x),r.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=r.bbox.ll.y),r.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=r.bbox.ur.x),r.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=r.bbox.ur.y),this.interiorRings.push(r)}this.multiPoly=t}getSweepEvents(){const e=this.exteriorRing.getSweepEvents();for(let t=0,n=this.interiorRings.length;t<n;t++){const s=this.interiorRings[t].getSweepEvents();for(let r=0,o=s.length;r<o;r++)e.push(s[r])}return e}}class Tu{constructor(e,t){if(!Array.isArray(e))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");try{typeof e[0][0][0]=="number"&&(e=[e])}catch{}this.polys=[],this.bbox={ll:{x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY},ur:{x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY}};for(let n=0,s=e.length;n<s;n++){const r=new bg(e[n],this);r.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=r.bbox.ll.x),r.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=r.bbox.ll.y),r.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=r.bbox.ur.x),r.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=r.bbox.ur.y),this.polys.push(r)}this.isSubject=t}getSweepEvents(){const e=[];for(let t=0,n=this.polys.length;t<n;t++){const s=this.polys[t].getSweepEvents();for(let r=0,o=s.length;r<o;r++)e.push(s[r])}return e}}class ba{static factory(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];if(!r.isInResult()||r.ringOut)continue;let o=null,a=r.leftSE,l=r.rightSE;const c=[a],u=a.point,h=[];for(;o=a,a=l,c.push(a),a.point!==u;)for(;;){const d=a.getAvailableLinkedEvents();if(d.length===0){const y=c[0].point,m=c[c.length-1].point;throw new Error(`Unable to complete output ring starting at [${y.x}, ${y.y}]. Last matching segment found ends at [${m.x}, ${m.y}].`)}if(d.length===1){l=d[0].otherSE;break}let f=null;for(let y=0,m=h.length;y<m;y++)if(h[y].point===a.point){f=y;break}if(f!==null){const y=h.splice(f)[0],m=c.splice(y.index);m.unshift(m[0].otherSE),t.push(new ba(m.reverse()));continue}h.push({index:c.length,point:a.point});const g=a.getLeftmostComparator(o);l=d.sort(g)[0].otherSE;break}t.push(new ba(c))}return t}constructor(e){this.events=e;for(let t=0,n=e.length;t<n;t++)e[t].segment.ringOut=this;this.poly=null}getGeom(){let e=this.events[0].point;const t=[e];for(let c=1,u=this.events.length-1;c<u;c++){const h=this.events[c].point,d=this.events[c+1].point;bu(h,e,d)!==0&&(t.push(h),e=h)}if(t.length===1)return null;const n=t[0],s=t[1];bu(n,e,s)===0&&t.shift(),t.push(t[0]);const r=this.isExteriorRing()?1:-1,o=this.isExteriorRing()?0:t.length-1,a=this.isExteriorRing()?t.length:-1,l=[];for(let c=o;c!=a;c+=r)l.push([t[c].x,t[c].y]);return l}isExteriorRing(){if(this._isExteriorRing===void 0){const e=this.enclosingRing();this._isExteriorRing=e?!e.isExteriorRing():!0}return this._isExteriorRing}enclosingRing(){return this._enclosingRing===void 0&&(this._enclosingRing=this._calcEnclosingRing()),this._enclosingRing}_calcEnclosingRing(){let e=this.events[0];for(let s=1,r=this.events.length;s<r;s++){const o=this.events[s];Tn.compare(e,o)>0&&(e=o)}let t=e.segment.prevInResult(),n=t?t.prevInResult():null;for(;;){if(!t)return null;if(!n)return t.ringOut;if(n.ringOut!==t.ringOut)return n.ringOut.enclosingRing()!==t.ringOut?t.ringOut:t.ringOut.enclosingRing();t=n.prevInResult(),n=t?t.prevInResult():null}}}class Au{constructor(e){this.exteriorRing=e,e.poly=this,this.interiorRings=[]}addInterior(e){this.interiorRings.push(e),e.poly=this}getGeom(){const e=[this.exteriorRing.getGeom()];if(e[0]===null)return null;for(let t=0,n=this.interiorRings.length;t<n;t++){const s=this.interiorRings[t].getGeom();s!==null&&e.push(s)}return e}}class Sg{constructor(e){this.rings=e,this.polys=this._composePolys(e)}getGeom(){const e=[];for(let t=0,n=this.polys.length;t<n;t++){const s=this.polys[t].getGeom();s!==null&&e.push(s)}return e}_composePolys(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];if(!r.poly)if(r.isExteriorRing())t.push(new Au(r));else{const o=r.enclosingRing();o.poly||t.push(new Au(o)),o.poly.addInterior(r)}}return t}}class wg{constructor(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:$i.compare;this.queue=e,this.tree=new ch(t),this.segments=[]}process(e){const t=e.segment,n=[];if(e.consumedBy)return e.isLeft?this.queue.remove(e.otherSE):this.tree.remove(t),n;const s=e.isLeft?this.tree.add(t):this.tree.find(t);if(!s)throw new Error(`Unable to find segment #${t.id} [${t.leftSE.point.x}, ${t.leftSE.point.y}] -> [${t.rightSE.point.x}, ${t.rightSE.point.y}] in SweepLine tree.`);let r=s,o=s,a,l;for(;a===void 0;)r=this.tree.prev(r),r===null?a=null:r.key.consumedBy===void 0&&(a=r.key);for(;l===void 0;)o=this.tree.next(o),o===null?l=null:o.key.consumedBy===void 0&&(l=o.key);if(e.isLeft){let c=null;if(a){const h=a.getIntersection(t);if(h!==null&&(t.isAnEndpoint(h)||(c=h),!a.isAnEndpoint(h))){const d=this._splitSafely(a,h);for(let f=0,g=d.length;f<g;f++)n.push(d[f])}}let u=null;if(l){const h=l.getIntersection(t);if(h!==null&&(t.isAnEndpoint(h)||(u=h),!l.isAnEndpoint(h))){const d=this._splitSafely(l,h);for(let f=0,g=d.length;f<g;f++)n.push(d[f])}}if(c!==null||u!==null){let h=null;c===null?h=u:u===null?h=c:h=Tn.comparePoints(c,u)<=0?c:u,this.queue.remove(t.rightSE),n.push(t.rightSE);const d=t.split(h);for(let f=0,g=d.length;f<g;f++)n.push(d[f])}n.length>0?(this.tree.remove(t),n.push(e)):(this.segments.push(t),t.prev=a)}else{if(a&&l){const c=a.getIntersection(l);if(c!==null){if(!a.isAnEndpoint(c)){const u=this._splitSafely(a,c);for(let h=0,d=u.length;h<d;h++)n.push(u[h])}if(!l.isAnEndpoint(c)){const u=this._splitSafely(l,c);for(let h=0,d=u.length;h<d;h++)n.push(u[h])}}}this.tree.remove(t)}return n}_splitSafely(e,t){this.tree.remove(e);const n=e.rightSE;this.queue.remove(n);const s=e.split(t);return s.push(n),e.consumedBy===void 0&&this.tree.add(e),s}}const Ru=typeof process<"u"&&zf.POLYGON_CLIPPING_MAX_QUEUE_SIZE||1e6,Eg=typeof process<"u"&&zf.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS||1e6;class Tg{run(e,t,n){kn.type=e,Gr.reset();const s=[new Tu(t,!0)];for(let h=0,d=n.length;h<d;h++)s.push(new Tu(n[h],!1));if(kn.numMultiPolys=s.length,kn.type==="difference"){const h=s[0];let d=1;for(;d<s.length;)jl(s[d].bbox,h.bbox)!==null?d++:s.splice(d,1)}if(kn.type==="intersection")for(let h=0,d=s.length;h<d;h++){const f=s[h];for(let g=h+1,y=s.length;g<y;g++)if(jl(f.bbox,s[g].bbox)===null)return[]}const r=new ch(Tn.compare);for(let h=0,d=s.length;h<d;h++){const f=s[h].getSweepEvents();for(let g=0,y=f.length;g<y;g++)if(r.insert(f[g]),r.size>Ru)throw new Error("Infinite loop when putting segment endpoints in a priority queue (queue size too big).")}const o=new wg(r);let a=r.size,l=r.pop();for(;l;){const h=l.key;if(r.size===a){const f=h.segment;throw new Error(`Unable to pop() ${h.isLeft?"left":"right"} SweepEvent [${h.point.x}, ${h.point.y}] from segment #${f.id} [${f.leftSE.point.x}, ${f.leftSE.point.y}] -> [${f.rightSE.point.x}, ${f.rightSE.point.y}] from queue.`)}if(r.size>Ru)throw new Error("Infinite loop when passing sweep line over endpoints (queue size too big).");if(o.segments.length>Eg)throw new Error("Infinite loop when passing sweep line over endpoints (too many sweep line segments).");const d=o.process(h);for(let f=0,g=d.length;f<g;f++){const y=d[f];y.consumedBy===void 0&&r.insert(y)}a=r.size,l=r.pop()}Gr.reset();const c=ba.factory(o.segments);return new Sg(c).getGeom()}}const kn=new Tg,Ag=function(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return kn.run("union",i,t)},Rg=function(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return kn.run("intersection",i,t)},Cg=function(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return kn.run("xor",i,t)},Pg=function(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return kn.run("difference",i,t)};var Lg={union:Ag,intersection:Rg,xor:Cg,difference:Pg};const Wi=2*Math.PI,Zi=(i,e)=>[i[0]*Math.cos(e)-i[1]*Math.sin(e),i[0]*Math.sin(e)+i[1]*Math.cos(e)],fn=(i,e)=>{const t=Zi(i,e.angle);return[t[0]+e.origin[0],t[1]+e.origin[1]]},Ig=(i,e)=>({origin:fn(e.origin,i),angle:i.angle+e.angle}),qs=i=>i.reduce((e,t,n)=>{const s=i[(n+1)%i.length];return e+t[0]*s[1]-t[1]*s[0]},0)/2;function Bt(i,e=[0,0],t=!1){if(!Number.isFinite(i)||i<=0||i>1e3||e.some(s=>!Number.isFinite(s)))throw Error("Circle needs a positive bounded radius and finite centre.");const n=Math.max(24,Math.ceil(Math.PI/Math.acos(1-Math.min(.01/i,1))));return Array.from({length:n},(s,r)=>{const o=(t?-1:1)*Wi*r/n;return[e[0]+i*Math.cos(o),e[1]+i*Math.sin(o)]})}function Ts(i,e,t,n){return[[i,e],[i+t,e],[i+t,e+n],[i,e+n]]}function ol(i,e,t){if(!(i>=5&&i<=600&&e>=3&&e<=60&&t>=1&&t<=8&&e>=2*t+2&&i>=2*t+1))throw Error("Link bores need at least1mm side material and1mm between bores.");const n=e/2,s=Math.max(12,Math.ceil(Math.PI/(2*Math.acos(1-.01/n)))),r=[];for(let o=0;o<=s;o++){const a=-Math.PI/2+o*Math.PI/s;r.push([i+n*Math.cos(a),n*Math.sin(a)])}for(let o=0;o<=s;o++){const a=Math.PI/2+o*Math.PI/s;r.push([n*Math.cos(a),n*Math.sin(a)])}return{outer:r,holes:[Bt(t,[0,0],!0),Bt(t,[i,0],!0)]}}function Vr(i){let e=1/0,t=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)e=Math.min(e,r),t=Math.min(t,o),n=Math.max(n,r),s=Math.max(s,o);return[e,t,n,s]}function Cu(i,e){const t=s=>[s.outer,...s.holes].map(r=>r.map(o=>[o[0],o[1]]));return Lg.intersection(t(i),t(e)).reduce((s,r)=>s+Math.abs(qs(r[0]))-r.slice(1).reduce((o,a)=>o+Math.abs(qs(a)),0),0)}const Dg=Object.freeze({cam:4,"four-bar":3,"slider-crank":5,gears:2}),tn=(i,e,t)=>({ok:!1,issues:[{code:i,severity:"error",message:e,...t?{part:t}:{}}]}),Di=i=>typeof i=="number"&&Number.isFinite(i),Pu=i=>Array.isArray(i)&&i.length===2&&i.every(e=>Di(e)&&Math.abs(e)<=1e3),Ql=(i,e)=>e?Ql(e,i%e):i,Ng={origin:[0,0],angle:0},Lu=i=>(i%Wi+Wi)%Wi;function Gf(i){if(i&&typeof i=="object"&&!Object.isFrozen(i)){Object.freeze(i);for(const e of Object.values(i))Gf(e)}return i}function Ug(i){if(i.mechanism.kind!=="slider-crank")throw Error("Expected slider.");const e=i.mechanism.parameters,t=e.rod>e.crank+Math.abs(e.guideOffset),n=t?Math.sqrt((e.rod-e.crank)**2-e.guideOffset**2):-e.crank,s=t?Math.sqrt((e.rod+e.crank)**2-e.guideOffset**2):e.crank+e.rod;return e.branch===1?[n,s]:[-s,-n]}function kg(i){try{const e=i;if(!e||e.version!==1||typeof e.title!="string"||e.title.length>120||!e.motor||!Pu(e.motor.origin)||!Di(e.motor.angleOffset)||Math.abs(e.motor.angleOffset)>1e6||!Di(e.thickness)||e.thickness<1||e.thickness>10||!Array.isArray(e.modules)||e.modules.length<1||e.modules.length>8)return tn("project","Use version1, one finite motor, stock1–10mm and1–8 modules.");const t={version:1,title:e.title,motor:{origin:[...e.motor.origin],angleOffset:e.motor.angleOffset},thickness:e.thickness,modules:[]},n=[],s=new Set,r={},o={};for(const x of e.modules){if(!x||typeof x.id!="string"||!/^[A-Za-z][A-Za-z0-9_-]{0,47}$/.test(x.id)||x.id==="motor"||s.has(x.id)||!x.placement||!Pu(x.placement.origin)||!Di(x.placement.angle)||Math.abs(x.placement.angle)>1e6||!x.drive||typeof x.drive.source!="string"||x.drive.source.length>48||!Di(x.drive.phase)||Math.abs(x.drive.phase)>16*Wi||!Number.isInteger(x.layer)||x.layer<0||x.layer>64||!Di(x.width)||x.width<3||x.width>30||!Di(x.boreRadius)||x.boreRadius<1||x.boreRadius>8||x.width<2*x.boreRadius+2)return tn("module","Module IDs, placement, drive, layer or link material dimensions are invalid.");s.add(x.id);const S=x.mechanism;if(!S||!S.parameters)return tn("mechanism","Each module needs a supported mechanism.",x.id);let _;if(S.kind==="four-bar"){const b=S.parameters;_={kind:S.kind,parameters:{ground:b.ground,crank:b.crank,coupler:b.coupler,rocker:b.rocker,branch:b.branch}}}else if(S.kind==="slider-crank"){const b=S.parameters;_={kind:S.kind,parameters:{crank:b.crank,rod:b.rod,guideOffset:b.guideOffset,branch:b.branch}}}else if(S.kind==="gears"){const b=S.parameters;_={kind:S.kind,parameters:{module:b.module,teethA:b.teethA,teethB:b.teethB,boreRadius:b.boreRadius}}}else if(S.kind==="cam"){const b=S.parameters;if(!Array.isArray(b.knots)||b.knots.length>64)return tn("cam-motion","Cam motion needs at most64 knots.",x.id);_={kind:S.kind,parameters:{follower:{kind:b.follower?.kind},baseRadius:b.baseRadius,rollerRadius:b.rollerRadius,boreRadius:b.boreRadius,pressureLimit:b.pressureLimit,knots:b.knots.map(R=>({phase:R?.phase,lift:R?.lift}))}}}else return tn("mechanism","Unsupported mechanism.",x.id);let w;if(_.kind==="four-bar")w=ya(_.parameters);else if(_.kind==="slider-crank")w=Bf(_.parameters);else if(_.kind==="gears"){const b=tg(_.parameters);w=b,b.ok&&(o[x.id]=b.value)}else if(_.kind==="cam"){const b=Qm(_.parameters);w=b,b.ok&&(r[x.id]=b.value)}else return tn("mechanism","Only four-bar, slider-crank, gears and translating cam modules are supported.",x.id);if(!w.ok)return{ok:!1,issues:w.issues.map(b=>({...b,part:x.id}))};if((_.kind==="gears"||_.kind==="cam")&&_.parameters.boreRadius!==x.boreRadius)return tn("shaft-bore","Module and mechanism shaft bore radii must agree.",x.id);(_.kind==="four-bar"||_.kind==="slider-crank")&&!w.value.fullRotation&&n.push({code:"restricted-motion",severity:"warning",message:"This linkage cannot make a regular full turn; invalid phases will stop playback.",part:x.id}),n.push(...w.issues.map(b=>({...b,part:x.id}))),t.modules.push({id:x.id,mechanism:structuredClone(_),placement:{origin:[...x.placement.origin],angle:x.placement.angle},drive:{source:x.drive.source,phase:x.drive.phase},layer:x.layer,width:x.width,boreRadius:x.boreRadius})}const a=new Map(t.modules.map(x=>[x.id,x])),l=[],c=new Set,u=new Set,h=x=>{if(!u.has(x.id)){if(c.has(x.id))throw Error("Drive graph contains a cycle.");if(c.add(x.id),x.drive.source!=="motor"){const S=a.get(x.drive.source);if(!S||S.mechanism.kind!=="gears")throw Error("A drive must reference the motor or an existing gear output.");h(S)}c.delete(x.id),u.add(x.id),l.push(x)}};for(const x of t.modules)h(x);const d=l.filter(x=>x.drive.source==="motor");if(!d.length)return tn("drive-graph","Every assembly must connect to its motor.");const f=d[0].boreRadius,g=new Map([["motor",[1,1]]]);let y=1;for(const x of l){const S=a.get(x.drive.source),_=S?fn([o[S.id].centerDistance,0],S.placement):t.motor.origin;if(Math.hypot(x.placement.origin[0]-_[0],x.placement.origin[1]-_[1])>1e-7)return tn("shaft-position","Driven input shaft must coincide with its source shaft; no hidden belt connects displaced modules.",x.id);if(x.boreRadius!==(S?.boreRadius??f))return tn("shaft-bore","Parts sharing a shaft must use the same bore radius.",x.id);let[w,b]=g.get(x.drive.source);if(x.mechanism.kind==="gears"){w*=x.mechanism.parameters.teethA,b*=x.mechanism.parameters.teethB;const R=Ql(w,b);w/=R,b/=R,g.set(x.id,[w,b])}if(!Number.isSafeInteger(w)||!Number.isSafeInteger(b)){y=1/0;continue}Number.isFinite(y)&&(y=y/Ql(y,b)*b,y>120&&(y=1/0))}Number.isFinite(y)||n.push({code:"long-cycle",severity:"warning",message:"The whole sculpture period exceeds120 motor turns; a shorter interference scan covers only its stated range."});const m={};for(const x of l){const S=(b,R,M,A,C)=>{const L=`${x.id}/${b}`;m[L]={id:L,label:R,outer:M,holes:A,layer:x.layer+C,thickness:t.thickness}},_=(b,R,M,A=x.width,C=x.boreRadius)=>{const L=ol(R,A,C);S(b,`${x.id} ${b}`,L.outer,L.holes,M)},w=x.mechanism;if(w.kind==="four-bar"){const b=w.parameters;_("ground",b.ground,0),_("crank",b.crank,1),_("coupler",b.coupler,2),_("rocker",b.rocker,1)}else if(w.kind==="gears"){const b=o[x.id];S("base",`${x.id} shaft support`,ol(b.centerDistance,x.width,x.boreRadius).outer,[Bt(x.boreRadius,[0,0],!0),Bt(x.boreRadius,[b.centerDistance,0],!0)],0),S("gear-a",`${x.id} input gear`,b.a.outer,b.a.holes,1),S("gear-b",`${x.id} output gear`,b.b.outer,b.b.holes,1)}else if(w.kind==="cam"){const b=w.parameters,R=r[x.id],M=Math.max(...b.knots.map(k=>k.lift)),A=Math.min(1.5,b.rollerRadius/2),C=b.baseRadius+b.rollerRadius+M+12,L=x.width/2+2.5;S("cam",`${x.id} cam`,R.outer,R.holes,1),S("roller",`${x.id} roller`,Bt(b.rollerRadius),[Bt(A,[0,0],!0)],1),_("follower",M+40,2,x.width,A);const I=ol(C+8,x.width+10,x.boreRadius);S("base",`${x.id} shaft and guide support`,I.outer,[Bt(x.boreRadius,[0,0],!0),Bt(1,[C+8,-L],!0),Bt(1,[C+8,L],!0)],0);for(const[k,N]of[["guide-left",-1],["guide-right",1]])S(k,`${x.id} ${k}`,Ts(N*L-1.5,C,3,16),[Bt(1,[N*L,C+8],!0)],2);S("guide-cap",`${x.id} guide bridge`,Ts(-L-1.5,C+5,2*L+3,6),[Bt(1,[-L,C+8],!0),Bt(1,[L,C+8],!0)],3)}else{const b=w.parameters,[R,M]=Ug(x),A=Math.max(8,x.boreRadius+1),C=R-A,L=M+A,I=x.width/2+2.5;_("crank",b.crank,1),_("rod",b.rod,2),S("slider",`${x.id} carriage`,Ts(-A,-x.width/2,2*A,x.width),[Bt(x.boreRadius,[0,0],!0)],3);const k=Math.min(-x.width/2-3,C-3),N=Math.min(-x.width/2-3,b.guideOffset-I-3),B=Math.max(x.width/2+3,L+3),H=Math.max(x.width/2+3,b.guideOffset+I+3);S("base",`${x.id} ground and guide support`,Ts(k,N,B-k,H-N),[Bt(x.boreRadius,[0,0],!0),...[-1,1].flatMap(G=>[Bt(1,[C,b.guideOffset+G*I],!0),Bt(1,[L,b.guideOffset+G*I],!0)])],0);for(const[G,j]of[["rail-low",-1],["rail-high",1]])S(G,`${x.id} ${G}`,Ts(C-3,b.guideOffset+j*I-1.5,L-C+6,3),[Bt(1,[C,b.guideOffset+j*I],!0),Bt(1,[L,b.guideOffset+j*I],!0)],3);for(const[G,j]of[["cap-start",C],["cap-end",L]])S(G,`${x.id} ${G}`,Ts(j-3,b.guideOffset-I-3,6,2*I+6),[-1,1].map(Y=>Bt(1,[j,b.guideOffset+Y*I],!0)),4)}}for(const x of Object.values(m)){if(qs(x.outer)<=0||x.holes.some(S=>qs(S)>=0))return tn("part-winding","Part material contours have invalid winding.",x.id);for(let S=0;S<x.holes.length;S++){const _={outer:[...x.holes[S]].reverse(),holes:[]};if(Math.abs(Cu(_,{outer:x.outer,holes:[]})-Math.abs(qs(_.outer)))>1e-6)return tn("part-hole","A bore extends outside its part.",x.id);for(let w=0;w<S;w++)if(Cu(_,{outer:[...x.holes[w]].reverse(),holes:[]})>1e-6)return tn("part-hole","Mounting bores overlap; change the dimensions or guide offset.",x.id)}}const p={project:t,order:l,parts:m,cams:r,gears:o,cycleTurns:Number.isFinite(y)?y:null,issues:n};return{ok:!0,value:Gf(p),issues:n}}catch(e){return tn("assembly",e instanceof Error?e.message:String(e))}}function $r(i,e){if(!Di(e)||Math.abs(e)>1e6)return tn("motor-angle","Motor angle must be finite and within±1,000,000radians.");const t={motor:{position:i.project.motor.origin,angle:e+i.project.motor.angleOffset}},n=[],s={},r=[],o=[];for(const a of i.order){const l=t[a.drive.source],c=l.angle+a.drive.phase-a.placement.angle,u=Lu(c),h=a.mechanism,d=(f,g=Ng)=>n.push({part:i.parts[`${a.id}/${f}`],pose:Ig(a.placement,g),module:a.id});if(h.kind==="four-bar"||h.kind==="slider-crank"){const f=h.kind==="four-bar"?ng(h.parameters,u):ig(h.parameters,u);if(!f.ok)return{ok:!1,issues:f.issues.map(g=>({...g,part:a.id}))};o.push(...f.issues.map(g=>({...g,part:a.id}))),s[a.id]={...f.value.outputs,crankAngle:c};for(const g of f.value.links)d(g.id,{origin:g.a,angle:g.angle});if(h.kind==="slider-crank"){d("slider",{origin:f.value.joints.S,angle:0});for(const g of["base","rail-low","rail-high","cap-start","cap-end"])d(g)}}else if(h.kind==="gears"){const f=h.parameters,g=Math.PI-Math.PI/f.teethB-f.teethA/f.teethB*c,y=[i.gears[a.id].centerDistance,0];d("base"),d("gear-a",{origin:[0,0],angle:u}),d("gear-b",{origin:y,angle:Lu(g)}),t[a.id]={position:fn(y,a.placement),angle:g+a.placement.angle},s[a.id]={inputAngle:c,outputAngle:g},r.push([`${a.id}/gear-a`,`${a.id}/gear-b`])}else{const f=Jm(h.parameters,u);if(!f.ok)return f;const g=h.parameters,y=g.baseRadius+g.rollerRadius+f.value.lift;d("cam",{origin:[0,0],angle:u}),d("roller",{origin:[0,y],angle:0}),d("follower",{origin:[0,y],angle:Math.PI/2}),d("base",{origin:[0,0],angle:Math.PI/2});for(const m of["guide-left","guide-right","guide-cap"])d(m);s[a.id]={lift:f.value.lift,inputAngle:c,pressureAngle:f.value.pressureAngle},r.push([`${a.id}/cam`,`${a.id}/roller`])}}return{ok:!0,value:{parts:n,shafts:t,outputs:s,intendedContacts:r},issues:o}}const Fg=.0100001;function hh(i){if(!i||!Array.isArray(i.modules)||i.modules.length>8)throw new RangeError("Shaft planning needs at most eight validated modules.");const e=Object.create(null),t=(n,s)=>{if(typeof n!="string"||!n.length||n.length>48||!Number.isInteger(s)||s<0||s>64)throw new RangeError("Invalid shaft mount.");const r=e[n];e[n]=r?[Math.min(r[0],s),Math.max(r[1],s+1)]:[s,s+1]};for(const n of i.modules)t(n.drive.source,n.layer),n.mechanism.kind==="gears"&&t(n.id,n.layer);return e}const Iu=(i,e)=>{let t=!1;for(let n=0,s=e.length-1;n<e.length;s=n++){const[r,o]=e[n],[a,l]=e[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(t=!t)}return t},Du=(i,e)=>{let t=1/0;for(let n=0,s=e.length-1;n<e.length;s=n++){const r=e[s],o=e[n],a=o[0]-r[0],l=o[1]-r[1],c=Math.max(0,Math.min(1,((i[0]-r[0])*a+(i[1]-r[1])*l)/(a*a+l*l||1)));t=Math.min(t,Math.hypot(r[0]+a*c-i[0],r[1]+l*c-i[1]))}return t},Og=(i,e)=>{const t=e[0]-i.pose.origin[0],n=e[1]-i.pose.origin[1],s=Math.cos(i.pose.angle),r=Math.sin(i.pose.angle);return[t*s+n*r,-t*r+n*s]};function Bg(i,e,t,n){const s=Math.max(0,t-Fg);if(e[0]<n[0]-s||e[0]>n[2]+s||e[1]<n[1]-s||e[1]>n[3]+s)return!1;for(const r of i.part.holes)if(Iu(e,r))return Du(e,r)<s;return Iu(e,i.part.outer)||Du(e,i.part.outer)<s}const al=i=>Array.isArray(i)&&i.length===2&&i.every(e=>Number.isFinite(e)&&Math.abs(e)<=1e4);function zg(i,e){if(!Array.isArray(e)||e.length<1||e.length>720)throw new RangeError("Supply 1–720 solved shaft samples.");const t=hh(i),n=Object.create(null),s=[],r=new Set;for(const c of i.modules){if(!Number.isFinite(c.boreRadius)||c.boreRadius<1||c.boreRadius>8)throw new RangeError("Invalid shaft radius.");n[c.drive.source]=c.boreRadius,c.mechanism.kind==="gears"&&(n[c.id]=c.boreRadius)}let o,a;const l=new Map;for(const c of e){if(!c||!Number.isFinite(c.angle)||!Array.isArray(c.parts)||c.parts.length>64||!c.shafts)throw new RangeError("Invalid shaft sample.");const u=new Set;for(const h of c.parts){if(!h?.part||typeof h.part.id!="string"||u.has(h.part.id)||!Number.isInteger(h.part.layer)||h.part.layer<0||h.part.layer>68||!h.pose||!al(h.pose.origin)||!Number.isFinite(h.pose.angle))throw new RangeError("Invalid shaft sample part.");if(u.add(h.part.id),!l.has(h.part)){if(!Array.isArray(h.part.outer)||!Array.isArray(h.part.holes)||h.part.holes.length>128)throw new RangeError("Invalid shaft contour.");const d=[h.part.outer,...h.part.holes];let f=0;for(const g of d)if(!Array.isArray(g)||g.length<3||(f+=g.length)>8192||!g.every(al))throw new RangeError("Invalid shaft contour.");l.set(h.part,Vr(h.part.outer))}}for(const[h,[d,f]]of Object.entries(t)){const g=c.shafts[h];if(!g||!al(g.position))throw new RangeError("Missing or invalid sampled shaft.");for(const y of c.parts){const m=y.part.layer,p=m>=d&&m<=f;if(!p&&h!=="motor"||!Bg(y,Og(y,g.position),n[h],l.get(y.part)))continue;const x={shaft:h,part:y.part.id,module:y.module,layer:m,phase:c.angle,kind:p?"rod":"crank"};if(p){const S=JSON.stringify([h,y.part.id]);r.has(S)||(r.add(S),s.push(x))}else m>f?o??=x:a??=x}}}return o&&a&&s.push(o,a),{spans:t,crank:o&&!a?"back":"front",clashes:s}}const Hg=17,Vf=30,Rn=3.6,$f=2.6,As=4,Wt=i=>String(Number(i.toFixed(6))),vn=i=>String(Number(i.toFixed(3))),fo=i=>i.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ud800-\udfff\ufffe\uffff]/gu,"�").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[e]),cn=(i,e,t,n="")=>`<text x="${Wt(i)}" y="${Wt(e)}" font-family="monospace" font-size="${$f}" fill="#24568a" ${n}>${fo(t)}</text>`,Nu=(i,e)=>i.map((t,n)=>{const s=e(t);return`${n?"L":"M"}${Wt(s[0])},${Wt(s[1])}`}).join(" ")+" Z",Ni=(i,e,t,n)=>`<path d="M${Wt(i)},${Wt(e)} L${Wt(t)},${Wt(n)}" fill="none" stroke="#24568a" stroke-width="0.18"/>`,Wf=(i,e)=>Ni(i-1.5,e,i+1.5,e)+Ni(i,e-1.5,i,e+1.5),Xf=(i,e,t,n)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${Wt(i)}mm" height="${Wt(e)}mm" viewBox="0 0 ${Wt(i)} ${Wt(e)}"><title>${fo(t)}</title><rect width="100%" height="100%" fill="white"/>${n}</svg>`;function Zs(i,e){const t=Math.max(1,Math.floor(e/$f)),n=[];let s="";for(const r of i.trim().split(/\s+/)){const o=Array.from(r);if(s&&Array.from(s).length+1+o.length<=t){s+=` ${r}`;continue}for(s&&(n.push(s),s="");o.length>t;)n.push(o.splice(0,t).join(""));s=o.join("")}return s&&n.push(s),n.length?n:[""]}function ec(i){if(!Array.isArray(i)||i.length!==2||i.some(e=>typeof e!="number"||!Number.isFinite(e)||Math.abs(e)>1e6))throw new Error("Contours and placements need finite bounded millimetre coordinates.")}function Yf(i){if(!Array.isArray(i)||i.length<1||i.length>128)throw new Error("Export needs 1–128 validated core parts.");const e=new Set;let t=0;for(const n of i){if(!n||typeof n.id!="string"||!n.id||n.id.length>160||e.has(n.id)||typeof n.label!="string"||n.label.length>320)throw new Error("Part IDs must be unique and bounded, with bounded text labels.");if(e.add(n.id),!Number.isInteger(n.layer)||n.layer<0||n.layer>128||!Number.isFinite(n.thickness)||n.thickness<1||n.thickness>10)throw new Error("Parts need nonnegative bounded layer slots and stock thickness of 1–10 mm.");if(!Array.isArray(n.outer)||!Array.isArray(n.holes)||n.holes.length>128)throw new Error("Parts need outer contours and bounded hole lists.");for(const[s,r]of[n.outer,...n.holes].entries()){if(!Array.isArray(r)||r.length<3||r.length>16384)throw new Error("Contour rings need 3–16384 points.");if(t+=r.length,t>1e6)throw new Error("Export exceeds its one-million-vertex budget.");for(const a of r)ec(a);const o=qs(r);if(!Number.isFinite(o)||(s===0?o<=1e-10:o>=-1e-10))throw new Error("Validated contours need counterclockwise outer rings and clockwise holes.")}}}function Gg(i){if(i.length<12)return null;const e=[i.reduce((s,r)=>s+r[0],0)/i.length,i.reduce((s,r)=>s+r[1],0)/i.length],t=Math.hypot(i[0][0]-e[0],i[0][1]-e[1]);if(t<=0||i.some(s=>Math.abs(Math.hypot(s[0]-e[0],s[1]-e[1])-t)>1e-6))return null;const n=-2*Math.PI/i.length;return i.some((s,r)=>{const o=i[(r+1)%i.length],a=[s[0]-e[0],s[1]-e[1]],l=[o[0]-e[0],o[1]-e[1]];return Math.abs(Math.atan2(a[0]*l[1]-a[1]*l[0],a[0]*l[0]+a[1]*l[1])-n)>1e-6})?null:{center:e,radius:t}}function Vg(i,e={}){try{if(Yf(i),!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid parts-sheet options.");const t={paper:"A4",orientation:"portrait",margin:10,scale:1,title:"Automata parts",...e};if(!["A4","Letter"].includes(t.paper)||!["portrait","landscape"].includes(t.orientation)||!Number.isFinite(t.margin)||t.margin<5||t.margin>40||!Number.isFinite(t.scale)||t.scale<.25||t.scale>2||typeof t.title!="string"||t.title.length>160)throw new Error("Use A4/Letter, portrait/landscape, 5–40 mm margins and one global scale of 25–200%.");let[n,s]=t.paper==="A4"?[210,297]:[215.9,279.4];t.orientation==="landscape"&&([n,s]=[s,n]);const r=Math.max(Hg,Zs(t.title,n-2*t.margin).length*Rn+9),o=t.margin,a=t.margin+r,l=n-2*t.margin,c=s-2*t.margin-r-Vf,u=[],h=[],d=i.map(f=>{const g={id:f.id,label:f.label,layer:f.layer,thickness:f.thickness,outer:f.outer.map(m=>[m[0],m[1]]),holes:f.holes.map(m=>m.map(p=>[p[0],p[1]]))},y=g.holes.map(Gg);return[0,90].map(m=>{const p=Vr(g.outer.map(R=>Zi(R,m*Math.PI/180))),x=(p[2]-p[0])*t.scale,S=(p[3]-p[1])*t.scale,_=Math.max(64,x+16),b=[`${g.id}: ${g.label}`,`Layer ${g.layer}; stock ${vn(g.thickness)} mm`,...y.map((R,M)=>R?`Bore ${M+1}: diameter ${vn(2*R.radius*t.scale)} mm`:`Opening ${M+1}: polygon; follow red contour`)].flatMap(R=>Zs(R,_-4));return{part:g,x:0,y:0,rotation:m,width:_,height:Math.max(S,22)+b.length*Rn+3+10,outlineWidth:x,outlineHeight:S,labelLines:b,bores:y}})}).sort((f,g)=>Math.min(...g.map(y=>y.width*y.height))-Math.min(...f.map(y=>y.width*y.height)));for(const f of d){if(!f.some(y=>y.width<=l+1e-7&&y.height<=c+1e-7))return{ok:!1,issues:[{code:"sheet-fit",severity:"error",part:f[0].part.id,message:`${f[0].part.id}, including its dimensions and labels, does not fit ${t.paper} ${t.orientation}. Choose landscape or reduce the one global scale; parts are never individually shrunk or split.`}]};let g=!1;for(let y=0;y<=u.length&&!g;y++){if(y===u.length){if(u.length>=128)throw new Error("Export is limited to 128 sheets.");u.push({width:n,height:s,placements:[]}),h.push([[o,a,l,c]])}for(let m=0;m<h[y].length&&!g;m++)for(const p of f){const[x,S,_,w]=h[y][m];if(!(p.width>_+1e-7||p.height>w+1e-7)){u[y].placements.push({...p,x,y:S}),h[y].splice(m,1),_>p.width+As&&h[y].push([x+p.width+As,S,_-p.width-As,p.height]),w>p.height+As&&h[y].push([x,S+p.height+As,_,w-p.height-As]),g=!0;break}}}}return{ok:!0,value:{options:t,sheets:u,partCount:i.length},issues:[]}}catch(t){return{ok:!1,issues:[{code:"export-input",severity:"error",message:t.message}]}}}function qf(i,e){return`<g data-role="cut" data-part="${fo(i.id)}" fill="none" stroke-width="0.15"><path data-contour="outer" stroke="#111111" d="${Nu(i.outer,e)}"/>${i.holes.map((t,n)=>`<path data-contour="hole" data-hole="${n+1}" stroke="#c02828" d="${Nu(t,e)}"/>`).join("")}</g>`}function Zf(i,e){return`<g data-role="calibration"><rect x="${Wt(i)}" y="${Wt(e)}" width="20" height="20" fill="none" stroke="#24568a" stroke-width="0.2"/>${cn(i+10,e+10,"20 mm",'text-anchor="middle"')}</g>`}function $g(i,e){if(!Number.isInteger(e)||e<0||e>=i.sheets.length)throw new RangeError("No such prepared parts sheet.");const t=i.sheets[e],{margin:n,scale:s,title:r}=i.options,o=Zs(r,t.width-2*n);let a=o.map((u,h)=>cn(n,n+3+h*Rn,u)).join("")+cn(n,n+o.length*Rn+4,`Parts sheet ${e+1}/${i.sheets.length}; XY scale ${vn(s*100)}%`);for(const u of t.placements){const{part:h,rotation:d,x:f,y:g,outlineWidth:y,outlineHeight:m,labelLines:p}=u,x=d*Math.PI/180,S=Vr(h.outer.map(R=>Zi(R,x))),_=f+2+(u.width-16-y)/2,w=g+p.length*Rn+3+(Math.max(m,22)-m)/2,b=R=>{const M=Zi(R,x);return[_+s*(M[0]-S[0]),w+s*(S[3]-M[1])]};a+=`<g data-role="part" data-part="${fo(h.id)}">`+p.map((R,M)=>cn(f+2,g+3+M*Rn,R)).join("")+qf(h,b),a+=`<g data-role="dimensions">${Ni(_,w+m+3,_+y,w+m+3)}${Ni(_,w+m+2,_,w+m+4)}${Ni(_+y,w+m+2,_+y,w+m+4)}${cn(_+y/2,w+m+7,`${vn(y)} mm`,'text-anchor="middle"')}`,a+=Ni(_+y+3,w,_+y+3,w+m)+Ni(_+y+2,w,_+y+4,w)+Ni(_+y+2,w+m,_+y+4,w+m),a+=cn(_+y+7,w+m/2,`${vn(m)} mm`,`text-anchor="middle" transform="rotate(-90 ${Wt(_+y+7)} ${Wt(w+m/2)})"`);for(const[R,M]of u.bores.entries())if(M){const[A,C]=b(M.center);a+=`<g data-role="center-mark">${Wf(A,C)}${cn(A+2,C-2,String(R+1))}</g>`}a+="</g></g>"}const l=t.height-n-Vf+4,c=["Print at 100% / actual size; disable fit-to-page.",`XY outlines: ${vn(s*100)}%; stock thickness unchanged.`,"Black: outer cut. Red: hole cut. Blue: guides only.","Kerf, shaft fit and physical operation are untested."];return a+=`<g data-role="instructions">${c.map((u,h)=>cn(n,l+h*4,u)).join("")}</g>`+Zf(t.width-n-20,t.height-n-20),Xf(t.width,t.height,`${r} — sheet ${e+1}`,a)}function Wg(i,e){if(!i||!Array.isArray(i.parts)||!e||e.version!==1||typeof e.title!="string"||e.title.length>160||!Number.isFinite(e.thickness)||e.thickness<1||e.thickness>10)throw new Error("Assembly export needs a validated pose and version-1 project.");Yf(i.parts.map(S=>S.part));const t=i.parts.map(S=>{if(!S.pose||!Number.isFinite(S.pose.angle))throw new Error("Assembly parts need finite rigid poses.");if(ec(S.pose.origin),S.part.thickness!==e.thickness)throw new Error("Assembly part thickness must match the project stock.");return{...S,outer:S.part.outer.map(_=>fn(_,S.pose))}});if(!i.shafts||typeof i.shafts!="object"||Array.isArray(i.shafts)||Object.keys(i.shafts).length>256)throw new Error("Assembly shafts must be a bounded record.");const n=Object.entries(i.shafts),s=hh(e);for(const[S,_]of n){if(S.length>160||!_||!Number.isFinite(_.angle))throw new Error("Invalid assembly shaft.");ec(_.position)}const r=Vr([...t.flatMap(S=>S.outer),...n.map(([,S])=>S.position)]),o=[...new Set(t.map(S=>S.part.layer))].sort((S,_)=>S-_),a=r[2]-r[0],l=r[3]-r[1],c=Math.max(210,a+30),u=o.map(S=>{const _=t.filter(b=>b.part.layer===S),w=_.flatMap((b,R)=>Zs(`P${R+1}: ${b.part.id} — ${b.part.label}`,c-20));return{layer:S,items:_,legend:w,height:l+22+w.length*Rn}}),h=Zs(e.title,c-20),d=h.length*Rn+17,f=["Assembly reference at actual size (millimetres); not a cutting sheet.",`Stock ${vn(e.thickness)} mm; layer slot pitch ${vn(e.thickness+1)} mm includes a 1 mm spacer.`,"Rods span only their declared mounting layers; do not extend every rod through every layer.","Add 1 mm spacers between adjacent layer slots; retain gaps for unused slots.","Choose a clear motor end using a full-range shaft scan; external crank handle volume is untested.","Shaft fit, friction, kerf, strength and physical operation are untested.",...n.map(([S,_])=>`Shaft ${S}: X ${vn(_.position[0])}, Y ${vn(_.position[1])} mm; angle ${vn(_.angle)} rad; ${s[S]?`rod layers ${s[S][0]} to ${s[S][1]}`:"no declared rod mounts"}`)].flatMap(S=>Zs(S,c-20)),g=u.reduce((S,_)=>S+_.height,0),y=d+g+f.length*Rn+34;let m=h.map((S,_)=>cn(10,10+_*Rn,S)).join("")+cn(10,d-4,"Layer views share the same world XY origin and scale."),p=d;for(const{layer:S,items:_,legend:w,height:b}of u){const M=p+12,A=C=>[15+C[0]-r[0],M+r[3]-C[1]];m+=`<g data-role="assembly-layer" data-layer="${S}">`+cn(10,p+4,`Layer ${S}: Z ${vn(S*(e.thickness+1))}–${vn(S*(e.thickness+1)+e.thickness)} mm`);for(const[C,L]of _.entries()){const I=B=>A(fn(B,L.pose));m+=qf(L.part,I);const k=Vr(L.outer),N=A([(k[0]+k[2])/2,(k[1]+k[3])/2]);m+=cn(N[0],N[1]-4,`P${C+1}`,'text-anchor="middle"')}for(const[C,L]of n){const I=s[C];if(!I||S<I[0]||S>I[1])continue;const[k,N]=A(L.position);m+=`<g data-role="shaft" data-shaft="${fo(C)}">${Wf(k,N)}<circle cx="${Wt(k)}" cy="${Wt(N)}" r="1" fill="none" stroke="#24568a" stroke-width="0.18"/></g>`}m+=w.map((C,L)=>cn(10,M+l+6+L*Rn,C)).join("")+"</g>",p+=b}const x=d+g+3;return m+=f.map((S,_)=>cn(10,x+_*Rn,S)).join("")+Zf(c-30,y-30),Xf(c,y,`${e.title} — assembly`,m)}function Kf(i,e=new WeakSet){if(i&&typeof i=="object"&&!e.has(i)){e.add(i),Object.freeze(i);for(const t of Object.values(i))Kf(t,e)}return i}const Uu=i=>i instanceof Error?i.message:String(i);function Xg(i=()=>new Worker(new URL(""+new URL("worker-C4OEWUFx.js",import.meta.url).href,import.meta.url),{type:"module"})){let e=0,t=!1,n;const s=new WeakSet,r=()=>n?.finish({status:"cancelled"});function o(a){return r(),t?Promise.resolve({status:"error",message:"Assembly worker client is disposed."}):new Promise(l=>{let c,u=!1;const h=d=>{u||(u=!0,n?.id===a.id&&(n=void 0),c&&(c.onmessage=null,c.onerror=null,c.onmessageerror=null,c.terminate()),l(d))};n={id:a.id,finish:h};try{c=i(),c.onmessage=d=>{if(n?.id!==a.id||d.data?.id!==a.id||d.data.kind!==a.kind)return;const f=d.data.outcome;try{if(d.data.kind==="prepare"&&f.status==="complete"){const g=f.value;g.ok&&(Kf(g.value),s.add(g.value))}h(f)}catch(g){h({status:"error",message:Uu(g)})}},c.onerror=d=>{d.preventDefault(),h({status:"error",message:d.message||"Assembly worker failed."})},c.onmessageerror=()=>h({status:"error",message:"Assembly worker response could not be cloned."}),c.postMessage(a)}catch(d){h({status:"error",message:Uu(d)})}})}return{prepare:a=>o({id:++e,kind:"prepare",project:a}),scan:(a,l)=>s.has(a)?o({id:++e,kind:"scan",prepared:a,options:l}):(r(),Promise.resolve({status:"error",message:"Scan requires an unchanged prepared assembly returned by this client."})),cancel:r,dispose:()=>{t=!0,r()}}}const pn=256,Yg=24,Ks=60;function qg(i,e=.8,t=Yg){const n=i.length,s=new Set([0]),r=u=>u/n,o=u=>i[u%n],a=(u,h,d)=>{let f=-1,g=d;for(let y=u+1;y<h;y++){const m=(r(y)-r(u))/(r(h)-r(u)),p=o(u)+(o(h)-o(u))*m,x=Math.abs(o(y)-p);x>g&&(g=x,f=y)}f>0&&(s.add(f%n),a(u,f,d),a(f,h,d))};a(0,n,e);for(let u=1;u<n;u++){const h=Math.abs(o(u)-o(u-1))<.05,d=Math.abs(o(u+1)-o(u))<.05;h!==d&&s.add(u)}let l=[...s].sort((u,h)=>u-h),c=e;for(;l.length>t&&c<20;)c*=1.4,s.clear(),s.add(0),a(0,n,c),l=[...s].sort((u,h)=>u-h);return l.length<3&&(l=[0,Math.floor(n/3),Math.floor(2*n/3)]),l.map(u=>({phase:u/n,lift:Math.round(o(u)*100)/100}))}function Wr(i,e=2048){const t=[];let n=0,s=0;for(let o=0;o<e;o++){const a=xa(i.knots,o/e),l=Math.atan2(Math.abs(a.velocity),i.baseRadius+i.rollerRadius+a.lift);l>n&&(n=l,s=o/e),t.push(l>i.pressureLimit+1e-10)}const r=[];for(let o=0;o<e;o++)if(t[o]&&!t[(o+e-1)%e]){let a=o;for(;t[(a+1)%e]&&a-o<e;)a++;r.push([o/e,(a+1)/e])}return{limitDeg:i.pressureLimit*180/Math.PI,peakDeg:n*180/Math.PI,peakPhase:s,tooSteep:r}}function Jf(i){for(let e=Math.ceil(i.baseRadius/2)*2;e<=100;e+=2){const t={...i,baseRadius:e};if(!Wr(t,180).tooSteep.length&&!Wr(t,720).tooSteep.length)return t}}const Co=.3;function Zg(i){const e=i.knots,t=e.length,n=fu(i);if(!n.ok)return;const s=n.value.phase,r=I=>I>=t?1:e[I].phase,o=I=>e[I%t].lift;let a=t-1;for(;a>0&&e[a].phase>s;)a--;const l=Math.sign(o(a+1)-o(a));if(!l)return;let c=a,u=a+1;for(;u<t&&Math.sign(o(u+1)-o(u))===l;)u++;for(;c>0&&Math.sign(o(c)-o(c-1))===l;)c--;const h=1/64,d=r(c),f=r(u),g=u<t?Math.max(f,r(u+1)-h):f,y=c>0?Math.min(d,r(c-1)+h):d,m=(I,k)=>{const N=H=>I+(H-d)*(k-I)/(f-d),B=e.map((H,G)=>{if(G<c||G>u)return H;const j=N(H.phase);return j===H.phase?H:{...H,phase:j}});return{...i,knots:B}},p=(I,k,N)=>{const B=fu(I,k,N);return B.ok?B.value.angle:1/0},x=i.pressureLimit-1e-9,S=u<t&&Math.abs(o(u+1)-o(u))>=Co,_=c>0&&Math.abs(o(c)-o(c-1))>=Co,w={next:S?p(i,u,u+1):0,prev:_?p(i,c-1,c):0},b=(I,k)=>{const N=m(I,k);return(!S||k<=f||p(N,u,u+1)<=Math.max(x,w.next))&&(!_||I>=d||p(N,c-1,c)<=Math.max(x,w.prev))},R=(I,k,N=!1)=>p(m(I,k),c,u)<=x&&(!N||b(I,k)),M=I=>(I%t+t)%t,A=I=>Math.abs(o(M(I)+1)-o(M(I)))<Co,C=I=>r(M(I)+1)-r(M(I)),L=(I,k,N)=>{if(!A(I))return{pause:!1,length:C(I),lift:o(N)};let B=C(I);for(let H=I+k,G=0;G<t-1&&A(H)&&Math.abs(o(M(H))-o(N))<Co;H+=k,G++)B+=C(H);return{pause:!0,length:B,lift:o(N)}};return{s0:c,e0:u,a0:d,b0:f,aMin:y,bMax:g,build:m,ok:R,neighboursOk:b,rampPeak:I=>p(I,c,u),before:c>0?L(c-1,-1,c):{pause:!1,length:0,lift:o(c)},after:u<t?L(u,1,u):{pause:!1,length:0,lift:o(u)}}}function Kg(i){if(!i(1))return;let e=0,t=1;for(let n=0;n<18;n++){const s=(e+t)/2;i(s)?t=s:e=s}return t}function jf(i){const e=Zg(i);if(!e)return;const{a0:t,b0:n,aMin:s,bMax:r,build:o}=e,a=r-n,l=t-s;if(a<=1e-6&&l<=1e-6)return;const c=[{name:"after",room:a,pause:e.after.pause,length:e.after.length},{name:"before",room:l,pause:e.before.pause,length:e.before.length}].filter(b=>b.room>1e-6).sort((b,R)=>Number(b.pause)-Number(R.pause)||(b.pause&&R.pause?R.length-b.length:0)),u=b=>[t-(b.before??0)*l,n+(b.after??0)*a];let h={},d=!1;for(const b of c){const R=Kg(L=>{const[I,k]=u({...h,[b.name]:L});return e.ok(I,k,!0)});if(R!==void 0){h={...h,[b.name]:R},d=!0;break}const M=L=>{const[I,k]=u({...h,[b.name]:L});return e.neighboursOk(I,k)};let A=0,C=1;if(M(1))A=1;else for(let L=0;L<18;L++){const I=(A+C)/2;M(I)?A=I:C=I}h={...h,[b.name]:A}}const[f,g]=u(h);if(Math.abs(f-t)<1e-9&&Math.abs(g-n)<1e-9)return;const y=o(f,g),m=i.knots.map(b=>b.lift),p=Math.max(...m),x=Math.min(...m),S=b=>b>=p-.5?"top":b<=x+.5?"bottom":"middle",_=[],w=(b,R,M)=>{if(!R.pause||M<1e-6)return;const A=R.length*360,C=(R.length-M)*360;A-C>=.5&&_.push({side:b,where:S(R.lift),lift:R.lift,fromDeg:A,toDeg:C})};return w("after",e.after,g-n),w("before",e.before,t-f),{spec:y,cuts:_,gentle:d,from:[t,n],to:[f,g],fromDeg:e.rampPeak(i)*180/Math.PI,toDeg:e.rampPeak(y)*180/Math.PI}}function Qf(i){return`your pause ${i.where==="middle"?`at ${Math.round(i.lift)} mm`:`at the ${i.where}`} by ${Math.round(i.fromDeg-i.toDeg)}° (from ${Math.round(i.fromDeg)}° to ${Math.round(i.toDeg)}°)`}function Jg(i){for(let e=i.crank-1;e>=8;e--){const t={...i,crank:e},n=ya(t);if(n.ok&&n.value.fullRotation)return t}for(let e=i.rocker+1;e<=160;e++){const t={...i,rocker:e},n=ya(t);if(n.ok&&n.value.fullRotation)return t}}function jg(i,e){const t=e.filter(m=>Number.isFinite(m.phase)&&Number.isFinite(m.lift));if(t.length<3)return;const n=Array.from({length:pn},(m,p)=>xa(i,p/pn).lift),s=new Map;for(const m of t){const p=Math.max(0,Math.min(pn-1,Math.floor(m.phase*pn)));(s.get(p)??s.set(p,[]).get(p)).push(Math.max(0,Math.min(Ks,m.lift)))}const r=[...s.keys()].sort((m,p)=>m-p),o=r[0],a=r[r.length-1],l=m=>m.reduce((p,x)=>p+x)/m.length;for(let m=o;m<=a;m++)if(s.has(m))n[m]=l(s.get(m));else{let p=m-1,x=m+1;for(;!s.has(p);)p--;for(;!s.has(x);)x++;const S=n[p],_=l(s.get(x));n[m]=S+(_-S)*(m-p)/(x-p)}if(a>=pn-4&&o>0){const m=n[0],p=Math.max(o,a-Math.round(pn*.05));for(let x=p;x<pn;x++){const S=(x-p)/(pn-p);n[x]=n[x]*(1-S)+m*S}}const c=o/pn,u=(a+1)/pn,h=1/64,d=qg(n).filter(m=>m.phase>c+h/2&&m.phase<u-h/2),f=m=>({phase:Math.round(m*2048)/2048,lift:Math.round(n[Math.min(pn-1,Math.floor(m*pn))]*100)/100});let y=[...i.filter(m=>m.phase<c-h||m.phase>=u+h),...d,f(c),...u<1?[f(Math.min(u,1-1/pn))]:[]].sort((m,p)=>m.phase-p.phase);return y=y.reduce((m,p)=>((!m.length||p.phase-m[m.length-1].phase>=1/128)&&m.push(p),m),[]),y[0].phase!==0&&y.unshift({phase:0,lift:Math.round(n[0]*100)/100}),y.length>1&&1-y[y.length-1].phase<1/128&&y.pop(),y.slice(0,64)}const Ki=(i,e=36)=>({kind:"cam",parameters:{follower:{kind:"translating"},baseRadius:e,rollerRadius:5,boreRadius:3,pressureLimit:Math.PI/6,knots:i}}),Sa={cam:"Cam","four-bar":"Four-bar linkage","slider-crank":"Slider-crank",gears:"Gear pair"},ep=Dg,ku=1,Xr=8,Qg=64,tp=i=>i.module*i.teethA/2+i.module*i.teethB/2,np=i=>{if(i.mechanism.kind!=="gears")throw Error("Only gear pairs have an output shaft.");return fn([tp(i.mechanism.parameters),0],i.placement)};function ip(i){const e=i.modules.filter(n=>n.drive.source==="motor"),t=[{id:"motor",position:i.motor.origin,label:"the main shaft (the crank)",boreRadius:e[0]?.boreRadius??3}];for(const n of i.modules)n.mechanism.kind==="gears"&&t.push({id:n.id,position:np(n),label:`the output of gears “${n.id}”`,boreRadius:n.boreRadius});return t}function sp(i){const e=new Map(i.modules.map(r=>[r.id,r])),t=[],n=new Set,s=(r,o=0)=>{if(n.has(r.id)||o>Xr)return;let a=i.motor.origin;if(r.drive.source!=="motor"){const l=e.get(r.drive.source);if(!l||l.mechanism.kind!=="gears")return;s(l,o+1),a=np(l)}(r.placement.origin[0]!==a[0]||r.placement.origin[1]!==a[1])&&(r.placement={...r.placement,origin:[a[0],a[1]]},t.push(r.id)),n.add(r.id)};for(const r of i.modules)s(r);return t}function uh(i,e){const t=[],n=s=>{for(const r of i.modules)r.drive.source===s&&!t.includes(r.id)&&(t.push(r.id),n(r.id))};return n(e),t}const dr=i=>[...i.modules].sort((e,t)=>t.layer-e.layer||i.modules.indexOf(e)-i.modules.indexOf(t)).map(e=>e.id),dh=i=>[i.layer,i.layer+ep[i.mechanism.kind]-1];function fh(i,e=dr(i)){const t=new Map(i.modules.map(r=>[r.id,r]));let n=0;const s=new Map;for(const r of[...e].reverse()){const o=t.get(r);o&&(s.set(r,n),n+=ep[o.mechanism.kind]+ku)}if(n-ku-1>Qg)return!1;for(const r of i.modules)r.layer=s.get(r.id)??r.layer;return!0}function e0(i,e,t){const n=dr(i),s=n.indexOf(e),r=s+t;return s<0||r<0||r>=n.length?!1:([n[s],n[r]]=[n[r],n[s]],fh(i,n))}const t0=(i,e)=>{let t=1;for(;i.modules.some(n=>n.id===`${e}-${t}`);)t++;return`${e}-${t}`};function n0(i){switch(i){case"cam":return Ki([{phase:0,lift:0},{phase:.15,lift:0},{phase:.4,lift:18},{phase:.6,lift:18},{phase:.85,lift:0}],30);case"four-bar":return{kind:"four-bar",parameters:{ground:70,crank:18,coupler:62,rocker:48,branch:1}};case"slider-crank":return{kind:"slider-crank",parameters:{crank:16,rod:56,guideOffset:0,branch:1}};case"gears":return{kind:"gears",parameters:{module:2,teethA:18,teethB:36,boreRadius:3}}}}const i0={cam:0,"four-bar":Math.PI/4,"slider-crank":Math.PI/2,gears:0},s0={cam:"cam","four-bar":"linkage","slider-crank":"slider",gears:"gears"};function r0(i,e,t="motor"){if(i.modules.length>=Xr)return{ok:!1,reason:`A sculpture has room for ${Xr} parts. Remove one first.`};const n=ip(i).find(u=>u.id===t);if(!n)return{ok:!1,reason:t==="motor"?"There is no main shaft.":`“${t}” isn’t a gear pair, so it has no output shaft to drive anything.`};const s=t0(i,s0[e]),r=n0(e);(r.kind==="cam"||r.kind==="gears")&&(r.parameters.boreRadius=n.boreRadius);const o={id:s,mechanism:r,placement:{origin:[n.position[0],n.position[1]],angle:i0[e]},drive:{source:t,phase:0},layer:0,width:10,boreRadius:n.boreRadius},a=dr(i),l=e==="four-bar"||e==="slider-crank",c=new Map(i.modules.map(u=>[u.id,u.mechanism.kind]));if(t!=="motor")a.splice(a.indexOf(t)+(l?0:1),0,s);else if(l)a.unshift(s);else if(e==="gears")a.push(s);else{let u=0;for(;u<a.length&&["four-bar","slider-crank"].includes(c.get(a[u]))&&i.modules.find(h=>h.id===a[u]).drive.source==="motor";)u++;a.splice(u,0,s)}return i.modules.push(o),fh(i,a)?{ok:!0,id:s}:(i.modules.pop(),{ok:!1,reason:"There aren’t enough layers left for another part."})}function o0(i,e){if(!i.modules.some(n=>n.id===e))return[];const t=[e,...uh(i,e)];return i.modules=i.modules.filter(n=>!t.includes(n.id)),fh(i),t}function a0(i,e,t){const n=i.modules.find(s=>s.id===e);n&&(n.placement={...n.placement,angle:(t%Wi+Wi)%Wi},sp(i))}const rp={hen:{at:[22.5,26.5,0],name:"beak"},worm:{at:[0,36,0],name:"head"},heron:{at:[49.8,13.6,0],name:"beak"},frog:{at:[0,11,10],name:"mouth"},dog:{at:[27.5,26.6,0],name:"nose"},cat:{at:[0,48,15],name:"nose"},paw:{at:[0,6,4],name:"paw"},owl:{at:[0,31,12],name:"beak"},mouse:{at:[21,10,0],name:"nose"},bird:{at:[18.5,15.6,0],name:"beak"},dancer:{at:[0,46,0],name:"hands"},hammer:{at:[0,0,0],name:"hammer head"},horseshoe:{at:[0,8,0],name:"horseshoe"},oar:{at:[0,0,0],name:"blade"},flower:{at:[0,24,1.5],name:"bloom"},sun:{at:[0,0,0],name:"face"},moon:{at:[0,0,0],name:"face"},star:{at:[0,0,0],name:"middle"},boat:{at:[0,6,0],name:"deck"},hand:{at:[40,0,0],name:"tip"},dial:{at:[0,0,0],name:"middle"},skywheel:{at:[0,0,0],name:"middle"},grass:{at:[0,0,0],name:"grass"},stage:{at:[0,0,0],name:"stage"},floor:{at:[0,0,0],name:"floor"},anvil:{at:[0,43,0],name:"face"},smith:{at:[-17,36,9],name:"hand"},tower:{at:[-72,60,7.5],name:"window"},clouds:{at:[0,14,0],name:"top"},branch:{at:[0,4,0],name:"branch"},hill:{at:[20,6,0],name:"top"},night:{at:[0,0,2],name:"sky"},moonboat:{at:[15,7,0],name:"rower’s hands"}},l0=["anvil","clouds","hill","branch","tower","moonboat"],c0=["hen","worm","heron","frog","dog","cat","paw","owl","mouse","bird","dancer","hammer","horseshoe","oar","flower","sun","moon","star","boat","hand","dial","skywheel"],h0=["grass","stage","floor","anvil","smith","tower","clouds","branch","hill","night","moonboat"],op=i=>c0.includes(i),Fu=i=>h0.includes(i),u0=["follower-top","rocker-tip","coupler-mid","coupler-end","crank-tip","ground-end","slider","gear-center","gear-rim","gear-shaft"],d0=["up","down","left","right"],po=i=>"module"in i?[]:"touch"in i?[i.figure,i.touch]:[i.figure],f0=15,ap=["sparks","hearts","stars","notes"],p0=i=>i.mechanism.kind==="cam"?[Math.max(...i.mechanism.parameters.knots.map(e=>e.lift))+40,0]:[0,0];function lp(i){const e=i.id,t=i.mechanism;switch(t.kind){case"cam":return[{anchor:"follower-top",part:`${e}/follower`,label:"top of the follower",at:p0(i),steady:!0}];case"four-bar":{const n=t.parameters;return[{anchor:"rocker-tip",part:`${e}/rocker`,label:"tip of the rocker",at:[n.rocker,0],steady:!1},{anchor:"coupler-mid",part:`${e}/coupler`,label:"middle of the coupler",at:[n.coupler/2,0],steady:!1},{anchor:"coupler-end",part:`${e}/coupler`,label:"far end of the coupler",at:[n.coupler,0],steady:!1},{anchor:"crank-tip",part:`${e}/crank`,label:"tip of the crank",at:[n.crank,0],steady:!1},{anchor:"ground-end",part:`${e}/ground`,label:"far end of the fixed bar (doesn’t move)",at:[n.ground,0],steady:!0}]}case"slider-crank":{const n=t.parameters;return[{anchor:"slider",part:`${e}/slider`,label:"the slider",at:[0,0],steady:!0},{anchor:"crank-tip",part:`${e}/crank`,label:"tip of the crank",at:[n.crank,0],steady:!1}]}case"gears":{const n=t.parameters;return[{anchor:"gear-center",part:`${e}/gear-b`,label:"centre of the output gear",at:[0,0],steady:!1},{anchor:"gear-rim",part:`${e}/gear-b`,label:"rim of the output gear",at:[Math.round(n.module*n.teethB/2*.72),0],steady:!1},{anchor:"gear-shaft",part:`${e}/base`,label:"output shaft, on the fixed support (doesn’t turn)",at:[n.module*n.teethA/2+n.module*n.teethB/2,0],steady:!0}]}}}function ph(i,e){const t=e.split("/")[1];if(i.mechanism.kind==="cam"&&t==="follower")return i.placement.angle+Math.PI/2;if(i.mechanism.kind==="slider-crank"&&t==="slider"||i.mechanism.kind==="four-bar"&&t==="ground"||i.mechanism.kind==="gears"&&t==="base")return i.placement.angle}function mh(i,e){for(const t of i){if(!t.anchor||t.part==="world")continue;const n=e.find(r=>r.id===t.part.split("/")[0]);if(!n)continue;const s=lp(n).find(r=>r.anchor===t.anchor);s&&(t.part=s.part,t.at=[s.at[0]+(t.nudge?.[0]??0),s.at[1]+(t.nudge?.[1]??0)])}}function Pr(i,e){if(e.part==="world")return e.at;const t=i.parts.find(n=>n.part.id===e.part);return t?fn(e.at,t.pose):void 0}const cp=["hand","oar","hammer","paw"];function hp(i,e){if(e.part==="world")return;const t=i.parts.find(s=>s.part.id===e.part);if(!t)return;const n=(e.upright?0:t.pose.angle)+(e.turnZ??0);return cp.includes(e.kind)?n:n+Math.PI/2}function Ou(i){const e=new Set(i.project.modules.map(s=>s.id)),t=i.figures.filter(s=>s.part!=="world"&&!e.has(s.part.split("/")[0]));i.figures=i.figures.filter(s=>!t.includes(s));let n;if(i.moment){const s=r=>"module"in r?e.has(r.module):po(r).every(o=>i.figures.some(a=>a.id===o));(!s(i.moment.a)||i.moment.b&&!s(i.moment.b))&&(n=i.moment,i.moment=void 0)}return{figures:t,moment:n}}const zn={raise:new Map,world:new Map},up=i=>i.part.layer*(i.part.thickness+1)+i.part.thickness/2;function gh(i,e,t,n,s){const r=i[0]*e,o=i[1]*e,a=i[2]*e,l=Math.cos(t),c=Math.sin(t),u=Math.cos(n),h=Math.sin(n),d=r*l-o*c,f=r*c+o*l;return[s[0]+d*u+a*h,s[1]+f,s[2]-d*h+a*u]}function nr(i,e,t=zn){if(e.part==="world"){const r=t.world.get(e.id);return r?{origin:r,turnZ:e.turnZ??0}:void 0}const n=i.parts.find(r=>r.part.id===e.part);if(!n)return;const s=fn(e.at,n.pose);return{origin:[s[0],s[1]+(t.raise.get(e.id)??0),up(n)+(e.dz??0)],turnZ:(e.upright?0:n.pose.angle)+(e.turnZ??0)}}function Ht(i,e,t=zn){const n=nr(i,e,t);if(n)return gh(rp[e.kind].at,e.scale??1,n.turnZ,e.turnY??0,n.origin)}const Va=(i,e)=>Math.hypot(i[0]-e[0],i[1]-e[1],i[2]-e[2]),Bu=22,zu=(i,e)=>i*(e+1),Hu=new WeakMap,m0=i=>{let e=Hu.get(i);if(!e){const t=Math.max(1,Math.ceil(i.length/96));e=i.filter((n,s)=>s%t===0),Hu.set(i,e)}return e};function g0(i,e){const t=new Set(i.filter(n=>n.part!=="world").map(n=>n.part));for(const n of e)n.mechanism.kind==="cam"&&t.add(`${n.id}/follower`),n.mechanism.kind==="slider-crank"&&t.add(`${n.id}/slider`);return t}function _0(i,e,t,n="front"){const s=g0(t,i.modules),r=i.thickness;let o=-1/0,a=1/0,l=-1/0;for(const c of e)for(const u of c.parts)if(a=Math.min(a,zu(u.part.layer,r)),l=Math.max(l,zu(u.part.layer,r)+r),!s.has(u.part.id))for(const h of m0(u.part.outer))o=Math.max(o,fn(h,u.pose)[1]+1);return Number.isFinite(a)||(a=0,l=r),{top:Number.isFinite(o)?o:0,front:l+(n==="front"?Bu:6),back:a-(n==="back"?Bu:6)}}function v0(i,e,t){const[n,s]=i.at,r=i.dz??0;return i.place==="above"?[n,t.top+Math.max(0,s)-e.min[1]+2,r]:i.place==="front"?[n,s,t.front+Math.max(0,r)-e.min[2]]:i.place==="behind"?[n,s,t.back-Math.max(0,r)-e.max[2]]:[n,s,r]}const ln=150;function x0(i,e,t,n,s=0){if(i.part==="world"||e.part.id!==i.part)return!1;const r=t-e.pose.origin[0],o=n-s-e.pose.origin[1],a=Math.cos(e.pose.angle),l=Math.sin(e.pose.angle),c=[r*a+o*l,-r*l+o*a],u=h=>Math.round(Math.max(-ln,Math.min(ln,h))*10)/10;if(i.anchor){const h=[i.at[0]-(i.nudge?.[0]??0),i.at[1]-(i.nudge?.[1]??0)];i.nudge=[u(c[0]-h[0]),u(c[1]-h[1])],i.at=[h[0]+i.nudge[0],h[1]+i.nudge[1]]}else i.at=[u(c[0]),u(c[1])];return!0}const y0=2*Math.PI,ds=i=>i/180*Math.PI,M0=([i,e],t)=>{const n=-ds(t);return[Math.round((i*Math.cos(n)-e*Math.sin(n))*100)/100,Math.round((i*Math.sin(n)+e*Math.cos(n))*100)/100]},un=(i,e,t={})=>({id:i,mechanism:e,placement:{origin:[0,0],angle:0},drive:{source:"motor",phase:0},layer:0,width:10,boreRadius:3,...t}),Si=(i,e)=>({version:1,title:i,motor:{origin:[0,0],angleOffset:0},thickness:3,modules:e}),ms=(i,e,t,n={})=>({id:i,kind:e,part:`${t}/follower`,at:[0,0],anchor:"follower-top",upright:!0,dz:1.5,...n}),b0=[{phase:0,lift:12},{phase:.12,lift:12},{phase:.22,lift:0},{phase:.32,lift:12},{phase:.42,lift:0},{phase:.52,lift:12}],S0=[{phase:0,lift:0},{phase:.2,lift:0},{phase:.45,lift:34},{phase:.58,lift:34},{phase:.82,lift:0}];function w0(){const i=un("hen",Ki(b0,44)),e=un("worm",Ki(S0,40),{layer:12,drive:{source:"motor",phase:250/360*y0}});return{id:"early-bird",title:"The Early Bird",blurb:"Two cams on one shaft: a hen that pecks and a worm that peeks out. Change their timing and see who wins.",project:Si("The Early Bird",[i,e]),figures:[ms("hen","hen","hen",{dz:12,scale:1.5,turnY:-Math.PI/2}),ms("worm","worm","worm",{scale:1.4,nudge:[-39,0]}),{id:"grass",kind:"grass",part:"world",at:[0,0],dz:26,place:"above"}],goal:"Can you time the hen’s peck for the moment the worm peeks out? Try the Timing slider on either cam.",hint:"Try moving the worm’s timing until the hen’s peck and the worm’s rise line up. On the timeline below, slide the worm’s hump under one of the hen’s dips.",answer:"Set the worm’s timing to about 110°.",moment:{text:"Peck! The hen caught the worm. Breakfast!",a:{figure:"hen",touch:"worm",within:8},effect:"stars"}}}function E0(){const i=un("arm",{kind:"four-bar",parameters:{ground:41,crank:8,coupler:54,rocker:22,branch:1}},{placement:{origin:[0,0],angle:ds(10)}});return{id:"waving-cat",title:"The Waving Cat",blurb:"A four-bar linkage hidden in a cat turns a steady crank into a friendly wave.",project:Si("The Waving Cat",[i]),figures:[{id:"cat",kind:"cat",part:"arm/ground",at:[41,0],anchor:"ground-end",upright:!0,scale:2,dz:44,nudge:M0([-32,-66],10)},{id:"paw",kind:"paw",part:"arm/rocker",at:[62,0],anchor:"rocker-tip",nudge:[40,0],dz:40,scale:2,turnZ:-Math.PI/2}],goal:"Make the wave bigger or smaller by changing the bar lengths. Some combinations can’t turn all the way round.",moment:{text:"Hello there!",a:{figure:"paw",pick:"up"},effect:"hearts"}}}const T0=[{phase:0,lift:22},{phase:.38,lift:22},{phase:.58,lift:0},{phase:.62,lift:0},{phase:.84,lift:22}],A0=[{phase:0,lift:0},{phase:.08,lift:0},{phase:.4,lift:20},{phase:.66,lift:20},{phase:.86,lift:0}];function R0(){const i=un("heron",Ki(T0,40)),e=un("worm",Ki(A0,30),{layer:14,drive:{source:"motor",phase:ds(60)}});return{id:"late-worm",title:"The Late Worm",blurb:"A heron’s beak stabs down; a worm who’s always late takes a long look around. Save the worm.",project:Si("The Late Worm",[i,e]),figures:[ms("heron","heron","heron",{dz:-6,scale:1.25,turnY:-Math.PI/2}),ms("worm","worm","worm",{scale:1,color:"#c98a6b",nudge:[-23,0]}),{id:"grass",kind:"grass",part:"world",at:[0,0],dz:34,place:"above"}],goal:"The heron stabs once a turn. Time the worm so he has just ducked back down when the beak arrives.",hint:"Watch the timeline: the worm should already be dropping when the heron’s beak comes down. Move his timing a little at a time.",answer:"Try the worm’s timing around 200°.",moment:{text:"Missed! The Late Worm lives to be late another day.",a:{module:"heron",output:"lift",max:1},b:{module:"worm",output:"lift",max:2},effect:"hearts"}}}function C0(){const i=un("hammer",{kind:"slider-crank",parameters:{crank:10,rod:60,guideOffset:0,branch:1}},{placement:{origin:[0,0],angle:Math.PI/2}});return{id:"blacksmith",title:"The Blacksmith",blurb:"A slider-crank lifts and drops a hammer. The stroke is twice the crank: make it long enough to reach the anvil.",project:Si("The Blacksmith",[i]),sky:"dusk",figures:[{id:"hammer",kind:"hammer",part:"hammer/slider",at:[0,0],anchor:"slider",upright:!0,nudge:[8,0],dz:61.5,scale:1.1},{id:"floor",kind:"floor",part:"world",at:[0,0],dz:5,place:"front"},{id:"anvil",kind:"anvil",part:"world",at:[0,0],dz:31,place:"front",scale:1.2},{id:"smith",kind:"smith",part:"world",at:[-62,0],dz:44,place:"front",turnY:Math.PI/2,scale:1.3}],goal:"The hammer stops short of the anvil. A slider moves twice as far as its crank is long: make the crank longer until the hammer strikes.",hint:"The hammer travels twice as far as the crank is long, and it misses by a few millimetres: the crank needs only a little more length.",answer:"A crank of about 16 mm brings the hammer down onto the anvil.",moment:{text:"Clang! Sparks fly from the anvil.",a:{figure:"hammer",touch:"anvil",within:2},effect:"sparks"}}}function P0(){const i=un("rower",{kind:"four-bar",parameters:{ground:43,crank:14,coupler:38,rocker:24,branch:-1}},{placement:{origin:[0,0],angle:ds(-20.6)}});return{id:"sky-rower",title:"Sky Rower",blurb:"A four-bar’s coupler draws a loop — dip, pull, lift, return — so the moon boat’s oar really rows through the clouds.",project:Si("Sky Rower",[i]),sky:"night",view:[.45,.2,.87],figures:[{id:"oar",kind:"oar",part:"rower/coupler",at:[110,0],anchor:"coupler-end",nudge:[72,0],dz:30},{id:"boat",kind:"moonboat",part:"world",at:[-20,-31],dz:10,place:"front",scale:1.3},{id:"clouds",kind:"clouds",part:"world",at:[64,-92],dz:2,place:"front",scale:.95},{id:"night",kind:"night",part:"world",at:[0,-20],dz:30,place:"behind"}],goal:"Watch the blade of the oar: the coupler draws a loop, not a circle. Change the coupler or rocker and the stroke changes shape.",moment:{text:"Stroke! The moon boat glides on.",a:{figure:"oar",pick:"down"},effect:"stars"}}}function L0(){const i=un("train",{kind:"gears",parameters:{module:2,teethA:18,teethB:54,boreRadius:3}},{placement:{origin:[0,0],angle:0},layer:8}),e=un("hour",{kind:"gears",parameters:{module:2,teethA:18,teethB:36,boreRadius:3}},{placement:{origin:[72,0],angle:Math.PI/2},drive:{source:"train",phase:0},layer:5}),t=un("cuckoo",Ki([{phase:0,lift:0},{phase:.5,lift:0},{phase:.7,lift:16},{phase:.85,lift:16}],34));return{id:"clock-tower",title:"The Clock Tower",blurb:"Two gear pairs in a row slow the crank down six times, so the hand creeps round while the cuckoo pops out every turn.",project:Si("The Clock Tower",[t,i,e]),view:[.38,.18,.9],figures:[{id:"dial",kind:"dial",part:"hour/base",at:[54,0],anchor:"gear-shaft",upright:!0,dz:8},{id:"hand",kind:"hand",part:"hour/gear-b",at:[0,0],anchor:"gear-center",dz:7,scale:.95},ms("cuckoo","bird","cuckoo",{scale:1.4,dz:2}),{id:"tower",kind:"tower",part:"world",at:[72,54],dz:2,place:"behind"}],goal:"Count the turns: how many turns of the crank for the hand to go all the way round? Change the teeth to make the day shorter or longer.",moment:{text:"Cuckoo! Cuckoo! It’s twelve o’clock.",a:{figure:"hand",pick:"up"},b:{module:"cuckoo",output:"lift",min:12},effect:"notes"}}}const I0=[{phase:0,lift:0},{phase:.17,lift:0},{phase:.35,lift:20},{phase:.39,lift:20},{phase:.57,lift:0}],D0=[{phase:0,lift:0},{phase:.25,lift:5},{phase:.5,lift:0},{phase:.75,lift:5}];function N0(){const i=un("lead",Ki(I0,40)),e=un("partner",Ki(D0,34),{layer:10});return{id:"dancing-pair",title:"The Dancing Pair",blurb:"Two dancers on two cams. One can leap; the other only sways — until you draw the leap in.",project:Si("The Dancing Pair",[i,e]),figures:[ms("lead","dancer","lead",{scale:1.6,nudge:[0,-38],turnY:-.6}),ms("partner","dancer","partner",{scale:1.6,color:"#4b87c5",nudge:[0,38],turnY:.9}),{id:"stage",kind:"stage",part:"world",at:[0,0],dz:24,place:"above"}],goal:"The partner only sways. Select the “partner” cam and draw a leap on its chart, so the two leap together.",hint:"On the partner’s chart, draw a rise to about 20 mm by 120°, hold it briefly, then come back down. If it jams, choose “Make the cam bigger”.",moment:{text:"Grand jeté! They leap as one.",a:{module:"lead",output:"lift",min:16},b:{module:"partner",output:"lift",min:16},effect:"hearts"}}}function U0(){const i=un("sky",{kind:"gears",parameters:{module:2,teethA:18,teethB:54,boreRadius:3}},{placement:{origin:[0,0],angle:ds(45)},layer:0}),e=un("perch",{kind:"four-bar",parameters:{ground:47,crank:9,coupler:68,rocker:40,branch:-1}},{placement:{origin:[0,0],angle:ds(161.6)},drive:{source:"motor",phase:ds(200)},layer:4});return{id:"owl-night",title:"Owl at Night",blurb:"A slow gear carries the moon across the sky while a four-bar rocks the owl on its perch.",project:Si("Owl at Night",[e,i]),sky:"night",view:[.4,.16,.9],figures:[{id:"skywheel",kind:"skywheel",part:"sky/gear-b",at:[0,0],anchor:"gear-center",dz:4,scale:1},{id:"moon",kind:"moon",part:"sky/gear-b",at:[39,0],anchor:"gear-rim",nudge:[16,0],dz:10,scale:2.1,turnZ:-Math.PI/2},{id:"owl",kind:"owl",part:"perch/rocker",at:[40,0],anchor:"rocker-tip",nudge:[8,0],dz:22,turnZ:-Math.PI/2,scale:1.3},{id:"hill",kind:"hill",part:"world",at:[20,40],dz:4,place:"front",scale:.8},{id:"night",kind:"night",part:"world",at:[20,60],dz:20,place:"behind"}],goal:"The moon takes three turns of the crank to cross the sky, while the owl rocks every turn. Wait for the owl to lean toward the high moon — then try different gear teeth to make the night longer or shorter.",moment:{text:"Hoo-hoo! The owl greets the moon.",a:{figure:"moon",pick:"up"},b:{figure:"owl",pick:"right"},effect:"stars"}}}const Bi=[w0(),R0(),E0(),P0(),C0(),N0(),L0(),U0()],k0=i=>Bi.find(e=>e.id===i),wr=i=>structuredClone(i);function Gu(i){const e=s=>typeof s=="number"?Math.round(s*1e6)/1e6:Array.isArray(s)?s.map(e):s&&typeof s=="object"?Object.fromEntries(Object.keys(s).sort().filter(r=>s[r]!==void 0).map(r=>[r,e(s[r])])):s,{title:t,...n}=i.project;return JSON.stringify(e({project:n,figures:i.figures.map(s=>s.anchor?{...s,at:void 0}:s),moment:i.moment,sky:i.sky}))}function _h(i){const e=k0(i.id);return!!e&&Gu(e)!==Gu(i)}const Vu=(i=1)=>({id:`new-${Date.now().toString(36)}`,title:i>1?`My sculpture ${i}`:"My sculpture",blurb:"Your own sculpture, built from an empty bench.",project:Si("My sculpture",[]),figures:[]});const vh="186",Xi={ROTATE:0,DOLLY:1,PAN:2},zi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},F0=0,$u=1,O0=2,ha=1,dp=2,Er=3,gs=0,dn=1,Zn=2,gi=0,Lr=1,Wu=2,Xu=3,Yu=4,B0=5,Hs=100,z0=101,H0=102,G0=103,V0=104,$0=200,W0=201,X0=202,Y0=203,fp=204,pp=205,q0=206,Z0=207,K0=208,J0=209,j0=210,Q0=211,e_=212,t_=213,n_=214,tc=0,nc=1,ic=2,Yr=3,sc=4,rc=5,oc=6,ac=7,mp=0,i_=1,s_=2,jn=0,gp=1,_p=2,vp=3,$a=4,xp=5,yp=6,Mp=7,bp=300,_s=301,ir=302,ll=303,cl=304,Wa=306,lc=1e3,pi=1001,cc=1002,Xt=1003,r_=1004,Po=1005,jt=1006,hl=1007,hs=1008,Mn=1009,Sp=1010,wp=1011,qr=1012,xh=1013,ei=1014,Kn=1015,ti=1016,yh=1017,Mh=1018,Zr=1020,Ep=35902,Tp=35899,Ap=1021,Rp=1022,Fn=1023,Mi=1026,us=1027,Cp=1028,bh=1029,vs=1030,Sh=1031,wh=1033,ua=33776,da=33777,fa=33778,pa=33779,hc=35840,uc=35841,dc=35842,fc=35843,pc=36196,mc=37492,gc=37496,_c=37488,vc=37489,wa=37490,xc=37491,yc=37808,Mc=37809,bc=37810,Sc=37811,wc=37812,Ec=37813,Tc=37814,Ac=37815,Rc=37816,Cc=37817,Pc=37818,Lc=37819,Ic=37820,Dc=37821,Nc=36492,Uc=36494,kc=36495,Fc=36283,Oc=36284,Ea=36285,Bc=36286,o_=3200,zc=0,a_=1,Fi="",An="srgb",Ta="srgb-linear",Aa="linear",gt="srgb",ul=7680,l_=519,c_=512,h_=513,u_=514,Eh=515,d_=516,f_=517,Th=518,p_=519,m_=35044,qu="300 es",Jn=2e3,Kr=2001;function g_(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ra(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function __(){const i=Ra("canvas");return i.style.display="block",i}const Zu={};function Ku(...i){const e="THREE."+i.shift();console.log(e,...i)}function Pp(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ve(...i){i=Pp(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=Pp(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Js(...i){const e=i.join(" ");e in Zu||(Zu[e]=!0,Ve(...i))}function v_(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const x_={[tc]:nc,[ic]:oc,[sc]:ac,[Yr]:rc,[nc]:tc,[oc]:ic,[ac]:sc,[rc]:Yr};class ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ju=1234567;const Ir=Math.PI/180,Jr=180/Math.PI;function Ms(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function Qe(i,e,t){return Math.max(e,Math.min(t,i))}function Ah(i,e){return(i%e+e)%e}function y_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function M_(i,e,t){return i!==e?(t-i)/(e-i):0}function Dr(i,e,t){return(1-t)*i+t*e}function b_(i,e,t,n){return Dr(i,e,1-Math.exp(-t*n))}function S_(i,e=1){return e-Math.abs(Ah(i,e*2)-e)}function w_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function E_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function T_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function A_(i,e){return i+Math.random()*(e-i)}function R_(i){return i*(.5-Math.random())}function C_(i){i!==void 0&&(Ju=i);let e=Ju+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function P_(i){return i*Ir}function L_(i){return i*Jr}function I_(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function D_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function N_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function U_(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Lp={DEG2RAD:Ir,RAD2DEG:Jr,generateUUID:Ms,clamp:Qe,euclideanModulo:Ah,mapLinear:y_,inverseLerp:M_,lerp:Dr,damp:b_,pingpong:S_,smoothstep:w_,smootherstep:E_,randInt:T_,randFloat:A_,randFloatSpread:R_,seededRandom:C_,degToRad:P_,radToDeg:L_,isPowerOfTwo:I_,ceilPowerOfTwo:D_,floorPowerOfTwo:N_,setQuaternionFromProperEuler:U_,normalize:nn,denormalize:Gs},Jh=class Jh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jh.prototype.isVector2=!0;let ae=Jh;class Ji{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],y=r[o+3];if(h!==y||l!==d||c!==f||u!==g){let m=l*d+c*f+u*g+h*y;m<0&&(d=-d,f=-f,g=-g,y=-y,m=-m);let p=1-a;if(m<.9995){const x=Math.acos(m),S=Math.sin(x);p=Math.sin(p*x)/S,a=Math.sin(a*x)/S,l=l*p+d*a,c=c*p+f*a,u=u*p+g*a,h=h*p+y*a}else{l=l*p+d*a,c=c*p+f*a,u=u*p+g*a,h=h*p+y*a;const x=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=x,c*=x,u*=x,h*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-a*f,e[t+2]=c*g+u*f+a*d-l*h,e[t+3]=u*g-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),h=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const jh=class jh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ju.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dl.copy(this).projectOnVector(e),this.sub(dl)}reflect(e){return this.sub(dl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};jh.prototype.isVector3=!0;let D=jh;const dl=new D,ju=new Ji,Qh=class Qh{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],y=s[0],m=s[3],p=s[6],x=s[1],S=s[4],_=s[7],w=s[2],b=s[5],R=s[8];return r[0]=o*y+a*x+l*w,r[3]=o*m+a*S+l*b,r[6]=o*p+a*_+l*R,r[1]=c*y+u*x+h*w,r[4]=c*m+u*S+h*b,r[7]=c*p+u*_+h*R,r[2]=d*y+f*x+g*w,r[5]=d*m+f*S+g*b,r[8]=d*p+f*_+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=h*y,e[1]=(s*c-u*n)*y,e[2]=(a*n-s*o)*y,e[3]=d*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Js("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fl.makeScale(e,t)),this}rotate(e){return Js("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fl.makeRotation(-e)),this}translate(e,t){return Js("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Qh.prototype.isMatrix3=!0;let qe=Qh;const fl=new qe,Qu=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ed=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function k_(){const i={enabled:!0,workingColorSpace:Ta,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===gt&&(s.r=_i(s.r),s.g=_i(s.g),s.b=_i(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===gt&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?Aa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ta]:{primaries:e,whitePoint:n,transfer:Aa,toXYZ:Qu,fromXYZ:ed,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:Qu,fromXYZ:ed,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),i}const st=k_();function _i(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Rs;class F_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rs===void 0&&(Rs=Ra("canvas")),Rs.width=e.width,Rs.height=e.height;const s=Rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Rs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ra("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=_i(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_i(t[n]/255)*255):t[n]=_i(t[n]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let O_=0;class Rh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(pl(s[o].image)):r.push(pl(s[o]))}else r=pl(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function pl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?F_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let B_=0;const ml=new D;class rn extends ts{constructor(e=rn.DEFAULT_IMAGE,t=rn.DEFAULT_MAPPING,n=pi,s=pi,r=jt,o=hs,a=Fn,l=Mn,c=rn.DEFAULT_ANISOTROPY,u=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B_++}),this.uuid=Ms(),this.name="",this.source=new Rh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ml).x}get height(){return this.source.getSize(ml).y}get depth(){return this.source.getSize(ml).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lc:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lc:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=bp;rn.DEFAULT_ANISOTROPY=1;const eu=class eu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,_=(f+1)/2,w=(p+1)/2,b=(u+d)/4,R=(h+y)/4,M=(g+m)/4;return S>_&&S>w?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=b/n,r=R/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=b/s,r=M/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=M/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-y)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};eu.prototype.isVector4=!0;let Pt=eu;class z_ extends ts{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new rn(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Rh(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends z_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ip extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class H_ extends rn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ha=class Ha{constructor(e,t,n,s,r,o,a,l,c,u,h,d,f,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,y,m)}set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,y,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ha().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),o=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,g=a*u,y=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-y*c,t[9]=-a*l,t[2]=y-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,y=c*h;t[0]=d+y*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=y+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,y=c*h;t[0]=d-y*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=y-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,g=a*u,y=a*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+y,t[1]=l*h,t[5]=y*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,y=a*c;t[0]=l*u,t[4]=y-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-y*h}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,y=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+y,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=y*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G_,e,V_)}lookAt(e,t,n){const s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ri.crossVectors(n,mn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ri.crossVectors(n,mn)),Ri.normalize(),Lo.crossVectors(mn,Ri),s[0]=Ri.x,s[4]=Lo.x,s[8]=mn.x,s[1]=Ri.y,s[5]=Lo.y,s[9]=mn.y,s[2]=Ri.z,s[6]=Lo.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],x=n[3],S=n[7],_=n[11],w=n[15],b=s[0],R=s[4],M=s[8],A=s[12],C=s[1],L=s[5],I=s[9],k=s[13],N=s[2],B=s[6],H=s[10],G=s[14],j=s[3],Y=s[7],Q=s[11],se=s[15];return r[0]=o*b+a*C+l*N+c*j,r[4]=o*R+a*L+l*B+c*Y,r[8]=o*M+a*I+l*H+c*Q,r[12]=o*A+a*k+l*G+c*se,r[1]=u*b+h*C+d*N+f*j,r[5]=u*R+h*L+d*B+f*Y,r[9]=u*M+h*I+d*H+f*Q,r[13]=u*A+h*k+d*G+f*se,r[2]=g*b+y*C+m*N+p*j,r[6]=g*R+y*L+m*B+p*Y,r[10]=g*M+y*I+m*H+p*Q,r[14]=g*A+y*k+m*G+p*se,r[3]=x*b+S*C+_*N+w*j,r[7]=x*R+S*L+_*B+w*Y,r[11]=x*M+S*I+_*H+w*Q,r[15]=x*A+S*k+_*G+w*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],y=e[7],m=e[11],p=e[15],x=l*f-c*d,S=a*f-c*h,_=a*d-l*h,w=o*f-c*u,b=o*d-l*u,R=o*h-a*u;return t*(y*x-m*S+p*_)-n*(g*x-m*w+p*b)+s*(g*S-y*w+p*R)-r*(g*_-y*b+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+s*(r*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],y=e[13],m=e[14],p=e[15],x=t*a-n*o,S=t*l-s*o,_=t*c-r*o,w=n*l-s*a,b=n*c-r*a,R=s*c-r*l,M=u*y-h*g,A=u*m-d*g,C=u*p-f*g,L=h*m-d*y,I=h*p-f*y,k=d*p-f*m,N=x*k-S*I+_*L+w*C-b*A+R*M;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/N;return e[0]=(a*k-l*I+c*L)*B,e[1]=(s*I-n*k-r*L)*B,e[2]=(y*R-m*b+p*w)*B,e[3]=(d*b-h*R-f*w)*B,e[4]=(l*C-o*k-c*A)*B,e[5]=(t*k-s*C+r*A)*B,e[6]=(m*_-g*R-p*S)*B,e[7]=(u*R-d*_+f*S)*B,e[8]=(o*I-a*C+c*M)*B,e[9]=(n*C-t*I-r*M)*B,e[10]=(g*b-y*_+p*x)*B,e[11]=(h*_-u*b-f*x)*B,e[12]=(a*A-o*L-l*M)*B,e[13]=(t*L-n*A+s*M)*B,e[14]=(y*S-g*w-m*x)*B,e[15]=(u*w-h*S+d*x)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,g=r*h,y=o*u,m=o*h,p=a*h,x=l*c,S=l*u,_=l*h,w=n.x,b=n.y,R=n.z;return s[0]=(1-(y+p))*w,s[1]=(f+_)*w,s[2]=(g-S)*w,s[3]=0,s[4]=(f-_)*b,s[5]=(1-(d+p))*b,s[6]=(m+x)*b,s[7]=0,s[8]=(g+S)*R,s[9]=(m-x)*R,s[10]=(1-(d+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Cs.set(s[0],s[1],s[2]).length();const a=Cs.set(s[4],s[5],s[6]).length(),l=Cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Ln.copy(this);const c=1/o,u=1/a,h=1/l;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=u,Ln.elements[5]*=u,Ln.elements[6]*=u,Ln.elements[8]*=h,Ln.elements[9]*=h,Ln.elements[10]*=h,t.setFromRotationMatrix(Ln),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=Jn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let g,y;if(l)g=r/(o-r),y=o*r/(o-r);else if(a===Jn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Kr)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Jn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,y;if(l)g=1/(o-r),y=o/(o-r);else if(a===Jn)g=-2/(o-r),y=-(o+r)/(o-r);else if(a===Kr)g=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ha.prototype.isMatrix4=!0;let wt=Ha;const Cs=new D,Ln=new wt,G_=new D(0,0,0),V_=new D(1,1,1),Ri=new D,Lo=new D,mn=new D,td=new wt,nd=new Ji;class ji{constructor(e=0,t=0,n=0,s=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(td,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nd.setFromEuler(this),this.setFromQuaternion(nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Ch{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $_=0;const id=new D,Ps=new Ji,li=new wt,Io=new D,mr=new D,W_=new D,X_=new Ji,sd=new D(1,0,0),rd=new D(0,1,0),od=new D(0,0,1),ad={type:"added"},Y_={type:"removed"},Ls={type:"childadded",child:null},gl={type:"childremoved",child:null};class zt extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=Ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new D,t=new ji,n=new Ji,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new wt},normalMatrix:{value:new qe}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ch,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(sd,e)}rotateY(e){return this.rotateOnAxis(rd,e)}rotateZ(e){return this.rotateOnAxis(od,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sd,e)}translateY(e){return this.translateOnAxis(rd,e)}translateZ(e){return this.translateOnAxis(od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Io.copy(e):Io.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(mr,Io,this.up):li.lookAt(Io,mr,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(li),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ad),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Y_),gl.child=e,this.dispatchEvent(gl),gl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ad),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,e,W_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,X_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}zt.DEFAULT_UP=new D(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ze extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const q_={type:"move"};class _l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(q_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Dp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Do={h:0,s:0,l:0};function vl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=An){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=Ah(e,1),t=Qe(t,0,1),n=Qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=vl(o,r,e+1/3),this.g=vl(o,r,e),this.b=vl(o,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=An){function n(r){r!==void 0&&parseFloat(r)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=An){const n=Dp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=An){return st.workingToColorSpace(Kt.copy(this),e),Math.round(Qe(Kt.r*255,0,255))*65536+Math.round(Qe(Kt.g*255,0,255))*256+Math.round(Qe(Kt.b*255,0,255))}getHexString(e=An){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Kt.copy(this),t);const n=Kt.r,s=Kt.g,r=Kt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=An){st.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,n=Kt.g,s=Kt.b;return e!==An?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(Do);const n=Dr(Ci.h,Do.h,t),s=Dr(Ci.s,Do.s,t),r=Dr(Ci.l,Do.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new et;et.NAMES=Dp;class Ph{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new et(e),this.near=t,this.far=n}clone(){return new Ph(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Np extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const In=new D,ci=new D,xl=new D,hi=new D,Is=new D,Ds=new D,ld=new D,yl=new D,Ml=new D,bl=new D,Sl=new Pt,wl=new Pt,El=new Pt;class Nn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),In.subVectors(e,t),s.cross(In);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){In.subVectors(s,t),ci.subVectors(n,t),xl.subVectors(e,t);const o=In.dot(In),a=In.dot(ci),l=In.dot(xl),c=ci.dot(ci),u=ci.dot(xl),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Sl.setScalar(0),wl.setScalar(0),El.setScalar(0),Sl.fromBufferAttribute(e,t),wl.fromBufferAttribute(e,n),El.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Sl,r.x),o.addScaledVector(wl,r.y),o.addScaledVector(El,r.z),o}static isFrontFacing(e,t,n,s){return In.subVectors(n,t),ci.subVectors(e,t),In.cross(ci).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),In.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Nn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Nn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Is.subVectors(s,n),Ds.subVectors(r,n),yl.subVectors(e,n);const l=Is.dot(yl),c=Ds.dot(yl);if(l<=0&&c<=0)return t.copy(n);Ml.subVectors(e,s);const u=Is.dot(Ml),h=Ds.dot(Ml);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Is,o);bl.subVectors(e,r);const f=Is.dot(bl),g=Ds.dot(bl);if(g>=0&&f<=g)return t.copy(r);const y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ds,a);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return ld.subVectors(r,s),a=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(ld,a);const p=1/(m+y+d);return o=y*p,a=d*p,t.copy(n).addScaledVector(Is,o).addScaledVector(Ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class bi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),No.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),No.copy(n.boundingBox)),No.applyMatrix4(e.matrixWorld),this.union(No)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),Uo.subVectors(this.max,gr),Ns.subVectors(e.a,gr),Us.subVectors(e.b,gr),ks.subVectors(e.c,gr),Pi.subVectors(Us,Ns),Li.subVectors(ks,Us),ss.subVectors(Ns,ks);let t=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-ss.z,ss.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,ss.z,0,-ss.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-ss.y,ss.x,0];return!Tl(t,Ns,Us,ks,Uo)||(t=[1,0,0,0,1,0,0,0,1],!Tl(t,Ns,Us,ks,Uo))?!1:(ko.crossVectors(Pi,Li),t=[ko.x,ko.y,ko.z],Tl(t,Ns,Us,ks,Uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ui=[new D,new D,new D,new D,new D,new D,new D,new D],Dn=new D,No=new bi,Ns=new D,Us=new D,ks=new D,Pi=new D,Li=new D,ss=new D,gr=new D,Uo=new D,ko=new D,rs=new D;function Tl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){rs.fromArray(i,r);const a=s.x*Math.abs(rs.x)+s.y*Math.abs(rs.y)+s.z*Math.abs(rs.z),l=e.dot(rs),c=t.dot(rs),u=n.dot(rs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ft=new D,Fo=new ae;let Z_=0;class vi extends ts{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Z_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=m_,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fo.fromBufferAttribute(this,t),Fo.applyMatrix3(e),this.setXY(t,Fo.x,Fo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gs(t,this.array)),t}setX(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gs(t,this.array)),t}setY(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gs(t,this.array)),t}setW(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),s=nn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Up extends vi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kp extends vi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ct extends vi{constructor(e,t,n){super(new Float32Array(e),t,n)}}const K_=new bi,_r=new D,Al=new D;class mo{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):K_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);const t=_r.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(_r,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Al.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(Al)),this.expandByPoint(_r.copy(e.center).sub(Al))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let J_=0;const En=new wt,Rl=new zt,Fs=new D,gn=new bi,vr=new bi,$t=new D;class Ut extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=Ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(g_(e)?kp:Up)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return Rl.lookAt(e),Rl.updateMatrix(),this.applyMatrix4(Rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];vr.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(gn.min,vr.min),gn.expandByPoint($t),$t.addVectors(gn.max,vr.max),gn.expandByPoint($t)):(gn.expandByPoint(vr.min),gn.expandByPoint(vr.max))}gn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared($t));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)$t.fromBufferAttribute(a,c),l&&(Fs.fromBufferAttribute(e,c),$t.add(Fs)),s=Math.max(s,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new vi(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let M=0;M<n.count;M++)a[M]=new D,l[M]=new D;const c=new D,u=new D,h=new D,d=new ae,f=new ae,g=new ae,y=new D,m=new D;function p(M,A,C){c.fromBufferAttribute(n,M),u.fromBufferAttribute(n,A),h.fromBufferAttribute(n,C),d.fromBufferAttribute(r,M),f.fromBufferAttribute(r,A),g.fromBufferAttribute(r,C),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(L),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(L),a[M].add(y),a[A].add(y),a[C].add(y),l[M].add(m),l[A].add(m),l[C].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,A=x.length;M<A;++M){const C=x[M],L=C.start,I=C.count;for(let k=L,N=L+I;k<N;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const S=new D,_=new D,w=new D,b=new D;function R(M){w.fromBufferAttribute(s,M),b.copy(w);const A=a[M];S.copy(A),S.sub(w.multiplyScalar(w.dot(A))).normalize(),_.crossVectors(b,A);const L=_.dot(l[M])<0?-1:1;o.setXYZW(M,S.x,S.y,S.z,L)}for(let M=0,A=x.length;M<A;++M){const C=x[M],L=C.start,I=C.count;for(let k=L,N=L+I;k<N;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,o=new D,a=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new vi(d,u,h)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cl=new D,j_=new D,Q_=new qe;class Xn{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Cl.subVectors(n,t).cross(j_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Cl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Q_.getNormalMatrix(e),s=this.coplanarPoint(Cl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ev=0;class bs extends ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=Ms(),this.name="",this.type="Material",this.blending=Lr,this.side=gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fp,this.blendDst=pp,this.blendEquation=Hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ul,this.stencilZFail=ul,this.stencilZPass=ul,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Xn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const di=new D,Pl=new D,Oo=new D,Bo=new D;class go{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Pl.copy(e).add(t).multiplyScalar(.5),Oo.copy(t).sub(e).normalize(),Bo.copy(this.origin).sub(Pl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Oo),a=Bo.dot(this.direction),l=-Bo.dot(Oo),c=Bo.lengthSq(),u=Math.abs(1-o*o);let h,d,f,g;if(u>0)if(h=o*l-a,d=o*a-l,g=r*u,h>=0)if(d>=-g)if(d<=g){const y=1/u;h*=y,d*=y,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Pl).addScaledVector(Oo,d),f}intersectSphere(e,t){if(e.radius<0)return null;di.subVectors(e.center,this.origin);const n=di.dot(this.direction),s=di.dot(di)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,n,s,r){const o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,h=e.x-o.x,d=e.y-o.y,f=e.z-o.z,g=t.x-o.x,y=t.y-o.y,m=t.z-o.z,p=n.x-o.x,x=n.y-o.y,S=n.z-o.z,_=Math.abs(l),w=Math.abs(c),b=Math.abs(u);let R,M,A,C,L,I,k,N,B,H,G,j;if(_>=w&&_>=b?(A=l,I=h,B=g,j=p,l>=0?(R=c,M=u,C=d,L=f,k=y,N=m,H=x,G=S):(R=u,M=c,C=f,L=d,k=m,N=y,H=S,G=x)):w>=b?(A=c,I=d,B=y,j=x,c>=0?(R=u,M=l,C=f,L=h,k=m,N=g,H=S,G=p):(R=l,M=u,C=h,L=f,k=g,N=m,H=p,G=S)):(A=u,I=f,B=m,j=S,u>=0?(R=l,M=c,C=h,L=d,k=g,N=y,H=p,G=x):(R=c,M=l,C=d,L=h,k=y,N=g,H=x,G=p)),A===0)return null;const Y=R/A,Q=M/A,se=1/A,Ue=C-Y*I,Ce=L-Q*I,ut=k-Y*B,tt=N-Q*B,ot=H-Y*j,K=G-Q*j,ne=ot*tt-K*ut,Me=Ue*K-Ce*ot,Ge=ut*Ce-tt*Ue;if(s){if(ne<0||Me<0||Ge<0)return null}else if((ne<0||Me<0||Ge<0)&&(ne>0||Me>0||Ge>0))return null;const Ee=ne+Me+Ge;if(Ee===0)return null;const $e=se*(ne*I+Me*B+Ge*j);return(Ee>0?$e<0:$e>0)?null:this.at($e/Ee,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nr extends bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=mp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cd=new wt,os=new go,zo=new mo,hd=new D,Ho=new D,Go=new D,Vo=new D,Ll=new D,$o=new D,ud=new D,Wo=new D;class xt extends zt{constructor(e=new Ut,t=new Nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){$o.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Ll.fromBufferAttribute(h,e),o?$o.addScaledVector(Ll,u):$o.addScaledVector(Ll.sub(t),u))}t.add($o)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(zo.containsPoint(os.origin)===!1&&(os.intersectSphere(zo,hd)===null||os.origin.distanceToSquared(hd)>(e.far-e.near)**2))&&(cd.copy(r).invert(),os.copy(e.ray).applyMatrix4(cd),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){const m=d[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,w=S;_<w;_+=3){const b=a.getX(_),R=a.getX(_+1),M=a.getX(_+2);s=Xo(this,p,e,n,c,u,h,b,R,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const x=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);s=Xo(this,o,e,n,c,u,h,x,S,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){const m=d[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,w=S;_<w;_+=3){const b=_,R=_+1,M=_+2;s=Xo(this,p,e,n,c,u,h,b,R,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const x=m,S=m+1,_=m+2;s=Xo(this,o,e,n,c,u,h,x,S,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function tv(i,e,t,n,s,r,o,a){let l;if(e.side===dn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===gs,a),l===null)return null;Wo.copy(a),Wo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Wo);return c<t.near||c>t.far?null:{distance:c,point:Wo.clone(),object:i}}function Xo(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Ho),i.getVertexPosition(l,Go),i.getVertexPosition(c,Vo);const u=tv(i,e,t,n,Ho,Go,Vo,ud);if(u){const h=new D;Nn.getBarycoord(ud,Ho,Go,Vo,h),s&&(u.uv=Nn.getInterpolatedAttribute(s,a,l,c,h,new ae)),r&&(u.uv1=Nn.getInterpolatedAttribute(r,a,l,c,h,new ae)),o&&(u.normal=Nn.getInterpolatedAttribute(o,a,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new D,materialIndex:0};Nn.getNormal(Ho,Go,Vo,d.normal),u.face=d,u.barycoord=h}return u}class nv extends rn{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Xt,u=Xt,h,d){super(null,o,a,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const as=new mo,iv=new ae(.5,.5),Yo=new D;class Lh{constructor(e=new Xn,t=new Xn,n=new Xn,s=new Xn,r=new Xn,o=new Xn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],g=r[8],y=r[9],m=r[10],p=r[11],x=r[12],S=r[13],_=r[14],w=r[15];if(s[0].setComponents(c-o,f-u,p-g,w-x).normalize(),s[1].setComponents(c+o,f+u,p+g,w+x).normalize(),s[2].setComponents(c+a,f+h,p+y,w+S).normalize(),s[3].setComponents(c-a,f-h,p-y,w-S).normalize(),n)s[4].setComponents(l,d,m,_).normalize(),s[5].setComponents(c-l,f-d,p-m,w-_).normalize();else if(s[4].setComponents(c-l,f-d,p-m,w-_).normalize(),t===Jn)s[5].setComponents(c+l,f+d,p+m,w+_).normalize();else if(t===Kr)s[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);const t=iv.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Yo.x=s.normal.x>0?e.max.x:e.min.x,Yo.y=s.normal.y>0?e.max.y:e.min.y,Yo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Yo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ih extends bs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new D,Pa=new D,dd=new wt,xr=new go,qo=new mo,Il=new D,fd=new D;class pd extends zt{constructor(e=new Ut,t=new Ih){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ca.fromBufferAttribute(t,s-1),Pa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ca.distanceTo(Pa);e.setAttribute("lineDistance",new Ct(n,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qo.copy(n.boundingSphere),qo.applyMatrix4(s),qo.radius+=r,e.ray.intersectsSphere(qo)===!1)return;dd.copy(s).invert(),xr.copy(e.ray).applyMatrix4(dd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=c){const p=u.getX(y),x=u.getX(y+1),S=Zo(this,e,xr,l,p,x,y);S&&t.push(S)}if(this.isLineLoop){const y=u.getX(g-1),m=u.getX(f),p=Zo(this,e,xr,l,y,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let y=f,m=g-1;y<m;y+=c){const p=Zo(this,e,xr,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=Zo(this,e,xr,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Zo(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(Ca.fromBufferAttribute(a,s),Pa.fromBufferAttribute(a,r),t.distanceSqToSegment(Ca,Pa,Il,fd)>n)return;Il.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Il);if(!(c<e.near||c>e.far))return{distance:c,point:fd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}class Fp extends bs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const md=new wt,Hc=new go,Ko=new mo,Jo=new D;class sv extends zt{constructor(e=new Ut,t=new Fp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(s),Ko.radius+=r,e.ray.intersectsSphere(Ko)===!1)return;md.copy(s).invert(),Hc.copy(e.ray).applyMatrix4(md);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,y=f;g<y;g++){const m=c.getX(g);Jo.fromBufferAttribute(h,m),gd(Jo,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,y=f;g<y;g++)Jo.fromBufferAttribute(h,g),gd(Jo,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function gd(i,e,t,n,s,r,o){const a=Hc.distanceSqToPoint(i);if(a<t){const l=new D;Hc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Op extends rn{constructor(e=[],t=_s,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jr extends rn{constructor(e,t,n=ei,s,r,o,a=Xt,l=Xt,c,u=Mi,h=1){if(u!==Mi&&u!==us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class rv extends jr{constructor(e,t=ei,n=_s,s,r,o=Xt,a=Xt,l,c=Mi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bp extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ht extends Ut{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(h,2));function g(y,m,p,x,S,_,w,b,R,M,A){const C=_/R,L=w/M,I=_/2,k=w/2,N=b/2,B=R+1,H=M+1;let G=0,j=0;const Y=new D;for(let Q=0;Q<H;Q++){const se=Q*L-k;for(let Ue=0;Ue<B;Ue++){const Ce=Ue*C-I;Y[y]=Ce*x,Y[m]=se*S,Y[p]=N,c.push(Y.x,Y.y,Y.z),Y[y]=0,Y[m]=0,Y[p]=b>0?1:-1,u.push(Y.x,Y.y,Y.z),h.push(Ue/R),h.push(1-Q/M),G+=1}}for(let Q=0;Q<M;Q++)for(let se=0;se<R;se++){const Ue=d+se+B*Q,Ce=d+se+B*(Q+1),ut=d+(se+1)+B*(Q+1),tt=d+(se+1)+B*Q;l.push(Ue,Ce,tt),l.push(Ce,ut,tt),j+=6}a.addGroup(f,j,A),f+=j,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class It extends Ut{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const y=[],m=n/2;let p=0;x(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Ct(h,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(f,2));function x(){const _=new D,w=new D;let b=0;const R=(t-e)/n;for(let M=0;M<=r;M++){const A=[],C=M/r,L=C*(t-e)+e;for(let I=0;I<=s;I++){const k=I/s,N=k*l+a,B=Math.sin(N),H=Math.cos(N);w.x=L*B,w.y=-C*n+m,w.z=L*H,h.push(w.x,w.y,w.z),_.set(B,R,H).normalize(),d.push(_.x,_.y,_.z),f.push(k,1-C),A.push(g++)}y.push(A)}for(let M=0;M<s;M++)for(let A=0;A<r;A++){const C=y[A][M],L=y[A+1][M],I=y[A+1][M+1],k=y[A][M+1];(e>0||A!==0)&&(u.push(C,L,k),b+=3),(t>0||A!==r-1)&&(u.push(L,I,k),b+=3)}c.addGroup(p,b,0),p+=b}function S(_){const w=g,b=new ae,R=new D;let M=0;const A=_===!0?e:t,C=_===!0?1:-1;for(let I=1;I<=s;I++)h.push(0,m*C,0),d.push(0,C,0),f.push(.5,.5),g++;const L=g;for(let I=0;I<=s;I++){const N=I/s*l+a,B=Math.cos(N),H=Math.sin(N);R.x=A*H,R.y=m*C,R.z=A*B,h.push(R.x,R.y,R.z),d.push(0,C,0),b.x=B*.5+.5,b.y=H*.5*C+.5,f.push(b.x,b.y),g++}for(let I=0;I<s;I++){const k=w+I,N=L+I;_===!0?u.push(N,N+1,k):u.push(N+1,N,k),M+=3}c.addGroup(p,M,_===!0?1:2),p+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rt extends It{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Rt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xa extends Ut{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new Ct(r,3)),this.setAttribute("normal",new Ct(r.slice(),3)),this.setAttribute("uv",new Ct(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const S=new D,_=new D,w=new D;for(let b=0;b<t.length;b+=3)f(t[b+0],S),f(t[b+1],_),f(t[b+2],w),l(S,_,w,x)}function l(x,S,_,w){const b=w+1,R=[];for(let M=0;M<=b;M++){R[M]=[];const A=x.clone().lerp(_,M/b),C=S.clone().lerp(_,M/b),L=b-M;for(let I=0;I<=L;I++)I===0&&M===b?R[M][I]=A:R[M][I]=A.clone().lerp(C,I/L)}for(let M=0;M<b;M++)for(let A=0;A<2*(b-M)-1;A++){const C=Math.floor(A/2);A%2===0?(d(R[M][C+1]),d(R[M+1][C]),d(R[M][C])):(d(R[M][C+1]),d(R[M+1][C+1]),d(R[M+1][C]))}}function c(x){const S=new D;for(let _=0;_<r.length;_+=3)S.x=r[_+0],S.y=r[_+1],S.z=r[_+2],S.normalize().multiplyScalar(x),r[_+0]=S.x,r[_+1]=S.y,r[_+2]=S.z}function u(){const x=new D;for(let S=0;S<r.length;S+=3){x.x=r[S+0],x.y=r[S+1],x.z=r[S+2];const _=m(x)/2/Math.PI+.5,w=p(x)/Math.PI+.5;o.push(_,1-w)}g(),h()}function h(){for(let x=0;x<o.length;x+=6){const S=o[x+0],_=o[x+2],w=o[x+4],b=Math.max(S,_,w),R=Math.min(S,_,w);b>.9&&R<.1&&(S<.2&&(o[x+0]+=1),_<.2&&(o[x+2]+=1),w<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,S){const _=x*3;S.x=e[_+0],S.y=e[_+1],S.z=e[_+2]}function g(){const x=new D,S=new D,_=new D,w=new D,b=new ae,R=new ae,M=new ae;for(let A=0,C=0;A<r.length;A+=9,C+=6){x.set(r[A+0],r[A+1],r[A+2]),S.set(r[A+3],r[A+4],r[A+5]),_.set(r[A+6],r[A+7],r[A+8]),b.set(o[C+0],o[C+1]),R.set(o[C+2],o[C+3]),M.set(o[C+4],o[C+5]),w.copy(x).add(S).add(_).divideScalar(3);const L=m(w);y(b,C+0,x,L),y(R,C+2,S,L),y(M,C+4,_,L)}}function y(x,S,_,w){w<0&&x.x===1&&(o[S]=x.x-1),_.x===0&&_.z===0&&(o[S]=w/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.vertices,e.indices,e.radius,e.detail)}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(o-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ae:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new D,s=[],r=[],o=[],a=new D,l=new wt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Qe(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Dh extends ai{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ae){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ov extends Dh{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Nh(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const _d=new D,vd=new D,Dl=new Nh,Nl=new Nh,Ul=new Nh;class av extends ai{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(vd.subVectors(s[0],s[1]).add(s[0]),c=vd);const h=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(_d.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=_d),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),f),y=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Dl.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,y,m),Nl.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,y,m),Ul.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,y,m)}else this.curveType==="catmullrom"&&(Dl.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Nl.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ul.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Dl.calc(l),Nl.calc(l),Ul.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function xd(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function lv(i,e){const t=1-i;return t*t*e}function cv(i,e){return 2*(1-i)*i*e}function hv(i,e){return i*i*e}function Ur(i,e,t,n){return lv(i,e)+cv(i,t)+hv(i,n)}function uv(i,e){const t=1-i;return t*t*t*e}function dv(i,e){const t=1-i;return 3*t*t*i*e}function fv(i,e){return 3*(1-i)*i*i*e}function pv(i,e){return i*i*i*e}function kr(i,e,t,n,s){return uv(i,e)+dv(i,t)+fv(i,n)+pv(i,s)}class zp extends ai{constructor(e=new ae,t=new ae,n=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ae){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mv extends ai{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y),kr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Hp extends ai{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gv extends ai{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gp extends ai{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ur(e,s.x,r.x,o.x),Ur(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _v extends ai{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ur(e,s.x,r.x,o.x),Ur(e,s.y,r.y,o.y),Ur(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vp extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(xd(a,l.x,c.x,u.x,h.x),xd(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ae().fromArray(s))}return this}}var Gc=Object.freeze({__proto__:null,ArcCurve:ov,CatmullRomCurve3:av,CubicBezierCurve:zp,CubicBezierCurve3:mv,EllipseCurve:Dh,LineCurve:Hp,LineCurve3:gv,QuadraticBezierCurve:Gp,QuadraticBezierCurve3:_v,SplineCurve:Vp});class vv extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Gc[s.type]().fromJSON(s))}return this}}class La extends vv{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Hp(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Gp(this.currentPoint.clone(),new ae(e,t),new ae(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new zp(this.currentPoint.clone(),new ae(e,t),new ae(n,s),new ae(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Vp(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Dh(e,t,n,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ya extends La{constructor(e){super(e),this.uuid=Ms(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new La().fromJSON(s))}return this}}function xv(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=$p(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=wv(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let u=a,h=l;for(let d=t;d<s;d+=t){const f=i[d],g=i[d+1];f<a&&(a=f),g<l&&(l=g),f>u&&(u=f),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Qr(r,o,t,a,l,c,0),o}function $p(i,e,t,n,s){let r;if(s===Uv(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=yd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=yd(o/n|0,i[o],i[o+1],r);return r&&sr(r,r.next)&&(to(r),r=r.next),r}function xs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(sr(t,t.next)||Lt(t.prev,t,t.next)===0)){if(to(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Cv(i,n,s,r);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Mv(i,n,s,r):yv(i)){e.push(l.i,i.i,c.i),to(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=bv(xs(i),e),Qr(i,e,t,n,s,r,2)):o===2&&Sv(i,e,t,n,s,r):Qr(xs(i),e,t,n,s,r,1);break}}}function yv(i){const e=i.prev,t=i,n=i.next;if(Lt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(s,r,o),h=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Tr(s,a,r,l,o,c,g.x,g.y)&&Lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Mv(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Lt(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,d=o.y,f=Math.min(a,l,c),g=Math.min(u,h,d),y=Math.max(a,l,c),m=Math.max(u,h,d),p=Vc(f,g,e,t,n),x=Vc(y,m,e,t,n);let S=i.prevZ,_=i.nextZ;for(;S&&S.z>=p&&_&&_.z<=x;){if(S.x>=f&&S.x<=y&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Tr(a,u,l,h,c,d,S.x,S.y)&&Lt(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Tr(a,u,l,h,c,d,_.x,_.y)&&Lt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=y&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Tr(a,u,l,h,c,d,S.x,S.y)&&Lt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=x;){if(_.x>=f&&_.x<=y&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Tr(a,u,l,h,c,d,_.x,_.y)&&Lt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function bv(i,e){let t=i;do{const n=t.prev,s=t.next.next;!sr(n,s)&&Xp(n,t,t.next,s)&&eo(n,s)&&eo(s,n)&&(e.push(n.i,t.i,s.i),to(t),to(t.next),t=i=s),t=t.next}while(t!==i);return xs(t)}function Sv(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Iv(o,a)){let l=Yp(o,a);o=xs(o,o.next),l=xs(l,l.next),Qr(o,e,t,n,s,r,0),Qr(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function wv(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=$p(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Lv(c))}s.sort(Ev);for(let r=0;r<s.length;r++)t=Tv(s[r],t);return t}function Ev(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Tv(i,e){const t=Av(i,e);if(!t)return e;const n=Yp(t,i);return xs(n,n.next),xs(t,t.next)}function Av(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(sr(i,t))return t;do{if(sr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Wp(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);eo(t,i)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&Rv(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function Rv(i,e){return Lt(i.prev,i,e.prev)<0&&Lt(e.next,i,i.next)<0}function Cv(i,e,t,n){let s=i;do s.z===0&&(s.z=Vc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Pv(s)}function Pv(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Vc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Lv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Wp(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Tr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Wp(i,e,t,n,s,r,o,a)}function Iv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Dv(i,e)&&(eo(i,e)&&eo(e,i)&&Nv(i,e)&&(Lt(i.prev,i,e.prev)||Lt(i,e.prev,e))||sr(i,e)&&Lt(i.prev,i,i.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function sr(i,e){return i.x===e.x&&i.y===e.y}function Xp(i,e,t,n){const s=Qo(Lt(i,e,t)),r=Qo(Lt(i,e,n)),o=Qo(Lt(t,n,i)),a=Qo(Lt(t,n,e));return!!(s!==r&&o!==a||s===0&&jo(i,t,e)||r===0&&jo(i,n,e)||o===0&&jo(t,i,n)||a===0&&jo(t,e,n))}function jo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Qo(i){return i>0?1:i<0?-1:0}function Dv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Xp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function eo(i,e){return Lt(i.prev,i,i.next)<0?Lt(i,e,i.next)>=0&&Lt(i,i.prev,e)>=0:Lt(i,e,i.prev)<0||Lt(i,i.next,e)<0}function Nv(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Yp(i,e){const t=$c(i.i,i.x,i.y),n=$c(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function yd(i,e,t,n){const s=$c(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function to(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $c(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Uv(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class kv{static triangulate(e,t,n=2){return xv(e,t,n)}}class Ws{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ws.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Md(e),bd(n,e);let o=e.length;t.forEach(Md);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,bd(n,t[l]);const a=kv.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Md(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function bd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class _o extends Ut{constructor(e=new Ya([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Ct(s,3)),this.setAttribute("uv",new Ct(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Fv;let S,_=!1,w,b,R,M;if(p){S=p.getSpacedPoints(u),_=!0,d=!1;const ie=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,ie),b=new D,R=new D,M=new D}d||(m=0,f=0,g=0,y=0);const A=a.extractPoints(c);let C=A.shape;const L=A.holes;if(!Ws.isClockWise(C)){C=C.reverse();for(let ie=0,oe=L.length;ie<oe;ie++){const le=L[ie];Ws.isClockWise(le)&&(L[ie]=le.reverse())}}function k(ie){const le=10000000000000001e-36;let ce=ie[0];for(let de=1;de<=ie.length;de++){const ze=de%ie.length,Be=ie[ze],We=Be.x-ce.x,Ye=Be.y-ce.y,U=We*We+Ye*Ye,dt=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(ce.x),Math.abs(ce.y)),nt=le*dt*dt;if(U<=nt){ie.splice(ze,1),de--;continue}ce=Be}}k(C),L.forEach(k);const N=L.length,B=C;for(let ie=0;ie<N;ie++){const oe=L[ie];C=C.concat(oe)}function H(ie,oe,le){return oe||rt("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(oe,le)}const G=C.length;function j(ie,oe,le){let ce,de,ze;const Be=ie.x-oe.x,We=ie.y-oe.y,Ye=le.x-ie.x,U=le.y-ie.y,dt=Be*Be+We*We,nt=Be*U-We*Ye;if(Math.abs(nt)>Number.EPSILON){const P=Math.sqrt(dt),E=Math.sqrt(Ye*Ye+U*U),z=oe.x-We/P,W=oe.y+Be/P,q=le.x-U/E,he=le.y+Ye/E,ue=((q-z)*U-(he-W)*Ye)/(Be*U-We*Ye);ce=z+Be*ue-ie.x,de=W+We*ue-ie.y;const Z=ce*ce+de*de;if(Z<=2)return new ae(ce,de);ze=Math.sqrt(Z/2)}else{let P=!1;Be>Number.EPSILON?Ye>Number.EPSILON&&(P=!0):Be<-Number.EPSILON?Ye<-Number.EPSILON&&(P=!0):Math.sign(We)===Math.sign(U)&&(P=!0),P?(ce=-We,de=Be,ze=Math.sqrt(dt)):(ce=Be,de=We,ze=Math.sqrt(dt/2))}return new ae(ce/ze,de/ze)}const Y=[];for(let ie=0,oe=B.length,le=oe-1,ce=ie+1;ie<oe;ie++,le++,ce++)le===oe&&(le=0),ce===oe&&(ce=0),Y[ie]=j(B[ie],B[le],B[ce]);const Q=[];let se,Ue=Y.concat();for(let ie=0,oe=N;ie<oe;ie++){const le=L[ie];se=[];for(let ce=0,de=le.length,ze=de-1,Be=ce+1;ce<de;ce++,ze++,Be++)ze===de&&(ze=0),Be===de&&(Be=0),se[ce]=j(le[ce],le[ze],le[Be]);Q.push(se),Ue=Ue.concat(se)}let Ce;if(m===0)Ce=Ws.triangulateShape(B,L);else{const ie=[],oe=[];for(let le=0;le<m;le++){const ce=le/m,de=f*Math.cos(ce*Math.PI/2),ze=g*Math.sin(ce*Math.PI/2)+y;for(let Be=0,We=B.length;Be<We;Be++){const Ye=H(B[Be],Y[Be],ze);Me(Ye.x,Ye.y,-de),ce===0&&ie.push(Ye)}for(let Be=0,We=N;Be<We;Be++){const Ye=L[Be];se=Q[Be];const U=[];for(let dt=0,nt=Ye.length;dt<nt;dt++){const P=H(Ye[dt],se[dt],ze);Me(P.x,P.y,-de),ce===0&&U.push(P)}ce===0&&oe.push(U)}}Ce=Ws.triangulateShape(ie,oe)}const ut=Ce.length,tt=g+y;for(let ie=0;ie<G;ie++){const oe=d?H(C[ie],Ue[ie],tt):C[ie];_?(R.copy(w.normals[0]).multiplyScalar(oe.x),b.copy(w.binormals[0]).multiplyScalar(oe.y),M.copy(S[0]).add(R).add(b),Me(M.x,M.y,M.z)):Me(oe.x,oe.y,0)}for(let ie=1;ie<=u;ie++)for(let oe=0;oe<G;oe++){const le=d?H(C[oe],Ue[oe],tt):C[oe];_?(R.copy(w.normals[ie]).multiplyScalar(le.x),b.copy(w.binormals[ie]).multiplyScalar(le.y),M.copy(S[ie]).add(R).add(b),Me(M.x,M.y,M.z)):Me(le.x,le.y,h/u*ie)}for(let ie=m-1;ie>=0;ie--){const oe=ie/m,le=f*Math.cos(oe*Math.PI/2),ce=g*Math.sin(oe*Math.PI/2)+y;for(let de=0,ze=B.length;de<ze;de++){const Be=H(B[de],Y[de],ce);Me(Be.x,Be.y,h+le)}for(let de=0,ze=L.length;de<ze;de++){const Be=L[de];se=Q[de];for(let We=0,Ye=Be.length;We<Ye;We++){const U=H(Be[We],se[We],ce);_?Me(U.x,U.y+S[u-1].y,S[u-1].x+le):Me(U.x,U.y,h+le)}}}ot(),K();function ot(){const ie=s.length/3;if(d){let oe=0,le=G*oe;for(let ce=0;ce<ut;ce++){const de=Ce[ce];Ge(de[2]+le,de[1]+le,de[0]+le)}oe=u+m*2,le=G*oe;for(let ce=0;ce<ut;ce++){const de=Ce[ce];Ge(de[0]+le,de[1]+le,de[2]+le)}}else{for(let oe=0;oe<ut;oe++){const le=Ce[oe];Ge(le[2],le[1],le[0])}for(let oe=0;oe<ut;oe++){const le=Ce[oe];Ge(le[0]+G*u,le[1]+G*u,le[2]+G*u)}}n.addGroup(ie,s.length/3-ie,0)}function K(){const ie=s.length/3;let oe=0;ne(B,oe),oe+=B.length;for(let le=0,ce=L.length;le<ce;le++){const de=L[le];ne(de,oe),oe+=de.length}n.addGroup(ie,s.length/3-ie,1)}function ne(ie,oe){let le=ie.length;for(;--le>=0;){const ce=le;let de=le-1;de<0&&(de=ie.length-1);for(let ze=0,Be=u+m*2;ze<Be;ze++){const We=G*ze,Ye=G*(ze+1),U=oe+ce+We,dt=oe+de+We,nt=oe+de+Ye,P=oe+ce+Ye;Ee(U,dt,nt,P)}}}function Me(ie,oe,le){l.push(ie),l.push(oe),l.push(le)}function Ge(ie,oe,le){$e(ie),$e(oe),$e(le);const ce=s.length/3,de=x.generateTopUV(n,s,ce-3,ce-2,ce-1);mt(de[0]),mt(de[1]),mt(de[2])}function Ee(ie,oe,le,ce){$e(ie),$e(oe),$e(ce),$e(oe),$e(le),$e(ce);const de=s.length/3,ze=x.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);mt(ze[0]),mt(ze[1]),mt(ze[3]),mt(ze[1]),mt(ze[2]),mt(ze[3])}function $e(ie){s.push(l[ie*3+0]),s.push(l[ie*3+1]),s.push(l[ie*3+2])}function mt(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ov(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Gc[s.type]().fromJSON(s)),new _o(n,e.options)}}const Fv={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new ae(r,o),new ae(a,l),new ae(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],y=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ae(o,1-l),new ae(c,1-h),new ae(d,1-g),new ae(y,1-p)]:[new ae(a,1-l),new ae(u,1-h),new ae(f,1-g),new ae(m,1-p)]}};function Ov(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ys extends Xa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ys(e.radius,e.detail)}}class qa extends Ut{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,h=e/a,d=t/l,f=[],g=[],y=[],m=[];for(let p=0;p<u;p++){const x=p*d-o;for(let S=0;S<c;S++){const _=S*h-r;g.push(_,-x,0),y.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const S=x+c*p,_=x+c*(p+1),w=x+1+c*(p+1),b=x+1+c*p;f.push(S,_,b),f.push(_,w,b)}this.setIndex(f),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qa(e.width,e.height,e.widthSegments,e.heightSegments)}}class no extends Ut{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new D,d=new D,f=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){const x=[],S=p/n,_=o+S*a,w=e*Math.cos(_),b=Math.sqrt(e*e-w*w);let R=0;p===0&&o===0?R=.5/t:p===n&&l===Math.PI&&(R=-.5/t);for(let M=0;M<=t;M++){const A=M/t,C=s+A*r;h.x=-b*Math.cos(C),h.y=w,h.z=b*Math.sin(C),g.push(h.x,h.y,h.z),d.copy(h).normalize(),y.push(d.x,d.y,d.z),m.push(A+R,1-S),x.push(c++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const S=u[p][x+1],_=u[p][x],w=u[p+1][x],b=u[p+1][x+1];(p!==0||o>0)&&f.push(S,_,b),(p!==n-1||l<Math.PI)&&f.push(_,w,b)}this.setIndex(f),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new no(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Uh extends Xa{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Uh(e.radius,e.detail)}}class on extends Ut{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],h=[],d=new D,f=new D,g=new D;for(let y=0;y<=n;y++){const m=o+y/n*a;for(let p=0;p<=s;p++){const x=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(x),f.y=(e+t*Math.cos(m))*Math.sin(x),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),g.subVectors(f,d).normalize(),u.push(g.x,g.y,g.z),h.push(p/s),h.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){const p=(s+1)*y+m-1,x=(s+1)*(y-1)+m-1,S=(s+1)*(y-1)+m,_=(s+1)*y+m;l.push(p,x,_),l.push(x,S,_)}this.setIndex(l),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function rr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Sd(s))s.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Sd(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function sn(i){const e={};for(let t=0;t<i.length;t++){const n=rr(i[t]);for(const s in n)e[s]=n[s]}return e}function Sd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Bv(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function qp(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const zv={clone:rr,merge:sn};var Hv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hv,this.fragmentShader=Gv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=Bv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new et().setHex(s.value);break;case"v2":this.uniforms[n].value=new ae().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new wt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Vv extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bn extends bs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $v extends bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=o_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wv extends bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class wd extends Ih{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Zp extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Kp extends Zp{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new et(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const kl=new wt,Ed=new D,Td=new D;class Xv{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lh,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ed),Td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Td),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){kl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(kl,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Kr||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(kl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ea=new D,ta=new Ji,Vn=new D;class Jp extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,Vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ea,ta,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,Vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new D,Ad=new ae,Rd=new ae;class xn extends Jp{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Jr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,t){return this.getViewBounds(e,Ad,Rd),t.subVectors(Rd,Ad)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ir*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class kh extends Jp{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yv extends Xv{constructor(){super(new kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wc extends Zp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new Yv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Os=-90,Bs=1;class qv extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new xn(Os,Bs,e,t);s.layers=this.layers,this.add(s);const r=new xn(Os,Bs,e,t);r.layers=this.layers,this.add(r);const o=new xn(Os,Bs,e,t);o.layers=this.layers,this.add(o);const a=new xn(Os,Bs,e,t);a.layers=this.layers,this.add(a);const l=new xn(Os,Bs,e,t);l.layers=this.layers,this.add(l);const c=new xn(Os,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Zv extends xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Cd=new wt;class Kv{constructor(e,t,n=0,s=1/0){this.ray=new go(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ch,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):rt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cd),this}intersectObject(e,t=!0,n=[]){return Xc(e,this,n,t),n.sort(Pd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Xc(e[s],this,n,t);return n.sort(Pd),n}}function Pd(i,e){return i.distance-e.distance}function Xc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Xc(r[o],e,t,!0)}}class Yc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const tu=class tu{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};tu.prototype.isMatrix2=!0;let Ld=tu;class Jv extends ts{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Id(i,e,t,n){const s=jv(n);switch(t){case Ap:return i*e;case Cp:return i*e/s.components*s.byteLength;case bh:return i*e/s.components*s.byteLength;case vs:return i*e*2/s.components*s.byteLength;case Sh:return i*e*2/s.components*s.byteLength;case Rp:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case wh:return i*e*4/s.components*s.byteLength;case ua:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fa:case pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:case fc:return Math.max(i,16)*Math.max(e,8)/4;case hc:case dc:return Math.max(i,8)*Math.max(e,8)/2;case pc:case mc:case _c:case vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case gc:case wa:case xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case bc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case wc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Rc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Lc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Dc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Nc:case Uc:case kc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fc:case Oc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ea:case Bc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jv(i){switch(i){case Mn:case Sp:return{byteLength:1,components:1};case qr:case wp:case ti:return{byteLength:2,components:1};case yh:case Mh:return{byteLength:2,components:4};case ei:case xh:case Kn:return{byteLength:4,components:1};case Ep:case Tp:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vh}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vh);function jp(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Qv(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],y=h[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,h[d]=y)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const y=h[f];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ex=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tx=`#ifdef USE_ALPHAHASH
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
#endif`,nx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ix=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ox=`#ifdef USE_AOMAP
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
#endif`,ax=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lx=`#ifdef USE_BATCHING
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
#endif`,cx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ux=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,px=`#ifdef USE_BUMPMAP
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Sx=`#define PI 3.141592653589793
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
} // validated`,wx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ex=`vec3 transformedNormal = objectNormal;
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
#endif`,Tx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Px="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ix=`#ifdef USE_ENVMAP
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
#endif`,Dx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nx=`#ifdef USE_ENVMAP
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
#endif`,Ux=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kx=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hx=`#ifdef USE_GRADIENTMAP
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
}`,Gx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jx=`PhysicalMaterial material;
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
#endif`,jx=`uniform sampler2D dfgLUT;
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
}`,Qx=`
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
#endif`,ey=`#if defined( RE_IndirectDiffuse )
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
#endif`,ty=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ny=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,iy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ry=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ay=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ly=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hy=`#if defined( USE_POINTS_UV )
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
#endif`,uy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,py=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,my=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gy=`#ifdef USE_MORPHTARGETS
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
#endif`,_y=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,My=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,by=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sy=`#ifdef USE_NORMALMAP
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
#endif`,wy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ey=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ty=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ay=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ry=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Py=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ly=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Iy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ny=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Oy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,By=`float getShadowMask() {
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
}`,zy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hy=`#ifdef USE_SKINNING
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
#endif`,Gy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vy=`#ifdef USE_SKINNING
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
#endif`,$y=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qy=`#ifdef USE_TRANSMISSION
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
#endif`,Zy=`#ifdef USE_TRANSMISSION
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
#endif`,Ky=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tM=`uniform sampler2D t2D;
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
}`,nM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`#include <common>
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
}`,aM=`#if DEPTH_PACKING == 3200
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
}`,lM=`#define DISTANCE
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
}`,cM=`#define DISTANCE
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
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dM=`uniform float scale;
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
}`,fM=`uniform vec3 diffuse;
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
}`,pM=`#include <common>
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
}`,mM=`uniform vec3 diffuse;
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
}`,gM=`#define LAMBERT
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
}`,_M=`#define LAMBERT
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
}`,vM=`#define MATCAP
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
}`,xM=`#define MATCAP
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
}`,yM=`#define NORMAL
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
}`,MM=`#define NORMAL
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
}`,bM=`#define PHONG
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
}`,SM=`#define PHONG
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
}`,wM=`#define STANDARD
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
}`,EM=`#define STANDARD
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
}`,TM=`#define TOON
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
}`,AM=`#define TOON
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
}`,RM=`uniform float size;
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
}`,CM=`uniform vec3 diffuse;
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
}`,PM=`#include <common>
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
}`,LM=`uniform vec3 color;
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
}`,IM=`uniform float rotation;
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
}`,DM=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:ex,alphahash_pars_fragment:tx,alphamap_fragment:nx,alphamap_pars_fragment:ix,alphatest_fragment:sx,alphatest_pars_fragment:rx,aomap_fragment:ox,aomap_pars_fragment:ax,batching_pars_vertex:lx,batching_vertex:cx,begin_vertex:hx,beginnormal_vertex:ux,bsdfs:dx,iridescence_fragment:fx,bumpmap_pars_fragment:px,clipping_planes_fragment:mx,clipping_planes_pars_fragment:gx,clipping_planes_pars_vertex:_x,clipping_planes_vertex:vx,color_fragment:xx,color_pars_fragment:yx,color_pars_vertex:Mx,color_vertex:bx,common:Sx,cube_uv_reflection_fragment:wx,defaultnormal_vertex:Ex,displacementmap_pars_vertex:Tx,displacementmap_vertex:Ax,emissivemap_fragment:Rx,emissivemap_pars_fragment:Cx,colorspace_fragment:Px,colorspace_pars_fragment:Lx,envmap_fragment:Ix,envmap_common_pars_fragment:Dx,envmap_pars_fragment:Nx,envmap_pars_vertex:Ux,envmap_physical_pars_fragment:Xx,envmap_vertex:kx,fog_vertex:Fx,fog_pars_vertex:Ox,fog_fragment:Bx,fog_pars_fragment:zx,gradientmap_pars_fragment:Hx,lightmap_pars_fragment:Gx,lights_lambert_fragment:Vx,lights_lambert_pars_fragment:$x,lights_pars_begin:Wx,lights_toon_fragment:Yx,lights_toon_pars_fragment:qx,lights_phong_fragment:Zx,lights_phong_pars_fragment:Kx,lights_physical_fragment:Jx,lights_physical_pars_fragment:jx,lights_fragment_begin:Qx,lights_fragment_maps:ey,lights_fragment_end:ty,lightprobes_pars_fragment:ny,logdepthbuf_fragment:iy,logdepthbuf_pars_fragment:sy,logdepthbuf_pars_vertex:ry,logdepthbuf_vertex:oy,map_fragment:ay,map_pars_fragment:ly,map_particle_fragment:cy,map_particle_pars_fragment:hy,metalnessmap_fragment:uy,metalnessmap_pars_fragment:dy,morphinstance_vertex:fy,morphcolor_vertex:py,morphnormal_vertex:my,morphtarget_pars_vertex:gy,morphtarget_vertex:_y,normal_fragment_begin:vy,normal_fragment_maps:xy,normal_pars_fragment:yy,normal_pars_vertex:My,normal_vertex:by,normalmap_pars_fragment:Sy,clearcoat_normal_fragment_begin:wy,clearcoat_normal_fragment_maps:Ey,clearcoat_pars_fragment:Ty,iridescence_pars_fragment:Ay,opaque_fragment:Ry,packing:Cy,premultiplied_alpha_fragment:Py,project_vertex:Ly,dithering_fragment:Iy,dithering_pars_fragment:Dy,roughnessmap_fragment:Ny,roughnessmap_pars_fragment:Uy,shadowmap_pars_fragment:ky,shadowmap_pars_vertex:Fy,shadowmap_vertex:Oy,shadowmask_pars_fragment:By,skinbase_vertex:zy,skinning_pars_vertex:Hy,skinning_vertex:Gy,skinnormal_vertex:Vy,specularmap_fragment:$y,specularmap_pars_fragment:Wy,tonemapping_fragment:Xy,tonemapping_pars_fragment:Yy,transmission_fragment:qy,transmission_pars_fragment:Zy,uv_pars_fragment:Ky,uv_pars_vertex:Jy,uv_vertex:jy,worldpos_vertex:Qy,background_vert:eM,background_frag:tM,backgroundCube_vert:nM,backgroundCube_frag:iM,cube_vert:sM,cube_frag:rM,depth_vert:oM,depth_frag:aM,distance_vert:lM,distance_frag:cM,equirect_vert:hM,equirect_frag:uM,linedashed_vert:dM,linedashed_frag:fM,meshbasic_vert:pM,meshbasic_frag:mM,meshlambert_vert:gM,meshlambert_frag:_M,meshmatcap_vert:vM,meshmatcap_frag:xM,meshnormal_vert:yM,meshnormal_frag:MM,meshphong_vert:bM,meshphong_frag:SM,meshphysical_vert:wM,meshphysical_frag:EM,meshtoon_vert:TM,meshtoon_frag:AM,points_vert:RM,points_frag:CM,shadow_vert:PM,shadow_frag:LM,sprite_vert:IM,sprite_frag:DM},ye={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Yn={basic:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:sn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:sn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new et(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:sn([ye.points,ye.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:sn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:sn([ye.common,ye.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:sn([ye.sprite,ye.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:sn([ye.common,ye.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:sn([ye.lights,ye.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Yn.physical={uniforms:sn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const na={r:0,b:0,g:0},NM=new wt,Qp=new qe;Qp.set(-1,0,0,0,1,0,0,0,1);function UM(i,e,t,n,s,r){const o=new et(0);let a=s===!0?0:1,l,c,u=null,h=0,d=null;function f(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const _=x.backgroundBlurriness>0;S=e.get(S,_)}return S}function g(x){let S=!1;const _=f(x);_===null?m(o,a):_&&_.isColor&&(m(_,1),S=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(x,S){const _=f(S);_&&(_.isCubeTexture||_.mapping===Wa)?(c===void 0&&(c=new xt(new ht(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:rr(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(NM.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Qp),c.material.toneMapped=st.getTransfer(_.colorSpace)!==gt,(u!==_||h!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,h=_.version,d=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new xt(new qa(2,2),new ni({name:"BackgroundMaterial",uniforms:rr(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=st.getTransfer(_.colorSpace)!==gt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||h!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,h=_.version,d=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,S){x.getRGB(na,qp(i)),t.buffers.color.setClear(na.r,na.g,na.b,S,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,S=1){o.set(x),a=S,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,m(o,a)},render:g,addToRenderList:y,dispose:p}}function kM(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(L,I,k,N,B){let H=!1;const G=h(L,N,k,I);r!==G&&(r=G,c(r.object)),H=f(L,N,k,B),H&&g(L,N,k,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(L,I,k,N),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function u(L){return i.deleteVertexArray(L)}function h(L,I,k,N){const B=N.wireframe===!0;let H=n[I.id];H===void 0&&(H={},n[I.id]=H);const G=L.isInstancedMesh===!0?L.id:0;let j=H[G];j===void 0&&(j={},H[G]=j);let Y=j[k.id];Y===void 0&&(Y={},j[k.id]=Y);let Q=Y[B];return Q===void 0&&(Q=d(l()),Y[B]=Q),Q}function d(L){const I=[],k=[],N=[];for(let B=0;B<t;B++)I[B]=0,k[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:N,object:L,attributes:{},index:null}}function f(L,I,k,N){const B=r.attributes,H=I.attributes;let G=0;const j=k.getAttributes();for(const Y in j)if(j[Y].location>=0){const se=B[Y];let Ue=H[Y];if(Ue===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(Ue=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(Ue=L.instanceColor)),se===void 0||se.attribute!==Ue||Ue&&se.data!==Ue.data)return!0;G++}return r.attributesNum!==G||r.index!==N}function g(L,I,k,N){const B={},H=I.attributes;let G=0;const j=k.getAttributes();for(const Y in j)if(j[Y].location>=0){let se=H[Y];se===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(se=L.instanceColor));const Ue={};Ue.attribute=se,se&&se.data&&(Ue.data=se.data),B[Y]=Ue,G++}r.attributes=B,r.attributesNum=G,r.index=N}function y(){const L=r.newAttributes;for(let I=0,k=L.length;I<k;I++)L[I]=0}function m(L){p(L,0)}function p(L,I){const k=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;k[L]=1,N[L]===0&&(i.enableVertexAttribArray(L),N[L]=1),B[L]!==I&&(i.vertexAttribDivisor(L,I),B[L]=I)}function x(){const L=r.newAttributes,I=r.enabledAttributes;for(let k=0,N=I.length;k<N;k++)I[k]!==L[k]&&(i.disableVertexAttribArray(k),I[k]=0)}function S(L,I,k,N,B,H,G){G===!0?i.vertexAttribIPointer(L,I,k,B,H):i.vertexAttribPointer(L,I,k,N,B,H)}function _(L,I,k,N){y();const B=N.attributes,H=k.getAttributes(),G=I.defaultAttributeValues;for(const j in H){const Y=H[j];if(Y.location>=0){let Q=B[j];if(Q===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor)),Q!==void 0){const se=Q.normalized,Ue=Q.itemSize,Ce=e.get(Q);if(Ce===void 0)continue;const ut=Ce.buffer,tt=Ce.type,ot=Ce.bytesPerElement,K=tt===i.INT||tt===i.UNSIGNED_INT||Q.gpuType===xh;if(Q.isInterleavedBufferAttribute){const ne=Q.data,Me=ne.stride,Ge=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let Ee=0;Ee<Y.locationSize;Ee++)p(Y.location+Ee,ne.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ee=0;Ee<Y.locationSize;Ee++)m(Y.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let Ee=0;Ee<Y.locationSize;Ee++)S(Y.location+Ee,Ue/Y.locationSize,tt,se,Me*ot,(Ge+Ue/Y.locationSize*Ee)*ot,K)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<Y.locationSize;ne++)p(Y.location+ne,Q.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<Y.locationSize;ne++)m(Y.location+ne);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let ne=0;ne<Y.locationSize;ne++)S(Y.location+ne,Ue/Y.locationSize,tt,se,Ue*ot,Ue/Y.locationSize*ne*ot,K)}}else if(G!==void 0){const se=G[j];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(Y.location,se);break;case 3:i.vertexAttrib3fv(Y.location,se);break;case 4:i.vertexAttrib4fv(Y.location,se);break;default:i.vertexAttrib1fv(Y.location,se)}}}}x()}function w(){A();for(const L in n){const I=n[L];for(const k in I){const N=I[k];for(const B in N){const H=N[B];for(const G in H)u(H[G].object),delete H[G];delete N[B]}}delete n[L]}}function b(L){if(n[L.id]===void 0)return;const I=n[L.id];for(const k in I){const N=I[k];for(const B in N){const H=N[B];for(const G in H)u(H[G].object),delete H[G];delete N[B]}}delete n[L.id]}function R(L){for(const I in n){const k=n[I];for(const N in k){const B=k[N];if(B[L.id]===void 0)continue;const H=B[L.id];for(const G in H)u(H[G].object),delete H[G];delete B[L.id]}}}function M(L){for(const I in n){const k=n[I],N=L.isInstancedMesh===!0?L.id:0,B=k[N];if(B!==void 0){for(const H in B){const G=B[H];for(const j in G)u(G[j].object),delete G[j];delete B[H]}delete k[N],Object.keys(k).length===0&&delete n[I]}}}function A(){C(),o=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:M,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:m,disableUnusedAttributes:x}}function FM(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function OM(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const M=R===ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Mn&&R!==Kn&&!M&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ve("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:_,maxSamples:w,samples:b}}function BM(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Xn,a=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const x=r?0:n,S=x*4;let _=p.clippingState||null;l.value=_,_=u(g,d,S,f);for(let w=0;w!==S;++w)_[w]=t[w];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=f+y*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,_=f;S!==y;++S,_+=4)o.copy(h[S]).applyMatrix4(x,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const Xs=4,zM=6,HM=20,GM=256,yr=new kh,Dd=new et;let Fl=null,Ol=0,Bl=0,zl=!1;const VM=new D,ls=new D;class Nd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=VM}=r;Fl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Bl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fl,Ol,Bl),this._renderer.xr.enabled=zl,e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_s||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fl=this._renderer.getRenderTarget(),Ol=this._renderer.getActiveCubeFace(),Bl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:ti,format:Fn,colorSpace:Ta,depthBuffer:!1},s=Ud(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ud(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$M(r)),this._blurMaterial=XM(r,e,t),this._ggxMaterial=WM(r,e,t)}return s}_compileMaterial(e){const t=new xt(new Ut,e);this._renderer.compile(t,yr)}_sceneToCubeUV(e,t,n,s,r){const l=new xn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Dd),h.toneMapping=jn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xt(new ht,new Nr({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,p=!0):(m.color.copy(Dd),p=!0);for(let S=0;S<6;S++){const _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));const w=this._cubeSize;zs(s,_*w,S>2?w:0,w,w),h.setRenderTarget(s),p&&h.render(y,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===_s||e.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;zs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,yr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=c*1.25,f=h*d,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-Xs?n-g+Xs:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,zs(r,m,p,3*y,2*y),s.setRenderTarget(r),s.render(a,yr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,zs(e,m,p,3*y,2*y),s.setRenderTarget(e),s.render(a,yr)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){const o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;const c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[s],h=3*u*(s>this._lodMax-Xs?s-this._lodMax+Xs:0),d=4*(this._cubeSize-u);zs(t,h,d,3*u,2*u),o.setRenderTarget(t),o.render(l,yr)}}function $M(i){const e=[],t=[];let n=i;const s=i-Xs+1+zM;for(let r=0;r<s;r++){const o=Math.pow(2,n);e.push(o);const a=1/(o-2),l=-a,c=1+a,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,f=3,g=new Float32Array(f*d*h),y=new Float32Array(f*d*h);for(let p=0;p<h;p++){const x=p%3*2/3-1,S=p>2?0:-1,_=[x,S,0,x+2/3,S,0,x+2/3,S+1,0,x,S,0,x+2/3,S+1,0,x,S+1,0];g.set(_,f*d*p);for(let w=0;w<d;w++){const b=u[w*2]*2-1,R=u[w*2+1]*2-1;p===0?ls.set(1,R,b):p===1?ls.set(-b,1,-R):p===2?ls.set(-b,R,1):p===3?ls.set(-1,R,-b):p===4?ls.set(-b,-1,R):ls.set(b,R,-1),ls.toArray(y,(p*d+w)*f)}}const m=new Ut;m.setAttribute("position",new vi(g,f)),m.setAttribute("outputDirection",new vi(y,f)),t.push(new xt(m,null)),n>Xs&&n--}return{lodMeshes:t,sizeLods:e}}function Ud(i,e,t){const n=new On(i,e,t);return n.texture.mapping=Wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function WM(i,e,t){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:GM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function XM(i,e,t){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:HM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function kd(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Fd(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Za(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class em extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Op(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ht(5,5,5),r=new ni({name:"CubemapFromEquirect",uniforms:rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:gi});r.uniforms.tEquirect.value=t;const o=new xt(s,r),a=t.minFilter;return t.minFilter===hs&&(t.minFilter=jt),new qv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}function YM(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===ll||f===cl)if(e.has(d)){const g=e.get(d).texture;return a(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const y=new em(g.height);return y.fromEquirectangularTexture(i,d),e.set(d,y),d.addEventListener("dispose",c),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const f=d.mapping,g=f===ll||f===cl,y=f===_s||f===ir;if(g||y){let m=t.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Nd(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const x=d.image;return g&&x&&x.height>0||y&&x&&l(x)?(n===null&&(n=new Nd(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,f){return f===ll?d.mapping=_s:f===cl&&(d.mapping=ir),d}function l(d){let f=0;const g=6;for(let y=0;y<g;y++)d[y]!==void 0&&f++;return f===g}function c(d){const f=d.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function qM(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Js("WebGLRenderer: "+n+" extension not supported."),s}}}function ZM(i,e,t,n){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,g=h.attributes.position;let y=0;if(g===void 0)return;if(f!==null){const x=f.array;y=f.version;for(let S=0,_=x.length;S<_;S+=3){const w=x[S+0],b=x[S+1],R=x[S+2];d.push(w,b,b,R,R,w)}}else{const x=g.array;y=g.version;for(let S=0,_=x.length/3-1;S<_;S+=3){const w=S+0,b=S+1,R=S+2;d.push(w,b,b,R,R,w)}}const m=new(g.count>=65535?kp:Up)(d,1);m.version=y;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function KM(i,e,t){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){i.drawElements(n,d,r,h*o),t.update(d,n,1)}function c(h,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,h*o,f),t.update(d,n,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,f);let y=0;for(let m=0;m<f;m++)y+=d[m];t.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function JM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:rt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function jM(i,e,t){const n=new WeakMap,s=new Pt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let A=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),y===!0&&(S=3);let _=a.attributes.position.count*S,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const b=new Float32Array(_*w*4*h),R=new Ip(b,_,w,h);R.type=Kn,R.needsUpdate=!0;const M=S*4;for(let C=0;C<h;C++){const L=m[C],I=p[C],k=x[C],N=_*w*4*C;for(let B=0;B<L.count;B++){const H=B*M;f===!0&&(s.fromBufferAttribute(L,B),b[N+H+0]=s.x,b[N+H+1]=s.y,b[N+H+2]=s.z,b[N+H+3]=0),g===!0&&(s.fromBufferAttribute(I,B),b[N+H+4]=s.x,b[N+H+5]=s.y,b[N+H+6]=s.z,b[N+H+7]=0),y===!0&&(s.fromBufferAttribute(k,B),b[N+H+8]=s.x,b[N+H+9]=s.y,b[N+H+10]=s.z,b[N+H+11]=k.itemSize===4?s.w:1)}}d={count:h,texture:R,size:new ae(_,w)},n.set(a,d),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function QM(i,e,t,n,s){let r=new WeakMap;function o(c){const u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const eb={[gp]:"LINEAR_TONE_MAPPING",[_p]:"REINHARD_TONE_MAPPING",[vp]:"CINEON_TONE_MAPPING",[$a]:"ACES_FILMIC_TONE_MAPPING",[yp]:"AGX_TONE_MAPPING",[Mp]:"NEUTRAL_TONE_MAPPING",[xp]:"CUSTOM_TONE_MAPPING"};function tb(i,e,t,n,s,r){const o=new On(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,l=null;const c=new Ut;c.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const u=new Vv({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new xt(c,u),d=new kh(-1,1,1,-1,0,1);let f=null,g=null,y=!1,m,p=null,x=[],S=!1;this.setSize=function(_,w){o.setSize(_,w),a!==null&&a.setSize(_,w),l!==null&&l.setSize(_,w);for(let b=0;b<x.length;b++){const R=x[b];R.setSize&&R.setSize(_,w)}},this.setEffects=function(_){x=_,S=x.length>0&&x[0].isRenderPass===!0;const w=o.width,b=o.height;x.length>0&&a===null&&(a=new On(w,b,{type:ti,depthBuffer:!1,stencilBuffer:!1}),l=new On(w,b,{type:ti,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<x.length;R++){const M=x[R];M.setSize&&M.setSize(w,b)}},this.begin=function(_,w){if(y||_.toneMapping===jn&&x.length===0)return!1;if(p=w,w!==null){const b=w.width,R=w.height;(o.width!==b||o.height!==R)&&this.setSize(b,R)}return S===!1&&_.setRenderTarget(o),m=_.toneMapping,_.toneMapping=jn,!0},this.hasRenderPass=function(){return S},this.end=function(_,w){_.toneMapping=m,y=!0;let b=o,R=a;for(let M=0;M<x.length;M++){const A=x[M];A.enabled!==!1&&(A.render(_,R,b,w),A.needsSwap!==!1&&(b=R,R=R===a?l:a))}if(f!==_.outputColorSpace||g!==_.toneMapping){f=_.outputColorSpace,g=_.toneMapping,u.defines={},st.getTransfer(f)===gt&&(u.defines.SRGB_TRANSFER="");const M=eb[g];M&&(u.defines[M]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(p),_.render(h,d),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const tm=new rn,qc=new jr(1,1),nm=new Ip,im=new H_,sm=new Op,Od=[],Bd=[],zd=new Float32Array(16),Hd=new Float32Array(9),Gd=new Float32Array(4);function fr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Od[s];if(r===void 0&&(r=new Float32Array(s),Od[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ka(i,e){let t=Bd[e];t===void 0&&(t=new Int32Array(e),Bd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function nb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ib(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function sb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function rb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function ob(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Gd.set(n),i.uniformMatrix2fv(this.addr,!1,Gd),Vt(t,n)}}function ab(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Hd.set(n),i.uniformMatrix3fv(this.addr,!1,Hd),Vt(t,n)}}function lb(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;zd.set(n),i.uniformMatrix4fv(this.addr,!1,zd),Vt(t,n)}}function cb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function hb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function ub(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function db(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function fb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function pb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function mb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function gb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function _b(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qc.compareFunction=t.isReversedDepthBuffer()?Th:Eh,r=qc):r=tm,t.setTexture2D(e||r,s)}function vb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||im,s)}function xb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sm,s)}function yb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||nm,s)}function Mb(i){switch(i){case 5126:return nb;case 35664:return ib;case 35665:return sb;case 35666:return rb;case 35674:return ob;case 35675:return ab;case 35676:return lb;case 5124:case 35670:return cb;case 35667:case 35671:return hb;case 35668:case 35672:return ub;case 35669:case 35673:return db;case 5125:return fb;case 36294:return pb;case 36295:return mb;case 36296:return gb;case 35678:case 36198:case 36298:case 36306:case 35682:return _b;case 35679:case 36299:case 36307:return vb;case 35680:case 36300:case 36308:case 36293:return xb;case 36289:case 36303:case 36311:case 36292:return yb}}function bb(i,e){i.uniform1fv(this.addr,e)}function Sb(i,e){const t=fr(e,this.size,2);i.uniform2fv(this.addr,t)}function wb(i,e){const t=fr(e,this.size,3);i.uniform3fv(this.addr,t)}function Eb(i,e){const t=fr(e,this.size,4);i.uniform4fv(this.addr,t)}function Tb(i,e){const t=fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ab(i,e){const t=fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rb(i,e){const t=fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Cb(i,e){i.uniform1iv(this.addr,e)}function Pb(i,e){i.uniform2iv(this.addr,e)}function Lb(i,e){i.uniform3iv(this.addr,e)}function Ib(i,e){i.uniform4iv(this.addr,e)}function Db(i,e){i.uniform1uiv(this.addr,e)}function Nb(i,e){i.uniform2uiv(this.addr,e)}function Ub(i,e){i.uniform3uiv(this.addr,e)}function kb(i,e){i.uniform4uiv(this.addr,e)}function Fb(i,e,t){const n=this.cache,s=e.length,r=Ka(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=qc:o=tm;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Ob(i,e,t){const n=this.cache,s=e.length,r=Ka(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||im,r[o])}function Bb(i,e,t){const n=this.cache,s=e.length,r=Ka(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||sm,r[o])}function zb(i,e,t){const n=this.cache,s=e.length,r=Ka(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||nm,r[o])}function Hb(i){switch(i){case 5126:return bb;case 35664:return Sb;case 35665:return wb;case 35666:return Eb;case 35674:return Tb;case 35675:return Ab;case 35676:return Rb;case 5124:case 35670:return Cb;case 35667:case 35671:return Pb;case 35668:case 35672:return Lb;case 35669:case 35673:return Ib;case 5125:return Db;case 36294:return Nb;case 36295:return Ub;case 36296:return kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return Bb;case 36289:case 36303:case 36311:case 36292:return zb}}class Gb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Mb(t.type)}}class Vb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hb(t.type)}}class $b{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Hl=/(\w+)(\])?(\[|\.)?/g;function Vd(i,e){i.seq.push(e),i.map[e.id]=e}function Wb(i,e,t){const n=i.name,s=n.length;for(Hl.lastIndex=0;;){const r=Hl.exec(n),o=Hl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Vd(t,c===void 0?new Gb(a,i,e):new Vb(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new $b(a),Vd(t,h)),t=h}}}class ma{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Wb(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function $d(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Xb=37297;let Yb=0;function qb(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Wd=new qe;function Zb(i){st._getMatrix(Wd,st.workingColorSpace,i);const e=`mat3( ${Wd.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case Aa:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Xd(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+qb(i.getShaderSource(e),a)}else return r}function Kb(i,e){const t=Zb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Jb={[gp]:"Linear",[_p]:"Reinhard",[vp]:"Cineon",[$a]:"ACESFilmic",[yp]:"AgX",[Mp]:"Neutral",[xp]:"Custom"};function jb(i,e){const t=Jb[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new D;function Qb(){st.getLuminanceCoefficients(ia);const i=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function tS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ar(i){return i!==""}function Yd(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(i){return i.replace(iS,rS)}const sS=new Map;function rS(i,e){let t=je[e];if(t===void 0){const n=sS.get(e);if(n!==void 0)t=je[n],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Zc(t)}const oS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zd(i){return i.replace(oS,aS)}function aS(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const lS={[ha]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function cS(i){return lS[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const hS={[_s]:"ENVMAP_TYPE_CUBE",[ir]:"ENVMAP_TYPE_CUBE",[Wa]:"ENVMAP_TYPE_CUBE_UV"};function uS(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":hS[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const dS={[ir]:"ENVMAP_MODE_REFRACTION"};function fS(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":dS[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const pS={[mp]:"ENVMAP_BLENDING_MULTIPLY",[i_]:"ENVMAP_BLENDING_MIX",[s_]:"ENVMAP_BLENDING_ADD"};function mS(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":pS[i.combine]||"ENVMAP_BLENDING_NONE"}function gS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function _S(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=cS(t),c=uS(t),u=fS(t),h=mS(t),d=gS(t),f=eS(t),g=tS(r),y=s.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),p.length>0&&(p+=`
`)):(m=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),p=[Kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?je.tonemapping_pars_fragment:"",t.toneMapping!==jn?jb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Kb("linearToOutputTexel",t.outputColorSpace),Qb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ar).join(`
`)),o=Zc(o),o=Yd(o,t),o=qd(o,t),a=Zc(a),a=Yd(a,t),a=qd(a,t),o=Zd(o),a=Zd(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===qu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=x+m+o,_=x+p+a,w=$d(s,s.VERTEX_SHADER,S),b=$d(s,s.FRAGMENT_SHADER,_);s.attachShader(y,w),s.attachShader(y,b),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(L){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(y)||"",k=s.getShaderInfoLog(w)||"",N=s.getShaderInfoLog(b)||"",B=I.trim(),H=k.trim(),G=N.trim();let j=!0,Y=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,w,b);else{const Q=Xd(s,w,"vertex"),se=Xd(s,b,"fragment");rt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+Q+`
`+se)}else B!==""?Ve("WebGLProgram: Program Info Log:",B):(H===""||G==="")&&(Y=!1);Y&&(L.diagnostics={runnable:j,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(w),s.deleteShader(b),M=new ma(s,y),A=nS(s,y)}let M;this.getUniforms=function(){return M===void 0&&R(this),M};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(y,Xb)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yb++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=b,this}let vS=0;class xS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yS(e),t.set(e,n)),n}}class yS{constructor(e){this.id=vS++,this.code=e,this.usedTimes=0}}function MS(i){return i===vs||i===wa||i===Ea}function bS(i,e,t,n,s,r){const o=new Ch,a=new xS,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function y(M,A,C,L,I,k){const N=L.fog,B=I.geometry,H=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,G=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=e.get(M.envMap||H,G),Y=j&&j.mapping===Wa?j.image.height:null,Q=f[M.type];M.precision!==null&&(d=n.getMaxPrecision(M.precision),d!==M.precision&&Ve("WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const se=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ue=se!==void 0?se.length:0;let Ce=0;B.morphAttributes.position!==void 0&&(Ce=1),B.morphAttributes.normal!==void 0&&(Ce=2),B.morphAttributes.color!==void 0&&(Ce=3);let ut,tt,ot,K;if(Q){const bt=Yn[Q];ut=bt.vertexShader,tt=bt.fragmentShader}else{ut=M.vertexShader,tt=M.fragmentShader;const bt=a.getVertexShaderStage(M),ft=a.getFragmentShaderStage(M);a.update(M,bt,ft),ot=bt.id,K=ft.id}const ne=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ge=I.isInstancedMesh===!0,Ee=I.isBatchedMesh===!0,$e=!!M.map,mt=!!M.matcap,ie=!!j,oe=!!M.aoMap,le=!!M.lightMap,ce=!!M.bumpMap&&M.wireframe===!1,de=!!M.normalMap,ze=!!M.displacementMap,Be=!!M.emissiveMap,We=!!M.metalnessMap,Ye=!!M.roughnessMap,U=M.anisotropy>0,dt=M.clearcoat>0,nt=M.dispersion>0,P=M.retroreflectivity>0,E=M.iridescence>0,z=M.sheen>0,W=M.transmission>0,q=U&&!!M.anisotropyMap,he=dt&&!!M.clearcoatMap,ue=dt&&!!M.clearcoatNormalMap,Z=dt&&!!M.clearcoatRoughnessMap,ee=E&&!!M.iridescenceMap,me=E&&!!M.iridescenceThicknessMap,ke=z&&!!M.sheenColorMap,xe=z&&!!M.sheenRoughnessMap,ge=!!M.specularMap,Fe=!!M.specularColorMap,He=!!M.specularIntensityMap,Ke=W&&!!M.transmissionMap,O=W&&!!M.thicknessMap,_e=!!M.gradientMap,J=!!M.alphaMap,ve=M.alphaTest>0,we=!!M.alphaHash,re=!!M.extensions;let Oe=jn;M.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Oe=i.toneMapping);const De={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:ut,fragmentShader:tt,defines:M.defines,customVertexShaderID:ot,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ee,batchingColor:Ee&&I._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&I.instanceColor!==null,instancingMorph:Ge&&I.morphTexture!==null,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:$e,matcap:mt,envMap:ie,envMapMode:ie&&j.mapping,envMapCubeUVHeight:Y,aoMap:oe,lightMap:le,bumpMap:ce,normalMap:de,displacementMap:ze,emissiveMap:Be,normalMapObjectSpace:de&&M.normalMapType===a_,normalMapTangentSpace:de&&M.normalMapType===zc,packedNormalMap:de&&M.normalMapType===zc&&MS(M.normalMap.format),metalnessMap:We,roughnessMap:Ye,anisotropy:U,anisotropyMap:q,clearcoat:dt,clearcoatMap:he,clearcoatNormalMap:ue,clearcoatRoughnessMap:Z,dispersion:nt,retroreflection:P,iridescence:E,iridescenceMap:ee,iridescenceThicknessMap:me,sheen:z,sheenColorMap:ke,sheenRoughnessMap:xe,specularMap:ge,specularColorMap:Fe,specularIntensityMap:He,transmission:W,transmissionMap:Ke,thicknessMap:O,gradientMap:_e,opaque:M.transparent===!1&&M.blending===Lr&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:ve,alphaHash:we,combine:M.combine,mapUv:$e&&g(M.map.channel),aoMapUv:oe&&g(M.aoMap.channel),lightMapUv:le&&g(M.lightMap.channel),bumpMapUv:ce&&g(M.bumpMap.channel),normalMapUv:de&&g(M.normalMap.channel),displacementMapUv:ze&&g(M.displacementMap.channel),emissiveMapUv:Be&&g(M.emissiveMap.channel),metalnessMapUv:We&&g(M.metalnessMap.channel),roughnessMapUv:Ye&&g(M.roughnessMap.channel),anisotropyMapUv:q&&g(M.anisotropyMap.channel),clearcoatMapUv:he&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:me&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(M.sheenRoughnessMap.channel),specularMapUv:ge&&g(M.specularMap.channel),specularColorMapUv:Fe&&g(M.specularColorMap.channel),specularIntensityMapUv:He&&g(M.specularIntensityMap.channel),transmissionMapUv:Ke&&g(M.transmissionMap.channel),thicknessMapUv:O&&g(M.thicknessMap.channel),alphaMapUv:J&&g(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(de||U),vertexNormals:!!B.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&($e||J),fog:!!N,useFog:M.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||B.attributes.normal===void 0&&de===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:Ce,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:$e&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===gt,decodeVideoTextureEmissive:Be&&M.emissiveMap.isVideoTexture===!0&&st.getTransfer(M.emissiveMap.colorSpace)===gt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Zn,flipSided:M.side===dn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:re&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&M.extensions.multiDraw===!0||Ee)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function m(M){const A=[];if(M.shaderID?A.push(M.shaderID):(A.push(M.customVertexShaderID),A.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)A.push(C),A.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(p(A,M),x(A,M),A.push(i.outputColorSpace)),A.push(M.customProgramCacheKey),A.join()}function p(M,A){M.push(A.precision),M.push(A.outputColorSpace),M.push(A.envMapMode),M.push(A.envMapCubeUVHeight),M.push(A.mapUv),M.push(A.alphaMapUv),M.push(A.lightMapUv),M.push(A.aoMapUv),M.push(A.bumpMapUv),M.push(A.normalMapUv),M.push(A.displacementMapUv),M.push(A.emissiveMapUv),M.push(A.metalnessMapUv),M.push(A.roughnessMapUv),M.push(A.anisotropyMapUv),M.push(A.clearcoatMapUv),M.push(A.clearcoatNormalMapUv),M.push(A.clearcoatRoughnessMapUv),M.push(A.iridescenceMapUv),M.push(A.iridescenceThicknessMapUv),M.push(A.sheenColorMapUv),M.push(A.sheenRoughnessMapUv),M.push(A.specularMapUv),M.push(A.specularColorMapUv),M.push(A.specularIntensityMapUv),M.push(A.transmissionMapUv),M.push(A.thicknessMapUv),M.push(A.combine),M.push(A.fogExp2),M.push(A.sizeAttenuation),M.push(A.morphTargetsCount),M.push(A.morphAttributeCount),M.push(A.numSunLights),M.push(A.numDirLights),M.push(A.numPointLights),M.push(A.numSpotLights),M.push(A.numSpotLightMaps),M.push(A.numHemiLights),M.push(A.numRectAreaLights),M.push(A.numSunLightShadows),M.push(A.numDirLightShadows),M.push(A.numPointLightShadows),M.push(A.numSpotLightShadows),M.push(A.numSpotLightShadowsWithMaps),M.push(A.numLightProbes),M.push(A.shadowMapType),M.push(A.toneMapping),M.push(A.numClippingPlanes),M.push(A.numClipIntersection),M.push(A.depthPacking)}function x(M,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function S(M){const A=f[M.type];let C;if(A){const L=Yn[A];C=zv.clone(L.uniforms)}else C=M.uniforms;return C}function _(M,A){let C=u.get(A);return C!==void 0?++C.usedTimes:(C=new _S(i,A,M,s),c.push(C),u.set(A,C)),C}function w(M){if(--M.usedTimes===0){const A=c.indexOf(M);c[A]=c[c.length-1],c.pop(),u.delete(M.cacheKey),M.destroy()}}function b(M){a.remove(M)}function R(){a.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:S,acquireProgram:_,releaseProgram:w,releaseShaderCache:b,programs:c,dispose:R}}function SS(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function wS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Jd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jd(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,y,m,p){let x=i[e];return x===void 0?(x={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:m,group:p},i[e]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=g,x.materialVariant=o(d),x.groupOrder=y,x.renderOrder=d.renderOrder,x.z=m,x.group=p),e++,x}function l(d,f,g,y,m,p,x){x.reversedDepth===!0&&(m=-m);const S=a(d,f,g,y,m,p);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):t.push(S)}function c(d,f,g,y,m,p){const x=a(d,f,g,y,m,p);g.transmission>0?n.unshift(x):g.transparent===!0?s.unshift(x):t.unshift(x)}function u(d,f){t.length>1&&t.sort(d||wS),n.length>1&&n.sort(f||Jd),s.length>1&&s.sort(f||Jd)}function h(){for(let d=e,f=i.length;d<f;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function ES(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new jd,i.set(n,[o])):s>=r.length?(o=new jd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function TS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new D,color:new et};break;case"SpotLight":t={position:new D,direction:new D,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function AS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let RS=0;function CS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function PS(i){const e=new TS,t=AS(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new wt,o=new wt;function a(c){let u=0,h=0,d=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,x=0,S=0,_=0,w=0,b=0,R=0,M=0,A=0,C=0;c.sort(CS);for(let I=0,k=c.length;I<k;I++){const N=c[I],B=N.color,H=N.intensity,G=N.distance;let j=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===vs?j=N.shadow.map.texture:j=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=B.r*H,h+=B.g*H,d+=B.b*H;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],H);C++}else if(N.isSunLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Q=N.shadow,se=t.get(N);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=se,n.sunShadowMap[g]=j;const Ue=Q.getViewportCount();for(let Ce=0;Ce<Ue;Ce++)n.sunShadowMatrix[y+Ce]=Q.getMatrix(Ce),n.sunShadowCascade[y+Ce]=Q._cascadeData[Ce];y+=Ue,g++}n.sun[f]=Y,f++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Q=N.shadow,se=t.get(N);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,n.directionalShadow[m]=se,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=N.shadow.matrix,w++}n.directional[m]=Y,m++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(B).multiplyScalar(H),Y.distance=G,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[x]=Y;const Q=N.shadow;if(N.map&&(n.spotLightMap[M]=N.map,M++,Q.updateMatrices(N),N.castShadow&&A++),n.spotLightMatrix[x]=Q.matrix,N.castShadow){const se=t.get(N);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,n.spotShadow[x]=se,n.spotShadowMap[x]=j,R++}x++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(B).multiplyScalar(H),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[S]=Y,S++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const Q=N.shadow,se=t.get(N);se.shadowIntensity=Q.intensity,se.shadowBias=Q.bias,se.shadowNormalBias=Q.normalBias,se.shadowRadius=Q.radius,se.shadowMapSize=Q.mapSize,se.shadowCameraNear=Q.camera.near,se.shadowCameraFar=Q.camera.far,n.pointShadow[p]=se,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=N.shadow.matrix,b++}n.point[p]=Y,p++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(H),Y.groundColor.copy(N.groundColor).multiplyScalar(H),n.hemi[_]=Y,_++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const L=n.hash;(L.sunLength!==f||L.directionalLength!==m||L.pointLength!==p||L.spotLength!==x||L.rectAreaLength!==S||L.hemiLength!==_||L.numSunShadows!==g||L.numDirectionalShadows!==w||L.numPointShadows!==b||L.numSpotShadows!==R||L.numSpotMaps!==M||L.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=m,n.spot.length=x,n.rectArea.length=S,n.point.length=p,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+M-A,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,L.sunLength=f,L.directionalLength=m,L.pointLength=p,L.spotLength=x,L.rectAreaLength=S,L.hemiLength=_,L.numSunShadows=g,L.numDirectionalShadows=w,L.numPointShadows=b,L.numSpotShadows=R,L.numSpotMaps=M,L.numLightProbes=C,n.version=RS++)}function l(c,u){let h=0,d=0,f=0,g=0,y=0,m=0;const p=u.matrixWorldInverse;for(let x=0,S=c.length;x<S;x++){const _=c[x];if(_.isSunLight){const w=n.sun[h];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(p),h++}else if(_.isDirectionalLight){const w=n.directional[d];w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),d++}else if(_.isSpotLight){const w=n.spot[g];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),g++}else if(_.isRectAreaLight){const w=n.rectArea[y];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),w.halfWidth.set(_.width*.5,0,0),w.halfHeight.set(0,_.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(_.isPointLight){const w=n.point[f];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){const w=n.hemi[m];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:n}}function Qd(i){const e=new PS(i),t=[],n=[],s=[];function r(d){h.camera=d,t.length=0,n.length=0,s.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function LS(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Qd(i),e.set(s,[a])):r>=o.length?(a=new Qd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const IS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DS=`uniform sampler2D shadow_pass;
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
}`,NS=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],US=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],ef=new wt,Mr=new D,Gl=new D;function kS(i,e,t){let n=new Lh;const s=new ae,r=new ae,o=new Pt,a=new $v,l=new Wv,c={},u=t.maxTextureSize,h={[gs]:dn,[dn]:gs,[Zn]:Zn},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:IS,fragmentShader:DS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new xt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ha;let p=this.type;this.render=function(b,R,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===dp&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ha);const A=i.getRenderTarget(),C=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),I=i.state;I.setBlending(gi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const k=p!==this.type;k&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=b.length;N<B;N++){const H=b[N],G=H.shadow;if(G===void 0){Ve("WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const j=G.getFrameExtents();s.multiply(j),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,G.mapSize.y=r.y));const Y=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Y,G.map===null||k===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Er){if(H.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new On(s.x,s.y,{format:vs,type:ti,minFilter:jt,magFilter:jt,generateMipmaps:!1}),G.map.texture.name=H.name+".shadowMap",G.map.depthTexture=new jr(s.x,s.y,Kn),G.map.depthTexture.name=H.name+".shadowMapDepth",G.map.depthTexture.format=Mi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Xt,G.map.depthTexture.magFilter=Xt}else H.isPointLight?(G.map=new em(s.x),G.map.depthTexture=new rv(s.x,ei)):(G.map=new On(s.x,s.y),G.map.depthTexture=new jr(s.x,s.y,ei)),G.map.depthTexture.name=H.name+".shadowMap",G.map.depthTexture.format=Mi,this.type===ha?(G.map.depthTexture.compareFunction=Y?Th:Eh,G.map.depthTexture.minFilter=jt,G.map.depthTexture.magFilter=jt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Xt,G.map.depthTexture.magFilter=Xt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);const Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();H.isPointLight!==!0&&G.updateMatrices(H,M);for(let se=0;se<Q;se++){const Ue=G.getCamera(se);if(H.isPointLight){const Ce=G.camera,ut=G.matrix,tt=H.distance||Ce.far;tt!==Ce.far&&(Ce.far=tt,Ce.updateProjectionMatrix()),Mr.setFromMatrixPosition(H.matrixWorld),Ce.position.copy(Mr),Gl.copy(Ce.position),Gl.add(NS[se]),Ce.up.copy(US[se]),Ce.lookAt(Gl),Ce.updateMatrixWorld(),ut.makeTranslation(-Mr.x,-Mr.y,-Mr.z),ef.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),G._frustum.setFromProjectionMatrix(ef,Ce.coordinateSystem,Ce.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,se),i.clear();else{se===0&&(i.setRenderTarget(G.map),i.clear());const Ce=G.getViewport(se);o.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),I.viewport(o)}n=G.getFrustum(se),_(R,M,Ue,H,this.type)}G.isPointLightShadow!==!0&&this.type===Er&&x(G,M),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(A,C,L)};function x(b,R){const M=e.update(y);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new On(s.x,s.y,{format:vs,type:ti}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,M,d,y,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,M,f,y,null)}function S(b,R,M,A){let C=null;const L=M.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)C=L;else if(C=M.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const I=C.uuid,k=R.uuid;let N=c[I];N===void 0&&(N={},c[I]=N);let B=N[k];B===void 0&&(B=C.clone(),N[k]=B,R.addEventListener("dispose",w)),C=B}if(C.visible=R.visible,C.wireframe=R.wireframe,A===Er?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:h[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,M.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const I=i.properties.get(C);I.light=M}return C}function _(b,R,M,A,C){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Er)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,b.matrixWorld);const k=e.update(b),N=b.material;if(Array.isArray(N)){const B=k.groups;for(let H=0,G=B.length;H<G;H++){const j=B[H],Y=N[j.materialIndex];if(Y&&Y.visible){const Q=S(b,Y,A,C);b.onBeforeShadow(i,b,R,M,k,Q,j),i.renderBufferDirect(M,null,k,Q,b,j),b.onAfterShadow(i,b,R,M,k,Q,j)}}}else if(N.visible){const B=S(b,N,A,C);b.onBeforeShadow(i,b,R,M,k,B,null),i.renderBufferDirect(M,null,k,B,b,null),b.onAfterShadow(i,b,R,M,k,B,null)}}const I=b.children;for(let k=0,N=I.length;k<N;k++)_(I[k],R,M,A,C)}function w(b){b.target.removeEventListener("dispose",w);for(const M in c){const A=c[M],C=b.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function FS(i,e){function t(){let O=!1;const _e=new Pt;let J=null;const ve=new Pt(0,0,0,0);return{setMask:function(we){J!==we&&!O&&(i.colorMask(we,we,we,we),J=we)},setLocked:function(we){O=we},setClear:function(we,re,Oe,De,bt){bt===!0&&(we*=De,re*=De,Oe*=De),_e.set(we,re,Oe,De),ve.equals(_e)===!1&&(i.clearColor(we,re,Oe,De),ve.copy(_e))},reset:function(){O=!1,J=null,ve.set(-1,0,0,0)}}}function n(){let O=!1,_e=!1,J=null,ve=null,we=null;return{setReversed:function(re){if(_e!==re){const Oe=e.get("EXT_clip_control");re?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),_e=re;const De=we;we=null,this.setClear(De)}},getReversed:function(){return _e},setTest:function(re){re?ne(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(re){J!==re&&!O&&(i.depthMask(re),J=re)},setFunc:function(re){if(_e&&(re=x_[re]),ve!==re){switch(re){case tc:i.depthFunc(i.NEVER);break;case nc:i.depthFunc(i.ALWAYS);break;case ic:i.depthFunc(i.LESS);break;case Yr:i.depthFunc(i.LEQUAL);break;case sc:i.depthFunc(i.EQUAL);break;case rc:i.depthFunc(i.GEQUAL);break;case oc:i.depthFunc(i.GREATER);break;case ac:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=re}},setLocked:function(re){O=re},setClear:function(re){we!==re&&(we=re,_e&&(re=1-re),i.clearDepth(re))},reset:function(){O=!1,J=null,ve=null,we=null,_e=!1}}}function s(){let O=!1,_e=null,J=null,ve=null,we=null,re=null,Oe=null,De=null,bt=null;return{setTest:function(ft){O||(ft?ne(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(ft){_e!==ft&&!O&&(i.stencilMask(ft),_e=ft)},setFunc:function(ft,Pn,Hn){(J!==ft||ve!==Pn||we!==Hn)&&(i.stencilFunc(ft,Pn,Hn),J=ft,ve=Pn,we=Hn)},setOp:function(ft,Pn,Hn){(re!==ft||Oe!==Pn||De!==Hn)&&(i.stencilOp(ft,Pn,Hn),re=ft,Oe=Pn,De=Hn)},setLocked:function(ft){O=ft},setClear:function(ft){bt!==ft&&(i.clearStencil(ft),bt=ft)},reset:function(){O=!1,_e=null,J=null,ve=null,we=null,re=null,Oe=null,De=null,bt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,g=[],y=null,m=!1,p=null,x=null,S=null,_=null,w=null,b=null,R=null,M=new et(0,0,0),A=0,C=!1,L=null,I=null,k=null,N=null,B=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,j=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=j>=1):Y.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=j>=2);let Q=null,se={};const Ue=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),ut=new Pt().fromArray(Ue),tt=new Pt().fromArray(Ce);function ot(O,_e,J,ve){const we=new Uint8Array(4),re=i.createTexture();i.bindTexture(O,re),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<J;Oe++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,we):i.texImage2D(_e+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,we);return re}const K={};K[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(i.DEPTH_TEST),o.setFunc(Yr),ce(!1),de($u),ne(i.CULL_FACE),oe(gi);function ne(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function Me(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function Ge(O,_e){return d[O]!==_e?(i.bindFramebuffer(O,_e),d[O]=_e,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=_e),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ee(O,_e){let J=g,ve=!1;if(O){J=f.get(_e),J===void 0&&(J=[],f.set(_e,J));const we=O.textures;if(J.length!==we.length||J[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Oe=we.length;re<Oe;re++)J[re]=i.COLOR_ATTACHMENT0+re;J.length=we.length,ve=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ve=!0);ve&&i.drawBuffers(J)}function $e(O){return y!==O?(i.useProgram(O),y=O,!0):!1}const mt={[Hs]:i.FUNC_ADD,[z0]:i.FUNC_SUBTRACT,[H0]:i.FUNC_REVERSE_SUBTRACT};mt[G0]=i.MIN,mt[V0]=i.MAX;const ie={[$0]:i.ZERO,[W0]:i.ONE,[X0]:i.SRC_COLOR,[fp]:i.SRC_ALPHA,[j0]:i.SRC_ALPHA_SATURATE,[K0]:i.DST_COLOR,[q0]:i.DST_ALPHA,[Y0]:i.ONE_MINUS_SRC_COLOR,[pp]:i.ONE_MINUS_SRC_ALPHA,[J0]:i.ONE_MINUS_DST_COLOR,[Z0]:i.ONE_MINUS_DST_ALPHA,[Q0]:i.CONSTANT_COLOR,[e_]:i.ONE_MINUS_CONSTANT_COLOR,[t_]:i.CONSTANT_ALPHA,[n_]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(O,_e,J,ve,we,re,Oe,De,bt,ft){if(O===gi){m===!0&&(Me(i.BLEND),m=!1);return}if(m===!1&&(ne(i.BLEND),m=!0),O!==B0){if(O!==p||ft!==C){if((x!==Hs||w!==Hs)&&(i.blendEquation(i.FUNC_ADD),x=Hs,w=Hs),ft)switch(O){case Lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wu:i.blendFunc(i.ONE,i.ONE);break;case Xu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",O);break}else switch(O){case Lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xu:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yu:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",O);break}S=null,_=null,b=null,R=null,M.set(0,0,0),A=0,p=O,C=ft}return}we=we||_e,re=re||J,Oe=Oe||ve,(_e!==x||we!==w)&&(i.blendEquationSeparate(mt[_e],mt[we]),x=_e,w=we),(J!==S||ve!==_||re!==b||Oe!==R)&&(i.blendFuncSeparate(ie[J],ie[ve],ie[re],ie[Oe]),S=J,_=ve,b=re,R=Oe),(De.equals(M)===!1||bt!==A)&&(i.blendColor(De.r,De.g,De.b,bt),M.copy(De),A=bt),p=O,C=!1}function le(O,_e){O.side===Zn?Me(i.CULL_FACE):ne(i.CULL_FACE);let J=O.side===dn;_e&&(J=!J),ce(J),O.blending===Lr&&O.transparent===!1?oe(gi):oe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const ve=O.stencilWrite;a.setTest(ve),ve&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Be(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(O){L!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),L=O)}function de(O){O!==F0?(ne(i.CULL_FACE),O!==I&&(O===$u?i.cullFace(i.BACK):O===O0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),I=O}function ze(O){O!==k&&(G&&i.lineWidth(O),k=O)}function Be(O,_e,J){O?(ne(i.POLYGON_OFFSET_FILL),(N!==_e||B!==J)&&(N=_e,B=J,o.getReversed()&&(_e=-_e),i.polygonOffset(_e,J))):Me(i.POLYGON_OFFSET_FILL)}function We(O){O?ne(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function Ye(O){O===void 0&&(O=i.TEXTURE0+H-1),Q!==O&&(i.activeTexture(O),Q=O)}function U(O,_e,J){J===void 0&&(Q===null?J=i.TEXTURE0+H-1:J=Q);let ve=se[J];ve===void 0&&(ve={type:void 0,texture:void 0},se[J]=ve),(ve.type!==O||ve.texture!==_e)&&(Q!==J&&(i.activeTexture(J),Q=J),i.bindTexture(O,_e||K[O]),ve.type=O,ve.texture=_e)}function dt(){const O=se[Q];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function nt(){try{i.compressedTexImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function E(){try{i.texSubImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function z(){try{i.texSubImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function he(){try{i.texStorage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function ue(){try{i.texStorage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function Z(){try{i.texImage2D(...arguments)}catch(O){rt("WebGLState:",O)}}function ee(){try{i.texImage3D(...arguments)}catch(O){rt("WebGLState:",O)}}function me(O){return h[O]!==void 0?h[O]:i.getParameter(O)}function ke(O,_e){h[O]!==_e&&(i.pixelStorei(O,_e),h[O]=_e)}function xe(O){ut.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ut.copy(O))}function ge(O){tt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),tt.copy(O))}function Fe(O,_e){let J=c.get(_e);J===void 0&&(J=new WeakMap,c.set(_e,J));let ve=J.get(O);ve===void 0&&(ve=i.getUniformBlockIndex(_e,O.name),J.set(O,ve))}function He(O,_e){const ve=c.get(_e).get(O);l.get(_e)!==ve&&(i.uniformBlockBinding(_e,ve,O.__bindingPointIndex),l.set(_e,ve))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},Q=null,se={},d={},f=new WeakMap,g=[],y=null,m=!1,p=null,x=null,S=null,_=null,w=null,b=null,R=null,M=new et(0,0,0),A=0,C=!1,L=null,I=null,k=null,N=null,B=null,ut.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ne,disable:Me,bindFramebuffer:Ge,drawBuffers:Ee,useProgram:$e,setBlending:oe,setMaterial:le,setFlipSided:ce,setCullFace:de,setLineWidth:ze,setPolygonOffset:Be,setScissorTest:We,activeTexture:Ye,bindTexture:U,unbindTexture:dt,compressedTexImage2D:nt,compressedTexImage3D:P,texImage2D:Z,texImage3D:ee,pixelStorei:ke,getParameter:me,updateUBOMapping:Fe,uniformBlockBinding:He,texStorage2D:he,texStorage3D:ue,texSubImage2D:E,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:q,scissor:xe,viewport:ge,reset:Ke}}function OS(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,E){return g?new OffscreenCanvas(P,E):Ra("canvas")}function m(P,E,z){let W=1;const q=nt(P);if((q.width>z||q.height>z)&&(W=z/Math.max(q.width,q.height)),W<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const he=Math.floor(W*q.width),ue=Math.floor(W*q.height);d===void 0&&(d=y(he,ue));const Z=E?y(he,ue):d;return Z.width=he,Z.height=ue,Z.getContext("2d").drawImage(P,0,0,he,ue),Ve("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+he+"x"+ue+")."),Z}else return"data"in P&&Ve("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),P;return P}function p(P){return P.generateMipmaps}function x(P){i.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,E,z,W,q,he=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ue;W&&(ue=e.get("EXT_texture_norm16"),ue||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=E;if(E===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8),z===i.UNSIGNED_SHORT&&ue&&(Z=ue.R16_EXT),z===i.SHORT&&ue&&(Z=ue.R16_SNORM_EXT)),E===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),E===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8),z===i.UNSIGNED_SHORT&&ue&&(Z=ue.RG16_EXT),z===i.SHORT&&ue&&(Z=ue.RG16_SNORM_EXT)),E===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),E===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),E===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),E===i.RGB&&(z===i.UNSIGNED_SHORT&&ue&&(Z=ue.RGB16_EXT),z===i.SHORT&&ue&&(Z=ue.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),E===i.RGBA){const ee=he?Aa:st.getTransfer(q);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=ee===gt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ue&&(Z=ue.RGBA16_EXT),z===i.SHORT&&ue&&(Z=ue.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function w(P,E){let z;return P?E===null||E===ei||E===Zr?z=i.DEPTH24_STENCIL8:E===Kn?z=i.DEPTH32F_STENCIL8:E===qr&&(z=i.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ei||E===Zr?z=i.DEPTH_COMPONENT24:E===Kn?z=i.DEPTH_COMPONENT32F:E===qr&&(z=i.DEPTH_COMPONENT16),z}function b(P,E){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Xt&&P.minFilter!==jt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function R(P){const E=P.target;E.removeEventListener("dispose",R),A(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&h.delete(E)}function M(P){const E=P.target;E.removeEventListener("dispose",M),L(E)}function A(P){const E=n.get(P);if(E.__webglInit===void 0)return;const z=P.source,W=f.get(z);if(W){const q=W[E.__cacheKey];q.usedTimes--,q.usedTimes===0&&C(P),Object.keys(W).length===0&&f.delete(z)}n.remove(P)}function C(P){const E=n.get(P);i.deleteTexture(E.__webglTexture);const z=P.source,W=f.get(z);delete W[E.__cacheKey],o.memory.textures--}function L(P){const E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(E.__webglFramebuffer[W]))for(let q=0;q<E.__webglFramebuffer[W].length;q++)i.deleteFramebuffer(E.__webglFramebuffer[W][q]);else i.deleteFramebuffer(E.__webglFramebuffer[W]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[W])}else{if(Array.isArray(E.__webglFramebuffer))for(let W=0;W<E.__webglFramebuffer.length;W++)i.deleteFramebuffer(E.__webglFramebuffer[W]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let W=0;W<E.__webglColorRenderbuffer.length;W++)E.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[W]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=P.textures;for(let W=0,q=z.length;W<q;W++){const he=n.get(z[W]);he.__webglTexture&&(i.deleteTexture(he.__webglTexture),o.memory.textures--),n.remove(z[W])}n.remove(P)}let I=0;function k(){I=0}function N(){return I}function B(P){I=P}function H(){const P=I;return P>=s.maxTextures&&Ve("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function G(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function j(P,E){const z=n.get(P);if(P.isVideoTexture&&U(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const W=P.image;if(W===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(z,P,E);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+E)}function Y(P,E){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Me(z,P,E);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+E)}function Q(P,E){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Me(z,P,E);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+E)}function se(P,E){const z=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){Ge(z,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+E)}const Ue={[lc]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[cc]:i.MIRRORED_REPEAT},Ce={[Xt]:i.NEAREST,[r_]:i.NEAREST_MIPMAP_NEAREST,[Po]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[hl]:i.LINEAR_MIPMAP_NEAREST,[hs]:i.LINEAR_MIPMAP_LINEAR},ut={[c_]:i.NEVER,[p_]:i.ALWAYS,[h_]:i.LESS,[Eh]:i.LEQUAL,[u_]:i.EQUAL,[Th]:i.GEQUAL,[d_]:i.GREATER,[f_]:i.NOTEQUAL};function tt(P,E){if(E.type===Kn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===jt||E.magFilter===hl||E.magFilter===Po||E.magFilter===hs||E.minFilter===jt||E.minFilter===hl||E.minFilter===Po||E.minFilter===hs)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Ue[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Ue[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Ue[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Ce[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Ce[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ut[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Xt||E.minFilter!==Po&&E.minFilter!==hs||E.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ot(P,E){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",R));const W=E.source;let q=f.get(W);q===void 0&&(q={},f.set(W,q));const he=G(E);if(he!==P.__cacheKey){q[he]===void 0&&(q[he]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),q[he].usedTimes++;const ue=q[P.__cacheKey];ue!==void 0&&(q[P.__cacheKey].usedTimes--,ue.usedTimes===0&&C(E)),P.__cacheKey=he,P.__webglTexture=q[he].texture}return z}function K(P,E,z){return Math.floor(Math.floor(P/z)/E)}function ne(P,E,z,W){const he=P.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,z,W,E.data);else{he.sort((ke,xe)=>ke.start-xe.start);let ue=0;for(let ke=1;ke<he.length;ke++){const xe=he[ue],ge=he[ke],Fe=xe.start+xe.count,He=K(ge.start,E.width,4),Ke=K(xe.start,E.width,4);ge.start<=Fe+1&&He===Ke&&K(ge.start+ge.count-1,E.width,4)===He?xe.count=Math.max(xe.count,ge.start+ge.count-xe.start):(++ue,he[ue]=ge)}he.length=ue+1;const Z=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let ke=0,xe=he.length;ke<xe;ke++){const ge=he[ke],Fe=Math.floor(ge.start/4),He=Math.ceil(ge.count/4),Ke=Fe%E.width,O=Math.floor(Fe/E.width),_e=He,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Ke,O,_e,J,z,W,E.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function Me(P,E,z){let W=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(W=i.TEXTURE_3D);const q=ot(P,E),he=E.source;t.bindTexture(W,P.__webglTexture,i.TEXTURE0+z);const ue=n.get(he);if(he.version!==ue.__version||q===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const J=st.getPrimaries(st.workingColorSpace),ve=E.colorSpace===Fi?null:st.getPrimaries(E.colorSpace),we=E.colorSpace===Fi||J===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment);let ee=m(E.image,!1,s.maxTextureSize);ee=dt(E,ee);const me=r.convert(E.format,E.colorSpace),ke=r.convert(E.type);let xe=_(E.internalFormat,me,ke,E.normalized,E.colorSpace,E.isVideoTexture);tt(W,E);let ge;const Fe=E.mipmaps,He=E.isVideoTexture!==!0,Ke=ue.__version===void 0||q===!0,O=he.dataReady,_e=b(E,ee);if(E.isDepthTexture)xe=w(E.format===us,E.type),Ke&&(He?t.texStorage2D(i.TEXTURE_2D,1,xe,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,xe,ee.width,ee.height,0,me,ke,null));else if(E.isDataTexture)if(Fe.length>0){He&&Ke&&t.texStorage2D(i.TEXTURE_2D,_e,xe,Fe[0].width,Fe[0].height);for(let J=0,ve=Fe.length;J<ve;J++)ge=Fe[J],He?O&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,ge.width,ge.height,me,ke,ge.data):t.texImage2D(i.TEXTURE_2D,J,xe,ge.width,ge.height,0,me,ke,ge.data);E.generateMipmaps=!1}else He?(Ke&&t.texStorage2D(i.TEXTURE_2D,_e,xe,ee.width,ee.height),O&&ne(E,ee,me,ke)):t.texImage2D(i.TEXTURE_2D,0,xe,ee.width,ee.height,0,me,ke,ee.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){He&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,xe,Fe[0].width,Fe[0].height,ee.depth);for(let J=0,ve=Fe.length;J<ve;J++)if(ge=Fe[J],E.format!==Fn)if(me!==null)if(He){if(O)if(E.layerUpdates.size>0){const we=Id(ge.width,ge.height,E.format,E.type);for(const re of E.layerUpdates){const Oe=ge.data.subarray(re*we/ge.data.BYTES_PER_ELEMENT,(re+1)*we/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,re,ge.width,ge.height,1,me,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ge.width,ge.height,ee.depth,me,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,xe,ge.width,ge.height,ee.depth,0,ge.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ge.width,ge.height,ee.depth,me,ke,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,xe,ge.width,ge.height,ee.depth,0,me,ke,ge.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{He&&Ke&&t.texStorage2D(i.TEXTURE_2D,_e,xe,Fe[0].width,Fe[0].height);for(let J=0,ve=Fe.length;J<ve;J++)ge=Fe[J],E.format!==Fn?me!==null?He?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,J,xe,ge.width,ge.height,0,ge.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?O&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,ge.width,ge.height,me,ke,ge.data):t.texImage2D(i.TEXTURE_2D,J,xe,ge.width,ge.height,0,me,ke,ge.data)}else if(E.isDataArrayTexture)if(He){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,xe,ee.width,ee.height,ee.depth),O)if(E.layerUpdates.size>0){const J=Id(ee.width,ee.height,E.format,E.type);for(const ve of E.layerUpdates){const we=ee.data.subarray(ve*J/ee.data.BYTES_PER_ELEMENT,(ve+1)*J/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,ee.width,ee.height,1,me,ke,we)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,me,ke,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,ee.width,ee.height,ee.depth,0,me,ke,ee.data);else if(E.isData3DTexture)He?(Ke&&t.texStorage3D(i.TEXTURE_3D,_e,xe,ee.width,ee.height,ee.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,me,ke,ee.data)):t.texImage3D(i.TEXTURE_3D,0,xe,ee.width,ee.height,ee.depth,0,me,ke,ee.data);else if(E.isFramebufferTexture){if(Ke)if(He)t.texStorage2D(i.TEXTURE_2D,_e,xe,ee.width,ee.height);else{let J=ee.width,ve=ee.height;for(let we=0;we<_e;we++)t.texImage2D(i.TEXTURE_2D,we,xe,J,ve,0,me,ke,null),J>>=1,ve>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),ee.parentNode!==J){J.appendChild(ee),h.add(E),J.onpaint=ve=>{const we=ve.changedElements;for(const re of h)we.includes(re.image)&&(re.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{const we=i.RGBA,re=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,we,re,Oe,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(He&&Ke){const J=nt(Fe[0]);t.texStorage2D(i.TEXTURE_2D,_e,xe,J.width,J.height)}for(let J=0,ve=Fe.length;J<ve;J++)ge=Fe[J],He?O&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,me,ke,ge):t.texImage2D(i.TEXTURE_2D,J,xe,me,ke,ge);E.generateMipmaps=!1}else if(He){if(Ke){const J=nt(ee);t.texStorage2D(i.TEXTURE_2D,_e,xe,J.width,J.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,ke,ee)}else t.texImage2D(i.TEXTURE_2D,0,xe,me,ke,ee);p(E)&&x(W),ue.__version=he.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Ge(P,E,z){if(E.image.length!==6)return;const W=ot(P,E),q=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+z);const he=n.get(q);if(q.version!==he.__version||W===!0){t.activeTexture(i.TEXTURE0+z);const ue=st.getPrimaries(st.workingColorSpace),Z=E.colorSpace===Fi?null:st.getPrimaries(E.colorSpace),ee=E.colorSpace===Fi||ue===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const me=E.isCompressedTexture||E.image[0].isCompressedTexture,ke=E.image[0]&&E.image[0].isDataTexture,xe=[];for(let re=0;re<6;re++)!me&&!ke?xe[re]=m(E.image[re],!0,s.maxCubemapSize):xe[re]=ke?E.image[re].image:E.image[re],xe[re]=dt(E,xe[re]);const ge=xe[0],Fe=r.convert(E.format,E.colorSpace),He=r.convert(E.type),Ke=_(E.internalFormat,Fe,He,E.normalized,E.colorSpace),O=E.isVideoTexture!==!0,_e=he.__version===void 0||W===!0,J=q.dataReady;let ve=b(E,ge);tt(i.TEXTURE_CUBE_MAP,E);let we;if(me){O&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ke,ge.width,ge.height);for(let re=0;re<6;re++){we=xe[re].mipmaps;for(let Oe=0;Oe<we.length;Oe++){const De=we[Oe];E.format!==Fn?Fe!==null?O?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,De.width,De.height,Fe,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,Ke,De.width,De.height,0,De.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,0,0,De.width,De.height,Fe,He,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe,Ke,De.width,De.height,0,Fe,He,De.data)}}}else{if(we=E.mipmaps,O&&_e){we.length>0&&ve++;const re=nt(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ke,re.width,re.height)}for(let re=0;re<6;re++)if(ke){O?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,xe[re].width,xe[re].height,Fe,He,xe[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,xe[re].width,xe[re].height,0,Fe,He,xe[re].data);for(let Oe=0;Oe<we.length;Oe++){const bt=we[Oe].image[re].image;O?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,bt.width,bt.height,Fe,He,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,Ke,bt.width,bt.height,0,Fe,He,bt.data)}}else{O?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Fe,He,xe[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ke,Fe,He,xe[re]);for(let Oe=0;Oe<we.length;Oe++){const De=we[Oe];O?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,0,0,Fe,He,De.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Oe+1,Ke,Fe,He,De.image[re])}}}p(E)&&x(i.TEXTURE_CUBE_MAP),he.__version=q.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Ee(P,E,z,W,q,he){const ue=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),ee=_(z.internalFormat,ue,Z,z.normalized,z.colorSpace),me=n.get(E),ke=n.get(z);if(ke.__renderTarget=E,!me.__hasExternalTextures){const xe=Math.max(1,E.width>>he),ge=Math.max(1,E.height>>he);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,he,ee,xe,ge,E.depth,0,ue,Z,null):t.texImage2D(q,he,ee,xe,ge,0,ue,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Ye(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,q,ke.__webglTexture,0,We(E)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,q,ke.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(P,E,z){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){const W=E.depthTexture,q=W&&W.isDepthTexture?W.type:null,he=w(E.stencilBuffer,q),ue=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ye(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We(E),he,E.width,E.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,We(E),he,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,he,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,P)}else{const W=E.textures;for(let q=0;q<W.length;q++){const he=W[q],ue=r.convert(he.format,he.colorSpace),Z=r.convert(he.type),ee=_(he.internalFormat,ue,Z,he.normalized,he.colorSpace);Ye(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We(E),ee,E.width,E.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,We(E),ee,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ee,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function mt(P,E,z){const W=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(E.depthTexture);if(q.__renderTarget=E,(!q.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W){if(q.__webglInit===void 0&&(q.__webglInit=!0,E.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),tt(i.TEXTURE_CUBE_MAP,E.depthTexture);const me=r.convert(E.depthTexture.format),ke=r.convert(E.depthTexture.type);let xe;E.depthTexture.format===Mi?xe=i.DEPTH_COMPONENT24:E.depthTexture.format===us&&(xe=i.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,xe,E.width,E.height,0,me,ke,null)}}else j(E.depthTexture,0);const he=q.__webglTexture,ue=We(E),Z=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ee=E.depthTexture.format===us?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(E.depthTexture.format===Mi)Ye(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,Z,he,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,Z,he,0);else if(E.depthTexture.format===us)Ye(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,Z,he,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,Z,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(P){const E=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const W=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),W){const q=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,W.removeEventListener("dispose",q)};W.addEventListener("dispose",q),E.__depthDisposeCallback=q}E.__boundDepthTexture=W}if(P.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)mt(E.__webglFramebuffer[W],P,W);else{const W=P.texture.mipmaps;W&&W.length>0?mt(E.__webglFramebuffer[0],P,0):mt(E.__webglFramebuffer,P,0)}else if(z){E.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[W]),E.__webglDepthbuffer[W]===void 0)E.__webglDepthbuffer[W]=i.createRenderbuffer(),$e(E.__webglDepthbuffer[W],P,!1);else{const q=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=E.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,he)}}else{const W=P.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),$e(E.__webglDepthbuffer,P,!1);else{const q=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,he)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(P,E,z){const W=n.get(P);E!==void 0&&Ee(W.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&ie(P)}function le(P){const E=P.texture,z=n.get(P),W=n.get(E);P.addEventListener("dispose",M);const q=P.textures,he=P.isWebGLCubeRenderTarget===!0,ue=q.length>1;if(ue||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=E.version,o.memory.textures++),he){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let ee=0;ee<E.mipmaps.length;ee++)z.__webglFramebuffer[Z][ee]=i.createFramebuffer()}else z.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<E.mipmaps.length;Z++)z.__webglFramebuffer[Z]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ue)for(let Z=0,ee=q.length;Z<ee;Z++){const me=n.get(q[Z]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Ye(P)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){const ee=q[Z];z.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);const me=r.convert(ee.format,ee.colorSpace),ke=r.convert(ee.type),xe=_(ee.internalFormat,me,ke,ee.normalized,ee.colorSpace,P.isXRRenderTarget===!0),ge=We(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,xe,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),$e(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),tt(i.TEXTURE_CUBE_MAP,E);for(let Z=0;Z<6;Z++)if(E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)Ee(z.__webglFramebuffer[Z][ee],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ee);else Ee(z.__webglFramebuffer[Z],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(E)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let Z=0,ee=q.length;Z<ee;Z++){const me=q[Z],ke=n.get(me);let xe=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(xe=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,ke.__webglTexture),tt(xe,me),Ee(z.__webglFramebuffer,P,me,i.COLOR_ATTACHMENT0+Z,xe,0),p(me)&&x(xe)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Z=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,W.__webglTexture),tt(Z,E),E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)Ee(z.__webglFramebuffer[ee],P,E,i.COLOR_ATTACHMENT0,Z,ee);else Ee(z.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,Z,0);p(E)&&x(Z),t.unbindTexture()}P.depthBuffer&&ie(P)}function ce(P){const E=P.textures;for(let z=0,W=E.length;z<W;z++){const q=E[z];if(p(q)){const he=S(P),ue=n.get(q).__webglTexture;t.bindTexture(he,ue),x(he),t.unbindTexture()}}}const de=[],ze=[];function Be(P){if(P.samples>0){if(Ye(P)===!1){const E=P.textures,z=P.width,W=P.height;let q=i.COLOR_BUFFER_BIT;const he=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(P),Z=E.length>1;if(Z)for(let me=0;me<E.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ee=P.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let me=0;me<E.length;me++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[me]);const ke=n.get(E[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,z,W,0,0,z,W,q,i.NEAREST),l===!0&&(de.length=0,ze.length=0,de.push(i.COLOR_ATTACHMENT0+me),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(de.push(he),ze.push(he),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let me=0;me<E.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,ue.__webglColorRenderbuffer[me]);const ke=n.get(E[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function We(P){return Math.min(s.maxSamples,P.samples)}function Ye(P){const E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function U(P){const E=o.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function dt(P,E){const z=P.colorSpace,W=P.format,q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==Ta&&z!==Fi&&(st.getTransfer(z)===gt?(W!==Fn||q!==Mn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",z)),E}function nt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=k,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=se,this.rebindTextures=oe,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Ye,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function BS(i,e){function t(n,s=Fi){let r;const o=st.getTransfer(s);if(n===Mn)return i.UNSIGNED_BYTE;if(n===yh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Mh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ep)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sp)return i.BYTE;if(n===wp)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===xh)return i.INT;if(n===ei)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===ti)return i.HALF_FLOAT;if(n===Ap)return i.ALPHA;if(n===Rp)return i.RGB;if(n===Fn)return i.RGBA;if(n===Mi)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===Cp)return i.RED;if(n===bh)return i.RED_INTEGER;if(n===vs)return i.RG;if(n===Sh)return i.RG_INTEGER;if(n===wh)return i.RGBA_INTEGER;if(n===ua||n===da||n===fa||n===pa)if(o===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hc||n===uc||n===dc||n===fc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===hc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pc||n===mc||n===gc||n===_c||n===vc||n===wa||n===xc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pc||n===mc)return o===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===gc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===_c)return r.COMPRESSED_R11_EAC;if(n===vc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wa)return r.COMPRESSED_RG11_EAC;if(n===xc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===yc||n===Mc||n===bc||n===Sc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Lc||n===Ic||n===Dc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ec)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Tc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ac)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Rc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Cc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ic)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Dc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nc||n===Uc||n===kc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Nc)return o===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fc||n===Oc||n===Ea||n===Bc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const zS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,HS=`
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

}`;class GS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Bp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ni({vertexShader:zS,fragmentShader:HS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new qa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class VS extends ts{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const y=typeof XRWebGLBinding<"u",m=new GS,p={},x=t.getContextAttributes();let S=null,_=null;const w=[],b=[],R=new ae;let M=null,A=null;const C=new xn;C.viewport=new Pt;const L=new xn;L.viewport=new Pt;const I=[C,L],k=new Zv;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ne=w[K];return ne===void 0&&(ne=new _l,w[K]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(K){let ne=w[K];return ne===void 0&&(ne=new _l,w[K]=ne),ne.getGripSpace()},this.getHand=function(K){let ne=w[K];return ne===void 0&&(ne=new _l,w[K]=ne),ne.getHandSpace()};function H(K){const ne=b.indexOf(K.inputSource);if(ne===-1)return;const Me=w[ne];Me!==void 0&&(Me.update(K.inputSource,K.frame,c||o),Me.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",j);for(let K=0;K<w.length;K++){const ne=b[K];ne!==null&&(b[K]=null,w[K].disconnect(ne))}N=null,B=null,m.reset();for(const K in p)delete p[K];if(e.setRenderTarget(S),f=null,d=null,h=null,s=null,_=null,ot.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(R.width,R.height,!1),A!==null){const K=A.camera;K.fov=A.fov,K.zoom=A.zoom,K.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",G),s.addEventListener("inputsourceschange",j),x.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ge=null,Ee=null;x.depth&&(Ee=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=x.stencil?us:Mi,Ge=x.stencil?Zr:ei);const $e={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer($e),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new On(d.textureWidth,d.textureHeight,{format:Fn,type:Mn,depthTexture:new jr(d.textureWidth,d.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new On(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ot.setContext(s),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(K){for(let ne=0;ne<K.removed.length;ne++){const Me=K.removed[ne],Ge=b.indexOf(Me);Ge>=0&&(b[Ge]=null,w[Ge].disconnect(Me))}for(let ne=0;ne<K.added.length;ne++){const Me=K.added[ne];let Ge=b.indexOf(Me);if(Ge===-1){for(let $e=0;$e<w.length;$e++)if($e>=b.length){b.push(Me),Ge=$e;break}else if(b[$e]===null){b[$e]=Me,Ge=$e;break}if(Ge===-1)break}const Ee=w[Ge];Ee&&Ee.connect(Me)}}const Y=new D,Q=new D;function se(K,ne,Me){Y.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(Me.matrixWorld);const Ge=Y.distanceTo(Q),Ee=ne.projectionMatrix.elements,$e=Me.projectionMatrix.elements,mt=Ee[14]/(Ee[10]-1),ie=Ee[14]/(Ee[10]+1),oe=(Ee[9]+1)/Ee[5],le=(Ee[9]-1)/Ee[5],ce=(Ee[8]-1)/Ee[0],de=($e[8]+1)/$e[0],ze=mt*ce,Be=mt*de,We=Ge/(-ce+de),Ye=We*-ce;if(ne.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ye),K.translateZ(We),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ee[10]===-1)K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const U=mt+We,dt=ie+We,nt=ze-Ye,P=Be+(Ge-Ye),E=oe*ie/dt*U,z=le*ie/dt*U;K.projectionMatrix.makePerspective(nt,P,E,z,U,dt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ue(K,ne){ne===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ne.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ne=K.near,Me=K.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),k.near=L.near=C.near=ne,k.far=L.far=C.far=Me,(N!==k.near||B!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),N=k.near,B=k.far),k.layers.mask=K.layers.mask|6,C.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;const Ge=K.parent,Ee=k.cameras;Ue(k,Ge);for(let $e=0;$e<Ee.length;$e++)Ue(Ee[$e],Ge);Ee.length===2?se(k,C,L):k.projectionMatrix.copy(C.projectionMatrix),A===null&&K.isPerspectiveCamera&&(A={camera:K,fov:K.fov,zoom:K.zoom}),Ce(K,k,Ge)};function Ce(K,ne,Me){Me===null?K.matrix.copy(ne.matrixWorld):(K.matrix.copy(Me.matrixWorld),K.matrix.invert(),K.matrix.multiply(ne.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Jr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(K){return p[K]};let ut=null;function tt(K,ne){if(u=ne.getViewerPose(c||o),g=ne,u!==null){const Me=u.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Ge=!1;Me.length!==k.cameras.length&&(k.cameras.length=0,Ge=!0);for(let ie=0;ie<Me.length;ie++){const oe=Me[ie];let le=null;if(f!==null)le=f.getViewport(oe);else{const de=h.getViewSubImage(d,oe);le=de.viewport,ie===0&&(e.setRenderTargetTextures(_,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(_))}let ce=I[ie];ce===void 0&&(ce=new xn,ce.layers.enable(ie),ce.viewport=new Pt,I[ie]=ce),ce.matrix.fromArray(oe.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(oe.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(le.x,le.y,le.width,le.height),ie===0&&(k.matrix.copy(ce.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ge===!0&&k.cameras.push(ce)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){h=n.getBinding();const ie=h.getDepthInformation(Me[0]);ie&&ie.isValid&&ie.texture&&m.init(ie,s.renderState)}if(Ee&&Ee.includes("camera-access")&&y){e.state.unbindTexture(),h=n.getBinding();for(let ie=0;ie<Me.length;ie++){const oe=Me[ie].camera;if(oe){let le=p[oe];le||(le=new Bp,p[oe]=le);const ce=h.getCameraImage(oe);le.sourceTexture=ce}}}}for(let Me=0;Me<w.length;Me++){const Ge=b[Me],Ee=w[Me];Ge!==null&&Ee!==void 0&&Ee.update(Ge,ne,c||o)}ut&&ut(K,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const ot=new jp;ot.setAnimationLoop(tt),this.setAnimationLoop=function(K){ut=K},this.dispose=function(){}}}const $S=new wt,rm=new qe;rm.set(-1,0,0,0,1,0,0,0,1);function WS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,qp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,S,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===dn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===dn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),S=x.envMap,_=x.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4($S.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(rm),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===dn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function XS(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,w){const b=w.program;n.uniformBlockBinding(_,b)}function c(_,w){let b=s[_.id];b===void 0&&(m(_),b=u(_),s[_.id]=b,_.addEventListener("dispose",x));const R=w.program;n.updateUBOMapping(_,R);const M=e.render.frame;r[_.id]!==M&&(d(_),r[_.id]=M)}function u(_){const w=h();_.__bindingPointIndex=w;const b=i.createBuffer(),R=_.__size,M=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,R,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,b),b}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const w=s[_.id],b=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let M=0,A=b.length;M<A;M++){const C=b[M];if(Array.isArray(C))for(let L=0,I=C.length;L<I;L++)f(C[L],M,L,R);else f(C,M,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,w,b,R){if(y(_,w,b,R)===!0){const M=_.__offset,A=_.value;if(Array.isArray(A)){let C=0;for(let L=0;L<A.length;L++){const I=A[L],k=p(I);g(I,_.__data,C),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(C+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,_.__data)}}function g(_,w,b){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,b)}function y(_,w,b,R){const M=_.value,A=w+"_"+b;if(R[A]===void 0)return typeof M=="number"||typeof M=="boolean"?R[A]=M:ArrayBuffer.isView(M)?R[A]=M.slice():R[A]=M.clone(),!0;{const C=R[A];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return R[A]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(C.equals(M)===!1)return C.copy(M),!0}}return!1}function m(_){const w=_.uniforms;let b=0;const R=16;for(let A=0,C=w.length;A<C;A++){const L=Array.isArray(w[A])?w[A]:[w[A]];for(let I=0,k=L.length;I<k;I++){const N=L[I],B=Array.isArray(N.value)?N.value:[N.value];for(let H=0,G=B.length;H<G;H++){const j=B[H],Y=p(j),Q=b%R,se=Q%Y.boundary,Ue=Q+se;b+=se,Ue!==0&&R-Ue<Y.storage&&(b+=R-Ue),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=Y.storage}}}const M=b%R;return M>0&&(b+=R-M),_.__size=b,_.__cache={},this}function p(_){const w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",_),w}function x(_){const w=_.target;w.removeEventListener("dispose",x);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function S(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:S}}const YS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let $n=null;function qS(){return $n===null&&($n=new nv(YS,16,16,vs,ti),$n.name="DFG_LUT",$n.minFilter=jt,$n.magFilter=jt,$n.wrapS=pi,$n.wrapT=pi,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}class om{constructor(e={}){const{canvas:t=__(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Mn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const y=f,m=new Set([wh,Sh,bh]),p=new Set([Mn,ei,qr,Zr,yh,Mh]),x=new Uint32Array(4),S=new Int32Array(4),_=new D;let w=null,b=null;const R=[],M=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,I=null,k=null,N=null,B=null;this._outputColorSpace=An;let H=0,G=0,j=null,Y=-1,Q=null;const se=new Pt,Ue=new Pt;let Ce=null;const ut=new et(0);let tt=0,ot=t.width,K=t.height,ne=1,Me=null,Ge=null;const Ee=new Pt(0,0,ot,K),$e=new Pt(0,0,ot,K);let mt=!1;const ie=new Lh;let oe=!1,le=!1;const ce=new wt,de=new D,ze=new Pt,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function Ye(){return j===null?ne:1}let U=n;function dt(T,F){return t.getContext(T,F)}let nt,P,E,z,W,q,he,ue,Z,ee,me,ke,xe,ge,Fe,He,Ke,O,_e,J,ve,we,re;try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vh}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Pn,!1),U===null){const F="webgl2";if(U=dt(F,T),U===null)throw dt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(T){throw t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),rt("WebGLRenderer: "+T.message),T}function Oe(){nt=new qM(U),nt.init(),ve=new BS(U,nt),P=new OM(U,nt,e,ve),E=new FS(U,nt),P.reversedDepthBuffer&&d&&E.buffers.depth.setReversed(!0),k=U.createFramebuffer(),N=U.createFramebuffer(),B=U.createFramebuffer(),z=new JM(U),W=new SS,q=new OS(U,nt,E,W,P,ve,z),he=new YM(C),ue=new Qv(U),we=new kM(U,ue),Z=new ZM(U,ue,z,we),ee=new QM(U,Z,ue,we,z),O=new jM(U,P,q),Fe=new BM(W),me=new bS(C,he,nt,P,we,Fe),ke=new WS(C,W),xe=new ES,ge=new LS(nt),Ke=new UM(C,he,E,ee,g,l),He=new kS(C,ee,P),re=new XS(U,z,P,E),_e=new FM(U,nt,z),J=new KM(U,nt,z),z.programs=me.programs,C.capabilities=P,C.extensions=nt,C.properties=W,C.renderLists=xe,C.shadowMap=He,C.state=E,C.info=z}y!==Mn&&(A=new tb(y,t.width,t.height,a,s,r));const De=new VS(C,U);this.xr=De,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(T){T!==void 0&&(ne=T,this.setSize(ot,K,!1))},this.getSize=function(T){return T.set(ot,K)},this.setSize=function(T,F,X=!0){if(De.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=T,K=F,t.width=Math.floor(T*ne),t.height=Math.floor(F*ne),X===!0&&(t.style.width=T+"px",t.style.height=F+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(ot*ne,K*ne).floor()},this.setDrawingBufferSize=function(T,F,X){ot=T,K=F,ne=X,t.width=Math.floor(T*X),t.height=Math.floor(F*X),this.setViewport(0,0,T,F)},this.setEffects=function(T){if(y===Mn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let F=0;F<T.length;F++)if(T[F].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(se)},this.getViewport=function(T){return T.copy(Ee)},this.setViewport=function(T,F,X,V){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,F,X,V),E.viewport(se.copy(Ee).multiplyScalar(ne).round())},this.getScissor=function(T){return T.copy($e)},this.setScissor=function(T,F,X,V){T.isVector4?$e.set(T.x,T.y,T.z,T.w):$e.set(T,F,X,V),E.scissor(Ue.copy($e).multiplyScalar(ne).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(T){E.setScissorTest(mt=T)},this.setOpaqueSort=function(T){Me=T},this.setTransparentSort=function(T){Ge=T},this.getClearColor=function(T){return T.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,X=!0){let V=0;if(T){let $=!1;if(j!==null){const Se=j.texture.format;$=m.has(Se)}if($){const Se=j.texture.type,Re=p.has(Se),be=Ke.getClearColor(),Le=Ke.getClearAlpha(),Ne=be.r,Je=be.g,it=be.b;Re?(x[0]=Ne,x[1]=Je,x[2]=it,x[3]=Le,U.clearBufferuiv(U.COLOR,0,x)):(S[0]=Ne,S[1]=Je,S[2]=it,S[3]=Le,U.clearBufferiv(U.COLOR,0,S))}else V|=U.COLOR_BUFFER_BIT}F&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),I=T},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),Ke.dispose(),xe.dispose(),ge.dispose(),W.dispose(),he.dispose(),ee.dispose(),we.dispose(),re.dispose(),me.dispose(),De.dispose(),De.removeEventListener("sessionstart",iu),De.removeEventListener("sessionend",su),is.stop()};function bt(T){T.preventDefault(),Ku("WebGLRenderer: Context Lost."),L=!0}function ft(){Ku("WebGLRenderer: Context Restored."),L=!1;const T=z.autoReset,F=He.enabled,X=He.autoUpdate,V=He.needsUpdate,$=He.type;Oe(),z.autoReset=T,He.enabled=F,He.autoUpdate=X,He.needsUpdate=V,He.type=$}function Pn(T){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Hn(T){const F=T.target;F.removeEventListener("dispose",Hn),Vm(F)}function Vm(T){$m(T),W.remove(T)}function $m(T){const F=W.get(T).programs;F!==void 0&&(F.forEach(function(X){me.releaseProgram(X)}),T.isShaderMaterial&&me.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,X,V,$,Se){F===null&&(F=Be);const Re=$.isMesh&&$.matrixWorld.determinantAffine()<0,be=Ym(T,F,X,V,$);E.setMaterial(V,Re);let Le=X.index,Ne=1;if(V.wireframe===!0){if(Le=Z.getWireframeAttribute(X),Le===void 0)return;Ne=2}const Je=X.drawRange,it=X.attributes.position;let Ie=Je.start*Ne,pt=(Je.start+Je.count)*Ne;Se!==null&&(Ie=Math.max(Ie,Se.start*Ne),pt=Math.min(pt,(Se.start+Se.count)*Ne)),Le!==null?(Ie=Math.max(Ie,0),pt=Math.min(pt,Le.count)):it!=null&&(Ie=Math.max(Ie,0),pt=Math.min(pt,it.count));const kt=pt-Ie;if(kt<0||kt===1/0)return;we.setup($,V,be,X,Le);let Tt,yt=_e;if(Le!==null&&(Tt=ue.get(Le),yt=J,yt.setIndex(Tt)),$.isMesh)V.wireframe===!0?(E.setLineWidth(V.wireframeLinewidth*Ye()),yt.setMode(U.LINES)):yt.setMode(U.TRIANGLES);else if($.isLine){let Yt=V.linewidth;Yt===void 0&&(Yt=1),E.setLineWidth(Yt*Ye()),$.isLineSegments?yt.setMode(U.LINES):$.isLineLoop?yt.setMode(U.LINE_LOOP):yt.setMode(U.LINE_STRIP)}else $.isPoints?yt.setMode(U.POINTS):$.isSprite&&yt.setMode(U.TRIANGLES);if($.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))yt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Yt=$._multiDrawStarts,Ae=$._multiDrawCounts,Qt=$._multiDrawCount,at=Le?ue.get(Le).bytesPerElement:1,wn=W.get(V).currentProgram.getUniforms();for(let Gn=0;Gn<Qt;Gn++)wn.setValue(U,"_gl_DrawID",Gn),yt.render(Yt[Gn]/at,Ae[Gn])}else if($.isInstancedMesh)yt.renderInstances(Ie,kt,$.count);else if(X.isInstancedBufferGeometry){const Yt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,Yt);yt.renderInstances(Ie,kt,Ae)}else yt.render(Ie,kt)};function nu(T,F,X,V){I!==null&&T.isNodeMaterial&&I.setObject(V,T),oe===!0&&Fe.setState(T,X,!1),T.transparent===!0&&T.side===Zn&&T.forceSinglePass===!1?(T.side=dn,T.needsUpdate=!0,wo(T,F,V),T.side=gs,T.needsUpdate=!0,wo(T,F,V),T.side=Zn):wo(T,F,V)}this.compile=function(T,F,X=null){X===null&&(X=T),I!==null&&I.renderStart(T,F,X),b=ge.get(X),b.init(F),M.push(b),X.traverseVisible(function($){$.isLight&&$.layers.test(F.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),T!==X&&T.traverseVisible(function($){$.isLight&&$.layers.test(F.layers)&&(b.pushLight($),$.castShadow&&b.pushShadow($))}),b.setupLights(),I!==null&&I.updateLights(b.state.lightsArray),le=this.localClippingEnabled,oe=Fe.init(this.clippingPlanes,le),oe===!0&&Fe.setGlobalState(this.clippingPlanes,F),I!==null&&He.render(b.state.shadowsArray,X,F);const V=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Se=$.material;if(Se)if(Array.isArray(Se))for(let Re=0;Re<Se.length;Re++){const be=Se[Re];nu(be,X,F,$),V.add(be)}else nu(Se,X,F,$),V.add(Se)}),b=M.pop(),I!==null&&I.renderEnd(),V},this.compileAsync=function(T,F,X=null){const V=this.compile(T,F,X);return new Promise($=>{function Se(){if(V.forEach(function(Re){const Le=W.get(Re).currentProgram;(Le===void 0||Le.isReady())&&V.delete(Re)}),V.size===0){$(T);return}setTimeout(Se,10)}nt.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let nl=null;function Wm(T){nl&&nl(T)}function iu(){is.stop()}function su(){is.start()}const is=new jp;is.setAnimationLoop(Wm),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(T){nl=T,De.setAnimationLoop(T),T===null?is.stop():is.start()},De.addEventListener("sessionstart",iu),De.addEventListener("sessionend",su),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;I!==null&&I.renderStart(T,F);const X=De.enabled===!0&&De.isPresenting===!0,V=A!==null&&(j===null||X)&&A.begin(C,j);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(F),F=De.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,F,j),b=ge.get(T,M.length),b.init(F),b.state.textureUnits=q.getTextureUnits(),M.push(b),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ie.setFromProjectionMatrix(ce,Jn,F.reversedDepth),le=this.localClippingEnabled,oe=Fe.init(this.clippingPlanes,le),w=xe.get(T,R.length),w.init(),R.push(w),De.enabled===!0&&De.isPresenting===!0){const Re=C.xr.getDepthSensingMesh();Re!==null&&il(Re,F,-1/0,C.sortObjects)}il(T,F,0,C.sortObjects),w.finish(),I!==null&&I.updateLights(b.state.lightsArray),C.sortObjects===!0&&w.sort(Me,Ge),We=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,We&&Ke.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Fe.beginShadows();const $=b.state.shadowsArray;if(He.render($,T,F),oe===!0&&Fe.endShadows(),(V&&A.hasRenderPass())===!1){const Re=w.opaque,be=w.transmissive;if(b.setupLights(),F.isArrayCamera){const Le=F.cameras;if(be.length>0)for(let Ne=0,Je=Le.length;Ne<Je;Ne++){const it=Le[Ne];ou(Re,be,T,it)}We&&Ke.render(T);for(let Ne=0,Je=Le.length;Ne<Je;Ne++){const it=Le[Ne];ru(w,T,it,it.viewport)}}else be.length>0&&ou(Re,be,T,F),We&&Ke.render(T),ru(w,T,F)}j!==null&&G===0&&(q.updateMultisampleRenderTarget(j),q.updateRenderTargetMipmap(j)),V&&A.end(C),T.isScene===!0&&T.onAfterRender(C,T,F),we.resetDefaultState(),Y=-1,Q=null,M.pop(),M.length>0?(b=M[M.length-1],q.setTextureUnits(b.state.textureUnits),oe===!0&&Fe.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,I!==null&&I.renderEnd()};function il(T,F,X,V){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(ie)){V&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ce);const Re=ee.update(T),be=T.material;be.visible&&w.push(T,Re,be,X,ze.z,null,F)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(ie))){const Re=ee.update(T),be=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),ze.copy(Re.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(ce)),Array.isArray(be)){const Le=Re.groups;for(let Ne=0,Je=Le.length;Ne<Je;Ne++){const it=Le[Ne],Ie=be[it.materialIndex];Ie&&Ie.visible&&w.push(T,Re,Ie,X,ze.z,it,F)}}else be.visible&&w.push(T,Re,be,X,ze.z,null,F)}}const Se=T.children;for(let Re=0,be=Se.length;Re<be;Re++)il(Se[Re],F,X,V)}function ru(T,F,X,V){const{opaque:$,transmissive:Se,transparent:Re}=T;b.setupLightsView(X),oe===!0&&Fe.setGlobalState(C.clippingPlanes,X),V&&E.viewport(se.copy(V)),$.length>0&&So($,F,X),Se.length>0&&So(Se,F,X),Re.length>0&&So(Re,F,X),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function ou(T,F,X,V){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[V.id]===void 0){const Ie=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[V.id]=new On(1,1,{generateMipmaps:!0,type:Ie?ti:Mn,minFilter:hs,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:st.workingColorSpace})}const Se=b.state.transmissionRenderTarget[V.id],Re=V.viewport||se;Se.setSize(Re.z*C.transmissionResolutionScale,Re.w*C.transmissionResolutionScale);const be=C.getRenderTarget(),Le=C.getActiveCubeFace(),Ne=C.getActiveMipmapLevel();C.setRenderTarget(Se),C.getClearColor(ut),tt=C.getClearAlpha(),tt<1&&C.setClearColor(16777215,.5),C.clear(),We&&Ke.render(X);const Je=C.toneMapping;C.toneMapping=jn;const it=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),b.setupLightsView(V),oe===!0&&Fe.setGlobalState(C.clippingPlanes,V),So(T,X,V),q.updateMultisampleRenderTarget(Se),q.updateRenderTargetMipmap(Se),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let pt=0,kt=F.length;pt<kt;pt++){const Tt=F[pt],{object:yt,geometry:Yt,material:Ae,group:Qt}=Tt;if(Ae.side===Zn&&yt.layers.test(V.layers)){const at=Ae.side;Ae.side=dn,Ae.needsUpdate=!0,au(yt,X,V,Yt,Ae,Qt),Ae.side=at,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(q.updateMultisampleRenderTarget(Se),q.updateRenderTargetMipmap(Se))}C.setRenderTarget(be,Le,Ne),C.setClearColor(ut,tt),it!==void 0&&(V.viewport=it),C.toneMapping=Je}function So(T,F,X){const V=F.isScene===!0?F.overrideMaterial:null;for(let $=0,Se=T.length;$<Se;$++){const Re=T[$],{object:be,geometry:Le,group:Ne}=Re;let Je=Re.material;Je.allowOverride===!0&&V!==null&&(Je=V),be.layers.test(X.layers)&&au(be,F,X,Le,Je,Ne)}}function au(T,F,X,V,$,Se){I!==null&&$.isNodeMaterial&&I.setObject(T,$),T.onBeforeRender(C,F,X,V,$,Se),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(C,F,X,V,T,Se),$.transparent===!0&&$.side===Zn&&$.forceSinglePass===!1?($.side=dn,$.needsUpdate=!0,C.renderBufferDirect(X,F,V,$,T,Se),$.side=gs,$.needsUpdate=!0,C.renderBufferDirect(X,F,V,$,T,Se),$.side=Zn):C.renderBufferDirect(X,F,V,$,T,Se),T.onAfterRender(C,F,X,V,$,Se)}function wo(T,F,X){F.isScene!==!0&&(F=Be);const V=W.get(T),$=b.state.lights,Se=b.state.shadowsArray,Re=$.state.version,be=me.getParameters(T,$.state,Se,F,X,b.state.lightProbeGridArray),Le=me.getProgramCacheKey(be);let Ne=V.programs;V.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;const Je=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;V.envMap=he.get(T.envMap||V.environment,Je),V.envMapRotation=V.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ne===void 0&&(T.addEventListener("dispose",Hn),Ne=new Map,V.programs=Ne);let it=Ne.get(Le);if(it!==void 0){if(V.currentProgram===it&&V.lightsStateVersion===Re)return cu(T,be),it}else be.uniforms=me.getUniforms(T),I!==null&&T.isNodeMaterial&&I.build(T,X,be),T.onBeforeCompile(be,C),it=me.acquireProgram(be,Le),Ne.set(Le,it),V.uniforms=be.uniforms;const Ie=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=Fe.uniform),cu(T,be),V.needsLights=Zm(T),V.lightsStateVersion=Re,V.needsLights&&(Ie.ambientLightColor.value=$.state.ambient,Ie.lightProbe.value=$.state.probe,Ie.sunLights.value=$.state.sun,Ie.sunLightShadows.value=$.state.sunShadow,Ie.directionalLights.value=$.state.directional,Ie.directionalLightShadows.value=$.state.directionalShadow,Ie.spotLights.value=$.state.spot,Ie.spotLightShadows.value=$.state.spotShadow,Ie.rectAreaLights.value=$.state.rectArea,Ie.ltc_1.value=$.state.rectAreaLTC1,Ie.ltc_2.value=$.state.rectAreaLTC2,Ie.pointLights.value=$.state.point,Ie.pointLightShadows.value=$.state.pointShadow,Ie.hemisphereLights.value=$.state.hemi,Ie.sunShadowMatrix.value=$.state.sunShadowMatrix,Ie.sunShadowCascade.value=$.state.sunShadowCascade,Ie.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ie.spotLightMatrix.value=$.state.spotLightMatrix,Ie.spotLightMap.value=$.state.spotLightMap,Ie.pointShadowMatrix.value=$.state.pointShadowMatrix),V.lightProbeGrid=b.state.lightProbeGridArray.length>0,V.currentProgram=it,V.uniformsList=null,it}function lu(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=ma.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function cu(T,F){const X=W.get(T);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function Xm(T,F){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(F.matrixWorld);for(let X=0,V=T.length;X<V;X++){const $=T[X];if($.texture!==null&&$.boundingBox.containsPoint(_))return $}return null}function Ym(T,F,X,V,$){F.isScene!==!0&&(F=Be),q.resetTextureUnits();const Se=F.fog,Re=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,be=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:st.workingColorSpace,Le=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ne=he.get(V.envMap||Re,Le),Je=V.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,it=!!X.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!X.morphAttributes.position,pt=!!X.morphAttributes.normal,kt=!!X.morphAttributes.color;let Tt=jn;V.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Tt=C.toneMapping);const yt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Yt=yt!==void 0?yt.length:0,Ae=W.get(V),Qt=b.state.lights;if(oe===!0&&(le===!0||T!==Q)){const St=T===Q&&V.id===Y;Fe.setState(V,T,St)}let at=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Qt.state.version||Ae.outputColorSpace!==be||$.isBatchedMesh&&Ae.batching===!1||!$.isBatchedMesh&&Ae.batching===!0||$.isBatchedMesh&&Ae.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ae.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ae.instancing===!1||!$.isInstancedMesh&&Ae.instancing===!0||$.isSkinnedMesh&&Ae.skinning===!1||!$.isSkinnedMesh&&Ae.skinning===!0||$.isInstancedMesh&&Ae.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ae.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ae.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ae.instancingMorph===!1&&$.morphTexture!==null||Ae.envMap!==Ne||V.fog===!0&&Ae.fog!==Se||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Fe.numPlanes||Ae.numIntersection!==Fe.numIntersection)||Ae.vertexAlphas!==Je||Ae.vertexTangents!==it||Ae.morphTargets!==Ie||Ae.morphNormals!==pt||Ae.morphColors!==kt||Ae.toneMapping!==Tt||Ae.morphTargetsCount!==Yt||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,Ae.__version=V.version);let wn=Ae.currentProgram;at===!0&&(wn=wo(V,F,$),I&&V.isNodeMaterial&&I.onUpdateProgram(V,wn,Ae));let Gn=!1,Ei=!1,Ss=!1;const vt=wn.getUniforms(),Nt=Ae.uniforms;if(E.useProgram(wn.program)&&(Gn=!0,Ei=!0,Ss=!0),V.id!==Y&&(Y=V.id,Ei=!0),Ae.needsLights){const St=Xm(b.state.lightProbeGridArray,$);Ae.lightProbeGrid!==St&&(Ae.lightProbeGrid=St,Ei=!0)}if(Gn||Q!==T){E.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),vt.setValue(U,"projectionMatrix",T.projectionMatrix),vt.setValue(U,"viewMatrix",T.matrixWorldInverse);const Ai=vt.map.cameraPosition;Ai!==void 0&&Ai.setValue(U,de.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&vt.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&vt.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),Q!==T&&(Q=T,Ei=!0,Ss=!0)}if(Ae.needsLights&&(Qt.state.sunShadowMap.length>0&&vt.setValue(U,"sunShadowMap",Qt.state.sunShadowMap,q),Qt.state.directionalShadowMap.length>0&&vt.setValue(U,"directionalShadowMap",Qt.state.directionalShadowMap,q),Qt.state.spotShadowMap.length>0&&vt.setValue(U,"spotShadowMap",Qt.state.spotShadowMap,q),Qt.state.pointShadowMap.length>0&&vt.setValue(U,"pointShadowMap",Qt.state.pointShadowMap,q)),$.isSkinnedMesh){vt.setOptional(U,$,"bindMatrix"),vt.setOptional(U,$,"bindMatrixInverse");const St=$.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),vt.setValue(U,"boneTexture",St.boneTexture,q))}$.isBatchedMesh&&(vt.setOptional(U,$,"batchingTexture"),vt.setValue(U,"batchingTexture",$._matricesTexture,q),vt.setOptional(U,$,"batchingIdTexture"),vt.setValue(U,"batchingIdTexture",$._indirectTexture,q),vt.setOptional(U,$,"batchingColorTexture"),$._colorsTexture!==null&&vt.setValue(U,"batchingColorTexture",$._colorsTexture,q));const Ti=X.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&O.update($,X,wn),(Ei||Ae.receiveShadow!==$.receiveShadow)&&(Ae.receiveShadow=$.receiveShadow,vt.setValue(U,"receiveShadow",$.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Nt.envMapIntensity.value=F.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=qS()),Ei){if(vt.setValue(U,"toneMappingExposure",C.toneMappingExposure),Ae.needsLights&&qm(Nt,Ss),Se&&V.fog===!0&&ke.refreshFogUniforms(Nt,Se),ke.refreshMaterialUniforms(Nt,V,ne,K,b.state.transmissionRenderTarget[T.id]),Ae.needsLights&&Ae.lightProbeGrid){const St=Ae.lightProbeGrid;Nt.probesSH.value=St.texture,Nt.probesMin.value.copy(St.boundingBox.min),Nt.probesMax.value.copy(St.boundingBox.max),Nt.probesResolution.value.copy(St.resolution)}ma.upload(U,lu(Ae),Nt,q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ma.upload(U,lu(Ae),Nt,q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&vt.setValue(U,"center",$.center),vt.setValue(U,"modelViewMatrix",$.modelViewMatrix),vt.setValue(U,"normalMatrix",$.normalMatrix),vt.setValue(U,"modelMatrix",$.matrixWorld),V.uniformsGroups!==void 0){const St=V.uniformsGroups;for(let Ai=0,ws=St.length;Ai<ws;Ai++){const uu=St[Ai];re.update(uu,wn),re.bind(uu,wn)}}return wn}function qm(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.sunLights.needsUpdate=F,T.sunLightShadows.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function Zm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,F,X){const V=W.get(T);V.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(T.texture).__webglTexture=F,W.get(T.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:X,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const X=W.get(T);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(T,F=0,X=0){j=T,H=F,G=X;let V=null,$=!1,Se=!1;if(T){const be=W.get(T);if(be.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(U.FRAMEBUFFER,be.__webglFramebuffer),se.copy(T.viewport),Ue.copy(T.scissor),Ce=T.scissorTest,E.viewport(se),E.scissor(Ue),E.setScissorTest(Ce),Y=-1;return}else if(be.__webglFramebuffer===void 0)q.setupRenderTarget(T);else if(be.__hasExternalTextures)q.rebindTextures(T,W.get(T.texture).__webglTexture,W.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Je=T.depthTexture;if(be.__boundDepthTexture!==Je){if(Je!==null&&W.has(Je)&&(T.width!==Je.image.width||T.height!==Je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(T)}}const Le=T.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Se=!0);const Ne=W.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ne[F])?V=Ne[F][X]:V=Ne[F],$=!0):T.samples>0&&q.useMultisampledRTT(T)===!1?V=W.get(T).__webglMultisampledFramebuffer:Array.isArray(Ne)?V=Ne[X]:V=Ne,se.copy(T.viewport),Ue.copy(T.scissor),Ce=T.scissorTest}else se.copy(Ee).multiplyScalar(ne).floor(),Ue.copy($e).multiplyScalar(ne).floor(),Ce=mt;if(X!==0&&(V=k),E.bindFramebuffer(U.FRAMEBUFFER,V)&&E.drawBuffers(T,V),E.viewport(se),E.scissor(Ue),E.setScissorTest(Ce),$){const be=W.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,be.__webglTexture,X)}else if(Se){const be=F;for(let Le=0;Le<T.textures.length;Le++){const Ne=W.get(T.textures[Le]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Le,Ne.__webglTexture,X,be)}}else if(T!==null&&X!==0){const be=W.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,be.__webglTexture,X)}Y=-1};function hu(T){const F=W.get(T);return(F.__readFormat!==T.format||F.__readType!==T.type)&&(F.__readFormat=T.format,F.__readType=T.type,F.__formatReadable=P.textureFormatReadable(T.format),F.__typeReadable=P.textureTypeReadable(T.type)),F}this.readRenderTargetPixels=function(T,F,X,V,$,Se,Re,be=0){if(!(T&&T.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le){E.bindFramebuffer(U.FRAMEBUFFER,Le);try{const Ne=T.textures[be],Je=Ne.format,it=Ne.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);const Ie=hu(Ne);if(Ie.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-V&&X>=0&&X<=T.height-$&&U.readPixels(F,X,V,$,ve.convert(Je),ve.convert(it),Se)}finally{const Ne=j!==null?W.get(j).__webglFramebuffer:null;E.bindFramebuffer(U.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(T,F,X,V,$,Se,Re,be=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le)if(F>=0&&F<=T.width-V&&X>=0&&X<=T.height-$){E.bindFramebuffer(U.FRAMEBUFFER,Le);const Ne=T.textures[be],Je=Ne.format,it=Ne.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);const Ie=hu(Ne);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,pt),U.bufferData(U.PIXEL_PACK_BUFFER,Se.byteLength,U.STREAM_READ),U.readPixels(F,X,V,$,ve.convert(Je),ve.convert(it),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const kt=j!==null?W.get(j).__webglFramebuffer:null;E.bindFramebuffer(U.FRAMEBUFFER,kt);const Tt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await v_(U,Tt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,pt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Se),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(pt),U.deleteSync(Tt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,X=0){const V=Math.pow(2,-X),$=Math.floor(T.image.width*V),Se=Math.floor(T.image.height*V),Re=F!==null?F.x:0,be=F!==null?F.y:0;q.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Re,be,$,Se),E.unbindTexture()},this.copyTextureToTexture=function(T,F,X=null,V=null,$=0,Se=0){let Re,be,Le,Ne,Je,it,Ie,pt,kt;const Tt=T.isCompressedTexture?T.mipmaps[Se]:T.image;if(X!==null)Re=X.max.x-X.min.x,be=X.max.y-X.min.y,Le=X.isBox3?X.max.z-X.min.z:1,Ne=X.min.x,Je=X.min.y,it=X.isBox3?X.min.z:0;else{const Nt=Math.pow(2,-$);Re=Math.floor(Tt.width*Nt),be=Math.floor(Tt.height*Nt),T.isDataArrayTexture?Le=Tt.depth:T.isData3DTexture?Le=Math.floor(Tt.depth*Nt):Le=1,Ne=0,Je=0,it=0}V!==null?(Ie=V.x,pt=V.y,kt=V.z):(Ie=0,pt=0,kt=0);const yt=ve.convert(F.format),Yt=ve.convert(F.type);let Ae;F.isData3DTexture?(q.setTexture3D(F,0),Ae=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(q.setTexture2DArray(F,0),Ae=U.TEXTURE_2D_ARRAY):(q.setTexture2D(F,0),Ae=U.TEXTURE_2D),E.activeTexture(U.TEXTURE0),E.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),E.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),E.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Qt=E.getParameter(U.UNPACK_ROW_LENGTH),at=E.getParameter(U.UNPACK_IMAGE_HEIGHT),wn=E.getParameter(U.UNPACK_SKIP_PIXELS),Gn=E.getParameter(U.UNPACK_SKIP_ROWS),Ei=E.getParameter(U.UNPACK_SKIP_IMAGES);E.pixelStorei(U.UNPACK_ROW_LENGTH,Tt.width),E.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Tt.height),E.pixelStorei(U.UNPACK_SKIP_PIXELS,Ne),E.pixelStorei(U.UNPACK_SKIP_ROWS,Je),E.pixelStorei(U.UNPACK_SKIP_IMAGES,it);const Ss=T.isDataArrayTexture||T.isData3DTexture,vt=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const Nt=W.get(T),Ti=W.get(F),St=W.get(Nt.__renderTarget),Ai=W.get(Ti.__renderTarget);E.bindFramebuffer(U.READ_FRAMEBUFFER,St.__webglFramebuffer),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let ws=0;ws<Le;ws++)Ss&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(T).__webglTexture,$,it+ws),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(F).__webglTexture,Se,kt+ws)),U.blitFramebuffer(Ne,Je,Re,be,Ie,pt,Re,be,U.DEPTH_BUFFER_BIT,U.NEAREST);E.bindFramebuffer(U.READ_FRAMEBUFFER,null),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||W.has(T)){const Nt=W.get(T),Ti=W.get(F);E.bindFramebuffer(U.READ_FRAMEBUFFER,N),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,B);for(let St=0;St<Le;St++)Ss?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Nt.__webglTexture,$,it+St):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Nt.__webglTexture,$),vt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ti.__webglTexture,Se,kt+St):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ti.__webglTexture,Se),$!==0?U.blitFramebuffer(Ne,Je,Re,be,Ie,pt,Re,be,U.COLOR_BUFFER_BIT,U.NEAREST):vt?U.copyTexSubImage3D(Ae,Se,Ie,pt,kt+St,Ne,Je,Re,be):U.copyTexSubImage2D(Ae,Se,Ie,pt,Ne,Je,Re,be);E.bindFramebuffer(U.READ_FRAMEBUFFER,null),E.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else vt?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Ae,Se,Ie,pt,kt,Re,be,Le,yt,Yt,Tt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(Ae,Se,Ie,pt,kt,Re,be,Le,yt,Tt.data):U.texSubImage3D(Ae,Se,Ie,pt,kt,Re,be,Le,yt,Yt,Tt):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Se,Ie,pt,Re,be,yt,Yt,Tt.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Se,Ie,pt,Tt.width,Tt.height,yt,Tt.data):U.texSubImage2D(U.TEXTURE_2D,Se,Ie,pt,Re,be,yt,Yt,Tt);E.pixelStorei(U.UNPACK_ROW_LENGTH,Qt),E.pixelStorei(U.UNPACK_IMAGE_HEIGHT,at),E.pixelStorei(U.UNPACK_SKIP_PIXELS,wn),E.pixelStorei(U.UNPACK_SKIP_ROWS,Gn),E.pixelStorei(U.UNPACK_SKIP_IMAGES,Ei),Se===0&&F.generateMipmaps&&U.generateMipmap(Ae),E.unbindTexture()},this.initRenderTarget=function(T){W.get(T).__webglFramebuffer===void 0&&q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?q.setTextureCube(T,0):T.isData3DTexture?q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?q.setTexture2DArray(T,0):q.setTexture2D(T,0),E.unbindTexture()},this.resetState=function(){H=0,G=0,j=null,E.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}const tf={type:"change"},Fh={type:"start"},am={type:"end"},sa=new go,nf=new Xn,ZS=Math.cos(70*Lp.DEG2RAD),Ot=new D,an=2*Math.PI,_t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vl=1e-6;class KS extends Jv{constructor(e,t=null){super(e,t),this.state=_t.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xi.ROTATE,MIDDLE:Xi.DOLLY,RIGHT:Xi.PAN},this.touches={ONE:zi.ROTATE,TWO:zi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Ji,this._lastTargetPosition=new D,this._quat=new Ji().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yc,this._sphericalDelta=new Yc,this._scale=1,this._panOffset=new D,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new D,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jS.bind(this),this._onPointerDown=JS.bind(this),this._onPointerUp=QS.bind(this),this._onContextMenu=o1.bind(this),this._onMouseWheel=n1.bind(this),this._onKeyDown=i1.bind(this),this._onTouchStart=s1.bind(this),this._onTouchMove=r1.bind(this),this._onMouseDown=e1.bind(this),this._onMouseMove=t1.bind(this),this._interceptControlDown=a1.bind(this),this._interceptControlUp=l1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=_t.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(tf),this.update(),this.state=_t.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===_t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=an:n>Math.PI&&(n-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ot.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(sa.origin.copy(this.object.position),sa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sa.direction))<ZS?this.object.lookAt(this.target):(nf.setFromNormalAndCoplanarPoint(this.object.up,this.target),sa.intersectPlane(nf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vl||this._lastTargetPosition.distanceToSquared(this.target)>Vl?(this.dispatchEvent(tf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?an/60*this.autoRotateSpeed*e:an/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ot.copy(s).sub(this.target);let r=Ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(an*this._rotateDelta.x/t.clientHeight),this._rotateUp(an*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(an*this._rotateDelta.x/t.clientHeight),this._rotateUp(an*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function JS(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function jS(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function QS(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(am),this.state=_t.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function e1(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Xi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=_t.DOLLY;break;case Xi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_t.ROTATE}break;case Xi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_t.PAN}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Fh)}function t1(i){switch(this.state){case _t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case _t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case _t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function n1(i){this.enabled===!1||this.enableZoom===!1||this.state!==_t.NONE||(i.preventDefault(),this.dispatchEvent(Fh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(am))}function i1(i){this.enabled!==!1&&this._handleKeyDown(i)}function s1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case zi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=_t.TOUCH_ROTATE;break;case zi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=_t.TOUCH_PAN;break;default:this.state=_t.NONE}break;case 2:switch(this.touches.TWO){case zi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=_t.TOUCH_DOLLY_PAN;break;case zi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=_t.TOUCH_DOLLY_ROTATE;break;default:this.state=_t.NONE}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Fh)}function r1(i){switch(this._trackPointer(i),this.state){case _t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case _t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case _t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case _t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=_t.NONE}}function o1(i){this.enabled!==!1&&i.preventDefault()}function a1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function l1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const sf=new Map,te=(i,e=.8,t)=>{const n=`${i}|${e}|${t??""}`;let s=sf.get(n);return s||(s=new bn({color:i,roughness:e,metalness:0,flatShading:!0,...t?{emissive:t,emissiveIntensity:.9}:{}}),sf.set(n,s)),s},pe=(i,e,t=0,n=0,s=0)=>{const r=new xt(i,e);return r.position.set(t,n,s),r.castShadow=!0,r},Te=(i,e,t=0,n=0,s=0,r=10)=>pe(new no(i,r,Math.max(6,r-2)),e,t,n,s),Ja=(i,e,t,n=6,s=0,r=0,o=0)=>pe(new It(i,i,e,n),t,s,r,o);function At(i,e,t,n){const s=new D(...i),r=new D(...e),o=s.distanceTo(r),a=Ja(t,o,n);return a.position.copy(s.clone().add(r).multiplyScalar(.5)),a.quaternion.setFromUnitVectors(new D(0,1,0),r.clone().sub(s).normalize()),a}const Et=(i,e,t,n=1.6)=>Te(n,te("#1b1410",.3),i,e,t,8),Qi=(i,e,t,n=.5)=>Te(n,te("#ffffff",.2),i,e,t,6);function es(i,e,t,n=0){const s=new Ya(i.map(([o,a])=>new ae(o,a))),r=new _o(s,{depth:e,bevelEnabled:!0,bevelSize:.6,bevelThickness:.6,bevelSegments:1,curveSegments:4});return r.translate(0,0,n-e/2),pe(r,t)}const c1=(i,e)=>Array.from({length:10},(t,n)=>{const s=Math.PI/2+n*Math.PI/5,r=n%2?e:i;return[Math.cos(s)*r,Math.sin(s)*r]});function h1(i="#f4efe4"){const e=new Ze,t=te(i),n=te("#c8412c"),s=te("#e8a23a"),r=Te(13,t,0,13,0,12);r.scale.set(1.25,1,.9),e.add(r);const o=pe(new Rt(7,12,6),t,-15,20,0);o.rotation.z=.9,e.add(o),e.add(Te(7,t,12,27,0));const a=pe(new Rt(2.4,6,6),s,19.5,26.5,0);a.rotation.z=-Math.PI/2,e.add(a);const l=Te(3,n,11,34,0,8);l.scale.set(1.2,.8,.6),e.add(l),e.add(Te(1.8,n,16,22.5,0,8),Et(15,29,4.5),Et(15,29,-4.5));for(const c of[-4,4]){const u=Ja(.9,6,s);u.position.set(2,2,c),e.add(u)}return e}function u1(i="#d9837b"){const e=new Ze,t=te(i,.6);for(let r=0;r<6;r++)e.add(Te(4.4-r*.25,t,Math.sin(r*.9)*1.5,4+r*6.2,0));e.add(Et(1.8,34,3,1.1),Et(-1.8,34,3,1.1),Qi(2.1,34.4,4,.35),Qi(-1.5,34.4,4,.35));const n=pe(new It(2.6,3.4,2.4,8),te("#3b4a6b"),0,38.6,0);e.add(n);const s=pe(new It(4.6,4.6,.6,10),te("#3b4a6b"),0,37.6,0);return e.add(s),e}function d1(i="#9fb3c4"){const e=new Ze,t=te(i),n=te("#e9eef2"),s=te("#2d3440"),r=te("#e0b23c"),o=te("#c9a14a"),a=Te(11,t,0,40,0,12);a.scale.set(1.5,.85,.85),a.rotation.z=-.35,e.add(a);const l=pe(new Rt(6,14,5),t,-17,48,0);l.rotation.z=2.3,e.add(l);for(const d of[-6,6]){const f=Te(9,te("#7f94a6"),-3,43,d,8);f.scale.set(1.6,.7,.35),f.rotation.z=-.25,e.add(f)}const c=[[12,36,0],[20,44,0],[26,46,0],[31,42,0],[35,36,0]];for(let d=0;d<c.length-1;d++)e.add(At(c[d],c[d+1],2.7-d*.25,n));e.add(Te(4.6,n,37,34,0));const u=pe(new Rt(1.2,12,4),s,32,40,0);u.rotation.z=1.4,e.add(u);const h=pe(new Rt(1.9,22,6),r,44,23,0);h.rotation.z=Math.PI+.55,e.add(h),e.add(Et(39,36,3.4,1.1),Et(39,36,-3.4,1.1),Qi(39.6,36.6,4.3,.35));for(const d of[-3,3])e.add(At([0,32,d],[-2,0,d],.9,o)),e.add(At([-2,.5,d],[5,.5,d],.7,o));return e}function f1(i="#5fae4a"){const e=new Ze,t=te(i,.55),n=te("#e3efb9"),s=te("#2f5e2a"),r=Te(12,t,0,10,0,12);r.scale.set(1.25,.8,1),e.add(r);const o=Te(8,n,0,8,6,10);o.scale.set(1.2,.8,.6),e.add(o);for(const l of[-1,1]){e.add(Te(4.4,t,l*6.5,18,3,10));const c=Te(3.2,te("#fdfbe8",.3),l*6.5,19,5.5,10);e.add(c),e.add(Et(l*6.5,19.3,8,1.6),Qi(l*6,20,9.3,.5));const u=Te(5,t,l*11,5,-1,8);u.scale.set(1,.7,1.4),e.add(u);const h=Te(3,s,l*13,.8,6,8);h.scale.set(1.4,.4,1.3),e.add(h),e.add(At([l*7,7,6],[l*7,.8,9],1.4,t))}const a=pe(new on(5,.5,4,12,Math.PI),s,0,11,9.4);return a.rotation.z=Math.PI,e.add(a),e}function p1(i="#c98b4f"){const e=new Ze,t=te(i),n=te("#5a3a22"),s=te("#f3e2c7"),r=Te(10,t,0,16,0,12);r.scale.set(1.6,.95,.9),e.add(r);for(const[u,h]of[[-9,-4],[-9,4],[9,-4],[9,4]])e.add(At([u,12,h],[u,0,h],2,t));const o=Te(7.5,t,16,28,0,10);e.add(o);const a=Te(4.2,s,22,25.5,0,8);a.scale.set(1.3,.85,.9),e.add(a),e.add(Te(1.6,n,27,26.6,0,8),Et(19,30.5,4.4,1.3),Et(19,30.5,-4.4,1.3));for(const u of[-5.5,5.5]){const h=Te(3.4,n,13,27,u,8);h.scale.set(.8,1.8,.5),h.rotation.x=u>0?.3:-.3,e.add(h)}const l=pe(new Rt(2,12,5),t,-17,24,0);l.rotation.z=.8,e.add(l);const c=pe(new on(5.5,1,5,12),te("#c8412c"),13,22,0);return c.rotation.y=Math.PI/2,c.rotation.x=.4,e.add(c),e}function m1(i="#e8a45c"){const e=new Ze,t=te(i),n=te("#f7e6cf"),s=te("#e9a0a0"),r=Te(20,t,0,20,0,12);r.scale.set(.9,1.1,.8),e.add(r);const o=Te(11,n,0,17,11);o.scale.set(1,1.2,.5),e.add(o);const a=Te(15,t,0,52,0,12);a.scale.set(1.1,.95,.95),e.add(a);for(const u of[-1,1]){const h=pe(new Rt(6,11,4),t,u*10,65,0);h.rotation.z=-u*.35,e.add(h);const d=pe(new Rt(3,6,4),s,u*10,64,2.5);d.rotation.z=-u*.35,e.add(d)}const l=Te(6,n,0,47,12);l.scale.set(1.3,.8,.6),e.add(l),e.add(Te(1.8,s,0,50,15.5,8),Et(6,55,12.5,2),Et(-6,55,12.5,2),Qi(6.6,55.8,14.2,.6),Qi(-5.4,55.8,14.2,.6));const c=pe(new on(12,3,6,12,Math.PI*1.1),t,-16,12,-4);return c.rotation.z=1.2,e.add(c),e}function g1(i="#e8a45c"){const e=new Ze,t=te(i),n=te("#f7e6cf");e.add(Ja(4.5,26,t,8,0,-13,0));const s=Te(7,n,0,2,0);s.scale.set(1,1.1,.8),e.add(s);for(const r of[-3.5,0,3.5])e.add(Te(1.6,te("#e9a0a0"),r,6.5,4.5,6));return e}function _1(i="#8a6242"){const e=new Ze,t=te(i),n=te("#e8d6b4"),s=te("#3a2a1c"),r=te("#f2b632",.3),o=Te(14,t,0,17,0,12);o.scale.set(1,1.2,.9),e.add(o);const a=Te(9,n,0,13,7,10);a.scale.set(1,1.2,.5),e.add(a);for(let u=0;u<5;u++){const h=pe(new Rt(1.2,2.4,3),te("#b89a74"),-4+u*2,10+u%2*3,11.5);h.rotation.x=Math.PI,e.add(h)}const l=Te(11,t,0,36,0,12);l.scale.set(1.15,.95,.95),e.add(l);for(const u of[-1,1]){const h=Te(5.6,n,u*5,36,7.5,10);h.scale.set(1,1,.45),e.add(h),e.add(Te(3.6,r,u*5,36.4,9.6,10),Et(u*5,36.6,12.2,1.8),Qi(u*4.3,37.6,13.6,.6));const d=pe(new Rt(3,8,4),t,u*8,46,0);d.rotation.z=-u*.4,e.add(d);const f=Te(8,s,u*12,17,0,8);f.scale.set(.45,1.25,.8),e.add(f)}const c=pe(new Rt(1.6,4,4),te("#d9a441"),0,32.5,11);c.rotation.x=Math.PI,e.add(c);for(const u of[-4,4])for(const h of[-1.5,0,1.5])e.add(At([u,3,4],[u+h,0,7],.7,te("#d9a441")));return e}function v1(i="#a9a4a0"){const e=new Ze,t=te(i),n=te("#eaa0a8"),s=Te(8,t,0,8,0,10);s.scale.set(1.5,1,1),e.add(s);const r=pe(new Rt(6,13,8),t,14,10,0);r.rotation.z=-Math.PI/2,e.add(r),e.add(Te(1.4,te("#3b2a2a"),20.5,10,0,6),Et(15,13,3.8,1.1),Et(15,13,-3.8,1.1));for(const a of[-5,5]){const l=pe(new It(4.2,4.2,.8,12),n,11,17,a);l.rotation.x=Math.PI/2,l.rotation.y=a>0?-.3:.3,e.add(l);const c=pe(new on(4.2,.8,4,12),t,11,17,a);c.rotation.y=a>0?-.3:.3,e.add(c)}const o=pe(new on(10,.7,4,16,Math.PI*1.3),n,-18,12,0);return o.rotation.z=-2,e.add(o),e}function x1(i="#4b87c5"){const e=new Ze,t=te(i),n=te("#f2d38a"),s=te("#e8a23a"),r=Te(8,t,0,9,0,10);r.scale.set(1.35,1,.9),e.add(r);const o=Te(5.5,n,3,7,3,8);o.scale.set(1.2,1,.6),e.add(o),e.add(Te(5.6,t,9,16,0,10));const a=pe(new Rt(1.6,5,5),s,16,15.6,0);a.rotation.z=-Math.PI/2,e.add(a),e.add(Et(12,17.6,3.6,1.1),Et(12,17.6,-3.6,1.1));const l=pe(new Rt(3.5,10,4),t,-12,12,0);l.rotation.z=1.1,l.scale.z=.5,e.add(l);for(const c of[-5.8,5.8]){const u=Te(5,te("#2f5e93"),-1,11,c,8);u.scale.set(1.4,.7,.3),u.rotation.z=.3,e.add(u)}for(const c of[-2,2])e.add(At([1,2.5,c],[1,0,c],.5,s));return e}function y1(i="#d9577a"){const e=new Ze,t=te(i,.6),n=te("#f0c9a4"),s=te("#4a2f23"),r=te("#fbe3ea");for(const u of[-2.2,2.2])e.add(At([u,14,0],[u*1.3,1,0],1.2,n));for(const u of[-2.2,2.2])e.add(Te(1.6,r,u*1.3,.8,.8,6));const o=pe(new Rt(13,9,10,1,!0),new bn({color:i,roughness:.6,flatShading:!0,side:Zn}),0,17,0);e.add(o);const a=pe(new on(12.5,1.2,4,14),t,0,13,0);a.rotation.x=Math.PI/2,e.add(a);const l=pe(new It(3.6,4.8,11,8),t,0,26,0);e.add(l),e.add(Te(5.2,n,0,35.5,0,10),Te(5.4,s,0,37,-1.2,10),Te(2.6,s,0,42,-1.5,8)),e.add(Et(1.9,36,4.6,.7),Et(-1.9,36,4.6,.7));const c=pe(new on(1.4,.35,3,8,Math.PI),te("#b34a4a"),0,34,4.8);return c.rotation.z=Math.PI,e.add(c),e.add(At([3.4,30,0],[9,38,0],1.1,n),At([9,38,0],[4,45,0],1,n),At([-3.4,30,0],[-9,38,0],1.1,n),At([-9,38,0],[-4,45,0],1,n)),e}function M1(i="#6d4c35"){const e=new Ze,t=te("#4a4f55",.4),n=te("#a0703f"),s=te(i),r=te("#d9a47e"),o=pe(new ht(12,15,11),t,0,7.5,0);e.add(o);const a=pe(new It(6,6,2,8),t,0,.8,0);e.add(a),e.add(At([0,6,0],[-26,10,0],1.6,n)),e.add(Te(4.2,r,-22,10,0,8)),e.add(At([-22,10,0],[-42,7,0],4.2,r));const l=pe(new It(5.8,5.8,16,8),s,0,0,0);return l.position.set(-49,6,0),l.rotation.z=Math.PI/2-.1,e.add(l),e}function b1(){const i=new Ze,e=te("#ff8a2a",.4,"#ff5a00"),t=pe(new on(7,2,6,14,Math.PI*1.35),e,0,8,0);t.rotation.z=-Math.PI*.175+Math.PI/2+Math.PI,t.rotation.x=Math.PI/2,i.add(t);const n=te("#3d3a36",.5);return i.add(At([-7,8,0],[-40,4,0],1,n),At([-7,6,0],[-40,2,0],1,n)),i}function S1(i="#b98252"){const e=new Ze,t=te(i,.6);e.add(At([-6,0,0],[-112,0,0],1.6,t));const n=Te(7,t,0,0,0,8);return n.scale.set(1.7,.9,.25),e.add(n),e.add(Te(2.4,te("#6d4c35"),-114,0,0,6)),e}function lm(i="#e86a8a"){const e=new Ze;e.add(Ja(.8,24,te("#4f8a3c"),6,0,12,0));const t=Te(3,te("#5e9c46"),3,8,0,6);t.scale.set(1.6,.5,.4),t.rotation.z=.5,e.add(t);for(let n=0;n<6;n++){const s=n*Math.PI/3;e.add(Te(3.4,te(i),Math.cos(s)*4.5,24+Math.sin(s)*4.5,0,8))}return e.add(Te(3,te("#f5c542"),0,24,1.5,8)),e}function w1(i="#f5c542"){const e=new Ze,t=te(i,.5,"#8a5a00");e.add(Te(12,t,0,0,0,14));for(let s=0;s<10;s++){const r=s*Math.PI/5,o=pe(new Rt(2.6,7,4),t,Math.cos(r)*16,Math.sin(r)*16,0);o.rotation.z=r-Math.PI/2,e.add(o)}e.add(Et(4,3,11,1.2),Et(-4,3,11,1.2));const n=pe(new on(4,.6,3,10,Math.PI),te("#a8541e"),0,-1,11.2);return n.rotation.z=Math.PI,e.add(n),e}function E1(i="#f3ecc8"){const e=new Ze,t=te(i,.5,"#8a7f4a"),n=[];for(let r=0;r<=20;r++){const o=-Math.PI/2+r/20*Math.PI;n.push([Math.cos(o)*14,Math.sin(o)*14])}for(let r=20;r>=0;r--){const o=-Math.PI/2+r/20*Math.PI;n.push([Math.cos(o)*9-3.5,Math.sin(o)*12.4])}e.add(es(n,5,t,0)),e.add(Et(7.4,3,3.4,1.1));const s=pe(new on(1.8,.45,3,8,Math.PI),te("#9a8b4a"),6.8,-2.5,3.4);return s.rotation.z=Math.PI+.5,e.add(s),e.add(Te(1.4,te("#f0b8a8",.6),9.6,-.4,3.2,6)),e}function T1(i="#f7d154"){const e=new Ze;return e.add(es(c1(10,4.3),3,te(i,.4,"#6b5200"))),e}function A1(i="#b5643c"){const e=new Ze,t=te(i,.7),n=te("#f1e3c3"),s=te("#6aa7c9",.5);e.add(es([[-22,6],[22,6],[16,-2],[-16,-2]],12,t,0)),e.add(pe(new ht(44,1.4,13),n,0,6.8,0)),e.add(At([0,6,0],[0,34,0],.9,te("#6d4c35"))),e.add(es([[1,10],[1,32],[16,12]],.8,te("#f7f1e1"),0));for(let r=0;r<5;r++){const o=pe(new Rt(4,6,4),s,-20+r*10,-3,0);o.scale.z=2.6,e.add(o)}return e}function R1(i="#1d2a4a"){const e=new Ze,t=te(i,1),n=[];for(let s=0;s<48;s++){const r=s/48*Math.PI*2;n.push([Math.cos(r)*62,Math.sin(r)*62])}e.add(es(n,2,t,-1));for(let s=0;s<16;s++){const r=s*2.39996,o=14+s*23%44,a=s%4===0?1.9:1;e.add(pe(new ys(a),te("#fff6c8",.3,"#ffe98a"),Math.cos(r)*o,Math.sin(r)*o,1.6))}return e}function C1(i="#2c2a28"){const e=new Ze,t=te(i,.4);e.add(es([[-8,-2.5],[30,-1.6],[40,0],[30,1.6],[-8,2.5]],1.6,t,0));const n=pe(new ys(4),t,34,0,0);n.scale.set(1.4,1,.4),e.add(n);const s=pe(new It(3.6,3.6,3,12),te("#c9a24a",.3));return s.rotation.x=Math.PI/2,e.add(s),e}function P1(){const i=new Ze,e=te("#7a5433"),t=te("#5e9c46");i.add(pe(new ht(170,10,120),e,0,-5,0));for(let n=0;n<60;n++){const s=-80+n*37%160+n%3,r=-55+n*23%110,o=6+n*13%7,a=pe(new Rt(1.4,o,4),t,s,o/2,r);a.rotation.z=(n%5-2)*.12,i.add(a)}for(const[n,s]of[[-60,40],[55,-35],[70,45]]){const r=lm(["#e86a8a","#f7d154","#f2f2f2"][Math.abs(n)%3]);r.scale.setScalar(.6),r.position.set(n,0,s),i.add(r)}return i}function L1(){const i=new Ze,e=te("#9a6a3e",.7),t=te("#6d4428"),n=te("#8f2436",.9),s=te("#d9b04a",.4,"#5a4000");i.add(pe(new ht(180,8,110),e,0,-4,0));for(let r=0;r<9;r++)i.add(pe(new ht(.6,.4,110),t,-80+r*20,.2,0));i.add(pe(new ht(184,3,4),s,0,-2,56));for(let r=0;r<7;r++){const o=Te(2.2,te("#fff3c4",.3,"#ffcc55"),-72+r*24,1.5,54,8);i.add(o)}for(const r of[-1,1]){const o=pe(new ht(22,110,6),n,r*96,51,-52);i.add(o);for(let a=0;a<3;a++)i.add(pe(new It(3.2,3.2,110,6),n,r*(88+a*7),51,-48))}return i.add(pe(new ht(214,16,8),n,0,112,-52)),i}function I1(){const i=new Ze,e=te("#3e4349",.45),t=te("#6a4a30"),n=te("#ff9a3c",.5,"#ff6a00");i.add(pe(new It(14,16,26,8),t,0,13,0)),i.add(pe(new ht(18,8,14),e,0,30,0)),i.add(pe(new ht(40,9,16),e,0,38.5,0));const s=pe(new Rt(4.5,16,8),e,28,39.5,0);s.rotation.z=-Math.PI/2,i.add(s);const r=Te(7,n,-30,6,0,6);return r.scale.set(1.6,.6,1.2),i.add(r),i.add(pe(new It(12,10,4,8),e,-30,2,0)),i}function D1(i="#6d4c35"){const e=new Ze,t=te("#c7b08a"),n=te(i),s=te("#d9a47e"),r=te("#6b3f22"),o=te("#2f2a26");for(const c of[-5,5])e.add(At([c,30,0],[c,0,0],3.4,o));const a=Te(15,t,0,48,0,10);a.scale.set(1,1.2,.8),e.add(a);const l=pe(new ht(22,30,3),n,0,40,11);return e.add(l),e.add(Te(9,s,0,72,0,10),Te(7,r,0,67,5,8),Te(9.4,o,0,76,-1.5,10)),e.add(Et(3.2,74,8,1),Et(-3.2,74,8,1),Te(2,s,0,71,9,6)),e.add(At([-13,58,0],[-17,38,8],3.6,t),Te(3.6,s,-17,36,9,8)),e}function N1(){const i=new Ze,e=te("#c9b48f",.9),t=te("#8b7458"),n=te("#7c3b2a",.8);i.add(pe(new ht(190,300,14),e,-30,-10,0));for(let u=-150;u<140;u+=26)i.add(pe(new ht(192,1.4,15),t,-30,u,0));const s=new Ze;s.position.set(-30,185,0),s.scale.z=.16,i.add(s);const r=pe(new Rt(150,90,4),n);r.rotation.y=Math.PI/4,s.add(r);const o=te("#17110c",.95),a=te("#6b4a33",.8);i.add(pe(new ht(36,40,2),o,-72,60,7.2));const l=pe(new It(18,18,2,16,1,!1,-Math.PI/2,Math.PI),o,-72,80,7.2);l.rotation.x=Math.PI/2,i.add(l);for(const u of[-92,-52])i.add(pe(new ht(4,42,5),a,u,61,8.5));const c=pe(new on(20,2.2,4,16,Math.PI),a,-72,80,8.5);i.add(c),i.add(pe(new ht(50,4,14),t,-72,38,9));for(const u of[40,-100])i.add(pe(new ht(22,34,2),te("#4a5a6a",.3),u,122,7.5));return i}function U1(){const i=new Ze,e=te("#c9d2ea",.9,"#262e4c");for(const[n,s,r,o]of[[-60,-2,0,.85],[-36,6,3,1.15],[-10,12,-2,1.3],[16,6,2,1.1],[40,9,-1,1.2],[62,-1,0,.9]]){const a=Te(13*o,e,n,s,r,8);a.scale.z=.6,i.add(a)}const t=pe(new ht(128,10,14),e,0,-6,0);return i.add(t),i}function k1(){const i=new Ze,e=te("#5a3f2c",.95),t=te("#3f6b3a",.8);i.add(At([-110,-6,0],[40,4,0],6,e),At([40,4,0],[90,18,0],4,e),At([-30,-1,0],[-60,28,0],2.6,e));for(const[n,s]of[[-60,32],[90,22],[70,14],[-80,2]]){const r=Te(9,t,n,s,0,6);r.scale.set(1.5,.7,1),i.add(r)}return i}function F1(){const i=new Ze;i.add(pe(new ht(520,340,4),te("#1d2a4a",1),0,0,0));for(let e=0;e<46;e++){const t=-250+e*97%500,n=-160+e*61%320,s=e%5===0?2.4:1.1,r=pe(new ys(s),te("#fff6c8",.3,"#ffe98a"),t,n,3);i.add(r)}return i}function O1(){const i=new Ze,e=te("#f0dd8c",.5,"#4a3f10"),t=te("#3d5a8a"),n=te("#f0c9a4"),s=te("#c8412c"),r=[];for(let u=0;u<=24;u++){const h=Math.PI+u/24*Math.PI;r.push([Math.cos(h)*62,Math.sin(h)*34+4])}for(let u=24;u>=0;u--){const h=Math.PI+u/24*Math.PI;r.push([Math.cos(h)*50+6,Math.sin(h)*20+4])}i.add(es(r,10,e,0)),i.add(Et(-50,-2,5.6,1.8),Qi(-49.4,-1.4,6.9,.5));const o=pe(new on(3,.6,3,8,Math.PI),te("#9a8b4a"),-50,-9,5.4);o.rotation.z=Math.PI,i.add(o);const a=new Ze;a.position.y=-17,i.add(a);const l=Te(9,t,-6,14,0,10);l.scale.set(.95,1.3,.9),a.add(l),a.add(Te(6.4,n,-4,30,0,10),Et(.8,31.5,3.4,.9),Et(.8,31.5,-3.4,.9));const c=pe(new Rt(6.6,11,8),s,-5,39,0);return c.rotation.z=.3,a.add(c),a.add(Te(1.8,te("#fff6e0"),-8,44,0,6)),a.add(At([-2,20,4],[14,24,6],2.2,t),At([-2,20,-4],[14,24,-6],2.2,t),Te(2.4,n,15,24,6,6),Te(2.4,n,15,24,-6,6)),i}function B1(){const i=new Ze,e=te("#8e8577",.95),t=te("#5f584e"),n=te("#ff8a2a",.5,"#ff5a00");i.add(pe(new ht(200,12,110),e,0,-6,0));for(let a=1;a<5;a++)i.add(pe(new ht(.8,.4,110),t,-100+a*40,.2,0));for(let a=1;a<3;a++)i.add(pe(new ht(200,.4,.8),t,0,.2,-55+a*36));const s=pe(new ht(46,34,30),te("#6b4a3a",.9),72,17,-30);i.add(s);const r=Te(14,n,72,34,-30,7);r.scale.set(1.2,.35,.8),i.add(r);const o=pe(new It(13,11,18,10),te("#7a5433"),-78,9,26);return i.add(o),i.add(pe(new It(11.5,11.5,1,10),te("#4f7fa0",.2),-78,17,26)),i}function z1(){const i=new Ze,e=te("#3f6a4c",.95),t=te("#2a5039",.9),n=[[-170,-90],[170,-90],[170,-8],[130,4],[80,10],[20,2],[-40,-6],[-100,2],[-140,8],[-170,0]];i.add(es(n,8,e,0));for(const[s,r]of[[-150,34],[-126,24],[128,30],[150,40],[104,22]]){const o=pe(new Rt(r*.36,r,6),t,s,r/2+4,2);i.add(o)}return i}function H1(i="#fbf4e6"){const e=new Ze,t=te(i,.6),n=te("#3b2a1e"),s=[];for(let l=0;l<40;l++){const c=l/40*Math.PI*2;s.push([Math.cos(c)*44,Math.sin(c)*44])}const r=new Ya(s.map(([l,c])=>new ae(l,c)));r.holes.push(new La(Array.from({length:16},(l,c)=>{const u=-c/16*Math.PI*2;return new ae(Math.cos(u)*4,Math.sin(u)*4)})));const o=new _o(r,{depth:2,bevelEnabled:!1,curveSegments:2});o.translate(0,0,-1),e.add(pe(o,t));const a=pe(new on(44,2.4,4,40),te("#c9a24a",.35));e.add(a);for(let l=0;l<12;l++){const c=l*Math.PI/6,u=l%3===0,h=pe(new ht(u?3.4:1.8,u?9:5.5,1),n,Math.cos(c)*36,Math.sin(c)*36,1.4);h.rotation.z=c+Math.PI/2,e.add(h)}return e}const G1={hen:h1,worm:u1,heron:d1,frog:f1,dog:p1,cat:m1,paw:g1,owl:_1,mouse:v1,bird:x1,dancer:y1,hammer:M1,horseshoe:b1,oar:S1,flower:lm,sun:w1,moon:E1,star:T1,boat:A1,hand:C1,dial:H1,skywheel:R1,grass:P1,stage:L1,anvil:I1,smith:D1,tower:N1,clouds:U1,branch:k1,night:F1,moonboat:O1,floor:B1,hill:z1};function Ia(i,e){return G1[i](e)}const Da=[{kind:"hen",name:"Hen",colors:["#f4efe4","#c9783f","#3b3232"]},{kind:"worm",name:"Worm",colors:["#d9837b","#c9a14a","#7fb069"]},{kind:"heron",name:"Heron",colors:["#9fb3c4","#e9eef2","#c7a8b8"]},{kind:"frog",name:"Frog",colors:["#5fae4a","#d9b43c","#4f8fb8"]},{kind:"dog",name:"Dog",colors:["#c98b4f","#f3e2c7","#3b3232"]},{kind:"cat",name:"Cat",colors:["#e8a45c","#8d8d8d","#3b3232"]},{kind:"paw",name:"Waving paw",colors:["#e8a45c","#8d8d8d","#3b3232"]},{kind:"owl",name:"Owl",colors:["#8a6242","#b9b2a6","#c98b4f"]},{kind:"mouse",name:"Mouse",colors:["#a9a4a0","#d8c8b0","#6b5a4a"]},{kind:"bird",name:"Songbird",colors:["#4b87c5","#d94f3d","#e8c33c"]},{kind:"dancer",name:"Dancer",colors:["#d9577a","#4b87c5","#f2f2f2"]},{kind:"hammer",name:"Hammer arm",colors:["#6d4c35","#3d5a8a","#8f2436"]},{kind:"horseshoe",name:"Hot horseshoe",colors:["#ff8a2a"]},{kind:"oar",name:"Oar",colors:["#b98252","#e0c080","#6d4c35"]},{kind:"flower",name:"Flower",colors:["#e86a8a","#f7d154","#9b7fd1"]},{kind:"sun",name:"Sun",colors:["#f5c542","#f28c38"]},{kind:"moon",name:"Moon",colors:["#f3ecc8","#d8dde8"]},{kind:"star",name:"Star",colors:["#f7d154","#f2f2f2","#f28c9a"]},{kind:"boat",name:"Boat on waves",colors:["#b5643c","#3d5a8a","#f2f2f2"]},{kind:"hand",name:"Clock hand",colors:["#2c2a28","#c9a24a"]},{kind:"dial",name:"Clock face",colors:["#fbf4e6","#e8d6b4","#d8dde8"]},{kind:"skywheel",name:"Sky wheel",colors:["#1d2a4a","#2b2140","#3a5a7a"]}],V1=i=>Da.find(e=>e.kind===i),$1=6,Kc=22,Wn=8,Ui=5,rf=new Set(["floor","hill","clouds"]),or=(i,e)=>i*(e+1);function W1(i,e,t,n){return[or(e[0],t)-(i==="motor"&&n==="back"?8:3),or(e[1],t)+t+(i==="motor"&&n!=="back"?8:3)]}const of=new WeakMap,cm=i=>{let e=of.get(i);if(!e){const t=Math.max(1,Math.ceil(i.length/120));e=i.filter((n,s)=>s%t===0),of.set(i,e)}return e};function X1(i,e,t,n,s,r){let o=0,a=1;const l=e[0]-i[0],c=e[1]-i[1];for(const[u,h]of[[-l,i[0]-t],[l,s-i[0]],[-c,i[1]-n],[c,r-i[1]]]){if(u===0){if(h<0)return!1;continue}const d=h/u;if(u<0){if(d>a)return!1;d>o&&(o=d)}else{if(d<o)return!1;d<a&&(a=d)}}return!0}const Y1=(i,e)=>{let t=!1;for(let n=0,s=e.length-1;n<e.length;s=n++){const[r,o]=e[n],[a,l]=e[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(t=!t)}return t};function af(i,e,t){for(const n of i)for(const s of n.parts){const r=or(s.part.layer,t);if(!(r+t<=e.z0||r>=e.z1)&&q1(s,e))return s.part.id}}function q1(i,e){const t=cm(i.part.outer).map(a=>fn(a,i.pose));let n=1/0,s=1/0,r=-1/0,o=-1/0;for(const a of t)n=Math.min(n,a[0]),r=Math.max(r,a[0]),s=Math.min(s,a[1]),o=Math.max(o,a[1]);if(r<e.x0||n>e.x1||o<e.y0||s>e.y1)return!1;for(let a=0,l=t.length-1;a<t.length;l=a++)if(X1(t[l],t[a],e.x0,e.y0,e.x1,e.y1))return!0;return Y1([(e.x0+e.x1)/2,(e.y0+e.y1)/2],t)}function Z1(i,e){let t;for(const n of i)for(const s of n.parts){const r=or(s.part.layer,e);for(const o of cm(s.part.outer)){const a=fn(o,s.pose);t||(t={x0:a[0],x1:a[0],y0:a[1],y1:a[1],z0:r,z1:r+e}),t.x0=Math.min(t.x0,a[0]),t.x1=Math.max(t.x1,a[0]),t.y0=Math.min(t.y0,a[1]),t.y1=Math.max(t.y1,a[1]),t.z0=Math.min(t.z0,r),t.z1=Math.max(t.z1,r+e)}}return t}function K1(i){const{poses:e,thickness:t,plan:n}=i,s=[],r=[],o=[],a=Z1(e,t)??{x0:-30,x1:30,y0:-30,y1:30,z0:0,z1:t},l=i.scenery.filter(_=>_.place==="front"),c=i.scenery.filter(_=>_.place==="above"),u=i.scenery.filter(_=>_.place==="behind"),h=l.filter(_=>rf.has(_.kind)||_.stands),d=Math.min(a.y0-10,...h.map(_=>_.box.y0)),f=c.length?Math.min(...c.map(_=>_.box.y0)):void 0;let g;if(u.length)g=Math.max(...u.map(_=>_.face??_.box.z1));else{const _=i.back-1,w=_-$1;g=_,s.push({kind:"board",x0:a.x0-16,x1:a.x1+16,y0:d,y1:f??a.y1+16,z0:w,z1:_})}const y=e[0];for(const[_,w]of Object.entries(n.spans)){const b=y?.shafts[_]?.position;if(!b)continue;const[R,M]=b,A=or(w[0],t),C=or(w[1],t)+t,L=Wn,I=(H,G)=>({kind:"bearing",shaft:_,at:[R,M],x0:R-L,x1:R+L,y0:M-L,y1:M+L,z0:H,z1:G}),k=H=>({kind:"post",x0:R-Ui,x1:R+Ui,y0:d,y1:H.y0,z0:H.z0+1,z1:H.z1-1}),N=(H,G)=>{for(const j of H)if(af(e,j,t)){o.push(G);return}s.push(...H)};if(_==="motor"&&n.crank==="back"){const H=I(A-7,A-1);N([H,k(H)],`${_} (back)`)}else g!==void 0&&g<A-1&&N([I(g,A-1)],`${_} (back)`);const B=I(C+1,C+7);N([B,k(B)],`${_} (front)`)}const m=_=>l.some(w=>w!==_&&w.box.y0<_.box.y0-2&&w.box.y1>_.box.y0-4&&w.box.x0<_.box.x1&&w.box.x1>_.box.x0&&w.box.z0<_.box.z1&&w.box.z1>_.box.z0);for(const _ of l)if(!(_.box.y0<=d+2||m(_)))if(rf.has(_.kind))s.push({kind:"riser",x0:_.box.x0+4,x1:_.box.x1-4,y0:d,y1:_.box.y0+1,z0:_.box.z0+2,z1:_.box.z1-2});else{const w=(_.box.x0+_.box.x1)/2,b=(_.box.z0+_.box.z1)/2,R=(_.box.x1-_.box.x0)*.28;for(const M of[w-R,w+R])r.push({a:[M,d,b],b:[M,_.box.y0+3,b]})}for(const _ of c){const w=_.box,b=10;for(const[R,M]of[[w.x0+b,w.z0+b],[w.x1-b,w.z0+b],[w.x0+b,w.z1-b],[w.x1-b,w.z1-b]]){const A={kind:"post",x0:R-Ui,x1:R+Ui,y0:d,y1:w.y0+.5,z0:M-Ui,z1:M+Ui};af(e,A,t)||s.push(A)}}const p=[a.x0,a.x1,...l.flatMap(_=>[_.box.x0,_.box.x1]),...c.flatMap(_=>[_.box.x0,_.box.x1]),...s.flatMap(_=>[_.x0,_.x1])],x=[a.z0,a.z1,i.back,i.front,...l.flatMap(_=>[_.box.z0,_.box.z1]),...c.flatMap(_=>[_.box.z0,_.box.z1]),...s.flatMap(_=>[_.z0,_.z1])],S={kind:"plinth",x0:Math.min(...p)-14,x1:Math.max(...p)+14,y0:d-Kc,y1:d,z0:Math.min(...x)-10,z1:Math.max(...x)+12};return s.unshift(S),{blocks:s,dowels:r,benchTop:S.y0,skipped:o}}function J1(){return{blocks:[{kind:"plinth",x0:-70,x1:70,y0:-40-Kc,y1:-40,z0:-40,z1:50},{kind:"board",x0:-50,x1:50,y0:-40,y1:50,z0:-27,z1:-21},{kind:"bearing",shaft:"motor",at:[0,0],x0:-Wn,x1:Wn,y0:-Wn,y1:Wn,z0:-21,z1:-12},{kind:"bearing",shaft:"motor",at:[0,0],x0:-Wn,x1:Wn,y0:-Wn,y1:Wn,z0:10,z1:16},{kind:"post",x0:-Ui,x1:Ui,y0:-40,y1:-Wn,z0:11,z1:15}],dowels:[],benchTop:-40-Kc,skipped:[]}}const lf=new It(2.6,2.6,1,16),cf=new bn({color:"#8d959c",metalness:.85,roughness:.3}),j1=new It(1.4,1.4,1,8),hf=new bn({color:"#caa46e",roughness:.7}),Q1={plinth:new bn({color:"#6b4a33",roughness:.72}),board:new bn({color:"#d8bd8f",roughness:.85}),post:new bn({color:"#b8895a",roughness:.7}),bearing:new bn({color:"#9a6a42",roughness:.65}),riser:new bn({color:"#7a5433",roughness:.8})},ew=new bn({color:"#c9a24a",metalness:.7,roughness:.35}),uf=new It(4.6,4.6,1,16),df=new It(2.2,2.2,1,10),tw=i=>{const e=i.split("/")[1]??i;return/^(cam|gear-a|gear-b)$/.test(e)?{color:"#e0bd62",metalness:.45,roughness:.38}:e==="roller"?{color:"#a9b1b8",metalness:.8,roughness:.25}:/^(follower|crank|coupler|rocker|rod)$/.test(e)?{color:"#d8b27c",metalness:0,roughness:.62}:e==="slider"?{color:"#6d4c35",metalness:0,roughness:.6}:{color:"#e7cfa5",metalness:0,roughness:.78}},nw={day:{bg:"#2a211b",key:"#ffe8c8",keyI:2.4,hemi:.9,rim:"#9fc4ff",rimI:.6},dusk:{bg:"#2b1a14",key:"#ffc58a",keyI:2.2,hemi:.75,rim:"#ff9a5a",rimI:.9},night:{bg:"#10152a",key:"#cfdcff",keyI:1.7,hemi:.7,rim:"#7fa0ff",rimI:1.1}},iw={sparks:["#ffb347","#ff7a1a","#ffe08a"],hearts:["#e86a8a","#f29bb2","#ffd1dc"],stars:["#f7d154","#fff3b0","#ffffff"],notes:["#e8506f","#3f7fd0","#8a5fd0","#f28c38"]};function sw(i){const e=new Ya(i.outer.map(([t,n])=>new ae(t,n)));for(const t of i.holes)e.holes.push(new La(t.map(([n,s])=>new ae(n,s))));return e}const $l=1500,rw=Math.PI/2-.05,ra=["#ff8a3d","#3cc6cf"],Oh={front:[0,.06,1],side:[-1,.06,0],top:[0,1,.02]};class ow{constructor(e){this.host=e,this.renderer=new om({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(2,devicePixelRatio)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=dp,this.renderer.toneMapping=$a,e.append(this.renderer.domElement),this.scene.background=new et("#2a211b"),this.scene.fog=new Ph("#2a211b",700,1500),this.camera=new xn(38,1,1,4e3),this.camera.position.set(330,150,300),this.controls=new KS(this.camera,this.renderer.domElement),this.controls.target.set(0,40,40),this.controls.enableDamping=!0,this.controls.addEventListener("start",()=>{this.aim=void 0}),this.controls.minDistance=140,this.controls.maxDistance=1100,this.controls.maxPolarAngle=rw,this.key=new Wc("#ffe8c8",2.4),this.key.position.set(180,320,380),this.key.castShadow=!0,this.key.shadow.mapSize.set(2048,2048),Object.assign(this.key.shadow.camera,{left:-320,right:320,top:420,bottom:-300,near:10,far:1400}),this.scene.add(this.key),this.hemi=new Kp("#fff1dc","#3b2a1e",.9),this.scene.add(this.hemi),this.rim=new Wc("#9fc4ff",.6),this.rim.position.set(-260,160,-200),this.scene.add(this.rim);const t=this.bench=new xt(new ht(1400,20,700),new bn({color:"#5a3e2b",roughness:.9}));t.position.set(0,-150,60),t.receiveShadow=!0,this.scene.add(t),this.scene.add(this.stand),this.scene.add(this.shafts);const n=new bn({color:"#8a5a3a",roughness:.6}),s=new xt(new ht(34,7,4),n);s.position.x=17,this.crank.add(s);const r=new xt(new It(4,4,16,12),n);r.rotation.x=Math.PI/2,r.position.set(34,0,9),this.crank.add(r),this.shafts.add(this.crank),new ResizeObserver(()=>this.resize()).observe(e),this.resize(),this.bindFigureDrag();const o=new wd({color:"#fff1c2",dashSize:5,gapSize:3,transparent:!0,opacity:.7,depthTest:!1,fog:!1});this.trail=new pd(new Ut,o),this.trail.renderOrder=5,this.trail.visible=!1,this.scene.add(this.trail),this.trailDots=new sv(new Ut,new Fp({color:"#ffd66b",size:5,sizeAttenuation:!1,transparent:!0,opacity:.85,depthTest:!1,fog:!1})),this.trailDots.renderOrder=6,this.trailDots.visible=!1,this.scene.add(this.trailDots),this.controls.addEventListener("start",()=>this.onUserView?.())}host;renderer;scene=new Np;camera;controls;meshes=new Map;geos=new Map;figures=new Map;shafts=new Ze;highlight=new Set;thickness=3;plan={spans:{},crank:"front",clashes:[]};layout;rods=new Map;crank=new Ze;stand=new Ze;standKey="";bench;key;hemi;rim;particles=[];last=performance.now();floor=-140;depth;setDepthArrow(e,t=34){if(!this.depth){const u=new Ze,h=new Nr({color:"#ffd66b",depthTest:!1,transparent:!0,opacity:.95,fog:!1,toneMapped:!1}),d=new xt(new It(.9,.9,1,8),h);d.rotation.x=Math.PI/2,d.name="shaft",u.add(d);for(const g of[1,-1]){const y=new xt(new Rt(3.2,9,12),h);y.rotation.x=g*Math.PI/2,y.name=g>0?"you":"back",u.add(y)}u.traverse(g=>{g.renderOrder=13}),u.visible=!1,this.scene.add(u);const f=(g,y)=>{const m=document.createElement("div");return m.className=`depthlabel ${g}`,m.textContent=y,m.hidden=!0,this.host.append(m),m};this.depth={group:u,labels:[f("you","toward you"),f("back","toward the back")],ends:[new D,new D]}}const n=this.depth;if(n.group.visible=!!e,!e){for(const u of n.labels)u.hidden=!0;return}const[s,r,o]=e;n.group.position.set(s,r,o);const a=n.group.getObjectByName("shaft"),l=n.group.getObjectByName("you"),c=n.group.getObjectByName("back");a.scale.y=2*t-8,l.position.z=t,c.position.z=-t,n.ends[0].set(s,r,o+t+6),n.ends[1].set(s,r,o-t-6)}get depthArrowShown(){return!!this.depth?.group.visible&&!this.depth.labels[0].hidden}placeDepthLabels(){const e=this.depth;if(!e)return;const t=Math.abs(this.camera.position.clone().sub(this.controls.target).normalize().z)>.93;e.group.children.forEach(n=>{n.visible=!t}),e.ends.forEach((n,s)=>{const r=e.labels[s],o=e.group.visible&&!t?this.toScreen([n.x,n.y,n.z]):void 0;r.hidden=!o,o&&(r.style.left=`${Math.round(o.x)}px`,r.style.top=`${Math.round(o.y)}px`)})}onUserView;onFigureGrab;onFigureDrop;onFigureDrag;dragging;dragAxes(){const e=this.camera.position.clone().sub(this.controls.target).normalize();return Math.abs(e.x)>.8?"yz":Math.abs(e.y)>.8?"xz":"xy"}trail;trailDots;ray=new Kv;pointerRay(e){const t=this.renderer.domElement.getBoundingClientRect();return this.ray.setFromCamera(new ae((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.camera),this.ray}figureAt(e){const t=[...this.figures.values()].filter(r=>r.fig.part!=="world"&&r.obj.visible);if(!t.length)return;const n=this.pointerRay(e).intersectObjects(t.map(r=>r.obj),!0)[0];if(!n)return;let s=n.object;for(;s&&!t.some(r=>r.obj===s);)s=s.parent;return t.find(r=>r.obj===s)?.fig.id}bindFigureDrag(){const e=this.renderer.domElement;this.host.addEventListener("pointerdown",n=>{if(n.button!==0||n.target!==e)return;const s=this.figureAt(n);if(!s||!this.onFigureGrab?.(s))return;n.stopPropagation(),n.preventDefault();const r=this.figures.get(s).obj,o=this.dragAxes(),a=o==="yz"?new D(1,0,0):o==="xz"?new D(0,1,0):new D(0,0,1),l=new Xn().setFromNormalAndCoplanarPoint(a,r.position),c=this.pointerRay(n).ray.intersectPlane(l,new D);c&&(this.dragging={id:s,plane:l,offset:r.position.clone().sub(c),pointer:n.pointerId,free:o},this.controls.enabled=!1,e.setPointerCapture(n.pointerId),e.style.cursor="grabbing")},{capture:!0}),e.addEventListener("pointermove",n=>{const s=this.dragging;if(!s){n.buttons===0&&(e.style.cursor=this.figureAt(n)?"grab":"");return}const r=this.pointerRay(n).ray.intersectPlane(s.plane,new D);r&&(r.add(s.offset),this.onFigureDrag?.(s.id,r.x,r.y,r.z,s.free))});const t=n=>{const s=this.dragging;!s||n.pointerId!==s.pointer||(this.dragging=void 0,this.controls.enabled=!0,e.style.cursor="grab",this.onFigureDrop?.(s.id))};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t)}get isDragging(){return!!this.dragging}figureScreen(e){const t=this.figures.get(e);if(!t?.obj.visible)return;const n=new bi().setFromObject(t.obj).getCenter(new D);return this.toScreen([n.x,n.y,n.z])}setTrail(e){const t=!!e&&e.length>1;if(this.trail.visible=this.trailDots.visible=t,!t)return;const n=e.map(s=>new D(...s));this.trail.geometry.dispose(),this.trail.geometry=new Ut().setFromPoints([...n,n[0]]),this.trail.computeLineDistances(),this.trailDots.geometry.dispose(),this.trailDots.geometry=new Ut().setFromPoints(n.filter((s,r)=>r%Math.max(1,Math.round(n.length/24))===0))}touchParts;ghosts=new Ze;touchText={now:"",close:""};initTouch(){const e=(s,r)=>{const o=new xt(new no(1,14,10),new Nr({color:s,depthTest:!1,transparent:!0,opacity:r,fog:!1,toneMapped:!1}));return o.renderOrder=12,o.visible=!1,this.scene.add(o),o},t=s=>{const r=new pd(new Ut().setFromPoints([new D,new D(1,0,0)]),s?new wd({color:"#ffd66b",dashSize:3,gapSize:2,depthTest:!1,transparent:!0,opacity:.95,fog:!1}):new Ih({color:"#fff7e3",depthTest:!1,transparent:!0,opacity:.95,fog:!1}));return r.renderOrder=11,r.visible=!1,this.scene.add(r),r},n=s=>{const r=document.createElement("div");return r.className=`gaplabel ${s}`,r.hidden=!0,this.host.append(r),r};this.touchParts={now:{a:e(ra[0],1),b:e(ra[1],1),line:t(!1)},close:{a:e(ra[0],.6),b:e(ra[1],.6),line:t(!0)},labels:{now:n("now"),close:n("close")}},this.ghosts.renderOrder=4,this.scene.add(this.ghosts)}setPair(e,t){if(e.a.visible=e.b.visible=e.line.visible=!!t,!t)return;e.a.position.set(...t.a),e.b.position.set(...t.b);const n=e.line.geometry.getAttribute("position");n.setXYZ(0,...t.a),n.setXYZ(1,...t.b),n.needsUpdate=!0,e.line.geometry.computeBoundingSphere(),e.line.computeLineDistances()}setTouchNow(e){this.touchParts||this.initTouch(),this.setPair(this.touchParts.now,e),this.touchText.now=e?.text??""}setTouchClosest(e,t=[]){this.touchParts||this.initTouch(),this.setPair(this.touchParts.close,e),this.touchText.close=e?.text??"";for(const n of[...this.ghosts.children])this.ghosts.remove(n),n.traverse(s=>{s instanceof xt&&(s.geometry.dispose(),s.material.dispose())});for(const{fig:n,pose:s}of t){const r=s.parts.find(l=>l.part.id===n.part);if(!r||n.part==="world")continue;const o=Ia(n.kind,n.color);o.scale.setScalar(n.scale??1),o.traverse(l=>{if(l instanceof xt){const c=l.material.clone();c.transparent=!0,c.opacity=.3,c.depthWrite=!1,l.material=c,l.castShadow=!1,l.renderOrder=4}});const a=this.figureTransform(n,r);o.position.set(...a.position),o.rotation.set(...a.rotation),this.ghosts.add(o)}}get ghostCount(){return this.ghosts.children.length}placeTouchLabels(){const e=this.touchParts;if(e)for(const[t,n]of[["now",e.now],["close",e.close]]){const s=e.labels[t],r=n.line.visible&&!!this.touchText[t];for(const l of[n.a,n.b])l.visible&&l.scale.setScalar(Math.max(1.6,this.camera.position.distanceTo(l.position)*(t==="now"?.0075:.006)));if(!r){s.hidden||(s.hidden=!0);continue}const o=n.a.position.clone().add(n.b.position).multiplyScalar(.5),a=this.toScreen([o.x,o.y,o.z]);if(!a){s.hidden=!0;continue}s.textContent!==this.touchText[t]&&(s.textContent=this.touchText[t]),s.hidden=!1,s.style.left=`${Math.round(a.x)}px`,s.style.top=`${Math.round(a.y)}px`}}figureTransform(e,t){const n=this.z(t.part.layer)+t.part.thickness/2,s=fn(e.at,t.pose),r=this.layout?.raise.get(e.id)??0;return{position:[s[0],s[1]+r,n+(e.dz??0)],rotation:[0,e.turnY??0,(e.upright?0:t.pose.angle)+(e.turnZ??0)],layerZ:n}}resize(){const e=this.host.clientWidth||800,t=this.host.clientHeight||500;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}z(e){return e*(this.thickness+1)}setThickness(e){this.thickness=e}setShafts(e,t){this.plan=e,this.thickness=t}setSky(e="day"){const t=nw[e];this.scene.background.set(t.bg),this.scene.fog.color.set(t.bg),this.key.color.set(t.key),this.key.intensity=t.keyI,this.hemi.intensity=t.hemi,this.rim.color.set(t.rim),this.rim.intensity=t.rimI}setFigures(e){for(const{obj:t,dowel:n}of this.figures.values())this.scene.remove(t),n&&this.scene.remove(n);this.figures.clear();for(const t of e){const n=Ia(t.kind,t.color);n.scale.setScalar(t.scale??1),n.visible=!1,this.scene.add(n),t.part==="world"&&n.rotation.set(0,t.turnY??0,t.turnZ??0),this.figures.set(t.id,{fig:t,obj:n})}this.placeScenery()}setLayout(e){this.layout=e,this.placeScenery(),e&&this.setStand(e.stand)}setStand(e){const t=JSON.stringify(e);if(t!==this.standKey){this.standKey=t;for(const n of[...this.stand.children])this.stand.remove(n),n instanceof xt&&n.geometry!==uf&&n.geometry!==df&&n.geometry.dispose();for(const n of e.blocks){const s=new xt(new ht(n.x1-n.x0,n.y1-n.y0,n.z1-n.z0),Q1[n.kind]);if(s.position.set((n.x0+n.x1)/2,(n.y0+n.y1)/2,(n.z0+n.z1)/2),s.castShadow=n.kind!=="plinth",s.receiveShadow=!0,this.stand.add(s),n.kind==="bearing"&&n.at){const r=new xt(uf,ew);r.rotation.x=Math.PI/2,r.scale.y=n.z1-n.z0+.6,r.position.set(n.at[0],n.at[1],(n.z0+n.z1)/2),this.stand.add(r)}}for(const n of e.dowels){const s=new D(...n.a),r=new D(...n.b),o=new xt(df,hf);o.scale.y=s.distanceTo(r),o.position.copy(s).add(r).multiplyScalar(.5),o.castShadow=!0,this.stand.add(o)}this.bench.position.y=e.benchTop-10,this.floor=e.benchTop}}placeScenery(){for(const{fig:e,obj:t}of this.figures.values()){if(e.part!=="world")continue;const n=this.layout?.world.get(e.id);t.visible=!!n,n&&t.position.set(...n)}}setHighlight(e){this.highlight=new Set(e)}showEmpty(e=0){for(const[,n]of this.meshes)this.scene.remove(n),n.material.dispose();this.meshes.clear();for(const[n,s]of this.rods)n!=="motor"&&(this.shafts.remove(s),this.rods.delete(n));let t=this.rods.get("motor");t||(t=new xt(lf,cf),t.rotation.x=Math.PI/2,this.shafts.add(t),this.rods.set("motor",t)),this.setStand(J1()),t.scale.set(1,40,1),t.position.set(0,0,0),this.crank.visible=!0,this.crank.position.set(0,0,22),this.crank.rotation.set(0,0,e);for(const{obj:n,dowel:s}of this.figures.values())n.visible=!1,s&&(s.visible=!1)}show(e){const t=new Set;for(const l of e.parts){const c=l.part.id;t.add(c);let u=this.meshes.get(c),h=this.geos.get(l.part);h||(h=new _o(sw(l.part),{depth:l.part.thickness,bevelEnabled:!0,bevelThickness:.3,bevelSize:.3,bevelSegments:1,curveSegments:1}),this.geos.set(l.part,h)),u?u.geometry!==h&&(u.geometry=h):(u=new xt(h,new bn(tw(c))),u.castShadow=u.receiveShadow=!0,this.scene.add(u),this.meshes.set(c,u));const d=u.material,f=this.highlight.has(c);d.emissive.set(f?"#b3261e":"#000000"),d.emissiveIntensity=f?.9:0,this.place(u,l.pose,this.z(l.part.layer))}for(const[l,c]of this.meshes)t.has(l)||(this.scene.remove(c),c.material.dispose(),this.meshes.delete(l));for(const[l,c]of this.geos)e.parts.some(u=>u.part===l)||(c.dispose(),this.geos.delete(l));const n={};for(const{fig:l,obj:c,dowel:u}of this.figures.values()){if(l.part==="world")continue;const h=e.parts.find(M=>M.part.id===l.part);c.visible=!!h;const d=this.figures.get(l.id);if(!h){u&&(u.visible=!1);continue}const f=this.figureTransform(l,h),g=f.layerZ,y=[f.position[0],f.position[1]],m=f.position[2];c.position.set(...f.position),c.rotation.set(...f.rotation);const p=l.nudge??[0,0],x=fn([l.at[0]-p[0],l.at[1]-p[1]],h.pose),S=new D(x[0],x[1],g),_=new D(y[0],y[1],m),w=S.distanceTo(_);if(w>4){let M=d.dowel;M||(M=new xt(j1,hf),M.castShadow=!0,this.scene.add(M),d.dowel=M),M.visible=!0,M.scale.set(1,w,1),M.position.copy(S).add(_).multiplyScalar(.5),M.quaternion.setFromUnitVectors(new D(0,1,0),_.clone().sub(S).normalize())}else d.dowel&&(d.dowel.visible=!1);const[b,R]=l.part.split("/");R==="gear-b"&&(n[b]=Math.max(n[b]??-1/0,m+2))}const s=this.plan.spans,r=new Set(Object.keys(e.shafts)),o=this.thickness,a=this.plan.crank==="back";for(const[l,c]of Object.entries(e.shafts)){const u=s[l]??[0,0];let h=this.z(u[0])-(l==="motor"&&a?8:3),d=this.z(u[1])+o+(l==="motor"&&!a?8:3);n[l]!==void 0&&(d=Math.max(d,n[l]));let f=this.rods.get(l);f||(f=new xt(lf,cf),f.rotation.x=Math.PI/2,f.castShadow=!0,this.shafts.add(f),this.rods.set(l,f)),f.scale.set(1,d-h,1),f.position.set(c.position[0],c.position[1],(h+d)/2),l==="motor"&&(this.crank.visible=!0,this.crank.position.set(c.position[0],c.position[1],a?h-2:d+2),this.crank.rotation.set(a?Math.PI:0,0,a?-c.angle:c.angle))}for(const[l,c]of this.rods)r.has(l)||(this.shafts.remove(c),this.rods.delete(l))}place(e,t,n){e.position.set(t.origin[0],t.origin[1],n),e.rotation.set(0,0,t.angle)}celebrate(e="stars",t){const n=new D;if(t)n.set(...t);else{const r=this.layout?.bounds;n.set(r?(r.min[0]+r.max[0])/2:0,(r?r.max[1]:60)+10,r?(r.min[2]+r.max[2])/2:0)}const s=iw[e];for(let r=0;r<22;r++){const o=e==="hearts"?new no(4.2,8,6):e==="notes"?new ys(4.2):e==="sparks"?new Uh(4.2):new ys(4.6),a=new Nr({color:s[r%s.length],transparent:!0,toneMapped:!1,fog:!1}),l=new xt(o,a);l.position.copy(n),this.scene.add(l);const c=r/22*Math.PI*2,u=e==="sparks"?60:40;this.particles.push({o:l,from:n.clone(),born:performance.now(),v:new D(Math.cos(c)*(30+r*7%30),u+r*13%50,Math.sin(c)*(20+r*5%25))})}}fadeEffects(e=250){const t=performance.now();for(const n of this.particles)n.until=Math.min(n.until??1/0,t+e,n.born+$l)}clearEffects(){for(const e of this.particles)this.scene.remove(e.o),e.o.geometry.dispose(),e.o.material.dispose();this.particles=[]}stepParticles(e){const t=performance.now();for(const s of this.particles){const r=(t-s.born)/1e3;s.o.position.copy(s.from).addScaledVector(s.v,r),s.o.position.y-=45*r*r,s.o.rotation.set(r*4,r*3,0),s.o.material.opacity=Math.max(0,Math.min(1,($l/1e3-r)/.5,s.until!==void 0?(s.until-t)/250:1))}const n=this.particles.filter(s=>t-s.born>=$l||s.until!==void 0&&t>=s.until);for(const s of n)this.scene.remove(s.o),s.o.geometry.dispose(),s.o.material.dispose();this.particles=this.particles.filter(s=>!n.includes(s))}aim;view=new D(.72,.3,.63);setView(e){this.view.set(...e??[.72,.3,.63]).normalize()}cameraState(){return{p:this.camera.position.toArray(),t:this.controls.target.toArray()}}restoreCamera(e){return!Array.isArray(e?.p)||!Array.isArray(e?.t)||e.p.length!==3||e.t.length!==3||![...e.p,...e.t].every(Number.isFinite)?!1:(this.camera.position.fromArray(e.p),this.controls.target.fromArray(e.t),this.aim=void 0,this.keepAboveTable(),this.controls.update(),!0)}toScreen(e){const t=new D(...e).project(this.camera);if(!(t.z>1))return{x:(t.x+1)/2*this.host.clientWidth,y:(1-t.y)/2*this.host.clientHeight}}viewBox(){const e=new bi;if(this.layout)e.expandByPoint(new D(...this.layout.bounds.min)),e.expandByPoint(new D(...this.layout.bounds.max));else{for(const t of this.meshes.values())e.expandByObject(t);for(const{obj:t,fig:n}of this.figures.values())t.visible&&n.kind!=="night"&&e.expandByObject(t)}return e.isEmpty()&&e.set(new D(-60,-40,-20),new D(60,80,40)),e}fitsAll(){const e=this.viewBox();this.camera.updateMatrixWorld();for(let t=0;t<8;t++){const n=new D(t&1?e.max.x:e.min.x,t&2?e.max.y:e.min.y,t&4?e.max.z:e.min.z).project(this.camera);if(n.z>1||Math.abs(n.x)>.985||Math.abs(n.y)>.985)return!1}return!0}frame(e,t=!1){const n=this.viewBox(),s=n.getCenter(new D),r=(Array.isArray(e)?new D(...e):e?.clone()??this.camera.position.clone().sub(this.controls.target)).normalize(),o=r.clone().negate(),a=Math.abs(o.y)>.99?new D(0,0,-1):new D(0,1,0),l=new D().crossVectors(o,a).normalize(),c=new D().crossVectors(l,o);let u=0,h=0,d=0;for(let y=0;y<8;y++){const m=new D(y&1?n.max.x:n.min.x,y&2?n.max.y:n.min.y,y&4?n.max.z:n.min.z).sub(s);u=Math.max(u,Math.abs(m.dot(l))),h=Math.max(h,Math.abs(m.dot(c))),d=Math.max(d,Math.abs(m.dot(r)))}const f=Math.tan(Lp.degToRad(this.camera.fov/2)),g=Math.min(this.controls.maxDistance,Math.max(this.controls.minDistance,Math.max((h+14)/f,(u+14)/(f*this.camera.aspect))*1.06+d));this.aim={target:s,pos:s.clone().add(r.multiplyScalar(g))},t&&(this.controls.target.copy(this.aim.target),this.camera.position.copy(this.aim.pos),this.aim=void 0,this.controls.update())}glideTo(e){Array.isArray(e?.p)&&Array.isArray(e?.t)&&[...e.p,...e.t].every(Number.isFinite)&&(this.aim={target:new D().fromArray(e.t),pos:new D().fromArray(e.p)})}get moving(){return!!this.aim}frameOpening(e=!0){this.frame(this.view,e)}mode="free";get viewMode(){return this.mode}setViewMode(e,t=!0){this.mode=e;const n=e!=="free";this.controls.enableRotate=!n,this.controls.mouseButtons.LEFT=n?Xi.PAN:Xi.ROTATE,this.controls.touches.ONE=n?zi.PAN:zi.ROTATE,n&&t&&this.frame(Oh[e])}tilt(e){const t=this.camera.position.clone().sub(this.controls.target),n=new Yc().setFromVector3(t);n.phi+=e*Math.PI/180,t.setFromSpherical(n),this.camera.position.copy(this.controls.target).add(t),this.aim=void 0,this.controls.update()}orbit(e){const t=this.camera.position.clone().sub(this.controls.target).applyAxisAngle(new D(0,1,0),e*Math.PI/180);this.camera.position.copy(this.controls.target).add(t),this.aim=void 0}render(){const e=performance.now(),t=Math.min(.1,(e-this.last)/1e3);this.last=e,this.aim&&(this.controls.target.lerp(this.aim.target,.08),this.camera.position.lerp(this.aim.pos,.08),this.camera.position.distanceTo(this.aim.pos)<1&&(this.aim=void 0)),this.particles.length&&this.stepParticles(t),this.keepAboveTable(),this.controls.update(),this.placeTouchLabels(),this.placeDepthLabels(),this.renderer.render(this.scene,this.camera)}keepAboveTable(){const e=this.floor+8;if(this.controls.target.y<e){const t=e-this.controls.target.y;this.controls.target.y+=t,this.camera.position.y+=t}}cameraAboveTable(){return this.camera.position.y>this.floor}dispose(){for(const e of this.geos.values())e.dispose();this.renderer.dispose()}}function aw(i,e=72){const t={};try{const n=new om({antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.setSize(e,e,!1),n.setPixelRatio(1),n.toneMapping=$a;const s=new Np,r=new xn(30,1,1,2e3);s.add(new Kp("#fff1dc","#3b2a1e",1.1));const o=new Wc("#ffe8c8",2.2);o.position.set(120,200,260),s.add(o);for(const a of i){const l=Ia(a);s.add(l),l.rotation.y=-.35,l.updateMatrixWorld(!0);const c=new bi().setFromObject(l),u=c.getCenter(new D),h=c.getSize(new D).length();r.position.set(u.x+h*.35,u.y+h*.25,u.z+h*1.55),r.lookAt(u),n.render(s,r),t[a]=n.domElement.toDataURL(),s.remove(l)}n.dispose(),n.forceContextLoss()}catch{}return t}const lw=2*Math.PI,ff=12,pf=new WeakMap;function cw(i,e=90){let t=pf.get(i);t||(t=new Map,pf.set(i,t));const n=t.get(e);if(n)return n;const s=i.cycleTurns??1/0,r=Math.min(ff,s),o=Math.round(r*e),a=[];for(let c=0;c<o;c++){const u=c/o*r*lw,h=$r(i,u);a.push({angle:u,pose:h.ok?h.value:void 0})}const l={turns:r,samples:a,partial:s>ff};return t.set(e,l),l}const hw=.25,Na=4;function vo(i,e){let t=1/0,n=-1/0,s=1/0,r=-1/0;for(const o of i.samples){const a=o.pose&&Pr(o.pose,e);a&&(t=Math.min(t,a[0]),n=Math.max(n,a[0]),s=Math.min(s,a[1]),r=Math.max(r,a[1]))}return Number.isFinite(t)?{x:[t,n],y:[s,r]}:void 0}function xo(i,e,t=vo(i,e)){if(!t||t.x[1]-t.x[0]>=Na||t.y[1]-t.y[0]>=Na)return!1;let n=1/0,s=-1/0;for(const r of i.samples){const o=r.pose&&hp(r.pose,e);if(o===void 0)continue;const a=Math.cos(o);n=Math.min(n,a),s=Math.max(s,a)}return s-n>.5}function ja(i,e=!1){if(!i)return[];if(e)return["up","down","left","right"];const t=[];return i.y[1]-i.y[0]>=Na&&t.push("up","down"),i.x[1]-i.x[0]>=Na&&t.push("left","right"),t}const uw=Math.PI/6,dw={up:Math.PI/2,down:-Math.PI/2,left:Math.PI,right:0},oa=(i,e,t)=>i!==void 0&&Number.isFinite(i)&&(e===void 0||i>=e)&&(t===void 0||i<=t);function ar(i,e,t,n=zn){if("module"in t)return u=>oa(u.outputs[t.module]?.[t.output],t.min,t.max);const s=i.figures.find(u=>u.id===t.figure);if(!s)return;if("touch"in t){const u=i.figures.find(h=>h.id===t.touch);return!u||u===s||!(t.within>0)||s.part==="world"&&!n.world.has(s.id)||u.part==="world"&&!n.world.has(u.id)?void 0:h=>{const d=Ht(h,s,n),f=Ht(h,u,n);return!!d&&!!f&&Va(d,f)<=t.within}}if("axis"in t)return u=>oa(Pr(u,s)?.[t.axis==="x"?0:1],t.min,t.max);const r=vo(e,s);if(xo(e,s,r)){const u=dw[t.pick];return h=>{const d=hp(h,s);if(d===void 0)return!1;const f=Math.atan2(Math.sin(d-u),Math.cos(d-u));return Math.abs(f)<=uw}}if(!r||!ja(r).includes(t.pick))return;const[o,a]=t.pick==="up"||t.pick==="down"?r.y:r.x,l=t.pick==="up"||t.pick==="down"?1:0,c=(a-o)*hw;return t.pick==="up"||t.pick==="right"?u=>oa(Pr(u,s)?.[l],a-c):u=>oa(Pr(u,s)?.[l],void 0,o+c)}function Qn(i,e,t=i.moment,n=zn){if(!t)return;const s=ar(i,e,t.a,n),r=t.b?ar(i,e,t.b,n):void 0,o=e.samples.length,a=new Array(o).fill(!1);if(!s||t.b&&!r)return{a,b:t.b?a:void 0,both:a,events:0,turns:e.turns,broken:s?xi(i,t.b,e):xi(i,t.a,e)};const l=e.samples.map(d=>!!d.pose&&s(d.pose)),c=r?e.samples.map(d=>!!d.pose&&r(d.pose)):void 0,u=l.map((d,f)=>d&&(!c||c[f]));let h=0;for(let d=0;d<o;d++)u[d]&&!u[(d+o-1)%o]&&h++;return o&&u.every(Boolean)&&(h=1),{a:l,b:c,both:u,events:h,turns:e.turns}}function fw(i,e,t=i.moment,n=zn){if(!t)return;const s=ar(i,e,t.a,n),r=t.b?ar(i,e,t.b,n):void 0;if(!(!s||t.b&&!r))return o=>s(o)&&(!r||r(o))}const Jc={up:"up",down:"down",left:"has moved left",right:"has moved right"},pw={up:"points up",down:"points down",left:"points left",right:"points right"};function ii(i,e){const t=i.figures.find(n=>n.id===e);return t?`the ${t.id.replace(/-\d+$/,"")}`:`“${e}”`}function si(i,e){const t=i.figures.find(r=>r.id===e),n=t&&rp[t.kind].name,s=ii(i,e);return!n||n==="middle"||n===t.kind?s:`${s}’s ${n}`}function xi(i,e,t){if("touch"in e)return`${si(i,e.figure)} comes within ${Math.round(e.within)} mm of ${si(i,e.touch)}`;if("module"in e)return`“${e.module}” ${e.output} ${e.min!==void 0&&e.max!==void 0?`is ${e.min}–${e.max}`:e.min!==void 0?`reaches ${e.min}`:`drops to ${e.max}`}`;if("pick"in e){const n=i.figures.find(s=>s.id===e.figure);return`${ii(i,e.figure)} ${n&&t&&xo(t,n)?pw[e.pick]:e.pick==="up"||e.pick==="down"?`is ${Jc[e.pick]}`:Jc[e.pick]}`}return`${ii(i,e.figure)} ${e.axis==="y"?e.max!==void 0?`comes down to ${Math.round(e.max)} mm`:`rises to ${Math.round(e.min??0)} mm`:e.max!==void 0?`reaches left to ${Math.round(e.max)} mm`:`reaches right to ${Math.round(e.min??0)} mm`}`}function jc(i,e,t){return e.b?`when ${xi(i,e.a,t)} and ${xi(i,e.b,t)}`:`when ${xi(i,e.a,t)}`}function hm(i,e,t,n,s=zn){const r=i.figures.find(l=>l.id===t),o=i.figures.find(l=>l.id===n);if(!r||!o)return;let a={mm:1/0,sample:-1};return e.samples.forEach((l,c)=>{if(!l.pose)return;const u=Ht(l.pose,r,s),h=Ht(l.pose,o,s);if(u&&h){const d=Va(u,h);d<a.mm&&(a={mm:d,sample:c})}}),a.sample<0?void 0:a}function mw(i,e,t,n=zn){if(!t.b||"module"in t.a||"module"in t.b||"touch"in t.a||"touch"in t.b)return;const s=Qn(i,e,t,n),r=i.figures.find(l=>l.id===t.a.figure),o=i.figures.find(l=>l.id===t.b.figure);if(!s||!s.events||!r||!o||r===o)return;let a=1/0;return s.both.forEach((l,c)=>{const u=e.samples[c].pose;if(!l||!u)return;const h=Ht(u,r,n),d=Ht(u,o,n);h&&d&&(a=Math.min(a,Va(h,d)))}),Number.isFinite(a)?a:void 0}function um(i,e,t,n=zn){const s=Qn(i,e,t,n);if(!s||s.events)return;if(s.broken)return`${s.broken} can’t be judged: that figure doesn’t move that way, or it’s gone`;const r=a=>{const l=ar(i,e,a,n);return!!l&&e.samples.some(c=>!!c.pose&&l(c.pose))},o=a=>{const l=wi(t)?.w===a?io(i,e,t,n):hm(i,e,a.figure,a.touch,n);return l?`${ii(i,a.figure)} now misses ${ii(i,a.touch)} by ${Math.max(1,Math.round(l.mm-a.within))} mm`:`${si(i,a.figure)} never gets near ${si(i,a.touch)}`};for(const a of[t.a,t.b])if(a&&!r(a))return"touch"in a?o(a):`“${xi(i,a,e)}” never happens`;return`“${xi(i,t.a,e)}” and “${xi(i,t.b,e)}” never happen at the same time`}function wi(i){if(i){if("touch"in i.a)return{which:"a",w:i.a,other:i.b};if(i.b&&"touch"in i.b)return{which:"b",w:i.b,other:i.a}}}const lr=[-40,80];function Bh(i,e){const t=wi(e);if(!t)return;const n=o=>{const a=i.figures.find(l=>l.id===o);return!!a&&a.part!=="world"},[s,r]=t.which==="b"?[t.w.figure,t.w.touch]:[t.w.touch,t.w.figure];if(n(s))return{mover:s,other:r};if(n(r))return{mover:r,other:s}}function io(i,e,t,n=zn){const s=wi(t);if(!s)return;const r=i.figures.find(h=>h.id===s.w.figure),o=i.figures.find(h=>h.id===s.w.touch);if(!r||!o)return;const a=s.other?ar(i,e,s.other,n):void 0,l=a?e.samples.map(h=>!!h.pose&&a(h.pose)):void 0,c=!!l&&l.some(Boolean);let u;return e.samples.forEach((h,d)=>{if(!h.pose||c&&!l[d])return;const f=Ht(h.pose,r,n),g=Ht(h.pose,o,n);if(!f||!g)return;const y=Va(f,g);(!u||y<u.mm)&&(u={sample:d,mm:y,during:c})}),u}function dm(i,e){const t=[e[0]-i[0],e[1]-i[1],e[2]-i[2]];return{x:t[0],y:t[1],z:t[2],mm:Math.hypot(t[0],t[1],t[2])}}function gw(i,e,t,n=zn,s){const r=wi(t),o=Bh(i,t);if(!r)return{why:"this moment has no “touches”"};if(!o)return{why:"neither of them can move: both are scenery"};const a=structuredClone(i.figures),l=a.find(w=>w.id===o.mover),c=a.find(w=>w.id===o.other);if(!c)return{why:`${ii(i,o.other)} isn’t on this sculpture`};const u={...i,figures:a};let h=n,d=!1;const f=io(u,e,t,h);if(!f)return{why:`${si(i,o.mover)} and ${si(i,o.other)} are never both on the machine`};const g=f.sample,y=e.samples[g].pose,m=y.parts.find(w=>w.part.id===l.part);if(!m)return{why:`${ii(i,o.mover)} isn’t riding a part`};const p=r.w.within,x=Math.min(2,p*.25);for(let w=0;w<4;w++){const b=Ht(y,l,h),R=Ht(y,c,h);if(!b||!R)break;const M=dm(b,R);if(M.mm<=x+.05)break;const A=(M.mm-x)/M.mm,C=M.x*A,L=M.y*A,I=M.z*A,k=Math.cos(m.pose.angle),N=Math.sin(m.pose.angle),B=[C*k+L*N,-C*N+L*k],H=(G,j,Y)=>{const Q=Math.max(j,Math.min(Y,G));return Math.abs(Q-G)>1e-6&&(d=!0),Math.round(Q*10)/10};if(l.anchor){const G=l.nudge??[0,0],j=[l.at[0]-G[0],l.at[1]-G[1]];l.nudge=[H(G[0]+B[0],-ln,ln),H(G[1]+B[1],-ln,ln)],l.at=[j[0]+l.nudge[0],j[1]+l.nudge[1]]}else l.at=[H(l.at[0]+B[0],-ln,ln),H(l.at[1]+B[1],-ln,ln)];if(l.dz=H((l.dz??0)+I,lr[0],lr[1]),s&&(h=s(a)),d)break}const S=io(u,e,t,h),_=Qn(u,e,{a:r.w},h);return{figure:l.id,...l.anchor?{nudge:l.nudge}:{at:l.at},dz:l.dz??0,mm:S?.mm??f.mm,touches:!!_&&_.events>0,clamped:d}}const mf=new Map;function Fr(i){const e=i.part==="world",t=`${i.kind}|${i.scale??1}|${e?`${i.turnY??0}|${i.turnZ??0}`:"-"}`;let n=mf.get(t);if(n)return n;const s=Ia(i.kind);s.scale.setScalar(i.scale??1),e&&s.rotation.set(0,i.turnY??0,i.turnZ??0),s.updateMatrixWorld(!0);const r=new bi().setFromObject(s,!0);return n={min:[r.min.x,r.min.y,r.min.z],max:[r.max.x,r.max.y,r.max.z]},s.traverse(o=>{o instanceof xt&&o.geometry.dispose()}),mf.set(t,n),n}const _w=i=>Math.max(...[i.min,i.max].flatMap(e=>[0,1,2].map(t=>Math.abs(e[t]))))*Math.SQRT2;function fm(i,e,t,n){const s=i.thickness,r=_0(i,e,t,n.crank),o=new Map,a=new Map,l=[];for(const p of t){if(p.part!=="world"||!p.place)continue;const x=Fr(p),S=v0(p,x,r);o.set(p.id,S),l.push({id:p.id,kind:p.kind,place:p.place,box:{x0:S[0]+x.min[0],x1:S[0]+x.max[0],y0:S[1]+x.min[1],y1:S[1]+x.max[1],z0:S[2]+x.min[2],z1:S[2]+x.max[2]},face:p.place==="behind"?S[2]+x.max[2]:void 0})}for(const p of t){if(p.part==="world")continue;const x=e.map(w=>nr(w,p)).filter(w=>!!w);if(!x.length||x.some(w=>Math.hypot(w.origin[0]-x[0].origin[0],w.origin[1]-x[0].origin[1])>.5||Math.abs(w.turnZ-x[0].turnZ)>.001))continue;const S=Fr({...p,part:"rider"}),_=[0,1].flatMap(w=>[0,1].flatMap(b=>[0,1].map(R=>gh([[S.min[0],S.max[0]][w],[S.min[1],S.max[1]][b],[S.min[2],S.max[2]][R]],1,x[0].turnZ,p.turnY??0,x[0].origin))));l.push({id:p.id,kind:p.kind,place:"front",box:{x0:Math.min(..._.map(w=>w[0])),x1:Math.max(..._.map(w=>w[0])),y0:Math.min(..._.map(w=>w[1])),y1:Math.max(..._.map(w=>w[1])),z0:Math.min(..._.map(w=>w[2])),z1:Math.max(..._.map(w=>w[2]))},stands:!0})}const c=t.filter(p=>p.place==="above").map(p=>o.get(p.id)[1]),u=c.length?Math.max(...c):void 0;if(u!==void 0)for(const p of t){if(p.part==="world"||!p.upright||p.kind==="worm")continue;let x=1/0;for(const S of e){const _=Pr(S,p);_&&(x=Math.min(x,_[1]))}Number.isFinite(x)&&x<u+1&&a.set(p.id,u+1-x)}const h=K1({poses:e,thickness:s,plan:n,back:r.back,front:r.front,scenery:l}),d=[1/0,1/0,1/0],f=[-1/0,-1/0,-1/0],g=(p,x,S,_=0)=>{d[0]=Math.min(d[0],p-_),d[1]=Math.min(d[1],x-_),d[2]=Math.min(d[2],S-_),f[0]=Math.max(f[0],p+_),f[1]=Math.max(f[1],x+_),f[2]=Math.max(f[2],S+_)},y=p=>{g(p.x0,p.y0,p.z0),g(p.x1,p.y1,p.z1)};for(const p of h.blocks)p.kind!=="plinth"&&y(p);for(const p of l)p.kind!=="night"&&y(p.box);const m={raise:a,world:o};for(const p of t){if(p.part==="world")continue;const x=_w(Fr(p));for(const S of e){const _=nr(S,p,m);_&&g(..._.origin,x*.8)}}for(const[p,x]of Object.entries(n.spans)){const S=e[0]?.shafts[p]?.position;if(S){const[_,w]=W1(p,x,s,n.crank);g(S[0],S[1],_),g(S[0],S[1],w)}}return Number.isFinite(d[0])||(d.splice(0,3,-60,-40,-20),f.splice(0,3,60,80,40)),{extent:r,world:o,raise:a,surface:u,stand:h,bounds:{min:d,max:f}}}const vw=.6,gf=new WeakMap,xw=i=>{let e=gf.get(i);if(!e){const t=Math.max(1,Math.ceil(i.length/64));e=i.filter((n,s)=>s%t===0),gf.set(i,e)}return e};function yw(i,e){let t=!1;for(let n=0,s=e.length-1;n<e.length;s=n++){const[r,o]=e[n],[a,l]=e[s];o>i[1]!=l>i[1]&&i[0]<(a-r)*(i[1]-o)/(l-o)+r&&(t=!t)}return t}function Mw(i,e,t){if(i.part==="world")return[];const n=i.part.split("/")[0],s=Fr({...i,part:"rider"}),r=new Map;for(const{angle:o,pose:a}of e){const l=nr(a,i,t);if(!l)continue;const c=[0,1].flatMap(y=>[0,1].flatMap(m=>[0,1].map(p=>gh([[s.min[0],s.max[0]][y],[s.min[1],s.max[1]][m],[s.min[2],s.max[2]][p]],1,l.turnZ,i.turnY??0,l.origin)))),u=[0,1,2].map(y=>Math.min(...c.map(m=>m[y]))),h=[0,1,2].map(y=>Math.max(...c.map(m=>m[y]))),d=[0,1,2].map(y=>(u[y]+h[y])/2),f=[0,1,2].map(y=>(h[y]-u[y])/2*vw),g={x0:d[0]-f[0],x1:d[0]+f[0],y0:d[1]-f[1],y1:d[1]+f[1],z0:d[2]-f[2],z1:d[2]+f[2]};for(const y of a.parts){if(y.part.id.split("/")[0]===n)continue;const m=y.part.layer*(y.part.thickness+1);if(m+y.part.thickness<g.z0||m>g.z1)continue;const x=xw(y.part.outer).map(w=>fn(w,y.pose));if(!(x.some(w=>w[0]>=g.x0&&w[0]<=g.x1&&w[1]>=g.y0&&w[1]<=g.y1)||yw([d[0],d[1]],x)))continue;const _=r.get(y.part.id);_?(_.from=Math.min(_.from,o),_.to=Math.max(_.to,o)):r.set(y.part.id,{part:y.part.id,from:o,to:o})}}return[...r.values()]}const zh=256*1024,pm="automata-sculpture",_f=40,mm=60;function gm(i){const e={format:pm,version:1,title:i.title,blurb:i.blurb,goal:i.goal,sky:i.sky,view:i.view,project:i.project,figures:i.figures,moment:i.moment};return JSON.stringify(e,null,1)}const yi=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t,bw=(i,e)=>typeof i=="string"&&i.length<=e,Or=/^[A-Za-z][A-Za-z0-9_-]{0,47}$/,Sw=/^[A-Za-z][A-Za-z0-9_-]{0,47}\/[a-z][a-z-]{0,23}$/,ww=/^#[0-9a-fA-F]{6}$/;class _m extends Error{}const ct=(i,e)=>{if(!i)throw new _m(e)},Qs=(i,e)=>i.replace(/[\u0000-\u001f\u007f]/g," ").slice(0,e);function vf(i,e,t){return ct(Array.isArray(i)&&i.length===2&&yi(i[0],-e,e)&&yi(i[1],-e,e),t),[i[0],i[1]]}function Ew(i,e){const t=i,n=`Figure ${e+1}`;ct(!!t&&typeof t=="object"&&!Array.isArray(t),`${n} isn’t a figure.`),ct(typeof t.id=="string"&&Or.test(t.id),`${n} needs a simple name (letters, digits, - or _).`),ct(typeof t.kind=="string"&&(op(t.kind)||Fu(t.kind)),`${n} is a kind of figure this workshop doesn’t have.`),ct(t.part==="world"||typeof t.part=="string"&&Sw.test(t.part),`${n} must ride a part (“module/part”) or stand in the world.`),ct(Fu(t.kind)===(t.part==="world"),`${n}: scenery stands in the world and characters ride parts.`);const s={id:t.id,kind:t.kind,part:t.part,at:vf(t.at,1e3,`${n} has a bad position.`)};t.anchor!==void 0&&(ct(u0.includes(t.anchor),`${n} has an unknown anchor.`),s.anchor=t.anchor),t.nudge!==void 0&&(s.nudge=vf(t.nudge,200,`${n} is moved too far.`)),t.dz!==void 0&&(ct(yi(t.dz,-400,400),`${n} has a bad depth.`),s.dz=t.dz),t.upright!==void 0&&(ct(typeof t.upright=="boolean",`${n}: upright must be true or false.`),s.upright=t.upright),t.scale!==void 0&&(ct(yi(t.scale,.2,4),`${n} scale must be 0.2–4.`),s.scale=t.scale),t.color!==void 0&&(ct(typeof t.color=="string"&&ww.test(t.color),`${n} colour must look like #a1b2c3.`),s.color=t.color);for(const r of["turnY","turnZ"])t[r]!==void 0&&(ct(yi(t[r],-7,7),`${n} has a bad turn.`),s[r]=t[r]);return t.place!==void 0&&(ct(["above","front","behind"].includes(t.place),`${n} has a bad placement.`),s.place=t.place),s}function xf(i,e){const t=i,n=`The moment’s “${e}” part`;ct(!!t&&typeof t=="object"&&!Array.isArray(t),`${n} is missing.`);const s=r=>{for(const o of["min","max"])t[o]!==void 0&&(ct(yi(t[o],-1e4,1e4),`${n} has a bad limit.`),r[o]=t[o]);return r};return t.module!==void 0?(ct(typeof t.module=="string"&&Or.test(t.module)&&typeof t.output=="string"&&/^[A-Za-z]{1,24}$/.test(t.output),`${n} names a bad part output.`),s({module:t.module,output:t.output})):(ct(typeof t.figure=="string"&&Or.test(t.figure),`${n} must name a figure.`),t.touch!==void 0?(ct(typeof t.touch=="string"&&Or.test(t.touch)&&t.touch!==t.figure,`${n} must name a second, different figure to touch.`),ct(yi(t.within,1,200),`${n}: “within” must be 1–200 mm.`),{figure:t.figure,touch:t.touch,within:t.within}):t.pick!==void 0?(ct(d0.includes(t.pick),`${n} must be up, down, left or right.`),{figure:t.figure,pick:t.pick}):(ct(t.axis==="x"||t.axis==="y",`${n} needs an axis.`),s({figure:t.figure,axis:t.axis})))}function Tw(i){const e=i;ct(!!e&&typeof e=="object"&&!Array.isArray(e),"The moment isn’t readable."),ct(typeof e.text=="string"&&e.text.trim().length>0&&e.text.length<=140,"The moment needs words to say (up to 140 characters).");const t={text:Qs(e.text,140),a:xf(e.a,"first")};return e.b!==void 0&&e.b!==null&&(t.b=xf(e.b,"second")),e.effect!==void 0&&(ct(ap.includes(e.effect),"The moment’s effect is unknown."),t.effect=e.effect),t}function Aw(i,e=new TextEncoder().encode(i).length){if(e>zh)return{ok:!1,reason:`That file is ${Math.ceil(e/1024)} KiB; a sculpture file is at most 256 KiB.`};let t;try{t=JSON.parse(i)}catch{return{ok:!1,reason:"That file isn’t readable JSON, so it can’t be a sculpture."}}return cr(t)}function cr(i,e){try{const t=i;ct(!!t&&typeof t=="object"&&!Array.isArray(t)&&t.format===pm&&t.version===1,"That isn’t an Automata sculpture file (version 1)."),ct(typeof t.title=="string"&&t.title.trim().length>0&&t.title.length<=80,"The sculpture needs a title of up to 80 characters.");for(const a of["blurb","goal"])ct(t[a]===void 0||t[a]===null||bw(t[a],400),`The ${a} is too long.`);ct(t.sky===void 0||t.sky===null||["day","dusk","night"].includes(t.sky),"Unknown sky."),ct(!!t.project&&typeof t.project=="object"&&!Array.isArray(t.project),"The sculpture has no machine."),ct(Array.isArray(t.figures)&&t.figures.length<=_f,`A sculpture has at most ${_f} figures.`);const n=t.figures.map(Ew);ct(new Set(n.map(a=>a.id)).size===n.length,"Two figures share a name.");const s=Qs(t.title,80),r=JSON.parse(JSON.stringify(t.project));r.title=s;const o={id:e??`file-${Date.now().toString(36)}`,title:s,blurb:Qs(t.blurb??"",400),project:r,figures:n};if(t.goal&&(o.goal=Qs(t.goal,400)),t.sky&&(o.sky=t.sky),t.view!==void 0&&t.view!==null&&(ct(Array.isArray(t.view)&&t.view.length===3&&t.view.every(a=>yi(a,-1,1))&&Math.hypot(...t.view)>.1,"The camera view must be three numbers between -1 and 1."),o.view=[...t.view]),t.moment!==void 0&&t.moment!==null){o.moment=Tw(t.moment);const a=new Set(n.map(l=>l.id));for(const l of[o.moment.a,o.moment.b])if(l)for(const c of po(l))ct(a.has(c),`The moment watches a figure called “${c}” that isn’t in the sculpture.`)}return{ok:!0,scene:o}}catch(t){return t instanceof _m?{ok:!1,reason:t.message}:{ok:!1,reason:"That file couldn’t be read as a sculpture."}}}function Rw(i,e){const t=new Set(e);for(const n of i.figures)if(n.part!=="world"&&!t.has(n.part))return`The ${n.id} rides “${n.part}”, which this machine doesn’t have.`;for(const n of[i.moment?.a,i.moment?.b])if(n&&"module"in n&&![...t].some(s=>s.startsWith(`${n.module}/`)))return`The moment watches “${n.module}”, which this machine doesn’t have.`}const Hh="automata.gallery.v1";function Hi(i){try{const e=JSON.parse(i.getItem(Hh)??"[]");return Array.isArray(e)?e.filter(t=>t&&typeof t.id=="string"&&Or.test(t.id)&&typeof t.name=="string"&&yi(t.savedAt,0,1e14)&&cr(t.file,t.id).ok).slice(0,mm).map(t=>({id:t.id,name:Qs(t.name,60),savedAt:t.savedAt,file:t.file})):[]}catch{return[]}}function Cw(i,e,t,n=Date.now()){const s=Qs(e.trim(),60);if(!s)return{ok:!1,reason:"Give your sculpture a name first."};const r=JSON.parse(gm({...t,title:s,project:{...t.project,title:s}}));if(new TextEncoder().encode(JSON.stringify(r)).length>zh)return{ok:!1,reason:"This sculpture is too large to save (over 256 KiB)."};const o=Hi(i),a=o.find(u=>u.name.toLowerCase()===s.toLowerCase()),l={id:a?.id??`mine-${n.toString(36)}`,name:s,savedAt:n,file:r},c=[l,...o.filter(u=>u!==a)].slice(0,mm);try{i.setItem(Hh,JSON.stringify(c))}catch{return{ok:!1,reason:"Your browser wouldn’t store it (storage may be full or switched off). Export the file instead."}}return{ok:!0,entry:l}}function Pw(i,e){const t=Hi(i).filter(n=>n.id!==e);try{i.setItem(Hh,JSON.stringify(t))}catch{}}const Dt=2*Math.PI,vm="automata.v2",Xe=i=>document.querySelector(i),Pe=i=>i.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Sn=i=>Math.round((i*180/Math.PI%360+360)%360),v={scene:wr(Bi[0]),selected:"hen",angle:0,playing:!0,speed:.35,issues:[],pending:!1,undo:[],redo:[],rev:0,preparedRev:-1,poseFresh:!1,stoppedByError:!1,drafts:{},tab:"part",addOn:"motor",shafts:{spans:{},crank:"front",clashes:[]}},so=Xg();let fe;const yo=()=>JSON.stringify({scene:v.scene,selected:v.selected,figure:v.figure});let aa={key:"",at:0};function Gh(i=""){const e=performance.now();if(i&&i===aa.key&&e-aa.at<1500){aa.at=e;return}aa={key:i,at:e},v.undo.push(yo()),v.undo.length>80&&v.undo.shift(),v.redo=[]}function Jt(i,e=""){Gh(e),v.editWhere="part",i(v.scene),v.rev++,v.scan=void 0,v.fixNote=void 0,v.slopeAsk=void 0,fs(),ns()}function hn(i,e="",t=!0,n="figures"){Gh(e),v.editWhere=n==="figures"?"figures":void 0,i(v.scene),mh(v.scene.figures,v.prepared?.project.modules??v.scene.project.modules),t&&fe.setFigures(v.scene.figures),Vh(),ns()}function xm(i){const e=JSON.parse(i);v.scene=e.scene,v.selected=e.selected,v.figure=e.figure,v.rev++,v.scan=void 0,v.slopeAsk=void 0,v.broke=void 0,v.editWhere=void 0,fe.setFigures(v.scene.figures),fe.setSky(v.scene.sky),tr(),fs(),ns()}function la(){const i=v.undo.pop();i&&(v.redo.push(yo()),xm(i))}function yf(){const i=v.redo.pop();i&&(v.undo.push(yo()),xm(i))}const Gi=()=>!v.pending&&!!v.prepared&&v.preparedRev===v.rev,_n=()=>v.scene.project.modules.find(i=>i.id===v.selected),ri=()=>v.scene.project.modules.length===0;let Mf=0;async function fs(){const i=++Mf,e=v.rev;if(ri()){so.cancel(),v.pending=!1,v.prepared=void 0,v.preparedRev=e,v.pose=void 0,v.issues=[],v.cycle=void 0,v.layout=void 0,fe.setLayout(void 0),Bn=void 0,ao=void 0,v.shafts={spans:{},crank:"front",clashes:[]},fe.showEmpty(v.angle),Pm(),ka();return}v.pending=!0,lt();const t=await so.prepare(v.scene.project);if(i===Mf){if(v.pending=!1,t.status==="cancelled"){lt();return}t.status==="error"?v.issues=[{code:"worker",severity:"error",message:t.message}]:t.value.ok?(v.prepared=t.value.value,v.preparedRev=e,v.issues=t.value.issues,v.poseFresh=!1,mh(v.scene.figures,v.prepared.project.modules),ym(),ho=v.prepared.project,ns(),v.stoppedByError&&(v.stoppedByError=!1,v.playing=!0,Un())):v.issues=t.value.issues,ka()}}function ym(){const i=v.prepared;if(!i){ka();return}v.cycle=cw(i);const e=v.cycle.samples.filter(s=>s.pose),t=Math.max(1,Math.ceil(e.length/180)),n=e.filter((s,r)=>r%t===0);v.shaftGap=v.cycle.samples.length-e.length;try{v.shafts=zg(i.project,n.map(s=>({angle:s.angle,parts:s.pose.parts,shafts:s.pose.shafts}))),v.shaftsChecked=!0}catch{v.shafts={spans:hh(i.project),crank:"front",clashes:[]},v.shaftsChecked=!1}fe.setShafts(v.shafts,i.project.thickness),Vh(),Pm(),oi()}function Vh(){const i=v.prepared;if(!i||!v.cycle){ka();return}const e=v.cycle.samples.filter(n=>n.pose),t=Math.max(1,Math.ceil(e.length/180));v.layout=fm(i.project,e.filter((n,s)=>s%t===0).map(n=>n.pose),v.scene.figures,v.shafts),fe.setLayout(v.layout),Bn=fw(v.scene,v.cycle,void 0,v.layout),ao=Bn?Qn(v.scene,v.cycle,void 0,v.layout)?.both:void 0,kw(),ur(),bo(),oo(),Qa(),Wh()}function Qa(){const i=v.tab==="figures"||fe.isDragging?v.figure:v.tab==="moment"?Yi?.mover:void 0,e=v.scene.figures.find(t=>t.id===i);if(!e||e.part==="world"||!v.cycle){fe.setTrail(void 0);return}fe.setTrail(v.cycle.samples.flatMap(t=>{const n=t.pose&&Ht(t.pose,e,v.layout);return n?[n]:[]}))}function ro(){const i=v.scene.moment;return i&&!("module"in i.a)?i:Mm(v.draft)}function Mm(i){const e=t=>!t||!("module"in t)&&po(t).every(n=>v.scene.figures.some(s=>s.id===n));return i&&e(i.a)&&e(i.b)?i:void 0}let Yi;const er=i=>i<1?"under 1 mm":`${Math.round(i)} mm`;function oo(){const i=ro(),e=wi(i),t=v.cycle,n=d=>v.scene.figures.find(f=>f.id===d),s=!!e&&!!v.figure&&[e.w.figure,e.w.touch].includes(v.figure);if(!(!!e&&!!t&&!!v.prepared&&!!n(e.w.figure)&&!!n(e.w.touch)&&(v.tab==="moment"||(v.tab==="figures"||fe.isDragging)&&s))){Yi&&(Yi=void 0,fe.setTouchNow(),fe.setTouchClosest());return}const o=n(e.w.figure),a=n(e.w.touch),l=io(v.scene,t,i,v.layout);Yi={first:o.id,second:a.id,within:e.w.within,approach:l,mover:Bh(v.scene,i)?.mover};const c=l&&t.samples[l.sample].pose,u=c&&Ht(c,o,v.layout),h=c&&Ht(c,a,v.layout);fe.setTouchClosest(u&&h?{a:u,b:h,text:`closest ${er(l.mm)}`}:void 0,c?[o,a].filter(d=>d.part!=="world").map(d=>({fig:d,pose:c})):[]),v.pose&&bm(v.pose)}function bm(i){const e=Yi;if(!e)return;const t=v.scene.figures.find(o=>o.id===e.first),n=v.scene.figures.find(o=>o.id===e.second),s=t&&Ht(i,t,v.layout),r=n&&Ht(i,n,v.layout);fe.setTouchNow(s&&r?{a:s,b:r,text:er(Math.hypot(s[0]-r[0],s[1]-r[1],s[2]-r[2]))}:void 0)}function Lw(i,e){const t=dm(i,e),n=[["left–right",Math.abs(t.x)],["up–down",Math.abs(t.y)],["in depth (toward you – toward the back)",Math.abs(t.z)]],[s,r]=[...n].sort((o,a)=>a[1]-o[1])[0];return r>=t.mm*.6?`mostly ${s} (${Math.round(r)} mm)`:n.filter(o=>o[1]>=1).map(o=>`${Math.round(o[1])} mm ${o[0]}`).join(", ")}function $h(i){const e=wi(i),t=v.cycle;if(!e||!t)return"";const n=v.scene.figures.find(p=>p.id===e.w.figure),s=v.scene.figures.find(p=>p.id===e.w.touch);if(!n||!s)return"";const r=`<p class="touchpts">Measured between <i class="dot a"></i><b>${Pe(si(v.scene,n.id))}</b> <span aria-hidden="true">↔</span> <i class="dot b"></i><b>${Pe(si(v.scene,s.id))}</b></p>`,o=io(v.scene,t,i,v.layout),a=o&&t.samples[o.sample].pose;if(!o||!a)return r;const l=Sn(t.samples[o.sample].angle),c=t.turns>1?` in turn ${Math.floor(t.samples[o.sample].angle/Dt)+1}`:"",u=e.other&&o.during?` while ${Pe(xi(v.scene,e.other,t))}`:"";if(o.mm<=e.w.within)return`${r}<p class="touchnote ok-ink">They meet: ${er(o.mm)} apart at ${l}°${c}${u} (within ${Math.round(e.w.within)} mm).</p>`;const h=Bh(v.scene,i),d=Ht(a,n,v.layout),f=Ht(a,s,v.layout),g=h?`<button data-together="1" class="primary" title="Moves the ${Pe(h.mover)} on its part (one undo step)">Bring them together</button><span>moves the ${Pe(h.mover)}</span>`:"<span>Both are scenery: neither can move.</span>",y=h?h.mover===s.id?d[2]-f[2]:f[2]-d[2]:0,m=h&&Math.abs(y)>=5?` To close the depth, move the ${Pe(h.mover)} ${y>0?"toward you":"toward the back"} (${Math.round(Math.abs(y))} mm).`:"";return`${r}<p class="touchnote">Closest: <b>${er(o.mm)}</b> apart at ${l}°${c}${u}, ${er(o.mm-e.w.within)} too far. The gap runs ${Pe(Lw(d,f))}.${m} The ghosts show them there.</p><div class="fixes">${g}</div>`}function Wh(){const i=ro();for(const t of document.querySelectorAll(".touchinfo")){const n=$h(i);t.innerHTML!==n&&(t.innerHTML=n)}const e=document.getElementById("momentstatus");if(e&&_a==="moment"){const t=tl(i);e.innerHTML!==t&&(e.innerHTML=t)}}function Iw(){const i=ro(),e=v.prepared,t=v.cycle;if(!i||!e||!t)return;if(!Gi()){Mt("Still building the machine; try again in a moment.");return}const n=t.samples.filter(g=>g.pose),s=Math.max(1,Math.ceil(n.length/180)),r=n.filter((g,y)=>y%s===0).map(g=>g.pose),o=g=>fm(e.project,r,g,v.shafts),a=gw(v.scene,t,i,v.layout,o);if("why"in a){Mt(`Can’t bring them together: ${a.why}.`);return}const l=v.scene.figures.find(g=>g.id===a.figure),c=l.anchor?l.nudge??[0,0]:l.at,u=a.nudge??a.at??c,h=Math.hypot(u[0]-c[0],u[1]-c[1],a.dz-(l.dz??0)),d=wi(i),f=d.w.figure===a.figure?d.w.touch:d.w.figure;hn(g=>{const y=g.figures.find(m=>m.id===a.figure);a.nudge&&(y.nudge=a.nudge),a.at&&(y.at=a.at),y.dz=a.dz},""),lt(),Mt(a.touches?`Moved the ${a.figure} ${Math.round(h)} mm so ${si(v.scene,a.figure)} meets ${si(v.scene,f)}. Undo puts it back.`:`Moved the ${a.figure} as far as it can go (${Math.round(h)} mm); they still miss by ${er(a.mm-d.w.within)}. Try the timing, or move ${ii(v.scene,f)} too. Undo puts it back.`,!0)}let bf=!1,Wl=!1,Qc=!1,Ua;function Dw(){fe.onFigureGrab=i=>{const e=v.scene.figures.find(n=>n.id===i);if(!e||e.part==="world"||!v.pose||!v.poseFresh)return!1;const t=document.activeElement;return t instanceof HTMLElement&&t.closest("aside")&&t.blur(),Gh(),v.editWhere="figures",bf=v.playing,v.playing=!1,Un(),Qc=!0,Cn||(Ua=i),v.figure=i,v.tab!=="figures"&&(v.tab="figures"),lt(),!0},fe.onFigureDrag=(i,e,t,n,s)=>{const r=v.scene.figures.find(a=>a.id===i),o=r&&v.pose?.parts.find(a=>a.part.id===r.part);!r||!o||!v.pose||Nw(r,o,v.pose,e,t,n,s)&&(Qa(),Uw(r),el(),Wl||(Wl=!0,requestAnimationFrame(()=>{Wl=!1,oo(),Wh(),bo()})))},fe.onFigureDrop=()=>{Qc=!1,Vh(),ns(),lt(),bf&&(v.playing=!0,Un())}}function Nw(i,e,t,n,s,r,o){const a=nr(t,i,v.layout);if(!a)return!1;const l=o==="yz"?a.origin[0]:n,c=o==="xz"?a.origin[1]:s;let u=!1;if(Math.hypot(l-a.origin[0],c-a.origin[1])>.05&&(u=x0(i,e,l,c,v.layout?.raise.get(i.id)??0)||u),o!=="xy"){const h=Math.round(Math.max(lr[0],Math.min(lr[1],r-up(e))));h!==(i.dz??0)&&(i.dz=h,u=!0)}return u}function Uw(i){const e=v.scene.project.modules.find(r=>r.id===i.part.split("/")[0]),t=e?ph(e,i.part):void 0,n=i.nudge??[0,0],s=t!==void 0?Zi(n,t):n;for(const[r,o]of[["x",s[0]],["y",s[1]],["dz",i.dz??0]]){const a=document.querySelector(`[data-f="${r}"]`);if(a){a.value=String(Math.round(o));const l=a.closest("label")?.querySelector("output");l&&(l.value=r==="dz"?Xh(o):`${Math.round(o)} mm`)}}}const Xh=i=>Math.round(i)===0?"on its part":Math.round(i)>0?`${Math.round(i)} mm to you`:`${-Math.round(i)} mm back`;function el(){const i=v.tab==="figures"||fe.isDragging?v.figure:void 0,e=v.scene.figures.find(r=>r.id===i),t=e&&e.part!=="world"&&v.pose?nr(v.pose,e,v.layout):void 0;if(!t||!e){fe.setDepthArrow(void 0);return}const n=Fr({...e,part:"rider"}),s=t.origin[1]+(n.max[1]-n.min[1])*.55;fe.setDepthArrow([t.origin[0],s,t.origin[2]],Math.max(26,(n.max[2]-n.min[2])/2+18))}function kw(){const i=v.scene.moment,e=v.cycle;if(!e)return;const t=i?JSON.stringify(i):void 0,n=i?Qn(v.scene,e,i,v.layout):void 0,s=!!n&&n.events>0;i&&t===v.momentKey&&v.momentOn&&!s&&v.editWhere&&v.preparedRev===v.rev?v.broke={why:um(v.scene,e,i,v.layout)??"it never happens in a whole cycle",where:v.editWhere}:(s||!i||t!==v.momentKey)&&(v.broke=void 0),v.momentKey=t,v.momentOn=s,Yh()}function Yh(){const i=document.getElementById("breaknote");if(!i)return;const e=v.broke,n=e&&(e.where==="figures"?v.tab==="figures":v.tab==="part")?`<div class="broke" role="alert"><b>This moment no longer happens</b> — ${Pe(e.why)}. <button data-undobreak="1">Undo that change</button></div>`:"";i.innerHTML!==n&&(i.innerHTML=n)}function ka(){lt(),ur(),bo()}let Fa,Sf=performance.now(),Fw=0;function Sm(i){const e=Math.min(.1,(i-Sf)/1e3);Sf=i,++Fw%20===0&&!Xe("#frame-hint").hidden&&fe.fitsAll()&&Mo();const t=v.angle;if(v.playing&&(v.angle+=e*v.speed*Dt),v.prepared){let a=$r(v.prepared,v.angle);if(a.ok&&v.playing&&!Br&&v.angle>t){const l=Ow(t,v.angle,a.value);l&&(v.angle=l.angle,a={ok:!0,value:l.pose,issues:[]})}if(a.ok)v.pose=a.value,v.poseFresh=!0,fe.show(a.value),Hw(a.value),Yi&&bm(a.value),v.figure&&(v.tab==="figures"||fe.isDragging)&&el(),v.issues.some(l=>l.code==="playback")&&(v.issues=v.issues.filter(l=>l.code!=="playback"),oi());else if(v.poseFresh){v.poseFresh=!1;const l=v.playing;v.playing=!1,v.stoppedByError=l,Un(),v.issues=[...v.issues.filter(c=>c.code!=="playback"),{code:"playback",severity:"error",message:`${l?"Stopped":"Can’t reach"} ${Sn(v.angle)}°: ${a.issues[0]?.message??"this linkage cannot reach this position."} Turn the crank back, or change the lengths.`,part:a.issues[0]?.part}],oi()}}else ri()&&fe.showEmpty(v.angle);if(fe.render(),oE(),aE(),uE(),Fa){const a=Xe("#moment");Fa.push({angle:v.angle,on:!!(v.pose&&Bn?.(v.pose)),shown:a.classList.contains("show"),opacity:+getComputedStyle(a).opacity})}const n=!v.pending&&!!v.prepared&&v.preparedRev!==v.rev,s=Xe("#stale");s.hidden===n&&(s.hidden=!n);const r=Xe("#bench-hint"),o=ri();r.hidden===o&&(r.hidden=!o),requestAnimationFrame(Sm)}let Bn,Br=!1,ao;function Ow(i,e,t){const n=Bn,s=v.prepared,r=v.cycle;if(!n||!s||!v.scene.moment)return;let o;if(r&&ao){const l=r.samples.length,c=r.turns*Dt/l;for(let u=Math.floor(i/c)+1;u*c<e;u++){if(!ao[(u%l+l)%l])continue;const h=$r(s,u*c);if(h.ok&&n(h.value)){o={angle:u*c,pose:h.value};break}}}if(!o){if(!n(t))return;o={angle:e,pose:t}}let a=i;for(let l=0;l<7&&o.angle-a>2e-4;l++){const c=(a+o.angle)/2,u=$r(s,c);u.ok&&n(u.value)?o={angle:c,pose:u.value}:a=c}return o}function Bw(i,e){const t=v.layout,n=s=>v.scene.figures.find(r=>r.id===s);for(const s of[e.a,e.b]){if(!s)continue;const o=("module"in s?v.scene.figures.filter(a=>a.part.startsWith(`${s.module}/`)).slice(0,1).map(a=>a.id):po(s)).map(a=>{const l=n(a);return l&&Ht(i,l,t)}).filter(a=>!!a);if(o.length)return o.reduce((a,l)=>[a[0]+l[0]/o.length,a[1]+l[1]/o.length,a[2]+l[2]/o.length],[0,0,0])}}const zw=6;let lo,wf=0;function wm(){Br=!1,lo=void 0,Xe("#moment").classList.remove("show")}function Hw(i){const e=v.scene.moment,t=Xe("#moment");if(!e||!Bn){(Br||t.classList.contains("show"))&&wm();return}const n=Bn(i);if(n&&(lo=Bw(i,e),wf=v.angle),n&&!Br&&(t.textContent=e.text,t.classList.add("show"),fe.celebrate(e.effect??"stars",lo)),Br=n,!(n||v.playing&&Math.abs(v.angle-wf)*180/Math.PI<zw)){t.classList.contains("show")&&(t.classList.remove("show"),fe.fadeEffects());return}Gw(t)}function Gw(i){const e=Xe("#stage"),t=e.clientWidth,n=e.clientHeight,s=lo&&fe.toScreen(lo),r=s?s.x:t/2,o=s?s.y:n*.2,a=i.offsetWidth,l=i.offsetHeight,c=34,u=o-c-l<8,h=Math.max(8+a/2,Math.min(t-8-a/2,r)),d=u?Math.min(n-l-8,o+c):o-c-l;i.style.left=`${h}px`,i.style.top=`${d}px`,i.style.setProperty("--tx",`${Math.max(14,Math.min(a-14,r-h+a/2))}px`),i.classList.toggle("below",u)}const Ef=i=>i.length<2?i.join(""):`${i.slice(0,-1).join(", ")} and ${i[i.length-1]}`,eh=i=>i===1?"once":i===2?"twice":`${i} times`;function tl(i,e=!0){if(!i||!v.cycle)return"";const t=Qn(v.scene,v.cycle,i,v.layout);if(!t)return"";if(t.broken)return`<p class="warn">This moment can’t happen on this machine: ${Pe(t.broken)} — that figure doesn’t move that way, or it’s gone.</p>`;const n=t.events%t.turns===0,s=n||t.turns===1?"every turn":`every ${t.turns} turns of the crank`,r=n?t.events/t.turns:t.events;if(!t.events)return`<p class="muted">Not with this machine yet: ${Pe(um(v.scene,v.cycle,i,v.layout)??"it never happens in a whole cycle")}.</p>`;const o=e?mw(v.scene,v.cycle,i,v.layout):void 0,a=o!==void 0&&o>40&&i.b&&"figure"in i.a&&"figure"in i.b?`<p class="note">When it happens, ${Pe(ii(v.scene,i.a.figure))} and ${Pe(ii(v.scene,i.b.figure))} are ${Math.round(o)} mm apart. If they should meet, choose “touches”.</p>`:"";return`<p class="ok">✓ It happens ${eh(r)} ${s}. Watch for it!</p>${a}`}const Vw={"early-bird":"cams","late-worm":"cams","waving-cat":"four-bar","sky-rower":"four-bar",blacksmith:"slider-crank","dancing-pair":"cams","clock-tower":"gears","owl-night":"gears + four-bar"};function tr(){const i=Hi(localStorage);ga=void 0,Xe("#scenes").innerHTML=Bi.map(e=>`<button class="scene ${e.id===v.scene.id?"on":""} ${$w(e.id)?"edited":""}" data-scene="${e.id}" title="${Pe(e.blurb)}"><b>${Pe(e.title)}</b><span>${Pe(Vw[e.id]??"")}</span><i class="editedmark" title="You’ve changed this example. “Restore original” (top bar) puts it back as it was made.">edited</i></button>`).join("")+`<button class="scene new ${v.scene.id.startsWith("new-")?"on":""}" data-new="1"><b>+ New sculpture</b><span>start from an empty bench</span></button>`,Xe("#mine").innerHTML=i.length?`<h2>Your sculptures</h2>${i.map(e=>`<div class="saved ${e.id===v.scene.id?"on":""}"><button data-open="${e.id}"><b>${Pe(e.name)}</b><span>${new Date(e.savedAt).toLocaleDateString()} · ${e.file.figures.filter(t=>t.part!=="world").length} figures</span></button><button class="x" data-delete="${e.id}" title="Delete this saved sculpture" aria-label="Delete ${Pe(e.name)}">×</button></div>`).join("")}`:"",Xe("#title").textContent=v.scene.title,Em()}let ga;const $w=i=>{const e=i===v.scene.id?v.scene:v.drafts[i];return!!e&&_h(e)};function Em(){const i=Bi.some(r=>r.id===v.scene.id),e=i&&_h(v.scene);!i&&ga?.id!==v.scene.id&&(ga={id:v.scene.id,saved:Hi(localStorage).some(r=>r.id===v.scene.id)});const t=!i&&!!ga?.saved;document.querySelector(`#scenes [data-scene="${CSS.escape(v.scene.id)}"]`)?.classList.toggle("edited",e);const n=document.getElementById("reset");if(!n)return;const s=i?"Restore original":t?"Back to last save":"Clear the bench";n.textContent!==s&&(n.textContent=s),n.disabled=i&&!e,n.title=i?e?`Put “${v.scene.title}” back as it was made (asks first)`:"This example is as it was made":t?"Go back to the version in your sculptures":"Take everything off the bench"}function Rr(i){Oa(),wm(),fe.clearEffects(),fe.setTrail(void 0),v.broke=void 0,v.momentKey=void 0,v.editWhere=void 0,v.slopeAsk=void 0,v.hintOpen=v.showAnswer=!1,km(),v.undo.push(yo()),v.drafts[v.scene.id]=v.scene,v.scene=i,v.rev++,v.selected=v.scene.project.modules[0]?.id??"",v.figure=void 0,v.scan=void 0,v.draft=void 0,v.prepared=void 0,v.pose=void 0,v.cycle=void 0,Bn=void 0,ao=void 0,v.tab=ri()?"part":v.tab,fe.setFigures(v.scene.figures),fe.setSky(v.scene.sky),fe.setView(v.scene.view),Cm(),tr(),fs(),ns()}const Tm="automata.views.v1",Am="automata.arrangeFront.v1";function Rm(){try{const i=JSON.parse(localStorage.getItem(Tm)??"{}");return i&&typeof i=="object"?i:{}}catch{return{}}}function Oa(i=v.scene.id){try{const e=Rm();e[i]=Cn&&fe.viewMode==="front"?Cn.view:fe.cameraState();const t=Object.keys(e);t.length>40&&delete e[t[0]],localStorage.setItem(Tm,JSON.stringify(e))}catch{}}let hr=!0,Ba=!1,th="";function Cm(){Cn=void 0,fe.setViewMode("free",!1),za(),Mo(),th="";const i=Rm()[v.scene.id];if(i&&fe.restoreCamera(i)){hr=!1,Ba=!1;return}fe.frameOpening(),hr=!0,Ba=!0}function Pm(){const i=v.layout?JSON.stringify(v.layout.bounds.min.concat(v.layout.bounds.max).map(e=>Math.round(e))):"empty";if(i!==th){if(th=i,Ba){Ba=!1,fe.frameOpening();return}if(hr){fe.frame(fe.viewMode==="free"?void 0:Oh[fe.viewMode]);return}fe.fitsAll()||Ww()}}function Ww(){const i=Xe("#frame-hint");i.hidden&&(i.hidden=!1)}function Mo(){const i=document.getElementById("frame-hint");i&&!i.hidden&&(i.hidden=!0)}function Xw(){Mo(),fe.frame(fe.viewMode==="free"?void 0:Oh[fe.viewMode])}function Tf(i){hr=!1,Cn=void 0,fe.setViewMode(i),za(),i!=="free"&&Mo()}function za(){document.querySelectorAll("#views [data-view]").forEach(e=>{const t=e.dataset.view===fe.viewMode;e.classList.toggle("on",t),e.setAttribute("aria-pressed",String(t))});const i=document.getElementById("view-note");i&&(i.textContent=fe.viewMode==="free"?"drag to look around":matchMedia("(pointer:coarse)").matches?"locked · drag to pan · pinch to zoom":"locked · drag to pan · wheel to zoom")}let Cn;const Lm=()=>{try{return localStorage.getItem(Am)!=="off"}catch{return!0}};function Im(){const i=v.tab==="figures"&&!!v.figure&&!!v.scene.figures.find(e=>e.id===v.figure&&e.part!=="world");if(i||(Ua=void 0),i&&!Cn&&Lm()&&!Qc&&v.figure!==Ua&&fe.viewMode!=="front")Cn={view:fe.cameraState(),mode:fe.viewMode},fe.setViewMode("front"),za();else if(!i&&Cn){const e=Cn;Cn=void 0,fe.viewMode==="front"&&(fe.setViewMode(e.mode,!1),fe.glideTo(e.view),za())}}function qh(i){return`${Sa[i.mechanism.kind]} “${i.id}”`}function Dm(i){return`<svg viewBox="0 0 22 22" class="icon" aria-hidden="true">${{cam:'<circle cx="11" cy="13" r="7"/><circle cx="13" cy="11" r="1.6"/><path d="M11 6V1"/>',"four-bar":'<path d="M3 17L7 9L17 5L19 17"/><circle cx="3" cy="17" r="1.4"/><circle cx="19" cy="17" r="1.4"/>',"slider-crank":'<circle cx="5" cy="14" r="4"/><path d="M8 12L16 8"/><rect x="14" y="5" width="6" height="6"/>',gears:'<circle cx="7" cy="12" r="5"/><circle cx="16" cy="9" r="4"/>'}[i]}</svg>`}function Yw(){const i=v.scene.project,e=ip(i),t=i.modules.length>=Xr;e.some(n=>n.id===v.addOn)||(v.addOn="motor"),Xe("#palette").innerHTML=`<div class="palette"><label class="on"><b>Add a part</b> on <select id="add-on" aria-label="Which shaft the new part goes on">${e.map(n=>`<option value="${n.id}" ${n.id===v.addOn?"selected":""}>${Pe(n.label)}</option>`).join("")}</select></label>
  <div class="families">${["cam","four-bar","slider-crank","gears"].map(n=>`<button data-add="${n}" ${t?"disabled":""} title="Add a ${Sa[n].toLowerCase()} on the chosen shaft">${Dm(n)}${n==="four-bar"?"Four-bar":Sa[n]}</button>`).join("")}</div>
  ${t?`<p class="hint">That’s ${Xr} parts, the most one crank can drive here.</p>`:ri()?'<p class="hint">Everything turns from the crank. Parts only go where a shaft really turns: the crank’s shaft, or later the output of a gear pair.</p>':""}</div>`}let cs=!1,Cr=null,nh=!1;function Nm(i){const e=document.querySelector("aside");if(!e){i();return}const t=Cr&&e.contains(Cr)&&Cr.isConnected?Cr:null;if(!t){i();return}const n=t.closest("[data-kit],[data-fig],[data-mod],[data-add],[data-scene],[data-open],[data-tab],[data-m],[data-f],[data-fix],[data-together],[data-setmoment]"),s=n?[...n.attributes].find(h=>h.name.startsWith("data-")):void 0,r=s?`[${s.name}="${CSS.escape(s.value)}"]`:void 0,o=t.closest("aside > section, aside > nav"),a=n?.getBoundingClientRect().top,l=o?.getBoundingClientRect().top;i();const c=r?e.querySelector(r):null,u=c&&a!==void 0?c.getBoundingClientRect().top-a:o?.isConnected&&l!==void 0?o.getBoundingClientRect().top-l:0;Math.abs(u)>.5&&(e.scrollTop+=u)}function Um(i){const e=document.activeElement,t=document.getElementById("module-editor"),n=e&&t?.contains(e)?[...e.attributes].find(s=>s.name.startsWith("data-")):void 0;if(i(),n){const s=document.querySelector(`#module-editor [${n.name}="${CSS.escape(n.value)}"]`);s&&s!==document.activeElement&&s.focus({preventScroll:!0})}}function lt(){Nm(()=>Um(qw))}function qw(){const i=v.scene.project;Xe("#modules").innerHTML=i.modules.length?dr(i).map(t=>i.modules.find(n=>n.id===t)).map(t=>{const[n,s]=dh(t),r=v.scene.figures.filter(o=>o.part.startsWith(`${t.id}/`)).map(o=>o.id);return`<button class="mod ${t.id===v.selected?"on":""}" data-mod="${t.id}">${Dm(t.mechanism.kind)} ${Pe(qh(t))}<small>layers ${n}–${s} · ${t.drive.source==="motor"?"on the crank":`on “${Pe(t.drive.source)}”`} · timing ${Sn(t.drive.phase)}°${r.length?` · ${Pe(r.join(", "))}`:""}</small></button>`}).join(""):'<p class="empty">An empty bench: just the crank and its shaft. Add a part below — a cam is the easiest start.</p>',Yw();const e=document.activeElement instanceof HTMLSelectElement&&!!document.getElementById("module-editor")?.contains(document.activeElement)&&!nh;nh=!1,cs||e||v.stroke&&document.getElementById("sketch")?Vi=!0:(Vi=!1,_a=v.tab,v.tab==="figures"?eE():v.tab==="moment"?zm():Zw()),document.querySelectorAll("#tabs [data-tab]").forEach(t=>{t.classList.toggle("on",t.dataset.tab===_a),t.setAttribute("aria-selected",String(t.dataset.tab===_a))}),oi(),Fm(),oo(),Qa(),el(),Im()}let _a="part";function Zw(){const i=_n(),e=Xe("#module-editor");if(!i){e.innerHTML=ri()?"":'<p class="hint">Choose a part above to shape it.</p>';return}const[t,n]=dh(i),s=dr(v.scene.project),r=s.indexOf(i.id),o=uh(v.scene.project,i.id),a=`<div class="parthead"><h3>${Pe(qh(i))}</h3>
  <div class="stack"><button data-shift="-1" ${r===0?"disabled":""} title="Move this part one place toward you (the front, where the hand crank is)">▲ toward you</button><span>layers ${t}–${n}</span><button data-shift="1" ${r===s.length-1?"disabled":""} title="Move this part one place toward the back board">▼ toward the back</button></div>
  <button class="remove" data-remove="${i.id}" title="Remove this part${o.length?" and what it drives":""}">Remove${o.length?` (+${o.length})`:""}</button></div>`,l=`<label class="row">Timing <input type="range" min="0" max="359" step="1" value="${Sn(i.drive.phase)}" data-phase="${i.id}"><output>${Sn(i.drive.phase)}°</output></label>
  <p class="hint">Timing turns this part on its shaft, so it moves earlier or later than the others.</p>`,c=h=>`<label class="row">${h} <input type="range" min="0" max="355" step="5" value="${Sn(i.placement.angle)}" data-dir="${i.id}"><output>${Sn(i.placement.angle)}°</output></label>`,u=v.fixNote?`<p class="fixnote">${Pe(v.fixNote)}</p>`:"";if(i.mechanism.kind==="cam"){const h=i.mechanism.parameters,d=Wr(h),f=d.tooSteep.length?`<div class="warn"><b>The follower would jam.</b> Between ${d.tooSteep.map(([g,y])=>`${Math.round(g*360)}°–${Math.round(y*360)}°`).join(", ")} the drawing climbs so steeply that the cam pushes the roller sideways more than it lifts it (${d.peakDeg.toFixed(0)}° against a ${d.limitDeg.toFixed(0)}° limit). Nothing is smoothed for you. Choose a fix:
    ${jw(i.id,h)??Jw(h)}${u}</div>`:`<div class="ok">Every part of this motion is gentle enough (steepest push ${d.peakDeg.toFixed(0)}° of ${d.limitDeg.toFixed(0)}°).${u}</div>`;Xe("#module-editor").innerHTML=`${a}<h3>Draw the motion</h3><p class="hint">Drag across the chart: left to right is one turn of this cam, up is how high “${Pe(i.id)}” rises. Redraw any part to change just that part. Flat stretches become pauses.</p>
   <div id="sketchpad"><canvas id="sketch" width="560" height="220"></canvas></div>${f}
   <label class="row">Cam size <input type="range" min="12" max="100" step="2" value="${h.baseRadius}" data-base="${i.id}"><output>${h.baseRadius} mm</output></label>${l}`,sE()}else if(i.mechanism.kind==="four-bar"){const h=i.mechanism.parameters,d=(m,p,x,S)=>`<label class="row">${p} <input type="range" min="${x}" max="${S}" step="1" value="${h[m]}" data-bar="${m}"><output>${h[m]} mm</output></label>`,f=ya(h),y=f.ok&&f.value.fullRotation?'<div class="ok">The crank turns all the way round; the rocker swings back and forth.</div>':`<div class="warn"><b>This linkage locks part way round.</b> At some crank angles the coupler and rocker can’t reach each other, so the machine jams there. Usually the crank is too long for the other bars. <div class="fixes"><button data-fix="linkage">Make it turn all the way round</button><span>…or change the lengths yourself.</span></div>${u}</div>`;e.innerHTML=`${a}<p class="hint">Four bars pinned in a loop. The short crank turns all the way round; the rocker swings back and forth; a point on the coupler draws a loop.</p>
   ${d("crank","Crank",8,80)}${d("coupler","Coupler",30,200)}${d("rocker","Rocker",20,160)}${d("ground","Ground",30,200)}${y}
   ${c("Point it")}<label class="row">Assembly <span><button data-flip="${i.id}">Flip the elbow</button></span><output>${h.branch>0?"up":"down"}</output></label>${l}`}else if(i.mechanism.kind==="slider-crank"){const h=i.mechanism.parameters,d=(m,p,x,S)=>`<label class="row">${p} <input type="range" min="${x}" max="${S}" step="1" value="${h[m]}" data-slide="${m}"><output>${h[m]} mm</output></label>`,f=Bf(h),y=f.ok&&f.value.fullRotation?`<div class="ok">The slider travels ${Math.round(2*h.crank)} mm and back each turn${h.guideOffset?" (a little further one way: the guide is offset)":""}.</div>`:`<div class="warn"><b>The rod can’t reach the guide all the way round.</b> The rod has to be longer than the crank plus the guide’s offset (${h.crank}+${Math.abs(h.guideOffset)} mm), or the slider jams. <div class="fixes"><button data-fix="rod">Make the rod long enough</button><span>…or shorten the crank.</span></div>${u}</div>`;e.innerHTML=`${a}<p class="hint">A crank drives a rod that pushes a slider back and forth in a straight guide. The slider travels twice the crank’s length.</p>
   ${d("crank","Crank",5,60)}${d("rod","Rod",20,200)}${d("guideOffset","Guide offset",-40,40)}${y}${c("Point it")}${l}`}else{const h=i.mechanism.parameters,d=h.teethB/h.teethA,f=(y,m,p,x,S=1,_="")=>`<label class="row">${m} <input type="range" min="${p}" max="${x}" step="${S}" value="${h[y]}" data-gear="${y}"><output>${h[y]}${_}</output></label>`,g=v.scene.project.modules.filter(y=>y.drive.source===i.id);e.innerHTML=`${a}<p class="hint">A small gear drives a bigger one on a second shaft. That shaft turns ${d>1?`${+d.toFixed(2)} times slower`:d<1?`${+(1/d).toFixed(2)} times faster`:"at the same speed"}, the other way round. Parts on it are driven from its output.</p>
   ${f("teethA","Driving teeth",18,80)}${f("teethB","Driven teeth",18,80)}${f("module","Tooth size",1,4,.5," mm")}
   <p class="note">Shafts ${tp(h).toFixed(0)} mm apart. ${g.length?`Driving ${g.map(y=>`“${Pe(y.id)}”`).join(", ")}; ${g.length>1?"they move":"it moves"} with the output shaft.`:"Nothing on its output yet: choose it in “Add a part”."}</p>
   ${c("Output points")}${l}`}e.insertAdjacentHTML("beforeend",'<div id="breaknote"></div>'),Yh()}const co=i=>JSON.stringify([i.baseRadius,i.knots]);function Af(i,e){const t=e.fromDeg,n=e.toDeg,s=Wr(e.spec).tooSteep.length>0,r=e.gentle&&s;Jt(a=>{const l=a.project.modules.find(c=>c.id===i);l.mechanism={kind:"cam",parameters:e.spec}});const o=e.cuts.length?` It shortened ${e.cuts.map(Qf).join(" and ")}.`:" No pause was shortened.";v.fixNote=r?`Widened the steepest climb just enough (${t.toFixed(0)}° → ${n.toFixed(0)}°).${o} Another part is still too steep: press it again for that one, make the cam bigger, or redraw it.`:s?`Widened the steepest climb as far as there’s room (${t.toFixed(0)}° → ${n.toFixed(0)}°).${o} It’s still too steep there: try “Make the cam bigger”, or redraw that part.`:`Widened the steepest climb just enough (${t.toFixed(0)}° → ${n.toFixed(0)}°), keeping its shape.${o}`,lt()}const br=new Map;function Kw(i){const e=co(i);let t=br.get(e);return t||(t={big:Jf(i),plan:jf(i)},br.size>40&&br.delete(br.keys().next().value),br.set(e,t)),t}function Jw(i){const{big:e,plan:t}=Kw(i),n=e?`<button data-fix="bigger" title="Keeps your drawing exactly; the cam grows to ${e.baseRadius} mm">Make the cam bigger <small>(to ${e.baseRadius} mm)</small></button>`:'<button data-fix="bigger" disabled aria-describedby="why-bigger">Make the cam bigger</button><span class="why" id="why-bigger">No cam up to 100 mm is big enough for a climb this sudden.</span>',s=t?`<button data-fix="longer" title="${t.cuts.length?"Shows you first which pause it would shorten":"Widens the climb into the stretch beside it; no pause is shortened"}">Give the steepest part more of the turn${t.cuts.length?"…":""}</button>`:'<button data-fix="longer" disabled aria-describedby="why-longer">Give the steepest part more of the turn</button><span class="why" id="why-longer">There’s no room beside the steepest part to widen it.</span>';return`<div class="fixes">${n}${s}<span>…or redraw it more gently.</span></div>`}function jw(i,e){const t=v.slopeAsk;if(!(!t||t.module!==i)){if(t.key!==co(e)){v.slopeAsk=void 0;return}return`<div class="ask" role="alertdialog" aria-label="Shorten a pause?"><b>This will shorten ${Pe(t.plan.cuts.map(Qf).join(" and "))}.</b> The dashed line on the chart shows the motion afterwards${t.plan.gentle?"":" (and it would still be too steep there)"}.
  <div class="fixes"><button data-slopeyes="1" class="primary">Shorten the pause</button><button data-slopeno="1">Keep my pause</button></div></div>`}}let Rf="",ih=0;function Qw(i){if(i===Rf)return;Rf=i;const e=Xe("#scan-result");if(clearTimeout(ih),!i){e.classList.remove("show");return}e.innerHTML=`${i}<button class="x" data-dismissscan="1" title="Close" aria-label="Close the collision result">×</button>`,e.classList.add("show"),ih=window.setTimeout(()=>e.classList.remove("show"),9e3)}function km(){clearTimeout(ih),Xe("#scan-result").classList.remove("show")}function oi(){const i=v.issues.filter(r=>r.severity==="error"),e=v.issues.filter(r=>r.severity==="warning"&&r.code!=="cam-sampled-checks"),t=v.scan==="running"?"<p>Turning the machine slowly, checking every part against every other…</p>":v.scan?v.scan.status==="sampled-clear"?`<p class="ok">No machine parts collide at ${v.scan.samples} positions ${v.cycle&&v.cycle.turns>1?`over the whole ${v.cycle.turns}-turn cycle`:"around the turn"}. (A sampled check: good evidence, not a guarantee. Scenery and figures are decoration and aren’t checked.)</p>`:v.scan.status==="collision"?`<p class="warn">${v.scan.collisions.length} collision${v.scan.collisions.length>1?"s":""}: ${[...new Set(v.scan.collisions.map(r=>`${r.a} hits ${r.b}`))].slice(0,4).map(Pe).join("; ")}. The parts are shown in red.</p>`:`<p class="warn">${Pe(v.scan.issues[0]?.message??"The scan could not complete.")}</p>`:"",n=Gi()?v.shafts.clashes.map(r=>r.kind==="crank"?`<p class="warn"><b>The hand crank has nowhere to go:</b> “${Pe(r.part)}” (layer ${r.layer}) sweeps across the main shaft in front, and something does behind too, so the crank can’t fit on either end. Move that part toward the back or toward you, or change its shape.</p>`:`<p class="warn"><b>${Pe(r.module)}:</b> its ${Pe(r.part.split("/")[1])} sweeps through the steel ${r.shaft==="motor"?"main shaft":`shaft of “${Pe(r.shaft)}”`} at ${Sn(r.phase)}° (layer ${r.layer}). This is a sampled check of the steel rod, like the collision scan. Move “${Pe(r.module)}” toward you or toward the back so the shaft doesn’t have to pass its layer.</p>`).join(""):"",s=Gi()&&v.shaftsChecked===!1?'<p class="note"><b>Shafts not checked:</b> the machine couldn’t be solved at any sampled position, so the steel rods haven’t been checked against the parts.</p>':Gi()&&v.shaftGap?`<p class="note"><b>Shafts partly checked:</b> ${v.shaftGap} sampled position${v.shaftGap>1?"s":""} of the turn couldn’t be solved, so the rod check doesn’t cover ${v.shaftGap>1?"them":"it"}.</p>`:"";Xe("#issues").innerHTML=`${v.pending?'<p class="muted">Building…</p>':""}
  ${i.map(r=>`<p class="warn"><b>${Pe(r.part??"Machine")}:</b> ${Pe(r.message)}${v.prepared?' <span class="muted">(still showing the last machine that worked)</span>':""}</p>`).join("")}
  ${e.map(r=>`<p class="note"><b>${Pe(r.part??"Note")}:</b> ${Pe(r.message)}</p>`).join("")}${n}${s}${t}`,Qw(v.scan&&v.scan!=="running"?t:""),fe?.setHighlight([...v.scan&&v.scan!=="running"?v.scan.collisions.flatMap(r=>[r.a,r.b]):[],...Gi()?v.shafts.clashes.map(r=>r.part):[]])}function bo(){Nm(Fm)}function Fm(){const i=v.scene.goal,e=v.scene.moment,t=tl(e,!1),n=e?`<p class="own" title="${Pe(`“${e.text}” ${jc(v.scene,e,v.cycle)}`)}"><b>Your moment:</b> “${Pe(e.text)}” ${Pe(jc(v.scene,e,v.cycle))}.</p>`:'<p class="own muted">No moment yet. Put a figure or two on your machine, then choose what it’s about in the Moment tab.</p>',s=v.scene.answer?v.showAnswer?`<p class="answer">${Pe(v.scene.answer)}</p>`:'<button data-showme="1" class="small">Show me the answer</button>':"",r=v.scene.hint?`<details id="hint" ${v.hintOpen?"open":""}><summary>A hint</summary><p class="muted">${Pe(v.scene.hint)}</p>${s}</details>`:"",o=`${i?`<p class="goaltext">${Pe(i)}</p>`:n}<div class="gstatus">${t}</div>${r}`,a=Xe("#goal");a.innerHTML!==o&&(a.innerHTML=o),a.hidden=!1}let Sr;const Zh=()=>v.scene.figures.filter(i=>i.part!=="world"),Om=()=>v.scene.project.modules.flatMap(i=>lp(i).map(e=>({m:i,a:e,value:`${i.id}|${e.anchor}`,label:`${i.id} · ${e.label}`})));let ps="";function eE(){const i=Xe("#module-editor"),e=Zh(),t=Om();if(!t.length){i.innerHTML='<p class="hint">Figures ride moving parts. Add a part first, then come back to put a character on it.</p>';return}t.some(o=>o.value===ps)||(ps=t.find(o=>o.m.id===v.selected)?.value??t[0].value),Sr??=aw(Da.map(o=>o.kind));const n=e.find(o=>o.id===v.figure),s=e.length?`<div class="chips">${e.map(o=>`<button class="chip ${o.id===v.figure?"on":""}" data-fig="${o.id}">${Sr?.[o.kind]?`<img src="${Sr[o.kind]}" alt="">`:""}${Pe(o.id)}</button>`).join("")}</div>`:'<p class="hint">No characters yet. Pick a spot and a figure below.</p>',r=`<div class="kit">${Da.map(o=>`<button data-kit="${o.kind}" title="${Pe(o.name)}">${Sr?.[o.kind]?`<img src="${Sr[o.kind]}" alt="">`:""}<span>${Pe(o.name)}</span></button>`).join("")}</div>`;i.innerHTML=`<h3>Figures</h3>${s}${n?tE(n):'<div id="breaknote"></div>'}
  <div class="palette"><h3>Add a figure</h3><label class="on">on <select id="add-at" aria-label="Where the figure rides">${t.map(o=>`<option value="${o.value}" ${o.value===ps?"selected":""}>${Pe(o.label)}</option>`).join("")}</select></label>${r}
  <p class="hint">Figures are rigid art riding a part: they move exactly as that point of the machine moves. They aren’t cut or collision-checked.</p></div>`,Yh()}function tE(i){const e=v.scene.project.modules.find(l=>l.id===i.part.split("/")[0]),t=e?ph(e,i.part):void 0,n=i.nudge??[0,0],s=t!==void 0?Zi(n,t):n,r=V1(i.kind),o=t!==void 0?["Left – right","Down – up"]:["Along the part","Across the part"],a=(l,c,u,h,d,f=1,g=" mm")=>`<label class="row">${c} <input type="range" min="${h}" max="${d}" step="${f}" value="${u}" data-f="${l}"><output>${Math.round(u*100)/100}${g}</output></label>`;return`<div class="figed"><div class="parthead"><h3>The ${Pe(i.id)}</h3><button class="remove" data-unfig="${i.id}">Remove</button></div>
  <label class="row">Figure <select data-f="kind">${Da.map(l=>`<option value="${l.kind}" ${l.kind===i.kind?"selected":""}>${Pe(l.name)}</option>`).join("")}</select><span></span></label>
  <div class="row"><span>Colour</span><span class="swatches">${(r?.colors??[]).map(l=>`<button class="sw ${l===(i.color??r?.colors[0])?"on":""}" style="background:${l}" data-color="${l}" aria-label="colour ${l}"></button>`).join("")}<input type="color" value="${i.color??r?.colors[0]??"#cccccc"}" data-f="color" aria-label="Any colour"></span><span></span></div>
  ${a("scale","Size",i.scale??1,.4,2.5,.05,"×")}${a("x",o[0],Math.round(s[0]),-ln,ln)}${a("y",o[1],Math.round(s[1]),-ln,ln)}
  <label class="row depth">Depth <span class="depthrange"><input type="range" min="${lr[0]}" max="${lr[1]}" step="1" value="${Math.round(i.dz??0)}" data-f="dz" aria-label="Depth: left moves it toward the back, right moves it toward you"><span class="ends" aria-hidden="true"><span>← toward the back</span><span>toward you →</span></span></span><output>${Xh(i.dz??0)}</output></label>
  ${nE(i)}
  ${a("turn","Turn",Math.round((i.turnZ??0)*180/Math.PI),-180,180,5,"°")}
  ${a("face","Facing",Math.round(((i.turnY??0)*180/Math.PI+540)%360-180),-180,180,15,"°")}
  ${(()=>{const l=wi(ro());return l&&[l.w.figure,l.w.touch].includes(i.id)?`<div class="touchinfo">${$h(ro())}</div>`:""})()}
  <div id="breaknote"></div>
  <p class="hint">${t!==void 0?"This part only slides, so the figure stays level.":"This part turns, so the figure turns with it — rigidly, like a real automaton."} Drag a figure in the 3D view to move it along its part’s plane: the dotted trail shows where its contact point goes in one whole cycle. Moving a figure off its spot adds a wooden dowel that holds it there. The Front view shows left–right and up–down squarely; the Side view shows depth (dragging there moves it toward you or back). Facing turns it to look toward you or toward the back.</p></div>`}function nE(i){const e=v.cycle;if(!e||!Gi()||i.part==="world")return"";const t=Math.max(1,Math.ceil(e.samples.length/48)),n=e.samples.filter((a,l)=>l%t===0&&a.pose).map(a=>({angle:a.angle,pose:a.pose})),s=Mw(i,n,v.layout??zn);if(!s.length)return"";const r=a=>{const[l,c]=a.split("/");return`“${Pe(l)}” (its ${Pe(c)})`},o=a=>e.turns>1?"":a.to-a.from<.05?` at ${Sn(a.from)}°`:a.to-a.from>Math.PI?` at times between ${Sn(a.from)}° and ${Sn(a.to)}°`:` around ${Sn(a.from)}°–${Sn(a.to)}°`;return`<p class="note sweep" role="note">The ${Pe(i.id)}’s body passes through ${s.slice(0,2).map(a=>`${r(a.part)}${o(a)}`).join(" and ")}. Figures aren’t collision-checked; move it with Depth (toward you or toward the back) or to one side to clear it.</p>`}function iE(i){const e=Om().find(a=>a.value===ps);if(!e)return;let t=1;for(;v.scene.figures.some(a=>a.id===(t===1?i:`${i}-${t}`));)t++;const n=t===1?i:`${i}-${t}`,s=e.a.steady,r=cp.includes(i),o={id:n,kind:i,part:e.a.part,at:[...e.a.at],anchor:e.a.anchor,dz:3,scale:1.2,...s?{upright:!0}:{turnZ:r?0:-Math.PI/2}};hn(a=>{a.figures.push(o)},""),v.figure=n,lt(),Mt(`The ${n} is riding ${/^the /.test(e.a.label)?e.a.label:`the ${e.a.label}`} of “${e.m.id}”. Turn the crank and watch it go.`)}const Bm=i=>v.scene.figures.filter(e=>e.id!==i&&(e.part!=="world"||l0.includes(e.kind)));function zm(){const i=Xe("#module-editor"),e=Zh(),t=v.cycle,n=v.scene.moment;if(!e.length||!t){i.innerHTML=`<h3>Moments</h3><p class="hint">${e.length?"Building the machine…":"A moment is about figures: “when the hen’s beak touches the worm”, or “when the frog is up and the star is down”. Put a figure or two on your machine first (Figures tab)."}</p>${n?`<p>Current moment: “${Pe(n.text)}”</p>`:""}`;return}const s=!!n&&!("module"in n.a),r=s?n:Mm(v.draft)??Hm();s||(v.draft=r);const o=(a,l)=>{const c=a&&"figure"in a?a.figure:"",u=a&&"pick"in a?a.pick:a&&"touch"in a?"touch":"",h=`<select data-m="${l}-fig" aria-label="${l==="a"?"First":"Second"} figure">${l==="b"?`<option value="" ${a?"":"selected"}>(nothing else)</option>`:""}${e.map(S=>`<option value="${S.id}" ${S.id===c?"selected":""}>the ${Pe(S.id)}</option>`).join("")}${a&&"module"in a?`<option selected value="">“${Pe(a.module)}” ${Pe(a.output)} (authored)</option>`:""}</select>`,d=e.find(S=>S.id===c),f=d?vo(t,d):void 0,g=!!d&&xo(t,d,f),y=d?ja(f,g):[],m=d?Bm(d.id):[],p=d?`<select data-m="${l}-pick" aria-label="What happens">${m.length?`<option value="touch" ${u==="touch"?"selected":""}>touches</option>`:""}${y.map(S=>`<option value="${S}" ${S===u?"selected":""}>${g?`points ${S}`:S==="up"||S==="down"?`is ${S}`:Jc[S]}</option>`).join("")}</select>`:"",x=a&&"touch"in a?`<select data-m="${l}-touch" aria-label="What it touches">${m.map(S=>`<option value="${S.id}" ${S.id===a.touch?"selected":""}>the ${Pe(S.id)}</option>`).join("")}</select>
   <label class="within">within <input type="number" min="1" max="200" step="1" value="${Math.round(a.within)}" data-m="${l}-within" aria-label="How close counts as touching (mm)"> mm</label>`:"";return`${h} ${d&&!y.length&&!m.length?'<span class="muted">(barely moves)</span>':p} ${x}`};i.innerHTML=`<h3>Moments</h3><p class="hint">A moment is what your sculpture is about: pick when it happens, and what it says. “Touches” means the two figures really meet on screen (beak to worm, hammer to anvil). The timeline lights up as you choose: green where each part holds, gold where the moment happens.</p>
  <div class="momented"><div class="mrow"><span>When</span>${o(r.a,"a")}</div><div class="mrow"><span>and</span>${o(r.b,"b")}</div>
  ${wi(r)?`<div class="touchinfo" id="touchinfo">${$h(r)}</div>`:""}
  <label class="mrow"><span>say</span><input type="text" maxlength="140" data-m="text" value="${Pe(r.text)}" aria-label="What the sculpture says"></label>
  <label class="mrow"><span>with</span><select data-m="effect">${ap.map(a=>`<option value="${a}" ${a===(r.effect??"stars")?"selected":""}>${a}</option>`).join("")}</select></label>
  <div id="momentstatus">${tl(r)}</div>
  <div class="fixes">${s?'<span>Changes apply as you make them (undo to go back).</span><button data-clearmoment="1">Remove the moment</button>':`<button data-setmoment="1" class="primary">Set this moment</button>${n?'<button data-clearmoment="1">Remove the moment</button>':""}`}</div></div>
  ${n&&!s?`<p class="note">Now: “${Pe(n.text)}” ${Pe(jc(v.scene,n,v.cycle))}.</p>`:""}`}function Hm(){const i=Zh(),e=v.cycle,t=(r,o)=>{const a=vo(e,r),l=ja(a,xo(e,r,a));return l.includes(o)?o:l[0]??"up"},n={figure:i[0].id,pick:t(i[0],"up")},s=i[1]?{figure:i[1].id,pick:t(i[1],"down")}:void 0;return{text:"Ta-da!",a:n,b:s,effect:"stars"}}let sh;function sE(){sh=Xe("#sketch");const i=sh,e=Xe("#sketchpad"),t=n=>{const s=i.getBoundingClientRect();return{phase:Math.max(0,Math.min(.9999,(n.clientX-s.left)/s.width)),lift:Math.max(0,Math.min(Ks,(1-(n.clientY-s.top)/s.height)*Ks))}};e.onpointerdown=n=>{e.setPointerCapture(n.pointerId),v.stroke=[t(n)]},e.onpointermove=n=>{v.stroke&&v.stroke.push(t(n))},e.onpointerup=()=>{const n=v.stroke;v.stroke=void 0,n&&n.length>2?rE(n):Vi&&lt()},e.onpointercancel=e.onlostpointercapture=()=>{v.stroke=void 0,Vi&&lt()}}let Vi=!1;function rE(i){const e=_n();if(!e||e.mechanism.kind!=="cam")return;const t=jg(e.mechanism.parameters.knots,i);t&&Jt(n=>{const s=n.project.modules.find(r=>r.id===e.id);s.mechanism.kind==="cam"&&(s.mechanism.parameters.knots=t)})}function oE(){const i=sh;if(!i||!i.isConnected)return;const e=_n();if(!e||e.mechanism.kind!=="cam")return;const t=i.getContext("2d"),n=i.width,s=i.height,r=e.mechanism.parameters;t.clearRect(0,0,n,s),t.fillStyle="#fbf4e6",t.fillRect(0,0,n,s);const o=h=>h*n,a=h=>s-h/Ks*s;for(const[h,d]of Wr(r,180).tooSteep)t.fillStyle="rgba(200,60,40,.16)",t.fillRect(o(h),0,o(d)-o(h),s);t.strokeStyle="#e6d7bd",t.lineWidth=1;for(let h=1;h<4;h++)t.beginPath(),t.moveTo(o(h/4),0),t.lineTo(o(h/4),s),t.stroke();for(let h=10;h<Ks;h+=10)t.beginPath(),t.moveTo(0,a(h)),t.lineTo(n,a(h)),t.stroke();t.fillStyle="#a08b6a",t.font="11px system-ui",["0°","90°","180°","270°"].forEach((h,d)=>t.fillText(h,o(d/4)+3,s-4)),t.fillText(`${Ks} mm`,3,11),t.strokeStyle="#5b3a24",t.lineWidth=3,t.beginPath();for(let h=0;h<=n;h++){const d=xa(r.knots,h/n).lift;h?t.lineTo(h,a(d)):t.moveTo(h,a(d))}t.stroke(),t.fillStyle="#c9a24a";for(const h of r.knots)t.beginPath(),t.arc(o(h.phase),a(h.lift),3.5,0,Dt),t.fill();const l=v.slopeAsk&&v.slopeAsk.module===e.id&&v.slopeAsk.key===co(r)?v.slopeAsk.plan:void 0;if(l){t.fillStyle="rgba(224,128,32,.24)";for(const d of l.cuts){const[f,g]=d.side==="after"?[l.from[1],l.to[1]]:[l.to[0],l.from[0]];t.fillRect(o(f),0,o(g)-o(f),s)}t.setLineDash([7,5]),t.strokeStyle="#2f64b5",t.lineWidth=2.5,t.beginPath();for(let d=0;d<=n;d++){const f=xa(l.spec.knots,d/n).lift;d?t.lineTo(d,a(f)):t.moveTo(d,a(f))}t.stroke(),t.setLineDash([]),t.font="bold 12px system-ui";const h="after the change";t.fillStyle="rgba(251,244,230,.9)",t.fillRect(n-t.measureText(h).width-44,3,t.measureText(h).width+40,16),t.strokeStyle="#2f64b5",t.setLineDash([5,3]),t.beginPath(),t.moveTo(n-t.measureText(h).width-40,11),t.lineTo(n-t.measureText(h).width-14,11),t.stroke(),t.setLineDash([]),t.fillStyle="#2f64b5",t.fillText(h,n-t.measureText(h).width-8,15)}v.stroke&&(t.strokeStyle="rgba(60,110,170,.7)",t.lineWidth=2,t.beginPath(),v.stroke.forEach((h,d)=>d?t.lineTo(o(h.phase),a(h.lift)):t.moveTo(o(h.phase),a(h.lift))),t.stroke());const c=v.pose?.outputs[e.id],u=c?(c.inputAngle%Dt+Dt)%Dt/Dt:void 0;u!==void 0&&(t.strokeStyle="#2f6f4f",t.lineWidth=2,t.beginPath(),t.moveTo(o(u),0),t.lineTo(o(u),s),t.stroke(),t.fillStyle="#2f6f4f",t.beginPath(),t.arc(o(u),a(c.lift),5,0,Dt),t.fill())}function aE(){const i=Xe("#crank"),e=i.getContext("2d"),t=i.width/2;e.clearRect(0,0,i.width,i.height),e.strokeStyle="#8a5a3a",e.lineWidth=6,e.beginPath(),e.arc(t,t,t-8,0,Dt),e.stroke();const n=-v.angle,s=t+Math.cos(n)*(t-8),r=t+Math.sin(n)*(t-8);e.strokeStyle="#5b3a24",e.lineWidth=5,e.beginPath(),e.moveTo(t,t),e.lineTo(s,r),e.stroke(),e.fillStyle="#c9a24a",e.beginPath(),e.arc(s,r,9,0,Dt),e.fill()}function lE(){const i=Xe("#crank");let e;const t=n=>{const s=i.getBoundingClientRect();return-Math.atan2(n.clientY-s.top-s.height/2,n.clientX-s.left-s.width/2)};i.onpointerdown=n=>{i.setPointerCapture(n.pointerId),e=t(n),v.playing=!1,Un()},i.onpointermove=n=>{if(e===void 0)return;const s=t(n);let r=s-e;r>Math.PI&&(r-=Dt),r<-Math.PI&&(r+=Dt),v.angle+=r,e=s},i.onpointerup=()=>{e=void 0}}const Un=()=>{Xe("#play").textContent=v.playing?"❚❚ Pause":"▶ Turn"};function cE(i,e){if(!e)return NaN;const t=i.mechanism.kind;return t==="cam"?e.lift:t==="four-bar"?e.rockerAngle:t==="slider-crank"?e.sliderX:(e.outputAngle%Dt+Dt)%Dt}function ur(){const i=v.prepared,e=Xe("#timeline"),t=v.cycle;if(!i||!t){ri()&&(e.innerHTML='<p class="lanekey">Each part’s motion will appear here as a line across one whole turn.</p>');return}const n=t.samples.length,s=v.tab==="moment"&&v.draft?v.draft:v.scene.moment,r=s?Qn(v.scene,t,s,v.layout):void 0,o=h=>h?"module"in h?[h.module]:po(h).map(d=>v.scene.figures.find(f=>f.id===d)?.part.split("/")[0]).filter(d=>!!d):[],a=o(s?.a),l=o(s?.b),c=dr(i.project).map(h=>i.project.modules.find(d=>d.id===h)).map(h=>{const d=t.samples.map(R=>cE(h,R.pose?.outputs[h.id])),f=d.filter(Number.isFinite),g=Math.min(...f),y=Math.max(...f),m=y-g||1,p=h.mechanism.kind==="gears";let x="",S=!1;d.forEach((R,M)=>{if(!Number.isFinite(R)){S=!1;return}const A=(M/(n-1)*100).toFixed(2),C=(28-(R-g)/m*24).toFixed(2),L=p&&M>0&&Math.abs(R-d[M-1])>Math.PI;x+=`${S&&!L?"L":"M"}${A},${C} `,S=!0});const _=r?a.includes(h.id)?r.a:l.includes(h.id)&&r.b?r.b:void 0:void 0,w=_?_.map((R,M)=>R?`<rect x="${(M/n*100).toFixed(2)}" y="0" width="${(100/n+.05).toFixed(2)}" height="30" class="${r.both[M]?"hit":"win"}"/>`:"").join(""):"",b=v.scene.figures.filter(R=>R.part.startsWith(`${h.id}/`)).map(R=>R.id);return`<div class="lane ${h.id===v.selected?"on":""}"><span data-mod="${h.id}" title="Shape ${Pe(qh(h))}">${Pe(h.id)}${b.length?`<i>${Pe(b.join(", "))}</i>`:""}</span><svg data-scrub="1" viewBox="0 0 100 30" preserveAspectRatio="none" aria-label="Click or drag to turn the crank to that point of the cycle">${w}<path d="${x}"/></svg></div>`}).join(""),u=t.turns>1?`<div class="ticks">${Array.from({length:t.turns-1},(h,d)=>`<b style="left:calc(96px + (100% - 96px) * ${(d+1)/t.turns})"></b>`).join("")}</div>`:"";e.innerHTML=c+u+`<div id="head"></div><p class="lanekey">${[s?'<i class="win"></i> when each figure is in position · <i class="hit"></i> when both are: the moment happens':"",t.turns>1?`the whole cycle is ${t.turns} turns of the crank${t.partial?" (showing the first 12)":""} — dashed lines mark each turn`:"","click or drag along the lines to turn the crank there"].filter(Boolean).join(" · ")}</p>`}function hE(){const i=Xe("#timeline");let e;const t=s=>{const r=i.querySelector("svg[data-scrub]");if(!r||!v.cycle)return;const o=r.getBoundingClientRect(),a=Math.max(0,Math.min(.9999,(s.clientX-o.left)/o.width)),l=v.cycle.turns*Dt;v.angle=Math.floor(v.angle/l)*l+a*l};i.addEventListener("pointerdown",s=>{s.button!==0||!s.target.closest("svg[data-scrub]")||(s.preventDefault(),e=s.pointerId,i.setPointerCapture(s.pointerId),v.playing=!1,Un(),t(s))}),i.addEventListener("pointermove",s=>{e===s.pointerId&&t(s)});const n=s=>{e===s.pointerId&&(e=void 0,i.hasPointerCapture(s.pointerId)&&i.releasePointerCapture(s.pointerId))};i.addEventListener("pointerup",n),i.addEventListener("pointercancel",n)}function uE(){const i=document.getElementById("head"),e=v.cycle?.turns??1;i&&(i.style.left=`calc(96px + (100% - 96px) * ${(v.angle%(e*Dt)+e*Dt)%(e*Dt)/(e*Dt)})`)}let ho;function ns(){try{localStorage.setItem(vm,JSON.stringify({scene:v.scene,selected:v.selected,lastValid:ho,drafts:v.drafts}))}catch{}Em()}function dE(){try{const i=localStorage.getItem(vm);if(!i)return!1;const e=JSON.parse(i),t=cr({format:"automata-sculpture",version:1,...e.scene},e.scene?.id);if(!t.ok)return!1;v.scene={...t.scene,id:e.scene.id,hint:typeof e.scene.hint=="string"?e.scene.hint:void 0,answer:typeof e.scene.answer=="string"?e.scene.answer:void 0},v.selected=e.selected,ho=e.lastValid;for(const[n,s]of Object.entries(e.drafts??{})){const r=cr({format:"automata-sculpture",version:1,...s},n);r.ok&&(v.drafts[n]={...r.scene,id:n,hint:s.hint,answer:s.answer})}return!0}catch{return!1}}function Mt(i,e=!1){const t=Xe("#toast");t.innerHTML=`<span>${Pe(i)}</span>${e?' <button data-toastundo="1">Undo</button>':""}`,t.classList.add("show"),t.classList.toggle("act",e),clearTimeout(Mt.t),Mt.t=window.setTimeout(()=>t.classList.remove("show","act"),e?9e3:5e3)}function rh(i,e,t="image/svg+xml"){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([e],{type:t})),n.download=i,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}const oh=()=>v.scene.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"sculpture";function Gm(i){return ri()?(Mt(`Add a part first: there’s no machine to ${i} yet.`),!1):!Gi()||!v.prepared?(v.fixNote=void 0,v.issues=[...v.issues.filter(e=>e.code!=="stale"),{code:"stale",severity:"warning",message:v.pending?"Still building the new shape; try again in a moment.":`The drawing has changed and can’t be built yet, so there’s nothing new to ${i}. Fix it first (the parts shown are the last machine that worked).`}],oi(),Mt(v.pending?"Still building — try again in a moment.":"Fix the design first (see the left panel)."),!1):!0}function fE(){if(!Gm("export")||!v.prepared)return;const i=Vg(Object.values(v.prepared.parts),{paper:"A4",title:v.scene.title});if(!i.ok){v.issues=[...v.issues,...i.issues],oi();return}i.value.sheets.forEach((e,t)=>rh(`${oh()}-parts-${t+1}.svg`,$g(i.value,t))),v.pose&&v.poseFresh&&rh(`${oh()}-assembly.svg`,Wg(v.pose,v.prepared.project)),Mt(`Saved ${i.value.sheets.length} actual-size parts sheet${i.value.sheets.length>1?"s":""} and an assembly drawing (SVG) to your downloads. Print at 100% and check the 20 mm calibration mark. Shafts, pins and the follower’s rubber band are extra hardware.`),Kh.push("parts")}function pE(){rh(`${oh()}.automata.json`,gm(v.scene),"application/json"),Kh.push("file"),Mt("Saved the sculpture file (JSON) to your downloads. Anyone can open it with “Open a file”.")}const Kh=[];async function mE(i){if(i.size>zh){Mt(`That file is ${Math.ceil(i.size/1024)} KiB; a sculpture file is at most 256 KiB.`);return}const e=Aw(await i.text(),i.size);if(!e.ok){Mt(e.reason),v.issues=[...v.issues.filter(n=>n.code!=="import"),{code:"import",severity:"warning",message:`Couldn’t open “${i.name}”: ${e.reason}`}],oi();return}const t=e.scene;if(t.project.modules?.length){const n=await so.prepare(t.project);if(n.status!=="complete"){Mt("Couldn’t check that file’s machine just now; try again.");return}const s=n.value.ok?Rw(t,Object.keys(n.value.value.parts)):`its machine doesn’t hold together: ${n.value.issues[0]?.message??"invalid"}`;if(s){Mt(`Couldn’t open “${i.name}”: ${s}`),v.issues=[...v.issues.filter(r=>r.code!=="import"),{code:"import",severity:"warning",message:`Couldn’t open “${i.name}”: ${s}`}],oi(),fs();return}}Rr(t),Mt(`Opened “${t.title}”.`)}function gE(){const i=Xe("#save-dialog"),e=Xe("#save-name");e.value=v.scene.id.startsWith("mine-")||v.scene.id.startsWith("new-")||v.scene.id.startsWith("file-")?v.scene.title:`My ${v.scene.title.replace(/^The /,"")}`,Xe("#save-why").textContent="",i.showModal(),e.select()}function _E(i){const e=Cw(localStorage,i,v.scene);return e.ok?(v.scene.id=e.entry.id,v.scene.title=e.entry.name,v.scene.project.title=e.entry.name,Oa(),ns(),tr(),Mt(`Saved “${e.entry.name}” in your sculptures (in this browser). Use “Save file” to share it.`),!0):(Xe("#save-why").textContent=e.reason,!1)}function vE(){fe=new ow(Xe("#stage")),Dw(),dE()||(v.scene=wr(Bi[0])),fe.setFigures(v.scene.figures),fe.setSky(v.scene.sky),fe.setView(v.scene.view),Cm(),tr(),lt(),lE(),hE(),Un(),fe.onUserView=()=>{hr=!1},fe.controls.addEventListener("end",()=>Oa()),addEventListener("pagehide",()=>Oa()),Xe("#arrange-front").checked=Lm(),Xe("#arrange-front").onchange=t=>{const n=t.target.checked;try{localStorage.setItem(Am,n?"on":"off")}catch{}!n&&Cn&&(Cn=void 0),Im()};const i=ho&&!ri()&&!kg(v.scene.project).ok?ho:void 0;i?so.prepare(i).then(t=>{t.status==="complete"&&t.value.ok&&!v.prepared&&(v.prepared=t.value.value,v.preparedRev=-1,mh(v.scene.figures,v.prepared.project.modules),ym()),fs()}):fs(),document.addEventListener("pointerdown",t=>{Cr=t.target,t.target.closest?.("#module-editor input[type=range], #module-editor select")&&(cs=!0)},!0),document.addEventListener("pointerup",()=>{cs&&(cs=!1,Vi&&requestAnimationFrame(()=>{!cs&&Vi&&lt()}))},!0),document.addEventListener("click",t=>{const n=t.target.closest("[data-scene],[data-new],[data-open],[data-delete],[data-mod],[data-fix],[data-add],[data-remove],[data-shift],[data-flip],[data-tab],[data-kit],[data-fig],[data-unfig],[data-color],[data-setmoment],[data-clearmoment],[data-undobreak],[data-toastundo],[data-together],[data-slopeyes],[data-slopeno],[data-showme],[data-dismissscan],[data-view],[data-frameall],[data-hintx],#play,#undo,#redo,#scan,#export,#save,#savefile,#reset");if(!n)return;const s=n.dataset;if(s.scene){const r=v.drafts[s.scene];Rr(r??wr(Bi.find(o=>o.id===s.scene))),r&&_h(r)&&Mt(`This is “${r.title}” with your changes. “Restore original” (top bar) puts it back as it was made.`)}else if(s.new){const r=Hi(localStorage).length+1;Rr(Vu(r)),v.tab="part",lt(),Mt("An empty bench. Add a part: a cam on the main shaft is a good start.")}else if(s.open){const r=Hi(localStorage).find(a=>a.id===s.open),o=r&&cr(r.file,r.id);o&&o.ok?Rr(v.drafts[r.id]??o.scene):Mt("That saved sculpture couldn’t be read.")}else if(s.delete){const r=Hi(localStorage).find(o=>o.id===s.delete);r&&confirm(`Delete “${r.name}” from your sculptures? This can’t be undone (a saved file stays safe).`)&&(Pw(localStorage,r.id),tr())}else if(s.tab)v.tab=s.tab,lt(),ur();else if(s.mod)v.selected=s.mod,ps="",v.slopeAsk=void 0,v.tab!=="part"&&(v.tab="part"),lt(),ur();else if(s.add){const r=s.add,o=structuredClone(v.scene.project),a=r0(o,r,v.addOn);if(a.ok){Jt(h=>{h.project=o}),v.selected=a.id,ps="",v.tab="part",lt();const l=_n(),[c,u]=dh(l);Mt(`Added ${Sa[r].toLowerCase()} “${a.id}” on ${v.addOn==="motor"?"the main shaft":`the output of “${v.addOn}”`}, at layers ${c}–${u} so it can’t touch the others. ${r==="cam"?"Draw its motion, then give it a figure.":r==="gears"?"Now add a part on its output shaft.":"Shape it, then give it a figure."}`)}else Mt(a.reason)}else if(s.remove){const r=uh(v.scene.project,s.remove);let o={figures:[]};Jt(c=>{o0(c.project,s.remove),o=Ou(c)}),v.selected=v.scene.project.modules[0]?.id??"",fe.setFigures(v.scene.figures),lt();const a=o.figures,l=r.length||a.length;Mt(`Removed “${s.remove}”${r.length?` and ${Ef(r.map(c=>`“${c}”`))} on its output shaft`:""}${a.length?`, and ${Ef(a.map(c=>`the ${c.id}`))} riding ${r.length?"them":"it"}`:""}.${o.moment?` Your moment “${o.moment.text}” watched ${l?"them":"it"}, so it’s gone too.`:""} Undo brings ${l||o.moment?"them":"it"} back.`,!0)}else if(s.shift){const r=_n();r&&Jt(o=>{e0(o.project,r.id,+s.shift)})}else if(s.flip)Jt(r=>{const o=r.project.modules.find(a=>a.id===s.flip);o.mechanism.kind==="four-bar"&&(o.mechanism.parameters.branch=o.mechanism.parameters.branch===1?-1:1)});else if(s.fix==="linkage"){const r=_n();if(r?.mechanism.kind!=="four-bar")return;const o=Jg(r.mechanism.parameters);if(!o){v.fixNote="No small change to the crank or rocker fixes this one. Try a longer coupler or ground.",lt();return}Jt(a=>{const l=a.project.modules.find(c=>c.id===r.id);l.mechanism={kind:"four-bar",parameters:o}}),lt()}else if(s.fix==="rod"){const r=_n();if(r?.mechanism.kind!=="slider-crank")return;const o=r.mechanism.parameters,a=Math.min(300,Math.ceil(o.crank+Math.abs(o.guideOffset)+6));Jt(l=>{const c=l.project.modules.find(u=>u.id===r.id);c.mechanism.kind==="slider-crank"&&(c.mechanism.parameters.rod=a)}),lt()}else if(s.fix==="bigger"){const r=_n();if(r?.mechanism.kind!=="cam")return;const o=Jf(r.mechanism.parameters);if(!o){v.fixNote="Even the largest cam (100 mm) can’t follow a climb this sudden. Give it more of the turn, or redraw it.",lt();return}Jt(a=>{const l=a.project.modules.find(c=>c.id===r.id);l.mechanism={kind:"cam",parameters:o}})}else if(s.fix==="longer"){const r=_n();if(r?.mechanism.kind!=="cam")return;const o=r.mechanism.parameters,a=jf(o);if(!a){v.fixNote="There’s no room to widen that steep part: the knots on both sides are too close. Redraw it more gently.",lt();return}if(a.cuts.length){v.slopeAsk={module:r.id,key:co(o),plan:a},v.fixNote=void 0,lt();return}Af(r.id,a)}else if(s.slopeyes){const r=v.slopeAsk,o=_n();if(!r||o?.id!==r.module||o.mechanism.kind!=="cam"||co(o.mechanism.parameters)!==r.key){v.slopeAsk=void 0,lt();return}Af(o.id,r.plan)}else if(s.slopeno)v.slopeAsk=void 0,v.fixNote="Kept your pause as drawn. “Make the cam bigger” keeps every pause, or redraw the climb more gently.",lt();else if(s.together)Iw();else if(s.showme)v.showAnswer=!0,bo();else if(s.dismissscan)km();else if(s.view)Tf(s.view);else if(s.frameall)hr=!1,Xw();else if(s.hintx)Mo();else if(s.kit)iE(s.kit);else if(s.fig)v.figure=s.fig,Ua=void 0,lt();else if(s.unfig){let r;hn(o=>{o.figures=o.figures.filter(a=>a.id!==s.unfig),r=Ou(o).moment}),v.figure=void 0,lt(),Mt(`Removed the ${s.unfig}.${r?` Your moment “${r.text}” watched it, so it’s gone too.`:""} Undo brings ${r?"them":"it"} back.`,!0)}else if(s.color){const r=v.figure;hn(o=>{const a=o.figures.find(l=>l.id===r);a&&(a.color=s.color)}),lt()}else if(s.setmoment){const r=v.draft;if(!r)return;const o=r.text.trim()||"Ta-da!";hn(l=>{l.moment={...structuredClone(r),text:o}},"",!1,"moment"),v.draft=void 0,lt();const a=v.cycle&&Qn(v.scene,v.cycle,void 0,v.layout);Mt(a&&a.events?`Moment set. It happens ${a.events%a.turns===0?`${eh(a.events/a.turns)} every turn`:`${eh(a.events)} every ${a.turns} turns`}: watch the figures.`:"Moment set — but this machine never gets there yet. Try the Timing slider on one of the parts.")}else if(s.clearmoment)hn(r=>{r.moment=void 0},"",!1,"moment"),v.draft=void 0,lt(),Mt("Removed the moment. Undo brings it back.",!0);else if(s.undobreak)la(),Mt("Undone: the moment happens again.");else if(s.toastundo)la(),Xe("#toast").classList.remove("show","act");else if(n.id==="play")v.playing=!v.playing,Un();else if(n.id==="undo")la();else if(n.id==="redo")yf();else if(n.id==="reset"){const r=Bi.find(l=>l.id===v.scene.id),o=Hi(localStorage).find(l=>l.id===v.scene.id),a=o&&cr(o.file,o.id);if(r&&!confirm(`Restore “${r.title}” as it was made? Your changes to it will be lost (Undo, right after, brings them back).`))return;v.undo.push(yo()),v.scene=r?wr(r):a&&a.ok?a.scene:Vu(),delete v.drafts[v.scene.id],v.rev++,v.scan=void 0,v.draft=void 0,v.selected=v.scene.project.modules[0]?.id??"",v.figure=void 0,v.broke=void 0,v.slopeAsk=void 0,v.fixNote=void 0,fe.setFigures(v.scene.figures),fe.setSky(v.scene.sky),tr(),fs(),ns(),Mt(r?"Back to the sculpture as it was made. Undo if you didn’t mean it.":o?"Back to your last saved version. Undo if you didn’t mean it.":"Cleared the bench. Undo if you didn’t mean it.")}else if(n.id==="export")fE();else if(n.id==="savefile")pE();else if(n.id==="save")gE();else if(!(n.id==="scan"&&!Gm("check"))){if(n.id==="scan"&&v.prepared){const r=Math.min(120,v.prepared.cycleTurns??12),o=Math.min(720,Math.max(180,r*90));v.scan="running",oi(),so.scan(v.prepared,{from:0,to:r*Dt,samples:o}).then(a=>{v.scan=a.status==="complete"?a.value:void 0,a.status==="error"&&(v.issues=[...v.issues,{code:"scan",severity:"error",message:a.message}]),oi()})}}}),Xe("#save-form").onsubmit=t=>{t.preventDefault(),_E(Xe("#save-name").value)&&Xe("#save-dialog").close()},Xe("#save-cancel").onclick=()=>Xe("#save-dialog").close(),Xe("#open-file").onchange=t=>{const n=t.target.files?.[0];n&&mE(n),t.target.value=""},document.addEventListener("input",t=>{const n=t.target,s=_n(),r=n.dataset,o=n.nextElementSibling;if(n.id==="add-on"){v.addOn=n.value;return}if(n.id==="add-at"){ps=n.value;return}if(r.m){n.type!=="number"&&Cf(n);return}if(r.f){xE(n);return}if(s){if(r.phase){o&&(o.value=`${n.value}°`);const a=+n.value*Math.PI/180;Jt(l=>{l.project.modules.find(c=>c.id===s.id).drive.phase=a},`phase-${s.id}`)}else if(r.base)o&&(o.value=`${n.value} mm`),Jt(a=>{const l=a.project.modules.find(c=>c.id===s.id);l.mechanism.kind==="cam"&&(l.mechanism.parameters.baseRadius=+n.value)},`base-${s.id}`);else if(r.dir)o&&(o.value=`${n.value}°`),Jt(a=>{a0(a.project,s.id,+n.value*Math.PI/180)},`dir-${s.id}`);else if(r.bar){o&&(o.value=`${n.value} mm`);const a=r.bar;Jt(l=>{const c=l.project.modules.find(u=>u.id===s.id);c.mechanism.kind==="four-bar"&&(c.mechanism.parameters[a]=+n.value)},`bar-${a}-${s.id}`)}else if(r.slide){o&&(o.value=`${n.value} mm`);const a=r.slide;Jt(l=>{const c=l.project.modules.find(u=>u.id===s.id);c.mechanism.kind==="slider-crank"&&(c.mechanism.parameters[a]=+n.value)},`slide-${a}-${s.id}`)}else if(r.gear){const a=r.gear;o&&(o.value=`${n.value}${a==="module"?" mm":""}`),Jt(l=>{const c=l.project.modules.find(u=>u.id===s.id);c.mechanism.kind==="gears"&&(c.mechanism.parameters[a]=+n.value),sp(l.project)},`gear-${a}-${s.id}`)}}}),document.addEventListener("change",t=>{const n=t.target;if(n.dataset?.m&&(n.type==="number"||n.type==="text")){Cf(n,!0);return}n.matches("#module-editor input[type=range],#module-editor select:not([data-m])")&&(nh=!0,lt())}),document.addEventListener("toggle",t=>{const n=t.target;n.id==="hint"&&(v.hintOpen=n.open)},!0),document.addEventListener("focusout",t=>{Vi&&!cs&&t.target.matches?.("#module-editor select")&&requestAnimationFrame(()=>{Vi&&!cs&&lt()})}),document.addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||t.target instanceof HTMLSelectElement||t.target instanceof HTMLTextAreaElement||(t.key===" "?(t.preventDefault(),v.playing=!v.playing,Un()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"&&(t.preventDefault(),t.shiftKey?yf():la()))}),Xe("#speed").oninput=t=>{v.speed=+t.target.value};const e=Xe("#sheet-toggle");e.onclick=()=>{const t=document.body.classList.toggle("sheet-up");e.setAttribute("aria-expanded",String(t)),e.textContent=t?"▼ More room for the machine":"▲ More room for the panel"},window.automata={state:()=>({angle:v.angle,selected:v.selected,issues:v.issues,scan:v.scan,scene:v.scene.id,title:v.scene.title,modules:v.scene.project.modules.map(t=>({id:t.id,kind:t.mechanism.kind,layer:t.layer,source:t.drive.source,phase:t.drive.phase})),tab:v.tab,figure:v.figure,figures:v.scene.figures.map(t=>t.id),moment:v.scene.moment,built:Gi(),pending:v.pending,empty:ri(),events:v.cycle&&Qn(v.scene,v.cycle,void 0,v.layout)?.events,clashes:v.shafts.clashes,exports:[...Kh],knots:_n()?.mechanism.parameters?.knots}),open:t=>{const n=Bi.find(s=>s.id===t);n&&Rr(wr(n))},pose:t=>{v.angle=t,v.playing=!1,Un()},frame:()=>fe.frameOpening(),cam:()=>({...fe.cameraState(),mode:fe.viewMode,moving:fe.moving,rotate:fe.controls.enableRotate,hint:!Xe("#frame-hint").hidden,depthArrow:fe.depthArrowShown}),view:t=>Tf(t),orbit:t=>fe.orbit(t),camera:t=>fe.restoreCamera(t),closest:(t,n)=>v.cycle&&hm(v.scene,v.cycle,t,n,v.layout)?.mm,figureScreen:t=>fe.figureScreen(t),contactAt:t=>{const n=v.scene.figures.find(s=>s.id===t);return n&&v.pose?Ht(v.pose,n,v.layout):void 0},figure:t=>v.scene.figures.find(n=>n.id===t),broke:()=>v.broke,tilt:t=>fe.tilt(t),aboveTable:()=>fe.cameraAboveTable(),touch:()=>Yi&&{...Yi,ghosts:fe.ghostCount},draft:()=>v.draft,sketch:t=>{const n=_n();n?.mechanism.kind==="cam"&&Jt(s=>{const r=s.project.modules.find(o=>o.id===n.id);r.mechanism.kind==="cam"&&(r.mechanism.parameters.knots=t)})},bubble:()=>Xe("#moment").classList.contains("show"),momentNow:()=>!!(v.pose&&Bn?.(v.pose)),trace:t=>{const n=Fa;return Fa=t?[]:void 0,n},momentAt:t=>{if(!v.prepared||!Bn)return!1;const n=$r(v.prepared,t);return n.ok&&Bn(n.value)},play:t=>{t&&(v.speed=t),v.playing=!0,Un()},momentAngle:()=>{if(!v.cycle)return;const t=Qn(v.scene,v.cycle,void 0,v.layout);if(!t)return;const n=t.both.length,s=t.both.findIndex((r,o)=>r&&!t.both[(o+n-1)%n]);return s<0?void 0:v.cycle.samples[(s+Math.round(n*.012))%n].angle}},requestAnimationFrame(Sm)}function xE(i){const e=v.figure,t=i.dataset.f,n=i.value,s=i.closest("label")?.querySelector("output")??null;if(!e)return;const r=v.scene.figures.find(l=>l.id===e);if(!r)return;const o=v.scene.project.modules.find(l=>l.id===r.part.split("/")[0]),a=o?ph(o,r.part):void 0;if(t==="kind"){hn(l=>{const c=l.figures.find(u=>u.id===e);op(n)&&(c.kind=n,c.color=void 0)}),lt();return}if(t==="color"){hn(l=>{const c=l.figures.find(u=>u.id===e);c.color=n},`color-${e}`);return}if(t==="scale"){s&&(s.value=`${n}×`),hn(l=>{l.figures.find(c=>c.id===e).scale=+n},`scale-${e}`);return}if(t==="dz"){s&&(s.value=Xh(+n)),hn(l=>{l.figures.find(c=>c.id===e).dz=+n},`dz-${e}`,!1),el();return}if(t==="turn"){s&&(s.value=`${n}°`),hn(l=>{l.figures.find(c=>c.id===e).turnZ=+n*Math.PI/180},`turn-${e}`,!1);return}if(t==="face"){s&&(s.value=`${n}°`),hn(l=>{l.figures.find(c=>c.id===e).turnY=+n*Math.PI/180},`face-${e}`,!1);return}if(t==="x"||t==="y"){s&&(s.value=`${n} mm`);const l=r.nudge??[0,0],c=a!==void 0?Zi(l,a):l,u=t==="x"?[+n,c[1]]:[c[0],+n],h=a!==void 0?Zi(u,-a):u;hn(d=>{d.figures.find(f=>f.id===e).nudge=[Math.round(h[0]*100)/100,Math.round(h[1]*100)/100]},`nudge-${e}`,!1)}}function Cf(i,e=!1){const t=i.dataset.m,n=v.cycle;if(!n)return;const s=v.scene.moment,r=!!s&&!("module"in s.a),o=structuredClone(r?s:v.draft??Hm()),a=d=>{const f=v.scene.figures.find(y=>y.id===d),g=vo(n,f);return ja(g,xo(n,f,g))[0]??"up"},l=d=>d==="a"?o.a:o.b,c=(d,f)=>{d==="a"?f&&(o.a=f):o.b=f},[u,h]=t.includes("-")?t.split("-"):[void 0,t];if(t==="text")o.text=i.value;else if(t==="effect")o.effect=i.value;else if(u&&h==="fig"){if(u==="a"&&!i.value)return;c(u,i.value?{figure:i.value,pick:a(i.value)}:void 0)}else if(u&&h==="pick"){const d=l(u);if(!d||"module"in d)return;if(i.value==="touch"){const f=Bm(d.figure).find(g=>g.id!==d.figure);if(!f)return;c(u,{figure:d.figure,touch:"touch"in d?d.touch:f.id,within:"touch"in d?d.within:f0})}else c(u,{figure:d.figure,pick:i.value})}else if(u&&h==="touch"){const d=l(u);d&&"touch"in d&&c(u,{...d,touch:i.value})}else if(u&&h==="within"){const d=l(u),f=Math.round(+i.value);if(d&&"touch"in d&&f>=1&&f<=200)c(u,{...d,within:f});else return}if(r){if(t==="text"&&!o.text.trim())return;hn(d=>{d.moment=o},`moment-${t}`,!1,"moment"),bo()}else v.draft=o;if(t==="text"||t==="effect"||h==="within"){const d=document.getElementById("momentstatus");d&&(t!=="text"||e)&&(d.innerHTML=tl(r?v.scene.moment:o)),t!=="text"&&(ur(),oo(),Wh());return}Um(zm),ur(),oo(),Qa()}vE();
