var TempleAPI=(()=>{var ee=Object.create;var b=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)b(a,r,{get:t[r],enumerable:!0})},F=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!se.call(a,n)&&n!==r&&b(a,n,{get:()=>t[n],enumerable:!(s=te(t,n))||s.enumerable});return a};var G=(a,t,r)=>(r=a!=null?ee(re(a)):{},F(t||!a||!a.__esModule?b(r,"default",{value:a,enumerable:!0}):r,a)),ne=a=>F(b({},"__esModule",{value:!0}),a);var P=c(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let n of s)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};D.default=j});var S=c(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});var O=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};M.default=O});var u=c(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var ce=new Map;q.default=ce});var E=c(m=>{"use strict";var ie=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(S()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],L=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,f])=>{if(typeof f=="string")return`${n}="${f}"`;if(typeof f=="boolean")return f?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};m.default=L});var I=c(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});var A=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};k.default=A});var N=c(p=>{"use strict";var W=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var ue=W(I()),me=W(E()),C=class{static createElement(t,r,s=[]){return new me.default(t,r,s)}static createText(t,r=!0){return new ue.default(t,r)}};p.default=C});var J=c(d=>{"use strict";var y=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var pe=y(P()),$=y(u()),de=y(E()),he=y(N()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=de.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};d.default=B});var Y=c(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.TempleEmitter=void 0;var v=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};h.TempleEmitter=v;var Te=new v;h.default=Te});var V=c(T=>{"use strict";var xe=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var ge=xe(u());function _e(a){let t=ge.default.get("env")||{};return a?t[a]||null:t}T.default=_e});var U=c(x=>{"use strict";var be=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=ye;var Ee=be(u());function ye(){return Ee.default.get("props")||{}}});var z=c(g=>{"use strict";var ve=g&&g.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(g,"__esModule",{value:!0});g.default=je;var we=ve(U());function je(){return(0,we.default)().class}});var K=c(H=>{"use strict";Object.defineProperty(H,"__esModule",{value:!0});H.default=De;function De(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=c(l=>{"use strict";var Pe=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,n)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),Oe=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Me=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&Pe(t,a,r);return Oe(t,a),t},i=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var Se=i(P());l.TempleException=Se.default;var qe=i(S());l.TempleCollection=qe.default;var Le=i(J());l.TempleDocument=Le.default;var Ae=i(N());l.TempleRegistry=Ae.default;var ke=i(E());l.TempleElement=ke.default;var Q=Me(Y());l.emitter=Q.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ie=i(I());l.TempleText=Ie.default;var Ce=i(u());l.data=Ce.default;var Ne=i(V());l.env=Ne.default;var $e=i(U());l.props=$e.default;var Be=i(z());l.classnames=Be.default;var Ue=i(K());l.signal=Ue.default});var R=c((rt,Z)=>{Z.exports={...X()}});var Re={};le(Re,{default:()=>w});var e=G(R()),_=G(R());var o=function(a,...t){let r=He(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},He=function(a){return a};var w=class extends e.TempleDocument{id(){return"1bf701a55aaad047771e"}styles(){return""}template(){let t="/docs/static-site.html",r=o("Static Site Generator - Temple reactive web component template engine."),s=o("How to use Temple to generate static sites."),n=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(o("Static Site Generator"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          A static site generator is a tool that generates a full static 
          HTML website based on raw data and a set of templates. 
          Essentially, a static site generator automates the task of 
          coding individual HTML pages and gets those pages ready to 
          serve to users ahead of time. Because these HTML pages are 
          pre-built, they can load very quickly in browsers. You can use 
          Temple, TypeScript and the native Node.js HTTP server to 
          generate HTML documents in order to be served statically.
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
              `,!1),e.TempleRegistry.createElement("tui-tab",{class:"tab",group:"project",selector:"#index-dtml"},[e.TempleRegistry.createText(`
                src/pages/index.dtml
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
            `,!1),e.TempleRegistry.createElement("h5",{class:"folder shift-1"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-down",style:"margin-left:4px"},[]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("span",{},[e.TempleRegistry.createText("pages",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tui-tab",{class:"shift-2 block",group:"project",selector:"#index-dtml"},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-file"},[]),e.TempleRegistry.createText(`
              index.dtml
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
                import temple, { cache } from '@ossph/temple/compiler';

                //where your pages are:
                const pages = path.join(__dirname, 'pages');
                //where your build files are:
                const build = path.join(__dirname, '../build');

                //create temple compiler
                const compiler = temple({ 
                  cwd: __dirname 
                }).use(cache({ 
                  buildPath: path.join(build, 'build') 
                }));
                //create http server
                const server = http.createServer(async (req, res) => {
                  //for build asset:
                  if (req.url?.startsWith('/build/')) {
                    //get filename ie. abc123.js
                    const filename = req.url.substring(7);
                    //get asset
                    const { type, content } = await compiler.asset(filename);
                    //send response
                    res.writeHead(200, { 'Content-Type': type });
                    return res.end(content);
                  }
                  // from /foo/bar.html to foo/bar.html
                  const route = request.url?.substring(1) || 'index.html';
                  const { fs } = compiler;
                  const file = path.join(build, route);
                  //for document pages: 
                  if (file.endsWith('.html')) {
                    const route = file.substring(0, file.length - 5);
                    const template = path.join(pages, route + '.dtml');
                    if (fs.existsSync(template)) {
                      //send response
                      return res.type('text/html').render(route, props);
                    }
                  }
                  //for static files:
                  if (fs.existsSync(file)) {
                    res.writeHead(200);
                    fs.createReadStream(file).pipe(res);
                    return;
                  } 
                  //anything else?
                  res.statusCode = 404;
                  res.end('Not Found');
                });
                //listen on port 3000
                server.listen(3000);
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{id:"index-dtml",style:"display:none",numbers:!0,trim:!0,detab:16},[...this._toNodeList(`
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
          To test the script and see the results, run the following 
          command in terminal.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"bash"},[e.TempleRegistry.createText(`
          npm run dev
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Load 
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",inline:!0},[e.TempleRegistry.createText("'http://localhost:3000/'",!1)]),e.TempleRegistry.createText(` 
          in your browser. After loading you should see files that were 
          generated in a new build folder found in your project root. 
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/single-page.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Single Page App")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/component-publisher.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(o("Component Publisher")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(Re);})();
