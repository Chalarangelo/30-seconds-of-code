---
title: objectToQueryString
tags: utility,object,function,intermediate
---

Generates a query string from key values pairs from given object.

Attaches `?` in front of query string and ignores any non-string
values and their corresponding keys from given object. The function
returns empty string as a result if there is no single valid
key-value pair in given object, else returns generated query string.

```js
const objectToQueryString = (queryParameters) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => {
        const symbol = index === 0 ? '?' : '&';
        queryString += (typeof val === "string") ? `${symbol}${key}=${val}` : '';
        return queryString;
      }, '')
    : '';
};
```

```js
objectToQueryString({page: '1', size: "2kg", key: undefined}); // '?page=1&size=2kg'
```
