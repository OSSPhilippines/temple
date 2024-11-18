import type { ObjectToken, ArrayToken, DataToken } from '../src/types';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import Lexer from '../src/compiler/Lexer';
import Parser from '../src/compiler/Parser';
import definitions, { data } from '../src/compiler/definitions';

describe('Temple Compiler Parser', () => {
  const lexer = new Lexer();
  Object.keys(definitions).forEach((key) => {
    lexer.define(key, definitions[key]);
  });

  it('Should parse objects', () => {
    //basic object
    (() => {
      lexer.load('{ foo: "bar", bar: 4.4 }');
      const token = lexer.expect<ObjectToken>(data);
      expect(token.type).to.equal('ObjectExpression');

      const actual = Parser.object(token);
      expect(actual.foo).to.equal('bar');
      expect(actual.bar).to.equal(4.4);
    })();
    //object object
    (() => {
      lexer.load('{ foo: "bar", bar: 4.4, zoo: { foo: false, bar: null } }');
      const token = lexer.expect<ObjectToken>(data);
      expect(token.type).to.equal('ObjectExpression');

      const actual = Parser.object<{
        foo: string;
        bar: number;
        zoo: { foo: boolean, bar: null };
      }>(token);
      expect(actual.foo).to.equal('bar');
      expect(actual.bar).to.equal(4.4);
      expect(actual.zoo.foo).to.equal(false);
      expect(actual.zoo.bar).to.equal(null);
    })();
  });

  it('Should parse arrays', () => {
    //object array
    (() => {
      lexer.load('{ foo: "bar", bar: 4.4, zoo: [ 4, true ] }');
      const token = lexer.expect<ObjectToken>(data);
      expect(token.type).to.equal('ObjectExpression');

      const actual = Parser.object<{
        foo: string;
        bar: number;
        zoo: [number, boolean];
      }>(token);
      expect(actual.foo).to.equal('bar');
      expect(actual.bar).to.equal(4.4);
      expect(actual.zoo[0]).to.equal(4);
      expect(actual.zoo[1]).to.equal(true);
    })();
    //basic array
    (() => {
      lexer.load('[ 4.4, "bar", false, null ]');
      const token = lexer.expect<ArrayToken>(data);
      expect(token.type).to.equal('ArrayExpression');

      const actual = Parser.array(token);
      expect(actual[0]).to.equal(4.4);
      expect(actual[1]).to.equal('bar');
      expect(actual[2]).to.equal(false);
      expect(actual[3]).to.equal(null);
    })();
    //array array
    (() => {
      lexer.load('[ 4.4, "bar", false, null, [ 4, true ] ]');
      const token = lexer.expect<ArrayToken>(data);
      expect(token.type).to.equal('ArrayExpression');

      const actual = Parser.array<[
        number,
        string,
        boolean,
        null,
        [number, boolean]
      ]>(token);
      expect(actual[0]).to.equal(4.4);
      expect(actual[1]).to.equal('bar');
      expect(actual[2]).to.equal(false);
      expect(actual[3]).to.equal(null);
      expect(actual[4][0]).to.equal(4);
      expect(actual[4][1]).to.equal(true);
    })();
    //array object
    (() => {
      lexer.load('[ 4.4, "bar", false, null, { foo: false, bar: null } ]');
      const token = lexer.expect<ArrayToken>(data);
      expect(token.type).to.equal('ArrayExpression');

      const actual = Parser.array<[
        number,
        string,
        boolean,
        null,
        { foo: boolean, bar: null }
      ]>(token);
      expect(actual[0]).to.equal(4.4);
      expect(actual[1]).to.equal('bar');
      expect(actual[2]).to.equal(false);
      expect(actual[3]).to.equal(null);
      expect(actual[4].foo).to.equal(false);
      expect(actual[4].bar).to.equal(null);
    })();
    //array object
    (() => {
      lexer.load('[ { label: "United States", value: "US" }, { label: "Mexico", value: "MX" }, { label: "Canada", value: "CA" } ]');
      const token = lexer.expect<ArrayToken>(data);
      expect(token.type).to.equal('ArrayExpression');

      const actual = Parser.array<{ label: string, value: string }[]>(token);
      expect(actual[0].label).to.equal('United States');
      expect(actual[0].value).to.equal('US');
      expect(actual[1].label).to.equal('Mexico');
      expect(actual[1].value).to.equal('MX');
      expect(actual[2].label).to.equal('Canada');
      expect(actual[2].value).to.equal('CA');
    })();
  });

  it('Should parse empty objects', () => {
    lexer.load('{}');
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    const actual = Parser.object(token);
    expect(actual).to.deep.equal({});
  });

  it('Should parse empty arrays', () => {
    lexer.load('[]');
    const token = lexer.expect<ArrayToken>(data);
    expect(token.type).to.equal('ArrayExpression');

    const actual = Parser.array(token);
    expect(actual).to.deep.equal([]);
  });

  it('Should parse nested empty structures', () => {
    lexer.load('{ foo: [], bar: {} }');
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    const actual = Parser.object<{
      foo: any[];
      bar: Record<string, unknown>;
    }>(token);
    expect(actual.foo).to.deep.equal([]);
    expect(actual.bar).to.deep.equal({});
  });

  it('Should parse complex nested structures', () => {
    lexer.load(`{
      array: [
        { id: 1, items: [] },
        { id: 2, items: [{ name: "test" }] }
      ],
      metadata: {
        created: null,
        modified: false,
        settings: { active: true }
      }
    }`);
    
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    type ComplexStructure = {
      array: Array<{
        id: number;
        items: Array<{ name: string }>;
      }>;
      metadata: {
        created: null;
        modified: boolean;
        settings: {
          active: boolean;
        };
      };
    };

    const actual = Parser.object(token) as ComplexStructure;

    expect(actual.array[0].id).to.equal(1);
    expect(actual.array[0].items).to.deep.equal([]);
    expect(actual.array[1].id).to.equal(2);
    expect(actual.array[1].items[0].name).to.equal('test');
    expect(actual.metadata.created).to.be.null;
    expect(actual.metadata.modified).to.be.false;
    expect(actual.metadata.settings.active).to.be.true;
  });

  it('Should handle special values', () => {
    lexer.load(`{
      nullValue: null,
      boolValue: true,
      numberValue: 123.45,
      stringValue: "test",
      emptyObject: {},
      emptyArray: []
    }`);
    
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    const actual = Parser.object(token);
    expect(actual.nullValue).to.be.null;
    expect(actual.boolValue).to.be.true;
    expect(actual.numberValue).to.equal(123.45);
    expect(actual.stringValue).to.equal('test');
    expect(actual.emptyObject).to.deep.equal({});
    expect(actual.emptyArray).to.deep.equal([]);
  });

  it('Should parse identifier values', () => {
    lexer.load('{ key: someIdentifier }');
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    const actual = Parser.object(token);
    expect(actual.key).to.equal('${someIdentifier}');
  });

  it('Should parse integer values', () => {
    lexer.load('{ intValue: 42 }');
    const token = lexer.expect<ObjectToken>(data);
    expect(token.type).to.equal('ObjectExpression');

    const actual = Parser.object(token);
    expect(actual.intValue).to.equal(42);
  });

  it('Should handle invalid token types', () => {
    // Test for invalid object property value
    (() => {
      lexer.load('{ key: "value" }');
      const token = lexer.expect<ObjectToken>(data);
      // Modify the token's value to be an invalid type
      (token.properties[0].value as any) = {
        type: 'InvalidLiteral',
        value: 'test'
      };
      expect(() => Parser.object(token)).to.throw();
    })();

    // Test for invalid array element
    (() => {
      lexer.load('[ "value" ]');
      const token = lexer.expect<ArrayToken>(data);
      // Modify the element to be an invalid type
      (token.elements[0] as any) = {
        type: 'InvalidLiteral',
        value: 'test'
      };
      expect(() => Parser.array(token)).to.throw();
    })();
  });

  it('Should parse objects with multiple value types', () => {
    lexer.load(`{
      nullVal: null,
      boolVal: true,
      intVal: 42,
      floatVal: 3.14,
      strVal: "string",
      identVal: someIdentifier,
      objVal: {},
      arrVal: []
    }`);
    
    const token = lexer.expect<ObjectToken>(data);
    const actual = Parser.object(token);

    expect(actual.nullVal).to.be.null;
    expect(actual.boolVal).to.be.true;
    expect(actual.intVal).to.equal(42);
    expect(actual.floatVal).to.equal(3.14);
    expect(actual.strVal).to.equal('string');
    expect(actual.identVal).to.equal('${someIdentifier}');
    expect(actual.objVal).to.deep.equal({});
    expect(actual.arrVal).to.deep.equal([]);
  });

  it('Should handle malformed objects and arrays', () => {
    // Test object with invalid property structure
    (() => {
      lexer.load('{ key: "value" }');
      const token = lexer.expect<ObjectToken>(data);
      // Make the property structure invalid
      token.properties[0] = {
        type: 'Property',
        value: { type: 'StringLiteral', value: 'test' }
      } as any;
      expect(() => Parser.object(token)).to.throw();
    })();

    // Test array with invalid element structure
    (() => {
      lexer.load('[ "value" ]');
      const token = lexer.expect<ArrayToken>(data);
      // Make the element structure invalid
      token.elements[0] = {} as any;
      expect(() => Parser.array(token)).to.throw();
    })();
  });

  it('Should handle type errors', () => {
    // Test with invalid value type in object
    (() => {
      lexer.load('{ key: "value" }');
      const token = lexer.expect<ObjectToken>(data);
      // Change the value type to something invalid
      (token.properties[0].value as any) = {
        type: 'UnknownType',
        value: 'test'
      };
      expect(() => Parser.object(token)).to.throw();
    })();

    // Test with invalid element type in array
    (() => {
      lexer.load('[ "value" ]');
      const token = lexer.expect<ArrayToken>(data);
      // Change the element type to something invalid
      (token.elements[0] as any) = {
        type: 'UnknownType',
        value: 'test'
      };
      expect(() => Parser.array(token)).to.throw();
    })();
  });

  it('Should handle structural errors', () => {
    // Test with missing required token properties
    (() => {
      lexer.load('[ "value" ]');
      const token = lexer.expect<ArrayToken>(data);
      // Remove required elements property
      delete (token as any).elements;
      expect(() => Parser.array(token)).to.throw();
    })();

    // Test with missing required property fields
    (() => {
      lexer.load('{ key: "value" }');
      const token = lexer.expect<ObjectToken>(data);
      // Remove required key field from property
      delete (token as any).properties[0].key;
      expect(() => Parser.object(token)).to.throw();
    })();
  });

  it('Should handle reference errors', () => {
    // Test identifier with invalid reference (line 61, 66)
    (() => {
      lexer.load('{ key: someIdentifier }');
      const token = lexer.expect<ObjectToken>(data);
      expect(() => Parser.data(token.properties[0].value, {})).to.throw('Unknown reference someIdentifier');
    })();
  });

  it('Should handle parser edge cases', () => {
    const parser = new Parser('<div>Hello</div>');

    // Test _findMarkup with no closing tag (line 258)
    (() => {
      const parser = new Parser('<div class=test');
      const result = (parser as any)._findMarkup(0);
      expect(result).to.equal(0);
    })();

    // Test _findQuote with no closing quote (line 298)
    (() => {
      const parser = new Parser('"unclosed');
      const result = (parser as any)._findQuote(0, '"');
      expect(result).to.equal(0);
    })();

    // Test _findProgram with no closing brace (line 316)
    (() => {
      const parser = new Parser('{unclosed');
      const result = (parser as any)._findProgram(0);
      expect(result).to.equal(0);
    })();

    // Test _findScript with no closing script tag (line 341)
    (() => {
      const parser = new Parser('<script>unclosed');
      const result = (parser as any)._findScript(0);
      expect(result).to.equal(0);
    })();
  });

  it('Should handle parser with unclosed structures', () => {
    // Test unclosed markup
    (() => {
      const parser = new Parser('<div class="test');
      const result = (parser as any)._findMarkup(0);
      expect(result).to.equal(0);
    })();

    // Test unclosed program
    (() => {
      const parser = new Parser('{ test: "value"');
      const result = (parser as any)._findProgram(0);
      expect(result).to.equal(0);
    })();

    // Test unclosed script
    (() => {
      const parser = new Parser('<script>console.log("test")');
      const result = (parser as any)._findScript(0);
      expect(result).to.equal(0);
    })();

    // Test unclosed quote
    (() => {
      const parser = new Parser('"unclosed string');
      const result = (parser as any)._findQuote(0, '"');
      expect(result).to.equal(0);
    })();
  });

  it('Should handle data token type errors', () => {
    // Create a token with an invalid type
    const invalidToken = {
      type: 'Literal',
      value: 'test'
    } as DataToken;

    // Create a proxy to intercept the type property
    const proxyToken = new Proxy(invalidToken, {
      get(target, prop) {
        if (prop === 'type') {
          return 'InvalidType';
        }
        return target[prop as keyof typeof target];
      }
    });

    // Test Parser.data directly to trigger line 61
    expect(() => Parser.data(proxyToken)).to.throw('Invalid data token type');
  });

  it('Should handle invalid data token types', () => {
    // Create a token with an invalid type
    const invalidToken = {
      type: 'UnaryExpression',  // A type that's not handled by Parser.data
      operator: '-',
      argument: {
        type: 'Literal',
        value: 42
      }
    } as unknown as DataToken;

    // Test that Parser.data throws the expected error
    try {
      Parser.data(invalidToken);
      expect.fail('Expected Parser.data to throw an error');
    } catch (error: any) {
      expect(error.message).to.equal('Invalid data token type');
    }

    // Also test with references parameter
    try {
      Parser.data(invalidToken, {});
      expect.fail('Expected Parser.data to throw an error');
    } catch (error: any) {
      expect(error.message).to.equal('Invalid data token type');
    }
  });

  it('Should throw error for invalid data token type', () => {
    // Create a token that matches none of the valid types in Parser.data
    const invalidToken = {
      type: 'UpdateExpression',  // Not ObjectExpression, ArrayExpression, Literal, or Identifier
      operator: '++',
      argument: {
        type: 'Identifier',
        name: 'x'
      }
    } as unknown as DataToken;

    // Test with both reference scenarios
    expect(() => Parser.data(invalidToken)).to.throw('Invalid data token type');
    expect(() => Parser.data(invalidToken, {})).to.throw('Invalid data token type');
  });

  it('Should throw error for invalid data token type (direct test)', () => {
    // Create a token that will definitely trigger line 61
    const invalidToken = {
      type: 'Literal',
      value: 'test'
    } as DataToken;

    // Override the type getter to always return an invalid type
    Object.defineProperty(invalidToken, 'type', {
      configurable: true,
      get: function() {
        return 'ThisTypeWillNeverBeHandled';
      }
    });

    // First test: without references
    let errorThrown = false;
    try {
      Parser.data(invalidToken);
    } catch (error: any) {
      errorThrown = true;
      expect(error.message).to.equal('Invalid data token type');
    }
    expect(errorThrown).to.be.true;

    // Second test: with references
    errorThrown = false;
    try {
      Parser.data(invalidToken, {});
    } catch (error: any) {
      errorThrown = true;
      expect(error.message).to.equal('Invalid data token type');
    }
    expect(errorThrown).to.be.true;
  });

  it('Should throw error for invalid data token type (forcing error path)', () => {
    // Create a token that matches the LiteralToken structure
    const invalidToken = {
      type: 'Literal',
      value: 'test',
      start: 0,
      end: 4,
      raw: 'test',
      escape: false,
      [Symbol.toPrimitive](hint: string) {
        if (hint === 'string') {
          return 'CustomToken';
        }
        return null;
      }
    } as unknown as DataToken;

    // Force the type to be something invalid at runtime
    Object.defineProperty(invalidToken, 'type', {
      configurable: true,
      enumerable: true,
      get() {
        // Return a type that doesn't match any of the conditions in Parser.data
        return Math.random() > 0.5 ? 'UnknownType' : 'InvalidExpression';
      }
    });

    // Test both scenarios to ensure the error path is hit
    expect(() => Parser.data(invalidToken)).to.throw('Invalid data token type');
    expect(() => Parser.data(invalidToken, {})).to.throw('Invalid data token type');
  });

  it('Should throw error for invalid data token type (using definitions)', () => {
    // Create a token that matches none of the types in definitions.ts scalar or data arrays
    const invalidToken = {
      type: 'Program',  // This type is not in scalar or data arrays in definitions.ts
      start: 0,
      end: 5,
      
      value: 'test',
      raw: 'test',
      escape: false  // Add the missing required property
    } as unknown as DataToken;  // Use double type assertion to avoid type checking

    // Test with both scenarios to ensure line 61 is hit
    let errorCaught = false;
    try {
      Parser.data(invalidToken);
    } catch (error: any) {
      errorCaught = true;
      expect(error.message).to.equal('Invalid data token type');
    }
    expect(errorCaught, 'Error should be thrown for invalid type').to.be.true;

    // Test with references to ensure complete coverage
    errorCaught = false;
    try {
      Parser.data(invalidToken, {});
    } catch (error: any) {
      errorCaught = true;
      expect(error.message).to.equal('Invalid data token type');
    }
    expect(errorCaught, 'Error should be thrown for invalid type with references').to.be.true;
  });

  it('Should throw error for invalid data token type (using token from definitions)', () => {
    // Create a token based on the structure in definitions.ts but with an invalid type
    const invalidToken = {
      type: 'ProgramExpression',  // This type exists in definitions.ts but not handled by Parser.data
      start: 0,
      end: 5,
      source: 'test'  // This matches the ProgramExpression structure from definitions.ts
    } as unknown as DataToken;

    // Test that Parser.data throws for this unhandled token type
    let errorCaught = false;
    try {
      Parser.data(invalidToken);
    } catch (error: any) {
      errorCaught = true;
      expect(error.message).to.equal('Invalid data token type');
    }
    expect(errorCaught, 'Error should be thrown for ProgramExpression type').to.be.true;
  });
});