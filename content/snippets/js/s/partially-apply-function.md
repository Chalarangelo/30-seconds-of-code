---
title: How can I partially apply a function in JavaScript?
shortTitle: Partial function application
language: javascript
tags: [function]
cover: rocky-beach
excerpt: Learn how to leverage partial application to improve the reusability of your JavaScript functions.
listed: true
dateModified: 2024-01-31
journeyId: js/functional-programming
---

Partial application is a technique used to **fix a number of arguments** to a function, producing another function of **smaller arity**. This is particularly useful in situations where you want to create a new function by pre-filling some of the arguments of an existing function.

Depending on the function you want to partially apply, you can either **prepend or append** the arguments to the function. Both techniques are fairly similar.

## Prepend arguments to a function

In order to partially apply a function by prepending arguments, you can use the spread operator (`...`) to prepend `partials` to the list of arguments of `fn`. Simply pass `partials` **before any other arguments** that are supplied.

```js
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);

const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greet, 'Hello');
greetHello('John'); // 'Hello John!'
```

## Append arguments to a function

Similarly, you can partially apply a function by appending arguments using the spread operator (`...`). You need only pass them to `fn` **after any other arguments** that are supplied.

```js
const partialRight = (fn, ...partials) => (...args) => fn(...args, ...partials);

const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetJohn = partialRight(greet, 'John');
greetJohn('Hello'); // 'Hello John!'
```
