---
title: objectToQueryString
tags: object,advanced
firstSeen: 2019-10-11T23:16:05+03:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Generates a query string from the key-value pairs of the given object.

- Use `Array.prototype.reduce()` on `Object.entries(queryParameters)` to create the query string.
- Determine the `symbol` to be either `?` or `&` based on the length of `queryString`.
- Concatenate `val` to `queryString` only if it's a string.
- Return the `queryString` or an empty string when the `queryParameters` are falsy.

```js
const objectToQueryString = queryParameters => {
  return queryParameters
    ? Object.entries(queryParameters).reduce(
        (queryString, [key, val], index) => {
          const symbol = queryString.length === 0 ? '?' : '&';
          queryString +=
            typeof val === 'string' ? `${symbol}${key}=${val}` : '';
          return queryString;
        },
        ''
      )
    : '';
};
```

```js
objectToQueryString({ page: '1', size: '2kg', key: undefined });
// '?page=1&size=2kg'
```
