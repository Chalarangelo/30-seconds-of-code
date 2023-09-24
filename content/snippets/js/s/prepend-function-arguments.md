---
title: Prepend function arguments
type: snippet
language: javascript
tags: [function]
cover: interior-6
dateModified: 2020-09-15
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
