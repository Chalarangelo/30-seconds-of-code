---
title: removeDuplicatesFromArray
tags: array,set,intermediate
---

Remove duplicated values from an Array.

- Use the `Set` Object.
- Create a `Set` with the `Array` and convert it back to `Array`.

```js
const removeDuplicatesFromArray = (array) => [...new Set(array)];
```

```js
const numbers = [1, 1, 2, 4, 4, 5];
removeDuplicatesFromArray(numbers); // '[1, 2, 4, 5]'

const names = ['John', 'Mary', 'John', 'Bob', 'Mary'];
removeDuplicatesFromArray(names); // '["John", "Mary", "Bob"]'

const mixed = ['John', 23, true, 'Bob', 23, 'John', 'Mary', true];
removeDuplicatesFromArray(mixed); // '["John", 23, true, "Bob", "Mary"]'
```
