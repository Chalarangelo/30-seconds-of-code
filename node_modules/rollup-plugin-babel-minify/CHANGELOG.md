# rollup-plugin-babel-minify Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

---

## [4.0.0] – 2018-02-03
### Added
* [#60] Add proper Code of Conduct.
* [#16] Support for new line after banner via new configuration variable, `bannerNewLine`.
* [#83] Add coverage badge.

### Changed
* [#86] Update `babel-preset-minify` to `^0.3.0` – **BREAKING CHANGE**.

### Deprecated
* [#69] Deprecate support for Node <6.

### Fixed
* [#73] Banner is not inherited from root configuration.
* [#71] Published version of the package contains incorrect version number in the banner comment.

## [3.1.2] – 2017-08-14
### Changed
* [#47] Change name from `rollup-plugin-babili` to `rollup-plugin-babel-minify` and update dependencies accordingly.

## [3.1.1] – 2017-08-12
### Changed
* [#48] Update Rollup version to `^0.47.0`.

## [3.1.0] – 2017-06-10
#### Added
* [#25] Add support for Node.js 8 and npm 5.

### Changed
* [#21] Update Babili version to `^0.1.2`.
* [#24] Update Rollup version to `^0.42.0`.
* [#20] Add Rollup as peer dependency.

## [3.0.0] – 2017-04-22
### Changed
* [#14] Handling of banner option should be better now, thanks to [Alex Khomchenko](https://github.com/gagoman)!

## [2.0.0] – 2017-03-18
### Changed
* [#12] Update Babili version to `^0.0.12`.
* [#13] Update rollup to `^0.41.5`

### Removed
* [#13] Remove `fixMappings`, both from code and public API – after upgrading Rollup is not longer needed.

## [1.1.1] – 2017-01-25
### Changed
* [`31ace29`] Move changelog to Keep a Changelog standard.

### Fixed
* [`ba2a354`] Apply `fixMappings` to all mappings.

## [1.1.0] – 2017-01-21
### Added
* [#6] Pass options to Babili preset.

## [1.0.3] – 2017-01-19
### Fixed
* [`657d5b9`] Fix this changelog (one day I will not forget about it).
* [`c2bec58`] Explicitly pass preset to babel to avoid problems with node 4.x and npm 2.x.

## [1.0.2] – 2017-01-19
### Fixed
* [`b067cf3`] Explicitly pass banner plugin to babel to avoid problems with node 4.x and npm 2.x.

## [1.0.1] – 2017-01-19
### Changed
* [#8] Change name from `rollup-plugin-real-babili` to `rollup-plugin-babili`.

### Fixed
* [`c8a3f56`] Add support for empty sourcemap's mappings.

## [1.0.0] – 2017-01-18
### Added
* First stable version, yay!

### Fixed
* [#1] Fix for incomplete sourcemap mappings causing an error.

[`31ace29`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/31ace298ff94d58aee8fd13b9aeda39ab59a60c0
[`ba2a354`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/ba2a354ae8859a7127a74a4b89a7071cf8028c10
[`657d5b9`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/657d5b9be3ae7f65b3f3b6d79995992dede70b15
[`c2bec58`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/c2bec58c6b921193cfc42e1d6124966d74356eab
[`b067cf3`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/b067cf38948f0c432d1ad495162f3bd34cd70b59
[`c8a3f56`]: https://github.com/Comandeer/rollup-plugin-babel-minify/commit/c8a3f562a86deeaff0f57013afe97e1267c75180
[#1]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/1
[#6]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/6
[#8]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/8
[#12]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/12
[#13]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/13
[#14]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/14
[#16]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/16
[#20]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/20
[#21]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/21
[#24]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/24
[#25]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/25
[#47]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/47
[#48]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/48
[#60]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/60
[#69]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/69
[#71]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/71
[#73]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/73
[#83]: https://github.com/Comandeer/rollup-plugin-babel-minify/issues/83
[#86]: https://github.com/Comandeer/rollup-plugin-babel-minify/pull/86

[4.0.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v3.1.2...v4.0.0
[3.1.2]: https://github.com/Comandeer/rollup-plugin-babili/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/Comandeer/rollup-plugin-babili/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Comandeer/rollup-plugin-babili/compare/v1.0.0-alpha3...v1.0.0
