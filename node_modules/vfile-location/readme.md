# vfile-location

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Convert between positions (line and column-based) and offsets (range-based)
locations in a [virtual file][vfile].

## Install

[npm][]:

```sh
npm install vfile-location
```

## Usage

```js
var vfile = require('vfile')
var vfileLocation = require('vfile-location')

var location = vfileLocation(vfile('foo\nbar\nbaz'))

var offset = location.toOffset({line: 3, column: 3}) // => 10
location.toPosition(offset) // => {line: 3, column: 3, offset: 10}
```

## API

### `location = vfileLocation(doc)`

Get transform functions for the given `doc` (`string`) or [`file`][vfile].

Returns an object with [`toOffset`][to-offset] and [`toPosition`][to-position].

### `location.toOffset(position)`

Get the `offset` (`number`) for a line and column-based [`position`][position]
in the bound file.
Returns `-1` when given invalid or out of bounds input.

### `location.toPosition(offset)`

Get the line and column-based [`position`][position] for `offset` in the bound
file.

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-location.svg

[build]: https://travis-ci.org/vfile/vfile-location

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-location.svg

[coverage]: https://codecov.io/github/vfile/vfile-location

[downloads-badge]: https://img.shields.io/npm/dm/vfile-location.svg

[downloads]: https://www.npmjs.com/package/vfile-location

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile-location.svg

[size]: https://bundlephobia.com/result?p=vfile-location

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/vfile

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/vfile/.github/blob/master/contributing.md

[support]: https://github.com/vfile/.github/blob/master/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile

[to-offset]: #locationtooffsetposition

[to-position]: #locationtopositionoffset

[position]: https://github.com/syntax-tree/unist#position
