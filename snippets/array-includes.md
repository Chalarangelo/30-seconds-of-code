### Array includes

Use `slice()` to offset the array/string. `Array.indexOf()` returns `-1` if the sub-string/array dosen't contain the given `value`.

```js
const includes = (collection, val, fromIndex=0) => collection.slice(fromIndex).indexOf(val) != -1;

// includes("30-seconds-of-code", "code") -> true
// includes([1, 2, 3, 4], [1, 2], 1) -> false
```