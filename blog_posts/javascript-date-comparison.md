---
title: How do I compare two dates in JavaScript?
shortTitle: Date comparison
type: question
tags: javascript,date,comparison
author: chalarangelo
cover: pineapple-at-work
excerpt: Learn how you can compare two dates in JavaScript using various different techniques.
firstSeen: 2022-01-16T05:00:00-04:00
---

### Equality comparison

Comparing two dates in JavaScript using the loose or strict equality operators (`==` or `===`) is not recommended for most cases. Equality operators compare the `Date` object references, resulting in `false`, even if the date values are the same:

```js
const a = new Date(2022, 01, 10);
const b = new Date(2022, 01, 10);

a === b; // false
```

### Date.prototype.getTime()

One way to compare two `Date` values is using the `Date.prototype.getTime()` method. This method returns a number indicating the number of milliseconds elapsed since the Unix Epoch:

```js
const a = new Date(2022, 01, 10);
const b = new Date(2022, 01, 10);

a.getTime() === b.getTime(); // true
```

### Other methods

As mentioned before, `Date.prototype.getTime()` is one way to compare two `Date` values. It's not the only one way to compare them. Other options are the following:

- `Date.prototype.toISOString()`
- `Date.prototype.toUTCString()`
- `Date.prototype.toLocaleDateString()` provided you use the same locale

All of these methods produce consistent results, but we still recommend `Date.prototype.getTime()` due to its simplicity.
