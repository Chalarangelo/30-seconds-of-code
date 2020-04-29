---
title: Truncate text
tags: layout,beginner
---

If the text is longer than one line, it will be truncated and end with an ellipsis `…`.

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

#### Explanation

- `overflow: hidden` prevents the text from overflowing its dimensions (for a block, 100% width and auto height).
- `white-space: nowrap` prevents the text from exceeding one line in height.
- `text-overflow: ellipsis` makes it so that if the text exceeds its dimensions, it will end with an ellipsis.
- `width: 200px;` ensures the element has a dimension, to know when to get ellipsis
- Only works for single line elements.
