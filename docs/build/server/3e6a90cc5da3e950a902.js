var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var i=(l,t)=>()=>(t||l((t={exports:{}}).exports,t),t.exports),ae=(l,t)=>{for(var a in t)g(l,a,{get:t[a],enumerable:!0})},H=(l,t,a,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ee(t))!le.call(l,n)&&n!==a&&g(l,n,{get:()=>t[n],enumerable:!(s=Z(t,n))||s.enumerable});return l};var U=(l,t,a)=>(a=l!=null?X(te(l)):{},H(t||!l||!l.__esModule?g(a,"default",{value:l,enumerable:!0}):a,l)),se=l=>H(g({},"__esModule",{value:!0}),l);var v=i(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});var E=class extends Error{static for(t,...a){return a.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let a=new this("Invalid Parameters");return a.errors=t,a}static require(t,a,...s){if(!t){for(let n of s)a=a.replace("%s",n);throw new this(a)}}constructor(t,a=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=a}withCode(t){return this.code=t,this}withPosition(t,a){return this.start=t,this.end=a,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};w.default=E});var S=i(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(a=>this._elements.add(a))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};L.default=k});var p=i(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var re=new Map;j.default=re});var O=i(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var D=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,a=!1){this._escape=a,this._value=t}toString(){return this.value}};N.default=D});var M=i(m=>{"use strict";var ce=m&&m.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(m,"__esModule",{value:!0});var ne=ce(S()),ie=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],P=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,a={},s="",n=[]){this._attributes={},this._name=t,this._attributes=a,this._props=s,this._children=new ne.default(n)}toString(){let t=Object.entries(this._attributes),a=t.length>0?" "+t.map(([n,b])=>{if(typeof b=="string")return`${n}="${b}"`;if(typeof b=="boolean")return b?n:""}).join(" "):"";if(ie.includes(this._name))return`<${this._name}${a} />`;let s=this._children.toString();return`<${this._name}${a}>${s}</${this._name}>`}};m.default=P});var q=i(f=>{"use strict";var J=f&&f.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(f,"__esModule",{value:!0});var oe=J(O()),R=J(M()),A=class{static render(t){return t.filter(Boolean).map(a=>a.toString()).join("")}static registry(t,a=new Set){return t.forEach(s=>{s instanceof R.default&&(["html","head","body"].includes(s.name)||a.add(s),s.name!=="head"&&s.children.length>0&&this.registry(s.children.toArray(),a))}),a}static createElement(t,a,s,n=[]){return new R.default(t,a,s,n)}static createText(t,a=!0){return new oe.default(t,a)}};f.default=A});var G=i(h=>{"use strict";var B=h&&h.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(h,"__esModule",{value:!0});var pe=B(v()),C=B(p()),I=B(q()),$=class{bindings(){let t=I.default.registry(this.template());return`{ ${Array.from(t.values()).map((s,n)=>s.props!=="{ }"?`'${n}': ${s.props}`:"").filter(s=>s!=="").join(", ")} }`}render(t={}){C.default.set("props",t||{}),C.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(C.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let a=this.template(),s=I.default.render(a).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(a=>typeof a=="object"&&typeof a.nodeType=="number")?t:[I.default.createText(String(t))]}};h.default=$});var W=i(x=>{"use strict";Object.defineProperty(x,"__esModule",{value:!0});x.TempleEmitter=void 0;var y=class{emit(t,a){return this}on(t,a){return this}once(t,a){return this}unbind(t,a){return this}};x.TempleEmitter=y;var me=new y;x.default=me});var z=i(u=>{"use strict";var fe=u&&u.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(u,"__esModule",{value:!0});var he=fe(p());function xe(l){let t=he.default.get("env")||{};return l?t[l]||null:t}u.default=xe});var V=i(d=>{"use strict";var ue=d&&d.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(d,"__esModule",{value:!0});d.default=Te;var de=ue(p());function Te(){return de.default.get("props")||{}}});var K=i(r=>{"use strict";var be=r&&r.__createBinding||(Object.create?function(l,t,a,s){s===void 0&&(s=a);var n=Object.getOwnPropertyDescriptor(t,a);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(l,s,n)}:function(l,t,a,s){s===void 0&&(s=a),l[s]=t[a]}),ge=r&&r.__setModuleDefault||(Object.create?function(l,t){Object.defineProperty(l,"default",{enumerable:!0,value:t})}:function(l,t){l.default=t}),ye=r&&r.__importStar||function(l){if(l&&l.__esModule)return l;var t={};if(l!=null)for(var a in l)a!=="default"&&Object.prototype.hasOwnProperty.call(l,a)&&be(t,l,a);return ge(t,l),t},o=r&&r.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(r,"__esModule",{value:!0});r.TempleText=r.TempleException=r.TempleEmitter=r.TempleElement=r.TempleRegistry=r.TempleDocument=r.TempleCollection=r.props=r.emitter=r.env=r.data=void 0;var _e=o(v());r.TempleException=_e.default;var Ee=o(S());r.TempleCollection=Ee.default;var we=o(G());r.TempleDocument=we.default;var ve=o(q());r.TempleRegistry=ve.default;var ke=o(M());r.TempleElement=ke.default;var Y=ye(W());r.emitter=Y.default;Object.defineProperty(r,"TempleEmitter",{enumerable:!0,get:function(){return Y.TempleEmitter}});var Le=o(O());r.TempleText=Le.default;var Se=o(p());r.data=Se.default;var je=o(z());r.env=je.default;var De=o(V());r.props=De.default});var F=i((Je,Q)=>{Q.exports={...K()}});var Oe={};ae(Oe,{default:()=>_});var e=U(F()),T=U(F());var c=function(l,...t){let a=Ne(l);for(let s=0;s<t.length;s++)a=a.replace("%s",String(t[s]));return a},Ne=function(l){return l};var _=class extends e.TempleDocument{id(){return"3e6a90cc5da3e950a902"}styles(){return`@tui reset;
  @tui fouc-opacity;
  @tui theme;
  @tui block;
  @tui utilities;`}template(){let t="/docs/index.html",a=c("Documentation - Temple reactive web component template engine."),s=c("Temple is a template engine hat generates web components and support reactivity."),n=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"},"{ 'charset': `utf-8` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"},"{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},"{ }",[...this._toNodeList(a)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:s},"{ 'name': `description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:a},"{ 'property': `og:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:s},"{ 'property': `og:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`},"{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"},"{ 'property': `og:type`, 'content': `website` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"},"{ 'name': `twitter:card`, 'content': `summary` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"},"{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:a},"{ 'name': `twitter:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:s},"{ 'name': `twitter:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'name': `twitter:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"favicon",href:"/temple/favicon.ico"},"{ 'rel': `favicon`, 'href': `/temple/favicon.ico` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"shortcut icon",type:"image/png",href:"/temple/favicon.png"},"{ 'rel': `shortcut icon`, 'type': `image/png`, 'href': `/temple/favicon.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/fontawesome/all.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/global.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/global.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,T.env)("BUILD_ID")}.css`},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/build/client/${env('BUILD_ID')}.css` }"),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,T.env)("APP_DATA"),src:`/temple/build/client/${(0,T.env)("BUILD_ID")}.js`},"{ 'data-app': env('APP_DATA'), 'src': `/temple/build/client/${env('BUILD_ID')}.js` }"),e.TempleRegistry.createText(`
  `,!1),...(0,T.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("script",{src:"/dev.js"},"{ 'src': `/dev.js` }"),e.TempleRegistry.createText(`
  `,!1)]:[],e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("body",{class:"dark bg-t-0 tx-t1 arial"},"{ 'class': `dark bg-t-0 tx-t1 arial` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-layout",{},"{ }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-head",{},"{ }",[e.TempleRegistry.createElement("menu",{class:"flex flex-center-y px-20 py-15 m-0 bg-t-1"},"{ 'class': `flex flex-center-y px-20 py-15 m-0 bg-t-1` }",[e.TempleRegistry.createText(`
  `,!1),...t!=="/temple/index.html"&&t!=="/temple/500.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1",click:n},"{ 'class': `fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1`, 'click': toggle }",[]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("div",{class:"flex-grow"},"{ 'class': `flex-grow` }",[]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple"},"{ 'href': `/temple` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("img",{alt:"Temple Logo",class:"h-26 mr-10",src:"/temple/temple-icon.png"},"{ 'alt': `Temple Logo`, 'class': `h-26 mr-10`, 'src': `/temple/temple-icon.png` }"),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("h3",{class:"flex-grow tx-uppercase"},"{ 'class': `flex-grow tx-uppercase` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple"},"{ 'class': `tx-white`, 'href': `/temple` }",[e.TempleRegistry.createText("Temple",!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("nav",{class:"flex flex-center-y"},"{ 'class': `flex flex-center-y` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple/docs/index.html"},"{ 'class': `tx-white`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText("Docs",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-5xl ml-10",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},"{ 'class': `tx-t-1 tx-5xl ml-10`, 'href': `https://github.com/OSSPhilippines/temple`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-github"},"{ 'class': `fab fa-github` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},"{ 'class': `bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://www.npmjs.com/package/@ossph/temple`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-npm text-white"},"{ 'class': `fab fa-npm text-white` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},"{ 'class': `bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://discord.gg/open-source-software-ph-905496362982981723`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-discord text-white"},"{ 'class': `fab fa-discord text-white` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-left",{},"{ }",[e.TempleRegistry.createElement("header",{class:"flex flex-center-y bg-t-2 py-15 pr-5 pl-10"},"{ 'class': `flex flex-center-y bg-t-2 py-15 pr-5 pl-10` }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("a",{href:"/temple"},"{ 'href': `/temple` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("img",{class:"h-26 mr-10",src:"/temple/temple-icon.png",alt:"Temple Logo"},"{ 'class': `h-26 mr-10`, 'src': `/temple/temple-icon.png`, 'alt': `Temple Logo` }"),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("h3",{class:"flex-grow m-0 tx-uppercase"},"{ 'class': `flex-grow m-0 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple"},"{ 'class': `tx-white`, 'href': `/temple` }",[e.TempleRegistry.createText("Temple",!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left cursor-pointer none md-inline-block",click:n},"{ 'class': `fas fa-fw fa-chevron-left cursor-pointer none md-inline-block`, 'click': toggle }",[]),e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("nav",{class:"bg-t-1 scroll-auto h-calc-full-60"},"{ 'class': `bg-t-1 scroll-auto h-calc-full-60` }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-0 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-0 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(c("Introduction")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/index.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/getting-started.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(c("Features")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/markup-syntax.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/state-management.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-strategy.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/compiler-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/client-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(c("Usage")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/template-engine.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/single-page.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/static-site.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-publisher.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/developer-tools.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(c("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(c("Documentation")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple is a template engine with a built-in compiler that 
            generates HTML markup, web components and support reactivity. 
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Like React and Svelte, Temple is a modern approach to building
            front-end code addressing state management and reactivity. 
            Unlike React and Svelte that focus on keeping the developer 
            experience mostly on the front-end, Temple focuses on being 
            a modern templating solution for server side frameworks.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple can be used as a template engine on the server side, 
            as a site generator to make static websites and single page 
            applications, or can be used to publish native HTML5 web 
            components.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple sticks closely to the classic web development model of 
            HTML, CSS, and JS, just adding a few extensions to HTML and 
            JavaScript. It arguably has fewer concepts and tools to learn 
            than some of the other framework options.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Basic Example",class:"py-20"},"{ 'title': `Basic Example`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-h-EFEFEF h-full lg-block"},"{ 'class': `flex bg-h-EFEFEF h-full lg-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half",numbers:!0,trim:!0,detab:16},"{ 'class': `basis-half`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  h1 { font-weight: bold; }
                </style>
                <script>
                  const name = 'world';
                </script>
                <h1>Hello {name}!</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-preview",{class:"bg-white basis-half h-140 lg-h-auto"},"{ 'class': `bg-white basis-half h-140 lg-h-auto` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
                  `,!1),e.TempleRegistry.createElement("h1",{},"{ }",[e.TempleRegistry.createText("Hello world!",!1)]),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            At it's core, a temple file is a special template file that 
            allows HTML, JavaScript, CSS and importing of components and 
            templates. All of which are transpiled to TypeScript or 
            JavaScript source code.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Transpiler Example",class:"py-20"},"{ 'title': `Transpiler Example`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-h-EFEFEF h-full lg-block"},"{ 'class': `flex bg-h-EFEFEF h-full lg-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half scroll-auto",scroll:!0,numbers:!0,ltrim:!0,detab:16},"{ 'class': `basis-half scroll-auto`, 'scroll': true, 'numbers': true, 'ltrim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  h1 { font-weight: bold; }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { name } = props();
                </script>
                <h1>Hello {name}!!</h1>
                
                

              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half h-full bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 lg-bd-0 lg-h-auto scroll-auto",lang:"js",trim:!0,scroll:!0,detab:16},"{ 'class': `basis-half h-full bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 lg-bd-0 lg-h-auto scroll-auto`, 'lang': `js`, 'trim': true, 'scroll': true, 'detab': 16 }",[...this._toNodeList(`
                import { props } from '@ossph/temple';
                export default class Hello extends TempleComponent {
                  styles() {
                    return 'h1 { font-weight: bold; }';
                  }
                  template() {
                    const { name } = props();
                    return () => [
                      TempleRegistry.createElement('h1', null, \`Hello \${name}\`)
                    ]
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/getting-started.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(c("Getting Started")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Oe);})();
