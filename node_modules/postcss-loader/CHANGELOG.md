# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.6"></a>
## [2.1.6](https://github.com/postcss/postcss-loader/compare/v2.1.5...v2.1.6) (2018-07-10)


### Bug Fixes

* **package:** config memory leak, updates `postcss-load-config` v1.2.0...2.0.0 (`dependencies`) ([0547b12](https://github.com/postcss/postcss-loader/commit/0547b12))



<a name="2.1.5"></a>
## [2.1.5](https://github.com/postcss/postcss-loader/compare/v2.1.4...v2.1.5) (2018-05-04)


### Bug Fixes

* **index:** remove `sourceMap` warning ([#361](https://github.com/postcss/postcss-loader/issues/361)) ([4416791](https://github.com/postcss/postcss-loader/commit/4416791))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/postcss/postcss-loader/compare/v2.1.3...v2.1.4) (2018-04-16)


### Bug Fixes

* restore loader object in postcss config context ([#355](https://github.com/postcss/postcss-loader/issues/355)) ([2ff1735](https://github.com/postcss/postcss-loader/commit/2ff1735))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/postcss/postcss-loader/compare/v2.1.2...v2.1.3) (2018-03-20)


### Bug Fixes

* **options:** revert additionalProperties changes to keep SemVer ([bd7fc38](https://github.com/postcss/postcss-loader/commit/bd7fc38))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/postcss/postcss-loader/compare/v2.1.1...v2.1.2) (2018-03-17)


### Bug Fixes

* **options:** disallow additional properties and add `ident` to validation ([#346](https://github.com/postcss/postcss-loader/issues/346)) ([82ef553](https://github.com/postcss/postcss-loader/commit/82ef553))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/postcss/postcss-loader/compare/v2.1.0...v2.1.1) (2018-02-26)


### Bug Fixes

* **index:** don't set `to` value (`options`) ([#339](https://github.com/postcss/postcss-loader/issues/339)) ([cdbb8b6](https://github.com/postcss/postcss-loader/commit/cdbb8b6))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/postcss/postcss-loader/compare/v2.0.10...v2.1.0) (2018-02-02)


### Bug Fixes

* **index:** continue watching after dependency `{Error}` ([#332](https://github.com/postcss/postcss-loader/issues/332)) ([a8921cc](https://github.com/postcss/postcss-loader/commit/a8921cc))


### Features

* **index:** pass AST (`result.root`) && Messages (`result.messages`) as metadata to other loaders ([#322](https://github.com/postcss/postcss-loader/issues/322)) ([56232e7](https://github.com/postcss/postcss-loader/commit/56232e7))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/postcss/postcss-loader/compare/v2.0.9...v2.0.10) (2018-01-03)


### Bug Fixes

* **index:** copy loader `options` before modifying ([#326](https://github.com/postcss/postcss-loader/issues/326)) ([61ff03c](https://github.com/postcss/postcss-loader/commit/61ff03c))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/postcss/postcss-loader/compare/v2.0.8...v2.0.9) (2017-11-24)


### Bug Fixes

* **index:** filter `ident` (`options.ident`) ([#315](https://github.com/postcss/postcss-loader/issues/315)) ([3e1c7fa](https://github.com/postcss/postcss-loader/commit/3e1c7fa))



<a name="2.0.8"></a>
## [2.0.8](https://github.com/postcss/postcss-loader/compare/v2.0.6...v2.0.8) (2017-10-14)


### Bug Fixes

* **lib/options:** handle `{Object}` return (`options.plugins`) ([#301](https://github.com/postcss/postcss-loader/issues/301)) ([df010a7](https://github.com/postcss/postcss-loader/commit/df010a7))
* **schema:** allow to pass an `{Object}` (`options.syntax/options.stringifier`) ([#300](https://github.com/postcss/postcss-loader/issues/300)) ([58e9996](https://github.com/postcss/postcss-loader/commit/58e9996))



<a name="2.0.7"></a>
## [2.0.7](https://github.com/postcss/postcss-loader/compare/v2.0.6...v2.0.7) (2017-10-10)


### Bug Fixes

* sanitizing `from` and `to` options (`postcss.config.js`) ([#260](https://github.com/postcss/postcss-loader/issues/260)) ([753dea7](https://github.com/postcss/postcss-loader/commit/753dea7))
* **index:** runaway promise ([#269](https://github.com/postcss/postcss-loader/issues/269)) ([8df20ce](https://github.com/postcss/postcss-loader/commit/8df20ce))



<a name="2.0.6"></a>
## [2.0.6](https://github.com/postcss/postcss-loader/compare/v2.0.5...v2.0.6) (2017-06-14)


### Bug Fixes

* allow to pass an `{Object}` (`options.parser`) ([#257](https://github.com/postcss/postcss-loader/issues/257)) ([4974607](https://github.com/postcss/postcss-loader/commit/4974607))
* misspelling in warnings ([#237](https://github.com/postcss/postcss-loader/issues/237)) ([adcbb2e](https://github.com/postcss/postcss-loader/commit/adcbb2e))
* **index:** simplify config loading behaviour ([#259](https://github.com/postcss/postcss-loader/issues/259)) ([b313478](https://github.com/postcss/postcss-loader/commit/b313478))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/postcss/postcss-loader/compare/v2.0.4...v2.0.5) (2017-05-10)


### Bug Fixes

* regression with `options.plugins` `{Function}` (`webpack.config.js`) (#229) ([dca52a9](https://github.com/postcss/postcss-loader/commit/dca52a9))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/postcss/postcss-loader/compare/v2.0.3...v2.0.4) (2017-05-10)


### Bug Fixes

* **index:** `postcss.config.js` not resolved correctly (`options.config`) ([faaeee4](https://github.com/postcss/postcss-loader/commit/faaeee4))
* **index:** update validation schema, better warning message ([4f20c99](https://github.com/postcss/postcss-loader/commit/4f20c99))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/postcss/postcss-loader/compare/v2.0.2...v2.0.3) (2017-05-09)


### Bug Fixes

* **index:** don't fail on 'sourceMap: false' && emit a warning instead, when previous map found (`options.sourceMap`) ([159b66a](https://github.com/postcss/postcss-loader/commit/159b66a))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/postcss/postcss-loader/compare/v2.0.1...v2.0.2) (2017-05-09)


### Bug Fixes

* **index:** 'No PostCSS Config found' (`options.config`) (#215) ([e764761](https://github.com/postcss/postcss-loader/commit/e764761))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/postcss/postcss-loader/compare/v2.0.0...v2.0.1) (2017-05-08)


### Bug Fixes

* **index:** 'Cannot create property `prev` on boolean `false`' (`options.sourceMap`) ([c4f0064](https://github.com/postcss/postcss-loader/commit/c4f0064))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/postcss/postcss-loader/compare/1.2.2...v2.0.0) (2017-05-08)


### Features

* **index:** add ctx, ctx.file, ctx.options ([0dceb2c](https://github.com/postcss/postcss-loader/commit/0dceb2c))
* **index:** add options validation ([2b76df8](https://github.com/postcss/postcss-loader/commit/2b76df8))



## 1.3.3
* Remove `postcss-loader-before-processing` warning (by Michael Ciniawsky).

## 1.3.2
* Fix deprecated warning (by Xiaoyu Zhai).

## 1.3.1
* Fix conflict with CLI `--config` argument (by EGOIST).

## 1.3
* Allow object in syntax options, not only path for require (by Jeff Escalante).

## 1.2.2
* Watch `postcss.config.js` for changes (by Michael Ciniawsky).

## 1.2.1
* Fix relative `config` parameter resolving (by Simen Bekkhus).

## 1.2
* Add `config` parameter (by sainthkh).

## 1.1.1
* Fix `this` in options function (by Jeff Escalante).

## 1.1
* PostCSS common config could be placed to subdirs.
* Add webpack instance to PostCSS common config context.

## 1.0
* Add common PostCSS config support (by Mateusz Derks).
* Add Webpack 2 support with `plugins` query option (by Izaak Schroeder).
* Add `dependency` message support.
* Rewrite docs (by Michael Ciniawsky).

## 0.13
* Add `exec` parameter (by Neal Granger).

## 0.12
* Add CSS syntax highlight to syntax error code frame.

## 0.11.1
* Fix Promise API (by Daniel Haus).

## 0.11
* Add `postcss-loader-before-processing` webpack event (by Jan Nicklas).

## 0.10.1
* Better syntax error message (by Andrey Popp).

## 0.10.0
* Add `sourceMap` parameter to force inline maps (by 雪狼).

## 0.9.1
* Fix plugin in simple array config.

## 0.9
* Allow to pass syntax, parser or stringifier as function (by Jeff Escalante).

## 0.8.2
* Fix source map support (by Andrew Bradley).

## 0.8.1
* Fix resource path.

## 0.8
* Add postcss-js support (by Simon Degraeve).

## 0.7
* Added argument with webpack instance to plugins callback (by Maxime Thirouin).

## 0.6
* Use PostCSS 5.0.
* Remove `safe` parameter. Use Safe Parser.
* Add `syntax`, `parser` and `stringifier` parameters.

## 0.5.1
* Fix string source map support (by Jan Nicklas).

## 0.5.0
* Set plugins by function for hot reload support (by Stefano Brilli).

## 0.4.4
* Fix error on empty PostCSS config.

## 0.4.3
* Better check for `CssSyntaxError`.

## 0.4.2
* Fixed invalid sourcemap exception (by Richard Willis).

## 0.4.1
* Use only Promise API to catch PostCSS errors.

## 0.4
* Add PostCSS asynchronous API support.
* Fix source map support (by Richard Willis).
* Add warnings API support.
* Better output for CSS syntax errors.

## 0.3
* Use PostCSS 4.0.

## 0.2
* Use PostCSS 3.0.

## 0.1
* Initial release.
