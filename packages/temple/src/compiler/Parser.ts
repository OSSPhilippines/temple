//types
import type { 
  Data,
  TokenReferences,
  DataToken,
  ArrayToken,
  ObjectToken, 
  LiteralToken, 
  IdentifierToken
} from '../types';

import Exception from '../Exception';

export default class Parser {
  // markup symbols
  public static readonly symbols = {
    markup: '<>',
    program: '{}',
    quotes: ["'", '"', '`']
  }

  /**
   * Compiles an array tree into an actual array
   */
  static array<T = Data[]>(
    token: ArrayToken, 
    references: TokenReferences = false
  ) {
    return token.elements.map(
      element => this.data(element, references)
    ) as T;
  }

  /**
   * Compiles an array, object or scalar tree into the actual value
   */
  static data(
    token: DataToken, 
    references: TokenReferences = false
  ): Data {
    if (token.type === 'ObjectExpression') {
      return this.object(token, references);
    } else if (token.type === 'ArrayExpression') {
      return this.array(token, references);
    } else if (token.type === 'Literal') {
      return this.literal(token);
    } else if (token.type === 'Identifier') {
      return this.identifier(token, references);
    }
    throw Exception.for('Invalid data token type');
  }

  /**
   * Compiles an identifier into the actual value it's referencing
   */
  static identifier(
    token: IdentifierToken, 
    references: TokenReferences = false
  ) {
    if (references && token.name in references) {
      return references[token.name];
    } else if (references === false) {
      return '${' + token.name + '}';
    }

    throw Exception.for(`Unknown reference ${token.name}`);
  }

  /**
   * Compiles a literal into the actual value
   */
  static literal(token: LiteralToken) {
    return token.value;
  }

  /**
   * Compiles an object tree into the actual object
   */
  static object<T = Data>(
    token: ObjectToken, 
    references: TokenReferences = false
  ) {
    return Object.fromEntries(token.properties.map(property => [ 
      property.key.name, 
      this.data(property.value, references) 
    ])) as Record<string, T>;
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
      if (this._code[index] !== Parser.symbols.program[0]) {
        continue;
      }

      //parse the program and move the index
      const end = this._findProgram(index);

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
   * Get a substring of the code
   */
  public substring(start: number, end?: number) {
    return this._code.substring(start, end);
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
      //we are only interested in open markup tags,
      //so if this char is not a markup symbol (<)
      if (char !== Parser.symbols.markup[0]) {
        //if we have an open program symbol ({)
        if (char === Parser.symbols.program[0]) {
          //parse the program and move the index (^{)
          index = this._findProgram(index);
        }
        continue;
      }
      //we found an open markup symbol (<) now
      //look ahead and see if its a </close> tag
      const closed = this._findCloseTag(index);
      //this will return [ '</em>', 'em' ]
      //if it is a close tag
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
        index = end - 1;
        continue;
      }
      //look ahead and see if its a <open> or <self /> tag
      //this will return [ '<em>', 'em' ] or [ '<em />', 'em' ]
      const opened = this._findOpenTag(index);
      if (opened) {
        //parse the markup (^<) and determine where it ends (<open^>)
        const end = this._findMarkup(index);
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
          //SPECIAL CASE: for <script> can have tags in here that can be 
          // misinterpretted as actual tags vs in string, so we need to 
          // ignore everthing in between it and make it function as a 
          // ProgramExpression
          if (opened[1] === 'script' && !self) {
            const end = this._findScript(index + 1);
            if (end > index) {
              //yield results
              yield { 
                kind: 'close',
                name: opened[1],
                start: end - 8,
                end: end + 1
              };
              //move the index
              index = end;
            }
          }
          continue;
        }
      }
    }
  }

  /**
   * Find the closing markup symbol
   */
  protected _findCloseTag(start: number) {
    const close = Array.from(
      this.substring(start).matchAll(
        /^<\/([a-z][a-z0-9\-_]*)>/ig
      )
    );
    return close.length > 0 ? close[0] : null;
  }

  /**
   * Parse a valid markup and find the closing tag symbol
   */
  protected _findMarkup(start: number) {
    //continue parsing the code
    for(let index = start; index < this._code.length; index++) {
      //get the current character
      const char = this._code[index];
      //if we have a closing markup symbol (>)
      if (char === Parser.symbols.markup[1]) {
        //this is the one we are looking for
        return index;
      //if we have an open program symbol (^{)
      } else if (char === Parser.symbols.program[0]) {
        //parse the program and move the index (^})
        index = this._findProgram(index);
        continue;
      //if we have a quote symbol (^'"`)
      } else if (Parser.symbols.quotes.includes(char)) {
        //parse the string and move the index (^'"`)
        index = this._findQuote(index, char);
      }
    }
    //reset the index
    return start;
  }

  /**
   * Find the opening markup symbol
   */
  protected _findOpenTag(start: number) {
    const open = Array.from(
      this.substring(start).matchAll(
        /^<([a-z][a-z0-9\-_]*)(\n|\s|\/|>)/ig
      )
    );

    return open.length > 0 ? open[0] : null;
  }

  /**
   * Parse a program and find the closing program symbol
   */
  protected _findProgram(start: number) {
    //continue parsing the code
    for(let index = start; index < this._code.length; index++) {
      //get the current character
      const char = this._code[index];
      //if we have a quote symbol
      if (Parser.symbols.quotes.includes(char)) {
        //parse the string and move the index
        //this will move it to ^'"`
        index = this._findQuote(index, char);
        continue;
      }
      //check for backslash
      const backslash = this._code[index - 1] === '\\';
      //if we have a closing program symbol
      if (char === Parser.symbols.program[1] && !backslash) {
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
  protected _findQuote(start: number, quote: string) {
    //continue parsing the code
    for(let index = start + 1; index < this._code.length; index++) {
      //check for backslash
      const backslash = this._code[index - 1] === '\\';
      //if we have a closing quote symbol
      if (this._code[index] === quote && !backslash) {
        //this is the one we are looking for (^'"`)
        return index;
      }
    }
    //reset the index
    return start;
  }

  /**
   * Parse a program and find the closing program symbol
   */
  protected _findScript(start: number) {
    //continue parsing the code
    for(let index = start; index < this._code.length; index++) {
      //get the current character
      const char = this._code[index];
      //if we have a quote symbol
      if (Parser.symbols.quotes.includes(char)) {
        //parse the string and move the index
        //this will move it to ^'"`
        index = this._findQuote(index, char);
        continue;
      }
      //if we have a closing script tag
      if (this._code.substring(index, index + 9) === '</script>') {
        //this is the one we are looking for
        return index + 8;
      }
    }
    //reset the index
    return start;
  }
}