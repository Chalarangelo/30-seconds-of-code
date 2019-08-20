# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.3"></a>
## [1.2.3](https://github.com/webpack/loader-utils/compare/v1.2.2...v1.2.3) (2018-12-27)


### Bug Fixes

* **interpolateName:** don't interpolated `hashType` without `hash` or `contenthash`  ([#140](https://github.com/webpack/loader-utils/issues/140)) ([3528fd9](https://github.com/webpack/loader-utils/commit/3528fd9))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/webpack/loader-utils/compare/v1.2.1...v1.2.2) (2018-12-27)


### Bug Fixes

* fixed a hash type extracting in interpolateName ([#137](https://github.com/webpack/loader-utils/issues/137)) ([f8a71f4](https://github.com/webpack/loader-utils/commit/f8a71f4))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/webpack/loader-utils/compare/v1.2.0...v1.2.1) (2018-12-25)


### Bug Fixes

* **isUrlRequest:** better handle absolute urls and non standards ([#134](https://github.com/webpack/loader-utils/issues/134)) ([aca43da](https://github.com/webpack/loader-utils/commit/aca43da))


### Reverts

* PR [#79](https://github.com/webpack/loader-utils/issues/79) ([#135](https://github.com/webpack/loader-utils/issues/135)) ([73d350a](https://github.com/webpack/loader-utils/commit/73d350a))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/webpack/loader-utils/compare/v1.1.0...v1.2.0) (2018-12-24)


### Features

* **interpolateName:** support `[contenthash]`

### Fixes

* **urlToRequest:** empty urls are not rewritten to relative requests
* **urlToRequest:** don't rewrite absolute urls
* **isUrlRequest:** ignore all url with `extension` (like `moz-extension:`, `ms-browser-extension:` and etc)
* **isUrlRequest:** ignore `about:blank`
* **interpolateName:** failing explicitly when ran out of emoji
* **interpolateName:** `[hash]` token regex in interpolate string to capture any hash algorithm name
* **interpolateName:** parse string for emoji count before use



<a name="1.1.0"></a>
# [1.1.0](https://github.com/webpack/loader-utils/compare/v1.0.4...v1.1.0) (2017-03-16)


### Features

* **automatic-release:** Generation of automatic release ([7484d13](https://github.com/webpack/loader-utils/commit/7484d13))
* **parseQuery:** export parseQuery ([ddf64e4](https://github.com/webpack/loader-utils/commit/ddf64e4))
