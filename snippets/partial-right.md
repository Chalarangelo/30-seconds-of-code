---
title: Append function arguments
type: snippet
tags: [function]
cover: jars-on-shelf-2
dateModified: 2020-09-15T16:28:04+03:00
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
