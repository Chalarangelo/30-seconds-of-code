---
title: countWords
tags: string,beginner
---

Return number of words in given string

- Use `Set` to pick unique values from array

```js
function countWords(input) {
  const words = input.toLocaleLowerCase().split(" ").map(word => {
    return word.replace(/^([`'"!.,;])/g, "").replace(/([`'"!.,;])$/g, "");
  });

  return new Set(words).size;
}
```

```js
countWords('"JavaScript" is great. "TypeScript" is also great.'); // 5
```
