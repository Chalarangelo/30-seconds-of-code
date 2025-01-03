---
title: Change the order of arguments in a JavaScript function
shortTitle: Reorder function arguments
language: javascript
tags: [function]
cover: interior-11
excerpt: Learn how to reorder the arguments of a JavaScript function to fit your needs.
listed: true
dateModified: 2024-08-05
journeyId: js/functional-programming
---

While JavaScript's APIs have come a long way, they're often not as flexible as we'd like. Sometimes, you need to **change the order of arguments** in a function to fit your needs. This is also a fairly common problem when working with libraries or APIs that don't provide the exact signature you need. Luckily, rearranging function arguments is easy with a few lines of code.

## Flip function arguments

A very common need is to **make the first argument the last**. This is particularly useful when [currying a function](/js/s/currying) or when you need to [partially apply a function](/js/s/partially-apply-function).

You can easily achieve this by using a [**higher-order function**](/js/s/higher-order-functions) that takes a function as an argument and returns a new function that flips the arguments before calling the original function. In order to do so, you can use **argument destructuring** and a **closure** with variadic arguments.

```js
const flip = fn => (first, ...rest) => fn(...rest, first);

const parseInteger = flip(Number.parseInt);
parseInteger(8, '10'); // 8 (10 in base 8)

const parseIntegerBase16 = parseInteger.bind(null, 16);
parseIntegerBase16('10'); // 16 (10 in base 16)
```

> [!NOTE]
>
> `Number.parseInt()` is a very clear example of how JavaScript's APIs might be ill-optimized for **currying and functional programming**. It takes the base as the second argument, which is not very convenient when partially applying the function. Flipping the arguments makes it easier to use in a curried context.

## Rearrange function arguments

If you need yet more control over the order of a function's arguments, you can arrange them based on a **specific order**. This is particularly useful when you have a function with a **large number of arguments** and you want to make it more readable by rearranging them.

> [!TIP]
>
> While rearranging arguments can be useful, it's generally a bad idea to have **functions with over a few arguments**. If you find yourself needing to rearrange arguments often, consider **refactoring your code** to use **options objects** or other patterns that make the function signature more readable.

While this technique is a little more involved, **argument destructuring** is still handy, but it will take some more work to rearrange the arguments based on a specific order. `Array.prototype.map()` combined with the spread operator (`...`) and an **array of indexes** can help you achieve this.

```js
const rearg =
  (fn, indexes) =>
  (...args) =>
    fn(...indexes.map(i => args[i]));

const rearged = rearg(
  function (a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']
```
