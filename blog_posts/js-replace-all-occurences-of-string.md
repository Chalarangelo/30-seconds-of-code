---
title: Replace all occurrences of a string in JavaScript
shortTitle: Replace all occurrences of a string
type: story
tags: javascript,string,regexp
author: chalarangelo
cover: blog_images/blue-computer.jpg
excerpt: If you need to replace all occurrences of a string in JavaScript, you have a couple of options.
firstSeen: 2022-07-03T05:00:00-04:00
---

### String.prototype.replaceAll()

Modern JavaScript engines have a built-in method called `String.prototype.replaceAll()`. This method can be used to replace all occurrences of a string in another string with relative ease.

```js
const str = 'Hello World';

str.replaceAll('o', 'x'); // 'Hellx Wxrld'
```

Using `String.prototype.replaceAll()` is the recommended approach, as it's straightforward. If, however, you need to support older browsers, consider the option below.

### String.prototype.replace()

Before the introduction of `String.prototype.replaceAll()`, `String.prototype.replace()` was the method of choice for this sort of task. It's supported by all JavaScript engines, old and new and is very similar to `String.prototype.replaceAll()`.

While this method doesn't replace all occurrences of a string, it supports regular expressions. Knowing the string to be replaced, a regular expression can be created with the global (`'g'`) flag. Then, it can be passed to `String.prototype.replace()` to replace all occurrences of the string. The only issue here is that special characters need to be escaped, so that they are matched correctly. The [escapeRegExp snippet](/js/s/escape-reg-exp) comes in handy for this task.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const replaceAll = (str, subStr, newSubStr) =>
  str.replace(new RegExp(escapeRegExp(subStr), 'g'), newSubStr);

const str = 'Hello World';

replaceAll(str, 'o', 'x'); // 'Hellx Wxrld'
```
