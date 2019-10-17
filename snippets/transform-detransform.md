---
title: Transform - Detransform
tags: visual, beginner
---

Sets a transform on the parent element and de-transforms the child elements, so they are not affected by the transform.
This allows for some neat effects such as skewed buttons.

```html
<div class="parent"><div class="child">Child content</div></div>
```

```css
:root {
  --transform: 10deg;
}

.parent {
  transform: skewX(var(--transform));
  padding: 1rem;
  border: 1px solid;
  display: inline-block;
}

.child {
  transform: skewX(calc(-1 * var(--transform)));
}
```

#### Explanation

- `--transform: 10deg` sets a CSS variable we can later use to prevent duplicate code.
- `calc(-1 * var(--transform))` on the child element negates the transform from the parent.

- Note: the `display` property of the child element may not be `inline`, otherwise the transform will be ignored ([see also](https://drafts.csswg.org/css-transforms-1/#terminology)).

#### Browser support

<span class="snippet__support-note">⚠️ Requires prefix for full support.</span>

- https://caniuse.com/#feat=transforms2d
