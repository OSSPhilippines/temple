import type { MarkupToken, LiteralToken } from '../src/types';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import fs from 'fs';

import Tokenizer from '../src/compiler/Tokenizer';

describe('Temple Compiler Tokenizer', () => {
  it('Should tokenize Temple Page', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/page.dtml', 'utf8')
    );
    //console.log('--page.dtml--', JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(1);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(3);
  });

  it('Should tokenize No Markup', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/footer.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(1);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(2);

    const actual2 = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/nomarkup.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual2, null, 2));
    expect(actual2.components.length).to.equal(0);
    expect(actual2.scripts.length).to.equal(1);
    expect(actual2.styles.length).to.equal(0);
    expect(actual2.markup.length).to.equal(2);
  });

  it('Should tokenize Temple App', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/app.tml', 'utf8')
    );
    //console.log('--app.tml--', JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(3);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(8);
  });

  it('Should tokenize link (inline) to style (block) issue', () => {
    const actual = Tokenizer.tokenize(
      fs.readFileSync(__dirname + '/fixtures/components/header.tml', 'utf8')
    );
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual.components.length).to.equal(0);
    expect(actual.scripts.length).to.equal(1);
    expect(actual.styles.length).to.equal(1);
    expect(actual.markup.length).to.equal(2);
  });

  it('Should tokenize $', () => {
    const actual = Tokenizer.tokenize('<div><span>$</span>ok</div>');
    const markup = actual.markup[0].children?.[0] as MarkupToken;
    const literal = markup.children?.[0] as LiteralToken;
    //console.log(JSON.stringify(actual, null, 2));
    expect(markup.name).to.equal('span');
    expect(literal.value).to.equal('$');
  });

  it('Should tokenize nested scripts', () => {
    const actual = Tokenizer.tokenize(`
      <div>
        <script type="text/javascript">
          const x = 1;
        </script>
      </div>
    `);
    
    const divTag = actual.markup[0];
    expect(divTag.type).to.equal('MarkupExpression');
    expect(divTag.name).to.equal('div');
    
    const scriptTag = divTag.children?.[0] as MarkupToken;
    expect(scriptTag.type).to.equal('MarkupExpression');
    expect(scriptTag.name).to.equal('script');
    expect(scriptTag.attributes?.properties[0].key.name).to.equal('type');
    
    // Script content should be treated as literal content when nested
    const scriptContent = scriptTag.children?.[0] as LiteralToken;
    expect(scriptContent.type).to.equal('Literal');
    expect(scriptContent.value.trim()).to.include('const x = 1;');
  });

  it('Should handle script with src attribute', () => {
    const actual = Tokenizer.tokenize(`
      <script src="external.js"></script>
    `);
    
    expect(actual.markup[0].type).to.equal('MarkupExpression');
    expect(actual.markup[0].name).to.equal('script');
    expect(actual.markup[0].attributes?.properties[0].key.name).to.equal('src');
  });

  it('Should handle unclosed tags', () => {
    expect(() => Tokenizer.tokenize('<div><span>text')).to.throw();
  });

  it('Should handle mismatched closing tags', () => {
    expect(() => Tokenizer.tokenize('<div><span>text</div>')).to.throw();
  });

  it('Should tokenize complex attributes', () => {
    const actual = Tokenizer.tokenize(`
      <div 
        class="test" 
        data-value={someVar} 
        {...spread} 
        {dynamicProp}
        bool-flag
      >
        content
      </div>
    `);

    const attributes = actual.markup[0].attributes?.properties;
    expect(attributes).to.have.length(5);
    
    // Regular attribute
    expect(attributes?.[0].key.name).to.equal('class');
    expect(attributes?.[0].value.type).to.equal('Literal');
    
    // Dynamic attribute
    expect(attributes?.[1].key.name).to.equal('data-value');
    expect(attributes?.[1].value.type).to.equal('ProgramExpression');
    
    // Spread attribute
    expect(attributes?.[2].spread).to.equal(true);
    
    // Dynamic property name
    expect(attributes?.[3].computed).to.equal(true);
    
    // Boolean attribute
    const boolAttr = attributes?.[4].value as LiteralToken;
    expect(boolAttr.type).to.equal('Literal');
    expect(boolAttr.value).to.equal(true);
  });

  it('Should handle TypeScript imports in scripts', () => {
    const actual = Tokenizer.tokenize(`
      <script>
        import type { Something } from './types';
        import { foo } from './foo';
        const x = 1;
      </script>
    `);

    expect(actual.imports).to.have.length(2);
    expect(actual.imports[0].typeOnly).to.equal(true);
    expect(actual.imports[1].typeOnly).to.equal(false);
    expect(actual.scripts[0].source).to.include('const x = 1;');
  });

  it('Should handle empty elements with whitespace', () => {
    const actual = Tokenizer.tokenize(`
      <div>
        
      </div>
    `);

    expect(actual.markup[0].children).to.have.length(1);
    expect((actual.markup[0].children?.[0] as LiteralToken).type).to.equal('Literal');
  });

  it('Should handle inline program expressions', () => {
    const actual = Tokenizer.tokenize(`
      <div>Hello {name}!</div>
    `);

    expect(actual.markup[0].children).to.have.length(3);
    expect((actual.markup[0].children?.[1] as any).type).to.equal('ProgramExpression');
    expect((actual.markup[0].children?.[1] as any).source).to.equal('name');
  });

  it('Should handle HTML comments', () => {
    const actual = Tokenizer.tokenize(`
      <div><!-- This is a comment --><span>Content</span></div>
    `);

    const divTag = actual.markup[0];
    // Comments are treated as literal content
    const commentContent = divTag.children?.[0] as LiteralToken;
    expect(commentContent.type).to.equal('Literal');
    expect(commentContent.value.trim()).to.include('<!-- This is a comment -->');
  });

  it('Should handle style tags with content', () => {
    const actual = Tokenizer.tokenize(`
      <style>.test { color: red; }</style>
    `);

    expect(actual.styles).to.have.length(1);
    expect(actual.styles[0].source).to.include('color: red;');
  });

  it('Should handle void elements', () => {
    const actual = Tokenizer.tokenize(`
      <img src="test.jpg" />
      <br />
      <input type="text" />
    `);

    const elements = actual.markup.filter(node => 
      node.type === 'MarkupExpression'
    );
    
    expect(elements[0].name).to.equal('img');
    expect(elements[1].name).to.equal('br');
    expect(elements[2].name).to.equal('input');
  });

  it('Should handle multiple root elements', () => {
    const actual = Tokenizer.tokenize(`
      <div>First</div>
      <div>Second</div>
    `);
    
    const rootElements = actual.markup.filter(node => 
      node.type === 'MarkupExpression'
    );
    expect(rootElements).to.have.length(2);
    expect(rootElements[0].name).to.equal('div');
    expect(rootElements[1].name).to.equal('div');
  });
});