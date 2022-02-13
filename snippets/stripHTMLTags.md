---
title: Strip HTML tags
tags: string,regexp,beginner
firstSeen: 2018-01-26T14:17:29+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Removes HTML/XML tags from string.

- Use a regular expression to remove HTML/XML tags from a string.

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
```

```js
stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```
