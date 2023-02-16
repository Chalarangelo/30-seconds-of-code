---
title: JavaScript Data Structures - Queue
shortTitle: Queue
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: purple-flower-macro-2
excerpt: A queue is a linear data structure which follows a first in, first out (FIFO) order of operations.
firstSeen: 2021-07-29T05:00:00-04:00
---

### Definition

A queue is a linear data structure that behaves like a real-world queue. It follows a first in, first out (FIFO) order of operations, similar to its real-world counterpart. This means that new items are added to the end of the queue, whereas items are removed from the start of the queue.

![JavaScript Queue visualization](./blog_images/ds-queue.png)

The main operations of a queue data structure are:

- `enqueue`: Adds an element to the end of the queue
- `dequeue`: Removes an element from the start of the queue
- `peek`: Retrieves the element at the start of the queue, without removing it
- `isEmpty`: Checks if the queue is empty

### Implementation

```js
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue(item) {
    return this.items.shift();
  }

  peek(item) {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

- Create a `class` with a `constructor` that initializes an empty array, `items`, for each instance.
- Define an `enqueue()` method, which uses `Array.prototype.push()` to add an element to the end of the `items` array.
- Define a `dequeue()` method, which uses `Array.prototype.shift()` to remove an element from the start of the `items` array.
- Define a `peek()` method, which retrieves the value of the first element in the `items` array, without removing it.
- Define an `isEmpty()` method, which uses `Array.prototype.length` to determine if the `items` array is empty.

```js
const queue = new Queue();

queue.isEmpty();    // true

queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
queue.enqueue('D');
queue.enqueue('E');

queue.isEmpty();    // false

queue.peek();       // 'A'

queue.dequeue();    // 'A'
queue.dequeue();    // 'B'
queue.dequeue();    // 'C'
```
