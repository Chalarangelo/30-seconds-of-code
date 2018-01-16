### isWeakMap

Checks if value is classified as a WeakMap object.

Use the `instanceof`operator to check if the provided value is a `WeakMap` object.

```js
const isWeakMap = val => val instanceof WeakMap;
```

```js
isWeakMap(new WeakMap()); // true
```
