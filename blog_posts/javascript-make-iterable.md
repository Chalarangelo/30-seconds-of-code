---
title: "Tip: Make any JavaScript value iterable"
shortTitle: Make any value iterable
type: tip
tags: javascript,array,iterator,generator
author: chalarangelo
cover: blog_images/colorful-plastic.jpg
excerpt: Did you know you can define an iterator for any JavaScript value? This quick tip will show you how.
firstSeen: 2021-06-10T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

JavaScript's `Symbol.iterator` is a very powerful tool that every web developer should learn how to use. It allows you to define and customize the way a value is iterated, effectively allowing you to make any value iterable. You can easily apply this knowledge to plain JavaScript objects and even classes.

All you need to correctly define an iterator is a generator function `yield`ing each of the iteration values. This could be used to retrieve key-value pairs in an object, call specific getter functions from a class or split a number into an array of digits:

```js
const obj = { a: 1, b: 2, c: 3 };

obj[Symbol.iterator] = function* () {
  for (let key of Object.keys(obj)) yield { [key]: obj[key] };
};

[...obj]; // [ { a: 1 }, { b: 2 }, { c: 3 }]

class IterableNumber extends Number {
  *[Symbol.iterator]() {
    for (let digit of [...`${this}`].map(d => Number.parseInt(d))) yield digit;
  }
}

const num = new IterableNumber(1337);
[...num]; // [ 1, 3, 3, 7]
```
