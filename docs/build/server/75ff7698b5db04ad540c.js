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

  // temple-document-server-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/component-strategy.dtml
  var component_strategy_exports = {};
  __export(component_strategy_exports, {
    default: () => ComponentStrategy_75ff7698b5db04ad540c
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

  // temple-document-server-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/component-strategy.dtml
  var ComponentStrategy_75ff7698b5db04ad540c = class extends import_server.TempleDocument {
    id() {
      return "75ff7698b5db04ad540c";
    }
    styles() {
      return ``;
    }
    template() {
      const url = "/docs/component-strategy.html";
      const title = _("Component Strategy - Temple reactive web component template engine.");
      const description = _("Learn more about web components and how they work with Temple.");
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
          import_server.TempleRegistry.createElement("body", { "class": `dark panel with-head with-left with-right` }, [
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
            ...[
              import_server.TempleRegistry.createElement("aside", { "class": `left panel-left` }, [
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("header", {}, [
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
                  import_server.TempleRegistry.createElement("i", { "class": `toggle fas fa-fw fa-chevron-left`, "click": toggle }, []),
                  import_server.TempleRegistry.createText(`
  `, false)
                ]),
                import_server.TempleRegistry.createText(`
  `, false),
                import_server.TempleRegistry.createElement("nav", {}, [
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("h6", {}, [
                    import_server.TempleRegistry.createText(`Introduction`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/index.html` }, [
                    import_server.TempleRegistry.createText(`Documentation`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/getting-started.html` }, [
                    import_server.TempleRegistry.createText(`Getting Started`, false)
                  ]),
                  import_server.TempleRegistry.createText(`

    `, false),
                  import_server.TempleRegistry.createElement("h6", {}, [
                    import_server.TempleRegistry.createText(`Features`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/markup-syntax.html` }, [
                    import_server.TempleRegistry.createText(`Markup Syntax`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/state-management.html` }, [
                    import_server.TempleRegistry.createText(`State Management`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/component-strategy.html` }, [
                    import_server.TempleRegistry.createText(`Component Strategy`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/compiler-api.html` }, [
                    import_server.TempleRegistry.createText(`Compiler API`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/client-api.html` }, [
                    import_server.TempleRegistry.createText(`Client API`, false)
                  ]),
                  import_server.TempleRegistry.createText(`

    `, false),
                  import_server.TempleRegistry.createElement("h6", {}, [
                    import_server.TempleRegistry.createText(`Usage`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/template-engine.html` }, [
                    import_server.TempleRegistry.createText(`Template Engine`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/single-page.html` }, [
                    import_server.TempleRegistry.createText(`Single Page App`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/static-site.html` }, [
                    import_server.TempleRegistry.createText(`Static Site Generator`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/component-publisher.html` }, [
                    import_server.TempleRegistry.createText(`Component Publisher`, false)
                  ]),
                  import_server.TempleRegistry.createText(`
    `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `/temple/docs/developer-tools.html` }, [
                    import_server.TempleRegistry.createText(`Developer Tools`, false)
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
            import_server.TempleRegistry.createElement("aside", { "class": `panel-right right` }, [
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("h6", {}, [
                ...this._toNodeList(_("On this page"))
              ]),
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("nav", {}, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("a", { "href": `#document` }, [
                  ...this._toNodeList(_("Document"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("a", { "href": `#template` }, [
                  ...this._toNodeList(_("Template"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("a", { "href": `#component` }, [
                  ...this._toNodeList(_("Component"))
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("nav", {}, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `#strat-1` }, [
                    ...this._toNodeList(_("Strategy 1"))
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `#strat-2` }, [
                    ...this._toNodeList(_("Strategy 2"))
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `#strat-3` }, [
                    ...this._toNodeList(_("Strategy 3"))
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "href": `#strat-4` }, [
                    ...this._toNodeList(_("Strategy 4"))
                  ]),
                  import_server.TempleRegistry.createText(`
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("a", { "href": `#fouc` }, [
                  ...this._toNodeList(_("FOUC"))
                ]),
                import_server.TempleRegistry.createText(`
      `, false)
              ]),
              import_server.TempleRegistry.createText(`
    `, false)
            ]),
            import_server.TempleRegistry.createText(`
    `, false),
            import_server.TempleRegistry.createElement("panel-main", { "class": `panel-main` }, [
              import_server.TempleRegistry.createText(`
      `, false),
              import_server.TempleRegistry.createElement("div", { "class": `docs container` }, [
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h1", {}, [
                  ...this._toNodeList(_("Component Strategy"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          There are three types of components in Temple: Document, 
          Template, and Component. Each type of component has a 
          different strategy for rendering and updating the DOM. The 
          Document component is the root component of the application 
          and is responsible for rendering the entire application. The 
          Template component is a reusable component that can be used 
          in multiple places in the application. The Component component 
          is a custom component that can be used to create complex UI 
          elements.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("a", { "name": `document` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h2", {}, [
                  ...this._toNodeList(_("Document"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          A document denoted by files with the 
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    import_server.TempleRegistry.createText(`.dtml`, false)
                  ]),
                  import_server.TempleRegistry.createText(` extension, is the root of
          each page view that should include the document markup 
          starting with `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<html>`)
                  ]),
                  import_server.TempleRegistry.createText(`. While 
          it looks like another Temple component, there are some key 
          differences in how it is used.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ul", {}, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("li", {}, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              A document logic (`, false),
                      import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                        ...this._toNodeList(`<script>`)
                      ]),
                      import_server.TempleRegistry.createText(`)
              is executed on the client side but is not a 
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                        import_server.TempleRegistry.createText(`TempleComponent`, false)
                      ]),
                      import_server.TempleRegistry.createText(`, which means 
              it cannot be re-rendered and does not have access to 
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                        import_server.TempleRegistry.createText(`this`, false)
                      ]),
                      import_server.TempleRegistry.createText(` context.
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
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              A document `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                        ...this._toNodeList(`props()`)
                      ]),
                      import_server.TempleRegistry.createText(` are the 
              server props passed down to the client.
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
                    import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                      import_server.TempleRegistry.createText(`
              A document does not have access to NodeJS functionality. So 
              things like `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                        import_server.TempleRegistry.createText(`fs`, false)
                      ]),
                      import_server.TempleRegistry.createText(` are not available.
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
                import_server.TempleRegistry.createElement("tui-alert", { "curved": true, "info": true }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-info-circle` }, []),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("strong", {}, [
                    import_server.TempleRegistry.createText(`Recommendation:`, false)
                  ]),
                  import_server.TempleRegistry.createText(` You should do server related
          logic on the server framework and pass the neccesary data 
          to the client.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 250, "title": `Passing Server Props` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `document`, "selector": `#index-ts` }, [
                        import_server.TempleRegistry.createText(`
                src/index.ts
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `document`, "selector": `#page-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `document`, "selector": `#index-ts` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              index.ts
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `document`, "selector": `#page-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `index-ts`, "lang": `js`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                import http from 'http';
                import temple from '@ossph/temple/compiler';

                const compiler = temple({ cwd: __dirname });
                const server = http.createServer(async (req, res) => {
                  //pass server props to document
                  res.end(await compiler.render('./index.dtml', {
                    title: 'Hello World'
                  }));
                });
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page-dtml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  //from the server
                  const { title } = props();
                </script>
                <html>
                  <body>
                    <h1 class="title">{title}</h1>
                  </body>
                </html>
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
                import_server.TempleRegistry.createElement("a", { "name": `template` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h2", {}, [
                  ...this._toNodeList(_("Template"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          A template is resuable partial markup that can be imported by 
          a component, document or another template. A template is 
          not is not a `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    import_server.TempleRegistry.createText(`TempleComponent`, false)
                  ]),
                  import_server.TempleRegistry.createText(`, but 
          rather adds its markup to the parent component's final markup.
          You will not see a template in the DOM, but rather the
          markup it contains.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          For example, consider a document that contains the following 
          markup.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-code", { "trim": true, "detab": 10 }, [
                  ...this._toNodeList(`
          <script>
            const title = 'Hello World';
          </script>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>{title}</title>
            </head>
            <body>
              <h1>{title}</h1>
            </body>
          </html>
        `)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          You can create a template for the head of your
          document and then import it. This allows you to
          reuse the head markup in multiple documents.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 250, "title": `Using Templates` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `templates`, "selector": `#page2-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `templates`, "selector": `#head-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/head.tml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `templates`, "selector": `#page2-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `templates`, "selector": `#head-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              head.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page2-dtml`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="import" type="template" href="./head.tml" name="html-head" />
                <script>
                  const title = 'Hello World';
                </script>
                <html>
                  <html-head />
                  <body>
                    <h1>{title}</h1>
                  </body>
                </html>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `head-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>
                </head>
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
                import_server.TempleRegistry.createElement("tui-alert", { "curved": true, "info": true }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-info-circle` }, []),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("strong", {}, [
                    import_server.TempleRegistry.createText(`Note:`, false)
                  ]),
                  import_server.TempleRegistry.createText(` Template partials do not process 
          attributes or children if given.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Variables used in a template should be declared in the
          parent component or document. This allows you to pass
          data to the template from the parent.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("a", { "name": `component` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h2", {}, [
                  ...this._toNodeList(_("Component"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          All temple components are 
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    import_server.TempleRegistry.createText(`TempleComponent`, false)
                  ]),
                  import_server.TempleRegistry.createText(` that extends
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    import_server.TempleRegistry.createText(`HTMLElement`, false)
                  ]),
                  import_server.TempleRegistry.createText(` and therefore is 
          both a web component and element just like any other element 
          in the browser DOM. Components that do not use the
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<style>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag are affected by 
          the global styles of the application. Components with the
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<style>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag enable the 
          component's shadow DOM and will encapsulate the styles within
          the component and not be affected by global styles. With that 
          said, there are several strategies that can be applied to 
          Temple components.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("a", { "name": `strat-1` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Strategy 1: No Components"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          This strategy uses only documents and templates. This 
          strategy is useful for simple applications that do not require 
          complex UI elements. This is the best strategy for 
          performant applications.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 400, "title": `No Components` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `strat-1`, "selector": `#page3-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-1`, "selector": `#head3-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/head.tml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-1`, "selector": `#header3-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/header.tml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-1`, "selector": `#footer3-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/footer.tml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `strat-1`, "selector": `#page3-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-1`, "selector": `#head3-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              head.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-1`, "selector": `#header3-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              header.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-1`, "selector": `#footer3-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              footer.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page3-dtml`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="import" type="template" href="./head.tml" name="html-head" />
                <link rel="import" type="template" href="./header.tml" name="page-header" />
                <link rel="import" type="template" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                </script>
                <html>
                  <html-head />
                  <body>
                    <page-header />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer />
                  </body>
                </html>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `head3-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <head>
                  <meta charset="utf-8" />
                  <title>{title}</title>

                  <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                  <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                </head>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `header3-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <header>
                  <img src="/logo.png" alt="Logo" />
                  <h6>Brand</h6>
                </header>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `footer3-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025</copy>
                </footer>
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
                import_server.TempleRegistry.createElement("a", { "name": `strat-2` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Strategy 2: Shallow Components"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          This strategy uses components that do not have a 
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<style>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag and is useful for 
          applications that require complex logic in components but 
          using a shared global stylesheet.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 400, "title": `Shallow Components` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `strat-2`, "selector": `#page4-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-2`, "selector": `#header4-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/header.tml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-2`, "selector": `#footer4-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/footer.tml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `strat-2`, "selector": `#page4-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-2`, "selector": `#header4-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              header.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-2`, "selector": `#footer4-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              footer.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page4-dtml`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `header4-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `footer4-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
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
                import_server.TempleRegistry.createElement("a", { "name": `strat-3` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Strategy 3: Partial Styling"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          This strategy uses components that do not have a 
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<style>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag,
          but imports style via the 
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<link>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag to utilize both 
          global styles and specific styles that are needed for the
          component. 
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 400, "title": `Shallow Components` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-3`, "selector": `#page5-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `strat-3`, "selector": `#header5-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/header.tml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-3`, "selector": `#footer5-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/footer.tml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-3`, "selector": `#page5-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `strat-3`, "selector": `#header5-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              header.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-3`, "selector": `#footer5-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              footer.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page5-dtml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `header5-tml`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="stylesheet" type="text/css" href="/header.css" />
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `footer5-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="stylesheet" type="text/css" href="/footer.css" />
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
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
                import_server.TempleRegistry.createElement("a", { "name": `strat-4` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h3", {}, [
                  ...this._toNodeList(_("Strategy 4: Encapulation"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          This strategy uses components that have a
          `, false),
                  import_server.TempleRegistry.createElement("ide-code", { "inline": true }, [
                    ...this._toNodeList(`<style>`)
                  ]),
                  import_server.TempleRegistry.createText(` tag and encapsulates
          the styles within the component. This strategy is useful for
          applications that require complex UI elements that need to be
          styled in a specific way. This is also useful for components 
          that are designed to be used in multiple projects.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-app", { "panel": 400, "title": `Encapsulation` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-head` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("div", { "class": `tabs` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-4`, "selector": `#page6-dtml` }, [
                        import_server.TempleRegistry.createText(`
                src/page.dtml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab active`, "group": `strat-4`, "selector": `#header6-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/header.tml
              `, false)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("tui-tab", { "class": `tab`, "group": `strat-4`, "selector": `#footer6-tml` }, [
                        import_server.TempleRegistry.createText(`
                src/footer.tml
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
                  import_server.TempleRegistry.createElement("div", { "class": `panel-left` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("h5", { "class": `folder` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-down` }, []),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("span", {}, [
                        import_server.TempleRegistry.createText(`src`, false)
                      ]),
                      import_server.TempleRegistry.createText(`
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-4`, "selector": `#page6-dtml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              page.dtml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block active`, "group": `strat-4`, "selector": `#header6-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              header.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("tui-tab", { "class": `shift-1 block`, "group": `strat-4`, "selector": `#footer6-tml` }, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-file` }, []),
                      import_server.TempleRegistry.createText(`
              footer.tml
            `, false)
                    ]),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("div", { "class": `panel-main` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("main", {}, [
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `page6-dtml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <link rel="import" type="component" href="./header.tml" name="page-header" />
                <link rel="import" type="component" href="./footer.tml" name="page-footer" />
                <script>
                  import { env } from '@ossph/temple';
                  const { BUILD_ID, APP_DATA } = env();
                  const title = 'Hello World';
                  const brand = 'Acme Inc.';
                  const logo = '/logo.png';
                </script>
                <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>{title}</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css" />

                    <link rel="stylesheet" type="text/css" href={\`/build/\${BUILD_ID}.css\`} />
                    <script data-app={APP_DATA} src={\`/build/\${BUILD_ID}.js\`}></script>
                  </head>
                  <body>
                    <page-header {brand} {logo} />
                    <main>
                      <h1>{title}</h1>
                    </main>
                    <page-footer {brand} />
                  </body>
                </html>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `header6-tml`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <style>
                  img { width: 100px; height: 100px; }
                  h6 { margin: 0; }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { brand, logo } = props();
                </script>
                <header>
                  <img src={logo} alt={brand} />
                  <h6>{brand}</h6>
                </header>
              `)
                      ]),
                      import_server.TempleRegistry.createText(`
              `, false),
                      import_server.TempleRegistry.createElement("ide-code", { "id": `footer6-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, [
                        ...this._toNodeList(`
                <style>
                  copy { 
                    display: block; 
                    text-align: center; 
                  }
                </style>
                <script>
                  import { props } from '@ossph/temple';
                  const { brand } = props();
                </script>
                <footer>
                  <a href="/about">About</a>
                  <copy>&copy; 2025 {brand}</copy>
                </footer>
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
                import_server.TempleRegistry.createElement("a", { "name": `fouc` }, []),
                import_server.TempleRegistry.createText(`
        `, false),
                import_server.TempleRegistry.createElement("h2", {}, [
                  ...this._toNodeList(_("Flash of Unstyled Content"))
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          Web Components (custom elements) are 100% defined in 
          JavaScript. That includes their HTML and CSS. Those are 
          programmatically added to the DOM through APIs. By the time 
          the browser has interpreted and executed that code, there is 
          a good chance that the rendering pipeline has already put the 
          custom element on the screen. Since the browser doesn't know 
          about the element the first time around it will render it 
          without the intended styling. After the JavaScript of the 
          custom element definition is executed and the browser, 
          therefore, knows about the CSS rules that apply to that 
          element it can update the view.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          A flash of unstyled content (FOUC) can cause irritating layout 
          shifts as well as reveal content that should have been 
          progressively disclosed. In order to prevent a reflow of other 
          content you can add the following general solution to your 
          global stylesheet.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("ide-code", { "lang": `css`, "numbers": true, "detab": 10 }, [
                  ...this._toNodeList(`
          *:not(:defined) {
            opacity: 0;
          }
        `)
                ]),
                import_server.TempleRegistry.createText(`

        `, false),
                import_server.TempleRegistry.createElement("i18n-translate", { "p": true, "trim": true }, [
                  import_server.TempleRegistry.createText(`
          This style will apply to all elements that are not defined,
          which are usually web components and will hide the content 
          until the browser has fully rendered the component.
        `, false)
                ]),
                import_server.TempleRegistry.createText(`
        
        `, false),
                import_server.TempleRegistry.createElement("nav", { "class": `pager` }, [
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `prev`, "href": `/temple/docs/state-management.html` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-left` }, []),
                    import_server.TempleRegistry.createText(`
            `, false),
                    ...this._toNodeList(_("State Management")),
                    import_server.TempleRegistry.createText(`
          `, false)
                  ]),
                  import_server.TempleRegistry.createText(`
          `, false),
                  import_server.TempleRegistry.createElement("a", { "class": `next`, "href": `/temple/docs/compiler-api.html` }, [
                    import_server.TempleRegistry.createText(`
            `, false),
                    ...this._toNodeList(_("Compiler API")),
                    import_server.TempleRegistry.createText(`
            `, false),
                    import_server.TempleRegistry.createElement("i", { "class": `fas fa-fw fa-chevron-right` }, []),
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
  return __toCommonJS(component_strategy_exports);
})();
