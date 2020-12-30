---
title: Disable selection
tags: interactivity,beginner
---

Makes the content unselectable.

- Use `user-select: none` to make the content of the element not selectable.
- **Note:** This is not a secure method to prevent users from copying content.

```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

```css
.unselectable {
  user-select: none;
}
```
