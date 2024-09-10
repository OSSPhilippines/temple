import type { FileSystem } from '@ossph/temple/compiler';
import type StyleMap from './StyleMap';
import type StyleSheet from './StyleSheet';

//valid style property value
export type Value = string|number;
//ie { 'color': ['red'] }
export type StyleRecord = Record<string, Value[]>;

export type LiteralToken = {
  type: 'literal',
  responsive: boolean,
  //class name
  name: string,
  styles: StyleMap
};

export type RangeToken = {
  type: 'range',
  responsive: boolean,
  //class name
  name: string,
  styles: StyleMap,
  range: [ number, number ],
  step: number
};

export type ExpressionToken = {
  type: 'expression',
  responsive: boolean,
  //class name
  name: string,
  styles: StyleMap
};

export type Token = LiteralToken|RangeToken|ExpressionToken;
export type Media = 'all'|'xs'|'sm'|'md'|'lg'|'xl'|'xl2'|'xl3'|'xl4';

export type Styler = (classname: string, stylesheet: StyleSheet) => void;
export type Plugin = (sheet: string, brand: string) => string;

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