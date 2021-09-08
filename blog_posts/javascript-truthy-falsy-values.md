---
title: What are truthy and falsy values in JavaScript?
type: question
tags: javascript,type,comparison
authors: chalarangelo
cover: blog_images/little-bird.jpg
excerpt: JavaScript uses type coercion in Boolean contexts, resulting in truthy or falsy values. Get a hang of how it all works in this quick guide.
firstSeen: 2021-09-12T05:00:00-04:00
---

JavaScript uses type coercion (implicit conversion of values from one data type to another) in Boolean contexts, such as conditionals. This means that values are considered either truthy (evaluate to `true`) or falsy (evaluate to `false`) depending on how they are evaluated in a Boolean context.

There are 6 values that are considered **falsy** in JavaScript:

- The keyword `false`
- The primitive value `undefined`
- The primitive value `null`
- The empty string (`''`, `""`)
- The global property `NaN`
- A number or BigInt representing `0` (`0`, `-0`, `0.0`, `-0.0`, `0n`)

Every other value is considered **truthy**. It's important to remember that this applies to all JavaScript values, even ones that might seem falsy, such as empty arrays (`[]`) or empty objects (`{}`).

You can check a value's truthiness using either the `Boolean()` function or a double negation (`!!`).

```js
Boolean(false);         // false
Boolean(undefined);     // false
Boolean(null);          // false
Boolean('');            // false
Boolean(NaN);           // false
Boolean(0);             // false
Boolean(-0);            // false
Boolean(0n);            // false

Boolean(true);          // true
Boolean('hi');          // true
Boolean(1);             // true
Boolean([]);            // true
Boolean([0]);           // true
Boolean([1]);           // true
Boolean({});            // true
Boolean({ a: 1 });      // true
```
