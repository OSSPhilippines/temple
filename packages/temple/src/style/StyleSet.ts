import type { StyleValue } from '../types';

import StyleMap from './StyleMap';

/**
 * Chainable way to create a styleset.
 */
export function styleset(styles: Record<string, StyleMap> = {}) {
  return new StyleSet(Object.entries(styles));
};

/**
 * A map of selectors to style definitions.
 * ie. { '.foo': { 'color': ['red'] } }
 */
export default class StyleSet extends Map<string, StyleMap> {
  /**
   * Add a style definition to the stylesheet.
   */
  public add(
    selector: string, 
    property: string, 
    values: StyleValue|StyleValue[]
  ) {
    //if the selector does not exists
    if (!this.has(selector)) {
      //add the selector to the stylesheet
      this.set(selector, new StyleMap());
    }
    //get the styles for the selector
    const styles = this.get(selector) as StyleMap;
    //if the values are a string
    if (typeof values === 'string') {
      //split the values by space and add them to the styles
      styles.set(property, values.split(' '));
    //if the values are an array
    } else if (Array.isArray(values)) {
      //add the values to the styles
      styles.set(property, values);
    }
    return this;
  }

  /**
   * Maps a selector to a style map.
   */
  public map(selector: string, map: StyleMap) {
    this.set(selector, map);
    return this;
  }

  /**
   * Convert the styleset to a string.
   */
  public toString() {
    const styleset: string[] = [];
    //loop through each selector
    //NOTE: a selector is like .foo or foo or #foo
    for (const [ selector, styles ] of this.entries()) {
      const definitions: string[] = [];
      //loop through each style definitions
      for (const [ property, values ] of styles.entries()) {
        //if the property exists and there are values
        if (property && values?.length) {
          //add the property and values to the definitions
          definitions.push(`${property}:${values.join(' ')}`);
        }
      }  
      //if there are definitions
      if (definitions.length) {
        //add the selector and definitions to the stylesheet
        styleset.push(`${selector}{${definitions.join(';')}}`);
      }
    }
    //return the stylesheet as a string
    return styleset.join('');
  }
}