# babel-plugin-syntax-dynamic-import

Allow parsing of `import()`.

## Installation

```sh
$ npm install babel-plugin-syntax-dynamic-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-dynamic-import"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-dynamic-import"]
});
```
