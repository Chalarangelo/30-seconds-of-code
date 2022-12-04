---
title: Negative index in JavaScript array
shortTitle: Negative index array proxy
type: story
tags: javascript,array,proxy
author: chalarangelo
cover: blog_images/budapest-palace.jpg
excerpt: Ever wanted to use negative indices in JavaScript arrays? Here's a simple way to do it using a Proxy.
firstSeen: 2022-10-02T05:00:00-04:00
---

`Array.prototype.slice()` provides an easy way to access elements from the end of an array, using a negative `start` value. While this sounds convenient, the resulting value is an array, so it's necessary to use an index to get an individual element.

This is usually not too bad, but it's interesting to explore other options to understand the language better. In this case, we can use a `Proxy` object to allow accessing data in an array using negative indexes. To do so, an appropriate handler needs to be defined for the `get` trap.

The trap's second argument corresponds to the passed index, however it's a string, so it must first be converted to a number using `Number()`. Then, `Array.prototype.length` can be used to calculate the position of the actual element. Finally, `Reflect.get()` can be used to get the value at the specific index, but expects its second argument to be a string.

Putting everything together, this is what this looks like:

```js
const handler = {
  get(target, key, receiver) {
    const index = Number(key);
    const prop = index < 0 ? `${target.length + index}` : key;
    return Reflect.get(target, prop, receiver);
  },
};

const createArray = (...elements) => {
  const arr = [...elements];
  return new Proxy(arr, handler);
};

let arr = createArray('a', 'b', 'c');

arr[-1]; // 'c'
arr[-1]; // 'b'
```
