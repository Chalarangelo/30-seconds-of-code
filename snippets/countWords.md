---
title: countWords
tags: string,beginner
---

Counts the words in a String.

- Given a string, returns the number of words in the String using spaces to count a new word.

```js
const countWords = str => {
  return str.trim().split(" ").length;
};
```

```js
countWords('Peter Piper picked a peck of pickled peppers'); // '8'
```
