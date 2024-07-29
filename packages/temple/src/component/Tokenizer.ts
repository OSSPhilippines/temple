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
  LiteralToken,
  Token
} from './types';

type TagToken = {
  name: string,
  kind: string,
  start: number,
  end: number
};

import ts from 'typescript';
import Parser from './Parser';
import Lexer from './Lexer';
import Exception from './Exception';
import definitions, { data as anyData } from './definitions';

const lexer = new Lexer();
Object.keys(definitions).forEach(key => {
  lexer.define(key, definitions[key]);
});

export default class Tokenizer {
  /**
   * Parses the given code
   */
  public static tokenize(code: string) {
    const tokenizer = new Tokenizer(code);
    return tokenizer.tokenize();
  }

  //the data parser
  protected _lexer = lexer;
  //the symbol parser
  protected _parser: Parser;
  //the code to parse
  protected _code: string;
  //the stack of open tags
  protected _stack: UnknownMarkupToken[] = [];
  //the markup tokens
  protected _markup: MarkupToken[] = [];
  //the historical tokens
  protected _history: Token[] = [];
  //the script imports
  protected _imports: ImportToken[] = [];
  //the import components
  protected _components: ComponentToken[] = [];
  //the scripts
  protected _scripts: ScriptToken[] = [];
  //the styles
  protected _styles: StyleToken[] = [];
  //whether if we are currently parsing a resource
  protected _resource = false;

  /**
   * Sets the code, setup the symbol parser
   */
  constructor(code: string) {
    this._code = code;
    this._parser = new Parser(code);
  }

  /**
   * Returns a substring of the code
   */
  public substring(start: number, end: number) {
    return this._code.substring(start, end);
  }

  /**
   * Parses the code, returns the token results
   */
  public tokenize() {
    for (const token of this._parser.tag()) {
      const { name, kind } = token;

      if (this._resource 
        && name !== 'script' 
        && name !== 'style' 
        && kind !== 'close'
      ) {
        continue;
      }

      //let the modes handle the symbols
      switch (kind) {
        case 'open':
          this._addTagToStack(token);
          break;
        case 'close':
          this._addBlockTagMarkup(token);
          break;
        case 'self':
          this._addSelfTagToMarkup(token);
          break;
      }
    }
    return {
      imports: this._imports,
      components: this._components,
      scripts: this._scripts,
      styles: this._styles,
      markup: this._markup
    };
  }

  /**
   * Removes the given tag from the stack and adds it to the markup
   * This is used as an option in parse()
   */
  protected _addBlockTagMarkup(tag: TagToken) {
    //get the type of the tag
    const type = this._getExpressionType(tag);
    //pop the last open tag from the stack
    const open = this._stack.pop();
    //if there is no matching open tag
    if (!open) {
      throw Exception
        .for('Could not find opening tag for %s', tag.name)
        .withPosition(tag.start, tag.end);
    }
    //if we are currently parsing a script tag
    if (type === 'ProgramExpression') {
      return this._addScriptToMarkup(tag, open);
    //if we are currently parsing a style tag
    } else if (type === 'StyleExpression') {
      return this._addStyleToMarkup(tag, open);
    }
    return this._addTagToMarkup(tag, open);
  }

  /**
   * Parses a self closing tag
   * This is used as an option in parse()
   */
  protected _addSelfTagToMarkup(tag: TagToken) {
    //get the type
    const type = this._getExpressionType(tag);
    //get the attributes
    const attributes = this._getAttributes(tag);
    //if this is an import tag
    if (type === 'ImportDeclaration') {
      //if we have attributes
      if (attributes) {
        //map the attributes to an actual object
        const config = Parser.object(attributes);
        //if this is an import tag and there's an href
        if (config.rel === 'import' && config.href) {
          //create a component token
          const component: ComponentToken = {
            type: 'ComponentDeclaration',
            start: tag.start,
            end: tag.end,
            attributes: attributes,
            source: {
              type: 'Literal',
              start: attributes.start,
              end: attributes.end,
              value: config.href,
              raw: `'${config.href}'`
            }
          };
          //add the import to the imports
          this._components.push(component);
          //also add it to history
          this._history.push(component)
          return;
        }
      }
    }
    //this is a normal self closing tag (no children)
    const markup: MarkupToken = {
      type: 'MarkupExpression',
      name: tag.name,
      kind: 'inline',
      attributes: attributes,
      start: tag.start,
      end: tag.end
    };
    //if we have a parent
    if (this._stack.length > 0) {
      //get the parent
      const parent = this._stack[this._stack.length - 1];
      //if the parent has no children
      if (!parent.children || parent.children.length === 0) {
        //find the gap between the parent and the self closing tag
        parent.children = [];
        if (parent.end < tag.start) {
          //and add it as a text node
          this._addTextToChildren(parent.children, parent.end, tag.start);
        }
      //there are children
      } else if (parent.children.length > 0) {
        //find the gap between the last child and the self closing tag
        const last = parent.children[parent.children.length - 1];
        if (last.end < tag.start) {
          //and add it as a text node
          this._addTextToChildren(parent.children, last.end, tag.start);
        }
      }
      //finally, add the markup to the parent's children
      parent.children.push(markup);
      return;
    }
    //We have no parent
    //if we have any markup tokens
    if (this._markup.length > 0) {
      //find the gap between the last markup token and the self closing tag
      const last = this._markup[this._markup.length - 1];
      if (last.end < tag.start) {
        this._addTextToChildren(this._markup, last.end, tag.start);
      }
    //there are no markup tokens
    //if there is a gap between the start and the self closing tag
    } else if (tag.start > 0) {
      //add it as a text node
      this._addTextToChildren(this._markup, 0, tag.start);
    }
    //finally, add the markup to the markup
    this._markup.push(markup);
    //also add it to history
    this._history.push(markup);
  }
  
  /**
   * Adds the given tag to the stack
   * This is used as an option in parse()
   */
  protected _addTagToStack(tag: TagToken) {
    const type = this._getExpressionType(tag);
    //get the attributes
    const attributes = this._getAttributes(tag);
    //if this is a script or style tag
    if (type === 'ProgramExpression' || type === 'StyleExpression') {
      //turn the resource mode on
      this._resource = true;
    }
    //add the tag to the stack
    this._stack.push(type === 'ProgramExpression' ? {
      type: 'ProgramExpression',
      start: tag.start,
      end: tag.end,
      attributes: attributes
    }: type === 'StyleExpression' ? {
      type: 'StyleExpression',
      start: tag.start,
      end: tag.end,
      attributes: attributes
    }: {
      type: 'MarkupExpression',
      name: tag.name,
      start: tag.start,
      end: tag.end,
      attributes: attributes,
      children: []
    });
  }

  /**
   * Adds a text node to the given children
   * This is used in _addTagToMarkup() and _addSelfTagToMarkup()
   */
  protected _addTextToChildren(
    children: MarkupChildToken[], 
    start: number, 
    end: number
  ) {
    let last = start;
    //loop through the programs in the text
    for (const program of this._parser.program(start, end)) {
      //if there is text before the program
      if (last < program.start) {
        //push a literal token
        children.push({
          type: 'Literal',
          start: last,
          end: program.start,
          value: this.substring(last, program.start),
          raw: `'${this.substring(last, program.start).replace(/'/g, "\\'")}'`
        });
      }
      //push program expression token
      children.push({
        type: 'ProgramExpression',
        start: program.start + 1,
        end: program.end - 1,
        inline: true,
        source: this.substring(
          program.start + 1, 
          program.end - 1
        )
      });
      last = program.end;
    }
    //if there is text before the last child
    if (last < end) {
      //push a literal token
      children.push({
        type: 'Literal',
        start: last,
        end: end,
        value: this.substring(last, end),
        raw: `'${this.substring(last, end).replace(/'/g, "\\'")}'`
      });
    }
  }

  /**
   * Parses the attributes of a tag
   * This is used whenever we find an open/self tag in
   * _addSelfTagToMarkup() and _addTagToMarkup()
   */
  protected _getAttributes(tag: TagToken): ObjectToken|undefined {
    //we are going to be using a different parser for the attributes
    //so we need to update the start and end of each node with the 
    //current tag's offset
    const offset = tag.start;
    //this is where we are going to store the attributes
    const properties: PropertyToken[] = [];
    const snippet = this.substring(tag.start, tag.end);
    //load the code into the lexer
    this._lexer.load(snippet as string);
    //<
    this._lexer.expect('<');
    this._lexer.optional('whitespace');
    //<div
    this._lexer.expect('AttributeIdentifier');
    while (this._lexer.optional('whitespace')) {
      //<div class
      const name = this._lexer.optional<IdentifierToken>('AttributeIdentifier');
      if (!name) {
        //<div {
        const open = this._lexer.optional('{');
        if (open) {
          //<div {href
          const identifier = this._lexer.optional<IdentifierToken>('Identifier');
          if (identifier) {
            //<div {href}
            const close = this._lexer.expect('}');
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
            const spread = this._lexer.optional<IdentifierToken>('...');
            if (spread) {
              //<div {...foo
              const identifier = this._lexer.expect<IdentifierToken>('Identifier');
              //<div {...foo}
              const close = this._lexer.expect('}');
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
      //<div class=
      const hasValue = this._lexer.optional('=');
      if (hasValue) {
        //<div class="value"
        const value = this._lexer.expect<DataToken>([ ...anyData, 'InlineScript' ]);
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
   * Returns the type of the given symbol
   */
  protected _getExpressionType(token: TagToken) {
    const { name } = token;
    return name === 'script' ? 'ProgramExpression'
      : name === 'style' ? 'StyleExpression' 
      : name === 'link' ? 'ImportDeclaration'
      : 'MarkupExpression';
  }

  /**
   * Removes the given script from the stack and adds it to the markup
   */
  private _addScriptToMarkup(tag: TagToken, open: UnknownMarkupToken) {
    //if the open tag is not a script tag
    if (open.type !== 'ProgramExpression') {
      throw Exception
        .for('Mismatched closing tag %s', tag.name)
        .withPosition(tag.start, tag.end);
    }
    //check for src attribute
    const src = open.attributes?.properties.find(
      property => property.key.name === 'src'
    );
    if (src) {
      //we are no longer parsing a resource
      this._resource = false;
      //ProgramExpression doesn't have a name
      //we need to set this so the markup wont fail
      open.name = 'script';
      //create the markup token
      this._addTagToMarkup(tag, open, false);
      return;
    }
    //parse the script 
    const source = this.substring(open.end, tag.start);
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
        start: tag.start + clause.name.getStart(sourceFile),
        end: tag.start + clause.name.getEnd(),
        value: clause.name.getText(sourceFile),
        raw: `'${clause.name.getText(sourceFile)}'`
      }: undefined
      //get the from clause
      const sourceText = statement.moduleSpecifier.getText(sourceFile);
      const source: LiteralToken = {
        type: 'Literal',
        start: tag.start + statement.moduleSpecifier.getStart(sourceFile) + 1,
        end: tag.start + statement.moduleSpecifier.getEnd() - 1,
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
          start: tag.end + node.getStart(sourceFile),
          end: tag.end + node.getEnd(),
          value: name,
          raw: `'${name}'`
        });
      });
      //create the import token
      const token: ImportToken = {
        type: 'ImportDeclaration',
        start: tag.end + statement.getStart(sourceFile),
        end: tag.end + statement.getEnd(),
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
      this._imports.push(token);
      //update the offset
      offsetStart = statement.getEnd();
    });
    //create the script token
    const script: ScriptToken = {
      type: 'ProgramExpression',
      start: open.end,
      end: tag.start,
      inline: false,
      attributes: open.attributes,
      source: this.substring(open.end + offsetStart, tag.start).trim()
    };
    //add scripts to the scripts
    this._scripts.push(script);
    //also add it to history
    this._history.push(script);
    //we are no longer parsing a resource
    this._resource = false;
  }

  /**
   * Removes the given style from the stack and adds it to the markup
   */
  private _addStyleToMarkup(tag: TagToken, open: UnknownMarkupToken) {
    //if the open tag is not a style tag
    if (open.type !== 'StyleExpression') {
      throw Exception
        .for('Mismatched closing tag %s', tag.name)
        .withPosition(tag.start, tag.end);
    }
    //create a style token
    const styles: StyleToken = {
      type: 'StyleExpression',
      start: open.start,
      end: tag.end,
      attributes: open.attributes,
      source: this._parser.substring(open.end, tag.start)
    };
    //add the style to the styles
    this._styles.push(styles);
    //also add it to history
    this._history.push(styles);
    //we are no longer parsing a resource
    this._resource = false;
  }

  /**
   * Removes the given tag from the stack and adds it to the markup
   */
  private _addTagToMarkup(
    tag: TagToken, 
    open: UnknownMarkupToken, 
    withChildren = true
  ) {
    //This is a normal HTML tag....
    //if the open tag is not the same as the close tag
    if (open.name !== tag.name) {
      throw Exception
        .for('Mismatched closing tag %s', tag.name)
        .withPosition(tag.start, tag.end);
    }
    //create the markup token
    const token: MarkupToken = {
      type: 'MarkupExpression',
      name: tag.name,
      kind: 'block',
      start: open.start,
      end: tag.end,
      attributes: open.attributes
    }

    if (withChildren) {
      token.children = open.children;
    }

    //if the tag has children
    if (token.children && token.children.length > 0) {
      //find the gap between the last child end and the close tag start
      const last = token.children[token.children.length - 1];
      if (last.end < tag.start) {
        //add it as a text node
        this._addTextToChildren(token.children, last.end, tag.start);
      }
    //the tag has no children
    } else {
      //find the gap between the open tag end and the close tag start
      if (open.end < tag.start) {
        //add it as a text node
        token.children = [];
        this._addTextToChildren(token.children, open.end, tag.start);
      }
    }

    //if we have a parent
    if (this._stack.length > 0) {
      //get the parent
      const parent = this._stack[this._stack.length - 1];
      //if the parent has no children
      if (!parent.children || parent.children.length === 0) {
        //find the gap between the parent and the open tag
        parent.children = [];
        if (parent.end < open.start) {
          //and add it as a text node
          this._addTextToChildren(parent.children, parent.end, open.start);
        }
      //if the parent has children
      } else if (parent.children.length > 0) {
        //find the gap between the last child and the open tag
        const last = parent.children[parent.children.length - 1];
        //get the end index
        let end = last.end;
        //if the last type is a script
        if (last.type === 'ProgramExpression') {
          //type update
          const script = last as ScriptToken;
          //} is not included
          //</script> is not included
          end += script.inline ? 1: 9;
        //if the last type is a style
        } else if (last.type === 'StyleExpression') {
          //</style> is not included
          end += 8;
        }
        if (end < open.start) {
          //and add it as a text node
          this._addTextToChildren(parent.children, end, open.start);
        }
      }
      //finally, add the token to the parent's children
      parent.children.push(token);
      return;
    }
    //We have no parent
    //if we have any tokens before this
    if (this._history.length > 0) {
      //find the gap between the last token and the open tag
      const last = this._history[this._history.length - 1];
      //get the end index
      let end = last.end;
      //if the last type is a script
      if (last.type === 'ProgramExpression') {
        //type update
        const script = last as ScriptToken;
        //} is not included
        //</script> is not included
        end += script.inline ? 1: 9;
      //if the last type is a style
      } else if (last.type === 'StyleExpression') {
        //</style> is not included
        end += 8;
      }
      if (end < open.start) {
        //and add it as a text node
        this._addTextToChildren(this._markup, end, open.start);
      }
    } 
    //finally, add the token to the markup
    this._markup.push(token);
    //also add it to history
    this._history.push(token);
  }
}