---
title: Convert between a query string and an object in JavaScript
shortTitle: Query string to object
language: javascript
tags: [object]
cover: standing-stones
excerpt: Convert between a query string and its object representation in JavaScript.
listed: true
dateModified: 2024-01-20
---

As most web developers know, URLs are used for much more than simple navigation between pages, often departing a lot of information in the form of **query strings**. Converting between a query string and its **object representation** is crucial for many web applications. Let's see how we can do that.

## Query string to object

A query string is, in essence, a **list of key-value pairs**. They are separated from the URL with the `?` character and from each other with the `&` character. Given a `URL` object, we can use `URL.prototype.search` or `URL.prototype.searchParams`. However, we might not always be able to use the `URL` object, so it's a safe bet to create a function that can work with **plain strings**.

Knowing the delimiter, we can use `String.prototype.split()` to get the appropriate part of the string. Then, using the `URLSearchParams()` constructor, we can create an object that we can convert to an array of key-value pairs using the spread operator (`...`). Finally, we can use `Object.fromEntries()` to convert the array of key-value pairs into an object.

```js
const queryStringToObject = url =>
  Object.fromEntries([...new URLSearchParams(url.split('?')[1])]);

queryStringToObject('https://google.com?page=1&count=10');
// {page: '1', count: '10'}
```

## Object to query string

The opposite operation is just as useful. Given an object, we can create a query string that can be appended to a URL. We can use `Object.entries()` to get an array of key-value pairs. Then, we can use `Array.prototype.reduce()` to create the query string from the key-value pairs. Each key-value pair is converted to a string and concatenated to the `queryString`. The delimiters used are `?` and `&`, depending on the **index of the key-value pair**.

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

objectToQueryString({ page: '1', size: '2kg', key: undefined });
// '?page=1&size=2kg'
```
