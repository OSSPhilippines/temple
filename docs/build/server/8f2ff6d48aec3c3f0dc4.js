var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var i=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var l in t)g(a,l,{get:t[l],enumerable:!0})},H=(a,t,l,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ee(t))!ae.call(a,n)&&n!==l&&g(a,n,{get:()=>t[n],enumerable:!(s=Z(t,n))||s.enumerable});return a};var W=(a,t,l)=>(l=a!=null?X(te(a)):{},H(t||!a||!a.__esModule?g(l,"default",{value:a,enumerable:!0}):l,a)),se=a=>H(g({},"__esModule",{value:!0}),a);var w=i(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});var E=class extends Error{static for(t,...l){return l.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let l=new this("Invalid Parameters");return l.errors=t,l}static require(t,l,...s){if(!t){for(let n of s)l=l.replace("%s",n);throw new this(l)}}constructor(t,l=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=l}withCode(t){return this.code=t,this}withPosition(t,l){return this.start=t,this.end=l,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};v.default=E});var L=i(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(l=>this._elements.add(l))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};j.default=k});var p=i(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var re=new Map;D.default=re});var S=i(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var P=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,l=!1){this._escape=l,this._value=t}toString(){return this.value}};N.default=P});var M=i(m=>{"use strict";var ce=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var ne=ce(L()),ie=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],O=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,l={},s="",n=[]){this._attributes={},this._name=t,this._attributes=l,this._props=s,this._children=new ne.default(n)}toString(){let t=Object.entries(this._attributes),l=t.length>0?" "+t.map(([n,T])=>{if(typeof T=="string")return`${n}="${T}"`;if(typeof T=="boolean")return T?n:""}).join(" "):"";if(ie.includes(this._name))return`<${this._name}${l} />`;let s=this._children.toString();return`<${this._name}${l}>${s}</${this._name}>`}};m.default=O});var q=i(f=>{"use strict";var G=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=G(S()),F=G(M()),A=class{static render(t){return t.filter(Boolean).map(l=>l.toString()).join("")}static registry(t,l=new Set){return t.forEach(s=>{s instanceof F.default&&(["html","head","body"].includes(s.name)||l.add(s),s.name!=="head"&&s.children.length>0&&this.registry(s.children.toArray(),l))}),l}static createElement(t,l,s,n=[]){return new F.default(t,l,s,n)}static createText(t,l=!0){return new oe.default(t,l)}};f.default=A});var R=i(x=>{"use strict";var B=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var pe=B(w()),I=B(p()),C=B(q()),$=class{bindings(){let t=C.default.registry(this.template());return`{ ${Array.from(t.values()).map((s,n)=>s.props!=="{ }"?`'${n}': ${s.props}`:"").filter(s=>s!=="").join(", ")} }`}render(t={}){I.default.set("props",t||{}),I.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(I.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let l=this.template(),s=C.default.render(l).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(l=>typeof l=="object"&&typeof l.nodeType=="number")?t:[C.default.createText(String(t))]}};x.default=$});var J=i(u=>{"use strict";Object.defineProperty(u,"__esModule",{value:!0});u.TempleEmitter=void 0;var y=class{emit(t,l){return this}on(t,l){return this}once(t,l){return this}unbind(t,l){return this}};u.TempleEmitter=y;var me=new y;u.default=me});var z=i(h=>{"use strict";var fe=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var xe=fe(p());function ue(a){let t=xe.default.get("env")||{};return a?t[a]||null:t}h.default=ue});var V=i(d=>{"use strict";var he=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});d.default=be;var de=he(p());function be(){return de.default.get("props")||{}}});var K=i(c=>{"use strict";var Te=c&&c.__createBinding||(Object.create?function(a,t,l,s){s===void 0&&(s=l);var n=Object.getOwnPropertyDescriptor(t,l);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(a,s,n)}:function(a,t,l,s){s===void 0&&(s=l),a[s]=t[l]}),ge=c&&c.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),ye=c&&c.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var l in a)l!=="default"&&Object.prototype.hasOwnProperty.call(a,l)&&Te(t,a,l);return ge(t,a),t},o=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0});c.TempleText=c.TempleException=c.TempleEmitter=c.TempleElement=c.TempleRegistry=c.TempleDocument=c.TempleCollection=c.props=c.emitter=c.env=c.data=void 0;var _e=o(w());c.TempleException=_e.default;var Ee=o(L());c.TempleCollection=Ee.default;var ve=o(R());c.TempleDocument=ve.default;var we=o(q());c.TempleRegistry=we.default;var ke=o(M());c.TempleElement=ke.default;var Y=ye(J());c.emitter=Y.default;Object.defineProperty(c,"TempleEmitter",{enumerable:!0,get:function(){return Y.TempleEmitter}});var je=o(S());c.TempleText=je.default;var Le=o(p());c.data=Le.default;var De=o(z());c.env=De.default;var Pe=o(V());c.props=Pe.default});var U=i((Ge,Q)=>{Q.exports={...K()}});var Se={};le(Se,{default:()=>_});var e=W(U()),b=W(U());var r=function(a,...t){let l=Ne(a);for(let s=0;s<t.length;s++)l=l.replace("%s",String(t[s]));return l},Ne=function(a){return a};var _=class extends e.TempleDocument{id(){return"8f2ff6d48aec3c3f0dc4"}styles(){return`@tui reset;
  @tui fouc-opacity;
  @tui theme;
  @tui block;
  @tui utilities;`}template(){let t="/docs/component-publisher.html",l=r("Component Publisher - Temple reactive web component template engine."),s=r("How to use Temple to publish web components."),n=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"},"{ 'charset': `utf-8` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"},"{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},"{ }",[...this._toNodeList(l)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:s},"{ 'name': `description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:l},"{ 'property': `og:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:s},"{ 'property': `og:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`},"{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"},"{ 'property': `og:type`, 'content': `website` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"},"{ 'name': `twitter:card`, 'content': `summary` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"},"{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:l},"{ 'name': `twitter:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:s},"{ 'name': `twitter:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'name': `twitter:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"favicon",href:"/temple/favicon.ico"},"{ 'rel': `favicon`, 'href': `/temple/favicon.ico` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"shortcut icon",type:"image/png",href:"/temple/favicon.png"},"{ 'rel': `shortcut icon`, 'type': `image/png`, 'href': `/temple/favicon.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/fontawesome/all.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/global.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/global.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,b.env)("BUILD_ID")}.css`},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/build/client/${env('BUILD_ID')}.css` }"),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,b.env)("APP_DATA"),src:`/temple/build/client/${(0,b.env)("BUILD_ID")}.js`},"{ 'data-app': env('APP_DATA'), 'src': `/temple/build/client/${env('BUILD_ID')}.js` }"),e.TempleRegistry.createText(`
  `,!1),...(0,b.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
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
    `,!1),...this._toNodeList(r("Introduction")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/index.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/getting-started.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(r("Features")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/markup-syntax.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/state-management.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-strategy.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/compiler-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/client-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(r("Usage")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/template-engine.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/single-page.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/static-site.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-publisher.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/developer-tools.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(r("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Component Publisher")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Web components are a set of web platform APIs that allow you 
            to create new custom, reusable, encapsulated HTML tags to use 
            in web pages and web apps. Custom components and widgets build 
            on the Web Component standards, will work across modern 
            browsers, and can be used with any JavaScript library or 
            framework that works with HTML.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Web components are based on existing web standards. Features 
            to support web components are currently being added to the 
            HTML and DOM specs, letting web developers easily extend HTML 
            with new elements with encapsulated styling and custom behavior.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0},"{ 'solid': true, 'curved': true, 'info': true }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},"{ 'class': `fas fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Note:",!1)]),e.TempleRegistry.createText(` Web components even work in React 
            projects.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            First, create a project with the following structure and files.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{height:290,title:"My Project"},"{ 'height': 290, 'title': `My Project` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"publisher",selector:"#build-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `publisher`, 'selector': `#build-ts` }",[e.TempleRegistry.createText(`
                  src/build.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"publisher",selector:"#component-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `publisher`, 'selector': `#component-tml` }",[e.TempleRegistry.createText(`
                  src/component.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"publisher",selector:"#package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `publisher`, 'selector': `#package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"publisher",selector:"#build-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `publisher`, 'selector': `#build-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                build.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"publisher",selector:"#component-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `publisher`, 'selector': `#component-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                component.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"publisher",selector:"#package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `publisher`, 'selector': `#package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"build-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `build-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';

                //create temple compiler
                const compiler = temple({ cwd: __dirname });
                //load component, and render
                const component = compiler
                  .fromSource('./component.tml')
                  .component();
                
                //save component
                compiler.fs.writeFileSync('/path/to/component.js', component);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"component-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `component-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  .title { text-align: center; }
                </style>
                <script>
                  const title = 'Hello';
                </script>
                <h1 class="title">{title}</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "build": "ts-node ./src/build.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.6"
                  },
                  "devDependencies": {
                    "@ossph/temple-dev": "0.1.6",
                    "@types/node": "22.1.0",
                    "ts-node": "10.9.2",
                    "typescript": "5.5.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To test the build script and see the results, run the 
            following command in terminal.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
            npm run build
          `,!1)]),e.TempleRegistry.createText(`
          
          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/static-site.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(r("Static Site Generator")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/developer-tools.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(r("Developer Tools")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Se);})();
