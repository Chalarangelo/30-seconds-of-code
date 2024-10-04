---
title: Escape a regular expression in JavaScript
shortTitle: Escape RegExp
language: javascript
tags: [string,regexp]
cover: frog-blue-flower
excerpt: Learn how to escape a string to use in a regular expression.
listed: true
dateModified: 2024-05-29
---

Regular expressions are a powerful tool for pattern matching and string manipulation. However, when you need to use a string as a regular expression, you need to **escape special characters** to avoid syntax errors.

Luckily, escaping a string for use in a regular expression is not hard, but it requires, you guessed it, a regular expression! By using the `String.prototype.replace()` method, you can escape special characters in a string.

The **regular expression** that you can then use to escape special characters is `/[.*+?^${}()|[\]\\]/g`. This regular expression matches all the special characters used in regular expressions. Then, each match is replaced with the **escaped version of the character** using `\\$&`.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

escapeRegExp('(test)'); // \\(test\\)
```
