---
title: What is a pure function?
shortTitle: Pure function introduction
type: question
tags: javascript,function
expertise: intermediate
author: chalarangelo
cover: blog_images/dark-leaves.jpg
excerpt: Pure functions are a very important concept to know, especially if you're interested in functional programming.
firstSeen: 2021-12-19T05:00:00-04:00
---

Pure functions are one of the most important concepts to learn and understand, especially if you're interested in functional programming.

A pure function is a function that satisfies the following two conditions:

- Given the same input, it always returns the same output.
- Causes no side effects outside the function's scope.

Let's look at some examples of pure and impure functions:

```js
// Pure
const add = (x, y) => x + y;
const concat = (arr, value) => [...arr, value];
const order = arr => [...arr].sort((a, b) => a - b);

// Impure
const addRandom = x => x + Math.random();
const pushConcat = (arr, value) => { arr.push(value); return arr; }
const reorder = arr => arr.sort((a, b) => a - b);
```

Understanding if a function is pure or impure is generally pretty easy. An easy trick to tell if a function is impure is if it makes sense to call it without using its return value or if it doesn't return any. These usually indicate that a function causes side effects.

Pure functions are more reliable and reusable, which in turn makes them easier to reason about. It's usually preferable to use a pure function over an impure one if constraints allow it.
