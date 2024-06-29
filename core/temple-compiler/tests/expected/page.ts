import TempleElement from "@ossph/temple/dist/client/TempleElement";
import TempleComponent from "@ossph/temple/dist/client/TempleComponent";
import Header_30f98e79c1c79cd6f0e0 from "./components/header.tml";
import Paragraph_4054a85433e9724f9be0 from "./components/paragraph.tml";
import List_a30bca1b3255e7b3a867 from "./components/list.tml";
import Counter_ae7b58c379350bbe3d52 from "./components/counter.tml";

export default class Page extends TempleComponent {
  static component = [ 'page', 'Page' ] as [ string, string ];

  styles(): string {
    return `.title { color: red; }
  .description { background-color: blue; }`;
  }

  template() {

    return () => [
    TempleElement.create('html', { }, [
    document.createTextNode(`
  `), 
    TempleElement.create('head', { }, [
    document.createTextNode(`
    `), 
    TempleElement.create('title', { }, [
    document.createTextNode(`Test Title`)
    ]).element, 
    document.createTextNode(`
  `)
    ]).element, 
    document.createTextNode(`
  `), 
    TempleElement.create('body', { }, [
    document.createTextNode(`
    `), 
    TempleElement.localize(Header_30f98e79c1c79cd6f0e0, { 'class': `title` }, [
    document.createTextNode(String(title))
    ]).element, 
    document.createTextNode(`
    `), 
    TempleElement.localize(Paragraph_4054a85433e9724f9be0, { 'className': `description` }, [
    document.createTextNode(String(description))
    ]).element, 
    document.createTextNode(`
    `), 
    TempleElement.localize(List_a30bca1b3255e7b3a867, { }).element, 
    document.createTextNode(`
    `), 
    TempleElement.localize(Counter_ae7b58c379350bbe3d52, { 'start': value }).element, 
    document.createTextNode(`
  `)
    ]).element, 
    document.createTextNode(`
`)
    ]).element
    ];
  }
}
