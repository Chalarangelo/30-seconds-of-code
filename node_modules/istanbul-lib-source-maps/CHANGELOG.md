# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.6](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.5...istanbul-lib-source-maps@3.0.6) (2019-04-24)


### Bug Fixes

* if LEAST_UPPER_BOUND returns null, try GREATEST_LOWER_BOUND ([#375](https://github.com/istanbuljs/istanbuljs/issues/375)) ([72b0f05](https://github.com/istanbuljs/istanbuljs/commit/72b0f05))





## [3.0.5](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.4...istanbul-lib-source-maps@3.0.5) (2019-04-09)

**Note:** Version bump only for package istanbul-lib-source-maps





## [3.0.4](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.3...istanbul-lib-source-maps@3.0.4) (2019-04-03)

**Note:** Version bump only for package istanbul-lib-source-maps





## [3.0.3](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.2...istanbul-lib-source-maps@3.0.3) (2019-03-12)


### Bug Fixes

* Map unique files once, regardless of path separator ([#287](https://github.com/istanbuljs/istanbuljs/issues/287)) ([39a1e56](https://github.com/istanbuljs/istanbuljs/commit/39a1e56))





## [3.0.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.1...istanbul-lib-source-maps@3.0.2) (2019-01-26)

**Note:** Version bump only for package istanbul-lib-source-maps





<a name="3.0.1"></a>
## [3.0.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@3.0.0...istanbul-lib-source-maps@3.0.1) (2018-12-25)


### Bug Fixes

* correct variable name in source-map transform ([#257](https://github.com/istanbuljs/istanbuljs/issues/257)) ([de9c921](https://github.com/istanbuljs/istanbuljs/commit/de9c921))




<a name="3.0.0"></a>
# [3.0.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@2.0.1...istanbul-lib-source-maps@3.0.0) (2018-12-19)


### Bug Fixes

* correctly calculate end position of sourcemap statement  ([f97ffc7](https://github.com/istanbuljs/istanbuljs/commit/f97ffc7))


### BREAKING CHANGES

* coverage output can now contain Infinity, when a range extends past the source in a file.




<a name="2.0.1"></a>
## [2.0.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@2.0.0...istanbul-lib-source-maps@2.0.1) (2018-07-07)




**Note:** Version bump only for package istanbul-lib-source-maps

<a name="2.0.0"></a>
# [2.0.0](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.5...istanbul-lib-source-maps@2.0.0) (2018-06-06)


### Bug Fixes

* use null prototype for map objects ([#177](https://github.com/istanbuljs/istanbuljs/issues/177)) ([9a5a30c](https://github.com/istanbuljs/istanbuljs/commit/9a5a30c))


### BREAKING CHANGES

* a null prototype is now used in several places rather than the default `{}` assignment.




<a name="1.2.5"></a>
## [1.2.5](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.4...istanbul-lib-source-maps@1.2.5) (2018-05-31)


### Bug Fixes

* process.cwd is a function not a string ([#163](https://github.com/istanbuljs/istanbuljs/issues/163)). ([#171](https://github.com/istanbuljs/istanbuljs/issues/171)) ([9c7802c](https://github.com/istanbuljs/istanbuljs/commit/9c7802c))




<a name="1.2.4"></a>
## [1.2.4](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.3...istanbul-lib-source-maps@1.2.4) (2018-03-04)




**Note:** Version bump only for package istanbul-lib-source-maps

<a name="1.2.3"></a>
## [1.2.3](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.2...istanbul-lib-source-maps@1.2.3) (2018-02-13)




**Note:** Version bump only for package istanbul-lib-source-maps

<a name="1.2.2"></a>
## [1.2.2](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.1...istanbul-lib-source-maps@1.2.2) (2017-10-21)




**Note:** Version bump only for package istanbul-lib-source-maps

<a name="1.2.1"></a>
## [1.2.1](https://github.com/istanbuljs/istanbuljs/compare/istanbul-lib-source-maps@1.2.0...istanbul-lib-source-maps@1.2.1) (2017-05-27)




<a name="1.2.0"></a>
# [1.2.0](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/istanbul-lib-source-maps@1.1.1...istanbul-lib-source-maps@1.2.0) (2017-04-29)


### Features

* pull in debug module, to make debug messages optional ([#36](https://github.com/istanbuljs/istanbuljs/issues/36)) ([189519d](https://github.com/istanbuljs/istanbul-lib-source-maps/commit/189519d))




<a name="1.1.1"></a>
## [1.1.1](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/istanbul-lib-source-maps@1.1.0...istanbul-lib-source-maps@1.1.1) (2017-03-27)

<a name="1.1.0"></a>
# [1.1.0](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/v1.0.2...v1.1.0) (2016-11-10)


### Features

* read and apply any input source maps stored with coverage data  ([#4](https://github.com/istanbuljs/istanbul-lib-source-maps/issues/4)) ([aea405b](https://github.com/istanbuljs/istanbul-lib-source-maps/commit/aea405b))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/v1.0.1...v1.0.2) (2016-10-03)


### Bug Fixes

* broken mapped coverage report ([#6](https://github.com/istanbuljs/istanbul-lib-source-maps/issues/6)) ([d9dd738](https://github.com/istanbuljs/istanbul-lib-source-maps/commit/d9dd738))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/v1.0.0...v1.0.1) (2016-09-13)


### Bug Fixes

* position validation shouldn't throw away locations with 0 ([#5](https://github.com/istanbuljs/istanbul-lib-source-maps/issues/5)) ([ac4b72c](https://github.com/istanbuljs/istanbul-lib-source-maps/commit/ac4b72c))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/istanbuljs/istanbul-lib-source-maps/compare/v1.0.0-alpha.9...v1.0.0) (2016-08-31)


### Bug Fixes

* discard more bad source map positions ([#3](https://github.com/istanbuljs/istanbul-lib-source-maps/issues/3)) ([ed7b27f](https://github.com/istanbuljs/istanbul-lib-source-maps/commit/ed7b27f))
