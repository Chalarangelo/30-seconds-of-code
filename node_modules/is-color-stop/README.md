# is-color-stop

Check if a string is CSS color stop

[![NPM version](https://img.shields.io/npm/v/is-color-stop.svg?style=flat)](https://npmjs.org/package/is-color-stop)
[![Build Status](https://img.shields.io/travis/pigcan/is-color-stop.svg?style=flat)](https://travis-ci.org/pigcan/is-color-stop)
[![Coverage Status](https://img.shields.io/coveralls/pigcan/is-color-stop.svg?style=flat)](https://coveralls.io/r/pigcan/is-color-stop)
[![NPM downloads](http://img.shields.io/npm/dm/is-color-stop.svg?style=flat)](https://npmjs.org/package/is-color-stop)
[![Dependency Status](https://david-dm.org/pigcan/is-color-stop.svg)](https://david-dm.org/pigcan/is-color-stop)


## Install

```shell
$ npm install is-color-stop
```

## Usage

```js
const isColorStop = require('is-color-stop');

isColorStop('yellow') // true
isColorStop('yellow', '12px') // true
isColorStop('yellow', 'calc(100%)') // true
isColorStop('yellow', 'px') // false

isColorStop.isColor('red') // true
isColorStop.isColor('rgb(255)') // false

isColorStop.isRGB('rgb(255, 0, 0)') // true
isColorStop.isRGB('rgb(255)') // false

isColorStop.isRGBA('rgba(255, 0, 0, .8)') // true
isColorStop.isRGBA('rgba(255, 0, 0)') // false

isColorStop.isHSL('hsl(123, 45%, 67%)') // true
isColorStop.isHSL('hsl(123, 45%)') // false

isColorStop.isHSLA('hsla(123, 45%, 67%, 0.4)') // true
isColorStop.isHSLA('hsla(123, 45%, 67%)') // false

isColorStop.isHex('#fff') // true
isColorStop.isHex('#ff') // false

isColorStop.isCSSColorName('tomato') // true
isColorStop.isCSSColorName('hoge') // false

isColorStop.isCSSLengthUnit('px') // true
isColorStop.isCSSLengthUnit('x') // false

isColorStop.isTransparent('transparent') // true
```

## License

The MIT License (MIT)

Copyright (c) 2017 Pigcan
