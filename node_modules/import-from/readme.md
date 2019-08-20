# import-from [![Build Status](https://travis-ci.org/sindresorhus/import-from.svg?branch=master)](https://travis-ci.org/sindresorhus/import-from)

> Import a module like with [`require()`](https://nodejs.org/api/globals.html#globals_require) but from a given path


## Install

```
$ npm install --save import-from
```


## Usage

```js
const importFrom = require('import-from');

// There is a file at `./foo/bar.js`

importFrom('foo', './bar');
```


## API

### importFrom(fromDir, moduleId)

Like `require()`, throws when the module can't be found.

### importFrom.silent(fromDir, moduleId)

Returns `null` instead of throwing when the module can't be found.

#### fromDir

Type: `string`

Directory to import from.

#### moduleId

Type: `string`

What you would use in `require()`.


## Tip

Create a partial using a bound function if you want to import from the same `fromDir` multiple times:

```js
const importFromFoo = importFrom.bind(null, 'foo');

importFromFoo('./bar');
importFromFoo('./baz');
```


## Related

- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [resolve-from](https://github.com/sindresorhus/resolve-from) - Resolve the path of a module from a given path
- [resolve-cwd](https://github.com/sindresorhus/resolve-cwd) - Resolve the path of a module from the current working directory
- [resolve-pkg](https://github.com/sindresorhus/resolve-pkg) - Resolve the path of a package regardless of it having an entry point
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import modules lazily


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
