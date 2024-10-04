---
title: Check, compact or remove whitespaces in a JavaScript string
shortTitle: Check, compact or remove whitespaces
language: javascript
tags: [string,regexp]
cover: tropical-bike
excerpt: Learn how to work with whitespaces in JavaScript strings, using these simple yet powerful regular expression techniques.
listed: true
dateModified: 2024-01-27
---

Whitespace refers to characters which are used to provide horizontal or vertical **space between other characters**. In regular expressions, `\s` is used to **match any whitespace character**. Using this knowledge, we can create a variety of useful functions to work with whitespace in JavaScript strings.

## Check if a string contains any whitespace

You can use `RegExp.prototype.test()` with a simple regular expression (`/\s/`) to check if at least one whitespace character is present in the given string.

```js
const containsWhitespace = str => /\s/.test(str);

containsWhitespace('lorem'); // false
containsWhitespace('lorem ipsum'); // true
```

## Remove whitespaces from a string

To remove whitespaces from a string, you can simply use `String.prototype.replace()`. For the regular expression to match all whitespace characters, you can use the **global flag** (`g`). You should also use the `+` **quantifier** to match one or more whitespace characters for replacement.

```js
const removeWhitespace = str => str.replace(/\s+/g, '');

removeWhitespace('Lorem ipsum.\n Dolor sit amet. ');
// 'Loremipsum.Dolorsitamet.'
```

## Compact whitespaces in a string

Similar to the previous example, you can use `String.prototype.replace()` with a regular expression to replace all occurrences of 2 or more whitespace characters with a single space. You can use the `{2,}` **quantifier** to match 2 or more whitespace characters and, again, the **global flag** (`g`) to match all occurrences.

```js
const compactWhitespace = str => str.replace(/\s{2,}/g, ' ');

compactWhitespace('Lorem    Ipsum'); // 'Lorem Ipsum'
compactWhitespace('Lorem \n Ipsum'); // 'Lorem Ipsum'
```
