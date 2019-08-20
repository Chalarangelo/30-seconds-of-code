# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.8.0](https://github.com/webpack/webpack-dev-server/compare/v3.7.2...v3.8.0) (2019-08-09)


### Bug Fixes

* **server:** fix setupExitSignals usage ([#2181](https://github.com/webpack/webpack-dev-server/issues/2181)) ([bbe410e](https://github.com/webpack/webpack-dev-server/commit/bbe410e))
* **server:** set port before instantiating server ([#2143](https://github.com/webpack/webpack-dev-server/issues/2143)) ([cfbf229](https://github.com/webpack/webpack-dev-server/commit/cfbf229))
* check for name of HotModuleReplacementPlugin to avoid RangeError ([#2146](https://github.com/webpack/webpack-dev-server/issues/2146)) ([4579775](https://github.com/webpack/webpack-dev-server/commit/4579775))
* **server:** check for external urls in array ([#1980](https://github.com/webpack/webpack-dev-server/issues/1980)) ([fa78347](https://github.com/webpack/webpack-dev-server/commit/fa78347))
* **server:** fix header check for socket server ([#2077](https://github.com/webpack/webpack-dev-server/issues/2077)) ([7f51859](https://github.com/webpack/webpack-dev-server/commit/7f51859))
* **server:** stricter headers security check ([#2092](https://github.com/webpack/webpack-dev-server/issues/2092)) ([078ddca](https://github.com/webpack/webpack-dev-server/commit/078ddca))


### Features

* **server:** add transportMode ([#2116](https://github.com/webpack/webpack-dev-server/issues/2116)) ([b5b9cb4](https://github.com/webpack/webpack-dev-server/commit/b5b9cb4))
* **server:** serverMode 'ws' option ([#2082](https://github.com/webpack/webpack-dev-server/issues/2082)) ([04483f4](https://github.com/webpack/webpack-dev-server/commit/04483f4))
* **server/client:** made progress option available to API ([#1961](https://github.com/webpack/webpack-dev-server/issues/1961)) ([56274e4](https://github.com/webpack/webpack-dev-server/commit/56274e4))

### Potential Breaking changes

We have migrated `serverMode` and `clientMode` to `transportMode` as an experimental option. If you want to use this feature, you have to change your settings. 

Related PR: https://github.com/webpack/webpack-dev-server/pull/2116


### [3.7.2](https://github.com/webpack/webpack-dev-server/compare/v3.7.1...v3.7.2) (2019-06-17)


### Bug Fixes

* **client:** add default fallback for client ([#2015](https://github.com/webpack/webpack-dev-server/issues/2015)) ([d26b444](https://github.com/webpack/webpack-dev-server/commit/d26b444))
* **open:** set `wait: false` to run server.close successfully ([#2001](https://github.com/webpack/webpack-dev-server/issues/2001)) ([2b4cb52](https://github.com/webpack/webpack-dev-server/commit/2b4cb52))
* **test:** fixed ProvidePlugin.test.js ([#2002](https://github.com/webpack/webpack-dev-server/issues/2002)) ([47453cb](https://github.com/webpack/webpack-dev-server/commit/47453cb))



### [3.7.1](https://github.com/webpack/webpack-dev-server/compare/v3.7.0...v3.7.1) (2019-06-07)


### Bug Fixes

* retry finding port when port is null and get ports in sequence ([#1993](https://github.com/webpack/webpack-dev-server/issues/1993)) ([bc57514](https://github.com/webpack/webpack-dev-server/commit/bc57514))



## [3.7.0](https://github.com/webpack/webpack-dev-server/compare/v3.6.0...v3.7.0) (2019-06-06)


### Bug Fixes

* change clientLogLevel order to be called first ([#1973](https://github.com/webpack/webpack-dev-server/issues/1973)) ([57c8c92](https://github.com/webpack/webpack-dev-server/commit/57c8c92))
* es6 syntax in client ([#1982](https://github.com/webpack/webpack-dev-server/issues/1982)) ([802aa30](https://github.com/webpack/webpack-dev-server/commit/802aa30))



## [3.6.0](https://github.com/webpack/webpack-dev-server/compare/v3.5.1...v3.6.0) (2019-06-05)


### Bug Fixes

* **config:** enable `--overlay` ([#1968](https://github.com/webpack/webpack-dev-server/issues/1968)) ([dc81e23](https://github.com/webpack/webpack-dev-server/commit/dc81e23))
* **server:** don't ignore node_modules by default ([#1970](https://github.com/webpack/webpack-dev-server/issues/1970)) ([699f8b4](https://github.com/webpack/webpack-dev-server/commit/699f8b4)), closes [#1794](https://github.com/webpack/webpack-dev-server/issues/1794)


### Features

* **server:** add serverMode option ([#1937](https://github.com/webpack/webpack-dev-server/issues/1937)) ([44a8cde](https://github.com/webpack/webpack-dev-server/commit/44a8cde))



### [3.5.1](https://github.com/webpack/webpack-dev-server/compare/v3.5.0...v3.5.1) (2019-06-01)


### Bug Fixes

* allow passing promise function of webpack.config.js ([#1947](https://github.com/webpack/webpack-dev-server/issues/1947)) ([8cf1053](https://github.com/webpack/webpack-dev-server/commit/8cf1053))



## [3.5.0](https://github.com/webpack/webpack-dev-server/compare/v3.4.1...v3.5.0) (2019-05-31)


### Bug Fixes

* add client code for `electron-renderer` target ([#1935](https://github.com/webpack/webpack-dev-server/issues/1935)) ([9297988](https://github.com/webpack/webpack-dev-server/commit/9297988))
* add client code for `node-webkit` target ([#1942](https://github.com/webpack/webpack-dev-server/issues/1942)) ([c6b2b1f](https://github.com/webpack/webpack-dev-server/commit/c6b2b1f))


### Features

* **server:** `onListening` option ([#1930](https://github.com/webpack/webpack-dev-server/issues/1930)) ([61d0cdf](https://github.com/webpack/webpack-dev-server/commit/61d0cdf))
* **server:** add callback support for invalidate ([#1900](https://github.com/webpack/webpack-dev-server/issues/1900)) ([cd218ef](https://github.com/webpack/webpack-dev-server/commit/cd218ef))
* **server:** add `WEBPACK_DEV_SERVER` env variable ([#1929](https://github.com/webpack/webpack-dev-server/issues/1929)) ([856169e](https://github.com/webpack/webpack-dev-server/commit/856169e))



### [3.4.1](https://github.com/webpack/webpack-dev-server/compare/v3.4.0...v3.4.1) (2019-05-17)


### Bug Fixes

* add none and warning to clientLogLevel ([#1901](https://github.com/webpack/webpack-dev-server/issues/1901)) ([0ae9be8](https://github.com/webpack/webpack-dev-server/commit/0ae9be8))
* broken hot reload ([#1903](https://github.com/webpack/webpack-dev-server/issues/1903)) ([6a444cd](https://github.com/webpack/webpack-dev-server/commit/6a444cd))



## [3.4.0](https://github.com/webpack/webpack-dev-server/compare/v3.3.1...v3.4.0) (2019-05-17)


### Bug Fixes

* don't use self.location.port ([#1838](https://github.com/webpack/webpack-dev-server/issues/1838)) ([6d31984](https://github.com/webpack/webpack-dev-server/commit/6d31984))
* do not include config files in dist ([#1883](https://github.com/webpack/webpack-dev-server/issues/1883)) ([c535bb2](https://github.com/webpack/webpack-dev-server/commit/c535bb2))
* only add client entry to web targets ([#1775](https://github.com/webpack/webpack-dev-server/issues/1775)) ([cf4d0d0](https://github.com/webpack/webpack-dev-server/commit/cf4d0d0))
* update clientLogLevel to match docs and error ([#1825](https://github.com/webpack/webpack-dev-server/issues/1825)) ([7f52bbf](https://github.com/webpack/webpack-dev-server/commit/7f52bbf))
* add errors-warnings preset ([#1895](https://github.com/webpack/webpack-dev-server/issues/1895)) ([2a81ad2](https://github.com/webpack/webpack-dev-server/commit/2a81ad2))


### Features

* added injectClient option ([#1775](https://github.com/webpack/webpack-dev-server/issues/1775)) ([cf4d0d0](https://github.com/webpack/webpack-dev-server/commit/cf4d0d0))
* added injectHot option ([#1775](https://github.com/webpack/webpack-dev-server/issues/1775)) ([cf4d0d0](https://github.com/webpack/webpack-dev-server/commit/cf4d0d0))
* added sockPort option ([#1792](https://github.com/webpack/webpack-dev-server/issues/1792)) ([58d1682](https://github.com/webpack/webpack-dev-server/commit/58d1682))
* added sockHost option ([#1858](https://github.com/webpack/webpack-dev-server/issues/1858)) ([f47dff2](https://github.com/webpack/webpack-dev-server/commit/f47dff2))
* support HEAD method ([#1875](https://github.com/webpack/webpack-dev-server/issues/1875)) ([c2360e4](https://github.com/webpack/webpack-dev-server/commit/c2360e4))
* added liveReload option ([#1889](https://github.com/webpack/webpack-dev-server/issues/1889)) ([fc4fe32](https://github.com/webpack/webpack-dev-server/commit/fc4fe32))
* update express to 4.17 version


## [3.3.1](https://github.com/webpack/webpack-dev-server/compare/v3.3.0...v3.3.1) (2019-04-09)


### Bug Fixes

* **regression:** always get necessary stats for hmr ([#1780](https://github.com/webpack/webpack-dev-server/issues/1780)) ([66b04a9](https://github.com/webpack/webpack-dev-server/commit/66b04a9))
* **regression:** host and port can be undefined or null ([#1779](https://github.com/webpack/webpack-dev-server/issues/1779)) ([028ceee](https://github.com/webpack/webpack-dev-server/commit/028ceee))
* only add entries after compilers have been created ([#1774](https://github.com/webpack/webpack-dev-server/issues/1774)) ([b31cbaa](https://github.com/webpack/webpack-dev-server/commit/b31cbaa))



# [3.3.0](https://github.com/webpack/webpack-dev-server/compare/v3.2.1...v3.3.0) (2019-04-08)


### Bug Fixes

* compatibility with webpack-cli@3.3 ([#1754](https://github.com/webpack/webpack-dev-server/issues/1754)) ([fd7cb0d](https://github.com/webpack/webpack-dev-server/commit/fd7cb0d))
* ignore proxy when bypass return false ([#1696](https://github.com/webpack/webpack-dev-server/issues/1696)) ([aa7de77](https://github.com/webpack/webpack-dev-server/commit/aa7de77))
* respect stats option from webpack config ([#1665](https://github.com/webpack/webpack-dev-server/issues/1665)) ([efaa740](https://github.com/webpack/webpack-dev-server/commit/efaa740))
* use location.port when location.hostname is used to infer HMR socket URL ([#1664](https://github.com/webpack/webpack-dev-server/issues/1664)) ([2f7f052](https://github.com/webpack/webpack-dev-server/commit/2f7f052))
* don't crash with express.static.mime.types ([#1765](https://github.com/webpack/webpack-dev-server/issues/1765)) ([919ff77](https://github.com/webpack/webpack-dev-server/commit/919ff77))


### Features

* add option "serveIndex" to enable/disable serveIndex middleware ([#1752](https://github.com/webpack/webpack-dev-server/issues/1752)) ([d5d60cb](https://github.com/webpack/webpack-dev-server/commit/d5d60cb))
* add webpack as argument to before and after options ([#1760](https://github.com/webpack/webpack-dev-server/issues/1760)) ([0984d4b](https://github.com/webpack/webpack-dev-server/commit/0984d4b))
* http2 option to enable/disable HTTP/2 with HTTPS ([#1721](https://github.com/webpack/webpack-dev-server/issues/1721)) ([dcd2434](https://github.com/webpack/webpack-dev-server/commit/dcd2434))
* random port retry logic ([#1692](https://github.com/webpack/webpack-dev-server/issues/1692)) ([419f02e](https://github.com/webpack/webpack-dev-server/commit/419f02e))
* relax depth limit from chokidar for content base ([#1697](https://github.com/webpack/webpack-dev-server/issues/1697)) ([7ea9ab9](https://github.com/webpack/webpack-dev-server/commit/7ea9ab9))



## [3.2.1](https://github.com/webpack/webpack-dev-server/compare/v3.2.0...v3.2.1) (2019-02-25)


### Bug Fixes

* deprecation message about `setup` now warning about `v4` ([#1684](https://github.com/webpack/webpack-dev-server/issues/1684)) ([523a6ec](https://github.com/webpack/webpack-dev-server/commit/523a6ec))
* **regression:** allow `ca`, `key` and `cert` will be string ([#1676](https://github.com/webpack/webpack-dev-server/issues/1676)) ([b8d5c1e](https://github.com/webpack/webpack-dev-server/commit/b8d5c1e))
* **regression:** handle `key`, `cert`, `cacert` and `pfx` in CLI ([#1688](https://github.com/webpack/webpack-dev-server/issues/1688)) ([4b2076c](https://github.com/webpack/webpack-dev-server/commit/4b2076c))
* **regression:** problem with `idb-connector` after update `internal-ip` ([#1691](https://github.com/webpack/webpack-dev-server/issues/1691)) ([eb48691](https://github.com/webpack/webpack-dev-server/commit/eb48691))



<a name="3.1.14"></a>
## [3.1.14](https://github.com/webpack/webpack-dev-server/compare/v3.1.13...v3.1.14) (2018-12-24)


### Bug Fixes

* add workaround for Origin header in sockjs ([#1608](https://github.com/webpack/webpack-dev-server/issues/1608)) ([1dfd4fb](https://github.com/webpack/webpack-dev-server/commit/1dfd4fb))



<a name="3.1.13"></a>
## [3.1.13](https://github.com/webpack/webpack-dev-server/compare/v3.1.12...v3.1.13) (2018-12-22)


### Bug Fixes

* delete a comma for Node.js <= v7.x ([#1609](https://github.com/webpack/webpack-dev-server/issues/1609)) ([0bab1c0](https://github.com/webpack/webpack-dev-server/commit/0bab1c0))



<a name="3.1.12"></a>
## [3.1.12](https://github.com/webpack/webpack-dev-server/compare/v3.1.11...v3.1.12) (2018-12-22)


### Bug Fixes

* regression in `checkHost` for checking Origin header ([#1606](https://github.com/webpack/webpack-dev-server/issues/1606)) ([8bb3ca8](https://github.com/webpack/webpack-dev-server/commit/8bb3ca8))



<a name="3.1.11"></a>
## [3.1.11](https://github.com/webpack/webpack-dev-server/compare/v3.1.10...v3.1.11) (2018-12-21)


### Bug Fixes

* **bin/options:** correct check for color support (`options.color`) ([#1555](https://github.com/webpack/webpack-dev-server/issues/1555)) ([55398b5](https://github.com/webpack/webpack-dev-server/commit/55398b5))
* **package:** update `spdy` v3.4.1...4.0.0 (assertion error) ([#1491](https://github.com/webpack/webpack-dev-server/issues/1491)) ([#1563](https://github.com/webpack/webpack-dev-server/issues/1563)) ([7a3a257](https://github.com/webpack/webpack-dev-server/commit/7a3a257))
* **Server:** correct `node` version checks ([#1543](https://github.com/webpack/webpack-dev-server/issues/1543)) ([927a2b3](https://github.com/webpack/webpack-dev-server/commit/927a2b3))
* **Server:** mime type for wasm in contentBase directory ([#1575](https://github.com/webpack/webpack-dev-server/issues/1575)) ([#1580](https://github.com/webpack/webpack-dev-server/issues/1580)) ([fadae5d](https://github.com/webpack/webpack-dev-server/commit/fadae5d))
* add url for compatibility with webpack@5 ([#1598](https://github.com/webpack/webpack-dev-server/issues/1598)) ([#1599](https://github.com/webpack/webpack-dev-server/issues/1599)) ([68dd49a](https://github.com/webpack/webpack-dev-server/commit/68dd49a))
* check origin header for websocket connection ([#1603](https://github.com/webpack/webpack-dev-server/issues/1603)) ([b3217ca](https://github.com/webpack/webpack-dev-server/commit/b3217ca))



<a name="3.1.10"></a>
## [3.1.10](https://github.com/webpack/webpack-dev-server/compare/v3.1.9...v3.1.10) (2018-10-23)


### Bug Fixes

* **options:** add `writeToDisk` option to schema ([#1520](https://github.com/webpack/webpack-dev-server/issues/1520)) ([d2f4902](https://github.com/webpack/webpack-dev-server/commit/d2f4902))
* **package:** update `sockjs-client` v1.1.5...1.3.0 (`url-parse` vulnerability) ([#1537](https://github.com/webpack/webpack-dev-server/issues/1537)) ([e719959](https://github.com/webpack/webpack-dev-server/commit/e719959))
* **Server:** set `tls.DEFAULT_ECDH_CURVE` to `'auto'` ([#1531](https://github.com/webpack/webpack-dev-server/issues/1531)) ([c12def3](https://github.com/webpack/webpack-dev-server/commit/c12def3))



<a name="3.1.9"></a>
## [3.1.9](https://github.com/webpack/webpack-dev-server/compare/v3.1.8...v3.1.9) (2018-09-24)



<a name="3.1.8"></a>
## [3.1.8](https://github.com/webpack/webpack-dev-server/compare/v3.1.7...v3.1.8) (2018-09-06)


### Bug Fixes

* **package:** `yargs` security vulnerability (`dependencies`) ([#1492](https://github.com/webpack/webpack-dev-server/issues/1492)) ([8fb67c9](https://github.com/webpack/webpack-dev-server/commit/8fb67c9))
* **utils/createLogger:** ensure `quiet` always takes precedence (`options.quiet`) ([#1486](https://github.com/webpack/webpack-dev-server/issues/1486)) ([7a6ca47](https://github.com/webpack/webpack-dev-server/commit/7a6ca47))



<a name="3.1.7"></a>
## [3.1.7](https://github.com/webpack/webpack-dev-server/compare/v3.1.6...v3.1.7) (2018-08-29)


### Bug Fixes

* **Server:** don't use `spdy` on `node >= v10.0.0` ([#1451](https://github.com/webpack/webpack-dev-server/issues/1451)) ([8ab9eb6](https://github.com/webpack/webpack-dev-server/commit/8ab9eb6))



<a name="3.1.6"></a>
## [3.1.6](https://github.com/webpack/webpack-dev-server/compare/v3.1.5...v3.1.6) (2018-08-26)


### Bug Fixes

* **bin:** handle `process` signals correctly when the server isn't ready yet ([#1432](https://github.com/webpack/webpack-dev-server/issues/1432)) ([334c3a5](https://github.com/webpack/webpack-dev-server/commit/334c3a5))
* **examples/cli:** correct template path in `open-page` example ([#1401](https://github.com/webpack/webpack-dev-server/issues/1401)) ([df30727](https://github.com/webpack/webpack-dev-server/commit/df30727))
* **schema:** allow the `output` filename to be a `{Function}` ([#1409](https://github.com/webpack/webpack-dev-server/issues/1409)) ([e2220c4](https://github.com/webpack/webpack-dev-server/commit/e2220c4))
