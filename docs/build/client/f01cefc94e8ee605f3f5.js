var TempleAPI=(()=>{var jt=Object.create;var Te=Object.defineProperty;var St=Object.getOwnPropertyDescriptor;var Ct=Object.getOwnPropertyNames;var Ot=Object.getPrototypeOf,Dt=Object.prototype.hasOwnProperty;var D=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Mt=(t,e)=>{for(var r in e)Te(t,r,{get:e[r],enumerable:!0})},tt=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Ct(e))!Dt.call(t,n)&&n!==r&&Te(t,n,{get:()=>e[n],enumerable:!(i=St(e,n))||i.enumerable});return t};var M=(t,e,r)=>(r=t!=null?jt(Ot(t)):{},tt(e||!t||!t.__esModule?Te(r,"default",{value:t,enumerable:!0}):r,t)),$t=t=>tt(Te({},"__esModule",{value:!0}),t);var He=D(Ie=>{"use strict";Object.defineProperty(Ie,"__esModule",{value:!0});var Ne=class extends Error{static for(e,...r){return r.forEach(function(i){e=e.replace("%s",i)}),new this(e)}static forErrorsFound(e){let r=new this("Invalid Parameters");return r.errors=e,r}static require(e,r,...i){if(!e){for(let n of i)r=r.replace("%s",n);throw new this(r)}}constructor(e,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=e,this.name=this.constructor.name,this.code=r}withCode(e){return this.code=e,this}withPosition(e,r){return this.start=e,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};Ie.default=Ne});var oe=D(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.TempleEmitter=void 0;var Ee=class extends EventTarget{emit(e,r){return this.dispatchEvent(new CustomEvent(e,{detail:r})),this}on(e,r){if(e==="ready"&&document.readyState!=="loading"){let i=new CustomEvent("ready");return setTimeout(()=>r(i),1),this}return this.addEventListener(e,r),this}once(e,r){let i=n=>{this.unbind(e,i),r(n)};return this.on(e,i),this}unbind(e,r){return this.removeEventListener(e,r),this}};le.TempleEmitter=Ee;var rt=new Ee;document.onreadystatechange=()=>{document.readyState!=="loading"&&rt.emit("ready")};le.default=rt});var Ue=D(ue=>{"use strict";var Lt=ue&&ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ue,"__esModule",{value:!0});var Be=Lt(oe()),Ge=class{get attributes(){return Object.assign({},this._attributes)}get element(){return this._element}constructor(e,r){this._element=e,this._attributes=r}hasAttribute(e){return e in this._attributes}getAttribute(e){return this._attributes[e]}removeAttribute(e,r=!1){let i=this.getAttribute(e);return typeof i>"u"?this:(delete this._attributes[e],this._element.removeAttribute(e),r||Be.default.emit("attribute-remove",{element:this,key:e,previous:i}),this)}setAttribute(e,r,i=!1){if(typeof r>"u")return this.removeAttribute(e,i);let n=this.getAttribute(e);return n===r?this:(this._attributes[e]=r,typeof r=="string"&&this._element.setAttribute(e,r),i||(typeof n>"u"?Be.default.emit("attribute-create",{element:this,key:e,value:r}):Be.default.emit("attribute-update",{element:this,key:e,value:r,previous:n})),this)}setAttributes(e,r=!1){for(let[n,f]of Object.entries(e))this.setAttribute(n,f,r);let i=Object.keys(e);for(let n of Object.keys(this._attributes))i.includes(n)||this.removeAttribute(n,r);return this}};ue.default=Ge});var Fe=D(ce=>{"use strict";var qt=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});var Rt=qt(Ue()),ke=class{static get elements(){return this._elements}static createComponent(e,r,i,n=[]){let f=document.createElement("template");f.innerHTML=`<${e}></${e}>`;let h=f.content.querySelector(`${e}`);Object.setPrototypeOf(h,r.prototype),h.constructor=r.constructor,h.constructor.component=r.component;for(let[x,k]of Object.entries(i))typeof k=="string"?h.setAttribute(x,k):k===!0&&h.setAttribute(x,x);return h._TempleAttributes=i,h.props=i,n.forEach(x=>h.appendChild(x)),h.register(),customElements.get(e)||h.connectedCallback(),this.register(h,i)}static createElement(e,r,i=[]){let n=document.createElement(e);for(let[f,m]of Object.entries(r))typeof m=="string"?n.setAttribute(f,m):m===!0&&n.setAttribute(f,f);return i.filter(f=>typeof f<"u").forEach(f=>n.appendChild(f)),this.register(n,r)}static createText(e,r=!1){return document.createTextNode(e)}static filter(e){let r=[];return this._elements.forEach((i,n)=>{e(i,n)&&r.push(i)}),r}static get(e){return this._elements.get(e)||null}static has(e){return this._elements.has(e)}static map(e){let r=[];return this._elements.forEach((i,n)=>{r.push(e(i,n))}),r}static register(e,r){if(this.has(e))return this.get(e);let i=new Rt.default(e,r||{});return this._elements.set(e,i),i}};ke._elements=new Map;ce.default=ke});var G=D(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.TempleDataMap=void 0;var Pe=class{constructor(){window.__APP_DATA__||(window.__APP_DATA__={})}clear(){return window.__APP_DATA__={},this}delete(e){return this.has(e)?(delete window.__APP_DATA__[e],!0):!1}entries(){return Object.entries(window.__APP_DATA__)}has(e){return e in window.__APP_DATA__}get(e){return window.__APP_DATA__[e]}keys(){return Object.keys(window.__APP_DATA__)}set(e,r){return window.__APP_DATA__[e]=r,this}values(){return Object.values(window.__APP_DATA__)}};de.TempleDataMap=Pe;var zt=new Pe;de.default=zt});var st=D(fe=>{"use strict";var Je=fe&&fe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fe,"__esModule",{value:!0});var pe=Je(Fe()),je=Je(oe()),nt=Je(G()),Ze=class t extends HTMLElement{constructor(){super(...arguments),this._initiated=!1,this._template=null,this._attributes={},this._props={},this._children=void 0,this._rendering=!1}static register(){customElements.define(this.component[0],this)}get attr(){return this._attributes}get element(){return pe.default.has(this)?pe.default.get(this):pe.default.register(this,this._TempleAttributes||{})}get metadata(){let[e,r]=this.constructor.component;return{tagname:e,classname:r}}get originalChildren(){return this._children}get initiated(){return this._initiated}get props(){return this._props}set props(e){this._props=Object.assign({},e),this._attributes=Object.fromEntries(Object.entries(e).filter(r=>typeof r[1]=="string"||r[1]===!0))}adoptedCallback(){this.render()}attributeChangedCallback(e,r,i){this.props=Object.assign(Object.assign({},this.props),{[e]:i}),this.render()}connectedCallback(){this.wait()}disconnectedCallback(){}getParentComponent(){let e=this.parentElement;for(;e;){if(e instanceof t)return e;e=e.parentElement}return null}register(){pe.default.register(this,this._props)}render(){let e=this.getParentComponent();if(e&&!e.initiated)return;if(this._rendering)return;this._rendering=!0,nt.default.set("current",this);let r=this.styles();this._template?je.default.emit("unmounted",this):this._template=this.template();let i=this._template().filter(Boolean);if(r.length===0)this.textContent="",i.forEach(n=>this.appendChild(n));else{this.shadowRoot||this.attachShadow({mode:"open"});let n=this.shadowRoot;this.textContent="",n.textContent="";let f=document.createElement("style");f.innerText=r,n.appendChild(f),i.forEach(m=>{var h;return(h=this.shadowRoot)===null||h===void 0?void 0:h.appendChild(m)})}return nt.default.delete("current"),this._initiated=!0,je.default.emit("mounted",this),this._rendering=!1,this.shadowRoot?this.shadowRoot.innerHTML:this.innerHTML}wait(){if(document.readyState!=="loading")this._update();else{let e=()=>{this._update(),je.default.unbind("ready",e)};je.default.on("ready",e)}}_toNodeList(e){return e instanceof Node?[e]:Array.isArray(e)&&e.every(r=>r instanceof Node)?e:[pe.default.createText(String(e))]}_update(){typeof this._children>"u"&&(this._children=Array.from(this.childNodes||[]));let e=this.element;e&&(this.props=Object.assign({},e.attributes),this.render()),this._initiated||this.render()}};fe.default=Ze});var at=D(ge=>{"use strict";var Nt=ge&&ge.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ge,"__esModule",{value:!0});var It=Nt(G());function Ht(t){let e=It.default.get("env")||{};return t?e[t]||null:e}ge.default=Ht});var We=D(me=>{"use strict";var Bt=me&&me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(me,"__esModule",{value:!0});me.default=Gt;var it=Bt(G());function Gt(t=null){return t||(t=it.default.get("current")||null),t?t==="document"?it.default.get("props")||{}:t.props:{}}});var lt=D(he=>{"use strict";var Ut=he&&he.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(he,"__esModule",{value:!0});he.default=Jt;var Zt=Ut(We());function Jt(t=null){return(0,Zt.default)(t).class}});var ut=D(Y=>{"use strict";var Wt=Y&&Y.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Y,"__esModule",{value:!0});Y.innerHTML=Kt;Y.default=ot;var Yt=Wt(G());function Kt(t=null){let e=ot(t),r=document.createElement("template");return r.append(...e),r.innerHTML}function ot(t=null){return t||(t=Yt.default.get("current")||null),t?t.originalChildren||[]:[]}});var pt=D(U=>{"use strict";var dt=U&&U.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(U,"__esModule",{value:!0});U.SignalRegistry=void 0;U.default=Qt;var ct=dt(He()),Xt=dt(G()),K=class t{static observe(e,r){let i={getter:()=>n.raw,setter:m=>m},n={raw:r,getter(m){return i.getter=m,n},setter(m){return i.setter=m,n}};Object.defineProperty(n,"value",{get(){return i.getter()},set(m){let h=i.setter(m),x=t.serialize(h)!==t.serialize(n.raw);n.raw=h,x&&e.render()}});let f=this._observers.get(e);return f?(f.observed++,f.values.push(n)):this._observers.set(e,{observed:1,values:[n]}),n}static observer(e){return this._observers.get(e)||null}static serialize(e){return JSON.stringify(e)}};U.SignalRegistry=K;K._observers=new Map;function Qt(t,e=null){if(e||(e=Xt.default.get("current")||null),!e)throw ct.default.for("Signals can only be created within a Temple component");if(!e.initiated)return K.observe(e,t);let r=K.observer(e);if(!r)throw ct.default.for("State mismatch");return r.values[r.observed++%r.values.length]}});var bt=D(Se=>{"use strict";var gt=Se&&Se.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Se,"__esModule",{value:!0});var ft=gt(Fe()),mt=gt(oe()),ht=(t,e)=>Array.from(t.querySelectorAll("*")).filter(r=>{let i=ft.default.get(r);return i&&i.hasAttribute(e)}).map(r=>ft.default.get(r));function Ye(t,e){mt.default.on("mounted",r=>{if(!r.detail)return;let i=r.detail;ht(i.shadowRoot||i,t).forEach(e)})}function Vt(t,e){mt.default.on("unmounted",r=>{if(!r.detail)return;let i=r.detail;ht(i.shadowRoot||i,t).forEach(e)})}Ye("mount",t=>{let e=t.getAttribute("mount");if(typeof e=="function"){let r=new CustomEvent("mount",{detail:{node:t,target:t.element}});e(r)}});Vt("unmount",t=>{let e=t.getAttribute("unmount");if(typeof e=="function"){let r=new CustomEvent("unmount",{detail:{node:t,target:t.element}});e(r)}});Ye("if",t=>{let e=t.getAttribute("if");(e===!1||e==="false"||typeof e=="function"&&!e())&&t.element.remove()});["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","wheel","keydown","keypress","keyup","blur","change","contextmenu","focus","input","submit","invalid","reset","search","select","copy","cut","paste","drag","dragstart","dragend","dragover","dragenter","dragleave","drop","scroll","durationchange","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","animationstart","animationend","animationiteration","transitionend","toggle"].forEach(t=>Ye(t,e=>{let r=e.getAttribute(t);typeof r=="function"&&(e.element.removeEventListener(t,r),e.element.addEventListener(t,r))}))});var Ke=D(g=>{"use strict";var er=g&&g.__createBinding||(Object.create?function(t,e,r,i){i===void 0&&(i=r);var n=Object.getOwnPropertyDescriptor(e,r);(!n||("get"in n?!e.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,i,n)}:function(t,e,r,i){i===void 0&&(i=r),t[i]=e[r]}),tr=g&&g.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Ce=g&&g.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&er(e,t,r);return tr(e,t),e},Z=g&&g.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(g,"__esModule",{value:!0});g.SignalRegistry=g.TempleException=g.TempleEmitter=g.TempleElement=g.TempleRegistry=g.TempleComponent=g.TempleDataMap=g.emitter=g.signal=g.innerHTML=g.children=g.classnames=g.props=g.env=g.data=void 0;var rr=Z(He());g.TempleException=rr.default;var nr=Z(st());g.TempleComponent=nr.default;var sr=Z(Fe());g.TempleRegistry=sr.default;var ar=Z(Ue());g.TempleElement=ar.default;var _t=Ce(oe());g.emitter=_t.default;Object.defineProperty(g,"TempleEmitter",{enumerable:!0,get:function(){return _t.TempleEmitter}});var vt=Ce(G());g.data=vt.default;Object.defineProperty(g,"TempleDataMap",{enumerable:!0,get:function(){return vt.TempleDataMap}});var ir=Z(at());g.env=ir.default;var lr=Z(We());g.props=lr.default;var or=Z(lt());g.classnames=or.default;var xt=Ce(ut());g.children=xt.default;Object.defineProperty(g,"innerHTML",{enumerable:!0,get:function(){return xt.innerHTML}});var yt=Ce(pt());g.signal=yt.default;Object.defineProperty(g,"SignalRegistry",{enumerable:!0,get:function(){return yt.SignalRegistry}});bt()});var I=D((Fr,wt)=>{wt.exports={...Ke()}});var J=D((jr,At)=>{At.exports={...Ke()}});var Tt=D((Cr,De)=>{var ur=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var c=function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,i={},n={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function a(s){return s instanceof f?new f(s.type,a(s.content),s.alias):Array.isArray(s)?s.map(a):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++r}),a.__id},clone:function a(s,l){l=l||{};var o,u;switch(n.util.type(s)){case"Object":if(u=n.util.objId(s),l[u])return l[u];o={},l[u]=o;for(var p in s)s.hasOwnProperty(p)&&(o[p]=a(s[p],l));return o;case"Array":return u=n.util.objId(s),l[u]?l[u]:(o=[],l[u]=o,s.forEach(function(b,d){o[d]=a(b,l)}),o);default:return s}},getLanguage:function(a){for(;a;){var s=e.exec(a.className);if(s)return s[1].toLowerCase();a=a.parentElement}return"none"},setLanguage:function(a,s){a.className=a.className.replace(RegExp(e,"gi"),""),a.classList.add("language-"+s)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(o){var a=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(o.stack)||[])[1];if(a){var s=document.getElementsByTagName("script");for(var l in s)if(s[l].src==a)return s[l]}return null}},isActive:function(a,s,l){for(var o="no-"+s;a;){var u=a.classList;if(u.contains(s))return!0;if(u.contains(o))return!1;a=a.parentElement}return!!l}},languages:{plain:i,plaintext:i,text:i,txt:i,extend:function(a,s){var l=n.util.clone(n.languages[a]);for(var o in s)l[o]=s[o];return l},insertBefore:function(a,s,l,o){o=o||n.languages;var u=o[a],p={};for(var b in u)if(u.hasOwnProperty(b)){if(b==s)for(var d in l)l.hasOwnProperty(d)&&(p[d]=l[d]);l.hasOwnProperty(b)||(p[b]=u[b])}var w=o[a];return o[a]=p,n.languages.DFS(n.languages,function(O,N){N===w&&O!=a&&(this[O]=p)}),p},DFS:function a(s,l,o,u){u=u||{};var p=n.util.objId;for(var b in s)if(s.hasOwnProperty(b)){l.call(s,b,s[b],o||b);var d=s[b],w=n.util.type(d);w==="Object"&&!u[p(d)]?(u[p(d)]=!0,a(d,l,null,u)):w==="Array"&&!u[p(d)]&&(u[p(d)]=!0,a(d,l,b,u))}}},plugins:{},highlightAll:function(a,s){n.highlightAllUnder(document,a,s)},highlightAllUnder:function(a,s,l){var o={callback:l,container:a,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",o),o.elements=Array.prototype.slice.apply(o.container.querySelectorAll(o.selector)),n.hooks.run("before-all-elements-highlight",o);for(var u=0,p;p=o.elements[u++];)n.highlightElement(p,s===!0,o.callback)},highlightElement:function(a,s,l){var o=n.util.getLanguage(a),u=n.languages[o];n.util.setLanguage(a,o);var p=a.parentElement;p&&p.nodeName.toLowerCase()==="pre"&&n.util.setLanguage(p,o);var b=a.textContent,d={element:a,language:o,grammar:u,code:b};function w(N){d.highlightedCode=N,n.hooks.run("before-insert",d),d.element.innerHTML=d.highlightedCode,n.hooks.run("after-highlight",d),n.hooks.run("complete",d),l&&l.call(d.element)}if(n.hooks.run("before-sanity-check",d),p=d.element.parentElement,p&&p.nodeName.toLowerCase()==="pre"&&!p.hasAttribute("tabindex")&&p.setAttribute("tabindex","0"),!d.code){n.hooks.run("complete",d),l&&l.call(d.element);return}if(n.hooks.run("before-highlight",d),!d.grammar){w(n.util.encode(d.code));return}if(s&&t.Worker){var O=new Worker(n.filename);O.onmessage=function(N){w(N.data)},O.postMessage(JSON.stringify({language:d.language,code:d.code,immediateClose:!0}))}else w(n.highlight(d.code,d.grammar,d.language))},highlight:function(a,s,l){var o={code:a,grammar:s,language:l};if(n.hooks.run("before-tokenize",o),!o.grammar)throw new Error('The language "'+o.language+'" has no grammar.');return o.tokens=n.tokenize(o.code,o.grammar),n.hooks.run("after-tokenize",o),f.stringify(n.util.encode(o.tokens),o.language)},tokenize:function(a,s){var l=s.rest;if(l){for(var o in l)s[o]=l[o];delete s.rest}var u=new x;return k(u,u.head,a),h(a,u,s,u.head,0),F(u)},hooks:{all:{},add:function(a,s){var l=n.hooks.all;l[a]=l[a]||[],l[a].push(s)},run:function(a,s){var l=n.hooks.all[a];if(!(!l||!l.length))for(var o=0,u;u=l[o++];)u(s)}},Token:f};t.Prism=n;function f(a,s,l,o){this.type=a,this.content=s,this.alias=l,this.length=(o||"").length|0}f.stringify=function a(s,l){if(typeof s=="string")return s;if(Array.isArray(s)){var o="";return s.forEach(function(w){o+=a(w,l)}),o}var u={type:s.type,content:a(s.content,l),tag:"span",classes:["token",s.type],attributes:{},language:l},p=s.alias;p&&(Array.isArray(p)?Array.prototype.push.apply(u.classes,p):u.classes.push(p)),n.hooks.run("wrap",u);var b="";for(var d in u.attributes)b+=" "+d+'="'+(u.attributes[d]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+b+">"+u.content+"</"+u.tag+">"};function m(a,s,l,o){a.lastIndex=s;var u=a.exec(l);if(u&&o&&u[1]){var p=u[1].length;u.index+=p,u[0]=u[0].slice(p)}return u}function h(a,s,l,o,u,p){for(var b in l)if(!(!l.hasOwnProperty(b)||!l[b])){var d=l[b];d=Array.isArray(d)?d:[d];for(var w=0;w<d.length;++w){if(p&&p.cause==b+","+w)return;var O=d[w],N=O.inside,be=!!O.lookbehind,W=!!O.greedy,_e=O.alias;if(W&&!O.pattern.global){var v=O.pattern.toString().match(/[imsuy]*$/)[0];O.pattern=RegExp(O.pattern.source,v+"g")}for(var ve=O.pattern||O,P=o.next,L=u;P!==s.tail&&!(p&&L>=p.reach);L+=P.value.length,P=P.next){var H=P.value;if(s.length>a.length)return;if(!(H instanceof f)){var xe=1,z;if(W){if(z=m(ve,L,a,be),!z||z.index>=a.length)break;var ye=z.index,Ft=z.index+z[0].length,B=L;for(B+=P.value.length;ye>=B;)P=P.next,B+=P.value.length;if(B-=P.value.length,L=B,P.value instanceof f)continue;for(var ie=P;ie!==s.tail&&(B<Ft||typeof ie.value=="string");ie=ie.next)xe++,B+=ie.value.length;xe--,H=a.slice(L,B),z.index-=L}else if(z=m(ve,0,H,be),!z)continue;var ye=z.index,we=z[0],qe=H.slice(0,ye),et=H.slice(ye+we.length),Re=L+H.length;p&&Re>p.reach&&(p.reach=Re);var Ae=P.prev;qe&&(Ae=k(s,Ae,qe),L+=qe.length),y(s,Ae,xe);var Pt=new f(b,N?n.tokenize(we,N):we,_e,we);if(P=k(s,Ae,Pt),et&&k(s,P,et),xe>1){var ze={cause:b+","+w,reach:Re};h(a,s,l,P.prev,L,ze),p&&ze.reach>p.reach&&(p.reach=ze.reach)}}}}}}function x(){var a={value:null,prev:null,next:null},s={value:null,prev:a,next:null};a.next=s,this.head=a,this.tail=s,this.length=0}function k(a,s,l){var o=s.next,u={value:l,prev:s,next:o};return s.next=u,o.prev=u,a.length++,u}function y(a,s,l){for(var o=s.next,u=0;u<l&&o!==a.tail;u++)o=o.next;s.next=o,o.prev=s,a.length-=u}function F(a){for(var s=[],l=a.head.next;l!==a.tail;)s.push(l.value),l=l.next;return s}if(!t.document)return t.addEventListener&&(n.disableWorkerMessageHandler||t.addEventListener("message",function(a){var s=JSON.parse(a.data),l=s.language,o=s.code,u=s.immediateClose;t.postMessage(n.highlight(o,n.languages[l],l)),u&&t.close()},!1)),n;var A=n.util.currentScript();A&&(n.filename=A.src,A.hasAttribute("data-manual")&&(n.manual=!0));function _(){n.manual||n.highlightAll()}if(!n.manual){var T=document.readyState;T==="loading"||T==="interactive"&&A&&A.defer?document.addEventListener("DOMContentLoaded",_):window.requestAnimationFrame?window.requestAnimationFrame(_):window.setTimeout(_,16)}return n}(ur);typeof De<"u"&&De.exports&&(De.exports=c);typeof global<"u"&&(global.Prism=c);c.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};c.languages.markup.tag.inside["attr-value"].inside.entity=c.languages.markup.entity;c.languages.markup.doctype.inside["internal-subset"].inside=c.languages.markup;c.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(c.languages.markup.tag,"addInlined",{value:function(e,r){var i={};i["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:c.languages[r]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};n["language-"+r]={pattern:/[\s\S]+/,inside:c.languages[r]};var f={};f[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:n},c.languages.insertBefore("markup","cdata",f)}});Object.defineProperty(c.languages.markup.tag,"addAttribute",{value:function(t,e){c.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:c.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});c.languages.html=c.languages.markup;c.languages.mathml=c.languages.markup;c.languages.svg=c.languages.markup;c.languages.xml=c.languages.extend("markup",{});c.languages.ssml=c.languages.xml;c.languages.atom=c.languages.xml;c.languages.rss=c.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var r=t.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))})(c);c.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};c.languages.javascript=c.languages.extend("clike",{"class-name":[c.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});c.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;c.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:c.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:c.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:c.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:c.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:c.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});c.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:c.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});c.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});c.languages.markup&&(c.languages.markup.tag.addInlined("script","javascript"),c.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));c.languages.js=c.languages.javascript;(function(){if(typeof c>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(A,_){return"\u2716 Error "+A+" while fetching file: "+_},r="\u2716 Error: File does not exist or is empty",i={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},n="data-src-status",f="loading",m="loaded",h="failed",x="pre[data-src]:not(["+n+'="'+m+'"]):not(['+n+'="'+f+'"])';function k(A,_,T){var a=new XMLHttpRequest;a.open("GET",A,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?_(a.responseText):a.status>=400?T(e(a.status,a.statusText)):T(r))},a.send(null)}function y(A){var _=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A||"");if(_){var T=Number(_[1]),a=_[2],s=_[3];return a?s?[T,Number(s)]:[T,void 0]:[T,T]}}c.hooks.add("before-highlightall",function(A){A.selector+=", "+x}),c.hooks.add("before-sanity-check",function(A){var _=A.element;if(_.matches(x)){A.code="",_.setAttribute(n,f);var T=_.appendChild(document.createElement("CODE"));T.textContent=t;var a=_.getAttribute("data-src"),s=A.language;if(s==="none"){var l=(/\.(\w+)$/.exec(a)||[,"none"])[1];s=i[l]||l}c.util.setLanguage(T,s),c.util.setLanguage(_,s);var o=c.plugins.autoloader;o&&o.loadLanguages(s),k(a,function(u){_.setAttribute(n,m);var p=y(_.getAttribute("data-range"));if(p){var b=u.split(/\r\n?|\n/g),d=p[0],w=p[1]==null?b.length:p[1];d<0&&(d+=b.length),d=Math.max(0,Math.min(d-1,b.length)),w<0&&(w+=b.length),w=Math.max(0,Math.min(w,b.length)),u=b.slice(d,w).join(`
`),_.hasAttribute("data-start")||_.setAttribute("data-start",String(d+1))}T.textContent=u,c.highlightElement(T)},function(u){_.setAttribute(n,h),T.textContent=u})}}),c.plugins.fileHighlight={highlight:function(_){for(var T=(_||document).querySelectorAll(x),a=0,s;s=T[a++];)c.highlightElement(s)}};var F=!1;c.fileHighlight=function(){F||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),F=!0),c.plugins.fileHighlight.highlight.apply(this,arguments)}})()});var pr={};Mt(pr,{BUILD_ID:()=>dr,TempleComponent:()=>S.TempleComponent,TempleElement:()=>S.TempleElement,TempleEmitter:()=>S.TempleEmitter,TempleException:()=>S.TempleException,TempleRegistry:()=>S.TempleRegistry,children:()=>S.children,components:()=>cr,data:()=>S.data,emitter:()=>S.emitter,props:()=>S.props,signal:()=>S.signal});var R=M(I());var Oe=M(I()),X=class extends Oe.TempleComponent{static component=["main","Main_fd7f1af6410c5b5c8e1f"];styles(){return""}template(){let e=this.props,r=()=>this.originalChildren;return()=>[Oe.TempleRegistry.createElement("main",{},[...this._toNodeList(r())]).element]}};var $=M(I()),V=M(J()),Q=class extends $.TempleComponent{static component=["button","Button_adebe13e99f6c9d5075e"];styles(){return`:host {
    --black: #222222;
    --white: #FCFCFC;
    --info: #1474FC;
    --error: #DC3545;
    --warning: #FF7B07;
    --success: #28A745;
    --muted: #999999;
    --primary: #E49F1A;
    --secondary: #DA532C;
  }

  /* Text Colors
  ---------------------------------*/
  .tx-white {
    color: var(--white);
  }
  .tx-info {
    color: var(--info);
  }
  .tx-error {
    color: var(--error);
  }
  .tx-warning {
    color: var(--warning);
  }
  .tx-success {
    color: var(--success);
  }
  .tx-muted {
    color: var(--muted);
  }
  .tx-primary {
    color: var(--primary);
  }
  .tx-secondary {
    color: var(--secondary);
  }
  
  /* Generic
  ---------------------------------*/
  .block {
    display: block;
  }
  .full {
    width: 100%;
  }

  /* Borders
  ---------------------------------*/
  .curved {
    border-radius: 5px;
  }
  .rounded {
    border-radius:12px;
  }
  .pill {
    border-radius: 10000px;
  }
  .solid {
    border-style: solid;
  }
  .dash {
    border-style: dashed;
  }
  .dotted {
    border-style: dotted;
  }
  .thin {
    border-width: 1px;
  }
  .thick {
    border-width: 5px;
  }

  .bd-info {
    border-color: var(--info);
  }
  .bd-error {
    border-color: var(--error);
  }
  .bd-warning {
    border-color: var(--warning);
  }
  .bd-success {
    border-color: var(--success);
  }
  .bd-muted {
    border-color: var(--muted);
  }
  .bd-primary {
    border-color: var(--primary);
  }
  .bd-secondary {
    border-color: var(--secondary);
  }

  /* Backgrounds
  ---------------------------------*/
  .bg-white {
    background-color: var(--white);
  }
  .bg-info {
    background-color: var(--info);
  }
  .bg-error {
    background-color: var(--error);
  }
  .bg-warning {
    background-color: var(--warning);
  }
  .bg-success {
    background-color: var(--success);
  }
  .bg-muted {
    background-color: var(--muted);
  }
  .bg-primary {
    background-color: var(--primary);
  }
  .bg-secondary {
    background-color: var(--secondary);
  }

  /* Padding
  ---------------------------------*/
  .pd-xs {
    padding: 2px 4px;
  }
  .pd-sm {
    padding: 4px 8px;
  }
  .pd-md {
    padding: 6px 12px;
  }
  .pd-lg {
    padding: 8px 16px;
  }
  .pd-xl {
    padding: 10px 20px;
  }
  .pd-2xl {
    padding: 12px 24px;
  }
  .pd-3xl {
    padding: 14px 28px;
  }
  .pd-4xl {
    padding: 16px 32px;
  }
  .pd-5xl {
    padding: 18px 36px;
  }

  /* Button
  ---------------------------------*/
  .button, .button:link, .button:hover, .button:active .button:visited {
    border: 0;
    display: inline-block;
    text-align: center;
    text-decoration: none;
  }`}template(){let{block:e,full:r,color:i,xs:n,sm:f,md:m,lg:h,xl:x,xl2:k,xl3:y,xl4:F,xl5:A,curved:_,rounded:T,pill:a,info:s,warning:l,success:o,error:u,muted:p,primary:b,secondary:d,outline:w,transparent:O,solid:N,style:be,href:W,..._e}=(0,V.props)(),v={classes:["button"],styles:""};e&&v.classes.push("block"),r&&v.classes.push("full");let ve=n?"xs":f?"sm":m?"md":h?"lg":x?"xl":k?"2xl":y?"3xl":F?"4xl":A?"5xl":"md";v.classes.push(`pd-${ve}`);let P=w?"outline":O?"transparent":"solid";_?v.classes.push("curved"):T?v.classes.push("rounded"):a&&v.classes.push("pill"),P==="outline"||P==="transparent"?(v.classes.push("solid","thin"),P==="outline"&&v.classes.push("bg-white"),i?(v.styles+=`border-color: ${i};`,v.styles+=`color: ${i};`):s?v.classes.push("bd-info","tx-info"):l?v.classes.push("bd-warning","tx-warning"):o?v.classes.push("bd-success","tx-success"):u?v.classes.push("bd-error","tx-error"):p?v.classes.push("bd-muted","tx-muted"):b?v.classes.push("bd-primary","tx-primary"):d&&v.classes.push("bd-secondary","tx-secondary")):(v.classes.push("tx-white"),i?v.styles+=`background-color: ${i};`:s?v.classes.push("bg-info"):l?v.classes.push("bg-warning"):o?v.classes.push("bg-success"):u?v.classes.push("bg-error"):p?v.classes.push("bg-muted"):b?v.classes.push("bg-primary"):d&&v.classes.push("bg-secondary"));let L={classes:[...v.classes,(0,V.classnames)()].join(" "),styles:v.styles+be},H=(0,V.children)();return()=>[$.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}).element,$.TempleRegistry.createText(`
`,!1),...W?[$.TempleRegistry.createText(`
  `,!1),$.TempleRegistry.createElement("a",{class:L.classes,style:L.styles,href:W,..._e},[$.TempleRegistry.createText(`
    `,!1),...this._toNodeList(H),$.TempleRegistry.createText(`
  `,!1)]).element,$.TempleRegistry.createText(`
`,!1)]:[],$.TempleRegistry.createText(`
`,!1),...W?[]:[$.TempleRegistry.createText(`
  `,!1),$.TempleRegistry.createElement("button",{class:L.classes,style:L.styles,..._e},[$.TempleRegistry.createText(`
    `,!1),...this._toNodeList(H),$.TempleRegistry.createText(`
  `,!1)]).element,$.TempleRegistry.createText(`
`,!1)]]}};var E=M(I()),Xe=M(Tt()),Et=M(J()),ee=class extends E.TempleComponent{static component=["code","Code_6f36bc13bb6a166c7abc"];styles(){return`:host {
    display: block;
    font-size: 14px;
    line-height: 20px;
  }
  :host([inline]) {
    display: inline;
  }
  :host([inline]),
  :host([inline]) > pre,
  :host([inline]) > pre > code {
    display: inline;
  }
  .snippet {
    background-color: #000000;
    color: #ABB2BF;
    margin: 0;
    padding: 0;
  }

  .line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }
  :host([inline]) .line-numbers {
    position: static;
    padding-left: 0;
  }

  .line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px solid #999;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }

  :host([inline]) .line-numbers .line-numbers-rows {
    display: none;
  }

  .line-numbers-rows > span {
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
  .pad {
    padding: 5px;
  }

  .terminal {
    background-color: #000000;
    font-size: 15px;
    padding: 10px;
  }
  .terminal span {
    color: #00FF00;
  }`}template(){let e=this.props,{lang:r="markup",numbers:i=!1,inline:n=!1,trim:f=!1,ltrim:m=!1,rtrim:h=!1,detab:x=0}=e,k=(0,Et.children)(),y=k[0]?.textContent||"";x&&(y=y.replace(new RegExp(`\\n {${x}}`,"g"),`
`)),f?y=y.trim():m?y=y.replace(/^\s+/,""):h&&(y=y.replace(/\s+$/,""));let F=A=>{if(!y)return;let _=Xe.default.highlight(y,Xe.default.languages[r],r);if(A.detail.target.innerHTML=_,i){let T=_.match(/\n(?!$)/g),a=T?T.length+1:1,s=new Array(a+1).join("<span></span>"),l=document.createElement("span");l.setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=s,A.detail.target.appendChild(l)}};return()=>[E.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css"}).element,E.TempleRegistry.createText(`
`,!1),E.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css"}).element,E.TempleRegistry.createText(`
`,!1),...r==="bash"?[E.TempleRegistry.createText(`
  `,!1),E.TempleRegistry.createElement("div",{class:"terminal"},[E.TempleRegistry.createElement("span",{},[E.TempleRegistry.createText("$",!1)]).element,E.TempleRegistry.createText(" ",!1),...this._toNodeList(k)]).element,E.TempleRegistry.createText(`
`,!1)]:y?[,E.TempleRegistry.createText(`
  `,!1),...i?[E.TempleRegistry.createText(`
    `,!1),E.TempleRegistry.createElement("pre",{class:"snippet line-numbers"},[E.TempleRegistry.createElement("code",{mount:F},[]).element]).element,E.TempleRegistry.createText(`
  `,!1)]:[,E.TempleRegistry.createText(`
    `,!1),E.TempleRegistry.createElement("pre",{class:"snippet pad"},[E.TempleRegistry.createElement("code",{mount:F},[]).element]).element,E.TempleRegistry.createText(`
  `,!1)],E.TempleRegistry.createText(`
`,!1)]:[]]}};var te=M(I()),kt=M(J()),re=class extends te.TempleComponent{static component=["preview","Preview_f99bb2771682cb0390ea"];styles(){return`:host {
    display: block;
  }
  .preview {
    background-color: #EFEFEF;
    color: #222222;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    padding: 10px;
  }`}template(){return()=>[te.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"}).element,te.TempleRegistry.createText(`
`,!1),te.TempleRegistry.createElement("div",{class:"preview"},[...this._toNodeList((0,kt.children)())]).element]}};var C=M(I()),Me=M(J()),ne=class extends C.TempleComponent{static component=["app","App_05341fddbfd1fe4f273b"];styles(){return""}template(){let{title:e,panel:r}=(0,Me.props)(),i=`body ${r?"panel":""}`,n=r?`height:${r}px`:"";return()=>[C.TempleRegistry.createText(`
`,!1),C.TempleRegistry.createElement("div",{class:"window"},[C.TempleRegistry.createText(`
  `,!1),C.TempleRegistry.createElement("div",{class:"head"},[C.TempleRegistry.createText(`
    `,!1),C.TempleRegistry.createElement("span",{class:"dot"},[]).element,C.TempleRegistry.createText(`
    `,!1),C.TempleRegistry.createElement("span",{class:"dot"},[]).element,C.TempleRegistry.createText(`
    `,!1),C.TempleRegistry.createElement("span",{class:"dot"},[]).element,C.TempleRegistry.createText(`
    `,!1),C.TempleRegistry.createElement("span",{class:"title"},[...this._toNodeList(e)]).element,C.TempleRegistry.createText(`
  `,!1)]).element,C.TempleRegistry.createText(`
  `,!1),C.TempleRegistry.createElement("div",{class:i,style:n},[...this._toNodeList((0,Me.children)())]).element,C.TempleRegistry.createText(`
`,!1)]).element]}};var q=M(I());var Qe=function(t,...e){let r=Ve(t);for(let i=0;i<e.length;i++)r=r.replace("%s",String(e[i]));return r},Ve=function(t){return t};var $e=M(J()),se=class extends q.TempleComponent{static component=["translate","Translate_7d25e372f5ffb5e39dad"];styles(){return""}template(){let{trim:e=!1,p:r=!1,li:i=!1,div:n=!1}=(0,$e.props)(),f=(0,$e.children)(),m=[],h=[];for(let F of f)typeof F=="string"?m.push(F):F instanceof Node&&F.textContent?m.push(F.textContent):(m.push("%s"),h.push(F));let x=m.join("");e&&(x=x.replace(/\s+/," ").trim());let k=Ve(x).split("%s"),y=[];for(let F=0;F<k.length;F++)y.push(document.createTextNode(k[F])),h[F]&&y.push(h[F]);return()=>[q.TempleRegistry.createText(`
    `,!1),...r?[q.TempleRegistry.createText(`
      `,!1),q.TempleRegistry.createElement("p",{},[...this._toNodeList(y)]).element,q.TempleRegistry.createText(`
    `,!1)]:i?[,q.TempleRegistry.createText(`
      `,!1),q.TempleRegistry.createElement("li",{},[...this._toNodeList(y)]).element,q.TempleRegistry.createText(`
    `,!1)]:n?[,q.TempleRegistry.createText(`
      `,!1),q.TempleRegistry.createElement("div",{},[...this._toNodeList(y)]).element,q.TempleRegistry.createText(`
    `,!1)]:[,q.TempleRegistry.createText(`
      `,!1),...this._toNodeList(y),q.TempleRegistry.createText(`
    `,!1)]]}};var j=M(I()),Le=M(J()),ae=class extends j.TempleComponent{static component=["tweet-box","TweetBox_5d0865ca9f2b26ab6c62"];styles(){return`a, a:link, a:hover, a:active, a:visited {
    color: var(--fg-primary);
    text-decoration: none;
  }
  :host {
    display: block;
  }
  .tweet-box {
    background-color: #131313;
    border: 1px solid #000000;
    border-radius: 5px;
    display: flex;
    margin: 10px;
    padding: 20px;
  }
  .tweet-box .avatar {
    margin-right: 20px;
  }
  .tweet-box .avatar img {
    border-radius: 50%;
    width: 60px;
  }
  .tweet-box .content {
    flex: 1;
  }
  .tweet-box .content h3 {
    font-size: 16px;
    margin: 0;
  }
  .tweet-box .content a {
    font-size: 12px;
  }

  .tweet-box .content .message {
    font-size: 14px;
    line-height: 24px;
  }`}template(){let{name:e,handle:r,href:i,src:n}=(0,Le.props)();return()=>[j.TempleRegistry.createText(`
`,!1),j.TempleRegistry.createElement("main",{class:"tweet-box"},[j.TempleRegistry.createText(`
  `,!1),j.TempleRegistry.createElement("aside",{class:"avatar"},[j.TempleRegistry.createText(`
    `,!1),j.TempleRegistry.createElement("img",{src:n,alt:r}).element,j.TempleRegistry.createText(`
  `,!1)]).element,j.TempleRegistry.createText(`
  `,!1),j.TempleRegistry.createElement("section",{class:"content"},[j.TempleRegistry.createText(`
    `,!1),j.TempleRegistry.createElement("h3",{},[...this._toNodeList(e)]).element,j.TempleRegistry.createText(`
    `,!1),j.TempleRegistry.createElement("a",{href:i,target:"_blank"},[...this._toNodeList(r)]).element,j.TempleRegistry.createText(`
    `,!1),j.TempleRegistry.createElement("div",{class:"message"},[...this._toNodeList((0,Le.children)())]).element,j.TempleRegistry.createText(`
  `,!1)]).element,j.TempleRegistry.createText(`
`,!1)]).element]}};var S=M(I());R.emitter.once("ready",()=>{let t=document.querySelector("script[data-app]");if(!t)throw R.TempleException.for("APP_DATA not found");try{let m=atob(t.getAttribute("data-app"));window.__APP_DATA__=JSON.parse(m),Object.entries(window.__APP_DATA__).forEach(([h,x])=>{R.data.set(h,x)})}catch{throw R.TempleException.for("APP_DATA is not a valid JSON")}R.data.set("current","document");let e="/temple/index.html",r=Qe("Temple - The reactive web component template engine."),i=Qe("Temple is a template engine that generates web components and support reactivity."),n=m=>{document.body.classList.toggle("panel-left-open")};R.data.delete("current");let f={0:{class:"head panel-head"},1:{class:"menu fas fa-fw fa-bars",click:n},2:{href:"/temple"},3:{src:"/temple/temple-icon.png",alt:"Temple Logo"},5:{class:"tx-white",href:"/temple"},7:{class:"tx-white",href:"/temple/docs/index.html"},8:{class:"github",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},9:{class:"fab fa-github"},10:{class:"npm",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},11:{class:"fab fa-npm text-white"},12:{class:"discord",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},13:{class:"fab fa-discord text-white"},14:{class:"panel-main"},15:{class:"section-hero"},16:{src:"/temple/temple-icon.png",alt:"Temple Logo"},18:{p:!0,trim:!0},19:{primary:!0,xl:!0,rounded:!0,style:"margin-right:10px;",href:"/temple/docs/getting-started.html"},20:{secondary:!0,xl:!0,rounded:!0,href:"/temple/docs/index.html"},21:{class:"section-sample"},22:{p:!0,trim:!0},23:{title:"Basic Example"},24:{class:"split-view"},25:{numbers:!0,trim:!0,detab:14},29:{class:"section-bullets"},33:{p:!0,trim:!0},36:{p:!0,trim:!0},39:{p:!0,trim:!0},40:{class:"section-interactive"},42:{p:!0,trim:!0},43:{title:"Server Example"},44:{lang:"js",numbers:!0,trim:!0,detab:12},46:{p:!0,trim:!0},47:{title:"Props Example"},48:{class:"split-view"},49:{numbers:!0,trim:!0,detab:14},54:{p:!0,trim:!0},55:{title:"Signal Example"},56:{class:"split-view"},57:{numbers:!0,trim:!0,detab:14},62:{p:!0,trim:!0},63:{title:"Import Example"},64:{class:"split-view"},65:{numbers:!0,trim:!0,detab:14},66:{class:"div",trim:!0,detab:14},68:{p:!0,trim:!0},69:{title:"Conditional + Iteration Example"},70:{class:"split-view"},71:{numbers:!0,trim:!0,detab:14},72:{class:"div",trim:!0,detab:14},73:{class:"section-servers"},76:{href:"https://expressjs.com/",target:"_blank"},77:{src:"https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",alt:"Express"},78:{href:"https://fastify.dev/",target:"_blank"},79:{src:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Fastify_logo.svg",alt:"Fastify"},80:{href:"https://hapi.dev/",target:"_blank"},81:{src:"https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png",alt:"Hapi"},82:{href:"https://koajs.com/",target:"_blank"},83:{src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/koajs_logo_icon_168379.png",alt:"Koa"},84:{href:"https://nestjs.com/",target:"_blank"},85:{src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png",alt:"NestJS"},86:{href:"http://restify.com/",target:"_blank"},87:{src:"https://raw.githubusercontent.com/restify/node-restify/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true",alt:"Restify"},88:{class:"section-testimonials"},91:{name:"Joff Tiquez",handle:"@jrtiquez",href:"https://twitter.com/jrtiquez",src:"https://github.com/jofftiquez.png"},93:{name:"Primeagen",handle:"@theprimeagen",href:"https://twitter.com/ThePrimeagen",src:"https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"},96:{name:"Kristian Quirapas",handle:"@YourCompanyCTO",href:"https://twitter.com/YourCompanyCTO",src:"https://avatars.githubusercontent.com/u/85150796?v=4"},98:{name:"Drizzle Team",handle:"@drizzle.team",href:"https://twitter.com/DrizzleORM",src:"https://pbs.twimg.com/profile_images/1767809210060877824/mAtEmNk0_400x400.jpg"},100:{name:"Chris B",handle:"@cblanquera",href:"https://twitter.com/cblanquera",src:"https://avatars.githubusercontent.com/u/120378?v=4"},102:{name:"Theo",handle:"@t3dotgg",href:"https://twitter.com/t3dotgg",src:"https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s160-c-k-c0x00ffffff-no-rj"},104:{class:"section-action"},106:{primary:!0,xl:!0,rounded:!0,style:"margin-right:10px;",href:"/temple/docs/getting-started.html"},107:{secondary:!0,xl:!0,rounded:!0,href:"/temple/docs/index.html"},108:{class:"foot"}};for(let m of document.body.querySelectorAll("*")){let h=Object.fromEntries(Array.from(m.attributes).map(k=>[k.nodeName,k.nodeValue.length>0?k.nodeValue:!0])),x=String(R.TempleRegistry.elements.size);f[x]&&(Object.assign(h,f[x]),m.TempleAttributes=f[x]),R.TempleRegistry.register(m,h)}customElements.define("panel-main",X),customElements.define("tui-button",Q),customElements.define("ide-code",ee),customElements.define("ide-preview",re),customElements.define("ide-app",ne),customElements.define("i18n-translate",se),customElements.define("tweet-box",ae),R.emitter.emit("mounted",document.body)});var cr={PanelMain_fd7f1af6410c5b5c8e1f:X,TuiButton_adebe13e99f6c9d5075e:Q,IdeCode_6f36bc13bb6a166c7abc:ee,IdePreview_f99bb2771682cb0390ea:re,IdeApp_05341fddbfd1fe4f273b:ne,I18nTranslate_7d25e372f5ffb5e39dad:se,TweetBox_5d0865ca9f2b26ab6c62:ae},dr="f01cefc94e8ee605f3f5";return $t(pr);})();
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
