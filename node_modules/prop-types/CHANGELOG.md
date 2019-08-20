## 15.7.2
* [Fix] ensure nullish values in `oneOf` do not crash ([#256](https://github.com/facebook/prop-types/issues/256))
* [Fix] move `loose-envify` back to production deps, for browerify usage ([#203](https://github.com/facebook/prop-types/issues/203))

## 15.7.1
* [Fix] avoid template literal syntax ([#255](https://github.com/facebook/prop-types/issues/255), [#254](https://github.com/facebook/prop-types/issues/254))

## 15.7.0
* [New] Add `.elementType` ([#211](https://github.com/facebook/prop-types/pull/211))
* [New] add `PropTypes.resetWarningCache` ([#178](https://github.com/facebook/prop-types/pull/178))
* `oneOf`: improve warning when multiple arguments are supplied ([#244](https://github.com/facebook/prop-types/pull/244))
* Fix `oneOf` when used with Symbols ([#224](https://github.com/facebook/prop-types/pull/224))
* Avoid relying on `hasOwnProperty` being present on values' prototypes ([#112](https://github.com/facebook/prop-types/pull/112), [#187](https://github.com/facebook/prop-types/pull/187))
* Improve readme ([#248](https://github.com/facebook/prop-types/pull/248), [#233](https://github.com/facebook/prop-types/pull/233))
* Clean up mistaken runtime dep, swap envify for loose-envify ([#204](https://github.com/facebook/prop-types/pull/204))

## 15.6.2
* Remove the `fbjs` dependency by inlining some helpers from it ([#194](https://github.com/facebook/prop-types/pull/194)))

## 15.6.1
* Fix an issue where outdated BSD license headers were still present in the published bundle [#162](https://github.com/facebook/prop-types/issues/162)

## 15.6.0

* Switch from BSD + Patents to MIT license
* Add PropTypes.exact, like PropTypes.shape but warns on extra object keys. ([@thejameskyle](https://github.com/thejameskyle) and [@aweary](https://github.com/aweary) in [#41](https://github.com/facebook/prop-types/pull/41) and [#87](https://github.com/facebook/prop-types/pull/87))

## 15.5.10

* Fix a false positive warning when using a production UMD build of a third-party library with a DEV version of React. ([@gaearon](https://github.com/gaearon) in [#50](https://github.com/facebook/prop-types/pull/50))

## 15.5.9

* Add `loose-envify` Browserify transform for users who don't envify globally. ([@mridgway](https://github.com/mridgway) in [#45](https://github.com/facebook/prop-types/pull/45))

## 15.5.8

* Limit the manual PropTypes call warning count because it has false positives with React versions earlier than 15.2.0 in the 15.x branch and 0.14.9 in the 0.14.x branch. ([@gaearon](https://github.com/gaearon) in [#26](https://github.com/facebook/prop-types/pull/26))

## 15.5.7

* **Critical Bugfix:** Fix an accidental breaking change that caused errors in production when used through `React.PropTypes`.  ([@gaearon](https://github.com/gaearon) in [#20](https://github.com/facebook/prop-types/pull/20))
* Improve the size of production UMD build.  ([@aweary](https://github.com/aweary) in [38ba18](https://github.com/facebook/prop-types/commit/38ba18a4a8f705f4b2b33c88204573ddd604f2d6) and [7882a7](https://github.com/facebook/prop-types/commit/7882a7285293db5f284bcf559b869fd2cd4c44d4))

## 15.5.6

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Fix a markdown issue in README. ([@bvaughn](https://github.com/bvaughn) in [174f77](https://github.com/facebook/prop-types/commit/174f77a50484fa628593e84b871fb40eed78b69a))

## 15.5.5

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Add missing documentation and license files.  ([@bvaughn](https://github.com/bvaughn) in [0a53d3](https://github.com/facebook/prop-types/commit/0a53d3a34283ae1e2d3aa396632b6dc2a2061e6a))

## 15.5.4

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Reduce the size of the UMD Build. ([@acdlite](https://github.com/acdlite) in [31e9344](https://github.com/facebook/prop-types/commit/31e9344ca3233159928da66295da17dad82db1a8))
* Remove bad package url. ([@ljharb](https://github.com/ljharb) in [158198f](https://github.com/facebook/prop-types/commit/158198fd6c468a3f6f742e0e355e622b3914048a))
* Remove the accidentally included typechecking code from the production build.

## 15.5.3

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Remove the accidentally included React package code from the UMD bundle. ([@acdlite](https://github.com/acdlite) in [df318bb](https://github.com/facebook/prop-types/commit/df318bba8a89bc5aadbb0292822cf4ed71d27ace))

## 15.5.2

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Remove dependency on React for CommonJS entry point. ([@acdlite](https://github.com/acdlite) in [cae72bb](https://github.com/facebook/prop-types/commit/cae72bb281a3766c765e3624f6088c3713567e6d))


## 15.5.1

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Remove accidental uncompiled ES6 syntax in the published package. ([@acdlite](https://github.com/acdlite) in [e191963](https://github.com/facebook/react/commit/e1919638b39dd65eedd250a8bb649773ca61b6f1))

## 15.5.0

**Note: this release has a critical issue and was deprecated. Please update to 15.5.7 or higher.**

* Initial release.

## Before 15.5.0

PropTypes was previously included in React, but is now a separate package. For earlier history of PropTypes [see the React change log.](https://github.com/facebook/react/blob/master/CHANGELOG.md)
