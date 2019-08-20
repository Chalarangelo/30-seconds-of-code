# [hex-color-regex][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> The best regular expression (regex) for matching hex color values from string.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coverage-img]][coverage-url] [![dependency status][david-img]][david-url]


## Install
```
npm i hex-color-regex --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

- `[opts]` **{Object}** pass `strict: true` for strict mode
- `return` **{RegExp}**

**Example**

```js
var hexColorRegex = require('hex-color-regex')

hexColorRegex().test('#f3f}') //=> true
hexColorRegex({strict: true}).test('#f3f}') //=> false

hexColorRegex().test('foo #f3f bar') //=> true
hexColorRegex({strict: true}).test('foo #f3f bar') //=> false

hexColorRegex().test('#a54f2c}') //=> true
hexColorRegex({strict: true}).test('#a54f2c}') //=> false

hexColorRegex().test('foo #a54f2c bar') //=> true
hexColorRegex({strict: true}).test('foo #a54f2c bar') //=> false

hexColorRegex().test('#ffff') //=> false
hexColorRegex().test('ffff') //=> false

hexColorRegex().test('#fff') //=> true
hexColorRegex().test('fff') //=> false

hexColorRegex().test('#4g1') //=> false
hexColorRegex().test('4g1') //=> false
hexColorRegex().test('#zY1') //=> false
hexColorRegex().test('zY1') //=> false
hexColorRegex().test('#7f68ZY') //=> false
hexColorRegex().test('7f68ZY') //=> false
hexColorRegex().test('ffffff') //=> false

hexColorRegex().test('#afebe3') //=> true
hexColorRegex().test('#AFEBE3') //=> true
hexColorRegex().test('#3cb371') //=> true
hexColorRegex().test('#3CB371') //=> true
hexColorRegex().test('#556b2f') //=> true
hexColorRegex().test('#556B2F') //=> true
hexColorRegex().test('#708090') //=> true
hexColorRegex().test('#7b68ee') //=> true
hexColorRegex().test('#7B68EE') //=> true
hexColorRegex().test('#eeeeee') //=> true
hexColorRegex().test('#ffffff') //=> true
hexColorRegex().test('#111111') //=> true

hexColorRegex().test('#afe') //=> true
hexColorRegex().test('#AF3') //=> true
hexColorRegex().test('#3cb') //=> true
hexColorRegex().test('#3CB') //=> true
hexColorRegex().test('#b2f') //=> true
hexColorRegex().test('#5B2') //=> true
hexColorRegex().test('#708') //=> true
hexColorRegex().test('#68e') //=> true
hexColorRegex().test('#7AF') //=> true
hexColorRegex().test('#777') //=> true
hexColorRegex().test('#FFF') //=> true
hexColorRegex().test('#fff') //=> true
```


## Matching groups

- `match[0]` hex value with hash - `#f3f3f3`
- `match[1]` hex value without the hash - `f3f3f3`

**Example**

```js
hexColorRegex().exec('foo #fff bar')
//=> [ '#fff', 'fff', index: 4, input: 'foo #fff bar' ]

hexColorRegex({strict: true}).exec('foo #fff bar')
//=> null

hexColorRegex().exec('foo #f3f3f3 bar')
//=> [ '#f3f3f3', 'f3f3f3', index: 4, input: 'foo #f3f3f3 bar' ]

hexColorRegex({strict: true}).exec('foo #f3f3f3 bar')
//=> null
```


## Related
- [benz](https://github.com/tunnckocore/benz): Compose your control flow with absolute elegance. Support async/await, callbacks, thunks, generators, promises, observables, child… [more](https://github.com/tunnckocore/benz)
- [is-hexcolor](https://github.com/tunnckocore/is-hexcolor): Check that given value is valid hex color, using `hex-color-regex` - the best regex for… [more](https://github.com/tunnckocore/is-hexcolor)
- [is-ansi](https://github.com/tunnckocore/is-ansi): Check that given string contain ANSI color codes, without CLI
- [is-missing](https://github.com/tunnckocore/is-missing): Check that given `name` or `user/repo` exists in npm registry or in github as user… [more](https://github.com/tunnckocore/is-missing)
- [is-kindof](https://github.com/tunnckocore/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Thin wrapper… [more](https://github.com/tunnckocore/is-kindof)
- [is-typeof-error](https://github.com/tunnckocore/is-typeof-error): Check that given value is any type of error and instanceof Error
- [is-async-function](https://github.com/tunnckocore/is-async-function): Check that given function is async (callback) function or not. Trying to guess that based… [more](https://github.com/tunnckocore/is-async-function)
- [kind-error](https://github.com/tunnckocore/kind-error): Correct inheriting from `Error`. Supports constructing from an object of properties - focused on assertion.
- [kind-of-extra](https://github.com/tunnckocore/kind-of-extra): Extends `kind-of` type check utility with support for promises, generators, streams and errors. Like `kindof(Promise.resolve(1))… [more](https://github.com/tunnckocore/kind-of-extra)
- [vez](https://github.com/tunnckocore/vez): Middleware composition at new level. Ultimate alternative to `ware`, `plugins`, `koa-compose` and `composition` packages. Allows… [more](https://github.com/tunnckocore/vez)


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/regexhq/hex-color-regex/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/hex-color-regex
[npmjs-img]: https://img.shields.io/npm/v/hex-color-regex.svg?label=hex-color-regex

[license-url]: https://github.com/regexhq/hex-color-regex/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/regexps/hex-color-regex
[codeclimate-img]: https://img.shields.io/codeclimate/github/regexps/hex-color-regex.svg

[coverage-url]: https://codeclimate.com/github/regexps/hex-color-regex
[coverage-img]: https://img.shields.io/codeclimate/coverage/github/regexps/hex-color-regex.svg

[travis-url]: https://travis-ci.org/regexhq/hex-color-regex
[travis-img]: https://img.shields.io/travis/regexhq/hex-color-regex.svg

[coveralls-url]: https://coveralls.io/r/regexhq/hex-color-regex
[coveralls-img]: https://img.shields.io/coveralls/regexhq/hex-color-regex.svg

[david-url]: https://david-dm.org/regexhq/hex-color-regex
[david-img]: https://img.shields.io/david/dev/regexhq/hex-color-regex.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
