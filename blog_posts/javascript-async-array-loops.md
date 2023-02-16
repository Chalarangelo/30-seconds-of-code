---
title: Asynchronous array loops in JavaScript
shortTitle: Asynchronous array loops
type: story
tags: javascript,array,function,promise
author: chalarangelo
cover: sunflowers
excerpt: Asynchronously looping over arrays in JavaScript comes with a few caveats you should watch out for.
firstSeen: 2021-05-17T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Asynchronous operations seem to trip up a lot of developers. This is especially true when combined with looping over arrays, as there are some caveats that come with each option available.

### For loops

Combining `async` with a `for` (or a `for...of`) loop is possibly the most straightforward option when performing asynchronous operations over array elements. Using `await` inside a `for` loop will cause the code to stop and wait for the asynchronous operation to complete before continuing. This means that all promises will be run sequentially.

```js
const asyncUppercase = item =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(item.toUpperCase()),
      Math.floor(Math.random() * 1000)
    )
  );

const uppercaseItems = async () => {
  const items = ['a', 'b', 'c'];
  for (item of items) {
    const uppercaseItem = await asyncUppercase(item);
    console.log(uppercaseItem);
  }

  console.log('Items processed');
};

uppercaseItems();
// LOGS: 'A', 'B', 'C', 'Items processed'
```

### Promises

`Promise.all()` provides another option for asynchronous loops over arrays. The main difference with the previous one is that `Promise.all()` executes all asynchronous operations in parallel. This means that promises will execute out of order, which might be an issue in some cases. Most often than not, this is my preferred solution as it's quite uncommon to want promises to execute sequentially.

```js
const asyncUppercase = item =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(item.toUpperCase()),
      Math.floor(Math.random() * 1000)
    )
  );

const uppercaseItems = () => {
  const items = ['a', 'b', 'c'];
  return Promise.all(
    items.map(async item => {
      const uppercaseItem = await asyncUppercase(item);
      console.log(uppercaseItem);
    })
  ).then(() => {
    console.log('Items processed');
  });
};
// LOGS: 'A', 'C', 'B', 'Items processed'
```

### Array methods

Unfortunately, array methods such as `Array.prototype.forEach()` do not work well with `async`/`await`. The only viable solution is to use `Promise.all()` as shown in the previous example. Using an `async` callback with `Array.prototype.forEach()` will result in the rest of the code executing and the asynchronous operations not being awaited for.

```js
const asyncUppercase = item =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(item.toUpperCase()),
      Math.floor(Math.random() * 1000)
    )
  );

const uppercaseItems = async () => {
  const items = ['a', 'b', 'c'];
  await items.forEach(async item => {
    const uppercaseItem = await asyncUppercase(item);
    console.log(uppercaseItem);
  });

  console.log('Items processed');
};

uppercaseItems();
// LOGS: ''Items processed', 'B', 'A', 'C'
```
