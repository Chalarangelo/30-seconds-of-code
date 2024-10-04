---
title: How do I compare two arrays in JavaScript?
shortTitle: JavaScript array comparison
test: true
language: javascript
tags: [array,comparison]
cover: coconuts
excerpt: Learn how you can compare two arrays in JavaScript using various different techniques.
listed: true
dateModified: 2021-09-27
---

## Equality comparison

Use `==` or `===`, but it's not a great idea.

```js
const a = [1, 2, 3];
const b = [1, 2, 3];

a === b; // false
```

## JSON.stringify

This works, but it's slow.

```js
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const a = [1, 2, 3];
const b = [1, 2, 3];

equals(a, b); // true
```

## Deep equality

_Deep_ equality is **just better**.

```js
const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

const a = [1, 2, 3];
const b = [1, 2, 3];
const str = 'a';
const strObj = new String('a');

equals(a, b); // true
equals([str], [strObj]); // false
equals([null], [undefined]); // false
```
