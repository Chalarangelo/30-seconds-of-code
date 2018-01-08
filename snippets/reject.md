### reject

Returns the elements of an array for which the passed function returns `false`.

Use `Array.filter()` and the not operator (`!`) to return the elements in the array for which `fn` returns `false`.

```js
const reject = (arr, fn) => arr.filter((e,i,arr) => !fn(e,i,arr));
```

```js
const users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
reject(users, o => !o.active); // [{ 'user': 'fred',   'age': 40, 'active': true }]
```
