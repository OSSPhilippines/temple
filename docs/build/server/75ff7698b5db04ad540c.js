var TempleAPI=(()=>{var ee=Object.create;var g=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var i=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),se=(a,t)=>{for(var r in t)g(a,r,{get:t[r],enumerable:!0})},F=(a,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!le.call(a,n)&&n!==r&&g(a,n,{get:()=>t[n],enumerable:!(l=te(t,n))||l.enumerable});return a};var J=(a,t,r)=>(r=a!=null?ee(re(a)):{},F(t||!a||!a.__esModule?g(r,"default",{value:a,enumerable:!0}):r,a)),ce=a=>F(g({},"__esModule",{value:!0}),a);var k=i(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var D=class extends Error{static for(t,...r){return r.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...l){if(!t){for(let n of l)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};L.default=D});var P=i(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});var N=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};A.default=N});var m=i(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var ne=new Map;S.default=ne});var y=i(p=>{"use strict";var ie=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var oe=ie(P()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],O=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},l=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,f])=>{if(typeof f=="string")return`${n}="${f}"`;if(typeof f=="boolean")return f?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let l=this._children.toString();return`<${this._name}${r}>${l}</${this._name}>`}};p.default=O});var M=i(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});var j=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};I.default=j});var q=i(d=>{"use strict";var R=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var me=R(M()),pe=R(y()),C=class{static createElement(t,r,l=[]){return new pe.default(t,r,l)}static createText(t,r=!0){return new me.default(t,r)}};d.default=C});var Y=i(h=>{"use strict";var _=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var de=_(k()),U=_(m()),he=_(y()),ue=_(q()),B=class{render(t={}){U.default.set("props",t||{}),U.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(U.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),l=he.default.render(r).trim();if(!l.toLowerCase().startsWith("<html"))throw de.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[ue.default.createText(String(t))]}};h.default=B});var G=i(u=>{"use strict";Object.defineProperty(u,"__esModule",{value:!0});u.TempleEmitter=void 0;var v=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};u.TempleEmitter=v;var Te=new v;u.default=Te});var V=i(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var Ee=xe(m());function be(a){let t=Ee.default.get("env")||{};return a?t[a]||null:t}T.default=be});var $=i(x=>{"use strict";var ge=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=_e;var ye=ge(m());function _e(){return ye.default.get("props")||{}}});var z=i(E=>{"use strict";var ve=E&&E.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(E,"__esModule",{value:!0});E.default=De;var we=ve($());function De(){return(0,we.default)().class}});var K=i(W=>{"use strict";Object.defineProperty(W,"__esModule",{value:!0});W.default=Le;function Le(a){let t={getter:()=>r.raw,setter:l=>l},r={raw:a,getter(l){return t.getter=l,r},setter(l){return t.setter=l,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(l){r.raw=t.setter(l)}}),r}});var X=i(s=>{"use strict";var ke=s&&s.__createBinding||(Object.create?function(a,t,r,l){l===void 0&&(l=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,l,n)}:function(a,t,r,l){l===void 0&&(l=r),a[l]=t[r]}),Ne=s&&s.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Ae=s&&s.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&ke(t,a,r);return Ne(t,a),t},o=s&&s.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(s,"__esModule",{value:!0});s.TempleText=s.TempleException=s.TempleEmitter=s.TempleElement=s.TempleRegistry=s.TempleDocument=s.TempleCollection=s.signal=s.classnames=s.props=s.emitter=s.env=s.data=void 0;var Pe=o(k());s.TempleException=Pe.default;var Se=o(P());s.TempleCollection=Se.default;var Oe=o(Y());s.TempleDocument=Oe.default;var je=o(q());s.TempleRegistry=je.default;var Ie=o(y());s.TempleElement=Ie.default;var Q=Ae(G());s.emitter=Q.default;Object.defineProperty(s,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Me=o(M());s.TempleText=Me.default;var Ce=o(m());s.data=Ce.default;var qe=o(V());s.env=qe.default;var Ue=o($());s.props=Ue.default;var Be=o(z());s.classnames=Be.default;var $e=o(K());s.signal=$e.default});var H=i((rt,Z)=>{Z.exports={...X()}});var He={};se(He,{default:()=>w});var e=J(H()),b=J(H());var c=function(a,...t){let r=We(a);for(let l=0;l<t.length;l++)r=r.replace("%s",String(t[l]));return r},We=function(a){return a};var w=class extends e.TempleDocument{id(){return"75ff7698b5db04ad540c"}styles(){return""}template(){let t="/docs/component-strategy.html",r=c("Component Strategy - Temple reactive web component template engine."),l=c("Learn more about web components and how they work with Temple."),n=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,b.env)("BUILD_ID")}.css`}),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,b.env)("APP_DATA"),src:`/temple/build/client/${(0,b.env)("BUILD_ID")}.js`}),e.TempleRegistry.createText(`
  `,!1),...(0,b.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("script",{src:"/dev.js"}),e.TempleRegistry.createText(`
  `,!1)]:[],e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("body",{class:"dark panel with-head with-left with-right"},[e.TempleRegistry.createText(`
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
    `,!1),e.TempleRegistry.createElement("aside",{class:"panel-right right"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("h6",{},[...this._toNodeList(c("On this page"))]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#document"},[...this._toNodeList(c("Document"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#template"},[...this._toNodeList(c("Template"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#component"},[...this._toNodeList(c("Component"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#strat-1"},[...this._toNodeList(c("Strategy 1"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#strat-2"},[...this._toNodeList(c("Strategy 2"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#strat-3"},[...this._toNodeList(c("Strategy 3"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#strat-4"},[...this._toNodeList(c("Strategy 4"))]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#fouc"},[...this._toNodeList(c("FOUC"))]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(c("Component Strategy"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
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

        `,!1),e.TempleRegistry.createElement("a",{name:"document"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(c("Document"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          A document denoted by files with the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText(".dtml",!1)]),e.TempleRegistry.createText(` extension, is the root of
          each page view that should include the document markup 
          starting with `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<html>")]),e.TempleRegistry.createText(`. While 
          it looks like another Temple component, there are some key 
          differences in how it is used.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              A document logic (`,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<script>")]),e.TempleRegistry.createText(`)
              is executed on the client side but is not a 
              `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(`, which means 
              it cannot be re-rendered and does not have access to 
              `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(` context.
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              A document `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("props()")]),e.TempleRegistry.createText(` are the 
              server props passed down to the client.
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              A document does not have access to NodeJS functionality. So 
              things like `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("fs",!1)]),e.TempleRegistry.createText(` are not available.
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Recommendation:",!1)]),e.TempleRegistry.createText(` You should do server related
          logic on the server framework and pass the neccesary data 
          to the client.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:250,title:"Passing Server Props"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"document",selector:"#index-ts"},[e.TempleRegistry.createText(`
                src/index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"document",selector:"#page-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"document",selector:"#index-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"document",selector:"#page-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"template"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(c("Template"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          A template is resuable partial markup that can be imported by 
          a component, document or another template. A template is 
          not is not a `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(`, but 
          rather adds its markup to the parent component's final markup.
          You will not see a template in the DOM, but rather the
          markup it contains.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          For example, consider a document that contains the following 
          markup.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can create a template for the head of your
          document and then import it. This allows you to
          reuse the head markup in multiple documents.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:250,title:"Using Templates"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"templates",selector:"#page2-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"templates",selector:"#head-tml"},[e.TempleRegistry.createText(`
                src/head.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"templates",selector:"#page2-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"templates",selector:"#head-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              head.tml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page2-dtml",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"head-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>
                </head>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Note:",!1)]),e.TempleRegistry.createText(` Template partials do not process 
          attributes or children if given.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Variables used in a template should be declared in the
          parent component or document. This allows you to pass
          data to the template from the parent.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"component"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(c("Component"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          All temple components are 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` that extends
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(` and therefore is 
          both a web component and element just like any other element 
          in the browser DOM. Components that do not use the
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag are affected by 
          the global styles of the application. Components with the
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag enable the 
          component's shadow DOM and will encapsulate the styles within
          the component and not be affected by global styles. With that 
          said, there are several strategies that can be applied to 
          Temple components.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"strat-1"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(c("Strategy 1: No Components"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This strategy uses only documents and templates. This 
          strategy is useful for simple applications that do not require 
          complex UI elements. This is the best strategy for 
          performant applications.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"No Components"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"strat-1",selector:"#page3-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-1",selector:"#head3-tml"},[e.TempleRegistry.createText(`
                src/head.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-1",selector:"#header3-tml"},[e.TempleRegistry.createText(`
                src/header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-1",selector:"#footer3-tml"},[e.TempleRegistry.createText(`
                src/footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"strat-1",selector:"#page3-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-1",selector:"#head3-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              head.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-1",selector:"#header3-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              header.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-1",selector:"#footer3-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              footer.tml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page3-dtml",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"head3-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>

                  <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                  <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                </head>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"header3-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <header>
                  <img src="/logo.png" alt="Logo" />
                  <h6>Brand</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"footer3-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025</copy>
                </footer>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"strat-2"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(c("Strategy 2: Shallow Components"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This strategy uses components that do not have a 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag and is useful for 
          applications that require complex logic in components but 
          using a shared global stylesheet.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"Shallow Components"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"strat-2",selector:"#page4-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-2",selector:"#header4-tml"},[e.TempleRegistry.createText(`
                src/header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-2",selector:"#footer4-tml"},[e.TempleRegistry.createText(`
                src/footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"strat-2",selector:"#page4-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-2",selector:"#header4-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              header.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-2",selector:"#footer4-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              footer.tml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page4-dtml",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"header4-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"footer4-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"strat-3"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(c("Strategy 3: Partial Styling"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This strategy uses components that do not have a 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag,
          but imports style via the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<link>")]),e.TempleRegistry.createText(` tag to utilize both 
          global styles and specific styles that are needed for the
          component. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"Shallow Components"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-3",selector:"#page5-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"strat-3",selector:"#header5-tml"},[e.TempleRegistry.createText(`
                src/header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-3",selector:"#footer5-tml"},[e.TempleRegistry.createText(`
                src/footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-3",selector:"#page5-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"strat-3",selector:"#header5-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              header.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-3",selector:"#footer5-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              footer.tml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page5-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"header5-tml",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"footer5-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"strat-4"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(c("Strategy 4: Encapulation"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This strategy uses components that have a
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag and encapsulates
          the styles within the component. This strategy is useful for
          applications that require complex UI elements that need to be
          styled in a specific way. This is also useful for components 
          that are designed to be used in multiple projects.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"Encapsulation"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-4",selector:"#page6-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"strat-4",selector:"#header6-tml"},[e.TempleRegistry.createText(`
                src/header.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"strat-4",selector:"#footer6-tml"},[e.TempleRegistry.createText(`
                src/footer.tml
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-4",selector:"#page6-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"strat-4",selector:"#header6-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              header.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"strat-4",selector:"#footer6-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              footer.tml
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page6-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"header6-tml",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"footer6-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"fouc"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(c("Flash of Unstyled Content"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          A flash of unstyled content (FOUC) can cause irritating layout 
          shifts as well as reveal content that should have been 
          progressively disclosed. In order to prevent a reflow of other 
          content you can add the following general solution to your 
          global stylesheet.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"css",numbers:!0,detab:10},[...this._toNodeList(`
          *:not(:defined) {
            opacity: 0;
          }
        `)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This style will apply to all elements that are not defined,
          which are usually web components and will hide the content 
          until the browser has fully rendered the component.
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/state-management.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(c("State Management")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/compiler-api.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(c("Compiler API")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ce(He);})();
