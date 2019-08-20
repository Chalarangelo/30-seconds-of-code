<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

# webpack-log

A common logging module for the Webpack ecosystem. `webpack-log` leverages
[`loglevelnext`][loglevelnext].

## Getting Started

First thing's first, install the module:

```console
npm install webpack-log --save
```

_Note: We do not recommend installing this module globally._

## Requirements

`webpack-log` requires Node v6 or higher.

## Usage

```js
const weblog = require('webpack-log');
const log = weblog({ name: 'wds' }) // webpack-dev-server

log.info('Server Starting');
```

The code above will produce:

![output](output.png)

## Options

The default export (`function`) will return a logger, given an `options` Object.
The following is a property reference for the Object.

_Note: the logger returned is unique by default, due to the nature of the `webpack`
ecosystem. Please reference the [`unique`](#unique) option below for disabling
this feature and to force caching._

### level

Type: `String`  
Default: `'info'`

Specifies the level the logger should use. A logger will not produce output for
any log level _beneath_ the specified level. Available levels and order are:

```js
[
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'silent'
]
```

_Note: The level names shown above correspond to the available logging methods,
with the notable exception of the `silent` level._

### name

_Required_  
Type: `String`  
Default: `'<unknown>'`

Specifies the name of the log to create. This property is required, and used to
differentiate between loggers when `webpack-log` is used in multiple projects
executing in the same process space.

### timestamp

Type: `Boolean`  
Default: `false`

If `true`, instructs the logger to display a timestamp for log output, preceding
all other data.

### unique

Type: `Boolean`  
Default: `true`

If `false`, instructs the logger to used cached versions of a log with the same
name. Due to the nature of the `webpack` ecosystem and multiple plugin/loader
use in the same process space, loggers are created as unique instances by default.
By passing `false` for this property, the module is instructed to cache the
requested logger.

## Contributing

We welcome your contributions! Please have a read of [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how to get involved.

## License

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/webpack-log.svg
[npm-url]: https://npmjs.com/package/webpack-log

[node]: https://img.shields.io/node/v/webpack-log.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/webpack-log.svg
[deps-url]: https://david-dm.org/webpack-contrib/webpack-log

[tests]: http://img.shields.io/travis/webpack-contrib/webpack-log.svg
[tests-url]: https://travis-ci.org/webpack-contrib/webpack-log

[cover]: https://codecov.io/gh/webpack-contrib/webpack-log/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/webpack-log

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

[loglevelnext]: https://github.com/shellscape/loglevelnext
