var TempleAPI = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../node_modules/@ossph/temple/dist/Exception.js
  var require_Exception = __commonJS({
    "../../node_modules/@ossph/temple/dist/Exception.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleException = class extends Error {
        static for(message, ...values) {
          values.forEach(function(value) {
            message = message.replace("%s", value);
          });
          return new this(message);
        }
        static forErrorsFound(errors) {
          const exception = new this("Invalid Parameters");
          exception.errors = errors;
          return exception;
        }
        static require(condition, message, ...values) {
          if (!condition) {
            for (const value of values) {
              message = message.replace("%s", value);
            }
            throw new this(message);
          }
        }
        constructor(message, code = 500) {
          super();
          this.errors = {};
          this.start = 0;
          this.end = 0;
          this.message = message;
          this.name = this.constructor.name;
          this.code = code;
        }
        withCode(code) {
          this.code = code;
          return this;
        }
        withPosition(start, end) {
          this.start = start;
          this.end = end;
          return this;
        }
        toJSON() {
          return {
            error: true,
            code: this.code,
            message: this.message
          };
        }
      };
      exports.default = TempleException;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleCollection.js
  var require_TempleCollection = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleCollection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleCollection = class {
        get length() {
          return this._elements.size;
        }
        constructor(elements = []) {
          this._elements = /* @__PURE__ */ new Set();
          elements.forEach((element) => this._elements.add(element));
        }
        add(element) {
          this._elements.add(element);
        }
        toArray() {
          return Array.from(this._elements);
        }
        toString() {
          return Array.from(this._elements).filter(Boolean).map((child) => child.toString()).join("");
        }
      };
      exports.default = TempleCollection;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/data.js
  var require_data = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/data.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var data = /* @__PURE__ */ new Map();
      exports.default = data;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleText.js
  var require_TempleText = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleText.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleText = class {
        get value() {
          return this._escape ? this._value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : this._value;
        }
        constructor(value, escape = false) {
          this._escape = escape;
          this._value = value;
        }
        toString() {
          return this.value;
        }
      };
      exports.default = TempleText;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleElement.js
  var require_TempleElement = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleElement.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleCollection_1 = __importDefault(require_TempleCollection());
      var selfClosingTags = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ];
      var TempleElement2 = class {
        get attributes() {
          return this._attributes;
        }
        get children() {
          return this._children;
        }
        get name() {
          return this._name;
        }
        get props() {
          return this._props;
        }
        constructor(name, attributes = {}, props2 = "", children = []) {
          this._attributes = {};
          this._name = name;
          this._attributes = attributes;
          this._props = props2;
          this._children = new TempleCollection_1.default(children);
        }
        toString() {
          const entries = Object.entries(this._attributes);
          const attributes = entries.length > 0 ? " " + entries.map(([key, value]) => {
            if (typeof value === "string" && !/["<>\n]/.test(value)) {
              return `${key}="${value}"`;
            } else if (typeof value === "boolean") {
              return value ? key : "";
            }
          }).join(" ") : "";
          if (selfClosingTags.includes(this._name)) {
            return `<${this._name}${attributes} />`;
          }
          const children = this._children.toString();
          return `<${this._name}${attributes}>${children}</${this._name}>`;
        }
      };
      exports.default = TempleElement2;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleRegistry.js
  var require_TempleRegistry = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleRegistry.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleText_1 = __importDefault(require_TempleText());
      var TempleElement_1 = __importDefault(require_TempleElement());
      var TempleRegistry2 = class {
        static render(markup) {
          return markup.filter(Boolean).map((child) => child.toString()).join("");
        }
        static registry(markup, registry = /* @__PURE__ */ new Set()) {
          markup.forEach((node) => {
            if (node instanceof TempleElement_1.default) {
              if (!["html", "head", "body"].includes(node.name)) {
                registry.add(node);
              }
              if (node.name !== "head" && node.children.length > 0) {
                this.registry(node.children.toArray(), registry);
              }
            }
          });
          return registry;
        }
        static createElement(name, attributes, props2, children = []) {
          return new TempleElement_1.default(name, attributes, props2, children);
        }
        static createText(value, escape = true) {
          return new TempleText_1.default(value, escape);
        }
      };
      exports.default = TempleRegistry2;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleDocument.js
  var require_TempleDocument = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleDocument.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Exception_1 = __importDefault(require_Exception());
      var data_1 = __importDefault(require_data());
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      var TempleDocument2 = class {
        bindings() {
          const registry = TempleRegistry_1.default.registry(this.template());
          const bindings = Array.from(registry.values()).map((element, id) => {
            return element.props !== "{ }" ? `'${id}': ${element.props}` : "";
          }).filter((binding) => binding !== "").join(", ");
          return `{ ${bindings} }`;
        }
        render(props2 = {}) {
          data_1.default.set("props", props2 || {});
          data_1.default.set("env", Object.assign(Object.assign({}, process.env || {}), { BUILD_ID: this.id(), APP_DATA: btoa(JSON.stringify(Object.assign(Object.assign({}, Object.fromEntries(data_1.default.entries())), { env: Object.assign(Object.assign({}, Object.fromEntries(Object.entries(process.env || {}).filter((entry) => entry[0].startsWith("PUBLIC_")))), { BUILD_ID: this.id() }) }))) }));
          const children = this.template();
          let document = TempleRegistry_1.default.render(children).trim();
          if (!document.toLowerCase().startsWith("<html")) {
            throw Exception_1.default.for("Document must start with an <html> tag.");
          }
          return `<!DOCTYPE html>
${document}`;
        }
        _toNodeList(value) {
          if (typeof value === "object" && typeof value.nodeType === "number") {
            return [value];
          }
          if (Array.isArray(value)) {
            if (value.every((item) => typeof item === "object" && typeof item.nodeType === "number")) {
              return value;
            }
          }
          return [TempleRegistry_1.default.createText(String(value))];
        }
      };
      exports.default = TempleDocument2;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/TempleEmitter.js
  var require_TempleEmitter = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/TempleEmitter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TempleEmitter = void 0;
      var TempleEmitter = class {
        emit(event, target) {
          return this;
        }
        on(event, callback) {
          return this;
        }
        once(event, callback) {
          return this;
        }
        unbind(event, callback) {
          return this;
        }
      };
      exports.TempleEmitter = TempleEmitter;
      var emitter = new TempleEmitter();
      exports.default = emitter;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/env.js
  var require_env = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/env.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var data_1 = __importDefault(require_data());
      function env2(name) {
        const env3 = data_1.default.get("env") || {};
        if (name) {
          return env3[name] || null;
        }
        return env3;
      }
      exports.default = env2;
    }
  });

  // ../../node_modules/@ossph/temple/dist/server/props.js
  var require_props = __commonJS({
    "../../node_modules/@ossph/temple/dist/server/props.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = props2;
      var data_1 = __importDefault(require_data());
      function props2() {
        return data_1.default.get("props") || {};
      }
    }
  });

  // ../../node_modules/@ossph/temple/dist/server.js
  var require_server = __commonJS({
    "../../node_modules/@ossph/temple/dist/server.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TempleText = exports.TempleException = exports.TempleEmitter = exports.TempleElement = exports.TempleRegistry = exports.TempleDocument = exports.TempleCollection = exports.props = exports.emitter = exports.env = exports.data = void 0;
      var Exception_1 = __importDefault(require_Exception());
      exports.TempleException = Exception_1.default;
      var TempleCollection_1 = __importDefault(require_TempleCollection());
      exports.TempleCollection = TempleCollection_1.default;
      var TempleDocument_1 = __importDefault(require_TempleDocument());
      exports.TempleDocument = TempleDocument_1.default;
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      exports.TempleRegistry = TempleRegistry_1.default;
      var TempleElement_1 = __importDefault(require_TempleElement());
      exports.TempleElement = TempleElement_1.default;
      var TempleEmitter_1 = __importStar(require_TempleEmitter());
      exports.emitter = TempleEmitter_1.default;
      Object.defineProperty(exports, "TempleEmitter", { enumerable: true, get: function() {
        return TempleEmitter_1.TempleEmitter;
      } });
      var TempleText_1 = __importDefault(require_TempleText());
      exports.TempleText = TempleText_1.default;
      var data_1 = __importDefault(require_data());
      exports.data = data_1.default;
      var env_1 = __importDefault(require_env());
      exports.env = env_1.default;
      var props_1 = __importDefault(require_props());
      exports.props = props_1.default;
    }
  });

  // ../../node_modules/@ossph/temple/server.js
  var require_server2 = __commonJS({
    "../../node_modules/@ossph/temple/server.js"(exports, module) {
      module.exports = { ...require_server() };
    }
  });

  // temple-document-server-resolver:C:\Users\msu-wone\Documents\@Shoppable (Intern Dev Tasks)\Temple Dev\Push\temple\packages\temple-web\src\pages\500.dtml
  var __exports = {};
  __export(__exports, {
    default: () => N500_e3f8653650902fcc262b
  });
  var import_server = __toESM(require_server2());
  var import_server2 = __toESM(require_server2());

  // src/components/i18n/index.ts
  var _ = function(phrase, ...variables) {
    let translation = translate(phrase);
    for (let i = 0; i < variables.length; i++) {
      translation = translation.replace("%s", String(variables[i]));
    }
    return translation;
  };
  var translate = function(phrase) {
    return phrase;
  };

  // temple-document-server-resolver:C:\Users\msu-wone\Documents\@Shoppable (Intern Dev Tasks)\Temple Dev\Push\temple\packages\temple-web\src\pages\500.dtml
  var N500_e3f8653650902fcc262b = class extends import_server.TempleDocument {
    id() {
      return "e3f8653650902fcc262b";
    }
    styles() {
      return `@temple theme;
  @temple reset;
  @temple fouc-opacity;
  @temple utilities;`;
    }
    template() {
      const url = "/temple/500.html";
      const title = _("Oops... - Temple - The reactive web component template engine.");
      const description = _("Temple is a template engine hat generates web components and support reactivity.");
      const { error = "Unknown Error" } = (0, import_server2.props)();
      return [
        import_server.TempleRegistry.createText(`
`, false),
        import_server.TempleRegistry.createElement("html", {}, "{ }", [
          import_server.TempleRegistry.createText(`
  `, false),
          ...[
            import_server.TempleRegistry.createElement("head", {}, "{ }", [
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "charset": `utf-8` }, "{ 'charset': `utf-8` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `viewport`, "content": `width=device-width, initial-scale=1` }, "{ 'name': `viewport`, 'content': `width=device-width, initial-scale=1` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("title", {}, "{ }", [
                ...this._toNodeList(title)
              ]),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `description`, "content": description }, "{ 'name': `description`, 'content': description }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:title`, "content": title }, "{ 'property': `og:title`, 'content': title }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:description`, "content": description }, "{ 'property': `og:description`, 'content': description }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:image`, "content": `https://ossphilippines.github.io/temple/temple-logo.png` }, "{ 'property': `og:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:url`, "content": `https://ossphilippines.github.io/temple${url}` }, "{ 'property': `og:url`, 'content': `https://ossphilippines.github.io/temple${url}` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:type`, "content": `website` }, "{ 'property': `og:type`, 'content': `website` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:card`, "content": `summary` }, "{ 'name': `twitter:card`, 'content': `summary` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:site`, "content": `@OSSPhilippines` }, "{ 'name': `twitter:site`, 'content': `@OSSPhilippines` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:title`, "content": title }, "{ 'name': `twitter:title`, 'content': title }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:description`, "content": description }, "{ 'name': `twitter:description`, 'content': description }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:image`, "content": `https://ossphilippines.github.io/temple/temple-logo.png` }, "{ 'name': `twitter:image`, 'content': `https://ossphilippines.github.io/temple/temple-logo.png` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `favicon`, "href": `/temple/favicon.ico` }, "{ 'rel': `favicon`, 'href': `/temple/favicon.ico` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `shortcut icon`, "type": `image/png`, "href": `/temple/favicon.png` }, "{ 'rel': `shortcut icon`, 'type': `image/png`, 'href': `/temple/favicon.png` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css` }, "{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "media": `(prefers-color-scheme:light)`, "href": `https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/themes/light.css` }, "{ 'rel': `stylesheet`, 'media': `(prefers-color-scheme:light)`, 'href': `https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/themes/light.css` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "media": `(prefers-color-scheme:dark)`, "href": `https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/themes/dark.css` }, "{ 'rel': `stylesheet`, 'media': `(prefers-color-scheme:dark)`, 'href': `https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/themes/dark.css` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `/temple/styles/global.css` }, "{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/styles/global.css` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `/temple/build/client/${(0, import_server2.env)("BUILD_ID")}.css` }, "{ 'rel': `stylesheet`, 'type': `text/css`, 'href': `/temple/build/client/${env('BUILD_ID')}.css` }"),
              import_server.TempleRegistry.createText(`
  
  `, false),
              import_server.TempleRegistry.createElement("script", { "data-app": (0, import_server2.env)("APP_DATA"), "src": `/temple/build/client/${(0, import_server2.env)("BUILD_ID")}.js` }, "{ 'data-app': env('APP_DATA'), 'src': `/temple/build/client/${env('BUILD_ID')}.js` }"),
              import_server.TempleRegistry.createText(`
  `, false),
              ...!!((0, import_server2.env)("NODE_ENV") === "development") ? [
                import_server.TempleRegistry.createText(`
    `, false),
                import_server.TempleRegistry.createElement("script", { "src": `/dev.js` }, "{ 'src': `/dev.js` }"),
                import_server.TempleRegistry.createText(`
  `, false)
              ] : [],
              import_server.TempleRegistry.createText(`
`, false)
            ])
          ],
          import_server.TempleRegistry.createText(`
  `, false),
          import_server.TempleRegistry.createElement("body", { "class": `dark bg-t-0 tx-t-1 tx-arial` }, "{ 'class': `dark bg-t-0 tx-t-1 tx-arial` }", [
            import_server.TempleRegistry.createText(`
    `, false),
            import_server.TempleRegistry.createElement("panel-layout", {}, "{ }", [
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("header", {}, "{ }", [
                ...[
                  import_server.TempleRegistry.createElement("menu", { "class": `flex flex-center-y px-20 py-15 m-0 bg-t-1` }, "{ 'class': `flex flex-center-y px-20 py-15 m-0 bg-t-1` }", [
                    import_server.TempleRegistry.createText(`
  `, false),
                    ...!!(url !== "/temple/index.html" && url !== "/temple/500.html") ? [
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1`, "click": toggle }, "{ 'class': `fas fa-fw fa-bars cursor-pointer py-5 pr-10 none md-inline-block tx-t-1`, 'click': toggle }", []),
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("div", { "class": `flex-grow` }, "{ 'class': `flex-grow` }", []),
                      import_server.TempleRegistry.createText(`
  `, false)
                    ] : true ? [
                      ,
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("a", { "href": `/temple` }, "{ 'href': `/temple` }", [
                        import_server.TempleRegistry.createText(`
      `, false),
                        import_server.TempleRegistry.createElement("img", { "alt": `Temple Logo`, "class": `h-26 mr-10`, "src": `/temple/temple-icon.png` }, "{ 'alt': `Temple Logo`, 'class': `h-26 mr-10`, 'src': `/temple/temple-icon.png` }"),
                        import_server.TempleRegistry.createText(`
    `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("h3", { "class": `flex-grow tx-upper` }, "{ 'class': `flex-grow tx-upper` }", [
                        import_server.TempleRegistry.createText(`
      `, false),
                        import_server.TempleRegistry.createElement("a", { "class": `tx-white`, "href": `/temple` }, "{ 'class': `tx-white`, 'href': `/temple` }", [
                          import_server.TempleRegistry.createText(`Temple`, false)
                        ]),
                        import_server.TempleRegistry.createText(`
    `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
  `, false)
                    ] : [],
                    import_server.TempleRegistry.createText(`
  `, false),
                    import_server.TempleRegistry.createElement("nav", { "class": `flex flex-center-y` }, "{ 'class': `flex flex-center-y` }", [
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("a", { "class": `tx-white`, "href": `/temple/docs/index.html` }, "{ 'class': `tx-white`, 'href': `/temple/docs/index.html` }", [
                        import_server.TempleRegistry.createText(`Docs`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("a", { "class": `tx-t-1 tx-5xl ml-10`, "href": `https://github.com/OSSPhilippines/temple`, "target": `_blank` }, "{ 'class': `tx-t-1 tx-5xl ml-10`, 'href': `https://github.com/OSSPhilippines/temple`, 'target': `_blank` }", [
                        import_server.TempleRegistry.createText(`
      `, false),
                        import_server.TempleRegistry.createElement("i", { "class": `fab fa-github` }, "{ 'class': `fab fa-github` }", []),
                        import_server.TempleRegistry.createText(`
    `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("a", { "class": `bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center`, "href": `https://www.npmjs.com/package/@ossph/temple`, "target": `_blank` }, "{ 'class': `bg-h-cb3837 pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://www.npmjs.com/package/@ossph/temple`, 'target': `_blank` }", [
                        import_server.TempleRegistry.createText(`
      `, false),
                        import_server.TempleRegistry.createElement("i", { "class": `fab fa-npm text-white` }, "{ 'class': `fab fa-npm text-white` }", []),
                        import_server.TempleRegistry.createText(`
    `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
    `, false),
                      import_server.TempleRegistry.createElement("a", { "class": `bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center`, "href": `https://discord.gg/open-source-software-ph-905496362982981723`, "target": `_blank` }, "{ 'class': `bg-h-7289da pill tx-t-1 tx-lg ml-5 p-5 tx-center`, 'href': `https://discord.gg/open-source-software-ph-905496362982981723`, 'target': `_blank` }", [
                        import_server.TempleRegistry.createText(`
      `, false),
                        import_server.TempleRegistry.createElement("i", { "class": `fab fa-discord text-white` }, "{ 'class': `fab fa-discord text-white` }", []),
                        import_server.TempleRegistry.createText(`
    `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
  `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
`, false)
                  ])
                ]
              ]),
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("main", { "class": `scroll-auto` }, "{ 'class': `scroll-auto` }", [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("div", { "class": `p-20 w-calc-full-40` }, "{ 'class': `p-20 w-calc-full-40` }", [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("h1", { "class": `pt-10 pb-20` }, "{ 'class': `pt-10 pb-20` }", [
                    ...this._toNodeList(_("Oops..."))
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, "{ 'p': true, 'trim': true }", [
                    import_server.TempleRegistry.createText(`
            Something went wrong. Please try again later.
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  ...!!error ? [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("pre", { "class": `bg-black courier tx-lh-22 tx-word-wrap p-10 scroll-x-auto tx-prewrap` }, "{ 'class': `bg-black courier tx-lh-22 tx-word-wrap p-10 scroll-x-auto tx-prewrap` }", [
                      ...this._toNodeList(error)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ] : [],
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
      `, false)
              ]),
              import_server.TempleRegistry.createText(`
    `, false)
            ]),
            import_server.TempleRegistry.createText(`
  `, false)
          ]),
          import_server.TempleRegistry.createText(`
`, false)
        ])
      ];
    }
  };
  return __toCommonJS(__exports);
})();
