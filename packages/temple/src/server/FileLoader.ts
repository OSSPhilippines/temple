import fs from 'fs';
import path from 'path';

/**
 * Loader
 */
export default class FileLoader {
  /**
   * Returns the absolute path to the file
   */
  static absolute(pathname: string, cwd?: string) {
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
  static cwd() {
    return process.cwd();
  }

  /**
   * Should locate the node_modules directory 
   * where idea is actually installed
   */
  static modules(cwd?: string): string {
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
  static relative(source: string, require: string, withExtname = false) {
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
  static require(file: string) {
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
   * Returns the absolute path to the file given the source route
   */
  static route(sourceFile: string, destination: string) {
    const dirname = path.dirname(sourceFile);
    return path.resolve(dirname, destination);
  }
}