---
title: Capitalize string
type: snippet
language: javascript
tags: [string]
cover: digital-nomad-3
dateModified: 2020-11-01
---

Capitalizes the first letter of a string.

- Use array destructuring and `String.prototype.toUpperCase()` to capitalize the first letter of the string.
- Use `Array.prototype.join()` to combine the capitalized `first` with the `...rest` of the characters.
- Omit the `lowerRest` argument to keep the rest of the string intact, or set it to `true` to convert to lowercase.

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
```

```js
capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```
