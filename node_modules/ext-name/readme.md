# ext-name [![Build Status](https://travis-ci.org/kevva/ext-name.svg?branch=master)](https://travis-ci.org/kevva/ext-name)

> Get the file extension and MIME type from a file


## Install

```
$ npm install --save ext-name
```


## Usage

```js
const extName = require('ext-name');

console.log(extName('foobar.tar'));
//=> [{ext: 'tar', mime: 'application/x-tar'}]

console.log(extName.mime('application/x-tar'));
//=> [{ext: 'tar', mime: 'application/x-tar'}]
```


## API

### extName(filename)

Returns an `Array` with objects with the file extension and MIME type.

#### filename

Type: `string`

Get the extension and MIME type from a filename.

### extName.mime(mimetype)

Returns an `Array` with objects with the file extension and MIME type.

#### mimetype

Type: `string`

Get the extension and MIME type from a MIME type.


## Related

* [ext-name-cli](https://github.com/kevva/ext-name-cli) - CLI for this module
* [file-type](https://github.com/sindresorhus/file-type) - Detect the file type of a Buffer/Uint8Array


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
