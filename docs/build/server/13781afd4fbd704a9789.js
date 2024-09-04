var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var c=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),se=(r,t)=>{for(var a in t)E(r,a,{get:t[a],enumerable:!0})},F=(r,t,a,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of re(t))!le.call(r,n)&&n!==a&&E(r,n,{get:()=>t[n],enumerable:!(l=te(t,n))||l.enumerable});return r};var G=(r,t,a)=>(a=r!=null?ee(ae(r)):{},F(t||!r||!r.__esModule?E(a,"default",{value:r,enumerable:!0}):a,r)),ne=r=>F(E({},"__esModule",{value:!0}),r);var D=c(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});var j=class extends Error{static for(t,...a){return a.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let a=new this("Invalid Parameters");return a.errors=t,a}static require(t,a,...l){if(!t){for(let n of l)a=a.replace("%s",n);throw new this(a)}}constructor(t,a=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=a}withCode(t){return this.code=t,this}withPosition(t,a){return this.start=t,this.end=a,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};O.default=j});var M=c(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var P=class{constructor(t=[]){this._elements=new Set,t.forEach(a=>this._elements.add(a))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};q.default=P});var f=c(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var ce=new Map;S.default=ce});var b=c(m=>{"use strict";var ie=m&&m.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(M()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],L=class{static render(t){return t.filter(Boolean).map(a=>a.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,a={},l=[]){this._attributes={},this._name=t,this._attributes=a,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),a=t.length>0?" "+t.map(([n,o])=>{if(typeof o=="string")return`${n}="${o}"`;if(typeof o=="boolean")return o?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${a} />`;let l=this._children.toString();return`<${this._name}${a}>${l}</${this._name}>`}};m.default=L});var C=c(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});var N=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,a=!1){this._escape=a,this._value=t}toString(){return this.value}};A.default=N});var I=c(u=>{"use strict";var J=u&&u.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(u,"__esModule",{value:!0});var me=J(C()),ue=J(b()),k=class{static createElement(t,a,l=[]){return new ue.default(t,a,l)}static createText(t,a=!0){return new me.default(t,a)}};u.default=k});var z=c(p=>{"use strict";var v=p&&p.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(p,"__esModule",{value:!0});var pe=v(D()),$=v(f()),de=v(b()),he=v(I()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let a=this.template(),l=de.default.render(a).trim();if(!l.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(a=>typeof a=="object"&&typeof a.nodeType=="number")?t:[he.default.createText(String(t))]}};p.default=B});var V=c(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var y=class{emit(t,a){return this}on(t,a){return this}once(t,a){return this}unbind(t,a){return this}};d.TempleEmitter=y;var Te=new y;d.default=Te});var Y=c(h=>{"use strict";var _e=h&&h.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(h,"__esModule",{value:!0});var xe=_e(f());function ge(r){let t=xe.default.get("env")||{};return r?t[r]||null:t}h.default=ge});var U=c(T=>{"use strict";var Ee=T&&T.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(T,"__esModule",{value:!0});T.default=ve;var be=Ee(f());function ve(){return be.default.get("props")||{}}});var H=c(_=>{"use strict";var ye=_&&_.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(_,"__esModule",{value:!0});_.default=je;var we=ye(U());function je(){return(0,we.default)().class}});var K=c(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=Oe;function Oe(r){let t={getter:()=>a.raw,setter:l=>l},a={raw:r,getter(l){return t.getter=l,a},setter(l){return t.setter=l,a}};return Object.defineProperty(a,"value",{get(){return t.getter()},set(l){a.raw=t.setter(l)}}),a}});var X=c(s=>{"use strict";var De=s&&s.__createBinding||(Object.create?function(r,t,a,l){l===void 0&&(l=a);var n=Object.getOwnPropertyDescriptor(t,a);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(r,l,n)}:function(r,t,a,l){l===void 0&&(l=a),r[l]=t[a]}),Pe=s&&s.__setModuleDefault||(Object.create?function(r,t){Object.defineProperty(r,"default",{enumerable:!0,value:t})}:function(r,t){r.default=t}),qe=s&&s.__importStar||function(r){if(r&&r.__esModule)return r;var t={};if(r!=null)for(var a in r)a!=="default"&&Object.prototype.hasOwnProperty.call(r,a)&&De(t,r,a);return Pe(t,r),t},i=s&&s.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(s,"__esModule",{value:!0});s.TempleText=s.TempleException=s.TempleEmitter=s.TempleElement=s.TempleRegistry=s.TempleDocument=s.TempleCollection=s.signal=s.classnames=s.props=s.emitter=s.env=s.data=void 0;var Me=i(D());s.TempleException=Me.default;var Se=i(M());s.TempleCollection=Se.default;var Le=i(z());s.TempleDocument=Le.default;var Ne=i(I());s.TempleRegistry=Ne.default;var Ae=i(b());s.TempleElement=Ae.default;var Q=qe(V());s.emitter=Q.default;Object.defineProperty(s,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ce=i(C());s.TempleText=Ce.default;var ke=i(f());s.data=ke.default;var Ie=i(Y());s.env=Ie.default;var $e=i(U());s.props=$e.default;var Be=i(H());s.classnames=Be.default;var Ue=i(K());s.signal=Ue.default});var W=c((at,Z)=>{Z.exports={...X()}});var We={};se(We,{default:()=>w});var e=G(W()),g=G(W());var x=function(r,...t){let a=Re(r);for(let l=0;l<t.length;l++)a=a.replace("%s",String(t[l]));return a},Re=function(r){return r};var w=class extends e.TempleDocument{id(){return"13781afd4fbd704a9789"}styles(){return""}template(){let t="/docs/developer-tools.html",a=x("Developer Tools - Temple reactive web component template engine."),l=x("Enable tools for a better developer experience and debugging."),n=o=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(x("Developer Tools"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple provides a separate package for a better development 
          experience when working with server frameworks that utilize 
          the native http module. Start by installing adding 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("'@ossph/temple-dev'")]),e.TempleRegistry.createText(`
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
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("'src/index.ts'")]),e.TempleRegistry.createText(` 
          file to create a development server as shown in the example below.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/index.ts"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            import http from 'http';
            import temple from '@ossph/temple/compiler';
            import { dev } from '@ossph/temple-dev';

            //create temple compiler
            const compiler = temple({ cwd: __dirname });
            //1. create dev tools
            const { router, refresh } = dev({ cwd: __dirname });

            //create http server
            const server = http.createServer(async (req, res) => {
              //2. Add dev router
              if (router(req, res)) return;
              //if home page
              if (req.url === '/') {
                //3. sync builder with refresh server
                refresh.sync(compiler.fromSource('./page.dtml'));
                //compile the document
                const html = await compiler.render('./page.dtml');
                //... send response ...
              }
              //... other routes ...
            });
            //listen on port 3000
            server.listen(3000);
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Lastly, update the document file 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("'src/page.dtml'")]),e.TempleRegistry.createText(` 
          to include the development script 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList('<script src="/dev.js"></script>')]),e.TempleRegistry.createText(` 
          as shown below.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"src/page.dtml"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
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
          Run the following command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Terminal"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
            npx ts-node src/index.ts
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Whenever `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[...this._toNodeList("'src/page.dtml'")]),e.TempleRegistry.createText(` 
          is updated, the development server will automatically refresh 
          the page. Components will also be updated in real-time.
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/component-publisher.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(x("Component Publisher")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(We);})();
