---
title: Ghost trick
tags: layout
---

Vertically centers an element in another.

```html
<div class="ghost-trick">
  <div class="ghosting"><p>Vertically centered without changing the position property.</p></div>
</div>
```

```css
.ghosting {
  height: 300px;
  background: #0ff;
}

.ghosting:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

p {
  display: inline-block;
  vertical-align: middle;
}
```

#### Explanation

- Use the style of a `:before` pseudo-element to vertically align inline elements without changing their `position` property.

#### Browser support

- https://caniuse.com/#feat=inline-block
