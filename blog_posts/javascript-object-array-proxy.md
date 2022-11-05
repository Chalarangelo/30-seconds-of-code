---
title: Can I use an object as an array without modifying it in JavaScript?
shortTitle: Object as array
type: question
tags: javascript,object,array,proxy,iterator,pattern
expertise: advanced
author: chalarangelo
cover: blog_images/birds.jpg
excerpt: Learn how you can leverage the Proxy object to use a JavaScript object the same way as you would use a regular array.
firstSeen: 2021-05-03T12:00:00+03:00
lastUpdated: 2021-09-27T16:42:11+03:00
---

The other day, I stumbled upon some code where I needed to handle an object as a regular array a few times. This was, of course, achievable using `Object.keys()`, `Object.values()` or `Object.entries()`, but it started getting verbose real quick.

So I thought I could create some kind of wrapper that would take an object and define some array-like behavior for it. I was mainly in need of `Array.prototype.map()`, `Array.prototype.find()`, `Array.prototype.includes()` and `Array.prototype.length`. All of this functionality was pretty straightforward to create using  `Object` methods. The only tricky part, so to speak, was getting the object to behave as an iterable, which required using the `Symbol.iterator` and a generator function.

Injecting the new functionality into an object could be as simple as adding the methods to it. The downside of this approach is that they would be part of the actual object, which can be problematic. It also doesn't help that this is not very reusable if we want to apply this over a handful of objects.

Enter the [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), one of the lesser known tools in a JavaScript developer's tool belt, yet a very powerful one. It's used to intercept certain operations for an object, such as property lookup, assignment etc. In this scenario, it can neatly wrap the required functionality into a function that creates a proxy around the object.

The final code, long as it may be, can be seen in the example below. It implements the functionality I needed, as well as a handful more `Array` methods for good measure:

```js
const toKeyedArray = obj => {
  const methods = {
    map(target) {
      return callback =>
        Object.keys(target).map(key => callback(target[key], key, target));
    },
    reduce(target) {
      return (callback, accumulator) =>
        Object.keys(target).reduce(
          (acc, key) => callback(acc, target[key], key, target),
          accumulator
        );
    },
    forEach(target) {
      return callback =>
        Object.keys(target).forEach(key => callback(target[key], key, target));
    },
    filter(target) {
      return callback =>
        Object.keys(target).reduce((acc, key) => {
          if (callback(target[key], key, target)) acc[key] = target[key];
          return acc;
        }, {});
    },
    slice(target) {
      return (start, end) => Object.values(target).slice(start, end);
    },
    find(target) {
      return callback => {
        return (Object.entries(target).find(([key, value]) =>
          callback(value, key, target)
        ) || [])[0];
      };
    },
    findKey(target) {
      return callback =>
        Object.keys(target).find(key => callback(target[key], key, target));
    },
    includes(target) {
      return val => Object.values(target).includes(val);
    },
    keyOf(target) {
      return value =>
        Object.keys(target).find(key => target[key] === value) || null;
    },
    lastKeyOf(target) {
      return value =>
        Object.keys(target)
          .reverse()
          .find(key => target[key] === value) || null;
    },
  };
  const methodKeys = Object.keys(methods);

  const handler = {
    get(target, prop, receiver) {
      if (methodKeys.includes(prop)) return methods[prop](...arguments);
      const [keys, values] = [Object.keys(target), Object.values(target)];
      if (prop === 'length') return keys.length;
      if (prop === 'keys') return keys;
      if (prop === 'values') return values;
      if (prop === Symbol.iterator)
        return function* () {
          for (value of values) yield value;
          return;
        };
      else return Reflect.get(...arguments);
    },
  };

  return new Proxy(obj, handler);
};

// Object creation
const x = toKeyedArray({ a: 'A', b: 'B' });

// Accessing properties and values
x.a;          // 'A'
x.keys;       // ['a', 'b']
x.values;     // ['A', 'B']
[...x];       // ['A', 'B']
x.length;     // 2

// Inserting values
x.c = 'c';    // x = { a: 'A', b: 'B', c: 'c' }
x.length;     // 3

// Array methods
x.forEach((v, i) => console.log(`${i}: ${v}`)); // LOGS: 'a: A', 'b: B', 'c: c'
x.map((v, i) => i + v);                         // ['aA', 'bB, 'cc]
x.filter((v, i) => v !== 'B');                  // { a: 'A', c: 'c' }
x.reduce((a, v, i) => ({ ...a, [v]: i }), {}); 	// { A: 'a', B: 'b', c: 'c' }
x.slice(0, 2);                                  // ['A', 'B']
x.slice(-1);                                    // ['c']
x.find((v, i) => v === i);                      // 'c'
x.findKey((v, i) => v === 'B');                 // 'b'
x.includes('c');                                // true
x.includes('d');                                // false
x.keyOf('B');                                   // 'b'
x.keyOf('a');                                   // null
x.lastKeyOf('c');                               // 'c'
```
