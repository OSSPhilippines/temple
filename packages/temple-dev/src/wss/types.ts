import type http from 'http';
import type { EventEmitter } from '@blanquera/types';

export type OptionIgnore = (string|RegExp|((string: string) => boolean))[];

export type ServerOptions = {
  https?: boolean,
  host?: string,
  port?: number,
  path?: string,
  server: http.Server,
  emitter: EventEmitter<any[]>,
  cwd: string,
  include?: string[],
  ignore: OptionIgnore
};

export type ClientOptions = {
  host?: string,
  port?: number,
  path?: string,
  emitter: EventEmitter<any[]>
};

export type MiddlewareOptions = { 
  host?: string, 
  port?: number, 
  path?: string 
};

export type Payload = Record<string, any> & {
  command: string
};

export type Next = () => void;
export type Request = http.IncomingMessage;
export type Response = http.ServerResponse<Request> & {
  req: Request;
};