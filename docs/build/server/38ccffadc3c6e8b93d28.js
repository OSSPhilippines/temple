var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var c=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),se=(r,t)=>{for(var a in t)E(r,a,{get:t[a],enumerable:!0})},G=(r,t,a,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of re(t))!le.call(r,n)&&n!==a&&E(r,n,{get:()=>t[n],enumerable:!(l=te(t,n))||l.enumerable});return r};var J=(r,t,a)=>(a=r!=null?ee(ae(r)):{},G(t||!r||!r.__esModule?E(a,"default",{value:r,enumerable:!0}):a,r)),ne=r=>G(E({},"__esModule",{value:!0}),r);var D=c(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});var j=class extends Error{static for(t,...a){return a.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let a=new this("Invalid Parameters");return a.errors=t,a}static require(t,a,...l){if(!t){for(let n of l)a=a.replace("%s",n);throw new this(a)}}constructor(t,a=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=a}withCode(t){return this.code=t,this}withPosition(t,a){return this.start=t,this.end=a,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};O.default=j});var S=c(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});var P=class{constructor(t=[]){this._elements=new Set,t.forEach(a=>this._elements.add(a))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};M.default=P});var u=c(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var ce=new Map;q.default=ce});var b=c(m=>{"use strict";var ie=m&&m.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(S()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],C=class{static render(t){return t.filter(Boolean).map(a=>a.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,a={},l=[]){this._attributes={},this._name=t,this._attributes=a,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),a=t.length>0?" "+t.map(([n,f])=>{if(typeof f=="string")return`${n}="${f}"`;if(typeof f=="boolean")return f?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${a} />`;let l=this._children.toString();return`<${this._name}${a}>${l}</${this._name}>`}};m.default=C});var L=c(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});var A=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,a=!1){this._escape=a,this._value=t}toString(){return this.value}};I.default=A});var N=c(p=>{"use strict";var W=p&&p.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(p,"__esModule",{value:!0});var ue=W(L()),me=W(b()),$=class{static createElement(t,a,l=[]){return new me.default(t,a,l)}static createText(t,a=!0){return new ue.default(t,a)}};p.default=$});var V=c(h=>{"use strict";var y=h&&h.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(h,"__esModule",{value:!0});var pe=y(D()),k=y(u()),he=y(b()),de=y(N()),B=class{render(t={}){k.default.set("props",t||{}),k.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(k.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let a=this.template(),l=he.default.render(a).trim();if(!l.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(a=>typeof a=="object"&&typeof a.nodeType=="number")?t:[de.default.createText(String(t))]}};h.default=B});var Y=c(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var v=class{emit(t,a){return this}on(t,a){return this}once(t,a){return this}unbind(t,a){return this}};d.TempleEmitter=v;var Te=new v;d.default=Te});var z=c(T=>{"use strict";var _e=T&&T.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(T,"__esModule",{value:!0});var xe=_e(u());function ge(r){let t=xe.default.get("env")||{};return r?t[r]||null:t}T.default=ge});var U=c(_=>{"use strict";var Ee=_&&_.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(_,"__esModule",{value:!0});_.default=ye;var be=Ee(u());function ye(){return be.default.get("props")||{}}});var H=c(x=>{"use strict";var ve=x&&x.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(x,"__esModule",{value:!0});x.default=je;var we=ve(U());function je(){return(0,we.default)().class}});var K=c(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=Oe;function Oe(r){let t={getter:()=>a.raw,setter:l=>l},a={raw:r,getter(l){return t.getter=l,a},setter(l){return t.setter=l,a}};return Object.defineProperty(a,"value",{get(){return t.getter()},set(l){a.raw=t.setter(l)}}),a}});var X=c(s=>{"use strict";var De=s&&s.__createBinding||(Object.create?function(r,t,a,l){l===void 0&&(l=a);var n=Object.getOwnPropertyDescriptor(t,a);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(r,l,n)}:function(r,t,a,l){l===void 0&&(l=a),r[l]=t[a]}),Pe=s&&s.__setModuleDefault||(Object.create?function(r,t){Object.defineProperty(r,"default",{enumerable:!0,value:t})}:function(r,t){r.default=t}),Me=s&&s.__importStar||function(r){if(r&&r.__esModule)return r;var t={};if(r!=null)for(var a in r)a!=="default"&&Object.prototype.hasOwnProperty.call(r,a)&&De(t,r,a);return Pe(t,r),t},i=s&&s.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(s,"__esModule",{value:!0});s.TempleText=s.TempleException=s.TempleEmitter=s.TempleElement=s.TempleRegistry=s.TempleDocument=s.TempleCollection=s.signal=s.classnames=s.props=s.emitter=s.env=s.data=void 0;var Se=i(D());s.TempleException=Se.default;var qe=i(S());s.TempleCollection=qe.default;var Ce=i(V());s.TempleDocument=Ce.default;var Ae=i(N());s.TempleRegistry=Ae.default;var Ie=i(b());s.TempleElement=Ie.default;var Q=Me(Y());s.emitter=Q.default;Object.defineProperty(s,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Le=i(L());s.TempleText=Le.default;var $e=i(u());s.data=$e.default;var Ne=i(z());s.env=Ne.default;var ke=i(U());s.props=ke.default;var Be=i(H());s.classnames=Be.default;var Ue=i(K());s.signal=Ue.default});var F=c((at,Z)=>{Z.exports={...X()}});var Fe={};se(Fe,{default:()=>w});var e=J(F()),g=J(F());var o=function(r,...t){let a=Re(r);for(let l=0;l<t.length;l++)a=a.replace("%s",String(t[l]));return a},Re=function(r){return r};var w=class extends e.TempleDocument{id(){return"38ccffadc3c6e8b93d28"}styles(){return""}template(){let t="/docs/compiler-api.html",a=o("Compiler API - Temple reactive web component template engine."),l=o("Compiler documentation for Temple."),n=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},[...this._toNodeList(a)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:l}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:a}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:l}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:a}),e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(o("Compiler API"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The developer interface for the Temple compiler is designed 
          to be expressive and easily access the Temple library in most 
          scenarios. To create a new temple compiler you can follow the 
          code below.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:10},[e.TempleRegistry.createText(`
          import temple from '@ossph/temple';
          const compiler = temple();
        `,!1)]),e.TempleRegistry.createText(` 
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`  
          The `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("temple()",!1)]),e.TempleRegistry.createText(` 
          function itself takes in the following options, all of 
          which are optional.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"TempleOptions"}),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Calling `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("temple()")]),e.TempleRegistry.createText(` as in 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("compiler = temple({/*options*/})")]),e.TempleRegistry.createText(` 
          returns the Temple compiler which contains the following object.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("api-ui",{}),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/component-strategy.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Component Strategy")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/client-api.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Client API")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(Fe);})();
