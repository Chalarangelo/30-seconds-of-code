# temp-dir [![Build Status](https://travis-ci.org/sindresorhus/temp-dir.svg?branch=master)](https://travis-ci.org/sindresorhus/temp-dir)

> Get the real path of the system temp directory

[The `os.tmpdir()` built-in doesn't return the real path.](https://github.com/nodejs/node/issues/11422) That can cause problems when the returned path is a symlink, which is the case on macOS. Use this module to get the resolved path.


## Install

```
$ npm install --save temp-dir
```


## Usage

```js
const tempDir = require('temp-dir');

console.log(tempDir);
//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'

console.log(require('os').tmpdir());
//=> '/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T' // <= Symlink
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
