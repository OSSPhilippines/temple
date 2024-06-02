import type { 
  ServerOptions, 
  MiddlewareOptions,
  Request,
  Response,
  Next
} from './types';

import fs from 'fs';
import http from 'http';
import https from 'https';
import { EventEmitter } from '@blanquera/types';
import SocketServer from './SocketServer';

export type * from './types';

export { SocketServer };

/**
 * Returns a middleware to be used in a node server (or express)
 */
export function dev(options: MiddlewareOptions = {}) {
  return function(req: Request, res: Response, next: Next = () => {}) {
    if (req.url) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname === '/dev.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        const script = fs.readFileSync(
          require.resolve('@ossph/temple-dev/client.js')
        );
        const host = options.host || req.headers.host || 'localhost';
        const port = options.port || Number(req.headers.port) || 31337;
        const path = options.path || '/__temple_dev__';
        const config = `{port:${port},host:'${host}',path:'${path}'}`;
        const start = `;temple_dev.default(${config}).listen();`;
        res.end(script + start); 
      }
    }

    next();
  };
};

/**
 * Injects the script tag into the html
 */
export function inject(html: string) {
  return html.replace(
    '</body>',
    '<script src="/dev.js"></script></body>'
  );
}

/**
 * Returns a function to start a server
 */
export default function server(options: Record<string, any> = {}) {
  if (!options.emitter) {
    options.emitter = new EventEmitter<any[]>();
  }

  const custom = !!options.server;

  if (!custom) {
    const handler = dev({
      host: options.host,
      port: options.port
    });
    if (options.https) {
      options.server = https.createServer(handler);
    } else {
      options.server = http.createServer(handler);
    }
  }
  return new SocketServer(options as ServerOptions);
}