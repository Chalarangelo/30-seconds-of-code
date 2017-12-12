### Initialize array with range

Use `Array(end-start)` to create an array of the desired length, `map()` to fill with the desired values in a range.
You can omit `start` to use a default value of `0`.

```js
const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end-start)).map( (v,i) => i + start );
// initializeArrayRange(5) -> [0,1,2,3,4]
```
