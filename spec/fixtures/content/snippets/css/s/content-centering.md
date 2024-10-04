---
title: Centering content with CSS
test: true
language: css
tags: [layout]
cover: polar-bear
excerpt: Centering content with CSS might often feel difficult. Here are 4 easy ways you can do it.
listed: true
dateModified: 2024-05-07
---

_How to center a div_ has become a little bit of a joke in the web development community, and for good reason.

## Flexbox centering

Using **flexbox** to vertically and horizontally center content is usually the **preferred method**.

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

Using the **grid module** is very similar to flexbox and also a common technique, especially if you are **already using grid in your layout**.

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

Transform centering uses, as the name implies, **CSS transforms** to center an element.

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

Last but not least, **table** centering is an older technique which you might favor when working with **older browsers**.

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
