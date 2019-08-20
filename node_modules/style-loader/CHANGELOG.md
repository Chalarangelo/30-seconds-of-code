# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.21.0"></a>
# [0.21.0](https://github.com/webpack-contrib/style-loader/compare/v0.20.3...v0.21.0) (2018-04-18)


### Features

* enable tag type configuration ([#316](https://github.com/webpack-contrib/style-loader/issues/316)) ([892cba5](https://github.com/webpack-contrib/style-loader/commit/892cba5))



<a name="0.20.3"></a>
## [0.20.3](https://github.com/webpack-contrib/style-loader/compare/v0.20.2...v0.20.3) (2018-03-09)


### Bug Fixes

* **package:** update `schema-utils` v0.4.3...0.4.5 (`dependencies`) ([#308](https://github.com/webpack-contrib/style-loader/issues/308)) ([9455888](https://github.com/webpack-contrib/style-loader/commit/9455888))



<a name="0.20.2"></a>
## [0.20.2](https://github.com/webpack-contrib/style-loader/compare/v0.20.1...v0.20.2) (2018-02-15)


### Bug Fixes

* **urls:** skip empty `url()` handling ([#304](https://github.com/webpack-contrib/style-loader/issues/304)) ([64f12dc](https://github.com/webpack-contrib/style-loader/commit/64f12dc))



<a name="0.20.1"></a>
## [0.20.1](https://github.com/webpack-contrib/style-loader/compare/v0.20.0...v0.20.1) (2018-01-26)


### Bug Fixes

* **index:** source code indentation ([#299](https://github.com/webpack-contrib/style-loader/issues/299)) ([b4642e7](https://github.com/webpack-contrib/style-loader/commit/b4642e7))



<a name="0.20.0"></a>
# [0.20.0](https://github.com/webpack-contrib/style-loader/compare/v0.19.1...v0.20.0) (2018-01-26)


### Bug Fixes

* **addStyles:** check if `HTMLIFrameElement` exist ([#296](https://github.com/webpack-contrib/style-loader/issues/296)) ([9b46128](https://github.com/webpack-contrib/style-loader/commit/9b46128))
* **index:** enable HMR in case `locals` (`css-modules`) are unchanged ([#298](https://github.com/webpack-contrib/style-loader/issues/298)) ([3a4cb53](https://github.com/webpack-contrib/style-loader/commit/3a4cb53))
* **options:** add `transform` option validation (`{String}`) ([23c3567](https://github.com/webpack-contrib/style-loader/commit/23c3567))
* **options:** support passing a `{Function}` (`options.insertInto`) ([e0c4b19](https://github.com/webpack-contrib/style-loader/commit/e0c4b19))


### Features

* support passing a `{Function}` (`options.insertInto`) ([#279](https://github.com/webpack-contrib/style-loader/issues/279)) ([0eb8fe7](https://github.com/webpack-contrib/style-loader/commit/0eb8fe7))



<a name="0.19.1"></a>
## [0.19.1](https://github.com/webpack/style-loader/compare/v0.19.0...v0.19.1) (2017-12-14)


### Bug Fixes

* **addStyles:** correctly check `singleton` behavior when `{Boolean}` (`options.singleton`) ([#285](https://github.com/webpack/style-loader/issues/285)) ([2bfc93e](https://github.com/webpack/style-loader/commit/2bfc93e))



<a name="0.19.0"></a>
# [0.19.0](https://github.com/webpack/style-loader/compare/v0.18.2...v0.19.0) (2017-10-03)


### Features

* add option to enable/disable HMR (`options.hmr`) ([#264](https://github.com/webpack/style-loader/issues/264)) ([378e906](https://github.com/webpack/style-loader/commit/378e906))
* add support for iframes (`options.insertInto`) ([#248](https://github.com/webpack/style-loader/issues/248)) ([25e8e89](https://github.com/webpack/style-loader/commit/25e8e89))
* support 'before' insertions (`options.insertAt`) ([#253](https://github.com/webpack/style-loader/issues/253)) ([67120f8](https://github.com/webpack/style-loader/commit/67120f8))



<a name="0.18.2"></a>
## [0.18.2](https://github.com/webpack/style-loader/compare/v0.18.1...v0.18.2) (2017-06-05)


### Bug Fixes

* **url:** use `loaderUtils.stringifyRequest` to avoid invalidating hashes due to absolute paths ([#242](https://github.com/webpack/style-loader/issues/242)) ([97508ec](https://github.com/webpack/style-loader/commit/97508ec))
* Add `null` check to `removeStyleElement` ([#245](https://github.com/webpack/style-loader/issues/245)) ([0a4845c](https://github.com/webpack/style-loader/commit/0a4845c))



<a name="0.18.1"></a>
## [0.18.1](https://github.com/webpack/style-loader/compare/v0.18.0...v0.18.1) (2017-05-23)


### Bug Fixes

* **addStyles:** revert merged loops ([#236](https://github.com/webpack/style-loader/issues/236)) ([fbd04b1](https://github.com/webpack/style-loader/commit/fbd04b1))



<a name="0.18.0"></a>
# [0.18.0](https://github.com/webpack/style-loader/compare/v0.17.0...v0.18.0) (2017-05-22)


### Bug Fixes

* stringify the options.transform request ([#230](https://github.com/webpack/style-loader/issues/230)) ([5888095](https://github.com/webpack/style-loader/commit/5888095))


### Features

* add options validation ([#224](https://github.com/webpack/style-loader/issues/224)) ([4b6b70d](https://github.com/webpack/style-loader/commit/4b6b70d))



<a name="0.17.0"></a>
# [0.17.0](https://github.com/webpack/style-loader/compare/v0.16.1...v0.17.0) (2017-05-01)


### Features

* add option.base ([#164](https://github.com/webpack/style-loader/issues/164)) ([e4ac886](https://github.com/webpack/style-loader/commit/e4ac886))
* add option.transform ([#146](https://github.com/webpack/style-loader/issues/146)) ([1c3943f](https://github.com/webpack/style-loader/commit/1c3943f))



<a name="0.16.1"></a>
## [0.16.1](https://github.com/webpack/style-loader/compare/v0.16.0...v0.16.1) (2017-03-28)


### Bug Fixes

* negative refs ([#122](https://github.com/webpack/style-loader/issues/122)) ([f6f577a](https://github.com/webpack/style-loader/commit/f6f577a))



<a name="0.16.0"></a>
# [0.16.0](https://github.com/webpack/style-loader/compare/v0.15.0...v0.16.0) (2017-03-22)


### Bug Fixes

* **addStyles:** update for test for old IE versions ([#196](https://github.com/webpack/style-loader/issues/196)) ([1f68495](https://github.com/webpack/style-loader/commit/1f68495))


### Features

* Set custom attributes for tag in url mode ([#198](https://github.com/webpack/style-loader/issues/198)) ([2c4f427](https://github.com/webpack/style-loader/commit/2c4f427))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/webpack/style-loader/compare/v0.14.1...v0.15.0) (2017-03-21)


### Bug Fixes

* match parens recursively on URLs to not fix embeded calls ([#192](https://github.com/webpack/style-loader/issues/192)) ([71e0908](https://github.com/webpack/style-loader/commit/71e0908))


### Features

* add insertInto option ([#135](https://github.com/webpack/style-loader/issues/135)) ([6636868](https://github.com/webpack/style-loader/commit/6636868))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/webpack/style-loader/compare/v0.14.0...v0.14.1) (2017-03-15)


### Bug Fixes

* syntax error in IE10 and below because of `const` keyword ([#190](https://github.com/webpack/style-loader/issues/190)) ([01080cf](https://github.com/webpack/style-loader/commit/01080cf))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/webpack/style-loader/compare/v0.13.1...v0.14.0) (2017-03-15)


### Bug Fixes

* Adds type attr. to the generated link element ([2a2f261](https://github.com/webpack/style-loader/commit/2a2f261))
* **fixUrls:** add param to fix relative urls ([#186](https://github.com/webpack/style-loader/issues/186)) ([19959ee](https://github.com/webpack/style-loader/commit/19959ee))
* **usable:** Export locals if available([#128](https://github.com/webpack/style-loader/issues/128)) ([e280cb6](https://github.com/webpack/style-loader/commit/e280cb6))


### Features

* **tag-attribute:** Add support for custom tag attribute ([995f3de](https://github.com/webpack/style-loader/commit/995f3de))
