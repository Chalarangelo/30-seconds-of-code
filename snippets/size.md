### size

Get size of arrays, objects or strings.

Get type of value – array, object and string. Use `length` property for arrays. Return `length` or `size` value if available or number of object keys. Split strings into array of characters with `split('')` and return its length.

```js
const size = value =>
  Array.isArray(value)
    ? value.length
    : value && typeof value === 'object'
    ? value.size || value.length || Object.keys(value).length
    : typeof value === 'string'
    ? value.split('').length
    : 0;
```

```js
size([ 1, 2, 3, 4, 5 ]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3
```
