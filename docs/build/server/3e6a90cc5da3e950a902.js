var TempleAPI=(()=>{var ee=Object.create;var E=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var c=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),se=(a,t)=>{for(var r in t)E(a,r,{get:t[r],enumerable:!0})},J=(a,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ae(t))!le.call(a,n)&&n!==r&&E(a,n,{get:()=>t[n],enumerable:!(l=te(t,n))||l.enumerable});return a};var G=(a,t,r)=>(r=a!=null?ee(re(a)):{},J(t||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a)),ne=a=>J(E({},"__esModule",{value:!0}),a);var D=c(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});var j=class extends Error{static for(t,...r){return r.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...l){if(!t){for(let n of l)r=r.replace("%s",n);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};O.default=j});var M=c(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});var S=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};P.default=S});var f=c(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var ce=new Map;q.default=ce});var b=c(m=>{"use strict";var ie=m&&m.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(m,"__esModule",{value:!0});var oe=ie(M()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],L=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},l=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([n,o])=>{if(typeof o=="string")return`${n}="${o}"`;if(typeof o=="boolean")return o?n:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let l=this._children.toString();return`<${this._name}${r}>${l}</${this._name}>`}};m.default=L});var C=c(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});var k=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};A.default=k});var $=c(u=>{"use strict";var F=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var me=F(C()),ue=F(b()),I=class{static createElement(t,r,l=[]){return new ue.default(t,r,l)}static createText(t,r=!0){return new me.default(t,r)}};u.default=I});var W=c(p=>{"use strict";var v=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var pe=v(D()),N=v(f()),de=v(b()),he=v($()),B=class{render(t={}){N.default.set("props",t||{}),N.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(N.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(n=>n[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),l=de.default.render(r).trim();if(!l.toLowerCase().startsWith("<html"))throw pe.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[he.default.createText(String(t))]}};p.default=B});var V=c(d=>{"use strict";Object.defineProperty(d,"__esModule",{value:!0});d.TempleEmitter=void 0;var y=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};d.TempleEmitter=y;var Te=new y;d.default=Te});var Y=c(h=>{"use strict";var _e=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var xe=_e(f());function ge(a){let t=xe.default.get("env")||{};return a?t[a]||null:t}h.default=ge});var H=c(T=>{"use strict";var Ee=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});T.default=ve;var be=Ee(f());function ve(){return be.default.get("props")||{}}});var z=c(_=>{"use strict";var ye=_&&_.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(_,"__esModule",{value:!0});_.default=je;var we=ye(H());function je(){return(0,we.default)().class}});var K=c(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.default=Oe;function Oe(a){let t={getter:()=>r.raw,setter:l=>l},r={raw:a,getter(l){return t.getter=l,r},setter(l){return t.setter=l,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(l){r.raw=t.setter(l)}}),r}});var X=c(s=>{"use strict";var De=s&&s.__createBinding||(Object.create?function(a,t,r,l){l===void 0&&(l=r);var n=Object.getOwnPropertyDescriptor(t,r);(!n||("get"in n?!t.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,l,n)}:function(a,t,r,l){l===void 0&&(l=r),a[l]=t[r]}),Se=s&&s.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Pe=s&&s.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&De(t,a,r);return Se(t,a),t},i=s&&s.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(s,"__esModule",{value:!0});s.TempleText=s.TempleException=s.TempleEmitter=s.TempleElement=s.TempleRegistry=s.TempleDocument=s.TempleCollection=s.signal=s.classnames=s.props=s.emitter=s.env=s.data=void 0;var Me=i(D());s.TempleException=Me.default;var qe=i(M());s.TempleCollection=qe.default;var Le=i(W());s.TempleDocument=Le.default;var ke=i($());s.TempleRegistry=ke.default;var Ae=i(b());s.TempleElement=Ae.default;var Q=Pe(V());s.emitter=Q.default;Object.defineProperty(s,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ce=i(C());s.TempleText=Ce.default;var Ie=i(f());s.data=Ie.default;var $e=i(Y());s.env=$e.default;var Ne=i(H());s.props=Ne.default;var Be=i(z());s.classnames=Be.default;var He=i(K());s.signal=He.default});var U=c((rt,Z)=>{Z.exports={...X()}});var Ue={};se(Ue,{default:()=>w});var e=G(U()),g=G(U());var x=function(a,...t){let r=Re(a);for(let l=0;l<t.length;l++)r=r.replace("%s",String(t[l]));return r},Re=function(a){return a};var w=class extends e.TempleDocument{id(){return"3e6a90cc5da3e950a902"}styles(){return""}template(){let t="/docs/index.html",r=x("Documentation - Temple reactive web component template engine."),l=x("Temple is a template engine hat generates web components and support reactivity."),n=o=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(x("Documentation"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple is a template engine with a built-in compiler that 
          generates HTML markup, web components and support reactivity. 
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Like React and Svelte, Temple is a modern approach to building
          front-end code addressing state management and reactivity. 
          Unlike React and Svelte that focus on keeping the developer 
          experience mostly on the front-end, Temple focuses on being 
          a modern templating solution for server side frameworks.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple can be used as a template engine on the server side, 
          as a site generator to make static websites and single page 
          applications, or can be used to publish native HTML5 web 
          components.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple sticks closely to the classic web development model of 
          HTML, CSS, and JS, just adding a few extensions to HTML and 
          JavaScript. It arguably has fewer concepts and tools to learn 
          than some of the other framework options.
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
                `,!1),e.TempleRegistry.createElement("h1",{},[e.TempleRegistry.createText("Hello world!",!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          At it's core, a temple file is a special template file that 
          allows HTML, JavaScript, CSS and importing of components and 
          templates. All of which are transpiled to TypeScript or 
          JavaScript source code.
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("ide-app",{title:"Transpiler Example"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"split-view"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,ltrim:!0,detab:14},[...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                import { props } from '@ossph/temple';
                const { name } = props();
              </script>
              <h1>Hello {name}!!</h1>
              
              

            `)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{class:"div",lang:"js",trim:!0,detab:14},[...this._toNodeList(`
              import { props } from '@ossph/temple';
              export default class Hello extends TempleComponent {
                styles() {
                  return 'h1 { font-weight: bold; }';
                }
                template() {
                  const { name } = props();
                  return () => [
                    TempleRegistry.createElement('h1', null, \`Hello \${name}\`)
                  ]
                }
              }
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/getting-started.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(x("Getting Started")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return ne(Ue);})();
