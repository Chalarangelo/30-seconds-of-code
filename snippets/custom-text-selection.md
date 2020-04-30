---
title: Custom text selection
tags: visual,beginner
---

Changes the styling of text selection.

- `::selection` defines a pseudo selector on an element to style text within it when selected. Note that if you don't combine any other selector your style will be applied at document root level, to any selectable element.
- Requires prefixes for full support and is not actually in any specification.

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
