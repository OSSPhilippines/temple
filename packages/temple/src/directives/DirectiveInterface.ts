import type Component from '../component/Component';
import type { MarkupToken } from '../component/types';
import type { NextDirective } from './types';

export default interface DirectiveInterface {
  name: string;
  markup(
    parent: MarkupToken|null, 
    token: MarkupToken, 
    components: Component[], 
    next: NextDirective
  ): string;
}