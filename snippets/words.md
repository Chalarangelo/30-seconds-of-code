---
title: String to words
type: snippet
tags: [string,regexp]
cover: sea-view-2
dateModified: 2020-10-22T20:24:44+03:00
---

Converts a given string into an array of words.

- Use `String.prototype.split()` with a supplied `pattern` (defaults to non-alpha as a regexp) to convert to an array of strings.
- Use `Array.prototype.filter()` to remove any empty strings.
- Omit the second argument, `pattern`, to use the default regexp.

```js
const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);
```

```js
words('I love javaScript!!'); // ['I', 'love', 'javaScript']
words('python, javaScript & coffee'); // ['python', 'javaScript', 'coffee']
```
