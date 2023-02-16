---
title: Where and how can I use memoization in JavaScript?
shortTitle: Memoization introduction
type: question
tags: javascript,function,memoization
author: chalarangelo
cover: cherry-trees
excerpt: Learn different ways to memoize function calls in JavaScript as well as when to use memoization to get the best performance results.
firstSeen: 2020-02-27T16:23:25+02:00
lastUpdated: 2021-11-07T16:34:37+03:00
---

Memoization is a commonly used technique that can help speed up your code significantly. This technique relies on a **cache** to store results for previously completed units of work. The purpose of the cache is to **avoid performing the same work more than once**, speeding up subsequent calls of time-consuming functions. Based on this definition, we can easily extract some criteria that can help us decide when to use memoization in our code:

- Memoization is useful mainly in speeding up slow-performing, costly or time-consuming function calls
- Memoization speeds up subsequent calls, so it's best used when you anticipate multiple calls of the same function under the same circumstances
- Memoization stores results in memory, so it should be avoided when the same function is called multiple times under very different circumstances

A simple, object-oriented example of implementing memoization could be as follows:

```js
class MyObject {
  constructor(data) {
    this.data = data;
    this.data[this.data.length - 2] = { value: 'Non-empty' };
  }

  firstNonEmptyItem() {
    return this.data.find(v => !!v.value);
  }

  firstNonEmptyItemMemo() {
    if (!this.firstNonEmpty)
      this.firstNonEmpty = this.data.find(v => !!v.value);
    return this.firstNonEmpty;
  }
}

const myObject = new MyObject(Array(2000).fill({ value: null }));

for (let i = 0; i < 100; i ++)
  myObject.firstNonEmptyItem();       // ~4000ms
for (let i = 0; i < 100; i ++)
  myObject.firstNonEmptyItemMemo();   // ~70ms
```

This example showcases a way to implement memoization inside a class. However, it makes a couple of assumptions. First, it's assumed that the `data` structure will not be altered over the lifecycle of the object. Seconds, it's assumed that this is the only expensive function call we will make, so the code is not reusable. The example also doesn't account for arguments being passed to the function, which would alter the result. A functional approach would work with any given function and also account for arguments. Such an approach can be seen in the form of the [memoize snippet](/js/s/memoize/), which uses a `Map` to store different values.

We still recommend using that snippet as the primary way to memoize a function, however JavaScript's [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) provides an interesting alternative via the use of the `handler.apply()` trap, which can be used for this purpose as follows:

```js
const memoize = fn => new Proxy(fn, {
  cache: new Map(),
  apply (target, thisArg, argsList) {
    let cacheKey = argsList.toString();
    if(!this.cache.has(cacheKey))
      this.cache.set(cacheKey, target.apply(thisArg, argsList));
    return this.cache.get(cacheKey);
  }
});

const fibonacci = n => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoize(fibonacci);

for (let i = 0; i < 100; i ++)
  fibonacci(30);                      // ~5000ms
for (let i = 0; i < 100; i ++)
  memoizedFibonacci(30);              // ~50ms
```
