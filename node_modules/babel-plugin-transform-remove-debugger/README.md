# babel-plugin-transform-remove-debugger

This plugin removes all `debugger;` statements.

## Example

**In**

```javascript
debugger;
```

**Out**

```javascript
```

## Installation

```sh
npm install babel-plugin-transform-remove-debugger --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-remove-debugger"]
}
```

### Via CLI

```sh
babel --plugins transform-remove-debugger script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-remove-debugger"]
});
```
