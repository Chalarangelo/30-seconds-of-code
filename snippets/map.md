---
title: map
tags: array,map,intermediate
---

Checks the results of calling function on every element in the calling array.

- Use `Array.prototype.map()` to create a new array populated with the results of calling a function on every element.
-  map() does not execute the function for array elements without values.


```js
const people = [
{'name': 'safsha', 'age': 29},
{'name': 'Faizan', 'age': 49},
{'name': 'Mesh', 'age': 31},
{'name': 'Adeel', 'age': 19},
{'name': 'Ramsha', 'age': 20}
];
const agesOnly = people.map(members => members.age);
const ageAfter18= agesOnly.map(ageX => ageX - 18);
```

```js
console.log(agesOnly);
console.log(ageAfter18);
```
