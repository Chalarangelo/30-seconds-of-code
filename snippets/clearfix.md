---
title: Clearfix
tags: layout,beginner
---

Ensures that an element self-clears its children.

- Use the `:after` pseudo-element and apply `content: ''` to allow it to affect layout.
- Use `clear: both` to make the element clear past both left and right floats.
- For this technique to work properly, make sure there are no non-floating children in the container and that there are no tall floats before the clearfixed container but in the same formatting context (e.g. floated columns).
- **Note:** This is only useful if you are using `float` to build layouts. Consider using a more modern approach, such as the flexbox or grid layout.

```html
<div class="clearfix">
  <div class="floated">float a</div>
  <div class="floated">float b</div>
  <div class="floated">float c</div>
</div>
```

```css
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}

.floated {
  float: left;
  padding: 4px;
}
```
