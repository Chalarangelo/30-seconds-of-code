---
title: "Tip: The order of then and catch matters"
shortTitle: The order of then and catch matters
type: tip
tags: javascript,function,promise
expertise: intermediate
author: chalarangelo
cover: blog_images/blue-sunrise.jpg
excerpt: Messing up the order of chained `then` and `catch` methods in JavaScript promises can result in all sorts of problems. Here's a short primer on the subject.
firstSeen: 2021-04-26T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Many if not most promise-related headaches come from incorrectly ordered `Promise.prototype.then()` and `Promise.prototype.catch()` methods. The order in which these methods are chained to a promise can lead to very different behaviors. Let's take a look at a very simple example:

```js
const myPromise = () => Promise.reject('Oops!');
const logger = data => console.log(data);
const identity = data => data;

myPromise().catch(identity).then(logger); // LOGS: Oops!
myPromise().then(logger).catch(identity); // Nothing is logged
```

As you can see from this example, swapping the `catch()` and `then()` methods results in entirely different behavior, even though the promise has the same result. This is due to the fact that each chained method will result itself in a promise. This means that the first one will pass its result to the second, the second to the third and so on and so forth. While this might seem obvious when looking at an example like this one, many times it's overlooked and can result in hard to debug issues. This is especially true when the promise chain is long and complicated.

So, next time you are working with promises, try to think of `then()` and `catch()` methods in terms of promise chaining and remember that order matters!
