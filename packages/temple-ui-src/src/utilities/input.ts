import type { ChangeEvent, AttributeChangeEvent } from '@ossph/temple/dist/types';
import type TempleComponent from '@ossph/temple/dist/client/TempleComponent';

export function getProps(host: TempleComponent) {
  //get props
  const { 
    error, change, update,
    //dont need these...
    style, 'class': _,
    //input attributes
    ...attributes
  } = host.props;

  return { error, change, update, attributes };
};

export function setHostClass(host: TempleComponent, error: boolean) {
  //get the host classes
  const classes = host.className.split(' ');
  //determine display
  if (!classes.find(
    classname => classname.includes('block')
      || classname.includes('flex')
      || classname.includes('none')
      || classname.includes('inline')
      || classname.includes('inline-block')
  )) {
    host.classList.add('inline-block');
  }
  //determine padding
  if (!classes.find(
    classname => classname.includes('p-')
      || classname.includes('px-')
      || classname.includes('py-')
      || classname.includes('pt-')
      || classname.includes('pr-')
      || classname.includes('pb-')
      || classname.includes('pl-')
  )) {
    host.classList.add('p-7');
  }
  //determine border
  if (!classes.find(
    classname => classname.includes('b-')
      || classname.includes('ba-')
      || classname.includes('bx-')
      || classname.includes('by-')
      || classname.includes('bt-')
      || classname.includes('br-')
      || classname.includes('bb-')
      || classname.includes('bl-')
  )) {
    host.classList.add('b-solid', 'b-1');
    if (error) {
      host.classList.add('b-error');
    } else {
      host.classList.add('b-black');
    }
  }
  if (error) {
    host.classList.add('tx-error');
  }
  //determine bg
  if (!classes.find(classname => classname.includes('bg-'))) {
    host.classList.add('bg-white');
  }

  return host.className.split(' ');
};

export function getHandlers(
  host: TempleComponent, 
  change: Function, 
  update: Function
) {
  //handlers
  const handlers = {
    change(e: ChangeEvent<HTMLInputElement>) {
      change && change(e);
      update && update(e.target.value);
    },
    attribute(e: AttributeChangeEvent) {
      //accepts: error,accept,autocomplete,checked,disabled,max,min,
      //         multiple,name,pattern,readonly,required,step,value
      const { action, name, value, target } = e.detail;
      const input = target.querySelector('input');
      //set new class
      if (name === 'error') {
        if (action === 'remove') {
          host.classList.remove('b-error', 'tx-error');
        } else {
          host.classList.add('b-error', 'tx-error');
        }
        return;
      }
      switch (action) {
        case 'add':
        case 'update':
          input?.setAttribute(name, value);
          break;
        case 'remove':
          input?.removeAttribute(name);
          break;
      }
    }
  };
  host.on('attributechange', handlers.attribute);
  return handlers;
};