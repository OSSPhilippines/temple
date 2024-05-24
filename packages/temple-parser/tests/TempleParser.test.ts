import fs from 'fs';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TempleParser from '../src/TempleParser';

describe('Temple Parser', () => {
  it('Should parse Temple Page', () => {
    const actual = TempleParser.parse(
      fs.readFileSync(__dirname + '/templates/page.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(4);
    expect(actual.scripts.length).to.equal(0);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(1);
  });
});