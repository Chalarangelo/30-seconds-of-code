---
title: addSuffix
tags: concat, string manipulation, suffix, intermediate 
---

Adds a custom suffix to the specified parameter

- Uses Function Factories concept in JavaScript to add suffix to any string.
- Create a binding for `addSuffix(x)` method, `x` is the suffix. 
- Invoke the binding using the required parameter to be suffixed.
- Get the suffix concatenated string as a result.

```js
const addSuffix = (x) => {
  const concat = (y) => {
      return y + x;
  }
  return concat;
}
```

```js
let suffix = addSuffix("30SecondsJS");
let output = suffix("This string needs to be suffixed! ");
console.log(output); // This string needs to be suffixed! 30SecondsJS
```