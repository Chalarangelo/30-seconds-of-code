# Dynamic import support in acorn

This is plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

For more information, check out the [proposal repo](https://github.com/tc39/proposal-dynamic-import).

## Usage

You can use this module directly in order to get Acorn instance with plugin installed:

```js
import acorn from 'acorn-dynamic-import';
// or...
const acorn = require('acorn-dynamic-import').default;
```

Or you can use `inject.js` for injecting plugin into your own version of Acorn like this:

```js
const acorn = require('acorn-dynamic-import/lib/inject').default(require('./custom-acorn'));
```

Then, use the `plugins` option whenever you need to support dynamicImport while parsing:

```js
const ast = acorn.parse(code, {
  plugins: { dynamicImport: true }
});
```

To use the updated walk functionality the process is similar. You can require the default implementation as:

```js
import walk from 'acorn-dynamic-import/lib/walk';
// or...
const dynamicImportWalk = require('acorn-dynamic-import/lib/walk').default;
```

Or you can use the injectable version for injecting the new walk functionality into your own version of Acorn like this:

```js
import { inject } from 'acorn-dynamic-import/lib/walk';
import acornWalk from 'acorn/dist/walk';

const walk = inject(acornWalk);

``` 

## License

This plugin is issued under the [MIT license](./LICENSE).
