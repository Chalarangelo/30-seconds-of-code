---
title: ucfirst
tags: string,beginneer
---

Converts the first character to an uppercase character

- pick the first character, uppercase it, and append the rest of the string to it.

```js
const ucfirst = str =>
  str &&
  str.charAt(0).toUpperCase() + input.slice(1);
```

```js
ucfirst('england'); // 'England'
ucfirst(`john ${ucfirst('doe')`); // 'John Doe'
```
