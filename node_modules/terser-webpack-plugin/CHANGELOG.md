# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.4](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.2.3...v1.2.4) (2019-05-15)


### Bug Fixes

* disable parallel on WSL due bugs ([#90](https://github.com/webpack-contrib/terser-webpack-plugin/issues/90)) ([d9533dd](https://github.com/webpack-contrib/terser-webpack-plugin/commit/d9533dd))
* fallback for cache directory ([#86](https://github.com/webpack-contrib/terser-webpack-plugin/issues/86)) ([3cdd2ed](https://github.com/webpack-contrib/terser-webpack-plugin/commit/3cdd2ed))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.2.2...v1.2.3) (2019-02-25)


### Bug Fixes

* invalidate cache after changing node version ([675edfd](https://github.com/webpack-contrib/terser-webpack-plugin/commit/675edfd))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.2.1...v1.2.2) (2019-02-04)


### Bug Fixes

* cannot read property 'minify' of undefined   ([#69](https://github.com/webpack-contrib/terser-webpack-plugin/issues/69)) ([0593d7c](https://github.com/webpack-contrib/terser-webpack-plugin/commit/0593d7c))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.2.0...v1.2.1) (2018-12-27)


### Bug Fixes

* don't crash when no extracted comments ([#49](https://github.com/webpack-contrib/terser-webpack-plugin/issues/49)) ([efad586](https://github.com/webpack-contrib/terser-webpack-plugin/commit/efad586))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.1.0...v1.2.0) (2018-12-22)


### Bug Fixes

* `chunks` is a `Set` in webpack@5 ([#19](https://github.com/webpack-contrib/terser-webpack-plugin/issues/19)) ([df8c425](https://github.com/webpack-contrib/terser-webpack-plugin/commit/df8c425))
* catch `work-farm` errors ([#35](https://github.com/webpack-contrib/terser-webpack-plugin/issues/35)) ([2bdcd38](https://github.com/webpack-contrib/terser-webpack-plugin/commit/2bdcd38))
* dedupe extracted comments ([#40](https://github.com/webpack-contrib/terser-webpack-plugin/issues/40)) ([7f4a159](https://github.com/webpack-contrib/terser-webpack-plugin/commit/7f4a159))
* more consistent cache ([#43](https://github.com/webpack-contrib/terser-webpack-plugin/issues/43)) ([36f5f3c](https://github.com/webpack-contrib/terser-webpack-plugin/commit/36f5f3c))
* regenerate `contenthash` when assets was uglified ([#44](https://github.com/webpack-contrib/terser-webpack-plugin/issues/44)) ([7e6f8b1](https://github.com/webpack-contrib/terser-webpack-plugin/commit/7e6f8b1))


### Features

* `chunkFilter` option for filtering chunks ([#38](https://github.com/webpack-contrib/terser-webpack-plugin/issues/38)) ([7ffe57c](https://github.com/webpack-contrib/terser-webpack-plugin/commit/7ffe57c))
* uglify `mjs` by default ([#39](https://github.com/webpack-contrib/terser-webpack-plugin/issues/39)) ([1644620](https://github.com/webpack-contrib/terser-webpack-plugin/commit/1644620))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.0.1...v1.1.0) (2018-09-14)


### Bug Fixes

* extract comment conditions is case insensitivity ([19e1e43](https://github.com/webpack-contrib/terser-webpack-plugin/commit/19e1e43))


### Features

* full coverage schema options validation ([#8](https://github.com/webpack-contrib/terser-webpack-plugin/issues/8)) ([68e531e](https://github.com/webpack-contrib/terser-webpack-plugin/commit/68e531e))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.0.1...v1.0.2) (2018-08-16)


### Internal

* migrate from `@webpack-contrib/schema-utils` to `schema-utils` ([a5432da](https://github.com/webpack-contrib/terser-webpack-plugin/commit/a5432da))

<a name="1.0.1"></a>
## [1.0.1](https://github.com/webpack-contrib/terser-webpack-plugin/compare/v1.0.0...v1.0.1) (2018-08-15)


### Bug Fixes

* `cpus` length in a chroot environment (`os.cpus()`) ([#4](https://github.com/webpack-contrib/terser-webpack-plugin/issues/4)) ([9375646](https://github.com/webpack-contrib/terser-webpack-plugin/commit/9375646))



<a name="1.0.0"></a>
# 1.0.0 (2018-08-02)

Initial publish release

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
