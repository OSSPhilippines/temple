var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var n=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),se=(a,t)=>{for(var s in t)g(a,s,{get:t[s],enumerable:!0})},H=(a,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ee(t))!ae.call(a,i)&&i!==s&&g(a,i,{get:()=>t[i],enumerable:!(r=Z(t,i))||r.enumerable});return a};var U=(a,t,s)=>(s=a!=null?X(te(a)):{},H(t||!a||!a.__esModule?g(s,"default",{value:a,enumerable:!0}):s,a)),le=a=>H(g({},"__esModule",{value:!0}),a);var _=n(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});var w=class extends Error{static for(t,...s){return s.forEach(function(r){t=t.replace("%s",r)}),new this(t)}static forErrorsFound(t){let s=new this("Invalid Parameters");return s.errors=t,s}static require(t,s,...r){if(!t){for(let i of r)s=s.replace("%s",i);throw new this(s)}}constructor(t,s=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=s}withCode(t){return this.code=t,this}withPosition(t,s){return this.start=t,this.end=s,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};E.default=w});var L=n(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(s=>this._elements.add(s))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};j.default=k});var d=n(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var re=new Map;N.default=re});var A=n(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var D=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,s=!1){this._escape=s,this._value=t}toString(){return this.value}};S.default=D});var I=n(m=>{"use strict";var ce=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var ie=ce(L()),ne=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],P=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,s={},r="",i=[]){this._attributes={},this._name=t,this._attributes=s,this._props=r,this._children=new ie.default(i)}toString(){let t=Object.entries(this._attributes),s=t.length>0?" "+t.map(([i,o])=>{if(typeof o=="string")return`${i}="${o}"`;if(typeof o=="boolean")return o?i:""}).join(" "):"";if(ne.includes(this._name))return`<${this._name}${s} />`;let r=this._children.toString();return`<${this._name}${s}>${r}</${this._name}>`}};m.default=P});var q=n(f=>{"use strict";var R=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=R(A()),J=R(I()),O=class{static render(t){return t.filter(Boolean).map(s=>s.toString()).join("")}static registry(t,s=new Set){return t.forEach(r=>{r instanceof J.default&&(["html","head","body"].includes(r.name)||s.add(r),r.name!=="head"&&r.children.length>0&&this.registry(r.children.toArray(),s))}),s}static createElement(t,s,r,i=[]){return new J.default(t,s,r,i)}static createText(t,s=!0){return new oe.default(t,s)}};f.default=O});var F=n(x=>{"use strict";var B=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var pe=B(_()),C=B(d()),$=B(q()),M=class{bindings(){let t=$.default.registry(this.template());return`{ ${Array.from(t.values()).map((r,i)=>r.props!=="{ }"?`'${i}': ${r.props}`:"").filter(r=>r!=="").join(", ")} }`}render(t={}){C.default.set("props",t||{}),C.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(C.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(i=>i[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let s=this.template(),r=$.default.render(s).trim();if(!r.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${r}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(s=>typeof s=="object"&&typeof s.nodeType=="number")?t:[$.default.createText(String(t))]}};x.default=M});var V=n(u=>{"use strict";Object.defineProperty(u,"__esModule",{value:!0});u.TempleEmitter=void 0;var y=class{emit(t,s){return this}on(t,s){return this}once(t,s){return this}unbind(t,s){return this}};u.TempleEmitter=y;var de=new y;u.default=de});var G=n(h=>{"use strict";var me=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var fe=me(d());function xe(a){let t=fe.default.get("env")||{};return a?t[a]||null:t}h.default=xe});var z=n(b=>{"use strict";var ue=b&&b.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(b,"__esModule",{value:!0});b.default=be;var he=ue(d());function be(){return he.default.get("props")||{}}});var K=n(c=>{"use strict";var Te=c&&c.__createBinding||(Object.create?function(a,t,s,r){r===void 0&&(r=s);var i=Object.getOwnPropertyDescriptor(t,s);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(a,r,i)}:function(a,t,s,r){r===void 0&&(r=s),a[r]=t[s]}),ge=c&&c.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),ye=c&&c.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var s in a)s!=="default"&&Object.prototype.hasOwnProperty.call(a,s)&&Te(t,a,s);return ge(t,a),t},p=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0});c.TempleText=c.TempleException=c.TempleEmitter=c.TempleElement=c.TempleRegistry=c.TempleDocument=c.TempleCollection=c.props=c.emitter=c.env=c.data=void 0;var ve=p(_());c.TempleException=ve.default;var we=p(L());c.TempleCollection=we.default;var Ee=p(F());c.TempleDocument=Ee.default;var _e=p(q());c.TempleRegistry=_e.default;var ke=p(I());c.TempleElement=ke.default;var Y=ye(V());c.emitter=Y.default;Object.defineProperty(c,"TempleEmitter",{enumerable:!0,get:function(){return Y.TempleEmitter}});var je=p(A());c.TempleText=je.default;var Le=p(d());c.data=Le.default;var Ne=p(G());c.env=Ne.default;var De=p(z());c.props=De.default});var W=n((Re,Q)=>{Q.exports={...K()}});var Ae={};se(Ae,{default:()=>v});var e=U(W()),T=U(W());var l=function(a,...t){let s=Se(a);for(let r=0;r<t.length;r++)s=s.replace("%s",String(t[r]));return s},Se=function(a){return a};var v=class extends e.TempleDocument{id(){return"a67341498153885a2fc0"}styles(){return`@tui theme;
  @tui reset;
  @tui fouc-opacity;
  @tui default-block;
  @tui utilities;`}template(){let t="/docs/getting-started.html",s=l("Getting Started - Temple reactive web component template engine."),r=l("How to install, setup and use Temple in a project."),i=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")},o="https://github.com/OSSPhilippines/temple/tree/main/examples";return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"},"{ 'charset': `utf-8` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"},"{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},"{ }",[...this._toNodeList(s)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:r},"{ 'name': `description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:s},"{ 'property': `og:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:r},"{ 'property': `og:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`},"{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"},"{ 'property': `og:type`, 'content': `website` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"},"{ 'name': `twitter:card`, 'content': `summary` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"},"{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:s},"{ 'name': `twitter:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:r},"{ 'name': `twitter:description`, 'content': description }"),e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("body",{class:"dark bg-t-0 tx-t-1 arial"},"{ 'class': `dark bg-t-0 tx-t-1 arial` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-layout",{},"{ }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-head",{},"{ }",[e.TempleRegistry.createElement("menu",{class:"flex flex-center-y px-20 py-15 m-0 bg-t-1"},"{ 'class': `flex flex-center-y px-20 py-15 m-0 bg-t-1` }",[e.TempleRegistry.createText(`
  `,!1),...t!=="/temple/index.html"&&t!=="/temple/500.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1",click:i},"{ 'class': `fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1`, 'click': toggle }",[]),e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left cursor-pointer none md-inline-block",click:i},"{ 'class': `fas fa-fw fa-chevron-left cursor-pointer none md-inline-block`, 'click': toggle }",[]),e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("nav",{class:"bg-t-1 scroll-auto h-calc-full-60"},"{ 'class': `bg-t-1 scroll-auto h-calc-full-60` }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-0 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-0 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(l("Introduction")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/index.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/getting-started.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(l("Features")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/markup-syntax.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/state-management.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-strategy.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/compiler-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/client-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(l("Usage")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/template-engine.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/single-page.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/static-site.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-publisher.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/developer-tools.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(l("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-right",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("menu",{class:"m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto"},"{ 'class': `m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h6",{class:"tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase"},"{ 'class': `tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("On this page")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("nav",{class:"tx-14 tx-lh-32"},"{ 'class': `tx-14 tx-lh-32` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#http"},"{ 'class': `block tx-t-0`, 'href': `#http` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("1. Add HTTP")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#develop"},"{ 'class': `block tx-t-0`, 'href': `#develop` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("2. Add Dev Tools")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#cache"},"{ 'class': `block tx-t-0`, 'href': `#cache` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("3. Add File Cache")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#tailwind"},"{ 'class': `block tx-t-0`, 'href': `#tailwind` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("4. Add TailwindCSS")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#express"},"{ 'class': `block tx-t-0`, 'href': `#express` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("5. Add ExpressJS")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("Getting Started")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To try out Temple, run the following commands in terminal: 
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npm init -y && npm install --save @ossph/temple && npm install --save-dev ts-node typescript @types/node
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'solid': true, 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},"{ 'class': `fas fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Recommended:",!1)]),e.TempleRegistry.createText(`
            Download the Temple editor plugin at the `,!1),e.TempleRegistry.createElement("a",{target:"_blank",class:"tx-white tx-underline",href:"https://marketplace.visualstudio.com/items?itemName=ossph.temple-language"},"{ 'target': `_blank`, 'class': `tx-white tx-underline`, 'href': `https://marketplace.visualstudio.com/items?itemName=ossph.temple-language` }",[e.TempleRegistry.createText("Visual Studio Marketplace",!1)]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Create a server file called
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("src/index.ts",!1)]),e.TempleRegistry.createText(` 
            with the following code that uses the compiler.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{class:"scroll-auto",lang:"js",numbers:!0,trim:!0,detab:14},"{ 'class': `scroll-auto`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import temple from '@ossph/temple/compiler';
              // make a temple compiler
              const compiler = temple();
              // render HTML
              compiler.render('./src/page.dtml').then(console.log);
              // render CSS
              compiler.styles('./src/page.dtml').then(console.log);
              // render JS
              compiler.client('./src/page.dtml').then(console.log);
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Last, create a document file called
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("src/page.dtml",!1)]),e.TempleRegistry.createText(` 
            with the following template code.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml",class:"py-20"},"{ 'title': `src/page.dtml`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{class:"scroll-auto",numbers:!0,trim:!0,detab:14},"{ 'class': `scroll-auto`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              <style>
                .center { text-align: center; }
              </style>
              <script>
                import { env } from '@ossph/temple';
                const { BUILD_ID, APP_DATA } = env();
                const title = 'Hello World';
              </script>
              <html>
                <head>
                  <title>{title}</title>
                  <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                  <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                </head>
                <body>
                  <h1 class="center">{title}</h1>
                </body>
              </html>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To try out the basic implementation of Temple and see the 
            results, just run the following command in terminal.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"http"},"{ 'name': `http` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("1. Add HTTP")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            In most cases Temple will be used to render a front end from 
            a server framework. In this example, we will use the native
            NodeJS HTTP module to create a server that renders a page
            using Temple. Start by replacing the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("'src/index.ts'")]),e.TempleRegistry.createText(`
            file with the following code. 
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'solid': true, 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},"{ 'class': `fas fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Optional:",!1)]),e.TempleRegistry.createText(` You can also check your other 
            files to make sure you are following along.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:410,title:"With NodeJS HTTP"},"{ 'height': 410, 'title': `With NodeJS HTTP` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5"},"{ 'class': `flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#http-index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#http-index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#http-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#http-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#http-package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#http-package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#http-index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#http-index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#http-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#http-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#http-package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#http-package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"http-index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `http-index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';

                // create temple compiler
                const compiler = temple();
                // create http server
                const server = http.createServer(async (req, res) => {
                  // if build asset...
                  if (req.url?.startsWith('/build/')) {
                    // get filename ie. abc123.js
                    const filename = req.url.substring(7);
                    // get asset
                    const { type, content } = await compiler.asset(filename);
                    // send response
                    res.writeHead(200, { 'Content-Type': type });
                    return res.end(content);
                  // if home page
                  } else if (req.url === '/') {
                    // render and send response
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    return res.end(await compiler.render('./src/page.dtml', {
                      title: 'Hello World'
                    }));
                  }
                });
                // listen on port 3000
                server.listen(3000);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"http-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `http-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  .center { text-align: center; }
                </style>
                <script>
                  import { env, props } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const { title } = props();
                </script>
                <html>
                  <head>
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <h1 class="center">{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"http-package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `http-package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.6"
                  },
                  "devDependencies": {
                    "@types/node": "22.1.0",
                    "ts-node": "10.9.2",
                    "typescript": "5.5.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To run your first Temple web app, just run the following 
            command in terminal.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            You can now check 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
            in your browser to see your Temple application. The 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("temple()",!1)]),e.TempleRegistry.createText(` 
            function takes in the following options, all of 
            which are optional.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"Render Methods"},"{ 'start': `Render Methods` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"develop"},"{ 'name': `develop` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("2. Add Developer Tools")),e.TempleRegistry.createText(`
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
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              // ...
              import { dev } from '@ossph/temple-dev';
              // ...create temple compiler...
              // 1. create dev tools
              const { router, refresh } = dev();

              const server = http.createServer(async (req, res) => {
                // 2. Add dev router
                if (router(req, res)) return;

                if (req.url?.startsWith('/build/')) {
                  // ...
                } else if (req.url === '/') {
                  // 3. sync builder with refresh server
                  refresh.sync(compiler.fromSource('./src/page.dtml'));
                  // ... compile and send response ...
                }
              });
              //...listen on port 3000...
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("dev()")]),e.TempleRegistry.createText(` export 
            from  `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("@ossph/temple-dev")]),e.TempleRegistry.createText(`
            exports tools that supports development mode and accepts the 
            following options.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"DeveloperOptions"},"{ 'start': `DeveloperOptions` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This returns several tools you can use in your server app.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"Developer Tools"},"{ 'start': `Developer Tools` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Lastly, update the document file 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
            to include the development script 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList('<script src="/dev.js"></script>')]),e.TempleRegistry.createText(` 
            as shown below.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml",class:"py-20"},"{ 'title': `src/page.dtml`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},"{ 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              <style>
                /* ... */
              </style>
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
            The project should now look like the example below.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:410,title:"With Developer Tools",class:"py-20"},"{ 'height': 410, 'title': `With Developer Tools`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5"},"{ 'class': `flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"develop",selector:"#develop-index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `develop`, 'selector': `#develop-index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"develop",selector:"#develop-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `develop`, 'selector': `#develop-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"develop",selector:"#develop-package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `develop`, 'selector': `#develop-package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"develop",selector:"#develop-index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `develop`, 'selector': `#develop-index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"develop",selector:"#develop-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `develop`, 'selector': `#develop-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"develop",selector:"#develop-package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `develop`, 'selector': `#develop-package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"develop-index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `develop-index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';
                import { dev } from '@ossph/temple-dev';

                const compiler = temple();
                // 1. create dev tools
                const { router, refresh } = dev();

                const server = http.createServer(async (req, res) => {
                  // 2. Add dev router
                  if (router(req, res)) return;
                  
                  if (req.url?.startsWith('/build/')) {
                    const filename = req.url.substring(7);
                    const { type, content } = await compiler.asset(filename);
                    res.writeHead(200, { 'Content-Type': type });
                    return res.end(content);
                  } else if (req.url === '/') {
                    // 3. sync builder with refresh server
                    refresh.sync(compiler.fromSource('./src/page.dtml'));
                    
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    return res.end(await compiler.render('./src/page.dtml', {
                      title: 'Hello World'
                    }));
                  }
                });
                server.listen(3000);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"develop-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `develop-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  .center { text-align: center; }
                </style>
                <script>
                  import { env, props } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const { title } = props();
                </script>
                <html>
                  <head>
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                    <script src="/dev.js"></script>
                  </head>
                  <body>
                    <h1 class="center">{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"develop-package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `develop-package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
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
            Re-run the following command in terminal. It shouldn't look 
            like anything has changed, but the development server is now
            running in the background. Try to change
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Whenever `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
            is saved, the development server will automatically refresh 
            the page. Components will also be updated in real-time without
            the page reloading.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"cache"},"{ 'name': `cache` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("3. Add Cache Files")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple has an out-of-the-box cache and build strategy that
            can be used to store and serve pre-compiled files. To use the
            cache, you just need to import it from the 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("@ossph/temple/compiler")]),e.TempleRegistry.createText(` 
            module and use it like the following example.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              // ...
              import path from 'path';
              import { cache } from '@ossph/temple/compiler';
              // ...create temple compiler...
              // 1. use cache
              compiler.use(cache({
                buildPath: path.join(__dirname, '../build')
              }));
              // ...create dev tools...
              // ...create http server...
              // ...listen on port 3000...
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(` 
            file should now look like the example below.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import path from 'path';
              import http from 'http';
              import temple, { cache } from '@ossph/temple/compiler';
              import { dev } from '@ossph/temple-dev';

              const compiler = temple();
              // 1. use cache
              compiler.use(cache({
                buildPath: path.join(__dirname, '../build')
              }));
              const { router, refresh } = dev();
              const server = http.createServer(async (req, res) => {
                if (router(req, res)) return;
                if (req.url?.startsWith('/build/')) {
                  const filename = req.url.substring(7);
                  const { type, content } = await compiler.asset(filename);
                  res.writeHead(200, { 'Content-Type': type });
                  return res.end(content);
                } else if (req.url === '/') {
                  refresh.sync(compiler.fromSource('./src/page.dtml'));
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  return res.end(await compiler.render('./src/page.dtml', {
                    title: 'Hello World'
                  }));
                }
              });
              server.listen(3000);
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Re-run the following command in terminal to start the cache 
            server.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Load 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
            in your browser. After loading you should see files that were 
            generated in a new build folder found in your project root. 
            The `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("cache()",!1)]),e.TempleRegistry.createText(` plugin is 
            just a wrapper that listens for build related events and
            stores the generated files in the specified build path.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:400,title:"cache.ts (Internal)",class:"py-20"},"{ 'height': 400, 'title': `cache.ts (Internal)`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              emitter.on('manifest-resolved', (event: Event<string>) => {
                const manifest = event.params.manifest as Manifest
                //write the manifest to the file system
                writeFile(paths.manifest, manifest.toJson());
              });

              // on pre render, try to use cache if live
              emitter.on('render', (event: Event<string>) => {
                //if not live, dont retrieve from cache
                if (environment !== 'production') return;
                //extract props and builder from params
                const props = (event.params.props || {}) as Hash;
                const builder = event.params.builder as Builder;
                //get fs and id ie. abc123c
                const { fs, id } = builder.document;
                //get cache file path ie. /path/to/docs/build/client/abc123c.js
                const cache = path.join(paths.build, 'server', \`\${id}.js\`);
                //if production and cache file exists
                if (fs.existsSync(cache)) {
                  //get the build object
                  const build = compiler.fromCache(cache);
                  //render the document
                  const html = build.document.render(props);
                  //return the cached content
                  event.set(html);
                }
              });

              // on post render, cache (dev and live)
              emitter.on('rendered', (event: Event<string>) => {
                //extract build and builder from params
                const builder = event.params.builder as Builder;
                const html = event.params.html as string;
                //get fs and id ie. abc123c
                const { id } = builder.document;
                //get cache file path ie. /path/to/docs/build/client/abc123c.html
                const cache = path.join(paths.build, 'client', \`\${id}.html\`);
                //write the server source code to cache
                writeFile(cache, html);
              });

              // on pre client build, try to use cache if live
              emitter.on('build-client', (event: Event<string>) => {
                //if not live, dont retrieve from cache
                if (environment !== 'production') return;
                //extract builder from params
                const builder = event.params.builder as Builder;
                //get fs and id ie. abc123c
                const id = builder.document.id;
                //get cache file path ie. /path/to/docs/build/client/abc123c.js
                const cache = path.join(paths.build, 'client', \`\${id}.js\`);
                //if cache file exists, send it
                if (fs.existsSync(cache)) {
                  event.set(fs.readFileSync(cache, 'utf8'));
                }
              });

              // on post client build, cache (dev and live)
              emitter.on('built-client', (event: Event<string>) => {
                //extract builder and sourcecode from params
                const builder = event.params.builder as Builder;
                const sourceCode = event.params.sourceCode as string;
                //get fs and id ie. abc123c
                const id = builder.document.id;
                //get cache file path ie. /path/to/docs/build/client/abc123c.js
                const cache = path.join(paths.build, 'client', \`\${id}.js\`);
                //write the client source code to cache
                writeFile(cache, sourceCode);
              });

              // on pre markup build, try to use cache if live
              emitter.on('build-markup', /* ... */);
              //on post markup build, cache (dev and live)
              emitter.on('built-markup', /* ... */);
              //on pre server build, try to use cache if live
              emitter.on('build-server', /* ... */);
              //on post server build, cache (dev and live)
              emitter.on('built-server', /* ... */);
              //on pre styles build, try to use cache if live
              emitter.on('build-styles', /* ... */);
              //on post styles build, cache (dev and live)
              emitter.on('built-styles', /* ... */);

              // Initialize: if there's a manifest
              if (fs.existsSync(paths.manifest)) {
                //load the manifest file
                compiler.manifest.load(
                  JSON.parse(fs.readFileSync(paths.manifest, 'utf-8'))
                );
              }
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This means you can also use your own cache strategy by 
            listening to the events emitted by the compiler. The
            following table lists all the events that the compiler
            emits during the build cycle of a document.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"EventEmitter"},"{ 'start': `EventEmitter` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"tailwind"},"{ 'name': `tailwind` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("4. Add TailwindCSS")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Tailwind is an atomic CSS collection of styles that favours 
            small, single-purpose classes with their selector names based 
            on its visual function. It works by using a build process to
            read your source files to generate its styles based only on 
            what is being used. This makes using Tailwind optimal because
            it doesn't bloat your CSS with unused styles.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            At the same time, web components with the
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag imply using the 
            component's shadow DOM which will encapsulate the styles within
            the component and not be affected by global styles. Since 
            Tailwind in turn implies that you do not need to (necessarily) 
            define styles, you do not need to use the shadow DOM at all if
            you are using Tailwind.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,warning:!0,class:"py-20 tx-lh-24"},"{ 'solid': true, 'curved': true, 'warning': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-exclamation-triangle"},"{ 'class': `fas fa-exclamation-triangle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Warning:",!1)]),e.TempleRegistry.createText(`
            The caveat for using TailwindCSS, means that web components 
            using it will not be shippable to other projects that do not
            use Tailwind. It all comes down to preference in the end.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple has a separate package called
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("@ossph/temple-tailwind")]),e.TempleRegistry.createText(`
            to use TailwindCSS with Temple. This is just another wrapper 
            class that listens to the compiler's build events. You can 
            install this plugin by running the following command in terminal.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npm install --save-dev @ossph/temple-tailwind autoprefixer postcss tailwindcss
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Next, in `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(`
            import the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("tailwind()")]),e.TempleRegistry.createText(`
            plugin from the package and use it in the compiler as shown
            in the example below.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              // ...
              import { tailwind } from '@ossph/temple-tailwind';
              // ...create temple compiler...
              // ...use cache...
              // 1. Use Tailwind
              compiler.use(tailwind({
                darkMode: 'class',
                theme: { extend: {} },
                plugins: [],
                content: []
              }));

              // ...create dev tools...
              // ...create http server...
              // ...listen on port 3000...
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Lastly, in `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(`
            add the Tailwind directives inside the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag like the code 
            below. Also add a tailwind class, (like 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(`) to the 
            markup to verify that the plugin is working and the styles 
            are being applied.
          `,!1)]),e.TempleRegistry.createText(`
          
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml",class:"py-20"},"{ 'title': `src/page.dtml`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},"{ 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              <style>
                /* 2. Add tailwind directives */
                @tailwind base;
                @tailwind components;
                @tailwind utilities;

                /* ...Other styles... */
              </style>
              <script>
                //... 
              </script>
              <html>
                <head>
                  <!-- ... -->
                </head>
                <body>
                  <h1 class="text-center">{title}</h1>
                </body>
              </html>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Check to see if the project files look like the example below.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:410,title:"With TailwindCSS",class:"py-20"},"{ 'height': 410, 'title': `With TailwindCSS`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5"},"{ 'class': `flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"tailwind",selector:"#tailwind-index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"tailwind",selector:"#tailwind-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"tailwind",selector:"#tailwind-package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"tailwind",selector:"#tailwind-index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"tailwind",selector:"#tailwind-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"tailwind",selector:"#tailwind-package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `tailwind`, 'selector': `#tailwind-package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"tailwind-index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `tailwind-index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import path from 'path';
                import http from 'http';
                import temple, { cache } from '@ossph/temple/compiler';
                import { dev } from '@ossph/temple-dev';
                import { tailwind } from '@ossph/temple-tailwind';

                const compiler = temple();
                compiler.use(cache({
                  buildPath: path.join(__dirname, '../build')
                }));
                // 1. use tailwind
                compiler.use(tailwind({
                  darkMode: 'class',
                  theme: { extend: {} },
                  plugins: [],
                  content: []
                }));
                
                const { router, refresh } = dev();
                const server = http.createServer(async (req, res) => {
                  if (router(req, res)) return;
                  if (req.url?.startsWith('/build/')) {
                    const filename = req.url.substring(7);
                    const { type, content } = await compiler.asset(filename);
                    res.writeHead(200, { 'Content-Type': type });
                    return res.end(content);
                  } else if (req.url === '/') {
                    refresh.sync(compiler.fromSource('./src/page.dtml'));
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    return res.end(await compiler.render('./src/page.dtml', {
                      title: 'Hello World'
                    }));
                  }
                });
                server.listen(3000);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"tailwind-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `tailwind-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  /* 2. Add tailwind directives */
                  @tailwind base;
                  @tailwind components;
                  @tailwind utilities;
                </style>
                <script>
                  import { env, props } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const { title } = props();
                </script>
                <html>
                  <head>
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                    <script src="/dev.js"></script>
                  </head>
                  <body>
                    <h1 class="text-center">{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"tailwind-package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `tailwind-package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.6"
                  },
                  "devDependencies": {
                    "@ossph/temple-dev": "0.1.6",
                    "@ossph/temple-tailwind": "0.1.6",
                    "@types/node": "22.1.0",
                    "autoprefixer": "10.4.20",
                    "postcss": "8.4.44",
                    "tailwindcss": "3.4.10",
                    "ts-node": "10.9.2",
                    "typescript": "5.5.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Re-run the following command in terminal to initialize the 
            tailwind plugin.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Load 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
            in your browser. After loading you should see files that were 
            generated in a new build folder found in your project root. 
            Try to add a Tailwind class to the markup in
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` and 
            save. The development server will automatically refresh 
            the styles and component styles will also be update in 
            real-time without the page reloading.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"express"},"{ 'name': `express` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(l("5. Add ExpressJS")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Temple has a separate package called
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("@ossph/temple-express")]),e.TempleRegistry.createText(`
            to use Express with Temple. You can install this plugin by 
            running the following command in terminal.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npm install --save @ossph/temple-express express && npm install --save-dev @types/express
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            The package 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("@ossph/temple-express")]),e.TempleRegistry.createText(`
            exports two plugins for express.
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("view()")]),e.TempleRegistry.createText(` is the view 
            engine for production (live) environments. It can be used with
            an express app like 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("app.use(view(compiler))")]),e.TempleRegistry.createText(`.
            The other export, `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("dev()")]),e.TempleRegistry.createText(` 
            is the same export from the Developer Tools documentation above, 
            but returns several tools used to integrate with express.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("api-ui",{start:"Express Developer Tools"},"{ 'start': `Express Developer Tools` }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Example logic to use the all the Temple Express tools together
            with Temple developer tools could look like the following code
            that cases for 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("development")]),e.TempleRegistry.createText(` and 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("production")]),e.TempleRegistry.createText(` modes.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12,lang:"js",class:"py-20"},"{ 'numbers': true, 'trim': true, 'detab': 12, 'lang': `js`, 'class': `py-20` }",[...this._toNodeList(`
            import { view, dev } from '@ossph/temple-express';

            //create temple compiler
            const compiler = temple({ cwd: __dirname, minify: false });
            //create express app
            const app = express();
            //set the view engine to temple
            app.set('views', path.join(__dirname, 'pages'));
            app.set('view engine', 'dtml');

            //if production (live)
            if (process.env.NODE_ENV === 'production') {
              //let's use express' template engine feature
              app.engine('dtml', view(compiler));
              //...other production settings...
            //if development mode
            } else {
              //get development middleware
              const { router, view } = dev({ cwd: __dirname });
              //use development middleware
              app.use(router);
              //let's use express' template engine feature
              app.engine('dtml', view(compiler));
            }
          `)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            And you can now case for development mode in 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(`
            like in the example below
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12,class:"py-20"},"{ 'numbers': true, 'trim': true, 'detab': 12, 'class': `py-20` }",[...this._toNodeList(`
            <style>
              /* ... */
            </style>
            <script>
              import { env } from '@ossph/temple';
              const { NODE_ENV } = env();
            </script>
            <html>
              <head>
                <!-- ... -->
                <if true={NODE_ENV !== 'production'}>
                  <script src="/dev.js"></script>
                </if>
              </head>
              <body>
                <!-- ... -->
              </body>
            </html>
          `)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Check to see if the project files look like the example below.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:410,title:"With ExpressJS",class:"py-20"},"{ 'height': 410, 'title': `With ExpressJS`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5"},"{ 'class': `flex bd-h-333333 bd-solid bdx-0 bdt-0 bdl-1 scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"express",selector:"#express-index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `express`, 'selector': `#express-index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"express",selector:"#express-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `express`, 'selector': `#express-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"express",selector:"#express-package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `express`, 'selector': `#express-package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"express",selector:"#express-index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `express`, 'selector': `#express-index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"express",selector:"#express-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `express`, 'selector': `#express-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"express",selector:"#express-package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `express`, 'selector': `#express-package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"express-index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `express-index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import path from 'path';
                import express from 'express';
                import temple, { cache } from '@ossph/temple/compiler';
                import { view, dev } from '@ossph/temple-express';
                import { tailwind } from '@ossph/temple-tailwind';

                //create temple compiler
                const compiler = temple();
                //use tailwind
                compiler.use(tailwind({
                  darkMode: 'class',
                  theme: { extend: {} },
                  plugins: [],
                  content: []
                }));
                //use build cache
                compiler.use(cache({ 
                  environment: process.env.NODE_ENV,
                  buildPath: path.join(__dirname, '../build')
                }));

                //create express app
                const app = express();
                //set the view engine to temple
                app.set('views', __dirname);
                app.set('view engine', 'dtml');

                //if production (live)
                if (process.env.NODE_ENV === 'production') {
                  //let's use express' template engine feature
                  app.engine('dtml', view(compiler));
                  //...other production settings...
                //if development mode
                } else {
                  //get development middleware
                  const { router, view } = dev({ cwd: __dirname });
                  //use development middleware
                  app.use(router);
                  //let's use express' template engine feature
                  app.engine('dtml', view(compiler));
                }

                //routes
                app.get('/build/:build', async (req, res) => {
                  //get filename ie. abc123.js
                  const filename = req.params.build;
                  //get asset
                  const { type, content } = await compiler.asset(filename);
                  //send response
                  res.type(type).send(content);
                });

                app.get('/', (req, res) => {
                  //now use the temple template engine
                  res.render('page', { title: 'Hello World' });
                  res.type('text/html');
                });

                //listen
                app.listen(3000, () => {
                  console.log('HTTP server is running on http://localhost:3000');
                });
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"express-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `express-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <style>
                  @tailwind base;
                  @tailwind components;
                  @tailwind utilities;
                </style>
                <script>
                  import { env, props } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA, NODE_ENV } = env();
                  const { title } = props();
                </script>
                <html>
                  <head>
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                    <if true={NODE_ENV !== 'production'}>
                      <script src="/dev.js"></script>
                    </if>
                  </head>
                  <body>
                    <h1 class="text-center">{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"express-package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `express-package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "^0.1.6",
                    "@ossph/temple-express": "^0.1.6",
                    "express": "^4.19.2"
                  },
                  "devDependencies": {
                    "@ossph/temple-dev": "^0.1.6",
                    "@ossph/temple-tailwind": "^0.1.6",
                    "@types/express": "^4.17.21",
                    "@types/node": "^22.5.3",
                    "autoprefixer": "^10.4.20",
                    "postcss": "^8.4.45",
                    "tailwindcss": "^3.4.10",
                    "ts-node": "^10.9.2",
                    "typescript": "^5.5.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Re-run the following command in terminal to initialize the 
            re-run your application using Express.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npx ts-node src/index.ts
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Load 
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},"{ 'lang': `js`, 'inline': true }",[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
            in your browser. After loading you should see everything is 
            exactly as it was, but you now benefit from using ExpressJS.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            -- `,!1),...this._toNodeList(l("Read On")),e.TempleRegistry.createText(` --
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            To see other getting started examples with various frameworks,
            you can check out the following project examples in the 
            official repository.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ul",{},"{ }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-fastify`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-fastify` }",[e.TempleRegistry.createText(`
                Fastify
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-hapi`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-hapi` }",[e.TempleRegistry.createText(`
                Hapi
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-koa`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-koa` }",[e.TempleRegistry.createText(`
                Koa
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-nest`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-nest` }",[e.TempleRegistry.createText(`
                NestJS
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-restify`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-restify` }",[e.TempleRegistry.createText(`
                Restify
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",target:"_blank",href:`${o}/with-webpack`},"{ 'class': `tx-t-1 tx-underline`, 'target': `_blank`, 'href': `${examples}/with-webpack` }",[e.TempleRegistry.createText(`
                Webpack
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(` 
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-10"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-10` }",[e.TempleRegistry.createText(`
            Depending on how you plan to use Temple, you can also look at 
            the following project setups.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ul",{},"{ }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",href:"/temple/docs/template-engine.html"},"{ 'class': `tx-t-1 tx-underline`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
                Template Engine
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",href:"/temple/docs/single-page.html"},"{ 'class': `tx-t-1 tx-underline`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
                Single Page App
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",href:"/temple/docs/static-site.html"},"{ 'class': `tx-t-1 tx-underline`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
                Static Site Generator
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"py-5"},"{ 'class': `py-5` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-underline",href:"/temple/docs/component-publisher.html"},"{ 'class': `tx-t-1 tx-underline`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
                Web Component Publisher
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          
          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/index.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("Documentation")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/markup-syntax.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(l("Markup Syntax")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return le(Ae);})();
