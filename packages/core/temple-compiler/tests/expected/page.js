"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TempleElement_1 = require("@ossph/temple/dist/client/TempleElement");
const TempleComponent_1 = require("@ossph/temple/dist/client/TempleComponent");
const header_tml_1 = require("./components/header.tml");
const paragraph_tml_1 = require("./components/paragraph.tml");
const list_tml_1 = require("./components/list.tml");
const counter_tml_1 = require("./components/counter.tml");
class Page extends TempleComponent_1.default {
    static component = ['page', 'Page'];
    styles() {
        return `.title { color: red; }
  .description { background-color: blue; }`;
    }
    template() {
        return () => [
            TempleElement_1.default.create('html', {}, [
                document.createTextNode(`
  `),
                TempleElement_1.default.create('head', {}, [
                    document.createTextNode(`
    `),
                    TempleElement_1.default.create('title', {}, [
                        document.createTextNode(`Test Title`)
                    ]).element,
                    document.createTextNode(`
  `)
                ]).element,
                document.createTextNode(`
  `),
                TempleElement_1.default.create('body', {}, [
                    document.createTextNode(`
    `),
                    TempleElement_1.default.localize(header_tml_1.default, { 'class': `title` }, [
                        document.createTextNode(String(title))
                    ]).element,
                    document.createTextNode(`
    `),
                    TempleElement_1.default.localize(paragraph_tml_1.default, { 'className': `description` }, [
                        document.createTextNode(String(description))
                    ]).element,
                    document.createTextNode(`
    `),
                    TempleElement_1.default.localize(list_tml_1.default, {}).element,
                    document.createTextNode(`
    `),
                    TempleElement_1.default.localize(counter_tml_1.default, { 'start': value }).element,
                    document.createTextNode(`
  `)
                ]).element,
                document.createTextNode(`
`)
            ]).element
        ];
    }
}
exports.default = Page;
