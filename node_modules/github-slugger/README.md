# github-slugger

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/github-slugger.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/github-slugger
[travis-image]: https://img.shields.io/travis/Flet/github-slugger.svg?style=flat-square
[travis-url]: https://travis-ci.org/Flet/github-slugger

Generate a slug just like GitHub does for markdown headings. It also ensures slugs are unique in the same way GitHub does it. The overall goal of this package is to emulate the way GitHub handles generating markdown heading anchors as close as possible.

## Install

```
npm install github-slugger
```

## Usage

```js
var GithubSlugger = require('github-slugger')
var slugger = new GithubSlugger()

slugger.slug('foo')
// returns 'foo'

slugger.slug('foo')
// returns 'foo-1'

slugger.slug('bar')
// returns 'bar'

slugger.slug('foo')
// returns 'foo-2'

slugger.reset()

slugger.slug('foo')
// returns 'foo'

```
Check `test/index.js` for more examples.

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE)
