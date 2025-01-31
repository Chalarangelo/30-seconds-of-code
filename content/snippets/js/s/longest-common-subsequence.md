---
title: How can I find the longest common subsequence of two strings in JavaScript?
shortTitle: Longest Common Subsequence
language: javascript
tags: [string,array,algorithm]
cover: carrots
excerpt: The longest common subsequence is the longest subsequence common to all given sequences and can be easily found using dynamic programming.
listed: true
dateModified: 2025-02-03
discussion: 2098
---

The **longest common subsequence** (LCS) is the longest subsequence common to all given sequences. It is not the same as the longest common substring, which must occupy consecutive positions within the original sequences. The LCS problem can be easily solved using <dfn title='A problem-solving method that breaks down a complex problem into smaller, manageable parts, solves each part, and then optimizes those solutions to find the best overall answer.'>**dynamic programming**</dfn>.

> [!NOTE]
>
> Solving this problem with dynamic programming is **not the most efficient way** to find the LCS. However, dynamic programming is the most straightforward way to understand the problem. If you're looking for a more efficient solution, you can search for it online.

## Problem statement

Before we jump into the code, let's look at an example to understand the problem better. Consider the following two strings:

```js
const string1 = 'AGGTAB';
const string2 = 'GXTXAYB';
```

The longest common subsequence of these two strings is `'GTAB'`, which has a length of 4. _But how did we arrive to this conclusion?_ What is trivial for human intuition may not be so for computer code. This is where dynamic programming comes into play.

Instead of trying to solve the problem directly, we can break it down into **smaller subproblems**. We can create a **2D table** to store the lengths of the longest common subsequences of the prefixes of the two strings. Then, using the values in this table, we can **build up the solution** to the original problem.

### Solution visualization

Here's a step-by-step guide to finding the LCS of these two strings using this approach. Use the buttons below the table to **replay each step** and move forward or backward.

<style>
  #replay > .table-wrapper:not(.selected) {
    display: none;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const [prevButton, nextButton] = [
      ...document.querySelectorAll('#replay button')
    ];
    const steps = [
      ...document.querySelectorAll('#replay > .table-wrapper')
    ];
    const stepCounter = document.querySelector('#replay p');
    const stepCount = steps.length;
    let selectedStep = 0;
    steps[0].classList.add('selected');

    const updateSelectedStep = newSelectedPage => {
      if (newSelectedPage < 0 || newSelectedPage >= stepCount) return;

      steps[selectedStep].classList.remove('selected');
      selectedStep = newSelectedPage;
      steps[selectedStep].classList.add('selected');
      prevButton.setAttribute('aria-disabled', selectedStep === 0);
      nextButton.setAttribute('aria-disabled', selectedStep === stepCount - 1);
      stepCounter.innerText = `Step ${selectedStep}`;
    }

    prevButton.addEventListener('click', () => {
      updateSelectedStep(selectedStep - 1);
    });
    nextButton.addEventListener('click', () => {
      updateSelectedStep(selectedStep + 1);
    });
  });
</script>

<figure id="replay">

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 |   |   |   |   |   |   |   |
| **G** | 0 |   |   |   |   |   |   |   |
| **G** | 0 |   |   |   |   |   |   |   |
| **T** | 0 |   |   |   |   |   |   |   |
| **A** | 0 |   |   |   |   |   |   |   |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 |   |   |   |   |   |   |   |
| **G** | 0 |   |   |   |   |   |   |   |
| **T** | 0 |   |   |   |   |   |   |   |
| **A** | 0 |   |   |   |   |   |   |   |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **G** | 0 |   |   |   |   |   |   |   |
| **T** | 0 |   |   |   |   |   |   |   |
| **A** | 0 |   |   |   |   |   |   |   |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **T** | 0 |   |   |   |   |   |   |   |
| **A** | 0 |   |   |   |   |   |   |   |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **T** | 0 | 1 | 1 | 2 | 2 | 2 | 2 | 2 |
| **A** | 0 |   |   |   |   |   |   |   |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **T** | 0 | 1 | 1 | 2 | 2 | 2 | 2 | 2 |
| **A** | 0 | 1 | 1 | 2 | 2 | 3 | 3 | 3 |
| **B** | 0 |   |   |   |   |   |   |   |

|       | ε | G | X | T | X | A | Y | B |
| ----- | - | - | - | - | - | - | - | - |
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **G** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **T** | 0 | 1 | 1 | 2 | 2 | 2 | 2 | 2 |
| **A** | 0 | 1 | 1 | 2 | 2 | 3 | 3 | 3 |
| **B** | 0 | 1 | 1 | 2 | 2 | 3 | 3 | 4 |

<figcaption aria-label="Replay steps">
  <button aria-disabled="true">Previous</button>
  <button>Next</button>
  <p>Step 0</p>
</figcaption>

</figure>

## Solution explanation

Cool visualization, huh? _But how does it work?_ I'll first present the short version of these steps, and then we'll dive into the details. Feel free to skip either one of the two, as long as you understand the concept.

### Short explanation

Here are the algorithm's steps, given two sequences, `a` and `b`, of lengths `m` and `n`:

1. Create a `(m + 1) x (n + 1)` matrix, `dp`. Each column represents a character of `a`, and each row represents a character of `b`.
2. Fill the first row and column with zeros (`0`), representing the number of matching characters between an empty string and the corresponding prefix.
3. Fill the matrix, row by row. For each cell `(i, j)`:
   - If `a[i - 1]` equals `b[j - 1]`, set `dp[i][j] = dp[i - 1][j - 1] + 1` (increment the length of the LCS).
   - Otherwise, set `dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])` (take the maximum of the lengths of the LCS of the prefixes without the current characters).
4. Backtrack from the bottom right corner of the matrix to reconstruct the LCS:
   - If `a[i - 1]` equals `b[j - 1]`, add `a[i - 1]` to the LCS and move diagonally upwards (to the cell `(i - 1, j - 1)`).
   - Otherwise, move to the adjacent cell with the greater value.
5. Combine the characters of the LCS in reverse order to get the final result.

### Long explanation

Like I said earlier, in order to solve the problem, we'll break it into smaller subproblems. The table in the visualization shows the **lengths of the longest common subsequences of the prefixes** of the two strings. The **rows** represent the characters of the first string, and the **columns** represent the characters of the second string. The **cell** at row `i` and column `j` contains the length of the longest common subsequence of the prefixes `string1.slice(0, i)` and `string2.slice(0, j)`. The **empty string** `ε` represents the empty prefix (i.e., the length of the LCS of an empty string and any other string is `0`).

The table is filled in a **bottom-up manner**. We start with the empty string and build up the solution by considering the characters of the two strings one by one. If the characters **match**, we increment the length of the longest common subsequence by 1. If they **don't match**, we take the maximum of the lengths of the longest common subsequences of the prefixes without the current characters.

_How do we get the LCS from this table?_ We **start at the bottom right corner** of the table and move **diagonally upwards**. If the characters at the current position **match**, we add the character to the LCS and move diagonally upwards. If they **don't match**, we move to the cell with the greater value. Doing so, we arrive at the LCS `'GTAB'`.

## Algorithm implementation

Now that you better understand the problem and how to solve it, let's implement the algorithm in JavaScript. And, to spice things up a little, we'll make sure it can handle **both strings and arrays**.

```js
const longestCommonSubsequence = (a, b) => {
  // Find the lengths of the two sequences
  const m = a.length, n = b.length;

  // Create a 2D array to store lengths
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  // Fill the 2D array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the LCS
  let i = m, j = n, lcs = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  if (typeof a === 'string' && typeof b === 'string')
    return lcs.join('');

  return lcs;
}

longestCommonSubsequence(
  'AGGTAB',
  'GXTXAYB'
); // 'GTAB'

longestCommonSubsequence(
  ['A','B','C','B','A'],
  ['C', 'B', 'A', 'B', 'A', 'C']
); // ['C', 'B', 'A']
```

Our function takes two sequences, `a` and `b`, as arguments. It creates a 2D array `dp` to store the lengths of the longest common subsequences of the prefixes of the two sequences. It then fills the array using the algorithm we discussed earlier. Finally, it reconstructs the LCS by moving diagonally upwards in the table. The function returns the LCS as a string if both `a` and `b` are strings, or as an array otherwise.

> [!TIP]
>
> If this feels eerily similar to the [Levenshtein distance algorithm](/js/s/levenshtein-distance), it's because it is! Both algorithms use **dynamic programming** to solve relatively similar problems.

## Conclusion

That's all there is to it! You now know how to find the longest common subsequence of two strings or arrays using dynamic programming in JavaScript. If you have any questions or need further clarification, feel free to join the GitHub discussion, using the link below! I'd love to hear your feedback on the visualization as well, as I'm interested in creating more of these for future articles.
