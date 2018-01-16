### isTypedArray

Checks if value is classified as a TypedArray object.

Use the `instanceof`operator to check if the provided value is a `TypedArray` object.

```js
const isTypedArray = val => val instanceof TypedArray;
```

```js
isTypedArray(new TypedArray()); // true
```
