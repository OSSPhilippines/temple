var TempleAPI=(()=>{var ee=Object.create;var _=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)_(a,r,{get:t[r],enumerable:!0})},W=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!se.call(a,n)&&n!==r&&_(a,n,{get:()=>t[n],enumerable:!(s=te(t,n))||s.enumerable});return a};var H=(a,t,r)=>(r=a!=null?ee(re(a)):{},W(t||!a||!a.__esModule?_(r,"default",{value:a,enumerable:!0}):r,a)),ie=a=>W(_({},"__esModule",{value:!0}),a);var k=c(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var w=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let n of s)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};N.default=w});var O=c(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var j=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};S.default=j});var m=c(C=>{"use strict";Object.defineProperty(C,"__esModule",{value:!0});var ne=new Map;C.default=ne});var g=c(f=>{"use strict";var ce=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=ce(O()),ue=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],M=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,u])=>{if(typeof u=="string")return`${n}="${u}"`;if(typeof u=="boolean")return u?n:""}).join(" "):"";if(ue.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};f.default=M});var I=c(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});var D=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};P.default=D});var A=c(d=>{"use strict";var J=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var me=J(I()),fe=J(g()),q=class{static createElement(t,r,s=[]){return new fe.default(t,r,s)}static createText(t,r=!0){return new me.default(t,r)}};d.default=q});var R=c(h=>{"use strict";var y=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var de=y(k()),$=y(m()),he=y(g()),pe=y(A()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=he.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw de.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[pe.default.createText(String(t))]}};h.default=B});var V=c(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.TempleEmitter=void 0;var v=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};p.TempleEmitter=v;var Te=new v;p.default=Te});var z=c(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var Ee=xe(m());function be(a){let t=Ee.default.get("env")||{};return a?t[a]||null:t}T.default=be});var F=c(x=>{"use strict";var _e=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=ye;var ge=_e(m());function ye(){return ge.default.get("props")||{}}});var G=c(E=>{"use strict";var ve=E&&E.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(E,"__esModule",{value:!0});E.default=we;var Le=ve(F());function we(){return(0,Le.default)().class}});var K=c(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.default=Ne;function Ne(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=c(l=>{"use strict";var ke=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,n)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),je=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Se=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&ke(t,a,r);return je(t,a),t},o=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var Oe=o(k());l.TempleException=Oe.default;var Ce=o(O());l.TempleCollection=Ce.default;var Me=o(R());l.TempleDocument=Me.default;var De=o(A());l.TempleRegistry=De.default;var Pe=o(g());l.TempleElement=Pe.default;var Q=Se(V());l.emitter=Q.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ie=o(I());l.TempleText=Ie.default;var qe=o(m());l.data=qe.default;var Ae=o(z());l.env=Ae.default;var $e=o(F());l.props=$e.default;var Be=o(G());l.classnames=Be.default;var Fe=o(K());l.signal=Fe.default});var Y=c((rt,Z)=>{Z.exports={...X()}});var Ye={};le(Ye,{default:()=>L});var e=H(Y()),b=H(Y());var i=function(a,...t){let r=Ue(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},Ue=function(a){return a};var L=class extends e.TempleDocument{id(){return"57e37fa233b38c87fe71"}styles(){return""}template(){let t="/docs/markup-syntax.html",r=i("Markup Syntax - Temple reactive web component template engine."),s=i("Learn how to write markup in Temple."),n=u=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},[...this._toNodeList(r)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:s}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:r}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:s}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:r}),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:s}),e.TempleRegistry.createText(`
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
      `,!1),e.TempleRegistry.createElement("h6",{},[...this._toNodeList(i("On this page"))]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#imports"},[...this._toNodeList(i("Imports"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#styles"},[...this._toNodeList(i("Styles"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#scripts"},[...this._toNodeList(i("Scripts"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#markup"},[...this._toNodeList(i("Markup"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#tagnames"},[...this._toNodeList(i("Tag Names"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#attributes"},[...this._toNodeList(i("Attributes"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#conditionals"},[...this._toNodeList(i("Conditionals"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#iterations"},[...this._toNodeList(i("Iterations"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"#trycatch"},[...this._toNodeList(i("Try/Catch"))]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Markup Syntax"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Components are the building blocks of Temple files. Documents 
          and page level markup are written in 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText(".dtml",!1)]),e.TempleRegistry.createText(` files. Components 
          and templates are written in 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText(".tml",!1)]),e.TempleRegistry.createText(` files. In both 
          cases, the code is written in a superset of HTML.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The four sections that make up a temple file \u2014 imports, 
          script, styles and markup \u2014 are all optional and can be 
          used in any order.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Code Structure"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,detab:12},[...this._toNodeList(`
            <!-- imports go here -->

            <style>
              /* styles go here */
            </style>

            <script>
              // logic goes here
            </script>
            
            <!-- HTML goes here -->
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"imports"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("Imports"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Imports are used to include additional components, templates 
          and stylesheets in the current component. Components can 
          be imported as a `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("template",!1)]),e.TempleRegistry.createText(` or 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("component",!1)]),e.TempleRegistry.createText(` type.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Import Examples"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/prism.min.css" />
            <link rel="stylesheet" type="text/css" href="/styles/layout.css" />
            <link rel="import" type="template" href="@/modules/html-head.tml" />
            <link rel="import" type="component" href="@/modules/i18n/translate.tml" name="i18n-translate" />

            <style>
              /* styles go here */
            </style>

            <script>
              // logic goes here
            </script>
            
            <!-- HTML goes here -->
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("rel",!1)]),e.TempleRegistry.createText(` attribute 
          specifies the relationship between the current document and 
          the linked resource. 
          
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText('rel="import"',!1)]),e.TempleRegistry.createText(` denotes
          that the imported resource is a component or template.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("type",!1)]),e.TempleRegistry.createText(` 
          attribute specifies the type of the linked resource. 
          
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText('type="component"',!1)]),e.TempleRegistry.createText(` 
          imports a web component that can be used as regular markup
          with attributes and children. 
          
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText('type="template"',!1)]),e.TempleRegistry.createText(` 
          imports a template partial that can be included in the current 
          markup. Template partials do not process attributes or children
          if given.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("href",!1)]),e.TempleRegistry.createText(` attribute specifies
          the URL of the linked resource. The 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("name",!1)]),e.TempleRegistry.createText(`
          attribute specifies the tag name of the imported component or template.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"styles"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("Styles"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          CSS styles inside a `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` 
          block enables the native `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM"},[e.TempleRegistry.createText("shadow DOM",!1)]),e.TempleRegistry.createText(` and will be scoped only to that component. 
          Additionally styles defined outside of the component such as 
          global styles will not affect the component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          External stylesheets can be imported using the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<link>")]),e.TempleRegistry.createText(` tag or using 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("@import()")]),e.TempleRegistry.createText(` CSS directive. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can use host selectors to style an element from within 
          a component. The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList(":host")]),e.TempleRegistry.createText(` 
          pseudo-class always applies styles to the root element of the 
          web component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Using :host"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <style>
              :host {
                display: block;
              }
            </style>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can also add conditional styles using the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList(":host")]),e.TempleRegistry.createText(` selector function. 
          This can be used to style the host so long as it matches the 
          given selector. For example, it can be used to select for 
          hosts that have a given attribute or class.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:":host Conditionals"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <style>
              :host([active]) {
                background-color: #333;
                color: #FFF;
              }
              :host(.active) {
                background-color: #333;
                color: #FFF;
              }
            </style>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"scripts"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("Scripts"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<script>")]),e.TempleRegistry.createText(` block is used 
          to write TypeScript logic for the component. The script block 
          can be used to define variables, functions, and event listeners.
          Variables declared (or imported) at the top level are 
          'visible' from the component's markup. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Top-Level Variables"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <script>
              const title = 'Hello World';
            </script>

            <h1>{title}</h1>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<script>")]),e.TempleRegistry.createText(` block can also 
          be used to import variables from other components to be used
          in the markup.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Importing Files"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <script>
              import getTitle from './getTitle';
              const title = getTitle();
            </script>

            <h1 title={title}>{title}</h1>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can use `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("@/")]),e.TempleRegistry.createText(` to prefix the 
          current working directory. This is useful when importing
          files completely in a separate directory in your project
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"@ Imports"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <script>
              import getTitle from '@/data/getTitle';
              const title = getTitle();
            </script>

            <h1 title={title}>{title}</h1>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"markup"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("Markup"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          In order to be closer to the native, Temple follows the same 
          standards and conventions as HTML5 web components. Temple 
          components are compiled to native web components that possibly 
          can be used in other projects any modern browser.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"tagnames"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Tag Names"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Tag names must have at least one dash (-) in them. As such 
          you probably want to name your element with two distinct words 
          like `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("i18n-translate")]),e.TempleRegistry.createText(`. You can 
          use as many dashes as you want, you're not limited to one. 
          Some specific rules to follow in order to make a valid tag 
          name:
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            It must use all lowercase characters of the alphabet (a-z).
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            t must contain at least one dash (-).
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            It must not be an already reserved tag name including 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("annotation-xml",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("color-profile",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("font-face",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("font-face-src",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("font-face-uri",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("font-face-format",!1)]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("font-face-name",!1)]),e.TempleRegistry.createText(`, and 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("missing-glyph",!1)]),e.TempleRegistry.createText(`.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            It must not contain symbols, like =, @, $.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            It can contain underscores, and numbers.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            It can contain characters from different alphabets, 
            such as \xE9, \xF0, \xF6, \u7231.
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Additionally, Temple works best with correct markup. The 
          following standards should be followed:
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            Self closing tags like 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<img />")]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<link />")]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<meta />")]),e.TempleRegistry.createText(`,
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<input />")]),e.TempleRegistry.createText(`
            must have a slash before the closing.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            When using tables, rows should be wrapped in a 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<tbody>")]),e.TempleRegistry.createText(` tag and cells
            should be wrapped in a `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<tr>")]),e.TempleRegistry.createText(` 
            tag. ie. `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<table><tbody><tr><td>")]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{li:!0,trim:!0},[e.TempleRegistry.createText(`
            When using lists, items should be wrapped in a 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<ul>")]),e.TempleRegistry.createText(` or 
            `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<ol>")]),e.TempleRegistry.createText(` tags.
            ie. `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<ul><li>")]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,secondary:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-exclamation-triangle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Warning:",!1)]),e.TempleRegistry.createText(` Any markup auto corrected by browser will cause data syncing 
          issues with Temple.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple components can loosely be self closing
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<i18n-translate />")]),e.TempleRegistry.createText(`
          or expressed as a block
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<i18n-translate></i18n-translate>")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"attributes"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Attributes"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Markup Expressions"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <a title={title} {href} {...attributes}>
              {title}
            </a>
            <i18n-translate title=title>
              {detail}
            </i18n-translate>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Attributes can be bound to expressions using the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("{}")]),e.TempleRegistry.createText(` syntax. 
          Expressions can be variables, functions, or any valid 
          JavaScript expression. By default, attributes work exactly 
          like their HTML counterparts.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <button type="button" disabled>Submit</button>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Traditional HTML attributes can be assigned string values or 
          no value evaluates as `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("true")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <a title={title}>Click</a>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Attributes can be assigned variable names.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <a title=title>Click</a>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Variable names do not need to be wrapped in curly braces
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("{}")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <a {title}>Click</a>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Attributes with the same name as a variable can be assigned
          by just wrapping curly braces. ie. 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("{title}")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <script>
            const attributes = { target: '_blank' };
          </script>
          <a {...attributes}>Click</a>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Spread operators can be used to assign multiple attributes.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:10},[...this._toNodeList(`
          <script>
            let count = 10
            const metadata = { foo: 'bar', baz: 1, qux: true };
            const data = () => metadata
          </script>
          <a {count} get={data} data-meta={metadata} disable={count < 10}>
            Click
          </a>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can assign any valid JavaScript expression to an attribute.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"conditionals"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Conditionals"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Conditionals"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <if true={count > 10}>
              <p>Count is greater than 10</p>
            <elif true={count < 5} />
              <p>Count is less than 5</p>
            <else />
              <p>Count is between 5 and 10</p>
            </if>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Conditionals can be used to show or hide elements based on 
          the value of a variable.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <if true={count > 10}>
            <p>Count is greater than 10</p>
          </if>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The basic syntax for an if statement looks like this and can be 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("truesy")]),e.TempleRegistry.createText(` or 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("falsey")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <if false={count > 10}>
            <p>Count is not greater than 10</p>
          </if>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can also use the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("false")]),e.TempleRegistry.createText(`
          attribute to negate the condition.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <if true={count > 10}>
            <p>Count is greater than 10</p>
          <else />
            <p>Count is less than or equal to 10</p>
          </if>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can use the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("else")]),e.TempleRegistry.createText(` block to 
          show content when the condition is false.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <if true={count > 10}>
            <p>Count is greater than 10</p>
          <elif true={count < 5} />
            <p>Count is less than 5</p>
          </if>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can use the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("elif")]),e.TempleRegistry.createText(` block to 
          show content when the previous condition is false.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"iterations"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Iterations"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Each"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <each key=index value=article from=articles>
              <h1>#{index + 1} {article.title}</h1>
              <p>{article.body}</p>
            </each>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<each>")]),e.TempleRegistry.createText(` block can be used 
          to iterate over an array of items or objects.
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("from")]),e.TempleRegistry.createText(` attribute value is 
          required and can be an array, object or JavaScript expression 
          that evaluates to an array or object. Both the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("key")]),e.TempleRegistry.createText(` and 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("value")]),e.TempleRegistry.createText(` attributes are optional.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <each value={article} from={articles}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
          </each>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The value of `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("value")]),e.TempleRegistry.createText(`, in this 
          case `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("article")]),e.TempleRegistry.createText(` can be used 
          only with in the block. This can be any valid JavaScript 
          variable name.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
          <each key={index} from={[1, 2, 3]}>
            <h1>#{index} ???</h1>
          </each>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The value of `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("key")]),e.TempleRegistry.createText(`, in this 
          case `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("index")]),e.TempleRegistry.createText(` can be used 
          only with in the block. This can be any valid JavaScript 
          variable name.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"trycatch"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Try/Catch"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Try/Catch Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            <try>
              <p>{mayCauseError()}</p>
            <catch error={e} />
              <p>Error: {e.message}</p>
            </try>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<try><catch>")]),e.TempleRegistry.createText(` block can 
          be used to catch errors that occur in the block. The 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<catch>")]),e.TempleRegistry.createText(` block is required and 
          can be used to handle the error.

          The value of `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("error")]),e.TempleRegistry.createText(`, in the  
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<catch>")]),e.TempleRegistry.createText(` block in this case
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("e")]),e.TempleRegistry.createText(` is an 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("Error")]),e.TempleRegistry.createText(` object
          that can only be used with in the block. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/getting-started.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Getting Started")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/state-management.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("State Management")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ie(Ye);})();
