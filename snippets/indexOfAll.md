### indexOfAll

Returns an array of indexes at which the `val` occurs in `arr`. If it occurs only once return the `index` and if it never occurs returns `-1`

``` js
const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((el, i) => el === val && indices.push(i))
  return indices.length ? indices : [-1];
};

```
``` js
indexOfAll([1,2,3],1); // [0]
indexOfAll([1,2,3,1,2,3],1); // [0,3]
indexOfAll([1,2,3],4); // [-1]
indexOfAll([[1,2,3]],[1,2,3]); // [-1] (Array.prototype.indexOf()) has the same behaviour
```
