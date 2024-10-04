---
title: Check if a JavaScript string is a valid JSON
shortTitle: Check if string is valid JSON
language: javascript
tags: [type]
cover: italian-horizon
excerpt: Use a simple JavaScript trick to validate a serialized JSON object.
listed: true
dateModified: 2024-03-17
---

When working with serialized data, you might come across some malformed or invalid JSON strings from time to time. While JavaScript doesn't have a built-in validation method for JSON, it has a handy `JSON.parse()` method that can be used to check if a string is a valid JSON.

Reading through the documentation, you'll find that `JSON.parse()` **throws** a `SyntaxError` if the string is **not a valid JSON**. We can use this to our advantage by wrapping the `JSON.parse()` method in a `try...catch` block to check if the string is valid.

```js
const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

isValidJSON('{"name":"Adam","age":20}'); // true
isValidJSON('{"name":"Adam",age:"20"}'); // false
isValidJSON(null); // true
```
