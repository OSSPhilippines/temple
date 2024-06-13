import type { 
  ServerOptions, 
  Request,
  Response,
  Next
} from './types';

import fs from 'fs';
import RefreshServer from './RefreshServer';

export type * from './types';

export { RefreshServer };

/**
 * Returns a middleware to be used in a node server (or express)
 */
export function dev(options: ServerOptions) {
  const { path = '/__temple_dev__', ...config } = options;
  const server = new RefreshServer(config);
  server.watch();
  return function(req: Request, res: Response, next: Next = () => {}) {
    if (req.url) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname === '/dev.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        const script = fs.readFileSync(
          require.resolve('@ossph/temple-dev/client.js')
        );
        const path = options.path || '/__temple_dev__';
        const config = `{path:'${path}'}`;
        const start = `;temple_dev.default(${config});`;
        res.end(script + start); 
        return;
      } else if (url.pathname === '/__temple_dev__') {
        server.wait(req, res);
        return;
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