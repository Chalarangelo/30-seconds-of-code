---
title: length of Last Word
tags: string,intermediate
---

returns the length of the last word in the string
- Use `String.prototype.trim()`, method to remove whitespaces from both ends of a `string`.
```js
const lengthOfLastWord = (x) => {
  let newInput = x.trim();
}
```
- Use `String.prototype.split()`, method to divide the string into an ordered list of `substrings`.
```js
const lengthOfLastWord = (x) => {
  let newInput = x.trim();
  let sArr = newInput.split("");
}
```

we start looping from the end, since it’s the last word we care about. We do that by initializing our iterator variable i to whatever the length of the array is, -1. We then count backwards from there, by decrementing i.
```js
const lengthOfLastWord = (x) => {
  let newInput = x.trim();
  let sArr = newInput.split("");
  let counter = 0;
  
  for (let i = newInput.length - 1; i > 0; i--) {
      if (newInput[i] != " ") {
        counter++;
      } else {
        return counter;
      }
    }
}
```


**checks**

What if the string is empty? or the string is one word

```js
if (newInput.length === 0) return counter;
```

```js
if (!sArr.includes(" ")) return newInput.length;
```

**full code**

```js
const lengthOfLastWord = (x) => {
  let newInput = x.trim();
  let sArr = newInput.split("");
  let counter = 0;
  
  if (newInput.length === 0) return counter;
  
  if (!sArr.includes(" ")) return newInput.length;
  
  for (let i = newInput.length - 1; i > 0; i--) {
      if (newInput[i] != " ") {
        counter++;
      } else {
        return counter;
      }
    }
}
```


```js
 lengthOfLastWord("30 seconds of code");  // 4
```