### isArrayBuffer

Checks if value is classified as a ArrayBuffer object.

Use the `instanceof`operator to check if the provided value is a `ArrayBuffer` object.

```js
const isArrayBuffer = val => val instanceof ArrayBuffer;
```

```js
isArrayBuffer(new ArrayBuffer()); // true
```
