### isObject

Returns a boolean determining if the passed value is an object or not.

```js
const isObject = obj => obj === Object(obj);
```

```js
isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a:1 }); // true
isObject({}); // true
isObject(true); // false
```
