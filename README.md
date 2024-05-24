# ⛩️ Temple

The reactive web component template engine.

## Install

```bash
$ npm -i @ossph/temple
```

## Server Usage

```js
import { document } from '@ossph/temple/server';
//make a template document engine
const engine = document({...options...});
//make a render callback
const render = await engine('./page.html');
//render final HTML
const results = render({...props...});
```

### Document Options

| Name        | Description                            |
|-------------|----------------------------------------|
| fs          | File system where temple files located |
| cwd         | The current working directory          |
| brand       | The web component prefix               |
| useCache    | Turn on file caching                   |
| buildFolder | If cache, where to put cached files    |
| tsconfig    | Location of your tsconfig.json file    |


## Temple Markup

**Basic Markup**

```html
<!-- page.html -->
<script>
  const name = 'world';
</script>
<h1>Hello {name}!</h1>
```

**Markup with Styles**

```html
<!-- page.html -->
<style>
  :host {
    color: purple;
  }
  :host h1 {
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
<script>
  const name = 'world';
</script>
<h1>Hello {name}!</h1>
```

**Markup with Props**

```html
<!-- page.html -->
<script>
  import { props } from '@ossph/temple';
  type PageProps = { name: string };
  const { name } = props<PageProps>();
</script>
<h1>Hello {name}</h1>
```

**Markup with Reactivity**

```html
<!-- page.html -->
<script>
  import { signal } from '@ossph/temple';
  const name = signal<string>('world');
  name.value += '!';
</script>
<h1>Hello {name.value}</h1>
```

**Markup with Imports**

```html
<!-- page.html -->
<link rel="import" href="./my-heading.html">
<script>
  const name = 'world';
</script>
<my-heading name={name}>Hello</my-heading>
```

```html
<!-- my-heading.html -->
<script>
  import { props } from '@ossph/temple';
  type PageProps = { name: string, children: string };
  const { name, children } = props<PageProps>();
</script>
<h1>{children} {name}</h1>
```

**Markup with Conditional**

```html
<!-- page.html -->
<script>
  const name = 'world';
  const show = name === "world";
</script>
<if true={show}>
  <h1>Hello {name}</h1>
</if>
```

**Markup with Loops**

```html
<!-- page.html -->
<script>
  const list = [ 'a', 'b', 'c' ];
</script>
<ul>
  <each key=i value=item from=list>
    <li>{i}: {item}</li>
  </each>
</ul>
```

## Why Temple?

Current frontend solutions for the most part, come in the form of a 
"frontend framework" and are "all encompassing", requiring more import 
into the frontend framework and give little export out to support server 
first solutions.  

Temple is a modern HTML markup language and a server first template 
engine with a built-in parser/compiler that generates web components 
and support reactivity. The focus of Temple are the following.

| Features         | De-Features   |
|------------------|---------------|
| Template Engine  | No Hydration  |
| Web Components   | No Hooks      |
| Server First     | No Memo       |
| Reactive Signals | No Brandcuffs |

Temple works with most server frameworks including:

 - [Express](https://github.com/OSSPhilippines/temple/tree/main/examples/with-express)
 - [Fastify](https://github.com/OSSPhilippines/temple/tree/main/examples/with-fastify)
 - [Hapi](https://github.com/OSSPhilippines/temple/tree/main/examples/with-hapi)
 - [Koa](https://github.com/OSSPhilippines/temple/tree/main/examples/with-koa)
 - [NestJS](https://github.com/OSSPhilippines/temple/tree/main/examples/with-nest)
 - [Webpack](https://github.com/OSSPhilippines/temple/tree/main/examples/with-webpack)
