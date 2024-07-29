import type Component from '../component/Component';
import type { 
  MarkupToken, 
  IdentifierToken, 
  ScriptToken,
} from '../component/types';
import type { NextDirective } from './types';

import Parser from '../component/Parser';
import DirectiveException from './Exception';
import AbstractDirective from './AbstractDirective';

export default class IteratorDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'each';
  }
  
  /**
   * Saves the compiler instance
   */
  public markup(
    parent: MarkupToken|null, 
    token: MarkupToken, 
    components: Component[], 
    next: NextDirective
  ) {
    let expression = '';
    //syntax <each value=item key=i from=list>...</each>
    if (!token.attributes 
      || token.attributes.properties.length === 0 
    ) {
      throw DirectiveException.for('Invalid each statement');
    }
    const key = token.attributes.properties.find(
      property => property.key.name === 'key'
    );
    const value = token.attributes.properties.find(
      property => property.key.name === 'value'
    );
    const from = token.attributes.properties.find(
      property => property.key.name === 'from'
    );
    if (!from || (!key && !value)) {
      throw DirectiveException.for('Invalid each statement');
    } else if (key && key.value.type !== 'Identifier') {
      throw DirectiveException.for('Invalid key value in each');
    } else if (value && value.value.type !== 'Identifier') {
      throw DirectiveException.for('Invalid value in each');
    }
    const keyName = (key?.value as IdentifierToken)?.name || '_';
    const valueName = (value?.value as IdentifierToken)?.name || '_';
    expression += `...`;
    if (from.value.type === 'ProgramExpression') {
      const script = from.value as ScriptToken;
      expression += `Object.entries(${script.source})`;
    } else if (from.value.type === 'ArrayExpression') {
      expression += `Object.entries(${
        JSON.stringify(Parser.array(from.value))
      })`;
    } else if (from.value.type === 'ObjectExpression') {
      expression += `Object.entries(${
        JSON.stringify(Parser.object(from.value))
      })`;
    } else if (from.value.type === 'Identifier') {
      expression += `Object.entries(${from.value.name})`;
    } else {
      throw DirectiveException.for('Invalid from value in each');
    }
    expression += `.map(([${keyName}, ${valueName}]) => `;
    if (token.children) {
      expression += next(token, token.children, components);
    } else {
      expression += '[]';
    }
    expression += ').flat()';
    return expression;
  }
}