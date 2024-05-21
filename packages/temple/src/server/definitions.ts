import type { Parser, Reader, Token } from './types';
import type { DataToken, IdentifierToken } from './types';

const definitions: Record<string, Reader> = {
  'whitespace': lexer => scan('_Whitespace', /^\s+/, lexer),
  ':': lexer => scan('_Comma', /^:/, lexer),
  ',': lexer => scan('_Comma', /^,/, lexer),
  '}': lexer => scan('_BraceClose', /^\}/, lexer),
  '{': lexer => scan('_BraceOpen', /^\{/, lexer),
  ']': lexer => scan('_SquareClose', /^\]/, lexer),
  '[': lexer => scan('_SquareOpen', /^\[/, lexer),
  '<': lexer => scan('_TagOpen', /^</, lexer),
  '>': lexer => scan('_TagClose', /^>/, lexer),
  '=': lexer => scan('_Equals', /^=/, lexer),
  '...': lexer => scan('_Equals', /^\.{3}/, lexer),
  'Null': lexer => {
    return lexer.code.substring(lexer.index, lexer.index + 4) === 'null' 
      ? { 
        type: 'Literal', 
        start: lexer.index,
        end: lexer.index + 4,
        value: null,
        raw: 'null'
      } : undefined; 
  },
  'Boolean': lexer => {
    if (lexer.code.substring(lexer.index, lexer.index + 4) === 'true') {
      return { 
        type: 'Literal', 
        start: lexer.index,
        end: lexer.index + 4,
        value: true,
        raw: 'true'
      };
    }
    if (lexer.code.substring(lexer.index, lexer.index + 5) === 'false') {
      return { 
        type: 'Literal', 
        start: lexer.index,
        end: lexer.index + 5,
        value: false,
        raw: 'false'
      };
    }
    return undefined;
  },
  'String': lexer => {
    if (!['"', "'"].includes(lexer.code.charAt(lexer.index))) {
      return undefined;
    }

    const type = lexer.code.charAt(lexer.index);
    const end = lexer.code.indexOf(type, lexer.index + 1) + 1;
    if (end < lexer.index) {
      return undefined;
    }

    const value = lexer.code.slice(lexer.index + 1, end - 1);

    return { 
      type: 'Literal',
      start: lexer.index,
      end,
      value,
      raw: `'${value}'`
    };
  },
  'Float': lexer => {
    const match = lexer.code.slice(lexer.index).match(/^\d+\.\d+/);
    if (match !== null && match.index === 0) {
      const end = lexer.index + match[0].length;
      const value = lexer.code.substring(lexer.index, end);
      return { 
        type: 'Literal', 
        start: lexer.index, 
        end, 
        value: parseFloat(value), 
        raw: `${value}` 
      };
    }

    return undefined;
  },
  'Integer': lexer => {
    const match = lexer.code.slice(lexer.index).match(/^[0-9]+/);
    if (match !== null && match.index === 0) {
      const end = lexer.index + match[0].length;
      const value = lexer.code.substring(lexer.index, end);
      return { 
        type: 'Literal', 
        start: lexer.index, 
        end, 
        value: parseInt(value), 
        raw: `${value}` 
      };
    }
    return undefined;
  },
  'Array': lexer => {
    const elements: DataToken[] = [];
    const subparser = lexer.clone().load(lexer.code, lexer.index);
    try {
      subparser.expect('[');
      subparser.optional('whitespace');
      while (subparser.next(data)) {
        const value = subparser.expect(data) as DataToken;
        subparser.optional('whitespace');
        subparser.optional(',');
        subparser.optional('whitespace');
        elements.push(value);
      }
      subparser.expect(']');
    } catch(e) {
      return undefined;
    }
    
    return { 
      type: 'ArrayExpression',
      start: lexer.index,
      end: subparser.index,
      elements
    };
  },
  'Object': lexer => {
    const start = lexer.index;
    const properties: any[] = [];
    const subparser = lexer.clone().load(lexer.code, lexer.index);
    try {
      subparser.expect('{');
      subparser.optional('whitespace');
      while (subparser.next('Identifier')) {
        const key = subparser.expect<IdentifierToken>('Identifier');
        subparser.optional('whitespace');
        subparser.expect(':');
        subparser.optional('whitespace');
        const value = subparser.expect<DataToken>(data);
        subparser.optional('whitespace');
        subparser.optional(',');
        subparser.optional('whitespace');
        properties.push({
          type: 'Property',
          start: key.start,
          end: value.end,
          key: {
            type: 'Identifier',
            start: key.start,
            end: key.end,
            name: key.name
          },
          value: value
        });
      }
      subparser.expect('}');
    } catch(e) {
      return undefined;
    }
    return { 
      type: 'ObjectExpression',
      start,
      end: subparser.index,
      properties
    };
  },
  'Identifier': lexer => identifier(/^[a-z_][a-z0-9_]*/i, lexer),
  'AttributeIdentifier': lexer => identifier(/^[a-z][a-z0-9\-_]*/i, lexer),
  'InlineScript': lexer => {
    const subparser = lexer.clone().load(lexer.code, lexer.index);
    try {
      subparser.expect('{');
      const start = subparser.index;
      let end = subparser.index;
      for (let open = 0; end < subparser.code.length; end++) {
        if (subparser.code.charAt(end) === '{') {
          open++;
        } else if (subparser.code.charAt(end) === '}') {
          open--;
          if (open < 0) {
            break;
          }
        }
      }
      return {
        type: 'ProgramExpression',
        start: start - 1,
        end: end + 1,
        source: subparser.code.substring(start, end)
      };
    } catch(e) {
      return undefined;
    }
  }
};

export const scalar = [ 'Null',  'Boolean', 'String', 'Float', 'Integer' ];
export const data = [ ...scalar, 'Object', 'Array', 'Identifier' ];

export function scan(
  type: string, 
  regexp: RegExp, 
  lexer: Parser
): Token | undefined {
  const match = lexer.code.slice(lexer.index).match(regexp);
  if (match !== null && match.index === 0) {
    const end = lexer.index + match[0].length;
    const value = lexer.code.substring(lexer.index, end);
    return { type, start: lexer.index, end, value, raw: value };
  }

  return undefined;
}

export function identifier(
  regexp: RegExp, 
  lexer: Parser
): IdentifierToken | undefined {
  const results = scan('Identifier', regexp, lexer);
  if (results) {
    return {
      type: 'Identifier',
      start: results.start,
      end: results.end,
      name: results.value
    };
  }

  return undefined;
}

export default definitions;