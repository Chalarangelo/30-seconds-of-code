---
title: Why should line-height be unitless in CSS?
shortTitle: Unitless line height
type: tip
tags: css,layout,visual
expertise: intermediate
author: chalarangelo
cover: blog_images/gold-typewriter.jpg
excerpt: You might have heard that `line-height` should be unitless, but do you know why?
firstSeen: 2022-11-27T05:00:00-04:00
---

I've often heard that `line-height` should always be **unitless**. In my earlier coding years, I didn't question it much, but lately I've come to wonder why that is. In my mind `1.5` and `1.5em` should produce the same result, right? Turns out, they don't.

There's a **subtle difference** between the two and it has to do with the fact that `line-height` is an inherited property. A unitless value will be inherited as-is, meaning the actual value will be recalculated for each element, accounting for the `font-size` of the element. However, a `line-height` with any unit will be calculated once and then inherited as a fixed value. This can cause vastly different results, especially if the declaration is in the `body` element or something similar.

Speaking of the `body` element, it could be a good idea to define your base `line-height` as a unitless value there to minimize repetition:

```css
body {
  line-height: 1.5;
}
```

So, is `line-height` with units prohibited and should we always use unitless values? Not necessarily. Factors such as codebase conventions, design systems and personal preference play a role here. For example, maintaining an exact, perfect vertical rhythm with unitless `line-height` values can be a bit tricky. In such cases, using `line-height` with units can be a good idea, but remember to **be consistent** to avoid headaches.
