---
title: "Tip: Perfect nested border radius in CSS"
shortTitle: Perfect nested border radius in CSS
type: tip
tags: css,visual
expertise: beginner
author: chalarangelo
cover: blog_images/rocky-beach-waves.jpg
excerpt: Nesting elements with rounded borders can look very wrong if not done correctly. Here's a quick tip on how to do it right.
firstSeen: 2022-04-03T05:00:00-04:00
---

Nesting elements with rounded borders can look very wrong if not done correctly. Luckily, there's a simple math trick to make it look right. All you need to do is **calculate the border radius of one of the elements and the distance between them**. The border radius of the outer element should be equal to the sum of the border radius of the inner element and the distance between the two elements. This can be mathematically expressed as `innerRadius + distance = outerRadius` or more tersely `R1 + D = R2`.

![Nested border radius formula](./blog_images/border-radius.png)

Let's take a look at a simple CSS example. Say we want to style two nested boxes with rounded borders. The outer box has a `border-radius` of `24px` and a `padding` of `8px`. Using the previous formula, we can deduce that the inner box should have a `border-radius` of `16px`.

```css
.outer {
  border-radius: 24px;
  padding: 8px;
}

.inner {
  border-radius: 16px;
}
```
