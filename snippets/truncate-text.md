---
title: Truncate text
tags: layout
expertise: beginner
cover: blog_images/houses-rock-sea.jpg
firstSeen: 2018-02-25T15:14:39+02:00
lastUpdated: 2020-12-30T15:37:37+02:00
---

Truncates text that is longer than one line, adding an ellipsis at the end (`…`).

- Use `overflow: hidden` to prevent the text from overflowing its dimensions.
- Use `white-space: nowrap` to prevent the text from exceeding one line in height.
- Use `text-overflow: ellipsis` to make it so that if the text exceeds its dimensions, it will end with an ellipsis.
- Specify a fixed `width` for the element to know when to display an ellipsis.
- Only works for single line elements.

```html
<p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
```

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```
