---
title: :not selector
tags: visual
---

The `:not` pseudo selector is useful for styling a group of elements, while leaving the last (or specified) element unstyled.

```html
<ul class="css-not-selector-shortcut">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ul>
```

```css
.css-not-selector-shortcut {
  display: flex;
}

ul {
  padding-left: 0;
}

li {
  list-style-type: none;
  margin: 0;
  padding: 0 0.75rem;
}

li:not(:last-child) {
  border-right: 2px solid #d2d5e4;
}
```

#### Explanation

- `li:not(:last-child)` specifies that the styles should apply to all `li` elements except the `:last-child`.

#### Browser support

- https://caniuse.com/#feat=css-sel3
