export type Platform = 'node'|'browser';

export type BuilderOptions = { 
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string
};