---
title: objectToQueryString
tags: utility,object,function,intermediate
---

Returns a query string generated from the key-value pairs of the given object.

Use `Array.prototype.reduce()` on `Object.entries(queryParameters)` to create the query string.
Determine the `symbol` to be either `?` or `&` based on the `length` of `queryString` and concatenate `val` to `queryString` only if it's a string or an array.
The array type will use  `Array.prototype.map()` and  `Array.prototype.join()` to create the query string.
Return the `queryString` or an empty string when the `queryParameters` are falsy.

```js

const objectToQueryString = queryParameters => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => {
      const symbol = queryString.length === 0 ? '?' : '&';
      
      if (typeof val === 'string') queryString += `${symbol}${key}=${val}`;
      if (Array.isArray(val)) queryString += `${symbol}${val.map((v, i) => `${key}[${i}]=${v}`).join("&")}`;

      return queryString;
    }, '')
    : '';
};
```

```js
objectToQueryString({ page: '1', size: '2kg', key: undefined }); // '?page=1&size=2kg'
```
