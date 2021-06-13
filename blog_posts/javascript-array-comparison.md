---
title: How do I compare two arrays in JavaScript?
type: question
tags: javascript,array,comparison
authors: chalarangelo
cover: blog_images/coconuts.jpg
excerpt: Learn how you can compare two arrays in JavaScript using various different techniques.
firstSeen: 2020-08-07T14:23:14+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### Equality comparison

Comparing two arrays in JavaScript using either the loose or strict equality operators (`==` or `===`) will most often result in `false`, even if the two arrays contain the same elements in the same order. This is due to the fact that arrays and objects are compared by reference and not by value in JavaScript, which means this solution does not produce the desired result:

```js
const a = [1, 2, 3];
const b = [1, 2, 3];

a === b; // false
```

### JSON.stringify

A common solution that many people suggest is to use `JSON.stringify()`, which allows us to serialize each array and then compare the two serialized strings. A simple implementation of this might look something like this:

```js
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const a = [1, 2, 3];
const b = [1, 2, 3];

equals(a, b); // true
```

While this seems like a great, short and easy to understand solution, it falls short on some edge cases where different values' serialized string is the same. For example:

```js
const str = 'a';
const strObj = new String('a');
str === strObj; // false
equals([str], [strObj]); // true, should be false

null === undefined; // false
equals([null], [undefined]); // true, should be false
```

While these cases seem rather uncommon, they might cause some very annoying issues that are hard to track down and fix, which is why this solution is not recommended for most use-cases.

### A better way

A better approach would be to compare the two arrays' `length`s and use `Array.prototype.every()` to compare the values of the two:

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

This approach safeguards against the serialization issue described above, however it does not take into account nested arrays or objects, which need to be checked recursively. For a robust solution that handles this and other issues, you should use the [equals snippet](/js/s/equals).

### Comparing out of order

Finally, there are cases where the order of the elements in each array is not important and we only care about the same values existing in both arrays. For these cases, you can use `Set` and `Array.prototype.filter()` in combination with a loop to iterate over unique values and check if each one appears the same amount of times in each array:

```js
const equalsIgnoreOrder = (a, b) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}
```

For a more detailed explanation, you should check out the [haveSameContents snippet](/js/s/have-same-contents).
