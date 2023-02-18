---
title: How can I detect an undefined object property in JavaScript?
shortTitle: Detect undefined object property
type: story
tags: javascript,object
author: chalarangelo
cover: pink-flower
excerpt: Learn how to detect `undefined` object properties in JavaScript the correct way.
firstSeen: 2022-08-07T05:00:00-04:00
---

It’s not uncommon to want to detect object properties with a value of `undefined`. While this seems straightforward on the surface, `undefined` is a rather elusive value to check for.

More often than not solutions point towards direct strict comparison with `undefined` or using `typeof`. Both of these methods have a hard time differentiating between present properties with a value of `undefined` and non-existent properties. This, in turn, makes them prone to silent errors, shall you misspell the property altogether.

```js
const obj = { prop : undefined };
obj.prop === undefined; // true
typeof obj.prop === 'undefined'; // true
obj.porp === undefined; // true
typeof obj.porp === 'undefined'; // true
```

To alleviate the issue, `Object.prototype.hasOwnProperty()` can be used in addition to the previous method to check for the property actually being present on the object. Moreover, it can also be used for the opposite, so you can also detect non-existent properties and handle them accordingly.

```js
const hasUndefinedProperty = (obj, prop) =>
  obj.hasOwnProperty(prop) && obj[prop] === undefined;

const obj = { prop: undefined };
hasUndefinedProperty(obj, 'prop'); // true
hasUndefinedProperty(obj, 'porp'); // false
```
