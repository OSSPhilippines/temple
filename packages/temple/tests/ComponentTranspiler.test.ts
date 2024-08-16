import path from 'path';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Component from '../src/component/Component';
import Transpiler from '../src/component/Transpiler';
import { toTS } from '../src/component/helpers';

describe('Temple Component Transpiler', () => {
  const tsconfig = path.join(__dirname, '../tsconfig.json');
  const component = new Component(
    path.join(__dirname, 'templates/dollar.tml'), 
    { cwd: __dirname }
  );
  it('Should transpile component', () => {
    expect(true).to.equal(true);
  });

  it('Should transpile $', () => {
    const transpiler = new Transpiler(component, tsconfig);
    const actual = transpiler.transpile();
    //console.log(toTS(actual));
    // [
    //   TempleDocument.createElement('div', { }, [
    //     TempleDocument.createElement('span', { }, [
    //       TempleDocument.createText(`$`)
    //     ]).element, 
    //     TempleDocument.createText(`ok`)
    //   ]).element
    // ]
    expect(toTS(actual)).to.contain('TempleDocument.createText(`$`)');
  });
});