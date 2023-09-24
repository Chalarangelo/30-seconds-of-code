---
title: Form to object
type: snippet
language: javascript
tags: [browser,object]
cover: sail-away-2
dateModified: 2020-10-19
---

Encodes a set of form elements as an `object`.

- Use the `FormData` constructor to convert the HTML `form` to `FormData` and `Array.from()` to convert to an array.
- Collect the object from the array using `Array.prototype.reduce()`.

```js
const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );
```

```js
formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }
```
