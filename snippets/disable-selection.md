---
title: Disable selection
tags: interactivity
expertise: beginner
cover: blog_images/interior-9.jpg
firstSeen: 2018-02-26T19:09:58+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
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
