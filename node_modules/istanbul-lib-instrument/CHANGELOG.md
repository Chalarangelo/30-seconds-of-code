# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.3.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.2.0...istanbul-lib-instrument@3.3.0) (2019-04-24)


### Features

* Enable classProperties and classPrivateProperties parsers and coverage. ([#379](https://github.com/istanbuljs/istanbuljs/issues/379)) ([c09dc38](https://github.com/istanbuljs/istanbuljs/commit/c09dc38))





# [3.2.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.1.2...istanbul-lib-instrument@3.2.0) (2019-04-09)


### Features

* Add bigInt and importMeta to default parser plugins. ([#356](https://github.com/istanbuljs/istanbuljs/issues/356)) ([fb4d6ed](https://github.com/istanbuljs/istanbuljs/commit/fb4d6ed)), closes [#338](https://github.com/istanbuljs/istanbuljs/issues/338)





## [3.1.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.1.1...istanbul-lib-instrument@3.1.2) (2019-04-03)


### Bug Fixes

* Be more friendly to ts-node. ([#352](https://github.com/istanbuljs/istanbuljs/issues/352)) ([40d15f5](https://github.com/istanbuljs/istanbuljs/commit/40d15f5)), closes [#336](https://github.com/istanbuljs/istanbuljs/issues/336)





## [3.1.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.1.0...istanbul-lib-instrument@3.1.1) (2019-03-12)


### Bug Fixes

* Honor istanbul ignore next hints placed before export statement. ([#298](https://github.com/istanbuljs/istanbuljs/issues/298)) ([f24795d](https://github.com/istanbuljs/istanbuljs/commit/f24795d)), closes [#297](https://github.com/istanbuljs/istanbuljs/issues/297)





# [3.1.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.0.1...istanbul-lib-instrument@3.1.0) (2019-01-26)


### Features

* dont skip for loop initialization instrumentation ([#188](https://github.com/istanbuljs/istanbuljs/issues/188)) ([2e0258e](https://github.com/istanbuljs/istanbuljs/commit/2e0258e))
* New options coverageGlobalScope and coverageGlobalScopeFunc. ([#200](https://github.com/istanbuljs/istanbuljs/issues/200)) ([25509c7](https://github.com/istanbuljs/istanbuljs/commit/25509c7)), closes [#199](https://github.com/istanbuljs/istanbuljs/issues/199)





<a name="3.0.1"></a>
## [3.0.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@3.0.0...istanbul-lib-instrument@3.0.1) (2018-12-25)




**Note:** Version bump only for package istanbul-lib-instrument

<a name="3.0.0"></a>
# [3.0.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.3.2...istanbul-lib-instrument@3.0.0) (2018-09-06)


### Chores

* Update test for babel 7. ([#218](https://github.com/istanbuljs/istanbuljs/issues/218)) ([9cf4d43](https://github.com/istanbuljs/istanbuljs/commit/9cf4d43)), closes [#205](https://github.com/istanbuljs/istanbuljs/issues/205)


### Features

* Add option plugins ([#205](https://github.com/istanbuljs/istanbuljs/issues/205)) ([312f81f](https://github.com/istanbuljs/istanbuljs/commit/312f81f))
* Update babel to 7.0.0. ([#215](https://github.com/istanbuljs/istanbuljs/issues/215)) ([8a96613](https://github.com/istanbuljs/istanbuljs/commit/8a96613))


### BREAKING CHANGES

* was added which requires an option for the `decorators`
plugin.  Add it to get tests working again, commit updated api.md.




<a name="2.3.2"></a>
## [2.3.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.3.1...istanbul-lib-instrument@2.3.2) (2018-07-24)




**Note:** Version bump only for package istanbul-lib-instrument

<a name="2.3.1"></a>
## [2.3.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.3.0...istanbul-lib-instrument@2.3.1) (2018-07-07)


### Bug Fixes

* Don't ignore src/visitor.js for self test. ([#194](https://github.com/istanbuljs/istanbuljs/issues/194)) ([71b815d](https://github.com/istanbuljs/istanbuljs/commit/71b815d))




<a name="2.3.0"></a>
# [2.3.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.2.1...istanbul-lib-instrument@2.3.0) (2018-06-27)


### Features

* update pinned babel version to latest release. ([#189](https://github.com/istanbuljs/istanbuljs/issues/189)) ([ac8ec07](https://github.com/istanbuljs/istanbuljs/commit/ac8ec07))




<a name="2.2.1"></a>
## [2.2.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.2.0...istanbul-lib-instrument@2.2.1) (2018-06-26)


### Bug Fixes

* Instrument ObjectMethod's. ([#182](https://github.com/istanbuljs/istanbuljs/issues/182)) ([126f09d](https://github.com/istanbuljs/istanbuljs/commit/126f09d))
* update default args test guard to work on supported versions. ([#185](https://github.com/istanbuljs/istanbuljs/issues/185)) ([955511a](https://github.com/istanbuljs/istanbuljs/commit/955511a))




<a name="2.2.0"></a>
# [2.2.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.0.2...istanbul-lib-instrument@2.2.0) (2018-06-06)


### Features

* add support for optional catch binding ([#175](https://github.com/istanbuljs/istanbuljs/issues/175)) ([088dd9f](https://github.com/istanbuljs/istanbuljs/commit/088dd9f))




<a name="2.1.0"></a>
# [2.1.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.0.2...istanbul-lib-instrument@2.1.0) (2018-05-31)


### Features

* add support for optional catch binding ([#175](https://github.com/istanbuljs/istanbuljs/issues/175)) ([088dd9f](https://github.com/istanbuljs/istanbuljs/commit/088dd9f))




<a name="2.0.2"></a>
## [2.0.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.0.1...istanbul-lib-instrument@2.0.2) (2018-05-31)




**Note:** Version bump only for package istanbul-lib-instrument

<a name="2.0.1"></a>
## [2.0.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@2.0.0...istanbul-lib-instrument@2.0.1) (2018-05-31)


### Bug Fixes

* should import [@babel](https://github.com/babel)/template ([85a0d1a](https://github.com/istanbuljs/istanbuljs/commit/85a0d1a))




<a name="2.0.0"></a>
# [2.0.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.10.1...istanbul-lib-instrument@2.0.0) (2018-05-31)


### Bug Fixes

* parenthesize superClass on non-idetifier case ([#158](https://github.com/istanbuljs/istanbuljs/issues/158)) ([6202c88](https://github.com/istanbuljs/istanbuljs/commit/6202c88))


### Chores

* upgrade babel in instrumenter ([#174](https://github.com/istanbuljs/istanbuljs/issues/174)) ([ce23e91](https://github.com/istanbuljs/istanbuljs/commit/ce23e91))


### BREAKING CHANGES

* babel@7 drops Node@4 support




<a name="1.10.1"></a>
## [1.10.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.10.0...istanbul-lib-instrument@1.10.1) (2018-03-09)


### Bug Fixes

* default value for ignorelassMethods ([#151](https://github.com/istanbuljs/istanbuljs/issues/151)) ([5dd88e8](https://github.com/istanbuljs/istanbuljs/commit/5dd88e8))




<a name="1.10.0"></a>
# [1.10.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.9.2...istanbul-lib-instrument@1.10.0) (2018-03-04)


### Features

* allows an array of ignored method names to be provided ([#127](https://github.com/istanbuljs/istanbuljs/issues/127)) ([67918e2](https://github.com/istanbuljs/istanbuljs/commit/67918e2))




<a name="1.9.2"></a>
## [1.9.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.9.1...istanbul-lib-instrument@1.9.2) (2018-02-13)


### Bug Fixes

* compatibility with babel 7 ([#135](https://github.com/istanbuljs/istanbuljs/issues/135)) ([6cac849](https://github.com/istanbuljs/istanbuljs/commit/6cac849))
* handle instrumentation when a function is called Function ([#131](https://github.com/istanbuljs/istanbuljs/issues/131)) ([b12a07e](https://github.com/istanbuljs/istanbuljs/commit/b12a07e))
* proper passing of the preserveComments option to babel ([#122](https://github.com/istanbuljs/istanbuljs/issues/122)) ([470bb0e](https://github.com/istanbuljs/istanbuljs/commit/470bb0e))
* update instrument, account for lack of arrow expression ([#119](https://github.com/istanbuljs/istanbuljs/issues/119)) ([#125](https://github.com/istanbuljs/istanbuljs/issues/125)) ([0968206](https://github.com/istanbuljs/istanbuljs/commit/0968206))




<a name="1.9.1"></a>
## [1.9.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.9.0...istanbul-lib-instrument@1.9.1) (2017-10-22)


### Bug Fixes

* address issue with class instrumentation ([#111](https://github.com/istanbuljs/istanbuljs/issues/111)) ([cbd1c14](https://github.com/istanbuljs/istanbuljs/commit/cbd1c14))




<a name="1.9.0"></a>
# [1.9.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.8.0...istanbul-lib-instrument@1.9.0) (2017-10-21)


### Bug Fixes

* support conditional expression for superClass ([#106](https://github.com/istanbuljs/istanbuljs/issues/106)) ([aae256f](https://github.com/istanbuljs/istanbuljs/commit/aae256f))


### Features

* add support for ignoring entire files ([#108](https://github.com/istanbuljs/istanbuljs/issues/108)) ([f12da65](https://github.com/istanbuljs/istanbuljs/commit/f12da65))




<a name="1.8.0"></a>
# [1.8.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.7.5...istanbul-lib-instrument@1.8.0) (2017-09-05)


### Features

* add support for object-spread syntax ([#82](https://github.com/istanbuljs/istanbuljs/issues/82)) ([28d5566](https://github.com/istanbuljs/istanbuljs/commit/28d5566))




<a name="1.7.5"></a>
## [1.7.5](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.7.4...istanbul-lib-instrument@1.7.5) (2017-08-23)


### Bug Fixes

* name of function is now preserved or named exports ([#79](https://github.com/istanbuljs/istanbuljs/issues/79)) ([2ce8974](https://github.com/istanbuljs/istanbuljs/commit/2ce8974))




<a name="1.7.4"></a>
## [1.7.4](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.7.3...istanbul-lib-instrument@1.7.4) (2017-07-16)


### Bug Fixes

* update increment operator to appropriate expression type ([#74](https://github.com/istanbuljs/istanbuljs/issues/74)) ([dc69e66](https://github.com/istanbuljs/istanbuljs/commit/dc69e66))




<a name="1.7.3"></a>
## [1.7.3](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.7.2...istanbul-lib-instrument@1.7.3) (2017-06-25)




<a name="1.7.2"></a>
## [1.7.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-instrument@1.7.1...istanbul-lib-instrument@1.7.2) (2017-05-27)


### Bug Fixes

* hoist statement counter for class variables, so that name is preserved ([#60](https://github.com/istanbuljs/istanbuljs/issues/60)) ([120d221](https://github.com/istanbuljs/istanbuljs/commit/120d221))




<a name="1.7.1"></a>
## [1.7.1](https://github.com/istanbuljs/istanbul-lib-instrument/compare/istanbul-lib-instrument@1.7.0...istanbul-lib-instrument@1.7.1) (2017-04-29)


### Bug Fixes

* don't instrument a file if it has already been instrumented ([#38](https://github.com/istanbuljs/istanbuljs/issues/38)) ([9c38e4e](https://github.com/istanbuljs/istanbul-lib-instrument/commit/9c38e4e))




<a name="1.7.0"></a>
# [1.7.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/istanbul-lib-instrument@1.6.2...istanbul-lib-instrument@1.7.0) (2017-03-27)


### Features

* use extended babylon support; adding features such as jsx ([#22](https://github.com/istanbuljs/istanbuljs/issues/22)) ([11c2438](https://github.com/istanbuljs/istanbul-lib-instrument/commit/11c2438))

<a name="1.6.2"></a>
## [1.6.2](https://github.com/istanbuljs/istanbul-lib-instrument/compare/istanbul-lib-instrument@1.6.1...istanbul-lib-instrument@1.6.2) (2017-03-22)


### Bug Fixes

* loc is sometimes not defined, so loc.start fails see [#99](https://github.com/istanbuljs/istanbuljs/issues/99) ([#18](https://github.com/istanbuljs/istanbuljs/issues/18)) ([df85ba6](https://github.com/istanbuljs/istanbul-lib-instrument/commit/df85ba6))

<a name="1.6.1"></a>
## [1.6.1](https://github.com/istanbuljs/istanbul-lib-instrument/compare/istanbul-lib-instrument@1.6.0...istanbul-lib-instrument@1.6.1) (2017-03-21)

<a name="1.6.0"></a>
# [1.6.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/istanbul-lib-instrument@1.4.2...istanbul-lib-instrument@1.6.0) (2017-03-21)


### Features

* adds line number property back to coverage.json ([b03b927](https://github.com/istanbuljs/istanbul-lib-instrument/commit/b03b927))

<a name="1.4.2"></a>
## [1.4.2](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.4.1...v1.4.2) (2017-01-04)


### Bug Fixes

* only hoist counter for a smaller subset of function declarations ([9f8931e](https://github.com/istanbuljs/istanbul-lib-instrument/commit/9f8931e))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.4.0...v1.4.1) (2017-01-04)


### Bug Fixes

* address regression discussed in https://github.com/istanbuljs/babel-plugin-istanbul/issues/78 ([#40](https://github.com/istanbuljs/istanbul-lib-instrument/issues/40)) ([7f458a3](https://github.com/istanbuljs/istanbul-lib-instrument/commit/7f458a3))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.3.1...v1.4.0) (2017-01-02)


### Features

* preserve inferred function names ([#38](https://github.com/istanbuljs/istanbul-lib-instrument/issues/38)) ([312666e](https://github.com/istanbuljs/istanbul-lib-instrument/commit/312666e))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.3.0...v1.3.1) (2016-12-27)


### Bug Fixes

* function declaration assignment now retains function name ([#33](https://github.com/istanbuljs/istanbul-lib-instrument/issues/33)) ([2d781da](https://github.com/istanbuljs/istanbul-lib-instrument/commit/2d781da))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.2.0...v1.3.0) (2016-11-10)


### Features

* allow an input source-map to be passed to instrumentSync()  ([#23](https://github.com/istanbuljs/istanbul-lib-instrument/issues/23)) ([b08e4f5](https://github.com/istanbuljs/istanbul-lib-instrument/commit/b08e4f5))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.4...v1.2.0) (2016-10-25)


### Features

* implement function to extract empty coverage data from an instrumented file ([#28](https://github.com/istanbuljs/istanbul-lib-instrument/issues/28)) ([06d0ef6](https://github.com/istanbuljs/istanbul-lib-instrument/commit/06d0ef6))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.3...v1.1.4) (2016-10-17)


### Bug Fixes

* hoist coverage variable to very top of file ([#26](https://github.com/istanbuljs/istanbul-lib-instrument/issues/26)) ([0225e8c](https://github.com/istanbuljs/istanbul-lib-instrument/commit/0225e8c))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.2...v1.1.3) (2016-09-13)


### Performance Improvements

* simplify coverage variable naming https://github.com/istanbuljs/istanbul-lib-instrument/pull/24 ([7252aae](https://github.com/istanbuljs/istanbul-lib-instrument/commit/7252aae))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.1...v1.1.2) (2016-09-08)


### Performance Improvements

* use zero-based numeric indices for much faster instrumented code ([#22](https://github.com/istanbuljs/istanbul-lib-instrument/issues/22)) ([5b401f5](https://github.com/istanbuljs/istanbul-lib-instrument/commit/5b401f5))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.0...v1.1.1) (2016-08-30)


### Bug Fixes

* upgrade istanbul-lib-coverage ([eb9b1f6](https://github.com/istanbuljs/istanbul-lib-instrument/commit/eb9b1f6))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.1.0-alpha.4...v1.1.0) (2016-08-11)


### Bug Fixes

* guard against invalid loc ([#16](https://github.com/istanbuljs/istanbul-lib-instrument/issues/16)) ([23ebfc3](https://github.com/istanbuljs/istanbul-lib-instrument/commit/23ebfc3))



<a name="1.1.0-alpha.4"></a>
# [1.1.0-alpha.4](https://github.com/istanbuljs/istanbul-lib-instrument/compare/v1.0.0-alpha.5...v1.1.0-alpha.4) (2016-07-20)


### Bug Fixes

* require more performant babel-generator ([#15](https://github.com/istanbuljs/istanbul-lib-instrument/issues/15)) ([21b2563](https://github.com/istanbuljs/istanbul-lib-instrument/commit/21b2563))
