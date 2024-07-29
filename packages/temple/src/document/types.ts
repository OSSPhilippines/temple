export type Platform = 'node'|'browser';

export interface TempleDocument {
  constructor(clientPath: string): void,
  props: Record<string, any>,
  style(): string,
  template(): (Node|false)[],
  render(props?: Record<string, any>): string
}

export type BuilderOptions = { 
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string
};