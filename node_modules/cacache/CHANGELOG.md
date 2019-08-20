# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [11.3.3](https://github.com/zkat/cacache/compare/v11.3.2...v11.3.3) (2019-06-17)


### Bug Fixes

* **audit:** npm audit fix ([200a6d5](https://github.com/zkat/cacache/commit/200a6d5))
* **config:** Add ssri config 'error' option ([#146](https://github.com/zkat/cacache/issues/146)) ([47de8f5](https://github.com/zkat/cacache/commit/47de8f5))
* **deps:** npm audit fix ([481a7dc](https://github.com/zkat/cacache/commit/481a7dc))
* **standard:** standard --fix ([7799149](https://github.com/zkat/cacache/commit/7799149))
* **write:** avoid another cb never called situation ([5156561](https://github.com/zkat/cacache/commit/5156561))



<a name="11.3.2"></a>
## [11.3.2](https://github.com/zkat/cacache/compare/v11.3.1...v11.3.2) (2018-12-21)


### Bug Fixes

* **get:** make sure to handle errors in the .then ([b10bcd0](https://github.com/zkat/cacache/commit/b10bcd0))



<a name="11.3.1"></a>
## [11.3.1](https://github.com/zkat/cacache/compare/v11.3.0...v11.3.1) (2018-11-05)


### Bug Fixes

* **get:** export hasContent.sync properly ([d76c920](https://github.com/zkat/cacache/commit/d76c920))



<a name="11.3.0"></a>
# [11.3.0](https://github.com/zkat/cacache/compare/v11.2.0...v11.3.0) (2018-11-05)


### Features

* **get:** add sync API for reading ([db1e094](https://github.com/zkat/cacache/commit/db1e094))



<a name="11.2.0"></a>
# [11.2.0](https://github.com/zkat/cacache/compare/v11.1.0...v11.2.0) (2018-08-08)


### Features

* **read:** add sync support to other internal read.js fns ([fe638b6](https://github.com/zkat/cacache/commit/fe638b6))



<a name="11.1.0"></a>
# [11.1.0](https://github.com/zkat/cacache/compare/v11.0.3...v11.1.0) (2018-08-01)


### Features

* **read:** add sync support for low-level content read ([b43af83](https://github.com/zkat/cacache/commit/b43af83))



<a name="11.0.3"></a>
## [11.0.3](https://github.com/zkat/cacache/compare/v11.0.2...v11.0.3) (2018-08-01)


### Bug Fixes

* **config:** add ssri config options ([#136](https://github.com/zkat/cacache/issues/136)) ([10d5d9a](https://github.com/zkat/cacache/commit/10d5d9a))
* **perf:** refactor content.read to avoid lstats ([c5ac10e](https://github.com/zkat/cacache/commit/c5ac10e))
* **test:** oops when removing safe-buffer ([1950490](https://github.com/zkat/cacache/commit/1950490))



<a name="11.0.2"></a>
## [11.0.2](https://github.com/zkat/cacache/compare/v11.0.1...v11.0.2) (2018-05-07)


### Bug Fixes

* **verify:** size param no longer lost in a verify ([#131](https://github.com/zkat/cacache/issues/131)) ([c614a19](https://github.com/zkat/cacache/commit/c614a19)), closes [#130](https://github.com/zkat/cacache/issues/130)



<a name="11.0.1"></a>
## [11.0.1](https://github.com/zkat/cacache/compare/v11.0.0...v11.0.1) (2018-04-10)



<a name="11.0.0"></a>
# [11.0.0](https://github.com/zkat/cacache/compare/v10.0.4...v11.0.0) (2018-04-09)


### Features

* **opts:** use figgy-pudding for opts ([#128](https://github.com/zkat/cacache/issues/128)) ([33d4eed](https://github.com/zkat/cacache/commit/33d4eed))


### meta

* drop support for node@4 ([529f347](https://github.com/zkat/cacache/commit/529f347))


### BREAKING CHANGES

* node@4 is no longer supported



<a name="10.0.4"></a>
## [10.0.4](https://github.com/zkat/cacache/compare/v10.0.3...v10.0.4) (2018-02-16)



<a name="10.0.3"></a>
## [10.0.3](https://github.com/zkat/cacache/compare/v10.0.2...v10.0.3) (2018-02-16)


### Bug Fixes

* **content:** rethrow aggregate errors as ENOENT ([fa918f5](https://github.com/zkat/cacache/commit/fa918f5))



<a name="10.0.2"></a>
## [10.0.2](https://github.com/zkat/cacache/compare/v10.0.1...v10.0.2) (2018-01-07)


### Bug Fixes

* **ls:** deleted entries could cause a premature stream EOF ([347dc36](https://github.com/zkat/cacache/commit/347dc36))



<a name="10.0.1"></a>
## [10.0.1](https://github.com/zkat/cacache/compare/v10.0.0...v10.0.1) (2017-11-15)


### Bug Fixes

* **move-file:** actually use the fallback to `move-concurrently` (#110) ([073fbe1](https://github.com/zkat/cacache/commit/073fbe1))



<a name="10.0.0"></a>
# [10.0.0](https://github.com/zkat/cacache/compare/v9.3.0...v10.0.0) (2017-10-23)


### Features

* **license:** relicense to ISC (#111) ([fdbb4e5](https://github.com/zkat/cacache/commit/fdbb4e5))


### Performance Improvements

* more copyFile benchmarks ([63787bb](https://github.com/zkat/cacache/commit/63787bb))


### BREAKING CHANGES

* **license:** the license has been changed from CC0-1.0 to ISC.



<a name="9.3.0"></a>
# [9.3.0](https://github.com/zkat/cacache/compare/v9.2.9...v9.3.0) (2017-10-07)


### Features

* **copy:** added cacache.get.copy api for fast copies (#107) ([067b5f6](https://github.com/zkat/cacache/commit/067b5f6))



<a name="9.2.9"></a>
## [9.2.9](https://github.com/zkat/cacache/compare/v9.2.8...v9.2.9) (2017-06-17)



<a name="9.2.8"></a>
## [9.2.8](https://github.com/zkat/cacache/compare/v9.2.7...v9.2.8) (2017-06-05)


### Bug Fixes

* **ssri:** bump ssri for bugfix ([c3232ea](https://github.com/zkat/cacache/commit/c3232ea))



<a name="9.2.7"></a>
## [9.2.7](https://github.com/zkat/cacache/compare/v9.2.6...v9.2.7) (2017-06-05)


### Bug Fixes

* **content:** make verified content completely read-only (#96) ([4131196](https://github.com/zkat/cacache/commit/4131196))



<a name="9.2.6"></a>
## [9.2.6](https://github.com/zkat/cacache/compare/v9.2.5...v9.2.6) (2017-05-31)


### Bug Fixes

* **node:** update ssri to prevent old node 4 crash ([5209ffe](https://github.com/zkat/cacache/commit/5209ffe))



<a name="9.2.5"></a>
## [9.2.5](https://github.com/zkat/cacache/compare/v9.2.4...v9.2.5) (2017-05-25)


### Bug Fixes

* **deps:** fix lockfile issues and bump ssri ([84e1d7e](https://github.com/zkat/cacache/commit/84e1d7e))



<a name="9.2.4"></a>
## [9.2.4](https://github.com/zkat/cacache/compare/v9.2.3...v9.2.4) (2017-05-24)


### Bug Fixes

* **deps:** bumping deps ([bbccb12](https://github.com/zkat/cacache/commit/bbccb12))



<a name="9.2.3"></a>
## [9.2.3](https://github.com/zkat/cacache/compare/v9.2.2...v9.2.3) (2017-05-24)


### Bug Fixes

* **rm:** stop crashing if content is missing on rm ([ac90bc0](https://github.com/zkat/cacache/commit/ac90bc0))



<a name="9.2.2"></a>
## [9.2.2](https://github.com/zkat/cacache/compare/v9.2.1...v9.2.2) (2017-05-14)


### Bug Fixes

* **i18n:** lets pretend this didn't happen ([519b4ee](https://github.com/zkat/cacache/commit/519b4ee))



<a name="9.2.1"></a>
## [9.2.1](https://github.com/zkat/cacache/compare/v9.2.0...v9.2.1) (2017-05-14)


### Bug Fixes

* **docs:** fixing translation messup ([bb9e4f9](https://github.com/zkat/cacache/commit/bb9e4f9))



<a name="9.2.0"></a>
# [9.2.0](https://github.com/zkat/cacache/compare/v9.1.0...v9.2.0) (2017-05-14)


### Features

* **i18n:** add Spanish translation for API ([531f9a4](https://github.com/zkat/cacache/commit/531f9a4))



<a name="9.1.0"></a>
# [9.1.0](https://github.com/zkat/cacache/compare/v9.0.0...v9.1.0) (2017-05-14)


### Features

* **i18n:** Add Spanish translation and i18n setup (#91) ([323b90c](https://github.com/zkat/cacache/commit/323b90c))



<a name="9.0.0"></a>
# [9.0.0](https://github.com/zkat/cacache/compare/v8.0.0...v9.0.0) (2017-04-28)


### Bug Fixes

* **memoization:** actually use the LRU ([0e55dc9](https://github.com/zkat/cacache/commit/0e55dc9))


### Features

* **memoization:** memoizers can be injected through opts.memoize (#90) ([e5614c7](https://github.com/zkat/cacache/commit/e5614c7))


### BREAKING CHANGES

* **memoization:** If you were passing an object to opts.memoize, it will now be used as an injected memoization object. If you were only passing booleans and other non-objects through that option, no changes are needed.



<a name="8.0.0"></a>
# [8.0.0](https://github.com/zkat/cacache/compare/v7.1.0...v8.0.0) (2017-04-22)


### Features

* **read:** change hasContent to return {sri, size} (#88) ([bad6c49](https://github.com/zkat/cacache/commit/bad6c49)), closes [#87](https://github.com/zkat/cacache/issues/87)


### BREAKING CHANGES

* **read:** hasContent now returns an object with `{sri, size}` instead of `sri`. Use `result.sri` anywhere that needed the old return value.



<a name="7.1.0"></a>
# [7.1.0](https://github.com/zkat/cacache/compare/v7.0.5...v7.1.0) (2017-04-20)


### Features

* **size:** handle content size info (#49) ([91230af](https://github.com/zkat/cacache/commit/91230af))



<a name="7.0.5"></a>
## [7.0.5](https://github.com/zkat/cacache/compare/v7.0.4...v7.0.5) (2017-04-18)


### Bug Fixes

* **integrity:** new ssri with fixed integrity stream ([6d13e8e](https://github.com/zkat/cacache/commit/6d13e8e))
* **write:** wrap stuff in promises to improve errors ([3624fc5](https://github.com/zkat/cacache/commit/3624fc5))



<a name="7.0.4"></a>
## [7.0.4](https://github.com/zkat/cacache/compare/v7.0.3...v7.0.4) (2017-04-15)


### Bug Fixes

* **fix-owner:** throw away ENOENTs on chownr ([d49bbcd](https://github.com/zkat/cacache/commit/d49bbcd))



<a name="7.0.3"></a>
## [7.0.3](https://github.com/zkat/cacache/compare/v7.0.2...v7.0.3) (2017-04-05)


### Bug Fixes

* **read:** fixing error message for integrity verification failures ([9d4f0a5](https://github.com/zkat/cacache/commit/9d4f0a5))



<a name="7.0.2"></a>
## [7.0.2](https://github.com/zkat/cacache/compare/v7.0.1...v7.0.2) (2017-04-03)


### Bug Fixes

* **integrity:** use EINTEGRITY error code and update ssri ([8dc2e62](https://github.com/zkat/cacache/commit/8dc2e62))



<a name="7.0.1"></a>
## [7.0.1](https://github.com/zkat/cacache/compare/v7.0.0...v7.0.1) (2017-04-03)


### Bug Fixes

* **docs:** fix header name conflict in readme ([afcd456](https://github.com/zkat/cacache/commit/afcd456))



<a name="7.0.0"></a>
# [7.0.0](https://github.com/zkat/cacache/compare/v6.3.0...v7.0.0) (2017-04-03)


### Bug Fixes

* **test:** fix content.write tests when running in docker ([d2e9b6a](https://github.com/zkat/cacache/commit/d2e9b6a))


### Features

* **integrity:** subresource integrity support (#78) ([b1e731f](https://github.com/zkat/cacache/commit/b1e731f))


### BREAKING CHANGES

* **integrity:** The entire API has been overhauled to use SRI hashes instead of digest/hashAlgorithm pairs. SRI hashes follow the Subresource Integrity standard and support strings and objects compatible with [`ssri`](https://npm.im/ssri).

* This change bumps the index version, which will invalidate all previous index entries. Content entries will remain intact, and existing caches will automatically reuse any content from before this breaking change.

* `cacache.get.info()`, `cacache.ls()`, and `cacache.ls.stream()` will now return objects that looks like this:

```
{
  key: String,
  integrity: '<algorithm>-<base64hash>',
  path: ContentPath,
  time: Date<ms>,
  metadata: Any
}
```

* `opts.digest` and `opts.hashAlgorithm` are obsolete for any API calls that used them.

* Anywhere `opts.digest` was accepted, `opts.integrity` is now an option. Any valid SRI hash is accepted here -- multiple hash entries will be resolved according to the standard: first, the "strongest" hash algorithm will be picked, and then each of the entries for that algorithm will be matched against the content. Content will be validated if *any* of the entries match (so, a single integrity string can be used for multiple "versions" of the same document/data).

* `put.byDigest()`, `put.stream.byDigest`, `get.byDigest()` and `get.stream.byDigest()` now expect an SRI instead of a `digest` + `opts.hashAlgorithm` pairing.

* `get.hasContent()` now expects an integrity hash instead of a digest. If content exists, it will return the specific single integrity hash that was found in the cache.

* `verify()` has learned to handle integrity-based caches, and forgotten how to handle old-style cache indices due to the format change.

* `cacache.rm.content()` now expects an integrity hash instead of a hex digest.



<a name="6.3.0"></a>
# [6.3.0](https://github.com/zkat/cacache/compare/v6.2.0...v6.3.0) (2017-04-01)


### Bug Fixes

* **fixOwner:** ignore EEXIST race condition from mkdirp ([4670e9b](https://github.com/zkat/cacache/commit/4670e9b))
* **index:** ignore index removal races when inserting ([b9d2fa2](https://github.com/zkat/cacache/commit/b9d2fa2))
* **memo:** use lru-cache for better mem management (#75) ([d8ac5aa](https://github.com/zkat/cacache/commit/d8ac5aa))


### Features

* **dependencies:** Switch to move-concurrently (#77) ([dc6482d](https://github.com/zkat/cacache/commit/dc6482d))



<a name="6.2.0"></a>
# [6.2.0](https://github.com/zkat/cacache/compare/v6.1.2...v6.2.0) (2017-03-15)


### Bug Fixes

* **index:** additional bucket entry verification with checksum (#72) ([f8e0f25](https://github.com/zkat/cacache/commit/f8e0f25))
* **verify:** return fixOwner.chownr promise ([6818521](https://github.com/zkat/cacache/commit/6818521))


### Features

* **tmp:** safe tmp dir creation/management util (#73) ([c42da71](https://github.com/zkat/cacache/commit/c42da71))



<a name="6.1.2"></a>
## [6.1.2](https://github.com/zkat/cacache/compare/v6.1.1...v6.1.2) (2017-03-13)


### Bug Fixes

* **index:** set default hashAlgorithm ([d6eb2f0](https://github.com/zkat/cacache/commit/d6eb2f0))



<a name="6.1.1"></a>
## [6.1.1](https://github.com/zkat/cacache/compare/v6.1.0...v6.1.1) (2017-03-13)


### Bug Fixes

* **coverage:** bumping coverage for verify (#71) ([0b7faf6](https://github.com/zkat/cacache/commit/0b7faf6))
* **deps:** glob should have been a regular dep :< ([0640bc4](https://github.com/zkat/cacache/commit/0640bc4))



<a name="6.1.0"></a>
# [6.1.0](https://github.com/zkat/cacache/compare/v6.0.2...v6.1.0) (2017-03-12)


### Bug Fixes

* **coverage:** more coverage for content reads (#70) ([ef4f70a](https://github.com/zkat/cacache/commit/ef4f70a))
* **tests:** use safe-buffer because omfg (#69) ([6ab8132](https://github.com/zkat/cacache/commit/6ab8132))


### Features

* **rm:** limited rm.all and fixed bugs (#66) ([d5d25ba](https://github.com/zkat/cacache/commit/d5d25ba)), closes [#66](https://github.com/zkat/cacache/issues/66)
* **verify:** tested, working cache verifier/gc (#68) ([45ad77a](https://github.com/zkat/cacache/commit/45ad77a))



<a name="6.0.2"></a>
## [6.0.2](https://github.com/zkat/cacache/compare/v6.0.1...v6.0.2) (2017-03-11)


### Bug Fixes

* **index:** segment cache items with another subbucket (#64) ([c3644e5](https://github.com/zkat/cacache/commit/c3644e5))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/zkat/cacache/compare/v6.0.0...v6.0.1) (2017-03-05)


### Bug Fixes

* **docs:** Missed spots in README ([8ffb7fa](https://github.com/zkat/cacache/commit/8ffb7fa))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/zkat/cacache/compare/v5.0.3...v6.0.0) (2017-03-05)


### Bug Fixes

* **api:** keep memo cache mostly-internal ([2f72d0a](https://github.com/zkat/cacache/commit/2f72d0a))
* **content:** use the rest of the string, not the whole string ([fa8f3c3](https://github.com/zkat/cacache/commit/fa8f3c3))
* **deps:** removed `format-number[@2](https://github.com/2).0.2` ([1187791](https://github.com/zkat/cacache/commit/1187791))
* **deps:** removed inflight[@1](https://github.com/1).0.6 ([0d1819c](https://github.com/zkat/cacache/commit/0d1819c))
* **deps:** rimraf[@2](https://github.com/2).6.1 ([9efab6b](https://github.com/zkat/cacache/commit/9efab6b))
* **deps:** standard[@9](https://github.com/9).0.0 ([4202cba](https://github.com/zkat/cacache/commit/4202cba))
* **deps:** tap[@10](https://github.com/10).3.0 ([aa03088](https://github.com/zkat/cacache/commit/aa03088))
* **deps:** weallcontribute[@1](https://github.com/1).0.8 ([ad4f4dc](https://github.com/zkat/cacache/commit/ad4f4dc))
* **docs:** add security note to hashKey ([03f81ba](https://github.com/zkat/cacache/commit/03f81ba))
* **hashes:** change default hashAlgorithm to sha512 ([ea00ba6](https://github.com/zkat/cacache/commit/ea00ba6))
* **hashes:** missed a spot for hashAlgorithm defaults ([45997d8](https://github.com/zkat/cacache/commit/45997d8))
* **index:** add length header before JSON for verification ([fb8cb4d](https://github.com/zkat/cacache/commit/fb8cb4d))
* **index:** change index filenames to sha1s of keys ([bbc5fca](https://github.com/zkat/cacache/commit/bbc5fca))
* **index:** who cares about race conditions anyway ([b1d3888](https://github.com/zkat/cacache/commit/b1d3888))
* **perf:** bulk-read get+read for massive speed ([d26cdf9](https://github.com/zkat/cacache/commit/d26cdf9))
* **perf:** use bulk file reads for index reads ([79a8891](https://github.com/zkat/cacache/commit/79a8891))
* **put-stream:** remove tmp file on stream insert error ([65f6632](https://github.com/zkat/cacache/commit/65f6632))
* **put-stream:** robustified and predictibilized ([daf9e08](https://github.com/zkat/cacache/commit/daf9e08))
* **put-stream:** use new promise API for moves ([1d36013](https://github.com/zkat/cacache/commit/1d36013))
* **readme:** updated to reflect new default hashAlgo ([c60a2fa](https://github.com/zkat/cacache/commit/c60a2fa))
* **verify:** tiny typo fix ([db22d05](https://github.com/zkat/cacache/commit/db22d05))


### Features

* **api:** converted external api ([7bf032f](https://github.com/zkat/cacache/commit/7bf032f))
* **cacache:** exported clearMemoized() utility ([8d2c5b6](https://github.com/zkat/cacache/commit/8d2c5b6))
* **cache:** add versioning to content and index ([31bc549](https://github.com/zkat/cacache/commit/31bc549))
* **content:** collate content files into subdirs ([c094d9f](https://github.com/zkat/cacache/commit/c094d9f))
* **deps:** [@npmcorp](https://github.com/npmcorp)/move[@1](https://github.com/1).0.0 ([bdd00bf](https://github.com/zkat/cacache/commit/bdd00bf))
* **deps:** bluebird[@3](https://github.com/3).4.7 ([3a17aff](https://github.com/zkat/cacache/commit/3a17aff))
* **deps:** promise-inflight[@1](https://github.com/1).0.1 ([a004fe6](https://github.com/zkat/cacache/commit/a004fe6))
* **get:** added memoization support for get ([c77d794](https://github.com/zkat/cacache/commit/c77d794))
* **get:** export hasContent ([2956ec3](https://github.com/zkat/cacache/commit/2956ec3))
* **index:** add hashAlgorithm and format insert ret val ([b639746](https://github.com/zkat/cacache/commit/b639746))
* **index:** collate index files into subdirs ([e8402a5](https://github.com/zkat/cacache/commit/e8402a5))
* **index:** promisify entry index ([cda3335](https://github.com/zkat/cacache/commit/cda3335))
* **memo:** added memoization lib ([da07b92](https://github.com/zkat/cacache/commit/da07b92))
* **memo:** export memoization api ([954b1b3](https://github.com/zkat/cacache/commit/954b1b3))
* **move-file:** add move fallback for weird errors ([5cf4616](https://github.com/zkat/cacache/commit/5cf4616))
* **perf:** bulk content write api ([51b536e](https://github.com/zkat/cacache/commit/51b536e))
* **put:** added memoization support to put ([b613a70](https://github.com/zkat/cacache/commit/b613a70))
* **read:** switched to promises ([a869362](https://github.com/zkat/cacache/commit/a869362))
* **rm:** added memoization support to rm ([4205cf0](https://github.com/zkat/cacache/commit/4205cf0))
* **rm:** switched to promises ([a000d24](https://github.com/zkat/cacache/commit/a000d24))
* **util:** promise-inflight ownership fix requests ([9517cd7](https://github.com/zkat/cacache/commit/9517cd7))
* **util:** use promises for api ([ae204bb](https://github.com/zkat/cacache/commit/ae204bb))
* **verify:** converted to Promises ([f0b3974](https://github.com/zkat/cacache/commit/f0b3974))


### BREAKING CHANGES

* cache: index/content directories are now versioned. Previous caches are no longer compatible and cannot be migrated.
* util: fix-owner now uses Promises instead of callbacks
* index: Previously-generated index entries are no longer compatible and the index must be regenerated.
* index: The index format has changed and previous caches are no longer compatible. Existing caches will need to be regenerated.
* hashes: Default hashAlgorithm changed from sha1 to sha512. If you
rely on the prior setting, pass `opts.hashAlgorithm` in explicitly.
* content: Previously-generated content directories are no longer compatible
and must be regenerated.
* verify: API is now promise-based
* read: Switches to a Promise-based API and removes callback stuff
* rm: Switches to a Promise-based API and removes callback stuff
* index: this changes the API to work off promises instead of callbacks
* api: this means we are going all in on promises now
