# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.5.1"></a>
## [3.5.1](https://github.com/zkat/figgy-pudding/compare/v3.5.0...v3.5.1) (2018-08-25)



<a name="3.5.0"></a>
# [3.5.0](https://github.com/zkat/figgy-pudding/compare/v3.4.1...v3.5.0) (2018-08-25)


### Bug Fixes

* **node:** get rid of Object.entries to add node6 support back ([074f779](https://github.com/zkat/figgy-pudding/commit/074f779))


### Features

* **node:** add node@10 to CI config ([78b8937](https://github.com/zkat/figgy-pudding/commit/78b8937))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/zkat/figgy-pudding/compare/v3.4.0...v3.4.1) (2018-08-16)


### Bug Fixes

* **forEach:** get forEach to behave like a normal forEach ([c064755](https://github.com/zkat/figgy-pudding/commit/c064755))
* **has:** get `in` keyword working right ([fafc5a8](https://github.com/zkat/figgy-pudding/commit/fafc5a8))
* **iteration:** fix and test iteration of opts.other keys ([7a76217](https://github.com/zkat/figgy-pudding/commit/7a76217))
* **iteration:** use proper args for forEach/toJSON ([974e879](https://github.com/zkat/figgy-pudding/commit/974e879))
* **proxy:** make sure proxy corner-cases work ok ([8c66e45](https://github.com/zkat/figgy-pudding/commit/8c66e45))
* **set:** fix and test the exceptions to writing ([206793b](https://github.com/zkat/figgy-pudding/commit/206793b))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/zkat/figgy-pudding/compare/v3.3.0...v3.4.0) (2018-08-16)


### Features

* **iterator:** allow iteration over "other" keys ([3c53323](https://github.com/zkat/figgy-pudding/commit/3c53323))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/zkat/figgy-pudding/compare/v3.2.1...v3.3.0) (2018-08-16)


### Bug Fixes

* **props:** allow symbols to pass through ([97b3464](https://github.com/zkat/figgy-pudding/commit/97b3464))


### Features

* **pudding:** iteration and serialization support ([0aaa50d](https://github.com/zkat/figgy-pudding/commit/0aaa50d))



<a name="3.2.1"></a>
## [3.2.1](https://github.com/zkat/figgy-pudding/compare/v3.2.0...v3.2.1) (2018-08-15)


### Bug Fixes

* **aliases:** make reverse aliases work correctly ([76a255e](https://github.com/zkat/figgy-pudding/commit/76a255e))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/zkat/figgy-pudding/compare/v3.1.0...v3.2.0) (2018-07-26)


### Bug Fixes

* **concat:** have concat spit out a proxy, too ([64e3495](https://github.com/zkat/figgy-pudding/commit/64e3495))


### Features

* **default:** pass the pudding itself to default fns ([d9d9e09](https://github.com/zkat/figgy-pudding/commit/d9d9e09))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/zkat/figgy-pudding/compare/v3.0.0...v3.1.0) (2018-04-08)


### Features

* **opts:** allow direct option fetching without .get() ([ca77aad](https://github.com/zkat/figgy-pudding/commit/ca77aad))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/zkat/figgy-pudding/compare/v2.0.1...v3.0.0) (2018-04-06)


### Bug Fixes

* **ci:** oops -- forgot to update CI config ([7a40563](https://github.com/zkat/figgy-pudding/commit/7a40563))
* **get:** make provider lookup order like Object.assign ([33ff89b](https://github.com/zkat/figgy-pudding/commit/33ff89b))


### Features

* **concat:** add .concat() method to opts ([d310fce](https://github.com/zkat/figgy-pudding/commit/d310fce))


### meta

* drop support for node@4 and node@7 ([9f8a61c](https://github.com/zkat/figgy-pudding/commit/9f8a61c))


### BREAKING CHANGES

* node@4 and node@7 are no longer supported
* **get:** shadow order for properties in providers is reversed



<a name="2.0.1"></a>
## [2.0.1](https://github.com/zkat/figgy-pudding/compare/v2.0.0...v2.0.1) (2018-03-16)


### Bug Fixes

* **opts:** ignore non-object providers ([7b9c0f8](https://github.com/zkat/figgy-pudding/commit/7b9c0f8))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/zkat/figgy-pudding/compare/v1.0.0...v2.0.0) (2018-03-16)


### Features

* **api:** overhauled API with new opt handling concept ([e6cc929](https://github.com/zkat/figgy-pudding/commit/e6cc929))
* **license:** relicense to ISC ([87479aa](https://github.com/zkat/figgy-pudding/commit/87479aa))


### BREAKING CHANGES

* **license:** the license has been changed from CC0-1.0 to ISC.
* **api:** this is a completely different approach than previously
used by this library. See the readme for the new API and an explanation.
