### isArrayLike

Checks if the provided argument is array-like (i.e. is iterable).

Check that the object is not a function or `null` and that its `length` property is a non-negative integer below `Number.MAX_SAFE_INTEGER`.

```js
const isArrayLike = val =>
  val != null &&
  typeof val != 'function' &&
  val.length > -1 &&
  val.length % 1 == 0 &&
  val.length <= Number.MAX_SAFE_INTEGER;
```

```js
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false
```
