---
Title: replaceAllStringOccurrences
tags: string,replace
---

Why does this do?

- This replaces all occurrences inside of a string.

```js
const replaceAll = function (string, characterCheck, toReplace) {
   return string.split(characterCheck).join(toReplace);
};
```

```js
replaceAll('duck duck go', " ", "-"); // 'duck-duck-go'
```
