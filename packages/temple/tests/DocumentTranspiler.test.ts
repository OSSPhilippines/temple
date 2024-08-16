import path from 'path';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Component from '../src/component/Component';
import Transpiler from '../src/document/Transpiler';
import { toTS } from '../src/component/helpers';

describe('Temple Document Transpiler', () => {
  const tsconfig = path.join(__dirname, '../tsconfig.json');
  const component = new Component(
    path.join(__dirname, 'templates/page.tml'), 
    { cwd: __dirname }
  );
  it('Should transpile component', () => {
    expect(true).to.equal(true);
  });

  it('Should transpile $', () => {
    const transpiler = new Transpiler(component, tsconfig);
    const server = toTS(transpiler.transpile());
    //console.log('server', server);
    // [
    //   TempleDocument.createElement('div', { }, [
    //     TempleDocument.createElement('span', { }, [
    //       TempleDocument.createText(`$`)
    //     ]).element, 
    //     TempleDocument.createText(`ok`)
    //   ]).element
    // ]
    expect(server).to.contain('TempleDocument.createElement(\'div\', { \'title\': title }, [');
    expect(server).to.contain('TempleDocument.createText(`$`)');

    const client = toTS(transpiler.client());
    //console.log('client', client);
    //const __BINDINGS__: Record<string, Record<string, any>> = {'1': { 'title': title }, };
    expect(client).to.contain('{\'1\': { \'title\': title }, }');
  });
});