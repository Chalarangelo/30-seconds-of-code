# lcid [![Build Status](https://travis-ci.org/sindresorhus/lcid.svg?branch=master)](https://travis-ci.org/sindresorhus/lcid)

> Mapping between [standard locale identifiers](https://en.wikipedia.org/wiki/Locale_(computer_software)) and [Windows locale identifiers (LCID)](http://en.wikipedia.org/wiki/Locale#Specifics_for_Microsoft_platforms)

Based on the [mapping](https://github.com/python/cpython/blob/8f7bb100d0fa7fb2714f3953b5b627878277c7c6/Lib/locale.py#L1465-L1674) used in the Python standard library.

The mapping itself is just a [JSON file](lcid.json) and can be used wherever.


## Install

```
$ npm install lcid
```


## Usage

```js
const lcid = require('lcid');

lcid.from(1044);
//=> 'nb_NO'

lcid.to('nb_NO');
//=> 1044

lcid.all;
//=> {'af_ZA': 1078, ...}
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
