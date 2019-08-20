# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="7.2.0"></a>
# [7.2.0](https://github.com/webpack-contrib/sass-loader/compare/v7.1.0...v7.2.0) (2019-08-08)


### Bug Fixes

* better handle stdin in sources ([#681](https://github.com/webpack-contrib/sass-loader/issues/681)) ([e279f2a](https://github.com/webpack-contrib/sass-loader/commit/e279f2a))
* prefer `sass`/`scss`/`css` extensions ([#711](https://github.com/webpack-contrib/sass-loader/issues/711)) ([6fc9d4e](https://github.com/webpack-contrib/sass-loader/commit/6fc9d4e))
* relax node engine ([#708](https://github.com/webpack-contrib/sass-loader/issues/708)) ([2a51502](https://github.com/webpack-contrib/sass-loader/commit/2a51502))


### Features

* allow passing `functions` option as function ([#651](https://github.com/webpack-contrib/sass-loader/issues/651)) ([6c9654d](https://github.com/webpack-contrib/sass-loader/commit/6c9654d))
* support `data` as `Function` ([#648](https://github.com/webpack-contrib/sass-loader/issues/648)) ([aa64e1b](https://github.com/webpack-contrib/sass-loader/commit/aa64e1b))
* support `sass` and `style` fields in `package.json` ([#647](https://github.com/webpack-contrib/sass-loader/issues/647)) ([a8709c9](https://github.com/webpack-contrib/sass-loader/commit/a8709c9))
* support auto resolving `dart-sass` ([ff90dd6](https://github.com/webpack-contrib/sass-loader/commit/ff90dd6))



<a name="7.1.0"></a>
# [7.1.0](https://github.com/webpack-contrib/sass-loader/compare/v7.0.3...v7.1.0) (2018-08-01)


### Features

* Make this package implementation-agnostic (#573) ([bed9fb5](https://github.com/webpack-contrib/sass-loader/commit/bed9fb5)), closes [#435](https://github.com/webpack-contrib/sass-loader/issues/435)



<a name="7.0.3"></a>
## [7.0.3](https://github.com/webpack-contrib/sass-loader/compare/v7.0.2...v7.0.3) (2018-06-05)


### Bug Fixes

* Bare imports not working sometimes (#579) ([c348281](https://github.com/webpack-contrib/sass-loader/commit/c348281)), closes [#566](https://github.com/webpack-contrib/sass-loader/issues/566)



<a name="7.0.2"></a>
## [7.0.2](https://github.com/webpack-contrib/sass-loader/compare/v7.0.1...v7.0.2) (2018-06-02)


### Bug Fixes

* Errors being swallowed when trying to load node-sass (#576) ([6dfb274](https://github.com/webpack-contrib/sass-loader/commit/6dfb274)), closes [#563](https://github.com/webpack-contrib/sass-loader/issues/563)
* Report error to user for problems loading node-sass (#562) ([2529c07](https://github.com/webpack-contrib/sass-loader/commit/2529c07))



<a name="7.0.1"></a>
## [7.0.1](https://github.com/webpack-contrib/sass-loader/compare/v7.0.0...v7.0.1) (2018-04-13)


### Bug Fixes

* Wrong import precedence (#557) ([f4eeff1](https://github.com/webpack-contrib/sass-loader/commit/f4eeff1))



<a name="7.0.0"></a>
# [7.0.0](https://github.com/webpack-contrib/sass-loader/compare/v6.0.7...v7.0.0) (2018-04-13)


### Features

* Refactor resolving and simplify webpack config aliases (#479) ([e0fde1a](https://github.com/webpack-contrib/sass-loader/commit/e0fde1a))
* Remove `node-sass` from `peerDependencies` (#533) ([6439cef](https://github.com/webpack-contrib/sass-loader/commit/6439cef))


### BREAKING CHANGES

* Drop official node 4 support
* This slightly changes the resolving algorithm. Should not break in normal usage, but might break in complex configurations.
* The sass-loader throws an error at runtime now and refuses to compile if the peer dependency is wrong. This could break applications where npm's peer dependency warning was just ignored.



<a name="6.0.7"></a>
## [6.0.7](https://github.com/webpack-contrib/sass-loader/compare/v6.0.6...v6.0.7) (2018-03-03)


### Bug Fixes

* **package:** add `webpack >= v4.0.0` (`peerDependencies`) ([#541](https://github.com/webpack-contrib/sass-loader/issues/541)) ([620bdd4](https://github.com/webpack-contrib/sass-loader/commit/620bdd4))


### Performance Improvements

* use `neo-async` instead `async` ([#538](https://github.com/webpack-contrib/sass-loader/issues/538)) ([fab89dc](https://github.com/webpack-contrib/sass-loader/commit/fab89dc))



<a name="6.0.6"></a>
## [6.0.6](https://github.com/webpack-contrib/sass-loader/compare/v6.0.5...v6.0.6) (2017-06-14)

### Chore

* Adds Webpack 3.x version range to peerDependencies


<a name="6.0.5"></a>
# [6.0.5](https://github.com/webpack-contrib/sass-loader/compare/v6.0.5...v6.0.4) (2017-05-10)

### Bug Fixes

* importing file directly from scoped npm package [#450](https://github.com/webpack-contrib/sass-loader/pull/450) ([5d06e9d](https://github.com/webpack-contrib/sass-loader/commit/5d06e9d))


<a name="6.0.4"></a>
# [6.0.4](https://github.com/webpack-contrib/sass-loader/compare/v6.0.4...v6.0.3) (2017-05-09)

### Bug Fixes

* fix: Resolving of scoped npm packages [#447](https://github.com/webpack-contrib/sass-loader/pull/447)


<a name="6.0.3"></a>
# [6.0.3](https://github.com/webpack-contrib/sass-loader/compare/v6.0.3...v6.0.2) (2017-03-07)

### Bug Fixes

* Fix regression with empty files [#398](https://github.com/webpack-contrib/sass-loader/pull/398)


### Chore

* Reduce npm package size by using the [files](https://docs.npmjs.com/files/package.json#files) property in the `package.json`


<a name="6.0.2"></a>
# [6.0.2](https://github.com/webpack-contrib/sass-loader/compare/v6.0.2...v6.0.1) (2017-02-21)

### Chore

* Update dependencies [#383](https://github.com/webpack-contrib/sass-loader/pull/383)


<a name="6.0.1"></a>
# [6.0.1](https://github.com/webpack-contrib/sass-loader/compare/v6.0.1...v6.0.0) (2017-02-17)

### Bug Fixes

* Fix source maps in certain CWDs. [#377](https://github.com/webpack-contrib/sass-loader/pull/377)


<a name="6.0.0"></a>
# [6.0.0](https://github.com/webpack-contrib/sass-loader/compare/v6.0.0...v5.0.1) (2017-02-13)

### Bug Fixes

* Improve source map support. [#374](https://github.com/webpack-contrib/sass-loader/issues/374)


### BREAKING CHANGES

* This is breaking for the resolve-url-loader


<a name="5.0.1"></a>
# [5.0.1](https://github.com/webpack-contrib/sass-loader/compare/v5.0.1...v5.0.0) (2017-02-13)

### Bug Fixes

* Fix bug where multiple compilations interfered with each other. [#369](https://github.com/webpack-contrib/sass-loader/pull/369)


<a name="5.0.0"></a>
# [5.0.0](https://github.com/webpack-contrib/sass-loader/compare/v5.0.0...v4.1.1) (2017-02-13)

### Code Refactoring

* Remove synchronous compilation support [#334](https://github.com/webpack-contrib/sass-loader/pull/334)


### BREAKING CHANGES

* Remove node 0.12 support. [29b30755021a834e622bf4b5bb9db4d6e5913905](https://github.com/webpack-contrib/sass-loader/commit/29b30755021a834e622bf4b5bb9db4d6e5913905)
* Remove official node-sass@3 and webpack@1 support. [5a6bcb96d8bd7a7a11c33252ba739ffe09ca38c5](https://github.com/webpack-contrib/sass-loader/commit/5a6bcb96d8bd7a7a11c33252ba739ffe09ca38c5)
* Remove synchronous compilation support. [#334](https://github.com/webpack-contrib/sass-loader/pull/334)


<a name="4.1.1"></a>
# [4.1.1](https://github.com/webpack-contrib/sass-loader/compare/v4.1.1...v4.1.0) (2016-12-21)

### Chore

* Update webpack peer dependency to support 2.2.0rc. [#330](https://github.com/webpack-contrib/sass-loader/pull/330)


<a name="4.1.0"></a>
# [4.1.0](https://github.com/webpack-contrib/sass-loader/compare/v4.1.0...v4.0.2) (2016-12-14)

### Features

* Update `node-sass@4.0.0` [#319](https://github.com/webpack-contrib/sass-loader/pull/319)


<a name="4.0.2"></a>
# [4.0.2](https://github.com/webpack-contrib/sass-loader/compare/v4.0.2...v4.0.1) (2016-07-07)

### Bug Fixes

* Fix wrong context in customImporters [#281](https://github.com/webpack-contrib/sass-loader/pull/281)


<a name="4.0.1"></a>
# [4.0.1](https://github.com/webpack-contrib/sass-loader/compare/v4.0.1...v4.0.0) (2016-07-01)

### Bug Fixes

* Fix custom importers receiving `'stdin'` as second argument instead of the actual `resourcePath` [#267](https://github.com/webpack-contrib/sass-loader/pull/267)


<a name="4.0.0"></a>
# [4.0.0](https://github.com/webpack-contrib/sass-loader/compare/v4.0.0...v3.2.2) (2016-06-27)

### Bug Fixes

* Fix incorrect source map paths [#250](https://github.com/webpack-contrib/sass-loader/pull/250)


### BREAKING CHANGES

* Release new major version because the previous release was a breaking change in certain scenarios
  See: https://github.com/webpack-contrib/sass-loader/pull/250#issuecomment-228663059


<a name="3.2.2"></a>
# [3.2.2](https://github.com/webpack-contrib/sass-loader/compare/v3.2.2...v3.2.1) (2016-06-26)

### Bug Fixes

* Fix incorrect source map paths [#250](https://github.com/webpack-contrib/sass-loader/pull/250)


<a name="3.2.1"></a>
# [3.2.1](https://github.com/webpack-contrib/sass-loader/compare/v3.2.1...v3.2.0) (2016-06-19)

### Bug Fixes

* Add `webpack@^2.1.0-beta` as peer dependency [#233](https://github.com/webpack-contrib/sass-loader/pull/233)


<a name="3.2.0"></a>
# [3.2.0](https://github.com/webpack-contrib/sass-loader/compare/v3.2.0...v3.1.2) (2016-03-12)

### Features

* Append file content instead of overwriting when `data`-option is already present [#216](https://github.com/webpack-contrib/sass-loader/pull/216)
* Make `indentedSyntax` option a bit smarter [#196](https://github.com/webpack-contrib/sass-loader/pull/196)


<a name="3.1.2"></a>
# [3.1.2](https://github.com/webpack-contrib/sass-loader/compare/v3.1.2...v3.1.1) (2015-11-22)

### Bug Fixes

* Fix loader query not overriding webpack config [#189](https://github.com/webpack-contrib/sass-loader/pull/189)
* Update peer-dependencies [#182](https://github.com/webpack-contrib/sass-loader/pull/182)
  - `node-sass^3.4.2`
  - `webpack^1.12.6`


<a name="3.1.1"></a>
# [3.1.1](https://github.com/webpack-contrib/sass-loader/compare/v3.1.1...v3.1.0) (2015-10-26)

### Bug Fixes

* Fix missing module `object-assign` [#178](https://github.com/webpack-contrib/sass-loader/issues/178)


<a name="3.1.0"></a>
# [3.1.0](https://github.com/webpack-contrib/sass-loader/compare/v3.1.0...v3.0.0) (2015-10-25)

### Bug Fixes

* Fix a problem where modules with a `.` in their names were not resolved [#167](https://github.com/webpack-contrib/sass-loader/issues/167)


### Features

* Add possibility to also define all options in your `webpack.config.js` [#152](https://github.com/webpack-contrib/sass-loader/pull/152) [#170](https://github.com/webpack-contrib/sass-loader/pull/170)


<a name="3.0.0"></a>
# [3.0.0](https://github.com/webpack-contrib/sass-loader/compare/v3.0.0...v2.0.1) (2015-09-29)

### Bug Fixes

* Fix crash when Sass reported an error without `file` [#158](https://github.com/webpack-contrib/sass-loader/pull/158)


### BREAKING CHANGES

* Add `node-sass@^3.3.3` and `webpack@^1.12.2` as peer-dependency [#165](https://github.com/webpack-contrib/sass-loader/pull/165) [#166](https://github.com/webpack-contrib/sass-loader/pull/166) [#169](https://github.com/webpack-contrib/sass-loader/pull/169)


<a name="2.0.1"></a>
# [2.0.1](https://github.com/webpack-contrib/sass-loader/compare/v2.0.1...v2.0.0) (2015-08-14)

### Bug Fixes

* Add missing path normalization (fixes [#141](https://github.com/webpack-contrib/sass-loader/pull/141))


<a name="2.0.0"></a>
# [2.0.0](https://github.com/webpack-contrib/sass-loader/compare/v2.0.0...v1.0.4) (2015-08-06)

### Bug Fixes

* Add temporary fix for stuck processes (see [sass/node-sass#857](https://github.com/sass/node-sass/issues/857)) [#100](https://github.com/webpack-contrib/sass-loader/issues/100) [#119](https://github.com/webpack-contrib/sass-loader/issues/119) [#132](https://github.com/webpack-contrib/sass-loader/pull/132)
* Fix path resolving on Windows [#108](https://github.com/webpack-contrib/sass-loader/issues/108)
* Fix file watchers on Windows [#102](https://github.com/webpack-contrib/sass-loader/issues/102)
* Fix file watchers for files with errors [#134](https://github.com/webpack-contrib/sass-loader/pull/134)


### Code Refactoring

* Refactor [import resolving algorithm](https://github.com/webpack-contrib/sass-loader/blob/089c52dc9bd02ec67fb5c65c2c226f43710f231c/index.js#L293-L348). ([#138](https://github.com/webpack-contrib/sass-loader/issues/138)) ([c8621a1](https://github.com/webpack-contrib/sass-loader/commit/80944ccf09cd9716a100160c068d255c5d742338))


### BREAKING CHANGES

* The new algorithm is aligned to libsass' way of resolving files. This yields to different results if two files with the same path and filename but with different extensions are present. Though this change should be no problem for most users, we must flag it as breaking change. [#135](https://github.com/webpack-contrib/sass-loader/issues/135) [#138](https://github.com/webpack-contrib/sass-loader/issues/138)


<a name="1.0.4"></a>
# [1.0.4](https://github.com/webpack-contrib/sass-loader/compare/v1.0.4...v1.0.3) (2015-08-03)

### Bug Fixes

* Fix wrong source-map urls [#123](https://github.com/webpack-contrib/sass-loader/pull/123)
* Include source-map contents by default [#104](https://github.com/webpack-contrib/sass-loader/pull/104)


<a name="1.0.3"></a>
# [1.0.3](https://github.com/webpack-contrib/sass-loader/compare/v1.0.3...v1.0.2) (2015-07-22)

### Bug Fixes

* Fix importing css files from scss/sass [#101](https://github.com/webpack-contrib/sass-loader/issues/101)
* Fix importing Sass partials from includePath [#98](https://github.com/webpack-contrib/sass-loader/issues/98) [#110](https://github.com/webpack-contrib/sass-loader/issues/110)


<a name="1.0.2"></a>
# [1.0.2](https://github.com/webpack-contrib/sass-loader/compare/v1.0.2...v1.0.1) (2015-04-15)

### Bug Fixes

* Fix a bug where files could not be imported across language styles [#73](https://github.com/webpack-contrib/sass-loader/issues/73)
* Update peer-dependency `node-sass` to `3.1.0`


<a name="1.0.1"></a>
# [1.0.1](https://github.com/webpack-contrib/sass-loader/compare/v1.0.1...v1.0.0) (2015-03-31)

### Bug Fixes

* Fix Sass partials not being resolved anymore [#68](https://github.com/webpack-contrib/sass-loader/issues/68)
* Update peer-dependency `node-sass` to `3.0.0-beta.4`


<a name="1.0.0"></a>
# [1.0.0](https://github.com/webpack-contrib/sass-loader/compare/v1.0.0...v0.3.1) (2015-03-22)

### Bug Fixes

* Moved `node-sass^3.0.0-alpha.0` to `peerDependencies` [#28](https://github.com/webpack-contrib/sass-loader/issues/28)
* Using webpack's module resolver as custom importer [#39](https://github.com/webpack-contrib/sass-loader/issues/31)
* Add synchronous compilation support for usage with [enhanced-require](https://github.com/webpack/enhanced-require) [#39](https://github.com/webpack-contrib/sass-loader/pull/39)
