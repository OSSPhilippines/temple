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
      var TempleRegistry8 = class {
        static get elements() {
          return this._elements;
        }
        static createComponent(tagname, definition, attributes, children6 = []) {
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
          children6.forEach((child) => component.appendChild(child));
          component.register();
          if (!customElements.get(tagname)) {
            component.connectedCallback();
          }
          return this.register(component, attributes);
        }
        static createElement(name, attributes, children6 = []) {
          const element = document.createElement(name);
          for (const [key, value] of Object.entries(attributes)) {
            if (typeof value === "string") {
              element.setAttribute(key, value);
            } else if (value === true) {
              element.setAttribute(key, key);
            }
          }
          children6.filter((child) => typeof child !== "undefined").forEach((child) => element.appendChild(child));
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
      TempleRegistry8._elements = /* @__PURE__ */ new Map();
      exports.default = TempleRegistry8;
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
      var TempleComponent7 = class _TempleComponent extends HTMLElement {
        constructor() {
          super(...arguments);
          this._initiated = false;
          this._template = null;
          this._attributes = {};
          this._props = {};
          this._children = void 0;
          this._rendering = false;
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
        set props(props6) {
          this._props = Object.assign({}, props6);
          this._attributes = Object.fromEntries(Object.entries(props6).filter((entry) => typeof entry[1] === "string" || entry[1] === true));
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
          } else if (this._rendering) {
            return;
          }
          this._rendering = true;
          data_1.default.set("current", this);
          const styles = this.styles();
          if (!this._template) {
            this._template = this.template();
          } else {
            TempleEmitter_1.default.emit("unmounted", this);
          }
          const children6 = this._template().filter(Boolean);
          if (styles.length === 0) {
            this.textContent = "";
            children6.forEach((child) => this.appendChild(child));
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
            children6.forEach((child) => {
              var _a;
              return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(child);
            });
          }
          data_1.default.delete("current");
          this._initiated = true;
          TempleEmitter_1.default.emit("mounted", this);
          this._rendering = false;
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
      exports.default = TempleComponent7;
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
      exports.default = props6;
      var data_1 = __importDefault(require_data());
      function props6(component = null) {
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
      exports.default = children6;
      var data_1 = __importDefault(require_data());
      function innerHTML(component = null) {
        const inner = children6(component);
        const wrapper = document.createElement("template");
        wrapper.append(...inner);
        return wrapper.innerHTML;
      }
      function children6(component = null) {
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

  // ../../node_modules/prismjs/prism.js
  var require_prism = __commonJS({
    "../../node_modules/prismjs/prism.js"(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism2 = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _2 = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self2.Prism && _self2.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_2.util.type(o)) {
                case "Object":
                  id = _2.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone;
                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }
                  return (
                    /** @type {any} */
                    clone
                  );
                case "Array":
                  id = _2.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  /** @type {Array} */
                  /** @type {any} */
                  o.forEach(function(v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return (
                    /** @type {any} */
                    clone
                  );
                default:
                  return o;
              }
            },
            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function(element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return (
                  /** @type {any} */
                  document.currentScript
                );
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },
            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function(id, redef) {
              var lang2 = _2.util.clone(_2.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function(inside, before, insert, root) {
              root = root || /** @type {any} */
              _2.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _2.languages.DFS(_2.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _2.util.objId;
              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];
                  var propertyType = _2.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function(async, callback) {
            _2.highlightAllUnder(document, async, callback);
          },
          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _2.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _2.hooks.run("before-all-elements-highlight", env);
            for (var i = 0, element; element = env.elements[i++]; ) {
              _2.highlightElement(element, async === true, env.callback);
            }
          },
          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function(element, async, callback) {
            var language = _2.util.getLanguage(element);
            var grammar = _2.languages[language];
            _2.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _2.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _2.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _2.hooks.run("after-highlight", env);
              _2.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _2.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _2.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _2.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_2.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_2.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_2.highlight(env.code, env.grammar, env.language));
            }
          },
          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _2.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _2.tokenize(env.code, env.grammar);
            _2.hooks.run("after-tokenize", env);
            return Token.stringify(_2.util.encode(env.tokens), env.language);
          },
          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},
            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function(name, callback) {
              var hooks = _2.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function(name, env) {
              var callbacks = _2.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i = 0, callback; callback = callbacks[i++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _2;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
              s += stringify(e, language);
            });
            return s;
          }
          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language
          };
          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _2.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  p -= currentNode.value.length;
                  pos = p;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _2.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _2;
          }
          if (!_2.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_2.highlight(code, _2.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _2;
        }
        var script = _2.util.currentScript();
        if (script) {
          _2.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _2.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_2.manual) {
            _2.highlightAll();
          }
        }
        if (!_2.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _2;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
      Prism2.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
              // see below
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
      Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
      Prism2.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism2.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism2.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism2.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function(attrName, lang) {
          Prism2.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism2.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism2.languages.html = Prism2.languages.markup;
      Prism2.languages.mathml = Prism2.languages.markup;
      Prism2.languages.svg = Prism2.languages.markup;
      Prism2.languages.xml = Prism2.languages.extend("markup", {});
      Prism2.languages.ssml = Prism2.languages.xml;
      Prism2.languages.atom = Prism2.languages.xml;
      Prism2.languages.rss = Prism2.languages.xml;
      (function(Prism3) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism3.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
              // See rest below
            }
          },
          "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
        var markup = Prism3.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism2);
      Prism2.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism2.languages.javascript = Prism2.languages.extend("clike", {
        "class-name": [
          Prism2.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + // constant
            (/NaN|Infinity/.source + "|" + // binary integer
            /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
            /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
            /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
            /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
            /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism2.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
            // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
            // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
            // with the only syntax, so we have to define 2 different regex patterns.
            /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism2.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism2.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism2.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism2.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism2.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism2.languages.markup) {
        Prism2.languages.markup.tag.addInlined("script", "javascript");
        Prism2.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism2.languages.js = Prism2.languages.javascript;
      (function() {
        if (typeof Prism2 === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism2.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism2.hooks.add("before-sanity-check", function(env) {
          var pre = (
            /** @type {HTMLPreElement} */
            env.element
          );
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism2.util.setLanguage(code, language);
            Prism2.util.setLanguage(pre, language);
            var autoloader = Prism2.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }
                code.textContent = text;
                Prism2.highlightElement(code);
              },
              function(error) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
              }
            );
          }
        });
        Prism2.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i = 0, element; element = elements[i++]; ) {
              Prism2.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism2.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
    }
  });

  // ../temple/index.js
  var require_temple = __commonJS({
    "../temple/index.js"(exports, module) {
      module.exports = { ...require_client() };
    }
  });

  // temple-document-client-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/single-page.dtml
  var single_page_exports = {};
  __export(single_page_exports, {
    BUILD_ID: () => BUILD_ID,
    TempleComponent: () => import_client7.TempleComponent,
    TempleElement: () => import_client7.TempleElement,
    TempleEmitter: () => import_client7.TempleEmitter,
    TempleException: () => import_client7.TempleException,
    TempleRegistry: () => import_client7.TempleRegistry,
    children: () => import_client7.children,
    components: () => components,
    data: () => import_client7.data,
    emitter: () => import_client7.emitter,
    props: () => import_client7.props,
    signal: () => import_client7.signal
  });
  var import_client6 = __toESM(require_client2());

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/panel/main.tml
  var import_client = __toESM(require_client2());
  var Main_fd7f1af6410c5b5c8e1f = class extends import_client.TempleComponent {
    static component = ["main", "Main_fd7f1af6410c5b5c8e1f"];
    styles() {
      return ``;
    }
    template() {
      const props6 = this.props;
      const children6 = () => this.originalChildren;
      return () => [
        import_client.TempleRegistry.createElement("main", {}, [
          ...this._toNodeList(children6())
        ]).element
      ];
    }
  };

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/ide/code.tml
  var import_client2 = __toESM(require_client2());
  var import_prismjs = __toESM(require_prism());
  var import_temple = __toESM(require_temple());
  var Code_6f36bc13bb6a166c7abc = class extends import_client2.TempleComponent {
    static component = ["code", "Code_6f36bc13bb6a166c7abc"];
    styles() {
      return `:host {
    display: block;
    font-size: 14px;
    line-height: 20px;
  }
  :host([inline]) {
    display: inline;
  }
  :host([inline]),
  :host([inline]) > pre,
  :host([inline]) > pre > code {
    display: inline;
  }
  .snippet {
    background-color: #000000;
    color: #ABB2BF;
    margin: 0;
    padding: 0;
  }

  .line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }
  :host([inline]) .line-numbers {
    position: static;
    padding-left: 0;
  }

  .line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 1px solid #999;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }

  :host([inline]) .line-numbers .line-numbers-rows {
    display: none;
  }

  .line-numbers-rows > span {
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
  .pad {
    padding: 5px;
  }

  .terminal {
    background-color: #000000;
    font-size: 15px;
    padding: 10px;
  }
  .terminal span {
    color: #00FF00;
  }`;
    }
    template() {
      const config = this.props;
      const {
        lang = "markup",
        numbers = false,
        inline = false,
        trim = false,
        ltrim = false,
        rtrim = false,
        detab = 0
      } = config;
      const childlist = (0, import_temple.children)();
      let snippet = childlist[0]?.textContent || "";
      if (detab) {
        snippet = snippet.replace(
          new RegExp(`\\n {${detab}}`, "g"),
          "\n"
        );
      }
      if (trim) {
        snippet = snippet.trim();
      } else if (ltrim) {
        snippet = snippet.replace(/^\s+/, "");
      } else if (rtrim) {
        snippet = snippet.replace(/\s+$/, "");
      }
      const highlight = (event) => {
        if (!snippet) {
          return;
        }
        const code = import_prismjs.default.highlight(snippet, import_prismjs.default.languages[lang], lang);
        event.detail.target.innerHTML = code;
        if (numbers) {
          const match = code.match(/\n(?!$)/g);
          const total = match ? match.length + 1 : 1;
          const lines = new Array(total + 1).join("<span></span>");
          const wrapper = document.createElement("span");
          wrapper.setAttribute("aria-hidden", "true");
          wrapper.className = "line-numbers-rows";
          wrapper.innerHTML = lines;
          event.detail.target.appendChild(wrapper);
        }
      };
      return () => [
        import_client2.TempleRegistry.createElement("link", { "rel": `stylesheet`, "href": `https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css` }).element,
        import_client2.TempleRegistry.createText(`
`, false),
        import_client2.TempleRegistry.createElement("link", { "rel": `stylesheet`, "href": `https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css` }).element,
        import_client2.TempleRegistry.createText(`
`, false),
        ...!!(lang === "bash") ? [
          import_client2.TempleRegistry.createText(`
  `, false),
          import_client2.TempleRegistry.createElement("div", { "class": `terminal` }, [
            import_client2.TempleRegistry.createElement("span", {}, [
              import_client2.TempleRegistry.createText(`$`, false)
            ]).element,
            import_client2.TempleRegistry.createText(` `, false),
            ...this._toNodeList(childlist)
          ]).element,
          import_client2.TempleRegistry.createText(`
`, false)
        ] : !!snippet ? [
          ,
          import_client2.TempleRegistry.createText(`
  `, false),
          ...!!numbers ? [
            import_client2.TempleRegistry.createText(`
    `, false),
            import_client2.TempleRegistry.createElement("pre", { "class": `snippet line-numbers` }, [
              import_client2.TempleRegistry.createElement("code", { "mount": highlight }, []).element
            ]).element,
            import_client2.TempleRegistry.createText(`
  `, false)
          ] : true ? [
            ,
            import_client2.TempleRegistry.createText(`
    `, false),
            import_client2.TempleRegistry.createElement("pre", { "class": `snippet pad` }, [
              import_client2.TempleRegistry.createElement("code", { "mount": highlight }, []).element
            ]).element,
            import_client2.TempleRegistry.createText(`
  `, false)
          ] : [],
          import_client2.TempleRegistry.createText(`
`, false)
        ] : []
      ];
    }
  };

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/ide/app.tml
  var import_client3 = __toESM(require_client2());
  var import_temple2 = __toESM(require_temple());
  var App_05341fddbfd1fe4f273b = class extends import_client3.TempleComponent {
    static component = ["app", "App_05341fddbfd1fe4f273b"];
    styles() {
      return ``;
    }
    template() {
      const { title, panel } = (0, import_temple2.props)();
      const classname = `body ${panel ? "panel" : ""}`;
      const style = panel ? `height:${panel}px` : "";
      return () => [
        import_client3.TempleRegistry.createText(`
`, false),
        import_client3.TempleRegistry.createElement("div", { "class": `window` }, [
          import_client3.TempleRegistry.createText(`
  `, false),
          import_client3.TempleRegistry.createElement("div", { "class": `head` }, [
            import_client3.TempleRegistry.createText(`
    `, false),
            import_client3.TempleRegistry.createElement("span", { "class": `dot` }, []).element,
            import_client3.TempleRegistry.createText(`
    `, false),
            import_client3.TempleRegistry.createElement("span", { "class": `dot` }, []).element,
            import_client3.TempleRegistry.createText(`
    `, false),
            import_client3.TempleRegistry.createElement("span", { "class": `dot` }, []).element,
            import_client3.TempleRegistry.createText(`
    `, false),
            import_client3.TempleRegistry.createElement("span", { "class": `title` }, [
              ...this._toNodeList(title)
            ]).element,
            import_client3.TempleRegistry.createText(`
  `, false)
          ]).element,
          import_client3.TempleRegistry.createText(`
  `, false),
          import_client3.TempleRegistry.createElement("div", { "class": classname, "style": style }, [
            ...this._toNodeList((0, import_temple2.children)())
          ]).element,
          import_client3.TempleRegistry.createText(`
`, false)
        ]).element
      ];
    }
  };

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/tui/tab.tml
  var import_client4 = __toESM(require_client2());
  var import_temple3 = __toESM(require_temple());
  var Tab_dd9d261e4f37efc3079c = class extends import_client4.TempleComponent {
    static component = ["tab", "Tab_dd9d261e4f37efc3079c"];
    styles() {
      return ``;
    }
    template() {
      const {
        group,
        selector,
        "class": classlist,
        ...attributes
      } = (0, import_temple3.props)();
      const init = () => {
        Array.from(document.querySelectorAll(selector)).forEach((content) => {
          content.style.display = classlist.indexOf("active") > -1 ? "block" : "none";
        });
      };
      const show = () => {
        Array.from(document.querySelectorAll(`[group="${group}"]`)).forEach((tab) => {
          const subselector = tab.props.selector;
          if (selector === subselector) {
            tab.classList.add("active");
            Array.from(document.querySelectorAll(selector)).forEach((content) => {
              content.style.display = "block";
            });
          } else {
            tab.classList.remove("active");
            Array.from(document.querySelectorAll(subselector)).forEach((content) => {
              content.style.display = "none";
            });
          }
        });
      };
      return () => [
        import_client4.TempleRegistry.createText(`
`, false),
        import_client4.TempleRegistry.createElement("a", { ...attributes, "click": show, "mount": init }, [
          ...this._toNodeList((0, import_temple3.children)())
        ]).element
      ];
    }
  };

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/i18n/translate.tml
  var import_client5 = __toESM(require_client2());

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

  // temple-component-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/modules/i18n/translate.tml
  var import_temple4 = __toESM(require_temple());
  var Translate_7d25e372f5ffb5e39dad = class extends import_client5.TempleComponent {
    static component = ["translate", "Translate_7d25e372f5ffb5e39dad"];
    styles() {
      return ``;
    }
    template() {
      const { trim = false, p = false, li = false, div = false } = (0, import_temple4.props)();
      const childlist = (0, import_temple4.children)();
      const phrase = [];
      const variables = [];
      for (const child of childlist) {
        if (typeof child === "string") {
          phrase.push(child);
        } else if (child instanceof Node && child.textContent) {
          phrase.push(child.textContent);
        } else {
          phrase.push("%s");
          variables.push(child);
        }
      }
      let words = phrase.join("");
      if (trim) {
        words = words.replace(/\s+/, " ").trim();
      }
      const chunks = translate(words).split("%s");
      const translations = [];
      for (let i = 0; i < chunks.length; i++) {
        translations.push(document.createTextNode(chunks[i]));
        if (variables[i]) {
          translations.push(variables[i]);
        }
      }
      return () => [
        import_client5.TempleRegistry.createText(`
    `, false),
        ...!!p ? [
          import_client5.TempleRegistry.createText(`
      `, false),
          import_client5.TempleRegistry.createElement("p", {}, [
            ...this._toNodeList(translations)
          ]).element,
          import_client5.TempleRegistry.createText(`
    `, false)
        ] : !!li ? [
          ,
          import_client5.TempleRegistry.createText(`
      `, false),
          import_client5.TempleRegistry.createElement("li", {}, [
            ...this._toNodeList(translations)
          ]).element,
          import_client5.TempleRegistry.createText(`
    `, false)
        ] : !!div ? [
          ,
          import_client5.TempleRegistry.createText(`
      `, false),
          import_client5.TempleRegistry.createElement("div", {}, [
            ...this._toNodeList(translations)
          ]).element,
          import_client5.TempleRegistry.createText(`
    `, false)
        ] : true ? [
          ,
          import_client5.TempleRegistry.createText(`
      `, false),
          ...this._toNodeList(translations),
          import_client5.TempleRegistry.createText(`
    `, false)
        ] : []
      ];
    }
  };

  // temple-document-client-resolver:/Users/cblanquera/server/projects/ossph/temple/packages/temple-web/src/pages/docs/single-page.dtml
  var import_client7 = __toESM(require_client2());
  import_client6.emitter.once("ready", () => {
    const script = document.querySelector("script[data-app]");
    if (!script) {
      throw import_client6.TempleException.for("APP_DATA not found");
    }
    try {
      const data2 = atob(script.getAttribute("data-app"));
      window.__APP_DATA__ = JSON.parse(data2);
      Object.entries(window.__APP_DATA__).forEach(([key, value]) => {
        import_client6.data.set(key, value);
      });
    } catch (error) {
      throw import_client6.TempleException.for("APP_DATA is not a valid JSON");
    }
    import_client6.data.set("current", "document");
    const url = "/docs/single-page.html";
    const title = _("Single Page App - Temple reactive web component template engine.");
    const description = _("How to use Temple to develop single page apps.");
    const toggle = (_2) => {
      document.body.classList.toggle("panel-left-open");
    };
    import_client6.data.delete("current");
    const __BINDINGS__ = { "0": { "class": `head panel-head` }, "1": { "class": `menu fas fa-fw fa-bars`, "click": toggle }, "2": { "href": `/temple` }, "3": { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }, "5": { "class": `tx-white`, "href": `/temple` }, "7": { "class": `tx-white`, "href": `/temple/docs/index.html` }, "8": { "class": `github`, "href": `https://github.com/OSSPhilippines/temple`, "target": `_blank` }, "9": { "class": `fab fa-github` }, "10": { "class": `npm`, "href": `https://www.npmjs.com/package/@ossph/temple`, "target": `_blank` }, "11": { "class": `fab fa-npm text-white` }, "12": { "class": `discord`, "href": `https://discord.gg/open-source-software-ph-905496362982981723`, "target": `_blank` }, "13": { "class": `fab fa-discord text-white` }, "14": { "class": `left panel-left` }, "16": { "href": `/temple` }, "17": { "src": `/temple/temple-icon.png`, "alt": `Temple Logo` }, "19": { "class": `tx-white`, "href": `/temple` }, "20": { "class": `toggle fas fa-fw fa-chevron-left`, "click": toggle }, "23": { "href": `/temple/docs/index.html` }, "24": { "href": `/temple/docs/getting-started.html` }, "26": { "href": `/temple/docs/markup-syntax.html` }, "27": { "href": `/temple/docs/state-management.html` }, "28": { "href": `/temple/docs/component-strategy.html` }, "29": { "href": `/temple/docs/compiler-api.html` }, "30": { "href": `/temple/docs/client-api.html` }, "32": { "href": `/temple/docs/template-engine.html` }, "33": { "href": `/temple/docs/single-page.html` }, "34": { "href": `/temple/docs/static-site.html` }, "35": { "href": `/temple/docs/component-publisher.html` }, "36": { "href": `/temple/docs/developer-tools.html` }, "37": { "class": `panel-main` }, "38": { "class": `docs container` }, "40": { "p": true, "trim": true }, "41": { "p": true, "trim": true }, "42": { "lang": `bash` }, "43": { "p": true, "trim": true }, "44": { "lang": `bash` }, "45": { "p": true, "trim": true }, "46": { "lang": `bash` }, "47": { "p": true, "trim": true }, "48": { "panel": 400, "title": `My Project` }, "49": { "class": `panel-head` }, "50": { "class": `tabs` }, "51": { "class": `tab`, "group": `project`, "selector": `#client-ts` }, "52": { "class": `tab`, "group": `project`, "selector": `#app-tml` }, "53": { "class": `tab`, "group": `project`, "selector": `#index-html` }, "54": { "class": `tab active`, "group": `project`, "selector": `#webpack-js` }, "55": { "class": `tab`, "group": `project`, "selector": `#tsconfig-json` }, "56": { "class": `tab`, "group": `project`, "selector": `#package-json` }, "57": { "class": `panel-left` }, "58": { "class": `folder` }, "59": { "class": `fas fa-fw fa-chevron-down` }, "61": { "class": `shift-1 block`, "group": `project`, "selector": `#app-tml` }, "62": { "class": `fas fa-fw fa-file` }, "63": { "class": `shift-1 block`, "group": `project`, "selector": `#client-ts` }, "64": { "class": `fas fa-fw fa-file` }, "65": { "class": `block`, "group": `project`, "selector": `#index-html` }, "66": { "class": `fas fa-fw fa-file` }, "67": { "class": `block`, "group": `project`, "selector": `#package-json` }, "68": { "class": `fas fa-fw fa-file` }, "69": { "class": `block`, "group": `project`, "selector": `#tsconfig-json` }, "70": { "class": `fas fa-fw fa-file` }, "71": { "class": `block active`, "group": `project`, "selector": `#webpack-js` }, "72": { "class": `fas fa-fw fa-file` }, "73": { "class": `panel-main` }, "75": { "id": `client-ts`, "style": `display:none`, "lang": `js`, "numbers": true, "trim": true, "detab": 16 }, "76": { "id": `app-tml`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, "77": { "id": `index-html`, "style": `display:none`, "numbers": true, "trim": true, "detab": 16 }, "78": { "id": `webpack-js`, "lang": `js`, "numbers": true, "trim": true, "detab": 16 }, "79": { "id": `tsconfig-json`, "style": `display:none`, "lang": `js`, "numbers": true, "trim": true, "detab": 16 }, "80": { "id": `package-json`, "style": `display:none`, "lang": `js`, "numbers": true, "trim": true, "detab": 16 }, "81": { "p": true, "trim": true }, "82": { "title": `Terminal` }, "83": { "lang": `bash` }, "84": { "class": `pager` }, "85": { "class": `prev`, "href": `/temple/docs/template-engine.html` }, "86": { "class": `fas fa-fw fa-chevron-left` }, "87": { "class": `next`, "href": `/temple/docs/static-site.html` }, "88": { "class": `fas fa-fw fa-chevron-right` }, "89": { "class": `foot` } };
    for (const element of document.body.querySelectorAll("*")) {
      const attributes = Object.fromEntries(
        Array.from(element.attributes).map((attribute) => [
          attribute.nodeName,
          attribute.nodeValue.length > 0 ? attribute.nodeValue : true
        ])
      );
      const id = String(import_client6.TempleRegistry.elements.size);
      if (__BINDINGS__[id]) {
        Object.assign(attributes, __BINDINGS__[id]);
        element.TempleAttributes = __BINDINGS__[id];
      }
      import_client6.TempleRegistry.register(element, attributes);
    }
    customElements.define("panel-main", Main_fd7f1af6410c5b5c8e1f);
    customElements.define("ide-code", Code_6f36bc13bb6a166c7abc);
    customElements.define("ide-app", App_05341fddbfd1fe4f273b);
    customElements.define("tui-tab", Tab_dd9d261e4f37efc3079c);
    customElements.define("i18n-translate", Translate_7d25e372f5ffb5e39dad);
    import_client6.emitter.emit("mounted", document.body);
  });
  var components = {
    "PanelMain_fd7f1af6410c5b5c8e1f": Main_fd7f1af6410c5b5c8e1f,
    "IdeCode_6f36bc13bb6a166c7abc": Code_6f36bc13bb6a166c7abc,
    "IdeApp_05341fddbfd1fe4f273b": App_05341fddbfd1fe4f273b,
    "TuiTab_dd9d261e4f37efc3079c": Tab_dd9d261e4f37efc3079c,
    "I18nTranslate_7d25e372f5ffb5e39dad": Translate_7d25e372f5ffb5e39dad
  };
  var BUILD_ID = "3550a936d66e61695120";
  return __toCommonJS(single_page_exports);
})();
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
