# clipboardy [![Build Status: macOS & Linux](https://travis-ci.org/sindresorhus/clipboardy.svg?branch=master)](https://travis-ci.org/sindresorhus/clipboardy) [![Build status: Windows](https://ci.appveyor.com/api/projects/status/gflt3gjn1ia0a3vo/branch/master?svg=true)](https://ci.appveyor.com/project/sindresorhus/clipboardy/branch/master)

> Access the system clipboard (copy/paste)

Cross-platform. Supports: macOS, Windows, Linux, OpenBSD, FreeBSD, Android with [Termux](https://termux.com/).


## Install

```
$ npm install clipboardy
```


## Usage

```js
const clipboardy = require('clipboardy');

clipboardy.writeSync('🦄');

clipboardy.readSync();
//=> '🦄'
```


## API

### clipboardy

#### .write(input)

Write (copy) to the clipboard asynchronously. Returns a `Promise`.

##### input

Type: `string`

#### .read()

Read (paste) from the clipboard asynchronously. Returns a `Promise`.

#### .writeSync(input)

Write (copy) to the clipboard synchronously.

##### input

Type: `string`

#### .readSync()

Read (paste) from the clipboard synchronously.


## Related

- [clipboard-cli](https://github.com/sindresorhus/clipboard-cli) - CLI for this module
- [copy-text-to-clipboard](https://github.com/sindresorhus/copy-text-to-clipboard) - Copy text to the clipboard in the browser


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
