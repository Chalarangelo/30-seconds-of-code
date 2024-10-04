---
title: Calculate the powerset of a JavaScript array
shortTitle: Powerset of array
language: javascript
tags: [math]
cover: new-plant
excerpt: Generate the powerset of a given array of numbers or other primitive values.
listed: true
dateModified: 2024-03-11
---

The powerset of a set is the **set of all its subsets**. For example, the powerset of `[1, 2]` is `[[], [1], [2], [1, 2]]`. In order to generate the powerset of a set, we can use a simple algorithm that iterates over the elements of the set and combines them into an array containing all **combinations**.

For that purpose, we can use `Array.prototype.reduce()`, starting with an empty array (`[[]]`) and then combining each element with the existing combinations using `Array.prototype.map()`. For each element, we **concatenate** it with each existing combination and add the result to the array.

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => r.concat(v))), [[]]);

powerset([1, 2]); // [[], [1], [2], [1, 2]]
```

> [!NOTE]
>
> For a powerset to make sense, **the input array should not contain any duplicate elements**. If it does, the resulting powerset will contain duplicate subsets.
