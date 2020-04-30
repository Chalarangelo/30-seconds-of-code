---
title: Disable selection
tags: interactivity,beginner
---

Makes the content unselectable.

- `user-select: none` specifies that the text cannot be selected.
- This is not a secure method to prevent users from copying content.

```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

```css
.unselectable {
  user-select: none;
}
```
