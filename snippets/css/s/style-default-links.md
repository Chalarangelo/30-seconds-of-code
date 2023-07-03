---
title: "Tip: Style links without a class"
shortTitle: Style default links
type: tip
language: css
tags: [visual,interactivity]
author: chalarangelo
cover: citrus-drink
excerpt: A short summary of your story up to 180 characters long.
dateModified: 2022-11-23T05:00:00-04:00
---

When styling injected or generated HTML content, you might not have access to the classes or IDs of the elements you want to style. This can become especially annoying when dealing with link elements. Luckily, you can use the `:not()` selector with an appropriate attribute selector to check for the absence of a class and style links accordingly.

```css
a[href]:not([class]) {
  color: #0077ff;
  text-decoration: underline;
}
```

As a bonus tip, you can use [the previous tip about selecting any link](/css/s/select-any-link) to further enhance this solution.
