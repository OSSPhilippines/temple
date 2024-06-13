const basic = `<style>
  h1 { font-weight: bold; }
</style>
<script>
  const name = 'world';
</script>
<h1>Hello {name}!</h1>`;

const props = `<style>
  h1 { font-weight: bold; }
</style>
<script>
  import { props } from '@ossph/temple';
  const { name } = props();
</script>
<h1>Hello {name}!</h1>`;

const signal = `<style>
  h1 { font-weight: bold; }
</style>
<script>
  import { signal } from '@ossph/temple';
  const name = signal('world');
  name.value += '!';
</script>
<h1>Hello {name.value}</h1>`;

const imports = `<!-- page.html -->
<link rel="import" href="./my-heading.html" />
<script>
  const name = 'world';
</script>
<my-heading {name}>Hello</my-heading>`;

const heading = `<!-- my-heading.html -->
<script>
  import { props } from '@ossph/temple';
  const { name, children } = props();
</script>
<h1>{children} {name}</h1>`;

const conditional = `<script>
  const name = 'world';
  const show = name === "world";
</script>

<if true=show>
  <h1>Hello {name}</h1>
</if>`;

const each = `<script>
  const list = [ 'a', 'b', 'c' ];
</script>
<ul>
  <each key=i value=item from=list>
    <li>{i}: {item}</li>
  </each>
</ul>`

const server = `import temple from '@ossph/temple/server';
//make a template engine
const engine = temple({...options...});
//load a Temple file
const render = await engine.load('./page.html');
//render final HTML
const results = render({...props...});`;

const snippets = { 
  basic,   props,       signal, imports, 
  heading, conditional, each,   server 
};

export default snippets;