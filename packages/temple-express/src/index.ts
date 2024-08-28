import type { 
  Request,
  Response,
  TempleCompiler
} from '@ossph/temple/compiler';

import type { DevelopOptions } from '@ossph/temple-dev';

import { dev as develop } from '@ossph/temple-dev';

export type NextView = (err: Error | null, results: string | undefined) => void;

export function view(compiler: TempleCompiler) {
  return async (
    filePath: string,
    options: Record<string, any>,
    callback: NextView
  ) => {
    const { settings, _locals, cache, ...props } = options;
    try {
      callback(null, await compiler.render(filePath, props));
    } catch (e) {
      //next
      callback(e as Error, undefined);
    }
  };
};

export function dev(options: DevelopOptions = {}) {
  const { refresh, router } = develop(options);

  return {
    refresh,
    router: function(req: Request, res: Response, next: () => void) {
      !router(req, res) && next();
    },
    view(compiler: TempleCompiler) {
      return async (
        filePath: string,
        options: Record<string, any>,
        callback: NextView
      ) => {
        const { settings, _locals, cache, ...props } = options;
        try {
          //sync builder with refresh server
          refresh.sync(compiler.fromSource(filePath));
          callback(null, await compiler.render(filePath, props));
        } catch (e) {
          //next
          callback(e as Error, undefined);
        }
      }
    }
  };
};