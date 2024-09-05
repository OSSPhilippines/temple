var TempleAPI=(()=>{var Rt=Object.create;var ve=Object.defineProperty;var Dt=Object.getOwnPropertyDescriptor;var Ct=Object.getOwnPropertyNames;var Pt=Object.getPrototypeOf,Mt=Object.prototype.hasOwnProperty;var C=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Lt=(t,e)=>{for(var r in e)ve(t,r,{get:e[r],enumerable:!0})},tt=(t,e,r,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ct(e))!Mt.call(t,s)&&s!==r&&ve(t,s,{get:()=>e[s],enumerable:!(l=Dt(e,s))||l.enumerable});return t};var P=(t,e,r)=>(r=t!=null?Rt(Pt(t)):{},tt(e||!t||!t.__esModule?ve(r,"default",{value:t,enumerable:!0}):r,t)),Ot=t=>tt(ve({},"__esModule",{value:!0}),t);var Ne=C($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});var Ie=class extends Error{static for(e,...r){return r.forEach(function(l){e=e.replace("%s",l)}),new this(e)}static forErrorsFound(e){let r=new this("Invalid Parameters");return r.errors=e,r}static require(e,r,...l){if(!e){for(let s of l)r=r.replace("%s",s);throw new this(r)}}constructor(e,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=e,this.name=this.constructor.name,this.code=r}withCode(e){return this.code=e,this}withPosition(e,r){return this.start=e,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};$e.default=Ie});var ie=C(se=>{"use strict";Object.defineProperty(se,"__esModule",{value:!0});se.TempleEmitter=void 0;var Te=class extends EventTarget{emit(e,r){return this.dispatchEvent(new CustomEvent(e,{detail:r})),this}on(e,r){if(e==="ready"&&document.readyState!=="loading"){let l=new CustomEvent("ready");return setTimeout(()=>r(l),1),this}return this.addEventListener(e,r),this}once(e,r){let l=s=>{this.unbind(e,l),r(s)};return this.on(e,l),this}unbind(e,r){return this.removeEventListener(e,r),this}};se.TempleEmitter=Te;var rt=new Te;document.onreadystatechange=()=>{document.readyState!=="loading"&&rt.emit("ready")};se.default=rt});var qe=C(ae=>{"use strict";var It=ae&&ae.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ae,"__esModule",{value:!0});var Be=It(ie()),He=class{get attributes(){return Object.assign({},this._attributes)}get element(){return this._element}constructor(e,r){this._element=e,this._attributes=r}hasAttribute(e){return e in this._attributes}getAttribute(e){return this._attributes[e]}removeAttribute(e,r=!1){let l=this.getAttribute(e);return typeof l>"u"?this:(delete this._attributes[e],this._element.removeAttribute(e),r||Be.default.emit("attribute-remove",{element:this,key:e,previous:l}),this)}setAttribute(e,r,l=!1){if(typeof r>"u")return this.removeAttribute(e,l);let s=this.getAttribute(e);return s===r?this:(this._attributes[e]=r,typeof r=="string"&&this._element.setAttribute(e,r),l||(typeof s>"u"?Be.default.emit("attribute-create",{element:this,key:e,value:r}):Be.default.emit("attribute-update",{element:this,key:e,value:r,previous:s})),this)}setAttributes(e,r=!1){for(let[s,m]of Object.entries(e))this.setAttribute(s,m,r);let l=Object.keys(e);for(let s of Object.keys(this._attributes))l.includes(s)||this.removeAttribute(s,r);return this}};ae.default=He});var _e=C(le=>{"use strict";var $t=le&&le.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(le,"__esModule",{value:!0});var Nt=$t(qe()),we=class{static get elements(){return this._elements}static createComponent(e,r,l,s=[]){let m=document.createElement("template");m.innerHTML=`<${e}></${e}>`;let d=m.content.querySelector(`${e}`);Object.setPrototypeOf(d,r.prototype),d.constructor=r.constructor,d.constructor.component=r.component;for(let[x,b]of Object.entries(l))typeof b=="string"?d.setAttribute(x,b):b===!0&&d.setAttribute(x,x);return d._TempleAttributes=l,d.props=l,s.forEach(x=>d.appendChild(x)),d.register(),customElements.get(e)||d.connectedCallback(),this.register(d,l)}static createElement(e,r,l=[]){let s=document.createElement(e);for(let[m,h]of Object.entries(r))typeof h=="string"?s.setAttribute(m,h):h===!0&&s.setAttribute(m,m);return l.filter(m=>typeof m<"u").forEach(m=>s.appendChild(m)),this.register(s,r)}static createText(e,r=!1){return document.createTextNode(e)}static filter(e){let r=[];return this._elements.forEach((l,s)=>{e(l,s)&&r.push(l)}),r}static get(e){return this._elements.get(e)||null}static has(e){return this._elements.has(e)}static map(e){let r=[];return this._elements.forEach((l,s)=>{r.push(e(l,s))}),r}static register(e,r){if(this.has(e))return this.get(e);let l=new Nt.default(e,r||{});return this._elements.set(e,l),l}};we._elements=new Map;le.default=we});var z=C(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.TempleDataMap=void 0;var Ee=class{constructor(){window.__APP_DATA__||(window.__APP_DATA__={})}clear(){return window.__APP_DATA__={},this}delete(e){return this.has(e)?(delete window.__APP_DATA__[e],!0):!1}entries(){return Object.entries(window.__APP_DATA__)}has(e){return e in window.__APP_DATA__}get(e){return window.__APP_DATA__[e]}keys(){return Object.keys(window.__APP_DATA__)}set(e,r){return window.__APP_DATA__[e]=r,this}values(){return Object.values(window.__APP_DATA__)}};oe.TempleDataMap=Ee;var Bt=new Ee;oe.default=Bt});var st=C(ce=>{"use strict";var Je=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});var pe=Je(_e()),Ae=Je(ie()),nt=Je(z()),ze=class t extends HTMLElement{constructor(){super(...arguments),this._initiated=!1,this._template=null,this._attributes={},this._props={},this._children=void 0,this._rendering=!1}static register(){customElements.define(this.component[0],this)}get attr(){return this._attributes}get element(){return pe.default.has(this)?pe.default.get(this):pe.default.register(this,this._TempleAttributes||{})}get metadata(){let[e,r]=this.constructor.component;return{tagname:e,classname:r}}get originalChildren(){return this._children}get initiated(){return this._initiated}get props(){return this._props}set props(e){this._props=Object.assign({},e),this._attributes=Object.fromEntries(Object.entries(e).filter(r=>typeof r[1]=="string"||r[1]===!0))}adoptedCallback(){this.render()}attributeChangedCallback(e,r,l){this.props=Object.assign(Object.assign({},this.props),{[e]:l}),this.render()}connectedCallback(){this.wait()}disconnectedCallback(){}getParentComponent(){let e=this.parentElement;for(;e;){if(e instanceof t)return e;e=e.parentElement}return null}register(){pe.default.register(this,this._props)}render(){let e=this.getParentComponent();if(e&&!e.initiated)return;if(this._rendering)return;this._rendering=!0,nt.default.set("current",this);let r=this.styles();this._template?Ae.default.emit("unmounted",this):this._template=this.template();let l=this._template().filter(Boolean);if(r.length===0)this.textContent="",l.forEach(s=>this.appendChild(s));else{this.shadowRoot||this.attachShadow({mode:"open"});let s=this.shadowRoot;this.textContent="",s.textContent="";let m=document.createElement("style");m.innerText=r,s.appendChild(m),l.forEach(h=>{var d;return(d=this.shadowRoot)===null||d===void 0?void 0:d.appendChild(h)})}return nt.default.delete("current"),this._initiated=!0,Ae.default.emit("mounted",this),this._rendering=!1,this.shadowRoot?this.shadowRoot.innerHTML:this.innerHTML}wait(){if(document.readyState!=="loading")this._update();else{let e=()=>{this._update(),Ae.default.unbind("ready",e)};Ae.default.on("ready",e)}}_toNodeList(e){return e instanceof Node?[e]:Array.isArray(e)&&e.every(r=>r instanceof Node)?e:[pe.default.createText(String(e))]}_update(){typeof this._children>"u"&&(this._children=Array.from(this.childNodes||[]));let e=this.element;e&&(this.props=Object.assign({},e.attributes),this.render()),this._initiated||this.render()}};ce.default=ze});var it=C(de=>{"use strict";var Ht=de&&de.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(de,"__esModule",{value:!0});var qt=Ht(z());function zt(t){let e=qt.default.get("env")||{};return t?e[t]||null:e}de.default=zt});var Ge=C(ue=>{"use strict";var Jt=ue&&ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ue,"__esModule",{value:!0});ue.default=Gt;var at=Jt(z());function Gt(t=null){return t||(t=at.default.get("current")||null),t?t==="document"?at.default.get("props")||{}:t.props:{}}});var lt=C(me=>{"use strict";var Wt=me&&me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(me,"__esModule",{value:!0});me.default=Zt;var Ut=Wt(Ge());function Zt(t=null){return(0,Ut.default)(t).class}});var pt=C(Z=>{"use strict";var Xt=Z&&Z.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Z,"__esModule",{value:!0});Z.innerHTML=Vt;Z.default=ot;var Yt=Xt(z());function Vt(t=null){let e=ot(t),r=document.createElement("template");return r.append(...e),r.innerHTML}function ot(t=null){return t||(t=Yt.default.get("current")||null),t?t.originalChildren||[]:[]}});var ut=C(J=>{"use strict";var dt=J&&J.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(J,"__esModule",{value:!0});J.SignalRegistry=void 0;J.default=Qt;var ct=dt(Ne()),Kt=dt(z()),X=class t{static observe(e,r){let l={getter:()=>s.raw,setter:h=>h},s={raw:r,getter(h){return l.getter=h,s},setter(h){return l.setter=h,s}};Object.defineProperty(s,"value",{get(){return l.getter()},set(h){let d=l.setter(h),x=t.serialize(d)!==t.serialize(s.raw);s.raw=d,x&&e.render()}});let m=this._observers.get(e);return m?(m.observed++,m.values.push(s)):this._observers.set(e,{observed:1,values:[s]}),s}static observer(e){return this._observers.get(e)||null}static serialize(e){return JSON.stringify(e)}};J.SignalRegistry=X;X._observers=new Map;function Qt(t,e=null){if(e||(e=Kt.default.get("current")||null),!e)throw ct.default.for("Signals can only be created within a Temple component");if(!e.initiated)return X.observe(e,t);let r=X.observer(e);if(!r)throw ct.default.for("State mismatch");return r.values[r.observed++%r.values.length]}});var yt=C(je=>{"use strict";var ft=je&&je.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(je,"__esModule",{value:!0});var mt=ft(_e()),gt=ft(ie()),ht=(t,e)=>Array.from(t.querySelectorAll("*")).filter(r=>{let l=mt.default.get(r);return l&&l.hasAttribute(e)}).map(r=>mt.default.get(r));function We(t,e){gt.default.on("mounted",r=>{if(!r.detail)return;let l=r.detail;ht(l.shadowRoot||l,t).forEach(e)})}function er(t,e){gt.default.on("unmounted",r=>{if(!r.detail)return;let l=r.detail;ht(l.shadowRoot||l,t).forEach(e)})}We("mount",t=>{let e=t.getAttribute("mount");if(typeof e=="function"){let r=new CustomEvent("mount",{detail:{node:t,target:t.element}});e(r)}});er("unmount",t=>{let e=t.getAttribute("unmount");if(typeof e=="function"){let r=new CustomEvent("unmount",{detail:{node:t,target:t.element}});e(r)}});We("if",t=>{let e=t.getAttribute("if");(e===!1||e==="false"||typeof e=="function"&&!e())&&t.element.remove()});["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","wheel","keydown","keypress","keyup","blur","change","contextmenu","focus","input","submit","invalid","reset","search","select","copy","cut","paste","drag","dragstart","dragend","dragover","dragenter","dragleave","drop","scroll","durationchange","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","animationstart","animationend","animationiteration","transitionend","toggle"].forEach(t=>We(t,e=>{let r=e.getAttribute(t);typeof r=="function"&&(e.element.removeEventListener(t,r),e.element.addEventListener(t,r))}))});var Ue=C(y=>{"use strict";var tr=y&&y.__createBinding||(Object.create?function(t,e,r,l){l===void 0&&(l=r);var s=Object.getOwnPropertyDescriptor(e,r);(!s||("get"in s?!e.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,l,s)}:function(t,e,r,l){l===void 0&&(l=r),t[l]=e[r]}),rr=y&&y.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Fe=y&&y.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&tr(e,t,r);return rr(e,t),e},G=y&&y.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(y,"__esModule",{value:!0});y.SignalRegistry=y.TempleException=y.TempleEmitter=y.TempleElement=y.TempleRegistry=y.TempleComponent=y.TempleDataMap=y.emitter=y.signal=y.innerHTML=y.children=y.classnames=y.props=y.env=y.data=void 0;var nr=G(Ne());y.TempleException=nr.default;var sr=G(st());y.TempleComponent=sr.default;var ir=G(_e());y.TempleRegistry=ir.default;var ar=G(qe());y.TempleElement=ar.default;var bt=Fe(ie());y.emitter=bt.default;Object.defineProperty(y,"TempleEmitter",{enumerable:!0,get:function(){return bt.TempleEmitter}});var xt=Fe(z());y.data=xt.default;Object.defineProperty(y,"TempleDataMap",{enumerable:!0,get:function(){return xt.TempleDataMap}});var lr=G(it());y.env=lr.default;var or=G(Ge());y.props=or.default;var pr=G(lt());y.classnames=pr.default;var kt=Fe(pt());y.children=kt.default;Object.defineProperty(y,"innerHTML",{enumerable:!0,get:function(){return kt.innerHTML}});var vt=Fe(ut());y.signal=vt.default;Object.defineProperty(y,"SignalRegistry",{enumerable:!0,get:function(){return vt.SignalRegistry}});yt()});var $=C((Sr,Tt)=>{Tt.exports={...Ue()}});var wt=C((Dr,Re)=>{var cr=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var u=function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,l={},s={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function n(i){return i instanceof m?new m(i.type,n(i.content),i.alias):Array.isArray(i)?i.map(n):i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++r}),n.__id},clone:function n(i,o){o=o||{};var p,c;switch(s.util.type(i)){case"Object":if(c=s.util.objId(i),o[c])return o[c];p={},o[c]=p;for(var g in i)i.hasOwnProperty(g)&&(p[g]=n(i[g],o));return p;case"Array":return c=s.util.objId(i),o[c]?o[c]:(p=[],o[c]=p,i.forEach(function(k,f){p[f]=n(k,o)}),p);default:return i}},getLanguage:function(n){for(;n;){var i=e.exec(n.className);if(i)return i[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,i){n.className=n.className.replace(RegExp(e,"gi"),""),n.classList.add("language-"+i)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(p){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(p.stack)||[])[1];if(n){var i=document.getElementsByTagName("script");for(var o in i)if(i[o].src==n)return i[o]}return null}},isActive:function(n,i,o){for(var p="no-"+i;n;){var c=n.classList;if(c.contains(i))return!0;if(c.contains(p))return!1;n=n.parentElement}return!!o}},languages:{plain:l,plaintext:l,text:l,txt:l,extend:function(n,i){var o=s.util.clone(s.languages[n]);for(var p in i)o[p]=i[p];return o},insertBefore:function(n,i,o,p){p=p||s.languages;var c=p[n],g={};for(var k in c)if(c.hasOwnProperty(k)){if(k==i)for(var f in o)o.hasOwnProperty(f)&&(g[f]=o[f]);o.hasOwnProperty(k)||(g[k]=c[k])}var j=p[n];return p[n]=g,s.languages.DFS(s.languages,function(R,N){N===j&&R!=n&&(this[R]=g)}),g},DFS:function n(i,o,p,c){c=c||{};var g=s.util.objId;for(var k in i)if(i.hasOwnProperty(k)){o.call(i,k,i[k],p||k);var f=i[k],j=s.util.type(f);j==="Object"&&!c[g(f)]?(c[g(f)]=!0,n(f,o,null,c)):j==="Array"&&!c[g(f)]&&(c[g(f)]=!0,n(f,o,k,c))}}},plugins:{},highlightAll:function(n,i){s.highlightAllUnder(document,n,i)},highlightAllUnder:function(n,i,o){var p={callback:o,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",p),p.elements=Array.prototype.slice.apply(p.container.querySelectorAll(p.selector)),s.hooks.run("before-all-elements-highlight",p);for(var c=0,g;g=p.elements[c++];)s.highlightElement(g,i===!0,p.callback)},highlightElement:function(n,i,o){var p=s.util.getLanguage(n),c=s.languages[p];s.util.setLanguage(n,p);var g=n.parentElement;g&&g.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(g,p);var k=n.textContent,f={element:n,language:p,grammar:c,code:k};function j(N){f.highlightedCode=N,s.hooks.run("before-insert",f),f.element.innerHTML=f.highlightedCode,s.hooks.run("after-highlight",f),s.hooks.run("complete",f),o&&o.call(f.element)}if(s.hooks.run("before-sanity-check",f),g=f.element.parentElement,g&&g.nodeName.toLowerCase()==="pre"&&!g.hasAttribute("tabindex")&&g.setAttribute("tabindex","0"),!f.code){s.hooks.run("complete",f),o&&o.call(f.element);return}if(s.hooks.run("before-highlight",f),!f.grammar){j(s.util.encode(f.code));return}if(i&&t.Worker){var R=new Worker(s.filename);R.onmessage=function(N){j(N.data)},R.postMessage(JSON.stringify({language:f.language,code:f.code,immediateClose:!0}))}else j(s.highlight(f.code,f.grammar,f.language))},highlight:function(n,i,o){var p={code:n,grammar:i,language:o};if(s.hooks.run("before-tokenize",p),!p.grammar)throw new Error('The language "'+p.language+'" has no grammar.');return p.tokens=s.tokenize(p.code,p.grammar),s.hooks.run("after-tokenize",p),m.stringify(s.util.encode(p.tokens),p.language)},tokenize:function(n,i){var o=i.rest;if(o){for(var p in o)i[p]=o[p];delete i.rest}var c=new x;return b(c,c.head,n),d(n,c,i,c.head,0),A(c)},hooks:{all:{},add:function(n,i){var o=s.hooks.all;o[n]=o[n]||[],o[n].push(i)},run:function(n,i){var o=s.hooks.all[n];if(!(!o||!o.length))for(var p=0,c;c=o[p++];)c(i)}},Token:m};t.Prism=s;function m(n,i,o,p){this.type=n,this.content=i,this.alias=o,this.length=(p||"").length|0}m.stringify=function n(i,o){if(typeof i=="string")return i;if(Array.isArray(i)){var p="";return i.forEach(function(j){p+=n(j,o)}),p}var c={type:i.type,content:n(i.content,o),tag:"span",classes:["token",i.type],attributes:{},language:o},g=i.alias;g&&(Array.isArray(g)?Array.prototype.push.apply(c.classes,g):c.classes.push(g)),s.hooks.run("wrap",c);var k="";for(var f in c.attributes)k+=" "+f+'="'+(c.attributes[f]||"").replace(/"/g,"&quot;")+'"';return"<"+c.tag+' class="'+c.classes.join(" ")+'"'+k+">"+c.content+"</"+c.tag+">"};function h(n,i,o,p){n.lastIndex=i;var c=n.exec(o);if(c&&p&&c[1]){var g=c[1].length;c.index+=g,c[0]=c[0].slice(g)}return c}function d(n,i,o,p,c,g){for(var k in o)if(!(!o.hasOwnProperty(k)||!o[k])){var f=o[k];f=Array.isArray(f)?f:[f];for(var j=0;j<f.length;++j){if(g&&g.cause==k+","+j)return;var R=f[j],N=R.inside,Ve=!!R.lookbehind,Ke=!!R.greedy,At=R.alias;if(Ke&&!R.pattern.global){var jt=R.pattern.toString().match(/[imsuy]*$/)[0];R.pattern=RegExp(R.pattern.source,jt+"g")}for(var Qe=R.pattern||R,D=p.next,I=c;D!==i.tail&&!(g&&I>=g.reach);I+=D.value.length,D=D.next){var U=D.value;if(i.length>n.length)return;if(!(U instanceof m)){var ye=1,O;if(Ke){if(O=h(Qe,I,n,Ve),!O||O.index>=n.length)break;var be=O.index,Ft=O.index+O[0].length,B=I;for(B+=D.value.length;be>=B;)D=D.next,B+=D.value.length;if(B-=D.value.length,I=B,D.value instanceof m)continue;for(var ne=D;ne!==i.tail&&(B<Ft||typeof ne.value=="string");ne=ne.next)ye++,B+=ne.value.length;ye--,U=n.slice(I,B),O.index-=I}else if(O=h(Qe,0,U,Ve),!O)continue;var be=O.index,xe=O[0],Me=U.slice(0,be),et=U.slice(be+xe.length),Le=I+U.length;g&&Le>g.reach&&(g.reach=Le);var ke=D.prev;Me&&(ke=b(i,ke,Me),I+=Me.length),T(i,ke,ye);var St=new m(k,N?s.tokenize(xe,N):xe,At,xe);if(D=b(i,ke,St),et&&b(i,D,et),ye>1){var Oe={cause:k+","+j,reach:Le};d(n,i,o,D.prev,I,Oe),g&&Oe.reach>g.reach&&(g.reach=Oe.reach)}}}}}}function x(){var n={value:null,prev:null,next:null},i={value:null,prev:n,next:null};n.next=i,this.head=n,this.tail=i,this.length=0}function b(n,i,o){var p=i.next,c={value:o,prev:i,next:p};return i.next=c,p.prev=c,n.length++,c}function T(n,i,o){for(var p=i.next,c=0;c<o&&p!==n.tail;c++)p=p.next;i.next=p,p.prev=i,n.length-=c}function A(n){for(var i=[],o=n.head.next;o!==n.tail;)i.push(o.value),o=o.next;return i}if(!t.document)return t.addEventListener&&(s.disableWorkerMessageHandler||t.addEventListener("message",function(n){var i=JSON.parse(n.data),o=i.language,p=i.code,c=i.immediateClose;t.postMessage(s.highlight(p,s.languages[o],o)),c&&t.close()},!1)),s;var w=s.util.currentScript();w&&(s.filename=w.src,w.hasAttribute("data-manual")&&(s.manual=!0));function v(){s.manual||s.highlightAll()}if(!s.manual){var _=document.readyState;_==="loading"||_==="interactive"&&w&&w.defer?document.addEventListener("DOMContentLoaded",v):window.requestAnimationFrame?window.requestAnimationFrame(v):window.setTimeout(v,16)}return s}(cr);typeof Re<"u"&&Re.exports&&(Re.exports=u);typeof global<"u"&&(global.Prism=u);u.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};u.languages.markup.tag.inside["attr-value"].inside.entity=u.languages.markup.entity;u.languages.markup.doctype.inside["internal-subset"].inside=u.languages.markup;u.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(u.languages.markup.tag,"addInlined",{value:function(e,r){var l={};l["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:u.languages[r]},l.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:l}};s["language-"+r]={pattern:/[\s\S]+/,inside:u.languages[r]};var m={};m[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:s},u.languages.insertBefore("markup","cdata",m)}});Object.defineProperty(u.languages.markup.tag,"addAttribute",{value:function(t,e){u.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:u.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});u.languages.html=u.languages.markup;u.languages.mathml=u.languages.markup;u.languages.svg=u.languages.markup;u.languages.xml=u.languages.extend("markup",{});u.languages.ssml=u.languages.xml;u.languages.atom=u.languages.xml;u.languages.rss=u.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var r=t.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))})(u);u.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};u.languages.javascript=u.languages.extend("clike",{"class-name":[u.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});u.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;u.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:u.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:u.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:u.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:u.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:u.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});u.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:u.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});u.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});u.languages.markup&&(u.languages.markup.tag.addInlined("script","javascript"),u.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));u.languages.js=u.languages.javascript;(function(){if(typeof u>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(w,v){return"\u2716 Error "+w+" while fetching file: "+v},r="\u2716 Error: File does not exist or is empty",l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},s="data-src-status",m="loading",h="loaded",d="failed",x="pre[data-src]:not(["+s+'="'+h+'"]):not(['+s+'="'+m+'"])';function b(w,v,_){var n=new XMLHttpRequest;n.open("GET",w,!0),n.onreadystatechange=function(){n.readyState==4&&(n.status<400&&n.responseText?v(n.responseText):n.status>=400?_(e(n.status,n.statusText)):_(r))},n.send(null)}function T(w){var v=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(w||"");if(v){var _=Number(v[1]),n=v[2],i=v[3];return n?i?[_,Number(i)]:[_,void 0]:[_,_]}}u.hooks.add("before-highlightall",function(w){w.selector+=", "+x}),u.hooks.add("before-sanity-check",function(w){var v=w.element;if(v.matches(x)){w.code="",v.setAttribute(s,m);var _=v.appendChild(document.createElement("CODE"));_.textContent=t;var n=v.getAttribute("data-src"),i=w.language;if(i==="none"){var o=(/\.(\w+)$/.exec(n)||[,"none"])[1];i=l[o]||o}u.util.setLanguage(_,i),u.util.setLanguage(v,i);var p=u.plugins.autoloader;p&&p.loadLanguages(i),b(n,function(c){v.setAttribute(s,h);var g=T(v.getAttribute("data-range"));if(g){var k=c.split(/\r\n?|\n/g),f=g[0],j=g[1]==null?k.length:g[1];f<0&&(f+=k.length),f=Math.max(0,Math.min(f-1,k.length)),j<0&&(j+=k.length),j=Math.max(0,Math.min(j,k.length)),c=k.slice(f,j).join(`
`),v.hasAttribute("data-start")||v.setAttribute("data-start",String(f+1))}_.textContent=c,u.highlightElement(_)},function(c){v.setAttribute(s,d),_.textContent=c})}}),u.plugins.fileHighlight={highlight:function(v){for(var _=(v||document).querySelectorAll(x),n=0,i;i=_[n++];)u.highlightElement(i)}};var A=!1;u.fileHighlight=function(){A||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),A=!0),u.plugins.fileHighlight.highlight.apply(this,arguments)}})()});var W=C((Cr,_t)=>{_t.exports={...Ue()}});var fr={};Lt(fr,{BUILD_ID:()=>mr,TempleComponent:()=>F.TempleComponent,TempleElement:()=>F.TempleElement,TempleEmitter:()=>F.TempleEmitter,TempleException:()=>F.TempleException,TempleRegistry:()=>F.TempleRegistry,children:()=>F.children,components:()=>ur,data:()=>F.data,emitter:()=>F.emitter,props:()=>F.props,signal:()=>F.signal});var L=P($());var Se=P($()),Y=class extends Se.TempleComponent{static component=["main","Main_fd7f1af6410c5b5c8e1f"];styles(){return""}template(){let e=this.props,r=()=>this.originalChildren;return()=>[Se.TempleRegistry.createElement("main",{},[...this._toNodeList(r())]).element]}};var E=P($()),Ze=P(wt()),Et=P(W()),H=class extends E.TempleComponent{static component=["code","Code_6f36bc13bb6a166c7abc"];styles(){return`:host {
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
  }`}template(){let e=this.props,{lang:r="markup",numbers:l=!1,inline:s=!1,trim:m=!1,ltrim:h=!1,rtrim:d=!1,detab:x=0}=e,b=(0,Et.children)(),T=b[0]?.textContent||"";x&&(T=T.replace(new RegExp(`\\n {${x}}`,"g"),`
`)),m?T=T.trim():h?T=T.replace(/^\s+/,""):d&&(T=T.replace(/\s+$/,""));let A=w=>{if(!T)return;let v=Ze.default.highlight(T,Ze.default.languages[r],r);if(w.detail.target.innerHTML=v,l){let _=v.match(/\n(?!$)/g),n=_?_.length+1:1,i=new Array(n+1).join("<span></span>"),o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.className="line-numbers-rows",o.innerHTML=i,w.detail.target.appendChild(o)}};return()=>[E.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css"}).element,E.TempleRegistry.createText(`
`,!1),E.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css"}).element,E.TempleRegistry.createText(`
`,!1),...r==="bash"?[E.TempleRegistry.createText(`
  `,!1),E.TempleRegistry.createElement("div",{class:"terminal"},[E.TempleRegistry.createElement("span",{},[E.TempleRegistry.createText("$",!1)]).element,E.TempleRegistry.createText(" ",!1),...this._toNodeList(b)]).element,E.TempleRegistry.createText(`
`,!1)]:T?[,E.TempleRegistry.createText(`
  `,!1),...l?[E.TempleRegistry.createText(`
    `,!1),E.TempleRegistry.createElement("pre",{class:"snippet line-numbers"},[E.TempleRegistry.createElement("code",{mount:A},[]).element]).element,E.TempleRegistry.createText(`
  `,!1)]:[,E.TempleRegistry.createText(`
    `,!1),E.TempleRegistry.createElement("pre",{class:"snippet pad"},[E.TempleRegistry.createElement("code",{mount:A},[]).element]).element,E.TempleRegistry.createText(`
  `,!1)],E.TempleRegistry.createText(`
`,!1)]:[]]}};var S=P($()),De=P(W()),V=class extends S.TempleComponent{static component=["app","App_05341fddbfd1fe4f273b"];styles(){return""}template(){let{title:e,panel:r}=(0,De.props)(),l=`body ${r?"panel":""}`,s=r?`height:${r}px`:"";return()=>[S.TempleRegistry.createText(`
`,!1),S.TempleRegistry.createElement("div",{class:"window"},[S.TempleRegistry.createText(`
  `,!1),S.TempleRegistry.createElement("div",{class:"head"},[S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"title"},[...this._toNodeList(e)]).element,S.TempleRegistry.createText(`
  `,!1)]).element,S.TempleRegistry.createText(`
  `,!1),S.TempleRegistry.createElement("div",{class:l,style:s},[...this._toNodeList((0,De.children)())]).element,S.TempleRegistry.createText(`
`,!1)]).element]}};var q=P($()),Q=P(W()),K=class extends q.TempleComponent{static component=["alert","Alert_6b81bcb0566ce7f0cd2d"];styles(){return`:host {
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
  .tx-white, .tx-white a {
    color: var(--info);
  }
  .tx-white, .tx-white a {
    color: var(--white);
  }
  .tx-error, .tx-error a {
    color: var(--error);
  }
  .tx-warning, .tx-warning a {
    color: var(--warning);
  }
  .tx-success, .tx-success a {
    color: var(--success);
  }
  .tx-muted, .tx-muted a {
    color: var(--muted);
  }
  .tx-primary, .tx-primary a {
    color: var(--primary);
  }
  .tx-secondary, .tx-secondary a {
    color: var(--secondary);
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
  .thin {
    border-width: 1px;
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

  /* Alert
  ---------------------------------*/
  .alert {
    padding: 16px;
  }`}template(){let{color:e,info:r,warning:l,success:s,error:m,muted:h,primary:d,secondary:x,solid:b,outline:T,curved:A,rounded:w,pill:v,style:_}=(0,Q.props)(),n={classes:["alert"],styles:""},i=T?"outline":"solid";A?n.classes.push("curved"):w?n.classes.push("rounded"):v&&n.classes.push("pill"),i==="outline"?(n.classes.push("solid","thin"),e?(n.styles+=`border-color: ${e};`,n.styles+=`color: ${e};`):r?n.classes.push("bd-info","tx-info"):l?n.classes.push("bd-warning","tx-warning"):s?n.classes.push("bd-success","tx-success"):m?n.classes.push("bd-error","tx-error"):h?n.classes.push("bd-muted","tx-muted"):d?n.classes.push("bd-primary","tx-primary"):x&&n.classes.push("bd-secondary","tx-secondary")):(n.classes.push("tx-white"),e?n.styles+=`background-color: ${e};`:r?n.classes.push("bg-info"):l?n.classes.push("bg-warning"):s?n.classes.push("bg-success"):m?n.classes.push("bg-error"):h?n.classes.push("bg-muted"):d?n.classes.push("bg-primary"):x&&n.classes.push("bg-secondary"));let o={classes:[...n.classes,(0,Q.classnames)()].join(" "),styles:{...n.styles,..._}};return()=>[q.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}).element,q.TempleRegistry.createText(`
`,!1),q.TempleRegistry.createElement("div",{class:o.classes,style:o.styles},[q.TempleRegistry.createText(`
  `,!1),...this._toNodeList((0,Q.children)()),q.TempleRegistry.createText(`
`,!1)]).element]}};var fe=P($()),Ce=P(W()),ee=class extends fe.TempleComponent{static component=["tab","Tab_dd9d261e4f37efc3079c"];styles(){return""}template(){let{group:e,selector:r,class:l,...s}=(0,Ce.props)(),m=()=>{Array.from(document.querySelectorAll(r)).forEach(d=>{d.style.display=l.indexOf("active")>-1?"block":"none"})},h=()=>{Array.from(document.querySelectorAll(`[group="${e}"]`)).forEach(d=>{let x=d.props.selector;r===x?(d.classList.add("active"),Array.from(document.querySelectorAll(r)).forEach(b=>{b.style.display="block"})):(d.classList.remove("active"),Array.from(document.querySelectorAll(x)).forEach(b=>{b.style.display="none"}))})};return()=>[fe.TempleRegistry.createText(`
`,!1),fe.TempleRegistry.createElement("a",{...s,click:h,mount:m},[...this._toNodeList((0,Ce.children)())]).element]}};var a=P($());var he=P(W());var ge={Asset:{type:{kind:"property",list:!1,type:["text/html","text/javascript","text/css","text/plain"],description:"The MIME type of the build file asset"},content:{kind:"property",list:!1,type:"string",description:"The source code of the build file asset."}},Path:{path:{kind:"property",list:!1,type:"string",description:"The file path",example:"'/path/to/file'"},type:{kind:"property",list:!1,type:"string",description:"The type of path.",example:"'file'"}},Config:{brand:{kind:"property",list:!1,type:"string",description:"The brand prefixed before the component tag name.",example:"'temple'"},cwd:{kind:"property",list:!1,type:"string",description:"The project's current working directory (cwd).",example:"'/path/to/project'"},fs:{kind:"property",list:!1,type:"FileSystem",description:"The file system being used to read/write files.",example:`import fs from 'fs';

fs`},emitter:{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`import EventEmitter from 'events';

new EventEmitter();`},"name?":{kind:"property",list:!1,type:"string",description:"Custom name of component."},"type?":{kind:"property",list:!1,type:["document","component","template"],description:"Type of component"},"minify?":{kind:"property",list:!1,type:"boolean",description:"Whether to minify the generated JavaScript code."},"tsconfig?":{kind:"property",list:!1,type:"string",description:"The location of the used tsconfig.json.",example:"'/path/to/tsconfig.json'"},"component_extname?":{kind:"property",list:!1,type:"string",description:"The component file extension.",example:"'.tml'"},"document_extname?":{kind:"property",list:!1,type:"string",description:"The document file extension.",example:"'.dtml'"}},Import:{typeOnly:{kind:"property",list:!1,type:"boolean",description:"Should import as type only.",example:"import type { Foo } from 'bar';"},"names?":{kind:"property",list:!0,type:"string",description:"All the names imported",example:"import { Foo, Bar } from 'foobar';"},default:{kind:"property",list:!1,type:"string",description:"The default import name",example:"import foo from 'bar';"},source:{kind:"property",list:!1,type:"string",description:"The file path where names are imported from.",example:"import * from 'foobar';"}},Build:{source:{kind:"property",list:!1,type:"string",description:"Returns the generated JavaScript source code.",example:"compiler.import('./docs/api.dtml').source; //server js code"},TempleDocument:{kind:"property",list:!1,type:"ServerDocumentClass",description:"Returns a server document class that can be instantiated.",example:"new (compiler.import('./docs/api.dtml').TempleDocument);"},document:{kind:"property",list:!1,type:"ServerDocument",description:"Returns the default instantiated document used to render the final HTML markup.",example:"compiler.import('./docs/api.dtml').document.render(); //<html>...</html>"}},CacheOptions:{buildPath:{kind:"property",list:!1,type:"string",description:"The absolute path the build directory",example:"'/path/to/build'"},"manifestFile?":{kind:"property",list:!1,type:"string",description:"The name of the manifest file.",example:"'manifest.json'"},"environment?":{kind:"property",list:!1,type:"string",description:"The environment mode that will determine the cache strategy.",example:"'production' | 'development'"}},Component:{ast:{kind:"property",list:!1,type:"AST",description:"Returns an abstract syntax tree (AST) interpretation of the component.",example:"component.ast.markup;"},brand:{kind:"property",list:!1,type:"string",description:"Returns the brand prefixed before the component tag name.",example:"component.brand; //--> 'temple'"},classname:{kind:"property",list:!1,type:"string",description:"Returns the suggested class name of the component.",example:"component.classname; //--> 'Button_abc123'"},components:{kind:"property",list:!0,type:"Component",description:"Returns a list of child components imported by this component.",example:"component.components[0].brand; //--> 'temple'"},contents:{kind:"property",list:!1,type:"string",description:"Returns the raw temple source code.",example:"component.contents;"},cwd:{kind:"property",list:!1,type:"string",description:"Returns the project's current working directory (cwd).",example:"component.cwd; //--> '/path/to/project'"},dependencies:{kind:"property",list:!0,type:"{ path: string, type: string }",description:"Returns all the files this component imports sorted by type.",example:"component.dependencies; //--> [{ type: 'file', path: './random/file' }, ...]"},dirname:{kind:"property",list:!1,type:"string",description:"Returns the directory name where this component file exists.",example:"component.dirname;"},fs:{kind:"property",list:!1,type:"FileSystem",description:"Returns the file system being used to read/write files.",example:"component.fs;"},id:{kind:"property",list:!1,type:"string",description:"Returns a unique component ID used for build files.",example:"component.id;"},imports:{kind:"property",list:!0,type:"Import",description:"Returns the files imported by this component. This does not include any component files.",example:"component.imports;"},markup:{kind:"property",list:!0,type:"Token",description:"Returns the markup abstract syntax tree.",example:"component.markup;"},loader:{kind:"property",list:!1,type:"FileLoader",description:"Returns the file loader used to resolve paths of imported files.",example:"component.loader.absolute('./path/to/some/file');"},parent:{kind:"property",list:!1,type:"Component|null",description:"Returns the parent component, if any.",example:"component.parent;"},registry:{kind:"property",list:!1,type:"Record<string, Component>",description:"Returns all child components and sub-child components.",example:"component.registry;"},relative:{kind:"property",list:!1,type:"string",description:"Returns the source file path relative to the current working directory (cwd).",example:"component.contents;"},source:{kind:"property",list:!1,type:"string",description:"Returns the source file path. This may or may not be the absolute path.",example:"component.source;"},scripts:{kind:"property",list:!0,type:"string",description:"Returns all the collective JavaScript in the temple source file.",example:"component.scripts;"},styles:{kind:"property",list:!0,type:"string",description:"Returns all the collective CSS styles in the temple source file.",example:"component.styles;"},tagname:{kind:"property",list:!1,type:"string",description:"Returns the suggested HTML tag name.",example:"component.tagname;"},type:{kind:"property",list:!1,type:["document","component","template"],description:"Returns type of component. Will transpile depending on the type.",example:"component.type;"}},EventEmitter:{render:{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"},props:{kind:"property",list:!1,type:"Hash"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before the document is rendered.",example:`compiler.emitter.on('render', e => {
  const { builder, build, props } = e.params;
  //...
  e.data = 'new html...';
});`},rendered:{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"},props:{kind:"property",list:!1,type:"Hash"},html:{kind:"property",list:!1,type:"string"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers after the document is rendered.",example:`compiler.emitter.on('rendered', e => {
  const { builder, build, props, html } = e.params;
  //...
  e.data = 'new html...';
});`},build:{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before the document is built.",example:`compiler.emitter.on('build', e => {
  const { builder } = e.params;
  //...
  e.data = 'new temple source...';
});`},built:{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"}},data:{kind:"property",list:!1,type:"Build"},description:"Triggers after the document is built.",example:`compiler.emitter.on('built', e => {
  const { builder, build } = e.params;
  //...
  e.data = { ...build };
});`},"build-client":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before the client js is rendered.",example:`compiler.emitter.on('build-client', e => {
  const { builder } = e.params;
  //...
  e.data = 'new temple source...';
});`},"built-client":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers after the client js is rendered.",example:`compiler.emitter.on('built-client', e => {
  const { builder, build } = e.params;
  //...
  e.data = 'new client js...';
});`},"build-markup":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before markup is rendered.",example:`compiler.emitter.on('build-markup', e => {
  const { builder } = e.params;
  //...
  e.data = 'new temple source...';
});`},"built-markup":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers after markup is rendered.",example:`compiler.emitter.on('built-markup', e => {
  const { builder, build } = e.params;
  //...
  e.data = 'new markup...';
});`},"build-server":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before the server js is rendered.",example:`compiler.emitter.on('build-server', e => {
  const { builder } = e.params;
  //...
  e.data = 'new temple source...';
});`},"built-server":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers after the server js is rendered.",example:`compiler.emitter.on('built-server', e => {
  const { builder, build } = e.params;
  //...
  e.data = 'new server js...';
});`},"build-styles":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers before the css styles are rendered.",example:`compiler.emitter.on('build-styles', e => {
  const { builder } = e.params;
  //...
  e.data = 'new temple source...';
});`},"built-styles":{kind:"event",params:{builder:{kind:"property",list:!1,type:"DocumentBuilder"},build:{kind:"property",list:!1,type:"Build"}},data:{kind:"property",list:!1,type:"string"},description:"Triggers after the css styles is rendered.",example:`compiler.emitter.on('built-styles', e => {
  const { builder, build } = e.params;
  //...
  e.data = 'new css...';
});`},"manifest-load":{kind:"event",params:{manifest:{kind:"property",list:!1,type:"DocumentManifest"},map:{kind:"property",list:!1,type:"Map<string, string>"}},data:{kind:"property",list:!1,type:"Map<string, string>"},description:"Triggers before the manifest is loaded.",example:`compiler.emitter.on('manifest-load', e => {
  const { manifest, map } = e.params;
  //...
  e.data = new Map<string, string>();
});`},"manifest-resolve":{kind:"event",params:{manifest:{kind:"property",list:!1,type:"DocumentManifest"},id:{kind:"property",list:!1,type:"string"}},description:"Triggers before a build ID is resolved.",example:`compiler.emitter.on('manifest-resolve', e => {
  const { manifest, id } = e.params;
  //...
});`},"manifest-resolved":{kind:"event",params:{manifest:{kind:"property",list:!1,type:"DocumentManifest"},id:{kind:"property",list:!1,type:"string"},path:{kind:"property",list:!1,type:"string"}},data:{kind:"property",list:!1,type:"Map<string, string>"},description:"Triggers after a build ID/entry is set.",example:`compiler.emitter.on('manifest-resolved', e => {
  const { manifest, id, path } = e.params;
  //...
});`},"manifest-unresolved":{kind:"event",params:{manifest:{kind:"property",list:!1,type:"DocumentManifest"},id:{kind:"property",list:!1,type:"string"},path:{kind:"property",list:!1,type:"string|undefined"}},data:{kind:"property",list:!1,type:"Map<string, string>"},description:"Triggers after a build ID is deleted.",example:`compiler.emitter.on('manifest-unresolved', e => {
  const { manifest, id, path } = e.params;
  //...
});`}},DocumentManifest:{emitter:{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`compiler.manifest.emitter.on('render', e => {
  console.log(e.params);
});`},registry:{kind:"property",list:!1,type:"Map<string, string>",description:"The manifest registry used to map build IDs to document entry files.",example:"compiler.manifest.registry.entries();"},builder:{kind:"function",async:!1,args:[{kind:"property",list:!1,name:"id",type:"string"}],returns:{kind:"property",list:!1,type:"DocumentBuilder"},description:"Returns a document builder given the build id.",example:"compiler.manifest.builder('abc123');"},delete:{kind:"function",async:!1,args:[{kind:"property",list:!1,name:"id",type:"string"}],returns:{kind:"property",list:!1,type:"DocumentManifest"},description:"Removes an entry file from the manifest given the build id.",example:"compiler.manifest.delete('abc123');"},entries:{kind:"function",async:!1,args:[],returns:{kind:"property",list:!0,type:"[ string, string ]"},description:"Returns an array of build IDs and entry file paths.",example:"compiler.manifest.entries();"},get:{kind:"function",async:!1,args:[{kind:"property",name:"id",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns the entry file path given the build id.",example:"compiler.manifest.get('abc123');"},has:{kind:"function",async:!1,args:[{kind:"property",name:"id",type:"string"}],returns:{kind:"property",list:!1,type:"boolean"},description:"Returns true if the build id exists in the manifest.",example:"compiler.manifest.has('abc123');"},load:{kind:"function",async:!1,args:[{kind:"property",name:"manifest",type:"Record<string, string>"}],returns:{kind:"property",list:!1,type:"DocumentManifest"},description:"Loads an entire manifest object to the registry.",example:"compiler.manifest.load({ abc123: '/path/to/entry.dtml' });"},keys:{kind:"function",async:!1,args:[],returns:{kind:"property",list:!0,type:"string"},description:"Returns an array of build IDs.",example:"compiler.manifest.keys();"},set:{kind:"function",async:!1,args:[{kind:"property",name:"id",type:"string"},{kind:"property",name:"path",type:"string"}],returns:{kind:"property",list:!1,type:"DocumentManifest"},description:"Sets an entry file path to the manifest given the build id.",example:"compiler.manifest.set('abc123', '/path/to/entry.dtml');"},toJson:{kind:"function",async:!1,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Returns the manifest as a JSON string.",example:"compiler.manifest.toJson();"},values:{kind:"function",async:!1,args:[],returns:{kind:"property",list:!0,type:"string"},description:"Returns an array of entry file paths.",example:"compiler.manifest.values();"}},DocumentTranspiler:{directive:{kind:"function",async:!1,args:[{kind:"property",name:"directive",type:"DirectiveInterface"}],returns:{kind:"property",list:!1,type:"DocumentTranspiler"},description:"Adds a directive that transpiles custom markup tags like if/elif/else, each, try/catch.",example:"compiler.fromSource('./docs/api.dtml').transpiler.directive(CustomDirective);"},transpile:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"SourceFile"}},description:"Converts a temple file to server-side JavaScript.",example:"compiler.fromSource('./docs/api.dtml').transpiler.transpile();"},DocumentBuilder:{document:{kind:"property",list:!1,type:"Component",description:"Returns a document component with various meta information, used for transpilation.",example:"compiler.fromSource('./docs/api.dtml').document.classname; //--> 'Index_abc123'"},emitter:{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`compiler.fromSource('./docs/api.dtml').emitter.on('render', e => {
  console.log(e.params);
});`},extnames:{kind:"property",list:!0,type:"string",description:"Returns the file extensions that are recognized to parse as Temple components.",example:"compiler.fromSource('./docs/api.dtml').extnames; //--> [ 'tml', 'dtml' ]"},transpiler:{kind:"property",list:!1,type:"DocumentTranspiler",description:"Returns a transpiler used to convert a temple file to server-side JavaScript.",example:"compiler.fromSource('./docs/api.dtml').transpiler.transpile();"},tsconfig:{kind:"property",list:!1,type:"string",description:"Returns the location of the used tsconfig.json.",example:"compiler.fromSource('./docs/api.dtml').tsconfig; //--> /path/to/tsconfig.json"},build:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"Build"},description:"Generates the server-side component and brings it into the runtime.",example:"compiler.fromSource('./docs/api.dtml').build();"},client:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Generates the browser-side JavaScript.",example:"compiler.fromSource('./docs/api.dtml').client(); //client js code"},component:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Generates the source file as an independent component.",example:"compiler.fromSource('./docs/my-button.tml').component(); //component js code"},markup:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Generates the html markup.",example:"compiler.fromSource('./docs/api.dtml').markup(); //<html>...</html>"},server:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Generates the server-side JavaScript.",example:"compiler.fromSource('./docs/api.dtml').markup(); //server js code"},styles:{kind:"function",async:!0,args:[],returns:{kind:"property",list:!1,type:"string"},description:"Generates the css styles.",example:"compiler.fromSource('./docs/api.dtml').styles(); //css code"}},ServerDocumentClass:{component:{kind:"property",list:!1,type:"[ string, string ]",description:"Returns the component tag name and class name.",example:"compiler.import('./docs/api.dtml').TempleDocument.component; //--> [ 'tui-button', 'TuiButton_abc123' ]"},new:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"ServerDocument"},description:"Instantiates the server document class on the server-side used to render the final HTML.",example:"new (compiler.import('./docs/api.dtml').TempleDocument);"}},ServerDocument:{id:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"string"},description:"Returns a unique document ID used to map the build cache.",example:"compiler.import('./docs/api.dtml').document.id(); //--> 'abc123'"},styles:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"string"},description:"Returns the css styles for this document.",example:"compiler.import('./docs/api.dtml').document.styles(); //css styles"},template:{template:"function",args:[],returns:{kind:"property",list:!0,type:"Element"},description:"Returns an array of Element children and sub-children.",example:"compiler.import('./docs/api.dtml').document.template();"},render:{kind:"function",args:[{kind:"property",name:"props",type:"Record<string, any>"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns the final document HTML markup.",example:"compiler.import('./docs/api.dtml').document.render();"}},TempleOptions:{"brand?":{kind:"property",list:!1,type:"string",description:"The brand prefixed before the component tag name.",example:"const compiler = temple({ brand: 'temple' });"},"cwd?":{kind:"property",list:!1,type:"string",description:"The project's current working directory (cwd).",example:"const compiler = temple({ cwd: '/path/to/project' });'"},"fs?":{kind:"property",list:!1,type:"FileSystem",description:"The file system being used to read/write files.",example:`import fs from 'fs';

const compiler = temple({ fs });'`},"emitter?":{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`import emitter from 'events';

const compiler = temple({ emitter });'`},"minify?":{kind:"property",list:!1,type:"boolean",description:"Whether to minify the generated JavaScript code.",example:"const compiler = temple({ minify: true });'"},"tsconfig?":{kind:"property",list:!1,type:"string",description:"The location of the used tsconfig.json.",example:"const compiler = temple({ tsconfig: '/path/to/tsconfig.json' });'"},"component_extname?":{kind:"property",list:!1,type:"string",description:"The component file extension.",example:"const compiler = temple({ component_extname: '.tml' });'"},"document_extname?":{kind:"property",list:!1,type:"string",description:"The document file extension.",example:"const compiler = temple({ document_extname: '.dtml' });'"}},TempleCompiler:{config:{kind:"property",list:!1,type:"Config",description:"The Temple configuration",example:"compiler.config.brand; //--> 'temple'"},fs:{kind:"property",list:!1,type:"FileSystem",description:"The file system being used.",example:"compiler.fs.readFileSync('some/file', 'utf8');"},emitter:{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`compiler.emitter.on('render', e => {
  console.log(e.params);
});`},manifest:{kind:"property",list:!1,type:"DocumentManifest",description:"The manifest registry used to map build IDs to document entry files.",example:"compiler.manifest.entries();"},component:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"Component"}},fromId:{kind:"function",args:[{kind:"property",list:!1,name:"id",type:"string"}],returns:{kind:"property",list:!1,type:"DocumentBuilder"},description:"Returns a new DocumentBuilder instance given a build ID.",example:"compiler.fromId('abc123').build();"},fromCache:{kind:"function",args:[{kind:"property",list:!1,name:"cacheFile",type:"string"}],returns:{kind:"property",list:!1,type:"Build"},description:"Returns build information from a compiled template.",example:"compiler.fromCache('/path/to/build/abc123.js').document.render();"},fromSource:{kind:"function",args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"DocumentBuilder"},description:"Returns a new DocumentBuilder instance given a template source file.",example:"compiler.fromSource('./docs/api.dtml').build();"},use:{kind:"function",args:[{kind:"property",list:!1,name:"options",type:"Function"}],returns:{kind:"property",list:!1,type:"TempleCompiler"},description:"Enables a default build cache strategy.",example:"compiler.use(plugin)"},asset:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"assetFile",type:"string"}],returns:{kind:"property",list:!1,type:"Asset"},description:"Returns a compiled build asset, given an asset file name.",example:"compiler.asset('abc123.css'); //--> { type: 'text/css', content: '...' }"},client:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns a compiled client script, given the the template source file.",example:"compiler.client('./docs/api.dtml'); //client script"},import:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"Build"},description:"Returns build information, given the the template source file.",example:"compiler.import('/path/to/build/abc123.js').document.render();"},markup:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns a compiled markup, given the the template source file.",example:"compiler.markup('./docs/api.dtml'); //--> <html>...</html>"},render:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"},{kind:"property",list:!1,name:"props",type:"Hash"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns the final HTML markup, given the the template source file.",example:`compiler.render('./docs/api.dtml', {
  title: 'API Documentation'
});`},server:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled server code, given the the template source file.",example:"compiler.server('./docs/api.dtml'); // server script"},styles:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled css styles, given the the template source file.",example:"compiler.styles('./docs/api.dtml'); //css styles"}},TempleComponent:{attr:{kind:"property",list:!1,type:"Hash",description:"Returns only the valid HTML tag attributes (string and true).",example:"this.attr; //--> { disabled: true, type: 'button' }"},props:{kind:"property",list:!1,type:"Hash",description:"Returns all the attributes assigned to the component.",example:"this.props; //--> { disabled: true, count: 4, click: handleClick }"},metadata:{kind:"property",list:!1,type:"[ string, string ]",description:"Returns the tag and class name of the component.",example:"this.metadata; //--> [ 'fancy-button', 'FancyButton_abc123' ]"},styles:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"string"},description:"Returns the css styles used in the component.",example:"this.styles(); //css styles"},template:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"Node[]"},description:"Returns a function that returns an array of elements, text nodes and web components",example:"this.template(); //--> () => [ Element, Text, Element, ... ]"},render:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"string"},description:"Renders the children and returns the final HTML markup.",example:"this.render(); //--> '<p>...</p>'"}},TempleRegistry:{elements:{kind:"property",list:!1,type:"Map<Element, TempleElement>",description:"Returns a map of elements used in the DOM.",example:"TempleAPI.TempleRegistry.elements.get(component);"},createComponent:{kind:"function",args:[{kind:"property",list:!1,name:"tagname",type:"string"},{kind:"property",list:!1,name:"component",type:"TempleComponent"},{kind:"property",list:!1,name:"props",type:"Hash"},{kind:"property",list:!1,name:"children>",type:"Node[]"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Creates a TempleElement from a web component class.",example:"TempleAPI.TempleRegistry.createComponent('fancy-button', TempleComponent, { title: 'Hello' }, children);"},createElement:{kind:"function",args:[{kind:"property",list:!1,name:"tagname",type:"string"},{kind:"property",list:!1,name:"props",type:"Hash"},{kind:"property",list:!1,name:"children>",type:"Node[]"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Creates a TempleElement from a string tag name.",example:"TempleAPI.TempleRegistry.createElement('a', { href: '/' }, children);"},createText:{kind:"function",args:[{kind:"property",list:!1,name:"text",type:"string"}],returns:{kind:"property",list:!1,type:"TextNode"},description:"Creates a TextNode from a raw string.",example:"TempleAPI.TempleRegistry.createText('foo');"},get:{kind:"function",args:[{kind:"property",list:!1,name:"element",type:"Element"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Returns a TempleElement given a DOM element.",example:"TempleAPI.TempleRegistry.get(element)"},has:{kind:"function",args:[{kind:"property",list:!1,name:"element",type:"Element"}],returns:{kind:"property",list:!1,type:"boolean"},description:"Returns true if the given element exists in the registry",example:"TempleAPI.TempleRegistry.has(element)"},map:{kind:"function",args:[{kind:"property",list:!1,name:"callback",type:"Function"}],returns:{kind:"property",list:!0,type:"T"},description:"Like array map for registry returns an array of whatever the callback returns.",example:"TempleAPI.TempleRegistry.map((temple, element) => [temple, element]);"},register:{kind:"function",args:[{kind:"property",list:!1,name:"element",type:"TempleElement"},{kind:"property",list:!1,name:"props",type:"Hash"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Registers a TempleElement to the registry.",example:"TempleAPI.TempleRegistry.register(element, { foo: 'bar' });"}},TempleElement:{attributes:{kind:"property",list:!1,type:"Hash",description:"Returns all the attributes assigned to the element.",example:"element.attributes; //--> { href: '/', title: 'Home' }"},element:{kind:"property",list:!1,type:"Element",description:"Returns the DOM element.",example:"element.element; //--> <a href='/' title='Home'>"},hasAttribute:{kind:"function",args:[{kind:"property",list:!1,name:"name",type:"string"}],returns:{kind:"property",list:!1,type:"boolean"},description:"Returns true if the element has the given attribute.",example:"element.hasAttribute('href');"},getAttribute:{kind:"function",args:[{kind:"property",list:!1,name:"name",type:"string"}],returns:{kind:"property",list:!1,type:"unknown"},description:"Returns the value of the given attribute.",example:"element.getAttribute('href');"},removeAttribute:{kind:"function",args:[{kind:"property",list:!1,name:"name",type:"string"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Removes the given attribute from the element.",example:"element.removeAttribute('href');"},setAttribute:{kind:"function",args:[{kind:"property",list:!1,name:"name",type:"string"},{kind:"property",list:!1,name:"value",type:"string"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Sets the given attribute to the element.",example:"element.setAttribute('href', '/');"},setAttributes:{kind:"function",args:[{kind:"property",list:!1,name:"attributes",type:"Hash"}],returns:{kind:"property",list:!1,type:"TempleElement"},description:"Sets multiple attributes to the element.",example:"element.setAttributes({ href: '/', title: 'Home' });"}},TempleEmitter:{emit:{kind:"function",args:[{kind:"property",list:!1,name:"event",type:"string"},{kind:"property",list:!1,name:"target",type:"T"}],returns:{kind:"property",list:!1,type:"TempleEmitter"},description:"Emits an event with optional parameters.",example:"emitter.emit('click', { x: 10, y: 20 });"},unbind:{kind:"function",args:[{kind:"property",list:!1,name:"event",type:"string"},{kind:"property",list:!1,name:"listener",type:"Function"}],returns:{kind:"property",list:!1,type:"TempleEmitter"},description:"Removes an event listener.",example:"emitter.unbind('click', handleClick);"},on:{kind:"function",args:[{kind:"property",list:!1,name:"event",type:"string"},{kind:"property",list:!1,name:"listener",type:"Function"}],returns:{kind:"property",list:!1,type:"TempleEmitter"},description:"Adds an event listener.",example:"emitter.on('click', handleClick);"},once:{kind:"function",args:[{kind:"property",list:!1,name:"event",type:"string"},{kind:"property",list:!1,name:"listener",type:"Function"}],returns:{kind:"property",list:!1,type:"TempleEmitter"},description:"Adds an event listener that only fires once.",example:"emitter.once('click', handleClick);"}},TempleAPI:{BUILD_ID:{kind:"property",list:!1,type:"string",description:"The unique build ID used to map the build cache.",example:"TempleAPI.BUILD_ID; //--> 'abc123'"},TempleComponent:{kind:"property",list:!1,type:"TempleComponent",description:"The Temple component class used to create custom elements.",example:"new TempleAPI.TempleComponent();"},TempleElement:{kind:"property",list:!1,type:"TempleElement",description:"The Temple element class used to create custom elements.",example:`new TempleAPI.TempleElement(
  document.createElement('a'),
  { href: '/' }
); ]`},TempleEmitter:{kind:"property",list:!1,type:"TempleEmitter",description:"The Temple emitter class used to create custom events.",example:"new TempleAPI.TempleEmitter();"},TempleException:{kind:"property",list:!1,type:"TempleException",description:"The Temple exception class used to create custom errors.",example:"throw TempleAPI.TempleException.for('error message');"},TempleRegistry:{kind:"property",list:!1,type:"TempleRegistry",description:"The Temple registry class used to store custom elements.",example:"new TempleAPI.TempleRegistry.createElement('a', { href: '/' });"},children:{kind:"function",args:[{kind:"property",list:!1,name:"component",type:"TempleComponent"}],returns:{kind:"property",list:!0,type:"Node"},description:"Returns an array of child nodes.",example:"TempleAPI.children(component); //--> [ Element, Text, Element, ... ]"},components:{kind:"property",list:!1,type:"Record<string, TempleComponent>",description:"Returns an object of Temple components classes used in the DOM.",example:"new TempleAPI.components['fancy-button']; //--> TempleComponent"},data:{kind:"property",list:!1,type:"TempleDataMap",description:"The Temple data map used to bring server side data to the client.",example:"TempleAPI.data.get('props');"},emitter:{kind:"property",list:!1,type:"TempleEmitter",description:"The Temple emitter class used to create custom events.",example:"TempleAPI.emitter.on('click', () => {});"},props:{kind:"function",args:[{kind:"property",list:!1,name:"component",type:"TempleComponent"}],returns:{kind:"property",list:!0,type:"Hash"},description:"Returns an object of component attributes",example:"TempleAPI.props(component); //--> { foo: 'bar', count: 4 }"},signal:{kind:"function",args:[{kind:"property",list:!1,name:"component",type:"TempleComponent"}],returns:{kind:"property",list:!1,type:"Signal"},description:"Returns a signal object used to re-render components whenever its value changes",example:"const count = TempleAPI.signal(1, component)"}},"Render Methods":{asset:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"assetFile",type:"string"}],returns:{kind:"property",list:!1,type:"Asset"},description:"Returns a compiled build asset, given an asset file name.",example:"await compiler.asset('abc123.css'); //--> { type: 'text/css', content: '...' }"},client:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns a compiled client script, given the the template source file.",example:"await compiler.client('./docs/api.dtml'); //client script"},markup:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns a compiled markup, given the the template source file.",example:"await compiler.markup('./docs/api.dtml'); //--> <html>...</html>"},render:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"},{kind:"property",list:!1,name:"props",type:"Hash"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns the final HTML markup, given the the template source file.",example:`await compiler.render('./docs/api.dtml', {
  title: 'API Documentation'
});`},server:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled server code, given the the template source file.",example:"await compiler.server('./docs/api.dtml'); // server script"},styles:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled css styles, given the the template source file.",example:"await compiler.styles('./docs/api.dtml'); //css styles"}},DeveloperOptions:{"cwd?":{kind:"property",list:!1,type:"string",description:"The current working directory",example:"const { refresh, router } = dev({ cwd: process.cwd() })"},"emitter?":{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`import emitter from 'events';

const { refresh, router } = dev({ emitter });'`},"include?":{kind:"property",list:!0,type:"string",description:"An array of extension names to watch for",example:"const { refresh, router } = dev({ include: [ '.js', '.ts', '.tml', '.dtml' ] });'"},"ignore?":{kind:"property",list:!0,type:"(string|RegExp)",description:"An array of extension names to ignore",example:"const { refresh, router } = dev({ ignore: [ '*.test.*' ] });'"},"route?":{kind:"property",list:!1,type:"string",description:"The route path to use for the client watcher",example:"const { refresh, router } = dev({ route: '/__temple_dev__' })"},"tsconfig?":{kind:"property",list:!1,type:"string",description:"The path to the tsconfig.json file",example:"const { refresh, router } = dev({ tsconfig: '/path/to/tsconfig.json' })"},"extname?":{kind:"property",list:!1,type:"string",description:"the component file extension",example:"const { refresh, router } = dev({ extname: '.tml' })"}},RefreshServer:{cwd:{kind:"property",list:!1,type:"string",description:"The current working directory",example:"refresh.cwd"},emitter:{kind:"property",list:!1,type:"EventEmitter",description:"The NodeJS EventEmitter instance being used.",example:`refresh.emitter.on('render', e => {
  console.log(e.params);
});`},sync:{kind:"function",args:[{kind:"property",name:"builder",list:!1,type:"DocumentBuilder"}],returns:{kind:"property",list:!1,type:"void"},description:"Registers a document builder to a client watcher list",example:`refresh.emitter.on('render', e => {
  console.log(e.params);
});`},close:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"RefreshServer"},description:"Closes the server and stops the watchers.",example:"refresh.close();"},refresh:{kind:"function",args:[{kind:"property",list:!1,name:"filePath",type:"string"}],returns:{kind:"property",list:!1,type:"Promise<RefreshServer>"},description:"Whenever a file is changed this will be called to instruct each client watcher how to update their document.",example:"await refresh.refresh('/some/file.tml');"},wait:{kind:"function",args:[{kind:"property",list:!1,name:"req",type:"Request"},{kind:"property",list:!1,name:"res",type:"Response"}],returns:{kind:"property",list:!1,type:"RefreshServer"},description:"Opens a connection to the server via SSE and waits for changes.",example:"refresh.wait(req, res);"},watch:{kind:"function",args:[],returns:{kind:"property",list:!1,type:"RefreshServer"},description:"Starts the server that watches for file changes.",example:"refresh.watch();"}},"Developer Tools":{refresh:{kind:"property",list:!1,type:"RefreshServer",description:"The refresh server instance used to update clients.",example:`const { refresh } = dev();
refresh.sync(builder);`},router:{kind:"property",list:!1,type:"Function",description:"HTTP middleware to handle developer tool routes like '/dev.js' and '/__temple_dev__'.",example:`const { router } = dev();
app.use(router);`}},"Express Developer Tools":{refresh:{kind:"property",list:!1,type:"RefreshServer",description:"The refresh server instance used to update clients.",example:`const { refresh } = dev();
refresh.sync(builder);`},router:{kind:"property",list:!1,type:"Function",description:"Express middleware to handle developer tool routes like '/dev.js' and '/__temple_dev__'.",example:`const { router } = dev();
app.use(router);`},view:{kind:"property",list:!1,type:"Function",description:"Middleware used to setup an express view engine.",example:`const { view } = dev();
app.engine('dtml', view(compiler));`}}};var te=class extends a.TempleComponent{static component=["ui","Ui_dcdb1ec28ab9a6dac63a"];styles(){return`:host {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: block;
    margin: 40px 0;
    overflow: hidden;
  }
  a {
    color: #007BFF;
    cursor: pointer;
  }
  th {
    padding: 10px;
    text-align: left;
    text-transform: uppercase;
  }
  td {
    border-color: #666666;
    border-top-style: solid;
    border-top-width: 1px;
    padding: 10px;
  }
  .tbl-container {
    position: relative;
    margin-bottom: 20px;
    overflow: auto;
  }
  .tbl {
    border-collapse: collapse;
    display: table;
    width: 100%;
  }

  .tbl-scroll {
    overflow: auto;
    flex-grow: 1;
    height: 100%;
    width: 100%;
  }

  .tbl-valign="top" nowrap {
    white-space: valign="top" nowrap;
  }

  .tbl-z0 {
    z-index: 0;
  }
  .tbl-z1 {
    z-index: 1;
  }
  .tbl-z2 {
    z-index: 2;
  }
  .tbl-z3 {
    z-index: 3;
  }
  .tbl-z4 {
    z-index: 4;
  }

  .tbl-sticky {
    position: sticky;
  }
  .tbl-sticky-b {
    bottom: 0;
  }
  .tbl-sticky-l {
    left: 0;
  }
  .tbl-sticky-t {
    top: 0;
  }
  .tbl-sticky-r {
    right: 0;
  }

  .tbl-col {
    border-color: black;
    border-style: solid;
    border-top-width: 1px;
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }

  .tbl-foot {
    border-color: black;
    border-style: solid;
    border-top-width: 1px;
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }

  .tbl-row {
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }

  .tbl-head {
    border-color: black;
    border-style: solid;
    border-top-width: 1px;
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }

  tr td:first-child {
    color: #E49F1A;
  }

  h3 {
    color: #DA532C;
    background: #1A1A1A;
    border-bottom: 1px solid #29252A;
    font-size: 16px;
    margin: 0;
    padding: 10px;
  }
  h5 {
    font-weight: normal;
    margin: 15px 0 5px;
    text-transform: uppercase;
  }
  td p {
    margin: 0 0 10px;
  }
  .container {
    background-color: #020202;
    padding: 10px;
  }`}template(){let{start:e="TempleCompiler"}=(0,he.props)(),r=(0,he.signal)([e]),l=(0,he.signal)(e),s=h=>{let d=h.target.getAttribute("data-type");r.value=[...r.value,d],l.value=d},m=()=>{r.value=r.value.slice(0,r.value.length-1),l.value=r.value[r.value.length-1]};return()=>[a.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}).element,a.TempleRegistry.createText(`
`,!1),a.TempleRegistry.createElement("div",{},[a.TempleRegistry.createText(`
  `,!1),a.TempleRegistry.createElement("h3",{},[a.TempleRegistry.createText(`
    `,!1),...r.value.length>1?[a.TempleRegistry.createText(`
      `,!1),a.TempleRegistry.createElement("a",{click:m},[a.TempleRegistry.createText(`
        `,!1),a.TempleRegistry.createElement("i",{class:"fas fa-arrow-left"},[]).element,a.TempleRegistry.createText(`
      `,!1)]).element,a.TempleRegistry.createText(`
    `,!1)]:[],a.TempleRegistry.createText(`
    API: `,!1),...this._toNodeList(l.value),a.TempleRegistry.createText(`
  `,!1)]).element,a.TempleRegistry.createText(`
  `,!1),a.TempleRegistry.createElement("div",{class:"container"},[a.TempleRegistry.createText(`
    `,!1),a.TempleRegistry.createElement("div",{class:"tbl-container"},[a.TempleRegistry.createText(`
      `,!1),a.TempleRegistry.createElement("table",{class:"tbl"},[a.TempleRegistry.createText(`
        `,!1),a.TempleRegistry.createElement("thead",{},[a.TempleRegistry.createText(`
          `,!1),a.TempleRegistry.createElement("th",{},[a.TempleRegistry.createText("Property",!1)]).element,a.TempleRegistry.createText(`
          `,!1),...l.value.includes("Emitter")?[]:[a.TempleRegistry.createText(`
            `,!1),a.TempleRegistry.createElement("th",{},[a.TempleRegistry.createText("Returns",!1)]).element,a.TempleRegistry.createText(`
          `,!1)],a.TempleRegistry.createText(`
          `,!1),a.TempleRegistry.createElement("th",{},[a.TempleRegistry.createText("Description",!1)]).element,a.TempleRegistry.createText(`
        `,!1)]).element,a.TempleRegistry.createText(`
        `,!1),a.TempleRegistry.createElement("tbody",{},[a.TempleRegistry.createText(`
          `,!1),...Object.entries(ge[l.value]).map(([h,d])=>[a.TempleRegistry.createText(`
            `,!1),a.TempleRegistry.createElement("tr",{},[a.TempleRegistry.createText(`
              `,!1),...d.kind==="property"?[a.TempleRegistry.createText(`
                `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(h)]).element,a.TempleRegistry.createText(`
                `,!1),...ge[d.type]?[a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createElement("a",{"data-type":d.type,click:s},[a.TempleRegistry.createText(`
                      `,!1),...this._toNodeList(d.type),a.TempleRegistry.createText(`
                    `,!1)]).element,...this._toNodeList(d.list?"[]":""),a.TempleRegistry.createText(`
                  `,!1)]).element,a.TempleRegistry.createText(`
                `,!1)]:[,a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(d.type),...this._toNodeList(d.list?"[]":"")]).element,a.TempleRegistry.createText(`
                `,!1)],a.TempleRegistry.createText(`
              `,!1)]:d.kind==="function"?[,a.TempleRegistry.createText(`
                `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                  `,!1),...this._toNodeList(h),a.TempleRegistry.createText(`(
                    `,!1),...Object.entries(d.args).map(([x,b])=>[a.TempleRegistry.createText(`
                      `,!1),...x>0?[a.TempleRegistry.createText(", ",!1)]:[],a.TempleRegistry.createText(`
                      `,!1),...this._toNodeList(b.name),a.TempleRegistry.createText(`: 
                      `,!1),...ge[b.type]?[a.TempleRegistry.createText(`
                        `,!1),a.TempleRegistry.createElement("a",{"data-type":b.type,click:s},[a.TempleRegistry.createText(`
                          `,!1),...this._toNodeList(b.type),a.TempleRegistry.createText(`
                        `,!1)]).element,...this._toNodeList(b.list?"[]":""),a.TempleRegistry.createText(`
                      `,!1)]:[,a.TempleRegistry.createText(`
                        `,!1),...this._toNodeList(b.type),...this._toNodeList(b.list?"[]":""),a.TempleRegistry.createText(`
                      `,!1)],a.TempleRegistry.createText(`
                    `,!1)]).flat(),a.TempleRegistry.createText(`
                  )
                `,!1)]).element,a.TempleRegistry.createText(`
                `,!1),...ge[d.returns.type]?[a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createElement("a",{"data-type":d.returns.type,click:s},[a.TempleRegistry.createText(`
                      `,!1),...this._toNodeList(d.returns.type),a.TempleRegistry.createText(`
                    `,!1)]).element,...this._toNodeList(d.returns.list?"[]":""),a.TempleRegistry.createText(`
                  `,!1)]).element,a.TempleRegistry.createText(`
                `,!1)]:[,a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(d.returns.type),...this._toNodeList(d.returns.list?"[]":"")]).element,a.TempleRegistry.createText(`
                `,!1)],a.TempleRegistry.createText(`
              `,!1)]:d.kind==="event"?[,a.TempleRegistry.createText(`
                `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(`on('${h}', (event: Event) => void)`)]).element,a.TempleRegistry.createText(`
              `,!1)]:[],a.TempleRegistry.createText(`
              `,!1),a.TempleRegistry.createElement("td",{},[a.TempleRegistry.createText(`
                `,!1),...d.description?[a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("p",{},[...this._toNodeList(d.description)]).element,a.TempleRegistry.createText(`
                  `,!1),...d.example?[a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createElement("h5",{},[a.TempleRegistry.createText("Example",!1)]).element,a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createComponent("ide-code",H,{lang:"js"},[...this._toNodeList(d.example)]).element,a.TempleRegistry.createText(` 
                  `,!1)]:[],a.TempleRegistry.createText(`
                `,!1)]:[],a.TempleRegistry.createText(`
              `,!1)]).element,a.TempleRegistry.createText(`
            `,!1)]).element,a.TempleRegistry.createText(`
          `,!1)]).flat(),a.TempleRegistry.createText(`
        `,!1)]).element,a.TempleRegistry.createText(`
      `,!1)]).element,a.TempleRegistry.createText(`
    `,!1)]).element,a.TempleRegistry.createText(`
  `,!1)]).element,a.TempleRegistry.createText(`
`,!1)]).element]}};var M=P($());var Xe=function(t,...e){let r=Ye(t);for(let l=0;l<e.length;l++)r=r.replace("%s",String(e[l]));return r},Ye=function(t){return t};var Pe=P(W()),re=class extends M.TempleComponent{static component=["translate","Translate_7d25e372f5ffb5e39dad"];styles(){return""}template(){let{trim:e=!1,p:r=!1,li:l=!1,div:s=!1}=(0,Pe.props)(),m=(0,Pe.children)(),h=[],d=[];for(let A of m)typeof A=="string"?h.push(A):A instanceof Node&&A.textContent?h.push(A.textContent):(h.push("%s"),d.push(A));let x=h.join("");e&&(x=x.replace(/\s+/," ").trim());let b=Ye(x).split("%s"),T=[];for(let A=0;A<b.length;A++)T.push(document.createTextNode(b[A])),d[A]&&T.push(d[A]);return()=>[M.TempleRegistry.createText(`
    `,!1),...r?[M.TempleRegistry.createText(`
      `,!1),M.TempleRegistry.createElement("p",{},[...this._toNodeList(T)]).element,M.TempleRegistry.createText(`
    `,!1)]:l?[,M.TempleRegistry.createText(`
      `,!1),M.TempleRegistry.createElement("li",{},[...this._toNodeList(T)]).element,M.TempleRegistry.createText(`
    `,!1)]:s?[,M.TempleRegistry.createText(`
      `,!1),M.TempleRegistry.createElement("div",{},[...this._toNodeList(T)]).element,M.TempleRegistry.createText(`
    `,!1)]:[,M.TempleRegistry.createText(`
      `,!1),...this._toNodeList(T),M.TempleRegistry.createText(`
    `,!1)]]}};var F=P($());L.emitter.once("ready",()=>{let t=document.querySelector("script[data-app]");if(!t)throw L.TempleException.for("APP_DATA not found");try{let d=atob(t.getAttribute("data-app"));window.__APP_DATA__=JSON.parse(d),Object.entries(window.__APP_DATA__).forEach(([x,b])=>{L.data.set(x,b)})}catch{throw L.TempleException.for("APP_DATA is not a valid JSON")}L.data.set("current","document");let e="/docs/getting-started.html",r=Xe("Getting Started - Temple reactive web component template engine."),l=Xe("How to install, setup and use Temple in a project."),s=d=>{document.body.classList.toggle("panel-left-open")},m="https://github.com/OSSPhilippines/temple/tree/main/examples";L.data.delete("current");let h={0:{class:"head panel-head"},1:{class:"menu fas fa-fw fa-bars",click:s},2:{href:"/temple"},3:{src:"/temple/temple-icon.png",alt:"Temple Logo"},5:{class:"tx-white",href:"/temple"},7:{class:"tx-white",href:"/temple/docs/index.html"},8:{class:"github",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},9:{class:"fab fa-github"},10:{class:"npm",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},11:{class:"fab fa-npm text-white"},12:{class:"discord",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},13:{class:"fab fa-discord text-white"},14:{class:"left panel-left"},16:{href:"/temple"},17:{src:"/temple/temple-icon.png",alt:"Temple Logo"},19:{class:"tx-white",href:"/temple"},20:{class:"toggle fas fa-fw fa-chevron-left",click:s},23:{href:"/temple/docs/index.html"},24:{href:"/temple/docs/getting-started.html"},26:{href:"/temple/docs/markup-syntax.html"},27:{href:"/temple/docs/state-management.html"},28:{href:"/temple/docs/component-strategy.html"},29:{href:"/temple/docs/compiler-api.html"},30:{href:"/temple/docs/client-api.html"},32:{href:"/temple/docs/template-engine.html"},33:{href:"/temple/docs/single-page.html"},34:{href:"/temple/docs/static-site.html"},35:{href:"/temple/docs/component-publisher.html"},36:{href:"/temple/docs/developer-tools.html"},37:{class:"panel-right right"},40:{href:"#http"},41:{href:"#develop"},42:{href:"#cache"},43:{href:"#tailwind"},44:{href:"#express"},45:{class:"panel-main"},46:{class:"docs container"},48:{p:!0,trim:!0},49:{title:"Terminal"},50:{lang:"bash"},51:{solid:!0,curved:!0,info:!0},52:{class:"fas fa-info-circle"},54:{target:"_blank",href:"https://marketplace.visualstudio.com/items?itemName=ossph.temple-language"},55:{p:!0,trim:!0},56:{inline:!0},57:{title:"src/index.ts"},58:{lang:"js",numbers:!0,trim:!0,detab:12},59:{p:!0,trim:!0},60:{inline:!0},61:{title:"src/page.dtml"},62:{numbers:!0,trim:!0,detab:12},63:{p:!0,trim:!0},64:{title:"Terminal"},65:{lang:"bash"},66:{name:"http"},68:{p:!0,trim:!0},69:{inline:!0},70:{solid:!0,curved:!0,info:!0},71:{class:"fas fa-info-circle"},73:{panel:410,title:"With NodeJS HTTP"},74:{class:"panel-head"},75:{class:"tabs"},76:{class:"tab active",group:"http",selector:"#index-ts"},77:{class:"tab",group:"http",selector:"#page-dtml"},78:{class:"tab",group:"http",selector:"#package-json"},79:{class:"panel-left"},80:{class:"folder"},81:{class:"fas fa-fw fa-chevron-down"},83:{class:"shift-1 block active",group:"http",selector:"#index-ts"},84:{class:"fas fa-fw fa-file"},85:{class:"shift-1 block",group:"http",selector:"#page-dtml"},86:{class:"fas fa-fw fa-file"},87:{class:"block",group:"http",selector:"#package-json"},88:{class:"fas fa-fw fa-file"},89:{class:"panel-main"},91:{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},92:{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},93:{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},94:{p:!0,trim:!0},95:{title:"Terminal"},96:{lang:"bash"},97:{p:!0,trim:!0},98:{lang:"js",inline:!0},99:{lang:"js",inline:!0},100:{start:"TempleOptions"},101:{p:!0,trim:!0},102:{lang:"js",inline:!0},103:{lang:"js",inline:!0},104:{start:"Render Methods"},105:{name:"develop"},107:{p:!0,trim:!0},108:{lang:"js",inline:!0},109:{title:"Terminal"},110:{lang:"bash"},111:{p:!0,trim:!0},112:{lang:"js",inline:!0},113:{lang:"js",inline:!0},114:{title:"src/index.ts"},115:{lang:"js",numbers:!0,trim:!0,detab:12},116:{p:!0,trim:!0},117:{inline:!0,lang:"js"},118:{inline:!0,lang:"js"},119:{start:"DeveloperOptions"},120:{p:!0,trim:!0},121:{start:"Developer Tools"},122:{p:!0,trim:!0},123:{lang:"js",inline:!0},124:{inline:!0},125:{title:"src/page.dtml"},126:{numbers:!0,trim:!0,detab:12},127:{p:!0,trim:!0},128:{panel:410,title:"With Developer Tools"},129:{class:"panel-head"},130:{class:"tabs"},131:{class:"tab active",group:"develop",selector:"#index-ts"},132:{class:"tab",group:"develop",selector:"#page-dtml"},133:{class:"tab",group:"develop",selector:"#package-json"},134:{class:"panel-left"},135:{class:"folder"},136:{class:"fas fa-fw fa-chevron-down"},138:{class:"shift-1 block active",group:"develop",selector:"#index-ts"},139:{class:"fas fa-fw fa-file"},140:{class:"shift-1 block",group:"develop",selector:"#page-dtml"},141:{class:"fas fa-fw fa-file"},142:{class:"block",group:"develop",selector:"#package-json"},143:{class:"fas fa-fw fa-file"},144:{class:"panel-main"},146:{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},147:{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},148:{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},149:{p:!0,trim:!0},150:{lang:"js",inline:!0},151:{title:"Terminal"},152:{lang:"bash"},153:{p:!0,trim:!0},154:{lang:"js",inline:!0},155:{name:"cache"},157:{p:!0,trim:!0},158:{lang:"js",inline:!0},159:{title:"src/index.ts"},160:{lang:"js",numbers:!0,trim:!0,detab:12},161:{p:!0,trim:!0},162:{lang:"js",inline:!0},163:{title:"src/index.ts"},164:{lang:"js",numbers:!0,trim:!0,detab:12},165:{p:!0,trim:!0},166:{title:"Terminal"},167:{lang:"bash"},168:{p:!0,trim:!0},169:{lang:"js",inline:!0},170:{lang:"js",inline:!0},171:{panel:400,title:"cache.ts (Internal)"},172:{lang:"js",numbers:!0,trim:!0,detab:12},173:{p:!0,trim:!0},174:{start:"EventEmitter"},175:{name:"tailwind"},177:{p:!0,trim:!0},178:{p:!0,trim:!0},179:{inline:!0},180:{solid:!0,curved:!0,warning:!0},181:{class:"fas fa-exclamation-triangle"},183:{p:!0,trim:!0},184:{inline:!0,lang:"js"},185:{title:"Terminal"},186:{lang:"bash"},187:{p:!0,trim:!0},188:{inline:!0,lang:"js"},189:{inline:!0,lang:"js"},190:{title:"src/index.ts"},191:{lang:"js",numbers:!0,trim:!0,detab:12},192:{p:!0,trim:!0},193:{inline:!0,lang:"js"},194:{inline:!0},195:{inline:!0,lang:"js"},196:{title:"src/page.dtml"},197:{numbers:!0,trim:!0,detab:12},198:{p:!0,trim:!0},199:{panel:410,title:"With TailwindCSS"},200:{class:"panel-head"},201:{class:"tabs"},202:{class:"tab active",group:"tailwind",selector:"#index-ts"},203:{class:"tab",group:"tailwind",selector:"#page-dtml"},204:{class:"tab",group:"tailwind",selector:"#package-json"},205:{class:"panel-left"},206:{class:"folder"},207:{class:"fas fa-fw fa-chevron-down"},209:{class:"shift-1 block active",group:"tailwind",selector:"#index-ts"},210:{class:"fas fa-fw fa-file"},211:{class:"shift-1 block",group:"tailwind",selector:"#page-dtml"},212:{class:"fas fa-fw fa-file"},213:{class:"block",group:"tailwind",selector:"#package-json"},214:{class:"fas fa-fw fa-file"},215:{class:"panel-main"},217:{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},218:{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},219:{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},220:{p:!0,trim:!0},221:{title:"Terminal"},222:{lang:"bash"},223:{p:!0,trim:!0},224:{lang:"js",inline:!0},225:{lang:"js",inline:!0},226:{name:"express"},228:{p:!0,trim:!0},229:{inline:!0,lang:"js"},230:{title:"Terminal"},231:{lang:"bash"},232:{p:!0,trim:!0},233:{inline:!0,lang:"js"},234:{inline:!0,lang:"js"},235:{inline:!0,lang:"js"},236:{inline:!0,lang:"js"},237:{start:"Express Developer Tools"},238:{p:!0,trim:!0},239:{inline:!0,lang:"js"},240:{inline:!0,lang:"js"},241:{numbers:!0,trim:!0,detab:10,lang:"js"},242:{p:!0,trim:!0},243:{inline:!0,lang:"js"},244:{numbers:!0,trim:!0,detab:10},245:{p:!0,trim:!0},246:{panel:410,title:"With ExpressJS"},247:{class:"panel-head"},248:{class:"tabs"},249:{class:"tab active",group:"express",selector:"#index-ts"},250:{class:"tab",group:"express",selector:"#page-dtml"},251:{class:"tab",group:"express",selector:"#package-json"},252:{class:"panel-left"},253:{class:"folder"},254:{class:"fas fa-fw fa-chevron-down"},256:{class:"shift-1 block active",group:"express",selector:"#index-ts"},257:{class:"fas fa-fw fa-file"},258:{class:"shift-1 block",group:"express",selector:"#page-dtml"},259:{class:"fas fa-fw fa-file"},260:{class:"block",group:"express",selector:"#package-json"},261:{class:"fas fa-fw fa-file"},262:{class:"panel-main"},264:{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},265:{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},266:{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},267:{p:!0,trim:!0},268:{title:"Terminal"},269:{lang:"bash"},270:{p:!0,trim:!0},271:{lang:"js",inline:!0},273:{p:!0,trim:!0},276:{target:"_blank",href:`${m}/with-fastify`},278:{target:"_blank",href:`${m}/with-hapi`},280:{target:"_blank",href:`${m}/with-koa`},282:{target:"_blank",href:`${m}/with-nest`},284:{target:"_blank",href:`${m}/with-restify`},286:{target:"_blank",href:`${m}/with-webpack`},287:{p:!0,trim:!0},290:{href:"/temple/docs/template-engine.html"},292:{href:"/temple/docs/single-page.html"},294:{href:"/temple/docs/static-site.html"},296:{href:"/temple/docs/component-publisher.html"},297:{class:"pager"},298:{class:"prev",href:"/temple/docs/index.html"},299:{class:"fas fa-fw fa-chevron-left"},300:{class:"next",href:"/temple/docs/markup-syntax.html"},301:{class:"fas fa-fw fa-chevron-right"},302:{class:"foot"}};for(let d of document.body.querySelectorAll("*")){let x=Object.fromEntries(Array.from(d.attributes).map(T=>[T.nodeName,T.nodeValue.length>0?T.nodeValue:!0])),b=String(L.TempleRegistry.elements.size);h[b]&&(Object.assign(x,h[b]),d.TempleAttributes=h[b]),L.TempleRegistry.register(d,x)}customElements.define("panel-main",Y),customElements.define("ide-code",H),customElements.define("ide-app",V),customElements.define("tui-alert",K),customElements.define("tui-tab",ee),customElements.define("api-ui",te),customElements.define("i18n-translate",re),L.emitter.emit("mounted",document.body)});var ur={PanelMain_fd7f1af6410c5b5c8e1f:Y,IdeCode_6f36bc13bb6a166c7abc:H,IdeApp_05341fddbfd1fe4f273b:V,TuiAlert_6b81bcb0566ce7f0cd2d:K,TuiTab_dd9d261e4f37efc3079c:ee,ApiUi_dcdb1ec28ab9a6dac63a:te,I18nTranslate_7d25e372f5ffb5e39dad:re},mr="a67341498153885a2fc0";return Ot(fr);})();
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
