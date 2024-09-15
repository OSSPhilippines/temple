import type { FileSystem } from '@ossph/temple/compiler';
import type StyleMap from './StyleMap';
import type StyleSheet from './StyleSheet';

//valid style property value
export type Value = string|number;
//ie { 'color': ['red'] }
export type StyleRecord = Record<string, Value[]>;

export type LiteralToken = {
  type: 'literal',
  classname: string,
  styles: StyleMap,
  media: Media,
  selector: string
};

export type ExpressionToken = {
  type: 'expression',
  pattern: string,
  styles: StyleMap,
  step: number[],
  media: Media,
  pseudo?: string
};

export type RangeToken = {
  name: string,
  property: string,
  directional: boolean,
  calculable: boolean,
  negatable: boolean,
  measurable: boolean
};

export type Token = LiteralToken|RangeToken|ExpressionToken;
export type Media = 'all'|'xs'|'sm'|'md'|'lg'|'xl'|'xl2'|'xl3'|'xl4';

export type Plugin = (sheet: string, brand: string) => string;
export type Styler = (
  classnames: string[], 
  stylesheet: StyleSheet,
  cache: Set<string>
) => void;

export type ParserOptions = { fs?: FileSystem, cwd?: string };
export type UtilityPluginOptions =  { 
  stylers?: Styler[],
  files?: string[]
  contents?: Record<string, string>
};
export type ComponentPluginOptions = {
  stylers?: Styler[]
};

export type TempleUIOptions = {
  brand?: string
};