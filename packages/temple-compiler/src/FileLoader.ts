import fs from 'fs';
import path from 'path';
import Exception from './CompilerException';

/**
 * Loader
 */
export default class FileLoader {
  /**
   * Returns the absolute path to the file
   */
  public static absolute(pathname: string, cwd?: string) {
    cwd = cwd || this.cwd();
    if (/^\.{1,2}\//.test(pathname)) {
      pathname = path.resolve(cwd, pathname);
    }
    //if the pathname does not start with /, 
    //the path should start with modules
    if (!pathname.startsWith('/')) {
      pathname = path.resolve(this.modules(cwd), pathname);
    }
    return pathname;
  }

  /**
   * Returns the current working directory
   */
  public static cwd() {
    return process.cwd();
  }

  /**
   * Should locate the node_modules directory 
   * where idea is actually installed
   */
  public static modules(cwd?: string): string {
    cwd = cwd || this.cwd();
    if (cwd === '/') {
      throw new Error('Could not find node_modules');
    }
    if (fs.existsSync(path.resolve(cwd, 'node_modules/@ossph/temple'))) {
      return path.resolve(cwd, 'node_modules');
    }
    return this.modules(path.dirname(cwd));
  }

  /**
   * Returns the relative path from the source file to the required file
   * Note: This works better if using absolute paths from Loader.aboslute()
   */
  public static relative(source: string, require: string, withExtname = false) {
    //if dont include extname
    if (!withExtname) {
      //check for extname
      const extname = path.extname(require);
      //if there is an extname
      if (extname.length) {
        //remove the extname
        require = require.substring(0, require.length - extname.length);
      }
    }
    //get the relative path
    const relative = path.relative(path.dirname(source), require);
    //if the relative path is not relative, make it relative
    return relative.startsWith('.') ? relative: `./${relative}`;
  }

  /**
   * require() should be monitored separately from the code
   */
  public static require(file: string) {
    //if JSON, safely require it
    if (path.extname(file) === '.json') {
      const contents = fs.readFileSync(file, 'utf8');
      try {
        return JSON.parse(contents) || {};
      } catch(e) {}
      return {};
    }
    
    return require(file);
  }

  /**
   * Resolves the path name to a path that can be required
   */
  static resolve(pathname?: string, cwd?: string): string {
    cwd = cwd || this.cwd();
    //if no pathname
    if (!pathname) {
      pathname = cwd;
    //ex. plugin/foo -> node_modules/plugin
    //ex. ./plugin or ../plugin -> [cwd] / plugin 
    } else {
      pathname = fs.realpathSync(this.absolute(pathname, cwd));
    }

    //ex. /plugin/foo
    //it's already absolute...

    //1. Check if pathname is literally a file
    let file = pathname;
    if (this._fileExists(file)) {
      return file;
    }
    //2. check for [pathname].js
    file += '.js';
    if (this._fileExists(file)) {
      return file;
    }
    //3. check for [pathname].json
    file += 'on';
    if (this._fileExists(file)) {
      return file;
    }
    //4. Check for index.js
    file = path.resolve(pathname, 'index.js');
    if (this._fileExists(file)) {
      return file;
    }

    throw Exception.for('Could not resolve `%s`', pathname);
  }

  /**
   * Returns the absolute path to the file given the source route
   */
  public static route(sourceFile: string, destination: string) {
    const dirname = path.dirname(sourceFile);
    return path.resolve(dirname, destination);
  }

  private static _fileExists(path: string) {
    if (!fs.existsSync(path)) {
      return false;
    }
    const stats = fs.lstatSync(path);
    return stats && stats.isFile();
  }
}