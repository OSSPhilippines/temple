import type { MarkupToken } from '@ossph/temple-parser';
import type { Compiler, NextDirective } from '../types';
import DirectiveInterface from './DirectiveInterface';

export default abstract class AbstractDirective implements DirectiveInterface {
  //the compiler instance
  protected _compiler: Compiler;

  /**
   * Returns the directive name
   */
  public abstract get name(): string;

  /**
   * Saves the compiler instance
   */
  public constructor(compiler: Compiler) {
    this._compiler = compiler;
  }
  
  /**
   * Alters the markup when it's tag name is found
   */
  public abstract markup(
    parent: MarkupToken|null, 
    token: MarkupToken, 
    components: Compiler[], 
    next: NextDirective
  ): string;
}