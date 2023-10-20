---
title: How can I split a JavaScript array into two groups?
shortTitle: Bifurcate array
type: question
language: javascript
tags: [array]
cover: canoe
excerpt: Learn how to split a JavaScript array into two groups based on a function or an array of values.
dateModified: 2023-10-09
---

Splitting a JavaScript array into two groups is relatively easy. Depending on your needs, you might know which group each value belongs to in advance or you might need to use a function to determine that.

Conceptually, both solutions are very similar. `Array.prototype.reduce()` is used with a callback function that will determine which group each element belongs to. A [truthy value](/js/s/truthy-falsy-values) will place the element in the first group, while a falsy value will place it in the second group.

### Bifurcate array based on value

If the values that go into each group are **known in advance**, you can use an **array of booleans** to determine which group each element belongs to.

```js
const bifurcate = (arr, filter) =>
  arr.reduce(
    (acc, val, i) => {
      acc[filter[i] ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

Note that the `filter` array must have the **same length** as the `arr` array. If it's shorter, the remaining elements will be placed in the second group. If it's longer, the extra elements will be ignored.

### Bifurcate array based on function

If the values that go into each group are **not known in advance**, you can use a **function** to determine which group each element belongs to. The function will take the current element and its index as arguments and should return a truthy value if the element belongs to the first group or a falsy value if it belongs to the second group.

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce(
    (acc, val, i) => {
      acc[fn(val, i) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

Note that the value returned by `fn` will be **coerced to a boolean**.
