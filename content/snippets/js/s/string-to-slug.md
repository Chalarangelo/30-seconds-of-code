---
title: String to slug
type: snippet
language: javascript
tags: [string,regexp]
cover: collab-desk-2
dateModified: 2020-10-04
---

Converts a string to a URL-friendly slug.

- Use `String.prototype.toLowerCase()` and `String.prototype.trim()` to normalize the string.
- Use `String.prototype.replace()` to replace spaces, dashes and underscores with `-` and remove special characters.

```js
const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
```

```js
slugify('Hello World!'); // 'hello-world'
```
