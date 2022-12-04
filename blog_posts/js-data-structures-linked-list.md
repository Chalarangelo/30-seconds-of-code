---
title: JavaScript Data Structures - Linked List
shortTitle: Linked List
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: blog_images/purple-flower-macro-3.jpg
excerpt: A linked list is a linear data structure where each element points to the next.
firstSeen: 2021-08-08T05:00:00-04:00
---

### Definition

A linked list is a linear data structure that represents a collection of elements, where each element points to the next one. The first element in the linked list is the head and the last element is the tail.

![JavaScript Linked List visualization](./blog_images/ds-linked-list.png)

Each element of a linked list data structure must have the following properties:

- `value`: The value of the element
- `next`: A pointer to the next element in the linked list (`null` if there is none)

The main properties of a linked list data structure are:

- `size`: The number of elements in the linked list
- `head`: The first element in the linked list
- `tail`: The last element in the linked list

The main operations of a linked list data structure are:

- `insertAt`: Inserts an element at the specific index
- `removeAt`: Removes the element at the specific index
- `getAt`: Retrieves the element at the specific index
- `clear`: Empties the linked list
- `reverse`: Reverses the order of elements in the linked list

### Implementation

```js
class LinkedList {
  constructor() {
    this.nodes = [];
  }

  get size() {
    return this.nodes.length;
  }

  get head() {
    return this.size ? this.nodes[0] : null;
  }

  get tail() {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  insertAt(index, value) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node = { value, next: nextNode };

    if (previousNode) previousNode.next = node;
    this.nodes.splice(index, 0, node);
  }

  insertFirst(value) {
    this.insertAt(0, value);
  }

  insertLast(value) {
    this.insertAt(this.size, value);
  }

  getAt(index) {
    return this.nodes[index];
  }

  removeAt(index) {
    const previousNode = this.nodes[index - 1];
    const nextNode = this.nodes[index + 1] || null;

    if (previousNode) previousNode.next = nextNode;

    return this.nodes.splice(index, 1);
  }

  clear() {
    this.nodes = [];
  }

  reverse() {
    this.nodes = this.nodes.reduce(
      (acc, { value }) => [{ value, next: acc[0] || null }, ...acc],
      []
    );
  }

  *[Symbol.iterator]() {
    yield* this.nodes;
  }
}
```

- Create a `class` with a `constructor` that initializes an empty array, `nodes`, for each instance.
- Define a `size` getter, that returns that uses `Array.prototype.length` to return the number of elements in the `nodes` array.
- Define a `head` getter, that returns the first element of the `nodes` array or `null` if empty.
- Define a `tail` getter, that returns the last element of the `nodes` array or `null` if empty.
- Define an `insertAt()` method, which uses `Array.prototype.splice()` to add a new object in the `nodes` array, updating the `next` key of the previous element.
- Define two convenience methods, `insertFirst()` and `insertLast()` that use the `insertAt()` method to insert a new element at the start or end of the `nodes` array respectively.
- Define a `getAt()` method, which retrieves the element in the given `index`.
- Define a `removeAt()` method, which uses `Array.prototype.splice()` to remove an object in the `nodes` array, updating the `next` key of the previous element.
- Define a `clear()` method, which empties the `nodes` array.
- Define a `reverse()` method, which uses `Array.prototype.reduce()` and the spread operator (`...`) to reverse the order of the `nodes` array, updating the `next` key of each element appropriately.
- Define a generator method for `Symbol.iterator`, which delegates to the `nodes` array's iterator using the `yield*` syntax.

```js
const list = new LinkedList();

list.insertFirst(1);
list.insertFirst(2);
list.insertFirst(3);
list.insertLast(4);
list.insertAt(3, 5);

list.size;                      // 5
list.head.value;                // 3
list.head.next.value;           // 2
list.tail.value;                // 4
[...list.map(e => e.value)];    // [3, 2, 1, 5, 4]

list.removeAt(1);               // 2
list.getAt(1).value;            // 1
list.head.next.value;           // 1
[...list.map(e => e.value)];    // [3, 1, 5, 4]

list.reverse();
[...list.map(e => e.value)];    // [4, 5, 1, 3]

list.clear();
list.size;                      // 0
```
