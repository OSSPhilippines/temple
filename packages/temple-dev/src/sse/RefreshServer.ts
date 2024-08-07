import { FSWatcher } from 'chokidar';
import { ServerOptions, OptionIgnore, Request, Response } from './types';

import path from 'path';
import chokidar from 'chokidar';

const extensions = [ '.tml', '.ts', '.js', '.json', '.css' ];

/**
 * Socket server to be used in node
 */
export default class RefreshServer {
  //the current working directory
  protected _cwd: string;
  //file extensions to listen to
  protected _extensions: string[];
  //patterns used to ignore files and folders
  //can be an array of string, string pattern, 
  //regexp, function
  protected _ignore: OptionIgnore;
  //the file watcher
  protected _watcher: FSWatcher|null = null;
  //clients
  protected _clients = new Set<Response>();

  /**
   * Returns the current working directory
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * Imports all the options and sets up the event listeners
   */
  public constructor(options: ServerOptions) {
    this._cwd = options.cwd;
    this._extensions = options.include || extensions;
    this._ignore = options.ignore || [];
  }

  /**
   * Closes the socket connection
   */
  public close() {
    if (this._watcher) {
      this._watcher.close();
      this._watcher = null;
    }
    this._clients.forEach(res => {
      res.end();
      //remove the client from the list
      this._clients.delete(res);
    });
    return this;
  }

  /**
   * Tell all the browsers to reload their page
   */
  public refresh(filepath: string) {
    const extname = path.extname(filepath);
    if (!this._extensions.includes(extname)) {
      return this;
    }

    this._clients.forEach(res => {
      res.write("event: refresh\n");
      res.write("data: 1\n\n");
      //if this works, then the browser will reload
      //causing the req.close event to be triggered
      //and the client will be removed from the list
      //implemented in wait()

      //this is also a provision for a better 
      //implementation of browser refresh
    });

    return this;
  }

  /**
   * Adds a new client to the list
   */
  public wait(req: Request, res: Response) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',          
      'Content-Encoding': 'none',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    this._clients.add(res);
    //if connection aborted
    req.on('close', () => {
      res.end();
      //remove the client from the list
      this._clients.delete(res);
    });
    //pong the client
    res.write("data: pong\n\n");
    return this;
  }

  /**
   * Start watching files
   */
  public watch() {
    this._watcher = chokidar.watch(this._cwd, {
      ignoreInitial: true,
      ignored: this._ignore,
      cwd: this._cwd
    });

    this._watcher.on('add', this.refresh.bind(this));
    this._watcher.on('change', this.refresh.bind(this));
    this._watcher.on('unlink', this.refresh.bind(this));
    return this;
  }
}