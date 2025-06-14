---
title: Implementing a Sudoku validator in JavaScript
shortTitle: Sudoku Validator
language: javascript
tags: [algorithm,array]
cover: bhutan-building
excerpt: Sudoku is a logic-based combinatorial number-placement puzzle. This article discusses how to implement a Sudoku validator in JavaScript.
listed: true
dateModified: 2025-06-11
---

I was recently solving LeetCode problems and came across the [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/description/) problem. The task is simple: given a partially filled 9x9 Sudoku board, determine if it is valid according to the rules of Sudoku.

If you aren't familiar, the **rules** are as follows:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3x3 sub-boxes must contain the digits 1-9 without repetition.

Data is represented as a **2D array**, where empty cells are represented by `'.'` and the rest of the values are strings of digits from 1-9.

## Approach

There are various ways to go about this, but we'll be using a simple **brute-force approach**, as I think there's still a lot to learn from **tackling the sub-box problem**, as well as **optimizing the solution** for the given input constraints.

One of the first things that came to mind was to sum each row, column, and sub-box and compare the value to the **expected sum of 45**. However, this approach has a few drawbacks:

- You can still get a valid sum of 45 with **duplicates**.
- The expected sum of 45 is only valid for a **completely filled** board.
- The input uses **strings**, not numeric values, and conversion is expensive.

In this case, we can use a simpler approach, leveraging JavaScript's built-in functionality. `Array.prototype.filter()` can be used to filter out the empty cells, and `Set` can be used to check for duplicates. This is straightforward enough to implement for rows and columns, but the sub-boxes require a bit more work.

For **sub-boxes**, we want to figure out the correct cell positions for each one. If we **number them** from 0 to 8, starting at the top left and moving right, we can easily deduce the pattern for the cells of each sub-box:

- The **row** is determined by the **integer division** of the box number by 3.
- The **column** is determined by the **modulus** of the box number by 3.
- The starting row and column of each box can be calculated as follows:
  - `startRow = Math.floor(boxNumber / 3) * 3`
  - `startCol = (boxNumber % 3) * 3`

We can then use the spread operator (`...`) to create a new array with the values of the sub-boxes, and use the same filtering and `Set` logic to check for duplicates.

## Implementation

Given the previous explanation, the implementation is straightforward. We'll iterate through the rows, columns, and sub-boxes, filtering out empty cells and checking for duplicates using `Set`. If any of these checks fail, we return `false`. If all checks pass, we return `true`.

```js
const isValidSudoku = board => {
  // Rows check
  for (let i = 0; i < 9; i++) {
    const boardValues = board[i];
    const filled = boardValues.filter(v => v !== '.');
    if (filled.length !== new Set(filled).size) return false;
  }

  // Column check
  for (let i = 0; i < 9; i++) {
    const boardValues = board.map(x => x[i]);
    const filled = boardValues.filter(v => v !== '.');
    if (filled.length !== new Set(filled).size) return false;
  }

  // Sub-box check
  for (let i = 0; i < 9; i++) {
    const y = Math.floor(i / 3) * 3;
    const x = (i % 3) * 3;
    const boardValues = [
      ...board[y].slice(x, x + 3),
      ...board[y + 1].slice(x, x + 3),
      ...board[y + 2].slice(x, x + 3),
    ];
    const filled = boardValues.filter(v => v !== '.');
    if (filled.length !== new Set(filled).size) return false;
  }

  // If all checks pass, the board is valid
  return true;
};
```

## Optimization

The solution above works, but I wasn't satisfied with its **performance**. So, I decided to take a look to see if I could optimize it further.

### Remove intermediate arrays

One of the first things that stood out was the **creation of intermediate arrays**, especially `boardValues`. In the rows and sub-boxes check, it's entirely unnecessary. In the columns check, it can be replaced with `Array.prototype.reduce()` to **reduce iterations** to half.

```js {4} {10-13} {21-25}
const isValidSudoku = board => {
  // Rows check
  for (let i = 0; i < 9; i++) {
    const filled = board[i].filter(v => v !== '.');
    if (filled.length !== new Set(filled).size) return false;
  }

  // Column check
  for (let i = 0; i < 9; i++) {
    const filled = board.reduce((acc, x) => {
      if (x[i] !== '.') acc.push(x[i]);
      return acc;
    }, []);
    if (filled.length !== new Set(filled).size) return false;
  }

  // Sub-box check
  for (let i = 0; i < 9; i++) {
    const y = Math.floor(i / 3) * 3;
    const x = (i % 3) * 3;
    const filled = [
      ...board[y].slice(x, x + 3),
      ...board[y + 1].slice(x, x + 3),
      ...board[y + 2].slice(x, x + 3),
    ].filter(v => v !== '.');
    if (filled.length !== new Set(filled).size) return false;
  }

  // If all checks pass, the board is valid
  return true;
};
```

### Return early

Another clear optimization is to **return early when we find a duplicate**. Right now, we are processing the entire row, column, or sub-box, before we can check for duplicates. But, our `Set` can be used earlier to **check for duplicates as we iterate** through the values. We can use the humble `for` loop for this, as it allows us to break out of the loop when we find a duplicate. This way, we can stop processing as soon as we find a duplicate.

```js {4-11} {16-23} {30-40}
const isValidSudoku = board => {
  // Rows check
  for (let i = 0; i < 9; i++) {
    let uniqueFilled = new Set();
    for (let j = 0; j < 9; j++) {
      const cell = board[i][j];
      if (cell !== '.') {
        if (uniqueFilled.has(cell)) return false; // Duplicate found
        uniqueFilled.add(cell);
      }
    }
  }

  // Column check
  for (let i = 0; i < 9; i++) {
    let uniqueFilled = new Set();
    for (let j = 0; j < 9; j++) {
      const cell = board[j][i];
      if (cell !== '.') {
        if (uniqueFilled.has(cell)) return false; // Duplicate found
        uniqueFilled.add(cell);
      }
    }
  }

  // Sub-box check
  for (let i = 0; i < 9; i++) {
    const y = Math.floor(i / 3) * 3;
    const x = (i % 3) * 3;
    let uniqueFilled = new Set();

    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const cell = board[y + j][x + k];
        if (cell !== '.') {
          if (uniqueFilled.has(cell)) return false; // Duplicate found
          uniqueFilled.add(cell);
        }
      }
    }
  }

  // If all checks pass, the board is valid
  return true;
};
```

## Performance

Even with such a brute-force approach, the **performance difference** is quite substantial. Here are my results with each of the implementations:

| Implementation  | Runtime (ms) | Memory (MB) |
|-----------------|--------------|-------------|
| Original        | 13           | 60.08       |
| No intermediate | 6            | 59.94       |
| Early return    | 2            | 56.99       |

While the memory results aren't that impressive, the runtime is significantly reduced. In fact, this original solution beat around **15.28%** of submissions, whereas the optimized solution beat around **96.44%** of submissions. That is a huge difference!

> [!NOTE]
>
> I realize this sounds a lot like a flex, but it's really not. I'm mainly trying to support my argument with data. If you put me in a competitive coding environment, you'd easily see that I'm not that great. 😅

### Conclusion

Coding challenges have a lot to teach us, in terms of **approaching problems**, as well as **optimizing our solutions**. Even if you aren't familiar with advanced techniques and are only just starting out, you can still advance your way of thinking and your skills by tackling problems at your level. The more you practice, the better you'll get!

@[Further reading](/js/s/sudoku-solver-wave-function-collapse)
