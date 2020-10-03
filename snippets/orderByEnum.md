---
title: orderByEnum
tags: array,intermediate
---

Returns a sorted array of objects ordered by a property, which has a known set of values (enum).
The desired order is defined by the given `order` array.

- Uses the `order` array's `indexOf` method to find the desired order for the respective value.
- Uses the difference of both indices to determine the order, as any negative or positive number suffices (not just `-1` or `1`). 
- Throws an error if the property has an unknown value.

```js
const orderByEnum = (arr, prop, order) =>
  [...arr].sort((a, b) => {
    const aOrderIndex = order.indexOf(a[prop]), bOrderIndex = order.indexOf(b[prop]);
    if (aOrderIndex === -1) {
      throw new Error(`Unexpected value ${a[prop]}`)
    }
    if (bOrderIndex === -1) {
      throw new Error(`Unexpected value ${b[prop]}`)
    }
    return aOrderIndex - bOrderIndex;
  });
```

```js
const users = [{ name: 'fred', language: 'Javascript' }, { name: 'barney', language: 'TypeScript' }, { name: 'frannie', language: 'Javascript' }, { name: 'anna', language: 'Java' }]
orderByEnum(users, 'language', ['Javascript', 'TypeScript', 'Java'])
// [{name: "fred", language: "Javascript"}, {name: "frannie", language: "Javascript"}, {name: "barney", language: "TypeScript"}, {name: "anna", language: "Java"}]
```
