---
title: What's the difference between Object.is() and the triple equals operator in JavaScript?
type: question
tags: javascript,object,type
authors: chalarangelo
cover: blog_images/rocky-mountains.jpg
excerpt: "`Object.is()` and the triple equals operator (`===`) can both be used for equality checking in JavaScript, but when should you use each one?"
---

If you want to check equality in JavaScript, there are two comparison operators, which are explained in depth in a previous [article](/blog/s/javascript-equality).

Very briefly, the double equals operator (`==`) only compares value whereas the triple equals operator (`===`) compares both value and type. But there is also a third option, `Object.is()`, which behaves the same as the triple equals operator with the exception of `NaN` and `+0` and `-0`.

Here are some examples for additional clarity:

```js
{} === {}; // false
Object.is({}, {}); // false

1 === 1; // false
Object.is(1, 1); // false

+0 === -0; // true
Object.is(+0, -0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```

**Image credit:** [Jonathan Sanchez](https://unsplash.com/@jonathansancheziam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
