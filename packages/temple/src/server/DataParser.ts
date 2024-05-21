//types
import type { References } from './types';
import type { 
  Data,
  DataToken,
  ArrayToken,
  ObjectToken, 
  LiteralToken, 
  IdentifierToken
} from './types';

import Exception from './ParserException';

export default class DataParser {
  /**
   * Compiles an array tree into an actual array
   */
  static array<T = Data[]>(token: ArrayToken, references: References = false) {
    return token.elements.map(element => this.data(element, references)) as T;
  }

  /**
   * Compiles an array, object or scalar tree into the actual value
   */
  static data(token: DataToken, references: References = false): Data {
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
  static identifier(token: IdentifierToken, references: References = false) {
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
  static object<T = Data>(token: ObjectToken, references: References = false) {
    return Object.fromEntries(token.properties.map(property => [ 
      property.key.name, 
      this.data(property.value, references) 
    ])) as Record<string, T>;
  }
};