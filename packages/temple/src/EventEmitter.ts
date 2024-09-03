import type { TempleEventMap } from './types';
import EventEmitter, { once } from 'events';

export class Event<T> {
  //the name of the event
  protected _name: string;
  //the response data
  protected _data: T|undefined = undefined;
  //the event params
  protected _params: Record<string, any> = {};

  /**
   * Returns the event name
   */
  public get name() {
    return this._name;
  }

  /**
   * Returns the response data
   */
  public get data(): T|undefined {
    return this._data;
  }

  /**
   * Returns the event params
   */
  public get params() {
    return this._params;
  }

  /**
   * Sets the event response data
   */
  public set data(data: T) {
    this.set(data);
  }

  /**
   * Sets read-only params
   */
  public constructor(name: string, params: Record<string, any> = {}) {
    this._name = name;
    this._params = params;
  }

  /**
   * Adds a key-value pair to event params 
   */
  public add(key: string, value: any) {
    this._params[key] = value;
    return this;
  }

  /**
   * Sets the event response data
   */
  public set(data: T) {
    this._data = data;
    return this;
  }
}

export default class TempleEventEmitter extends EventEmitter<TempleEventMap> {
  trigger<T>(name: string, params: Record<string, any> = {}) {
    const event = new Event<T>(name, params);
    super.emit(name, event);
    return event;
  }
  async waitFor<T>(name: string, params: Record<string, any> = {}) {
    const event = new Event<T>(name, params);
    process.nextTick(() => {
      this.emit(name, event);
    });
    await once(this, name);
    return event;
  }
}