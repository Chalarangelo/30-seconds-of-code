### Array pull (mutates array)

Use `Array.filter()` to pull out the values that are not needed. 
Use `Array.length = 0` to mutate the passed in array by resetting it's length to zero.
Use `Array.push()` to re-populate the original array to equal the pulled values

```js
const pull = (arr, ...args) => {
  let pulled = arr.filter((v, i) => args.includes(v));
  arr.length = 0; pulled.forEach(v => arr.push(v));
};
// let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
// pull(myArray, 'a', 'c');
// console.log(myArray) -> [ 'b', 'b' ]
```
