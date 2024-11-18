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

  it('Should handle find() method', () => {
    lexer.load('  123abc');
    const token = lexer.find('Integer');
    expect(token).to.not.be.undefined;
    expect(token?.type).to.equal('Literal');
    expect(token?.value).to.equal(123);
    expect(token?.start).to.equal(2);
    expect(token?.end).to.equal(5);
  });

  it('Should handle find() with no match', () => {
    lexer.load('abc');
    const token = lexer.find('Integer');
    expect(token).to.be.undefined;
    expect(lexer.index).to.equal(0); // Should reset index on no match
  });

  it('Should clone lexer correctly', () => {
    lexer.load('test123');
    lexer.define('custom', () => ({ type: 'Custom', start: 0, end: 1 }));
    const cloned = lexer.clone();
    
    expect(cloned.code).to.equal(lexer.code);
    expect(cloned.index).to.equal(lexer.index);
    expect(Object.keys(cloned.dictionary)).to.deep.equal(Object.keys(lexer.dictionary));
  });

  it('Should handle error cases', () => {
    lexer.load('abc');
    expect(() => lexer.expect('nonexistent')).to.throw('Unknown definition');
    
    lexer.load('abc');
    expect(() => lexer.expect(['Integer'])).to.throw('Unexpected abc');
  });

  it('Should handle next() method', () => {
    lexer.load('123abc');
    expect(lexer.next('Integer')).to.be.true;
    expect(lexer.index).to.equal(0); // Should not move index
    
    lexer.load('abc');
    expect(lexer.next('Integer')).to.be.false;
    expect(lexer.index).to.equal(0);
  });

  it('Should handle optional() method', () => {
    lexer.load('123abc');
    const token = lexer.optional('Integer');
    expect(token).to.not.be.undefined;
    expect(token?.type).to.equal('Literal');
    expect(lexer.index).to.equal(3);

    const noToken = lexer.optional('Integer');
    expect(noToken).to.be.undefined;
    expect(lexer.index).to.equal(3); // Should not move index on failure
  });

  it('Should handle long unexpected tokens', () => {
    lexer.load('abcdefghijklmnop');
    expect(() => lexer.expect('Integer'))
      .to.throw('Unexpected abcdefghij');
  });

  it('Should handle substring method', () => {
    lexer.load('test123');
    expect(lexer.substring(0, 4)).to.equal('test');
  });

  it('Should handle nextSpace method', () => {
    lexer.load('test 123');
    expect(lexer.nextSpace()).to.equal(4);
    
    lexer.load('test123');
    expect(lexer.nextSpace()).to.equal(7); // Should return length if no space found
  });

  it('Should handle multiple unknown definitions in expect()', () => {
    lexer.load('test');
    expect(() => lexer.expect(['unknown1', 'unknown2']))
      .to.throw('Unknown definition unknown1');
  });

  it('Should handle unknown definition in match()', () => {
    lexer.load('test');
    expect(() => lexer.match(0, ['unknownKey']))
      .to.throw('Unknown definition unknownKey');
  });

  it('Should handle case when no valid definitions remain after filtering', () => {
    lexer.load('test');
    // Define a reader that always returns null/undefined
    lexer.define('alwaysNull', () => undefined);
    expect(() => lexer.expect(['alwaysNull']))
      .to.throw('Unexpected test expecting alwaysNull');
  });

  it('Should handle empty definitions array after filtering', () => {
    lexer.load('test');
    // Create an empty array of definitions
    const emptyDefs: string[] = [];
    expect(() => lexer.expect(emptyDefs))
      .to.throw('Unknown definitions');
  });

  it('Should handle match() with no keys provided', () => {
    // Create a new lexer instance with no definitions
    const emptyLexer = new Lexer();
    emptyLexer.load('@');
    const result = emptyLexer.match(0);  // Using default keys on empty dictionary
    expect(result).to.be.null;  // Should return null when no definitions exist
  });

  it('Should handle match() with default keys', () => {
    // Create a new lexer instance to avoid interference
    const testLexer = new Lexer();
    // Define only one token type
    testLexer.define('test', () => ({ 
      type: 'Test', 
      start: 0, 
      end: 1, 
      value: 'x' 
    }));
    
    testLexer.load('x');
    const result = testLexer.match(0); // Using default keys
    expect(result).to.deep.include({ 
      type: 'Test',
      start: 0,
      end: 1,
      value: 'x'
    });
  });
});