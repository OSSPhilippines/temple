import type { Component } from '@ossph/temple/compiler';
import type { Plugin } from '../types';

import Styleset from '@ossph/temple/dist/style/StyleSet';

export function block(document: Component): Plugin {
  return (sheet: string, brand: string) => {
    const directive = `@${brand} default-block;`;
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
      styleset.add(selector, 'display', 'block');
    });
    return sheet.replaceAll(directive, styleset.toString());
  };
};

export function inline(document: Component): Plugin {
  return (sheet: string, brand: string) => {
    const directive = `@${brand} default-inline;`;
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
      styleset.add(selector, 'display', 'inline-block');
    });
    return sheet.replaceAll(directive, styleset.toString());
  };
};