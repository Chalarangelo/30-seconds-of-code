---
title: Append function arguments
tags: function,intermediate
firstSeen: 2018-01-24T14:40:16+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates a function that invokes `fn` with `partials` appended to the arguments it receives.

- Use the spread operator (`...`) to append `partials` to the list of arguments of `fn`.

```js
const partialRight = (fn, ...partials) => (...args) => fn(...args, ...partials);
```

```js
const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetJohn = partialRight(greet, 'John');
greetJohn('Hello'); // 'Hello John!'
```
