import type { 
  Hash,
  Request,
  Response,
  TempleCompiler, 
  BuildResults
} from '@ossph/temple/compiler';
import type { DevelopOptions } from '@ossph/temple-dev';

import { inject, develop as dev } from '@ossph/temple-dev';

export type Next = (build: BuildResults, props: Hash) => string;
export type NextView = (err: Error | null, results: string | undefined) => void;

export const defaultNext: Next = (build, props) => build.document.render(props);

export default function engine(
  compiler: TempleCompiler, 
  next: Next = defaultNext
) {
  return async (
    filePath: string,
    options: Record<string, any>,
    callback: (err: Error | null, results: string | undefined) => void,
  ) => {
    const { settings, _locals, cache, ...props } = options;
    try {
      const build = await compiler.import(filePath);
      callback(null, next(build, props));
    } catch (e) {
      callback(e as Error, undefined);
    }
  };
};

export function develop(
  compiler: TempleCompiler, 
  options: DevelopOptions = {}
) {
  const { refresh, serve } = dev(compiler, options);

  return {
    compiler,
    refresh,
    engine: async (
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
        const html = inject(build.document.render(props));
        callback(null, html);
      } catch (e) {
        callback(e as Error, undefined);
      }
    },
    serve: function(req: Request, res: Response, next: () => void) {
      !serve(req, res) && next();
    }
  };
};

export function build(compiler: TempleCompiler) {
  const build = compiler.serve();
  return function(req: Request, res: Response, next: () => void) {
    build(req, res).then(resolved => !resolved && next());
  }
};