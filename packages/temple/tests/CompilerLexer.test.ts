import type { LiteralToken } from '../src/types';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/compiler/Lexer';
import definitions, { data } from '../src/compiler/definitions';

describe('Temple Compiler Lexer', () => {
  const lexer = new Lexer();
  Object.keys(definitions).forEach((key) => {
    lexer.define(key, definitions[key]);
  });
  
  it('Should parse float', () => {
    lexer.load('4.4');
    const token = lexer.expect<LiteralToken>(data);
    expect(token.type).to.equal('Literal');
    expect(token.value).to.equal(4.4);
    expect(token.start).to.equal(0);
    expect(token.end).to.equal(3);
  });

  it('Should parse integer', () => {
    lexer.load('44');
    const token = lexer.expect<LiteralToken>(data);
    expect(token.type).to.equal('Literal');
    expect(token.value).to.equal(44);
    expect(token.start).to.equal(0);
    expect(token.end).to.equal(2);
  });

  it('Should parse null', () => {
    lexer.load('null');
    const token = lexer.expect<LiteralToken>(data);
    expect(token.type).to.equal('Literal');
    expect(token.value).to.equal(null);
    expect(token.start).to.equal(0);
    expect(token.end).to.equal(4);
  });

  it('Should parse boolean', () => {
    //true
    (() => {
      lexer.load('true');
      const token = lexer.expect<LiteralToken>(data);
      expect(token.type).to.equal('Literal');
      expect(token.value).to.equal(true);
      expect(token.start).to.equal(0);
      expect(token.end).to.equal(4);
    })();
    //false
    (() => {
      lexer.load('false');
      const token = lexer.expect<LiteralToken>(data);
      expect(token.type).to.equal('Literal');
      expect(token.value).to.equal(false);
      expect(token.start).to.equal(0);
      expect(token.end).to.equal(5);
    })();
  });

  it('Should parse string', () => {
    lexer.load('"foobar"');
    const token = lexer.expect<LiteralToken>(data);
    expect(token.type).to.equal('Literal');
    expect(token.value).to.equal('foobar');
    expect(token.start).to.equal(0);
    expect(token.end).to.equal(8);
  });
});