var TempleAPI=(()=>{var X=Object.create;var E=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var i=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var l in t)E(a,l,{get:t[l],enumerable:!0})},H=(a,t,l,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ee(t))!ae.call(a,n)&&n!==l&&E(a,n,{get:()=>t[n],enumerable:!(s=Z(t,n))||s.enumerable});return a};var W=(a,t,l)=>(l=a!=null?X(te(a)):{},H(t||!a||!a.__esModule?E(l,"default",{value:a,enumerable:!0}):l,a)),re=a=>H(E({},"__esModule",{value:!0}),a);var k=i(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});var _=class extends Error{static for(t,...l){return l.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let l=new this("Invalid Parameters");return l.errors=t,l}static require(t,l,...s){if(!t){for(let n of s)l=l.replace("%s",n);throw new this(l)}}constructor(t,l=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=l}withCode(t){return this.code=t,this}withPosition(t,l){return this.start=t,this.end=l,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};v.default=_});var N=i(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var w=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(l=>this._elements.add(l))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};L.default=w});var m=i(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var se=new Map;j.default=se});var P=i(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var S=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,l=!1){this._escape=l,this._value=t}toString(){return this.value}};D.default=S});var M=i(p=>{"use strict";var ce=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var ne=ce(N()),ie=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],O=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,l={},s="",n=[]){this._attributes={},this._name=t,this._attributes=l,this._props=s,this._children=new ne.default(n)}toString(){let t=Object.entries(this._attributes),l=t.length>0?" "+t.map(([n,b])=>{if(typeof b=="string")return`${n}="${b}"`;if(typeof b=="boolean")return b?n:""}).join(" "):"";if(ie.includes(this._name))return`<${this._name}${l} />`;let s=this._children.toString();return`<${this._name}${l}>${s}</${this._name}>`}};p.default=O});var A=i(f=>{"use strict";var V=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=V(P()),F=V(M()),C=class{static render(t){return t.filter(Boolean).map(l=>l.toString()).join("")}static registry(t,l=new Set){return t.forEach(s=>{s instanceof F.default&&(["html","head","body"].includes(s.name)||l.add(s),s.name!=="head"&&s.children.length>0&&this.registry(s.children.toArray(),l))}),l}static createElement(t,l,s,n=[]){return new F.default(t,l,s,n)}static createText(t,l=!0){return new oe.default(t,l)}};f.default=C});var G=i(x=>{"use strict";var B=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var me=B(k()),I=B(m()),q=B(A()),$=class{bindings(){let t=q.default.registry(this.template());return`{ ${Array.from(t.values()).map((s,n)=>s.props!=="{ }"?`'${n}': ${s.props}`:"").filter(s=>s!=="").join(", ")} }`}render(t={}){I.default.set("props",t||{}),I.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(I.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let l=this.template(),s=q.default.render(l).trim();if(!s.toLowerCase().startsWith("<html"))throw me.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(l=>typeof l=="object"&&typeof l.nodeType=="number")?t:[q.default.createText(String(t))]}};x.default=$});var R=i(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var g=class{emit(t,l){return this}on(t,l){return this}once(t,l){return this}unbind(t,l){return this}};d.TempleEmitter=g;var pe=new g;d.default=pe});var z=i(u=>{"use strict";var fe=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var xe=fe(m());function de(a){let t=xe.default.get("env")||{};return a?t[a]||null:t}u.default=de});var Y=i(h=>{"use strict";var ue=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});h.default=Te;var he=ue(m());function Te(){return he.default.get("props")||{}}});var K=i(c=>{"use strict";var be=c&&c.__createBinding||(Object.create?function(a,t,l,s){s===void 0&&(s=l);var n=Object.getOwnPropertyDescriptor(t,l);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(a,s,n)}:function(a,t,l,s){s===void 0&&(s=l),a[s]=t[l]}),Ee=c&&c.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),ge=c&&c.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var l in a)l!=="default"&&Object.prototype.hasOwnProperty.call(a,l)&&be(t,a,l);return Ee(t,a),t},o=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0});c.TempleText=c.TempleException=c.TempleEmitter=c.TempleElement=c.TempleRegistry=c.TempleDocument=c.TempleCollection=c.props=c.emitter=c.env=c.data=void 0;var ye=o(k());c.TempleException=ye.default;var _e=o(N());c.TempleCollection=_e.default;var ve=o(G());c.TempleDocument=ve.default;var ke=o(A());c.TempleRegistry=ke.default;var we=o(M());c.TempleElement=we.default;var J=ge(R());c.emitter=J.default;Object.defineProperty(c,"TempleEmitter",{enumerable:!0,get:function(){return J.TempleEmitter}});var Le=o(P());c.TempleText=Le.default;var Ne=o(m());c.data=Ne.default;var je=o(z());c.env=je.default;var Se=o(Y());c.props=Se.default});var U=i((Ve,Q)=>{Q.exports={...K()}});var Pe={};le(Pe,{default:()=>y});var e=W(U()),T=W(U());var r=function(a,...t){let l=De(a);for(let s=0;s<t.length;s++)l=l.replace("%s",String(t[s]));return l},De=function(a){return a};var y=class extends e.TempleDocument{id(){return"269f8b60f20cebb43be6"}styles(){return`@tui reset;
  @tui fouc-opacity;
  @tui theme;
  @tui block;
  @tui utilities;
  .col-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }`}template(){let t="/docs/state-management.html",l=r("State Management - Temple reactive web component template engine."),s=r("Learn how to manage states in Temple."),n=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
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
      `,!1),e.TempleRegistry.createElement("panel-right",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("menu",{class:"m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto"},"{ 'class': `m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h6",{class:"tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase"},"{ 'class': `tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("On this page")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("nav",{class:"tx-14 tx-lh-32"},"{ 'class': `tx-14 tx-lh-32` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#props"},"{ 'class': `block tx-t-0`, 'href': `#props` }",[...this._toNodeList(r("Props"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#signals"},"{ 'class': `block tx-t-0`, 'href': `#signals` }",[...this._toNodeList(r("Signals"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#events"},"{ 'class': `block tx-t-0`, 'href': `#events` }",[...this._toNodeList(r("Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#classnames"},"{ 'class': `block tx-t-0`, 'href': `#classnames` }",[...this._toNodeList(r("Class Names"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#children"},"{ 'class': `block tx-t-0`, 'href': `#children` }",[...this._toNodeList(r("Children"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#component"},"{ 'class': `block tx-t-0`, 'href': `#component` }",[...this._toNodeList(r("Component"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#env"},"{ 'class': `block tx-t-0`, 'href': `#env` }",[...this._toNodeList(r("Env Variables"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#this"},"{ 'class': `block tx-t-0`, 'href': `#this` }",[...this._toNodeList(r("this"))]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("State Management")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple provides several ways to manage properties and states 
            in your components.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"props"},"{ 'name': `props` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Props")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:12},"{ 'lang': `js`, 'trim': true, 'detab': 12 }",[...this._toNodeList(`
            import { props } from '@ossph/temple';
            const { title, description } = props();
          `)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("props",!1)]),e.TempleRegistry.createText(` function can be used to access the 
            properties of a component.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"signals"},"{ 'name': `signals` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Signals")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple provides a reactive state management system that allows 
            you to manage states in your components. The system is based 
            on signals, which are reactive variables that can be used to 
            store and update data. Signals can be used to store any type 
            of data, including numbers, strings, objects, arrays, and even 
            functions.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"scroll-auto bg-black"},"{ 'class': `scroll-auto bg-black` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:14},"{ 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              <script>
                import { signal } from '@ossph/temple';
                const count = signal<number>(1);
              </script>
              <em class=classlist>Count #{count.value}</em>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To create a signal, you can use the 
            `,!1),e.TempleRegistry.createElement("ide-code",{type:"javascript",inline:!0},"{ 'type': `javascript`, 'inline': true }",[...this._toNodeList("signal()")]),e.TempleRegistry.createText(` 
            function, which takes an initial value as an argument. Signals 
            can be read and updated using the `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("value",!1)]),e.TempleRegistry.createText(` property. 
            Setting the value will trigger a re-render of the component.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Signals can be used in your components to manage states and 
            trigger updates when the state changes. You can use signals to 
            store data that needs to be shared between components, or to 
            trigger side effects when the state changes. Signals can also 
            be used to store data that needs to be persisted across page 
            reloads, such as form data or user preferences.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"events"},"{ 'name': `events` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Events")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"scroll-auto bg-black"},"{ 'class': `scroll-auto bg-black` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,number:!0,detab:14},"{ 'trim': true, 'number': true, 'detab': 14 }",[...this._toNodeList(`
              <script>
                import { signal } from '@ossph/temple';
                const count = signal<number>(1);
                const add = e => count.value++;
              </script>

              <button click=add>{count.value}</button>

              <button dblclick=add>{count.value}</button>
              <button mousedown=add>{count.value}</button>
              <button mouseup=add>{count.value}</button>
              <button mousemove=add>{count.value}</button>
              <button mouseover=add>{count.value}</button>
              <button mouseout=add>{count.value}</button>
              <button wheel=add>{count.value}</button>
              <button keydown=add>{count.value}</button>
              <button keypress=add>{count.value}</button>
              <button keyup=add>{count.value}</button>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            For example, you can use the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("click",!1)]),e.TempleRegistry.createText(` 
            attribute assigned to a function to trigger a function when 
            the element is clicked. In combination with updating a signal, 
            can trigger a re-render of the component. The following event 
            attributes are supported.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"col-2"},"{ 'class': `col-2` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Mouse Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("click",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dblclick",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("mousedown",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("mouseup",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("mousemove",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("mouseover",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("mouseout",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("wheel",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Keyboard Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("keydown",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("keypress",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("keyup",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Form Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("blur",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("change",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("contextmenu",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("focus",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("input",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("submit",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("invalid",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("reset",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("search",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("select",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Clipboard Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("copy",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("cut",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("paste",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Transition Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("transitionend",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Drag Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("drag",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dragstart",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dragend",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dragover",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dragenter",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("dragleave",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("drop",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("scroll",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Media Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("durationchange",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("ended",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("error",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("loadeddata",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("loadedmetadata",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("loadstart",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("pause",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("play",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("playing",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("progress",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("ratechange",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("seeked",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("seeking",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("stalled",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("suspend",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("timeupdate",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("volumechange",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("waiting",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h3",{},"{ }",[...this._toNodeList(r("Animation Events"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ul",{class:"tx-lh-36"},"{ 'class': `tx-lh-36` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("animationstart",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("animationend",!1)])]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("animationiteration",!1)])]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"classnames"},"{ 'name': `classnames` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Class Names")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"scroll-auto bg-black"},"{ 'class': `scroll-auto bg-black` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:14},"{ 'lang': `js`, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import { classnames } from '@ossph/temple';
              const classlist = classnames(); //--> 'class1 class2 class3'
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("classnames",!1)]),e.TempleRegistry.createText(` function can be used to generate 
            a list of class names based on the properties of an object.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"children"},"{ 'name': `children` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Children")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"scroll-auto bg-black"},"{ 'class': `scroll-auto bg-black` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:14},"{ 'lang': `js`, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import { children } from '@ossph/temple';
              const childlist = children(); //--> Node[]
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("children",!1)]),e.TempleRegistry.createText(` function can be used to render 
            child components in a parent component.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"component"},"{ 'name': `component` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Component")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("div",{class:"scroll-auto bg-black"},"{ 'class': `scroll-auto bg-black` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:14},"{ 'lang': `js`, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import { component } from '@ossph/temple';
              const button = component(); //--> HTMLElement
              console.log(button.querySelector('span'));
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            For other edge cases, the `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("component",!1)]),e.TempleRegistry.createText(` function 
            can be used to get raw access to the component's 
            functionality.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"env"},"{ 'name': `env` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("Environment Variables")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:12},"{ 'trim': true, 'detab': 12 }",[...this._toNodeList(`
            <script>
              import { env } from '@ossph/temple';
              const { BUILD_ID, NODE_ENV } = env();
            </script>
            <if true={NODE_ENV === 'development'}>
              <p>Development mode</p>
            </if>
          `)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("env",!1)]),e.TempleRegistry.createText(` function can be used to access environment 
            variables in a component.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"this"},"{ 'name': `this` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(r("this")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"What's this",class:"py-20"},"{ 'title': `What's this`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,detab:14},"{ 'numbers': true, 'detab': 14 }",[...this._toNodeList(`
              <script>
                this.props;
                this.style;
                this.classList;
                this.parentNode;
                this.innerHTML;
                this.appendChild();
                this.querySelector('p');
              </script>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(` refers to the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` that extends 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(`. This means all
            components in Temple are in fact are HTML elements and has
            access to the common functionality like 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("innerHTML",!1)]),e.TempleRegistry.createText(` and
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("querySelector()")]),e.TempleRegistry.createText(` to name a 
            few. `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` has the
            additional following properties and methods that you can access
            using `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"TempleComponent"},"{ 'start': `TempleComponent` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},"{ 'class': `fas fa-fw fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Info:",!1)]),e.TempleRegistry.createText(` You can discover more methods and properties
            of the `,!1),e.TempleRegistry.createElement("code",{},"{ }",[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(` class on the
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",class:"tx-white tx-underline",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"},"{ 'target': `_blank`, 'class': `tx-white tx-underline`, 'href': `https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement` }",[e.TempleRegistry.createText(`
              MDN Web Docs
            `,!1)]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/markup-syntax.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(r("Markup Syntax")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/component-strategy.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(r("Component Strategy")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return re(Pe);})();
