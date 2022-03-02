---
title: What are JavaScript closures?
type: question
tags: javascript,function,closure
expertise: intermediate
author: chalarangelo
cover: blog_images/cherry-trees.jpg
excerpt: Learn and understand closures, a core concept in JavaScript programming, and level up your code.
firstSeen: 2020-08-04T12:40:08+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Closures are a JavaScript concept that comes up quite a lot, especially during interviews. While they sound confusing, they are not all that complicated and you have probably already used them in your code regardless of your expertise level. Let's start with what a closure is:

> You have a closure when a function accesses variables defined outside of it.

That doesn't sound too complicated. Let's see an example:

```js
const items = [
  { id: 1, title: 'First' },
  { id: 2, title: 'Second' },
  { id: 3, title: 'Final' }
];
const matcher = /^F/;
const filteringFn = x => matcher.test(x.title);
items.filter(filteringFn); // [{ id: 1, title: 'First' }, { id: 3, title: 'Final' }]
```

The above example defines some data to play around with, a regular expression to use for matching and a function, `filteringFn` that is then used in `Array.prototype.filter()` as the filtering function. If you look closely at `filteringFn`, you'll notice it uses a variable defined outside of, namely `matcher`. This is a closure.

Let's look at another, more complex example:

```js
const initCounter = (start = 0) => {
  let value = start;
  return {
    get: () => value,
    increment: () => ++value,
    decrement: () => --value,
    reset: () => value = start
  };
}

const counter = initCounter(5);
counter.get(); // 5
counter.increment(); // 6
counter.increment(); // 7
counter.decrement(); // 6
counter.reset(); // 5
```

In this example, we define a function, `initCounter`, that returns an object, whose properties are functions. All of the returned object's properties use closures to manipulate `initCounter`'s `value` variable in some way. The obvious benefit of this approach is that if you want to define multiple counters via `initCounter`, you do not need to create multiple `value` instances all over the place, but they are safely encapsulated by the returned object, using closures.

Using closures, as shown in the example above, can help make your code more usable and maintainable, while allowing you to separate concerns and create abstractions as necessary.
