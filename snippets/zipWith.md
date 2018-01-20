### zipWith

This method is like [zip](https://30secondsofcode.org/#zip) except that it accepts a function (`fn`) as the last value to specify how grouped values should be combined. 

The function is invoked with the elements of each group: `(...group)`.

``` js
const zipWith = (...arrays) => {
  const length = arrays.length;
  let fn = length > 1 ? arrays[length - 1] : undefined;
  fn = typeof fn == 'function' ? (arrays.pop(), fn) : undefined;
  const maxLength = Math.max(...arrays.map(x => x.length));
  const result =  Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  })
  return fn ? result.map(arr => fn(...arr)) : result;
}
```

``` js
zipWith([1, 2], [10, 20], [100, 200], (a,b,c) => a + b + c); // [111,222]
```
