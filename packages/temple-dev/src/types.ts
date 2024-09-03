import type { Component, EventEmitter } from '@ossph/temple/compiler';

export type OptionIgnore = (string|RegExp|((string: string) => boolean))[];

export type DevelopOptions = {
  cwd?: string,
  emitter?: EventEmitter,
  include?: string[],
  ignore?: OptionIgnore,
  route?: string,
  tsconfig?: string,
  extname?: string
};

export type ServerOptions = {
  cwd: string,
  emitter?: EventEmitter,
  include?: string[],
  ignore?: OptionIgnore,
  tsconfig?: string,
  extname?: string
};

export type ClientOptions = {
  path?: string
};

export type UpdateOptions = {
  tsconfig?: string,
  extname?: string
};

export type Dependants = Record<string, {
  component: Component,
  type: string
}>;