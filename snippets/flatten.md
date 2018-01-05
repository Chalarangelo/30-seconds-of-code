### flatten

Flattens an array.

Use a new array, `Array.concat()` and the spread operator (`...`) to cause a shallow denesting of any contained arrays.

```js
const flatten = arr => [].concat(...arr);
```

```js
flatten([1, [2], 3, 4]); // [1,2,3,4]
```
