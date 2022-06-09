---
title: Custom text selection
tags: visual
expertise: beginner
cover: blog_images/digital-nomad.jpg
firstSeen: 2018-02-25T15:14:39+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Changes the styling of text selection.

- Use the `::selection` pseudo-selector to style text within it when selected.

```html
<p class="custom-text-selection">Select some of this text.</p>
```

```css
::selection {
  background: aquamarine;
  color: black;
}

.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```
