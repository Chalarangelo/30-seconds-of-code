# is-docker [![Build Status](https://travis-ci.org/sindresorhus/is-docker.svg?branch=master)](https://travis-ci.org/sindresorhus/is-docker)

> Check if the process is running inside a Docker container


## Install

```
$ npm install --save is-docker
```


## Usage

```js
const isDocker = require('is-docker');

if (isDocker()) {
	console.log('Running inside a Docker container');
}
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
