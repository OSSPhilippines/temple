import type { 
  Media, 
  Styler,
  LiteralToken, 
  RangeToken, 
  ExpressionToken 
} from './types';

import Stylesheet from './StyleSheet';
import StyleParser from './StyleParser';
import { bna, media } from './helpers';

/**
 * Returns a literal styler
 */
export const literal = function(literals: LiteralToken[]) {
  return (classname: string, stylesheet: Stylesheet) => {
    for (const token of literals) {
      //extract the responsive, selector, 
      //and style from the definition
      const { name, styles } = token;
      if (name === classname) {
        stylesheet.map('all', `.${name}`, styles);
        //if the classname literally equals the literal name, 
        //then there is no need to check the other literals
        //because the literal name is unique.
        return;
      }
      //check before and after
      for (const position of bna) {
        const selector = `${position}-${name}`;
        if (selector === classname) {
          stylesheet.map('all', `.${selector}::${position}`, styles);
          //if the classname literally equals the selector name, 
          //then there is no need to check the other media sizes
          //because the selector name is unique.
          return;
        }
      }
      //check responsive
      for (const size of media) {
        const selector = `${size}-${name}`;
        if (selector === classname) {
          stylesheet.map(size as Media, `.${selector}`, styles);
          //if the classname literally equals the selector name, 
          //then there is no need to check the other media sizes
          //because the selector name is unique.
          return;
        }
        //check before and after
        for (const position of bna) {
          const selector = `${size}-${position}-${name}`;
          if (selector === classname) {
            stylesheet.map(size as Media, `.${selector}::${position}`, styles);
            //if the classname literally equals the selector name, 
            //then there is no need to check the other media sizes
            //because the selector name is unique.
            return;
          }
        }
      }
    }
  };
};

/**
 * Returns a range styler
 */
export const range = function(ranges: RangeToken[]) {
  const literals: LiteralToken[] = [];
  //loop through ranges and make literals
  for (const token of ranges) {
    //extract the responsive, selector, style,
    //range, and step from the definition
    const { name, styles, range, step } = token;
    const decimals = step.toString().split('.')[1]?.length || 0;
    const multiplier = Math.pow(10, decimals);
    //loop through the range
    for (let i = range[0]; i <= range[1]; i += step) {
      //determine the display number
      const number = String(Math.floor(i * multiplier));
      //determine the style value
      const value = String(Math.floor(i * multiplier) / multiplier);
      //add the literal to the literals array
      literals.push({
        type: 'literal',
        name: name.replaceAll('$', number),
        styles: styles.clone().replaceAll('$', value)
      });
    }
  }
  //return whatever literal returns
  return literal(literals);
};

/**
 * Returns an expression styler
 */
export const expression = function(expressions: ExpressionToken[]) {
  return (classname: string, stylesheet: Stylesheet) => {
    for (const token of expressions) {
      //extract the responsive, selector, 
      //and style from the definition
      const { name } = token;
      const matches = classname.match(new RegExp(`^${name}$`));
      if (matches) {
        //extract the selector and arguments
        const [ classname, ...args ] = Array.from(matches);
        //replace the arguments in the style
        const styles = token.styles.clone();
        args.forEach(
          (arg, index) => styles.replaceAll('$' + (index + 1), arg)
        );
        //add the styles to the stylesheet
        stylesheet.map('all', `.${classname}`, styles);
      //if the expression is responsive
      }
      //check before and after
      for (const position of bna) {
        const matches = classname.match(new RegExp(`^${position}\\-${name}$`));
        if (matches) {
          //extract the selector and arguments
          const [ classname, ...args ] = Array.from(matches);
          //replace the arguments in the style
          const styles = token.styles.clone();
          args.forEach(
            (arg, index) => styles.replaceAll('$' + (index + 1), arg)
          );
          //add the styles to the stylesheet
          stylesheet.map('all', `.${classname}::${position}`, styles);
        }
      }
      //check responsive
      for (const size of media) {
        const matches = classname.match(new RegExp(`^${size}\\-${name}$`));
        if (matches) {
          //extract the selector and arguments
          const [ classname, ...args ] = Array.from(matches);
          //replace the arguments in the style
          const styles = token.styles.clone();
          args.forEach(
            (arg, index) => styles.replaceAll('$' + (index + 1), arg)
          );
          //add the styles to the stylesheet
          stylesheet.map(size as Media, `.${classname}`, styles);
        }
        //check before and after
        for (const position of bna) {
          const matches = classname.match(new RegExp(`^${size}\\-${position}\\-${name}$`));
          if (matches) {
            //extract the selector and arguments
            const [ classname, ...args ] = Array.from(matches);
            //replace the arguments in the style
            const styles = token.styles.clone();
            args.forEach(
              (arg, index) => styles.replaceAll('$' + (index + 1), arg)
            );
            //add the styles to the stylesheet
            stylesheet.map(size as Media, `.${classname}::${position}`, styles);
          }
        }
      }
    }
  };
};

/**
 * Styler Registry
 */
export default class Stylers extends Set<Styler> {
  /**
   * Returns a stylesheet populated with styles.
   */
  public parse(parser: StyleParser) {
    const stylesheet = new Stylesheet();
    // Walk the parser and get each classname found
    for (const classname of parser.walk()) {
      // Apply each stylist to the classname
      for (const stylist of this) {
        //the stylist should populate this._styles
        stylist(classname, stylesheet);
      }
    }
    return stylesheet;
  }
}