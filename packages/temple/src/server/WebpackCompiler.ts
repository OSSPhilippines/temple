import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import Exception from './CompilerException';

export type Options = { 
  fileSystem: typeof fs,
  buildFolder: string,
  buildName: string
};

export default class WebpackCompiler {
  //file system to use
  protected _fs: typeof fs;
  //the build folder
  protected _buildFolder: string;
  //the build name
  protected _buildName: string;
  //the entry file
  protected _entry: { path: string, code: string }|null = null;
  //the files to compile
  protected _files: Record<string, string> = {};

  /**
   * Sets the entry file
   */
  public set entry(value: { path: string, code: string }) {
    this._entry = value;
  }

  /**
   * Sets the compiler options
   */
  public constructor(options: Options) {
    this._fs = options.fileSystem || fs;
    this._buildFolder = options.buildFolder;
    this._buildName = options.buildName;
  }

  /**
   * Adds a file to the compiler
   */
  public addFile(filePath: string, code: string) {
    this._files[filePath] = code;
  }
  
  /**
   * Compile the files and return the compiled code
   */
  public compile() {
    //if no entry file provided, throw an error
    if (!this._entry) {
      throw Exception.for('No entry file provided');
    }
    //save all the files to the build folder
    const dirname = path.dirname(this._entry.path);
    if (!this._fs.existsSync(dirname)) {
      this._fs.mkdirSync(dirname, { recursive: true });
    }
    this._fs.writeFileSync(this._entry.path, this._entry.code);
    for (const [filePath, code] of Object.entries(this._files)) {
      const dirname = path.dirname(filePath);
      if (!this._fs.existsSync(dirname)) {
        this._fs.mkdirSync(dirname, { recursive: true });
      }
      this._fs.writeFileSync(filePath, code);
    }
    //setup the webpack compiler
    const compiler = webpack({
      //ie. [build]/components/Counter.ts
      entry: this._entry.path,
      resolve: {
        extensions: ['.js'],
      },
      //ie. [build]/path/to/build.js
      output: { 
        path: this._buildFolder,
        filename: this._buildName 
      }
    });

    compiler.inputFileSystem = this._fs;
    compiler.outputFileSystem = this._fs;

    return new Promise<string>((resolve, reject) => {
      compiler.run((error, stats) => {
        if (error) {
          return reject(error);
        } else if (stats && stats.hasErrors()) {
          return reject(stats.compilation.errors[0]);
        }
        resolve(this._fs.readFileSync(
          path.join(this._buildFolder, this._buildName), 
          'utf8'
        ));
      });
    });
  }
}