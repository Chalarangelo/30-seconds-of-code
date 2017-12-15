### Array includes

Use `slice()` to offset the array/string and `indexOf()` to check if the value is included.
Omit the last argument, `fromIndex`, to check the whole array/string.

```js
const includes = (collection, val, fromIndex=0) => collection.slice(fromIndex).indexOf(val) != -1;
// includes("30-seconds-of-code", "code") -> true
// includes([1, 2, 3, 4], [1, 2], 1) -> false
```
