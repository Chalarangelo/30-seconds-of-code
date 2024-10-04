---
title: Strip HTML tags using JavaScript
shortTitle: Strip HTML tags
language: javascript
tags: [string,regexp]
cover: coffee-phone-tray-3
excerpt: Use a regular expression to remove HTML/XML tags from a string.
listed: true
dateModified: 2024-03-15
---

I've often found myself in need of stripping HTML tags from a string. This is a common task when working with web content, and it's often necessary to remove tags to get the raw text.

All you really need is a carefully crafted **regular expression**, such as `/\<[^>]*\>/g`, to match and remove all HTML tags from a string. This expression matches the **opening bracket** of a tag, followed by **any number of characters** that are not the closing bracket, and finally the **closing bracket**. The `g` flag makes sure that all matches are removed, not just the first one.

You can then easily combine this regular expression with `String.prototype.replace()` to remove all HTML tags from a string. As a bonus, this also works for XML tags, which might also come in handy from time to time.

```js
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'
```
