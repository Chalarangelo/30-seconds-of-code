---
title: Calculate all permutations of a JavaScript array or string
shortTitle: Array or string permutations
language: javascript
tags: [array,string,recursion]
cover: body-of-water
excerpt: Generate all permutations of an array's elements or a string's characters using recursion.
listed: true
dateModified: 2024-02-09
---

A problem I've struggled with in my earlier days as a developer was generating all permutations of an array's elements or a string's characters. This is a classic problem that can be solved using **recursion**, even if fairly inefficiently.

> [!WARNING]
>
> The following implementations are **mainly for demonstration purposes**. If you need to implement something similar in a production environment, you should consider using a more efficient algorithm. As **execution time increases exponentially** with each entry, anything more than **8 to 10 entries** may cause your environment to hang.

## Array permutations

Using recursion, we can generate all permutations of an array's elements, **including duplicates**. The **base cases** for the recursive function are when the array's length is equal to `2` or `1`. In this case, we return the array itself or an array with the elements swapped, respectively.

For all other cases, we use `Array.prototype.reduce()` to iterate over the array's elements, creating all the **partial permutations** for the rest of the elements. We then use `Array.prototype.map()` to combine the current element with each partial permutation, and `Array.prototype.reduce()` to combine all permutations in one array.

```js
const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val,
        ])
      ),
    []
  );
};

permutations([1, 33, 5]);
// [ [1, 33, 5], [1, 5, 33], [33, 1, 5], [33, 5, 1], [5, 1, 33], [5, 33, 1] ]
```

## String permutations

A similar technique can be used for a string. The base cases are identical and the algorithm is generally the same. The only significant difference is the use of `String.prototype.split()` to **convert the string into an array** of characters, and `String.prototype.join()` to **convert the array of characters back into a string**.

```js
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```
