import type SymbolParser from './SymbolParser';

//For Lexer
export type Reader = (lexer: Parser) => Token|undefined;
export type Definition = { key: string, reader: Reader };
export type References = Record<string, any>|false;
export interface Parser {
  get dictionary(): Record<string, Definition>,
  get code(): string,
  get index(): number,
  clone(): Parser,
  define(key: string, reader: Reader, type?: string): void,
  expect<T = Token>(keys: string | string[]): T,
  find(keys: string | string[]): Token | undefined,
  get(key: string): Definition|undefined,
  load(code: string, index: number): this,
  match(start: number, keys?: string[]): Token|null,
  next(keys: string | string[]): boolean,
  optional<T = Token>(keys: string | string[]): T | undefined
}

//symbol tokens (For Symbol Parser)
export type SymbolPartial = {
  type: string,
  start: number,
  children: SymbolComplete[]
};

export type SymbolComplete = {
  type: string,
  start: number,
  end: number,
  value?: string,
  children?: SymbolComplete[]
};

export type Walker = (
  symbol: SymbolComplete, 
  instance: SymbolParser
) => void;

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

export type Scalar = string|number|null|boolean;
export type Data = Scalar|Data[]|{ [key: string]: Data };

//markup tokens (For Temple Parser)
export type ComponentToken = {
  type: 'ComponentDeclaration',
  start: number,
  end: number,
  attributes?: ObjectToken,
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

export type MarkupChildToken = MarkupToken|LiteralToken|ScriptToken;
