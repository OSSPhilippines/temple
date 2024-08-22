import type { TempleOptions, Build } from '@ossph/temple/compiler';
import temple from '@ossph/temple/compiler';

export type Props = Record<string, any>;
export type Next = (build: Build, props: Props) => string;

export const defaultNext: Next = (build, props) => build.document.render(props);

export default function engine(
  options: TempleOptions, 
  next: Next = defaultNext
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
      callback(null, next(build, props));
    } catch (e) {
      callback(e as Error, undefined);
    }
  };
}