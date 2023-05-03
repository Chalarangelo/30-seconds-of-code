---
title: String is valid JSON
type: snippet
tags: [type]
cover: italian-horizon
dateModified: 2020-10-18T13:49:49+03:00
---

Checks if the provided string is a valid JSON.

- Use `JSON.parse()` and a `try...catch` block to check if the provided string is a valid JSON.

```js
const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
```

```js
isValidJSON('{"name":"Adam","age":20}'); // true
isValidJSON('{"name":"Adam",age:"20"}'); // false
isValidJSON(null); // true
```
