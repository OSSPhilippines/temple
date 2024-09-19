import type { StyleValue } from '../types';

/**
 * Chainable way to create a stylemap.
 */
export function stylemap(styles: Record<string, StyleValue[]> = {}) {
  return new StyleMap(Object.entries(styles));
};

/**
 * A map of style names to style values
 * ie. { 'color': ['red'] }
 * ie. { 'border': ['1px', 'solid', 'red'] }
 */
export default class StyleMap extends Map<string, StyleValue[]> {
  /**
   * Add a style definition to the stylesheet.
   */
  public add(property: string, values: StyleValue|StyleValue[]) {
    //if the property does not exists
    if (!this.has(property)) {
      //add the property to the stylesheet
      this.set(property, []);
    }
    //get the values for the property
    const styles = this.get(property) as StyleValue[];
    //if the values are a string
    if (typeof values === 'string' || typeof values === 'number') {
      //split the values by space and add them to the styles
      styles.push(values);
    //if the values are an array
    } else if (Array.isArray(values)) {
      //add the values to the styles
      styles.push(...values);
    }
    return this;
  }

  /**
   * Clones a new stylemap based on this one.
   */
  public clone() {
    const stylemap = new StyleMap();
    for (const [ key, values ] of this.entries()) {
      stylemap.set(key, values.slice());
    }
    return stylemap;
  }

  /**
   * Replace all instances of a substring in the values.
   */
  public replaceAll(search: string, replace: string) {
    for (const [ key, values ] of this.entries()) {
      this.set(key, values.map(value => {
        if (typeof value === 'string') {
          return value.replaceAll(search, replace);
        }
        return value;
      }));
    }
    return this;
  }
}