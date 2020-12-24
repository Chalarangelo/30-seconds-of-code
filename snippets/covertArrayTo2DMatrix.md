---
title: covertArrayTo2DMatrix
tags: array,intermediate
---

Returns array of arrays, with internal arrays of size (columns) supplied.

```js
const covertArrayTo2DMatrix = (items, columns) => {
  let data = []
  if (items?.length && columns) {
    const rows = columns ? Math.ceil((items?.length ?? 0) / columns) : 0
    for (let i = 0; i < rows; i++) {
      let row = []
      for (let j = 0; j < columns; j++) {
        const element = items[i + j + i * (columns - 1)]
        if (element) {
          row.push(element)
        }
      }

      data.push(row)
    }
  }
  return data
}
```

```js
covertArrayTo2DMatrix([1, 2, 3, 4, 5, 6], 3); // [[1, 2, 3], [4, 5, 6]]
covertArrayTo2DMatrix([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
covertArrayTo2DMatrix([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]
```
