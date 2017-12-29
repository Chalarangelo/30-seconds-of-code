### max

Returns the maximum value out of two or more numbers/arrays.

Use `Math.max()` combined with the spread operator (`...`) to get the maximum value in the array.

```js










































const max = (...arr) => Math.max(...[].concat(...arr);
```

```js
max([10, 1, 5]); // 10
```
