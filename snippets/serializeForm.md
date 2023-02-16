---
title: Serialize form
tags: browser,string
cover: down-the-stream
firstSeen: 2019-03-13T14:29:45+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Encodes a set of form elements as a query string.

- Use the `FormData` constructor to convert the HTML `form` to `FormData`.
- Use `Array.from()` to convert to an array, passing a map function as the second argument.
- Use `Array.prototype.map()` and `encodeURIComponent()` to encode each field's value.
- Use `Array.prototype.join()` with appropriate arguments to produce an appropriate query string.

```js
const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&');
```

```js
serializeForm(document.querySelector('#form'));
// email=test%40email.com&name=Test%20Name
```
