---
title: Using the inset CSS property
shortTitle: Using inset
language: css
tags: [layout]
cover: yellow-white-mug-1
excerpt: The inset shorthand property makes element positioning in CSS easier. Learn how to use it effectively in your projects.
listed: true
dateModified: 2025-05-15
---

A few months back, I learned about the `inset` property in CSS and was pleasantly surprised by it. I still haven't seen it in the wild all that much, so I thought I'd take a moment to share some thoughts on it and why I think it's a pretty useful tool to have in your CSS toolbox.

<baseline-support featureId="logical-properties">
</baseline-support>

## What is the `inset` property?

The `inset` property is a **shorthand** for `top`, `right`, `bottom`, and `left`. This can save you from the tedious process of defining these properties individually, as you can use `inset` to set them all at once.

```html
<div class="box"></div>
```

```css
.box {
  position: absolute;
  /* top: 10px, right: 20px, bottom: 30px, left: 40px */
  inset: 10px 20px 30px 40px;
}
```

## Physical, not logical

Although the `inset` property is defined in the [CSS Logical Properties and Values Module](https://drafts.csswg.org/css-logical-1/), it is a **physical property**, not a logical one. This means it always refers to the physical dimensions (`top`, `right`, `bottom`, `left`) of an element, regardless of the writing mode or text direction (e.g., left-to-right or right-to-left).

If you need logical positioning (e.g., `inline-start`, `block-end`), you'll need to use the logical properties instead.

@[Further reading](/css/s/logical-physical-properties-map)

## Positioned elements

One important thing to remember is that the `inset` property only works on **positioned elements**. This means the element must have a `position` value of `absolute`, `relative`, `fixed`, or `sticky`. Without a `position` value, the `inset` property will have no effect.

```html
<div class="box"></div>
```

```css
.box {
  /* The `position` is required for `inset` to work */
  position: absolute;
  /* top: 20px, right: 20px, bottom: 20px, left: 20px */
  inset: 20px;
}
```

## Practical use cases

Ok, that's a cool shorthand. _But what can I do with it?_ Here are a few practical use cases for the `inset` property:

### Fill a parent

If you want an element to **fill its parent container**, you can simply use `inset: 0` to set all sides to `0`. This is a concise way to set `top`, `right`, `bottom`, and `left` to `0`.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  /* Fill the parent */
  /* top: 0, right: 0, bottom: 0, left: 0 */
  inset: 0;
}
```

### Center an element

To center an element within its parent, you can use one or more values of the `inset` property to position it. If, for example, the element is half the size of its parent, you can use `inset: 25%` to center it.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
}

.child {
  position: absolute;
  /* Center the child */
  /* top: 25%, right: 25%, bottom: 25%, left: 25% */
  inset: 25%;
  width: 100px;
  height: 100px;
}
```

### Custom positioning

You can also use `inset` with custom values to position an element in a specific way, leveraging the `auto` keyword to essentially skip some sides. For example, if you want to position an element `10px` from the `top` and `50px` from the `left`, you can skip the two values in the middle.

```html
<div class="box"></div>
```

```css
.box {
  position: absolute;
  /* top: 10px, left: 50px */
  inset: 10px auto auto 50px;
}
```

## Conclusion

The `inset` property is a handy shorthand for positioning elements in CSS. By combining it with the appropriate `position` value, you can simplify your code and achieve a variety of layouts, from filling a parent container to centering elements or creating custom positions. Just keep in mind that it is a **physical property**, so it won't adapt to writing modes or text directions.
