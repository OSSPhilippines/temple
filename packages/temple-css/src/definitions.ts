import { MediaSize } from '@ossph/temple/dist/types';
import type { 
  Token, 
  ExpressionToken, 
  LiteralToken, 
  RangeToken
} from './types';

import { breakpoints } from '@ossph/temple/dist/style/StyleSheet';
import { 
  literal, 
  expression,
  range,
  sizes,
  xsizes,
  colors,
  percents,
  bna
} from './helpers';
import StyleMap from '@ossph/temple/dist/style/StyleMap';

/**
 * Returns a pre-defined list of literal definitions
 */
export function literals(): LiteralToken[] {
  const tokens = [
    //----------------------------------------------------------------//
    // FIXED VALUES
    
    // Display
    literal('none', { display: [ 'none' ] }),
    literal('block', { display: [ 'block' ] }),
    literal('flex', { display: [ 'flex' ] }),
    literal('inline', { display: [ 'inline' ] }),
    literal('inline-block', { display: [ 'inline-block' ] }),
    literal('table', { display: [ 'table' ] }),
    literal('table-row', { display: [ 'table-row' ] }),
    literal('table-cell', { display: [ 'table-cell' ] }),
    literal('table-column', { display: [ 'table-column' ] }),
    literal('table-caption', { display: [ 'table-caption' ] }),
    literal('table-row-group', { display: [ 'table-row-group' ] }),
    literal('table-column-group', { display: [ 'table-column-group' ] }),
    literal('table-header-group', { display: [ 'table-header-group' ] }),
    literal('table-footer-group', { display: [ 'table-footer-group' ] }),
    literal('transparent', { opacity: [ 0 ] }),
    literal('hidden', { visibility: [ 'hidden' ] }),

    // Position
    literal('relative', { position: [ 'relative' ] }),
    literal('absolute', { position: [ 'absolute' ] }),
    literal('fixed', { position: [ 'fixed' ] }),
    literal('sticky', { position: [ 'sticky' ] }),
    literal('static', { position: [ 'static' ] }),

    // Float
    literal('float-left', { float: [ 'left' ] }),
    literal('float-right', { float: [ 'right' ] }),
    literal('float-none', { float: [ 'none' ] }),

    // Box
    literal('box-border', { 'box-sizing': [ 'border-box' ] }),
    literal('box-content', { 'box-sizing': [ 'content-box' ] }),
    literal('box-unset', { 'box-sizing': [ 'unset' ] }),
  
    // Flex
    literal('flex-row', { 'flex-direction': [ 'row' ] }),
    literal('flex-col', { 'flex-direction': [ 'column' ] }),
    literal('flex-grow', { 'flex-grow': [ 1 ] }),
    literal('flex-shrink', { 'flex-shrink': [ 1 ] }),
    literal('flex-center', { 
      'align-items': [ 'center' ], 
      'justify-content': [ 'center' ] 
    }),
    literal('flex-center-x', { 'justify-content': [ 'center' ] }),
    literal('flex-center-y', { 'align-items': [ 'center' ] }),
    literal('flex-wrap', { 'flex-wrap': [ 'wrap' ] }),
    literal('flex-nowrap', { 'flex-wrap': [ 'nowrap' ] }),
    literal('justify-center', { 'justify-content': [ 'center' ] }),
    literal('justify-left', { 'justify-content': [ 'flex-start' ] }),
    literal('justify-right', { 'justify-content': [ 'flex-end' ] }),
    literal('justify-between', { 'justify-content': [ 'space-between' ] }),
    literal('justify-around', { 'justify-content': [ 'space-around' ] }),
    literal('justify-evenly', { 'justify-content': [ 'space-evenly' ] }),
    literal('justify-stretch', { 'justify-content': [ 'stretch' ] }),
    literal('align-center', { 'align-items': [ 'center' ] }),
    literal('align-left', { 'align-items': [ 'flex-start' ] }),
    literal('align-right', { 'align-items': [ 'flex-end' ] }),
    literal('align-baseline', { 'align-items': [ 'baseline' ] }),
    literal('align-stretch', { 'align-items': [ 'stretch' ] }),

    // Overflow
    literal('scroll', { 'overflow': [ 'scroll' ] }),
    literal('scroll-auto', { 'overflow': [ 'auto' ] }),
    literal('scroll-hidden', { 'overflow': [ 'hidden' ] }),
    literal('scroll-x', { 'overflow-x': [ 'scroll' ] }),
    literal('scroll-x-auto', { 'overflow-x': [ 'auto' ] }),
    literal('scroll-x-hidden', { 'overflow-x': [ 'hidden' ] }),
    literal('scroll-y', { 'overflow-y': [ 'scroll' ] }),
    literal('scroll-y-auto', { 'overflow-y': [ 'auto' ] }),
    literal('scroll-y-hidden', { 'overflow-y': [ 'hidden' ] }),

    // Size
    literal('h-auto', { height: [ 'auto' ] }),
    literal('w-auto', { width: [ 'auto' ] }),
    literal('vh', { height: [ '100vh' ] }),
    literal('vw', { width: [ '100vw' ] }),
    literal('mh-auto', { 'max-height': [ 'auto' ] }),
    literal('mw-auto', { 'max-width': [ 'auto' ] }),
    literal('mw-xs', { 'max-width': [ '360px' ] }),
    literal('mw-sm', { 'max-width': [ '420px' ] }),
    literal('mw-md', { 'max-width': [ '767px' ] }),
    literal('mw-lg', { 'max-width': [ '992px' ] }),
    literal('mw-xl', { 'max-width': [ '1024px' ] }),
    literal('mw-full', { 'max-width': [ '100%' ] }),

    // Background
    literal('bg-none', { 'background-color': [ 'transparent', '!important' ] }),
    literal('bg-cover', { 'background-size': [ 'cover' ] }),
    literal('bg-contain', { 'background-size': [ 'contain' ] }),
    literal('bg-repeat', { 'background-repeat': [ 'repeat' ] }),
    literal('bg-repeat-x', { 'background-repeat': [ 'repeat-x' ] }),
    literal('bg-repeat-y', { 'background-repeat': [ 'repeat-y' ] }),
    literal('bg-norepeat', { 'background-repeat': [ 'no-repeat' ] }),
    literal('bg-fixed', { 'background-attachment': [ 'fixed' ] }),
    literal('bg-b', { 'background-position': [ 'bottom' ] }),
    literal('bg-c', { 'background-position': [ 'center' ] }),
    literal('bg-t', { 'background-position': [ 'top' ] }),
    literal('bg-l', { 'background-position': [ 'left' ] }),
    literal('bg-r', { 'background-position': [ 'right' ] }),
    literal('bg-bl', { 'background-position': [ 'left', 'bottom' ] }),
    literal('bg-cl', { 'background-position': [ 'left', 'center' ] }),
    literal('bg-tl', { 'background-position': [ 'left', 'top' ] }),
    literal('bg-bc', { 'background-position': [ 'center', 'bottom' ] }),
    literal('bg-cc', { 'background-position': [ 'center' ] }),
    literal('bg-tc', { 'background-position': [ 'center', 'top' ] }),
    literal('bg-br', { 'background-position': [ 'right', 'bottom' ] }),
    literal('bg-cr', { 'background-position': [ 'right', 'center' ] }),
    literal('bg-tr', { 'background-position': [ 'right', 'top' ] }),

    // Text
    literal('tx-2xs', { 'font-size': [ '8px' ] }),
    literal('tx-6xl', { 'font-size': [ '28px' ] }),
    literal('tx-7xl', { 'font-size': [ '30px' ] }),
    literal('tx-center', { 'text-align': [ 'center' ] }),
    literal('tx-left', { 'text-align': [ 'left' ] }),
    literal('tx-right', { 'text-align': [ 'right' ] }),
    literal('tx-bold', { 'font-weight': [ 'bold' ] }),
    literal('tx-normal', { 'font-weight': [ 'normal' ] }),
    literal('tx-italic', { 'font-style': [ 'italic' ] }),
    literal('tx-arial', { 'font-family': [ 'Arial, sans-serif' ] }),
    literal('tx-courier', { 'font-family': [ "'Courier New', Courier, monospace" ] }),
    literal('tx-georgia', { 'font-family': [ 'Georgia, serif' ] }),
    literal('tx-verdana', { 'font-family': [ 'Verdana, sans-serif' ] }),
    literal('tx-inherit', { 
      'color': [ 'inherit' ],
      'font-family': [ 'inherit' ],
      'font-size': [ 'inherit' ]
    }),
    literal('tx-underline', { 'text-decoration': [ 'underline' ] }),
    literal('tx-lower', { 'text-transform': [ 'lowercase' ] }),
    literal('tx-upper', { 'text-transform': [ 'uppercase' ] }),
    literal('tx-capital', { 'text-transform': [ 'capitalize' ] }),
    literal('tx-word-wrap', { 'word-wrap': [ 'break-word' ] }),
    literal('tx-nowrap', { 'white-space': [ 'nowrap' ] }),
    literal('tx-prewrap', { 'white-space': [ 'pre-wrap' ] }),
    literal('tx-nodecor', { 'text-decoration': [ 'none' ] }),
    literal('tx-ellipsis', { 'text-overflow': [ 'ellipsis' ] }),
    literal('tx-top', { 'vertical-align': [ 'top' ] }),
    literal('tx-middle', { 'vertical-align': [ 'middle' ] }),
    literal('tx-bottom', { 'vertical-align': [ 'bottom' ] }),

    // Border
    literal('b-solid', { 'border-style': [ 'solid' ] }),
    literal('b-dashed', { 'border-style': [ 'dashed' ] }),
    literal('b-dotted', { 'border-style': [ 'dotted' ] }),
    literal('b-collapse', { 'border-collapse': [ 'collapse' ] }),
    literal('b-transparent', { 'border-color': [ 'transparent' ] }),
    literal('bb-transparent', { 'border-bottom-color': [ 'transparent' ] }),
    literal('bl-transparent', { 'border-left-color': [ 'transparent' ] }),
    literal('br-transparent', { 'border-right-color': [ 'transparent' ] }),
    literal('bt-transparent', { 'border-top-color': [ 'transparent' ] }),
    literal('bx-transparent', { 
      'border-left-color': [ 'transparent' ],
      'border-right-color': [ 'transparent' ] 
    }),
    literal('by-transparent', { 
      'border-bottom-color': [ 'transparent' ],
      'border-top-color': [ 'transparent' ] 
    }),
    literal('curved', { 'border-radius': [ '4px' ] }),
    literal('curved-l', { 'border-radius': [ '4px', '0', '0', '4px' ] }),
    literal('curved-r', { 'border-radius': [ '0', '4px', '4px', '0' ] }),
    literal('curved-t', { 'border-radius': [ '4px', '4px', '0', '0' ] }),
    literal('curved-b', { 'border-radius': [ '0', '0', '4px', '4px' ] }),
    literal('rounded', { 'border-radius': [ '12px' ] }),
    literal('rounded-l', { 'border-radius': [ '12px', '0', '0', '12px' ] }),
    literal('rounded-r', { 'border-radius': [ '0', '12px', '12px', '0' ] }),
    literal('rounded-t', { 'border-radius': [ '12px', '12px', '0', '0' ] }),
    literal('rounded-b', { 'border-radius': [ '0', '0', '12px', '12px' ] }),
    literal('pill', { 'border-radius': [ '10000px' ] }),
    literal('pill-l', { 'border-radius': [ '10000px', '0', '0', '10000px' ] }),
    literal('pill-r', { 'border-radius': [ '0', '10000px', '10000px', '0' ] }),
    literal('pill-t', { 'border-radius': [ '10000px', '10000px', '0', '0' ] }),
    literal('pill-b', { 'border-radius': [ '0', '0', '10000px', '10000px' ] }),

    // Margin
    literal('m-auto', { margin: [ 'auto' ] }),
    literal('mx-auto', { 'margin-left': [ 'auto' ], 'margin-right': [ 'auto' ] }),

    // List
    literal('list-none', { 'list-style': [ 'none' ] }),
    literal('list-disc', { 'list-style': [ 'disc' ] }),
    literal('list-decimal', { 'list-style': [ 'decimal' ] }),
  
    // Select
    literal('select-none', { 'user-select': [ 'none' ] }),
    literal('select-text', { 'user-select': [ 'text' ] }),
    literal('select-all', { 'user-select': [ 'all' ] }),
    literal('select-auto', { 'user-select': [ 'auto' ] }),
  
    //Cursor
    literal('cursor-pointer', { 'cursor': [ 'pointer' ] }),
    literal('cursor-default', { 'cursor': [ 'default' ] }),
    literal('cursor-move', { 'cursor': [ 'move' ] }),
    literal('cursor-not-allowed', { 'cursor': [ 'not-allowed' ] }),
    literal('cursor-help', { 'cursor': [ 'help' ] }),
    literal('cursor-text', { 'cursor': [ 'text' ] }),
    literal('cursor-auto', { 'cursor': [ 'auto' ] }),
    literal('cursor-wait', { 'cursor': [ 'wait' ] }),
    literal('cursor-crosshair', { 'cursor': [ 'crosshair' ] }),

    // Ratio
    literal('ratio-full', { 'aspect-ratio': [ '1 / 1' ] }),
    literal('ratio-half', { 'aspect-ratio': [ '1 / 2' ] }),
    literal('ratio-third', { 'aspect-ratio': [ '1 / 3' ] }),
    literal('ratio-fourth', { 'aspect-ratio': [ '1 / 4' ] }),
    literal('ratio-fifth', { 'aspect-ratio': [ '1 / 5' ] }),
    literal('ratio-double', { 'aspect-ratio': [ '2 / 1' ] }),

    //----------------------------------------------------------------//
    // ITERATORS

    // Background
    ...colors.map(
      //bg-primary, bg-secondary, bg-black, bg-white, 
      //bg-info, bg-error, bg-warning, bg-success, bg-muted
      color => literal(`bg-${color}`, { 
        'background-color': [ `var(--${color})`, '!important' ] 
      })
    ),
    
    // Flex
    ...percents.map(
      //basis-full, basis-half, basis-third, basis-fourth, basis-fifth
      ([ name, value ]) => literal(`basis-${name}`, { 'flex-basis': [ `${value}%` ] })
    ),
    
    // Size
    ...percents.map(
      //h-full, h-half, h-third, h-fourth, h-fifth
      ([ name, value ]) => literal(`h-${name}`, { 'height': [ `${value}%` ] })
    ),
    ...percents.map(
      //w-full, w-half, w-third, w-fourth, w-fifth
      ([ name, value ]) => literal(`w-${name}`, { 'width': [ `${value}%` ] })
    ),

    // Text
    ...colors.map(
      //tx-primary, tx-secondary, tx-black, tx-white, 
      //tx-info, tx-error, tx-warning, tx-success, tx-muted
      color => literal(`tx-${color}`, { 'color': [ `var(--${color})`, '!important' ] })
    ),
    ...xsizes.map(
      //tx-xs, tx-sm, tx-md, tx-lg, tx-xl, tx-2xl, tx-3xl, tx-4xl, tx-5xl
      (size, i) => literal(`tx-${size}`, { 
        'font-size': [ `${(i + 5) * 2}px` ] 
      })
    ),

    // Border
    ...colors.map(
      //ba-primary, ba-secondary, ba-black, ba-white, 
      //ba-info, b-error, ba-warning, ba-success, ba-muted
      color => literal(`ba-${color}`, { 'border': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bb-primary, bb-secondary, bb-black, bb-white, 
      //bb-info, bb-error, bb-warning, bb-success, bb-muted
      color => literal(`bb-${color}`, { 'border-bottom': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bl-primary, bl-secondary, bl-black, bl-white, bl-info, 
      //bl-error, bl-warning, bl-success, bl-muted
      color => literal(`bl-${color}`, { 'border-left': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //br-primary, br-secondary, br-black, br-white, 
      //br-info, br-error, br-warning, br-success, br-muted
      color => literal(`br-${color}`, { 'border-right': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bt-primary, bt-secondary, bt-black, bt-white, 
      //bt-info, bt-error, bt-warning, bt-success, bt-muted
      color => literal(`bt-${color}`, { 'border-top': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bx-primary, bx-secondary, bx-black, bx-white, 
      //bx-info, bx-error, bx-warning, bx-success, bx-muted
      color => literal(`bx-${color}`, { 
        'border-left': [ '1px', 'solid', `var(--${color})` ],
        'border-right': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //by-primary, by-secondary, by-black, by-white, 
      //by-info, by-error, by-warning, by-success, by-muted
      color => literal(`by-${color}`, { 
        'border-bottom': [ '1px', 'solid', `var(--${color})` ],
        'border-top': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //b-primary, b-secondary, b-black, b-white, 
      //b-info, b-error, b-warning, b-success, b-muted
      color => literal(`b-${color}`, { 
        'border-color': [ `var(--${color})`, '!important' ] 
      })
    ),
    ...sizes.map(//b-xs, b-sm, b-md, b-lg, b-xl
      (size, i) => literal(`b-${size}`, { 
        'border-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bt-xs, bt-sm, bt-md, bt-lg, bt-xl
      (size, i) => literal(`bt-${size}`, { 
        'border-top-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bb-xs, bb-sm, bb-md, bb-lg, bb-xl
      (size, i) => literal(`bb-${size}`, { 
        'border-bottom-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bl-xs, bl-sm, bl-md, bl-lg, bl-xl
      (size, i) => literal(`bl-${size}`, { 
        'border-left-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//br-xs, br-sm, br-md, br-lg, br-xl
      (size, i) => literal(`br-${size}`, { 
        'border-right-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bx-xs, bx-sm, bx-md, bx-lg, bx-xl
      (size, i) => literal(`bx-${size}`, { 
        'border-left-width': [ `${i + 1}px` ],
        'border-right-width': [ `${i + 1}px` ]
      })
    ),
    ...sizes.map(//by-xs, by-sm, by-md, by-lg, by-xl
      (size, i) => literal(`by-${size}`, { 
        'border-top-width': [ `${i + 1}px` ],
        'border-bottom-width': [ `${i + 1}px` ]
      })
    ),
    ...xsizes.map(
      //c-xs, c-sm, c-md, c-lg, c-xl, 
      //c-2xl, c-3xl, c-4xl, c-5xl
      (size, i) => literal(`c-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //cl-xs, cl-sm, cl-md, cl-lg, cl-xl,
      //cl-2xl, cl-3xl, cl-4xl, cl-5xl
      (size, i) => literal(`cl-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, '0', '0', `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //cr-xs, cr-sm, cr-md, cr-lg, cr-xl, 
      //cr-2xl, cr-3xl, cr-4xl, cr-5xl
      (size, i) => literal(`cr-${size}`, { 
        'border-radius': [ '0', `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0' ] 
      })
    ),
    ...xsizes.map(
      //ct-xs, ct-sm, ct-md, ct-lg, ct-xl, 
      //ct-2xl, ct-3xl, ct-4xl, ct-5xl
      (size, i) => literal(`ct-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0', '0' ] 
      })
    ),
    ...xsizes.map(
      //cb-xs, cb-sm, cb-md, cb-lg, cb-xl 
      //cb-2xl, cb-3xl, cb-4xl, cb-5xl
      (size, i) => literal(`cb-${size}`, { 
        'border-radius': [ '0', '0', `${(i + 1) * 2}px`, `${(i + 1) * 2}px` ] 
      })
    )
  ];

  const literals = Array.from(tokens);

  tokens.forEach(token => {
    const { classname, styles } = token;
    //add bna, media
    Object.keys(breakpoints).forEach(media => {
      literals.push(
        literal(classname, styles, media as MediaSize)
      );
      bna.forEach(position => {
        literals.push(literal(
          classname, 
          styles, 
          media as MediaSize, 
          position
        ));
      });
    });
  });

  literals.push({
    type: 'literal',
    classname: 'outline-none',
    styles: (new StyleMap()).add('outline', ['none']),
    media: 'all',
    selector: '.outline-none:focus',
  });

  return literals;
};

export function ranges(): RangeToken[] { 
  return [
    //directional, calculable, negatable, measurable
    range('h', 'height', false, true, false, true),
    range('w', 'width', false, true, false, true),
    range('m', 'margin', true, true, true, true),
    range('p', 'padding', true, true, false, true),
    range('mw', 'max-width', false, true, false, true),
    range('mh', 'max-height', false, true, false, true),
    range('bottom', 'bottom', false, false, true, true),
    range('left', 'left', false, false, true, true),
    range('right', 'right', false, false, true, true),
    range('top', 'top', false, false, true, true),
    range('z', 'z-index', false, false, true, false),
    range('o', 'opacity', false, false, false, false),
    range('basis', 'flex-basis', false, true, false, true),
    range('gap', 'gap', false, true, false, true),
    range('tx-lh', 'line-height', false, false, false, true),
    range('tx', 'font-size', false, false, false, true),
    range('b', 'border-width', true, true, false, true)
  ];
};

/**
 * Returns a pre-defined list of expression definitions
 */
export function expressions(): ExpressionToken[] {
  const tokens = [
    //----------------------------------------------------------------//
    // FIXED EXPRESSIONS
    
    // Background
    expression('bg\\-t\\-(\\d+)', { 'background-color': [ 'var(--bg-$1)' ] }),
    expression('bg\\-h\\-([0-9a-f]{3,6})', { 'background-color': [ '#$1' ] }),
  
    // Text
    expression('tx\\-t\\-(\\d+)', { 'color': [ 'var(--tx-$1)' ] }),
    expression('tx\\-h\\-([0-9a-f]{3,6})', { 'color': [ '#$1' ] }),
  
    // Border
    expression('b\\-t\\-(\\d+)', { 'border-color': [ 'var(--bd-$1)' ] }),
    expression('b\\-h\\-([0-9a-f]{3,6})', { 'border-color': [ '#$1' ] }),
    expression('c\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '$1px', '$1px' ] }),
    //expression('c\\-(\\d+)p', { 'border-radius': [ '$1%', '$1%', '$1%', '$1%' ] }),
    //expression('c\\-(\\d+)e', { 'border-radius': [ '$1em', '$1em', '$1em', '$1em' ] }, [ 0.01 ]),
    //expression('c\\-(\\d+)r', { 'border-radius': [ '$1rem', '$1rem', '$1rem', '$1rem' ] }, [ 0.01 ]),
    expression('cb\\-(\\d+)', { 'border-radius': [ '0', '0', '$1px', '$1px' ] }),
    //expression('cb\\-(\\d+)p', { 'border-radius': [ '0', '0', '$1%', '$1%' ] }),
    //expression('cb\\-(\\d+)e', { 'border-radius': [ '0', '0', '$1em', '$1em' ] }, [ 0.01 ]),
    //expression('cb\\-(\\d+)r', { 'border-radius': [ '0', '0', '$1rem', '$1rem' ] }, [ 0.01 ]),
    expression('cl\\-(\\d+)', { 'border-radius': [ '$1px', '0', '0', '$1px' ] }),
    //expression('cl\\-(\\d+)p', { 'border-radius': [ '$1%', '0', '0', '$1%' ] }),
    //expression('cl\\-(\\d+)e', { 'border-radius': [ '$1em', '0', '0', '$1em' ] }, [ 0.01 ]),
    //expression('cl\\-(\\d+)r', { 'border-radius': [ '$1rem', '0', '0', '$1rem' ] }, [ 0.01 ]),
    expression('cr\\-(\\d+)', { 'border-radius': [ '0', '$1px', '$1px', '0' ] }),
    //expression('cr\\-(\\d+)p', { 'border-radius': [ '0', '$1%', '$1%', '0' ] }),
    //expression('cr\\-(\\d+)e', { 'border-radius': [ '0', '$1em', '$1em', '0' ] }, [ 0.01 ]),
    //expression('cr\\-(\\d+)r', { 'border-radius': [ '0', '$1rem', '$1rem', '0' ] }, [ 0.01 ]),
    expression('ct\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '0', '0' ] }),
    //expression('ct\\-(\\d+)p', { 'border-radius': [ '$1%', '$1%', '0', '0' ] }),
    //expression('ct\\-(\\d+)e', { 'border-radius': [ '$1em', '$1em', '0', '0' ] }, [ 0.01 ]),
    //expression('ct\\-(\\d+)r', { 'border-radius': [ '$1rem', '$1rem', '0', '0' ] }, [ 0.01 ]),
  
    //Animation
    expression('transition\\-(\\d+)', { 'transition-duration': [ '$1ms' ] }),
  
    // Box Shadow
    expression(
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-([0-9a-fA-F]{6})', 
      { 'box-shadow': [ '$1px $2px $3px $4px #$5' ] } 
    ),
    expression(
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)', 
      { 'box-shadow': [ '$1px $2px $3px rgb($4, $5, $6, $7)' ] },
      [ 1, 1, 1, 1, 1, 1, 0.01 ]
    ),

    // Ratio
    expression('ratio\\-(\\d+)\\-(\\d+)', { 'aspect-ratio': [ '$1 / $2' ] }),

    //----------------------------------------------------------------//
    // ITERATORS

    // Size
    ...percents.map(
      //h-calc-full-99, h-calc-half-99, h-calc-third-99, h-calc-fourth-99, h-calc-fifth-99
      ([ name, value ]) => expression(`h\\-calc\\-${name}-(\\d+)`, { 
        'height': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //h-calc-full-99e, h-calc-half-99e, h-calc-third-99e, h-calc-fourth-99e, h-calc-fifth-99e
    //   ([ name, value ]) => expression(`h\\-calc\\-${name}-(\\d+)e`, { 
    //     'height': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //h-calc-full-99r, h-calc-half-99r, h-calc-third-99r, h-calc-fourth-99r, h-calc-fifth-99r
    //   ([ name, value ]) => expression(`h\\-calc\\-${name}-(\\d+)r`, { 
    //     'height': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //w-calc-full-99, w-calc-half-99, w-calc-third-99, w-calc-fourth-99, w-calc-fifth-99
      ([ name, value ]) => expression(`w\\-calc\\-${name}-(\\d+)`, { 
        'width': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //w-calc-full-99e, w-calc-half-99e, w-calc-third-99e, w-calc-fourth-99e, w-calc-fifth-99e
    //   ([ name, value ]) => expression(`w\\-calc\\-${name}-(\\d+)e`, { 
    //     'width': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //w-calc-full-99r, w-calc-half-99r, w-calc-third-99r, w-calc-fourth-99r, w-calc-fifth-99r
    //   ([ name, value ]) => expression(`w\\-calc\\-${name}-(\\d+)r`, { 
    //     'width': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),

    // Margin
    ...percents.map(
      //m-calc-full-99, m-calc-half-99, m-calc-third-99, m-calc-fourth-99, m-calc-fifth-99
      ([ name, value ]) => expression(`m\\-calc\\-${name}-(\\d+)`, { 
        'margin': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //m-calc-full-99e, m-calc-half-99e, m-calc-third-99e, m-calc-fourth-99e, m-calc-fifth-99e
    //   ([ name, value ]) => expression(`m\\-calc\\-${name}-(\\d+)e`, { 
    //     'margin': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //m-calc-full-99r, m-calc-half-99r, m-calc-third-99r, m-calc-fourth-99r, m-calc-fifth-99r
    //   ([ name, value ]) => expression(`m\\-calc\\-${name}-(\\d+)r`, { 
    //     'margin': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //ml-calc-full-99, ml-calc-half-99, ml-calc-third-99, ml-calc-fourth-99, ml-calc-fifth-99
      ([ name, value ]) => expression(`ml\\-calc\\-${name}-(\\d+)`, { 
        'margin-left': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //ml-calc-full-99e, ml-calc-half-99e, ml-calc-third-99e, ml-calc-fourth-99e, ml-calc-fifth-99e
    //   ([ name, value ]) => expression(`ml\\-calc\\-${name}-(\\d+)e`, { 
    //     'margin-left': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //ml-calc-full-99r, ml-calc-half-99r, ml-calc-third-99r, ml-calc-fourth-99r, ml-calc-fifth-99r
    //   ([ name, value ]) => expression(`ml\\-calc\\-${name}-(\\d+)r`, { 
    //     'margin-left': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //mr-calc-full-99, mr-calc-half-99, mr-calc-third-99, mr-calc-fourth-99, mr-calc-fifth-99
      ([ name, value ]) => expression(`mr\\-calc\\-${name}-(\\d+)`, { 
        'margin-right': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //mr-calc-full-99e, mr-calc-half-99e, mr-calc-third-99e, mr-calc-fourth-99e, mr-calc-fifth-99e
    //   ([ name, value ]) => expression(`mr\\-calc\\-${name}-(\\d+)e`, { 
    //     'margin-right': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //mr-calc-full-99r, mr-calc-half-99r, mr-calc-third-99r, mr-calc-fourth-99r, mr-calc-fifth-99r
    //   ([ name, value ]) => expression(`mr\\-calc\\-${name}-(\\d+)r`, { 
    //     'margin-right': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //mt-calc-full-99, mt-calc-half-99, mt-calc-third-99, mt-calc-fourth-99, mt-calc-fifth-99
      ([ name, value ]) => expression(`mt\\-calc\\-${name}-(\\d+)`, { 
        'margin-top': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //mt-calc-full-99e, mt-calc-half-99e, mt-calc-third-99e, mt-calc-fourth-99e, mt-calc-fifth-99e
    //   ([ name, value ]) => expression(`mt\\-calc\\-${name}-(\\d+)e`, { 
    //     'margin-top': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //mt-calc-full-99r, mt-calc-half-99r, mt-calc-third-99r, mt-calc-fourth-99r, mt-calc-fifth-99r
    //   ([ name, value ]) => expression(`mt\\-calc\\-${name}-(\\d+)r`, { 
    //     'margin-top': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //mb-calc-full-99, mb-calc-half-99, mb-calc-third-99, mb-calc-fourth-99, mb-calc-fifth-99
      ([ name, value ]) => expression(`mb\\-calc\\-${name}-(\\d+)`, { 
        'margin-bottom': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //mb-calc-full-99e, mb-calc-half-99e, mb-calc-third-99e, mb-calc-fourth-99e, mb-calc-fifth-99e
    //   ([ name, value ]) => expression(`mb\\-calc\\-${name}-(\\d+)e`, { 
    //     'margin-bottom': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //mb-calc-full-99r, mb-calc-half-99r, mb-calc-third-99r, mb-calc-fourth-99r, mb-calc-fifth-99r
    //   ([ name, value ]) => expression(`mb\\-calc\\-${name}-(\\d+)r`, { 
    //     'margin-bottom': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),

    // Padding
    ...percents.map(
      //p-calc-full-99, p-calc-half-99, p-calc-third-99, p-calc-fourth-99, p-calc-fifth-99
      ([ name, value ]) => expression(`p\\-calc\\-${name}-(\\d+)`, { 
        'padding': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //p-calc-full-99e, p-calc-half-99e, p-calc-third-99e, p-calc-fourth-99e, p-calc-fifth-99e
    //   ([ name, value ]) => expression(`p\\-calc\\-${name}-(\\d+)e`, { 
    //     'padding': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //p-calc-full-99r, p-calc-half-99r, p-calc-third-99r, p-calc-fourth-99r, p-calc-fifth-99r
    //   ([ name, value ]) => expression(`p\\-calc\\-${name}-(\\d+)r`, { 
    //     'padding': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //pl-calc-full-99, pl-calc-half-99, pl-calc-third-99, pl-calc-fourth-99, pl-calc-fifth-99
      ([ name, value ]) => expression(`pl\\-calc\\-${name}-(\\d+)`, { 
        'padding-left': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //pl-calc-full-99e, pl-calc-half-99e, pl-calc-third-99e, pl-calc-fourth-99e, pl-calc-fifth-99e
    //   ([ name, value ]) => expression(`pl\\-calc\\-${name}-(\\d+)e`, { 
    //     'padding-left': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //pl-calc-full-99r, pl-calc-half-99r, pl-calc-third-99r, pl-calc-fourth-99r, pl-calc-fifth-99r
    //   ([ name, value ]) => expression(`pl\\-calc\\-${name}-(\\d+)r`, { 
    //     'padding-left': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //pr-calc-full-99, pr-calc-half-99, pr-calc-third-99, pr-calc-fourth-99, pr-calc-fifth-99
      ([ name, value ]) => expression(`pr\\-calc\\-${name}-(\\d+)`, { 
        'padding-right': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //pr-calc-full-99e, pr-calc-half-99e, pr-calc-third-99e, pr-calc-fourth-99e, pr-calc-fifth-99e
    //   ([ name, value ]) => expression(`pr\\-calc\\-${name}-(\\d+)e`, { 
    //     'padding-right': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //pr-calc-full-99r, pr-calc-half-99r, pr-calc-third-99r, pr-calc-fourth-99r, pr-calc-fifth-99r
    //   ([ name, value ]) => expression(`pr\\-calc\\-${name}-(\\d+)r`, { 
    //     'padding-right': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //pt-calc-full-99, pt-calc-half-99, pt-calc-third-99, pt-calc-fourth-99, pt-calc-fifth-99
      ([ name, value ]) => expression(`pt\\-calc\\-${name}-(\\d+)`, { 
        'padding-top': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //pt-calc-full-99e, pt-calc-half-99e, pt-calc-third-99e, pt-calc-fourth-99e, pt-calc-fifth-99e
    //   ([ name, value ]) => expression(`pt\\-calc\\-${name}-(\\d+)e`, { 
    //     'padding-top': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //pt-calc-full-99r, pt-calc-half-99r, pt-calc-third-99r, pt-calc-fourth-99r, pt-calc-fifth-99r
    //   ([ name, value ]) => expression(`pt\\-calc\\-${name}-(\\d+)r`, { 
    //     'padding-top': [ `calc(${value}% - $1rem)` ] 
    //   })
    // ),
    ...percents.map(
      //pb-calc-full-99, pb-calc-half-99, pb-calc-third-99, pb-calc-fourth-99, pb-calc-fifth-99
      ([ name, value ]) => expression(`pb\\-calc\\-${name}-(\\d+)`, { 
        'padding-bottom': [ `calc(${value}% - $1px)` ] 
      })
    ),
    // ...percents.map(
    //   //pb-calc-full-99e, pb-calc-half-99e, pb-calc-third-99e, pb-calc-fourth-99e, pb-calc-fifth-99e
    //   ([ name, value ]) => expression(`pb\\-calc\\-${name}-(\\d+)e`, { 
    //     'padding-bottom': [ `calc(${value}% - $1em)` ] 
    //   })
    // ),
    // ...percents.map(
    //   //pb-calc-full-99r, pb-calc-half-99r, pb-calc-third-99r, pb-calc-fourth-99r, pb-calc-fifth-99r
    //   ([ name, value ]) => expression(`pb\\-calc\\-${name}-(\\d+)r`, { 
    //     'padding-bottom': [ `calc(${value}% - $1rem)` ] 
    //   })
    // )
  ];

  const expressions = Array.from(tokens);

  //add bna, media
  tokens.forEach(token => {
    const { pattern, styles, step } = token;
    //add bna, media
    Object.keys(breakpoints).forEach(media => {
      expressions.push(
        expression(pattern, styles, step, media as MediaSize)
      );
      bna.forEach(position => {
        expressions.push(expression(
          pattern, 
          styles, 
          step, 
          media as MediaSize, 
          position
        ));
      });
    });
  });

  return expressions;
};

/**
 * Returns a pre-defined list of token definitions
 */
export function definitions(): Token[] {
  return [
    ...literals(),
    ...expressions()
  ];
};