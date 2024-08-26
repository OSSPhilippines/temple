import type { MarkupToken, LiteralToken } from '../src/types';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import fs from 'fs';

import Tokenizer from '../src/compiler/Tokenizer';

describe('Temple Compiler Tokenizer', () => {
  it('Should parse Temple Page', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/page.dtml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    //expect(actual.components.length).to.equal(3);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(2);
  });

  it('Should parse Temple App', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/app.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(3);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(8);
  });

  it('Should parse link (inline) to style (block) issue', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/components/header.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(0);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(2);
  });

  it('Should parse $', () => {
    const actual = Tokenizer.tokenize('<div><span>$</span>ok</div>');
    const markup = actual.markup[0].children?.[0] as MarkupToken;
    const literal = markup.children?.[0] as LiteralToken;
    //console.log(JSON.stringify(actual, null, 2));
    expect(markup.name).to.equal('span');
    expect(literal.value).to.equal('$');
  });
});