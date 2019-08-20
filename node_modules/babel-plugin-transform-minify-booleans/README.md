# babel-plugin-transform-minify-booleans

This plugin allows Babel to transform boolean literals into `!0` for `true` and `!1` for `false`.

## Example

**In**

```javascript
true;
false;
```

**Out**

```javascript
!0;
!1;
```

## Installation

```sh
npm install babel-plugin-transform-minify-booleans --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-minify-booleans"]
}
```

### Via CLI

```sh
babel --plugins transform-minify-booleans script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-minify-booleans"]
});
```
