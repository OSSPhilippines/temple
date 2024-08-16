export type FileStat = { isFile(): boolean };

export default interface FileSystemInterface {
  existsSync(path: string): boolean,
  readFileSync(path: string, encoding: BufferEncoding): string,
  realpathSync(string: string): string,
  lstatSync(path: string): FileStat
}