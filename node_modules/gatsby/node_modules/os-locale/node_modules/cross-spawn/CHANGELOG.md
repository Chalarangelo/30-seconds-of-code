# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="6.0.5"></a>
## [6.0.5](https://github.com/moxystudio/node-cross-spawn/compare/v6.0.4...v6.0.5) (2018-03-02)


### Bug Fixes

* avoid using deprecated Buffer constructor ([#94](https://github.com/moxystudio/node-cross-spawn/issues/94)) ([d5770df](https://github.com/moxystudio/node-cross-spawn/commit/d5770df)), closes [/nodejs.org/api/deprecations.html#deprecations_dep0005](https://github.com//nodejs.org/api/deprecations.html/issues/deprecations_dep0005)



<a name="6.0.4"></a>
## [6.0.4](https://github.com/moxystudio/node-cross-spawn/compare/v6.0.3...v6.0.4) (2018-01-31)


### Bug Fixes

* fix paths being incorrectly normalized on unix ([06ee3c6](https://github.com/moxystudio/node-cross-spawn/commit/06ee3c6)), closes [#90](https://github.com/moxystudio/node-cross-spawn/issues/90)



<a name="6.0.3"></a>
## [6.0.3](https://github.com/moxystudio/node-cross-spawn/compare/v6.0.2...v6.0.3) (2018-01-23)



<a name="6.0.2"></a>
## [6.0.2](https://github.com/moxystudio/node-cross-spawn/compare/v6.0.1...v6.0.2) (2018-01-23)



<a name="6.0.1"></a>
## [6.0.1](https://github.com/moxystudio/node-cross-spawn/compare/v6.0.0...v6.0.1) (2018-01-23)



<a name="6.0.0"></a>
# [6.0.0](https://github.com/moxystudio/node-cross-spawn/compare/5.1.0...6.0.0) (2018-01-23)


### Bug Fixes

* fix certain arguments not being correctly escaped or causing batch syntax error ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10)), closes [#82](https://github.com/moxystudio/node-cross-spawn/issues/82) [#51](https://github.com/moxystudio/node-cross-spawn/issues/51)
* fix commands as posix relatixe paths not working correctly, e.g.: `./my-command` ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10))
* fix `options` argument being mutated ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10))
* fix commands resolution when PATH was actually Path ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10))


### Features

* improve compliance with node's ENOENT errors ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10))
* improve detection of node's shell option support ([900cf10](https://github.com/moxystudio/node-cross-spawn/commit/900cf10))


### Chores

* upgrade tooling
* upgrate project to es6 (node v4)


### BREAKING CHANGES

* remove support for older nodejs versions, only `node >= 4` is supported


<a name="5.1.0"></a>
## [5.1.0](https://github.com/moxystudio/node-cross-spawn/compare/5.0.1...5.1.0) (2017-02-26)


### Bug Fixes

* fix `options.shell` support for NodeJS [v4.8](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V4.md#4.8.0)


<a name="5.0.1"></a>
## [5.0.1](https://github.com/moxystudio/node-cross-spawn/compare/5.0.0...5.0.1) (2016-11-04)


### Bug Fixes

* fix `options.shell` support for NodeJS v7


<a name="5.0.0"></a>
# [5.0.0](https://github.com/moxystudio/node-cross-spawn/compare/4.0.2...5.0.0) (2016-10-30)


## Features

* add support for `options.shell`
* improve parsing of shebangs by using [`shebang-command`](https://github.com/kevva/shebang-command) module


## Chores

* refactor some code to make it more clear
* update README caveats
