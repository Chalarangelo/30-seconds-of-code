---
title: Centering content with CSS
language: css
tags: [layout]
cover: malibu
excerpt: Centering content with CSS might often feel difficult. Here are 4 easy ways you can do it.
listed: true
dateModified: 2024-05-07
---

_How to center a div_ has become a little bit of a joke in the web development community, and for good reason. Not only is it a common task, but it can also be a bit tricky to get right, especially when you're new to CSS. Luckily, modern CSS solutions exist for pretty much any scenario you might encounter.

## Flexbox centering

Using **flexbox** to vertically and horizontally center content is usually the **preferred method**. All it takes is three lines of code in the container element to set `display: flex` and then center the child element vertically and horizontally using `align-items: center` and `justify-content: center` respectively.

```html
<div class="flexbox-centering">
  <div class="content">Content</div>
</div>
```

```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

https://codepen.io/chalarangelo/pen/wvbwQKg

## Grid centering

Using the **grid module** is very similar to flexbox and also a common technique, especially if you are **already using grid in your layout**. The only difference from the previous technique is that you use `display: grid` in the container element and then center the child element the same way as before.

```html
<div class="grid-centering">
  <div class="content">Content</div>
</div>
```

```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
}
```

https://codepen.io/chalarangelo/pen/OJYLaNb

## Transform centering

Transform centering uses, as the name implies, **CSS transforms** to center an element. It depends on the container element having a `position: relative`, allowing the child element to utilize `position: absolute` to position itself. Then `left: 50%` and `top: 50%` are used to **offset** the child element and `transform: translate(-50%, -50%)` to **negate** its position.

```html
<div class="transform-centering">
  <div class="content">Content</div>
</div>
```

```css
.transform-centering {
  position: relative;
}

.transform-centering > .content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

https://codepen.io/chalarangelo/pen/OJYLapp

## Table centering

Last but not least, **table** centering is an older technique which you might favor when working with **older browsers**. It depends on the use of `display: table` in the container element, making it behave like a `<table>` element. This allows the child element to use `display: table-cell`, behaving like a `<td>`, in combination with `text-align: center` and `vertical-align: middle` to center itself horizontally and vertically. Note that the parent element must have a fixed `width` and `height`.

```html
<div class="table-centering">
  <div class="content">Content</div>
</div>
```

```css
.table-centering {
  display: table;
  height: 100%;
  width: 100%;
}

.table-centering > .content {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

https://codepen.io/chalarangelo/pen/jOoNQmZ
