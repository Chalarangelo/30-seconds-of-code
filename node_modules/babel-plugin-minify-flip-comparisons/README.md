# babel-plugin-minify-flip-comparisons

**Note:** while this plugin doesn’t shorten the output in any way, it does optimize it for repetition-based compression algorithms such as gzip.

## Example

**In**

```javascript
const foo = a === 1;
if (bar !== null) {
  var baz = 0;
}
```

**Out**

```javascript
const foo = 1 === a;
if (null !== bar) {
  var baz = 0;
}
```

## Installation

```sh
npm install babel-plugin-minify-flip-comparisons
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-flip-comparisons"]
}
```

### Via CLI

```sh
babel --plugins minify-flip-comparisons script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-flip-comparisons"]
});
```
