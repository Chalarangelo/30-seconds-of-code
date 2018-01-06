### indexesOf

Returns an array of indexes at which the `val` occurs in `arr`. If it occurs only once return the `index` and if it never occurs returns `-1`

``` js
const indexesOf = (arr, val) => {
    let indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes.length === 0 ? -1 : indexes.length === 1 indexes.pop() : indexes
}
```
