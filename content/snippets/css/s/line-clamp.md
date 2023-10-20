---
title: Trim multiline text
type: snippet
language: css
tags: [layout,visual]
cover: typewriter
dateModified: 2021-05-16
---

Limit multiline text to a given number of lines.

- Use `-webkit-line-clamp` to set the maximum number of lines to be displayed.
- Set `display` to `-webkit-box` and `-webkit-box-orient` to `vertical`, as they are required for `-webkit-line-clamp` to be applied.
- Apply `overflow: hidden` to hide any overflow after the text is trimmed.

```html
<p class="excerpt">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod enim eget ultricies sollicitudin. Nunc aliquam arcu arcu, non suscipit metus luctus id. Aliquam sodales turpis ipsum, in vehicula dui tempor sit amet. Nullam quis urna erat. Pellentesque mattis dolor purus. Aliquam nisl urna, tempor a euismod a, placerat in mauris. Phasellus neque quam, dapibus quis nunc at, feugiat suscipit tortor. Duis vel posuere dolor. Phasellus risus erat, lobortis et mi vel, viverra faucibus lectus. Etiam ut posuere sapien. Nulla ultrices dui turpis, interdum consectetur urna tempus at.
</p>
```

```css
.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```
