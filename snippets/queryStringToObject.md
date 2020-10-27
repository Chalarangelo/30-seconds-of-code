---
title: queryStringToObject
tags: object,intermediate
---

Generates an object from the given query string or URL.

- Use `String.prototype.split()` to get the params from the given `url`.
- Use `new URLSearchParams()` to create an appropriate object and convert it to an array of key-value pairs using the spread operator (`...`).
- Use `Array.prototype.reduce()` to convert the array of key-value pairs into an object.

```js
const queryStringToObject = url =>
  [...new URLSearchParams(url.split('?')[1])].reduce(
    (a, [k, v]) => ((a[k] = v), a),
    {}
  );
```

```js
queryStringToObject('https://google.com?page=1&count=10'); // {page: '1', count: '10'}
```
