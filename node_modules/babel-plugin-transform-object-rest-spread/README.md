# babel-plugin-transform-object-rest-spread

> This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.

## Example

### Rest Properties

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

### Spread Properties

```js
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-object-rest-spread"]
}
```

### Via CLI

```sh
babel --plugins transform-object-rest-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-rest-spread"]
});
```

## Options

### `useBuiltIns`

`boolean`, defaults to `false`.

By default, this plugin uses Babel's `extends` helper which polyfills `Object.assign`. Enabling this option will use `Object.assign` directly.

**.babelrc**

```json
{
  "plugins": [
    ["transform-object-rest-spread", { "useBuiltIns": true }]
  ]
}
```

**In**

```js
z = { x, ...y };
```

**Out**

```js
z = Object.assign({ x }, y);
```

## References

* [Proposal: Object Rest/Spread Properties for ECMAScript](https://github.com/sebmarkbage/ecmascript-rest-spread)
* [Spec](http://sebmarkbage.github.io/ecmascript-rest-spread)
