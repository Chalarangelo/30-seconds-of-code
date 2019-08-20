# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.12.11"></a>
## [4.12.11](https://github.com/gaearon/react-hot-loader/compare/v4.12.10...v4.12.11) (2019-08-12)

### Features

* react 16.9 support, [1320](https://github.com/gaearon/react-hot-loader/pull/1320) by @Bnaya

### Bug Fixes

* add noRegister option to webpack, [#1315](https://github.com/gaearon/react-hot-loader/issues/1315) ([e562375](https://github.com/gaearon/react-hot-loader/commit/e562375))
* remove circular deps from hot-loader ([2cb544d](https://github.com/gaearon/react-hot-loader/commit/2cb544d))



<a name="4.12.10"></a>
## [4.12.10](https://github.com/gaearon/react-hot-loader/compare/v4.12.9...v4.12.10) (2019-07-27)


### Bug Fixes

* append react-hot-dom patch note to the ProxyFacade, fixes [#1311](https://github.com/gaearon/react-hot-loader/issues/1311) ([81bbb6a](https://github.com/gaearon/react-hot-loader/commit/81bbb6a))
* use void IIFE for webpack plugin, fixes [#1309](https://github.com/gaearon/react-hot-loader/issues/1309) ([6089822](https://github.com/gaearon/react-hot-loader/commit/6089822))



<a name="4.12.9"></a>
## [4.12.9](https://github.com/gaearon/react-hot-loader/compare/v4.12.8...v4.12.9) (2019-07-23)


### Bug Fixes

* forcely update Context Provider, fixes [#1207](https://github.com/gaearon/react-hot-loader/issues/1207) ([897a68d](https://github.com/gaearon/react-hot-loader/commit/897a68d))
* updating shallowequal dependency ([9269580](https://github.com/gaearon/react-hot-loader/commit/9269580))



<a name="4.12.8"></a>
## [4.12.8](https://github.com/gaearon/react-hot-loader/compare/v4.12.7...v4.12.8) (2019-07-18)


### Bug Fixes

* script error on IE11 due to lack of Object.entries ([6672b26](https://github.com/gaearon/react-hot-loader/commit/6672b26))



<a name="4.12.7"></a>
## [4.12.7](https://github.com/gaearon/react-hot-loader/compare/v4.12.6...v4.12.7) (2019-07-16)


### Bug Fixes

* false negative comparisons with react-hot-dom enabled, fixes [#1299](https://github.com/gaearon/react-hot-loader/issues/1299) ([a1c5c31](https://github.com/gaearon/react-hot-loader/commit/a1c5c31))
* reload hooks when hook body changes ([4795456](https://github.com/gaearon/react-hot-loader/commit/4795456))



<a name="4.12.6"></a>
## [4.12.6](https://github.com/gaearon/react-hot-loader/compare/v4.12.5...v4.12.6) (2019-07-10)


### Bug Fixes

* do not update hooks while updating hooks, fixes [#1294](https://github.com/gaearon/react-hot-loader/issues/1294) ([afa8ed4](https://github.com/gaearon/react-hot-loader/commit/afa8ed4))



<a name="4.12.5"></a>
## [4.12.5](https://github.com/gaearon/react-hot-loader/compare/v4.12.4...v4.12.5) (2019-07-07)


### Bug Fixes

* babel 7.5, fixes [#1292](https://github.com/gaearon/react-hot-loader/issues/1292) ([4441d6d](https://github.com/gaearon/react-hot-loader/commit/4441d6d))



<a name="4.12.4"></a>
## [4.12.4](https://github.com/gaearon/react-hot-loader/compare/v4.12.3...v4.12.4) (2019-07-06)


### Bug Fixes

* remove lodash, [#1269](https://github.com/gaearon/react-hot-loader/issues/1269) ([8ad1b46](https://github.com/gaearon/react-hot-loader/commit/8ad1b46))



<a name="4.12.3"></a>
## [4.12.3](https://github.com/gaearon/react-hot-loader/compare/v4.12.2...v4.12.3) (2019-07-04)


### Bug Fixes

* babel plugin should use only extrernals hooks, fixes [#1285](https://github.com/gaearon/react-hot-loader/issues/1285) ([c435eaa](https://github.com/gaearon/react-hot-loader/commit/c435eaa))
* make type comparison stronger ([1b9f2da](https://github.com/gaearon/react-hot-loader/commit/1b9f2da))
* prevent different typeof of components to be merged ([357249c](https://github.com/gaearon/react-hot-loader/commit/357249c))
* regression of registered type comparison, fixes [#1284](https://github.com/gaearon/react-hot-loader/issues/1284) ([49851be](https://github.com/gaearon/react-hot-loader/commit/49851be))



<a name="4.12.2"></a>
## [4.12.2](https://github.com/gaearon/react-hot-loader/compare/v4.12.1...v4.12.2) (2019-07-03)


### Bug Fixes

* [babel][prod] separate default and root 'hot' detection, fixes [#1283](https://github.com/gaearon/react-hot-loader/issues/1283) ([c6d29c9](https://github.com/gaearon/react-hot-loader/commit/c6d29c9))



<a name="4.12.1"></a>
## [4.12.1](https://github.com/gaearon/react-hot-loader/compare/v4.12.0...v4.12.1) (2019-07-03)


### Bug Fixes

* clone node for signature, fixes [#1268](https://github.com/gaearon/react-hot-loader/issues/1268) ([ed3e1d9](https://github.com/gaearon/react-hot-loader/commit/ed3e1d9))
* memo components are not updated ([5bca98c](https://github.com/gaearon/react-hot-loader/commit/5bca98c))
* use deep clone for fresh signature, fixes [#1280](https://github.com/gaearon/react-hot-loader/issues/1280) ([d796af8](https://github.com/gaearon/react-hot-loader/commit/d796af8))



<a name="4.12.0"></a>
# [4.12.0](https://github.com/gaearon/react-hot-loader/compare/v4.11.2...v4.12.0) (2019-06-30)


### Features

* disable hot replacement render if react-dom is patched, see [#1274](https://github.com/gaearon/react-hot-loader/issues/1274) ([b93eb1d](https://github.com/gaearon/react-hot-loader/commit/b93eb1d))



<a name="4.11.2"></a>
## [4.11.2](https://github.com/gaearon/react-hot-loader/compare/v4.11.1...v4.11.2) (2019-06-30)

### Bug Fixes

* babel-plugin is not compatible with commonjs module output if babel 7 is used #1268.

<a name="4.11.1"></a>
## [4.11.1](https://github.com/gaearon/react-hot-loader/compare/v4.11.0...v4.11.1) (2019-06-15)


### Bug Fixes

* hot render of forward props component ([4ba7530](https://github.com/gaearon/react-hot-loader/commit/4ba7530))
* regression in hidden components reconcilation ([3f8efc4](https://github.com/gaearon/react-hot-loader/commit/3f8efc4))
* update react-fresh babel plugin ([2fafd44](https://github.com/gaearon/react-hot-loader/commit/2fafd44))



<a name="4.11.0"></a>
# [4.11.0](https://github.com/gaearon/react-hot-loader/compare/v4.9.0...v4.11.0) (2019-06-10)


### Bug Fixes

* source map consumer could be synchronous ([05a6c8e](https://github.com/gaearon/react-hot-loader/commit/05a6c8e))


### Features

* backport React.Fresh to handle hooks order change ([e5c4bb4](https://github.com/gaearon/react-hot-loader/commit/e5c4bb4))


<a name="4.10.0"></a>
# [4.10.0](https://github.com/gaearon/react-hot-loader/compare/v4.9.0...v4.10.0) (2019-06-02)


### Features

* transparent class wrapping, fixes [#304](https://github.com/gaearon/react-hot-loader/issues/304) ([9fe4cad](https://github.com/gaearon/react-hot-loader/commit/9fe4cad))



<a name="4.9.0"></a>
# [4.9.0](https://github.com/gaearon/react-hot-loader/compare/v4.8.8...v4.9.0) (2019-06-02)


### Bug Fixes

* false positive hot merge for forwardRef and Memo components, fixes [#1257](https://github.com/gaearon/react-hot-loader/issues/1257) ([dbf1047](https://github.com/gaearon/react-hot-loader/commit/dbf1047))
* improve hot api for production mode - error reporting and babel plugin ([6b29911](https://github.com/gaearon/react-hot-loader/commit/6b29911))


### Features

* support hooks update on HMR, fixes [#1256](https://github.com/gaearon/react-hot-loader/issues/1256) ([7ab076c](https://github.com/gaearon/react-hot-loader/commit/7ab076c))



<a name="4.8.8"></a>
## [4.8.8](https://github.com/gaearon/react-hot-loader/compare/v4.8.7...v4.8.8) (2019-05-23)


### Bug Fixes

* disable RHL when NODE_ENV == test, fixes [#1252](https://github.com/gaearon/react-hot-loader/issues/1252) ([6f56d87](https://github.com/gaearon/react-hot-loader/commit/6f56d87))



<a name="4.8.7"></a>
## [4.8.7](https://github.com/gaearon/react-hot-loader/compare/v4.8.6...v4.8.7) (2019-05-20)


### Bug Fixes

* remove  checks. fixes [#1252](https://github.com/gaearon/react-hot-loader/issues/1252) ([2b2f733](https://github.com/gaearon/react-hot-loader/commit/2b2f733))



<a name="4.8.6"></a>
## [4.8.6](https://github.com/gaearon/react-hot-loader/compare/v4.8.5...v4.8.6) (2019-05-18)


### Bug Fixes

* No HMR missing error in SSR ([956e52b](https://github.com/gaearon/react-hot-loader/commit/956e52b))
* trailing commas at entrypoints, fixes [#1226](https://github.com/gaearon/react-hot-loader/issues/1226) ([989eebf](https://github.com/gaearon/react-hot-loader/commit/989eebf))



<a name="4.8.5"></a>
## [4.8.5](https://github.com/gaearon/react-hot-loader/compare/v4.8.4...v4.8.5) (2019-05-16)


### Bug Fixes

* correct memo fiber updater, fixes [#1230](https://github.com/gaearon/react-hot-loader/issues/1230) ([a185494](https://github.com/gaearon/react-hot-loader/commit/a185494))
* make  API more error prone, fixes [#1228](https://github.com/gaearon/react-hot-loader/issues/1228) ([a6ba488](https://github.com/gaearon/react-hot-loader/commit/a6ba488))
* move react-dom notification to AppContainer, fixes [#1227](https://github.com/gaearon/react-hot-loader/issues/1227) ([28bfdd4](https://github.com/gaearon/react-hot-loader/commit/28bfdd4))
* update root endpoint, fixes [#1226](https://github.com/gaearon/react-hot-loader/issues/1226), [#1240](https://github.com/gaearon/react-hot-loader/issues/1240) ([608805a](https://github.com/gaearon/react-hot-loader/commit/608805a))
* use simpler conditions for index.js, implements [#1244](https://github.com/gaearon/react-hot-loader/issues/1244) ([4811d57](https://github.com/gaearon/react-hot-loader/commit/4811d57))
* webpack plugin fails on hot-loader/react-dom, fixes #[#1234](https://github.com/gaearon/react-hot-loader/issues/1234) ([826eee3](https://github.com/gaearon/react-hot-loader/commit/826eee3))
* webpack-plugin - use RHL global variable, fixes [#1251](https://github.com/gaearon/react-hot-loader/issues/1251) ([f036d36](https://github.com/gaearon/react-hot-loader/commit/f036d36))



<a name="4.8.4"></a>
## [4.8.4](https://github.com/gaearon/react-hot-loader/compare/v4.8.3...v4.8.4) (2019-04-15)


### Bug Fixes

* document the importance of import order, fixes [#1209](https://github.com/gaearon/react-hot-loader/issues/1209) ([5f50ee4](https://github.com/gaearon/react-hot-loader/commit/5f50ee4))
* dont skip first update or plain components ([432e0f8](https://github.com/gaearon/react-hot-loader/commit/432e0f8))
* remove Object.assign, fixes [#1226](https://github.com/gaearon/react-hot-loader/issues/1226) ([c5af009](https://github.com/gaearon/react-hot-loader/commit/c5af009))



<a name="4.8.3"></a>
## [4.8.3](https://github.com/gaearon/react-hot-loader/compare/v4.8.2...v4.8.3) (2019-04-05)


### Bug Fixes

* Allow refs on lazy components ([798e37f](https://github.com/gaearon/react-hot-loader/commit/798e37f))
* invariant violation react 15 ([1351f2d](https://github.com/gaearon/react-hot-loader/commit/1351f2d))



<a name="4.8.1"></a>
## [4.8.1](https://github.com/gaearon/react-hot-loader/compare/v4.8.0...v4.8.1) (2019-03-29)


### Bug Fixes

* root hot for parcel bundler, fixes [#1082](https://github.com/gaearon/react-hot-loader/issues/1082) ([a16679b](https://github.com/gaearon/react-hot-loader/commit/a16679b))



<a name="4.8.0"></a>
# [4.8.0](https://github.com/gaearon/react-hot-loader/compare/v4.7.2...v4.8.0) (2019-03-07)


### Features

* support 16.8.4 ([38b63cd](https://github.com/gaearon/react-hot-loader/commit/38b63cd))



<a name="4.7.2"></a>
## [4.7.2](https://github.com/gaearon/react-hot-loader/compare/v4.7.1...v4.7.2) (2019-03-04)


### Bug Fixes

* safer reads from context consumer ([7942d26](https://github.com/gaearon/react-hot-loader/commit/7942d26))
* suppress error message on a server side, fixes [#1188](https://github.com/gaearon/react-hot-loader/issues/1188) ([b12b430](https://github.com/gaearon/react-hot-loader/commit/b12b430))



<a name="4.7.1"></a>
## [4.7.1](https://github.com/gaearon/react-hot-loader/compare/v4.7.0...v4.7.1) (2019-02-20)


### Bug Fixes

* destructed Context.Provider breaking registrations. fixes [#1184](https://github.com/gaearon/react-hot-loader/issues/1184) ([8240111](https://github.com/gaearon/react-hot-loader/commit/8240111))
* do not poison memoized props ([9f6ab6e](https://github.com/gaearon/react-hot-loader/commit/9f6ab6e))
* rethrow an error is hot comparison is not open ([8befa5a](https://github.com/gaearon/react-hot-loader/commit/8befa5a))



<a name="4.7.0"></a>
# [4.7.0](https://github.com/gaearon/react-hot-loader/compare/v4.6.5...v4.7.0) (2019-02-18)


### Bug Fixes

* complain if hot patches not present, fixes [#1173](https://github.com/gaearon/react-hot-loader/issues/1173) ([efc3d6b](https://github.com/gaearon/react-hot-loader/commit/efc3d6b))
* deactivate RHL in dev mode if eval not allowed ([f995b0d](https://github.com/gaearon/react-hot-loader/commit/f995b0d))
* disable ErrorBoundaries for a first run, fixes [#1172](https://github.com/gaearon/react-hot-loader/issues/1172) ([2a834c2](https://github.com/gaearon/react-hot-loader/commit/2a834c2))
* Support Context.Provider reload and React.memo, fixes [#1169](https://github.com/gaearon/react-hot-loader/issues/1169) ([09e48eb](https://github.com/gaearon/react-hot-loader/commit/09e48eb))


### Features

* activate pureRender by default ([4e971b5](https://github.com/gaearon/react-hot-loader/commit/4e971b5))
* implement flexible hot injections ([b7e8f5e](https://github.com/gaearon/react-hot-loader/commit/b7e8f5e))
* make errors retryable to mitigate hooks update ([9967fde](https://github.com/gaearon/react-hot-loader/commit/9967fde))



<a name="4.6.5"></a>
## [4.6.5](https://github.com/gaearon/react-hot-loader/compare/v4.6.4...v4.6.5) (2019-01-31)


### Bug Fixes

* babel plugin produces a broken code ([6f8573f](https://github.com/gaearon/react-hot-loader/commit/6f8573f))



<a name="4.6.4"></a>
## [4.6.4](https://github.com/gaearon/react-hot-loader/compare/v4.6.3...v4.6.4) (2019-01-31)


### Bug Fixes

* do not shadow component name ([4b02767](https://github.com/gaearon/react-hot-loader/commit/4b02767))
* do not supress HMR errors ([be79d2f](https://github.com/gaearon/react-hot-loader/commit/be79d2f))
* fix wrong react-dom name resolution installation ([6f829a0](https://github.com/gaearon/react-hot-loader/commit/6f829a0))
* opt-out for module safety net, fixes [#1102](https://github.com/gaearon/react-hot-loader/issues/1102), [#1159](https://github.com/gaearon/react-hot-loader/issues/1159) ([93d0b1f](https://github.com/gaearon/react-hot-loader/commit/93d0b1f))
* remove platform checks from production bundle, fixes [#1162](https://github.com/gaearon/react-hot-loader/issues/1162) ([24d0448](https://github.com/gaearon/react-hot-loader/commit/24d0448))
* update fiber cached type, fixes [#1139](https://github.com/gaearon/react-hot-loader/issues/1139) ([35984ff](https://github.com/gaearon/react-hot-loader/commit/35984ff))



<a name="4.6.3"></a>
## [4.6.3](https://github.com/gaearon/react-hot-loader/compare/v4.6.2...v4.6.3) (2018-12-19)


### Bug Fixes

* context information is not always properly emulated in hot-render, fixes [#1094](https://github.com/gaearon/react-hot-loader/issues/1094) ([100fc9c](https://github.com/gaearon/react-hot-loader/commit/100fc9c))
* RHL could update non-relative components ([5d4f226](https://github.com/gaearon/react-hot-loader/commit/5d4f226))
* update memo updater and comparator. fix [#1135](https://github.com/gaearon/react-hot-loader/issues/1135) ([826a57c](https://github.com/gaearon/react-hot-loader/commit/826a57c))



<a name="4.6.2"></a>
## [4.6.2](https://github.com/gaearon/react-hot-loader/compare/v4.6.1...v4.6.2) (2018-12-18)


### Bug Fixes

* allow multiple 'hot' in one file, registering only the first one ([68c2a0a](https://github.com/gaearon/react-hot-loader/commit/68c2a0a))
* error overlay initialization prior body, fixes [#1127](https://github.com/gaearon/react-hot-loader/issues/1127) ([9177aba](https://github.com/gaearon/react-hot-loader/commit/9177aba))



<a name="4.6.1"></a>
## [4.6.1](https://github.com/gaearon/react-hot-loader/compare/4.6.0...4.6.1) (2018-12-17)


### Bug Fixes

* display hmr errors as hmr errors, [#1131](https://github.com/gaearon/react-hot-loader/issues/1131) ([615790f](https://github.com/gaearon/react-hot-loader/commit/615790f))
* error overlay is not server side friendly, [#1126](https://github.com/gaearon/react-hot-loader/issues/1126) ([40e3ff2](https://github.com/gaearon/react-hot-loader/commit/40e3ff2))
* hmr error detection is flaky ([9d3a2c0](https://github.com/gaearon/react-hot-loader/commit/9d3a2c0))
* secure wrapped/uwrapped comparison ([a62bacd](https://github.com/gaearon/react-hot-loader/commit/a62bacd))
* webpack plugin outputs es2015 code ([8a66401](https://github.com/gaearon/react-hot-loader/commit/8a66401))



<a name="4.6.0"></a>
# [4.6.0](https://github.com/gaearon/react-hot-loader/compare/v4.5.3...v4.6.0) (2018-12-13)


### Features

* implement flexible error boundaries ([1846019](https://github.com/gaearon/react-hot-loader/commit/1846019))
* new root/hot for better error management. Fixes [#1078](https://github.com/gaearon/react-hot-loader/issues/1078), [#1111](https://github.com/gaearon/react-hot-loader/issues/1111) ([3029428](https://github.com/gaearon/react-hot-loader/commit/3029428))

<a name="4.5.3"></a>
## [4.5.3](https://github.com/gaearon/react-hot-loader/compare/v4.5.2...v4.5.3) (2018-12-07)


### Bug Fixes

* enable class equality, but disable class merge, when not hot ([8d214b3](https://github.com/gaearon/react-hot-loader/commit/8d214b3))
* react-dom hot-replacement is too active ([8827a40](https://github.com/gaearon/react-hot-loader/commit/8827a40))



<a name="4.5.2"></a>
## [4.5.2](https://github.com/gaearon/react-hot-loader/compare/v4.5.1...v4.5.2) (2018-12-06)


### Bug Fixes

* forwardRef to be remounted every frame. React-router to merge components ([3b11866](https://github.com/gaearon/react-hot-loader/commit/3b11866))
* React-router to merge components ([f45fee0](https://github.com/gaearon/react-hot-loader/commit/f45fee0))
* remove early reject, [#1115](https://github.com/gaearon/react-hot-loader/issues/1115) ([0a28144](https://github.com/gaearon/react-hot-loader/commit/0a28144))



<a name="4.5.1"></a>
## [4.5.1](https://github.com/gaearon/react-hot-loader/compare/v4.5.0...v4.5.1) (2018-11-21)


### Bug Fixes

* add lodash.merge as dep ([1de55d6](https://github.com/gaearon/react-hot-loader/commit/1de55d6))



<a name="4.5.0"></a>
# [4.5.0](https://github.com/gaearon/react-hot-loader/compare/v4.4.0...v4.5.0) (2018-11-20)


### Bug Fixes

* handle older React versions ([a03c1c3](https://github.com/gaearon/react-hot-loader/commit/a03c1c3))
* hot-render forwardRef ([5f362ad](https://github.com/gaearon/react-hot-loader/commit/5f362ad))
* IE11 compact, [#1099](https://github.com/gaearon/react-hot-loader/issues/1099) ([f8ef550](https://github.com/gaearon/react-hot-loader/commit/f8ef550))


### Features

* webpack patch/inject mode ([42d637b](https://github.com/gaearon/react-hot-loader/commit/42d637b))



<a name="4.4.0-1"></a>
## 4.4.0-1 (2018-11-01)
### Bug Fixes
- `forwardRef` reconciliation [#1100](https://github.com/gaearon/react-hot-loader/pull/1100)

<a name="4.4.0"></a>
## [4.4.0](https://github.com/gaearon/react-hot-loader/compare/v4.3.11...v4.3.12) (2018-11-01)


### Features
* React 16.5 and React 16.6 support. forwardRef, memo, lazy [#1084](https://github.com/gaearon/react-hot-loader/pull/1084)
* Webpack loader [#1098](https://github.com/gaearon/react-hot-loader/pull/1098)
* mark RHL sideEffect-free in production mode [#1096](https://github.com/gaearon/react-hot-loader/pull/1096)
* babel plugin will remove `hot` in production [#1091](https://github.com/gaearon/react-hot-loader/pull/1091)

### Bug Fixes

* babel plugin will remove calls to `hot` in production mode to remove side-effect on webpack [#1081](https://github.com/gaearon/react-hot-loader/pull/1081)
* class methods, deleted on update, will be deleted from proxy [#1091](https://github.com/gaearon/react-hot-loader/pull/1091)

<a name="4.3.11"></a>
## [4.3.11](https://github.com/gaearon/react-hot-loader/compare/v4.3.9...v4.3.11) (2018-09-20)


### Bug Fixes

* hot fixing ES5 literals in index.js ([80f6b63](https://github.com/gaearon/react-hot-loader/commit/80f6b63))



<a name="4.3.10"></a>
## [4.3.10](https://github.com/gaearon/react-hot-loader/compare/v4.3.9...v4.3.10) (2018-09-20)

### Bug Fixes

* IE10/CSP compatibility. [#1073](https://github.com/gaearon/react-hot-loader/pull/1073)

<a name="4.3.7"></a>
## [4.3.7](https://github.com/gaearon/react-hot-loader/compare/v4.3.6...v4.3.7) (2018-09-13)


### Bug Fixes

* babel 7 compatibility. [#1043](https://github.com/gaearon/react-hot-loader/issues/1043) ([acad937](https://github.com/gaearon/react-hot-loader/commit/acad937))



<a name="4.3.6"></a>
## [4.3.6](https://github.com/gaearon/react-hot-loader/compare/v4.3.5...v4.3.6) (2018-09-04)


### Bug Fixes

* don't inadvertendly call getters ([322e746](https://github.com/gaearon/react-hot-loader/commit/322e746))



<a name="4.3.5"></a>
## [4.3.5](https://github.com/gaearon/react-hot-loader/compare/4.3.4...4.3.5) (2018-08-23)


### Bug Fixes

* dont hot-swap registered components, [#1050](https://github.com/gaearon/react-hot-loader/issues/1050) ([cf165a6](https://github.com/gaearon/react-hot-loader/commit/cf165a6))
* use the same conditions for index and patch ([f67d5b9](https://github.com/gaearon/react-hot-loader/commit/f67d5b9))



<a name="4.3.4"></a>
## [4.3.4](https://github.com/gaearon/react-hot-loader/compare/v4.3.3...v4.3.4) (2018-07-25)


### Bug Fixes

* element could be double-proxied ([#1033](https://github.com/gaearon/react-hot-loader/pull/1033))
* Components, not directly inherited from React.Components, like StyledComponents, are not working ([#1031](https://github.com/gaearon/react-hot-loader/pull/1031)) 



<a name="4.3.3"></a>
## [4.3.3](https://github.com/gaearon/react-hot-loader/compare/4.3.1...4.3.3) (2018-06-15)


### Bug Fixes

* add _this to sandbox variables, [#1020](https://github.com/gaearon/react-hot-loader/issues/1020) ([e5284ab](https://github.com/gaearon/react-hot-loader/commit/e5284ab))



<a name="4.3.2"></a>
## [4.3.2](https://github.com/gaearon/react-hot-loader/compare/4.3.1...4.3.2) (2018-06-13)

### Bug Fixes
* Add cold API to TypeScript definitions

<a name="4.3.1"></a>
## [4.3.1](https://github.com/gaearon/react-hot-loader/compare/4.3.0...4.3.1) (2018-06-09)


### Bug Fixes

* Preact could pass arguments to the render, fix [#1013](https://github.com/gaearon/react-hot-loader/issues/1013) ([605da10](https://github.com/gaearon/react-hot-loader/commit/605da10))
* Support _this10 and over ([bb47ca4](https://github.com/gaearon/react-hot-loader/commit/bb47ca4))
* Handle lazy indeterminate static properties(Relay) [#1014](https://github.com/gaearon/react-hot-loader/pull/1014)



<a name="4.3.0"></a>
# [4.3.0](https://github.com/gaearon/react-hot-loader/compare/v4.2.0...v4.3.0) (2018-06-05)


### Bug Fixes

* Context Provider could crash due update, [#944](https://github.com/gaearon/react-hot-loader/issues/944) ([b0e2b5b](https://github.com/gaearon/react-hot-loader/commit/b0e2b5b))
* RHL babel plugin will ignore react and react-hot-loader, fixes [#900](https://github.com/gaearon/react-hot-loader/issues/900) ([e90a25c](https://github.com/gaearon/react-hot-loader/commit/e90a25c))
* RHL should add new class methods ([111d56e](https://github.com/gaearon/react-hot-loader/commit/111d56e))
* Multiple problems with methods update. Revert behavior back to v4.1.2 [#1001](https://github.com/gaearon/react-hot-loader/issues/1001)

### Features

* Preact support [#952](https://github.com/gaearon/react-hot-loader/issues/952) ([2b40f57](https://github.com/gaearon/react-hot-loader/commit/2b40f57))
* Cold components [#991](https://github.com/gaearon/react-hot-loader/issues/991) ([9bcff36](https://github.com/gaearon/react-hot-loader/commit/9bcff36))



<a name="4.2.0"></a>
## [4.2.0](https://github.com/gaearon/react-hot-loader/compare/v4.1.3...v4.2.0) (2018-05-16)

## Changes
 * Stateless Components will be converted to React.Component ones (as they were prior 4.1.0) [#977](https://github.com/gaearon/react-hot-loader/pull/977)

## Features
 * Basic support for React 16 Context [#979](https://github.com/gaearon/react-hot-loader/issues/979)

## Bug fixes
 * pure components wont update [#959](https://github.com/gaearon/react-hot-loader/issues/959), [#944](https://github.com/gaearon/react-hot-loader/issues/944)
 * better babel compliance ("this5"), [#969](https://github.com/gaearon/react-hot-loader/issues/969)
 * sideeffect-less updates [#970](https://github.com/gaearon/react-hot-loader/pull/970)
 * render as a class property [#924](https://github.com/gaearon/react-hot-loader/issues/924)
 * issues around reactLifecyclesCompat.polyfill [#951](https://github.com/gaearon/react-hot-loader/issues/951)
 * more examples and test cases
 * multiple reconsilation related bug fixes

<a name="4.1.3"></a>
## [4.1.3](https://github.com/gaearon/react-hot-loader/compare/v4.1.2...v4.1.3) (2018-05-08)


### Bug Fixes

* always update bound functions. [#949](https://github.com/gaearon/react-hot-loader/issues/949) ([7819c71](https://github.com/gaearon/react-hot-loader/commit/7819c71))
* Fragment with a single element. fixes [#956](https://github.com/gaearon/react-hot-loader/issues/956) ([7e80881](https://github.com/gaearon/react-hot-loader/commit/7e80881))
* props merge order. [#967](https://github.com/gaearon/react-hot-loader/issues/967) ([#968](https://github.com/gaearon/react-hot-loader/issues/968)) ([1f8adb9](https://github.com/gaearon/react-hot-loader/commit/1f8adb9))



<a name="4.1.2"></a>

## [4.1.2](https://github.com/gaearon/react-hot-loader/compare/4.1.0...4.1.2) (2018-04-24)

### Bug Fixes

* condition render in Fragments [#942](https://github.com/gaearon/react-hot-loader/issues/942) ([#943](https://github.com/gaearon/react-hot-loader/issues/943)) ([2549a18](https://github.com/gaearon/react-hot-loader/commit/2549a18))

<a name="4.1.1"></a>

## [4.1.1](https://github.com/gaearon/react-hot-loader/compare/4.1.0...4.1.1) (2018-04-24)

### Bug Fixes

* Proxy should keep methods own props. [#918](https://github.com/gaearon/react-hot-loader/issues/918) ([a84dcd0](https://github.com/gaearon/react-hot-loader/commit/a84dcd0))

<a name="4.1.0"></a>

## [4.1.0](https://github.com/gaearon/react-hot-loader/compare/4.0.1...4.1.0) (2018-04-18)

### Features

* 🚀 React 16.3 support  ([#918](https://github.com/gaearon/react-hot-loader/issues/918))
* 🧙🏻‍♂️ StatelessFunctionComponents are not wrapped by Stateful components anymore ([#873](https://github.com/gaearon/react-hot-loader/issues/873))
* 🧠Improved TypeScript support (no more than documentation)  ([#884](https://github.com/gaearon/react-hot-loader/issues/884))

### Bug Fixes
*  support babel temporal `_this3` ([#928](https://github.com/gaearon/react-hot-loader/issues/928))

<a name="4.0.1"></a>

## [4.0.1](https://github.com/gaearon/react-hot-loader/compare/v4.0.0...v4.0.1) (2018-04-01)

### Bug Fixes

* fix double proxy registration ([#915](https://github.com/gaearon/react-hot-loader/issues/915)) ([f8532df](https://github.com/gaearon/react-hot-loader/commit/f8532df)), closes [#912](https://github.com/gaearon/react-hot-loader/issues/912)
* replace `.includes` by `.indexOf` (IE11 fix) ([#906](https://github.com/gaearon/react-hot-loader/issues/906)) ([87ad586](https://github.com/gaearon/react-hot-loader/commit/87ad586))
* break render recursion (MobX fix) ([#889](https://github.com/gaearon/react-hot-loader/issues/889)) ([33f2376](https://github.com/gaearon/react-hot-loader/commit/33f2376))

### Docs

* Improve TypeScript documentation ([#914](https://github.com/gaearon/react-hot-loader/issues/914)) ([d3b91de](https://github.com/gaearon/react-hot-loader/commit/d3b91de))

<a name="4.0.0"></a>

# [4.0.0](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-rc.0...v4.0.0) (2018-02-27)

### Bug Fixes

* proper children reconcile for nested tags, fixes [#869](https://github.com/gaearon/react-hot-loader/issues/869) ([#871](https://github.com/gaearon/react-hot-loader/issues/871)) ([2de4e58](https://github.com/gaearon/react-hot-loader/commit/2de4e58))

<a name="4.0.0-rc.0"></a>

# [4.0.0-rc.0](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.23...v4.0.0-rc.0) (2018-02-19)

<a name="4.0.0-beta.23"></a>

# [4.0.0-beta.23](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.22...v4.0.0-beta.23) (2018-02-18)

### Bug Fixes

* disable RHL when HMR is not activated ([#863](https://github.com/gaearon/react-hot-loader/issues/863)) ([ffe0035](https://github.com/gaearon/react-hot-loader/commit/ffe0035))
* fix various bugs ([#857](https://github.com/gaearon/react-hot-loader/issues/857)) ([8fa1d42](https://github.com/gaearon/react-hot-loader/commit/8fa1d42)), closes [#845](https://github.com/gaearon/react-hot-loader/issues/845) [#843](https://github.com/gaearon/react-hot-loader/issues/843)
* transfer original prototype methods ([#859](https://github.com/gaearon/react-hot-loader/issues/859)) ([0b7997f](https://github.com/gaearon/react-hot-loader/commit/0b7997f)), closes [#845](https://github.com/gaearon/react-hot-loader/issues/845) [#843](https://github.com/gaearon/react-hot-loader/issues/843) [#858](https://github.com/gaearon/react-hot-loader/issues/858)

<a name="4.0.0-beta.22"></a>

# [4.0.0-beta.22](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.21...v4.0.0-beta.22) (2018-02-10)

### Bug Fixes

* fix reconciler warnings ([#852](https://github.com/gaearon/react-hot-loader/issues/852)) ([963677f](https://github.com/gaearon/react-hot-loader/commit/963677f)), closes [#843](https://github.com/gaearon/react-hot-loader/issues/843)

### Features

* ship flat bundles ([#844](https://github.com/gaearon/react-hot-loader/issues/844)) ([7580552](https://github.com/gaearon/react-hot-loader/commit/7580552))

<a name="4.0.0-beta.21"></a>

# [4.0.0-beta.21](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.20...v4.0.0-beta.21) (2018-02-05)

### Bug Fixes

* fix proxy adapter ([#842](https://github.com/gaearon/react-hot-loader/issues/842)) ([9bb8251](https://github.com/gaearon/react-hot-loader/commit/9bb8251))

<a name="4.0.0-beta.20"></a>

# [4.0.0-beta.20](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.19...v4.0.0-beta.20) (2018-02-04)

<a name="4.0.0-beta.19"></a>

# [4.0.0-beta.19](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.18...v4.0.0-beta.19) (2018-02-03)

### Bug Fixes

* **areComponentsEqual:** fix behaviour ([#829](https://github.com/gaearon/react-hot-loader/issues/829)) ([d4dcd07](https://github.com/gaearon/react-hot-loader/commit/d4dcd07))
* **prop-types:** add prop-types as dependency ([#823](https://github.com/gaearon/react-hot-loader/issues/823)) ([c2b7c3c](https://github.com/gaearon/react-hot-loader/commit/c2b7c3c))
* regenerate overriden members ([#837](https://github.com/gaearon/react-hot-loader/issues/837)) ([39d4f5b](https://github.com/gaearon/react-hot-loader/commit/39d4f5b)), closes [#836](https://github.com/gaearon/react-hot-loader/issues/836)

<a name="4.0.0-beta.18"></a>

# [4.0.0-beta.18](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.17...v4.0.0-beta.18) (2018-01-25)

### Bug Fixes

* break cyclic dependency ([#822](https://github.com/gaearon/react-hot-loader/issues/822)) ([328d793](https://github.com/gaearon/react-hot-loader/commit/328d793)), closes [#820](https://github.com/gaearon/react-hot-loader/issues/820)

<a name="4.0.0-beta.17"></a>

# [4.0.0-beta.17](https://github.com/gaearon/react-hot-loader/compare/4.0.0-beta.16...v4.0.0-beta.17) (2018-01-22)

### Features

* remove useless dependencies ([e1b83e5](https://github.com/gaearon/react-hot-loader/commit/e1b83e5)), closes [#808](https://github.com/gaearon/react-hot-loader/issues/808)

### Bug Fixes

* warn about errors [#814](https://github.com/gaearon/react-hot-loader/issues/814)
* handle wrong module [#813](https://github.com/gaearon/react-hot-loader/issues/#813)

<a name="4.0.0-beta.16"></a>

# [4.0.0-beta.16](https://github.com/theKashey/react-hot-loader/compare/v4.0.0-beta.15-1...v4.0.0-beta.16) (2018-01-21)

* **react-hot-loader:** Hard code consts from stand-in [#807](https://github.com/gaearon/react-hot-loader/issues/807))
* **react-hot-loader:** Support React 16 Fragments [#799](https://github.com/gaearon/react-hot-loader/issues/799))
* **react-hot-loader:** Suppress some warnings [#804](https://github.com/gaearon/react-hot-loader/issues/804))
* **react-hot-loader:** Better Electron support [#794](https://github.com/gaearon/react-hot-loader/issues/794))

* **react-stand-in:** Fix IE11 regression (again)

<a name="4.0.0-beta.15"></a>

# [4.0.0-beta.15](https://github.com/theKashey/react-hot-loader/compare/v4.0.0-beta.14...v4.0.0-beta.15) (2018-01-16)

* **react-deep-force-update:** remove from the project
* **react-stand-in:** fix MobX (Cannot assign to read only property 'render', [#796](https://github.com/gaearon/react-hot-loader/issues/796))

<a name="4.0.0-beta.14"></a>

# [4.0.0-beta.14](https://github.com/theKashey/react-hot-loader/compare/v4.0.0-beta.13...v4.0.0-beta.14) (2018-01-14)

* **react-hot-loader:** support IE11 ([#772](https://github.com/gaearon/react-hot-loader/issues/772))
* **react-stand-in:** support Relay Classis/Modern([#775](https://github.com/gaearon/react-hot-loader/issues/775))

<a name="4.0.0-beta.13"></a>

# [4.0.0-beta.13](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.12...v4.0.0-beta.13) (2018-01-09)

### Features

* **react-hot-loader:** detect wrong usage of `hot` ([#766](https://github.com/gaearon/react-hot-loader/issues/766)) ([b9738c7](https://github.com/gaearon/react-hot-loader/commit/b9738c7)), closes [#765](https://github.com/gaearon/react-hot-loader/issues/765)

<a name="4.0.0-beta.12"></a>

# [4.0.0-beta.12](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.11...v4.0.0-beta.12) (2018-01-02)

### Bug Fixes

* target ES5 for production code ([b1d6d05](https://github.com/gaearon/react-hot-loader/commit/b1d6d05)), closes [#758](https://github.com/gaearon/react-hot-loader/issues/758)

<a name="4.0.0-beta.11"></a>

# [4.0.0-beta.11](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.10...v4.0.0-beta.11) (2017-12-30)

### Bug Fixes

* **build:** fix builded files ([f4aa275](https://github.com/gaearon/react-hot-loader/commit/f4aa275))

<a name="4.0.0-beta.10"></a>

# [4.0.0-beta.10](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.9...v4.0.0-beta.10) (2017-12-30)

### Bug Fixes

* **babel:** do not use capital letters ([#754](https://github.com/gaearon/react-hot-loader/issues/754)) ([bf48675](https://github.com/gaearon/react-hot-loader/commit/bf48675)), closes [#753](https://github.com/gaearon/react-hot-loader/issues/753)

<a name="4.0.0-beta.9"></a>

# [4.0.0-beta.9](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.8...v4.0.0-beta.9) (2017-12-30)

### Bug Fixes

* **react-hot-loader:** require `react-hot-loader/patch` in each file ([3038538](https://github.com/gaearon/react-hot-loader/commit/3038538)), closes [#750](https://github.com/gaearon/react-hot-loader/issues/750)

<a name="4.0.0-beta.8"></a>

# [4.0.0-beta.8](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.7...v4.0.0-beta.8) (2017-12-29)

### Bug Fixes

* **react-hot-loader:** fix missing export ([239ca5d](https://github.com/gaearon/react-hot-loader/commit/239ca5d))

<a name="4.0.0-beta.7"></a>

# [4.0.0-beta.7](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.6...v4.0.0-beta.7) (2017-12-29)

### Bug Fixes

* handle async loading of patch ([#739](https://github.com/gaearon/react-hot-loader/issues/739)) ([af8bd4b](https://github.com/gaearon/react-hot-loader/commit/af8bd4b))
* **react-hot-loader:** fix componentWillUpdate ([95a9e79](https://github.com/gaearon/react-hot-loader/commit/95a9e79))
* use safe defineProperty ([f901192](https://github.com/gaearon/react-hot-loader/commit/f901192))

### Features

* replace warnings by `configure({ debug: true })` ([4f079c6](https://github.com/gaearon/react-hot-loader/commit/4f079c6))

<a name="4.0.0-beta.6"></a>

# [4.0.0-beta.6](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.5...v4.0.0-beta.6) (2017-12-27)

Same as 4.0.0-beta.5, fix build problem.

<a name="4.0.0-beta.5"></a>

# [4.0.0-beta.5](https://github.com/gaearon/react-hot-loader/compare/v4.0.0-beta.4...v4.0.0-beta.5) (2017-12-27)

### Bug Fixes

* improve decorators support (autobind)
  ([56883c9](https://github.com/gaearon/react-hot-loader/commit/56883c9))
* support nested children
  ([#735](https://github.com/gaearon/react-hot-loader/issues/735))
  ([5c81655](https://github.com/gaearon/react-hot-loader/commit/5c81655))

# Manual changelog

### 4.0.0-beta.4

* Handle terminal node in stack (#728)

### 4.0.0-beta.3

* Use setTimeout to tick (#726)

### 4.0.0-beta.2

* Bunch of fixes (#725)

### 4.0.0-beta.1

* Remove webpack plugin (#707)
* Replace react-proxy by react-stand-in (#707)
* Replace react-deep-force-update by reconciler (#703)
* Add `hot` HOC (#707)
* Add `areComponentsEqual` (#304)
* `warnings` flag now controls reconciler, not dev patch.

### 3.1.1

* Revert fix arrow function that uses props in constructor (#670)
* Remove babel-template dependency (#671)

### 3.1.0

* Add an option to disable warnings (#669)
* Fix arrow function that uses props in constructor (#670)

### 3.0.0

* Add React 16 support (#629, #658)
* Remove RedBox as default error catcher (#494)

### 3.0.0-beta.6

* Use production versions of `patch` and `AppContainer` if no `module.hot`
  available, so it doesn't break people using `NODE_ENV=test`. (#398)
* Opt out of transforming static class properties. (#381)

### 3.0.0-beta.5

* Makes the class properties portion of the Babel plugin work with async
  functions. (#372)
* Change the output of the tagger code in the Babel plugin so that it doesn't
  break the output of `babel-node`. (#374)

### 3.0.0-beta.4

* Extends the Babel plugin to enable hot reloading of class properties. (#322)
* Fixes a bug in the Webpack loader from a component importing a module with the
  same basename. (#347)

### 3.0.0-beta.3

* Fixes broken import of RedBox, which led to confusing stack traces when
  applications threw errors. (#314)
* Add `module.hot` checks to conditional `require()`s to remove unnecessary
  warnings when using server rendering. (#302)

### 3.0.0-beta.2

* Patch `React.createFactory` (#287)
* Fix props typo (#285)

### 3.0.0-beta.1

* Adds complete React Router support. Async routes should work fine now. (#272)
* Fixes a nasty bug which caused unwrapped component to render. (#266, #272)
* Fixes an issue that caused components with `shouldComponentUpdate`
  optimizations not getting redrawn (#269,
  2a1e384d54e1919117f70f75dd20ad2490b1d9f5)
* Internal: a rewrite and much better test coverage.

### 3.0.0-beta.0

* Fixes an issue when used in Webpack 2
  (https://github.com/gaearon/react-hot-loader/issues/263)
* **Breaking change:** instead of

  ```js
  ;<AppContainer component={App} props={{ prop: val }} />
  ```

````
  you now need to write

  ```js
  <AppContainer>
    <App prop={val} />
  </AppContainer>
````

(#250)

**See
[this commit](https://github.com/gaearon/react-hot-boilerplate/commit/b52c727937a499f3efdc5dceb74ae952aa318c3a)
as an update reference!**

### 3.0.0-alpha

Big changes both to internals and usage. No docs yet but you can look at
https://github.com/gaearon/react-hot-boilerplate/pull/61 for an example.

### 2.0.0-alpha

**Experimental release that isn't really representative on what will go in 2.0,
but uses the new engine.**

Some ideas of what should be possible with the new engine:

* There is no requirement to pass `getRootInstances()` anymore, so React Hot
  Loader doesn't need `react/lib/ReactMount` or walk the tree, which was
  somewhat fragile and changing between versions
* Static methods and properties are now hot-reloaded
* Instance getters and setters are now hot reloaded
* Static getters and setters are now hot reloaded
* Deleted instance methods are now deleted during hot reloading
* Single method form of
  [autobind-decorator](https://github.com/andreypopp/autobind-decorator) is now
  supported

What might get broken:

* We no longer overwrite or even touch the original class. Every time makeHot is
  invoked, it will return a special proxy class. This means a caveat: for
  example, static methods will only be hot-reloaded if you refer to them as
  `this.constructor.doSomething()` instead of `FooBar.doSomething()`. This is
  because React Hot Loader calls `makeHot` right before exporting, so `FooBar`
  still refers to the original class. Similarly, `this.constructor === App` will
  be `false` inside `App` unless you call `App = makeHot(App)` manually, which
  you can't do with React Hot Loader. **I'm not sure how much of a problem this
  will be, so let me know if it pains you.** In the longer term, we will
  deprecate React Hot Loader in favor of a Babel plugin which will be able to
  rewrite class definitions correctly, so it shouldn't be a problem for a long
  time. If there is demand, we can introduce a mode that rewrites passed
  classes, too.

### 1.3.1

* Fix import for ReactMount to support 15.4.0
  (**[#430](https://github.com/gaearon/react-hot-loader/pull/430)**)

### 1.3.0

* Recover from module errors on module level
  (**[#187](https://github.com/gaearon/react-hot-loader/pull/187)**)

### 1.2.9

* Silently ignore exports that raise an error when accessed (#114)
* Update `source-map` dependency

### 1.2.8

* Remove React from peerDependencies
* Update React Hot API to support React 0.14 beta 1

### 1.2.7

* Preserve CommonJS `exports` context in the wrapping closure
  (**[#124](https://github.com/gaearon/react-hot-loader/issues/124)**)

### 1.2.6

* Fix autobinding on newly added methods for `createClass`-style classes

### 1.2.5

* Fix “React is not defined” error

### 1.2.4

* Avoid updating each class twice in React 0.12

### 1.2.3

* Explicitly exclude `react/lib` files from processing. You **should** use
  `exclude: /node_modules/` in configuration, but at least this doesn't blow up
  for those who don't.

### 1.2.2

* Fix crash on React 0.13. Now compatible!

### 1.2.1

* Don't try to flatten inheritance chains, as it causes problems with `super`
* Instead, automatically opt custom base classes into hot reloading as long as
  they descend from `React.Component` (in React 0.13). If your custom base class
  doesn't do that but you'd still want to have hot reloading, you need to
  manually opt it in via `module.makeHot` API.

### 1.2.0

* Support hot-reloading components without a base class
  (**[react-hot-api#5](https://github.com/gaearon/react-hot-api/issues/5)**)
* Support hot-reloading inheritance chains
  (**[react-hot-api#10](https://github.com/gaearon/react-hot-api/issues/10)**)
* Support using React 0.13 as an external

### 1.1.7

* Add React 0.13 RC2 to peerDeps

### 1.1.6

* Allow React 0.13 RC1
* Better support for ES6 inheritance
* Fix reloading for modules with null prototype chain (**#82**)

### 1.1.5

* Wrap user code in IEFF to prevent losing `"use strict"`. Fixes #75

### 1.1.4

* Fix crash when hot-reloading element factory. (Note: React discourages
  exporting factories.)

### 1.1.3

* Avoid warnings on React 0.13

### 1.1.2

* Compatibility with React 0.13.0-beta.1

### 1.1.1

* Fix edge cases by requiring `react/lib/ReactMount` in transformed source files
* Add a warning if `ReactMount` doesn't return anything useful (e.g. when using
  external React)

### 1.1.0

* Skipping `node_modules` entirely
  [wasn't](https://github.com/gaearon/react-hot-loader/issues/58)
  [the best idea](https://github.com/gaearon/react-hot-loader/issues/55).
  Instead, we now specifically skip `node_modules/react/`,
  `node_modules/webpack/` and `node_modules/react-hot-loader/`. However you are
  still **encouraged** to
  [add `exclude: /node_modules/` to your loader config](https://github.com/gaearon/react-hot-boilerplate/blob/master/webpack.config.js#L24)
  for best performance.
* Now modules that don't export any valid React classes in `module.exports` or
  any its properties will not be auto-accepted. This prevents hot loader from
  trying to handle non-React updates and allows changes in plain JS files to
  propagate to components that can handle them. For example, this allows
  [react-jss](https://github.com/jsstyles/react-jss) mixin to apply hot updates
  to JSS styles.

### 1.0.7

* Skip `node_modules` entirely. Fixes
  [#54](https://github.com/gaearon/react-hot-loader/issues/54) on Windows.

### 1.0.6

* Add `require('react-hot-loader/Injection')` to override Hot Loader behavior.
  Now you can supply your own way of getting root component instances, so Hot
  Loader can also work in environment where `require('react/lib/ReactMount')` is
  not available (for example,
  [when React is used as standalone bundle and not NPM package](https://github.com/gaearon/react-hot-loader/issues/53)).

### 1.0.5

* Fix stack overflow when hotifying same class twice
  ([#52](https://github.com/gaearon/react-hot-loader/issues/52))

### 1.0.4

* Allow both `module.exports` and its properties be components (Fixes
  [#50](https://github.com/gaearon/react-hot-loader/issues/50))

### 1.0.3

* In addition to hotifying `module.exports` by default, also hotify all its own
  properties

### 1.0.2

* Don't try to hot-replace `module.export`ed `ReactElement`s

### 1.0.1

* Delay `require`ing `ReactMount` to avoid circular dependencies
* Don't process React or Webpack internals to avoid potential issues

### 1.0.0

* Don't rely on `createClass` regex or any other regex
* Only `module.exports` is hot by default
* Supports ES6 classes when they land in React 0.13
* Supports dynamically created classes
* Manual mode

See
[what changed and how to migrate to 1.0](https://github.com/gaearon/react-hot-loader/blob/master/docs/README.md#migrating-to-10).

### 0.5.0

* Adds source map support, contributed by
  [Jake Riesterer](https://github.com/jRiest)

### 0.4.5

* Collapse all hot loader code in one line so it doesn't obscure beginning of
  file.

### 0.4.4

* Errors occuring in module definition (such as `ReferenceError`) should not
  disable further reloading (fixes
  **[#29](https://github.com/gaearon/react-hot-loader/issues/29)**)

### 0.4.3

* Support lowercase `react` reference name and usage with ES6 classes
  (`createClass(MyComponent.prototype)`) via
  **[#27](https://github.com/gaearon/react-hot-loader/issues/27)**

### 0.4.2

* Catch errors in modules and log them instead of reloading (fixes
  **[#21](https://github.com/gaearon/react-hot-loader/issues/21)**)

### 0.4.1

* Use more precise
  [`React.createClass` regex](https://github.com/gaearon/react-hot-loader/commit/f71c6785131adcc85b91789da0d0a0b9f1a9713f)
  to avoid matching own code when hot loader is applied to all JS files.

### 0.4.0

* Ignore files that contain no `createClass` calls (fixes
  **[#17](https://github.com/gaearon/react-hot-loader/issues/17)**)
* Remove the need for pitch loader (fixes
  **[#19](https://github.com/gaearon/react-hot-loader/issues/19)**)
* Improve performance by only using one loader instead of two
* Now that performance is acceptable, remove desktop notifications and `notify`
  option
* It is now recommended that you use `devtool: 'eval'` because it's much faster
  and has no downsides anymore

### 0.3.1

* Avoid warnings on old browsers with missing `Notification` API
* Errors don't cause page reload anymore

### 0.3.0

* Use React 0.11
