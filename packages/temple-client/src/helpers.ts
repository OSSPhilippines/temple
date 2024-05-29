import type TempleComponent from './TempleComponent';
import TempleElement from './TempleDocument';
import TempleEmitter from './TempleEmitter';

export type AttributeBinder = (element: TempleElement) => void;

export function bindAttribute(name: string, bind: AttributeBinder) {
  TempleEmitter.on('ready', () => {
    TempleElement.filter(temple => temple.hasAttribute(name)).forEach(bind);
  });
  TempleEmitter.on('render', (element: TempleComponent) => {
    //get shadow root
    const shadowRoot = element.shadowRoot;
    //if shadow root exists
    if (shadowRoot) {
      Array.from(shadowRoot.querySelectorAll('*')).forEach(element => {
        const node = TempleElement.get(element);
        if (node && node.hasAttribute(name)) bind(node);
      });
    } else {
      Array.from(element.querySelectorAll('*')).forEach(element => {
        const node = TempleElement.get(element);
        if (node && node.hasAttribute(name)) bind(node);
      });
    }
  })
}

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
  if (typeof callback === 'function' 
    //The following cases are for the error:
    //TypeError: element.element.addEventListener is not a function
    //which is from the server side rendering. TempleBrowser is a small 
    //shim to make SSR work but cannot handle these kind of event 
    //listeners without making the shim substantially larger.
    //The alternative approach is to just case for it here.
    //(the server shim doesnt do anything with the event listeners)
    && element.element
    && element.element.addEventListener
    && typeof element.element.addEventListener === 'function'
  ) {
    element.element.addEventListener(event, callback);
  }
}));

