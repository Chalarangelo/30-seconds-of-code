---
title: Generate Unique ID in JavaScript
type: snippet
language: javascript
tags: [javascript]
cover: laptop-with-code
dateModified: 2023-09-25
---

This snippet demonstrates how to generate a unique identifier in JavaScript using a combination of the current timestamp and a random string.

- `Date.now()` retrieves the current timestamp in milliseconds.
- `.toString(36)` converts the timestamp to a base-36 string, including digits 0-9 and lowercase letters a-z.
- `Math.random().toString(36).substr(2)`generates a random string in base-36 format, excluding the "0." at the beginning.
- The resulting timestamp and random string are concatenated to form a unique ID.

```js
const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
console.log(uniqueId);
```

```js
// Generates a unique ID like 'lmyw30kxy3awo94bunq'
const generatedId = uniqueId();
```
