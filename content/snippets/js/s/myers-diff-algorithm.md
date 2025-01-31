---
title: How can I calculate the diff between two strings in JavaScript?
shortTitle: Myers Diff Algorithm
language: javascript
tags: [string,array,algorithm]
cover: peaches
excerpt: Delve deep into the Myers diff algorithm and learn how to calculate the difference between two strings in JavaScript, the way Git does.
listed: true
dateModified: 2025-02-12
discussion: 2098
---

Have you ever wondered how Git's diff algorithm works? From what I've read, it's based on the **Myers diff algorithm**, which itself is based on solving the [longest common subsequence problem](/js/s/longest-common-subsequence), which I've covered in a previous article. So, let's take a look at how we can implement this algorithm in JavaScript!

> [!NOTE]
>
> I highly recommend you read the article on the [longest common subsequence](/js/s/longest-common-subsequence) before diving into this one, as it will **help you understand** the underlying concepts better.

## Problem statement

I find that examples always help clarify things, so let's start with one. Assuming two sequences, `a` and `b`, we want to find the **minimum number of edits** required to convert `a` into `b`. These edits can be either **insertions**, **deletions**, or **replacements**. For this example, we'll start with two strings, but we'll later build a more general solution that can handle any sequence.

```js
const a = 'kitten';
const b = 'sitting';
```

The expected output for this example should be something like this:

```js
const diff = [
  { value: 'k', operation: 'delete' },
  { value: 's', operation: 'insert' },
  { value: 'i', operation: 'equal'  },
  { value: 't', operation: 'equal'  },
  { value: 't', operation: 'equal'  },
  { value: 'e', operation: 'delete' },
  { value: 'i', operation: 'insert' },
  { value: 'n', operation: 'equal'  },
  { value: 'g', operation: 'insert' }
];
```

As you can see, we have a **list of objects**, each containing a `value` and an `operation`. The `value` is the character from the original sequence, and the `operation` is the **type of edit** required to convert the original sequence into the new one. If there is no edit required, the operation is `equal`. We also make sure that `delete` operations take **precedence** over `insert` operations. This makes the output more readable and easier to understand.

## Solution explanation

Same as the previous problem, we'll use <dfn title='A problem-solving method that breaks down a complex problem into smaller, manageable parts, solves each part, and then optimizes those solutions to find the best overall answer.'>**dynamic programming**</dfn>. The approach is very much similar to LCS, but with some tweaks. Instead of tiring you with all the details, I'll just explain the algorithm's steps, given two sequences, `a` and `b`, of lengths `m` and `n`:

1. Create a `(m + 1) x (n + 1)` matrix, `dp`. Each column represents a character of `a`, and each row represents a character of `b`.
2. Fill the first row with the numbers `0` to `n` and the first column with the numbers `0` to `m`, representing the number of deletions and insertions required to convert an empty string into the corresponding string.
3. Fill the matrix, starting from the second row and second column, using the following rules:
   - If `a[i - 1]` equals `b[j - 1]`, set `dp[i][j] = dp[i - 1][j - 1]` (no edit required).
   - Otherwise, set `dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1` (minimum of the three operations).
4. Backtrack through the matrix to find the differences between the two sequences:
   - If both `i > 0 ` and `j > 0` and `a[i - 1]` equals `b[j - 1]`, add an object with `value: a[i - 1]` and `operation: 'equal'` to the `diffs` array.
   - If `i > 0` and either `j === 0` or `dp[i][j] === dp[i - 1][j] + 1`, add an object with `value: a[i - 1]` and `operation: 'delete'` to the `diffs` array (deletion takes precedence over insertion).
   - Otherwise, add an object with `value: b[j - 1]` and `operation: 'insert'` to the `diffs` array.
5. Return the `diffs` array when both `i` and `j` are `0`.

> [!NOTE]
>
> There are various **optimizations** that can be made to this algorithm, but this article is meant primarily as a **learning resource**. Therefore, I'll keep things nice and simple and leave these optimizations out for now.

## Algorithm implementation

As you can probably tell, this is very similar to the LCS algorithm, but with a few tweaks to handle deletions and insertions. Let's implement this in JavaScript. We'll again make sure it can handle **both strings and arrays** as input.

```js
const myersDiff = (a, b) => {
  // Find the lengths of the two sequences
  const m = a.length, n = b.length;

  // Create a 2D array to store the differences
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  // Initialize the first row and column
  dp[0] = dp[0].map((_, j) => j);
  dp.forEach((row, i) => row[0] = i);

  // Fill in the rest of the 2D array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  // Reconstruct the differences
  let i = m, j = n, diffs = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      diffs.unshift({ value: a[i - 1], operation: 'equal' });
      i--;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j] === dp[i - 1][j] + 1)) {
      diffs.unshift({ value: a[i - 1], operation: 'delete' });
      i--;
    } else {
      diffs.unshift({ value: b[j - 1], operation: 'insert' });
      j--;
    }
  }

  return diffs;
}

myersDiff('kitten', 'sitting');
// [
//   { value: 'k', operation: 'delete' },
//   { value: 's', operation: 'insert' },
//   { value: 'i', operation: 'equal'  },
//   { value: 't', operation: 'equal'  },
//   { value: 't', operation: 'equal'  },
//   { value: 'e', operation: 'delete' },
//   { value: 'i', operation: 'insert' },
//   { value: 'n', operation: 'equal'  },
//   { value: 'g', operation: 'insert' }
// ]
```

## Visualizing the diff

This is nice and all, but how would one go about **visualizing it the way Git does**? It's simple, actually! All we need to do is iterate over the `diffs` array and print the values and a prefix based on the operation. While we're at it, we may as well add the **number of additions and deletions required** as an overview at the beginning of our output.

```js
const visualizeDiff = (diffs) => {
  const { insertions, deletions, output } = diffs.reduce(
    (acc, { value, operation }) => {
      if (operation === 'insert') {
        acc.insertions++;
        acc.output.push(`+${value}`);
      } else if (operation === 'delete') {
        acc.deletions++;
        acc.output.push(`-${value}`);
      } else {
        acc.output.push(` ${value} `);
      }
      return acc;
  }, { insertions: 0, deletions: 0, output: [] });

  const insertionsCount = insertions > 0 ? `${insertions} insertions(+), ` : '';
  const deletionsCount = deletions > 0 ? `${deletions} deletions(-)` : '';

  return `${insertionsCount}${deletionsCount}\n\n${output.join('\n')}`;
};
```

We'll explore a **more complex example** for this, using arrays of strings, instead of just strings, so that it looks a little more interesting.

```js
const fileA = [
  '20 bottles of beer on the wall',
  '20 bottles of beer',
  'Take one down, pass it around',
  '19 bottles of beer on the wall'
];

const fileB = [
  '19 bottles of beer on the wall',
  '19 bottles of beer',
  'Take one down, pass it around',
  '18 bottles of beer on the wall'
];

const diffs = myersDiff(fileA, fileB);
visualizeDiff(diffs);
// 3 insertions(+), 3 deletions(-)
//
// -20 bottles of beer on the wall
// +19 bottles of beer on the wall
// -20 bottles of beer
// +19 bottles of beer
//  Take one down, pass it around
// -19 bottles of beer on the wall
// +18 bottles of beer on the wall
```

Looks a lot like a Git diff, doesn't it? You can definitely make it even better by adding colors or skipping over long unchanged subsequences, but I'll leave that up to you.

## Conclusion

And there you have it! You can now find the differences between two sequences using the Myers diff algorithm and visualize them in a readable format. If you want to join the community discussion on this article, as well as the LCS one, use the link below to jump into the GitHub discussion!
