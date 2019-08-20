# is-wsl [![Build Status](https://travis-ci.org/sindresorhus/is-wsl.svg?branch=master)](https://travis-ci.org/sindresorhus/is-wsl)

> Check if the process is running inside [Windows Subsystem for Linux](https://msdn.microsoft.com/commandline/wsl/about) (Bash on Windows)

Can be useful if you need to work around unimplemented or buggy features in WSL.


## Install

```
$ npm install --save is-wsl
```


## Usage

```js
const isWsl = require('is-wsl');

// When running inside Windows Subsystem for Linux
console.log(isWsl);
//=> true
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
