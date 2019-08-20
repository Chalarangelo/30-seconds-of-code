# babel-plugin-transform-es2015-modules-commonjs

> This plugin transforms ES2015 modules to [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1).
>
> #### Babel 6 Changes
> 
> Babel 6 changed some behavior by not doing `module.exports = exports['default']` anymore in the modules transforms.
> 
> There are some caveats, but you can use [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports), so that updating to Babel 6 isn't a breaking change since users that don't use ES modules don't have to do `require("your-module").default`.
> 
> However, it may not match how Node eventually implements ES modules natively given the [the current proposal](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#46-es-consuming-commonjs).

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = 42;
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-modules-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-commonjs"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

As per the spec, `import` and `export` are only allowed to be used at the top
level. When in loose mode these are allowed to be used anywhere.

And by default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In environments that don't support this you can enable loose mode on `babel-plugin-transform-es2015-modules-commonjs`
and instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = exports.foo = 5;
exports.__esModule = true;
```

### `strict`

`boolean`, defaults to `false`

By default, when using exports with babel a non-enumerable `__esModule` property
is exported. In some cases this property is used to determine if the import _is_ the
default export or if it _contains_ the default export.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In order to prevent the `__esModule` property from being exported, you can set
the `strict` option to `true`.

### `noInterop`

`boolean`, defaults to `false`

By default, when using exports with babel a non-enumerable `__esModule` property
is exported. This property is then used to determine if the import _is_ the default
export or if it _contains_ the default export.

```javascript
"use strict";

var _foo = require("foo");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
```

In cases where the auto-unwrapping of `default` is not needed, you can set the
`noInterop` option to `true` to avoid the usage of the `interopRequireDefault`
helper (shown in inline form above).
