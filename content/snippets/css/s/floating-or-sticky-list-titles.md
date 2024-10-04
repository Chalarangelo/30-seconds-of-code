---
title: List with floating or sticky section headings
language: css
tags: [visual]
cover: pop-of-green
excerpt: Learn how to create a list with floating or sticky headings for each section.
listed: true
dateModified: 2024-08-29
---

Ever wanted to create a list with floating or sticky headings for each section? You absolutely can, using some clever CSS tricks.

https://codepen.io/chalarangelo/pen/ExqjMaP

> [!NOTE]
>
> This article uses the semantic HTML `<dl>`, `<dt>`, and `<dd>` elements. You can easily replace them with your own HTML structure, as needed.

## Floating headings

In order to create a list with **floating headings for each section**, you can use `overflow-y: auto` to allow the list container to overflow vertically. Then, use `display: grid` on the inner container (`<dl>`) to create a layout with two columns.

Set headings (`<dt>`) to `grid-column: 1` and content (`<dd>`) to `grid-column: 2`. Finally, apply `position: sticky` and `top: 0.5rem` to headings to create a floating effect.

```css
.floating-stack {
  overflow-y: auto;
}

.floating-stack > dl {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: center;
}

.floating-stack dt {
  position: sticky;
  top: 0.5rem;
  grid-column: 1;
}

.floating-stack dd {
  grid-column: 2;
}
```

## Sticky headings

Similarly, for the **sticky headings**, you'll need to use `overflow-y: auto` to allow the list container (`<dl>`) to overflow vertically. Then, simply set headings (`<dt>`) to `position: sticky` and `top: 0` to create a sticky effect. You can also style the headings to make them stand out.

```css
.sticky-stack {
  overflow-y: auto;
}

.sticky-stack dt {
  position: sticky;
  top: 0;
}
```
