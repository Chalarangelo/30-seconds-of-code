---
title: How can I implement a sleep function in JavaScript?
type: question
tags: javascript,date,promise
authors: chalarangelo
cover: blog_images/sleepy-cat.jpg
excerpt: Learn all the different ways you can implement a `sleep()` function in JavaScript.
---

JavaScript does not come with a `sleep()` function out of the box and that is probably a good idea considering the environments where it runs and the trouble such a function could cause if used incorrectly. The closest equivalent of such a function is `setTimeout`, however there are other, less common ways to implement a function that will freeze the current thread for a specified amount of time.

### setTimeout

JavaScript's `setTimeout` sets a timer which executes a function or specified piece of code once the timer expires. Only the code inside the `setTimeout` callback will execute after the timer expires, which can lead to nesting issues, as well as code executing out of order if you are not careful.

```js
const printNums = () => {
  console.log(1);
  setTimeout(() => console.log(2), 500);
  console.log(3);
};

printNums(); // Logs: 1, 3, 2 (2 logs after 500ms)
```

### Synchronous version

While strongly discouraged, `Date.prototype.getTime()` can be used inside a `while` loop to pause execution for a set amount of time. You can easily define a synchronous `sleep()` function like this:

```js
const sleepSync = (ms) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end) { /* do nothing */ }
}

const printNums = () => {
  console.log(1);
  sleepSync(500);
  console.log(2);
  console.log(3);
};

printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)
```

### Asynchronous version

A less intrusive way to go about implementing a `sleep()` function is to utilize the `async` and `await` keywords added in JavaScript ES6, a `Promise` and `setTimeout()`. Note that the resulting function must be executed in an `async` function and has to be called with `await`:

```js
const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const printNums = async() => {
  console.log(1);
  await sleep(500);
  console.log(2);
  console.log(3);
};

printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)
```
