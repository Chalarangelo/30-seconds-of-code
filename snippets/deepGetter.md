### deepGetter

Returns the target value in a nested JSON object, based on the keys array.

Contrust the keys you want in the nested JSON object as an `Array`.
Use `Array.prototype.reduce()` to get value from nested JSON object one by one. if the key exists in object, return target value, otherwise, return null.

```js
const deepGetter = (obj, keys) => keys.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj)
```

```js
let idx = 2; // or variable from other places
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ['a', 'b', 'c']
    }
  }
};
deepGetter(data, ['foo', 'foz', idx]); // get 3
deepGetter(data, ['foo', 'bar', 'baz', 8, 'foz']); // null
```
