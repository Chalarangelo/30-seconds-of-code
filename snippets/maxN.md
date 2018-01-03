### maxN

Returns the `n` maximum elements from the provided array. If `n` is greater than or equal to the provided array's length than return the original array(sorted in descending order).

Sort's the array's shallow copy in descending order and returns the first n elements

Skip the second argument to get a single element(in the form of a array)
``` js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
```

``` js
maxN([1,2,3]); // [3]
maxN([1,2,3],2); // [3,2]
maxN([1,2,3],4); // [3,2,1]
```
