---
title: How can I implement a sleep function in JavaScript?
shortTitle: Sleep function
language: javascript
tags: [date,promises]
cover: sleepy-cat
excerpt: Learn how you can implement a delay function using `setTimeout()`, promises and `async`/`await`.
listed: true
dateModified: 2024-01-05
---

JavaScript **doesn't have a built-in sleep function**, which is probably a good idea considering how much trouble it could cause if used incorrectly. The closest equivalent is the `setTimeout()` function, but there are other, less common ways to implement a function that will pause execution for a specified amount of time.

## Using `setTimeout()`

JavaScript's `setTimeout()` sets a timer which **executes some code once the timer expires**. Only the code inside the `setTimeout()` callback will execute after the timer expires. This can lead to nesting issues, as well as code executing out of order if you are not careful.

```js
const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);

const greet = (name) => console.log(`Hello ${name}!`);
delay(greet, 300, 'world');
// Logs: Hello world! (after 300ms)
```

## Asynchronous version, using promises

Another way to go about implementing a `sleep()` function is to utilize the `async` and `await` keywords, a `Promise` and `setTimeout()`. Note that the resulting function is itself asynchronous.

```js
const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const greet = async () => {
  console.log('I will be with you in just a moment.');
  await sleep(300);
  console.log('Hello there!');
};
greet();
// Logs: I will be with you in just a moment.
// Logs: Hello there! (after 300ms)
```

> [!NOTE]
>
> The original version of this article demonstrated a synchronous version of this function, using `Date.prototype.getTime()`. As this is strongly discouraged and can lead to various issues, it has since been removed.
