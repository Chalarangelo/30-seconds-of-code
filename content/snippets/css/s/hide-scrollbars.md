---
title: Hide scroll bars
type: snippet
language: css
tags: [visual]
cover: by-the-lighthouse
dateModified: 2022-05-13
---

Hides scrollbars on an element, while still allowing it to be scrollable.

- Use `overflow: auto` to allow the element to be scrollable.
- Use `scrollbar-width: none` to hide scrollbars on Firefox.
- Use `display: none` on the `::-webkit-scrollbar` pseudo-element to hide scrollbars on WebKit browsers (Chrome, Edge, Safari).

```html
<div class="no-scrollbars">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum id leo a consectetur. Integer justo magna, ultricies vel enim vitae, egestas efficitur leo. Ut nulla orci, rutrum eu augue sed, tempus pellentesque quam.</p>
</div>
```

```css
div {
  width: 200px;
  height: 100px;
}

.no-scrollbars {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}
```
