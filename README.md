# ⛩️ Temple

The reactive web component template engine.

## Install

```bash
$ npm -i @ossph/temple
```

## Compiler Usage

```js
import temple from '@ossph/temple/compiler';
//make a template engine
const compiler = temple({...options...});
//load a Temple file
const { document } = await compiler.import('./page.tml');
//render final HTML
const results = document.render({...props...});
```

### Document Options

| Name        | Description                            |
|-------------|----------------------------------------|
| fs          | File system where temple files located |
| cwd         | The current working directory          |
| brand       | The web component prefix               |
| cache       | Turn on file caching                   |
| minify      | Turn on minification                   |
| bundle      | Turn on file bundling                  |
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

**Document Markup**

```html
<!-- page.html -->
<link rel="import" href="./components/header.tml" />
<link rel="import" href="./components/paragraph.tml" />
<link rel="import" href="./components/todo.tml" />
<style>
  body { 
    background-color: #DA532C; 
    color: #EFEFEF; 
  }
  img { width: 100px; height: 100px; }
  .title { text-align: center; }
  .logo { text-align: center; }
  .description { text-align: center; }
  .list { text-align: center; }
</style>
<html>
  <head>
    <title>Temple</title>
    <link rel="favicon" href="/favicon.ico" />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
  </head>
  <body class="light">
    <header class="title">{potitle}</header>
    <div class="logo">
      <img src="/temple-logo.png" alt="Logo" />
    </div>
    <paragraph classname="description">{description}</paragraph>
    <todo list=list start=start />
  </body>
</html>
```

## Why Temple?

Current frontend solutions for the most part, come in the form of a 
"frontend framework" and are "all encompassing", requiring more import 
into the frontend framework and give little export out to support server 
first solutions. Temple is a modern HTML markup language and a server 
first template engine with a built-in parser/compiler that generates 
web components and support reactivity. The focus of Temple are the 
following.

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
