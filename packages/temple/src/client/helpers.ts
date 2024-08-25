import type { TempleBrowserEvent } from '../types';
import type TempleComponent from './TempleComponent';
import TempleDocument from './TempleRegistry';
import TempleElement from './TempleElement';
import TempleEmitter from './TempleEmitter';

//how binders should look like
type AttributeBinder = (element: TempleElement) => void;

//returns all child elements with the attribute name
const match = (element: Element|ShadowRoot, attribute: string) => {
  //get all child elements
  return Array.from(element.querySelectorAll('*')).filter(
    //filter by elements has the attribute
    (element: Element) => {
      //get the node
      const node = TempleDocument.get(element);
      //return if the node has the attribute
      return node && node.hasAttribute(attribute);
    }
  //map the elements to TempleElement (this is what to return)
  ).map(element => TempleDocument.get(element)) as TempleElement[];
};

//bind an attribute to a binder
function bindAttribute(name: string, bind: AttributeBinder) {
  TempleEmitter.on('mounted', (e: TempleBrowserEvent<TempleComponent>) => {
    //if there is no detail, return
    if (!e.detail) return;
    //get the element
    const element = e.detail;
    //this is called for every listener, 
    //there will be a lot of listeners...
    match(element.shadowRoot || element, name).forEach(bind);
  });
}

//unbind an attribute to a binder
function unbindAttribute(name: string, bind: AttributeBinder) {
  TempleEmitter.on('unmounted', (e: TempleBrowserEvent<TempleComponent>) => {
    //if there is no detail, return
    if (!e.detail) return;
    //get the element
    const element = e.detail;
    //this is called for every listener, 
    //there will be a lot of listeners...
    match(element.shadowRoot || element, name).forEach(bind);
  });
}

//ex. <div mounted=callback>Hello World</div>
bindAttribute('mount', element => {
  const callback = element.getAttribute('mount');
  if (typeof callback === 'function' ) {
    const event = new CustomEvent('mount', { 
      detail: {
        node: element,
        target: element.element
      }
    });
    callback(event);
  }
});

//ex. <div unmounted=callback>Hello World</div>
unbindAttribute('unmount', element => {
  const callback = element.getAttribute('unmount');
  if (typeof callback === 'function' ) {
    const event = new CustomEvent('unmount', { 
      detail: {
        node: element,
        target: element.element
      }
    });
    callback(event);
  }
});

//ex. <div if={count > 0}>Hello World</div>
bindAttribute('if', element => {
  const condition = element.getAttribute('if');
  if (condition === false || condition === 'false') {
    element.element.remove();
  } else if (typeof condition === 'function' && !condition()) {
    element.element.remove();
  }
});

[
  //Mouse Events
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseover',
  'mouseout',
  'wheel',
  //Keyboard Events
  'keydown',
  'keypress',
  'keyup',
  //Form Events
  'blur',
  'change',
  'contextmenu',
  'focus',
  'input',
  'submit',
  'invalid',
  'reset',
  'search',
  'select',
  //Clipboard Events
  'copy',
  'cut',
  'paste',
  //Drag Events
  'drag',
  'dragstart',
  'dragend',
  'dragover',
  'dragenter',
  'dragleave',
  'drop',
  'scroll',
  //Media Events
  'durationchange',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting',
  //Animation Events
  'animationstart',
  'animationend',
  'animationiteration',
  //Transition Events
  'transitionend',
  //Misc Events
  'toggle'
].forEach(event => bindAttribute(event, element => {
  const callback = element.getAttribute(event);
  if (typeof callback === 'function' ) {
    element.element.removeEventListener(event, callback);
    element.element.addEventListener(event, callback);
  }
}));

