export default class DocumentParser {
  // markup definitions
  public static readonly definitions = {
    open: /^<([a-z][a-z0-9\-_]*)(\n|\s|\/|>)/ig,
    close: /^<\/([a-z][a-z0-9\-_]*)>/ig
  };
  // markup symbols
  public static readonly symbols = {
    markup: '<>',
    program: '{}',
    quotes: ["'", '"', '`']
  }
  // the source code
  protected _code: string;

  /**
   * Add the code to the parser
   */
  public constructor(code: string) {
    this._code = code;
  }

  /**
   * Parse text and yields
   * whenever a program is found
   * and ignore everything else.
   */
  public *program(start: number, end?: number) {
    //determine if end is valid
    const validEnd = typeof end === 'number' 
      && end > start 
      && end < this._code.length;
    //make sure there is an end
    end = validEnd ? end as number : this._code.length;
    for(let index = start; index < end; index++) {
      //we are only interested in open program tags
      if (this._code[index] !== DocumentParser.symbols.program[0]) {
        continue;
      }

      //parse the program and move the index
      const end = this._program(index);

      //if program was parsed
      if (end > index) {
        //yield results (including {})
        yield { start: index, end: end + 1 };
        //move the index
        index = end;
      }
    }
  }

  /**
   * Parse a code document and yields
   * whenever a tag is found (open or close)
   * and ignore everything else.
   */
  public *tag(start = 0, end?: number) {
    //determine if end is valid
    const validEnd = typeof end === 'number' 
      && end > start 
      && end < this._code.length;
    //make sure there is an end
    end = validEnd ? end as number : this._code.length;
    for(let index = start; index < end; index++) {
      //get the character
      const char = this._code[index];
      //we are only interested in open markup tags
      if (char !== DocumentParser.symbols.markup[0]) {
        //if we have an open program symbol
        if (char === DocumentParser.symbols.program[0]) {
          //parse the program and move the index
          index = this._program(index);
        } 
        continue;
      }
      //look ahead and check for </close>
      const closed = this._close(index);
      //this will return [ '</em>', 'em' ]
      //if we have a close tag
      if (closed) {
        const end = index + closed[0].length;
        //yield results
        yield { 
          kind: 'close',
          name: closed[1],
          start: index, 
          end: end
        };
        //move the index
        index = end;
        continue;
      }
      //look ahead and check for <open>
      const opened = this._open(index);
      if (opened) {
        //parse the markup
        const end = this._markup(index);
        const self = this._code[end - 1] === '/';
        //if markup was parsed
        if (end > index) {
          //yield results
          yield { 
            kind: self ? 'self': 'open',
            name: opened[1],
            start: index, 
            end: end + 1 
          };
          //move the index
          index = end;
        }
      }
    }
  }

  /**
   * Get a substring of the code
   */
  public substring(start: number, end?: number) {
    return this._code.substring(start, end);
  }

  /**
   * Find the closing markup symbol
   */
  protected _close(start: number) {
    const close = Array.from(
      this.substring(start).matchAll(
        DocumentParser.definitions.close
      )
    );
    return close.length > 0 ? close[0] : null;
  }

  /**
   * Parse a valid markup and find the closing tag symbol
   */
  protected _markup(start: number) {
    //continue parsing the code
    for(let index = start; index < this._code.length; index++) {
      //get the current character
      const char = this._code[index];
      //if we have a closing markup symbol
      if (char === DocumentParser.symbols.markup[1]) {
        //this is the one we are looking for
        return index;
      //if we have an open program symbol
      } else if (char === DocumentParser.symbols.program[0]) {
        //parse the program and move the index
        index = this._program(index);
      //if we have a quote symbol
      } else if (DocumentParser.symbols.quotes.includes(char)) {
        //parse the string and move the index
        index = this._quote(index, char);
      }
    }
    //reset the index
    return start;
  }

  /**
   * Find the opening markup symbol
   */
  protected _open(start: number) {
    const open = Array.from(
      this.substring(start).matchAll(
        DocumentParser.definitions.open
      )
    );

    return open.length > 0 ? open[0] : null;
  }

  /**
   * Parse a program and find the closing program symbol
   */
  protected _program(start: number) {
    //continue parsing the code
    for(let index = start; index < this._code.length; index++) {
      //get the current character
      const char = this._code[index];
      //if we have a quote symbol
      if (DocumentParser.symbols.quotes.includes(char)) {
        //parse the string and move the index
        index = this._quote(index, char);
      }
      //check for backslash
      const backslash = this._code[index - 1] === '\\';
      //if we have a closing program symbol
      if (char === DocumentParser.symbols.program[1] && !backslash) {
        //this is the one we are looking for
        return index;
      }
    }
    //reset the index
    return start;
  }

  /**
   * Parse a string and find the closing quote symbol
   */
  protected _quote(start: number, quote: string) {
    //continue parsing the code
    for(let index = start + 1; index < this._code.length; index++) {
      //check for backslash
      const backslash = this._code[index - 1] === '\\';
      //if we have a closing quote symbol
      if (this._code[index] === quote && !backslash) {
        //this is the one we are looking for
        return index;
      }
    }
    //reset the index
    return start;
  }
}