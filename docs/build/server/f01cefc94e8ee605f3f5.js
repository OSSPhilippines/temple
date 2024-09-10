var TempleAPI=(()=>{var V=Object.create;var g=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var n=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),se=(a,t)=>{for(var s in t)g(a,s,{get:t[s],enumerable:!0})},$=(a,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of ee(t))!ae.call(a,c)&&c!==s&&g(a,c,{get:()=>t[c],enumerable:!(r=X(t,c))||r.enumerable});return a};var R=(a,t,s)=>(s=a!=null?V(te(a)):{},$(t||!a||!a.__esModule?g(s,"default",{value:a,enumerable:!0}):s,a)),re=a=>$(g({},"__esModule",{value:!0}),a);var k=n(y=>{"use strict";Object.defineProperty(y,"__esModule",{value:!0});var w=class extends Error{static for(t,...s){return s.forEach(function(r){t=t.replace("%s",r)}),new this(t)}static forErrorsFound(t){let s=new this("Invalid Parameters");return s.errors=t,s}static require(t,s,...r){if(!t){for(let c of r)s=s.replace("%s",c);throw new this(s)}}constructor(t,s=500){super(),this.errors={},this.start=0,this.end=0,this.message=t,this.name=this.constructor.name,this.code=s}withCode(t){return this.code=t,this}withPosition(t,s){return this.start=t,this.end=s,this}toJSON(){return{error:!0,code:this.code,message:this.message}}};y.default=w});var N=n(j=>{"use strict";Object.defineProperty(j,"__esModule",{value:!0});var v=class{get length(){return this._elements.size}constructor(t=[]){this._elements=new Set,t.forEach(s=>this._elements.add(s))}add(t){this._elements.add(t)}toArray(){return Array.from(this._elements)}toString(){return Array.from(this._elements).filter(Boolean).map(t=>t.toString()).join("")}};j.default=v});var m=n(O=>{"use strict";Object.defineProperty(O,"__esModule",{value:!0});var le=new Map;O.default=le});var P=n(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});var D=class{get value(){return this._escape?this._value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):this._value}constructor(t,s=!1){this._escape=s,this._value=t}toString(){return this.value}};L.default=D});var M=n(p=>{"use strict";var ce=p&&p.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(p,"__esModule",{value:!0});var ie=ce(N()),ne=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"],S=class{get attributes(){return this._attributes}get children(){return this._children}get name(){return this._name}get props(){return this._props}constructor(t,s={},r="",c=[]){this._attributes={},this._name=t,this._attributes=s,this._props=r,this._children=new ie.default(c)}toString(){let t=Object.entries(this._attributes),s=t.length>0?" "+t.map(([c,T])=>{if(typeof T=="string")return`${c}="${T}"`;if(typeof T=="boolean")return T?c:""}).join(" "):"";if(ne.includes(this._name))return`<${this._name}${s} />`;let r=this._children.toString();return`<${this._name}${s}>${r}</${this._name}>`}};p.default=S});var I=n(f=>{"use strict";var U=f&&f.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(f,"__esModule",{value:!0});var oe=U(P()),F=U(M()),q=class{static render(t){return t.filter(Boolean).map(s=>s.toString()).join("")}static registry(t,s=new Set){return t.forEach(r=>{r instanceof F.default&&(["html","head","body"].includes(r.name)||s.add(r),r.name!=="head"&&r.children.length>0&&this.registry(r.children.toArray(),s))}),s}static createElement(t,s,r,c=[]){return new F.default(t,s,r,c)}static createText(t,s=!0){return new oe.default(t,s)}};f.default=q});var J=n(h=>{"use strict";var H=h&&h.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(h,"__esModule",{value:!0});var me=H(k()),A=H(m()),C=H(I()),z=class{bindings(){let t=C.default.registry(this.template());return`{ ${Array.from(t.values()).map((r,c)=>r.props!=="{ }"?`'${c}': ${r.props}`:"").filter(r=>r!=="").join(", ")} }`}render(t={}){A.default.set("props",t||{}),A.default.set("env",Object.assign(Object.assign({},process.env||{}),{BUILD_ID:this.id(),APP_DATA:btoa(JSON.stringify(Object.assign(Object.assign({},Object.fromEntries(A.default.entries())),{env:Object.assign(Object.assign({},Object.fromEntries(Object.entries(process.env||{}).filter(c=>c[0].startsWith("PUBLIC_")))),{BUILD_ID:this.id()})})))}));let s=this.template(),r=C.default.render(s).trim();if(!r.toLowerCase().startsWith("<html"))throw me.default.for("Document must start with an <html> tag.");return`<!DOCTYPE html>
${r}`}_toNodeList(t){return typeof t=="object"&&typeof t.nodeType=="number"?[t]:Array.isArray(t)&&t.every(s=>typeof s=="object"&&typeof s.nodeType=="number")?t:[C.default.createText(String(t))]}};h.default=z});var K=n(u=>{"use strict";Object.defineProperty(u,"__esModule",{value:!0});u.TempleEmitter=void 0;var _=class{emit(t,s){return this}on(t,s){return this}once(t,s){return this}unbind(t,s){return this}};u.TempleEmitter=_;var pe=new _;u.default=pe});var G=n(d=>{"use strict";var fe=d&&d.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(d,"__esModule",{value:!0});var he=fe(m());function ue(a){let t=he.default.get("env")||{};return a?t[a]||null:t}d.default=ue});var W=n(x=>{"use strict";var de=x&&x.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(x,"__esModule",{value:!0});x.default=be;var xe=de(m());function be(){return xe.default.get("props")||{}}});var Q=n(l=>{"use strict";var Te=l&&l.__createBinding||(Object.create?function(a,t,s,r){r===void 0&&(r=s);var c=Object.getOwnPropertyDescriptor(t,s);(!c||("get"in c?!t.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(a,r,c)}:function(a,t,s,r){r===void 0&&(r=s),a[r]=t[s]}),ge=l&&l.__setModuleDefault||(Object.create?function(a,t){Object.defineProperty(a,"default",{enumerable:!0,value:t})}:function(a,t){a.default=t}),_e=l&&l.__importStar||function(a){if(a&&a.__esModule)return a;var t={};if(a!=null)for(var s in a)s!=="default"&&Object.prototype.hasOwnProperty.call(a,s)&&Te(t,a,s);return ge(t,a),t},o=l&&l.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(l,"__esModule",{value:!0});l.TempleText=l.TempleException=l.TempleEmitter=l.TempleElement=l.TempleRegistry=l.TempleDocument=l.TempleCollection=l.props=l.emitter=l.env=l.data=void 0;var Ee=o(k());l.TempleException=Ee.default;var we=o(N());l.TempleCollection=we.default;var ye=o(J());l.TempleDocument=ye.default;var ke=o(I());l.TempleRegistry=ke.default;var ve=o(M());l.TempleElement=ve.default;var Y=_e(K());l.emitter=Y.default;Object.defineProperty(l,"TempleEmitter",{enumerable:!0,get:function(){return Y.TempleEmitter}});var je=o(P());l.TempleText=je.default;var Ne=o(m());l.data=Ne.default;var Oe=o(G());l.env=Oe.default;var De=o(W());l.props=De.default});var B=n((Ue,Z)=>{Z.exports={...Q()}});var Pe={};se(Pe,{default:()=>E});var e=R(B()),b=R(B());var i=function(a,...t){let s=Le(a);for(let r=0;r<t.length;r++)s=s.replace("%s",String(t[r]));return s},Le=function(a){return a};var E=class extends e.TempleDocument{id(){return"f01cefc94e8ee605f3f5"}styles(){return`@tui theme;
  @tui reset;
  @tui fouc-opacity;
  @tui default-block;
  @tui utilities;`}template(){let t="/temple/index.html",s=i("Temple - The reactive web component template engine."),r=i("Temple is a template engine that generates web components and support reactivity.");return[e.TempleRegistry.createText(`
`,!1),e.TempleRegistry.createElement("html",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("head",{},"{ }",[e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{charset:"utf-8"},"{ 'charset': `utf-8` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"},"{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("title",{},"{ }",[...this._toNodeList(s)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"description",content:r},"{ 'name': `description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:title",content:s},"{ 'property': `og:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:description",content:r},"{ 'property': `og:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:url",content:`https://ossphilippines.github.io/temple${t}`},"{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{property:"og:type",content:"website"},"{ 'property': `og:type`, 'content': `website` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:card",content:"summary"},"{ 'name': `twitter:card`, 'content': `summary` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:site",content:"@OSSPhilippines"},"{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:title",content:s},"{ 'name': `twitter:title`, 'content': title }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:description",content:r},"{ 'name': `twitter:description`, 'content': description }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("meta",{name:"twitter:image",content:"https://ossphilippines.github.io/temple/temple-logo.png"},"{ 'name': `twitter:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"favicon",href:"/temple/favicon.ico"},"{ 'rel': `favicon`, 'href': `/temple/favicon.ico` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"shortcut icon",type:"image/png",href:"/temple/favicon.png"},"{ 'rel': `shortcut icon`, 'type': `image/png`, 'href': `/temple/favicon.png` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/fontawesome/all.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/fontawesome/all.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:"/temple/styles/global.css"},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/global.css` }"),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("link",{rel:"stylesheet",type:"text/css",href:`/temple/build/client/${(0,b.env)("BUILD_ID")}.css`},"{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/build/client/${env('BUILD_ID')}.css` }"),e.TempleRegistry.createText(`
  
  `,!1),e.TempleRegistry.createElement("script",{"data-app":(0,b.env)("APP_DATA"),src:`/temple/build/client/${(0,b.env)("BUILD_ID")}.js`},"{ 'data-app': env('APP_DATA'), 'src': `/temple/build/client/${env('BUILD_ID')}.js` }"),e.TempleRegistry.createText(`
  `,!1),...(0,b.env)("NODE_ENV")==="development"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("script",{src:"/dev.js"},"{ 'src': `/dev.js` }"),e.TempleRegistry.createText(`
  `,!1)]:[],e.TempleRegistry.createText(`
`,!1)]),e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("body",{class:"dark bg-t-0 tx-t-1 arial"},"{ 'class': `dark bg-t-0 tx-t-1 arial` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("panel-layout",{},"{ }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-head",{},"{ }",[e.TempleRegistry.createElement("menu",{class:"flex flex-center-y px-20 py-15 m-0 bg-t-1"},"{ 'class': `flex flex-center-y px-20 py-15 m-0 bg-t-1` }",[e.TempleRegistry.createText(`
  `,!1),...t!=="/temple/index.html"&&t!=="/temple/500.html"?[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("i",{class:"fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1",click:toggle},"{ 'class': `fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1`, 'click': toggle }",[]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("div",{class:"flex-grow"},"{ 'class': `flex-grow` }",[]),e.TempleRegistry.createText(`
  `,!1)]:[,e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{href:"/temple"},"{ 'href': `/temple` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("img",{alt:"Temple Logo",class:"h-26 mr-10",src:"/temple/temple-icon.png"},"{ 'alt': `Temple Logo`, 'class': `h-26 mr-10`, 'src': `/temple/temple-icon.png` }"),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("h3",{class:"flex-grow tx-uppercase"},"{ 'class': `flex-grow tx-uppercase` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple"},"{ 'class': `tx-white`, 'href': `/temple` }",[e.TempleRegistry.createText("Temple",!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)],e.TempleRegistry.createText(`
  `,!1),e.TempleRegistry.createElement("nav",{class:"flex flex-center-y"},"{ 'class': `flex flex-center-y` }",[e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-white",href:"/temple/docs/index.html"},"{ 'class': `tx-white`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText("Docs",!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"tx-t-1 tx-5xl ml-10",href:"https://github.com/OSSPhilippines/temple",target:"_blank"},"{ 'class': `tx-t-1 tx-5xl ml-10`, 'href': `https://github.com/OSSPhilippines/temple`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-github"},"{ 'class': `fab fa-github` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center",href:"https://www.npmjs.com/package/@ossph/temple",target:"_blank"},"{ 'class': `bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://www.npmjs.com/package/@ossph/temple`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-npm text-white"},"{ 'class': `fab fa-npm text-white` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
    `,!1),e.TempleRegistry.createElement("a",{class:"bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center",href:"https://discord.gg/open-source-software-ph-905496362982981723",target:"_blank"},"{ 'class': `bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://discord.gg/open-source-software-ph-905496362982981723`, 'target': `_blank` }",[e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("i",{class:"fab fa-discord text-white"},"{ 'class': `fab fa-discord text-white` }",[]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]),e.TempleRegistry.createText(`
      `,!1),e.TempleRegistry.createElement("panel-main",{class:"scroll-auto"},"{ 'class': `scroll-auto` }",[e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"bg-t-1 py-40 tx-center w-full"},"{ 'class': `bg-t-1 py-40 tx-center w-full` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("img",{class:"h-100",src:"/temple/temple-icon.png",alt:"Temple Logo"},"{ 'class': `h-100`, 'src': `/temple/temple-icon.png`, 'alt': `Temple Logo` }"),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h1",{class:"tx-40"},"{ 'class': `tx-40` }",[...this._toNodeList(i("Temple"))]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-30 py-30 tx-lh-36"},"{ 'p': true, 'trim': true, 'class': `tx-30 py-30 tx-lh-36` }",[e.TempleRegistry.createText(`
            The reactive web component template engine.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tui-button",{primary:!0,xl:!0,rounded:!0,class:"mr-10",href:"/temple/docs/getting-started.html"},"{ 'primary': true, 'xl': true, 'rounded': true, 'class': `mr-10`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Get Started")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tui-button",{secondary:!0,xl:!0,rounded:!0,class:"inline-block",href:"/temple/docs/index.html"},"{ 'secondary': true, 'xl': true, 'rounded': true, 'class': `inline-block`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Read the Docs")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"m-auto wm-960 px-20"},"{ 'class': `m-auto wm-960 px-20` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"p-20 tx-center tx-lh-36 tx-18"},"{ 'p': true, 'trim': true, 'class': `p-20 tx-center tx-lh-36 tx-18` }",[e.TempleRegistry.createText(`
            Temple is a modern HTML markup language and a server first 
            template engine with a built-in parser/compiler that 
            generates web components and supports reactivity.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{class:"block",title:"Basic Example"},"{ 'class': `block`, 'title': `Basic Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-white md-block"},"{ 'class': `flex bg-white md-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:16,class:"basis-half"},"{ 'numbers': true, 'trim': true, 'detab': 16, 'class': `basis-half` }",[...this._toNodeList(`
                <style>
                  h1 { font-weight: bold; }
                </style>
                <script>
                  const name = 'world';
                </script>
                <h1>Hello {name}!</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-preview",{class:"basis-half"},"{ 'class': `basis-half` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
                  `,!1),e.TempleRegistry.createElement("h1",{},"{ }",[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"bg-t-1 m-auto py-40 px-20 tx-center"},"{ 'class': `bg-t-1 m-auto py-40 px-20 tx-center` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ul",{class:"flex flex-center list-none p-0 tx-center md-block"},"{ 'class': `flex flex-center list-none p-0 tx-center md-block` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"w-third wm-300 md-wm-400 md-w-auto md-m-auto"},"{ 'class': `w-third wm-300 md-wm-400 md-w-auto md-m-auto` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"p-10"},"{ 'class': `p-10` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h3",{class:"mb-20 tx-uppercase"},"{ 'class': `mb-20 tx-uppercase` }",[e.TempleRegistry.createText(`
                  `,!1),...this._toNodeList(i("Expressive Markup")),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-16 tx-lh-24"},"{ 'p': true, 'trim': true, 'class': `tx-16 tx-lh-24` }",[e.TempleRegistry.createText(`
                  Any data type as attributes. Easily express logic with 
                  markup directives like if, each, and try catch. 
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"w-third wm-300 md-wm-400 md-w-auto md-m-auto md-mt-20"},"{ 'class': `w-third wm-300 md-wm-400 md-w-auto md-m-auto md-mt-20` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"p-10"},"{ 'class': `p-10` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h3",{class:"mb-20 tx-uppercase"},"{ 'class': `mb-20 tx-uppercase` }",[e.TempleRegistry.createText(`
                  `,!1),...this._toNodeList(i("Reactive Signals")),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-16 tx-lh-24"},"{ 'p': true, 'trim': true, 'class': `tx-16 tx-lh-24` }",[e.TempleRegistry.createText(`
                  Easily transition from backend logic to reactive states.
                  No Hydration and no memoization needed.
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("li",{class:"w-third wm-300 md-wm-400 md-w-auto md-m-auto md-mt-20"},"{ 'class': `w-third wm-300 md-wm-400 md-w-auto md-m-auto md-mt-20` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("div",{class:"p-10"},"{ 'class': `p-10` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("h3",{class:"mb-20 tx-uppercase"},"{ 'class': `mb-20 tx-uppercase` }",[e.TempleRegistry.createText(`
                  `,!1),...this._toNodeList(i("Bare Metal")),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-16 tx-lh-24"},"{ 'p': true, 'trim': true, 'class': `tx-16 tx-lh-24` }",[e.TempleRegistry.createText(`
                  Work with the DOM directly. Import any web components 
                  from any source. Works with Lit, HTMX.
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"m-auto wm-960 px-20 py-40"},"{ 'class': `m-auto wm-960 px-20 py-40` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"mt-40 mb-20 tx-center tx-uppercase"},"{ 'class': `mt-40 mb-20 tx-center tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Server Setup")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-center tx-lh-24 mb-20"},"{ 'p': true, 'trim': true, 'class': `tx-center tx-lh-24 mb-20` }",[e.TempleRegistry.createText(`
            Temple can be used with popular server 
            frameworks in just a few lines of code.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Server Example"},"{ 'title': `Server Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("ide-code",{lang:"js",numbers:!0,trim:!0,detab:14},"{ 'lang': `js`, 'numbers': true, 'trim': true, 'detab': 14 }",[...this._toNodeList(`
              import temple from '@ossph/temple/compiler';
              //make a temple compiler
              const compiler = temple();
              //render HTML
              const results = compiler.render('./page.dtml');
            `)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h3",{class:"mt-40 mb-20 tx-center tx-uppercase"},"{ 'class': `mt-40 mb-20 tx-center tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Props")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-center tx-lh-24 mb-20"},"{ 'p': true, 'trim': true, 'class': `tx-center tx-lh-24 mb-20` }",[e.TempleRegistry.createText(`
            Import your component props and use immediately
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Props Example"},"{ 'title': `Props Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-white md-block"},"{ 'class': `flex bg-white md-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:16,class:"basis-half"},"{ 'numbers': true, 'trim': true, 'detab': 16, 'class': `basis-half` }",[...this._toNodeList(`
                <style>
                  h1 { font-weight: bold; }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { name } = props();
                </script>
                <h1>Hello {name}!</h1>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-preview",{class:"basis-half"},"{ 'class': `basis-half` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
                  `,!1),e.TempleRegistry.createElement("h1",{},"{ }",[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h3",{class:"mt-40 mb-20 tx-center tx-uppercase"},"{ 'class': `mt-40 mb-20 tx-center tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Reactive Signals")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-center tx-lh-24 mb-20"},"{ 'p': true, 'trim': true, 'class': `tx-center tx-lh-24 mb-20` }",[e.TempleRegistry.createText(`
            Use signals to manage state changes and re-renders.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Signal Example"},"{ 'title': `Signal Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-white md-block"},"{ 'class': `flex bg-white md-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:16,class:"basis-half"},"{ 'numbers': true, 'trim': true, 'detab': 16, 'class': `basis-half` }",[...this._toNodeList(`
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
              `,!1),e.TempleRegistry.createElement("ide-preview",{class:"basis-half"},"{ 'class': `basis-half` }",[e.TempleRegistry.createText(`
                `,!1),e.TempleRegistry.createElement("div",{},"{ }",[e.TempleRegistry.createText(`
                  `,!1),e.TempleRegistry.createElement("h1",{},"{ }",[...this._toNodeList(i("Hello world!"))]),e.TempleRegistry.createText(`
                `,!1)]),e.TempleRegistry.createText(`
              `,!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h3",{class:"mt-40 mb-20 tx-center tx-uppercase"},"{ 'class': `mt-40 mb-20 tx-center tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Components and Templates")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-center tx-lh-24 mb-20"},"{ 'p': true, 'trim': true, 'class': `tx-center tx-lh-24 mb-20` }",[e.TempleRegistry.createText(`
            Import components and templates for reusability.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Import Example"},"{ 'title': `Import Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-white md-block"},"{ 'class': `flex bg-white md-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:16,class:"basis-half"},"{ 'numbers': true, 'trim': true, 'detab': 16, 'class': `basis-half` }",[...this._toNodeList(`
                <!-- page.html -->
                <link rel="import" href="./my-heading.html" />
                <script>
                  const name = 'world';
                </script>
                <my-heading {name}>Hello</my-heading>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 md-bd-0",trim:!0,detab:16},"{ 'class': `basis-half bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 md-bd-0`, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
                <!-- my-heading.html -->
                <script>
                  import { props } from '@ossph/temple';
                  const { name, children } = props();
                </script>
                <h1>{children} {name}</h1>
              `)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`

          `,!1),e.TempleRegistry.createElement("h3",{class:"mt-40 mb-20 tx-center tx-uppercase"},"{ 'class': `mt-40 mb-20 tx-center tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Conditionals and Iterations")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("i18n-translate",{p:!0,trim:!0,class:"tx-center tx-lh-24 mb-20"},"{ 'p': true, 'trim': true, 'class': `tx-center tx-lh-24 mb-20` }",[e.TempleRegistry.createText(`
            Case for conditions and iterations in an expressive way.
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("ide-app",{title:"Conditional + Iteration Example"},"{ 'title': `Conditional + Iteration Example` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("div",{class:"flex bg-white md-block"},"{ 'class': `flex bg-white md-block` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{numbers:!0,trim:!0,detab:16,class:"basis-half"},"{ 'numbers': true, 'trim': true, 'detab': 16, 'class': `basis-half` }",[...this._toNodeList(`
                <script>
                  const name = 'world';
                  const show = name === "world";
                </script>

                <if true=show>
                  <h1>Hello {name}</h1>
                </if>
              `)]),e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("ide-code",{class:"basis-half bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 md-bd-0",trim:!0,detab:16},"{ 'class': `basis-half bd-t-1 bd-solid bdy-0 bdl-1 bdr-0 md-bd-0`, 'trim': true, 'detab': 16 }",[...this._toNodeList(`
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
        `,!1),e.TempleRegistry.createElement("section",{class:"m-auto px-20 py-40 tx-center bg-h-cccccc"},"{ 'class': `m-auto px-20 py-40 tx-center bg-h-cccccc` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-h-242424 tx-30 tx-uppercase"},"{ 'class': `tx-h-242424 tx-30 tx-uppercase` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Works With Popular Server Frameworks")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("div",{class:"flex flex-center flex-wrap mx-auto mt-40 mb-0 sm-block"},"{ 'class': `flex flex-center flex-wrap mx-auto mt-40 mb-0 sm-block` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"https://expressjs.com/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `https://expressjs.com/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",alt:"Express"},"{ 'class': `h-60`, 'src': `https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png`, 'alt': `Express` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"https://fastify.dev/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `https://fastify.dev/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Fastify_logo.svg",alt:"Fastify"},"{ 'class': `h-60`, 'src': `https://upload.wikimedia.org/wikipedia/commons/0/0a/Fastify_logo.svg`, 'alt': `Fastify` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"https://hapi.dev/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `https://hapi.dev/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png",alt:"Hapi"},"{ 'class': `h-60`, 'src': `https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png`, 'alt': `Hapi` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"https://koajs.com/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `https://koajs.com/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/koajs_logo_icon_168379.png",alt:"Koa"},"{ 'class': `h-60`, 'src': `https://cdn.icon-icons.com/icons2/2699/PNG/512/koajs_logo_icon_168379.png`, 'alt': `Koa` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"https://nestjs.com/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `https://nestjs.com/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png",alt:"NestJS"},"{ 'class': `h-60`, 'src': `https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png`, 'alt': `NestJS` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("a",{class:"block basis-third mb-20",href:"http://restify.com/",target:"_blank"},"{ 'class': `block basis-third mb-20`, 'href': `http://restify.com/`, 'target': `_blank` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("img",{class:"h-60",src:"https://raw.githubusercontent.com/restify/node-restify/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true",alt:"Restify"},"{ 'class': `h-60`, 'src': `https://raw.githubusercontent.com/restify/node-restify/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true`, 'alt': `Restify` }"),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"bg-t-1 m-auto py-40 px-20"},"{ 'class': `bg-t-1 m-auto py-40 px-20` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-26 tx-center"},"{ 'class': `tx-26 tx-center` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Temple Loves Developers!")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("section",{class:"flex flex-wrap md-block"},"{ 'class': `flex flex-wrap md-block` }",[e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Joff Tiquez",handle:"@jrtiquez",href:"https://twitter.com/jrtiquez",src:"https://github.com/jofftiquez.png"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Joff Tiquez`, 'handle': `@jrtiquez`, 'href': `https://twitter.com/jrtiquez`, 'src': `https://github.com/jofftiquez.png` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("Im a vue developer. No need for this. OSSPH does not support this project.",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Primeagen",handle:"@theprimeagen",href:"https://twitter.com/ThePrimeagen",src:"https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Primeagen`, 'handle': `@theprimeagen`, 'href': `https://twitter.com/ThePrimeagen`, 'src': `https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("Temple? Never heard of it...",!1),e.TempleRegistry.createElement("br",{},"{ }"),e.TempleRegistry.createText('"The Name..."',!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Kristian Quirapas",handle:"@YourCompanyCTO",href:"https://twitter.com/YourCompanyCTO",src:"https://avatars.githubusercontent.com/u/85150796?v=4"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Kristian Quirapas`, 'handle': `@YourCompanyCTO`, 'href': `https://twitter.com/YourCompanyCTO`, 'src': `https://avatars.githubusercontent.com/u/85150796?v=4` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("Temple is good news for Node developers. I'm a rust developer so it don't matter to me.",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Drizzle Team",handle:"@drizzle.team",href:"https://twitter.com/DrizzleORM",src:"https://pbs.twimg.com/profile_images/1767809210060877824/mAtEmNk0_400x400.jpg"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Drizzle Team`, 'handle': `@drizzle.team`, 'href': `https://twitter.com/DrizzleORM`, 'src': `https://pbs.twimg.com/profile_images/1767809210060877824/mAtEmNk0_400x400.jpg` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("Temple copied this section from us. We are the original.",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Chris B",handle:"@cblanquera",href:"https://twitter.com/cblanquera",src:"https://avatars.githubusercontent.com/u/120378?v=4"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Chris B`, 'handle': `@cblanquera`, 'href': `https://twitter.com/cblanquera`, 'src': `https://avatars.githubusercontent.com/u/120378?v=4` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("After creating the Temple project, I am really excited to get back to ReactJS.",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
            `,!1),e.TempleRegistry.createElement("tweet-box",{class:"block basis-third lg-basis-half",name:"Theo",handle:"@t3dotgg",href:"https://twitter.com/t3dotgg",src:"https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s160-c-k-c0x00ffffff-no-rj"},"{ 'class': `block basis-third lg-basis-half`, 'name': `Theo`, 'handle': `@t3dotgg`, 'href': `https://twitter.com/t3dotgg`, 'src': `https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s160-c-k-c0x00ffffff-no-rj` }",[e.TempleRegistry.createText(`
              `,!1),e.TempleRegistry.createElement("p",{},"{ }",[e.TempleRegistry.createText("Temple? no thanks. Keep your stack front end. App router for life.",!1)]),e.TempleRegistry.createText(`
            `,!1)]),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("section",{class:"m-auto py-40 px-20 tx-center"},"{ 'class': `m-auto py-40 px-20 tx-center` }",[e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("h3",{class:"tx-26 mb-20"},"{ 'class': `tx-26 mb-20` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("What are you waiting for?")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tui-button",{primary:!0,xl:!0,rounded:!0,class:"inline-block",style:"margin-right:10px;",href:"/temple/docs/getting-started.html"},"{ 'primary': true, 'xl': true, 'rounded': true, 'class': `inline-block`, 'style': `margin-right:10px;`, 'href': `/temple/docs/getting-started.html` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Get Started")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
          `,!1),e.TempleRegistry.createElement("tui-button",{secondary:!0,xl:!0,rounded:!0,class:"inline-block",href:"/temple/docs/index.html"},"{ 'secondary': true, 'xl': true, 'rounded': true, 'class': `inline-block`, 'href': `/temple/docs/index.html` }",[e.TempleRegistry.createText(`
            `,!1),...this._toNodeList(i("Read the Docs")),e.TempleRegistry.createText(`
          `,!1)]),e.TempleRegistry.createText(`
        `,!1)]),e.TempleRegistry.createText(`
        `,!1),e.TempleRegistry.createElement("footer",{class:"foot"},"{ 'class': `foot` }",[]),e.TempleRegistry.createText(`
      `,!1)]),e.TempleRegistry.createText(`
    `,!1)]),e.TempleRegistry.createText(`
  `,!1)]),e.TempleRegistry.createText(`
`,!1)])]}};return re(Pe);})();
