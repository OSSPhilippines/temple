import type { MediaSize } from '../types';
import type StyleMap from './StyleMap';
import StyleSet from './StyleSet';

export const breakpoints: Record<MediaSize, number> = {
  all: 0,
  xl4: 1920,
  xl3: 1536, 
  xl2: 1280,
  xl: 1024,
  lg: 992, 
  md: 767,
  sm: 420,
  xs: 360

};

/**
 * Chainable way to create a stylesheet.
 */
export function stylesheet() {
  return new StyleSheet();
};

/**
 * A map of media breakpoints to stylesheets
 * ie. { 'xs': { '.foo': { 'color': ['red'] } } }
 */
export default class StyleSheet extends Map<MediaSize, StyleSet> {
  /**
   * Add a style definition to the stylesheet.
   */
  public add(media: MediaSize, selector: string, property: string, values: string|string[]) {
    //if the selector does not exists
    if (!this.has(media)) {
      //add the selector to the stylesheet
      this.set(media, new StyleSet());
    }
    //get the styles for the selector
    const styleset = this.get(media) as StyleSet;
    styleset.add(selector, property, values);
    return this;
  }

  /**
   * Maps a media selector to a style map.
   */
  public map(media: MediaSize, selector: string, map: StyleMap) {
    //if the media does not exists
    if (!this.has(media)) {
      //add the media to the stylesheet
      this.set(media, new StyleSet());
    }
    //get the styles for the media
    const styleset = this.get(media) as StyleSet;
    //map the selector to the style map
    styleset.map(selector, map);
    return this;
  }

  /**
   * Convert the stylesheet to a string.
   */
  public toString() {
    const stylesheet: string[] = [];
    for (const [ media, breakpoint ] of Object.entries(breakpoints)) {
      const styles = this.get(media as MediaSize)?.toString();
      if (!styles) {
        continue;
      }
      if (media === 'all') {
        stylesheet.push(styles);
        continue;
      }
      stylesheet.push(`@media (max-width:${breakpoint}px){${styles}}`);
    }
    //return the stylesheet as a string
    return stylesheet.join('');
  }
}