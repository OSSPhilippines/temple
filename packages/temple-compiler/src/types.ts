import type fs from 'fs';
import type { SourceFile } from 'ts-morph';
import type {
  ImportToken,
  ComponentToken,
  ScriptToken,
  StyleToken,
  MarkupToken
} from '@ossph/temple-parser';

//this is what is returned by the Temple parser
export type AST = {
  imports: ImportToken[];
  components: ComponentToken[];
  scripts: ScriptToken[];
  styles: StyleToken[];
  markup: MarkupToken[];
}

//for the constructor
export type CompilerOptions = { 
  fs?: typeof fs,
  cwd?: string,
  brand?: string,
  register?: boolean,
  buildFolder?: string,
  tsconfig?: string,
  registerChildren?: boolean
};

//this was parsed by the ts compiler
//then we simplify it to the following
export type ImportChunk = {
  id: string;
  typeOnly: boolean;
  names: string[] | undefined;
  default: string;
  source: string;
};

//this is what we pass to the code generator
export type GeneratedChunks = {
  name: {
    tag: string,
    component: string
  },
  path: {
    source: string,
    absolute: string
  },
  components: ComponentChunks[],
  imports: ImportChunk[],
  scripts: string[],
  styles: string[],
  template: string
};

//this is what the generator needs from each component
export type ComponentChunks = {
  id: string,
  name: {
    tag: string,
    component: string
  },
  path: {
    source: string,
    absolute: string
  },
  source: SourceFile
};

//this is a map of all the components used
//to check if we already generated it
export type ComponentRegistry = Record<string, ComponentChunks>;

export type ManifestDocument = {
  styles: string,
  scripts: string,
  head: string,
  body: string
};

export type ManifestApp = {
  styles: string,
  scripts: string,
  markup: string
};