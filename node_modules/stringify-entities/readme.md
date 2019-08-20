# stringify-entities [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

Encode HTML character references and character entities.

*   [x] Very fast
*   [x] Just the encoding part
*   [x] Reliable: ``'`'`` characters are escaped to ensure no scripts
    run in IE6-8.  Additionally, only named entities recognised by HTML4
    are encoded, meaning the infamous `&apos;` (which people think is a
    [virus][]) won’t show up

## Algorithm

By default, all dangerous, non-ASCII, or non-printable ASCII characters
are encoded.  A [subset][] of characters can be given to encode just
those characters.  Alternatively, pass [`escapeOnly`][escapeonly] to
escape just the dangerous characters (`"`, `'`, `<`, `>`, `&`, `` ` ``).
By default, numeric entities are used.  Pass [`useNamedReferences`][named]
to use named entities when possible, or [`useShortestReferences`][short]
to use them if that results in less bytes.

## Installation

[npm][]:

```bash
npm install stringify-entities
```

## Usage

```js
var stringify = require('stringify-entities')

stringify('alpha © bravo ≠ charlie 𝌆 delta')
// => 'alpha &#xA9; bravo &#x2260; charlie &#x1D306; delta'

stringify('alpha © bravo ≠ charlie 𝌆 delta', {useNamedReferences: true})
// => 'alpha &copy; bravo &ne; charlie &#x1D306; delta'
```

## API

### `stringifyEntities(value[, options])`

Encode special characters in `value`.

##### `options`

###### `options.escapeOnly`

Whether to only escape possibly dangerous characters (`boolean`,
default: `false`).  Those characters are `"`, `'`, `<`, `>` `&`, and
`` ` ``.

###### `options.subset`

Whether to only escape the given subset of characters (`Array.<string>`).

###### `options.useNamedReferences`

Whether to use named entities where possible (`boolean?`, default:
`false`).

###### `options.useShortestReferences`

Whether to use named entities, where possible, if that results in less
bytes (`boolean?`, default: `false`).  **Note**: `useNamedReferences`
can be omitted when using `useShortestReferences`.

###### `options.omitOptionalSemicolons`

Whether to omit semi-colons when possible (`boolean?`, default: `false`).
**Note**: This creates parse errors: don’t use this except when building
a minifier.

Omitting semi-colons is possible for [certain][dangerous] [legacy][]
named references, and numeric entities, in some cases.

###### `options.attribute`

Only needed when operating dangerously with `omitOptionalSemicolons: true`.
Create entities which don’t fail in attributes (`boolean?`, default:
`false`).

## Related

*   [`parse-entities`](https://github.com/wooorm/parse-entities)
    — Parse HTML character references
*   [`character-entities`](https://github.com/wooorm/character-entities)
    — Info on character entities
*   [`character-entities-html4`](https://github.com/wooorm/character-entities-html4)
    — Info on HTML4 character entities
*   [`character-entities-legacy`](https://github.com/wooorm/character-entities-legacy)
    — Info on legacy character entities
*   [`character-reference-invalid`](https://github.com/wooorm/character-reference-invalid)
    — Info on invalid numeric character references

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/stringify-entities.svg

[build-status]: https://travis-ci.org/wooorm/stringify-entities

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/stringify-entities.svg

[coverage-status]: https://codecov.io/github/wooorm/stringify-entities

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[virus]: http://www.telegraph.co.uk/technology/advice/10516839/Why-do-some-apostrophes-get-replaced-with-andapos.html

[dangerous]: dangerous.json

[legacy]: https://github.com/wooorm/character-entities-legacy

[subset]: #optionssubset

[escapeonly]: #optionsescapeonly

[named]: #optionsusenamedreferences

[short]: #optionsuseshortestreferences
