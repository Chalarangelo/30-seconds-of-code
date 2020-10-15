---
title: getDataType
tags: datatype, beginner
---

Returns a value of datatype.

- Use typeof to detect datatype from a variable.

```js
const getDataType = value => (typeof value);
```

```js
getDataType(getDataType); // "function"
getDataType(Symbol("test")); // "symbol"
getDataType("42"); // "string"
getDataType(42); // "number"
getDataType([]); // "object"
getDataType(true); // "boolean"
getDataType(); // "undefined"
getDataType(BigInt(20000000000000000000000)); // "bigint"
```
