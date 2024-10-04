---
title: Horizontal or vertical scroll snap in CSS
shortTitle: Horizontal or vertical scroll snap
language: css
tags: [interactivity]
cover: purple-sunset-waves
excerpt: Create a horizontally or vertically scrollable container that will snap on elements when scrolling.
listed: true
dateModified: 2024-08-25
---

Scroll snapping in CSS has been around for a while and it's a great way to create modern interactive experiences. It consists of a handful of properties that allow you to create a scrollable container that will snap on elements when scrolling, either horizontally or vertically.

## Scrollable containers that snap

To create a scrollable container that snaps on elements when scrolling, you can use the `scroll-snap-type` property to control the **snap axis**. This property can be set to `x` for horizontal scrolling or `y` for vertical scrolling. You can also set it to `both` to enable both horizontal and vertical scrolling.

> [!TIP]
>
> If you're working with the new [**Logical Properties**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) you can use `block` for vertical and `inline` for horizontal. In this article, however, we'll focus on the more traditional `x` and `y` values.

```css
/* Horizontal scroll snap */
.scroll-snap {
  scroll-snap-type: x mandatory;
}

/* Vertical scroll snap */
.scroll-snap {
  scroll-snap-type: y mandatory;
}
```

Apart from the snap axis, you can also specify the **snap strictness** with `scroll-snap-type`. The `mandatory` value will snap the container to the nearest snap point, while `proximity` will snap the container to the nearest snap point if it's close enough (default).

### Snap alignment

You can also control the **alignment of the snap points** using the `scroll-snap-align` property. This property can be set to `start`, `end`, `center`, or `none`.

```css
/* Snap to the start of the element */
.scroll-snap > .element {
  scroll-snap-align: start;
}

/* Snap to the center of the element */
.scroll-snap > .element {
  scroll-snap-align: center;
}

/* Snap to the end of the element */
.scroll-snap > .element {
  scroll-snap-align: end;
}
```

### Scrolling over the edge

To prevent the default browser **behavior when reaching the end of the scrollable container**, you can use the `overscroll-behavior` property. This property can be set to `auto`, `contain`, or `none`.

The `contain` value is usually preferred as it allows the scroll snap to work as expected when scrolling over the edge of the container.

> [!TIP]
>
> Depending on your use case, you can use `overscroll-behavior-x` and `overscroll-behavior-y` to control the behavior on the horizontal and vertical axes respectively, or even `overscroll-behavior-inline` and `overscroll-behavior-block` if you're using Logical Properties.

```css
/* Horizontal scroll snap */
.scroll-snap {
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
}

/* Vertical scroll snap */
.scroll-snap {
  scroll-snap-type: y mandatory;
  overscroll-behavior-y: contain;
}
```

## Horizontal scroll snap

Putting everything together, we can create a horizontally scrollable container that will snap on elements when scrolling. At its core the HTML and CSS is quite simple. All you need to do is set the `scroll-snap-type` to `x mandatory` and the `overscroll-behavior-x` to `contain`. You can decide on the value of your `scroll-snap-align` based on your design.

https://codepen.io/chalarangelo/pen/VwoYQYj

```html
<div class="horizontal-snap">
  <!-- Add your content here, use .element for snap points -->
</div>
```

```css
.horizontal-snap {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.horizontal-snap > .element {
  scroll-snap-align: center; /* or start, end */
}
```

## Vertical scroll snap

Similarly, a vertically scrollable container that snaps on elements when scrolling can be created by setting the `scroll-snap-type` to `y mandatory` and the `overscroll-behavior-y` to `contain`. You can again decide the value of `scroll-snap-align` based on your design.

https://codepen.io/chalarangelo/pen/mdNyXVm

```html
<div class="vertical-snap">
  <!-- Add your content here, use .element for snap points -->
</div>
```

```css
.vertical-snap {
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
}

.vertical-snap > .element {
  scroll-snap-align: center; /* or start, end */
}
```
