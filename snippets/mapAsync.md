### mapAsync

Maps the values of an array using an async function.
Returns a promise that resolves with an array of the mapped values

Use `Promise.all()` to wait till all promises have completed
Use `Array.map` to map the array

```js
const mapAsync = (arr, fn) => 
  Promise.all(arr.map(fn));
```

```js
const asyncFn = (val) => new Promise(resolve => setTimeout(() => resolve(val ** 2), 20));
await mapAsync([12, 5, 8, 3], asyncFn); // [144, 25, 64, 9]
```
