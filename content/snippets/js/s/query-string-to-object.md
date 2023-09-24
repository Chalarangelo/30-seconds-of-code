---
title: Query string to object
type: snippet
language: javascript
tags: [object]
cover: dark-mode
dateModified: 2020-11-03
---

Generates an object from the given query string or URL.

- Use `String.prototype.split()` to get the params from the given `url`.
- Use the `URLSearchParams` constructor to create an appropriate object and convert it to an array of key-value pairs using the spread operator (`...`).
- Use `Array.prototype.reduce()` to convert the array of key-value pairs into an object.

```js
const queryStringToObject = url =>
  [...new URLSearchParams(url.split('?')[1])].reduce(
    (a, [k, v]) => ((a[k] = v), a),
    {}
  );
```

```js
queryStringToObject('https://google.com?page=1&count=10');
// {page: '1', count: '10'}
```
