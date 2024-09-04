var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,se=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),le=(a,t)=>{for(var r in t)E(a,r,{get:t[r],enumerable:!0})},U=(a,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!se.call(a,n)&&n!==r&&E(a,n,{get:()=>t[n],enumerable:!(s=te(t,n))||s.enumerable});return a};var W=(a,t,r)=>(r=a!=null?ee(re(a)):{},U(t||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a)),ie=a=>U(E({},"__esModule",{value:!0}),a);var N=c(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(s){t=t.replace("%s",s)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...s){if(!t){for(let n of s)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};k.default=j});var D=c(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var O=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};L.default=O});var f=c(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});var ne=new Map;P.default=ne});var b=c(p=>{"use strict";var ce=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var oe=ce(D()),me=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],M=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},s=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(s)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,m])=>{if(typeof m=="string")return`${n}="${m}"`;if(typeof m=="boolean")return m?n:""}).join(" "):"";if(me.includes(this._name))return`<${this._name}${r} />`;let s=this._children.toString();return`<${this._name}${r}>${s}</${this._name}>`}};p.default=M});var C=c(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var S=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};q.default=S});var I=c(u=>{"use strict";var F=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var fe=F(C()),pe=F(b()),z=class{static createElement(t,r,s=[]){return new pe.default(t,r,s)}static createText(t,r=!0){return new fe.default(t,r)}};u.default=z});var J=c(d=>{"use strict";var v=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var ue=v(N()),A=v(f()),de=v(b()),he=v(I()),H=class{render(t={}){A.default.set("props",t||{}),A.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(A.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),s=de.default.render(r).trim();if(!s.toLowerCase().startsWith("<html"))throw ue.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${s}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};d.default=H});var G=c(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.TempleEmitter=void 0;var y=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};h.TempleEmitter=y;var xe=new y;h.default=xe});var K=c(x=>{"use strict";var Te=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var ge=Te(f());function _e(a){let t=ge.default.get("env")||{};return a?t[a]||null:t}x.default=_e});var B=c(T=>{"use strict";var Ee=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});T.default=ve;var be=Ee(f());function ve(){return be.default.get("props")||{}}});var Y=c(g=>{"use strict";var ye=g&&g.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(g,"__esModule",{value:!0});g.default=je;var we=ye(B());function je(){return(0,we.default)().class}});var Q=c(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=ke;function ke(a){let t={getter:()=>r.raw,setter:s=>s},r={raw:a,getter(s){return t.getter=s,r},setter(s){return t.setter=s,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(s){r.raw=t.setter(s)}}),r}});var X=c(l=>{"use strict";var Ne=l&&l.__createBinding||(Object.create?function(a,t,r,s){s===void 0&&(s=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,s,n)}:function(a,t,r,s){s===void 0&&(s=r),a[s]=t[r]}),Oe=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Le=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&Ne(t,a,r);return Oe(t,a),t},o=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.signal=l.classnames=l.props=l.emitter=l.env=l.data=void 0;var De=o(N());l.TempleException=De.default;var Pe=o(D());l.TempleCollection=Pe.default;var Me=o(J());l.TempleDocument=Me.default;var Se=o(I());l.TempleRegistry=Se.default;var qe=o(b());l.TempleElement=qe.default;var V=Le(G());l.emitter=V.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return V.TempleEmitter}});var Ce=o(C());l.TempleText=Ce.default;var ze=o(f());l.data=ze.default;var Ie=o(K());l.env=Ie.default;var Ae=o(B());l.props=Ae.default;var He=o(Y());l.classnames=He.default;var Be=o(Q());l.signal=Be.default});var $=c((rt,Z)=>{Z.exports={...X()}});var $e={};le($e,{default:()=>w});var e=W($()),_=W($());var i=function(a,...t){let r=Re(a);for(let s=0;s<t.length;s++)r=r.replace("%s",String(t[s]));return r},Re=function(a){return a};var w=class extends e.TempleDocument{id(){return"f01cefc94e8ee605f3f5"}styles(){return`body {
    font-family: Arial, Helvetica, sans-serif;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }
  a, a:link, a:hover, a:active, a:visited {
    color: var(--fg-primary);
    text-decoration: none;
  }
  p, li {
    font-size: 20px;
    line-height: 36px;
  }
  .fab, .fas, .fa {
    line-height: 16px;
  }
  .section-hero {
    background-color: var(--bg-first);
    padding: 40px 0;
    text-align: center;
    width: 100%;
  }
  .section-hero img {
    height: 100px;
  }
  .section-hero h1 {
    font-size: 40px;
  }
  .section-hero p {
    font-size: 30px;
    padding: 30px 0;
  }
  .section-sample {
    margin: auto;
    max-width: 960px;
    padding: 0 20px;
  }
  .section-sample p {
    padding: 20px;
    text-align: center;
  }

  .section-bullets {
    background-color: var(--bg-first);
    margin: auto;
    padding: 40px 20px;
    text-align: center;
  }
  .section-bullets ul {
    align-items: center;
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    text-align: center;
  }
  .section-bullets li {
    width: calc(33.33%-20px);
    margin: 10px;
    max-width: 300px;
  }
  .section-bullets li h3 {
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .section-bullets li p {
    font-size: 16px;
    line-height: 26px;
  }

  .section-interactive {
    margin: auto;
    max-width: 960px;
    padding: 40px 20px;
  }
  .section-interactive h3 {
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .section-interactive p {
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 20px;
    text-align: center;
  }

  .section-servers {
    background-color: #CCCCCC;
    margin: auto;
    padding: 40px 20px;
    text-align: center;
  }
  .section-servers h3 {
    color: #242424;
    font-size: 30px;
    text-transform: uppercase;
  }
  .section-servers div {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 40px auto 0;
    max-width: 960px;
  }
  .section-servers a {
    display: block;
    flex-basis: 33%;
    margin-bottom: 20px;
  }
  .section-servers img {
    height: 60px;
  }

  .section-testimonials {
    background-color: var(--bg-first);
    margin: auto;
    padding: 40px 20px;
  }
  .section-testimonials h3 {
    font-size: 26px;
    text-align: center;
  }
  .section-testimonials > section {
    display: flex;
    flex-wrap: wrap;
  }
  .section-testimonials tweet-box {
    flex-basis: 33%;
  }

  .section-action {
    margin: auto;
    padding: 40px 20px;
    text-align: center;
  }
  .section-action h3 {
    font-size: 26px;
    margin-bottom: 20px;
  }

  @media (max-width: 960px) {
    .section-testimonials tweet-box {
      flex-basis: 50%;
    }
  }

  @media (max-width: 767px) {
    .section-bullets ul {
      display: block;
    }
    .section-bullets li {
      margin: 10px auto 40px;
    }
    .section-servers div {
      display: block;
    }
    .section-testimonials tweet-box {
      flex-basis: 100%;
    }
  }`}template(){let t="/temple/index.html",r=i("Temple - The reactive web component template engine."),s=i("Temple is a template engine that generates web components and support reactivity."),n=m=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
  `,!1),e.TempleRegistry.createElement("body",{class:"dark panel with-head"},[e.TempleRegistry.createText(`
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
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-hero"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("img",{src:"/temple/temple-icon.png",alt:"Temple Logo"}),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Temple"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The reactive web component template engine.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("tui-button",{primary:!0,xl:!0,rounded:!0,style:"margin-right:10px;",href:"/temple/docs/getting-started.html"},[e.TempleRegistry.createText(`
          `,!1),...this._toNodeList(i("Get Started")),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("tui-button",{secondary:!0,xl:!0,rounded:!0,href:"/temple/docs/index.html"},[e.TempleRegistry.createText(`
          `,!1),...this._toNodeList(i("Read the Docs")),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-sample"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple is a modern HTML markup language and a server first 
          template engine with a built-in parser/compiler that 
          generates web components and supports reactivity.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Basic Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},[...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                const name = 'world';
              </script>
              <h1>Hello {name}!</h1>
            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-preview",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-bullets"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Expressive Markup"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              Any data type as attributes. Easily express logic with 
              markup directives like if, each, and try catch. 
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Reactive Signals"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              Easily transition from backend logic to reactive states.
              No Hydration and no memoization needed.
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Bare Metal"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
              Work with the DOM directly. Import any web components 
              from any source. Works with Lit, HTMX.
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-interactive"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Server Setup"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple can be used with popular server 
          frameworks in just a few lines of code.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Server Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:12},[...this._toNodeList(`
            import temple from '@ossph/temple/compiler';
            //make a temple compiler
            const compiler = temple();
            //render HTML
            const results = compiler.render('./page.dtml');
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Props"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Import your component props and use immediately
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Props Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},[...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                import { props } from '@ossph/temple';
                const { name } = props();
              </script>
              <h1>Hello {name}!</h1>
            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-preview",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Reactive Signals"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Use signals to manage state changes and re-renders.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Signal Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},[...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                import { signal } from '@ossph/temple';
                const name = signal('world');
                name.value += '!';
              </script>
              <h1>Hello {name.value}</h1>
            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-preview",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Components and Templates"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Import components and templates for reusability.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Import Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},[...this._toNodeList(`
              <!-- page.html -->
              <link rel="import" href="./my-heading.html" />
              <script>
                const name = 'world';
              </script>
              <my-heading {name}>Hello</my-heading>
            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{class:"div",trim:!0,detab:14},[...this._toNodeList(`
              <!-- my-heading.html -->
              <script>
                import { props } from '@ossph/temple';
                const { name, children } = props();
              </script>
              <h1>{children} {name}</h1>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Conditionals and Iterations"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Case for conditions and iterations in an expressive way.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Conditional + Iteration Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:14},[...this._toNodeList(`
              <script>
                const name = 'world';
                const show = name === "world";
              </script>

              <if true=show>
                <h1>Hello {name}</h1>
              </if>
            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{class:"div",trim:!0,detab:14},[...this._toNodeList(`
              <script>
                const list = [ 'a', 'b', 'c' ];
              </script>
              <ul>
                <each key=i value=item from=list>
                  <li>{i}: {item}</li>
                </each>
              </ul>
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-servers"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Works With Popular Server Frameworks"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"https://expressjs.com/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",alt:"Express"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"https://fastify.dev/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Fastify_logo.svg",alt:"Fastify"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"https://hapi.dev/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png",alt:"Hapi"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"https://koajs.com/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/koajs_logo_icon_168379.png",alt:"Koa"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"https://nestjs.com/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png",alt:"NestJS"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{href:"http://restify.com/",target:"_blank"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("img",{src:"https://raw.githubusercontent.com/restify/node-restify/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true",alt:"Restify"}),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-testimonials"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("Temple Loves Developers!"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Joff Tiquez",handle:"@jrtiquez",href:"https://twitter.com/jrtiquez",src:"https://github.com/jofftiquez.png"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("Im a vue developer. No need for this. OSSPH does not support this project.",!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Primeagen",handle:"@theprimeagen",href:"https://twitter.com/ThePrimeagen",src:"https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("Temple? Never heard of it...",!1),e.TempleRegistry.createElement("br",{}),e.TempleRegistry.createText('"The Name..."',!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Kristian Quirapas",handle:"@YourCompanyCTO",href:"https://twitter.com/YourCompanyCTO",src:"https://avatars.githubusercontent.com/u/85150796?v=4"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("Temple is good news for Node developers. I'm a rust developer so it don't matter to me.",!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Drizzle Team",handle:"@drizzle.team",href:"https://twitter.com/DrizzleORM",src:"https://pbs.twimg.com/profile_images/1767809210060877824/mAtEmNk0_400x400.jpg"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("Temple copied this section from us. We are the original.",!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Chris B",handle:"@cblanquera",href:"https://twitter.com/cblanquera",src:"https://avatars.githubusercontent.com/u/120378?v=4"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("After creating the Temple project, I am really excited to get back to ReactJS.",!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tweet-box",{name:"Theo",handle:"@t3dotgg",href:"https://twitter.com/t3dotgg",src:"https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s160-c-k-c0x00ffffff-no-rj"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText("Temple? no thanks. Keep your stack front end. App router for life.",!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("section",{class:"section-action"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(i("What are you waiting for?"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("tui-button",{primary:!0,xl:!0,rounded:!0,style:"margin-right:10px;",href:"/temple/docs/getting-started.html"},[e.TempleRegistry.createText(`
          `,!1),...this._toNodeList(i("Get Started")),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("tui-button",{secondary:!0,xl:!0,rounded:!0,href:"/temple/docs/index.html"},[e.TempleRegistry.createText(`
          `,!1),...this._toNodeList(i("Read the Docs")),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ie($e);})();
