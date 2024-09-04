var TempleAPI=(()=>{var Ft=Object.create;var xe=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var Dt=Object.getPrototypeOf,Ct=Object.prototype.hasOwnProperty;var P=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Pt=(t,e)=>{for(var r in e)xe(t,r,{get:e[r],enumerable:!0})},Ke=(t,e,r,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of St(e))!Ct.call(t,i)&&i!==r&&xe(t,i,{get:()=>e[i],enumerable:!(l=Rt(e,i))||l.enumerable});return t};var M=(t,e,r)=>(r=t!=null?Ft(Dt(t)):{},Ke(e||!t||!t.__esModule?xe(r,"default",{value:t,enumerable:!0}):r,t)),jt=t=>Ke(xe({},"__esModule",{value:!0}),t);var Ie=P(Le=>{"use strict";Object.defineProperty(Le,"__esModule",{value:!0});var Me=class extends Error{static for(e,...r){return r.forEach(function(l){e=e.replace("%s",l)}),new this(e)}static forErrorsFound(e){let r=new this("Invalid Parameters");return r.errors=e,r}static require(e,r,...l){if(!e){for(let i of l)r=r.replace("%s",i);throw new this(r)}}constructor(e,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=e,this.name=this.constructor.name,this.code=r}withCode(e){return this.code=e,this}withPosition(e,r){return this.start=e,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};Le.default=Me});var ie=P(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.TempleEmitter=void 0;var ke=class extends EventTarget{emit(e,r){return this.dispatchEvent(new CustomEvent(e,{detail:r})),this}on(e,r){if(e==="ready"&&document.readyState!=="loading"){let l=new CustomEvent("ready");return setTimeout(()=>r(l),1),this}return this.addEventListener(e,r),this}once(e,r){let l=i=>{this.unbind(e,l),r(i)};return this.on(e,l),this}unbind(e,r){return this.removeEventListener(e,r),this}};ne.TempleEmitter=ke;var Qe=new ke;document.onreadystatechange=()=>{document.readyState!=="loading"&&Qe.emit("ready")};ne.default=Qe});var Ne=P(se=>{"use strict";var Mt=se&&se.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(se,"__esModule",{value:!0});var Oe=Mt(ie()),$e=class{get attributes(){return Object.assign({},this._attributes)}get element(){return this._element}constructor(e,r){this._element=e,this._attributes=r}hasAttribute(e){return e in this._attributes}getAttribute(e){return this._attributes[e]}removeAttribute(e,r=!1){let l=this.getAttribute(e);return typeof l>"u"?this:(delete this._attributes[e],this._element.removeAttribute(e),r||Oe.default.emit("attribute-remove",{element:this,key:e,previous:l}),this)}setAttribute(e,r,l=!1){if(typeof r>"u")return this.removeAttribute(e,l);let i=this.getAttribute(e);return i===r?this:(this._attributes[e]=r,typeof r=="string"&&this._element.setAttribute(e,r),l||(typeof i>"u"?Oe.default.emit("attribute-create",{element:this,key:e,value:r}):Oe.default.emit("attribute-update",{element:this,key:e,value:r,previous:i})),this)}setAttributes(e,r=!1){for(let[i,g]of Object.entries(e))this.setAttribute(i,g,r);let l=Object.keys(e);for(let i of Object.keys(this._attributes))l.includes(i)||this.removeAttribute(i,r);return this}};se.default=$e});var Te=P(ae=>{"use strict";var Lt=ae&&ae.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ae,"__esModule",{value:!0});var It=Lt(Ne()),ve=class{static get elements(){return this._elements}static createComponent(e,r,l,i=[]){let g=document.createElement("template");g.innerHTML=`<${e}></${e}>`;let d=g.content.querySelector(`${e}`);Object.setPrototypeOf(d,r.prototype),d.constructor=r.constructor,d.constructor.component=r.component;for(let[x,k]of Object.entries(l))typeof k=="string"?d.setAttribute(x,k):k===!0&&d.setAttribute(x,x);return d._TempleAttributes=l,d.props=l,i.forEach(x=>d.appendChild(x)),d.register(),customElements.get(e)||d.connectedCallback(),this.register(d,l)}static createElement(e,r,l=[]){let i=document.createElement(e);for(let[g,h]of Object.entries(r))typeof h=="string"?i.setAttribute(g,h):h===!0&&i.setAttribute(g,g);return l.filter(g=>typeof g<"u").forEach(g=>i.appendChild(g)),this.register(i,r)}static createText(e,r=!1){return document.createTextNode(e)}static filter(e){let r=[];return this._elements.forEach((l,i)=>{e(l,i)&&r.push(l)}),r}static get(e){return this._elements.get(e)||null}static has(e){return this._elements.has(e)}static map(e){let r=[];return this._elements.forEach((l,i)=>{r.push(e(l,i))}),r}static register(e,r){if(this.has(e))return this.get(e);let l=new It.default(e,r||{});return this._elements.set(e,l),l}};ve._elements=new Map;ae.default=ve});var z=P(le=>{"use strict";Object.defineProperty(le,"__esModule",{value:!0});le.TempleDataMap=void 0;var _e=class{constructor(){window.__APP_DATA__||(window.__APP_DATA__={})}clear(){return window.__APP_DATA__={},this}delete(e){return this.has(e)?(delete window.__APP_DATA__[e],!0):!1}entries(){return Object.entries(window.__APP_DATA__)}has(e){return e in window.__APP_DATA__}get(e){return window.__APP_DATA__[e]}keys(){return Object.keys(window.__APP_DATA__)}set(e,r){return window.__APP_DATA__[e]=r,this}values(){return Object.values(window.__APP_DATA__)}};le.TempleDataMap=_e;var Ot=new _e;le.default=Ot});var tt=P(pe=>{"use strict";var He=pe&&pe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pe,"__esModule",{value:!0});var oe=He(Te()),we=He(ie()),et=He(z()),Be=class t extends HTMLElement{constructor(){super(...arguments),this._initiated=!1,this._template=null,this._attributes={},this._props={},this._children=void 0,this._rendering=!1}static register(){customElements.define(this.component[0],this)}get attr(){return this._attributes}get element(){return oe.default.has(this)?oe.default.get(this):oe.default.register(this,this._TempleAttributes||{})}get metadata(){let[e,r]=this.constructor.component;return{tagname:e,classname:r}}get originalChildren(){return this._children}get initiated(){return this._initiated}get props(){return this._props}set props(e){this._props=Object.assign({},e),this._attributes=Object.fromEntries(Object.entries(e).filter(r=>typeof r[1]=="string"||r[1]===!0))}adoptedCallback(){this.render()}attributeChangedCallback(e,r,l){this.props=Object.assign(Object.assign({},this.props),{[e]:l}),this.render()}connectedCallback(){this.wait()}disconnectedCallback(){}getParentComponent(){let e=this.parentElement;for(;e;){if(e instanceof t)return e;e=e.parentElement}return null}register(){oe.default.register(this,this._props)}render(){let e=this.getParentComponent();if(e&&!e.initiated)return;if(this._rendering)return;this._rendering=!0,et.default.set("current",this);let r=this.styles();this._template?we.default.emit("unmounted",this):this._template=this.template();let l=this._template().filter(Boolean);if(r.length===0)this.textContent="",l.forEach(i=>this.appendChild(i));else{this.shadowRoot||this.attachShadow({mode:"open"});let i=this.shadowRoot;this.textContent="",i.textContent="";let g=document.createElement("style");g.innerText=r,i.appendChild(g),l.forEach(h=>{var d;return(d=this.shadowRoot)===null||d===void 0?void 0:d.appendChild(h)})}return et.default.delete("current"),this._initiated=!0,we.default.emit("mounted",this),this._rendering=!1,this.shadowRoot?this.shadowRoot.innerHTML:this.innerHTML}wait(){if(document.readyState!=="loading")this._update();else{let e=()=>{this._update(),we.default.unbind("ready",e)};we.default.on("ready",e)}}_toNodeList(e){return e instanceof Node?[e]:Array.isArray(e)&&e.every(r=>r instanceof Node)?e:[oe.default.createText(String(e))]}_update(){typeof this._children>"u"&&(this._children=Array.from(this.childNodes||[]));let e=this.element;e&&(this.props=Object.assign({},e.attributes),this.render()),this._initiated||this.render()}};pe.default=Be});var rt=P(ce=>{"use strict";var $t=ce&&ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ce,"__esModule",{value:!0});var Nt=$t(z());function Bt(t){let e=Nt.default.get("env")||{};return t?e[t]||null:e}ce.default=Bt});var qe=P(de=>{"use strict";var Ht=de&&de.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(de,"__esModule",{value:!0});de.default=qt;var nt=Ht(z());function qt(t=null){return t||(t=nt.default.get("current")||null),t?t==="document"?nt.default.get("props")||{}:t.props:{}}});var it=P(ue=>{"use strict";var zt=ue&&ue.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ue,"__esModule",{value:!0});ue.default=Gt;var Jt=zt(qe());function Gt(t=null){return(0,Jt.default)(t).class}});var at=P(W=>{"use strict";var Ut=W&&W.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(W,"__esModule",{value:!0});W.innerHTML=Zt;W.default=st;var Wt=Ut(z());function Zt(t=null){let e=st(t),r=document.createElement("template");return r.append(...e),r.innerHTML}function st(t=null){return t||(t=Wt.default.get("current")||null),t?t.originalChildren||[]:[]}});var pt=P(J=>{"use strict";var ot=J&&J.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(J,"__esModule",{value:!0});J.SignalRegistry=void 0;J.default=Yt;var lt=ot(Ie()),Xt=ot(z()),Z=class t{static observe(e,r){let l={getter:()=>i.raw,setter:h=>h},i={raw:r,getter(h){return l.getter=h,i},setter(h){return l.setter=h,i}};Object.defineProperty(i,"value",{get(){return l.getter()},set(h){let d=l.setter(h),x=t.serialize(d)!==t.serialize(i.raw);i.raw=d,x&&e.render()}});let g=this._observers.get(e);return g?(g.observed++,g.values.push(i)):this._observers.set(e,{observed:1,values:[i]}),i}static observer(e){return this._observers.get(e)||null}static serialize(e){return JSON.stringify(e)}};J.SignalRegistry=Z;Z._observers=new Map;function Yt(t,e=null){if(e||(e=Xt.default.get("current")||null),!e)throw lt.default.for("Signals can only be created within a Temple component");if(!e.initiated)return Z.observe(e,t);let r=Z.observer(e);if(!r)throw lt.default.for("State mismatch");return r.values[r.observed++%r.values.length]}});var ft=P(Ae=>{"use strict";var dt=Ae&&Ae.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ae,"__esModule",{value:!0});var ct=dt(Te()),ut=dt(ie()),mt=(t,e)=>Array.from(t.querySelectorAll("*")).filter(r=>{let l=ct.default.get(r);return l&&l.hasAttribute(e)}).map(r=>ct.default.get(r));function ze(t,e){ut.default.on("mounted",r=>{if(!r.detail)return;let l=r.detail;mt(l.shadowRoot||l,t).forEach(e)})}function Vt(t,e){ut.default.on("unmounted",r=>{if(!r.detail)return;let l=r.detail;mt(l.shadowRoot||l,t).forEach(e)})}ze("mount",t=>{let e=t.getAttribute("mount");if(typeof e=="function"){let r=new CustomEvent("mount",{detail:{node:t,target:t.element}});e(r)}});Vt("unmount",t=>{let e=t.getAttribute("unmount");if(typeof e=="function"){let r=new CustomEvent("unmount",{detail:{node:t,target:t.element}});e(r)}});ze("if",t=>{let e=t.getAttribute("if");(e===!1||e==="false"||typeof e=="function"&&!e())&&t.element.remove()});["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","wheel","keydown","keypress","keyup","blur","change","contextmenu","focus","input","submit","invalid","reset","search","select","copy","cut","paste","drag","dragstart","dragend","dragover","dragenter","dragleave","drop","scroll","durationchange","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","animationstart","animationend","animationiteration","transitionend","toggle"].forEach(t=>ze(t,e=>{let r=e.getAttribute(t);typeof r=="function"&&(e.element.removeEventListener(t,r),e.element.addEventListener(t,r))}))});var Je=P(y=>{"use strict";var Kt=y&&y.__createBinding||(Object.create?function(t,e,r,l){l===void 0&&(l=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,l,i)}:function(t,e,r,l){l===void 0&&(l=r),t[l]=e[r]}),Qt=y&&y.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Ee=y&&y.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Kt(e,t,r);return Qt(e,t),e},G=y&&y.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(y,"__esModule",{value:!0});y.SignalRegistry=y.TempleException=y.TempleEmitter=y.TempleElement=y.TempleRegistry=y.TempleComponent=y.TempleDataMap=y.emitter=y.signal=y.innerHTML=y.children=y.classnames=y.props=y.env=y.data=void 0;var er=G(Ie());y.TempleException=er.default;var tr=G(tt());y.TempleComponent=tr.default;var rr=G(Te());y.TempleRegistry=rr.default;var nr=G(Ne());y.TempleElement=nr.default;var gt=Ee(ie());y.emitter=gt.default;Object.defineProperty(y,"TempleEmitter",{enumerable:!0,get:function(){return gt.TempleEmitter}});var ht=Ee(z());y.data=ht.default;Object.defineProperty(y,"TempleDataMap",{enumerable:!0,get:function(){return ht.TempleDataMap}});var ir=G(rt());y.env=ir.default;var sr=G(qe());y.props=sr.default;var ar=G(it());y.classnames=ar.default;var yt=Ee(at());y.children=yt.default;Object.defineProperty(y,"innerHTML",{enumerable:!0,get:function(){return yt.innerHTML}});var bt=Ee(pt());y.signal=bt.default;Object.defineProperty(y,"SignalRegistry",{enumerable:!0,get:function(){return bt.SignalRegistry}});ft()});var $=P((Er,xt)=>{xt.exports={...Je()}});var kt=P((Rr,Re)=>{var lr=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};var u=function(t){var e=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,l={},i={manual:t.Prism&&t.Prism.manual,disableWorkerMessageHandler:t.Prism&&t.Prism.disableWorkerMessageHandler,util:{encode:function n(s){return s instanceof g?new g(s.type,n(s.content),s.alias):Array.isArray(s)?s.map(n):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++r}),n.__id},clone:function n(s,o){o=o||{};var p,c;switch(i.util.type(s)){case"Object":if(c=i.util.objId(s),o[c])return o[c];p={},o[c]=p;for(var f in s)s.hasOwnProperty(f)&&(p[f]=n(s[f],o));return p;case"Array":return c=i.util.objId(s),o[c]?o[c]:(p=[],o[c]=p,s.forEach(function(b,m){p[m]=n(b,o)}),p);default:return s}},getLanguage:function(n){for(;n;){var s=e.exec(n.className);if(s)return s[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,s){n.className=n.className.replace(RegExp(e,"gi"),""),n.classList.add("language-"+s)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(p){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(p.stack)||[])[1];if(n){var s=document.getElementsByTagName("script");for(var o in s)if(s[o].src==n)return s[o]}return null}},isActive:function(n,s,o){for(var p="no-"+s;n;){var c=n.classList;if(c.contains(s))return!0;if(c.contains(p))return!1;n=n.parentElement}return!!o}},languages:{plain:l,plaintext:l,text:l,txt:l,extend:function(n,s){var o=i.util.clone(i.languages[n]);for(var p in s)o[p]=s[p];return o},insertBefore:function(n,s,o,p){p=p||i.languages;var c=p[n],f={};for(var b in c)if(c.hasOwnProperty(b)){if(b==s)for(var m in o)o.hasOwnProperty(m)&&(f[m]=o[m]);o.hasOwnProperty(b)||(f[b]=c[b])}var F=p[n];return p[n]=f,i.languages.DFS(i.languages,function(D,N){N===F&&D!=n&&(this[D]=f)}),f},DFS:function n(s,o,p,c){c=c||{};var f=i.util.objId;for(var b in s)if(s.hasOwnProperty(b)){o.call(s,b,s[b],p||b);var m=s[b],F=i.util.type(m);F==="Object"&&!c[f(m)]?(c[f(m)]=!0,n(m,o,null,c)):F==="Array"&&!c[f(m)]&&(c[f(m)]=!0,n(m,o,b,c))}}},plugins:{},highlightAll:function(n,s){i.highlightAllUnder(document,n,s)},highlightAllUnder:function(n,s,o){var p={callback:o,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",p),p.elements=Array.prototype.slice.apply(p.container.querySelectorAll(p.selector)),i.hooks.run("before-all-elements-highlight",p);for(var c=0,f;f=p.elements[c++];)i.highlightElement(f,s===!0,p.callback)},highlightElement:function(n,s,o){var p=i.util.getLanguage(n),c=i.languages[p];i.util.setLanguage(n,p);var f=n.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(f,p);var b=n.textContent,m={element:n,language:p,grammar:c,code:b};function F(N){m.highlightedCode=N,i.hooks.run("before-insert",m),m.element.innerHTML=m.highlightedCode,i.hooks.run("after-highlight",m),i.hooks.run("complete",m),o&&o.call(m.element)}if(i.hooks.run("before-sanity-check",m),f=m.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!m.code){i.hooks.run("complete",m),o&&o.call(m.element);return}if(i.hooks.run("before-highlight",m),!m.grammar){F(i.util.encode(m.code));return}if(s&&t.Worker){var D=new Worker(i.filename);D.onmessage=function(N){F(N.data)},D.postMessage(JSON.stringify({language:m.language,code:m.code,immediateClose:!0}))}else F(i.highlight(m.code,m.grammar,m.language))},highlight:function(n,s,o){var p={code:n,grammar:s,language:o};if(i.hooks.run("before-tokenize",p),!p.grammar)throw new Error('The language "'+p.language+'" has no grammar.');return p.tokens=i.tokenize(p.code,p.grammar),i.hooks.run("after-tokenize",p),g.stringify(i.util.encode(p.tokens),p.language)},tokenize:function(n,s){var o=s.rest;if(o){for(var p in o)s[p]=o[p];delete s.rest}var c=new x;return k(c,c.head,n),d(n,c,s,c.head,0),E(c)},hooks:{all:{},add:function(n,s){var o=i.hooks.all;o[n]=o[n]||[],o[n].push(s)},run:function(n,s){var o=i.hooks.all[n];if(!(!o||!o.length))for(var p=0,c;c=o[p++];)c(s)}},Token:g};t.Prism=i;function g(n,s,o,p){this.type=n,this.content=s,this.alias=o,this.length=(p||"").length|0}g.stringify=function n(s,o){if(typeof s=="string")return s;if(Array.isArray(s)){var p="";return s.forEach(function(F){p+=n(F,o)}),p}var c={type:s.type,content:n(s.content,o),tag:"span",classes:["token",s.type],attributes:{},language:o},f=s.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(c.classes,f):c.classes.push(f)),i.hooks.run("wrap",c);var b="";for(var m in c.attributes)b+=" "+m+'="'+(c.attributes[m]||"").replace(/"/g,"&quot;")+'"';return"<"+c.tag+' class="'+c.classes.join(" ")+'"'+b+">"+c.content+"</"+c.tag+">"};function h(n,s,o,p){n.lastIndex=s;var c=n.exec(o);if(c&&p&&c[1]){var f=c[1].length;c.index+=f,c[0]=c[0].slice(f)}return c}function d(n,s,o,p,c,f){for(var b in o)if(!(!o.hasOwnProperty(b)||!o[b])){var m=o[b];m=Array.isArray(m)?m:[m];for(var F=0;F<m.length;++F){if(f&&f.cause==b+","+F)return;var D=m[F],N=D.inside,Ze=!!D.lookbehind,Xe=!!D.greedy,_t=D.alias;if(Xe&&!D.pattern.global){var wt=D.pattern.toString().match(/[imsuy]*$/)[0];D.pattern=RegExp(D.pattern.source,wt+"g")}for(var Ye=D.pattern||D,C=p.next,O=c;C!==s.tail&&!(f&&O>=f.reach);O+=C.value.length,C=C.next){var U=C.value;if(s.length>n.length)return;if(!(U instanceof g)){var ge=1,I;if(Xe){if(I=h(Ye,O,n,Ze),!I||I.index>=n.length)break;var he=I.index,At=I.index+I[0].length,B=O;for(B+=C.value.length;he>=B;)C=C.next,B+=C.value.length;if(B-=C.value.length,O=B,C.value instanceof g)continue;for(var re=C;re!==s.tail&&(B<At||typeof re.value=="string");re=re.next)ge++,B+=re.value.length;ge--,U=n.slice(O,B),I.index-=O}else if(I=h(Ye,0,U,Ze),!I)continue;var he=I.index,ye=I[0],Ce=U.slice(0,he),Ve=U.slice(he+ye.length),Pe=O+U.length;f&&Pe>f.reach&&(f.reach=Pe);var be=C.prev;Ce&&(be=k(s,be,Ce),O+=Ce.length),T(s,be,ge);var Et=new g(b,N?i.tokenize(ye,N):ye,_t,ye);if(C=k(s,be,Et),Ve&&k(s,C,Ve),ge>1){var je={cause:b+","+F,reach:Pe};d(n,s,o,C.prev,O,je),f&&je.reach>f.reach&&(f.reach=je.reach)}}}}}}function x(){var n={value:null,prev:null,next:null},s={value:null,prev:n,next:null};n.next=s,this.head=n,this.tail=s,this.length=0}function k(n,s,o){var p=s.next,c={value:o,prev:s,next:p};return s.next=c,p.prev=c,n.length++,c}function T(n,s,o){for(var p=s.next,c=0;c<o&&p!==n.tail;c++)p=p.next;s.next=p,p.prev=s,n.length-=c}function E(n){for(var s=[],o=n.head.next;o!==n.tail;)s.push(o.value),o=o.next;return s}if(!t.document)return t.addEventListener&&(i.disableWorkerMessageHandler||t.addEventListener("message",function(n){var s=JSON.parse(n.data),o=s.language,p=s.code,c=s.immediateClose;t.postMessage(i.highlight(p,i.languages[o],o)),c&&t.close()},!1)),i;var _=i.util.currentScript();_&&(i.filename=_.src,_.hasAttribute("data-manual")&&(i.manual=!0));function v(){i.manual||i.highlightAll()}if(!i.manual){var w=document.readyState;w==="loading"||w==="interactive"&&_&&_.defer?document.addEventListener("DOMContentLoaded",v):window.requestAnimationFrame?window.requestAnimationFrame(v):window.setTimeout(v,16)}return i}(lr);typeof Re<"u"&&Re.exports&&(Re.exports=u);typeof global<"u"&&(global.Prism=u);u.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};u.languages.markup.tag.inside["attr-value"].inside.entity=u.languages.markup.entity;u.languages.markup.doctype.inside["internal-subset"].inside=u.languages.markup;u.hooks.add("wrap",function(t){t.type==="entity"&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});Object.defineProperty(u.languages.markup.tag,"addInlined",{value:function(e,r){var l={};l["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:u.languages[r]},l.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:l}};i["language-"+r]={pattern:/[\s\S]+/,inside:u.languages[r]};var g={};g[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:i},u.languages.insertBefore("markup","cdata",g)}});Object.defineProperty(u.languages.markup.tag,"addAttribute",{value:function(t,e){u.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:u.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});u.languages.html=u.languages.markup;u.languages.mathml=u.languages.markup;u.languages.svg=u.languages.markup;u.languages.xml=u.languages.extend("markup",{});u.languages.ssml=u.languages.xml;u.languages.atom=u.languages.xml;u.languages.rss=u.languages.xml;(function(t){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;t.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},t.languages.css.atrule.inside.rest=t.languages.css;var r=t.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))})(u);u.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};u.languages.javascript=u.languages.extend("clike",{"class-name":[u.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});u.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;u.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:u.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:u.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:u.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:u.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:u.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});u.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:u.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});u.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});u.languages.markup&&(u.languages.markup.tag.addInlined("script","javascript"),u.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));u.languages.js=u.languages.javascript;(function(){if(typeof u>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t="Loading\u2026",e=function(_,v){return"\u2716 Error "+_+" while fetching file: "+v},r="\u2716 Error: File does not exist or is empty",l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",g="loading",h="loaded",d="failed",x="pre[data-src]:not(["+i+'="'+h+'"]):not(['+i+'="'+g+'"])';function k(_,v,w){var n=new XMLHttpRequest;n.open("GET",_,!0),n.onreadystatechange=function(){n.readyState==4&&(n.status<400&&n.responseText?v(n.responseText):n.status>=400?w(e(n.status,n.statusText)):w(r))},n.send(null)}function T(_){var v=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(_||"");if(v){var w=Number(v[1]),n=v[2],s=v[3];return n?s?[w,Number(s)]:[w,void 0]:[w,w]}}u.hooks.add("before-highlightall",function(_){_.selector+=", "+x}),u.hooks.add("before-sanity-check",function(_){var v=_.element;if(v.matches(x)){_.code="",v.setAttribute(i,g);var w=v.appendChild(document.createElement("CODE"));w.textContent=t;var n=v.getAttribute("data-src"),s=_.language;if(s==="none"){var o=(/\.(\w+)$/.exec(n)||[,"none"])[1];s=l[o]||o}u.util.setLanguage(w,s),u.util.setLanguage(v,s);var p=u.plugins.autoloader;p&&p.loadLanguages(s),k(n,function(c){v.setAttribute(i,h);var f=T(v.getAttribute("data-range"));if(f){var b=c.split(/\r\n?|\n/g),m=f[0],F=f[1]==null?b.length:f[1];m<0&&(m+=b.length),m=Math.max(0,Math.min(m-1,b.length)),F<0&&(F+=b.length),F=Math.max(0,Math.min(F,b.length)),c=b.slice(m,F).join(`
`),v.hasAttribute("data-start")||v.setAttribute("data-start",String(m+1))}w.textContent=c,u.highlightElement(w)},function(c){v.setAttribute(i,d),w.textContent=c})}}),u.plugins.fileHighlight={highlight:function(v){for(var w=(v||document).querySelectorAll(x),n=0,s;s=w[n++];)u.highlightElement(s)}};var E=!1;u.fileHighlight=function(){E||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),E=!0),u.plugins.fileHighlight.highlight.apply(this,arguments)}})()});var Y=P((Sr,vt)=>{vt.exports={...Je()}});var dr={};Pt(dr,{BUILD_ID:()=>cr,TempleComponent:()=>R.TempleComponent,TempleElement:()=>R.TempleElement,TempleEmitter:()=>R.TempleEmitter,TempleException:()=>R.TempleException,TempleRegistry:()=>R.TempleRegistry,children:()=>R.children,components:()=>pr,data:()=>R.data,emitter:()=>R.emitter,props:()=>R.props,signal:()=>R.signal});var L=M($());var Fe=M($()),X=class extends Fe.TempleComponent{static component=["main","Main_fd7f1af6410c5b5c8e1f"];styles(){return""}template(){let e=this.props,r=()=>this.originalChildren;return()=>[Fe.TempleRegistry.createElement("main",{},[...this._toNodeList(r())]).element]}};var A=M($()),Ge=M(kt()),Tt=M(Y()),H=class extends A.TempleComponent{static component=["code","Code_6f36bc13bb6a166c7abc"];styles(){return`:host {
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
  }`}template(){let e=this.props,{lang:r="markup",numbers:l=!1,inline:i=!1,trim:g=!1,ltrim:h=!1,rtrim:d=!1,detab:x=0}=e,k=(0,Tt.children)(),T=k[0]?.textContent||"";x&&(T=T.replace(new RegExp(`\\n {${x}}`,"g"),`
`)),g?T=T.trim():h?T=T.replace(/^\s+/,""):d&&(T=T.replace(/\s+$/,""));let E=_=>{if(!T)return;let v=Ge.default.highlight(T,Ge.default.languages[r],r);if(_.detail.target.innerHTML=v,l){let w=v.match(/\n(?!$)/g),n=w?w.length+1:1,s=new Array(n+1).join("<span></span>"),o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.className="line-numbers-rows",o.innerHTML=s,_.detail.target.appendChild(o)}};return()=>[A.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css"}).element,A.TempleRegistry.createText(`
`,!1),A.TempleRegistry.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css"}).element,A.TempleRegistry.createText(`
`,!1),...r==="bash"?[A.TempleRegistry.createText(`
  `,!1),A.TempleRegistry.createElement("div",{class:"terminal"},[A.TempleRegistry.createElement("span",{},[A.TempleRegistry.createText("$",!1)]).element,A.TempleRegistry.createText(" ",!1),...this._toNodeList(k)]).element,A.TempleRegistry.createText(`
`,!1)]:T?[,A.TempleRegistry.createText(`
  `,!1),...l?[A.TempleRegistry.createText(`
    `,!1),A.TempleRegistry.createElement("pre",{class:"snippet line-numbers"},[A.TempleRegistry.createElement("code",{mount:E},[]).element]).element,A.TempleRegistry.createText(`
  `,!1)]:[,A.TempleRegistry.createText(`
    `,!1),A.TempleRegistry.createElement("pre",{class:"snippet pad"},[A.TempleRegistry.createElement("code",{mount:E},[]).element]).element,A.TempleRegistry.createText(`
  `,!1)],A.TempleRegistry.createText(`
`,!1)]:[]]}};var S=M($()),Se=M(Y()),V=class extends S.TempleComponent{static component=["app","App_05341fddbfd1fe4f273b"];styles(){return""}template(){let{title:e,panel:r}=(0,Se.props)(),l=`body ${r?"panel":""}`,i=r?`height:${r}px`:"";return()=>[S.TempleRegistry.createText(`
`,!1),S.TempleRegistry.createElement("div",{class:"window"},[S.TempleRegistry.createText(`
  `,!1),S.TempleRegistry.createElement("div",{class:"head"},[S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"dot"},[]).element,S.TempleRegistry.createText(`
    `,!1),S.TempleRegistry.createElement("span",{class:"title"},[...this._toNodeList(e)]).element,S.TempleRegistry.createText(`
  `,!1)]).element,S.TempleRegistry.createText(`
  `,!1),S.TempleRegistry.createElement("div",{class:l,style:i},[...this._toNodeList((0,Se.children)())]).element,S.TempleRegistry.createText(`
`,!1)]).element]}};var a=M($());var fe=M(Y());var me={Asset:{type:{kind:"property",list:!1,type:["text/html","text/javascript","text/css","text/plain"],description:"The MIME type of the build file asset"},content:{kind:"property",list:!1,type:"string",description:"The source code of the build file asset."}},Path:{path:{kind:"property",list:!1,type:"string",description:"The file path",example:"'/path/to/file'"},type:{kind:"property",list:!1,type:"string",description:"The type of path.",example:"'file'"}},Config:{brand:{kind:"property",list:!1,type:"string",description:"The brand prefixed before the component tag name.",example:"'temple'"},cwd:{kind:"property",list:!1,type:"string",description:"The project's current working directory (cwd).",example:"'/path/to/project'"},fs:{kind:"property",list:!1,type:"FileSystem",description:"The file system being used to read/write files.",example:`import fs from 'fs';

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
});`},server:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled server code, given the the template source file.",example:"await compiler.server('./docs/api.dtml'); // server script"},styles:{kind:"function",async:!0,args:[{kind:"property",list:!1,name:"sourceFile",type:"string"}],returns:{kind:"property",list:!1,type:"string"},description:"Returns compiled css styles, given the the template source file.",example:"await compiler.styles('./docs/api.dtml'); //css styles"}}};var K=class extends a.TempleComponent{static component=["ui","Ui_dcdb1ec28ab9a6dac63a"];styles(){return`:host {
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
  }`}template(){let{start:e="TempleCompiler"}=(0,fe.props)(),r=(0,fe.signal)([e]),l=(0,fe.signal)(e),i=h=>{let d=h.target.getAttribute("data-type");r.value=[...r.value,d],l.value=d},g=()=>{r.value=r.value.slice(0,r.value.length-1),l.value=r.value[r.value.length-1]};return()=>[a.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}).element,a.TempleRegistry.createText(`
`,!1),a.TempleRegistry.createElement("div",{},[a.TempleRegistry.createText(`
  `,!1),a.TempleRegistry.createElement("h3",{},[a.TempleRegistry.createText(`
    `,!1),...r.value.length>1?[a.TempleRegistry.createText(`
      `,!1),a.TempleRegistry.createElement("a",{click:g},[a.TempleRegistry.createText(`
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
          `,!1),...Object.entries(me[l.value]).map(([h,d])=>[a.TempleRegistry.createText(`
            `,!1),a.TempleRegistry.createElement("tr",{},[a.TempleRegistry.createText(`
              `,!1),...d.kind==="property"?[a.TempleRegistry.createText(`
                `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(h)]).element,a.TempleRegistry.createText(`
                `,!1),...me[d.type]?[a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createElement("a",{"data-type":d.type,click:i},[a.TempleRegistry.createText(`
                      `,!1),...this._toNodeList(d.type),a.TempleRegistry.createText(`
                    `,!1)]).element,...this._toNodeList(d.list?"[]":""),a.TempleRegistry.createText(`
                  `,!1)]).element,a.TempleRegistry.createText(`
                `,!1)]:[,a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[...this._toNodeList(d.type),...this._toNodeList(d.list?"[]":"")]).element,a.TempleRegistry.createText(`
                `,!1)],a.TempleRegistry.createText(`
              `,!1)]:d.kind==="function"?[,a.TempleRegistry.createText(`
                `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                  `,!1),...this._toNodeList(h),a.TempleRegistry.createText(`(
                    `,!1),...Object.entries(d.args).map(([x,k])=>[a.TempleRegistry.createText(`
                      `,!1),...x>0?[a.TempleRegistry.createText(", ",!1)]:[],a.TempleRegistry.createText(`
                      `,!1),...this._toNodeList(k.name),a.TempleRegistry.createText(`: 
                      `,!1),...me[k.type]?[a.TempleRegistry.createText(`
                        `,!1),a.TempleRegistry.createElement("a",{"data-type":k.type,click:i},[a.TempleRegistry.createText(`
                          `,!1),...this._toNodeList(k.type),a.TempleRegistry.createText(`
                        `,!1)]).element,...this._toNodeList(k.list?"[]":""),a.TempleRegistry.createText(`
                      `,!1)]:[,a.TempleRegistry.createText(`
                        `,!1),...this._toNodeList(k.type),...this._toNodeList(k.list?"[]":""),a.TempleRegistry.createText(`
                      `,!1)],a.TempleRegistry.createText(`
                    `,!1)]).flat(),a.TempleRegistry.createText(`
                  )
                `,!1)]).element,a.TempleRegistry.createText(`
                `,!1),...me[d.returns.type]?[a.TempleRegistry.createText(`
                  `,!1),a.TempleRegistry.createElement("td",{valign:"top",nowrap:!0},[a.TempleRegistry.createText(`
                    `,!1),a.TempleRegistry.createElement("a",{"data-type":d.returns.type,click:i},[a.TempleRegistry.createText(`
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
`,!1)]).element]}};var q=M($()),ee=M(Y()),Q=class extends q.TempleComponent{static component=["alert","Alert_6b81bcb0566ce7f0cd2d"];styles(){return`:host {
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
  }`}template(){let{color:e,info:r,warning:l,success:i,error:g,muted:h,primary:d,secondary:x,solid:k,outline:T,curved:E,rounded:_,pill:v,style:w}=(0,ee.props)(),n={classes:["alert"],styles:""},s=T?"outline":"solid";E?n.classes.push("curved"):_?n.classes.push("rounded"):v&&n.classes.push("pill"),s==="outline"?(n.classes.push("solid","thin"),e?(n.styles+=`border-color: ${e};`,n.styles+=`color: ${e};`):r?n.classes.push("bd-info","tx-info"):l?n.classes.push("bd-warning","tx-warning"):i?n.classes.push("bd-success","tx-success"):g?n.classes.push("bd-error","tx-error"):h?n.classes.push("bd-muted","tx-muted"):d?n.classes.push("bd-primary","tx-primary"):x&&n.classes.push("bd-secondary","tx-secondary")):(n.classes.push("tx-white"),e?n.styles+=`background-color: ${e};`:r?n.classes.push("bg-info"):l?n.classes.push("bg-warning"):i?n.classes.push("bg-success"):g?n.classes.push("bg-error"):h?n.classes.push("bg-muted"):d?n.classes.push("bg-primary"):x&&n.classes.push("bg-secondary"));let o={classes:[...n.classes,(0,ee.classnames)()].join(" "),styles:{...n.styles,...w}};return()=>[q.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}).element,q.TempleRegistry.createText(`
`,!1),q.TempleRegistry.createElement("div",{class:o.classes,style:o.styles},[q.TempleRegistry.createText(`
  `,!1),...this._toNodeList((0,ee.children)()),q.TempleRegistry.createText(`
`,!1)]).element]}};var j=M($());var Ue=function(t,...e){let r=We(t);for(let l=0;l<e.length;l++)r=r.replace("%s",String(e[l]));return r},We=function(t){return t};var De=M(Y()),te=class extends j.TempleComponent{static component=["translate","Translate_7d25e372f5ffb5e39dad"];styles(){return""}template(){let{trim:e=!1,p:r=!1,li:l=!1,div:i=!1}=(0,De.props)(),g=(0,De.children)(),h=[],d=[];for(let E of g)typeof E=="string"?h.push(E):E instanceof Node&&E.textContent?h.push(E.textContent):(h.push("%s"),d.push(E));let x=h.join("");e&&(x=x.replace(/\s+/," ").trim());let k=We(x).split("%s"),T=[];for(let E=0;E<k.length;E++)T.push(document.createTextNode(k[E])),d[E]&&T.push(d[E]);return()=>[j.TempleRegistry.createText(`
    `,!1),...r?[j.TempleRegistry.createText(`
      `,!1),j.TempleRegistry.createElement("p",{},[...this._toNodeList(T)]).element,j.TempleRegistry.createText(`
    `,!1)]:l?[,j.TempleRegistry.createText(`
      `,!1),j.TempleRegistry.createElement("li",{},[...this._toNodeList(T)]).element,j.TempleRegistry.createText(`
    `,!1)]:i?[,j.TempleRegistry.createText(`
      `,!1),j.TempleRegistry.createElement("div",{},[...this._toNodeList(T)]).element,j.TempleRegistry.createText(`
    `,!1)]:[,j.TempleRegistry.createText(`
      `,!1),...this._toNodeList(T),j.TempleRegistry.createText(`
    `,!1)]]}};var R=M($());L.emitter.once("ready",()=>{let t=document.querySelector("script[data-app]");if(!t)throw L.TempleException.for("APP_DATA not found");try{let h=atob(t.getAttribute("data-app"));window.__APP_DATA__=JSON.parse(h),Object.entries(window.__APP_DATA__).forEach(([d,x])=>{L.data.set(d,x)})}catch{throw L.TempleException.for("APP_DATA is not a valid JSON")}L.data.set("current","document");let e="/docs/state-management.html",r=Ue("State Management - Temple reactive web component template engine."),l=Ue("Learn how to manage states in Temple."),i=h=>{document.body.classList.toggle("panel-left-open")};L.data.delete("current");let g={0:{class:"head panel-head"},1:{class:"menu fas fa-fw fa-bars",click:i},2:{href:"/temple"},3:{src:"/temple/temple-icon.png",alt:"Temple Logo"},5:{class:"tx-white",href:"/temple"},7:{class:"tx-white",href:"/temple/docs/index.html"},8:{class:"github",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},9:{class:"fab fa-github"},10:{class:"npm",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},11:{class:"fab fa-npm text-white"},12:{class:"discord",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},13:{class:"fab fa-discord text-white"},14:{class:"left panel-left"},16:{href:"/temple"},17:{src:"/temple/temple-icon.png",alt:"Temple Logo"},19:{class:"tx-white",href:"/temple"},20:{class:"toggle fas fa-fw fa-chevron-left",click:i},23:{href:"/temple/docs/index.html"},24:{href:"/temple/docs/getting-started.html"},26:{href:"/temple/docs/markup-syntax.html"},27:{href:"/temple/docs/state-management.html"},28:{href:"/temple/docs/component-strategy.html"},29:{href:"/temple/docs/compiler-api.html"},30:{href:"/temple/docs/client-api.html"},32:{href:"/temple/docs/template-engine.html"},33:{href:"/temple/docs/single-page.html"},34:{href:"/temple/docs/static-site.html"},35:{href:"/temple/docs/component-publisher.html"},36:{href:"/temple/docs/developer-tools.html"},37:{class:"panel-right right"},40:{href:"#props"},41:{href:"#signals"},42:{href:"#events"},43:{href:"#classnames"},44:{href:"#children"},45:{href:"#env"},46:{href:"#this"},47:{class:"panel-main"},48:{class:"docs container"},50:{p:!0,trim:!0},51:{name:"props"},53:{lang:"js",trim:!0,detab:10},54:{p:!0,trim:!0},56:{name:"signals"},59:{trim:!0,detab:10},60:{p:!0,trim:!0},61:{type:"javascript",inline:!0},63:{p:!0,trim:!0},64:{name:"events"},66:{trim:!0,number:!0,detab:10},67:{p:!0,trim:!0},68:{inline:!0},69:{class:"col-2"},74:{inline:!0},76:{inline:!0},78:{inline:!0},80:{inline:!0},82:{inline:!0},84:{inline:!0},86:{inline:!0},88:{inline:!0},92:{inline:!0},94:{inline:!0},96:{inline:!0},100:{inline:!0},102:{inline:!0},104:{inline:!0},106:{inline:!0},108:{inline:!0},110:{inline:!0},112:{inline:!0},114:{inline:!0},116:{inline:!0},118:{inline:!0},122:{inline:!0},124:{inline:!0},126:{inline:!0},130:{inline:!0},135:{inline:!0},137:{inline:!0},139:{inline:!0},141:{inline:!0},143:{inline:!0},145:{inline:!0},147:{inline:!0},149:{inline:!0},153:{inline:!0},155:{inline:!0},157:{inline:!0},159:{inline:!0},161:{inline:!0},163:{inline:!0},165:{inline:!0},167:{inline:!0},169:{inline:!0},171:{inline:!0},173:{inline:!0},175:{inline:!0},177:{inline:!0},179:{inline:!0},181:{inline:!0},183:{inline:!0},185:{inline:!0},187:{inline:!0},191:{inline:!0},193:{inline:!0},195:{inline:!0},196:{name:"classnames"},198:{lang:"js",trim:!0,detab:10},199:{p:!0,trim:!0},201:{name:"children"},203:{lang:"js",trim:!0,detab:10},204:{p:!0,trim:!0},206:{name:"env"},208:{trim:!0,detab:10},209:{p:!0,trim:!0},211:{name:"this"},213:{title:"What's this"},214:{numbers:!0,detab:12},215:{p:!0,trim:!0},216:{inline:!0},217:{inline:!0},218:{inline:!0},219:{inline:!0},220:{inline:!0},221:{inline:!0},222:{inline:!0},223:{start:"TempleComponent"},224:{curved:!0,info:!0},225:{class:"fas fa-fw fa-info-circle"},228:{target:"_blank",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"},229:{class:"pager"},230:{class:"prev",href:"/temple/docs/markup-syntax.html"},231:{class:"fas fa-fw fa-chevron-left"},232:{class:"next",href:"/temple/docs/component-strategy.html"},233:{class:"fas fa-fw fa-chevron-right"},234:{class:"foot"}};for(let h of document.body.querySelectorAll("*")){let d=Object.fromEntries(Array.from(h.attributes).map(k=>[k.nodeName,k.nodeValue.length>0?k.nodeValue:!0])),x=String(L.TempleRegistry.elements.size);g[x]&&(Object.assign(d,g[x]),h.TempleAttributes=g[x]),L.TempleRegistry.register(h,d)}customElements.define("panel-main",X),customElements.define("ide-code",H),customElements.define("ide-app",V),customElements.define("api-ui",K),customElements.define("tui-alert",Q),customElements.define("i18n-translate",te),L.emitter.emit("mounted",document.body)});var pr={PanelMain_fd7f1af6410c5b5c8e1f:X,IdeCode_6f36bc13bb6a166c7abc:H,IdeApp_05341fddbfd1fe4f273b:V,ApiUi_dcdb1ec28ab9a6dac63a:K,TuiAlert_6b81bcb0566ce7f0cd2d:Q,I18nTranslate_7d25e372f5ffb5e39dad:te},cr="269f8b60f20cebb43be6";return jt(dr);})();
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
