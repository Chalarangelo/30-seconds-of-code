---
title: What are JavaScript Iterators and where can I use them?
shortTitle: JavaScript iterators introduction
type: question
tags: [javascript,array,object,iterator]
author: chalarangelo
cover: balloons
excerpt: Learn how JavaScript's iterators work and how you can use them to level up your projects by understanding these short code examples.
dateModified: 2021-09-26T13:20:57+03:00
---

JavaScript iterators were introduced in ES6 and they are used to loop over a sequence of values, usually some sort of collection. By definition, an iterator must implement a `next()` function, that returns an object in the form of `{ value, done }` where `value` is the next value in the iteration sequence and `done` is a boolean determining if the sequence has already been consumed.

A very simple iterator with practical use in a real-world project could be as follows:

```js
class LinkedList {
  constructor(data) {
    this.data = data;
  }

  firstItem() {
    return this.data.find(i => i.head);
  }

  findById(id) {
    return this.data.find(i => i.id === id);
  }

  [Symbol.iterator]() {
    let item = { next: this.firstItem().id };
    return {
      next: () => {
        item = this.findById(item.next);
        if (item) {
          return { value: item.value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const myList = new LinkedList([
  { id: 'a10', value: 'First', next: 'a13', head: true },
  { id: 'a11', value: 'Last', next: null, head: false },
  { id: 'a12', value: 'Third', next: 'a11', head: false },
  { id: 'a13', value: 'Second', next: 'a12', head: false },
]);

for (let item of myList) {
  console.log(item); // 'First', 'Second', 'Third', 'Last'
}
```

In the above example, we implement a [`LinkedList` data structure](/articles/s/js-data-structures-linked-list), that internally uses a `data` array. Each item in it has a `value` and some implementation-specific properties used to determine its position in the sequence. Objects constructed from this class are not iterable by default. To define an iterator we use `Symbol.iterator` and set it up so that the returned sequence is in order based on the internal implementation of the class, while the returned items only return their `value`.

On a related note, iterators are just functions, meaning they can be called like any other function (e.g. to delegate the iteration to an existing iterator), while also not being restricted to the `Symbol.iterator` name. This allows us to define multiple iterators for the same object. Here's an example of these concepts at play:

```js
class SpecialList {
  constructor(data) {
    this.data = data;
  }

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }

  values() {
    return this.data
      .filter(i => i.complete)
      .map(i => i.value)
      [Symbol.iterator]();
  }
}

const myList = new SpecialList([
  { complete: true, value: 'Lorem ipsum' },
  { complete: true, value: 'dolor sit amet' },
  { complete: false },
  { complete: true, value: 'adipiscing elit' },
]);

for (let item of myList) {
  console.log(item); // The exact data passed to the SpecialList constructor above
}

for (let item of myList.values()) {
  console.log(item); // 'Lorem ipsum', 'dolor sit amet', 'adipiscing elit'
}
```

In this example, we use the native array iterator of the `data` object to make our `SpecialList` iterable, returning the exact values of the `data` array. Meanwhile, we also define a `values` method, which is an iterator itself, using `Array.prototype.filter()` and `Array.prototype.map()` on the `data` array. Finally, we return the `Symbol.iterator` of the result, allowing iteration only over non-empty objects in the sequence and returning just the `value` for each one.

