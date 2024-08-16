import type { TempleOptions } from '@ossph/temple/compiler';
import temple from '@ossph/temple/compiler';

export default function engine(
  options: TempleOptions, 
  next: (res: string) => string = (res) => res
) {
  const compiler = temple(options);
  return async (
    filePath: string,
    options: Record<string, any>,
    callback: (err: Error | null, results: string | undefined) => void,
  ) => {
    const { settings, _locals, cache, ...props } = options;
    try {
      const build = await compiler.import(filePath);
      callback(null, next(build.document.inline(props)));
    } catch (e) {
      callback(e as Error, undefined);
    }
  };
}