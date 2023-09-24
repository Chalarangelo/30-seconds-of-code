---
title: Environment is browser
type: snippet
language: javascript
tags: [browser]
cover: travel-mug-3
dateModified: 2020-10-20
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
