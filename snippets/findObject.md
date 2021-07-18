---
title: findObject
tags: array,beginner
firstSeen: 2021-07-18T07:01:33-04:00
---

Check if an array contains an object

- First, create a helper function that compares two objects by their properties.
- Second, use the array.some() method to find the searched object by property values.
- The isEqual() function returns true if the first and second objects have the same number of properties with the same values.
- The limitation of the isEqual() function is that the order of properties of the compared objects must be the same.


```js
const list = [{
    'name': 'John Doe',
    'email': 'john.doe@example.com'
}, {
    'name': 'Jane Doe',
    'email': 'jane.doe@example.com'
}];

const isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
}

const result = list.some(e => isEqual(e, {
    'name': 'John Doe',
    'email': 'john.doe@example.com'
}));
```

```js
console.log(result); // true
```