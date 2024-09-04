var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),se=(a,t)=>{for(var r in t)E(a,r,{get:t[r],enumerable:!0})},F=(a,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!le.call(a,n)&&n!==r&&E(a,n,{get:()=>t[n],enumerable:!(l=te(t,n))||l.enumerable});return a};var G=(a,t,r)=>(r=a!=null?ee(re(a)):{},F(t||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a)),ne=a=>F(E({},"__esModule",{value:!0}),a);var O=c(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var P=class extends Error{static for(t,...r){return r.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...l){if(!t){for(let n of l)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};j.default=P});var q=c(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});var D=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};M.default=D});var u=c(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var ce=new Map;S.default=ce});var b=c(m=>{"use strict";var ie=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(q()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],A=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},l=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,f])=>{if(typeof f=="string")return`${n}="${f}"`;if(typeof f=="boolean")return f?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let l=this._children.toString();return`<${this._name}${r}>${l}</${this._name}>`}};m.default=A});var L=c(C=>{"use strict";Object.defineProperty(C,"__esModule",{value:!0});var I=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};C.default=I});var k=c(p=>{"use strict";var J=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var ue=J(L()),me=J(b()),$=class{static createElement(t,r,l=[]){return new me.default(t,r,l)}static createText(t,r=!0){return new ue.default(t,r)}};p.default=$});var V=c(h=>{"use strict";var y=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var pe=y(O()),B=y(u()),he=y(b()),de=y(k()),N=class{render(t={}){B.default.set("props",t||{}),B.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(B.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),l=he.default.render(r).trim();if(!l.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[de.default.createText(String(t))]}};h.default=N});var Y=c(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var v=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};d.TempleEmitter=v;var Te=new v;d.default=Te});var z=c(T=>{"use strict";var _e=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var xe=_e(u());function ge(a){let t=xe.default.get("env")||{};return a?t[a]||null:t}T.default=ge});var U=c(_=>{"use strict";var Ee=_&&_.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(_,"__esModule",{value:!0});_.default=ye;var be=Ee(u());function ye(){return be.default.get("props")||{}}});var H=c(x=>{"use strict";var ve=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=Pe;var we=ve(U());function Pe(){return(0,we.default)().class}});var K=c(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=je;function je(a){let t={getter:()=>r.raw,setter:l=>l},r={raw:a,getter(l){return t.getter=l,r},setter(l){return t.setter=l,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(l){r.raw=t.setter(l)}}),r}});var X=c(s=>{"use strict";var Oe=s&&s.__createBinding||(Object.create?function(a,t,r,l){l===void 0&&(l=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,l,n)}:function(a,t,r,l){l===void 0&&(l=r),a[l]=t[r]}),De=s&&s.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Me=s&&s.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&Oe(t,a,r);return De(t,a),t},i=s&&s.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(s,"__esModule",{value:!0});s.TempleText=s.TempleException=s.TempleEmitter=s.TempleElement=s.TempleRegistry=s.TempleDocument=s.TempleCollection=s.signal=s.classnames=s.props=s.emitter=s.env=s.data=void 0;var qe=i(O());s.TempleException=qe.default;var Se=i(q());s.TempleCollection=Se.default;var Ae=i(V());s.TempleDocument=Ae.default;var Ie=i(k());s.TempleRegistry=Ie.default;var Ce=i(b());s.TempleElement=Ce.default;var Q=Me(Y());s.emitter=Q.default;Object.defineProperty(s,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Le=i(L());s.TempleText=Le.default;var $e=i(u());s.data=$e.default;var ke=i(z());s.env=ke.default;var Be=i(U());s.props=Be.default;var Ne=i(H());s.classnames=Ne.default;var Ue=i(K());s.signal=Ue.default});var W=c((rt,Z)=>{Z.exports={...X()}});var We={};se(We,{default:()=>w});var e=G(W()),g=G(W());var o=function(a,...t){let r=Re(a);for(let l=0;l<t.length;l++)r=r.replace("%s",String(t[l]));return r},Re=function(a){return a};var w=class extends e.TempleDocument{id(){return"f859bf7a335e9eba03e0"}styles(){return""}template(){let t="/docs/client-api.html",r=o("Client API - Temple reactive web component template engine."),l=o("Client API documentation for Temple."),n=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},[...this._toNodeList(r)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:l}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:r}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:l}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:r}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:l}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"favicon",href:"/temple/favicon.ico"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"shortcut icon",type:"image/png",href:"/temple/favicon.png"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/theme.css"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,g.env)("BUILD_ID")}.css`}),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,g.env)("APP_DATA"),src:`/temple/build/client/${(0,g.env)("BUILD_ID")}.js`}),e.TempleRegistry.createText(`
  `,!1),...(0,g.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("script",{src:"/dev.js"}),e.TempleRegistry.createText(`
  `,!1)]:[],e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("body",{class:"dark panel with-head with-left"},[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("header",{class:"head panel-head"},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("i",{class:"menu fas fa-fw fa-bars",click:n},[]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("a",{href:"/temple"},[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("img",{src:"/temple/temple-icon.png",alt:"Temple Logo"}),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("h3",{},[e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple"},[e.TempleRegistry.createText("Temple",!1)])]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple/docs/index.html"},[e.TempleRegistry.createText("Docs",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"github",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-github"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"npm",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-npm text-white"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"discord",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-discord text-white"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("aside",{class:"left panel-left"},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("header",{},[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("img",{src:"/temple/temple-icon.png",alt:"Temple Logo"}),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("h3",{},[e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple"},[e.TempleRegistry.createText("Temple",!1)])]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("i",{class:"toggle fas fa-fw fa-chevron-left",click:n},[]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("h6",{},[e.TempleRegistry.createText("Introduction",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/index.html"},[e.TempleRegistry.createText("Documentation",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/getting-started.html"},[e.TempleRegistry.createText("Getting Started",!1)]),e.TempleRegistry.createText(`

    `,!1),e.TempleRegistry.createElement("h6",{},[e.TempleRegistry.createText("Features",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/markup-syntax.html"},[e.TempleRegistry.createText("Markup Syntax",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/state-management.html"},[e.TempleRegistry.createText("State Management",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/component-strategy.html"},[e.TempleRegistry.createText("Component Strategy",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/compiler-api.html"},[e.TempleRegistry.createText("Compiler API",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/client-api.html"},[e.TempleRegistry.createText("Client API",!1)]),e.TempleRegistry.createText(`

    `,!1),e.TempleRegistry.createElement("h6",{},[e.TempleRegistry.createText("Usage",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/template-engine.html"},[e.TempleRegistry.createText("Template Engine",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/single-page.html"},[e.TempleRegistry.createText("Single Page App",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/static-site.html"},[e.TempleRegistry.createText("Static Site Generator",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/component-publisher.html"},[e.TempleRegistry.createText("Component Publisher",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/developer-tools.html"},[e.TempleRegistry.createText("Developer Tools",!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(o("Client API"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple exposes a variable on the browser called 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleAPI",!1)]),e.TempleRegistry.createText(` that includes all the 
          components, classes, functions and variables used to render
          the document on the client-side. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,secondary:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-exclamation-triangle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Warning:",!1)]),e.TempleRegistry.createText(` Using the client API in the wrong 
          way could possibly break your client application.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"TempleAPI"}),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/compiler-api.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Compiler API")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/template-engine.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Template Engine")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(We);})();
