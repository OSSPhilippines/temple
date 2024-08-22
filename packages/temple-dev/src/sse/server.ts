import type { Build } from '@ossph/temple/compiler';
import type { 
  DevOptions,
  ServerOptions, 
  Request,
  Response,
  Noop,
  Props,
  NextView
} from './types';

import fs from 'fs';
import temple from '@ossph/temple/compiler';
import RefreshServer from './RefreshServer';

export type * from './types';

export { RefreshServer };

export function develop(options: DevOptions) {
  const compiler = temple(options);
  const refresh = new RefreshServer(options);
  const route = options.route || '/__temple_dev__';
  refresh.watch();
  return {
    /**
     * app.engine('tml', view)
     */
    view: async (
      filePath: string,
      options: Record<string, any>,
      callback: NextView
    ) => {
      const { settings, _locals, cache, ...props } = options;
      try {
        //load the builder
        const builder = compiler.builder(filePath);
        //register the builder
        refresh.register(builder, props);
        //get the build object
        const build = await builder.build();
        //render the document
        const html = build.document.render(props).replace(
          '</body>',
          '<script src="/dev.js"></script></body>'
        );
        callback(null, html);
      } catch (e) {
        callback(e as Error, undefined);
      }
    },
    /**
     * app.use(dev)
     */
    dev: function(req: Request, res: Response, next: Noop = () => {}) {
      if (req.url) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (url.pathname === '/dev.js') {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          const script = fs.readFileSync(
            require.resolve('@ossph/temple-dev/client.js')
          );
          const start = `;temple_dev.default(TempleBundle.id, {path: '${route}'});`;
          res.end(script + start); 
          return;
        } else if (url.pathname === route) {
          refresh.wait(req, res);
          return;
        }
      }
  
      next();
    }
  };
}

/**
 * Returns a middleware to be used in a node server (or express)
 */
export function dev(options: ServerOptions) {
  const { path = '/__temple_dev__', ...config } = options;
  const server = new RefreshServer(config);
  server.watch();
  return function(req: Request, res: Response, next: Noop = () => {}) {
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
export function inject(build: Build, props: Props) {
  const html = build.document.render(props);
  return html.replace(
    '</body>',
    '<script src="/dev.js"></script></body>'
  );
}