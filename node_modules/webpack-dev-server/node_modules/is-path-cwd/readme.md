# is-path-cwd [![Build Status](https://travis-ci.org/sindresorhus/is-path-cwd.svg?branch=master)](https://travis-ci.org/sindresorhus/is-path-cwd)

> Check if a path is the [current working directory](https://en.wikipedia.org/wiki/Working_directory)


## Install

```
$ npm install is-path-cwd
```


## Usage

```js
const isPathCwd = require('is-path-cwd');

isPathCwd(process.cwd());
//=> true

isPathCwd('unicorn');
//=> false
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
