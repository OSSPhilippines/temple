import fs from 'fs';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import DocumentParser from '../src/DocumentParser';

describe('Document Parser', () => {
  it('Should parse wierd HTML', () => {
    const code = `Text'1
      <div attr-1 attr2="foo >" attr-3={1} attr4={true} attr-5={false} attr6={1} attr-7={1.1}>
        {\`Text \${2}\`} <
        <span attr8={null} attr-9={undefined} attr10={"string1"} attr-11={'string2'} attr12={\`string 3 > \${value1}\`}>
          <em attr-13={value1} attr14={value > 1} {attr15} {...attributes}>
            Text\`3 {"Text <a>"}
            <hr attr16={\`string 3 > \${value1}\`} attr-17 attr18="foo >" attr-19={1} attr20={value > 1} {attr21} {...props} />
          </em>
          {'Text 5'} >
        </span>
      </div>
      `;

    const answers = [
      {
        name: 'div',
        kind: 'open',
        value: '<div attr-1 attr2="foo >" attr-3={1} attr4={true} attr-5={false} attr6={1} attr-7={1.1}>'
      },
      {
        name: 'span',
        kind: 'open',
        value: `<span attr8={null} attr-9={undefined} attr10={"string1"} attr-11={'string2'} attr12={\`string 3 > \${value1}\`}>`
      },
      {
        name: 'em',
        kind: 'open',
        value: '<em attr-13={value1} attr14={value > 1} {attr15} {...attributes}>'
      },
      {
        name: 'hr',
        kind: 'self',
        value: '<hr attr16={\`string 3 > \${value1}\`} attr-17 attr18="foo >" attr-19={1} attr20={value > 1} {attr21} {...props} />'
      },
      {
        name: 'em',
        kind: 'close',
        value: '</em>'
      },
      {
        name: 'span',
        kind: 'close',
        value: '</span>'
      },
      {
        name: 'div',
        kind: 'close',
        value: '</div>'
      }
    ];
    const parser = new DocumentParser(code);

    let index = 0;
    for (const { name, kind, start, end } of parser.tag()) {
      expect(name).to.equal(answers[index].name);
      expect(kind).to.equal(answers[index].kind);
      expect(parser.substring(start, end)).to.equal(answers[index].value);
      index++;
    }
    expect(index).to.equal(answers.length);
  });

  it('Should parse page html', () => {
    const parser = new DocumentParser(
      fs.readFileSync(__dirname + '/templates/page.tml', 'utf8')
    );

    const answers = [
      {
        name: 'link',
        kind: 'self',
        value: '<link rel="import" href="./components/header.tml" />'
      },
      {
        name: 'link',
        kind: 'self',
        value: `<link rel="import" href="./components/paragraph.tml" />`
      },
      {
        name: 'link',
        kind: 'self',
        value: '<link rel="import" href="./components/list.tml" />'
      },
      {
        name: 'link',
        kind: 'self',
        value: '<link rel="import" href="./components/counter.tml" />'
      },
      { name: 'style', kind: 'open', value: '<style>' },
      { name: 'style', kind: 'close', value: '</style>' },
      { name: 'html', kind: 'open', value: '<html>' },
      { name: 'head', kind: 'open', value: '<head>' },
      { name: 'title', kind: 'open', value: '<title>' },
      { name: 'title', kind: 'close', value: '</title>' },
      { name: 'head', kind: 'close', value: '</head>' },
      { name: 'body', kind: 'open', value: '<body>' },
      { name: 'header', kind: 'open', value: '<header class="title">' },
      { name: 'header', kind: 'close', value: '</header>' },
      { name: 'paragraph', kind: 'open', value: '<paragraph className="description">' },
      { name: 'paragraph', kind: 'close', value: '</paragraph>' },
      { name: 'list', kind: 'self', value: '<list />' },
      { name: 'counter', kind: 'self', value: '<counter start=value />' },
      { name: 'body', kind: 'close', value: '</body>' },
      { name: 'html', kind: 'close', value: '</html>' },
    ];

    let index = 0;
    for (const { name, kind, start, end } of parser.tag()) {
      expect(name).to.equal(answers[index].name);
      expect(kind).to.equal(answers[index].kind);
      expect(parser.substring(start, end)).to.equal(answers[index].value);
      index++;
    }
    expect(index).to.equal(answers.length);
  });

  it('Should parse HTML back to back', () => {
    const code = `<pre class="snippet"><br/><code class=language mount=highlight><hr /></code><br/></pre>`;

    const answers = [
      {
        name: 'pre',
        kind: 'open',
        value: '<pre class="snippet">'
      },
      {
        name: 'br',
        kind: 'self',
        value: '<br/>'
      },
      {
        name: 'code',
        kind: 'open',
        value: `<code class=language mount=highlight>`
      },
      {
        name: 'hr',
        kind: 'self',
        value: '<hr />'
      },
      {
        name: 'code',
        kind: 'close',
        value: '</code>'
      },
      {
        name: 'br',
        kind: 'self',
        value: '<br/>'
      },
      {
        name: 'pre',
        kind: 'close',
        value: '</pre>'
      }
    ];
    const parser = new DocumentParser(code);
    let index = 0;
    for (const { name, kind, start, end } of parser.tag()) {
      expect(name).to.equal(answers[index].name);
      expect(kind).to.equal(answers[index].kind);
      expect(parser.substring(start, end)).to.equal(answers[index].value);
      index++;
    }
    expect(index).to.equal(answers.length);
  });
});