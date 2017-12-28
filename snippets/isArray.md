### isArray

Checks if the given argument is an array.

Use `Array.isArray()` to check if a value is classified as an array.

```js
const isArray = val => !!val && Array.isArray(val);
```

```js
isArray(null); // false
isArray([1]); // true
```
