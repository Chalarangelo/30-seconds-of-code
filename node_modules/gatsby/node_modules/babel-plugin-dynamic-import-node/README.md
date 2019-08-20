# babel-plugin-dynamic-import-node

Babel plugin to transpile `import()` to a deferred `require()`, for node. Matches the [proposed spec](https://github.com/domenic/proposal-import-function).

**NOTE:** Babylon >= v6.12.0 is required to correct parse dynamic imports.

## Installation

```sh
$ npm install babel-plugin-dynamic-import-node --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["dynamic-import-node"]
}
```

### Via CLI

```sh
$ babel --plugins dynamic-import-node script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['dynamic-import-node']
});
```
