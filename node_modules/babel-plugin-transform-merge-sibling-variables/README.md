# babel-plugin-transform-merge-sibling-variables

Merge sibling variables into one.

## Example

**In**

```javascript
// merge into a single VariableDeclaration
var foo = "bar";
var bar = "foo";
foobar();

// merge into the next for loop
var i = 0;
for (var x = 0; x < 10; x++) {}
```

**Out**

```javascript
var foo = "bar",
    bar = "foo";
foobar();

for (var i = 0, x = 0; x < 10; x++) {}
```

## Installation

```sh
npm install babel-plugin-transform-merge-sibling-variables --save-dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-merge-sibling-variables"]
}
```

### Via CLI

```sh
babel --plugins transform-merge-sibling-variables script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-merge-sibling-variables"]
});
```
