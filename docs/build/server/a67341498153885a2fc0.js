var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var n=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)E(a,r,{get:t[r],enumerable:!0})},R=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of ae(t))!se.call(a,c)&&c!==r&&E(a,c,{get:()=>t[c],enumerable:!(s=te(t,c))||s.enumerable});return a};var F=(a,t,r)=>(r=a!=null?ee(re(a)):{},R(t||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a)),ce=a=>R(E({},"__esModule",{value:!0}),a);var D=n(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let c of s)r=r.replace("%s",c);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};k.default=j});var N=n(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var L=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};S.default=L});var m=n(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});var ie=new Map;P.default=ie});var v=n(f=>{"use strict";var ne=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=ne(N()),de=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],A=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([c,o])=>{if(typeof o=="string")return`${c}="${o}"`;if(typeof o=="boolean")return o?c:""}).join(" "):"";if(de.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};f.default=A});var I=n(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var O=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};q.default=O});var M=n(p=>{"use strict";var J=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var me=J(I()),fe=J(v()),C=class{static createElement(t,r,s=[]){return new fe.default(t,r,s)}static createText(t,r=!0){return new me.default(t,r)}};p.default=C});var G=n(u=>{"use strict";var y=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var pe=y(D()),$=y(m()),ue=y(v()),he=y(M()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(c=>c[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=ue.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};u.default=B});var Y=n(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.TempleEmitter=void 0;var _=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};h.TempleEmitter=_;var Te=new _;h.default=Te});var z=n(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var ge=xe(m());function be(a){let t=ge.default.get("env")||{};return a?t[a]||null:t}T.default=be});var H=n(x=>{"use strict";var Ee=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=ye;var ve=Ee(m());function ye(){return ve.default.get("props")||{}}});var V=n(g=>{"use strict";var _e=g&&g.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(g,"__esModule",{value:!0});g.default=je;var we=_e(H());function je(){return(0,we.default)().class}});var K=n(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.default=ke;function ke(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=n(l=>{"use strict";var De=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var c=Object.getOwnPropertyDescriptor(t,r);(!c||("get"in c?!t.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,c)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),Le=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Se=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&De(t,a,r);return Le(t,a),t},d=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var Ne=d(D());l.TempleException=Ne.default;var Pe=d(N());l.TempleCollection=Pe.default;var Ae=d(G());l.TempleDocument=Ae.default;var Oe=d(M());l.TempleRegistry=Oe.default;var qe=d(v());l.TempleElement=qe.default;var Q=Se(Y());l.emitter=Q.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ie=d(I());l.TempleText=Ie.default;var Ce=d(m());l.data=Ce.default;var Me=d(z());l.env=Me.default;var $e=d(H());l.props=$e.default;var Be=d(V());l.classnames=Be.default;var He=d(K());l.signal=He.default});var W=n((st,Z)=>{Z.exports={...X()}});var We={};le(We,{default:()=>w});var e=F(W()),b=F(W());var i=function(a,...t){let r=Ue(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},Ue=function(a){return a};var w=class extends e.TempleDocument{id(){return"a67341498153885a2fc0"}styles(){return""}template(){let t="/docs/getting-started.html",r=i("Getting Started - Temple reactive web component template engine."),s=i("How to install, setup and use Temple in a project."),c=Re=>{document.body.classList.toggle("panel-left-open")},o="https://github.com/OSSPhilippines/temple/tree/main/examples";return[e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("i",{class:"menu fas fa-fw fa-bars",click:c},[]),e.TempleRegistry.createText(`
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
    `,!1),e.TempleRegistry.createElement("i",{class:"toggle fas fa-fw fa-chevron-left",click:c},[]),e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("a",{href:"#http"},[...this._toNodeList(i("1. Add HTTP"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#develop"},[...this._toNodeList(i("2. Add Dev Tools"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#cache"},[...this._toNodeList(i("3. Add File Cache"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#tailwind"},[...this._toNodeList(i("4. Add TailwindCSS"))]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Getting Started"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To try out Temple, run the following commands in terminal: 
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npm init -y && npm install --save @ossph/temple && npm install --save-dev ts-node typescript @types/node
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Recommended:",!1)]),e.TempleRegistry.createText(`
          Download the Temple editor plugin at the `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:"https://marketplace.visualstudio.com/items?itemName=ossph.temple-language"},[e.TempleRegistry.createText("Visual Studio Marketplace",!1)]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Create a server file called
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("src/index.ts",!1)]),e.TempleRegistry.createText(` 
          with the following code that uses the compiler.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Last, create a document file called
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("src/page.dtml",!1)]),e.TempleRegistry.createText(` 
          with the following template code.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To try out the basic implementation of Temple and see the 
          results, just run the following command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"http"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("1. Add HTTP"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          In most cases Temple will be used to render a front end from 
          a server framework. In this example, we will use the native
          NodeJS HTTP module to create a server that renders a page
          using Temple. Start by replacing the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("'src/index.ts'")]),e.TempleRegistry.createText(`
          file with the following code. 
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,info:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-info-circle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Optional:",!1)]),e.TempleRegistry.createText(` You can also check your other 
          files to make sure you are following along.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:410,title:"With NodeJS HTTP"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"http",selector:"#index-ts"},[e.TempleRegistry.createText(`
                src/index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"http",selector:"#page-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"http",selector:"#package-json"},[e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"http",selector:"#index-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"http",selector:"#page-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"http",selector:"#package-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              package.json
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.3"
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To run your first Temple web app, just run the following 
          command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          You can now check 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
          in your browser to see your Temple application. The 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("temple()",!1)]),e.TempleRegistry.createText(` 
          function takes in the following options, all of 
          which are optional.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"TempleOptions"}),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The example above also uses two rendering methods
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("async compiler.asset()",!1)]),e.TempleRegistry.createText(` which 
          returns the rendered source code of a build file and 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("async compiler.render()",!1)]),e.TempleRegistry.createText(` which
          returns the rendered source code of a template file.
          The compiler provides several other methods for
          generating source code in JavaScript, CSS, and HTML.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"Render Methods"}),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"develop"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("2. Add Developer Tools"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple provides a separate package for a better development 
          experience when working with server frameworks that utilize 
          the native http module. Start by installing adding 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("@ossph/temple-dev")]),e.TempleRegistry.createText(`
          to your project.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npm install --save-dev @ossph/temple-dev
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Next, import the `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("dev()")]),e.TempleRegistry.createText(` 
          function from the package and use it in your existing 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(` 
          file to create a development server as shown in the example below.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Lastly, update the document file 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
          to include the development script 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList('<script src="/dev.js"></script>')]),e.TempleRegistry.createText(` 
          as shown below.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The project should now look like the example below.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:410,title:"With Developer Tools"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"develop",selector:"#index-ts"},[e.TempleRegistry.createText(`
                src/index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"develop",selector:"#page-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"develop",selector:"#package-json"},[e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"develop",selector:"#index-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"develop",selector:"#page-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"develop",selector:"#package-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              package.json
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.3"
                  },
                  "devDependencies": {
                    "@ossph/temple-dev": "0.1.3",
                    "@types/node": "22.1.0",
                    "ts-node": "10.9.2",
                    "typescript": "5.5.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Re-run the following command in terminal. It shouldn't look 
          like anything has changed, but the development server is now
          running in the background. Try to change
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Whenever `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` 
          is saved, the development server will automatically refresh 
          the page. Components will also be updated in real-time without
          the page reloading.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"cache"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("3. Add Cache Files"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple has an out-of-the-box cache and build strategy that
          can be used to store and serve pre-compiled files. To use the
          cache, you just need to import it from the 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("@ossph/temple/compiler")]),e.TempleRegistry.createText(` 
          module and use it like the following example.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(` 
          file should now look like the example below.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Re-run the following command in terminal to start the cache 
          server.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Load 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
          in your browser. After loading you should see files that were 
          generated in a new build folder found in your project root. 
          The `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("cache()",!1)]),e.TempleRegistry.createText(` plugin is 
          just a wrapper that listens for build related events and
          stores the generated files in the specified build path.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"cache.ts (Internal)"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          This means you can also use your own cache strategy by 
          listening to the events emitted by the compiler. The
          following table lists all the events that the compiler
          emits during the build cycle of a document.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"EventEmitter"}),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"tailwind"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(i("4. Add TailwindCSS"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Tailwind is an atomic CSS collection of styles that favours 
          small, single-purpose classes with their selector names based 
          on its visual function. It works by using a build process to
          read your source files to generate its styles based only on 
          what is being used. This makes using Tailwind optimal because
          it doesn't bloat your CSS with unused styles.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          At the same time, web components with the
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag imply using the 
          component's shadow DOM which will encapsulate the styles within
          the component and not be affected by global styles. Since 
          Tailwind in turn implies that you do not need to (necessarily) 
          define styles, you do not need to use the shadow DOM at all if
          you are using Tailwind.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{solid:!0,curved:!0,warning:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-exclamation-triangle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Warning:",!1)]),e.TempleRegistry.createText(`
          The caveat for using TailwindCSS, means that web components 
          using it will not be shippable to other projects that do not
          use Tailwind. It all comes down to preference in the end.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple has a separate package called
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},[...this._toNodeList("@ossph/temple-tailwind")]),e.TempleRegistry.createText(`
          to use TailwindCSS with Temple. This is just another wrapper 
          class that listens to the compiler's build events. You can 
          install this plugin by running the following command in terminal.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npm install --save-dev @ossph/temple-tailwind autoprefixer postcss tailwindcss
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Next, in `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},[...this._toNodeList("src/index.ts")]),e.TempleRegistry.createText(`
          import the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},[...this._toNodeList("tailwind()")]),e.TempleRegistry.createText(`
          plugin from the package and use it in the compiler as shown
          in the example below.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Lastly, in `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(`
          add the Tailwind directives inside the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(` tag like the code 
          below. Also add a tailwind class, (like 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0,lang:"js"},[...this._toNodeList("<style>")]),e.TempleRegistry.createText(`) to the 
          markup to verify that the plugin is working and the styles 
          are being applied.
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Check to see if the project files look like the example below.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:410,title:"With TailwindCSS"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"tailwind",selector:"#index-ts"},[e.TempleRegistry.createText(`
                src/index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"tailwind",selector:"#page-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"tailwind",selector:"#package-json"},[e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"tailwind",selector:"#index-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"tailwind",selector:"#page-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"tailwind",selector:"#package-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              package.json
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                {
                  "name": "my-project",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "ts-node ./src/index.ts"
                  },
                  "dependencies": {
                    "@ossph/temple": "0.1.3"
                  },
                  "devDependencies": {
                    "@ossph/temple-dev": "0.1.3",
                    "@ossph/temple-tailwind": "0.1.3",
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
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Re-run the following command in terminal to initialize the 
          tailwind plugin.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Load 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("http://localhost:3000/",!1)]),e.TempleRegistry.createText(` 
          in your browser. After loading you should see files that were 
          generated in a new build folder found in your project root. 
          Try to add a Tailwind class to the markup in
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("src/page.dtml")]),e.TempleRegistry.createText(` and 
          save. The development server will automatically refresh 
          the styles and component styles will also be update in 
          real-time without the page reloading.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("h3",{},[e.TempleRegistry.createText("-- ",!1),...this._toNodeList(i("Read On")),e.TempleRegistry.createText(" --",!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To see other getting started examples with various frameworks,
          you can check out the following project examples in the 
          official repository.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-express`},[e.TempleRegistry.createText(`
              ExpressJS
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-fastify`},[e.TempleRegistry.createText(`
              Fastify
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-hapi`},[e.TempleRegistry.createText(`
              Hapi
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-koa`},[e.TempleRegistry.createText(`
              Koa
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-nest`},[e.TempleRegistry.createText(`
              NestJS
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-restify`},[e.TempleRegistry.createText(`
              Restify
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:`${o}/with-webpack`},[e.TempleRegistry.createText(`
              Webpack
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(` 
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Depending on how you plan to use Temple, you can also look at 
          the following project setups.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/template-engine.html"},[e.TempleRegistry.createText(`
              Template Engine
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/single-page.html"},[e.TempleRegistry.createText(`
              Single Page App
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/static-site.html"},[e.TempleRegistry.createText(`
              Static Site Generator
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{href:"/temple/docs/component-publisher.html"},[e.TempleRegistry.createText(`
              Web Component Publisher
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/index.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Documentation")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/markup-syntax.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Markup Syntax")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ce(We);})();
