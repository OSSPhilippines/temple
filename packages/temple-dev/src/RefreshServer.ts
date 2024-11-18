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
import { dependantsOf, update, errorMessage } from './helpers';

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
  //extname
  protected _extname: string;
  //file extensions to listen to
  protected _extensions: string[];
  //patterns used to ignore files and folders
  //can be an array of string, string pattern, 
  //regexp, function
  protected _ignore: OptionIgnore;
  //tsconfig file
  protected _tsconfig: string|undefined;
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
    this._tsconfig = options.tsconfig;
    this._extname = options.extname || '.tml';
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
   * Tell all the browsers to reload their page or hot update components
   */
  public async refresh(filePath: string) {
    const extname = path.extname(filePath);
    if (!this._extensions.includes(extname)) {
      return this;
    }

    const updates: Record<string, string[]> = {};
    const params = { filePath, updates };
    await this._emitter.waitFor('dev-file-change', params);

    const absolute = path.resolve(this._cwd, filePath);
    
    //loop through the registry of loaded documents
    for (const builder of this._registry.values()) {
      const document = builder.document;
      
      // If the document itself changed
      if (document.absolute === absolute) {
        const params = { filePath, document, updates };
        await this._emitter.waitFor('dev-update-document', params);
        
        // Try to hot update the document if possible
        try {
          const script = await update(document, {
            extname: this._extname,
            tsconfig: this._tsconfig
          });
          updates[document.id] = [script];
        } catch(error) {
          // Fallback to full reload if hot update fails
          updates[document.id] = ['window.location.reload();'];
        }

        await this._emitter.waitFor('dev-updated-document', params);
        continue;
      }

      // Handle component dependencies
      let dependants: { component: Component, type: string }[] = [];
      try {
        dependants = dependantsOf(absolute, document);
      } catch(error) {
        updates[document.id] = [errorMessage(error as Error)];
        continue;
      }
      
      if (dependants.length === 0) continue;

      updates[document.id] = [];
      for (const dependant of dependants) {
        const targetComponent = dependant.type === 'component' 
          ? new Component(absolute, {
              brand: document.brand,
              cwd: document.cwd,
              fs: document.fs
            })
          : dependant.component.type === 'component' 
            ? dependant.component 
            : null;

        if (targetComponent) {
          const params = { filePath, document, component: targetComponent, updates };
          await this._emitter.waitFor('dev-update-component', params);
          
          try {
            const script = await update(targetComponent, {
              extname: this._extname,
              tsconfig: this._tsconfig
            });
            updates[document.id].push(script);
          } catch(error) {
            updates[document.id].push(errorMessage(error as Error));
          }

          await this._emitter.waitFor('dev-updated-component', params);
        }
      }

      // Only reload if no hot updates were possible
      if (updates[document.id].length === 0) {
        const params = { filePath, document, updates };
        await this._emitter.waitFor('dev-update-document', params);
        updates[document.id].push('window.location.reload();');
        await this._emitter.waitFor('dev-updated-document', params);
      }
    }

    // Send updates to clients
    this._clients.forEach(res => {
      res.write("event: refresh\n");
      res.write(`data: ${JSON.stringify(updates)}\n\n`);
    });

    await this._emitter.waitFor('dev-file-changed', params);
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