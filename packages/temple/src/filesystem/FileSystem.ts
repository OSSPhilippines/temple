import fs from 'fs';
import FSInterface from './FSInterface';

export default class DefaultFileSystem implements FSInterface {
  protected _fs: typeof fs;
  public get fs() {
    return this._fs;
  }
  constructor(filesystem?: typeof fs) {
    this._fs = filesystem || fs;
  }
  existsSync(path: string) {
    return this._fs.existsSync(path);
  }
  readFileSync(path: string, encoding: BufferEncoding) {
    return this._fs.readFileSync(path, encoding);
  }
  realpathSync(path: string) {
    return this._fs.realpathSync(path);
  }
  lstatSync(path: string) {
    return this._fs.lstatSync(path);
  }
}