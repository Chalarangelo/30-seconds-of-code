# babel-plugin-transform-undefined-to-void

Some JavaScript implementations allow undefined to be overwritten, this may lead to peculiar bugs that are extremely hard to track down.

This plugin transforms `undefined` into `void 0` which returns undefined regardless of if it's been reassigned.

## Example

**In**

```javascript
foo === undefined;
```

**Out**

```javascript
foo === void 0;
```

## Installation

```sh
npm install babel-plugin-transform-undefined-to-void --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-undefined-to-void"]
}
```

### Via CLI

```sh
babel --plugins transform-undefined-to-void script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-undefined-to-void"]
});
```
