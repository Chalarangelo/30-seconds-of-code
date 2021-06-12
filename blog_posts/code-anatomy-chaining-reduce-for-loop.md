---
title: Code Anatomy - For loops, array reduce and method chaining
type: story
tags: javascript,array,object,iterator
authors: chalarangelo
cover: blog_images/case-study.jpg
excerpt: There are many ways to iterate and transform array data in JavaScript. Learn how each one works and where you should use them.
---

### For loops

```js
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
let filePaths = [];

for (let file of files) {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    filePaths.push(filePath);
  }
}

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

- Any `for` loop can be used - [read more about the different JavaScript loops](/blog/s/javascript-for-in-for-of-foreach/).
- Less common nowadays, due to functional programming being more popular.
- Control over the iteration, such as skipping over elements or early `return`s.
- Resulting array needs to be declared beforehand, outside the loop.
- Uses `Array.prototype.push()` or the spread (`...`) operator to add elements.
- `O(N)` complexity, each element will be iterated over only once.

### Array reduce

```js
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files.reduce((acc, file) => {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    acc.push(filePath);
  }
  return acc;
}, []);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

- Uses `Array.prototype.reduce()` with an empty array as the initial value.
- More common nowadays, due to functional programming being more popular.
- Less control over the iteration, cannot skip elements or `return` early.
- Can be chained with other methods, if necessary.
- Uses `Array.prototype.push()` or the spread (`...`) operator to add elements.
- `O(N)` complexity, each element will be iterated over only once.

### Method chaining

```js
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files
  .map(file => file.trim())
  .filter(Boolean)
  .map(fileName => `~/cool_app/${fileName}`);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

- Uses `Array.prototype.map()` and `Array.prototype.filter()`.
- More common nowadays, due to functional programming being more popular.
- Less control over the iteration, cannot skip elements or `return` early.
- Declarative, easier to read and refactor, chain can grow as necessary.
- Does not use `Array.prototype.push()` or the spread (`...`) operator.
- `O(cN)` complexity, `c` iterations per element, (`c`: length of the chain).
