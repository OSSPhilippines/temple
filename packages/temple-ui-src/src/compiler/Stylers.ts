import type { 
  Media,
  RangeToken,
  Styler,
  LiteralToken, 
  ExpressionToken 
} from './types';

import Stylesheet from './StyleSheet';
import StyleParser from './StyleParser';

/**
 * Returns a literal styler
 */
export const literal = function(literals: LiteralToken[]) {
  return (classnames: string[], stylesheet: Stylesheet, cache: Set<string>) => {
    //filter out the classnames that are already defined
    const todo = classnames.filter(classname => !cache.has(classname));
    for (const token of literals) {
      //extract the responsive, selector, 
      //and style from the definition
      const { classname, styles, media, selector } = token;
      if (todo.includes(classname)) {
        stylesheet.map(media, selector, styles);
        //add to cache
        cache.add(classname);
      }
    }
  };
};

/**
 * Returns a range styler
 */
export const range = function(rules: RangeToken[]) {
  const expression = new RegExp('^' + [ 
    //media
    '(((xs)|(sm)|(md)|(lg)|(xl)|(xl2)|(xl3)|(xl4))\\-){0,1}', 
    //pseudo
    '(((before)|(after))\\-){0,1}', 
    //names
    `((${rules.map(rule => rule.name.replaceAll('-', '\\-')).join(')|(')}))`, 
    //direction
    '(b|l|r|t|x|y){0,1}\\-', 
    //calc
    '(((calc)|(full)|(half)|(third)|(fourth)|(fifth))\\-){0,1}', 
    //numbers
    '((\\d+)\\-){0,1}(\\-{0,1}\\d+)',
    //measurements
    '(p|e|r){0,1}' 
  ].join('') + '$');
  return (classnames: string[], stylesheet: Stylesheet, cache: Set<string>) => {
    //filter out the classnames that are already defined
    const todo = classnames.filter(classname => !cache.has(classname));
    for (const classname of todo) {
      const match = classname.match(expression);
      if (match) {
        //extract the necessary parts from the match
        const classname = match[0];
        const media = (match[2] || 'all') as Media;
        const pseudo = match[12];
        const rule = rules.find(rule => rule.name === match[15]);
        if (!rule) continue;
        const property = rule.property;
        const directions = match[16 + rules.length] === 'b' ? [ 'bottom' ] 
          : match[16 + rules.length] === 'l' ? [ 'left' ] 
          : match[16 + rules.length] === 'r' ? [ 'right' ] 
          : match[16 + rules.length] === 't' ? [ 'top' ] 
          : match[16 + rules.length] === 'x' ? [ 'left', 'right' ] 
          : match[16 + rules.length] === 'y' ? [ 'top', 'bottom' ] 
          : [];
        const calc = match[18 + rules.length];
        const value1 = match[26 + rules.length];
        const value2 = parseFloat(match[27 + rules.length] || 'NaN');
        if (isNaN(value2)) continue;
        const measurement = match[28 + rules.length] === 'p' ? '%' 
          : match[28 + rules.length] === 'e' ? 'em' 
          : match[28 + rules.length] === 'r' ? 'rem' 
          : rule.measurable ? 'px' : '';
        //validate directional, calculable, negatable, measurable
        if ((!rule.directional && directions.length) 
          || (!rule.calculable && calc)
          || (!rule.negatable && value2 < 0)
        ) continue;
        //format the number value
        const number = ['em', 'rem'].includes(measurement) 
          ? value2 * 0.01 : value2;
        //determine selector
        const selector = pseudo 
          ? `.${classname}::${pseudo}`
          : `.${classname}`;
        //map out all the possible properties
        const properties = directions.length 
          ? directions.map(direction => {
            if (property === 'border-width') {
              return `border-${direction}-width`;
            }
            return `${property}-${direction}`;
          }) 
          : [ property ];
        //determine the value
        const value = calc === 'full' 
          ? `calc(100% - ${number}${measurement})`
          : calc === 'half'
          ? `calc(50% - ${number}${measurement})`
          : calc === 'third'
          ? `calc(33.333333% - ${number}${measurement})`
          : calc === 'fourth'
          ? `calc(25% - ${number}${measurement})`
          : calc === 'fifth'
          ? `calc(20% - ${number}${measurement})`
          : calc === 'calc'
          ? `calc(${value1}% - ${number}${measurement})`
          : `${number}${measurement}`;
        //add styles to the stylesheet
        properties.forEach(
          property => stylesheet.add(media, selector, property, value)
        );
        //add to cache
        cache.add(classname);
      }
    }
  }
};

/**
 * Returns an expression styler
 */
export const expression = function(expressions: ExpressionToken[]) {
  return (classnames: string[], stylesheet: Stylesheet, cache: Set<string>) => {
    //filter out the classnames that are already defined
    const todo = classnames.filter(classname => !cache.has(classname));
    for (const classname of todo) {
      for (const token of expressions) {
        //extract the responsive, selector, 
        //and style from the definition
        const { media, pattern, step, pseudo } = token;
        const matches = classname.match(new RegExp(`^${pattern}$`));
        if (matches) {
          //extract the selector and arguments
          const [ classname, ...args ] = Array.from(matches);
          //replace the arguments in the style
          const styles = token.styles.clone();
          args.forEach((arg, index) => styles.replaceAll(
            '$' + (index + 1), 
            String(!isNaN(Number(arg)) 
              ? Number(arg) * (step[index] || 1)
              : arg
            )
          ));
          const selector = pseudo 
            ? `.${classname}::${pseudo}`
            : `.${classname}`;
          //add the styles to the stylesheet
          stylesheet.map(media, selector, styles);
          //add to cache
          cache.add(classname);
          break;
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
    const cache = new Set<string>();
    const stylesheet = new Stylesheet();
    const classnames = parser.parse();
    // Apply each stylist to the classname
    for (const stylist of this) {
      //the stylist should populate this._styles
      stylist(classnames, stylesheet, cache);
    }
    return stylesheet;
  }
}