---
title: Custom text selection
type: snippet
language: css
tags: [visual]
cover: digital-nomad
dateModified: 2020-12-30
---

Changes the styling of text selection.

- Use the `::selection` pseudo-selector to style text within it when selected.

```html
<p class="custom-text-selection">Select some of this text.</p>
```

```css
::selection {
  background: aquamarine;
  color: black;
}

.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```
