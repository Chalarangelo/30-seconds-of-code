---
title: removeAccents
tags: string,beginner
---

Removes accents from strings.

- Use `String.prototype.normalize()` to convert the string to a normalized Unicode format.
- Use `String.prototype.replace()` to replace diacritical marks in the given Unicode range by empty strings.

```js
const removeAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
```

```js
removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'
```
