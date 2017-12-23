### difference

Returns an array containing elements only in `a` but not in `b`. 

Use `Array.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => a.filter(x => !b.includes(x))
// difference([1,2,3], [1,2,4]) -> [3]
// difference([1,2,3], [49,2,13]) -> [1,3]
```
