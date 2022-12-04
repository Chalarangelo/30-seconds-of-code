---
title: "Tip: Select any link with CSS"
shortTitle: "CSS :any-link pseudo-class"
type: tip
tags: css,visual,interactivity
author: chalarangelo
cover: blog_images/round-leaves.jpg
excerpt: You can use a CSS pseudo-class selector to style all links in a page, without worrying if they have been visited or not.
firstSeen: 2022-03-06T05:00:00-04:00
---

Styling links with CSS is considered straightforward, with most developers using the `:link` and `:visited` pseudo-classes. While this solution is very common, there's a less verbose alternative in the form of the [`:any-link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:any-link) pseudo-class. This pseudo-class selects all links, regardless of whether they have been visited or not. Thus, it acts as a catch-all for all links on the page.

```css
:any-link {
  color: #0444f6;
}
```

One important note is that using `:any-link` is different to using the `[href]` attribute selector. The `:any-link` pseudo-class does not select empty links, whereas the `[href]` attribute selector does.
