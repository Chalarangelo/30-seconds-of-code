### size

Get size of arrays, objects or strings.

Get type of `value` (`array`, `object` or `string`). 
Use `length` property for arrays. 
Use `length` or `size` value if available or number of keys for objects. 
Use `size` of a [`Blob` object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) created from `value` for strings.

Split strings into array of characters with `split('')` and return its length.

```js
const size = value =>
  Array.isArray(value)
    ? value.length
    : value && typeof value === 'object'
      ? value.size || value.length || Object.keys(value).length
      : typeof value === 'string' ? new Blob([value]).size : 0;
```

```js
size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3
```
