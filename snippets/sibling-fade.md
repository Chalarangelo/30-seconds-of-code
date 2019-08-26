---
title: Sibling fade
tags: interactivity
---

Fades out the siblings of a hovered item.

```html
<div class="sibling-fade">
  <span>Item 1</span> <span>Item 2</span> <span>Item 3</span> <span>Item 4</span>
  <span>Item 5</span> <span>Item 6</span>
</div>
```

```css
span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}

.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```

#### Explanation

1. `transition: opacity 0.2s` specifies that changes to opacity will be transitioned over 0.2 seconds.
2. `.sibling-fade:hover span:not(:hover)` specifies that when the parent is hovered, select any `span` children that are not currently being hovered and change their opacity to `0.5`.

#### Browser support

- https://caniuse.com/#feat=css-sel3
- https://caniuse.com/#feat=css-transitions



