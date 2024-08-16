
import type { TempleOptions } from './types';
export type * from './component/types';
export type * from './document/types';
export type * from './types';

import AbstractDirective from './directives/AbstractDirective';
import { 
  IfDirective, 
  ElifDirective, 
  ElseDirective 
} from './directives/ConditionalDirective';
import DirectiveInterface from './directives/DirectiveInterface';
import IteratorDirective from './directives/IteratorDirective';
import { 
  TryDirective, 
  CatchDirective 
} from './directives/TryCatchDirective';

import Component from './component/Component';
import ComponentException from './component/Exception';
import DirectiveException from './directives/Exception';
import Lexer from './component/Lexer';
import Parser from './component/Parser';
import Tokenizer from './component/Tokenizer';
import ComponentTranspiler from './component/Transpiler';

import definitions, { 
  scalar, 
  data, 
  scan, 
  identifier 
} from './component/definitions';

import {
  camelize,
  capitalize,
  lowerlize,
  slugify,
  serialize,
  toJS,
  toTS,
  load
} from './component/helpers';

import DocumentTranspiler from './document/Transpiler';
import DocumentBuilder, { 
  aliasPlugin as aliasESBuildPlugin, 
  tmlPlugin as tmlESBuildPlugin, 
  docPlugin as docESBuildPlugin
} from './document/Builder';
import FileLoader from './filesystem/FileLoader';

export {
  AbstractDirective,
  IfDirective, 
  ElifDirective, 
  ElseDirective,
  DirectiveInterface,
  IteratorDirective,
  TryDirective, 
  CatchDirective,
  Component,
  ComponentException,
  ComponentTranspiler,
  DirectiveException,
  DocumentBuilder,
  DocumentTranspiler,
  FileLoader,
  Lexer,
  Parser,
  Tokenizer,
  definitions,
  scalar,
  data,
  scan,
  identifier,
  camelize,
  capitalize,
  lowerlize,
  slugify,
  serialize,
  toJS,
  toTS,
  load,
  aliasESBuildPlugin,
  tmlESBuildPlugin, 
  docESBuildPlugin
};

/**
 * Returns a server version of TempleComponent 
 * and a default render function
 * 
 * For Interface:
 * - temple(..options...).import(file).TempleDocument
 * - temple(..options...).import(file).source.server
 * - temple(..options...).import(file).source.client
 * - temple(..options...).import(file).document.render(props)
 * - temple(..options...).builder(file)
 */
export default function temple(options: TempleOptions = {}) {
  return {
    builder(sourceFile: string) {
      //make a new document
      const document = new Component(sourceFile, options);
      //return builder
      return new DocumentBuilder(document, options);
    },
    async import(sourceFile: string) {
      //get bundler
      const builder = this.builder(sourceFile);
      //get the { source, TempleDocument, document }
      return await builder.build();
    }
  };
};