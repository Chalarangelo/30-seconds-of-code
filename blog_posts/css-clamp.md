---
title: "Tip: Use clamp() in CSS for responsive typography"
shortTitle: CSS clamp()
type: tip
tags: css,visual
author: chalarangelo
cover: strawberries
excerpt: Implement responsive typography with the CSS clamp() function.
firstSeen: 2022-12-28T05:00:00-04:00
---

Responsive typography has been in fashion for a while now, but some developers find it hard to implement. This is usually due to confusing algebraic formulas or complex hacks. Luckily, CSS has introduced the `clamp()` function, which makes it easy to create responsive typography with a single line of code. All you need to do is set the minimum, maximum, and preferred value and the browser will do the rest.

```css
h2 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

For a more complex example, take a look at the [Fluid typography snippet](/css/s/fluid-typography).
