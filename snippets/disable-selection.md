---
title: Disable selection
tags: interactivity,beginner
---

Makes the content unselectable.

```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

```css
.unselectable {
  user-select: none;
}
```

#### Explanation

- `user-select: none` specifies that the text cannot be selected.

_Note: This is not a secure method to prevent users from copying content._

#### Browser support

- https://caniuse.com/#feat=user-select-none
