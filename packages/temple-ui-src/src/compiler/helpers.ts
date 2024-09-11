import type { 
  Media,
  StyleRecord,
  ExpressionToken, 
  LiteralToken, 
  RangeToken,
} from './types';

import StyleMap from './StyleMap';
import StyleSet from './StyleSet';
import StyleSheet from './StyleSheet';

//before and after
export const bna = [ 'before', 'after' ];

//responsive names and breakpoints
export const media = [
  'all', 'xl4', 'xl3', 
  'xl2', 'xl',  'lg', 
  'md',  'sm',  'xs'
];

export const breakpoints = [
  0,    1920, 1536, 
  1280, 1024, 992, 
  767,  420,  360
];

export const responsive = Object.fromEntries(
  media.map((name, index) => [ name as Media, breakpoints[index] ])
) as Record<Media, number>;

export const sizes = [ 'xs', 'sm', 'md', 'lg', 'xl' ];
export const xsizes = [ ...sizes, '2xl', '3xl', '4xl', '5xl' ];
export const colors = [
  'primary', 'secondary', 'black', 
  'white',   'info',      'error', 
  'warning', 'success',   'muted'
];
export const percents = Object.entries({
  full: '100',
  half: '50',
  third: '33.33',
  fourth: '25',
  fifth: '20'
});

/**
 * Helper to form a literal token.
 */
export function literal(
  name: string, 
  records: StyleRecord
): LiteralToken {
  const styles = new StyleMap(Object.entries(records));
  return { 
    type: 'literal', 
    name, 
    styles
  };
};

/**
 * Helper to form a range token.
 */
export function range(
  name: string, 
  records: StyleRecord, 
  min: number, 
  max: number,
  step = 1
): RangeToken {
  const styles = new StyleMap(Object.entries(records));
  return {
    type: 'range',
    name,
    styles,
    range: [ min, max ],
    step
  };
};

/**
 * Helper to form an expression token.
 */
export function expression(
  name: string, 
  records: StyleRecord 
): ExpressionToken {
  const styles = new StyleMap(Object.entries(records));
  return { 
    type: 'expression', 
    name, 
    styles
  };
};

/**
 * Chainable way to create a stylemap.
 */
export function stylemap(styles: StyleRecord = {}) {
  return new StyleMap(Object.entries(styles));
};

/**
 * Chainable way to create a styleset.
 */
export function styleset(styles: Record<string, StyleMap> = {}) {
  return new StyleSet(Object.entries(styles));
};

/**
 * Chainable way to create a stylesheet.
 */
export function stylesheet() {
  return new StyleSheet();
};