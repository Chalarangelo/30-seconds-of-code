### minN

Returns the `n` minimum elements from the provided array. If `n` is greater than or equal to the provided array's length than return the original array(sorted in ascending order).

Sort's the array's shallow copy in ascending order and returns the first n elements

Skip the second argument to get a single element(in the form of a array)
``` js
const minN = (arr,n = 1) => {
  let rra = [...arr].sort((a,b) => a-b)
  return rra.splice(0,n)
}
```
``` js
maxN([1,2,3]); // [1]
maxN([1,2,3],2); // [1,2]
maxN([1,2,3],4); // [1,2,3]
```
