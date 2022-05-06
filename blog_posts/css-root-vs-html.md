---
title: What's the difference between :root and html in CSS?
shortTitle: :root vs html
type: story
tags: css,layout,selector
expertise: beginner
author: chalarangelo
cover: blog_images/tree-roots.jpg
excerpt: The CSS selectors used to target the root element of an HTML share some similarities, but they also have some differences.
firstSeen: 2022-05-22T05:00:00-04:00
---

CSS has two ways to target the root element of an HTML document - the `:root` pseudo-class and the `html` selector. While these are very similar to each other, they have a couple of differences you should know.

### Selector specificity

The `:root` selector has a higher specificity than the `html` selector. This is because `:root` is a pseudo-class selector, while `html` is a type selector.

```css
:root {
  background-color: red;
}

html {
  background-color: blue;
}

/* The HTML document's root element will have a red background-color.  */
```

### Targeting the root element

CSS can be used to style other types of documents, apart from HTML. This is where the `:root` element comes in to play, allowing you to style the root element of a document. This can be especially important when styling SVG documents, where the `html` selector will not work.
