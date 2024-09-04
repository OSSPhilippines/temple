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

  // ../temple/dist/Exception.js
  var require_Exception = __commonJS({
    "../temple/dist/Exception.js"(exports) {
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

  // ../temple/dist/server/TempleCollection.js
  var require_TempleCollection = __commonJS({
    "../temple/dist/server/TempleCollection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleCollection = class {
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

  // ../temple/dist/server/data.js
  var require_data = __commonJS({
    "../temple/dist/server/data.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var data = /* @__PURE__ */ new Map();
      exports.default = data;
    }
  });

  // ../temple/dist/server/TempleElement.js
  var require_TempleElement = __commonJS({
    "../temple/dist/server/TempleElement.js"(exports) {
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
        static render(markup) {
          return markup.filter(Boolean).map((child) => child.toString()).join("");
        }
        get name() {
          return this._name;
        }
        get attributes() {
          return this._attributes;
        }
        get children() {
          return this._children;
        }
        constructor(name, attributes = {}, children = []) {
          this._attributes = {};
          this._name = name;
          this._attributes = attributes;
          this._children = new TempleCollection_1.default(children);
        }
        toString() {
          const entries = Object.entries(this._attributes);
          const attributes = entries.length > 0 ? " " + entries.map(([key, value]) => {
            if (typeof value === "string") {
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

  // ../temple/dist/server/TempleText.js
  var require_TempleText = __commonJS({
    "../temple/dist/server/TempleText.js"(exports) {
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

  // ../temple/dist/server/TempleRegistry.js
  var require_TempleRegistry = __commonJS({
    "../temple/dist/server/TempleRegistry.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleText_1 = __importDefault(require_TempleText());
      var TempleElement_1 = __importDefault(require_TempleElement());
      var TempleRegistry2 = class {
        static createElement(name, attributes, children = []) {
          return new TempleElement_1.default(name, attributes, children);
        }
        static createText(value, escape = true) {
          return new TempleText_1.default(value, escape);
        }
      };
      exports.default = TempleRegistry2;
    }
  });

  // ../temple/dist/server/TempleDocument.js
  var require_TempleDocument = __commonJS({
    "../temple/dist/server/TempleDocument.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Exception_1 = __importDefault(require_Exception());
      var data_1 = __importDefault(require_data());
      var TempleElement_1 = __importDefault(require_TempleElement());
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      var TempleDocument2 = class {
        render(props = {}) {
          data_1.default.set("props", props || {});
          data_1.default.set("env", Object.assign(Object.assign({}, process.env || {}), { BUILD_ID: this.id(), APP_DATA: btoa(JSON.stringify(Object.assign(Object.assign({}, Object.fromEntries(data_1.default.entries())), { env: Object.assign(Object.assign({}, Object.fromEntries(Object.entries(process.env || {}).filter((entry) => entry[0].startsWith("PUBLIC_")))), { BUILD_ID: this.id() }) }))) }));
          const children = this.template();
          let document2 = TempleElement_1.default.render(children).trim();
          if (!document2.toLowerCase().startsWith("<html")) {
            throw Exception_1.default.for("Document must start with an <html> tag.");
          }
          return `<!DOCTYPE html>
${document2}`;
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

  // ../temple/dist/server/TempleEmitter.js
  var require_TempleEmitter = __commonJS({
    "../temple/dist/server/TempleEmitter.js"(exports) {
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

  // ../temple/dist/server/env.js
  var require_env = __commonJS({
    "../temple/dist/server/env.js"(exports) {
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

  // ../temple/dist/server/props.js
  var require_props = __commonJS({
    "../temple/dist/server/props.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = props;
      var data_1 = __importDefault(require_data());
      function props() {
        return data_1.default.get("props") || {};
      }
    }
  });

  // ../temple/dist/server/classnames.js
  var require_classnames = __commonJS({
    "../temple/dist/server/classnames.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = classnames;
      var props_1 = __importDefault(require_props());
      function classnames() {
        return (0, props_1.default)()["class"];
      }
    }
  });

  // ../temple/dist/server/signal.js
  var require_signal = __commonJS({
    "../temple/dist/server/signal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = signal;
      function signal(value) {
        const methods = {
          getter: () => property.raw,
          setter: (value2) => value2
        };
        const property = {
          raw: value,
          getter(callback) {
            methods.getter = callback;
            return property;
          },
          setter(callback) {
            methods.setter = callback;
            return property;
          }
        };
        Object.defineProperty(property, "value", {
          get() {
            return methods.getter();
          },
          set(value2) {
            property.raw = methods.setter(value2);
          }
        });
        return property;
      }
    }
  });

  // ../temple/dist/server.js
  var require_server = __commonJS({
    "../temple/dist/server.js"(exports) {
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
      exports.TempleText = exports.TempleException = exports.TempleEmitter = exports.TempleElement = exports.TempleRegistry = exports.TempleDocument = exports.TempleCollection = exports.signal = exports.classnames = exports.props = exports.emitter = exports.env = exports.data = void 0;
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
      var classnames_1 = __importDefault(require_classnames());
      exports.classnames = classnames_1.default;
      var signal_1 = __importDefault(require_signal());
      exports.signal = signal_1.default;
    }
  });

  // ../temple/server.js
  var require_server2 = __commonJS({
    "../temple/server.js"(exports, module) {
      module.exports = { ...require_server() };
    }
  });

  // temple-document-server-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/index.dtml
  var pages_exports = {};
  __export(pages_exports, {
    default: () => Index_f01cefc94e8ee605f3f5
  });
  var import_server = __toESM(require_server2());
  var import_server2 = __toESM(require_server2());

  // src/modules/i18n/index.ts
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

  // temple-document-server-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/index.dtml
  var Index_f01cefc94e8ee605f3f5 = class extends import_server.TempleDocument {
    id() {
      return "f01cefc94e8ee605f3f5";
    }
    styles() {
      return `body {
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
  }`;
    }
    template() {
      const url = "/temple/index.html";
      const title = _("Temple - The reactive web component template engine.");
      const description = _("Temple is a template engine that generates web components and support reactivity.");
      const toggle = (_2) => {
        document.body.classList.toggle("panel-left-open");
      };
      return [
        import_server.TempleRegistry.createText(`
`, false),
        import_server.TempleRegistry.createElement("html", {}, [
          import_server.TempleRegistry.createText(`
  `, false),
          ...[
            import_server.TempleRegistry.createElement("head", {}, [
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "charset": `utf-8` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `viewport`, "content": `width=device-width, initial-scale=1` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("title", {}, [
                ...this._toNodeList(title)
              ]),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `description`, "content": description }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:title`, "content": title }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:description`, "content": description }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:image`, "content": `https://ossphilippines.github.io/temple/temple-logo.png` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:url`, "content": `https://ossphilippines.github.io/temple${url}` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "property": `og:type`, "content": `website` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:card`, "content": `summary` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:site`, "content": `@OSSPhilippines` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:title`, "content": title }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:description`, "content": description }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("meta", { "name": `twitter:image`, "content": `https://ossphilippines.github.io/temple/temple-logo.png` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `favicon`, "href": `/temple/favicon.ico` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `shortcut icon`, "type": `image/png`, "href": `/temple/favicon.png` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `/temple/styles/fontawesome/all.css` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `/temple/styles/theme.css` }),
              import_server.TempleRegistry.createText(`
  `, false),
              import_server.TempleRegistry.createElement("link", { "rel": `stylesheet`, "type": `text/css`, "href": `/temple/build/client/${(0, import_server2.env)("BUILD_ID")}.css` }),
              import_server.TempleRegistry.createText(`
  
  `, false),
              import_server.TempleRegistry.createElement("script", { "data-app": (0, import_server2.env)("APP_DATA"), "src": `/temple/build/client/${(0, import_server2.env)("BUILD_ID")}.js` }),
              import_server.TempleRegistry.createText(`
  `, false),
              ...!!((0, import_server2.env)("NODE_ENV") === "development") ? [
                import_server.TempleRegistry.createText(`
    `, false),
                import_server.TempleRegistry.createElement("script", { "src": `/dev.js` }),
                import_server.TempleRegistry.createText(`
  `, false)
              ] : [],
              import_server.TempleRegistry.createText(`
`, false)
            ])
          ],
          import_server.TempleRegistry.createText(`
  `, false),
          import_server.TempleRegistry.createElement("body", { "class": `dark panel with-head` }, [
            import_server.TempleRegistry.createText(`
    `, false),
            ...[
              import_server.TempleRegistry.createElement("header", { "class": `head panel-head` }, [
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("i", { "class": `menu fas fa-fw fa-bars`, "click": toggle }, []),
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("a", { "href": `/temple` }, [
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("img", { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }),
                  import_server.TempleRegistry.createText(`
  `, false)
                ]),
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  import_server.TempleRegistry.createElement("a", { "class": `tx-white`, "href": `/temple` }, [
                    import_server.TempleRegistry.createText(`Temple`, false)
                  ])
                ]),
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("nav", {}, [
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `tx-white`, "href": `/temple/docs/index.html` }, [
                    import_server.TempleRegistry.createText(`Docs`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `github`, "href": `https://github.com/OSSPhilippines/temple`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
      `, false),
                    import_server.TempleRegistry.createElement("i", { "class": `fab fa-github` }, []),
                    import_server.TempleRegistry.createText(`
    `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `npm`, "href": `https://www.npmjs.com/package/@ossph/temple`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
      `, false),
                    import_server.TempleRegistry.createElement("i", { "class": `fab fa-npm text-white` }, []),
                    import_server.TempleRegistry.createText(`
    `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `discord`, "href": `https://discord.gg/open-source-software-ph-905496362982981723`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
      `, false),
                    import_server.TempleRegistry.createElement("i", { "class": `fab fa-discord text-white` }, []),
                    import_server.TempleRegistry.createText(`
    `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
  `, false)
                ]),
                import_server.TempleRegistry.createText(`
`, false)
              ])
            ],
            import_server.TempleRegistry.createText(`
    `, false),
            import_server.TempleRegistry.createElement("panel-main", { "class": `panel-main` }, [
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-hero` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("img", { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h1", {}, [
                  ...this._toNodeList(_("Temple"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          The reactive web component template engine.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("tui-button", { "primary": true, "xl": true, "rounded": true, "style": `margin-right:10px;`, "href": `/temple/docs/getting-started.html` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  ...this._toNodeList(_("Get Started")),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("tui-button", { "secondary": true, "xl": true, "rounded": true, "href": `/temple/docs/index.html` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  ...this._toNodeList(_("Read the Docs")),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
      `, false)
              ]),
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-sample` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Temple is a modern HTML markup language and a server first 
          template engine with a built-in parser/compiler that 
          generates web components and supports reactivity.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Basic Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `split-view` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "numbers": true, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                const name = 'world';
              </script>
              <h1>Hello {name}!</h1>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-preview", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("div", {}, [
                        import_server.TempleRegistry.createText(`
                `, false),
                        import_server.TempleRegistry.createElement("h1", {}, [
                          ...this._toNodeList(_("Hello world!"))
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
                ]),
                import_server.TempleRegistry.createText(`
      `, false)
              ]),
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-bullets` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ul", {}, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("li", {}, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h3", {}, [
                      ...this._toNodeList(_("Expressive Markup"))
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              Any data type as attributes. Easily express logic with 
              markup directives like if, each, and try catch. 
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("li", {}, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h3", {}, [
                      ...this._toNodeList(_("Reactive Signals"))
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              Easily transition from backend logic to reactive states.
              No Hydration and no memoization needed.
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("li", {}, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h3", {}, [
                      ...this._toNodeList(_("Bare Metal"))
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              Work with the DOM directly. Import any web components 
              from any source. Works with Lit, HTMX.
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
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-interactive` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Server Setup"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Temple can be used with popular server 
          frameworks in just a few lines of code.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Server Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "lang": `js`, "numbers": true, "trim": true, "detab": 12 }, [
                    ...this._toNodeList(`
            import temple from '@ossph/temple/compiler';
            //make a temple compiler
            const compiler = temple();
            //render HTML
            const results = compiler.render('./page.dtml');
          `)
                  ]),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Props"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Import your component props and use immediately
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Props Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `split-view` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "numbers": true, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                import { props } from '@ossph/temple';
                const { name } = props();
              </script>
              <h1>Hello {name}!</h1>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-preview", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("div", {}, [
                        import_server.TempleRegistry.createText(`
                `, false),
                        import_server.TempleRegistry.createElement("h1", {}, [
                          ...this._toNodeList(_("Hello world!"))
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
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Reactive Signals"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Use signals to manage state changes and re-renders.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Signal Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `split-view` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "numbers": true, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <style>
                h1 { font-weight: bold; }
              </style>
              <script>
                import { signal } from '@ossph/temple';
                const name = signal('world');
                name.value += '!';
              </script>
              <h1>Hello {name.value}</h1>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-preview", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("div", {}, [
                        import_server.TempleRegistry.createText(`
                `, false),
                        import_server.TempleRegistry.createElement("h1", {}, [
                          ...this._toNodeList(_("Hello world!"))
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
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Components and Templates"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Import components and templates for reusability.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Import Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `split-view` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "numbers": true, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <!-- page.html -->
              <link rel="import" href="./my-heading.html" />
              <script>
                const name = 'world';
              </script>
              <my-heading {name}>Hello</my-heading>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "class": `div`, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <!-- my-heading.html -->
              <script>
                import { props } from '@ossph/temple';
                const { name, children } = props();
              </script>
              <h1>{children} {name}</h1>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Conditionals and Iterations"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Case for conditions and iterations in an expressive way.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "title": `Conditional + Iteration Example` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `split-view` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "numbers": true, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <script>
                const name = 'world';
                const show = name === "world";
              </script>

              <if true=show>
                <h1>Hello {name}</h1>
              </if>
            `)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("ide-code", { "class": `div`, "trim": true, "detab": 14 }, [
                      ...this._toNodeList(`
              <script>
                const list = [ 'a', 'b', 'c' ];
              </script>
              <ul>
                <each key=i value=item from=list>
                  <li>{i}: {item}</li>
                </each>
              </ul>
            `)
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
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-servers` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Works With Popular Server Frameworks"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("div", {}, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `https://expressjs.com/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png`, "alt": `Express` }),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `https://fastify.dev/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://upload.wikimedia.org/wikipedia/commons/0/0a/Fastify_logo.svg`, "alt": `Fastify` }),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `https://hapi.dev/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png`, "alt": `Hapi` }),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `https://koajs.com/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://cdn.icon-icons.com/icons2/2699/PNG/512/koajs_logo_icon_168379.png`, "alt": `Koa` }),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `https://nestjs.com/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://cdn.icon-icons.com/icons2/2699/PNG/512/nestjs_logo_icon_169927.png`, "alt": `NestJS` }),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `http://restify.com/`, "target": `_blank` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("img", { "src": `https://raw.githubusercontent.com/restify/node-restify/gh-images/logo/png/restify_logo_black_transp_288x288.png?raw=true`, "alt": `Restify` }),
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
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-testimonials` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Temple Loves Developers!"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("section", {}, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Joff Tiquez`, "handle": `@jrtiquez`, "href": `https://twitter.com/jrtiquez`, "src": `https://github.com/jofftiquez.png` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`Im a vue developer. No need for this. OSSPH does not support this project.`, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Primeagen`, "handle": `@theprimeagen`, "href": `https://twitter.com/ThePrimeagen`, "src": `https://pbs.twimg.com/profile_images/1759330620160049152/2i_wkOoK_400x400.jpg` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`Temple? Never heard of it...`, false),
                      import_server.TempleRegistry.createElement("br", {}),
                      import_server.TempleRegistry.createText(`"The Name..."`, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Kristian Quirapas`, "handle": `@YourCompanyCTO`, "href": `https://twitter.com/YourCompanyCTO`, "src": `https://avatars.githubusercontent.com/u/85150796?v=4` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`Temple is good news for Node developers. I'm a rust developer so it don't matter to me.`, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Drizzle Team`, "handle": `@drizzle.team`, "href": `https://twitter.com/DrizzleORM`, "src": `https://pbs.twimg.com/profile_images/1767809210060877824/mAtEmNk0_400x400.jpg` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`Temple copied this section from us. We are the original.`, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Chris B`, "handle": `@cblanquera`, "href": `https://twitter.com/cblanquera`, "src": `https://avatars.githubusercontent.com/u/120378?v=4` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`After creating the Temple project, I am really excited to get back to ReactJS.`, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("tweet-box", { "name": `Theo`, "handle": `@t3dotgg`, "href": `https://twitter.com/t3dotgg`, "src": `https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s160-c-k-c0x00ffffff-no-rj` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("p", {}, [
                      import_server.TempleRegistry.createText(`Temple? no thanks. Keep your stack front end. App router for life.`, false)
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
      `, false),
              import_server.TempleRegistry.createElement("section", { "class": `section-action` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("What are you waiting for?"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("tui-button", { "primary": true, "xl": true, "rounded": true, "style": `margin-right:10px;`, "href": `/temple/docs/getting-started.html` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  ...this._toNodeList(_("Get Started")),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("tui-button", { "secondary": true, "xl": true, "rounded": true, "href": `/temple/docs/index.html` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  ...this._toNodeList(_("Read the Docs")),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
      `, false)
              ]),
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("footer", { "class": `foot` }, []),
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
  return __toCommonJS(pages_exports);
})();
