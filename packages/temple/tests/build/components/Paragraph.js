"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempleComponent_1 = __importDefault(require("@ossph/temple/dist/TempleComponent"));
class paragraph extends TempleComponent_1.default {
    style() {
        return ``;
    }
    template() {
        console.log('paragraph', className);
        return `<p>
  ${children}
  <redirect class="${this.encode(className)}" href="/">Link</redirect>
</p>`;
    }
}
exports.default = paragraph;
customElements.define('paragraph', Paragraph);
//# sourceMappingURL=Paragraph.js.map