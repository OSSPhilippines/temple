"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempleComponent_1 = __importDefault(require("@ossph/temple/dist/TempleComponent"));
class header1 extends TempleComponent_1.default {
    style() {
        return `:host { font-size: 21px; }`;
    }
    template() {
        console.log('header2');
        return `<h1 class="${this.encode(className)}">${children}</h1>`;
    }
}
exports.default = header1;
customElements.define('header1', Header1);
//# sourceMappingURL=Header1.js.map