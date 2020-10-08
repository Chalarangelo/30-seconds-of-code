---
title: removeDuplicateValues
tags: array,intermediate
---

Return new array which contain only unique value - in other words, it remove duplicated value.
Please note that it only work with array contain primitive value

- Use `Set` to remove duplicate value

```js
const removeDuplicateValues = listVal => {
  return [...new Set([...listVal])];
}
```

```js
const duplicateArray = [0, 1, 1, 4, 2, 4, 1];

removeDuplicateValues(duplicateArray);   // result: [0, 1, 4, 2]
```

- `Set` using === to compare element, so make sure all element in the same type before convert
```js
const rawArray = [0, '1', 1, `4`, 2, 4, 1];
removeDuplicateValues(rawArray);   // result: [0, "1", 1, "4", 2, "4"]

// convert type before call function
const convertArray = rawArray.map(element => parseInt(element));
removeDuplicateValues(convertArray);  // result: [0, 1, 4, 2]
```

- `Set` using === to compare, so it would not work with object or array

```js
const duplicateArray = [[], [], [1], 2, 2];
removeDuplicateValues(duplicateArray);   // result: [Array(0), Array(0), Array(1), 2]

const duplicateArrayObj = [{}, {}, { checked: false }, { checked: false }, false, false];
removeDuplicateValues(duplicateArrayObj); // result: [{}, {}, {checked: false}, {checked: false}, false]

// It all not work as expected
```