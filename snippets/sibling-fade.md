---
title: Sibling fade
tags: interactivity
expertise: intermediate
firstSeen: 2018-03-05T10:17:23+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
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
