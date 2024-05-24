# ⛩️ Temple Client

This package is designed for [Temple](https://github.com/OSSPhilippines/temple),
the reactive web component template engine. See [docs](https://github.com/OSSPhilippines/temple)
for more information.

Browser library that Temple scripts can use to manage data in different ways.

## Install

```bash
$ npm -i @ossph/temple-client
```

## Usage

```js
import { props, signal } from '@ossph/temple-client'
```

## Props

```html
<!-- page.html -->
<script>
  import { props } from '@ossph/temple';
  type PageProps = { name: string };
	const { name } = props<PageProps>();
</script>
<h1>Hello {name}</h1>
```

## Signal

```html
<!-- page.html -->
<script>
  import { signal } from '@ossph/temple';
	const name = signal<string>('world');
  name.value += '!';
</script>
<h1>Hello {name.value}</h1>
```