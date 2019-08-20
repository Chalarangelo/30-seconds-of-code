# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/michael-ciniawsky/postcss-load-config/compare/v2.0.0...v2.1.0) (2019-06-10)


### Bug Fixes

* **plugins:** add `undefined` to plugin `options` check ([#177](https://github.com/michael-ciniawsky/postcss-load-config/issues/177)) ([4349ea9](https://github.com/michael-ciniawsky/postcss-load-config/commit/4349ea9))


### Features

* **src/index:** support synchronous config loading (`rc.sync`) ([f230d40](https://github.com/michael-ciniawsky/postcss-load-config/commit/f230d40))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/michael-ciniawsky/postcss-load-config/compare/v1.2.0...v2.0.0) (2018-07-10)


### Bug Fixes

* **package:** `require-from-string` memory leak, updates `cosmiconfig` v2.1.0...4.0.0 (`dependencies`) ([17f9621](https://github.com/michael-ciniawsky/postcss-load-config/commit/17f9621))
* **src/index.js:** clone the config `{Object}` on assignment instead of mutating it ([8669a90](https://github.com/michael-ciniawsky/postcss-load-config/commit/8669a90))


### Features

* **src:** load plugins from the current working directory ([9745bf0](https://github.com/michael-ciniawsky/postcss-load-config/commit/9745bf0))
* **src:** show config file in `err.message` ([4baff47](https://github.com/michael-ciniawsky/postcss-load-config/commit/4baff47))


### BREAKING CHANGES

* **package:** requires `node >= v4.0.0`
* **package:** removes `argv` option (`options.argv`)
* **package:** removes `--config` parsing



<a name="1.2.0"></a>
# [1.2.0](https://github.com/michael-ciniawsky/postcss-load-config/compare/v1.1.0...v1.2.0) (2017-02-13)


### Features

* **index:** allow extensions for .postcssrc ([0d3bf35](https://github.com/michael-ciniawsky/postcss-load-config/commit/0d3bf35))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/michael-ciniawsky/postcss-load-config/compare/v1.0.0...v1.1.0) (2017-01-11)


### Features

* **index:** config.file, improve error handling ([a6c32fd](https://github.com/michael-ciniawsky/postcss-load-config/commit/a6c32fd))



<a name="1.0.0"></a>
# [1.0.0]((https://github.com/michael-ciniawsky/postcss-load-config/compare/v1.0.0-rc...1.0.0)) (2016-10-27)


### Bug Fixes

* **index:** behavior when config loading fails ([b549bc6](https://github.com/michael-ciniawsky/postcss-load-config/commit/b549bc6)), closes [#26](https://github.com/michael-ciniawsky/postcss-load-config/issues/26)
* **index:** set NODE_ENV when undefined ([b24501c](https://github.com/michael-ciniawsky/postcss-load-config/commit/b24501c))
* **index:** support node v0.12 ([0bbfa94](https://github.com/michael-ciniawsky/postcss-load-config/commit/0bbfa94))

### Features

* **index:** function support, jsdoc, cleanups ([a78c580](https://github.com/michael-ciniawsky/postcss-load-config/commit/a78c580))
