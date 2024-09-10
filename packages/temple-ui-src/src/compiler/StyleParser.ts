import type { FileSystem } from '@ossph/temple/compiler';
import type { ParserOptions } from './types';
import { NodeFS, FileLoader } from '@ossph/temple/compiler';
import Exception from './Exception';

//ie. abc, abc-1def, abc-1def-2ghi, ...
export const pattern = /[a-z]+\-{0,2}([a-z0-9]+\-{0,2})*/g;

/**
 * A class for parsing classnames from a string.
 */
export default class Parser {
  /**
   * Returns an array of unique classnames
   * within the given content.
   */
  public static match(content: string) {
    //get all matches
    const matches = content.match(pattern);
    //return unique matches
    return matches ? Array.from(new Set(matches)) : [];
  }

  //the current working directory
  protected _cwd: string;
  //the file system
  protected _fs: FileSystem;
  //the file loader
  protected _loader: FileLoader;
  //the virtual file system cache
  protected _vfs = new Map<string, string>();

  /**
   * The current working directory.
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * The file system.
   */
  public get fs() {
    return this._fs;
  }

  /**
   * The file loader.
   */
  public get loader() {
    return this._loader;
  }

  /**
   * The virtual file system cache.
   */
  public get vfs() {
    return this._vfs;
  }

  /**
   * Sets the cwd, fs and loader.
   */
  public constructor(options: ParserOptions = {}) {
    //determine the current working directory
    this._cwd = options.cwd || process.cwd();
    //determine the file system
    this._fs = options.fs || new NodeFS();
    //create a new file loader
    this._loader = new FileLoader(this._fs, this._cwd);
  }

  /**
   * Adds a file's content to the cache
   */
  public add(file: string, pwd = this._cwd) {
    //whether relative or using @ directive, find the absolute path
    const absolute = this._loader.absolute(file, pwd);
    //if the file does not exist
    if (!this._fs.existsSync(absolute)) {
      //throw an exception
      throw Exception.for('File not found: %s', file);
    }
    //get the file's content
    const contents = this._fs.readFileSync(absolute, 'utf-8');
    //add the file's content to the cache
    this._vfs.set(absolute, contents);
    return this;
  }

  /**
   * Parses the content of each file in the cache
   * and returns the classnames found.
   */
  public parse() {
    //get all contents
    const contents = Array.from(this._vfs.values());
    //return all matches
    return contents.map(content => Parser.match(content)).flat();
  }

  /**
   * Sets a file's content in the cache.
   */
  public set(file: string, content: string) {
    //whether relative or using @ directive, find the absolute path
    const absolute = this._loader.absolute(file, this._cwd);
    //add the file's content to the cache
    this._vfs.set(absolute, content);
    return this;
  }

  /**
   * Walks the file content in the cache and yields the classnames found.
   */
  public *walk() {
    //get content from eact file in the cache
    for (const content of this._vfs.values()) {
      //get all matches found in the content
      const matches = Parser.match(content);
      //yield each match
      for (const match of matches) {
        yield match;
      }
    }
  }
}