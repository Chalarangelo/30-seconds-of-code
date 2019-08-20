# babel-plugin-transform-member-expression-literals

Turn valid member expression property literals into plain identifiers

## Example

**In**

```javascript
obj["foo"] = "isValid";

obj.const = "isKeyword";
obj["var"] = "isKeyword";
```

**Out**

```javascript
obj.foo = "isValid";

obj["const"] = "isKeyword";
obj["var"] = "isKeyword";
```

## Installation

```sh
npm install babel-plugin-transform-member-expression-literals --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-member-expression-literals"]
}
```

### Via CLI

```sh
babel --plugins transform-member-expression-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-member-expression-literals"]
});
```
