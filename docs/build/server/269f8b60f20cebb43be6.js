var TempleAPI=(()=>{var ee=Object.create;var _=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var re=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var i=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),ne=(a,t)=>{for(var r in t)_(a,r,{get:t[r],enumerable:!0})},W=(a,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of ae(t))!le.call(a,c)&&c!==r&&_(a,c,{get:()=>t[c],enumerable:!(l=te(t,c))||l.enumerable});return a};var F=(a,t,r)=>(r=a!=null?ee(re(a)):{},W(t||!a||!a.__esModule?_(r,"default",{value:a,enumerable:!0}):r,a)),se=a=>W(_({},"__esModule",{value:!0}),a);var j=i(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});var L=class extends Error{static for(t,...r){return r.forEach(function(l){t=t.replace("%s",l)}),new this(t)}static forErrorsFound(t){let r=new this("Invalid Parameters");return r.errors=t,r}static require(t,r,...l){if(!t){for(let c of l)r=r.replace("%s",c);throw new this(r)}}constructor(t,r=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=r}withCode(t){return this.code=t,this}withPosition(t,r){return this.start=t,this.end=r,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};N.default=L});var M=i(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});var D=class{constructor(t=[]){this._elements=new Set,t.forEach(r=>this._elements.add(r))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};O.default=D});var m=i(S=>{"use strict";Object.defineProperty(S,"__esModule",{value:!0});var ce=new Map;S.default=ce});var b=i(u=>{"use strict";var ie=u&&u.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(u,"__esModule",{value:!0});var oe=ie(M()),fe=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],P=class{static render(t){return t.filter(Boolean).map(r=>r.toString()).join("")}get name(){return this._name}get attributes(){return this._attributes}get children(){return this._children}constructor(t,r={},l=[]){this._attributes={},this._name=t,this._attributes=r,this._children=new oe.default(l)}toString(){let t=Object.entries(this._attributes),r=t.length>0?" "+t.map(([c,f])=>{if(typeof f=="string")return`${c}="${f}"`;if(typeof f=="boolean")return f?c:""}).join(" "):"";if(fe.includes(this._name))return`<${this._name}${r} />`;let l=this._children.toString();return`<${this._name}${r}>${l}</${this._name}>`}};u.default=P});var C=i(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});var k=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,r=!1){this._escape=r,this._value=t}toString(){return this.value}};q.default=k});var A=i(d=>{"use strict";var R=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var me=R(C()),ue=R(b()),I=class{static createElement(t,r,l=[]){return new ue.default(t,r,l)}static createText(t,r=!0){return new me.default(t,r)}};d.default=I});var Y=i(T=>{"use strict";var v=T&&T.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(T,"__esModule",{value:!0});var de=v(j()),$=v(m()),Te=v(b()),pe=v(A()),B=class{render(t={}){$.default.set("props",t||{}),$.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries($.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(c=>c[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let r=this.template(),l=Te.default.render(r).trim();if(!l.toLowerCase().startsWith("<html"))throw de.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${l}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(r=>typeof r=="object"&&typeof r.nodeType=="number")?t:[pe.default.createText(String(t))]}};T.default=B});var G=i(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.TempleEmitter=void 0;var y=class{emit(t,r){return this}on(t,r){return this}once(t,r){return this}unbind(t,r){return this}};p.TempleEmitter=y;var xe=new y;p.default=xe});var J=i(x=>{"use strict";var he=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});var Ee=he(m());function ge(a){let t=Ee.default.get("env")||{};return a?t[a]||null:t}x.default=ge});var U=i(h=>{"use strict";var _e=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});h.default=ve;var be=_e(m());function ve(){return be.default.get("props")||{}}});var z=i(E=>{"use strict";var ye=E&&E.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(E,"__esModule",{value:!0});E.default=Le;var we=ye(U());function Le(){return(0,we.default)().class}});var K=i(H=>{"use strict";Object.defineProperty(H,"__esModule",{value:!0});H.default=Ne;function Ne(a){let t={getter:()=>r.raw,setter:l=>l},r={raw:a,getter(l){return t.getter=l,r},setter(l){return t.setter=l,r}};return Object.defineProperty(r,"value",{get(){return t.getter()},set(l){r.raw=t.setter(l)}}),r}});var X=i(n=>{"use strict";var je=n&&n.__createBinding||(Object.create?function(a,t,r,l){l===void 0&&(l=r);var c=Object.getOwnPropertyDescriptor(t,r);(!c||("get"in c?!t.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(a,l,c)}:function(a,t,r,l){l===void 0&&(l=r),a[l]=t[r]}),De=n&&n.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),Oe=n&&n.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var r in a)r!=="default"&&Object.prototype.hasOwnProperty.call(a,r)&&je(t,a,r);return De(t,a),t},o=n&&n.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(n,"__esModule",{value:!0});n.TempleText=n.TempleException=n.TempleEmitter=n.TempleElement=n.TempleRegistry=n.TempleDocument=n.TempleCollection=n.signal=n.classnames=n.props=n.emitter=n.env=n.data=void 0;var Me=o(j());n.TempleException=Me.default;var Se=o(M());n.TempleCollection=Se.default;var Pe=o(Y());n.TempleDocument=Pe.default;var ke=o(A());n.TempleRegistry=ke.default;var qe=o(b());n.TempleElement=qe.default;var Q=Oe(G());n.emitter=Q.default;Object.defineProperty(n,"TempleEmitter",{enumerable:!0,get:function(){return Q.TempleEmitter}});var Ce=o(C());n.TempleText=Ce.default;var Ie=o(m());n.data=Ie.default;var Ae=o(J());n.env=Ae.default;var $e=o(U());n.props=$e.default;var Be=o(z());n.classnames=Be.default;var Ue=o(K());n.signal=Ue.default});var V=i((rt,Z)=>{Z.exports={...X()}});var Ve={};ne(Ve,{default:()=>w});var e=F(V()),g=F(V());var s=function(a,...t){let r=He(a);for(let l=0;l<t.length;l++)r=r.replace("%s",String(t[l]));return r},He=function(a){return a};var w=class extends e.TempleDocument{id(){return"269f8b60f20cebb43be6"}styles(){return`.col-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }`}template(){let t="/docs/state-management.html",r=s("State Management - Temple reactive web component template engine."),l=s("Learn how to manage states in Temple."),c=f=>{document.body.classList.toggle("panel-left-open")};return[e.TempleRegistry.createText(`
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
      `,!1),e.TempleRegistry.createElement("h6",{},[...this._toNodeList(s("On this page"))]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("nav",{},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#props"},[...this._toNodeList(s("Props"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#signals"},[...this._toNodeList(s("Signals"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#events"},[...this._toNodeList(s("Events"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#classnames"},[...this._toNodeList(s("Class Names"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#children"},[...this._toNodeList(s("Children"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#env"},[...this._toNodeList(s("Env Variables"))]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("a",{href:"#this"},[...this._toNodeList(s("this"))]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-main",{class:"panel-main"},[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("div",{class:"docs container"},[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h1",{},[...this._toNodeList(s("State Management"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Temple provides several ways to manage properties and states 
          in your components.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"props"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Props"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:10},[...this._toNodeList(`
          import { props } from '@ossph/temple';
          const { title, description } = props();
        `)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("props",!1)]),e.TempleRegistry.createText(` function can be used to access the 
          properties of a component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"signals"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Signals"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("p",{},[e.TempleRegistry.createText(`
          Temple provides a reactive state management system that allows 
          you to manage states in your components. The system is based 
          on signals, which are reactive variables that can be used to 
          store and update data. Signals can be used to store any type 
          of data, including numbers, strings, objects, arrays, and even 
          functions.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <script>
            import { signal } from '@ossph/temple';
            const count = signal<number>(1);
          </script>
          <em class=classlist>Count #{count.value}</em>
        `)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          To create a signal, you can use the 
          `,!1),e.TempleRegistry.createElement("ide-code",{type:"javascript",inline:!0},[...this._toNodeList("signal()")]),e.TempleRegistry.createText(` 
          function, which takes an initial value as an argument. Signals 
          can be read and updated using the `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("value",!1)]),e.TempleRegistry.createText(` property. 
          Setting the value will trigger a re-render of the component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          Signals can be used in your components to manage states and 
          trigger updates when the state changes. You can use signals to 
          store data that needs to be shared between components, or to 
          trigger side effects when the state changes. Signals can also 
          be used to store data that needs to be persisted across page 
          reloads, such as form data or user preferences.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"events"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Events"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,number:!0,detab:10},[...this._toNodeList(`
          <script>
            import { signal } from '@ossph/temple';
            const count = signal<number>(1);
            const add = e => count.value++;
          </script>

          <button click=add>{count.value}</button>

          <button dblclick=add>{count.value}</button>
          <button mousedown=add>{count.value}</button>
          <button mouseup=add>{count.value}</button>
          <button mousemove=add>{count.value}</button>
          <button mouseover=add>{count.value}</button>
          <button mouseout=add>{count.value}</button>
          <button wheel=add>{count.value}</button>
          <button keydown=add>{count.value}</button>
          <button keypress=add>{count.value}</button>
          <button keyup=add>{count.value}</button>
        `)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          For example, you can use the `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("click",!1)]),e.TempleRegistry.createText(` 
          attribute assigned to a function to trigger a function when 
          the element is clicked. In combination with updating a signal, 
          can trigger a re-render of the component. The following event 
          attributes are supported.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("div",{class:"col-2"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Mouse Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("click",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dblclick",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("mousedown",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("mouseup",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("mousemove",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("mouseover",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("mouseout",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("wheel",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Keyboard Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("keydown",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("keypress",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("keyup",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Form Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("blur",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("change",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("contextmenu",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("focus",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("input",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("submit",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("invalid",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("reset",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("search",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("select",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Clipboard Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("copy",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("cut",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("paste",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Transition Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("transitionend",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Drag Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("drag",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dragstart",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dragend",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dragover",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dragenter",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("dragleave",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("drop",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("scroll",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Media Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("durationchange",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("ended",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("error",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("loadeddata",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("loadedmetadata",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("loadstart",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("pause",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("play",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("playing",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("progress",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("ratechange",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("seeked",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("seeking",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("stalled",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("suspend",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("timeupdate",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("volumechange",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("waiting",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("h3",{},[...this._toNodeList(s("Animation Events"))]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ul",{},[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("animationstart",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("animationend",!1)])]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("li",{},[e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("animationiteration",!1)])]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"classnames"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Class Names"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:10},[...this._toNodeList(`
          import { classnames } from '@ossph/temple';
          const classlist = classnames(); //--> 'class1 class2 class3'
        `)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("classnames",!1)]),e.TempleRegistry.createText(` function can be used to generate 
          a list of class names based on the properties of an object.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"children"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Children"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",trim:!0,detab:10},[...this._toNodeList(`
          import { children } from '@ossph/temple';
          const childlist = children(); //--> Node[]
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("children",!1)]),e.TempleRegistry.createText(` function can be used to render 
          child components in a parent component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"env"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("Environment Variables"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-code",{trim:!0,detab:10},[...this._toNodeList(`
          <script>
            import { env } from '@ossph/temple';
            const { BUILD_ID, NODE_ENV } = env();
          </script>
          <if true={NODE_ENV === 'development'}>
            <p>Development mode</p>
          </if>
        `)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          The `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("env",!1)]),e.TempleRegistry.createText(` function can be used to access environment 
          variables in a component.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("a",{name:"this"},[]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("h2",{},[...this._toNodeList(s("this"))]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("ide-app",{title:"What's this"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,detab:12},[...this._toNodeList(`
            <script>
              this.props;
              this.style;
              this.classList;
              this.parentNode;
              this.innerHTML;
              this.appendChild();
              this.querySelector('p');
            </script>
          `)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(` refers to the 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` that extends 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(`. This means all
          components in Temple are in fact are HTML elements and has
          access to the common functionality like 
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("innerHTML",!1)]),e.TempleRegistry.createText(` and
          `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[...this._toNodeList("querySelector()")]),e.TempleRegistry.createText(` to name a 
          few. `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("TempleComponent",!1)]),e.TempleRegistry.createText(` has the
          additional following properties and methods that you can access
          using `,!1),e.TempleRegistry.createElement("ide-code",{inline:!0},[e.TempleRegistry.createText("this",!1)]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("api-ui",{start:"TempleComponent"}),e.TempleRegistry.createText(`

        `,!1),e.TempleRegistry.createElement("tui-alert",{curved:!0,info:!0},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-info-circle"},[]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("strong",{},[e.TempleRegistry.createText("Info:",!1)]),e.TempleRegistry.createText(` You can discover more methods and properties
          of the `,!1),e.TempleRegistry.createElement("code",{},[e.TempleRegistry.createText("HTMLElement",!1)]),e.TempleRegistry.createText(` class on the
          `,!1),e.TempleRegistry.createElement("a",{target:"_blank",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"},[e.TempleRegistry.createText(`
            MDN Web Docs
          `,!1)]),e.TempleRegistry.createText(`.
        `,!1)]),e.TempleRegistry.createText(`
        
        `,!1),e.TempleRegistry.createElement("nav",{class:"pager"},[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"prev",href:"/temple/docs/markup-syntax.html"},[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-left"},[]),e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Markup Syntax")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("a",{class:"next",href:"/temple/docs/component-strategy.html"},[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(s("Component Strategy")),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-chevron-right"},[]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return se(Ve);})();
