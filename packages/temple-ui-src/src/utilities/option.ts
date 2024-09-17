import type { ChangeEvent, AttributeChangeEvent } from '@ossph/temple/dist/types';
import type TempleComponent from '@ossph/temple/dist/client/TempleComponent';

export function getProps(host: TempleComponent) {
  //get props
  const { 
    label,   error, check,  circle, square, 
    rounded, blue,  orange, change, update,
    //dont need these...
    style, 'class': _,
    //input attributes
    ...attributes
  } = host.props;

  return { 
    label,   error, check,  circle, square, 
    rounded, blue,  orange, change, update,
    attributes 
  };
};

export function setHostClass(
  host: TempleComponent, 
  error: boolean, 
  shape: string
) {
  const { circle, square, rounded, blue, orange } = getProps(host);
  //determine host class display
  if (!host.classList.contains('block') 
    && !host.classList.contains('flex')
    && !host.classList.contains('none')
    && !host.classList.contains('inline')
    && !host.classList.contains('inline-block')
  ) {
    host.classList.add('inline-block');
  }
  //set label classnames
  const classList = [ 'tui-field-option' ];
  if (rounded) {
    classList.push('tui-field-option-rounded');
  }
  if (circle) {
    classList.push('tui-field-option-circle');
  } else if (square) {
    classList.push('tui-field-option-square');
  } else {
    classList.push(shape);
  }
  if (blue) {
    classList.push('tui-field-option-blue');
  } else if (orange) {
    classList.push('tui-field-option-orange');
  } else {
    classList.push('tui-field-option-default');
  }
  if (error) {
    classList.push('tui-tx-error', 'tui-bd-error');
  }

  return classList;
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
      update && update(e.target.checked ? e.target.value: '');
    },
    attribute(e: AttributeChangeEvent) {
      //accepts: error,checked,disabled,name,readonly,required,value
      const { action, name, value, target } = e.detail;
      const input = target.querySelector('input');
      //set new class
      if (name === 'error') {
        if (action === 'remove') {
          host.classList.remove('tx-error');
        } else {
          host.classList.add('tx-error');
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