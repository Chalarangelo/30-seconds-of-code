---
title: Aspect ratio
type: snippet
language: css
tags: [layout]
cover: digital-nomad-12
dateModified: 2022-08-14
---

Creates a responsive container with a specified aspect ratio.

- Use a CSS custom property, `--aspect-ratio` to define the desired aspect ratio.
- Set the container element to `position: relative` and `height: 0`, calculating its height using the `calc()` function and the `--aspect-ratio` custom property.
- Set the direct child of the container element to `position: absolute` and filling it parent, while giving it `object-fit: cover` to maintain the aspect ratio.

```html
<div class="container">
  <img src="https://picsum.photos/id/119/800/450" />
</div>
```

```css
.container {
  --aspect-ratio: 16/9;
  position: relative;
  height: 0;
  padding-bottom: calc(100% / (var(--aspect-ratio)));
}

.container > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
