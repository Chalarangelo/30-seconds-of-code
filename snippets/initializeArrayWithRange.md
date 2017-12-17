### initializeArrayWithRange

Initialized an array containing the numbers in the specified range.

Use `Array(end-start)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayWithRange = (end, start = 0) =>
  Array.from({ length: end - start }).map((v, i) => i + start);
// initializeArrayWithRange(5) -> [0,1,2,3,4]
```
