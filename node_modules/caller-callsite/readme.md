# caller-callsite [![Build Status](https://travis-ci.org/sindresorhus/caller-callsite.svg?branch=master)](https://travis-ci.org/sindresorhus/caller-callsite)

> Get the [callsite](https://github.com/sindresorhus/callsites#api) of the caller function


## Install

```
$ npm install --save caller-callsite
```


## Usage

```js
// foo.js
const callerCallsite = require('caller-callsite');

module.exports = () => {
	console.log(callerCallsite().getFileName());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
}
```

```js
// bar.js
const foo = require('./foo');
foo();
```


## API

### callerCallsite()

Returns a [`callsite`](https://github.com/sindresorhus/callsites#api) object.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
