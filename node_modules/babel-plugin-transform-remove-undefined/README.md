# babel-plugin-transform-remove-undefined

For variable assignments, this removes rvals that evaluate to `undefined`
(`var`s in functions only).
For functions, this removes return arguments that evaluate to `undefined`.

## Example

**In**

```javascript
let a = void 0;
function foo() {
  var b = undefined;
  return undefined;
}
```

**Out**

```javascript
let a;
function foo() {
  var b;
  return;
}
```

## Installation

```sh
npm install babel-plugin-transform-remove-undefined
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-transform-remove-undefined"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-remove-undefined script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-transform-remove-undefined"]
});
```

## Options

+ `tdz` - Detect usages before declaration/initialization in let/const(throws) and var(void 0)
