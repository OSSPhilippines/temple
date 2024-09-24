<script>
  import { translate } from './index';

  const { trim = false, p = false, li = false, div = false } = this.props;
  const childlist = this.originalChildren;
  const phrase: string = [];
  const variables: Node = [];
  for (const child of childlist) {
    if (typeof child === 'string') {
      phrase.push(child);
    } else if (child instanceof Node && child.textContent) {
      phrase.push(child.textContent);
    } else {
      phrase.push('%s');
      variables.push(child);
    }
  }
  let words = phrase.join('');
  if (trim) {
    words = words.replace(/\s+/, ' ').trim();
  }
  const chunks = translate(words).split('%s');
  const translations: Node[] = [];
  for (let i = 0; i < chunks.length; i++) {
    translations.push(document.createTextNode(chunks[i]));
    if (variables[i]) {
      translations.push(variables[i]);
    }
  }
</script>
<if true={p}>
  <p>{translations}</p>
<elif true={li} />
  <li>{translations}</li>
<elif true={div} />
  <div>{translations}</div>
<else />
  {translations}
</if>