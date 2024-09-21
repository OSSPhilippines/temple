import type { 
  ExpressionToken, 
  LiteralToken,
  RangeToken
} from './types';

import type { MediaSize, StyleValue } from '@ossph/temple/dist/types';
import StyleMap from '@ossph/temple/dist/style/StyleMap';


//before and after
export const bna = [ 'before', 'after' ];

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
  records: Record<string, StyleValue[]>|StyleMap,
  media: MediaSize = 'all',
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
  records: Record<string, StyleValue[]>|StyleMap,
  step: number[] = [],
  media: MediaSize = 'all',
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