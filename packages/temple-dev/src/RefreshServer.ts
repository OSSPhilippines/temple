
import type { FSWatcher } from 'chokidar';
import type { Request, Response } from '@ossph/temple/compiler';
import type { ServerOptions, OptionIgnore } from './types';

import path from 'path';
import chokidar from 'chokidar';
import { 
  Component, 
  DocumentBuilder,
  EventEmitter
} from '@ossph/temple/compiler';
import { dependantsOf, update } from './helpers';

const extensions = [ '.tml', '.dtml', '.ts', '.js', '.json', '.css' ];

/**
 * Socket server to be used in node
 */
export default class RefreshServer {
  //active build and props
  protected _registry = new Map<string, DocumentBuilder>();
  //the current working directory
  protected _cwd: string;
  //event emitter
  protected _emitter: EventEmitter;
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
   * Returns the watcher emitter
   */
  public get emitter() {
    return this._watcher;
  }

  /**
   * Imports all the options and sets up the event listeners
   */
  public constructor(options: ServerOptions) {
    this._cwd = options.cwd;
    this._emitter = options.emitter || new EventEmitter();
    this._extensions = options.include || extensions;
    this._ignore = options.ignore || [];
  }

  /**
   * Registers rendered document builder
   */
  public sync(builder: DocumentBuilder) {
    this._registry.set(builder.document.absolute, builder);
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
  public async refresh(filePath: string) {
    const extname = path.extname(filePath);
    if (!this._extensions.includes(extname)) {
      return this;
    }

    //Lots of things to figure out for hot refresh...
    // - What file changed? (filePath)
    // - What document imports this component?
    // - What components import this file?
    const absolute = path.resolve(this._cwd, filePath);
    const updates: Record<string, string[]> = {};
    
    //loop through the registry of loaded documents
    for (const builder of this._registry.values()) {
      const document = builder.document;
      this._emitter.trigger(
        'dev-update-document', 
        { filePath, document }
      );
      // - What document imports this component?
      //if the document is the same as the changed file
      if (document.absolute === absolute) {
        //just reload
        updates[document.id] = [ 'window.location.reload();' ];
        continue;
      }
      // - What components import this file?
      //get any dependencies that import this file
      const dependants = dependantsOf(absolute, document);
      //if there are no dependants, skip
      if (dependants.length === 0) {
        continue;
      }

      updates[document.id] = [];
      for (const dependant of dependants) {
        //if the filePath was imported as a component
        if (dependant.type === 'component') {
          //update the imported component
          const component = new Component(absolute, { 
            cwd: document.cwd,
            fs: document.fs
          });
          const script = await update(component);
          updates[document.id].push(script);
          this._emitter.trigger(
            'dev-update-component', 
            { filePath, document, component }
          );
          continue;
        //if the parent component is a component
        } else if (dependant.component.type === 'component') {
          //the filePath was imported as a template 
          // or file, update the parent component
          const script = await update(dependant.component);
          updates[document.id].push(script);
          this._emitter.trigger(
            'dev-update-component', 
            { filePath, document, component: dependant.component }
          );
          continue;
        }
        
        updates[document.id].push('window.location.reload();');
      }
    };

    this._clients.forEach(res => {
      res.write("event: refresh\n");
      res.write(`data: ${JSON.stringify(updates)}\n\n`);
      //if this works, then the browser will reload
      //causing the req.close event to be triggered
      //and the client will be removed from the list
      //implemented in wait()

      //this is also a provision for a better 
      //implementation of browser refresh
    });

    this._emitter.trigger('dev-file-changed', { filePath });

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