### initializeArrayWithRange

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive.

Use `Array((end + 1) - start)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayWithRange = (end, start = 0) =>
  Array.from({ length: (end + 1) - start }).map((v, i) => i + start);
```

```js
initializeArrayWithRange(5) -> [0,1,2,3,4,5]
initializeArrayWithRange(7, 3) -> [3,4,5,6,7]
```
