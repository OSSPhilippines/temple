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
    literal('align-center', { 'align-items': [ 'center' ] }),
    literal('align-left', { 'align-items': [ 'flex-start' ] }),
    literal('align-right', { 'align-items': [ 'flex-end' ] }),
    literal('align-baseline', { 'align-items': [ 'baseline' ] }),

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
    literal('wm-auto', { 'max-width': [ 'auto' ] }),
    literal('wm-xs', { 'max-width': [ '360px' ] }),
    literal('wm-sm', { 'max-width': [ '420px' ] }),
    literal('wm-md', { 'max-width': [ '767px' ] }),
    literal('wm-lg', { 'max-width': [ '992px' ] }),
    literal('wm-xl', { 'max-width': [ '1024px' ] }),
    literal('wm-full', { 'max-width': [ '100%' ] }),

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
    literal('tx-inherit', { 'font-family': [ 'inherit' ] }),
    literal('tx-underline', { 'text-decoration': [ 'underline' ] }),
    literal('tx-lowercase', { 'text-transform': [ 'lowercase' ] }),
    literal('tx-uppercase', { 'text-transform': [ 'uppercase' ] }),
    literal('tx-word-wrap', { 'word-wrap': [ 'break-word' ] }),
    literal('tx-nowrap', { 'white-space': [ 'nowrap' ] }),
    literal('tx-prewrap', { 'white-space': [ 'pre-wrap' ] }),
    literal('tx-nodecor', { 'text-decoration': [ 'none' ] }),
    literal('tx-top', { 'vertical-align': [ 'top' ] }),
    literal('tx-middle', { 'vertical-align': [ 'middle' ] }),
    literal('tx-bottom', { 'vertical-align': [ 'bottom' ] }),

    // Border
    literal('bd-solid', { 'border-style': [ 'solid' ] }),
    literal('bd-dashed', { 'border-style': [ 'dashed' ] }),
    literal('bd-dotted', { 'border-style': [ 'dotted' ] }),
    literal('bd-collapse', { 'border-collapse': [ 'collapse' ] }),
    literal('bd-transparent', { 'border-color': [ 'transparent' ] }),
    literal('bdb-transparent', { 'border-bottom-color': [ 'transparent' ] }),
    literal('bdl-transparent', { 'border-left-color': [ 'transparent' ] }),
    literal('bdr-transparent', { 'border-right-color': [ 'transparent' ] }),
    literal('bdt-transparent', { 'border-top-color': [ 'transparent' ] }),
    literal('bdx-transparent', { 
      'border-left-color': [ 'transparent' ],
      'border-right-color': [ 'transparent' ] 
    }),
    literal('bdy-transparent', { 
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
    literal('curve-full', { 'border-radius': [ '10000px' ] }),
    literal('curve-l-full', { 'border-radius': [ '10000px', '0', '0', '10000px' ] }),
    literal('curve-r-full', { 'border-radius': [ '0', '10000px', '10000px', '0' ] }),
    literal('curve-t-full', { 'border-radius': [ '10000px', '10000px', '0', '0' ] }),
    literal('curve-b-full', { 'border-radius': [ '0', '0', '10000px', '10000px' ] }),

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
      //bda-primary, bda-secondary, bda-black, bda-white, 
      //bda-info, bda-error, bda-warning, bda-success, bda-muted
      color => literal(`bda-${color}`, { 'border': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdb-primary, bdb-secondary, bdb-black, bdb-white, 
      //bdb-info, bdb-error, bdb-warning, bdb-success, bdb-muted
      color => literal(`bdb-${color}`, { 'border-bottom': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdl-primary, bdl-secondary, bdl-black, bdl-white, bdl-info, 
      //bdl-error, bdl-warning, bdl-success, bdl-muted
      color => literal(`bdl-${color}`, { 'border-left': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdr-primary, bdr-secondary, bdr-black, bdr-white, 
      //bdr-info, bdr-error, bdr-warning, bdr-success, bdr-muted
      color => literal(`bdr-${color}`, { 'border-right': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdt-primary, bdt-secondary, bdt-black, bdt-white, 
      //bdt-info, bdt-error, bdt-warning, bdt-success, bdt-muted
      color => literal(`bdt-${color}`, { 'border-top': [ '1px', 'solid', `var(--${color})` ] })
    ),
    ...colors.map(
      //bdx-primary, bdx-secondary, bdx-black, bdx-white, 
      //bdx-info, bdx-error, bdx-warning, bdx-success, bdx-muted
      color => literal(`bdx-${color}`, { 
        'border-left': [ '1px', 'solid', `var(--${color})` ],
        'border-right': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //bdy-primary, bdy-secondary, bdy-black, bdy-white, 
      //bdy-info, bdy-error, bdy-warning, bdy-success, bdy-muted
      color => literal(`bdy-${color}`, { 
        'border-bottom': [ '1px', 'solid', `var(--${color})` ],
        'border-top': [ '1px', 'solid', `var(--${color})` ]
      })
    ),
    ...colors.map(
      //bd-primary, bd-secondary, bd-black, bd-white, 
      //bd-info, bd-error, bd-warning, bd-success, bd-muted
      color => literal(`bd-${color}`, { 
        'border-color': [ `var(--${color})`, '!important' ] 
      })
    ),
    ...sizes.map(//bd-xs, bd-sm, bd-md, bd-lg, bd-xl
      (size, i) => literal(`bd-${size}`, { 
        'border-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdt-xs, bdt-sm, bdt-md, bdt-lg, bdt-xl
      (size, i) => literal(`bdt-${size}`, { 
        'border-top-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdb-xs, bdb-sm, bdb-md, bdb-lg, bdb-xl
      (size, i) => literal(`bdb-${size}`, { 
        'border-bottom-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdl-xs, bdl-sm, bdl-md, bdl-lg, bdl-xl
      (size, i) => literal(`bdl-${size}`, { 
        'border-left-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdr-xs, bdr-sm, bdr-md, bdr-lg, bdr-xl
      (size, i) => literal(`bdr-${size}`, { 
        'border-right-width': [ `${i + 1}px` ] 
      })
    ),
    ...sizes.map(//bdx-xs, bdx-sm, bdx-md, bdx-lg, bdx-xl
      (size, i) => literal(`bdx-${size}`, { 
        'border-left-width': [ `${i + 1}px` ],
        'border-right-width': [ `${i + 1}px` ]
      })
    ),
    ...sizes.map(//bdy-xs, bdy-sm, bdy-md, bdy-lg, bdy-xl
      (size, i) => literal(`bdy-${size}`, { 
        'border-top-width': [ `${i + 1}px` ],
        'border-bottom-width': [ `${i + 1}px` ]
      })
    ),
    ...xsizes.map(
      //curve-xs, curve-sm, curve-md, curve-lg, curve-xl, 
      //curve-2xl, curve-3xl, curve-4xl, curve-5xl
      (size, i) => literal(`curve-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //curve-l-xs, curve-l-sm, curve-l-md, curve-l-lg, curve-l-xl,
      //curve-l-2xl, curve-l-3xl, curve-l-4xl, curve-l-5xl
      (size, i) => literal(`curve-l-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, '0', '0', `${(i + 1) * 2}px` ] 
      })
    ),
    ...xsizes.map(
      //curve-r-xs, curve-r-sm, curve-r-md, curve-r-lg, curve-r-xl, 
      //curve-r-2xl, curve-r-3xl, curve-r-4xl, curve-r-5xl
      (size, i) => literal(`curve-r-${size}`, { 
        'border-radius': [ '0', `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0' ] 
      })
    ),
    ...xsizes.map(
      //curve-t-xs, curve-t-sm, curve-t-md, curve-t-lg, curve-t-xl, 
      //curve-t-2xl, curve-t-3xl, curve-t-4xl, curve-t-5xl
      (size, i) => literal(`curve-t-${size}`, { 
        'border-radius': [ `${(i + 1) * 2}px`, `${(i + 1) * 2}px`, '0', '0' ] 
      })
    ),
    ...xsizes.map(
      //curve-b-xs, curve-b-sm, curve-b-md, curve-b-lg, curve-b-xl 
      //curve-b-2xl, curve-b-3xl, curve-b-4xl, curve-b-5xl
      (size, i) => literal(`curve-b-${size}`, { 
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
    range('o-$', { opacity: [ '$' ] }, 0, 1, 0.01),
    // Border
    range('bd-$', { 'border-width': [ '$px' ] }, 0, 20),
    range('bdb-$', { 'border-bottom-width': [ '$px' ] }, 0, 20),
    range('bdl-$', { 'border-left-width': [ '$px' ] }, 0, 20),
    range('bdr-$', { 'border-right-width': [ '$px' ] }, 0, 20),
    range('bdt-$', { 'border-top-width': [ '$px' ] }, 0, 20),
    range('bdx-$', {
      'border-left-width': [ '$px' ],
      'border-right-width': [ '$px' ]
    }, 0, 20),
    range('bdy-$', {
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
    expression('bottom\\-(\\-{0,1}\\d+)', { bottom: [ '$1px' ] }),
    expression('left\\-(\\-{0,1}\\d+)', { left: [ '$1px' ] }),
    expression('right\\-(\\-{0,1}\\d+)', { right: [ '$1px' ] }),
    expression('top\\-(\\-{0,1}\\d+)', { top: [ '$1px' ] }),
    expression('z\\-(\\d+)', { 'z-index': [ '$1' ] }),
    
    // Flex
    expression('basis\\-(\\d+)', { 'flex-basis': [ '$1px' ] }),
    expression('basis\\-p\\-(\\d+)', { 'flex-basis': [ '$1%' ] }),
    expression('gap\\-(\\d+)', { 'gap': [ '$1px' ] }),
  
    // Size
    expression('h\\-(\\d+)', { height: [ '$1px' ] }),
    expression('h\\-calc\\-(\\d+)-(\\d+)', { height: [ 'calc($1% - $2px)' ] }),
    expression('w\\-(\\d+)', { width: [ '$1px' ] }),
    expression('wp\\-(\\d+)', { width: [ '$1%' ] }),
    expression('w\\-calc\\-(\\d+)-(\\d+)', { width: [ 'calc($1% - $2px)' ] }),
    expression('wm\\-(\\d+)', { 'max-width': [ '$1px' ] }),
    
    // Background
    expression('bg\\-t\\-(\\d+)', { 'background-color': [ 'var(--bg-$1)' ] }),
    expression('bg\\-h\\-([0-9a-f]{3,6})', { 'background-color': [ '#$1' ] }),
  
    // Text
    expression('tx\\-(\\d+)', { 'font-size': [ '$1px' ] }),
    expression('tx\\-lh\\-(\\d+)', { 'line-height': [ '$1px' ] }),
    expression('tx\\-t\\-(\\d+)', { 'color': [ 'var(--tx-$1)' ] }),
    expression('tx\\-h\\-([0-9a-f]{3,6})', { 'color': [ '#$1' ] }),
  
    // Border
    expression('bd\\-t\\-(\\d+)', { 'border-color': [ 'var(--bd-$1)' ] }),
    expression('bd\\-h\\-([0-9a-f]{3,6})', { 'border-color': [ '#$1' ] }),
    expression('curve\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '$1px', '$1px' ] }),
    expression('curve\\-b\\-(\\d+)', { 'border-radius': [ '0', '0', '$1px', '$1px' ] }),
    expression('curve\\-l\\-(\\d+)', { 'border-radius': [ '$1px', '0', '0', '$1px' ] }),
    expression('curve\\-r\\-(\\d+)', { 'border-radius': [ '0', '$1px', '$1px', '0' ] }),
    expression('curve\\-t\\-(\\d+)', { 'border-radius': [ '$1px', '$1px', '0', '0' ] }),
  
    // Margin
    expression('m\\-(\\-{0,1}\\d+)', { margin: [ '$1px' ] }),
    expression('mb\\-(\\-{0,1}\\d+)', { 'margin-bottom': [ '$1px' ] }),
    expression('ml\\-(\\-{0,1}\\d+)', { 'margin-left': [ '$1px' ] }),
    expression('mr\\-(\\-{0,1}\\d+)', { 'margin-right': [ '$1px' ] }),
    expression('mt\\-(\\-{0,1}\\d+)', { 'margin-top': [ '$1px' ] }),
    expression('mx\\-(\\-{0,1}\\d+)', {
      'margin-left': [ '$1px' ],
      'margin-right': [ '$1px' ]
    }),
    expression('my\\-(\\-{0,1}\\d+)', {
      'margin-top': [ '$1px' ],
      'margin-bottom': [ '$1px' ]
    }),
  
    // Padding
    expression('p\\-(\\d+)', { padding: [ '$1px' ] }),
    expression('pb\\-(\\d+)', { 'padding-bottom': [ '$1px' ] }),
    expression('pl\\-(\\d+)', { 'padding-left': [ '$1px' ] }),
    expression('pr\\-(\\d+)', { 'padding-right': [ '$1px' ] }),
    expression('pt\\-(\\d+)', { 'padding-top': [ '$1px' ] }),
    expression('px\\-(\\d+)', {
      'padding-left': [ '$1px' ],
      'padding-right': [ '$1px' ]
    }),
    expression('py\\-(\\d+)', {
      'padding-top': [ '$1px' ],
      'padding-bottom': [ '$1px' ]
    }),
  
    //Animation
    expression('transition\\-(\\d+)', { 'transition-duration': [ '$1ms' ] }),
  
    // Box Shadow
    expression(
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-([0-9a-fA-F]{6})', 
      { 'box-shadow': [ '$1px $2px $3px $4px #$5' ] } 
    ),
    expression(
      'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)', 
      { 'box-shadow': [ '$1px $2px $3px rgb($4, $5, $6, 0.$7)' ] }
    ),

    //----------------------------------------------------------------//
    // ITERATORS

    // Size
    ...percents.map(
      //h-calc-full-99, h-calc-half-99, h-calc-third-99, h-calc-fourth-99, h-calc-fifth-99
      ([ name, value ]) => expression(`h\\-calc\\-${name}-(\\d+)`, { 
        'height': [ `calc(${value}% - $1px)` ] 
      })
    ),
    ...percents.map(
      //w-calc-full-99, w-calc-half-99, w-calc-third-99, w-calc-fourth-99, w-calc-fifth-99
      ([ name, value ]) => expression(`w\\-calc\\-${name}-(\\d+)`, { 
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