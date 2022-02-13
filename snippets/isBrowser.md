---
title: Environment is browser
tags: browser,node,intermediate
firstSeen: 2018-03-19T04:50:55+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Determines if the current runtime environment is a browser so that front-end modules can run on the server (Node) without throwing errors.

- Use `Array.prototype.includes()` on the `typeof` values of both `Window` and `Document` (globals usually only available in a browser environment unless they were explicitly defined), which will return `true` if one of them is `undefined`.
- `typeof` allows globals to be checked for existence without throwing a `ReferenceError`.
- If both of them are not `undefined`, then the current environment is assumed to be a browser.

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');
```

```js
isBrowser(); // true (browser)
isBrowser(); // false (Node)
```
