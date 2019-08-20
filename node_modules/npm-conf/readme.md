# npm-conf [![Build Status](https://travis-ci.org/kevva/npm-conf.svg?branch=master)](https://travis-ci.org/kevva/npm-conf)

> Get the npm config


## Install

```
$ npm install npm-conf
```


## Usage

```js
const npmConf = require('npm-conf');

const conf = npmConf();

conf.get('prefix')
//=> //=> /Users/unicorn/.npm-packages

conf.get('registry')
//=> https://registry.npmjs.org/
```

To get a list of all available `npm` config options:

```bash
$ npm config list --long
```


## API

### npmConf()

Returns the `npm` config.

### npmConf.defaults

Returns the default `npm` config.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
