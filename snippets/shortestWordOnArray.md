---
title: shortestWordOnArray
tags: array,intermediate,shortest,words
---

Get the smallest word from a given array. If there are more than one word with the same length return the first.

- Use `Array.prototype.map()` to get the length of the words in the array. Then use `Math.min()` to get the smallest and finally use `Array.prototype.indexOf()` to get the shortest word of the given array.

```js
const shortestWordOnArray = words => {
  let wordsLength = words.map(w => w.length);
  return words[wordsLength.indexOf(Math.min(...wordsLength))];
};
```

```js
shortestWordOnArray(['bruce', 'john', 'shannon']); // 'john'
```
