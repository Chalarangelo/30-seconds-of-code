# babel-plugin-minify-infinity

## Example

**In**

```javascript
Infinity;
```

**Out**

```javascript
1 / 0;
```

## Installation

```sh
npm install babel-plugin-minify-infinity
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-infinity"]
}
```

### Via CLI

```sh
babel --plugins minify-infinity script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-infinity"]
});
```
