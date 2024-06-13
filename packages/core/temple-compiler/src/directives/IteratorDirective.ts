
import type { MarkupToken, IdentifierToken, ScriptToken } from '@ossph/temple-parser';
import type { Compiler, NextDirective } from '../types';

import { DataParser } from '@ossph/temple-parser';
import CompilerException from '../CompilerException';
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
    components: Compiler[], 
    next: NextDirective
  ) {
    let expression = '';
    //syntax <each value=item key=i from=list>...</each>
    if (!token.attributes 
      || token.attributes.properties.length === 0 
    ) {
      throw CompilerException.for('Invalid each statement');
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
      throw CompilerException.for('Invalid each statement');
    } else if (key && key.value.type !== 'Identifier') {
      throw CompilerException.for('Invalid key value in each');
    } else if (value && value.value.type !== 'Identifier') {
      throw CompilerException.for('Invalid value in each');
    }
    const keyName = (key?.value as IdentifierToken)?.name || '_';
    const valueName = (value?.value as IdentifierToken)?.name || '_';
    expression += `...`;
    if (from.value.type === 'ProgramExpression') {
      const script = from.value as ScriptToken;
      expression += `Object.entries(${script.source})`;
    } else if (from.value.type === 'ArrayExpression') {
      expression += `Object.entries(${
        JSON.stringify(DataParser.array(from.value))
      })`;
    } else if (from.value.type === 'ObjectExpression') {
      expression += `Object.entries(${
        JSON.stringify(DataParser.object(from.value))
      })`;
    } else if (from.value.type === 'Identifier') {
      expression += `Object.entries(${from.value.name})`;
    } else {
      throw CompilerException.for('Invalid from value in each');
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