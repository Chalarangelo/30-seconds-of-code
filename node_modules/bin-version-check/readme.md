# bin-version-check [![Build Status](https://travis-ci.org/sindresorhus/bin-version-check.svg?branch=master)](https://travis-ci.org/sindresorhus/bin-version-check)

> Check whether a binary version satisfies a [semver range](https://github.com/npm/node-semver#ranges)

Useful when you have a thing that only works with specific versions of a binary.


## Install

```
$ npm install bin-version-check
```


## Usage

```
$ curl --version
curl 7.30.0 (x86_64-apple-darwin13.0)
```

```js
const binVersionCheck = require('bin-version-check');

(async () => {
	try {
		await binVersionCheck('curl', '>=8');
	} catch (error) {
		console.log(error);
		//=> 'InvalidBinVersion: curl 7.30.0 doesn't satisfy the version requirement of >=8'
	}
})();
```


## API

### binVersionCheck(binary, semverRange, [options])

#### binary

Type: `string`

Name or path of the binary to check.

#### semverRange

Type: `string`

[Semver range](https://github.com/npm/node-semver#ranges) to check against.

#### options

Type: `Object`

##### args

Type: `string[]`
Default: `['--version']`

CLI arguments used to get the binary version.


## Related

- [bin-version-check-cli](https://github.com/sindresorhus/bin-version-check-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
