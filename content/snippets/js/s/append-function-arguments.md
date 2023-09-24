---
title: Append function arguments
type: snippet
language: javascript
tags: [function]
cover: rocky-beach
dateModified: 2020-09-15
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
