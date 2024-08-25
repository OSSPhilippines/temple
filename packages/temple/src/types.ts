import type http from 'http';
import type { PluginBuild } from 'esbuild';
import type EventEmitter from '@blanquera/types/dist/EventEmitter';

import type FileSystem from './filesystem/FileSystem';
import type DocumentBuilder from './document/Builder';
import type DocumentManifest from './document/Manifest';
import type Component from './component/Component';
import type ComponentLexer from './component/Lexer';
import type ServerDocument from './server/TempleDocument';
import type ServerText from './server/TempleText';
import type ServerElement from './server/TempleElement';
import type ClientDocument from './client/TempleRegistry';
import type ClientComponent from './client/TempleComponent';

//--------------------------------------------------------------------//
// Generic Types

export type Hash = Record<string, any>;
export type Scalar = string|number|null|boolean;
export type Data = Scalar|Data[]|{ [key: string]: Data };

//standard http request and response types
export type Request = http.IncomingMessage;
export type Response = http.ServerResponse<Request> & {
  req: Request;
};

//--------------------------------------------------------------------//
// Filesystem Types

export type FileStat = { isFile(): boolean };
export type FileRecursiveOption = { recursive?: boolean };
export type FileStream = { pipe: (res: Response) => void };

//--------------------------------------------------------------------//
// Lexer/Tokenizer Types

//For Lexer
export type TokenReader = (lexer: ComponentLexer) => Token|undefined;
export type TokenDefinition = { key: string, reader: TokenReader };
export type TokenReferences = Record<string, any>|false;

//generic tokens
export type Token = {
  type: string,
  start: number,
  end: number,
  name?: string,
  value?: any,
  raw?: string
};

//data tokens
export type IdentifierToken = {
  type: 'Identifier';
  name: string;
  start: number;
  end: number;
};

export type ObjectToken = {
  type: 'ObjectExpression';
  start: number;
  end: number;
  properties: PropertyToken[];
};

export type PropertyToken = {
  type: 'Property';
  kind: 'init';
  start: number;
  end: number;
  key: IdentifierToken;
  value: DataToken;
  spread: boolean;
  method: boolean;
  shorthand: boolean;
  computed: boolean;
};

export type ArrayToken = {
  type: 'ArrayExpression';
  start: number;
  end: number;
  elements: DataToken[];
};

export type LiteralToken = {
  type: 'Literal';
  start: number;
  end: number;
  value: any;
  raw: string;
};

export type DataToken = IdentifierToken
  | LiteralToken
  | ObjectToken
  | ArrayToken
  | ScriptToken;

//markup tokens (For Temple Parser)
export type ComponentToken = {
  type: 'ComponentDeclaration',
  start: number,
  end: number,
  attributes: ObjectToken,
  source: LiteralToken
};

export type ImportToken = {
  type: 'ImportDeclaration',
  start: number,
  end: number,
  typeOnly: boolean,
  names?: LiteralToken[],
  default?: LiteralToken,
  source: LiteralToken
};

export type ScriptToken = {
  type: 'ProgramExpression',
  start: number,
  end: number,
  inline: boolean,
  attributes?: ObjectToken,
  imports?: ImportToken[],
  source: string,
  exports?: LiteralToken[]
};

export type StyleToken = {
  type: 'StyleExpression',
  start: number,
  end: number,
  attributes?: ObjectToken,
  source: string
};

export type MarkupToken = {
  type: 'MarkupExpression',
  name: string,
  kind: 'inline' | 'block',
  start: number,
  end: number
  attributes?: ObjectToken,
  children?: MarkupChildToken[]
};

export type UnknownMarkupToken = {
  type: string,
  name?: string,
  kind?: string,
  start: number,
  end: number,
  attributes?: ObjectToken,
  children?: MarkupChildToken[],
  source?: string|LiteralToken,
  value?: any
  raw?: string
}

export type MarkupChildToken = MarkupToken|LiteralToken|ScriptToken|StyleToken;

//this is what is returned by the Temple parser
export type AST = {
  imports: ImportToken[];
  components: ComponentToken[];
  scripts: ScriptToken[];
  styles: StyleToken[];
  markup: MarkupToken[];
}

//--------------------------------------------------------------------//
// Component Class Types

export type ComponentType = 'document' | 'component' | 'template';

//component directives
export type NextDirective = (
  parent: MarkupToken|null,
  token: MarkupChildToken[], 
  components: Component[]
) => string;

//--------------------------------------------------------------------//
// Builder Class Types

export type BuildPlatform = 'node'|'browser';

export type ServerDocumentClass = {
  new(build: string, mode?: 'inline'|'include'): ServerDocument
};

//what's returned by builder.build()
export type BuildResults = {
  source: {
    client: string,
    server: string
  },
  TempleDocument: ServerDocumentClass,
  document: ServerDocument
};

//--------------------------------------------------------------------//
// Server Types

export type Node = ServerElement|ServerText;

//--------------------------------------------------------------------//
// Client Types

export type TempleComponentClass = {
  component: [ string, string ],
  new (): ClientComponent
};

export type RegistryIterator<T = any> = (
  temple: ClientDocument,
  element: Element
) => T;

//ie. (e) => {}
export type TempleBrowserEvent<T = undefined> = Event & {
  detail?: T;
};
//for signals
export type SignalObserver = {
  observed: number,
  values: { raw: any }[]
};
//for signals
export type SignalProps<T = any> = {
  raw: T,
  getter(callback: () => any): SignalProps,
  setter(callback: (value: any) => any): SignalProps,
  value: T
};

//--------------------------------------------------------------------//
// Constructor Options

export type FileOptions = {
  cwd?: string,
  fs?: FileSystem
};

//options for esbuild plugin
export type AliasPluginOptions = FileOptions;
//options for esbuild plugin
export type ComponentPluginOptions = FileOptions & {
  brand?: string,
  tsconfig?: string,
  extname?: string
};
//options for esbuild plugin
export type DocumentPluginOptions = ComponentPluginOptions;

//options for the component class
export type ComponentOptions = FileOptions & {
  brand?: string,
  name?: string,
  type?: ComponentType
};

//options for builder class
export type BuilderOptions = { 
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string,
  buildRoute?: string,
  emitter?: EventEmitter<any[]>
  component_extname?: string,
  document_extname?: string
};

//options for static Builder.build()
export type BuilderBuildOptions = {
  cache?: string,
  minify?: boolean,
  bundle?: boolean,
  platform?: BuildPlatform,
  globalName?: string,
  plugins?: {
    name: string,
    setup: (build: PluginBuild) => void
  }[]
};

//options for Manifest class
export type ManifestOptions = ComponentOptions & BuilderOptions;

//options for temple() function
export type TempleOptions = ManifestOptions & {
  buildPath?: string
};

//--------------------------------------------------------------------//
// Compiler Types

export type TempleCompiler = {
  options: TempleOptions & {
    cwd: string,
    fs: FileSystem,
    type: ComponentType
  },
  serve: () => (req: Request, res: Response) => Promise<boolean>
  emitter: EventEmitter<any[]>,
  manifest: DocumentManifest,
  builder: (sourceFile: string) => DocumentBuilder,
  import: (sourceFile: string) => Promise<BuildResults>
};