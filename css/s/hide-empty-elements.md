---
title: Hide empty elements
type: snippet
language: css
tags: [visual]
author: chalarangelo
cover: metro-arrival
dateModified: 2022-11-18T05:00:00-04:00
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
