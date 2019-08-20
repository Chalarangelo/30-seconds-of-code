# with-open-file [![Build Status](https://travis-ci.org/raphinesse/with-open-file.svg?branch=master)](https://travis-ci.org/raphinesse/with-open-file)

> Do stuff with an open file, knowing it will finally be closed

Because the built-in way requires way too much boilerplate.


## Install

```
$ npm install with-open-file
```


## Usage

```js
const withOpenFile = require('with-open-file')

withOpenFile('foo.txt', 'r', fd => {
  // Process file using fd
})

withOpenFile.sync('foo.txt', 'r', fd => {
  // Process file synchronously using fd
})
```


## API

### withOpenFile(...openArgs, callback)

Returns a `Promise` wrapping the result of calling `callback` with the requested file descriptor.

### withOpenFile.sync(...openArgs, callback)

Returns the result of calling `callback` with the requested file descriptor.

#### ...openArgs

Arguments as supported by [`fs.openSync`](https://nodejs.org/api/fs.html#fs_fs_opensync_path_flags_mode)

#### callback

Type: `function`


## License

MIT © Raphael von der Grün
