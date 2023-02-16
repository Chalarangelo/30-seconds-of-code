---
title: Prepend function arguments
tags: function
cover: interior-6
firstSeen: 2018-01-24T14:40:16+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates a function that invokes `fn` with `partials` prepended to the arguments it receives.

- Use the spread operator (`...`) to prepend `partials` to the list of arguments of `fn`.

```js
const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);
```

```js
const greet = (greeting, name) => greeting + ' ' + name + '!';
const greetHello = partial(greet, 'Hello');
greetHello('John'); // 'Hello John!'
```
