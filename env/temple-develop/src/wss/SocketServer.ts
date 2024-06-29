import type http from 'http';
import { FSWatcher } from 'chokidar';
import type { EventEmitter } from '@blanquera/types';
import { ServerOptions, OptionIgnore, Payload, Next } from './types';

import path from 'path';
import ws from 'ws';
import chokidar from 'chokidar';

const extensions = [ '.html', '.ts', '.js', '.json', '.css' ];

/**
 * Socket server to be used in node
 */
export default class SocketServer {
  //the current working directory
  protected _cwd: string;
  //the event emitter (matching client)
  protected _emitter: EventEmitter<any[]>;
  //file extensions to listen to
  protected _extensions: string[];
  //patterns used to ignore files and folders
  //can be an array of string, string pattern, 
  //regexp, function
  protected _ignore: OptionIgnore;
  //domain host
  protected _host: string;
  //port of the web socket
  protected _port: number;
  //path to open the socket
  protected _path: string;
  //http server to use
  protected _server: http.Server;
  //the websocket server (use this instead of _server)
  protected _wss: ws.Server;
  //the file watcher
  protected _watcher: FSWatcher|null = null;

  /**
   * Returns the current working directory
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * Returns the event emitter
   */
  public get emitter() {
    return this._emitter;
  }

  /**
   * Returns the domain host
   */
  public get host() {
    return this._host;
  }

  /**
   * Returns the socket port
   */
  public get port() {
    return this._port;
  }

  /**
   * Returns the http server
   */
  public get server() {
    return this._server;
  }

  /**
   * Returns the web socket server
   */
  public get wss() {
    return this._wss;
  }

  /**
   * Imports all the options and sets up the event listeners
   */
  public constructor(options: ServerOptions) {
    this._cwd = options.cwd;
    this._emitter = options.emitter;
    this._extensions = options.include || extensions;
    this._ignore = options.ignore;
    this._host = options.host || 'localhost';
    this._port = options.port || 31337;
    this._path = options.path || '/__temple_dev__';

    this._server = options.server;
    this._wss = new ws.Server({ 
      server: this._server,
      path: this._path
    });

    this._wss.on('connection', socket => {
      this._emitter.emit('connection', socket);
      socket.on('message', message => {
        this._emitter.emit('message', message, socket);
      });
      socket.on('close', () => {
        this._emitter.emit('close', socket);
      });
      socket.on('error', error => {
        this._emitter.emit('error', error, socket);
      });
    });

    this._wss.on('close', () => {
      this._emitter.emit('ended');
    });

    this._wss.on('error', error => {
      this._emitter.emit('error', error);
    });
  }

  /**
   * Closes the socket connection
   */
  public close() {
    if (this._watcher) {
      this._watcher.close();
      this._watcher = null;
    }
    this._wss.close();
    return this;
  }

  /**
   * Listen to the server
   */
  public listen(callback: Next = () => {}) {
    this._server.listen(this._port, this._host, callback);
    return this;
  }

  /**
   * Tell all the browsers to reload their page
   */
  public reload(filepath: string) {
    const extname = path.extname(filepath);
    if (!this._extensions.includes(extname)) {
      return this;
    }

    return this.send({ command: 'reload', path: filepath });
  }

  /**
   * Sends a message to all the browsers listening
   */
  public send(payload: Payload) {
    Array.from(this._wss.clients)
      .filter(client => client.readyState === ws.OPEN)
      .forEach(client => {
        console.log('sending', payload);
        client.send(
          JSON.stringify(payload),
          error => error && this._emitter.emit('error', error, client)
        )
      });
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

    this._watcher.on('add', this.reload.bind(this));
    this._watcher.on('change', this.reload.bind(this));
    this._watcher.on('unlink', this.reload.bind(this));
    return this;
  }
}