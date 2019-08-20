# 7.0.1

- Updated: `postcss` to 7.0.2 (patch)
- Updated: `postcss-selector-parser` to 5.0.0-rc.4 (patch)
- Updated: `postcss-value-parser` to 3.3.1 (patch)

# 7.0.0

- Changed: Updated postcss-selector-parser to version 5.0.0-rc.3
- Changed: Dropped reduce-css-calc as a dependency
- Fixed: Support constant() and env() ([#42](https://github.com/postcss/postcss-calc/issues/42), [#48](https://github.com/postcss/postcss-calc/issues/48))
- Fixed: Support custom properties with "calc" in its name ([#50](https://github.com/postcss/postcss-calc/issues/50))
- Fixed: Remove unnecessary whitespace around `*` and `/` ([cssnano#625](https://github.com/cssnano/cssnano/issues/625))
- Fixed: Arithmetic bugs around subtraction ([#49](https://github.com/postcss/postcss-calc/issues/49))
- Fixed: Handling of nested calc statements ([reduce-css-calc#49](https://github.com/MoOx/reduce-css-calc/issues/49))
- Fixed: Bugs regarding complex calculations ([reduce-cs-calc#45](https://github.com/MoOx/reduce-css-calc/issues/45))
- Fixed: `100%` incorrectly being transformed to `1` ([reduce-css-calc#44](https://github.com/MoOx/reduce-css-calc/issues/44))
- Added: support for case-insensitive calc statements

# 6.0.2 - 2018-09-25

- Fixed: use PostCSS 7 (thanks to @douglasduteil)

# 6.0.1 - 2017-10-10

- Fixed: throwing error for attribute selectors without a value

# 6.0.0 - 2017-05-08

- Breaking: Updated PostCSS from v5.x to v6.x, and reduce-css-calc from v1.x
  to v2.x (thanks to @andyjansson).

# 5.3.1 - 2016-08-22

- Fixed: avoid security issue related to ``reduce-css-calc@< 1.2.4``.

# 5.3.0 - 2016-07-11

- Added: support for selector transformation via `selectors` option.
  ([#29](https://github.com/postcss/postcss-calc/pull/29) - @uniquegestaltung)

# 5.2.1 - 2016-04-10

- Fixed: support for multiline value
  ([#27](https://github.com/postcss/postcss-calc/pull/27)) 

# 5.2.0 - 2016-01-08

- Added: "mediaQueries" option for `@media` support
([#22](https://github.com/postcss/postcss-calc/pull/22))

# 5.1.0 - 2016-01-07

- Added: "warnWhenCannotResolve" option to warn when calc() are not reduced to a single value
([#20](https://github.com/postcss/postcss-calc/pull/20))

# 5.0.0 - 2015-08-25

- Removed: compatibility with postcss v4.x
- Added: compatibility with postcss v5.x

# 4.1.0 - 2015-04-09

- Added: compatibility with postcss v4.1.x ([#12](https://github.com/postcss/postcss-calc/pull/12))

# 4.0.1 - 2015-04-09

- Fixed: `preserve` option does not create duplicated values ([#7](https://github.com/postcss/postcss-calc/issues/7))

# 4.0.0 - 2015-01-26

- Added: compatibility with postcss v4.x
- Changed: partial compatiblity with postcss v3.x (stack traces have lost filename)

# 3.0.0 - 2014-11-24

- Added: GNU like exceptions ([#4](https://github.com/postcss/postcss-calc/issues/4))
- Added: `precision` option ([#5](https://github.com/postcss/postcss-calc/issues/5))
- Added: `preserve` option ([#6](https://github.com/postcss/postcss-calc/issues/6))

# 2.1.0 - 2014-10-15

- Added: source of the error (gnu like message) (fix [#3](https://github.com/postcss/postcss-calc/issues/3))

# 2.0.1 - 2014-08-10

- Fixed: correctly ignore unrecognized values (fix [#2](https://github.com/postcss/postcss-calc/issues/2))

# 2.0.0 - 2014-08-06

- Changed: Plugin now return a function to have a consistent api. ([ref 1](https://github.com/ianstormtaylor/rework-color-function/issues/6), [ref 2](https://twitter.com/jongleberry/status/496552790416576513))

# 1.0.0 - 2014-08-04

✨ First release based on [rework-calc](https://github.com/reworkcss/rework-calc) v1.1.0 (code mainly exported to [`reduce-css-calc`](https://github.com/MoOx/reduce-css-calc))
