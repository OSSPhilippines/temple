import type http from 'http';

export type OptionIgnore = (string|RegExp|((string: string) => boolean))[];

export type ServerOptions = {
  cwd: string,
  path?: string,
  include?: string[],
  ignore?: OptionIgnore
};

export type ClientOptions = {
  path?: string
};

export type Next = () => void;
export type Request = http.IncomingMessage;
export type Response = http.ServerResponse<Request> & {
  req: Request;
};