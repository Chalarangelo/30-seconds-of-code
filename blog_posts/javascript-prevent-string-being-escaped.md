---
title: "Tip: Prevent a string from being escaped in JavaScript"
type: tip
tags: javascript,string
authors: chalarangelo
cover: blog_images/glass-blowing.jpg
excerpt: Strings in JavaScript can be escaped in various ways. But what if you need to prevent a string from being escaped? Here's a handy trick for that.
---

By default, when JavaScript sees an escape character (`\`), it will escape the character after it. However, there are cases where you might not want this behavior (e.g. when you want to store a Windows path as a string). For these cases, you can use a template literal and the `String.raw()` tag function:

```js
const path = `C:\web\index.html`; // 'C:web.html'

const unescapedPath = String.raw`C:\web\index.html`; // 'C:\web\index.html'
```

**Image credit:** [Kym MacKinnon](https://unsplash.com/@vixenly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
