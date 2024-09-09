var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var i=(l,t)=>()=>(t||l((t={exports:{}}).exports,t),t.exports),ae=(l,t)=>{for(var a in t)g(l,a,{get:t[a],enumerable:!0})},R=(l,t,a,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ee(t))!le.call(l,n)&&n!==a&&g(l,n,{get:()=>t[n],enumerable:!(s=Z(t,n))||s.enumerable});return l};var G=(l,t,a)=>(a=l!=null?X(te(l)):{},R(t||!l||!l.__esModule?g(a,"default",{value:l,enumerable:!0}):a,l)),se=l=>R(g({},"__esModule",{value:!0}),l);var w=i(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});var E=class extends Error{static for(t,...a){return a.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let a=new this("Invalid Parameters");return a.errors=t,a}static require(t,a,...s){if(!t){for(let n of s)a=a.replace("%s",n);throw new this(a)}}constructor(t,a=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=a}withCode(t){return this.code=t,this}withPosition(t,a){return this.start=t,this.end=a,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};v.default=E});var L=i(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(a=>this._elements.add(a))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};j.default=k});var p=i(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var re=new Map;N.default=re});var S=i(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});var D=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,a=!1){this._escape=a,this._value=t}toString(){return this.value}};P.default=D});var M=i(m=>{"use strict";var ce=m&&m.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(m,"__esModule",{value:!0});var ne=ce(L()),ie=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],O=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,a={},s="",n=[]){this._attributes={},this._name=t,this._attributes=a,this._props=s,this._children=new ne.default(n)}toString(){let t=Object.entries(this._attributes),a=t.length>0?" "+t.map(([n,b])=>{if(typeof b=="string")return`${n}="${b}"`;if(typeof b=="boolean")return b?n:""}).join(" "):"";if(ie.includes(this._name))return`<${this._name}${a} />`;let s=this._children.toString();return`<${this._name}${a}>${s}</${this._name}>`}};m.default=O});var A=i(f=>{"use strict";var z=f&&f.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(f,"__esModule",{value:!0});var oe=z(S()),W=z(M()),q=class{static render(t){return t.filter(Boolean).map(a=>a.toString()).join("")}static registry(t,a=new Set){return t.forEach(s=>{s instanceof W.default&&(["html","head","body"].includes(s.name)||a.add(s),s.name!=="head"&&s.children.length>0&&this.registry(s.children.toArray(),a))}),a}static createElement(t,a,s,n=[]){return new W.default(t,a,s,n)}static createText(t,a=!0){return new oe.default(t,a)}};f.default=q});var F=i(h=>{"use strict";var B=h&&h.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(h,"__esModule",{value:!0});var pe=B(w()),I=B(p()),C=B(A()),$=class{bindings(){let t=C.default.registry(this.template());return`{ ${Array.from(t.values()).map((s,n)=>s.props!=="{ }"?`'${n}': ${s.props}`:"").filter(s=>s!=="").join(", ")} }`}render(t={}){I.default.set("props",t||{}),I.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(I.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let a=this.template(),s=C.default.render(a).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(a=>typeof a=="object"&&typeof a.nodeType=="number")?t:[C.default.createText(String(t))]}};h.default=$});var J=i(x=>{"use strict";Object.defineProperty(x,"__esModule",{value:!0});x.TempleEmitter=void 0;var y=class{emit(t,a){return this}on(t,a){return this}once(t,a){return this}unbind(t,a){return this}};x.TempleEmitter=y;var me=new y;x.default=me});var V=i(d=>{"use strict";var fe=d&&d.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(d,"__esModule",{value:!0});var he=fe(p());function xe(l){let t=he.default.get("env")||{};return l?t[l]||null:t}d.default=xe});var Y=i(u=>{"use strict";var de=u&&u.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(u,"__esModule",{value:!0});u.default=Te;var ue=de(p());function Te(){return ue.default.get("props")||{}}});var K=i(r=>{"use strict";var be=r&&r.__createBinding||(Object.create?function(l,t,a,s){s===void 0&&(s=a);var n=Object.getOwnPropertyDescriptor(t,a);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(l,s,n)}:function(l,t,a,s){s===void 0&&(s=a),l[s]=t[a]}),ge=r&&r.__setModuleDefault||(Object.create?function(l,t){Object.defineProperty(l,"default",{enumerable:!0,value:t})}:function(l,t){l.default=t}),ye=r&&r.__importStar||function(l){if(l&&l.__esModule)return l;var t={};if(l!=null)for(var a in l)a!=="default"&&Object.prototype.hasOwnProperty.call(l,a)&&be(t,l,a);return ge(t,l),t},o=r&&r.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(r,"__esModule",{value:!0});r.TempleText=r.TempleException=r.TempleEmitter=r.TempleElement=r.TempleRegistry=r.TempleDocument=r.TempleCollection=r.props=r.emitter=r.env=r.data=void 0;var _e=o(w());r.TempleException=_e.default;var Ee=o(L());r.TempleCollection=Ee.default;var ve=o(F());r.TempleDocument=ve.default;var we=o(A());r.TempleRegistry=we.default;var ke=o(M());r.TempleElement=ke.default;var H=ye(J());r.emitter=H.default;Object.defineProperty(r,"TempleEmitter",{enumerable:!0,get:function(){return H.TempleEmitter}});var je=o(S());r.TempleText=je.default;var Le=o(p());r.data=Le.default;var Ne=o(V());r.env=Ne.default;var De=o(Y());r.props=De.default});var U=i((ze,Q)=>{Q.exports={...K()}});var Se={};ae(Se,{default:()=>_});var e=G(U()),T=G(U());var c=function(l,...t){let a=Pe(l);for(let s=0;s<t.length;s++)a=a.replace("%s",String(t[s]));return a},Pe=function(l){return l};var _=class extends e.TempleDocument{id(){return"13781afd4fbd704a9789"}styles(){return`@tui reset;
  @tui fouc-opacity;
  @tui theme;
  @tui block;
  @tui utilities;`}template(){let t="/docs/developer-tools.html",a=c("Developer Tools - Temple reactive web component template engine."),s=c("Enable tools for a better developer experience and debugging."),n=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
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
            `,!1),...this._toNodeList(c("Developer Tools")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple provides a separate package for a better development 
            experience when working with server frameworks that utilize 
            the native http module. Start by installing adding 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("@ossph/temple-dev")]),e.TempleRegistry.createText(`
            to your project.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npm install --save-dev @ossph/temple-dev
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Next, import the `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("dev()")]),e.TempleRegistry.createText(` 
            function from the package and use it in your existing 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(` 
            file to create a development server as shown in the example below.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 12 }",[...this._toNodeList(`
              import http from 'http';
              import temple from '@ossph/temple/compiler';
              import { dev } from '@ossph/temple-dev';

              //create temple compiler
              const compiler = temple({ cwd: __dirname });
              //1. create dev tools
              const { router, refresh } = dev({ cwd: __dirname });

              //create http server
              const server = http.createServer(async (req, res) => {
                //2. Add dev router
                if (router(req, res)) return;
                //if home page
                if (req.url === '/') {
                  //3. sync builder with refresh server
                  refresh.sync(compiler.fromSource('./page.dtml'));
                  //compile the document
                  const html = await compiler.render('./page.dtml');
                  //... send response ...
                }
                //... other routes ...
              });
              //listen on port 3000
              server.listen(3000);
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Lastly, update the document file 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
            to include the development script 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList('<script src="/dev.js"></script>')]),e.TempleRegistry.createText(` 
            as shown below.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml",class:"py-20"},"{ 'title': `src/page.dtml`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},"{ 'numbers': true, 'trim': true, 'detab': 12 }",[...this._toNodeList(`
              <script>
                //... 
              </script>
              <html>
                <head>
                  <!-- ... -->
                  <!-- 4. include dev script -->
                  <script src="/dev.js"></script>
                </head>
                <body>
                  <!-- ... -->
                </body>
              </html>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Run the following command in terminal.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Whenever `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
            is updated, the development server will automatically refresh 
            the page. Components will also be updated in real-time.
          `,!1)]),e.TempleRegistry.createText(`
          
          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/component-publisher.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(c("Component Publisher")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Se);})();
