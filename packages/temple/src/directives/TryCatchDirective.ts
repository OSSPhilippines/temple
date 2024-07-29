import type Component from '../component/Component';
import type { MarkupToken } from '../component/types';
import type { NextDirective } from './types';

import DirectiveException from './Exception';
import AbstractDirective from './AbstractDirective';

export class TryDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'try';
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
    //syntax <try>...</try>
    //...(() => {
    //  try {
    //    return [...]
    //  } catch (error) {
    //    return [...]
    //  }
    //})()
    
    //scan children to catch...
    if (!token.children) {
      throw DirectiveException.for('Invalid try statement');
    }

    const hasCatch = token.children.find(
      child => child.type === 'MarkupExpression' && child.name === 'catch'
    );

    if (!hasCatch) {
      throw DirectiveException.for('Invalid try statement');
    }
      
    //...(() => { try { return 
    expression += '...(() => { try { return ';
    //...(() => { try { return []
    expression += next(token, token.children, components);

    //...(() => { 
    //  try { return []; } 
    //})()
    return expression + '; } })()';
  }
}

export class CatchDirective extends AbstractDirective {
  /**
   * Returns the directive name
   */
  public get name() {
    return 'catch';
  }
  
  /**
   * Saves the compiler instance
   */
  public markup(
    parent: MarkupToken|null, 
    token: MarkupToken
  ) {
    let expression = '';
    //syntax <catch error=error />
    if (!parent || parent.name !== 'try') {
      throw DirectiveException.for('Invalid catch statement');
    }
    //determine error name
    let errorName = 'error';
    //if there are attributes
    if (token.attributes && token.attributes.properties.length > 0 ) {
      //find error attribute
      const error = token.attributes.properties.find(
        property => property.key.name === 'error'
      );
      //if error attribute is an identifier
      if (error && error.value.type === 'Identifier') {
        //set error name
        errorName = error.value.name;
      }
    }

    //]; } catch (error) { return [
    expression += `]; } catch (${errorName}) { return [`;
    
    return expression;
  }
}