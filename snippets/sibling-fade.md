---
title: Sibling fade
tags: interactivity,intermediate
---

Fades out the siblings of a hovered item.

- Use a `transition` to animate changes to `opacity`.
- Use the `:hover` and `:not` pseudo-class selectors to change the `opacity` of all elements except for the one the mouse is over to `0.5`.

```html
<div class="sibling-fade">
  <span>Item 1</span> <span>Item 2</span> <span>Item 3</span>
  <span>Item 4</span> <span>Item 5</span> <span>Item 6</span>
</div>
```

```css
span {
  padding: 0 16px;
  transition: opacity 0.3s;
}

.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```
