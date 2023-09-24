---
title: Recommended HTML head icon tags
shortTitle: HTML favicons template
type: story
language: html
tags: [metadata,head]
author: chalarangelo
cover: boutique-home-office-3
excerpt: Ensure your HTML documents have a proper favicon by including these lines in your `<head>` element.
dateModified: 2023-01-24
---

Over the years, I've seen many different and often conflicting guidelines about favicons and which tags are essential. Nowadays, I think you can get away with a very **minimal set of meta tags** and tailor them to your needs as you go. Here's my recommendation for the bare minimum you should include in your `<head>` element:

```html
<head>
  <link rel="icon" sizes="192x192" href="favicon.png">
  <link rel="apple-touch-icon" href="favicon.png">
  <link rel="mask-icon" href="favicon.svg" color="#000000">
</head>
```

By creating a single 192x192 PNG asset, you can cover almost all modern devices and browsers, without too much hassle. If you want to go the extra mile, you can include a few more quite easily. Simply downscale the image and include more `rel="icon"` meta tags with different `sizes` attributes.
