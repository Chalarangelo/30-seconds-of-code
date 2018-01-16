### isWeakSet

Checks if value is classified as a WeakSet object.

Use the `instanceof`operator to check if the provided value is a `WeakSet` object.

```js
const isWeakSet = val => val instanceof WeakSet;
```

```js
isWeakSet(new WeakSet()); // true
```
