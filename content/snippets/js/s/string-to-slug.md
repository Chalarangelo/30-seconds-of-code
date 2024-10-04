---
title: Convert a string to a URL-friendly slug using JavaScript
shortTitle: String to slug
language: javascript
tags: [string,regexp]
cover: collab-desk-2
excerpt: Learn how to easily convert any string to a URL-friendly slug, using regular expressions.
listed: true
dateModified: 2024-02-05
---

**SEO** is important, and one of the things that can help improve your website's SEO is having a URL that is easy to read and understand. This is where slugs come in.

A **slug** is a **URL-friendly version of a string**, typically used to identify a resource on a website. Conventionally, slugs are created by converting a string to **lowercase**, **removing special characters** and **replacing spaces with dashes**.

The first part is straightforward, using `String.prototype.toLowerCase()` and `String.prototype.trim()` to **lowercase** and tidy up the string. Then, you can use a regular expression to find any characters that are **not alphanumeric** (`\w`), **spaces** (`\s`) **or dashes** (`-`) and remove them, using `String.prototype.replace()`.

After that, you can **replace word separators**, such as spaces (`\s`) and underscores (`_`) and dashes (`-`), with a single dash (`-`), using `String.prototype.replace()` again.

Finally, we can use a regular expression to match one or more consecutive dashes (`-+`) at the **beginning and end of the string** and remove them, using `String.prototype.replace()` one more time.

```js
const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

slugify('Hello World!'); // 'hello-world'
```
