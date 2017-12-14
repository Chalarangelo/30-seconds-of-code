### Tail of list

Return `arr.slice(1)` if the array's `length` is more than `1`, otherwise return the whole array.

```js
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]
```
