# read-pkg-up [![Build Status](https://travis-ci.org/sindresorhus/read-pkg-up.svg?branch=master)](https://travis-ci.org/sindresorhus/read-pkg-up)

> Read the closest package.json file


## Why

- [Finds the closest package.json](https://github.com/sindresorhus/find-up)
- [Gracefully handles filesystem issues](https://github.com/isaacs/node-graceful-fs)
- [Strips UTF-8 BOM](https://github.com/sindresorhus/strip-bom)
- [Throws more helpful JSON errors](https://github.com/sindresorhus/parse-json)
- [Normalizes the data](https://github.com/npm/normalize-package-data#what-normalization-currently-entails)


## Install

```
$ npm install --save read-pkg-up
```


## Usage

```js
const readPkgUp = require('read-pkg-up');

readPkgUp().then(result => {
	console.log(result);
	/*
	{
		pkg: {
			name: 'awesome-package',
			version: '1.0.0',
			...
		},
		path: '/Users/sindresorhus/dev/awesome-package/package.json'
	}
	*/
});
```


## API

### readPkgUp([options])

Returns a `Promise` for the result object.

### readPkgUp.sync([options])

Returns the result object.

#### options

##### cwd

Type: `string`<br>
Default: `.`

Directory to start looking for a package.json file.

##### normalize

Type: `boolean`<br>
Default: `true`

[Normalize](https://github.com/npm/normalize-package-data#what-normalization-currently-entails) the package data.


## Related

- [read-pkg](https://github.com/sindresorhus/read-pkg) - Read a package.json file
- [pkg-up](https://github.com/sindresorhus/pkg-up) - Find the closest package.json file
- [find-up](https://github.com/sindresorhus/find-up) - Find a file by walking up parent directories
- [pkg-conf](https://github.com/sindresorhus/pkg-conf) - Get namespaced config from the closest package.json


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
