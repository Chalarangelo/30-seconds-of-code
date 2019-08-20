# babel-plugin-transform-property-literals

This plugin allows Babel to transform valid identifier property key literals into identifiers.

## Example

**In**

```javascript
var foo = {
  // changed
  "bar": function () {},
  "1": function () {},

  // not changed
  "default": 1,
  [a]: 2,
  foo: 1
};
```

**Out**

```javascript
var foo = {
  bar: function () {},
  1: function () {},

  "default": 1,
  [a]: 2,
  foo: 1
};
```

## Installation

```sh
npm install babel-plugin-transform-property-literals --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-property-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-property-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-property-literals"]
});
```
