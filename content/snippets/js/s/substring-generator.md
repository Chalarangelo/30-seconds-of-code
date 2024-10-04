---
title: How can I generate all partial substrings of a string in JavaScript?
shortTitle: Substring generator
language: javascript
tags: [string,generator]
cover: boutique-home-office-1
excerpt: Get all the partial substrings of a string in JavaScript using generator functions.
listed: true
dateModified: 2023-10-25
---

Sometimes, you might need to **generate all partial substrings of a string**. This might come in handy in a variety of situations, such as string matching, or string compression. Luckily, using JavaScript's **generator functions**, this is a fairly simple task.

## Left substring generator

Using a `for...in` loop, we can iterate over the string, and `yield` each substring, starting at the beginning. We can use `String.prototype.slice()` to get the substring. In order to terminate early, we can use `String.prototype.length` to check if the string is empty.

```js
const leftSubstrGenerator = function* (str) {
  if (!str.length) return;
  for (let i in str) yield str.slice(0, i + 1);
};

[...leftSubstrGenerator('hello')];
// [ 'h', 'he', 'hel', 'hell', 'hello' ]
```

## Right substring generator

The exact same technique with a `for...in` loop can be used when starting at the end of the string. Same as before, albeit with a slight modification, we can use `String.prototype.slice()` to get the substring. And again, we use `String.prototype.length` to terminate early if the string is empty.

```js
const rightSubstrGenerator = function* (str) {
  if (!str.length) return;
  for (let i in str) yield str.slice(-i - 1);
};

[...rightSubstrGenerator('hello')];
// [ 'o', 'lo', 'llo', 'ello', 'hello' ]
```
