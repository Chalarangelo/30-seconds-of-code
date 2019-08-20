# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Changed
- Nothing yet.

## [0.0.11] - 2015-07-19
### Fixed
- Localisation of animation properties.

## [0.0.10] - 2015-06-17
### Added
- Localised at-rules.

## [0.0.9] - 2015-06-12
### Changed
- Using global selectors outside of a global context no longer triggers warnings. Instead, this functionality will be provided by a CSS Modules linter.

### Fixed
- Keyframe rules.

## [0.0.8] - 2015-06-11
### Added
- Pure mode where only local scope is allowed.

### Changed
- Using global selectors outside of a global context now triggers warnings.

## [0.0.7] - 2015-05-30
### Changed
- Migrated to `css-selector-tokenizer`.

## [0.0.6] - 2015-05-28
### Changed
- Renamed project to `postcss-modules-local-by-default`.

## [0.0.5] - 2015-05-22
### Added
- Support for css-loader [inheritance](https://github.com/webpack/css-loader#inheriting) and [local imports](https://github.com/webpack/css-loader#importing-local-class-names).

## [0.0.4] - 2015-05-22
### Changed
- Hide global leak detection behind undocumented `lint` option until it's more robust.

## [0.0.3] - 2015-05-22
### Changed
- Transformer output now uses the new `:local(.identifier)` syntax.

### Added
- Simple global leak detection. Non-local selectors like `input{}` and `[data-foobar]` now throw when not marked as global.

## [0.0.2] - 2015-05-14
### Added
- Support for global selectors appended directly to locals, e.g. `.foo:global(.bar)`

## 0.0.1 - 2015-05-12
### Added
- Automatic local classes
- Explicit global selectors with `:global`

[unreleased]: https://github.com/postcss-modules-local-by-default/compare/v0.0.10...HEAD
[0.0.2]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.1...v0.0.2
[0.0.3]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.2...v0.0.3
[0.0.4]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.3...v0.0.4
[0.0.5]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.4...v0.0.5
[0.0.6]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.5...v0.0.6
[0.0.7]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.6...v0.0.7
[0.0.8]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.7...v0.0.8
[0.0.9]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.8...v0.0.9
[0.0.10]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.9...v0.0.10
[0.0.11]:      https://github.com/postcss-modules-local-by-default/compare/v0.0.10...v0.0.11
