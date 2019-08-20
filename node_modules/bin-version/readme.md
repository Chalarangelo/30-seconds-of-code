# bin-version [![Build Status](https://travis-ci.com/sindresorhus/bin-version.svg?branch=master)](https://travis-ci.com/sindresorhus/bin-version)

> Get the version of a binary in [semver](https://github.com/npm/node-semver) format


## Install

```
$ npm install bin-version
```


## Usage

```
$ curl --version
curl 7.30.0 (x86_64-apple-darwin13.0)
```

```js
const binVersion = require('bin-version');

(async () => {
	console.log(await binVersion('curl'));
	//=> '7.30.0'
})();
```

```
$ openssl version
OpenSSL 1.0.2d 9 Jul 2015
```

```js
(async () => {
	console.log(await binVersion('openssl', {args: ['version']}));
	//=> '1.0.2'
})();
```

## API

### binVersion(binary, [options])

Returns a `Promise<string>` with the version of the `binary`.

#### binary

Type: `string`

The name of or path to the binary to get the version from.

#### options

Type: `object`

##### args

Type: `string[]`
Default: `['--version']`

The arguments to pass to `binary` so that it will print its version.

## Related

- [bin-version-cli](https://github.com/sindresorhus/bin-version-cli) - CLI for this module
- [find-versions](https://github.com/sindresorhus/find-versions) - Find semver versions in a string


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
