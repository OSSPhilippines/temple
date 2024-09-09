import type { Value, Range, Regex } from './types';
import { value, range, regex } from './helpers';

const utilities: (Value|Range|Regex)[] = [
  // Fonts
  value(false, 'arial', 'font-family: Arial, sans-serif;'),
  value(false, 'courier', "font-family: 'Courier New', Courier, monospace;"),
  value(false, 'georgia', 'font-family: Georgia, serif;'),
  value(false, 'verdana', 'font-family: Verdana, sans-serif;'),
  
  // Display
  value(true, 'none', 'display: none;'),
  value(true, 'block', 'display: block;'),
  value(true, 'flex', 'display: flex;'),
  value(true, 'inline', 'display: inline;'),
  value(true, 'inline-block', 'display: inline-block;'),
  value(true, 'transparent', 'opacity: 0;'),
  value(true, 'hidden', 'visibility: hidden;'),
  range(true, 'o-$', 'opacity: $;', 0, 1, 0.01),

  // Position
  value(true, 'relative', 'position: relative;'),
  value(true, 'absolute', 'position: absolute;'),
  value(true, 'fixed', 'position: fixed;'),
  value(true, 'sticky', 'position: sticky;'),
  value(true, 'static', 'position: static;'),

  regex(true, 'bottom\\-(\\-{0,1}\\d+)', 'bottom: $1px;'),
  regex(true, 'left\\-(\\-{0,1}\\d+)', 'left: $1px;'),
  regex(true, 'right\\-(\\-{0,1}\\d+)', 'right: $1px;'),
  regex(true, 'top\\-(\\-{0,1}\\d+)', 'top: $1px;'),

  regex(true, 'z\\-(\\d+)', 'z-index: $1;'),

  // Float
  value(true, 'float-left', 'float: left;'),
  value(true, 'float-right', 'float: right;'),
  value(true, 'float-none', 'float: none;'),

  // Flex
  value(true, 'flex-row', 'flex-direction: row;'),
  value(true, 'flex-col', 'flex-direction: column;'),
  value(true, 'flex-grow', 'flex-grow: 1;'),
  value(true, 'flex-shrink', 'flex-shrink: 1;'),
  value(true, 'flex-center', 'align-items: center; justify-content: center;'),
  value(true, 'flex-center-x', 'justify-content: center;'),
  value(true, 'flex-center-y', 'align-items: center;'),
  value(true, 'flex-wrap', 'flex-wrap: wrap;'),
  value(true, 'flex-nowrap', 'flex-wrap: nowrap;'),

  value(true, 'justify-center', 'justify-content: center;'),
  value(true, 'justify-left', 'justify-content: flex-start;'),
  value(true, 'justify-right', 'justify-content: flex-end;'),
  value(true, 'justify-between', 'justify-content: space-between;'),
  value(true, 'justify-around', 'justify-content: space-around;'),
  value(true, 'justify-evenly', 'justify-content: space-evenly;'),

  value(true, 'align-center', 'align-items: center;'),
  value(true, 'align-left', 'align-items: flex-start;'),
  value(true, 'align-right', 'align-items: flex-end;'),
  value(true, 'align-baseline', 'align-items: baseline;'),
  
  value(true, 'basis-full', 'flex-basis: 100%;'),
  value(true, 'basis-half', 'flex-basis: 50%;'),
  value(true, 'basis-third', 'flex-basis: 33.33%;'),
  value(true, 'basis-fourth', 'flex-basis: 25%;'),
  value(true, 'basis-fifth', 'flex-basis: 20%;'),
  regex(true, 'basis\\-(\\d+)', 'flex-basis: $1px;'),
  regex(true, 'basis\\-p\\-(\\d+)', 'flex-basis: $1%;'),

  regex(true, 'gap\\-(\\d+)', 'gap: $1px;'),

  // Overflow
  value(true, 'scroll', 'overflow: scroll;'),
  value(true, 'scroll-auto', 'overflow: auto;'),
  value(true, 'scroll-hidden', 'overflow: hidden;'),

  value(true, 'scroll-x', 'overflow-x: scroll;'),
  value(true, 'scroll-x-auto', 'overflow-x: auto;'),
  value(true, 'scroll-x-hidden', 'overflow-x: hidden;'),

  value(true, 'scroll-y', 'overflow-y: scroll;'),
  value(true, 'scroll-y-auto', 'overflow-y: auto;'),
  value(true, 'scroll-y-hidden', 'overflow-y: hidden;'),
  
  // Size
  value(true, 'h-auto', 'height: auto;'),
  value(true, 'h-full', 'height: 100%;'),
  regex(true, 'h\\-(\\d+)', 'height: $1px;'),
  regex(true, 'h\\-calc\\-full-(\\d+)', 'height: calc(100% - $1px);'),
  regex(true, 'h\\-calc\\-half-(\\d+)', 'height: calc(50% - $1px);'),
  regex(true, 'h\\-calc\\-third-(\\d+)', 'height: calc(33.33% - $1px);'),
  regex(true, 'h\\-calc\\-fourth-(\\d+)', 'height: calc(25% - $1px);'),
  regex(true, 'h\\-calc\\-fifth-(\\d+)', 'height: calc(20% - $1px);'),
  regex(true, 'h\\-calc\\-(\\d+)-(\\d+)', 'height: calc($1% - $2px);'),

  value(true, 'vh', 'height: 100vh;'),
  value(true, 'vw', 'width: 100vw;'),

  value(true, 'w-auto', 'width: auto;'),
  value(true, 'w-full', 'width: 100%;'),
  value(true, 'w-half', 'width: 50%;'),
  value(true, 'w-third', 'width: 33.33%;'),
  value(true, 'w-fourth', 'width: 25%;'),
  value(true, 'w-fifth', 'width: 20%;'),
  regex(true, 'w\\-(\\d+)', 'width: $1px;'),
  regex(true, 'wp\\-(\\d+)', 'width: $1%;'),
  regex(true, 'w\\-calc\\-full-(\\d+)', 'width: calc(100% - $1px);'),
  regex(true, 'w\\-calc\\-half-(\\d+)', 'width: calc(50% - $1px);'),
  regex(true, 'w\\-calc\\-third-(\\d+)', 'width: calc(33.33% - $1px);'),
  regex(true, 'w\\-calc\\-fourth-(\\d+)', 'width: calc(25% - $1px);'),
  regex(true, 'w\\-calc\\-fifth-(\\d+)', 'width: calc(20% - $1px);'),
  regex(true, 'w\\-calc\\-(\\d+)-(\\d+)', 'width: calc($1% - $2px);'),
  
  value(true, 'wm-auto', 'max-width: auto;'),
  value(true, 'wm-xs', 'max-width: 360px;'),
  value(true, 'wm-sm', 'max-width: 420px;'),
  value(true, 'wm-md', 'max-width: 767px;'),
  value(true, 'wm-lg', 'max-width: 992px;'),
  value(true, 'wm-xl', 'max-width: 1024px;'),
  value(true, 'wm-full', 'max-width: 100%;'),
  regex(true, 'wm\\-(\\d+)', 'max-width: $1px;'),
  
  // Background
  value(false, 'bg-primary', 'background-color: var(--primary) !important;'),
  value(false, 'bg-secondary', 'background-color: var(--secondary) !important;'),
  value(false, 'bg-black', 'background-color: var(--black) !important;'),
  value(false, 'bg-white', 'background-color: var(--white) !important;'),
  value(false, 'bg-info', 'background-color: var(--info) !important;'),
  value(false, 'bg-error', 'background-color: var(--error) !important;'),
  value(false, 'bg-warning', 'background-color: var(--warning) !important;'),
  value(false, 'bg-success', 'background-color: var(--success) !important;'),
  value(false, 'bg-muted', 'background-color: var(--muted) !important;'),
  regex(true, 'bg\\-t\\-(\\d+)', 'background-color: var(--bg-$1) !important;'),
  regex(true, 'bg\\-h\\-([0-9a-f]{3,6})', 'background-color: #$1;'),

  value(false, 'bg-cover', 'background-size: cover;'),
  value(false, 'bg-contain', 'background-size: contain;'),
  value(false, 'bg-repeat', 'background-repeat: repeat;'),
  value(false, 'bg-repeat-x', 'background-repeat: repeat-x;'),
  value(false, 'bg-repeat-y', 'background-repeat: repeat-y;'),
  value(false, 'bg-norepeat', 'background-repeat: no-repeat;'),
  value(false, 'bg-fixed', 'background-attachment: fixed;'),

  value(false, 'bg-bottom', 'background-position: bottom;'),
  value(false, 'bg-center', 'background-position: center;'),
  value(false, 'bg-left', 'background-position: left;'),
  value(false, 'bg-right', 'background-position: right;'),
  value(false, 'bg-top', 'background-position: top;'),

  // Text
  regex(true, 'tx\\-(\\d+)', 'font-size: $1px;'),
  value(true, 'tx-2xs', 'font-size: 8px;'),
  value(true, 'tx-xs', 'font-size: 10px;'),
  value(true, 'tx-sm', 'font-size: 12px;'),
  value(true, 'tx-md', 'font-size: 14px;'),
  value(true, 'tx-lg', 'font-size: 16px;'),
  value(true, 'tx-xl', 'font-size: 18px;'),
  value(true, 'tx-2xl', 'font-size: 20px;'),
  value(true, 'tx-3xl', 'font-size: 22px;'),
  value(true, 'tx-4xl', 'font-size: 24px;'),
  value(true, 'tx-5xl', 'font-size: 26px;'),
  value(true, 'tx-6xl', 'font-size: 28px;'),
  value(true, 'tx-7xl', 'font-size: 30px;'),

  value(true, 'tx-center', 'text-align: center;'),
  value(true, 'tx-left', 'text-align: left;'),
  value(true, 'tx-right', 'text-align: right;'),
  value(true, 'tx-bold', 'font-weight: bold;'),
  value(true, 'tx-normal', 'font-weight: normal;'),
  value(true, 'tx-italic', 'font-style: italic;'),
  value(true, 'tx-underline', 'text-decoration: underline;'),
  value(true, 'tx-lowercase', 'text-transform: lowercase;'),
  value(true, 'tx-uppercase', 'text-transform: uppercase;'),
  value(true, 'tx-word-wrap', 'word-wrap: break-word;'),
  value(true, 'tx-nowrap', 'white-space: nowrap;'),
  value(true, 'tx-prewrap', 'white-space: pre-wrap;'),
  value(true, 'tx-nodecor', 'text-decoration: none;'),

  value(true, 'tx-top', 'vertical-align: top;'),
  value(true, 'tx-middle', 'vertical-align: middle;'),
  value(true, 'tx-bottom', 'vertical-align: bottom;'),
  
  regex(true, 'tx\\-lh\\-(\\d+)', 'line-height: $1px;'),

  value(false, 'tx-primary', 'color: var(--primary) !important;'),
  value(false, 'tx-secondary', 'color: var(--secondary) !important;'),
  value(false, 'tx-black', 'color: var(--black) !important;'),
  value(false, 'tx-white', 'color: var(--white) !important;'),
  value(false, 'tx-info', 'color: var(--info) !important;'),
  value(false, 'tx-error', 'color: var(--error) !important;'),
  value(false, 'tx-warning', 'color: var(--warning) !important;'),
  value(false, 'tx-success', 'color: var(--success) !important;'),
  value(false, 'tx-muted', 'color: var(--muted) !important;'),
  regex(true, 'tx\\-t\\-(\\d+)', 'color: var(--tx-$1) !important;'),
  regex(true, 'tx\\-h\\-([0-9a-f]{3,6})', 'color: #$1;'),

  // Border
  value(false, 'bd', 'border: 1px solid var(--black);'),
  value(false, 'bdb', 'border-bottom: 1px solid var(--black);'),
  value(false, 'bdl', 'border-left: 1px solid var(--black);'),
  value(false, 'bdr', 'border-right: 1px solid var(--black);'),
  value(false, 'bdt', 'border-top: 1px solid var(--black);'),
  value(false, 'bdx', [
    'border-left: 1px solid var(--black);', 
    'border-right: 1px solid var(--black);'
  ].join(' ')),
  value(false, 'bdy', [
    'border-bottom: 1px solid var(--black);', 
    'border-top: 1px solid var(--black);'
  ].join(' ')),

  value(false, 'bd-solid', 'border-style: solid;'),
  value(false, 'bd-dashed', 'border-style: dashed;'),
  value(false, 'bd-dotted', 'border-style: dotted;'),
  value(false, 'bd-collapse', 'border-collapse: collapse;'),

  value(false, 'bd-primary', 'border-color: var(--primary) !important;'),
  value(false, 'bd-secondary', 'border-color: var(--secondary) !important;'),
  value(false, 'bd-black', 'border-color: var(--black) !important;'),
  value(false, 'bd-white', 'border-color: var(--white) !important;'),
  value(false, 'bd-info', 'border-color: var(--info) !important;'),
  value(false, 'bd-error', 'border-color: var(--error) !important;'),
  value(false, 'bd-warning', 'border-color: var(--warning) !important;'),
  value(false, 'bd-success', 'border-color: var(--success) !important;'),
  value(false, 'bd-muted', 'border-color: var(--muted) !important;'),
  regex(true, 'bd\\-t\\-(\\d+)', 'border-color: var(--bd-$1) !important;'),
  regex(true, 'bd\\-h\\-([0-9a-f]{3,6})', 'border-color: #$1;'),

  value(false, 'bd-xs', 'border-width: 1px;'),
  value(false, 'bd-sm', 'border-width: 2px;'),
  value(false, 'bd-md', 'border-width: 3px;'),
  value(false, 'bd-lg', 'border-width: 4px;'),
  value(false, 'bd-xl', 'border-width: 5px;'),

  value(false, 'bdx-xs', [
    'border-left-width: 1px;', 
    'border-right-width: 1px;'
  ].join(' ')),
  value(false, 'bdx-sm', [
    'border-left-width: 2px;', 
    'border-right-width: 2px;'
  ].join(' ')),
  value(false, 'bdx-md', [
    'border-left-width: 3px;', 
    'border-right-width: 3px;'
  ].join(' ')),
  value(false, 'bdx-lg', [
    'border-left-width: 4px;', 
    'border-right-width: 4px;'
  ].join(' ')),
  value(false, 'bdx-xl', [
    'border-left-width: 5px;', 
    'border-right-width: 5px;'
  ].join(' ')),

  value(false, 'bdy-xs', [
    'border-top-width: 1px;', 
    'border-bottom-width: 1px;'
  ].join(' ')),
  value(false, 'bdy-sm', [
    'border-top-width: 2px;', 
    'border-bottom-width: 2px;'
  ].join(' ')),
  value(false, 'bdy-md', [
    'border-top-width: 3px;', 
    'border-bottom-width: 3px;'
  ].join(' ')),
  value(false, 'bdy-lg', [
    'border-top-width: 4px;', 
    'border-bottom-width: 4px;'
  ].join(' ')),
  value(false, 'bdy-xl', [
    'border-top-width: 5px;', 
    'border-bottom-width: 5px;'
  ].join(' ')),

  value(false, 'bdt-xs', 'border-top-width: 1px;'),
  value(false, 'bdt-sm', 'border-top-width: 2px;'),
  value(false, 'bdt-md', 'border-top-width: 3px;'),
  value(false, 'bdt-lg', 'border-top-width: 4px;'),
  value(false, 'bdt-xl', 'border-top-width: 5px;'),

  value(false, 'bdb-xs', 'border-bottom-width: 1px;'),
  value(false, 'bdb-sm', 'border-bottom-width: 2px;'),
  value(false, 'bdb-md', 'border-bottom-width: 3px;'),
  value(false, 'bdb-lg', 'border-bottom-width: 4px;'),
  value(false, 'bdb-xl', 'border-bottom-width: 5px;'),

  value(false, 'bdl-xs', 'border-left-width: 1px;'),
  value(false, 'bdl-sm', 'border-left-width: 2px;'),
  value(false, 'bdl-md', 'border-left-width: 3px;'),
  value(false, 'bdl-lg', 'border-left-width: 4px;'),
  value(false, 'bdl-xl', 'border-left-width: 5px;'),

  value(false, 'bdr-xs', 'border-right-width: 1px;'),
  value(false, 'bdr-sm', 'border-right-width: 2px;'),
  value(false, 'bdr-md', 'border-right-width: 3px;'),
  value(false, 'bdr-lg', 'border-right-width: 4px;'),
  value(false, 'bdr-xl', 'border-right-width: 5px;'),

  range(true, 'bd-$', 'border-width: $px;', 0, 20),
  range(true, 'bdb-$', 'border-bottom-width: $px;', 0, 20),
  range(true, 'bdl-$', 'border-left-width: $px;', 0, 20),
  range(true, 'bdr-$', 'border-right-width: $px;', 0, 20),
  range(true, 'bdt-$', 'border-top-width: $px;', 0, 20),
  range(true, 'bdx-$', [
    'border-left-width: $px;', 
    'border-right-width: $px;'
  ].join(' '), 0, 20),

  range(true, 'bdy-$', [
    'border-top-width: $px;', 
    'border-bottom-width: $px;'
  ].join(' '), 0, 20),

  value(true, 'curved', 'border-radius: 4px;'),
  value(true, 'curved-l', 'border-radius: 4px 0 0 4px;'),
  value(true, 'curved-r', 'border-radius: 0 4px 4px 0;'),
  value(true, 'curved-t', 'border-radius: 4px 4px 0 0;'),
  value(true, 'curved-b', 'border-radius: 0 0 4px 4px;'),
  value(true, 'rounded', 'border-radius: 12px;'),
  value(true, 'rounded-l', 'border-radius: 12px 0 0 12px;'),
  value(true, 'rounded-r', 'border-radius: 0 12px 12px 0;'),
  value(true, 'rounded-t', 'border-radius: 12px 12px 0 0;'),
  value(true, 'rounded-b', 'border-radius: 0 0 12px 12px;'),
  value(true, 'pill', 'border-radius: 10000px;'),
  value(true, 'pill-l', 'border-radius: 10000px 0 0 10000px;'),
  value(true, 'pill-r', 'border-radius: 0 10000px 10000px 0;'),
  value(true, 'pill-t', 'border-radius: 10000px 10000px 0 0;'),
  value(true, 'pill-b', 'border-radius: 0 0 10000px 10000px;'),

  value(true, 'curve-xs', 'border-radius: 2px;'),
  value(true, 'curve-sm', 'border-radius: 4px;'),
  value(true, 'curve-md', 'border-radius: 6px;'),
  value(true, 'curve-lg', 'border-radius: 8px;'),
  value(true, 'curve-xl', 'border-radius: 12px;'),
  value(true, 'curve-full', 'border-radius: 10000px;'),

  value(true, 'curve-l-xs', 'border-radius: 2px 0 0 2px;'),
  value(true, 'curve-l-sm', 'border-radius: 4px 0 0 4px;'),
  value(true, 'curve-l-md', 'border-radius: 6px 0 0 6px;'),
  value(true, 'curve-l-lg', 'border-radius: 8px 0 0 8px;'),
  value(true, 'curve-l-xl', 'border-radius: 12px 0 0 12px;'),
  value(true, 'curve-l-full', 'border-radius: 10000px 0 0 10000px;'),

  value(true, 'curve-r-xs', 'border-radius: 0 2px 2px 0;'),
  value(true, 'curve-r-sm', 'border-radius: 0 4px 4px 0;'),
  value(true, 'curve-r-md', 'border-radius: 0 6px 6px 0;'),
  value(true, 'curve-r-lg', 'border-radius: 0 8px 8px 0;'),
  value(true, 'curve-r-xl', 'border-radius: 0 12px 12px 0;'),
  value(true, 'curve-r-full', 'border-radius: 0 10000px 10000px 0;'),

  value(true, 'curve-t-xs', 'border-radius: 2px 2px 0 0;'),
  value(true, 'curve-t-sm', 'border-radius: 4px 4px 0 0;'),
  value(true, 'curve-t-md', 'border-radius: 6px 6px 0 0;'),
  value(true, 'curve-t-lg', 'border-radius: 8px 8px 0 0;'),
  value(true, 'curve-t-xl', 'border-radius: 12px 12px 0 0;'),
  value(true, 'curve-t-full', 'border-radius: 10000px 10000px 0 0;'),

  value(true, 'curve-b-xs', 'border-radius: 0 0 2px 2px;'),
  value(true, 'curve-b-sm', 'border-radius: 0 0 4px 4px;'),
  value(true, 'curve-b-md', 'border-radius: 0 0 6px 6px;'),
  value(true, 'curve-b-lg', 'border-radius: 0 0 8px 8px;'),
  value(true, 'curve-b-xl', 'border-radius: 0 0 12px 12px;'),
  value(true, 'curve-b-full', 'border-radius: 0 0 10000px 10000px;'),

  regex(true, 'curve\\-(\\d+)', 'border-radius: $1px $1px $1px $1px;'),
  regex(true, 'curve\\-b\\-(\\d+)', 'border-radius: 0 0 $1px $1px;'),
  regex(true, 'curve\\-l\\-(\\d+)', 'border-radius: $1px 0 0 $1px;'),
  regex(true, 'curve\\-r\\-(\\d+)', 'border-radius: 0 $1px $1px 0;'),
  regex(true, 'curve\\-t\\-(\\d+)', 'border-radius: $1px $1px 0 0;'),

  // Margin
  value(true, 'm-auto', 'margin: auto;'),
  value(true, 'mx-auto', [
    'margin-left: auto;', 
    'margin-right: auto;'
  ].join(' ')),
  regex(true, 'm\\-(\\-{0,1}\\d+)', 'margin: $1px;'),
  regex(true, 'mb\\-(\\-{0,1}\\d+)', 'margin-bottom: $1px;'),
  regex(true, 'ml\\-(\\-{0,1}\\d+)', 'margin-left: $1px;'),
  regex(true, 'mr\\-(\\-{0,1}\\d+)', 'margin-right: $1px;'),
  regex(true, 'mt\\-(\\-{0,1}\\d+)', 'margin-top: $1px;'),
  regex(true, 'mx\\-(\\-{0,1}\\d+)', [
    'margin-left: $1px;', 
    'margin-right: $1px;'
  ].join(' ')),
  regex(true, 'my\\-(\\-{0,1}\\d+)', [
    'margin-top: $1px;', 
    'margin-bottom: $1px;'
  ].join(' ')),

  // Padding
  regex(true, 'p\\-(\\d+)', 'padding: $1px;'),
  regex(true, 'pb\\-(\\d+)', 'padding-bottom: $1px;'),
  regex(true, 'pl\\-(\\d+)', 'padding-left: $1px;'),
  regex(true, 'pr\\-(\\d+)', 'padding-right: $1px;'),
  regex(true, 'pt\\-(\\d+)', 'padding-top: $1px;'),
  regex(true, 'px\\-(\\d+)', [
    'padding-left: $1px;', 
    'padding-right: $1px;'
  ].join(' ')),
  regex(true, 'py\\-(\\d+)', [
    'padding-top: $1px;', 
    'padding-bottom: $1px;'
  ].join(' ')),

  // List
  value(true, 'list-none', 'list-style: none;'),
  value(true, 'list-disc', 'list-style: disc;'),
  value(true, 'list-decimal', 'list-style: decimal;'),

  // Select
  value(true, 'select-none', 'user-select: none;'),
  value(true, 'select-text', 'user-select: text;'),
  value(true, 'select-all', 'user-select: all;'),
  value(true, 'select-auto', 'user-select: auto;'),

  //Cursor
  value(true, 'cursor-pointer', 'cursor: pointer;'),
  value(true, 'cursor-default', 'cursor: default;'),
  value(true, 'cursor-move', 'cursor: move;'),
  value(true, 'cursor-not-allowed', 'cursor: not-allowed;'),
  value(true, 'cursor-help', 'cursor: help;'),
  value(true, 'cursor-text', 'cursor: text;'),
  value(true, 'cursor-auto', 'cursor: auto;'),
  value(true, 'cursor-wait', 'cursor: wait;'),
  value(true, 'cursor-crosshair', 'cursor: crosshair;'),

  //Animation
  regex(true, 'transition\\-(\\d+)', 'transition: $1ms;'),

  // Box Shadow
  regex(
    true, 
    'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-([0-9a-fA-F]{6})', 
    'box-shadow: $1px $2px $3px $4px #$5;'
  ),
  regex(
    true, 
    'shadow\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)\\-(\\d+)', 
    'box-shadow: $1px $2px $3px rgb($4, $5, $6, 0.$7);'
  )
];

export default utilities;