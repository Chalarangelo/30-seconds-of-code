---
title: Join the segments of a URL using JavaScript
shortTitle: Join URL segments
language: javascript
tags: [string,regexp]
cover: digital-nomad-2
excerpt: Learn how to join the segments of a URL and normalize the resulting URL using JavaScript.
listed: true
dateModified: 2024-08-10
---

When building URLs programmatically, it's often necessary to **join the segments of a URL** together. While seemingly simple, there are many nuances and edge cases you need to take care of. Luckily, approaching this step-by-step can help you build a robust solution.

The first step is simply joining the segments together. This can be done using the `Array.prototype.join()` method with a slash (`'/'`) as the separator. This will join the segments together, but it won't handle any normalization of the resulting URL.

**Normalizing the URL** can then be done via a series of `String.prototype.replace()` calls with various **regular expressions**. This will remove double slashes, add proper slashes for the protocol, remove slashes before parameters, combine parameters with `'&'`, and normalize the first parameter delimiter.

Putting everything together, you can create a function that joins the segments of a URL and normalizes the resulting URL.

```js
const joinURL = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

joinURL('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo');
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```
