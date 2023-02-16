---
title: Are JavaScript closures inherently evil?
shortTitle: Closures and hidden state
type: story
tags: javascript,function,closure
author: chalarangelo
cover: silver-flat-screen
excerpt: Closures are used frequently, yet often misunderstood. Understanding them in depth is crucial to be able to write clean, maintainable code.
firstSeen: 2022-05-18T05:00:00-04:00
---

JavaScript closures are used frequently, yet often misunderstood. Understanding them in depth is crucial to be able to write clean, maintainable and bug-free code. We previously discussed what they are and how they work.

I strongly recommend you read the [previous article on closures](/articles/s/javascript-closures) if you haven't already. Instead of rehashing the same information, I would like to discuss the dangers of using closures and present my view on the topic.

### Hidden state

The main argument against closures is that of hidden state. Hidden state refers to obscuring the state of an object or, in this case, a function. The argument is that **internal mutable state** can create unpredictable behavior and unexpected results. Due to this, it's often said that hidden state is the root of all evil when it comes to programming.

While the argument in itself has some merit, I don't much like the generalization. There are perfectly valid cases where hidden state is expected, even practically a necessity. However, it's true that hidden state can create bugs and unmaintainable code.

An example of hidden state due to closures would be the one presented in my original introduction to the topic:

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

In this scenario, the `initCounter` function returns an object that contains hidden mutable state in the form of the `value` variable. Obviously, this is a very simple example, but `counter.get()` or `counter.increment()` in isolation would be considered non-deterministic expressions. There is no way to know the result of a method call like that without analyzing the surrounding code.

While this is not uncommon, it can get more complicated when shared state comes into play or many pieces of code are interacting with one another. The common remedy to this issue is to use **functional programming** and refactor the hidden mutable state into an argument or a shared global variable.

### Access to context

Not all closures are created equal. In fact, there are perfectly valid use-cases of closures that can make life a lot easier. For example, **accessing shared constants** should be considered pretty safe. After all, if you want truly pure functions you shouldn't even access globals and web APIs. This would be pretty impractical, as you would have to pass each global and API as an argument to the function.

Although reasonably safe, it's important to ensure that constants are initialized before being used and explicitly throw an error, if not. Additionally, adequate documentation of such closures will minimize friction and make sure other developers understand what's going on. Finally, providing an escape hatch, usually in the form of **default arguments** that can be overridden, should be considered if possible.

Here's an example of a simple random number generator, following these rules:

```js
const randomNumber = (limit = 100, random = Math.random) => random() * limit;

randomNumber(10); // 4.0
randomNumber(10, () => 0.2); // 2.0
```

Another benefit of these practices is that writing tests is a lot easier, as there's no confusion as to what needs to be mocked at any given time. In this example, we can easily replace `Math.random()` with any function that we want and know the resulting value.

### Conclusion

Closures in themselves are just another language feature that you have to wrap your head around. As a rule of thumb, use them sparingly, clarify your code's intent and provide escape hatches to reduce potential error surface.

When used correctly, they can be another tool in your arsenal. Yet, if you use them poorly, they can create some really nasty bugs or unmaintainable code. It takes time to get used to them and be able to spot anti-patterns before they become a problem.
