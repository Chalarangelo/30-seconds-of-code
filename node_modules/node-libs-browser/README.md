# node-libs-browser

The node core libs for in-browser usage.

NOTE: This library is deprecated and won't accept Pull Requests that include Breaking Changes or new Features. Only bugfixes are accepted.

[![dependencies status](http://david-dm.org/webpack/node-libs-browser.png)](http://david-dm.org/webpack/node-libs-browser)

Exports a hash [object] of absolute paths to each lib, keyed by lib names. Modules without browser replacements are `null`.

Some modules have mocks in the `mock` directory. These are replacements with minimal functionality.

| lib name | browser implementation | mock implementation |
|:--------:|:----------------------:|:-------------------:|
| assert | [defunctzombie/commonjs-assert](https://github.com/defunctzombie/commonjs-assert) | --- |
| buffer | [feross/buffer](https://github.com/feross/buffer) | [buffer.js](https://github.com/webpack/node-libs-browser/blob/master/mock/buffer.js) |
| child_process | --- | --- |
| cluster | --- | --- |
| console | [Raynos/console-browserify](https://github.com/Raynos/console-browserify) | [console.js](https://github.com/webpack/node-libs-browser/blob/master/mock/console.js) |
| constants | [juliangruber/constants-browserify](https://github.com/juliangruber/constants-browserify) | --- |
| crypto | [crypto-browserify/crypto-browserify](https://github.com/crypto-browserify/crypto-browserify) | --- |
| dgram | --- | --- |
| dns | --- | [dns.js](https://github.com/webpack/node-libs-browser/blob/master/mock/dns.js) |
| domain | [bevry/domain-browser](https://github.com/bevry/domain-browser) | --- |
| events | [Gozala/events](https://github.com/Gozala/events) | --- |
| fs | --- | --- |
| http | [jhiesey/stream-http](https://github.com/jhiesey/stream-http) | --- |
| https | [substack/https-browserify](https://github.com/substack/https-browserify) | --- |
| module | --- | --- |
| net | --- | [net.js](https://github.com/webpack/node-libs-browser/blob/master/mock/net.js) |
| os | [CoderPuppy/os-browserify](https://github.com/CoderPuppy/os-browserify) | --- |
| path | [substack/path-browserify](https://github.com/substack/path-browserify) | --- |
| process | [shtylman/node-process](https://github.com/shtylman/node-process) | [process.js](https://github.com/webpack/node-libs-browser/blob/master/mock/process.js) |
| punycode | [bestiejs/punycode.js](https://github.com/bestiejs/punycode.js) | --- |
| querystring | [mike-spainhower/querystring](https://github.com/mike-spainhower/querystring) | --- |
| readline | --- | --- |
| repl | --- | --- |
| stream | [substack/stream-browserify](https://github.com/substack/stream-browserify) | --- |
| string_decoder | [rvagg/string_decoder](https://github.com/rvagg/string_decoder) | --- |
| sys | [defunctzombie/node-util](https://github.com/defunctzombie/node-util) | --- |
| timers | [jryans/timers-browserify](https://github.com/jryans/timers-browserify) | --- | 
| tls | --- | [tls.js](https://github.com/webpack/node-libs-browser/blob/master/mock/tls.js) |
| tty | [substack/tty-browserify](https://github.com/substack/tty-browserify) | [tty.js](https://github.com/webpack/node-libs-browser/blob/master/mock/tty.js) |
| url | [defunctzombie/node-url](https://github.com/defunctzombie/node-url) | --- |
| util | [defunctzombie/node-util](https://github.com/defunctzombie/node-util) | --- |
| vm | [substack/vm-browserify](https://github.com/substack/vm-browserify) | --- |
| zlib | [devongovett/browserify-zlib](https://github.com/devongovett/browserify-zlib) | --- |

## Outdated versions 

### `buffer`

The current `buffer` implementation uses feross/buffer@4.x because feross/buffer@5.x relies on [typed arrays](https://github.com/feross/buffer/commit/5daca86b7cd5d2b8ccb167534d47421029f639e9#commitcomment-19698936).
This will be dropped as soon as IE9 is not a typical browser target anymore.

### `punycode`

The current `punycode` implementation uses bestiejs/punycode.js@1.x because bestiejs/punycode.js@2.x requires modern JS engines that understand `const` and `let`.
It will be removed someday since it has already been [deprecated from the node API](https://nodejs.org/api/punycode.html).

## License

MIT
