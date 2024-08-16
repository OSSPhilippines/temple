import type FSInterface from './filesystem/FSInterface';

export type TempleOptions = { 
  fs?: FSInterface,
  cwd?: string,
  brand?: string,
  name?: string,
  type?: 'document'|'component'|'template'
  build?: string,
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string
};