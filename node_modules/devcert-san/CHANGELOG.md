# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.3.2"></a>
## [0.3.2](https://github.com/davewasmer/devcert/compare/v0.3.1...v0.3.2) (2017-04-28)


### Bug Fixes

* add -d flag to security command, not sure why it ignores -p otherwise, but oh well ([842404f](https://github.com/davewasmer/devcert/commit/842404f))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/davewasmer/devcert/compare/v0.3.0...v0.3.1) (2017-04-28)


### Bug Fixes

* wrap NSS db dir paths with quotes ([69be0f7](https://github.com/davewasmer/devcert/commit/69be0f7))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/davewasmer/devcert/compare/v0.2.20...v0.3.0) (2017-04-28)


### Bug Fixes

* fix waitForUser async usage ([9fd27c5](https://github.com/davewasmer/devcert/commit/9fd27c5))


### Features

* add root CA setup versioning ([6c80805](https://github.com/davewasmer/devcert/commit/6c80805))



<a name="0.2.20"></a>
## [0.2.20](https://github.com/davewasmer/devcert/compare/v0.2.19...v0.2.20) (2017-04-28)


### Bug Fixes

* eol import ([ff198f0](https://github.com/davewasmer/devcert/commit/ff198f0))



<a name="0.2.19"></a>
## [0.2.19](https://github.com/davewasmer/devcert/compare/v0.2.18...v0.2.19) (2017-04-28)


### Bug Fixes

* warn user to quit firefox before root install ([8bb0271](https://github.com/davewasmer/devcert/commit/8bb0271))



<a name="0.2.18"></a>
## [0.2.18](https://github.com/davewasmer/devcert/compare/v0.2.17...v0.2.18) (2017-04-27)


### Bug Fixes

* add required nickname arg to certutil command ([5bc9874](https://github.com/davewasmer/devcert/commit/5bc9874))



<a name="0.2.17"></a>
## [0.2.17](https://github.com/davewasmer/devcert/compare/v0.2.16...v0.2.17) (2017-04-27)


### Bug Fixes

* trim newlines from discovered certutil path ([f45195e](https://github.com/davewasmer/devcert/commit/f45195e))



<a name="0.2.16"></a>
## [0.2.16](https://github.com/davewasmer/devcert/compare/v0.2.15...v0.2.16) (2017-04-27)


### Bug Fixes

* do not use ~ for home dir, use $HOME instead ([faf1518](https://github.com/davewasmer/devcert/commit/faf1518))



<a name="0.2.15"></a>
## [0.2.15](https://github.com/davewasmer/devcert/compare/v0.2.14...v0.2.15) (2017-04-27)



<a name="0.2.14"></a>
## [0.2.14](https://github.com/davewasmer/devcert/compare/v0.2.13...v0.2.14) (2017-04-27)



<a name="0.2.13"></a>
## [0.2.13](https://github.com/davewasmer/devcert/compare/v0.2.12...v0.2.13) (2017-04-27)


### Bug Fixes

* fix installCertutil handling ([1a571e1](https://github.com/davewasmer/devcert/commit/1a571e1))
* silence openssl output ([f66f558](https://github.com/davewasmer/devcert/commit/f66f558))



<a name="0.2.12"></a>
## [0.2.12](https://github.com/davewasmer/devcert/compare/v0.2.11...v0.2.12) (2017-04-27)



<a name="0.2.11"></a>
## [0.2.11](https://github.com/davewasmer/devcert/compare/v0.2.10...v0.2.11) (2017-04-27)


### Bug Fixes

* add eol conversion for openssl.conf on windows ([f854a0e](https://github.com/davewasmer/devcert/commit/f854a0e))
* escape backslashes in conf template paths ([2354eb0](https://github.com/davewasmer/devcert/commit/2354eb0))



<a name="0.2.10"></a>
## [0.2.10](https://github.com/davewasmer/devcert/compare/v0.2.9...v0.2.10) (2017-04-04)


### Bug Fixes

* use double quotes to avoid escaping issues on windows ([08f4362](https://github.com/davewasmer/devcert/commit/08f4362))



<a name="0.2.9"></a>
## [0.2.9](https://github.com/davewasmer/devcert/compare/v0.2.8...v0.2.9) (2017-04-04)


### Bug Fixes

* don't hardcode path separators in conf template ([b7db54a](https://github.com/davewasmer/devcert/commit/b7db54a))
* fix quote marks -> template string ([32f24f7](https://github.com/davewasmer/devcert/commit/32f24f7))



<a name="0.2.8"></a>
## [0.2.8](https://github.com/davewasmer/devcert/compare/v0.2.7...v0.2.8) (2017-03-31)


### Bug Fixes

* add -batch flag to avoid prompting ([5ba2424](https://github.com/davewasmer/devcert/commit/5ba2424))
* add root ca cert to /etc/ssl/certs on linux ([5dc37a4](https://github.com/davewasmer/devcert/commit/5dc37a4))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/davewasmer/devcert/compare/v0.2.6...v0.2.7) (2017-03-31)


### Bug Fixes

* do not block with execSync when launching firefox, template openssl conf to get config paths ([2600a89](https://github.com/davewasmer/devcert/commit/2600a89))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/davewasmer/devcert/compare/v0.2.5...v0.2.6) (2017-03-31)


### Bug Fixes

* separate commands so each gets sudo, improve debug output ([af40aca](https://github.com/davewasmer/devcert/commit/af40aca))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/davewasmer/devcert/compare/v0.2.4...v0.2.5) (2017-03-31)



<a name="0.2.4"></a>
## [0.2.4](https://github.com/davewasmer/devcert/compare/v0.2.3...v0.2.4) (2017-03-30)


### Bug Fixes

* fix root key path when generating root cert ([83c8672](https://github.com/davewasmer/devcert/commit/83c8672))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/davewasmer/devcert/compare/v0.2.2...v0.2.3) (2017-03-30)


### Bug Fixes

* make the config dir first ([fab033a](https://github.com/davewasmer/devcert/commit/fab033a))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/davewasmer/devcert/compare/v0.2.1...v0.2.2) (2017-03-30)


### Bug Fixes

* fix configDir for non-windows ([7457cde](https://github.com/davewasmer/devcert/commit/7457cde))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/davewasmer/devcert/compare/v0.2.0...v0.2.1) (2017-03-30)


### Bug Fixes

* don't ignore dist when publishing ([eef1738](https://github.com/davewasmer/devcert/commit/eef1738))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/davewasmer/devcert/compare/v0.1.0...v0.2.0) (2017-03-30)


### Features

* improve Readme, return node.createServer compatible object, improve error messaging ([b760220](https://github.com/davewasmer/devcert/commit/b760220))



<a name="0.1.0"></a>
# 0.1.0 (2017-03-29)
