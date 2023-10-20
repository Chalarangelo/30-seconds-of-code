---
title: Button shrink animation
type: snippet
language: css
tags: [animation]
cover: clay-pot-horizon
dateModified: 2021-05-24
---

Creates a shrink animation on hover.

- Use an appropriate `transition` to animate changes to the element.
- Use the `:hover` pseudo-class to change the `transform` to `scale(0.8)`, shrinking the element when the user hovers over it.

```html
<button class="button-shrink">Submit</button>
```

```css
.button-shrink {
  color: #65b5f6;
  background-color: transparent;
  border: 1px solid #65b5f6;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.button-shrink:hover {
  transform: scale(0.8);
}
```
