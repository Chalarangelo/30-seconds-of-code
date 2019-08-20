# import-cwd [![Build Status](https://travis-ci.org/sindresorhus/import-cwd.svg?branch=master)](https://travis-ci.org/sindresorhus/import-cwd)

> Import a module like with [`require()`](https://nodejs.org/api/globals.html#globals_require) but from the current working directory


## Install

```
$ npm install --save import-cwd
```


## Usage

```js
const importCwd = require('import-cwd');

// Target module is at '/Users/sindresorhus/unicorn/foo.js'

console.log(__dirname);
//=> '/Users/sindresorhus/rainbow'

console.log(process.cwd());
//=> '/Users/sindresorhus/unicorn'

const foo = importCwd('./foo');
```


## API

### importCwd(moduleId)

Like `require()`, throws when the module can't be found.

### importCwd.silent(moduleId)

Returns `null` instead of throwing when the module can't be found.

#### moduleId

Type: `string`

What you would use in `require()`.


## Related

- [import-from](https://github.com/sindresorhus/import-from) - Import a module from a given path
- [resolve-from](https://github.com/sindresorhus/resolve-from) - Resolve the path of a module from a given path
- [resolve-cwd](https://github.com/sindresorhus/resolve-cwd) - Resolve the path of a module from the current working directory
- [resolve-pkg](https://github.com/sindresorhus/resolve-pkg) - Resolve the path of a package regardless of it having an entry point
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import modules lazily


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
