import type { Component } from '@ossph/temple/compiler';
import type { Plugin } from '../types';

import Styleset from '../StyleSet';

export function visibility(document: Component): Plugin {
  return (sheet: string, brand: string) => {
    const directive = `@${brand} fouc-visibility;`;
    if (!sheet.includes(directive)) {
      return sheet;
    }
    const styleset = new Styleset();
    const selectors = Object.values(document.components).map(
      component => component.brand 
        ? `${component.brand}-${component.tagname}` 
        : component.tagname
    );
    
    selectors.forEach(selector => {
      styleset.add(`${selector}:not(:defined)`, 'visibility', 'hidden');
    });
    return sheet.replaceAll(directive, styleset.toString());
  };
};

export function display(document: Component): Plugin {
  return (sheet: string, brand: string) => {
    const directive = `@${brand} fouc-none;`;
    if (!sheet.includes(directive)) {
      return sheet;
    }
    const styleset = new Styleset();
    const selectors = Object.values(document.components).map(
      component => component.brand 
        ? `${component.brand}-${component.tagname}` 
        : component.tagname
    );
    
    selectors.forEach(selector => {
      styleset.add(`${selector}:not(:defined)`, 'display', 'none');
    });
    return sheet.replaceAll(directive, styleset.toString());
  };
};

export function opacity(document: Component) {
  return (sheet: string, brand: string) => {
    const directive = `@${brand} fouc-opacity;`;
    if (!sheet.includes(directive)) {
      return sheet;
    }
    const styleset = new Styleset();
    const selectors = Object.values(document.components).map(
      component => component.brand 
        ? `${component.brand}-${component.tagname}` 
        : component.tagname
    );
    
    selectors.forEach(selector => {
      styleset.add(`${selector}:not(:defined)`, 'opacity', 0);
    });
    return sheet.replaceAll(directive, styleset.toString());
  };
};