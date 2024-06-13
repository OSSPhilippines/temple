import { Parser, Reader, Token, Definition } from './types';

import Exception from './ParserException';

export default class GenericLexer implements Parser {
  //the code to parse
  protected _code = '';
  //the current index
  protected _index = 0;
  //a collection of definitions
  protected _dictionary: Record<string, Definition> = {};

  /**
   * Returns the shallow copy of the dictionary
   */
  get code() {
    return this._code;
  }

  /**
   * Returns the shallow copy of the dictionary
   */
  get dictionary() {
    return { ...this._dictionary };
  }

  /**
   * Returns the current index
   */
  get index() {
    return this._index;
  }

  /**
   * Clones the lexer at it's exact state
   */
  public clone() {
    const lexer = new GenericLexer();
    lexer.load(this._code, this._index);
    for (const key in this._dictionary) {
      lexer.define(key, this._dictionary[key].reader);
    }
    return lexer;
  }

  /**
   * Makes a new definition
   */
  public define(key: string, reader: Reader) {
    this._dictionary[key] = { key, reader };
  }

  /**
   * Returns a token that matches any of the given names
   */
  public expect<T = Token>(keys: string|string[]) {
    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    //get definition
    const definitions = keys.map(key => {
      const reader = this.get(key);
      if (!reader) {
        throw Exception.for('Unknown definition %s', key);
      }
      return reader;
    }).filter(Boolean);
    //throw if no definition
    if (!definitions.length) {
      throw Exception.for(
        'Unknown definitions %s', 
        keys.join(', ')
      );
    }
    //get match (sorted by names defined above)
    const match = this.match(this._index, keys);
    //if no match
    if (!match) {
      //throw exception
      if (this._code[this._index + 10]) {
        throw Exception.for(
          'Unexpected %s ... expecting %s', 
          this._code
            .substring(this._index, this._index + 10)
            .replace(/[\n\r]/g, ' ')
            .trim(),
            keys.join(' or ')
        ).withPosition(this._index, this.nextSpace());
      } else {
        throw Exception.for(
          'Unexpected %s expecting %s', 
          this._code.substring(this._index, this._index + 10),
          keys.join(' or ')
        ).withPosition(this._index, this.nextSpace());
      }
    }
    //fast forward index
    this._index = match.end;
    return match as T;
  }

  /**
   * Finds the next possible token.
   */
  public find(keys: string|string[]) {
    if (!Array.isArray(keys)) {
      keys = [keys];
    }

    const start = this._index;
    let token: Token|undefined = undefined;
    while(!token && this._index < this._code.length) {
      token = this.optional(keys);
      if (!token) {
        this._index++;
      }
    }

    if (!token) {
      this._index = start;
    }
    return token;
  }

  /**
   * Returns the test for a given definition
   */
  public get(key: string) {
    return this._dictionary[key];
  }

  /**
   * Loads the code
   */
  public load(code: string, index = 0) {
    this._code = code;
    this._index = index;
    return this;
  }

  /**
   * Returns the first match from a list of definitions
   */
  public match(start: number, keys?: string[]) {
    //if no names, get all names
    keys = keys || Object.keys(this._dictionary);
    //loop through all the keys
    for (let i = 0; i < keys.length; i++) {
      if (!this._dictionary[keys[i]]) {
        throw Exception.for('Unknown definition %s', keys[i]);
      }
      const results = this._dictionary[keys[i]].reader(this);
      //end is greater than start
      if (results && results.end > start) {
        //yield results
        return results;
      }
      //if no results, try the next definition...
    }
    //no definitions matched
    return null;
  }

  /**
   * Tests to see if the next set of characters match the given names
   */
  public next(names: string|string[]) {
    const start = this._index;
    try {
      this.expect(names);
      this._index = start;
      return true;
    } catch (error) {
      this._index = start;
      return false;
    }
  }

  /**
   * Possible returns a token that matches any of the given names 
   */
  public optional<T = Token>(names: string|string[]) {
    const start = this._index;
    try {
      return this.expect<T>(names);
    } catch (error) {
      this._index = start;
      return undefined;
    }
  }

  /**
   * Allows to read a substring of the code
   */
  public substring(start: number, end: number) {
    return this._code.substring(start, end);
  }

  /**
   * Finds the next space (for language server)
   */
  public nextSpace() {
    const index = this._code.indexOf(' ', this._index);
    return index === -1 ? this._code.length : index;
  }
}