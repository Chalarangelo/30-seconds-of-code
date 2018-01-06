### indexOfAll

Returns an array of indexes at which the `val` occurs in `arr`. If it occurs only once return the `index` and if it never occurs returns `-1`

``` js
const indexOfAll = (arr, val) => {
    let indexes = [], i;
    arr.forEach((el,i) => {if(el === val) indexes.push(i)})
    return indexes.length === 0 ? [-1] : indexes
}
```
``` js
indexOfAll([1,2,3],1); // [0]
indexOfAll([1,2,3,1,2,3],1); // [0,3]
indexOfAll([1,2,3],4); // [-1]
indexOfAll([[1,2,3]],[1,2,3]); // [-1] (Array.prototype.indexOf()) has the same behaviour
```
