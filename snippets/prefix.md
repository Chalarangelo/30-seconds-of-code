---
title: Prefix CSS property
tags: browser
expertise: intermediate
cover: blog_images/cancel-typographer.jpg
firstSeen: 2018-03-08T15:22:54+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Prefixes a CSS property based on the current browser.

- Use `Array.prototype.findIndex()` on an array of vendor prefix strings to test if `Document.body` has one of them defined in its `CSSStyleDeclaration` object, otherwise return `null`.
- Use `String.prototype.charAt()` and `String.prototype.toUpperCase()` to capitalize the property, which will be appended to the vendor prefix string.

```js
const prefix = prop => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
  const i = prefixes.findIndex(
    prefix =>
      typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !==
      'undefined'
  );
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null;
};
```

```js
prefix('appearance');
// 'appearance' on a supported browser, otherwise 'webkitAppearance', 'mozAppearance', 'msAppearance' or 'oAppearance'
```
