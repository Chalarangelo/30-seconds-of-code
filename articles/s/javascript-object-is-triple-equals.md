---
title: What's the difference between Object.is() and the triple equals operator in JavaScript?
shortTitle: Object.is() vs triple equals operator
type: question
tags: [javascript,object,type]
author: chalarangelo
cover: rocky-mountains
excerpt: "`Object.is()` and the triple equals operator (`===`) can both be used for equality checking in JavaScript, but when should you use each one?"
dateModified: 2021-06-12T19:30:41+03:00
---

If you want to check equality in JavaScript, there are two comparison operators, which are explained in depth in a previous [article](/blog/s/javascript-equality).

Very briefly, the double equals operator (`==`) only compares value whereas the triple equals operator (`===`) compares both value and type. But there is also a third option, `Object.is()`, which behaves the same as the triple equals operator with the exception of `NaN` and `+0` and `-0`.

Here are some examples for additional clarity:

```js
{} === {}; // false
Object.is({}, {}); // false

1 === 1; // true
Object.is(1, 1); // true

+0 === -0; // true
Object.is(+0, -0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```
