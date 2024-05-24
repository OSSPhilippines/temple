import fs from 'fs';
import { describe, it } from 'mocha';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import SymbolParser from '../src/SymbolParser';

import symbolAst1 from './expected/symbolAst1.json';
import symbolAst2 from './expected/symbolAst2.json';

use(deepEqualInAnyOrder);

describe('Symbol Parser', () => {
  it('Should parse Basic HTML', () => {
    const actual = SymbolParser.parse('<h1 class="some thing">Hello <span>World</span> </h1>');
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual).to.deep.equalInAnyOrder(symbolAst1);
  });

  it('Should parse Temple File', () => {
    const actual = SymbolParser.parse(
      fs.readFileSync(__dirname + '/templates/components/counter.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual).to.deep.equalInAnyOrder(symbolAst2);
  });
});