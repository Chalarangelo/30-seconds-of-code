# babel-plugin-minify-builtins

Minify Standard built-in Objects

## Example

**In**

```javascript
Math.floor(a) + Math.floor(b)
```

**Out**

```javascript
var _Mathfloor = Math.floor;

_Mathfloor(a) + _Mathfloor(b);
```

## Installation

```sh
npm install babel-plugin-minify-builtins
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-builtins"]
}
```

### Via CLI

```sh
babel --plugins minify-builtins script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-builtins"]
});
```

## Options

+ `tdz` - Account for TDZ (Temporal Dead Zone)
