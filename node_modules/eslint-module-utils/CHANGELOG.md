# Change Log
All notable changes to this module will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## Unreleased

## v2.4.1 - 2019-07-19

### Fixed
 - Improve parse perf when using `@typescript-eslint/parser` ([#1409], thanks [@bradzacher])
 - Improve support for Typescript declare structures ([#1356], thanks [@christophercurrie])

## v2.4.0 - 2019-04-13

### Added
 - no-useless-path-segments: Add noUselessIndex option ([#1290], thanks [@timkraut])

### Fixed
 - Fix overwriting of dynamic import() CallExpression ([`no-cycle`], [`no-relative-parent-import`], [`no-unresolved`], [`no-useless-path-segments`]) ([#1218], [#1166], [#1035], thanks [@vikr01])


## v2.3.0 - 2019-01-22
### Fixed
- use `process.hrtime()` for cache dates ([#1160], thanks [@hulkish])

## v2.2.0 - 2018-03-29
### Changed
- `parse`: attach node locations by default.
- `moduleVisitor`: visitor now gets the full `import` statement node as a second
  argument, so rules may report against the full statement / `require` call instead
  of only the string literal node.

## v2.1.1 - 2017-06-22

Re-releasing v2.1.0 after vetting (again) and unable to reproduce issue.


## v2.1.0 - 2017-06-02 [YANKED]

Yanked due to critical issue with cache key resulting from #839.

### Added
- `parse` now additionally passes `filePath` to `parser` in `parserOptions` like `eslint` core does

## v2.0.0 - 2016-11-07
### Changed
- `unambiguous` no longer exposes fast test regex

### Fixed
- `unambiguous.test()` regex is now properly in multiline mode



[#1409]: https://github.com/benmosher/eslint-plugin-import/pull/1409
[#1356]: https://github.com/benmosher/eslint-plugin-import/pull/1356
[#1290]: https://github.com/benmosher/eslint-plugin-import/pull/1290
[#1218]: https://github.com/benmosher/eslint-plugin-import/pull/1218
[#1166]: https://github.com/benmosher/eslint-plugin-import/issues/1166
[#1160]: https://github.com/benmosher/eslint-plugin-import/pull/1160
[#1035]: https://github.com/benmosher/eslint-plugin-import/issues/1035

[@hulkish]: https://github.com/hulkish
[@timkraut]: https://github.com/timkraut
[@vikr01]: https://github.com/vikr01
[@bradzacher]: https://github.com/bradzacher
[@christophercurrie]: https://github.com/christophercurrie
