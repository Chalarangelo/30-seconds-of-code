---
title: Recommended minimum HTML head
shortTitle: HTML head template
type: story
tags: webdev,html,browser
author: chalarangelo
cover: boutique-home-office-1
excerpt: Ensure your HTML documents are properly structured by including these lines in your `<head>` element.
firstSeen: 2023-01-18T05:00:00-04:00
---

An essential part of an HTML document is the `<head>` element, which contains metadata about the document. Some vital information, such as the document's title and character encoding are stored in the `<head>` element. It's also where you can include links to external resources such as CSS stylesheets and JavaScript files.

More often than not, this sort of metadata can grow in complexity with time. However, there are a few important things that should never be omitted. Here's a list of the bare minimum you should include in your `<head>` element:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title</title>
  <meta name="description" content="Page description. No longer than 155 characters.">
</head>
```

- The `charset` meta tag tells the browser what **character encoding** to use when rendering the document.
- The `viewport` meta tag tells the browser how to render the page on **mobile devices**.
- The `title` element is used by search engines to display the page's **title** in search results.
- The `description` meta tag is used by search engines to display a **short description** of the page in search results.
