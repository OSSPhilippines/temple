import fs from 'fs';
import path from 'path';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import DocumentCompiler from '../src/server/compiler/DocumentCompiler';

describe('Temple Compiler', () => {
  it('Should compile Temple Document', async () => {
    const expected = fs.readFileSync(path.join(__dirname, 'expected/page.html'), 'utf8');
    const compiler = new DocumentCompiler({
      buildPath: './.temple',
      cwd: __dirname,
      useCache: false
    });

    const render = await compiler.compile('./templates/page.tml');
    const actual = render({
      title: 'This is Header 1',
      description: 'This is Paragraph',
      value: 0
    });

    //console.log(actual)
    expect(actual).to.equal(expected);
  }).timeout(10000);
});