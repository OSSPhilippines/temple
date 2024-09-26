import type { ChangeEvent, AttributeChangeEvent } from '@ossph/temple/dist/types';
import type TempleField from '@ossph/temple/dist/client/TempleField';
import StyleSet from '@ossph/temple/dist/style/StyleSet';
import setAlign from './style/align';
import setColor from './style/color';
import setDisplay from './style/display';
import setPadding from './style/padding';
import setSize from './style/size';

export function getProps(host: TempleField) {
  //get props
  const { 
    change, update, 
    //display
    flex, none, inline, block, 
    'inline-block': iblock, 
    'inline-flex': iflex,
    //spacing
    padding, 
    'padding-x': paddingX, 
    'padding-y': paddingY,
    //font color
    color, white,   black, 
    info,  warning, success, 
    error, muted,   primary, 
    secondary, theme,
    //font size
    size, xs,  sm,  md,  lg, 
    xl,   xl2, xl3, xl4, xl5,
    //others
    align, 
    //dont need these...
    style, 'class': _,
    //input attributes
    ...attributes
  } = host.props;
  const { background, border } = host.propsTree;
  return { 
    change, update, 
    //display
    flex, none, inline, block, 
    'inline-block': iblock, 
    'inline-flex': iflex,
    //spacing
    padding, 
    'padding-x': paddingX, 
    'padding-y': paddingY,
    //font color
    color, white,   black, 
    info,  warning, success, 
    error, muted,   primary, 
    secondary, theme,
    //font size
    size, xs,  sm,  md,  lg, 
    xl,   xl2, xl3, xl4, xl5,
    //sub props
    background, border,
    //others
    align, 
    //for input
    attributes 
  };
};

export function setDefaultStyles(
  props: Record<string, any>, 
  styles: StyleSet
) {
  const { background, border, error } = props;
  //determine display
  setDisplay(props, styles, 'inline-block', ':host');
  //determine background colors
  if (background) {
    setColor(background, styles, 'var(--white)', ':host', 'background-color');
  } else {
    styles.add(':host', 'background-color', 'var(--white)');
  }
  //determine border colors
  styles.add(':host', 'border-width', '1px');
  styles.add(':host', 'border-style', 'solid');
  if (error) {
    styles.add(':host', 'border-color', 'var(--error)');
  } else if (border) {
    setColor(border, styles, 'var(--black)', ':host', 'border-color');
  } else {
    styles.add(':host', 'border-color', 'var(--black)');
  }
  //default input styles
  styles.add('::slotted(*)', 'background', 'transparent');
  styles.add('::slotted(*)', 'border', '0');
  styles.add('::slotted(*)', 'box-sizing', 'border-box');
  styles.add('::slotted(*)', 'font-family', 'inherit');
  styles.add('::slotted(*)', 'display', 'block');
  styles.add('::slotted(*)', 'height', '100%');
  styles.add('::slotted(*:focus)', 'outline', 'none');
  styles.add('::slotted(*)', 'width', '100%');
  styles.add('::host([error]) ::slotted(*)', 'color', 'var(--error)');
  styles.add('::host([error]) ::slotted(*)', 'border-color', 'var(--error)');
  //determine align
  setAlign(props, styles, 'left', '::slotted(*)');
  //determine font size
  setSize(props, styles, 'inherit', '::slotted(*)', 'font-size');
  //determine font color
  setColor(props, styles, 'var(--black)', '::slotted(*)', 'color');
  //determine padding
  const padding = setPadding(props, styles, '::slotted(*)');
  if (!padding) {
    styles.add('::slotted(*)', 'padding', '7px');
  }
};

export function getHandlers(
  host: TempleField, 
  change?: Function, 
  update?: Function
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