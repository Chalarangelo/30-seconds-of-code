---
title: uniqueObjects
tags: array,object,beginner
---

Return unique objects in an array.

- Use `JSON.stringify` and `Array.prototype.map()` to convert all array objects to json strings.
- Use `new Set()` to discard duplicates, then use the spread operator 
(`...`) to convert the set back to an array.
- Use `Array.prototype.map()` with `JSON.parse` to convert all the unique strings back to objects.

```js
const uniqueObjects = arr => [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
```

```js
const arrayOfObjects = [{}, {}, {name: 'omri'}, {name: 'omri'}, 5, 5, 7];
uniqueObjects(arrayOfObjects); // [{}, { name: "omri" }, 5, 7]
```
