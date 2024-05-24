import { SymbolComplete, SymbolPartial, Walker } from './types';
import Exception from './ParserException';

export default class SymbolParser {
  //symbols to split the code by
  static symbols = [ '<>', '{}', "''", '""', '``', '[]', '()' ];
  
  /**
   * Parse the code into symbols
   */
  static parse(code: string, walker: Walker = () => {}) {
    const parser = new SymbolParser(code, walker);
    return parser.parse();
  }

  // current index
  protected current = 0;
  // stack of open symbols
  protected stack: SymbolPartial[] = [];
  // processed results
  protected results: SymbolComplete[] = [];
  // the source code
  protected code: string;
  // the walker function
  protected walker: Walker;

  /**
   * Returns the incomplete results
   */
  public get buffer() {
    return this.results;
  }

  /**
   * Returns the current character
   */
  public get char() {
    return this.code[this.current];
  }

  /**
   * Returns the current index
   */
  public get index() {
    return this.current;
  }

  /**
   * Returns the source code
   */
  public get source() {
    return this.code;
  }

  /**
   * Returns the processed results
   */
  public get tree() {
    return this.results;
  }

  /**
   * Returns true if the current character is in an open quote
   */
  protected get _inOpenQuote() {
    return this.stack.find(
      stack => stack.type === '""' 
        || stack.type === "''"
        || stack.type === '``'
    )
  }

  /**
   * Returns true if the current character is in an open tag
   */
  protected get _inOpenTag() {
    return this._symbol === '<>' && this.stack.find(
      stack => stack.type === '<>'
    );
  }

  /**
   * Returns true if the current character is a backslash (to escape the next character)
   */
  protected get _isBackSlash() {
    return this.code[this.current - 1] === '\\';
  }

  /**
   * Returns the last result item
   */
  protected get _lastResult() {
    return this.results[this.results.length - 1];
  }

  /**
   * Returns the last stack item
   */
  protected get _lastStack() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Returns the last stack child
   */
  protected get _lastStackChild() {
    return this._lastStack.children[this._lastStack.children.length - 1] || null;
  }

  /**
   * Returns the symbol type
   */
  protected get _symbol() {
    return SymbolParser.symbols.find(
      type => type.indexOf(this.char) >= 0
    );
  }

  /**
   * Add the code to the parser
   */
  public constructor(code: string, walker: Walker) {
    this.code = code;
    this.walker = walker;
  }

  /**
   * Returns all symbols that match the given criteria
   */
  public find({ min, max, symbol }: { 
    min?: number, 
    max?: number, 
    symbol?: string 
  }) {
    return this.results.filter(
      result => (!min || result.start >= min) 
        && (!max || result.end <= max) 
        && (!symbol || result.type === symbol)
    );
  }

  /**
   * Main parsing function
   */
  public parse(): SymbolComplete[] {
    for(; this.current < this.code.length; this.current++) {
      // if we have a symbol
      if (this._symbol) {
        // if it is an opening symbol
        if (this.char === this._symbol[0] && (
          // if there is no last stack or the last stack is not the same symbol
          !this._lastStack || this._lastStack.type[1] !== this.char
        )) {
          // special cases for open symbols
          if (!this._inOpenTag && !this._inOpenQuote && !this._isBackSlash) {
            // push the symbol to the stack
            this.stack.push({ 
              type: this._symbol, 
              start: this.current, 
              children: [] 
            });
          }
        // if it is a closing symbol
        } else if (this.char === this._symbol[1] 
          // if there is a last stack and the last stack is the same symbol
          && this._lastStack 
          && this._lastStack.type[1] === this.char 
          // if it is not a backslash
          && !this._isBackSlash
        ) {
          // if the symbol is the same as the last stack
          if (this._lastStack.type === this._symbol) {
            // pop the last stack
            const match = this.stack.pop() as SymbolPartial;
            // construct the node
            const node = { 
              type: match.type, 
              start: match.start, 
              end: this.current + 1, 
              value: this.substring(match.start, this.current + 1), 
              children: match.children 
            };
            // if there are children
            if (node.children.length > 0) {
              // get the last child of the node children
              const lastChild = node.children[node.children.length - 1];
              // if there is a gap between the last child and the node
              if ((node.end - lastChild.end) > 1) {
                // add the gap as a text node
                this._text(node.children, lastChild.end, node.end - 1);
              }
            // if there is a gap between the start and the end
            } else if ((node.end - node.start) > 1) {
              // add the gap as a text node
              this._text(node.children, node.start + 1, node.end - 1);
            }
            // if there are still open symbols
            if (this.stack.length > 0) {
              //get the last stack and the last child
              const lastStack = this._lastStack;
              const lastChild = this._lastStackChild;
              // if there is a gap between the last child and the node
              if (lastChild && lastChild.end < node.start) {
                // add the gap as a text node
                this._text(lastStack.children, lastChild.end, node.start);
              // if there is a gap between the start and the node
              } else if (!lastChild && (lastStack.start + 1) < node.start) {
                // add the gap as a text node
                this._text(lastStack.children, lastStack.start + 1, node.start);
              }
              // add the node to the last stack children
              lastStack.children.push(node);
            } else {
              // if there are results
              if (this.results.length > 0) {
                // get the last result
                const last = this._lastResult;
                // if there is a gap between the last result and the node
                if (last.end < node.start) {
                  // add the gap as a text node
                  this._text(this.results, last.end, node.start);
                }
              }
              // add the node to the results
              this.walker(node, this);
              this.results.push(node);
            }
          }
        }
      }
    }
    // if there are still open symbols
    if (this.stack.length > 0) {
      // throw an exception
      throw Exception
        .for(
          'Could not find closing symbol for %s', 
          this.stack[0].type[0]
        )
        .withPosition(
          this.stack[0].start, 
          this.stack[0].start + 10
        );
    }
    // return the results
    return this.results;
  }

  /**
   * Returns a substring of the source code
   */
  public substring(start: number, end: number) {
    return this.code.substring(start, end);
  }

  /**
   * Adds a text node to the given children
   */
  protected _text(children: SymbolComplete[], start: number, end: number) {
    children.push({
      type: '#text',
      start: start,
      end: end,
      value: this.substring(start, end)
    });
  }
}