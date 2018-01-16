### isSet

Checks if value is classified as a Set object.

Use the `instanceof`operator to check if the provided value is a `Set` object.

```js
const isSet = val => val instanceof Set;
```

```js
isSet(new Set()); // true
```
