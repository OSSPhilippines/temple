
import type { CompilerOptions } from './types';

import DataParser from './DataParser';
import GenericLexer from './GenericLexer';
import SymbolParser from './SymbolParser';
import TempleParser from './TempleParser';

import ComponentCompiler from './ComponentCompiler';
import TempleCompiler from './TempleCompiler';
import TempleDocument from './TempleDocument';
import FileLoader from './FileLoader';

import definitions, { 
  scalar, 
  data, 
  scan, 
  identifier 
} from './definitions';

function temple(options?: CompilerOptions) {
  return TempleCompiler.compile(options || {});
}

export type * from './types';

export {
  DataParser,
  GenericLexer,
  SymbolParser,
  TempleParser,
  FileLoader,
  ComponentCompiler,
  TempleCompiler,
  TempleDocument,
  definitions,
  scalar,
  data,
  scan,
  identifier,
  temple
};