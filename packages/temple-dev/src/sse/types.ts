import type http from 'http';
import type { Component, FSInterface } from '@ossph/temple/compiler';

export type OptionIgnore = (string|RegExp|((string: string) => boolean))[];

export type DevOptions = {
  //temple options
  fs?: FSInterface,
  brand?: string,
  name?: string,
  type?: "document" | "component" | "template",
  build?: string,
  minify?: boolean,
  bundle?: boolean,
  tsconfig?: string,
  //server options
  cwd: string,
  include?: string[],
  ignore?: OptionIgnore,
  //watcher options
  route?: string
};

export type ServerOptions = {
  cwd: string,
  path?: string,
  include?: string[],
  ignore?: OptionIgnore
};

export type ClientOptions = {
  path?: string
};

export type Noop = () => void;
export type Request = http.IncomingMessage;
export type Response = http.ServerResponse<Request> & {
  req: Request;
};
export type NextView = (err: Error | null, results: string | undefined) => void;

export type Props = Record<string, any>;

export type Dependants = Record<string, {
  component: Component,
  type: string
}>;