### Head of list

Use `arr[0]` to return the first element of the passed array.

```js
const head = arr => isArray(arr) && arr.length > 0 ? arr[0] : null;
// head([1,2,3]) -> 1
```
