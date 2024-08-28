import type { ManifestOptions } from '../types';

import EventEmitter from './EventEmitter';
import Component from '../compiler/Component';
import Builder from './Builder';
import Exception from '../Exception';

export default class Manifest {
  //compoent and build options
  protected _options: ManifestOptions;
  //registry
  protected _registry = new Map<string, string>();
  //emitter
  protected _emitter: EventEmitter;

  /**
   * Returns the emitter
   */
  public get emitter() {
    return this._emitter;
  }

  /**
   * Returns the registry
   */
  public get registry() {
    return this._registry;
  }

  /**
   * Sets the options
   */
  public constructor(options: ManifestOptions) {
    this._options = options;
    this._emitter = options.emitter || new EventEmitter();
  }

  /**
   * Returns a builder given the id
   */
  public builder(id: string) {
    //get the file path from the id
    const filePath = this.get(id);
    //throw if no file path
    if (!filePath) {
      throw Exception.for(`Could not find file for %s`, id);
    }
    
    //make a new document
    const document = new Component(filePath, this._options);
    //return a new builder
    return new Builder(document, this._options);
  }

  /**
   * Deletes a path from the manifest
   */
  public delete(id: string) {
    const results = this._registry.delete(id);
    this._emitter.trigger('manifest-unresolved', { id, manifest: this });
    return results;
  }

  /**
   * Returns an iterator from the manifest key/values
   */
  public entries() {
    return this._registry.entries();
  }

  /**
   * Gets a path from the manifest
   */
  public get(id: string) {
    if (this.has(id)) {
      return this._registry.get(id);
    }
    this._emitter.trigger('manifest-resolve', { id, manifest: this });
    if (this.has(id)) {
      return this._registry.get(id);
    }
    return undefined;
  }

  /**
   * Returns true if the manifest has the id
   */
  public has(id: string) {
    return this._registry.has(id);
  }

  /**
   * Returns an iterator from the manifest keys
   */
  public keys() {
    return this._registry.keys();
  }

  /**
   * Populates the manifest registry
   */
  public load(manifest: Record<string, string>) {
    const event = this._emitter.trigger('manifest-load', { 
      map: new Map(Object.entries(manifest)), 
      manifest: this 
    });
    this._registry = event.data || event.params.map;

    return this;
  }

  /**
   * Sets a path in the manifest
   */
  public set(id: string, path: string) {
    //only if the path is not the same
    if (this._registry.get(id) !== path) {
      //set the path
      this._registry.set(id, path);
      //trigger the event
      this._emitter.trigger(
        'manifest-resolved', 
        { id, path, manifest: this }
      );
    }
    return this;
  }

  /**
   * Returns the manifest as a JSON string
   */
  public toJson() {
    return JSON.stringify(Object.fromEntries(this._registry.entries()));
  }

  /**
   * Returns an iterator from the manifest values
   */
  public values() {
    return this._registry.values();
  }
};