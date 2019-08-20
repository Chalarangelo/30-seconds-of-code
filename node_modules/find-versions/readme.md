# find-versions [![Build Status](https://travis-ci.com/sindresorhus/find-versions.svg?branch=master)](https://travis-ci.com/sindresorhus/find-versions)

> Find semver versions in a string: `unicorn v1.2.3` → `1.2.3`


## Install

```
$ npm install find-versions
```


## Usage

```js
const findVersions = require('find-versions');

findVersions('unicorn v1.2.3 rainbow 2.3.4+build.1');
//=> ['1.2.3', '2.3.4+build.1']

findVersions('cp (GNU coreutils) 8.22', {loose: true});
//=> ['8.22.0']
```


## API

### findVersions(stringWithVersions, [options])

#### stringWithVersions

Type: `string`

#### options

Type: `Object`

##### loose

Type: `boolean`
Default: `false`

Also match non-semver versions like `1.88`. They're coerced into semver compliant versions.


## Related

- [find-versions-cli](https://github.com/sindresorhus/find-versions-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
