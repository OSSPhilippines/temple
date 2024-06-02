import type { EventEmitter } from '@blanquera/types';
import type { ClientOptions, Payload } from './types';

/**
 * Socket client to be used in the browser
 */
export default class SocketClient {
  //the event emitter (matching server)
  protected _emitter: EventEmitter<any[]>;
  //domain host ie. localhost
  protected _host: string;
  //domain port ie. 12345
  protected _port: number;
  //path to open the socket ie. /__temple_dev__
  protected _path: string;

  /**
   * Returns the event emitter
   */
  public get emitter() {
    return this._emitter;
  }

  /**
   * Returns the domain host ie. localhost
   */
  public get host() {
    return this._host;
  }

  /**
   * Returns the socket path ie. /__temple_dev__
   */
  public get path() {
    return this._path;
  }

  /**
   * Returns the domain port ie. 12345
   */
  public get port() {
    return this._port;
  }

  /**
   * Sets up the URL and event emitter
   */
  public constructor(options: ClientOptions) {
    this._host = options.host || 'localhost';
    this._port = options.port || 31337;
    this._emitter = options.emitter;
    this._path = options.path || '/__temple_dev__';
  }

  /**
   * Starts listening to the port
   */
  public listen() {
    const ws = new WebSocket(`ws://${this._host}:${this._port}${this._path}`);
    ws.onopen = () => this._emitter.emit('open');
    ws.onmessage = event => this._emitter.emit('message', event.data);
    ws.onclose = () => this._emitter.emit('close');
    ws.onerror = error => this._emitter.emit('error', error);
    this._emitter.on('message', message => {
      const payload = JSON.parse(message) as Payload;
      if (!payload || !payload.command) {
        return;
      }
      if (payload.command === 'reload') {
        this.reload();
      }
    });
  }

  /**
   * Reloads the window
   */
  public reload() {
    window.location.reload();
  }
}