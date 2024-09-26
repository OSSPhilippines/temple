import type { 
  MouseEvent, 
  KeyboardEvent, 
  AttributeChangeEvent 
} from '@ossph/temple/dist/types';
import type TempleComponent from '@ossph/temple/dist/client/TempleComponent';
import TempleRegistry from '@ossph/temple/dist/client/TempleRegistry';
import signal from '@ossph/temple/dist/client/signal';

export type State = {
  show: boolean,
  query: string,
  values: string[],
  options: Node[],
  filtered: Node[],
  selected: Node[]
};

export function makeOptions(children: Node[]) {
  return Array.from(children)
    //only HTML elements
    .filter(option => option instanceof HTMLElement)
    //filter out hidden inputs
    .filter(option => option.nodeName !== 'INPUT' 
      || !option.hasAttribute('type')
      || option.getAttribute('type') !== 'hidden'
    )
    //filter out options with slot attributes that are not filtered
    .filter(option => !option.hasAttribute('slot') 
      || option.getAttribute('slot') === 'filtered'
    )
    //build options markup
    .map(option => {
      //if not an option, return the option as is
      if (option.nodeName !== 'OPTION') {
        return option;
      }
      //get the attributes
      const attributes = TempleRegistry.get(option)?.attributes || {};
      //set value if not set
      attributes.value = attributes.value ? attributes.value 
        : option.hasAttribute('value') ? option.getAttribute('value')
        : option.innerText.trim();
      //try to set the keyword attribute
      attributes.keyword = attributes.keyword ? attributes.keyword
        : option.hasAttribute('keyword') ? option.getAttribute('keyword')
        : undefined;
      //set class if not set (this is for shadow styles)
      attributes['class'] = attributes['class'] ? attributes['class']
        : option.hasAttribute('class') ? option.getAttribute('class')
        : 'select-default-option';
      //get the children
      const children = Array.from(option.childNodes);
      //create and return the option wrapper
      return TempleRegistry.createElement('div', attributes, children).element;
    });
}

export function getHandlers(
  host: TempleComponent, 
  options: Element[],
  slot = true
) {
  const {  
    value,  multiple,
    open,   close,  
    filter, select, 
    add,    clear,  
    change, update
  } = host.props;

  const handlers = {
    toggle: (e: MouseEvent<HTMLElement>) => {
      const show = !state.value.show;
      state.value = { ...state.value, show };
      show ? open && open(e, state) : close && close(e, state);
    },
    select: (e: MouseEvent<HTMLElement>) => {
      //get selected choice
      const option = e.currentTarget as HTMLElement;
      //get selected value
      const value = TempleRegistry.get(option)?.getAttribute('value');
      //if value is undefined, skip (or throw error)
      if (typeof value === 'undefined') return;
      //remake state
      state.value = handlers.make(
        //same options
        state.value.options,
        //change values
        state.value.values.includes(value)
          ? state.value.values.filter((v: any) => v !== value)
          : multiple 
          ? [ ...state.value.values, value ]
          : [ value ],
        //same keyword
        state.value.query,
        //close dropdown
        multiple ? state.value.show : false
      );
      //trigger all events
      select && select(e, state);
      change && change({ ...e, target: { 
        ...host, 
        value: multiple ? state.value.values : value
      }});
      update && update(multiple ? state.value.values : value);
    },
    filter: (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      //next tick
      setTimeout(() => {
        //get the selection range
        const selection = [ target.selectionStart, target.selectionEnd ];
        //get the value from the search input
        const query = target.value.toLowerCase();
        //remake state
        state.value = handlers.make(
          //same options
          state.value.options,
          //same values
          state.value.values,
          //change query
          query,
          //same dropdown state
          state.value.show
        );
        //a re-render just happened, so we need
        //to re-focus the input to continue typing
        const input = host.shadowRoot?.querySelector('.input') as HTMLInputElement|null;
        input?.focus();
        input?.setSelectionRange(selection[0], selection[1]);
        //trigger filter event
        filter && filter(e, state);
      }, 1);
    },
    clear: (e: MouseEvent<HTMLElement>) => {
      //make new state with no values
      state.value = handlers.make(
        //same options
        state.value.options,
        //no values
        [],
        //same keyword
        state.value.query,
        //close dropdown
        false
      );
      clear && clear(e, state);
      change && change({ ...e, target: { 
        ...host, 
        value: multiple ? [] : null
      }});
      update && update(multiple ? [] : null);
    },
    add: (e: MouseEvent<HTMLElement>) => {
      const input = host.shadowRoot?.querySelector('input');
      if (!input) return;
      const value = input.value;
      //add option
      const option = TempleRegistry.createElement('div', { 
        'class': 'select-default-option',
        slot: 'option',
        label: value, 
        keyword: value, 
        value 
      }, [ new Text(value) ]).element;
      state.value = handlers.make(
        //add option
        [ option, ...state.value.options ],
        //add value
        multiple ? [ ...state.value.values, value ]: [ value ],
        //reset query
        '',
        //same dropdown state
        multiple ? state.value.show : false
      );
      add && add(e, state);
      change && change({ ...e, target: { 
        ...host, 
        value: multiple ? state.value.values : value
      }});
      update && update(multiple ? state.value.values : value);
    },
    over: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      local.over = true;
      return false;
    },
    out: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      local.over = false;
      if (!state.value.show) {
        return false;
      }
      setTimeout(() => {
        if (!local.over && state.value.show) {
          state.value = { ...state.value, show: false };
          close && close(e, state);
        }
      }, 500);
      return false;
    },
    make: (
      options: Node[], 
      value: string|string[],
      query = '', 
      show = false
    ) => {
      //determine values
      const values = Array.isArray(value) ? Array.from(value) : [ value ];
      //safe bind...
      options.forEach(option => {
        if (!(option instanceof HTMLElement)) return;
        //listen to click
        const select = handlers.select as unknown as EventListener;
        option.removeEventListener('click', select);
        option.addEventListener('click', select);
        //set value
        const element = TempleRegistry.get(option);
        if (element) {
          if (!element.hasAttribute('value')) {
            element.setAttribute('value', option.innerText.trim());
          }
        }
      });
      //filter options by keyword
      const filtered = options.filter(option => {
        //if not an element, skip
        if (!(option instanceof Element)) return false;
        //if no query, accept all options
        if (!query) return true;
        //get the element from the registry
        const element = TempleRegistry.get(option);
        //if no element, skip
        if (!element) return false;
        //now get the keyword attribute
        const keyword = element.getAttribute('keyword');
        //if no keyword, skip
        if (!keyword) return false;
        //now query the keyword
        return keyword.toLowerCase().includes(query.toLowerCase());
      }).map(option => {
        if (slot && option instanceof Element) {
          option.setAttribute('slot', 'filtered');
        }
        return option;
      });
      //filter options by values
      const selected = options.filter(option => {
        //if not an element, skip
        if (!(option instanceof Element)) return false;
        //get the element from the registry
        const element = TempleRegistry.get(option);
        //if no element, skip
        if (!element) return false;
        //now get the value attribute
        const value = element.getAttribute('value');
        //if no value, skip
        if (!value) return false;
        //return true if value is in values
        return values.includes(value);
      }).map(option => {
        const clone = option.cloneNode(true);
        if (slot && clone instanceof Element) {
          clone.setAttribute('slot', 'selected');
        }
        return clone;
      });
      
      return { show, query, values, options, filtered, selected };
    },
    attribute(e: AttributeChangeEvent) {
      //accepts: name, value
      const { action, name, value, target } = e.detail;
      const inputs = Array.from(
        target.querySelectorAll(':scope > input[hidden]')
      );
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (name === 'name') {
          switch (action) {
            case 'add':
            case 'update':
              input.setAttribute('name', value);
              break;
            case 'remove':
              input.removeAttribute('name');
              break;
          }
        } else if (name === 'value') { 
          const values = Array.isArray(value) ? value : [ value ]; 
          if (action === 'remove' 
            || typeof values[i] === 'undefined' 
            || values[i] === null
          ) {
            input.removeAttribute(name);
            continue;
          }
          input.setAttribute(name, values[i]);
        }
      }
    }
  };

  //get initial state (show, values, options, selected)
  const state = signal<State>(handlers.make(options, value), host);
  //local state
  const local = { over: false };
  //default listeners
  const over = handlers.over as unknown as EventListener;
  const out = handlers.out as unknown as EventListener;
  host.addEventListener('mouseover', over);
  host.addEventListener('mouseout', out);
  host.on('attributechange', handlers.attribute);
  return { state, local, ...handlers };
};
