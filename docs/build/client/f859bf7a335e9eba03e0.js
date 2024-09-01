var TempleBundle = (() => {
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
      var TempleException3 = class extends Error {
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
      exports.default = TempleException3;
    }
  });

  // ../temple/dist/client/TempleEmitter.js
  var require_TempleEmitter = __commonJS({
    "../temple/dist/client/TempleEmitter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TempleEmitter = void 0;
      var TempleEmitter2 = class extends EventTarget {
        emit(event, target) {
          this.dispatchEvent(new CustomEvent(event, { detail: target }));
          return this;
        }
        on(event, callback) {
          if (event === "ready") {
            if (document.readyState !== "loading") {
              const event2 = new CustomEvent("ready");
              setTimeout(() => callback(event2), 1);
              return this;
            }
          }
          this.addEventListener(event, callback);
          return this;
        }
        once(event, callback) {
          const unbinder = (e) => {
            this.unbind(event, unbinder);
            callback(e);
          };
          this.on(event, unbinder);
          return this;
        }
        unbind(event, callback) {
          this.removeEventListener(event, callback);
          return this;
        }
      };
      exports.TempleEmitter = TempleEmitter2;
      var emitter3 = new TempleEmitter2();
      document.onreadystatechange = () => {
        if (document.readyState !== "loading") {
          emitter3.emit("ready");
        }
      };
      exports.default = emitter3;
    }
  });

  // ../temple/dist/client/TempleElement.js
  var require_TempleElement = __commonJS({
    "../temple/dist/client/TempleElement.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleEmitter_1 = __importDefault(require_TempleEmitter());
      var TempleElement2 = class {
        get attributes() {
          return Object.assign({}, this._attributes);
        }
        get element() {
          return this._element;
        }
        constructor(element, attributes) {
          this._element = element;
          this._attributes = attributes;
        }
        hasAttribute(key) {
          return key in this._attributes;
        }
        getAttribute(key) {
          return this._attributes[key];
        }
        removeAttribute(key, silent = false) {
          const current = this.getAttribute(key);
          if (typeof current === "undefined") {
            return this;
          }
          delete this._attributes[key];
          this._element.removeAttribute(key);
          if (!silent) {
            TempleEmitter_1.default.emit("attribute-remove", {
              element: this,
              key,
              previous: current
            });
          }
          return this;
        }
        setAttribute(key, value, silent = false) {
          if (typeof value === "undefined") {
            return this.removeAttribute(key, silent);
          }
          const current = this.getAttribute(key);
          if (current === value) {
            return this;
          }
          this._attributes[key] = value;
          if (typeof value === "string") {
            this._element.setAttribute(key, value);
          }
          if (!silent) {
            if (typeof current === "undefined") {
              TempleEmitter_1.default.emit("attribute-create", { element: this, key, value });
            } else {
              TempleEmitter_1.default.emit("attribute-update", {
                element: this,
                key,
                value,
                previous: current
              });
            }
          }
          return this;
        }
        setAttributes(attributes, silent = false) {
          for (const [key, value] of Object.entries(attributes)) {
            this.setAttribute(key, value, silent);
          }
          const names = Object.keys(attributes);
          for (const key of Object.keys(this._attributes)) {
            if (!names.includes(key)) {
              this.removeAttribute(key, silent);
            }
          }
          return this;
        }
      };
      exports.default = TempleElement2;
    }
  });

  // ../temple/dist/client/TempleRegistry.js
  var require_TempleRegistry = __commonJS({
    "../temple/dist/client/TempleRegistry.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleElement_1 = __importDefault(require_TempleElement());
      var TempleRegistry5 = class {
        static get elements() {
          return this._elements;
        }
        static createComponent(definition, attributes, children3 = []) {
          const tagname = definition.component[0];
          const template = document.createElement("template");
          template.innerHTML = `<${tagname}></${tagname}>`;
          const fragment = template.content;
          const component = fragment.querySelector(`${tagname}`);
          Object.setPrototypeOf(component, definition.prototype);
          component.constructor = definition.constructor;
          component.constructor.component = definition.component;
          for (const [key, value] of Object.entries(attributes)) {
            if (typeof value === "string") {
              component.setAttribute(key, value);
            } else if (value === true) {
              component.setAttribute(key, key);
            }
          }
          component._TempleAttributes = attributes;
          component.props = attributes;
          children3.forEach((child) => component.appendChild(child));
          component.register();
          return this.register(component, attributes);
        }
        static createElement(name, attributes, children3 = []) {
          const element = document.createElement(name);
          for (const [key, value] of Object.entries(attributes)) {
            if (typeof value === "string") {
              element.setAttribute(key, value);
            } else if (value === true) {
              element.setAttribute(key, key);
            }
          }
          children3.filter((child) => typeof child !== "undefined").forEach((child) => element.appendChild(child));
          return this.register(element, attributes);
        }
        static createText(value, escape = false) {
          return document.createTextNode(value);
        }
        static filter(callback) {
          const elements = [];
          this._elements.forEach((temple, html) => {
            if (callback(temple, html)) {
              elements.push(temple);
            }
          });
          return elements;
        }
        static get(element) {
          return this._elements.get(element) || null;
        }
        static has(element) {
          return this._elements.has(element);
        }
        static map(callback) {
          const elements = [];
          this._elements.forEach((temple, html) => {
            elements.push(callback(temple, html));
          });
          return elements;
        }
        static register(element, attributes) {
          if (this.has(element)) {
            return this.get(element);
          }
          const node = new TempleElement_1.default(element, attributes || {});
          this._elements.set(element, node);
          return node;
        }
      };
      TempleRegistry5._elements = /* @__PURE__ */ new Map();
      exports.default = TempleRegistry5;
    }
  });

  // ../temple/dist/client/data.js
  var require_data = __commonJS({
    "../temple/dist/client/data.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TempleDataMap = void 0;
      var TempleDataMap = class {
        constructor() {
          if (!window.__APP_DATA__) {
            window.__APP_DATA__ = {};
          }
        }
        clear() {
          window.__APP_DATA__ = {};
          return this;
        }
        delete(key) {
          if (this.has(key)) {
            delete window.__APP_DATA__[key];
            return true;
          }
          return false;
        }
        entries() {
          return Object.entries(window.__APP_DATA__);
        }
        has(key) {
          return key in window.__APP_DATA__;
        }
        get(key) {
          return window.__APP_DATA__[key];
        }
        keys() {
          return Object.keys(window.__APP_DATA__);
        }
        set(key, value) {
          window.__APP_DATA__[key] = value;
          return this;
        }
        values() {
          return Object.values(window.__APP_DATA__);
        }
      };
      exports.TempleDataMap = TempleDataMap;
      var data2 = new TempleDataMap();
      exports.default = data2;
    }
  });

  // ../temple/dist/client/TempleComponent.js
  var require_TempleComponent = __commonJS({
    "../temple/dist/client/TempleComponent.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      var TempleEmitter_1 = __importDefault(require_TempleEmitter());
      var data_1 = __importDefault(require_data());
      var TempleComponent4 = class _TempleComponent extends HTMLElement {
        constructor() {
          super(...arguments);
          this._initiated = false;
          this._template = null;
          this._attributes = {};
          this._props = {};
          this._children = void 0;
        }
        static register() {
          customElements.define(this.component[0], this);
        }
        get attr() {
          return this._attributes;
        }
        get element() {
          if (!TempleRegistry_1.default.has(this)) {
            return TempleRegistry_1.default.register(this, this._TempleAttributes || {});
          }
          return TempleRegistry_1.default.get(this);
        }
        get metadata() {
          const [tagname, classname] = this.constructor.component;
          return { tagname, classname };
        }
        get originalChildren() {
          return this._children;
        }
        get initiated() {
          return this._initiated;
        }
        get props() {
          return this._props;
        }
        set props(props2) {
          this._props = Object.assign({}, props2);
          this._attributes = Object.fromEntries(Object.entries(props2).filter((entry) => typeof entry[1] === "string" || entry[1] === true));
        }
        adoptedCallback() {
          this.render();
        }
        attributeChangedCallback(name, previous, value) {
          this.props = Object.assign(Object.assign({}, this.props), { [name]: value });
          this.render();
        }
        connectedCallback() {
          this.wait();
        }
        disconnectedCallback() {
        }
        getParentComponent() {
          let parent = this.parentElement;
          while (parent) {
            if (parent instanceof _TempleComponent) {
              return parent;
            }
            parent = parent.parentElement;
          }
          return null;
        }
        register() {
          TempleRegistry_1.default.register(this, this._props);
        }
        render() {
          const parent = this.getParentComponent();
          if (parent && !parent.initiated) {
            return;
          }
          data_1.default.set("current", this);
          const styles = this.styles();
          if (!this._template) {
            this._template = this.template();
          } else {
            TempleEmitter_1.default.emit("unmounted", this);
          }
          const children3 = this._template().filter(Boolean);
          if (styles.length === 0) {
            this.textContent = "";
            children3.forEach((child) => this.appendChild(child));
          } else {
            if (!this.shadowRoot) {
              this.attachShadow({ mode: "open" });
            }
            const shadowRoot = this.shadowRoot;
            this.textContent = "";
            shadowRoot.textContent = "";
            const style = document.createElement("style");
            style.innerText = styles;
            shadowRoot.appendChild(style);
            children3.forEach((child) => {
              var _a;
              return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(child);
            });
          }
          data_1.default.delete("current");
          this._initiated = true;
          TempleEmitter_1.default.emit("mounted", this);
          return this.shadowRoot ? this.shadowRoot.innerHTML : this.innerHTML;
        }
        wait() {
          if (document.readyState !== "loading") {
            this._update();
          } else {
            const next = () => {
              this._update();
              TempleEmitter_1.default.unbind("ready", next);
            };
            TempleEmitter_1.default.on("ready", next);
          }
        }
        _toNodeList(value) {
          if (value instanceof Node) {
            return [value];
          }
          if (Array.isArray(value)) {
            if (value.every((item) => item instanceof Node)) {
              return value;
            }
          }
          return [TempleRegistry_1.default.createText(String(value))];
        }
        _update() {
          if (typeof this._children === "undefined") {
            this._children = Array.from(this.childNodes || []);
          }
          const element = this.element;
          if (element) {
            this.props = Object.assign({}, element.attributes);
            this.render();
          }
          if (!this._initiated) {
            this.render();
          }
        }
      };
      exports.default = TempleComponent4;
    }
  });

  // ../temple/dist/client/env.js
  var require_env = __commonJS({
    "../temple/dist/client/env.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var data_1 = __importDefault(require_data());
      function env(name) {
        const env2 = data_1.default.get("env") || {};
        if (name) {
          return env2[name] || null;
        }
        return env2;
      }
      exports.default = env;
    }
  });

  // ../temple/dist/client/props.js
  var require_props = __commonJS({
    "../temple/dist/client/props.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = props2;
      var data_1 = __importDefault(require_data());
      function props2(component = null) {
        if (!component) {
          component = data_1.default.get("current") || null;
        }
        if (component) {
          if (component === "document") {
            return data_1.default.get("props") || {};
          }
          return component.props;
        }
        return {};
      }
    }
  });

  // ../temple/dist/client/classnames.js
  var require_classnames = __commonJS({
    "../temple/dist/client/classnames.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = classnames;
      var props_1 = __importDefault(require_props());
      function classnames(component = null) {
        return (0, props_1.default)(component)["class"];
      }
    }
  });

  // ../temple/dist/client/children.js
  var require_children = __commonJS({
    "../temple/dist/client/children.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.innerHTML = innerHTML;
      exports.default = children3;
      var data_1 = __importDefault(require_data());
      function innerHTML(component = null) {
        const inner = children3(component);
        const wrapper = document.createElement("template");
        wrapper.append(...inner);
        return wrapper.innerHTML;
      }
      function children3(component = null) {
        if (!component) {
          component = data_1.default.get("current") || null;
        }
        return component ? component.originalChildren || [] : [];
      }
    }
  });

  // ../temple/dist/client/signal.js
  var require_signal = __commonJS({
    "../temple/dist/client/signal.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SignalRegistry = void 0;
      exports.default = signal2;
      var Exception_1 = __importDefault(require_Exception());
      var data_1 = __importDefault(require_data());
      var SignalRegistry = class _SignalRegistry {
        static observe(component, value) {
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
              const formatted = methods.setter(value2);
              const rerender = _SignalRegistry.serialize(formatted) !== _SignalRegistry.serialize(property.raw);
              property.raw = formatted;
              if (rerender) {
                component.render();
              }
            }
          });
          const observer = this._observers.get(component);
          if (!observer) {
            this._observers.set(component, {
              observed: 1,
              values: [property]
            });
          } else {
            observer.observed++;
            observer.values.push(property);
          }
          return property;
        }
        static observer(component) {
          return this._observers.get(component) || null;
        }
        static serialize(value) {
          return JSON.stringify(value);
        }
      };
      exports.SignalRegistry = SignalRegistry;
      SignalRegistry._observers = /* @__PURE__ */ new Map();
      function signal2(value, component = null) {
        if (!component) {
          component = data_1.default.get("current") || null;
        }
        if (!component) {
          throw Exception_1.default.for("Signals can only be created within a Temple component");
        }
        if (!component.initiated) {
          return SignalRegistry.observe(component, value);
        }
        const observer = SignalRegistry.observer(component);
        if (!observer) {
          throw Exception_1.default.for("State mismatch");
        }
        const values = observer.values;
        return values[observer.observed++ % observer.values.length];
      }
    }
  });

  // ../temple/dist/client/helpers.js
  var require_helpers = __commonJS({
    "../temple/dist/client/helpers.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      var TempleEmitter_1 = __importDefault(require_TempleEmitter());
      var match = (element, attribute) => {
        return Array.from(element.querySelectorAll("*")).filter((element2) => {
          const node = TempleRegistry_1.default.get(element2);
          return node && node.hasAttribute(attribute);
        }).map((element2) => TempleRegistry_1.default.get(element2));
      };
      function bindAttribute(name, bind) {
        TempleEmitter_1.default.on("mounted", (e) => {
          if (!e.detail)
            return;
          const element = e.detail;
          match(element.shadowRoot || element, name).forEach(bind);
        });
      }
      function unbindAttribute(name, bind) {
        TempleEmitter_1.default.on("unmounted", (e) => {
          if (!e.detail)
            return;
          const element = e.detail;
          match(element.shadowRoot || element, name).forEach(bind);
        });
      }
      bindAttribute("mount", (element) => {
        const callback = element.getAttribute("mount");
        if (typeof callback === "function") {
          const event = new CustomEvent("mount", {
            detail: {
              node: element,
              target: element.element
            }
          });
          callback(event);
        }
      });
      unbindAttribute("unmount", (element) => {
        const callback = element.getAttribute("unmount");
        if (typeof callback === "function") {
          const event = new CustomEvent("unmount", {
            detail: {
              node: element,
              target: element.element
            }
          });
          callback(event);
        }
      });
      bindAttribute("if", (element) => {
        const condition = element.getAttribute("if");
        if (condition === false || condition === "false") {
          element.element.remove();
        } else if (typeof condition === "function" && !condition()) {
          element.element.remove();
        }
      });
      [
        "click",
        "dblclick",
        "mousedown",
        "mouseup",
        "mousemove",
        "mouseover",
        "mouseout",
        "wheel",
        "keydown",
        "keypress",
        "keyup",
        "blur",
        "change",
        "contextmenu",
        "focus",
        "input",
        "submit",
        "invalid",
        "reset",
        "search",
        "select",
        "copy",
        "cut",
        "paste",
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
        "scroll",
        "durationchange",
        "ended",
        "error",
        "loadeddata",
        "loadedmetadata",
        "loadstart",
        "pause",
        "play",
        "playing",
        "progress",
        "ratechange",
        "seeked",
        "seeking",
        "stalled",
        "suspend",
        "timeupdate",
        "volumechange",
        "waiting",
        "animationstart",
        "animationend",
        "animationiteration",
        "transitionend",
        "toggle"
      ].forEach((event) => bindAttribute(event, (element) => {
        const callback = element.getAttribute(event);
        if (typeof callback === "function") {
          element.element.removeEventListener(event, callback);
          element.element.addEventListener(event, callback);
        }
      }));
    }
  });

  // ../temple/dist/client.js
  var require_client = __commonJS({
    "../temple/dist/client.js"(exports) {
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
      exports.SignalRegistry = exports.TempleException = exports.TempleEmitter = exports.TempleElement = exports.TempleRegistry = exports.TempleComponent = exports.TempleDataMap = exports.emitter = exports.signal = exports.innerHTML = exports.children = exports.classnames = exports.props = exports.env = exports.data = void 0;
      var Exception_1 = __importDefault(require_Exception());
      exports.TempleException = Exception_1.default;
      var TempleComponent_1 = __importDefault(require_TempleComponent());
      exports.TempleComponent = TempleComponent_1.default;
      var TempleRegistry_1 = __importDefault(require_TempleRegistry());
      exports.TempleRegistry = TempleRegistry_1.default;
      var TempleElement_1 = __importDefault(require_TempleElement());
      exports.TempleElement = TempleElement_1.default;
      var TempleEmitter_1 = __importStar(require_TempleEmitter());
      exports.emitter = TempleEmitter_1.default;
      Object.defineProperty(exports, "TempleEmitter", { enumerable: true, get: function() {
        return TempleEmitter_1.TempleEmitter;
      } });
      var data_1 = __importStar(require_data());
      exports.data = data_1.default;
      Object.defineProperty(exports, "TempleDataMap", { enumerable: true, get: function() {
        return data_1.TempleDataMap;
      } });
      var env_1 = __importDefault(require_env());
      exports.env = env_1.default;
      var props_1 = __importDefault(require_props());
      exports.props = props_1.default;
      var classnames_1 = __importDefault(require_classnames());
      exports.classnames = classnames_1.default;
      var children_1 = __importStar(require_children());
      exports.children = children_1.default;
      Object.defineProperty(exports, "innerHTML", { enumerable: true, get: function() {
        return children_1.innerHTML;
      } });
      var signal_1 = __importStar(require_signal());
      exports.signal = signal_1.default;
      Object.defineProperty(exports, "SignalRegistry", { enumerable: true, get: function() {
        return signal_1.SignalRegistry;
      } });
      require_helpers();
    }
  });

  // ../temple/client.js
  var require_client2 = __commonJS({
    "../temple/client.js"(exports, module) {
      module.exports = { ...require_client() };
    }
  });

  // ../temple/index.js
  var require_temple = __commonJS({
    "../temple/index.js"(exports, module) {
      module.exports = { ...require_client() };
    }
  });

  // temple-document-client-plugin:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/client-api.dtml
  var client_api_exports = {};
  __export(client_api_exports, {
    BUILD_ID: () => BUILD_ID,
    TempleComponent: () => import_client4.TempleComponent,
    TempleElement: () => import_client4.TempleElement,
    TempleEmitter: () => import_client4.TempleEmitter,
    TempleException: () => import_client4.TempleException,
    TempleRegistry: () => import_client4.TempleRegistry,
    children: () => import_client4.children,
    components: () => components,
    data: () => import_client4.data,
    emitter: () => import_client4.emitter,
    props: () => import_client4.props,
    signal: () => import_client4.signal
  });
  var import_client3 = __toESM(require_client2());

  // temple-component-plugin:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/panel/main.tml
  var import_client = __toESM(require_client2());
  var Main_fd7f1af6410c5b5c8e1f = class extends import_client.TempleComponent {
    static component = ["main", "Main_fd7f1af6410c5b5c8e1f"];
    styles() {
      return ``;
    }
    template() {
      const props2 = this.props;
      const children3 = () => this.originalChildren;
      return () => [
        import_client.TempleRegistry.createElement("main", {}, [
          ...this._toNodeList(children3())
        ]).element
      ];
    }
  };

  // temple-component-plugin:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/i18n/translate.tml
  var import_client2 = __toESM(require_client2());

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

  // temple-component-plugin:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/i18n/translate.tml
  var import_temple = __toESM(require_temple());
  var Translate_7d25e372f5ffb5e39dad = class extends import_client2.TempleComponent {
    static component = ["translate", "Translate_7d25e372f5ffb5e39dad"];
    styles() {
      return ``;
    }
    template() {
      const childlist = (0, import_temple.children)();
      const phrase = [];
      const variables = [];
      for (const child of childlist.length) {
        if (typeof child === "string") {
          phrase.push(child);
        } else if (child instanceof Node && child.textContent) {
          phrase.push(child.textContent);
        } else {
          phrase.push("%s");
          variables.push(child);
        }
      }
      const chunks = translate(phrase.join("")).split("%s");
      const translations = [];
      for (let i = 0; i < chunks.length; i++) {
        translations.push(document.createTextNode(chunks[i]));
        if (variables[i]) {
          translations.push(variables[i]);
        }
      }
      return () => [];
    }
  };

  // temple-document-client-plugin:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/client-api.dtml
  var import_client4 = __toESM(require_client2());
  import_client3.emitter.once("ready", () => {
    const script = document.querySelector("script[data-app]");
    if (!script) {
      throw import_client3.TempleException.for("APP_DATA not found");
    }
    try {
      const data2 = atob(script.getAttribute("data-app"));
      window.__APP_DATA__ = JSON.parse(data2);
      Object.entries(window.__APP_DATA__).forEach(([key, value]) => {
        import_client3.data.set(key, value);
      });
    } catch (error) {
      throw import_client3.TempleException.for("APP_DATA is not a valid JSON");
    }
    import_client3.data.set("current", "document");
    const url = "/docs/client-api.html";
    const title = _("Client API - Temple reactive web component template engine.");
    const description = _("Client API documentation for Temple.");
    const toggle = (_2) => {
      document.body.classList.toggle("panel-left-open");
    };
    import_client3.data.delete("current");
    const __BINDINGS__ = { "0": { "class": `head panel-head` }, "1": { "class": `menu fas fa-fw fa-bars`, "click": toggle }, "2": { "href": `/temple` }, "3": { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }, "5": { "class": `tx-white`, "href": `/temple` }, "7": { "href": `/temple/docs/index.html` }, "8": { "class": `github`, "href": `https://github.com/ossPhilippines/temple`, "target": `_blank` }, "9": { "class": `fab fa-github` }, "10": { "class": `npm`, "href": `https://www.npmjs.com/package/temple`, "target": `_blank` }, "11": { "class": `fab fa-npm text-white` }, "12": { "class": `discord`, "href": `https://discord.gg/open-source-software-ph-905496362982981723`, "target": `_blank` }, "13": { "class": `fab fa-discord text-white` }, "14": { "class": `left panel-left` }, "16": { "href": `/temple` }, "17": { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }, "19": { "class": `tx-white`, "href": `/temple` }, "20": { "class": `toggle fas fa-fw fa-chevron-left`, "click": toggle }, "23": { "href": `/temple/docs/index.html` }, "24": { "href": `/temple/docs/getting-started.html` }, "25": { "href": `/temple/docs/frequent-questions.html` }, "27": { "href": `/temple/docs/markup-syntax.html` }, "28": { "href": `/temple/docs/state-management.html` }, "29": { "href": `/temple/docs/component-strategy.html` }, "30": { "href": `/temple/docs/compiler-api.html` }, "31": { "href": `/temple/docs/client-api.html` }, "33": { "href": `/temple/docs/template-engine.html` }, "34": { "href": `/temple/docs/single-page.html` }, "35": { "href": `/temple/docs/static-site.html` }, "36": { "href": `/temple/docs/component-publisher.html` }, "37": { "href": `/temple/docs/developer-tools.html` }, "39": { "href": `/temple/docs/latest-updates.html` }, "40": { "href": `/temple/docs/contributing-guide.html` }, "41": { "href": `/temple/docs/known-issues.html` }, "42": { "class": `panel-main` }, "43": { "class": `docs container` }, "45": { "class": `pager` }, "46": { "class": `prev`, "href": `/temple/docs/compiler-api.html` }, "47": { "class": `fas fa-fw fa-chevron-left` }, "48": { "class": `next`, "href": `/temple/docs/template-engine.html` }, "49": { "class": `fas fa-fw fa-chevron-right` }, "50": { "class": `foot` } };
    for (const element of document.body.querySelectorAll("*")) {
      const attributes = Object.fromEntries(
        Array.from(element.attributes).map((attribute) => [
          attribute.nodeName,
          attribute.nodeValue.length > 0 ? attribute.nodeValue : true
        ])
      );
      const id = String(import_client3.TempleRegistry.elements.size);
      if (__BINDINGS__[id]) {
        Object.assign(attributes, __BINDINGS__[id]);
        element.TempleAttributes = __BINDINGS__[id];
      }
      import_client3.TempleRegistry.register(element, attributes);
    }
    customElements.define("panel-main", Main_fd7f1af6410c5b5c8e1f);
    customElements.define("i18n-translate", Translate_7d25e372f5ffb5e39dad);
    import_client3.emitter.emit("mounted", document.body);
  });
  var components = {
    "PanelMain_fd7f1af6410c5b5c8e1f": Main_fd7f1af6410c5b5c8e1f,
    "I18nTranslate_7d25e372f5ffb5e39dad": Translate_7d25e372f5ffb5e39dad
  };
  var BUILD_ID = "f859bf7a335e9eba03e0";
  return __toCommonJS(client_api_exports);
})();
