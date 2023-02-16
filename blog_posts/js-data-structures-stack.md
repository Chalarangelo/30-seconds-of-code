---
title: JavaScript Data Structures - Stack
shortTitle: Stack
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: purple-flower-macro-1
excerpt: A stack is a linear data structure which follows a last in, first out (LIFO) order of operations.
firstSeen: 2021-08-03T05:00:00-04:00
---

### Definition

A stack is a linear data structure that behaves like a real-world stack of items. It follows a last in, first out (LIFO) order of operations, similar to its real-world counterpart. This means that new items are added to the top of the stack and items are removed from the top of the stack as well.

![JavaScript Stack visualization](./blog_images/ds-stack.png)

The main operations of a stack data structure are:

- `push`: Adds an element to the top of the stack
- `pop`: Removes an element from the top of the stack
- `peek`: Retrieves the element at the top of the stack, without removing it
- `isEmpty`: Checks if the stack is empty

### Implementation

```js
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.unshift(item);
  }

  pop(item) {
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
- Define a `push()` method, which uses `Array.prototype.unshift()` to add an element to the start of the `items` array.
- Define a `pop()` method, which uses `Array.prototype.shift()` to remove an element from the start of the `items` array.
- Define a `peek()` method, which retrieves the value of the first element in the `items` array, without removing it.
- Define an `isEmpty()` method, which uses `Array.prototype.length` to determine if the `items` array is empty.

```js
const stack = new Stack();

stack.push('apples');
stack.push('oranges');
stack.push('pears');

stack.isEmpty();    // false

stack.peek();       // 'pears'

stack.pop();        // 'pears'
stack.pop();        // 'oranges'
stack.pop();        // 'apples'

stack.isEmpty();    // true
```
