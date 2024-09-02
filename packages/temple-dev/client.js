"use strict";
var temple_dev = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/client.ts
  var client_exports = {};
  __export(client_exports, {
    default: () => client
  });
  function client(id, options = {}, wait = 0) {
    const { path = "/__temple_dev__" } = options;
    const source = new EventSource(path);
    source.addEventListener("refresh", (message) => {
      const data = JSON.parse(message.data);
      if (!data[id]) return;
      data[id].forEach((code) => {
        try {
          const script = new Function(code);
          script();
        } catch (e) {
          console.error(e);
        }
      });
    });
    source.onopen = () => {
      if (wait > 0) {
        window.location.reload();
      }
    };
    source.onerror = () => {
      source.close();
      if (wait < 1e4) {
        setTimeout(() => client(id, options, wait + 2e3), wait);
      } else {
        console.error(
          "Too many connection attempts. Please check your server and refresh page."
        );
      }
    };
  }
  return __toCommonJS(client_exports);
})();
