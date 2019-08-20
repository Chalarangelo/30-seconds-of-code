[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="http://json-schema.org">
    <img width="160" height="160"
      src="https://raw.githubusercontent.com/webpack-contrib/schema-utils/master/docs/logo.png">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Schema Utils</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i schema-utils
```

<h2 align="center">Usage</h2>

### `validateOptions`

**`schema.json`**
```js
{
  "type": "object",
  "properties": {
    // Options...
  },
  "additionalProperties": false
}
```

#### Error Messages (Custom)

**`schema.json`**
```js
{
  "type": "object",
  "properties": {
    "option": {
      "type": [ "boolean" ]
    }
  },
  // Overrides the default err.message for option
  "errorMessage": {
    "option": "should be {Boolean} (https:/github.com/org/repo#anchor)"
  }
  "additionalProperties": false
}
```

```js
import schema from 'path/to/schema.json'
import validateOptions from 'schema-utils'

validateOptions(schema, options, 'Loader/Plugin Name')
```

<h2 align="center">Examples</h2>

**schema.json**
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "test": {
      "anyOf": [
        { "type": "array" },
        { "type": "string" },
        { "instanceof": "RegExp" }
      ]
    },
    "transform": {
      "instanceof": "Function"
    },
    "sourceMap": {
      "type": "boolean"
    }
  },
  "additionalProperties": false
}
```

### `Loader`

```js
import { getOptions } from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from 'path/to/schema.json'

function loader (src, map) {
  const options = getOptions(this) || {}

  validateOptions(schema, options, 'Loader Name')

  // Code...
}
```

### `Plugin`

```js
import validateOptions from 'schema-utils'

import schema from 'path/to/schema.json'

class Plugin {
  constructor (options) {
    validateOptions(schema, options, 'Plugin Name')

    this.options = options
  }

  apply (compiler) {
    // Code...
  }
}
```


[npm]: https://img.shields.io/npm/v/schema-utils.svg
[npm-url]: https://npmjs.com/package/schema-utils

[node]: https://img.shields.io/node/v/schema-utils.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/schema-utils.svg
[deps-url]: https://david-dm.org/webpack-contrib/schema-utils

[test]: http://img.shields.io/travis/webpack-contrib/schema-utils.svg
[test-url]: https://travis-ci.org/webpack-contrib/schema-utils

[cover]: https://codecov.io/gh/webpack-contrib/schema-utils/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/schema-utils

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
