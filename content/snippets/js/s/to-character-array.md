---
title: String to character array
type: snippet
language: javascript
tags: [string]
cover: waving-over-lake
dateModified: 2020-10-08
---

Converts a string to an array of characters.

- Use the spread operator (`...`) to convert the string into an array of characters.

```js
const toCharArray = s => [...s];
```

```js
toCharArray('hello'); // ['h', 'e', 'l', 'l', 'o']
```
