---
title: What is the difference between JavaScript's equality operators?
type: question
tags: javascript,type,comparison
expertise: intermediate
author: chalarangelo
cover: blog_images/beach-pineapple.jpg
excerpt: Learn all you need to know about the differences between JavaScript's double equals and triple equals operators.
firstSeen: 2020-08-06T19:52:30+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript provides two equality operators used for comparisons:

- The double equals (`==`), also known as the loose equality operator
- The triple equals (`===`), also known as the strict equality operator

The key difference between the two is that the triple equals (`===`) operator compares both type and value, whereas the double equals (`==`) operator uses type coercion so that both operands are of the same type, then compares only the resulting values.

Here are some examples to clear up any confusion:

```js
const num = 0;
const str = '0';
const obj = new String(0);
const bool = false;
const undef = undefined;
const nil = null;

console.dir([
  num == str,     // 0 == 0, true
  num == bool,    // 0 == 0, true
  str == obj,     // '0' == '0', true
  obj == num,     // 0 == 0, true
  bool == str,    // 0 == 0, true
  bool == obj,    // 0 == 0, true
  bool == nil,    // false
  undef == nil,   // true
  undef == bool,  // false
]);

console.dir([
  num === str,     // types don't match, false
  num === bool,    // types don't match, false
  str === obj,     // types don't match, false
  obj === num,     // types don't match, false
  bool === str,    // types don't match, false
  bool === obj,    // types don't match, false
  bool === nil,    // types don't match, false
  undef === nil,   // types don't match, false
  undef === bool,  // types don't match, false
]);
```

As you can see from the examples above, using the triple equals (`===`) operator is far more predictable and intuitive than the double equals (`==`) operator. Therefore, we recommend you use the triple equals (`===`) operator for most cases, unless you are entirely certain you want type coercion to be applied to the comparison's operands.
