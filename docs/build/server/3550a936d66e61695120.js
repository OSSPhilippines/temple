var TempleAPI=(()=>{var ee=Object.create;var b=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var n=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)b(a,r,{get:t[r],enumerable:!0})},R=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of ae(t))!se.call(a,c)&&c!==r&&b(a,c,{get:()=>t[c],enumerable:!(s=te(t,c))||s.enumerable});return a};var F=(a,t,r)=>(r=a!=null?ee(re(a)):{},R(t||!a||!a.__esModule?b(r,"default",{value:a,enumerable:!0}):r,a)),ce=a=>R(b({},"__esModule",{value:!0}),a);var P=n(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let c of s)r=r.replace("%s",c);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};k.default=j});var S=n(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var O=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};D.default=O});var p=n(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});var ne=new Map;M.default=ne});var E=n(m=>{"use strict";var ie=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(S()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],q=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([c,f])=>{if(typeof f=="string")return`${c}="${f}"`;if(typeof f=="boolean")return f?c:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};m.default=q});var C=n(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var A=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};L.default=A});var I=n(u=>{"use strict";var G=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var pe=G(C()),me=G(E()),N=class{static createElement(t,r,s=[]){return new me.default(t,r,s)}static createText(t,r=!0){return new pe.default(t,r)}};u.default=N});var J=n(d=>{"use strict";var v=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var ue=v(P()),$=v(p()),de=v(E()),he=v(I()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(c=>c[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=de.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw ue.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};d.default=B});var Y=n(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.TempleEmitter=void 0;var w=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};h.TempleEmitter=w;var Te=new w;h.default=Te});var V=n(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var ge=xe(p());function _e(a){let t=ge.default.get("env")||{};return a?t[a]||null:t}T.default=_e});var U=n(x=>{"use strict";var be=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=ve;var Ee=be(p());function ve(){return Ee.default.get("props")||{}}});var z=n(g=>{"use strict";var we=g&&g.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(g,"__esModule",{value:!0});g.default=je;var ye=we(U());function je(){return(0,ye.default)().class}});var K=n(W=>{"use strict";Object.defineProperty(W,"__esModule",{value:!0});W.default=ke;function ke(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=n(l=>{"use strict";var Pe=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var c=Object.getOwnPropertyDescriptor(t,r);(!c||("get"in c?!t.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,c)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),Oe=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),De=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&Pe(t,a,r);return Oe(t,a),t},i=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var Se=i(P());l.TempleException=Se.default;var Me=i(S());l.TempleCollection=Me.default;var qe=i(J());l.TempleDocument=qe.default;var Ae=i(I());l.TempleRegistry=Ae.default;var Le=i(E());l.TempleElement=Le.default;var Q=De(Y());l.emitter=Q.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ce=i(C());l.TempleText=Ce.default;var Ne=i(p());l.data=Ne.default;var Ie=i(V());l.env=Ie.default;var $e=i(U());l.props=$e.default;var Be=i(z());l.classnames=Be.default;var Ue=i(K());l.signal=Ue.default});var H=n((rt,Z)=>{Z.exports={...X()}});var He={};le(He,{default:()=>y});var e=F(H()),_=F(H());var o=function(a,...t){let r=We(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},We=function(a){return a};var y=class extends e.TempleDocument{id(){return"3550a936d66e61695120"}styles(){return""}template(){let t="/docs/single-page.html",r=o("Single Page App - Temple reactive web component template engine."),s=o("How to use Temple to develop single page apps."),c=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,_.env)("BUILD_ID")}.css`}),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,_.env)("APP_DATA"),src:`/temple/build/client/${(0,_.env)("BUILD_ID")}.js`}),e.TempleRegistry.createText(`
  `,!1),...(0,_.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("script",{src:"/dev.js"}),e.TempleRegistry.createText(`
  `,!1)]:[],e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("body",{class:"dark panel with-head with-left"},[e.TempleRegistry.createText(`
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
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(o("Single Page App"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          A single page application (SPA) is a website or web 
          application that dynamically rewrites a current web page with 
          new data from a web server, instead of the default method of 
          a web browser loading entire new pages. Temple is capable of 
          creating reactive SPAs using Webpack and TypeScript.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          First install the following Temple packages.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
          npm install --save-dev @ossph/temple @ossph/temple-loader
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Then, install the following TypeScript packages.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
          npm install --save-dev @types/node ts-loader ts-node typescript
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Then, install the following Webpack packages.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
          npm install --save-dev html-webpack-plugin webpack-dev-server webpack webpack-cli
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Next create the following files and directories.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{panel:400,title:"My Project"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#client-ts"},[e.TempleRegistry.createText(`
                src/client.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#app-tml"},[e.TempleRegistry.createText(`
                src/app.tml
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#index-html"},[e.TempleRegistry.createText(`
                index.html
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"project",selector:"#webpack-js"},[e.TempleRegistry.createText(`
                webpack.config.js
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#tsconfig-json"},[e.TempleRegistry.createText(`
                tsconfig.json
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#package-json"},[e.TempleRegistry.createText(`
                package.json
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-left"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("src",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"project",selector:"#app-tml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              app.tml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"project",selector:"#client-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              client.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"project",selector:"#index-html"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.html
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"project",selector:"#package-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              package.json
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"project",selector:"#tsconfig-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              tsconfig.json
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block active",group:"project",selector:"#webpack-js"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              webpack.config.js
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"client-ts",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                import TempleComponent from './app.tml';

                TempleComponent.register();
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"app-tml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <script>
                  const title = 'Single Page App';
                </script>
                <h1>{title}</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-html",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, Helvetica, sans-serif;
                        margin: 0;
                        padding: 0;
                        width: 100vw;
                        height: 100vh;
                      }
                    </style>
                  </head>
                  <body>
                    <temple-app></temple-app>
                  </body>
                </html>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"webpack-js",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                const path = require('path');
                const HtmlWebpackPlugin = require('html-webpack-plugin');

                module.exports = {
                  // https://webpack.js.org/concepts/entry-points/#multi-page-application
                  entry: {
                    index: './src/client.ts'
                  },
                  output: {
                    path: path.resolve(__dirname, './dist'),
                    filename: '[name].bundle.js',
                  },
                  module: {
                    rules: [
                      {
                        test: /.tml$/,
                        use: {
                          loader: '@ossph/temple-loader',
                          options: { minify: false }
                        },
                        exclude: /node_modules/,
                      },
                      {
                        test: /.ts$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                      },
                    ],
                  },
                  resolve: {
                    extensions: ['.js', '.ts', '.tml'],
                  },
                  // https://webpack.js.org/configuration/dev-server/
                  devServer: {
                    port: 8080
                  },
                  plugins: [
                    new HtmlWebpackPlugin({
                      title: 'Temple',
                      template: "index.html",
                    })
                  ]
                };
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"tsconfig-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                {
                  "compilerOptions": {
                    "declaration": true,
                    "esModuleInterop": true,
                    "lib": [ "es2021", "es7", "es6", "dom" ],
                    "module": "commonjs",
                    "noUnusedLocals": true,
                    "outDir": "./dist/",
                    "preserveConstEnums": true,
                    "resolveJsonModule": true,
                    "removeComments": true,
                    "sourceMap": false,
                    "strict": true,
                    "target": "es6",
                    "skipLibCheck": true
                  },
                  "include": [ 
                    "src/**/*.ts", 
                    "@ossph/temple/types"
                  ],
                  "exclude": [ "dist", "node_modules" ]
                }
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"package-json",style:"display:none",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                {
                  "name": "my-spa",
                  "version": "1.0.0",
                  "private": true,
                  "scripts": {
                    "dev": "webpack-dev-server --mode development",
                    "build": "webpack --mode production"
                  },
                  "devDependencies": {
                    "@ossph/temple": "0.1.4"
                    "@ossph/temple-loader": "0.1.4",
                    "@types/node": "22.1.0",
                    "html-webpack-plugin": "5.6.0",
                    "webpack-dev-server": "5.0.4",
                    "ts-loader": "9.5.1",
                    "ts-node": "10.9.2",
                    "typescript": "5.4.5",
                    "webpack": "5.91.0",
                    "webpack-cli": "5.1.4"
                  }
                }
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To test the SPA and see the results, run the following command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npm run dev
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/template-engine.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Template Engine")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/static-site.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Static Site Generator")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ce(He);})();
