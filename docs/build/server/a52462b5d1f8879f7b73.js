var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var n=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var l in t)g(a,l,{get:t[l],enumerable:!0})},U=(a,t,l,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ee(t))!ae.call(a,i)&&i!==l&&g(a,i,{get:()=>t[i],enumerable:!(r=Z(t,i))||r.enumerable});return a};var F=(a,t,l)=>(l=a!=null?X(te(a)):{},U(t||!a||!a.__esModule?g(l,"default",{value:a,enumerable:!0}):l,a)),se=a=>U(g({},"__esModule",{value:!0}),a);var w=n(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});var E=class extends Error{static for(t,...l){return l.forEach(function(r){t=t.replace("%s",r)}),new this(t)}static forErrorsFound(t){let l=new this("Invalid Parameters");return l.errors=t,l}static require(t,l,...r){if(!t){for(let i of r)l=l.replace("%s",i);throw new this(l)}}constructor(t,l=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=l}withCode(t){return this.code=t,this}withPosition(t,l){return this.start=t,this.end=l,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};v.default=E});var N=n(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(l=>this._elements.add(l))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};L.default=k});var p=n(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var re=new Map;j.default=re});var P=n(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var S=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,l=!1){this._escape=l,this._value=t}toString(){return this.value}};D.default=S});var O=n(f=>{"use strict";var ce=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var ie=ce(N()),ne=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],A=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,l={},r="",i=[]){this._attributes={},this._name=t,this._attributes=l,this._props=r,this._children=new ie.default(i)}toString(){let t=Object.entries(this._attributes),l=t.length>0?" "+t.map(([i,b])=>{if(typeof b=="string")return`${i}="${b}"`;if(typeof b=="boolean")return b?i:""}).join(" "):"";if(ne.includes(this._name))return`<${this._name}${l} />`;let r=this._children.toString();return`<${this._name}${l}>${r}</${this._name}>`}};f.default=A});var M=n(m=>{"use strict";var G=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var oe=G(P()),J=G(O()),I=class{static render(t){return t.filter(Boolean).map(l=>l.toString()).join("")}static registry(t,l=new Set){return t.forEach(r=>{r instanceof J.default&&(["html","head","body"].includes(r.name)||l.add(r),r.name!=="head"&&r.children.length>0&&this.registry(r.children.toArray(),l))}),l}static createElement(t,l,r,i=[]){return new J.default(t,l,r,i)}static createText(t,l=!0){return new oe.default(t,l)}};m.default=I});var W=n(x=>{"use strict";var B=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var pe=B(w()),q=B(p()),C=B(M()),$=class{bindings(){let t=C.default.registry(this.template());return`{ ${Array.from(t.values()).map((r,i)=>r.props!=="{ }"?`'${i}': ${r.props}`:"").filter(r=>r!=="").join(", ")} }`}render(t={}){q.default.set("props",t||{}),q.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(q.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(i=>i[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let l=this.template(),r=C.default.render(l).trim();if(!r.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${r}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(l=>typeof l=="object"&&typeof l.nodeType=="number")?t:[C.default.createText(String(t))]}};x.default=$});var R=n(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var y=class{emit(t,l){return this}on(t,l){return this}once(t,l){return this}unbind(t,l){return this}};d.TempleEmitter=y;var fe=new y;d.default=fe});var V=n(h=>{"use strict";var me=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var xe=me(p());function de(a){let t=xe.default.get("env")||{};return a?t[a]||null:t}h.default=de});var z=n(u=>{"use strict";var he=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});u.default=Te;var ue=he(p());function Te(){return ue.default.get("props")||{}}});var K=n(c=>{"use strict";var be=c&&c.__createBinding||(Object.create?function(a,t,l,r){r===void 0&&(r=l);var i=Object.getOwnPropertyDescriptor(t,l);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(a,r,i)}:function(a,t,l,r){r===void 0&&(r=l),a[r]=t[l]}),ge=c&&c.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),ye=c&&c.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var l in a)l!=="default"&&Object.prototype.hasOwnProperty.call(a,l)&&be(t,a,l);return ge(t,a),t},o=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0});c.TempleText=c.TempleException=c.TempleEmitter=c.TempleElement=c.TempleRegistry=c.TempleDocument=c.TempleCollection=c.props=c.emitter=c.env=c.data=void 0;var _e=o(w());c.TempleException=_e.default;var Ee=o(N());c.TempleCollection=Ee.default;var ve=o(W());c.TempleDocument=ve.default;var we=o(M());c.TempleRegistry=we.default;var ke=o(O());c.TempleElement=ke.default;var Y=ye(R());c.emitter=Y.default;Object.defineProperty(c,"TempleEmitter",{enumerable:!0,get:function(){return Y.TempleEmitter}});var Le=o(P());c.TempleText=Le.default;var Ne=o(p());c.data=Ne.default;var je=o(V());c.env=je.default;var Se=o(z());c.props=Se.default});var H=n((Ge,Q)=>{Q.exports={...K()}});var Pe={};le(Pe,{default:()=>_});var e=F(H()),T=F(H());var s=function(a,...t){let l=De(a);for(let r=0;r<t.length;r++)l=l.replace("%s",String(t[r]));return l},De=function(a){return a};var _=class extends e.TempleDocument{id(){return"a52462b5d1f8879f7b73"}styles(){return`@tui reset;
  @tui fouc-opacity;
  @tui theme;
  @tui block;
  @tui utilities;`}template(){let t="/temple/panel.html",l=s("Temple - The reactive web component template engine."),r=s("Temple is a template engine that generates web components and support reactivity."),i=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"},"{ 'charset': `utf-8` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"},"{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},"{ }",[...this._toNodeList(l)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:r},"{ 'name': `description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:l},"{ 'property': `og:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:r},"{ 'property': `og:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`},"{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"},"{ 'property': `og:type`, 'content': `website` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"},"{ 'name': `twitter:card`, 'content': `summary` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"},"{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:l},"{ 'name': `twitter:title`, 'content': title }"),e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("body",{class:"dark bg-t-0 tx-t1 arial"},"{ 'class': `dark bg-t-0 tx-t1 arial` }",[e.TempleRegistry.createText(`
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
    `,!1),...this._toNodeList(s("Introduction")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/index.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/index.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Documentation")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/getting-started.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/getting-started.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Getting Started")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(s("Features")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/markup-syntax.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/markup-syntax.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/markup-syntax.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Markup Syntax")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/state-management.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/state-management.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("State Management")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-strategy.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-strategy.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-strategy.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Component Strategy")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/compiler-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/compiler-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Compiler API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/client-api.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/client-api.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/client-api.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Client API")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`

  `,!1),e.TempleRegistry.createElement("h6",{class:"bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase"},"{ 'class': `bt-1 bt-solid bt-t-1 tx-muted tx-14 mb-0 mt-20 pt-20 pb-10 pl-10 tx-uppercase` }",[e.TempleRegistry.createText(`
    `,!1),...this._toNodeList(s("Usage")),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),...t==="/docs/template-engine.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/template-engine.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/template-engine.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Template Engine")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/single-page.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/single-page.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/single-page.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Single Page App")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/static-site.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/static-site.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/static-site.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Static Site Generator")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/component-publisher.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10",href:"/temple/docs/component-publisher.html"},"{ 'class': `block tx-t-1 py-10 pl-10`, 'href': `/temple/docs/component-publisher.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Component Publisher")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),...t==="/docs/developer-tools.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 tx-bold mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 tx-bold mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1 py-10 pl-10 mb-100",href:"/temple/docs/developer-tools.html"},"{ 'class': `block tx-t-1 py-10 pl-10 mb-100`, 'href': `/temple/docs/developer-tools.html` }",[e.TempleRegistry.createText(`
      `,!1),...this._toNodeList(s("Developer Tools")),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-right",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("menu",{class:"m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto"},"{ 'class': `m-0 px-10 py-20 h-calc-full-40 bg-t-2 scroll-auto` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h6",{class:"tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase"},"{ 'class': `tx-muted tx-14 mb-0 mt-0 pb-10 tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("On this page")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("nav",{class:"tx-14 tx-lh-32"},"{ 'class': `tx-14 tx-lh-32` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#http"},"{ 'class': `block tx-t-0`, 'href': `#http` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("1. Add HTTP")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#develop"},"{ 'class': `block tx-t-0`, 'href': `#develop` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("2. Add Dev Tools")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#cache"},"{ 'class': `block tx-t-0`, 'href': `#cache` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("3. Add File Cache")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#tailwind"},"{ 'class': `block tx-t-0`, 'href': `#tailwind` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("4. Add TailwindCSS")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#express"},"{ 'class': `block tx-t-0`, 'href': `#express` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("5. Add ExpressJS")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("nav",{class:"pl-20"},"{ 'class': `pl-20` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#http"},"{ 'class': `block tx-t-1`, 'href': `#http` }",[e.TempleRegistry.createText(`
                `,!1),...this._toNodeList(s("1. Add HTTP")),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#develop"},"{ 'class': `block tx-t-1`, 'href': `#develop` }",[e.TempleRegistry.createText(`
                `,!1),...this._toNodeList(s("2. Add Dev Tools")),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#cache"},"{ 'class': `block tx-t-1`, 'href': `#cache` }",[e.TempleRegistry.createText(`
                `,!1),...this._toNodeList(s("3. Add File Cache")),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#tailwind"},"{ 'class': `block tx-t-1`, 'href': `#tailwind` }",[e.TempleRegistry.createText(`
                `,!1),...this._toNodeList(s("4. Add TailwindCSS")),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#express"},"{ 'class': `block tx-t-1`, 'href': `#express` }",[e.TempleRegistry.createText(`
                `,!1),...this._toNodeList(s("5. Add ExpressJS")),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Getting Started")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            In most cases Temple will be used to render a front end from 
            a server framework. In this example, we will use the native
            NodeJS HTTP module to create a server that renders a page
            using Temple. Start by replacing the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(`
            file with the following code. 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("function() {}")]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal",class:"py-20"},"{ 'title': `Terminal`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},"{ 'lang': `bash` }",[e.TempleRegistry.createText(`
              npm init -y && npm install --save @ossph/temple && npm install --save-dev ts-node typescript @types/node
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("1. Add HTTP")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            In most cases Temple will be used to render a front end from 
            a server framework. In this example, we will use the native
            NodeJS HTTP module to create a server that renders a page
            using Temple. Start by replacing the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(`
            file with the following code. 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("function() {}")]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts",class:"py-20"},"{ 'title': `src/index.ts`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
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

          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("1. Add HTTP")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            In most cases Temple will be used to render a front end from 
            a server framework. In this example, we will use the native
            NodeJS HTTP module to create a server that renders a page
            using Temple. Start by replacing the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(`
            file with the following code. 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},"{ 'inline': true, 'lang': `js` }",[...this._toNodeList("function() {}")]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Basic Example",class:"py-20"},"{ 'title': `Basic Example`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-h-EFEFEF h-full lg-block"},"{ 'class': `flex bg-h-EFEFEF h-full lg-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half",numbers:!0,trim:!0,detab:14},"{ 'class': `basis-half`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
                <style>
                  h1 { font-weight: bold; }
                </style>
                <script>
                  const name = 'world';
                </script>
                <h1>Hello {name}!</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-preview",{class:"bg-white basis-half h-140 lg-h-auto"},"{ 'class': `bg-white basis-half h-140 lg-h-auto` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h1",{},"{ }",[e.TempleRegistry.createText("Hello world!",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'solid': true, 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},"{ 'class': `fas fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Recommended:",!1)]),e.TempleRegistry.createText(`
            Download the Temple editor plugin at the `,!1),e.TempleRegistry.createElement("a",{target:"_blank",class:"tx-white tx-underline",href:"https://marketplace.visualstudio.com/items?itemName=ossph.temple-language"},"{ 'target': `_blank`, 'class': `tx-white tx-underline`, 'href': `https://marketplace.visualstudio.com/items?itemName=ossph.temple-language` }",[e.TempleRegistry.createText("Visual Studio Marketplace",!1)]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:410,title:"With NodeJS HTTP"},"{ 'height': 410, 'title': `With NodeJS HTTP` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"http",selector:"#package-json"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bx-1 bt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `http`, 'selector': `#package-json` }",[e.TempleRegistry.createText(`
                  package.json
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pt-10 block",active:"tx-white",inactive:"tx-muted",group:"http",selector:"#package-json"},"{ 'class': `pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `http`, 'selector': `#package-json` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `package-json`, 'style': `display:none`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
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

          `,!1),e.TempleRegistry.createElement("api-ui",{},"{ }"),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/getting-started.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("Getting Started")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/getting-started.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("Getting Started")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Pe);})();
