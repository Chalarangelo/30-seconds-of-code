---
title: "Tip: Element at a specific point on the page"
shortTitle: Element at specific coordinates
type: tip
tags: javascript,browser
expertise: intermediate
author: chalarangelo
cover: blog_images/armchair-in-yellow.jpg
excerpt: Using `Document.elementFromPoint()` to easily get the element at a specific point on the page.
firstSeen: 2022-12-18T05:00:00-04:00
---


Figuring out where an element is located on the page with JavaScript can be tricky. Such needs often arise when working with pointer events or other forms of user input. As expected, such a common problem has many different viable solutions using well-established web APIs.

As I recently discovered, `Document.elementFromPoint()` provides a pretty interesting and straightforward solution. It allows you to get the element at a specific point on the page and it also works quite well with `iframe`s, too. Additionally, `Document.elementsFromPoint()` provides similar functionality, but returns an array of all the elements at a specific point on the page, in order of their z-index.

```js
// Returns the topmost element at the specified coordinates
const element = document.elementFromPoint(x, y);

// Returns an array of all the elements at the specified coordinates
const elements = document.elementsFromPoint(x, y);
```
