### initializeArrayWithRange

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive with there common difference `step`.

Use `Array(Math.ceil((end + 1) - start)/2)` to create an array of the desired length, `Array.map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.
You can omit `step` to use a default value of `1`.
 
```js
const initializeArrayWithRange = (end, start = 0,step = 1) =>
  Array(Math.ceil((end + 1 - start)/2)).fill(0).map((v, i) => (i * step) + start);
```

```js
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9,0,2); //[0,2,4,6,8]
```
