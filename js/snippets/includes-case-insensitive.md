---
title: Case-insensitive substring search
type: snippet
tags: [string]
author: chalarangelo
cover: cup-of-orange
dateModified: 2022-07-28T05:00:00-04:00
---

Checks if a string contains a substring, case-insensitive.

- Use the `RegExp` constructor with the `'i'` flag to create a regular expression, that matches the given `searchString`, ignoring the case.
- Use `RegExp.prototype.test()` to check if the string contains the substring.

```js
const includesCaseInsensitive = (str, searchString) =>
  new RegExp(searchString, 'i').test(str);
```

```js
includesCaseInsensitive('Blue Whale', 'blue'); // true
```
