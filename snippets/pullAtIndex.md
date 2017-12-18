### pullAtIndex

This method is like pull except that it accepts an array of indexes to filter out before Mutating and pulling all the values from the original array. Which then returns an array of removed elements.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.
Use `Array.push()` to keep track of pulled values 

```js
const pullAtIndex = (arr, pullArr) => {
  let removed = [];
  let pulled = arr.map((v, i) => pullArr.includes(i) ? removed.push(v) : v)
                  .filter((v, i) => !pullArr.includes(i))
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
  return removed;
}

// let myArray = ['a', 'b', 'c', 'd'];
// let pulled = pullAtIndex(myArray, [1, 3]);

// console.log(myArray); -> [ 'a', 'c' ]
// console.log(pulled); -> [ 'b', 'd' ]
```