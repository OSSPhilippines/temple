import type LanguageServer from './LanguageServer';

export default class ServerSettings<S = Record<string, any>> {
  //the server connection
  protected _server: LanguageServer;
  //default settings
  protected _defaults: S;
  //cached settings
  protected _cache: Map<string, Thenable<S>>;

  /**
   * Sets the server and default settings 
   */
  constructor(server: LanguageServer, defaults: S) {
    this._server = server;
    this._defaults = defaults;
    this._cache = new Map();
  }

  /**
   * Returns the settings for the given resource
   */
  get(resource: string) {
    if (!this._server.canConfigure) {
      return Promise.resolve(this._defaults);
    }
    let result = this._cache.get(resource);

		if (!result) {
			result = this._server.connection.workspace.getConfiguration({
				scopeUri: resource,
				section: 'languageServerExample'
			});
			this.set(resource, result);
		}
		return result;
  }

  /**
   * Removes the settings for the given resource
   */
  remove(resource: string) {
    this._cache.delete(resource);
  }

  /**
   * Resets the settings
   */
  reset(settings: S) {
    if (this._server.canConfigure) {
      // Reset all cached document settings
      this._cache.clear();
    } else {
      this._defaults = <S>(settings || this._defaults);
    }
  }

  /**
   * Sets the settings for the given resource
   */
  set(resource: string, result: Thenable<S>) {
    this._cache.set(resource, result);
  }
}