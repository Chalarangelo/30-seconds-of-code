---
title: Where and how can I use memoization in JavaScript?
shortTitle: Memoization introduction
language: javascript
tags: [function,memoization]
cover: cherry-trees
excerpt: Learn different ways to memoize function calls in JavaScript as well as when to use memoization to get the best performance results.
listed: true
dateModified: 2024-01-26
---

## What is memoization?

Memoization is a commonly used technique that can help speed up your code significantly. It relies on a **cache** to store results for previously completed units of work. The purpose of the cache is to **avoid performing the same work more than once**, speeding up subsequent calls of time-consuming functions.

## Criteria for using memoization

Based on its definition, we can easily deduce some criteria to help us discover good candidates for memoization:

- **Slow-performing, costly or time-consuming** function calls can benefit from memoization
- Memoization speeds up **subsequent calls**, so it's best used when you anticipate multiple calls of the same function under the same circumstances
- Results are **stored in memory**, so memoization should be avoided when the same function is called multiple times under very different circumstances

## Memoize a function

It's fairly easy to roll up your own memoization function in JavaScript. For this implementation, we'll use a `Map` to store the results. The `Map` object holds **key-value pairs** and remembers the original insertion order of the keys. This makes it suitable for memoization, as we can use the function's arguments as keys and the results as values.

```js
const memoize = fn => {
  const cache = new Map();
  const cached = function (val) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

// This function is slow and will benefit from memoization
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)
        ),
      []
    );
};

const anagramsCached = memoize(anagrams);

anagramsCached('javascript');
// takes a long time
anagramsCached('javascript');
// returns virtually instantly since it's cached
```

## Using a Proxy object for memoization

While the previous example is a good way to implement memoization, JavaScript's [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) provides an interesting **alternative** via the use of the `handler.apply()` trap.

Using the trap, we can **intercept the function call** and check if the result is already cached. If it is, we return the cached result. If it's not, we call the original function and **cache the result** before returning it.

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
