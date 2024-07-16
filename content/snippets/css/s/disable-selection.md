---
title: Disable selection
type: snippet
language: css
tags: [interactivity]
cover: interior-9
excerpt: Makes the content unselectable.
listed: true
dateModified: 2020-12-30
---

Makes the content unselectable.

- Use `user-select: none` to make the content of the element not selectable.

> [!CAUTION]
>
> This is not a secure method to prevent users from copying content.

```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

```css
.unselectable {
  user-select: none;
}
```
