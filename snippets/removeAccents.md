---
title: removeAccents
tags: string,beginner
---

Removes accents from strings.

- Converts the string to a normalized Unicode format.
- The diacritical marks are represented by an Unicode range and are replaced by empty strings.

```js
const removeAccents = string => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
```

```js
removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'
```
