# caller-path [![Build Status](https://travis-ci.org/sindresorhus/caller-path.svg?branch=master)](https://travis-ci.org/sindresorhus/caller-path)

> Get the path of the caller function


## Install

```
$ npm install --save caller-path
```


## Usage

```js
// foo.js
const callerPath = require('caller-path');

module.exports = () => {
	console.log(callerPath());
	//=> '/Users/sindresorhus/dev/unicorn/bar.js'
}
```

```js
// bar.js
const foo = require('./foo');
foo();
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
