import type { 
  IdentifierToken,
  DataToken,
  ObjectToken,
  PropertyToken,
  ComponentToken,
  ImportToken,
  ScriptToken, 
  StyleToken, 
  MarkupToken, 
  MarkupChildToken,
  UnknownMarkupToken,
  SymbolComplete as Symbol,
  LiteralToken
} from './types';

import ts from 'typescript';
import DataParser from './DataParser';
import SymbolParser from './SymbolParser';
import GenericLexer from './GenericLexer';
import Exception from './ParserException';
import definitions, { data as anyData } from './definitions';

const lexer = new GenericLexer();
Object.keys(definitions).forEach(key => {
  lexer.define(key, definitions[key]);
});

export default class TempleParser {
  /**
   * Parses the given code
   */
  public static parse(code: string) {
    const parser = new TempleParser(code);
    return parser.parse();
  }

  //the data parser
  protected dataParser = lexer;
  //the symbol parser
  protected symbolParser: SymbolParser;
  //the code to parse
  protected code: string;
  //the stack of open tags
  protected stack: UnknownMarkupToken[] = [];
  //the markup tokens
  protected markup: MarkupToken[] = [];
  //the script imports
  protected imports: ImportToken[] = [];
  //the import components
  protected components: ComponentToken[] = [];
  //the scripts
  protected scripts: ScriptToken[] = [];
  //the styles
  protected styles: StyleToken[] = [];
  //whether if we are currently parsing a resource
  protected resource = false;

  /**
   * Sets the code, setup the symbol parser
   */
  constructor(code: string) {
    this.code = code;
    this.symbolParser = new SymbolParser(code, this.walk.bind(this));
  }

  /**
   * Parses the code, returns the results
   */
  public parse() {
    this.symbolParser.parse();
    return {
      imports: this.imports,
      components: this.components,
      scripts: this.scripts,
      styles: this.styles,
      markup: this.markup
    };
  }

  /**
   * Walks through the symbols found and maps to markup tokens
   */
  public walk(symbol: Symbol) {
    //only take in <> symbols
    if (symbol.type !== '<>') {
      return;
    }

    const name = this.name(symbol);
    const mode = this.mode(symbol);

    //ignore content inside script and style tags
    if (this.resource 
      && name !== 'script' 
      && name !== 'style' 
      && mode !== 'close'
    ) {
      return;
    }
    //let the modes handle the symbols
    switch (mode) {
      case 'open':
        this.open(symbol);
        break;
      case 'close':
        this.close(symbol);
        break;
      case 'self':
        this.self(symbol);
        break;
    }
  }

  /**
   * Parses the attributes of a tag
   */
  protected attributes(tag: Symbol): ObjectToken|undefined {
    //we are going to be using a different parser for the attributes
    //so we need to update the start and end of each node with the 
    //current tag's offset
    const offset = tag.start;
    //this is where we are going to store the attributes
    const properties: PropertyToken[] = [];
    //load the code into the lexer
    this.dataParser.load(tag.value as string);
    //<
    this.dataParser.expect('<');
    this.dataParser.optional('whitespace');
    //<div
    this.dataParser.expect('AttributeIdentifier');
    while (this.dataParser.optional('whitespace')) {
      //<div class
      const name = this.dataParser.optional<IdentifierToken>('AttributeIdentifier');
      if (!name) {
        //<div {
        const open = this.dataParser.optional('{');
        if (open) {
          //<div {href
          const identifier = this.dataParser.optional<IdentifierToken>('Identifier');
          if (identifier) {
            //<div {href}
            const close = this.dataParser.expect('}');
            //add this attribute to the properties
            //where the value is an identifier
            properties.push({
              type: 'Property',
              kind: 'init',
              start: open.start,
              end: close.end,
              key: identifier,
              value: identifier,
              spread: false,
              method: false,
              shorthand: false,
              computed: true
            });
            continue;
          } else {
            //<div {...
            const spread = this.dataParser.optional<IdentifierToken>('...');
            if (spread) {
              //<div {...foo
              const identifier = this.dataParser.expect<IdentifierToken>('Identifier');
              //<div {...foo}
              const close = this.dataParser.expect('}');
              //add this attribute to the properties
              //where the value is a spread identifier
              properties.push({
                type: 'Property',
                kind: 'init',
                start: open.start,
                end: close.end,
                key: identifier,
                value: identifier,
                spread: true,
                method: false,
                shorthand: false,
                computed: true
              });
              continue;
            }
          }
        }
        break;
      }
      //add the offset to the start and end
      name.start += offset;
      name.end += offset;
      this.dataParser.optional('whitespace');
      //<div class=
      const hasValue = this.dataParser.optional('=');
      if (hasValue) {
        this.dataParser.optional('whitespace');
        //<div class="value"
        const value = this.dataParser.expect<DataToken>([ ...anyData, 'InlineScript' ]);
        //add the offset to the start and end
        value.start += offset;
        value.end += offset;
        //add this attribute to the properties
        properties.push({
          type: 'Property',
          kind: 'init',
          start: name.start,
          end: value.end,
          key: name,
          value: value,
          spread: false,
          method: false,
          shorthand: false,
          computed: value.type === 'Identifier' || value.type === 'ProgramExpression'
        });
      //<div show
      } else {
        //add this attribute to the properties
        //where the value is literal true
        properties.push({
          type: 'Property',
          kind: 'init',
          start: name.start,
          end: name.end,
          key: name,
          value: {
            type: 'Literal',
            start: name.start,
            end: name.end,
            value: true,
            raw: 'true'
          },
          spread: false,
          method: false,
          shorthand: false,
          computed: false
        });
      }
    }
    //return the object expression if we have any properties
    return properties.length > 0 ? {
      type: 'ObjectExpression',
      start: tag.start,
      end: lexer.index + offset,
      properties
    } : undefined;
  }

  /**
   * Removes the given tag from the stack and adds it to the markup
   */
  protected close(symbol: Symbol) {
    //get the name and type of the tag
    const name = this.name(symbol);
    const type = this.type(symbol);
    //pop the last open tag from the stack
    const open = this.stack.pop();
    //if there is no matching open tag
    if (!open) {
      throw Exception
        .for('Could not find opening tag for %s', name)
        .withPosition(symbol.start, symbol.end);
    }
    //if we are currently parsing a script tag
    if (type === 'ProgramExpression') {
      //if the open tag is not a script tag
      if (open.type !== 'ProgramExpression') {
        throw Exception
          .for('Mismatched closing tag %s', name)
          .withPosition(symbol.start, symbol.end);
      }
      //parse the script 
      const source = this.substring(open.end, symbol.start);
      // Parse the source code into an AST
      const sourceFile = ts.createSourceFile(
        // Arbitrary file name
        'tmp.ts', 
        source,
        // ECMAScript target
        ts.ScriptTarget.ESNext, 
        false // Set parent pointers
      );
      let offsetStart = 0;
      sourceFile.statements.forEach(statement => {
        //get import clause
        if (!ts.isImportDeclaration(statement)) {
          return;
        }
        const clause = statement.importClause as ts.ImportClause;
        //get export default clause
        const name: LiteralToken|undefined = clause?.name ? {
          type: 'Literal',
          start: symbol.start + clause.name.getStart(sourceFile),
          end: symbol.start + clause.name.getEnd(),
          value: clause.name.getText(sourceFile),
          raw: `'${clause.name.getText(sourceFile)}'`
        }: undefined
        //get the from clause
        const sourceText = statement.moduleSpecifier.getText(sourceFile);
        const source: LiteralToken = {
          type: 'Literal',
          start: symbol.start + statement.moduleSpecifier.getStart(sourceFile) + 1,
          end: symbol.start + statement.moduleSpecifier.getEnd() - 1,
          value: sourceText.substring(1, sourceText.length - 1),
          raw: `'${sourceText.substring(1, sourceText.length - 1)}'`
        };
        //get name bindings
        const names: LiteralToken[] = [];
        //loop through the named bindings
        clause?.namedBindings?.forEachChild(node => {
          //get the name of the import
          const name = node.getText(sourceFile);
          //add the name to the names
          names.push({
            type: 'Literal',
            start: symbol.end + node.getStart(sourceFile),
            end: symbol.end + node.getEnd(),
            value: name,
            raw: `'${name}'`
          });
        });
        //create the import token
        const token: ImportToken = {
          type: 'ImportDeclaration',
          start: symbol.end + statement.getStart(sourceFile),
          end: symbol.end + statement.getEnd(),
          typeOnly: statement.importClause?.isTypeOnly === true,
          source
        };
        //if we have a default name
        if (name) {
          token.default = name;
        }
        //if we have names
        if (names.length > 0) {
          token.names = names;
        }
        //add the import to the imports
        this.imports.push(token);
        //update the offset
        offsetStart = statement.getEnd();
      });
      //create the script token
      const script: ScriptToken = {
        type: 'ProgramExpression',
        start: open.end,
        end: symbol.start,
        attributes: open.attributes,
        source: this.substring(open.end + offsetStart, symbol.start).trim()
      };
      //add scripts to the scripts
      this.scripts.push(script);
      //we are no longer parsing a resource
      this.resource = false;
      return;
    //if we are currently parsing a style tag
    } else if (type === 'StyleExpression') {
      //if the open tag is not a style tag
      if (open.type !== 'StyleExpression') {
        throw Exception
          .for('Mismatched closing tag %s', name)
          .withPosition(symbol.start, symbol.end);
      }
      //add the style to the styles
      this.styles.push({
        type: 'StyleExpression',
        start: open.start,
        end: symbol.end,
        attributes: open.attributes,
        source: this.symbolParser.substring(open.end, symbol.start)
      });
      //we are no longer parsing a resource
      this.resource = false;
      return;
    }
    //This is a normal HTML tag....
    //if the open tag is not the same as the close tag
    if (open.name !== name) {
      throw Exception
        .for('Mismatched closing tag %s', name)
        .withPosition(symbol.start, symbol.end);
    }
    //create the markup token
    const token: MarkupToken = {
      type: 'MarkupExpression',
      name: name,
      kind: 'block',
      start: open.start,
      end: symbol.end,
      attributes: open.attributes,
      children: open.children
    }

    //if the tag has children
    if (token.children && token.children.length > 0) {
      //find the gap between the last child end and the close tag start
      const last = token.children[token.children.length - 1];
      if (last.end < symbol.start) {
        //add it as a text node
        this.text(token.children, last.end, symbol.start);
      }
    //the tag has no children
    } else {
      //find the gap between the open tag end and the close tag start
      if (open.end < symbol.start) {
        //add it as a text node
        token.children = [];
        this.text(token.children, open.end, symbol.start);
      }
    }

    //if we have a parent
    if (this.stack.length > 0) {
      //get the parent
      const parent = this.stack[this.stack.length - 1];
      //if the parent has no children
      if (!parent.children || parent.children.length === 0) {
        //find the gap between the parent and the open tag
        parent.children = [];
        if (parent.end < open.start) {
          //and add it as a text node
          this.text(parent.children, parent.end, open.start);
        }
      //if the parent has children
      } else if (parent.children.length > 0) {
        //find the gap between the last child and the open tag
        const last = parent.children[parent.children.length - 1];
        if (last.end < open.start) {
          //and add it as a text node
          this.text(parent.children, last.end, open.start);
        }
      }
      //finally, add the token to the parent's children
      parent.children.push(token);
      return;
    }
    //We have no parent
    //if we have any markup tokens
    if (this.markup.length > 0) {
      //find the gap between the last markup token and the open tag
      const last = this.markup[this.markup.length - 1];
      if (last.end < open.start) {
        //and add it as a text node
        this.text(this.markup, last.end, open.start);
      }
    } 
    //finally, add the token to the markup
    this.markup.push(token);
  }

  /**
   * Returns the mode of the given symbol
   */
  protected mode(symbol: Symbol) {
    const value = this.substring(symbol.start, symbol.end);
    return value.endsWith('/>') 
      ? 'self' : value.startsWith('</') 
      ? 'close' : 'open'
  }

  /**
   * Returns the name of the given symbol
   */
  protected name(symbol: Symbol) {
    const children = symbol.children as Symbol[];
    const name = children[0].value?.split(' ')[0] || '';
    return name.startsWith('/') ? name.substring(1) : name;
  }
  
  /**
   * Adds the given tag to the stack
   */
  protected open(symbol: Symbol) {
    //get the name and type
    const name = this.name(symbol);
    const type = this.type(symbol);
    //get the attributes
    const attributes = this.attributes(symbol);
    //if this is a script or style tag
    if (type === 'ProgramExpression' || type === 'StyleExpression') {
      //turn the resource mode on
      this.resource = true;
    }
    //add the tag to the stack
    this.stack.push(type === 'ProgramExpression' ? {
      type: 'ProgramExpression',
      start: symbol.start,
      end: symbol.end,
      attributes: attributes
    }: type === 'StyleExpression' ? {
      type: 'StyleExpression',
      start: symbol.start,
      end: symbol.end,
      attributes: attributes
    }: {
      type: 'MarkupExpression',
      name: name,
      start: symbol.start,
      end: symbol.end,
      attributes: attributes,
      children: []
    });
  }

  /**
   * Parses a self closing tag
   */
  protected self(symbol: Symbol) {
    //get the name and type
    const name = this.name(symbol);
    const type = this.type(symbol);
    //get the attributes
    const attributes = this.attributes(symbol);
    //if this is an import tag
    if (type === 'ImportDeclaration') {
      //if we have attributes
      if (attributes) {
        //map the attributes to an actual object
        const config = DataParser.object(attributes);
        //if this is an import tag and there's an href
        if (config.rel === 'import' && config.href) {
          //add the import to the imports
          this.components.push({
            type: 'ComponentDeclaration',
            start: symbol.start,
            end: symbol.end,
            source: {
              type: 'Literal',
              start: attributes.start,
              end: attributes.end,
              value: config.href,
              raw: `'${config.href}'`
            }
          });
          return;
        }
      }
    }
    //this is a normal self closing tag (no children)
    const markup: MarkupToken = {
      type: 'MarkupExpression',
      name: name,
      kind: 'inline',
      attributes: attributes,
      start: symbol.start,
      end: symbol.end
    };
    //if we have a parent
    if (this.stack.length > 0) {
      //get the parent
      const parent = this.stack[this.stack.length - 1];
      //if the parent has no children
      if (!parent.children || parent.children.length === 0) {
        //find the gap between the parent and the self closing tag
        parent.children = [];
        if (parent.end < symbol.start) {
          //and add it as a text node
          this.text(parent.children, parent.end, symbol.start);
        }
      //there are children
      } else if (parent.children.length > 0) {
        //find the gap between the last child and the self closing tag
        const last = parent.children[parent.children.length - 1];
        if (last.end < symbol.start) {
          //and add it as a text node
          this.text(parent.children, last.end, symbol.start);
        }
      }
      //finally, add the markup to the parent's children
      parent.children.push(markup);
      return;
    }
    //We have no parent
    //if we have any markup tokens
    if (this.markup.length > 0) {
      //find the gap between the last markup token and the self closing tag
      const last = this.markup[this.markup.length - 1];
      if (last.end < symbol.start) {
        this.text(this.markup, last.end, symbol.start);
      }
    //there are no markup tokens
    //if there is a gap between the start and the self closing tag
    } else if (symbol.start > 0) {
      //add it as a text node
      this.text(this.markup, 0, symbol.start);
    }
    //finally, add the markup to the markup
    this.markup.push(markup);
  }

  /**
   * Returns a substring of the code
   */
  protected substring(start: number, end: number) {
    return this.code.substring(start, end);
  }

  /**
   * Adds a text node to the given children
   */
  protected text(children: MarkupChildToken[], start: number, end: number) {
    //find the symbols in the text
    const symbols = this.symbolParser.find({ min: start, max: end });
    //if there are symbols in the text
    if (symbols.length > 0) {
      //loop through the symbols
      for (const symbol of symbols) {
        //if the symbol is a text node
        if (symbol.type === '#text') {
          //push literal token
          children.push({
            type: 'Literal',
            start: symbol.start,
            end: symbol.end,
            value: symbol.value,
            raw: `'${symbol.value?.replace(/'/g, "\\'")}'`
          });
        //if the symbol is a script node
        } else if (symbol.type === '{}') {
          //push program expression token
          children.push({
            type: 'ProgramExpression',
            start: symbol.start + 1,
            end: symbol.end - 1,
            source: this.substring(
              symbol.start + 1, 
              symbol.end - 1
            )
          });
        }
      }
      //do nothing else
      return;
    }
    //get the text value
    const value = this.substring(start, end);
    //there are no symbols in the text
    children.push({
      type: 'Literal',
      start: start,
      end: end,
      value: value,
      raw: `'${value.replace(/'/g, "\\'")}'`
    });
  }

  /**
   * Returns the type of the given symbol
   */
  protected type(symbol: Symbol) {
    const name = this.name(symbol);
    return name === 'script' ? 'ProgramExpression'
      : name === 'style' ? 'StyleExpression' 
      : name === 'link' ? 'ImportDeclaration'
      : 'MarkupExpression';
  }
}