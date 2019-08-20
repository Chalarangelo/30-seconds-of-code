# semver-truncate [![Build Status](https://travis-ci.org/sindresorhus/semver-truncate.svg?branch=master)](https://travis-ci.org/sindresorhus/semver-truncate)

> Truncate a semver version: `1.2.3` → `1.2.0`


## Install

```
$ npm install --save semver-truncate
```


## Usage

```js
const semverTruncate = require('semver-truncate');

semverTruncate('1.2.3-foo', 'patch');
//=> '1.2.3'

semverTruncate('1.2.3', 'minor');
//=> '1.2.0'

semverTruncate('1.2.3', 'major');
//=> '1.0.0'
```


## API

### truncateSemver(version, type)

#### version

Type: `string`

Semver version.

#### type

Type: `string`  
Values: `patch` `minor` `major`

Version type to truncate to.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
