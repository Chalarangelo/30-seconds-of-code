---
title: insertAtIf
tags: array,intermediate
---

Inserts into array at specified point if condition is true.

- Checks condition
- Inserts at specified point
- Utilizes splice

```js
const insertAtIf = (array, condition, index, item) =>
  {
      if (!condition) return;
      array.splice(index, 0, item);
      return array;
  }
```

```js
insertAtIf(
    [
        { produce: 'apple', count: 2 },
        { produce: 'brocoli', count: 4 },
        { produce: 'peach', count: 1 },
    ],
    true,
    1,
    { produce: 'carrot', count: 7 }
); 
// [
//     { produce: 'apple', count: 2 },
//     { produce: 'carrot', count: 7 },
//     { produce: 'brocoli', count: 4 },
//     { produce: 'peach', count: 1 },
// ]
```
