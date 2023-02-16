---
title: "Tip: Prevent a string from being escaped in JavaScript"
shortTitle: Prevent string escaping
type: tip
tags: javascript,string
author: chalarangelo
cover: glass-blowing
excerpt: Strings in JavaScript can be escaped in various ways. But what if you need to prevent a string from being escaped? Here's a handy trick for that.
firstSeen: 2021-06-12T19:30:41+03:00
lastUpdated: 2021-06-17T12:00:00+03:00
---

By default, when JavaScript sees an escape character (`\`), it will escape the character after it. However, there are cases where you might not want this behavior (e.g. when you want to store a Windows path as a string). For these cases, you can use a template literal and the `String.raw()` tag function:

```js
const path = `C:\web\index.html`; // 'C:web.html'

const unescapedPath = String.raw`C:\web\index.html`; // 'C:\web\index.html'
```
