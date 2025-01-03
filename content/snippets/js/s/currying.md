---
title: Understanding JavaScript currying
shortTitle: Currying
language: javascript
tags: [function,recursion]
cover: tulips-and-reeds
excerpt: Currying is a process that transforms a function that takes multiple arguments into a series of functions that each take a single argument.
listed: true
dateModified: 2023-12-29
journeyId: js/functional-programming
---

Functional programming often makes use of **currying**, which is a process that transforms a **function that takes multiple arguments** into a **series of functions that each take a single argument**. This makes code more flexible and reusable.

## Currying a function

Creating a `curry()` function can be tricky in some cases. For the sake of simplicity, let's start with a function whose **number of arguments** is **fixed**. In that case, we will use `Function.prototype.length` to determine the number of arguments the function accepts.

Knowing the number of arguments needed to call the function, we will then use **recursion** to create a curried function that will call the original function once the number of arguments provided is sufficient. If not, it will return a **new function** that will accept the remaining arguments.

```js
const curry = (fn) => {
  const curried = (...args) => (
    args.length >= fn.length
      ? fn(...args)
      : (...rest) => curried(...args, ...rest)
  );
  return curried;
};

const add = (x, y) => x + y;
const curriedAdd = curry(add);
curriedAdd(1)(2); // 3
```

### Working with variadic functions

**Variadic functions** are functions that accept a variable number of arguments. For example, `Math.min()` is a variadic function that returns the smallest of zero or more numbers.

> [!NOTE]
>
> `Math.min.length` is 2, which weakly signals that it's designed to handle at least two parameters. This, however, isn't in line with **user-defined** variadic function.

Our previous implementation will simply not work. Indeed, `Function.prototype.length` will return `0` for variadic functions. In order to circumvent this issue, we should be able to define the **arity** of the function we want to curry. This way, the curried function will know when to stop expecting further arguments and call the original function.

On top of this change, we can also expect **some arguments to be provided upfront**. This is useful when we want to **partially apply a function**. Instead of using the previous approach that relied on closures, we can use `Function.prototype.bind()` to return a curried function that expects the rest of the arguments.

Putting everything together, we arrive at a more robust and shorter, albeit a little less readable, implementation.

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```

## Uncurrying a function

_What about the opposite? How can we uncurry a function?_ We will still need to know the arity of the function, but this time, we will use `Array.prototype.reduce()` to call each subsequent curry level of the function. If the number of arguments isn't sufficient, we will throw an error. Otherwise, we will call the function with the proper amount of arguments, using `Array.prototype.slice()`.

```js
const uncurry = (fn, arity = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (arity> args.length) throw new RangeError('Arguments too few!');
  return next(fn)(args.slice(0, arity));
};

const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6
```

