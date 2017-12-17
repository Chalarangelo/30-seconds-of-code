### Array union

Create a new array with unique values

```js
const union = function() {
  const arr = [...arguments];
  
  return arr.length ? arr
    .reduce((val, sum) => sum = [...val, ...sum])
    .filter((val, i, arr) => arr.indexOf(val) === i) : [];
}


console.log(union([], [1,2,3,4], [1000], [3,4,5])); // [1,2,3,4,1000,5]
console.log(union(10, 10, 100)); // [10, 100]
console.log(union()); // []
```
