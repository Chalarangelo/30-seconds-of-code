# babel-plugin-minify-simplify

> Simplifies code for minification by reducing statements into expressions and making expressions uniform where possible.

## Example

### Reduce statement into expression

**In**

```js
function foo() {
  if (x) a();
}
function foo2() {
  if (x) a();
  else b();
}
```

**Out**

```js
function foo() {
  x && a();
}
function foo2() {
  x ? a() : b();
}
```

### Make expression as uniform as possible for better compressibility

**In**

```js
undefined
foo['bar']
Number(foo)
```

**Out**

```js
void 0
foo.bar
+foo
```


## Installation

```sh
npm install babel-plugin-minify-simplify
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-simplify"]
}
```

### Via CLI

```sh
babel --plugins minify-simplify script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-simplify"]
});
```
