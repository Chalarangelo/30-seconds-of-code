---
title: How do I convert and iterable to an array in JavaScript?
type: question
tags: javascript,object,array,string
authors: chalarangelo
cover: blog_images/waves.jpg
excerpt: Learn how to use the JavaScript ES6 spread syntax to converting iterables to arrays and level up your code today.
---

JavaScript ES6 introduced, among many other things, the [spread operator (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), which allows an iterable to be expanded in places where zero or more arguments or elements are expected.

We can use the spread operator to convert iterables or, as they are sometimes referred to, array-likes. Let's take a look at some examples:

**String**

When the spread operator is applied to a string, the result is an array of strings each one representing a character of the original string:

```js
const name = 'Zelda';
const letters = [...name]; // 'Z', 'e', 'l', 'd', 'a'
```

**Set**

A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is a collection of unique values. When the spread operator is applied to it, the result is an array of the stored values:

```js
const data = [1, 2, 3, 1, 2, 4]
const values = new Set(data);
const uniqueValues = [...values]; // [1, 2, 3, 4]
```

Note that the above example is the basis for the [uniqueElements snippet](/js/s/unique-elements).

**NodeList**

A [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) is a collection of nodes, returned by methods such as `document.childNodes()` or `document.querySelectorAll()`. While it implements some methods that help manipulate it as an array (e.g. `NodeList.prototype.forEach()`), it's oftentimes desirable to convert it to an array. When the spread operator is applied to it, the result is an array of the contained nodes:

```js
const nodes = document.childNodes;
const nodeArray = [...nodes]; // [ <!DOCTYPE html>, html ]
```

Note that the above example is the basis for the [nodeListToArray snippet](js/s/node-list-to-array).

**Image credit:** [Holger Link](https://unsplash.com/@photoholgic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
