---
title: getWordCount
tags: array,string,begginer
---

Returns number of words in a string.

- Devides string where space is found and creates an array.
- Gets length of an array and returns it.

```js
const getWordName = (string) => {
  return string.split(' ').length
}
```

```js
getWordName('This is a sentence.'); // 4
```
