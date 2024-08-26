import path from 'path';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import Component from '../src/compiler/Component';
import Builder from '../src/document/Builder';

describe('Temple Document Builder', () => {
  //determine the tsconfig path
  const tsconfig = path.join(__dirname, '../tsconfig.json');
  //make a document component
  const component = new Component(
    path.join(__dirname, 'fixtures/page.dtml'), 
    { cwd: __dirname }
  );
  it('Should build document', async () => {
    const builder = new Builder(component, { tsconfig, minify: false });
    const server = await builder.server();
    //console.log('server', server)
    expect(server).to.contain('...this._toNodeList(snippet1)');
    expect(server).to.contain('...this._toNodeList(snippet2)');
    const client = await builder.client();
    //console.log('client', client)
    expect(client).to.contain('const snippet1 = `//on server:');
    expect(client).to.contain('const snippet2 = `<style>');
    const build = await builder.build();
    const html = build.document.render();
    //console.log(html)
    expect(html).to.contain('&lt;h1 class="title"&gt;{title}&lt;/h1&gt;');
    expect(html).to.contain('&lt;title&gt;{title}&lt;/title&gt;');
  });
});