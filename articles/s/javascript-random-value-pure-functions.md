---
title: Using random values with pure functions
shortTitle: Pure functions & randomness
type: story
tags: [javascript,function,random,testing]
author: chalarangelo
cover: do-more-computer
excerpt: Randomness and pure functions don't seem to go hand in hand. But where there's a will, there's a way.
dateModified: 2022-06-19T05:00:00-04:00
---

Working with random values can create code that's hard to test. Usually, the remedy to such issues is to use [pure functions](/articles/javascript-pure-functions). A pure function is a function that always returns the same value given the same input. As they do not have side effects and their return value is predictable, testing pure functions is much easier.

```js
// An impure function that returns a random value
const getNumber = (min = 0, max = 1) =>
  Math.max(Math.min(Math.random(), max), min);
```

From the definition alone, pure functions and random values don't sound very compatible. After all, randomness inherently means unpredictability. The naive approach would be to move the randomness outside of the function and pass the generated value as an argument to it. This would only hide the issue without fixing it let alone require a lot of refactoring to work.

The approach to use the function's arguments is on the right track, though. The key is that function arguments can be omitted, allowing us to specify default values for them. This allows us to pass a random value as an argument to the function, and the function will use the default value if the argument is omitted.

But how can we actually pass a random value as a default argument to a function? Luckily for us, JavaScript defers evaluation of function arguments to the time of function invocation. This means that we can use `Math.random()` to generate a random value, and pass it as the default argument to the function.

```js
// A pure function that returns a random value
const getNumber = (min = 0, max = 1, num = Math.random()) =>
  Math.max(Math.min(num, max), min);
```

By making this simple change, you can avoid a lot of headaches for you and your team. Using a function such as `Math.random()` as the default argument will require minimal refactoring and make your code easier to test.
