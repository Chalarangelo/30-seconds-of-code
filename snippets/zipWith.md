### zipWith

Creates an array of elements, grouped based on the position in the original arrays and using function as the last value to specify how grouped values should be combined.

Check if the last argument provided in a function.
Use `Math.max()` to get the longest array in the arguments.
Creates an array with that length as return value and use `Array.from()` with a map-function to create an array of grouped elements.
If lengths of the argument-arrays vary, `undefined` is used where no value could be found.
The function is invoked with the elements of each group `(...group)`.

```js
const zipWith = (...arrays) => {
  const length = arrays.length;
  let fn = length > 1 ? arrays[length - 1] : undefined;
  fn = typeof fn == 'function' ? (arrays.pop(), fn) : undefined;
  const maxLength = Math.max(...arrays.map(x => x.length));
  const result = Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
  return fn ? result.map(arr => fn(...arr)) : result;
};
```

```js
zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c); // [111,222]
zipWith(
  [1, 2, 3],
  [10, 20],
  [100, 200],
  (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
); // [111, 222, '3bc']
```
