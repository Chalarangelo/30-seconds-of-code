---
title: slugify
tags: function,intermediate
---

Convert a string to a URL-friendly slug.

- Make the string lowercase and remove leading or trailing whitespace.
- Remove all characters that are not words, whitespace or hyphens.
- Replace whitespace with a single hyphen (`-`).
- Remove any leading or trailing hyphens.

```js
const slugify = (string) => {
  const slug = string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug;
};
```

```js
slugify('Hello World!'); // 'hello-world'
```
