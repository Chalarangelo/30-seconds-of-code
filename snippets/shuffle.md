### shuffle

Randomizes the order of the values of an array, returning a new array.

Uses the Fisher-Yates algorithm to reorder the elements of the array, based on the [Lodash implementation](https://github.com/lodash/lodash/blob/b2ea6b1cd251796dcb5f9700c4911a7b6223920b/shuffle.js), but as a pure function.

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
```

```js
const foo = [1, 2, 3];
shuffle(foo); // [2,3,1]
console.log(foo); // [1,2,3]
```
