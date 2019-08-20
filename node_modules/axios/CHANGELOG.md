# Changelog

### 0.19.0 (May 30, 2019)

Fixes and Functionality:

- Unzip response body only for statuses != 204 ([#1129](https://github.com/axios/axios/pull/1129)) - drawski
- Destroy stream on exceeding maxContentLength (fixes [#1098](https://github.com/axios/axios/issue/1098)) ([#1485](https://github.com/axios/axios/pull/1485)) - Gadzhi Gadzhiev
- Makes Axios error generic to use AxiosResponse ([#1738](https://github.com/axios/axios/pull/1738)) - Suman Lama
- Fixing Mocha tests by locking follow-redirects version to 1.5.10 ([#1993](https://github.com/axios/axios/pull/1993)) - grumblerchester
- Allow uppercase methods in typings. ([#1781](https://github.com/axios/axios/pull/1781)) - Ken Powers
- Fixing .eslintrc without extension ([#1789](https://github.com/axios/axios/pull/1789)) - Manoel
- Consistent coding style ([#1787](https://github.com/axios/axios/pull/1787)) - Ali Servet Donmez
- Fixing building url with hash mark ([#1771](https://github.com/axios/axios/pull/1771)) - Anatoly Ryabov
- This commit fix building url with hash map (fragment identifier) when parameters are present: they must not be added after `#`, because client cut everything after `#`
- Preserve HTTP method when following redirect ([#1758](https://github.com/axios/axios/pull/1758)) - Rikki Gibson
- Add `getUri` signature to TypeScript definition. ([#1736](https://github.com/axios/axios/pull/1736)) - Alexander Trauzzi
- Adding isAxiosError flag to errors thrown by axios ([#1419](https://github.com/axios/axios/pull/1419)) - Ayush Gupta
- Fix failing SauceLabs tests by updating configuration - Emily Morehouse

Documentation:

- Add information about auth parameter to README ([#2166](https://github.com/axios/axios/pull/2166)) - xlaguna
- Add DELETE to list of methods that allow data as a config option ([#2169](https://github.com/axios/axios/pull/2169)) - Daniela Borges Matos de Carvalho
- Update ECOSYSTEM.md - Add Axios Endpoints ([#2176](https://github.com/axios/axios/pull/2176)) - Renan
- Add r2curl in ECOSYSTEM ([#2141](https://github.com/axios/axios/pull/2141)) - 유용우 / CX
- Update README.md - Add instructions for installing with yarn ([#2036](https://github.com/axios/axios/pull/2036)) - Victor Hermes
- Fixing spacing for README.md ([#2066](https://github.com/axios/axios/pull/2066)) - Josh McCarty
- Update README.md. - Change `.then` to `.finally` in example code ([#2090](https://github.com/axios/axios/pull/2090)) - Omar Cai
- Clarify what values responseType can have in Node ([#2121](https://github.com/axios/axios/pull/2121)) - Tyler Breisacher
- docs(ECOSYSTEM): add axios-api-versioning ([#2020](https://github.com/axios/axios/pull/2020)) - Weffe
- It seems that `responseType: 'blob'` doesn't actually work in Node (when I tried using it, response.data was a string, not a Blob, since Node doesn't have Blobs), so this clarifies that this option should only be used in the browser
- Add issue templates - Emily Morehouse
- Update README.md. - Add Querystring library note ([#1896](https://github.com/axios/axios/pull/1896)) - Dmitriy Eroshenko
- Add react-hooks-axios to Libraries section of ECOSYSTEM.md ([#1925](https://github.com/axios/axios/pull/1925)) - Cody Chan
- Clarify in README that default timeout is 0 (no timeout) ([#1750](https://github.com/axios/axios/pull/1750)) - Ben Standefer

### 0.19.0-beta.1 (Aug 9, 2018)

**NOTE:** This is a beta version of this release. There may be functionality that is broken in
certain browsers, though we suspect that builds are hanging and not erroring. See
https://saucelabs.com/u/axios for the most up-to-date information.

New Functionality:

- Add getUri method ([#1712](https://github.com/axios/axios/issues/1712))
- Add support for no_proxy env variable ([#1693](https://github.com/axios/axios/issues/1693))
- Add toJSON to decorated Axios errors to faciliate serialization ([#1625](https://github.com/axios/axios/issues/1625))
- Add second then on axios call ([#1623](https://github.com/axios/axios/issues/1623))
- Typings: allow custom return types
- Add option to specify character set in responses (with http adapter)

Fixes:

- Fix Keep defaults local to instance ([#385](https://github.com/axios/axios/issues/385))
- Correctly catch exception in http test ([#1475](https://github.com/axios/axios/issues/1475))
- Fix accept header normalization ([#1698](https://github.com/axios/axios/issues/1698))
- Fix http adapter to allow HTTPS connections via HTTP ([#959](https://github.com/axios/axios/issues/959))
- Fix Removes usage of deprecated Buffer constructor. ([#1555](https://github.com/axios/axios/issues/1555), [#1622](https://github.com/axios/axios/issues/1622))
- Fix defaults to use httpAdapter if available ([#1285](https://github.com/axios/axios/issues/1285))
  - Fixing defaults to use httpAdapter if available
  - Use a safer, cross-platform method to detect the Node environment
- Fix Reject promise if request is cancelled by the browser ([#537](https://github.com/axios/axios/issues/537))
- [Typescript] Fix missing type parameters on delete/head methods
- [NS]: Send `false` flag isStandardBrowserEnv for Nativescript
- Fix missing type parameters on delete/head
- Fix Default method for an instance always overwritten by get
- Fix type error when socketPath option in AxiosRequestConfig
- Capture errors on request data streams
- Decorate resolve and reject to clear timeout in all cases

Huge thanks to everyone who contributed to this release via code (authors listed
below) or via reviews and triaging on GitHub:

- Andrew Scott <ascott18@gmail.com>
- Anthony Gauthier <antho325@hotmail.com>
- arpit <arpit2438735@gmail.com>
- ascott18
- Benedikt Rötsch <axe312ger@users.noreply.github.com>
- Chance Dickson <me@chancedickson.com>
- Dave Stewart <info@davestewart.co.uk>
- Deric Cain <deric.cain@gmail.com>
- Guillaume Briday <guillaumebriday@gmail.com>
- Jacob Wejendorp <jacob@wejendorp.dk>
- Jim Lynch <mrdotjim@gmail.com>
- johntron
- Justin Beckwith <beckwith@google.com>
- Justin Beckwith <justin.beckwith@gmail.com>
- Khaled Garbaya <khaledgarbaya@gmail.com>
- Lim Jing Rong <jjingrong@users.noreply.github.com>
- Mark van den Broek <mvdnbrk@gmail.com>
- Martti Laine <martti@codeclown.net>
- mattridley
- mattridley <matt.r@joinblink.com>
- Nicolas Del Valle <nicolas.delvalle@gmail.com>
- Nilegfx
- pbarbiero
- Rikki Gibson <rikkigibson@gmail.com>
- Sako Hartounian <sakohartounian@yahoo.com>
- Shane Fitzpatrick <fitzpasd@gmail.com>
- Stephan Schneider <stephanschndr@gmail.com>
- Steven <steven@ceriously.com>
- Tim Garthwaite <tim.garthwaite@jibo.com>
- Tim Johns <timjohns@yahoo.com>
- Yutaro Miyazaki <yutaro@studio-rubbish.com>

### 0.18.0 (Feb 19, 2018)

- Adding support for UNIX Sockets when running with Node.js ([#1070](https://github.com/axios/axios/pull/1070))
- Fixing typings ([#1177](https://github.com/axios/axios/pull/1177)):
  - AxiosRequestConfig.proxy: allows type false
  - AxiosProxyConfig: added auth field
- Adding function signature in AxiosInstance interface so AxiosInstance can be invoked ([#1192](https://github.com/axios/axios/pull/1192), [#1254](https://github.com/axios/axios/pull/1254))
- Allowing maxContentLength to pass through to redirected calls as maxBodyLength in follow-redirects config ([#1287](https://github.com/axios/axios/pull/1287))
- Fixing configuration when using an instance - method can now be set ([#1342](https://github.com/axios/axios/pull/1342))

### 0.17.1 (Nov 11, 2017)

- Fixing issue with web workers ([#1160](https://github.com/axios/axios/pull/1160))
- Allowing overriding transport ([#1080](https://github.com/axios/axios/pull/1080))
- Updating TypeScript typings ([#1165](https://github.com/axios/axios/pull/1165), [#1125](https://github.com/axios/axios/pull/1125), [#1131](https://github.com/axios/axios/pull/1131))

### 0.17.0 (Oct 21, 2017)

- **BREAKING** Fixing issue with `baseURL` and interceptors ([#950](https://github.com/axios/axios/pull/950))
- **BREAKING** Improving handing of duplicate headers ([#874](https://github.com/axios/axios/pull/874))
- Adding support for disabling proxies ([#691](https://github.com/axios/axios/pull/691))
- Updating TypeScript typings with generic type parameters ([#1061](https://github.com/axios/axios/pull/1061))

### 0.16.2 (Jun 3, 2017)

- Fixing issue with including `buffer` in bundle ([#887](https://github.com/axios/axios/pull/887))
- Including underlying request in errors ([#830](https://github.com/axios/axios/pull/830))
- Convert `method` to lowercase ([#930](https://github.com/axios/axios/pull/930))

### 0.16.1 (Apr 8, 2017)

- Improving HTTP adapter to return last request in case of redirects ([#828](https://github.com/axios/axios/pull/828))
- Updating `follow-redirects` dependency ([#829](https://github.com/axios/axios/pull/829))
- Adding support for passing `Buffer` in node ([#773](https://github.com/axios/axios/pull/773))

### 0.16.0 (Mar 31, 2017)

- **BREAKING** Removing `Promise` from axios typings in favor of built-in type declarations ([#480](https://github.com/axios/axios/issues/480))
- Adding `options` shortcut method ([#461](https://github.com/axios/axios/pull/461))
- Fixing issue with using `responseType: 'json'` in browsers incompatible with XHR Level 2 ([#654](https://github.com/axios/axios/pull/654))
- Improving React Native detection ([#731](https://github.com/axios/axios/pull/731))
- Fixing `combineURLs` to support empty `relativeURL` ([#581](https://github.com/axios/axios/pull/581))
- Removing `PROTECTION_PREFIX` support ([#561](https://github.com/axios/axios/pull/561))

### 0.15.3 (Nov 27, 2016)

- Fixing issue with custom instances and global defaults ([#443](https://github.com/axios/axios/issues/443))
- Renaming `axios.d.ts` to `index.d.ts` ([#519](https://github.com/axios/axios/issues/519))
- Adding `get`, `head`, and `delete` to `defaults.headers` ([#509](https://github.com/axios/axios/issues/509))
- Fixing issue with `btoa` and IE ([#507](https://github.com/axios/axios/issues/507))
- Adding support for proxy authentication ([#483](https://github.com/axios/axios/pull/483))
- Improving HTTP adapter to use `http` protocol by default ([#493](https://github.com/axios/axios/pull/493))
- Fixing proxy issues ([#491](https://github.com/axios/axios/pull/491))

### 0.15.2 (Oct 17, 2016)

- Fixing issue with calling `cancel` after response has been received ([#482](https://github.com/axios/axios/issues/482))

### 0.15.1 (Oct 14, 2016)

- Fixing issue with UMD ([#485](https://github.com/axios/axios/issues/485))

### 0.15.0 (Oct 10, 2016)

- Adding cancellation support ([#452](https://github.com/axios/axios/pull/452))
- Moving default adapter to global defaults ([#437](https://github.com/axios/axios/pull/437))
- Fixing issue with `file` URI scheme ([#440](https://github.com/axios/axios/pull/440))
- Fixing issue with `params` objects that have no prototype ([#445](https://github.com/axios/axios/pull/445))

### 0.14.0 (Aug 27, 2016)

- **BREAKING** Updating TypeScript definitions ([#419](https://github.com/axios/axios/pull/419))
- **BREAKING** Replacing `agent` option with `httpAgent` and `httpsAgent` ([#387](https://github.com/axios/axios/pull/387))
- **BREAKING** Splitting `progress` event handlers into `onUploadProgress` and `onDownloadProgress` ([#423](https://github.com/axios/axios/pull/423))
- Adding support for `http_proxy` and `https_proxy` environment variables ([#366](https://github.com/axios/axios/pull/366))
- Fixing issue with `auth` config option and `Authorization` header ([#397](https://github.com/axios/axios/pull/397))
- Don't set XSRF header if `xsrfCookieName` is `null` ([#406](https://github.com/axios/axios/pull/406))

### 0.13.1 (Jul 16, 2016)

- Fixing issue with response data not being transformed on error ([#378](https://github.com/axios/axios/issues/378))

### 0.13.0 (Jul 13, 2016)

- **BREAKING** Improved error handling ([#345](https://github.com/axios/axios/pull/345))
- **BREAKING** Response transformer now invoked in dispatcher not adapter ([10eb238](https://github.com/axios/axios/commit/10eb23865101f9347570552c04e9d6211376e25e))
- **BREAKING** Request adapters now return a `Promise` ([157efd5](https://github.com/axios/axios/commit/157efd5615890301824e3121cc6c9d2f9b21f94a))
- Fixing issue with `withCredentials` not being overwritten ([#343](https://github.com/axios/axios/issues/343))
- Fixing regression with request transformer being called before request interceptor ([#352](https://github.com/axios/axios/issues/352))
- Fixing custom instance defaults ([#341](https://github.com/axios/axios/issues/341))
- Fixing instances created from `axios.create` to have same API as default axios ([#217](https://github.com/axios/axios/issues/217))

### 0.12.0 (May 31, 2016)

- Adding support for `URLSearchParams` ([#317](https://github.com/axios/axios/pull/317))
- Adding `maxRedirects` option ([#307](https://github.com/axios/axios/pull/307))

### 0.11.1 (May 17, 2016)

- Fixing IE CORS support ([#313](https://github.com/axios/axios/pull/313))
- Fixing detection of `FormData` ([#325](https://github.com/axios/axios/pull/325))
- Adding `Axios` class to exports ([#321](https://github.com/axios/axios/pull/321))

### 0.11.0 (Apr 26, 2016)

- Adding support for Stream with HTTP adapter ([#296](https://github.com/axios/axios/pull/296))
- Adding support for custom HTTP status code error ranges ([#308](https://github.com/axios/axios/pull/308))
- Fixing issue with ArrayBuffer ([#299](https://github.com/axios/axios/pull/299))

### 0.10.0 (Apr 20, 2016)

- Fixing issue with some requests sending `undefined` instead of `null` ([#250](https://github.com/axios/axios/pull/250))
- Fixing basic auth for HTTP adapter ([#252](https://github.com/axios/axios/pull/252))
- Fixing request timeout for XHR adapter ([#227](https://github.com/axios/axios/pull/227))
- Fixing IE8 support by using `onreadystatechange` instead of `onload` ([#249](https://github.com/axios/axios/pull/249))
- Fixing IE9 cross domain requests ([#251](https://github.com/axios/axios/pull/251))
- Adding `maxContentLength` option ([#275](https://github.com/axios/axios/pull/275))
- Fixing XHR support for WebWorker environment ([#279](https://github.com/axios/axios/pull/279))
- Adding request instance to response ([#200](https://github.com/axios/axios/pull/200))

### 0.9.1 (Jan 24, 2016)

- Improving handling of request timeout in node ([#124](https://github.com/axios/axios/issues/124))
- Fixing network errors not rejecting ([#205](https://github.com/axios/axios/pull/205))
- Fixing issue with IE rejecting on HTTP 204 ([#201](https://github.com/axios/axios/issues/201))
- Fixing host/port when following redirects ([#198](https://github.com/axios/axios/pull/198))

### 0.9.0 (Jan 18, 2016)

- Adding support for custom adapters
- Fixing Content-Type header being removed when data is false ([#195](https://github.com/axios/axios/pull/195))
- Improving XDomainRequest implementation ([#185](https://github.com/axios/axios/pull/185))
- Improving config merging and order of precedence ([#183](https://github.com/axios/axios/pull/183))
- Fixing XDomainRequest support for only <= IE9 ([#182](https://github.com/axios/axios/pull/182))

### 0.8.1 (Dec 14, 2015)

- Adding support for passing XSRF token for cross domain requests when using `withCredentials` ([#168](https://github.com/axios/axios/pull/168))
- Fixing error with format of basic auth header ([#178](https://github.com/axios/axios/pull/173))
- Fixing error with JSON payloads throwing `InvalidStateError` in some cases ([#174](https://github.com/axios/axios/pull/174))

### 0.8.0 (Dec 11, 2015)

- Adding support for creating instances of axios ([#123](https://github.com/axios/axios/pull/123))
- Fixing http adapter to use `Buffer` instead of `String` in case of `responseType === 'arraybuffer'` ([#128](https://github.com/axios/axios/pull/128))
- Adding support for using custom parameter serializer with `paramsSerializer` option ([#121](https://github.com/axios/axios/pull/121))
- Fixing issue in IE8 caused by `forEach` on `arguments` ([#127](https://github.com/axios/axios/pull/127))
- Adding support for following redirects in node ([#146](https://github.com/axios/axios/pull/146))
- Adding support for transparent decompression if `content-encoding` is set ([#149](https://github.com/axios/axios/pull/149))
- Adding support for transparent XDomainRequest to handle cross domain requests in IE9 ([#140](https://github.com/axios/axios/pull/140))
- Adding support for HTTP basic auth via Authorization header ([#167](https://github.com/axios/axios/pull/167))
- Adding support for baseURL option ([#160](https://github.com/axios/axios/pull/160))

### 0.7.0 (Sep 29, 2015)

- Fixing issue with minified bundle in IE8 ([#87](https://github.com/axios/axios/pull/87))
- Adding support for passing agent in node ([#102](https://github.com/axios/axios/pull/102))
- Adding support for returning result from `axios.spread` for chaining ([#106](https://github.com/axios/axios/pull/106))
- Fixing typescript definition ([#105](https://github.com/axios/axios/pull/105))
- Fixing default timeout config for node ([#112](https://github.com/axios/axios/pull/112))
- Adding support for use in web workers, and react-native ([#70](https://github.com/axios/axios/issue/70)), ([#98](https://github.com/axios/axios/pull/98))
- Adding support for fetch like API `axios(url[, config])` ([#116](https://github.com/axios/axios/issues/116))

### 0.6.0 (Sep 21, 2015)

- Removing deprecated success/error aliases
- Fixing issue with array params not being properly encoded ([#49](https://github.com/axios/axios/pull/49))
- Fixing issue with User-Agent getting overridden ([#69](https://github.com/axios/axios/issues/69))
- Adding support for timeout config ([#56](https://github.com/axios/axios/issues/56))
- Removing es6-promise dependency
- Fixing issue preventing `length` to be used as a parameter ([#91](https://github.com/axios/axios/pull/91))
- Fixing issue with IE8 ([#85](https://github.com/axios/axios/pull/85))
- Converting build to UMD

### 0.5.4 (Apr 08, 2015)

- Fixing issue with FormData not being sent ([#53](https://github.com/axios/axios/issues/53))

### 0.5.3 (Apr 07, 2015)

- Using JSON.parse unconditionally when transforming response string ([#55](https://github.com/axios/axios/issues/55))

### 0.5.2 (Mar 13, 2015)

- Adding support for `statusText` in response ([#46](https://github.com/axios/axios/issues/46))

### 0.5.1 (Mar 10, 2015)

- Fixing issue using strict mode ([#45](https://github.com/axios/axios/issues/45))
- Fixing issue with standalone build ([#47](https://github.com/axios/axios/issues/47))

### 0.5.0 (Jan 23, 2015)

- Adding support for intercepetors ([#14](https://github.com/axios/axios/issues/14))
- Updating es6-promise dependency

### 0.4.2 (Dec 10, 2014)

- Fixing issue with `Content-Type` when using `FormData` ([#22](https://github.com/axios/axios/issues/22))
- Adding support for TypeScript ([#25](https://github.com/axios/axios/issues/25))
- Fixing issue with standalone build ([#29](https://github.com/axios/axios/issues/29))
- Fixing issue with verbs needing to be capitalized in some browsers ([#30](https://github.com/axios/axios/issues/30))

### 0.4.1 (Oct 15, 2014)

- Adding error handling to request for node.js ([#18](https://github.com/axios/axios/issues/18))

### 0.4.0 (Oct 03, 2014)

- Adding support for `ArrayBuffer` and `ArrayBufferView` ([#10](https://github.com/axios/axios/issues/10))
- Adding support for utf-8 for node.js ([#13](https://github.com/axios/axios/issues/13))
- Adding support for SSL for node.js ([#12](https://github.com/axios/axios/issues/12))
- Fixing incorrect `Content-Type` header ([#9](https://github.com/axios/axios/issues/9))
- Adding standalone build without bundled es6-promise ([#11](https://github.com/axios/axios/issues/11))
- Deprecating `success`/`error` in favor of `then`/`catch`

### 0.3.1 (Sep 16, 2014)

- Fixing missing post body when using node.js ([#3](https://github.com/axios/axios/issues/3))

### 0.3.0 (Sep 16, 2014)

- Fixing `success` and `error` to properly receive response data as individual arguments ([#8](https://github.com/axios/axios/issues/8))
- Updating `then` and `catch` to receive response data as a single object ([#6](https://github.com/axios/axios/issues/6))
- Fixing issue with `all` not working ([#7](https://github.com/axios/axios/issues/7))

### 0.2.2 (Sep 14, 2014)

- Fixing bundling with browserify ([#4](https://github.com/axios/axios/issues/4))

### 0.2.1 (Sep 12, 2014)

- Fixing build problem causing ridiculous file sizes

### 0.2.0 (Sep 12, 2014)

- Adding support for `all` and `spread`
- Adding support for node.js ([#1](https://github.com/axios/axios/issues/1))

### 0.1.0 (Aug 29, 2014)

- Initial release
