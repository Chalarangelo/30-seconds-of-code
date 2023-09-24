---
title: Strip HTML tags
type: snippet
language: javascript
tags: [string,regexp]
cover: coffee-phone-tray-3
dateModified: 2020-09-15
---

Removes HTML/XML tags from string.

- Use a regular expression to remove HTML/XML tags from a string.

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
```

```js
stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```
