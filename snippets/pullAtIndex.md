### pullAtIndex

Mutates the original array to filter out the values at the specified indexes.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values 

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr.map((v, i) => pullArr.includes(i) ? removed.push(v) : v)
                  .filter((v, i) => !pullArr.includes(i));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
};

// let myArray = ['a', 'b', 'c', 'd'];
// let pulled = pullAtIndex(myArray, [1, 3]);

// console.log(myArray); -> [ 'a', 'c' ]
// console.log(pulled); -> [ 'b', 'd' ]
```
