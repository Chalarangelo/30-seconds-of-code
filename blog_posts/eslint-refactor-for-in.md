---
title: "Tip: Refactoring your for...in loops to avoid ESLint warnings"
type: tip
tags: javascript,array,iterator,eslint
author: chalarangelo
cover: blog_images/typing.jpg
excerpt: ESLint is a very powerful tool that can save you a lot of headaches, but sometimes it gets in the way. Learn how to refactor code to get rid of a common warning.
firstSeen: 2020-05-19T02:32:10+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

ESLint is one of my tools of choice, but oftentimes it gets in the way of work, due to the way it prefers me to do things. One of the warnings I have seen more times than I care to admit is the following:

> for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.eslint(no-restricted-syntax)

And here are three refactoring options to deal with it:

### Object.keys()

`Object.keys()` has the exact same behavior as a `for...in` loop, so it can be used as a drop-in replacement:

```js
const data = [3, 4];
// Same as for (let k in data) console.log(k)
Object.keys(data).forEach(k => console.log(k));
// 0 1
```

### Object.values()

`Object.values()` is very similar to `Object.keys()`, but returns the values instead of the keys, which might be what you are really using the keys for:

```js
const data = [3, 4];
// Iterate over the values
Object.values(data).forEach(v => console.log(v));
// 3 4
```

### Object.entries()

Finally, if you need both key and value, `Object.entries()` has you covered:

```js
const data = [3, 4];
// Iterate over the data, returning key-value pairs
Object.entries(data).forEach(e => console.log(e[0], e[1]));
// [0, 3] [1, 4]
```
