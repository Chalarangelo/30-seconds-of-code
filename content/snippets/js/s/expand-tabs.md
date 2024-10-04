---
title: Expand tabs into spaces
language: javascript
tags: [string,regexp]
cover: naming-conventions
excerpt: Convert tabs to spaces, allowing you to control the number of spaces each tab corresponds to.
listed: true
dateModified: 2024-08-08
---

Tabs vs. spaces is a long-standing debate in the programming community. I don't feel like getting into that debate, but I can help you convert tabs to spaces in JavaScript.

This entire exercise is a simple matter of **replacing each tab character** with a certain number of spaces. You can **control the number of spaces** each tab corresponds to via the `count` argument, allowing you to customize the output to your liking.

Simply put, using `String.prototype.replace()` with a **regular expression** and `String.prototype.repeat()` will do the trick. The regular expression `/\t/g` matches all tab characters in the string, which are then replaced with `count` spaces.

```js
const expandTabs = (str, count) => str.replace(/\t/g, ' '.repeat(count));

expandTabs('\t\tlorem', 3);
// '      lorem'
```
