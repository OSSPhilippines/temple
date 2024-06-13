import type { MarkupToken } from '@ossph/temple-parser';
import type { Compiler, NextDirective } from '../types';

export default interface DirectiveInterface {
  name: string;
  markup(
    parent: MarkupToken|null, 
    token: MarkupToken, 
    components: Compiler[], 
    next: NextDirective
  ): string;
}