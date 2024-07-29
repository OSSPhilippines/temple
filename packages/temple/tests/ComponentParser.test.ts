import type { ObjectToken, ArrayToken } from '../src/component/types';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/component/Lexer';
import Parser from '../src/component/Parser';
import definitions, { data } from '../src/component/definitions';

describe('Temple Lexer/Parser', () => {
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
});