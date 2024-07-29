import type fs from 'fs';
import type { ComponentToken } from './component/types';

export type TempleOptions = { 
  fs?: typeof fs,
  cwd?: string,
  brand?: string,
  name?: string,
  token?: ComponentToken,
  type?: 'document'|'component'|'template'
  build?: string,
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string
};