import type { 
  Request, 
  Response, 
  TempleCompiler 
} from '@ossph/temple/compiler';
import type { DevelopOptions } from './types';

import fs from 'fs';
import RefreshServer from './RefreshServer';

export type * from './types';

export { 
  createSourceFile, 
  dependantsOf, 
  esRefreshPlugin,
  transpile,
  update 
} from './helpers';

export { RefreshServer };

export function inject(html: string) {
  return html.replace(
    '</body>',
    '<script src="/dev.js"></script></body>'
  );
};

export function develop(
  compiler: TempleCompiler, 
  options: DevelopOptions = {}
) {
  const { include, ignore, route = '/__temple_dev__' } = options;
  const cwd = compiler.options.cwd || process.cwd();
  const refresh = new RefreshServer({ cwd, include, ignore });
  refresh.watch();
  return {
    compiler,
    refresh,
    serve: function(req: Request, res: Response) {
      if (req.url) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (url.pathname === '/dev.js') {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          const script = fs.readFileSync(
            require.resolve('@ossph/temple-dev/client.js')
          );
          const start = `;temple_dev.default(TempleBundle.id, {path: '${route}'});`;
          res.end(script + start); 
          return true;
        } else if (url.pathname === route) {
          refresh.wait(req, res);
          return true;
        }
      }
      return false;
    }
  };
};