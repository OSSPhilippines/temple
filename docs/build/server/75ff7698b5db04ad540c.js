var TempleAPI=(()=>{var X=Object.create;var g=Object.defineProperty;var Z=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var o=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var l in t)g(a,l,{get:t[l],enumerable:!0})},W=(a,t,l,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ee(t))!ae.call(a,i)&&i!==l&&g(a,i,{get:()=>t[i],enumerable:!(r=Z(t,i))||r.enumerable});return a};var H=(a,t,l)=>(l=a!=null?X(te(a)):{},W(t||!a||!a.__esModule?g(l,"default",{value:a,enumerable:!0}):l,a)),se=a=>W(g({},"__esModule",{value:!0}),a);var _=o(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});var E=class extends Error{static for(t,...l){return l.forEach(function(r){t=t.replace("%s",r)}),new this(t)}static forErrorsFound(t){let l=new this("Invalid Parameters");return l.errors=t,l}static require(t,l,...r){if(!t){for(let i of r)l=l.replace("%s",i);throw new this(l)}}constructor(t,l=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=l}withCode(t){return this.code=t,this}withPosition(t,l){return this.start=t,this.end=l,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};w.default=E});var N=o(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var k=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(l=>this._elements.add(l))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};L.default=k});var p=o(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var re=new Map;D.default=re});var P=o(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var A=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,l=!1){this._escape=l,this._value=t}toString(){return this.value}};S.default=A});var j=o(m=>{"use strict";var ce=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var ie=ce(N()),oe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],I=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,l={},r="",i=[]){this._attributes={},this._name=t,this._attributes=l,this._props=r,this._children=new ie.default(i)}toString(){let t=Object.entries(this._attributes),l=t.length>0?" "+t.map(([i,T])=>{if(typeof T=="string")return`${i}="${T}"`;if(typeof T=="boolean")return T?i:""}).join(" "):"";if(oe.includes(this._name))return`<${this._name}${l} />`;let r=this._children.toString();return`<${this._name}${l}>${r}</${this._name}>`}};m.default=I});var C=o(f=>{"use strict";var J=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var ne=J(P()),F=J(j()),O=class{static render(t){return t.filter(Boolean).map(l=>l.toString()).join("")}static registry(t,l=new Set){return t.forEach(r=>{r instanceof F.default&&(["html","head","body"].includes(r.name)||l.add(r),r.name!=="head"&&r.children.length>0&&this.registry(r.children.toArray(),l))}),l}static createElement(t,l,r,i=[]){return new F.default(t,l,r,i)}static createText(t,l=!0){return new ne.default(t,l)}};f.default=O});var R=o(d=>{"use strict";var $=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var pe=$(_()),M=$(p()),U=$(C()),B=class{bindings(){let t=U.default.registry(this.template());return`{ ${Array.from(t.values()).map((r,i)=>r.props!=="{ }"?`'${i}': ${r.props}`:"").filter(r=>r!=="").join(", ")} }`}render(t={}){M.default.set("props",t||{}),M.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(M.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(i=>i[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let l=this.template(),r=U.default.render(l).trim();if(!r.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${r}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(l=>typeof l=="object"&&typeof l.nodeType=="number")?t:[U.default.createText(String(t))]}};d.default=B});var G=o(x=>{"use strict";Object.defineProperty(x,"__esModule",{value:!0});x.TempleEmitter=void 0;var y=class{emit(t,l){return this}on(t,l){return this}once(t,l){return this}unbind(t,l){return this}};x.TempleEmitter=y;var me=new y;x.default=me});var Y=o(h=>{"use strict";var fe=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var de=fe(p());function xe(a){let t=de.default.get("env")||{};return a?t[a]||null:t}h.default=xe});var z=o(u=>{"use strict";var he=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});u.default=be;var ue=he(p());function be(){return ue.default.get("props")||{}}});var K=o(c=>{"use strict";var Te=c&&c.__createBinding||(Object.create?function(a,t,l,r){r===void 0&&(r=l);var i=Object.getOwnPropertyDescriptor(t,l);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(a,r,i)}:function(a,t,l,r){r===void 0&&(r=l),a[r]=t[l]}),ge=c&&c.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),ye=c&&c.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var l in a)l!=="default"&&Object.prototype.hasOwnProperty.call(a,l)&&Te(t,a,l);return ge(t,a),t},n=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(c,"__esModule",{value:!0});c.TempleText=c.TempleException=c.TempleEmitter=c.TempleElement=c.TempleRegistry=c.TempleDocument=c.TempleCollection=c.props=c.emitter=c.env=c.data=void 0;var ve=n(_());c.TempleException=ve.default;var Ee=n(N());c.TempleCollection=Ee.default;var we=n(R());c.TempleDocument=we.default;var _e=n(C());c.TempleRegistry=_e.default;var ke=n(j());c.TempleElement=ke.default;var V=ye(G());c.emitter=V.default;Object.defineProperty(c,"TempleEmitter",{enumerable:!0,get:function(){return V.TempleEmitter}});var Le=n(P());c.TempleText=Le.default;var Ne=n(p());c.data=Ne.default;var De=n(Y());c.env=De.default;var Ae=n(z());c.props=Ae.default});var q=o((Je,Q)=>{Q.exports={...K()}});var Pe={};le(Pe,{default:()=>v});var e=H(q()),b=H(q());var s=function(a,...t){let l=Se(a);for(let r=0;r<t.length;r++)l=l.replace("%s",String(t[r]));return l},Se=function(a){return a};var v=class extends e.TempleDocument{id(){return"75ff7698b5db04ad540c"}styles(){return`@tui theme;
  @tui reset;
  @tui fouc-opacity;
  @tui default-block;
  @tui utilities;`}template(){let t="/docs/component-strategy.html",l=s("Component Strategy - Temple reactive web component template engine."),r=s("Learn more about web components and how they work with Temple."),i=()=>{document.getElementsByTagName("panel-layout")[0].toggle("left")};return[e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,b.env)("BUILD_ID")}.css`},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/build/client/${env('BUILD_ID')}.css` }"),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,b.env)("APP_DATA"),src:`/temple/build/client/${(0,b.env)("BUILD_ID")}.js`},"{ 'data-app': env('APP_DATA'), 'src': `/temple/build/client/${env('BUILD_ID')}.js` }"),e.TempleRegistry.createText(`
  `,!1),...(0,b.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
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
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#document"},"{ 'class': `block tx-t-0`, 'href': `#document` }",[...this._toNodeList(s("Document"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#template"},"{ 'class': `block tx-t-0`, 'href': `#template` }",[...this._toNodeList(s("Template"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#component"},"{ 'class': `block tx-t-0`, 'href': `#component` }",[...this._toNodeList(s("Component"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("nav",{class:"pl-20"},"{ 'class': `pl-20` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#strat-1"},"{ 'class': `block tx-t-1`, 'href': `#strat-1` }",[...this._toNodeList(s("Strategy 1"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#strat-2"},"{ 'class': `block tx-t-1`, 'href': `#strat-2` }",[...this._toNodeList(s("Strategy 2"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#strat-3"},"{ 'class': `block tx-t-1`, 'href': `#strat-3` }",[...this._toNodeList(s("Strategy 3"))]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-1",href:"#strat-4"},"{ 'class': `block tx-t-1`, 'href': `#strat-4` }",[...this._toNodeList(s("Strategy 4"))]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block tx-t-0",href:"#fouc"},"{ 'class': `block tx-t-0`, 'href': `#fouc` }",[...this._toNodeList(s("FOUC"))]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{},"{ }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-docs",{},"{ }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-primary tx-uppercase tx-30 py-20"},"{ 'class': `tx-primary tx-uppercase tx-30 py-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Component Strategy")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            There are three types of components in Temple: Document, 
            Template, and Component. Each type of component has a 
            different strategy for rendering and updating the DOM. The 
            Document component is the root component of the application 
            and is responsible for rendering the entire application. The 
            Template component is a reusable component that can be used 
            in multiple places in the application. The Component component 
            is a custom component that can be used to create complex UI 
            elements.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"document"},"{ 'name': `document` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Document")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            A document denoted by files with the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText(".dtml",!1)]),e.TempleRegistry.createText(` extension, is the root of
            each page view that should include the document markup 
            starting with `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<html>")]),e.TempleRegistry.createText(`. While 
            it looks like another Temple component, there are some key 
            differences in how it is used.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ul",{},"{ }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
                A document logic (`,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<script>")]),e.TempleRegistry.createText(`)
                is executed on the client side but is not a 
                `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(`, which means 
                it cannot be re-rendered and does not have access to 
                `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(` context.
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
                A document `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("props()")]),e.TempleRegistry.createText(` are the 
                server props passed down to the client.
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
                A document does not have access to NodeJS functionality. So 
                things like `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("fs",!1)]),e.TempleRegistry.createText(` are not available.
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},"{ 'class': `fas fa-fw fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Recommendation:",!1)]),e.TempleRegistry.createText(` You should do server related
            logic on the server framework and pass the neccesary data 
            to the client.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:250,title:"Passing Server Props",class:"py-20"},"{ 'height': 250, 'title': `Passing Server Props`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"server",selector:"#server-index-ts"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `server`, 'selector': `#server-index-ts` }",[e.TempleRegistry.createText(`
                  src/index.ts
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"server",selector:"#server-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `server`, 'selector': `#server-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"server",selector:"#server-index-ts"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `server`, 'selector': `#server-index-ts` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"server",selector:"#server-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `server`, 'selector': `#server-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"server-index-ts",lang:"js",numbers:!0,trim:!0,detab:16},"{ 'id': `server-index-ts`, 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';

                const compiler = temple({ cwd: __dirname });
                const server = http.createServer(async (req, res) => {
                  //pass server props to document
                  res.end(await compiler.render('./index.dtml', {
                    title: 'Hello World'
                  }));
                });
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"server-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `server-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  //from the server
                  const { title } = props();
                </script>
                <html>
                  <body>
                    <h1 class="title">{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"template"},"{ 'name': `template` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Template")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            A template is resuable partial markup that can be imported by 
            a component, document or another template. A template is 
            not is not a `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(`, but 
            rather adds its markup to the parent component's final markup.
            You will not see a template in the DOM, but rather the
            markup it contains.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            For example, consider a document that contains the following 
            markup.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:12},"{ 'trim': true, 'detab': 12 }",[...this._toNodeList(`
            <script>
              const title = 'Hello World';
            </script>
            <html>
              <head>
                <meta charset="utf-8" />
                <title>{title}</title>
              </head>
              <body>
                <h1>{title}</h1>
              </body>
            </html>
          `)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            You can create a template for the head of your
            document and then import it. This allows you to
            reuse the head markup in multiple documents.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:250,title:"Using Templates",class:"py-20"},"{ 'height': 250, 'title': `Using Templates`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"template",selector:"#template-page-dtml"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `template`, 'selector': `#template-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"template",selector:"#template-head-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `template`, 'selector': `#template-head-tml` }",[e.TempleRegistry.createText(`
                  src/head.tml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"p-5"},"{ 'class': `p-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"template",selector:"#template-page-dtml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `template`, 'selector': `#template-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"template",selector:"#template-head-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `template`, 'selector': `#template-head-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                head.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"template-page-dtml",numbers:!0,trim:!0,detab:16},"{ 'id': `template-page-dtml`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="import" type="template" href="./head.tml" name="html-head" />
                <script>
                  const title = 'Hello World';
                </script>
                <html>
                  <html-head />
                  <body>
                    <h1>{title}</h1>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"template-head-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `template-head-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>
                </head>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0,class:"py-20 tx-lh-24"},"{ 'curved': true, 'info': true, 'class': `py-20 tx-lh-24` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},"{ 'class': `fas fa-fw fa-info-circle` }",[]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("strong",{},"{ }",[e.TempleRegistry.createText("Note:",!1)]),e.TempleRegistry.createText(` Template partials do not process 
            attributes or children if given.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Variables used in a template should be declared in the
            parent component or document. This allows you to pass
            data to the template from the parent.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"component"},"{ 'name': `component` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{class:"tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0"},"{ 'class': `tx-primary tx-uppercase tx-26 pt-40 pb-10 mb-20 bd-solid bd-t-1 bdb-1 bdt-0 bdx-0` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Component")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            All temple components are 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` that extends
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(` and therefore is 
            both a web component and element just like any other element 
            in the browser DOM. Components that do not use the
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag are affected by 
            the global styles of the application. Components with the
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag enable the 
            component's shadow DOM and will encapsulate the styles within
            the component and not be affected by global styles. With that 
            said, there are several strategies that can be applied to 
            Temple components.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"strat-1"},"{ 'name': `strat-1` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Strategy 1: No Components")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This strategy uses only documents and templates. This 
            strategy is useful for simple applications that do not require 
            complex UI elements. This is the best strategy for 
            performant applications.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:400,title:"No Components",class:"py-20"},"{ 'height': 400, 'title': `No Components`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-1",selector:"#strat-1-page-dtml"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-1",selector:"#strat-1-head-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-head-tml` }",[e.TempleRegistry.createText(`
                  src/head.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-1",selector:"#strat-1-header-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-header-tml` }",[e.TempleRegistry.createText(`
                  src/header.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-1",selector:"#strat-1-footer-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-footer-tml` }",[e.TempleRegistry.createText(`
                  src/footer.tml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},"{ 'class': `folder` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-1",selector:"#strat-1-page-dtml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-1",selector:"#strat-1-head-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-head-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                head.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-1",selector:"#strat-1-header-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-header-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-1",selector:"#strat-1-footer-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-1`, 'selector': `#strat-1-footer-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-1-page-dtml",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-1-page-dtml`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="import" type="template" href="./head.tml" name="html-head" />
                <link rel="import" type="template" href="./header.tml" name="page-header" />
                <link rel="import" type="template" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                </script>
                <html>
                  <html-head />
                  <body>
                    <page-header />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer />
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-1-head-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-1-head-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>

                  <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                  <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                </head>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-1-header-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-1-header-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <header>
                  <img src="/logo.png" alt="Logo" />
                  <h6>Brand</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-1-footer-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-1-footer-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025</copy>
                </footer>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"strat-2"},"{ 'name': `strat-2` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Strategy 2: Shallow Components")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This strategy uses components that do not have a 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag and is useful for 
            applications that require complex logic in components but 
            using a shared global stylesheet.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:400,title:"Shallow Components",class:"py-20"},"{ 'height': 400, 'title': `Shallow Components`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-2",selector:"#strat-2-page-dtml"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-2",selector:"#strat-2-header-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-header-tml` }",[e.TempleRegistry.createText(`
                  src/header.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-2",selector:"#strat-2-footer-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-footer-tml` }",[e.TempleRegistry.createText(`
                  src/footer.tml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},"{ 'class': `folder` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-2",selector:"#strat-2-page-dtml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-2",selector:"#strat-2-header-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-header-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-2",selector:"#strat-2-footer-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-2`, 'selector': `#strat-2-footer-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-2-page-dtml",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-2-page-dtml`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-2-header-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-2-header-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-2-footer-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-2-footer-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"strat-3"},"{ 'name': `strat-3` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Strategy 3: Partial Styling")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This strategy uses components that do not have a 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag,
            but imports style via the 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<link>")]),e.TempleRegistry.createText(` tag to utilize both 
            global styles and specific styles that are needed for the
            component. 
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:400,title:"Shallow Components",class:"py-20"},"{ 'height': 400, 'title': `Shallow Components`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-3",selector:"#strat-3-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-3",selector:"#strat-3-header-tml"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-header-tml` }",[e.TempleRegistry.createText(`
                  src/header.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-3",selector:"#strat-3-footer-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-footer-tml` }",[e.TempleRegistry.createText(`
                  src/footer.tml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},"{ 'class': `folder` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-3",selector:"#strat-3-page-dtml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-3",selector:"#strat-3-header-tml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-header-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-3",selector:"#strat-3-footer-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-3`, 'selector': `#strat-3-footer-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-3-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-3-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-3-header-tml",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-3-header-tml`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="stylesheet" type="text/css" href="/header.css" />
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-3-footer-tml",style:"display:none",numbers:!0,trim:!0,detab:16},"{ 'id': `strat-3-footer-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <link rel="stylesheet" type="text/css" href="/footer.css" />
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"strat-4"},"{ 'name': `strat-4` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-t-1 tx-uppercase tx-22 pt-40 pb-20"},"{ 'class': `tx-t-1 tx-uppercase tx-22 pt-40 pb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Strategy 4: Encapulation")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This strategy uses components that have a
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},"{ 'inline': true }",[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag and encapsulates
            the styles within the component. This strategy is useful for
            applications that require complex UI elements that need to be
            styled in a specific way. This is also useful for components 
            that are designed to be used in multiple projects.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-app",{height:400,title:"Encapsulation",class:"py-20"},"{ 'height': 400, 'title': `Encapsulation`, 'class': `py-20` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-head",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"flex scroll-x-auto pt-5 pl-5"},"{ 'class': `flex scroll-x-auto pt-5 pl-5` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-4",selector:"#strat-4-page-dtml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-page-dtml` }",[e.TempleRegistry.createText(`
                  src/page.dtml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-4",selector:"#strat-4-header-tml"},"{ 'on': true, 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-header-tml` }",[e.TempleRegistry.createText(`
                  src/header.tml
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("tui-tab",{class:"relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0",active:"bg-black tx-white",inactive:"bg-t-1 tx-muted",group:"strat-4",selector:"#strat-4-footer-tml"},"{ 'class': `relative ml-2 p-10 curve-t-sm bd-solid bd-t-1 bdx-1 bdt-1 bdb-0`, 'active': `bg-black tx-white`, 'inactive': `bg-t-1 tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-footer-tml` }",[e.TempleRegistry.createText(`
                  src/footer.tml
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-left",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},"{ 'class': `folder` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},"{ 'class': `fas fa-fw fa-chevron-down` }",[]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("span",{},"{ }",[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-4",selector:"#strat-4-page-dtml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-page-dtml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{on:!0,class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-4",selector:"#strat-4-header-tml"},"{ 'on': true, 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-header-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"pl-15 pt-10 block",active:"tx-white",inactive:"tx-muted",group:"strat-4",selector:"#strat-4-footer-tml"},"{ 'class': `pl-15 pt-10 block`, 'active': `tx-white`, 'inactive': `tx-muted`, 'group': `strat-4`, 'selector': `#strat-4-footer-tml` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},"{ 'class': `fas fa-fw fa-file` }",[]),e.TempleRegistry.createText(`
                footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("app-main",{},"{ }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-4-page-dtml",style:"display:none",numbers:!0,trim:!0,detab:14},"{ 'id': `strat-4-page-dtml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-4-header-tml",numbers:!0,trim:!0,detab:14},"{ 'id': `strat-4-header-tml`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
                <style>
                  img { width: 100px; height: 100px; }
                  h6 { margin: 0; }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"strat-4-footer-tml",style:"display:none",numbers:!0,trim:!0,detab:14},"{ 'id': `strat-4-footer-tml`, 'style': `display:none`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
                <style>
                  copy { 
                    display: block; 
                    text-align: center; 
                  }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("a",{name:"fouc"},"{ 'name': `fouc` }",[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h2",{},"{ }",[...this._toNodeList(s("Flash of Unstyled Content"))]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            Web Components (custom elements) are 100% defined in 
            JavaScript. That includes their HTML and CSS. Those are 
            programmatically added to the DOM through APIs. By the time 
            the browser has interpreted and executed that code, there is 
            a good chance that the rendering pipeline has already put the 
            custom element on the screen. Since the browser doesn't know 
            about the element the first time around it will render it 
            without the intended styling. After the JavaScript of the 
            custom element definition is executed and the browser, 
            therefore, knows about the CSS rules that apply to that 
            element it can update the view.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            A flash of unstyled content (FOUC) can cause irritating layout 
            shifts as well as reveal content that should have been 
            progressively disclosed. In order to prevent a reflow of other 
            content you can add the following general solution to your 
            global stylesheet.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"css",numbers:!0,detab:12},"{ 'lang': `css`, 'numbers': true, 'detab': 12 }",[...this._toNodeList(`
            *:not(:defined) {
              opacity: 0;
            }
          `)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-lh-36 py-20"},"{ 'p': true, 'trim': true, 'class': `tx-lh-36 py-20` }",[e.TempleRegistry.createText(`
            This style will apply to all elements that are not defined,
            which are usually web components and will hide the content 
            until the browser has fully rendered the component.
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("nav",{class:"flex"},"{ 'class': `flex` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"tx-primary py-40",href:"/temple/docs/state-management.html"},"{ 'class': `tx-primary py-40`, 'href': `/temple/docs/state-management.html` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-left tx-t-1` }",[]),e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("State Management")),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"flex-grow tx-right tx-primary py-40",href:"/temple/docs/compiler-api.html"},"{ 'class': `flex-grow tx-right tx-primary py-40`, 'href': `/temple/docs/compiler-api.html` }",[e.TempleRegistry.createText(`
              `,!1),...this._toNodeList(s("Compiler API")),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right tx-t-1"},"{ 'class': `fas fa-fw fa-chevron-right tx-t-1` }",[]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Pe);})();
