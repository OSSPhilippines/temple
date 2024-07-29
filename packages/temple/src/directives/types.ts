import type Component from '../component/Component';
import type { MarkupToken, MarkupChildToken } from '../component/types';

//component directives
export type NextDirective = (
  parent: MarkupToken|null,
  token: MarkupChildToken[], 
  components: Component[]
) => string;