import fs from 'fs';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Tokenizer from '../src/component/Tokenizer';

describe('Temple Lexer/Parser', () => {
  it('Should parse Temple Page', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/templates/app.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(3);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(1);
  });

  it('Should parse link (inline) to style (block) issue', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/templates/components/header.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(0);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(1);
  });
});