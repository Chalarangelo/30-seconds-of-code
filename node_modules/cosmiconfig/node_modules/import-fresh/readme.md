# import-fresh [![Build Status](https://travis-ci.org/sindresorhus/import-fresh.svg?branch=master)](https://travis-ci.org/sindresorhus/import-fresh)

> Import a module while bypassing the [cache](https://nodejs.org/api/modules.html#modules_caching)

Useful for testing purposes when you need to freshly import a module.


## Install

```
$ npm install --save import-fresh
```


## Usage

```js
// foo.js
let i = 0;
module.exports = () => ++i;
```

```js
const importFresh = require('import-fresh');

require('./foo')();
//=> 1

require('./foo')();
//=> 2

importFresh('./foo')();
//=> 1

importFresh('./foo')();
//=> 1
```


## Related

- [clear-module](https://github.com/sindresorhus/clear-module) - Clear a module from the import cache
- [import-from](https://github.com/sindresorhus/import-from) - Import a module from a given path
- [import-cwd](https://github.com/sindresorhus/import-cwd) - Import a module from the current working directory
- [import-lazy](https://github.com/sindresorhus/import-lazy) - Import modules lazily


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
