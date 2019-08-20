# magic-string changelog

## 0.22.5

* Add TypeScript interfaces used by rollup ([#131](https://github.com/Rich-Harris/magic-string/pull/131))
* Remove src directory from npm package

## 0.22.4

* `contentOnly` and `storeName` are both optional

## 0.22.3

* Add `original` to TS definitions

## 0.22.2

* Avoid `declare module` ([#127](https://github.com/Rich-Harris/magic-string/pull/127))

## 0.22.1

* Update TypeScript definitions ([#124](https://github.com/Rich-Harris/magic-string/pull/124))

## 0.22.0

* Prevent `overwrite` state corruption ([#115](https://github.com/Rich-Harris/magic-string/issues/115))
* Various bugfixes ([#126](https://github.com/Rich-Harris/magic-string/pull/126))

## 0.21.3

* Clone `indentExclusionRanges` correctly ([#122](https://github.com/Rich-Harris/magic-string/pull/122))
* Fix more typings ([#122](https://github.com/Rich-Harris/magic-string/pull/122))

## 0.21.2

* Add `default` property referencing self in index-legacy.js, to work around TypeScript bug ([#121](https://github.com/Rich-Harris/magic-string/pull/121))

## 0.21.1

* Add typings file to package

## 0.21.0

* Add TypeScript bindings ([#119](https://github.com/Rich-Harris/magic-string/pull/119))

## 0.20.0

* The fourth argument to `overwrite` is a `{storeName, contentOnly}` options object. `storeName: true` is equivalent to `true` before. `contentOnly` will preserve existing appends/prepends to the chunk in question

## 0.19.1

* Prevent overwrites across a split point (i.e. following a `move`)
* Implement `remove` separately to `overwrite`

## 0.19.0

* More accurate bundle sourcemaps ([#114](https://github.com/Rich-Harris/magic-string/pull/114))

## 0.18.0

* Optimisation – remove empty chunks following `overwrite` or `remove` ([#113](https://github.com/Rich-Harris/magic-string/pull/113))

## 0.17.0

* Add `appendLeft`, `appendRight`, `prependLeft`, `prependRight` methods ([#109](https://github.com/Rich-Harris/magic-string/issues/109))
* `insertLeft` and `insertRight` are deprecated in favour of `appendLeft` and `prependRight` respectively

## 0.16.0

* Include inserts in range for `overwrite` and `remove` operations ([#89](https://github.com/Rich-Harris/magic-string/pull/89))
* Make options optional for `bundle.generateMap(...)` ([#73](https://github.com/Rich-Harris/magic-string/pull/73))

## 0.15.2

* Generate correct bundle sourcemap with prepended/appended content

## 0.15.1

* Minor sourcemap fixes

## 0.15.0

* Use named export of `Bundle` in ES build, so ES consumers of magic-string can tree-shake it out

## 0.14.0

* Throw if overwrite of zero-length range is attempted
* Correctly handle redundant move operations

## 0.13.1

* Fix a bevy of `s.slice()` issues ([#62](https://github.com/Rich-Harris/magic-string/pull/62))

## 0.13.0

* Breaking: `insertAfter` is now `insertLeft`, `insertBefore` is now `insertRight`
* Breaking: `insert` is no longer available. Use `insertLeft` and `insertRight`
* Significant performance improvements

## 0.12.1

* Fix sourcemap generation with `insertAfter` and `insertBefore`

## 0.12.0

* Add `insertAfter` and `insertBefore` methods

## 0.11.4

* Fix two regression bugs with `trim()`
* More informative error message on illegal removals

## 0.11.3

* Fix trim methods to ensure correct sourcemaps with trimmed content ([#53](https://github.com/Rich-Harris/magic-string/pull/53))

## 0.11.2

* Support sourcemaps with moved content

## 0.11.1

* Use `findIndex` helper for 0.12 support

## 0.11.0

* Add experimental `move()` method
* Refactor internals to support `move()`

## 0.10.2

* Do not overwrite inserts at the end of patched ranges ([#35](https://github.com/Rich-Harris/magic-string/pull/35))

## 0.10.1

* Zero-length inserts are not removed on adjacent overwrites

## 0.10.0

* Complete rewrite, resulting in ~40x speed increase ([#30](https://github.com/Rich-Harris/magic-string/pull/30))
* Breaking – `magicString.locate` and `locateOrigin` are deprecated
* More forgiving rules about contiguous patches, and which ranges are valid with `magicString.slice(...)`

## 0.9.1

* Update deps

## 0.9.0

* Update build process

## 0.8.0

* Add an ES6 build, change default UMD build to CommonJS (but keeping existing UMD build with bundled dependencies)
* Make properties non-enumerable, for cleaner logging
* Update dependencies

## 0.7.0

* The `names` array is populated when generating sourcemaps, and mappings include name indices where appropriate ([#16](https://github.com/Rich-Harris/magic-string/issues/16))
* Replaced content is mapped correctly in sourcemaps ([#15](https://github.com/Rich-Harris/magic-string/issues/15))

## 0.6.6

* Adjust mappings correctly when removing replaced content
* Error correctly when removed characters are used as slice anchors

## 0.6.5

* Fix `jsnext:main` in package.json

## 0.6.4

* Fix bug with positive integer coercion

## 0.6.3

* Intro content is correctly indented
* Content following an intro with trailing newline is correctly indented

## 0.6.2

* Noop indents are still chainable (fixes bug introduced in 0.6.1)

## 0.6.1

* Indenting with an empty string is a noop

## 0.6.0

* Use rollup for bundling, instead of esperanto

## 0.5.3

* Correct sourcemap generation with bundles containing varied separators
* `s.clone()` clones indent exclusion ranges and sourcemap locations

## 0.5.2

* `s.slice()` accepts negative numbers, and the second argument can be omitted (means 'original string length'), just like `String.prototype.slice`
* More informative error message when trying to overwrite content illegally

## 0.5.1

* Allow bundle separator to be the empty string
* Indenting is handled correctly with empty string separator

## 0.5.0

* `s.replace()` is deprecated in favour of `s.overwrite()` (identical signature)
* `bundle.addSource()` can take a `MagicString` instance as its sole argument, for convenience
* The `options` in `new MagicString(str, options)` can include `filename` and `indentExclusionRanges` options, which will be used when bundling
* New method: `s.snip( start, end )`

## 0.4.9

* `file` option is optional when generating a bundle sourcemap

## 0.4.7

* Repeated insertions at position 0 behave the same as other positions ([#10](https://github.com/Rich-Harris/magic-string/pull/10))

## 0.4.6

* Overlapping ranges can be removed
* Non-string content is rejected ([#9](https://github.com/Rich-Harris/magic-string/pull/9))

## 0.4.5

* Implement `source.addSourcemapLocation()`

## 0.4.4

* Another Windows fix, this time for file paths when bundling

## 0.4.3

* Handle Windows-style CRLF newlines when determining whether a line is empty

## 0.4.2

* Fix typo in package.json (d'oh again)
* Use only relative paths for internal modules - makes bundling with dependents (i.e. esperanto) possible

## 0.4.1

* Includes correct files in npm package (d'oh)

## 0.4.0

* Using experimental Esperanto feature ([esperantojs/esperanto#68](https://github.com/esperantojs/esperanto/issues/68)) to generate version with `vlq` dependency included

## 0.3.1

* Fixes a bug whereby multiple insertions at the same location would cause text to repeat ([#5](https://github.com/Rich-Harris/magic-string/issues/5))

## 0.3.0

* Breaking change - `source.indentStr` is `null` if no lines are indented. Use `source.getIndentString()` for the old behaviour (guess, and if no lines are indented, return `\t`)
* `bundle.getIndentString()` ignores sources with no indented lines when guessing indentation ([#3](https://github.com/Rich-Harris/magic-string/issues/3))

## 0.2.7

* `source.trimLines()` removes empty lines from start/end of source, leaving other whitespace untouched
* Indentation is not added to an empty source

## 0.2.6

* Performance improvement - adjustments are only made when necessary

## 0.2.5

* Single spaces are ignored when guessing indentation - experience shows these are more likely to be e.g. JSDoc comments than actual indentation
* `bundle.addSource()` can take an `indentExclusionRanges` option

## 0.2.4

* Empty lines are not indented

## 0.2.3

* Fixes edge case with bundle sourcemaps

## 0.2.2

* Make `sources` paths in sourcemaps relative to `options.file`

## 0.2.1

* Minor fix for `bundle.indent()`

## 0.2.0

* Implement `MagicString.Bundle` for concatenating magic strings

## 0.1.10

* Fix sourcemap encoding

## 0.1.9

* Better performance when indenting large chunks of code

## 0.1.8

* Sourcemaps generated with `s.generateMap()` have a `toUrl()` method that generates a DataURI

## 0.1.7

* Implement `s.insert( index, content )` - roughly equivalent to `s.replace( index, index, content )`

## 0.1.6

* Version bump for npm's benefit

## 0.1.5

* `s.indent({ exclude: [ x, y ] })` prevents lines between (original) characters `x` and `y` from being indented. Multiple exclusion ranges are also supported (e.g. `exclude: [[a, b], [c, d]]`)

## 0.1.4

* `s.locate()` doesn't throw out-of-bound error if index is equal to original string's length

## 0.1.3

* `s.trim()` returns `this` (i.e. is chainable)

## 0.1.2

* Implement `s.slice()`

## 0.1.1

* Implement `s.trim()`

## 0.1.0

* First release
