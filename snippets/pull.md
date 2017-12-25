### pull

Mutates the original array to filter out the values specified.

Use `Array.filter()` and `Array.includes()` to pull out the values that are not needed.
Use `Array.length = 0` to mutate the passed in an array by resetting it's length to zero and `Array.push()` to re-populate it with only the pulled values.

_(For a snippet that does not mutate the original array see [`without`](#without))_

```js
const pull = (arr, ...args) => {
  let argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v, i) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach(v => arr.push(v));
};
```

```js
let myArray1 = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray1, 'a', 'c');
console.log(myArray1) -> [ 'b', 'b' ]

let myArray2 = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(myArray2, ['a', 'c']);
console.log(myArray2) -> [ 'b', 'b' ]
```
