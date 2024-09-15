import type { 
  Media,
  StyleRecord,
  ExpressionToken, 
  LiteralToken,
  RangeToken
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
  records: StyleRecord|StyleMap,
  media: Media = 'all',
  pseudo?: string
): LiteralToken {
  const styles = records instanceof StyleMap 
    ? records.clone()
    : new StyleMap(Object.entries(records));
  let selector = `.${name}`;
  let classname = name;
  if (media !== 'all') {
    classname = `${media}-${name}`;
    selector = `.${classname}`;
    if (pseudo) {
      classname = `${media}-${pseudo}-${name}`;
      selector = `.${classname}::${pseudo}`;
    }
  } else if (pseudo) {
    classname = `${pseudo}-${name}`;
    selector = `.${classname}::${pseudo}`;
  } 
  return { 
    type: 'literal', 
    media,
    classname, 
    styles,
    selector
  };
};

export function range(
  name: string, // ex. 'm'
  property: string, // ex. 'margin'
  directional: boolean,
  calculable: boolean,
  negatable: boolean,
  measurable: boolean
): RangeToken {
  return {
    name,
    property,
    directional,
    calculable,
    measurable,
    negatable
  }
}

/**
 * Helper to form an expression token.
 */
export function expression(
  regex: string, 
  records: StyleRecord|StyleMap,
  step: number[] = [],
  media: Media = 'all',
  pseudo?: string
): ExpressionToken {
  const styles = records instanceof StyleMap 
    ? records.clone()
    : new StyleMap(Object.entries(records));
  let pattern = regex;
  if (media !== 'all') {
    pattern = `${media}\\-${regex}`;
    if (pseudo) {
      pattern = `${media}\\-${pseudo}\\-${regex}`;
    }
  } else if (pseudo) {
    pattern = `${pseudo}\\-${regex}`;
  }
  return { 
    type: 'expression', 
    media,
    pattern, 
    styles,
    step,
    pseudo
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