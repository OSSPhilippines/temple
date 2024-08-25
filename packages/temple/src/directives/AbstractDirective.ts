import type Component from '../component/Component';
import type Transpiler from '../component/Transpiler';
import type { MarkupToken, NextDirective } from '../types';

import DirectiveInterface from './DirectiveInterface';

export default abstract class AbstractDirective implements DirectiveInterface {
  //the transpiler instance
  protected _transpiler: Transpiler;

  /**
   * Returns the directive name
   */
  public abstract get name(): string;

  /**
   * Saves the transpiler instance
   */
  public constructor(transpiler: Transpiler) {
    this._transpiler = transpiler;
  }
  
  /**
   * Alters the markup when it's tag name is found
   */
  public abstract markup(
    parent: MarkupToken|null, 
    token: MarkupToken, 
    components: Component[], 
    next: NextDirective
  ): string;
}