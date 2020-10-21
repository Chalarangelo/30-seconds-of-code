---
title: wordcount
tags: regex,beginner
---

Gives the number of words in a string.

- .split() will convert the sting to an array by using the pattern.
- .filter() will remove empty strings.
- .length() will count the number of words in array.

```js
const wordcount = (str, pattern = /[^a-z]/gi) => str.split(pattern).filter(Boolean).length;
```

```js
wordcount('How many words are in this sentence??'); // 7
```
