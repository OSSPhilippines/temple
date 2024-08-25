import type { Component } from '@ossph/temple/compiler';

export type OptionIgnore = (string|RegExp|((string: string) => boolean))[];

export type DevelopOptions = {
  include?: string[],
  ignore?: OptionIgnore,
  route?: string
};

export type ServerOptions = {
  cwd: string,
  include?: string[],
  ignore?: OptionIgnore
};

export type ClientOptions = {
  path?: string
};

export type Dependants = Record<string, {
  component: Component,
  type: string
}>;