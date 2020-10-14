---
title: truncateAtSpace
tags: string,beginner
---

Truncates a string up to the nearest space before a specified length.

- Checks if there string can be truncated
- Calculates the nearest space before or at the strings set limit.
- Appends a configurable ending (defaulting to `'...'`) to the truncated string.

```js
const truncateAtSpace = (string, characterLimit, ending = '...') => {
  const lastSpace = string.slice(0, characterLimit + 1).lastIndexOf(' ');
  return (string.length <= characterLimit) ? string : (lastSpace > 0) ? string.slice(0, lastSpace) + ending : ending;
}
```

```js
truncateAtSpace('This is a long excerpt that is far too long.', 25, '...'); // This is a long excerpt...
```
