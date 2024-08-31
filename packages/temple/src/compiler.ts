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

import Component from './compiler/Component';
import Lexer from './compiler/Lexer';
import Parser from './compiler/Parser';
import Tokenizer from './compiler/Tokenizer';
import ComponentTranspiler from './compiler/Transpiler';

import definitions, { 
  scalar, 
  data, 
  scan, 
  identifier 
} from './compiler/definitions';

import {
  camelize,
  capitalize,
  lowerlize,
  slugify,
  serialize,
  toJS,
  toTS,
  load,
  build
} from './helpers';

import DocumentBuilder from './document/Builder';
import DocumentManifest from './document/Manifest';
import DocumentTranspiler from './document/Transpiler';
import { 
  esAliasPlugin, 
  esComponentPlugin, 
  esDocumentPlugin,
  esWorkspacePlugin
} from './plugins';
import FileSystem from './filesystem/FileSystem';
import FileLoader from './filesystem/FileLoader';
import NodeFS from './filesystem/NodeFS';

import EventEmitter, { Event as TempleEvent } from './EventEmitter';
import Exception from './Exception';
import withCache from './cache';
import temple from './temple';

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
  ComponentTranspiler,
  DocumentBuilder,
  DocumentManifest,
  DocumentTranspiler,
  EventEmitter,
  FileSystem,
  FileLoader,
  NodeFS,
  Lexer,
  Parser,
  Tokenizer,
  Exception,
  TempleEvent,
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
  build,
  esAliasPlugin, 
  esComponentPlugin, 
  esDocumentPlugin,
  esWorkspacePlugin,
  withCache
};

export default temple;