---
title: Hide empty elements
type: snippet
language: css
tags: [visual]
cover: metro-arrival
dateModified: 2022-11-18
---

Hides elements with no content.

- Use the `:empty` pseudo-class to select elements with no content.

```html
<p>Lorem ipsum dolor sit amet. <button></button></p>
```

```css
:empty {
  display: none;
}
```
