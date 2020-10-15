---
title: SearchingInArray
tags: array,beginner
---

Searching array content based on search criteria.

- Use `Array.prototype.filter()` to filter array content based on search criteria.

```js
const filterItems = (arr, query) => {
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}
```

```js
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

filterItems(fruits, 'ap'); // [ 'apple', 'grapes' ]
filterItems(fruits, 'an'); // [ 'banana', 'mango', 'orange' ]
```
