import type { Value, Range, Regex, Stylesheet } from './types';

import fs from 'fs';
import path from 'path';

export const extname = '.css';
export const vfs = new Map<string, string>(); 
export const media = {
  xs: 360,
  sm: 420,
  md: 767,
  lg: 992,
  xl: 1024,
  xl2: 1280,
  xl3: 1536,
  xl4: 1920
};

export function value(
  responsive: boolean, 
  selector: string, 
  style: string
): Value {
  return { 
    type: 'static', 
    responsive, 
    selector, 
    style 
  };
};

export function range(
  responsive: boolean, 
  selector: string, 
  style: string, 
  min: number, 
  max: number,
  step = 1
): Range {
  return {
    type: 'range',
    responsive,
    selector,
    style,
    range: [ min, max ],
    step
  };
};

export function regex(
  responsive: boolean, 
  selector: string, 
  style: string
): Regex {
  return { 
    type: 'regexp', 
    responsive, 
    selector, 
    style 
  };
};

export function getStyle(group: string, directive: string) {
  //ex. node_modules/@ossph/temple-ui/styles/block/alert.css
  const file = path.join(__dirname, group, directive + extname);
  //if the file is not registered
  if (!vfs.has(file)) {
    //register the file either way
    vfs.set(file, fs.existsSync(file) 
      ? fs.readFileSync(file, 'utf-8')
      : ''
    );
  }
  //return the cached content
  return vfs.get(file) as string;
};

export function addStaticStyles(
  definition: Value, 
  quotes: string[], 
  stylesheet: Stylesheet = {}
) {
  //extract the responsive, selector, 
  //and style from the definition
  const { responsive, selector, style } = definition;
  addStyle(selector, style, quotes, 'all', stylesheet);
  if (responsive) {
    addMediaStyles(selector, style, quotes, stylesheet);
  }
  return stylesheet;
}

export function addRegExpStyles(
  definition: Regex, 
  quotes: string[], 
  stylesheet: Stylesheet = {}
) {
  //extract the responsive, selector, 
  //and style from the definition
  const { responsive, selector, style } = definition;
  const query = new RegExp(selector);
  addStyle(query, style, quotes, 'all', stylesheet);
  if (responsive) {
    for (const [ key, size ] of Object.entries(media)) {
      addStyle(
        new RegExp(`^${key}\\-${selector}$`), 
        style, 
        quotes, 
        `${size}px`, 
        stylesheet
      );
    }
  }
  return stylesheet;
}

export function addRangeStyles(
  definition: Range, 
  quotes: string[], 
  stylesheet: Stylesheet = {}
) {
  //extract the responsive, selector, style,
  //range, and step from the definition
  const { responsive, selector, style, range, step } = definition;
  const decimals = step.toString().split('.')[1]?.length || 0;
  const multiplier = Math.pow(10, decimals);
  //loop through the range
  for (let i = range[0]; i <= range[1]; i += step) {
    const number = String(Math.floor(i * multiplier));
    const value = String(Math.floor(i * multiplier) / multiplier);
    const select = selector.replaceAll('$', number);
    const styles = style.replaceAll('$', value);
    addStyle(select, styles, quotes, 'all', stylesheet);
    if (responsive) {
      addMediaStyles(select, styles, quotes, stylesheet);
    }
  }
  return stylesheet;
}

export function addMediaStyles(
  selector: string, 
  style: string,
  quotes: string[], 
  stylesheet: Stylesheet = {}
) {
  for (const [ key, size ] of Object.entries(media)) {
    addStyle(
      `${key}-${selector}`, 
      style, 
      quotes, 
      `${size}px`, 
      stylesheet
    );
  }
  return stylesheet;
}

export function addStyle(
  selector: string|RegExp, 
  style: string,
  quotes: string[], 
  media = 'all',
  stylesheet: Stylesheet = {}
) {
  if (typeof selector === 'string' && quotes.includes(selector)) {
    //if the media is not in the stylesheet
    if (!stylesheet[media]) {
      //add the media to the stylesheet
      stylesheet[media] = [];
    }
    //add the styles to the media
    stylesheet[media].push(`.${selector} { ${style} }`);
  } else if (selector instanceof RegExp) {
    for (const quote of quotes) {
      const matches = quote.match(selector);
      if (matches) {
        //extract the selector and arguments
        const [ selector, ...args ] = Array.from(matches);
        //replace the arguments in the style
        const styles = style.replace(/\$([0-9]+)/g, match => {
          const index = Number(match.substring(1));
          return args[index - 1];
        });
        //if the media is not in the stylesheet
        if (!stylesheet[media]) {
          //add the media to the stylesheet
          stylesheet[media] = [];
        }
        //add the styles to the media
        stylesheet[media].push(`.${selector} { ${styles} }`);
        //don't break because selectors can have multiple quotes
        //ex. p-10 p-20 p-30... If we break, we will only get p-10
      }
    }
  }

  return stylesheet;
}

export function getMatches(content: string) {
  const matches = content.match(/[a-z]+\-{0,2}([a-z0-9]+\-{0,2})*/g);
  return matches ? Array.from(new Set(matches)) : [];
}