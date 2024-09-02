import type { Request, Response } from '@ossph/temple/compiler';
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

export function dev(options: DevelopOptions = {}) {
  const { 
    include, 
    ignore, 
    emitter,
    cwd = process.cwd(), 
    route = '/__temple_dev__' 
  } = options;
  const refresh = new RefreshServer({ cwd, emitter, include, ignore });
  refresh.watch();
  return {
    refresh,
    router: function(req: Request, res: Response) {
      if (req.url) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (url.pathname === '/dev.js') {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          const script = fs.readFileSync(
            require.resolve('@ossph/temple-dev/client.js')
          );
          const id = 'TempleAPI.BUILD_ID';
          const start = `;temple_dev.default(${id}, {path: '${route}'});`;
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