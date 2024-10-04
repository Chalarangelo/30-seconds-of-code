---
title: Open all links in an HTML document in a new tab
shortTitle: Open all links in a new tab
language: html
tags: [link]
cover: paper-card
excerpt: Using an HTML element, you can easily make all links in your document open in a new tab. Learn how with this quick tip.
listed: true
dateModified: 2024-03-16
---

One of the lesser used HTML elements, in my experience, is the `<base>` element. The purpose of this element is to specify a **base URL for all relative URLs in a document**. This means that if you have a bunch of links in your document, you can use the `<base>` element to specify that all of those links should have a base `href` or `target` attribute, or both.

Leveraging this element, we can set the `target` attribute to `_blank` to make all links in the document **open in a new tab**. Simply adding a line to the `<head>` of your HTML document will do the trick.

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_blank">
  </head>
  <body>
    <a href="https://www.example.com">Example</a>
  </body>
</html>
```

> [!WARNING]
>
> There are some **security risks** involved with opening links in a new tab. Be sure to read the [tip on safeguarding `target="_blank"` links](/html/s/target-blank) to learn how to protect your users from malicious websites.
