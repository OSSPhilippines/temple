import type http from 'http';
import type EventEmitter from './EventEmitter';
import type { Event as TempleEvent } from './EventEmitter';
import type { PluginBuild } from 'esbuild';

import type FileSystem from './filesystem/FileSystem';
import type DocumentBuilder from './document/Builder';
import type DocumentManifest from './document/Manifest';
import type Component from './compiler/Component';
import type ComponentLexer from './compiler/Lexer';
import type ServerDocument from './server/TempleDocument';
import type ServerText from './server/TempleText';
import type ServerElement from './server/TempleElement';
import type ClientDocument from './client/TempleRegistry';
import type ClientComponent from './client/TempleComponent';
import type ClientElement from './client/TempleElement';

//--------------------------------------------------------------------//
// Generic Types

export type Hash = Record<string, any>;
export type Scalar = string|number|null|boolean;
export type Data = Scalar|Data[]|{ [key: string]: Data };

//a generic class constructor 
export type Constructor<T> = { new (): T };

//standard http request and response types
export type Request = http.IncomingMessage;
export type Response = http.ServerResponse<Request> & {
  req: Request;
};

//--------------------------------------------------------------------//
// Event Types

//render
//rendered
//build
//built
//build-client
//built-client
//build-markup
//built-markup
//build-server
//built-server
//build-styles
//built-styles
//manifest-load
//manifest-resolve
//manifest-resolved
//manifest-unresolved

//dev-file-changed
//dev-update-document
//dev-update-component

export type TempleEventMap = Record<string, [ TempleEvent<any> ]>;

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
  escape: boolean;
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
  exports?: LiteralToken[],
  runtime: boolean 
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

export type ComponentType = 'document'|'component'|'template'|'external';

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
  new(): ServerDocument
};

//what's returned by builder.build()
export type BuildResults = {
  source: string,
  TempleDocument: ServerDocumentClass,
  document: ServerDocument
};

//--------------------------------------------------------------------//
// Server Types

export type ServerNode = ServerElement|ServerText;

//--------------------------------------------------------------------//
// Client Types

export type AnyChild = ClientElement|Node|string|undefined;

export type TempleComponentClass = Constructor<ClientComponent> &{
  component: [ string, string ],
  registered: string|null,
  observedAttributes?: string[],
  register(): void
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
  change(callback: (value: T) => void): SignalProps<T>,
  getter(callback: () => T): SignalProps<T>,
  setter(callback: (value: any) => T): SignalProps<T>,
  value: T
};

//--------------------------------------------------------------------//
// Client Event Types

type ModifierKey =
  | 'Alt'
  | 'AltGraph'
  | 'CapsLock'
  | 'Control'
  | 'Fn'
  | 'FnLock'
  | 'Hyper'
  | 'Hyper'
  | 'NumLock'
  | 'ScrollLock'
  | 'Shift'
  | 'Super'
  | 'Symbol'
  | 'SymbolLock';

interface StyleMedia {};
interface AbstractView {
  styleMedia: StyleMedia;
  document: Document;
};
type NativeAnimationEvent = AnimationEvent;
type NativeClipboardEvent = ClipboardEvent;
type NativeCompositionEvent = CompositionEvent;
type NativeDragEvent = DragEvent;
type NativeFocusEvent = FocusEvent;
type NativeKeyboardEvent = KeyboardEvent;
type NativeMouseEvent = MouseEvent;
type NativeTouchEvent = TouchEvent;
type NativePointerEvent = PointerEvent;
type NativeTransitionEvent = TransitionEvent;
type NativeUIEvent = UIEvent;
type NativeWheelEvent = WheelEvent;

interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
};

interface UIEvent<
  T = Element, 
  E = NativeUIEvent
> extends SyntheticEvent<T, E> {
  detail: number;
  view: AbstractView;
};

export interface SyntheticEvent<
  T = Element, 
  E = Event
> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {};

export interface ClipboardEvent<
  T = Element
> extends SyntheticEvent<T, NativeClipboardEvent> {
  clipboardData: DataTransfer;
};

export interface CompositionEvent<
  T = Element
> extends SyntheticEvent<T, NativeCompositionEvent> {
  data: string;
};

export interface DragEvent<
  T = Element
> extends MouseEvent<T, NativeDragEvent> {
  dataTransfer: DataTransfer;
};

export interface PointerEvent<
  T = Element
> extends MouseEvent<T, NativePointerEvent> {
  pointerId: number;
  pressure: number;
  tangentialPressure: number;
  tiltX: number;
  tiltY: number;
  twist: number;
  width: number;
  height: number;
  pointerType: "mouse" | "pen" | "touch";
  isPrimary: boolean;
};

export interface FocusEvent<
  Target = Element, 
  RelatedTarget = Element
> extends SyntheticEvent<Target, NativeFocusEvent> {
  relatedTarget: (EventTarget & RelatedTarget) | null;
  target: EventTarget & Target;
};

export interface FormEvent<
  T = Element
> extends SyntheticEvent<T> {};

export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
};

export interface KeyboardEvent<
  T = Element
> extends UIEvent<T, NativeKeyboardEvent> {
  altKey: boolean;
  /** @deprecated */
  charCode: number;
  ctrlKey: boolean;
  code: string;
  //See DOM Level 3 Events spec 
  //https://www.w3.org/TR/uievents-key/#keys-modifier. for a 
  //list of valid (case-sensitive) arguments to this method.
  getModifierState(key: ModifierKey): boolean;
  //See the DOM Level 3 Events spec 
  //https://www.w3.org/TR/uievents-key/#named-key-attribute-values. 
  //for possible values
  key: string;
  //@deprecated
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  //@deprecated
  which: number;
};

export interface MouseEvent<
  T = Element, 
  E = NativeMouseEvent
> extends UIEvent<T, E> {
  altKey: boolean;
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  //See DOM Level 3 Events spec 
  //https://www.w3.org/TR/uievents-key/#keys-modifier. for a 
  //list of valid (case-sensitive) arguments to this method.
  getModifierState(key: ModifierKey): boolean;
  metaKey: boolean;
  movementX: number;
  movementY: number;
  pageX: number;
  pageY: number;
  relatedTarget: EventTarget | null;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
};

export interface TouchEvent<
  T = Element
> extends UIEvent<T, NativeTouchEvent> {
  altKey: boolean;
  changedTouches: TouchList;
  ctrlKey: boolean;
  //See DOM Level 3 Events spec 
  //https://www.w3.org/TR/uievents-key/#keys-modifier). for a 
  //list of valid (case-sensitive) arguments to this method.   
  getModifierState(key: ModifierKey): boolean;
  metaKey: boolean;
  shiftKey: boolean;
  targetTouches: TouchList;
  touches: TouchList;
};

export interface WheelEvent<
  T = Element
> extends MouseEvent<T, NativeWheelEvent> {
  deltaMode: number;
  deltaX: number;
  deltaY: number;
  deltaZ: number;
};

export interface AnimationEvent<
  T = Element
> extends SyntheticEvent<T, NativeAnimationEvent> {
  animationName: string;
  elapsedTime: number;
  pseudoElement: string;
};

export interface TransitionEvent<
  T = Element
> extends SyntheticEvent<T, NativeTransitionEvent> {
  elapsedTime: number;
  propertyName: string;
  pseudoElement: string;
};

export type AttributeChangeEvent = CustomEvent<{ 
  action: string, 
  name: string, 
  value: any, 
  target: ClientComponent 
}>;

export type CustomEventListener<T> = (e: CustomEvent<T>) => void;

//valid style property value
export type StyleValue = string|number;
export type MediaSize = 'all'|'xs'|'sm'|'md'|'lg'|'xl'|'xl2'|'xl3'|'xl4';

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

export type TemplePluginOptions = FileOptions & {
  bindings?: string,
  brand?: string,
  mode?: 'client'|'server',
  tsconfig?: string,
  component_extname?: string,
  document_extname?: string
};

//options for the component class
export type ComponentOptions = FileOptions & {
  name?: string,
  brand?: string,
  type?: ComponentType
};

//options for builder class
export type BuilderOptions = { 
  minify?: boolean,
  tsconfig?: string,
  emitter?: EventEmitter
  component_extname?: string,
  document_extname?: string
};

//options for static Builder.build()
export type BuildOptions = {
  cache?: string,
  minify?: boolean,
  bundle?: boolean,
  platform?: BuildPlatform,
  globalName?: string,
  format?: 'iife'|'esm'|'cjs',
  plugins?: {
    name: string,
    setup: (build: PluginBuild) => void
  }[]
};

//options for Manifest class
export type ManifestOptions = ComponentOptions & BuilderOptions;

//options for temple() function
export type TempleOptions = ManifestOptions;

export type CacheOptions = {
  buildPath: string,
  manifestFile?: string,
  environment?: string
};

//--------------------------------------------------------------------//
// Compiler Types

export type AssetType = 'text/html'|'text/javascript'|'text/css'|'text/plain';

export type TempleCompiler = {
  config: TempleOptions & {
    cwd: string,
    fs: FileSystem,
    type: ComponentType
  },
  fs: FileSystem
  emitter: EventEmitter,
  manifest: DocumentManifest,
  component(sourceFile: string): Component,
  fromId: (id: string) => DocumentBuilder,
  fromCache: (cacheFile: string) => BuildResults,
  fromSource: (sourceFile: string) => DocumentBuilder,
  use(plugin: (compiler: TempleCompiler) => void): TempleCompiler,
  asset: (assetFile: string) => Promise<{ type: AssetType, content: string }>,
  client: (sourceFile: string) => Promise<string>,
  import: (sourceFile: string) => Promise<BuildResults>,
  markup: (sourceFile: string) => Promise<string>,
  render: (sourceFile: string, props: Hash) => Promise<string>,
  server: (sourceFile: string) => Promise<string>,
  styles: (sourceFile: string) => Promise<string>
};
