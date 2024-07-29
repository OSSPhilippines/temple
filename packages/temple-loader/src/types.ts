export type LoaderFunction = (this: WebpackLoader, source: string) => void;
export type WebpackLoader = {
  async: () => (error: Error|null, results: string) => void,
  getOptions: () => Record<string, any>,
  resourcePath: string
}