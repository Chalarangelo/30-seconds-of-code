# babel-plugin-minify-numeric-literals

Shortening of numeric literals via scientific notation

## Example

**In**

```javascript
[1000, -20000]
```

**Out**

```javascript
[1e3, -2e4]
```

## Installation

```sh
npm install babel-plugin-minify-numeric-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-numeric-literals"]
}
```

### Via CLI

```sh
babel --plugins minify-numeric-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-numeric-literals"]
});
```
