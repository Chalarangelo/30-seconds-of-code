---
title: CountWordsInAString
tags: string,beginner
---

The following snippet can be used to count number of words in a string

It Splits The Sentences At Spaces and converts them into Array.Then it returns length of the Array which is the number of words

Note: The Input Of Function Should be a String,You can use string formatting too

```js
const CountWordsInAString = (str) =>
  return 'The Sentence You Entered Has ' + ${str.split(" ").length} + ' Words';
```

```js
nWords=CountWordsInAString('Hello Word'); 
console.log(nwords)
```