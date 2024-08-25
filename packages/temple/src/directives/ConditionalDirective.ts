import type Component from '../component/Component';
import type { 
  MarkupToken, 
  NextDirective,
  PropertyToken, 
  ScriptToken
} from '../types';

import Exception from '../Exception';
import AbstractDirective from './AbstractDirective';

export class IfDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'if';
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
    //syntax <if true={count > 1}>...</if>
    if (!token.attributes 
      || token.attributes.properties.length === 0 
    ) {
      throw Exception.for('Invalid if statement');
    }
    const truesy = token.attributes.properties.find(
      property => property.key.name === 'true'
    );
    const falsesy = token.attributes.properties.find(
      property => property.key.name === 'false'
    );
    if (!truesy && !falsesy) {
      throw Exception.for('Invalid if statement');
    }
    let expression = '';
    // ...(!
    expression += '...(!';
    if (truesy) {
      // ...(!!
      expression += '!';
    }
    const property = (truesy || falsesy) as PropertyToken;
    if (property.value.type === 'ProgramExpression') {
      const script = property.value as ScriptToken;
      // ...(!!({count > 1}) ?
      expression += `(${script.source}) ? `;
    } else if (property.value.type === 'Literal') {
      if (typeof property.value.value === 'string') {
        // ...(!!('hello') ?
        expression += `('${property.value.value}') ? `;
      } else {
        // ...(!!(1) ?
        expression += `(${property.value.value}) ? `;
      }
    } else if (property.value.type === 'Identifier') {
      // ...(!!(count) ?
      expression += `(${property.value.name}) ? `;
    } else {
      throw Exception.for('Invalid if statement');
    }
    
    if (token.children) {
      // ...(!!(count) ? [...]
      expression += next(token, token.children, components);
    } else {
      // ...(!!(count) ? []
      expression += '[]';
    }
    // ...(!!(count) ? [] : [])
    expression += ' : [])';
    return expression;
  }
}

export class ElifDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'elif';
  }
  
  /**
   * Saves the compiler instance
   */
  public markup(
    parent: MarkupToken|null, 
    token: MarkupToken
  ) {
    let expression = '';
    //syntax <elif true={count > 1} />
    if (!parent 
      || parent.name !== 'if' 
      || !token.attributes 
      || token.attributes.properties.length === 0 
      //children will be ignored
    ) {
      throw Exception.for('Invalid elif statement');
    }
    const truesy = token.attributes.properties.find(
      property => property.key.name === 'true'
    );
    const falsesy = token.attributes.properties.find(
      property => property.key.name === 'false'
    );
    if (!truesy && !falsesy) {
      throw Exception.for('Invalid elif statement');
    }

    // ...(!!(count) ? [
    //   ...
    // ]: !
    expression += ']: !';

    if (truesy) {
      // ]: !!
      expression += '!';
    }
    const property = (truesy || falsesy) as PropertyToken;
    if (property.value.type === 'ProgramExpression') {
      const script = property.value as ScriptToken;
      // ]: !!({count > 1}) ? [
      expression += `(${script.source}) ? [ `;
    } else if (property.value.type === 'Literal') {
      if (typeof property.value.value === 'string') {
        // ]: !!('hello') ? [
        expression += `('${property.value.value}') ? [ `;
      } else {
        // ]: !!(1) ? [
        expression += `(${property.value.value}) ? [ `;
      }
    } else if (property.value.type === 'Identifier') {
      // ]: !!(count) ? [
      expression += `(${property.value.name}) ? [ `;
    } else {
      throw Exception.for('Invalid elif statement');
    }
    
    // ...(!!(count) ? [
    //   ...
    // ]: (!!(count) ? [
    //   ...
    // ]: []
    return expression;
  }
}

export class ElseDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'else';
  }
  
  /**
   * Saves the compiler instance
   */
  public markup(
    parent: MarkupToken|null, 
    token: MarkupToken
  ) {
    let expression = '';
    //syntax <else />
    if (!parent 
      || parent.name !== 'if' 
      //attributes will be ignored
      //children will be ignored
    ) {
      throw Exception.for('Invalid else statement');
    }

    // ...(!!(count) ? [
    //   ...
    // ]: true ? [
    expression += ']: true ? [';
    
    // ...(!!(count) ? [
    //   ...
    // ]: true ? [
    //   ...
    // ]: []
    return expression;
  }
}