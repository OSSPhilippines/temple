import fs from 'fs';
import path from 'path';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TempleCompiler from '../src/TempleCompiler';

describe('Temple Compiler', () => {
  it('Should compile Temple Document', () => {
    //const expectedJS = fs.readFileSync(path.join(__dirname, 'expected/page.js'), 'utf8');
    //const expectedTS = fs.readFileSync(path.join(__dirname, 'expected/page.ts'), 'utf8');
    const compile = TempleCompiler.compile({ cwd: __dirname });
    const results = compile('./templates/page.tml');
    const actualJS = results.toJS();
    const actualTS = results.toTS();

    //console.log(actualJS)
    expect(actualJS).to.equal(expectedJS);
    expect(actualTS).to.equal(expectedTS);
  });
});