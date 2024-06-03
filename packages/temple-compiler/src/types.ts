import type fs from 'fs';
import type { SourceFile } from 'ts-morph';
import type { Node } from '@ossph/temple-server'
import type {
  ImportToken,
  ComponentToken,
  ScriptToken,
  StyleToken,
  MarkupToken,
  MarkupChildToken
} from '@ossph/temple-parser';

export interface Compiler {
  /**
   * Returns abstract syntax tree
   */
  get ast(): AST;
  
  /**
   * Gets the absolute source file
   */
  get absolute(): string;

  /**
   * Returns the source file basename
   */
  get basename(): string;

  /**
   * Gets the brand prefix
   */
  get brand(): string;

  /**
   * Returns the absolute path of the build folder
   */
  get build(): string;

  /**
   * Returns the class name (based on the basename)
   */
  get classname(): string;

  /**
   * Returns the compiled components directly 
   * imported by the main source file
   */
  get components(): Compiler[];

  /**
   * Returns the source file contents
   */
  get contents(): string;

  /**
   * Gets the current working directory
   */
  get cwd(): string;

  /**
   * Gets the file system
   */
  get fs(): typeof fs;

  /**
   * Returns the unique id of the source file
   */
  get id(): string;

  /**
   * Returns the tml imports information
   */
  get imports(): ImportChunk[];

  /**
   * Returns the compiled body script to put in template() 
   */
  get markup(): string;

  /**
   * Gets the parent working directory
   */
  get pwd(): string;

  /**
   * Returns true if the component is registered
   */
  get register(): boolean;

  /**
   * Returns the compiled scripts
   */
  get scripts(): string[];

  /**
   * Gets the source file
   */
  get sourceFile(): string;

  /**
   * Returns the compiled source code
   */
  get sourceCode(): SourceFile;

  /**
   * Returns the compiled styles
   */
  get styles(): string[];

  /**
   * Returns the tag name
   */
  get tagname(): string;

  /**
   * Returns the location of the tsconfig file
   */
  get tsconfig(): string|undefined;

  /**
   * Returns the location of the tsconfig file
   */
  get type(): 'document'|'component'|'template';
}

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
  build?: string,
  tsconfig?: string,
  cache?: boolean,
  minify?: boolean,
  bundle?: boolean,
  name?: string,
  type?: 'document'|'component'|'template'
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

//this is a map of all the components used
//to check if we already generated it
export type ComponentRegistry = Record<string, Compiler>;

export interface TempleDocument {
  props: Record<string, any>,
  style(): string,
  template(): (Node|false)[],
  render(scripts?: string, props?: Record<string, any>): string
}

//directives
export type NextDirective = (
  parent: MarkupToken|null,
  token: MarkupChildToken[], 
  components: Compiler[]
) => string;