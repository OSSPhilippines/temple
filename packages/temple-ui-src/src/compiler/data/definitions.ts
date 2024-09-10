import type { 
  Token, 
  ExpressionToken, 
  LiteralToken, 
  RangeToken,
} from '../types';

import { 
  literal, 
  range, 
  expression,
  sizes,
  xsizes,
  colors,
  percents
} from '../helpers';

/**
 * Returns a pre-defined list of literal definitions
 */
export function literals(): LiteralToken[] {
  return [
    //----------------------------------------------------------------//
    // FIXED VALUES

    // Fonts
    literal(false, 'arial', { 'font-family': [ 'Arial, sans-serif' ] }),
    literal(false, 'courier', { 'font-family': [ "'Courier New', Courier, monospace" ] }),
    literal(false, 'georgia', { 'font-family': [ 'Georgia, serif' ] }),
    literal(false, 'verdana', { 'font-family': [ 'Verdana, sans-serif' ] }),
    
    // Display
    literal(true, 'none', { display: [ 'none' ] }),
    literal(true, 'block', { display: [ 'block' ] }),
    literal(true, 'flex', { display: [ 'flex' ] }),
    literal(true, 'inline', { display: [ 'inline' ] }),
    literal(true, 'inline-block', { display: [ 'inline-block' ] }),
    literal(true, 'transparent', { opacity: [ 0 ] }),
    literal(true, 'hidden', { visibility: [ 'hidden' ] }),

    // Position
    literal(true, 'relative', { position: [ 'relative' ] }),
    literal(true, 'absolute', { position: [ 'absolute' ] }),
    literal(true, 'fixed', { position: [ 'fixed' ] }),
    literal(true, 'sticky', { position: [ 'sticky' ] }),
    literal(true, 'static', { position: [ 'static' ] }),

    // Float
    literal(true, 'float-left', { float: [ 'left' ] }),
    literal(true, 'float-right', { float: [ 'right' ] }),
    literal(true, 'float-none', { float: [ 'none' ] }),
  
    // Flex
    literal(true, 'flex-row', { 'flex-direction': [ 'row' ] }),
    literal(true, 'flex-col', { 'flex-direction': [ 'column' ] }),
    literal(true, 'flex-grow', { 'flex-grow': [ 1 ] }),
    literal(true, 'flex-shrink', { 'flex-shrink': [ 1 ] }),
    literal(true, 'flex-center', { 
      'align-items': [ 'center' ], 
      'justify-content': [ 'center' ] 
    }),
    literal(true, 'flex-center-x', { 'justify-content': [ 'center' ] }),
    literal(true, 'flex-center-y', { 'align-items': [ 'center' ] }),
    literal(true, 'flex-wrap', { 'flex-wrap': [ 'wrap' ] }),
    literal(true, 'flex-nowrap', { 'flex-wrap': [ 'nowrap' ] }),
    literal(true, 'justify-center', { 'justify-content': [ 'center' ] }),
    literal(true, 'justify-left', { 'justify-content': [ 'flex-start' ] }),
    literal(true, 'justify-right', { 'justify-content': [ 'flex-end' ] }),
    literal(true, 'justify-between', { 'justify-content': [ 'space-between' ] }),
    literal(true, 'justify-around', { 'justify-content': [ 'space-around' ] }),
    literal(true, 'justify-evenly', { 'justify-content': [ 'space-evenly' ] }),
    literal(true, 'align-center', { 'align-items': [ 'center' ] }),
    literal(true, 'align-left', { 'align-items': [ 'flex-start' ] }),
    literal(true, 'align-right', { 'align-items': [ 'flex-end' ] }),
    literal(true, 'align-baseline', { 'align-items': [ 'baseline' ] }),

    // Overflow
    literal(true, 'scroll', { 'overflow': [ 'scroll' ] }),
    literal(true, 'scroll-auto', { 'overflow': [ 'auto' ] }),
    literal(true, 'scroll-hidden', { 'overflow': [ 'hidden' ] }),
    literal(true, 'scroll-x', { 'overflow-x': [ 'scroll' ] }),
    literal(true, 'scroll-x-auto', { 'overflow-x': [ 'auto' ] }),
    literal(true, 'scroll-x-hidden', { 'overflow-x': [ 'hidden' ] }),
    literal(true, 'scroll-y', { 'overflow-y': [ 'scroll' ] }),
    literal(true, 'scroll-y-auto', { 'overflow-y': [ 'auto' ] }),
    literal(true, 'scroll-y-hidden', { 'overflow-y': [ 'hidden' ] }),

    // Size
    literal(true, 'h-auto', { height: [ 'auto' ] }),
    literal(true, 'w-auto', { width: [ 'auto' ] }),
    literal(true, 'vh', { height: [ '100vh' ] }),
    literal(true, 'vw', { width: [ '100vw' ] }),
    literal(true, 'wm-auto', { 'max-width': [ 'auto' ] }),
    literal(true, 'wm-xs', { 'max-width': [ '360px' ] }),
    literal(true, 'wm-sm', { 'max-width': [ '420px' ] }),
    literal(true, 'wm-md', { 'max-width': [ '767px' ] }),
    literal(true, 'wm-lg', { 'max-width': [ '992px' ] }),
    literal(true, 'wm-xl', { 'max-width': [ '1024px' ] }),
    literal(true, 'wm-full', { 'max-width': [ '100%' ] }),

    // Background
    literal(true, 'bg-none', { 'background-color': [ 'transparent', '!important' ] }),
    literal(true, 'bg-cover', { 'background-size': [ 'cover' ] }),
    literal(true, 'bg-contain', { 'background-size': [ 'contain' ] }),
    literal(true, 'bg-repeat', { 'background-repeat': [ 'repeat' ] }),
    literal(true, 'bg-repeat-x', { 'background-repeat': [ 'repeat-x' ] }),
    literal(true, 'bg-repeat-y', { 'background-repeat': [ 'repeat-y' ] }),
    literal(true, 'bg-norepeat', { 'background-repeat': [ 'no-repeat' ] }),
    literal(true, 'bg-fixed', { 'background-attachment': [ 'fixed' ] }),
    literal(true, 'bg-b', { 'background-position': [ 'bottom' ] }),
    literal(true, 'bg-c', { 'background-position': [ 'center' ] }),
    literal(true, 'bg-t', { 'background-position': [ 'top' ] }),
    literal(true, 'bg-l', { 'background-position': [ 'left' ] }),
    literal(true, 'bg-r', { 'background-position': [ 'right' ] }),
    literal(true, 'bg-bl', { 'background-position': [ 'left', 'bottom' ] }),
    literal(true, 'bg-cl', { 'background-position': [ 'left', 'center' ] }),
    literal(true, 'bg-tl', { 'background-position': [ 'left', 'top' ] }),
    literal(true, 'bg-bc', { 'background-position': [ 'center', 'bottom' ] }),
    literal(true, 'bg-cc', { 'background-position': [ 'center' ] }),
    literal(true, 'bg-tc', { 'background-position': [ 'center', 'top' ] }),
    literal(true, 'bg-br', { 'background-position': [ 'right', 'bottom' ] }),
    literal(true, 'bg-cr', { 'background-position': [ 'right', 'center' ] }),
    literal(true, 'bg-tr', { 'background-position': [ 'right', 'top' ] }),

    // Text
    literal(true, 'tx-2xs', { 'font-size': [ '8px' ] }),
    literal(true, 'tx-6xl', { 'font-size': [ '28px' ] }),
    literal(true, 'tx-7xl', { 'font-size': [ '30px' ] }),
    literal(true, 'tx-center', { 'text-align': [ 'center' ] }),
    literal(true, 'tx-left', { 'text-align': [ 'left' ] }),
    literal(true, 'tx-right', { 'text-align': [ 'right' ] }),
    literal(true, 'tx-bold', { 'font-weight': [ 'bold' ] }),
    literal(true, 'tx-normal', { 'font-weight': [ 'normal' ] }),
    literal(true, 'tx-italic', { 'font-style': [ 'italic' ] }),
    literal(true, 'tx-underline', { 'text-decoration': [ 'underline' ] }),
    literal(true, 'tx-lowercase', { 'text-transform': [ 'lowercase' ] }),
    literal(true, 'tx-uppercase', { 'text-transform': [ 'uppercase' ] }),
    literal(true, 'tx-word-wrap', { 'word-wrap': [ 'break-word' ] }),
    literal(true, 'tx-nowrap', { 'white-space': [ 'nowrap' ] }),
    literal(true, 'tx-prewrap', { 'white-space': [ 'pre-wrap' ] }),
    literal(true, 'tx-nodecor', { 'text-decoration': [ 'none' ] }),
    literal(true, 'tx-top', { 'vertical-align': [ 'top' ] }),
    literal(true, 'tx-middle', { 'vertical-align': [ 'middle' ] }),
    literal(true, 'tx-bottom', { 'vertical-align': [ 'bottom' ] }),

    // Border
    literal(false, 'bd-solid', { 'border-style': [ 'solid' ] }),
    literal(false, 'bd-dashed', { 'border-style': [ 'dashed' ] }),
    literal(false, 'bd-dotted', { 'border-style': [ 'dotted' ] }),
    literal(false, 'bd-collapse', { 'border-collapse': [ 'collapse' ] }),
    literal(true, 'curved', { 'border-radius': [ '4px' ] }),
    literal(true, 'curved-l', { 'border-radius': [ '4px', '0', '0', '4px' ] }),
    literal(true, 'curved-r', { 'border-radius': [ '0', '4px', '4px', '0' ] }),
    literal(true, 'curved-t', { 'border-radius': [ '4px', '4px', '0', '0' ] }),
    literal(true, 'curved-b', { 'border-radius': [ '0', '0', '4px', '4px' ] }),
    literal(true, 'rounded', { 'border-radius': [ '12px' ] }),
    literal(true, 'rounded-l', { 'border-radius': [ '12px', '0', '0', '12px' ] }),
    literal(true, 'rounded-r', { 'border-radius': [ '0', '12px', '12px', '0' ] }),
    literal(true, 'rounded-t', { 'border-radius': [ '12px', '12px', '0', '0' ] }),
    literal(true, 'rounded-b', { 'border-radius': [ '0', '0', '12px', '12px' ] }),
    literal(true, 'pill', { 'border-radius': [ '10000px' ] }),
    literal(true, 'pill-l', { 'border-radius': [ '10000px', '0', '0', '10000px' ] }),
    literal(true, 'pill-r', { 'border-radius': [ '0', '10000px', '10000px', '0' ] }),
    literal(true, 'pill-t', { 'border-radius': [ '10000px', '10000px', '0', '0' ] }),
    literal(true, 'pill-b', { 'border-radius': [ '0', '0', '10000px', '10000px' ] }),
    literal(true, 'curve-full', { 'border-radius': [ '10000px' ] }),
    literal(true, 'curve-l-full', { 'border-radius': [ '10000px', '0', '0', '10000px' ] }),
    literal(true, 'curve-r-full', { 'border-radius': [ '0', '10000px', '10000px', '0' ] }),
    literal(true, 'curve-t-full', { 'border-radius': [ '10000px', '10000px', '0', '0' ] }),
    literal(true, 'curve-b-full', { 'border-radius': [ '0', '0', '10000px', '10000px' ] }),

    // Margin
    literal(true, 'm-auto', { margin: [ 'auto' ] }),
    literal(true, 'mx-auto', { 'margin-left': [ 'auto' ], 'margin-right': [ 'auto' ] }),

    // List
    literal(true, 'list-none', { 'list-style': [ 'none' ] }),
    literal(true, 'list-disc', { 'list-style': [ 'disc' ] }),
    literal(true, 'list-decimal', { 'list-style': [ 'decimal' ] }),
  
    // Select
    literal(true, 'select-none', { 'user-select': [ 'none' ] }),
    literal(true, 'select-text', { 'user-select': [ 'text' ] }),
    literal(true, 'select-all', { 'user-select': [ 'all' ] }),
    literal(true, 'select-auto', { 'user-select': [ 'auto' ] }),
  
    //Cursor
    literal(true, 'cursor-pointer', { 'cursor': [ 'pointer' ] }),
    literal(true, 'cursor-default', { 'cursor': [ 'default' ] }),
    literal(true, 'cursor-move', { 'cursor': [ 'move' ] }),
    literal(true, 'cursor-not-allowed', { 'cursor': [ 'not-allowed' ] }),
    literal(true, 'cursor-help', { 'cursor': [ 'help' ] }),
    literal(true, 'cursor-text', { 'cursor': [ 'text' ] }),
    literal(true, 'cursor-auto', { 'cursor': [ 'auto' ] }),
    literal(true, 'cursor-wait', { 'cursor': [ 'wait' ] }),
    literal(true, 'cursor-crosshair', { 'cursor': [ 'crosshair' ] }),

    //----------------------------------------------------------------//
    // ITERATORS

    // Background
    ...colors.map(
      //bg-primary, bg-secondary, bg-black, bg-white, 
      //bg-info, bg-error, bg-warning, bg-success, bg-muted
      color => literal(false, `bg-${color}`, { 
        'background-color': [ `var(--${color})`, '!important' ] 
      })
    ),
    
    // Flex
    ...percents.map(
      //basis-full, basis-half, basis-third, basis-fourth, basis-fifth
      ([ name, value ]) => literal(true, `basis-${name}`, { 'flex-basis': [ `${value}%` ] })
    ),
    
    // Size
    ...percents.map(
      //h-full, h-half, h-third, h-fourth, h-fifth
      ([ name, value ]) => literal(true, `h-${name}`, { 'height': [ `${value}%` ] })
    ),
    ...percents.map(
      //w-full, w-half, w-third, w-fourth, w-fifth
      ([ name, value ]) => literal(true, `w-${name}`, { 'width': [ `${value}%` ] })
    ),

    // Text
    ...colors.map(
      //tx-primary, tx-secondary, tx-black, tx-white, 
      //tx-info, tx-error, tx-warning, tx-success, tx-muted
      color => literal(false, `tx-${color}`, { 'color': [ `var(--${color})`, '!important' ] })
    ),
    ...xsizes.map(
      //tx-xs, tx-sm, tx-md, tx-lg, tx-xl, tx-2xl, tx-3xl, tx-4xl, tx-5xl
      (size, i) => literal(true, `tx-${size}`, { 
        'font-size': [ `${(i + 5) * 2}px` ] 
      })
    ),

    // Border
    ...colors.map(
      //bda-primary, bda-secondary, bda-black, bda-white, 
      //bda-info, bda-error, bda-warning, bda-success, bda-muted
      color => literal(false, `bda-${color}`, { 'border': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdb-primary, bdb-secondary, bdb-black, bdb-white, 
      //bdb-info, bdb-error, bdb-warning, bdb-success, bdb-muted
      color => literal(false, `bdb-${color}`, { 'border-bottom': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdl-primary, bdl-secondary, bdl-black, bdl-white, bdl-info, 
      //bdl-error, bdl-warning, bdl-success, bdl-muted
      color => literal(false, `bdl-${color}`, { 'border-left': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdr-primary, bdr-secondary, bdr-black, bdr-white, 
      //bdr-info, bdr-error, bdr-warning, bdr-success, bdr-muted
      color => literal(false, `bdr-${color}`, { 'border-right': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdt-primary, bdt-secondary, bdt-black, bdt-white, 
      //bdt-info, bdt-error, bdt-warning, bdt-success, bdt-muted
      color => literal(false, `bdt-${color}`, { 'border-top': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdx-primary, bdx-secondary, bdx-black, bdx-white, 
      //bdx-info, bdx-error, bdx-warning, bdx-success, bdx-muted
      color => literal(false, `bdx-${color}`, { 
        'border-left': [ '1px', 'solid', `var(--${color})` ],
        'border-right': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //bdy-primary, bdy-secondary, bdy-black, bdy-white, 
      //bdy-info, bdy-error, bdy-warning, bdy-success, bdy-muted
      color => literal(false, `bdy-${color}`, { 
        'border-bottom': [ '1px', 'solid', `var(--${color})` ],
        'border-top': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //bd-primary, bd-secondary, bd-black, bd-white, 
      //bd-info, bd-error, bd-warning, bd-success, bd-muted
      color => literal(false, `bd-${color}`, { 
        'border-color': [ `var(--${color})`, '!important' ] 
      })
    ),
    ...sizes.map(//bd-xs, bd-sm, bd-md, bd-lg, bd-xl
      (size, i) => literal(false, `bd-${size}`, { 
        'border-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdt-xs, bdt-sm, bdt-md, bdt-lg, bdt-xl
      (size, i) => literal(false, `bdt-${size}`, { 
        'border-top-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdb-xs, bdb-sm, bdb-md, bdb-lg, bdb-xl
      (size, i) => literal(false, `bdb-${size}`, { 
        'border-bottom-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdl-xs, bdl-sm, bdl-md, bdl-lg, bdl-xl
      (size, i) => literal(false, `bdl-${size}`, { 
        'border-left-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdr-xs, bdr-sm, bdr-md, bdr-lg, bdr-xl
      (size, i) => literal(false, `bdr-${size}`, { 
        'border-right-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdx-xs, bdx-sm, bdx-md, bdx-lg, bdx-xl
      (size, i) => literal(false, `bdx-${size}`, { 
        'border-left-width': [ `${i + 1}px` ],
        'border-right-width': [ `${i + 1}px` ]
      })
    ),
    ...sizes.map(//bdy-xs, bdy-sm, bdy-md, bdy-lg, bdy-xl
      (size, i) => literal(false, `bdy-${size}`, { 
        'border-top-width': [ `${i + 1}px` ],
        'border-bottom-width': [ `${i + 1}px` ]
      })
    ),
    ...xsizes.map(
      //curve-xs, curve-sm, curve-md, curve-lg, curve-xl, 
      //curve-2xl, curve-3xl, curve-4xl, curve-5xl
      (size, i) => literal(true, `curve-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //curve-l-xs, curve-l-sm, curve-l-md, curve-l-lg, curve-l-xl,
      //curve-l-2xl, curve-l-3xl, curve-l-4xl, curve-l-5xl
      (size, i) => literal(true, `curve-l-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, '0', '0', `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //curve-r-xs, curve-r-sm, curve-r-md, curve-r-lg, curve-r-xl, 
      //curve-r-2xl, curve-r-3xl, curve-r-4xl, curve-r-5xl
      (size, i) => literal(true, `curve-r-${size}`, { 
        'border-radius': [ '0', `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0' ] 
      })
    ),
    ...xsizes.map(
      //curve-t-xs, curve-t-sm, curve-t-md, curve-t-lg, curve-t-xl, 
      //curve-t-2xl, curve-t-3xl, curve-t-4xl, curve-t-5xl
      (size, i) => literal(true, `curve-t-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0', '0' ] 
      })
    ),
    ...xsizes.map(
      //curve-b-xs, curve-b-sm, curve-b-md, curve-b-lg, curve-b-xl 
      //curve-b-2xl, curve-b-3xl, curve-b-4xl, curve-b-5xl
      (size, i) => literal(true, `curve-b-${size}`, { 
        'border-radius': [ '0', '0', `${(i + 1) * 2}px`, `${(i + 1) * 2}px` ] 
      })
    ),
  ];
};

/**
 * Returns a pre-defined list of range definitions
 */
export function ranges(): RangeToken[] {
  return [
    // Opacity
    range(true, 'o-$', { opacity: [ '$' ] }, 0, 1, 0.01),
    // Border
    range(true, 'bd-$', { 'border-width': [ '$px' ] }, 0, 20),
    range(true, 'bdb-$', { 'border-bottom-width': [ '$px' ] }, 0, 20),
    range(true, 'bdl-$', { 'border-left-width': [ '$px' ] }, 0, 20),
    range(true, 'bdr-$', { 'border-right-width': [ '$px' ] }, 0, 20),
    range(true, 'bdt-$', { 'border-top-width': [ '$px' ] }, 0, 20),
    range(true, 'bdx-$', {
      'border-left-width': [ '$px' ],
      'border-right-width': [ '$px' ]
    }, 0, 20),
    range(true, 'bdy-$', {
      'border-bottom-width': [ '$px' ],
      'border-top-width': [ '$px' ]
    }, 0, 20),
  ];
};

/**
 * Returns a pre-defined list of expression definitions
 */
export function expressions(): ExpressionToken[] {
  return [
    //----------------------------------------------------------------//
    // FIXED EXPRESSIONS

    // Position
    expression(true, 'bottom\\-(\\-{0,1}\\d+)', { bottom: [ '$1px' ] }),
    expression(true, 'left\\-(\\-{0,1}\\d+)', { left: [ '$1px' ] }),
    expression(true, 'right\\-(\\-{0,1}\\d+)', { right: [ '$1px' ] }),
    expression(true, 'top\\-(\\-{0,1}\\d+)', { top: [ '$1px' ] }),
    expression(true, 'z\\-(\\d+)', { 'z-index': [ '$1' ] }),
    
    // Flex
    expression(true, 'basis\\-(\\d+)', { 'flex-basis': [ '$1px' ] }),
    expression(true, 'basis\\-p\\-(\\d+)', { 'flex-basis': [ '$1%' ] }),
    expression(true, 'gap\\-(\\d+)', { 'gap': [ '$1px' ] }),
  
    // Size
    expression(true, 'h\\-(\\d+)', { height: [ '$1px' ] }),
    expression(true, 'h\\-calc\\-(\\d+)-(\\d+)', { height: [ 'calc($1% - $2px)' ] }),
    expression(true, 'w\\-(\\d+)', { width: [ '$1px' ] }),
    expression(true, 'wp\\-(\\d+)', { width: [ '$1%' ] }),
    expression(true, 'w\\-calc\\-(\\d+)-(\\d+)', { width: [ 'calc($1% - $2px)' ] }),
    expression(true, 'wm\\-(\\d+)', { 'max-width': [ '$1px' ] }),
    
    // Background
    expression(true, 'bg\\-t\\-(\\d+)', { 'background-color': [ 'var(--bg-$1)' ] }),
    expression(true, 'bg\\-h\\-([0-9a-f]{3,6})', { 'background-color': [ '#$1' ] }),
  
    // Text
    expression(true, 'tx\\-(\\d+)', { 'font-size': [ '$1px' ] }),
    expression(true, 'tx\\-lh\\-(\\d+)', { 'line-height': [ '$1px' ] }),
    expression(true, 'tx\\-t\\-(\\d+)', { 'color': [ 'var(--tx-$1)' ] }),
    expression(true, 'tx\\-h\\-([0-9a-f]{3,6})', { 'color': [ '#$1' ] }),
  
    // Border
    expression(true, 'bd\\-t\\-(\\d+)', { 'border-color': [ 'var(--bd-$1)' ] }),
    expression(true, 'bd\\-h\\-([0-9a-f]{3,6})', { 'border-color': [ '#$1' ] }),
    expression(true, 'curve\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '$1px', '$1px' ] }),
    expression(true, 'curve\\-b\\-(\\d+)', { 'border-radius': [ '0', '0', '$1px', '$1px' ] }),
    expression(true, 'curve\\-l\\-(\\d+)', { 'border-radius': [ '$1px', '0', '0', '$1px' ] }),
    expression(true, 'curve\\-r\\-(\\d+)', { 'border-radius': [ '0', '$1px', '$1px', '0' ] }),
    expression(true, 'curve\\-t\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '0', '0' ] }),
  
    // Margin
    expression(true, 'm\\-(\\-{0,1}\\d+)', { margin: [ '$1px' ] }),
    expression(true, 'mb\\-(\\-{0,1}\\d+)', { 'margin-bottom': [ '$1px' ] }),
    expression(true, 'ml\\-(\\-{0,1}\\d+)', { 'margin-left': [ '$1px' ] }),
    expression(true, 'mr\\-(\\-{0,1}\\d+)', { 'margin-right': [ '$1px' ] }),
    expression(true, 'mt\\-(\\-{0,1}\\d+)', { 'margin-top': [ '$1px' ] }),
    expression(true, 'mx\\-(\\-{0,1}\\d+)', {
      'margin-left': [ '$1px' ],
      'margin-right': [ '$1px' ]
    }),
    expression(true, 'my\\-(\\-{0,1}\\d+)', {
      'margin-top': [ '$1px' ],
      'margin-bottom': [ '$1px' ]
    }),
  
    // Padding
    expression(true, 'p\\-(\\d+)', { padding: [ '$1px' ] }),
    expression(true, 'pb\\-(\\d+)', { 'padding-bottom': [ '$1px' ] }),
    expression(true, 'pl\\-(\\d+)', { 'padding-left': [ '$1px' ] }),
    expression(true, 'pr\\-(\\d+)', { 'padding-right': [ '$1px' ] }),
    expression(true, 'pt\\-(\\d+)', { 'padding-top': [ '$1px' ] }),
    expression(true, 'px\\-(\\d+)', {
      'padding-left': [ '$1px' ],
      'padding-right': [ '$1px' ]
    }),
    expression(true, 'py\\-(\\d+)', {
      'padding-top': [ '$1px' ],
      'padding-bottom': [ '$1px' ]
    }),
  
    //Animation
    expression(true, 'transition\\-(\\d+)', { 'transition-duration': [ '$1ms' ] }),
  
    // Box Shadow
    expression(
      true, 
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-([0-9a-fA-F]{6})', 
      { 'box-shadow': [ '$1px $2px $3px $4px #$5' ] } 
    ),
    expression(
      true, 
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)', 
      { 'box-shadow': [ '$1px $2px $3px rgb($4, $5, $6, 0.$7)' ] }
    ),

    //----------------------------------------------------------------//
    // ITERATORS

    // Size
    ...percents.map(
      //h-calc-full-99, h-calc-half-99, h-calc-third-99, h-calc-fourth-99, h-calc-fifth-99
      ([ name, value ]) => expression(true, `h\\-calc\\-${name}-(\\d+)`, { 
        'height': [ `calc(${value}% - $1px)` ] 
      })
    ),
    ...percents.map(
      //w-calc-full-99, w-calc-half-99, w-calc-third-99, w-calc-fourth-99, w-calc-fifth-99
      ([ name, value ]) => expression(true, `w\\-calc\\-${name}-(\\d+)`, { 
        'width': [ `calc(${value}% - $1px)` ] 
      })
    )
  ];
};

/**
 * Returns a pre-defined list of token definitions
 */
export function definitions(): Token[] {
  return [
    ...literals(),
    ...expressions(),
    ...ranges()
  ];
};