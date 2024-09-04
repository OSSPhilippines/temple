var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)E(a,r,{get:t[r],enumerable:!0})},W=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!se.call(a,n)&&n!==r&&E(a,n,{get:()=>t[n],enumerable:!(s=te(t,n))||s.enumerable});return a};var F=(a,t,r)=>(r=a!=null?ee(re(a)):{},W(t||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a)),ne=a=>W(E({},"__esModule",{value:!0}),a);var P=c(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let n of s)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};D.default=j});var q=c(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});var O=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};M.default=O});var m=c(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var ce=new Map;S.default=ce});var b=c(u=>{"use strict";var ie=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var oe=ie(q()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],A=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,f])=>{if(typeof f=="string")return`${n}="${f}"`;if(typeof f=="boolean")return f?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};u.default=A});var k=c(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});var L=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};I.default=L});var $=c(p=>{"use strict";var G=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var me=G(k()),ue=G(b()),C=class{static createElement(t,r,s=[]){return new ue.default(t,r,s)}static createText(t,r=!0){return new me.default(t,r)}};p.default=C});var J=c(d=>{"use strict";var y=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var pe=y(P()),N=y(m()),de=y(b()),he=y($()),B=class{render(t={}){N.default.set("props",t||{}),N.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(N.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=de.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};d.default=B});var Y=c(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.TempleEmitter=void 0;var v=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};h.TempleEmitter=v;var Te=new v;h.default=Te});var z=c(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var _e=xe(m());function ge(a){let t=_e.default.get("env")||{};return a?t[a]||null:t}T.default=ge});var U=c(x=>{"use strict";var Ee=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=ye;var be=Ee(m());function ye(){return be.default.get("props")||{}}});var V=c(_=>{"use strict";var ve=_&&_.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(_,"__esModule",{value:!0});_.default=je;var we=ve(U());function je(){return(0,we.default)().class}});var K=c(H=>{"use strict";Object.defineProperty(H,"__esModule",{value:!0});H.default=De;function De(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=c(l=>{"use strict";var Pe=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,n)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),Oe=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Me=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&Pe(t,a,r);return Oe(t,a),t},i=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var qe=i(P());l.TempleException=qe.default;var Se=i(q());l.TempleCollection=Se.default;var Ae=i(J());l.TempleDocument=Ae.default;var Le=i($());l.TempleRegistry=Le.default;var Ie=i(b());l.TempleElement=Ie.default;var Q=Me(Y());l.emitter=Q.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var ke=i(k());l.TempleText=ke.default;var Ce=i(m());l.data=Ce.default;var $e=i(z());l.env=$e.default;var Ne=i(U());l.props=Ne.default;var Be=i(V());l.classnames=Be.default;var Ue=i(K());l.signal=Ue.default});var R=c((rt,Z)=>{Z.exports={...X()}});var Re={};le(Re,{default:()=>w});var e=F(R()),g=F(R());var o=function(a,...t){let r=He(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},He=function(a){return a};var w=class extends e.TempleDocument{id(){return"2d721d6aed73f41f4e72"}styles(){return""}template(){let t="/docs/template-engine.html",r=o("Template Engine - Temple reactive web component template engine."),s=o("How to use Temple as a template engine."),n=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(o("Template Engine"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Template engines are used when you want to rapidly build web 
          applications that are split into different pages. Templates 
          also enable fast rendering of the server-side data that needs
          to be passed to the application. You can use Temple, TypeScript 
          and the native Node.js HTTP server to serve up HTML documents
          from the server-side.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          First, create a project with the following structure and files.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{panel:410,title:"My Project"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-head"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"tabs"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab active",group:"project",selector:"#index-ts"},[e.TempleRegistry.createText(`
                src/index.ts
              `,!1)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#page-dtml"},[e.TempleRegistry.createText(`
                src/page.dtml
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
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block active",group:"project",selector:"#index-ts"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.ts
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-1 block",group:"project",selector:"#page-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              page.dtml
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"block",group:"project",selector:"#package-json"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              package.json
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"panel-main"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("main",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-ts",lang:"js",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';

                //create temple compiler
                const compiler = temple({ cwd: __dirname });
                //create http server
                const server = http.createServer(async (req, res) => {
                  //if build asset...
                  if (req.url?.startsWith('/build/')) {
                    //get filename ie. abc123.js
                    const filename = req.url.substring(7);
                    //get asset
                    const { type, content } = await compiler.asset(filename);
                    //send response
                    res.writeHead(200, { 'Content-Type': type });
                    return res.end(content);
                  //if home page
                  } else if (req.url === '/') {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    return res.end(await compiler.render('./index.dtml', {
                      title: 'Hello World'
                    }));
                  }
                });
                //listen on port 3000
                server.listen(3000);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"page-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
                <style>
                  .title { text-align: center; }
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
                    <h1 class="title">{title}</h1>
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
          The server file 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("src/index.ts",!1)]),e.TempleRegistry.createText(` 
          implements a simple server utilizing the Temple compiler in 
          its most simplistic form. The document file
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("src/page.dtml",!1)]),e.TempleRegistry.createText(` 
          is using the most basic Temple syntax. To test the script and 
          see the results, run the following command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
          npm run dev
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Load 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("'http://localhost:3000/'",!1)]),e.TempleRegistry.createText(` 
          in your browser to see your application.
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/client-api.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Client API")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/single-page.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Single Page App")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(Re);})();
