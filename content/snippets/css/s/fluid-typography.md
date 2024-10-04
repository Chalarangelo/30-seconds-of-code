---
title: Fluid typography with CSS clamp
shortTitle: Fluid typography
language: css
tags: [visual]
cover: shell-focus
excerpt: Learn how to create text that scales according to the viewport width.
listed: true
dateModified: 2024-08-27
---

Fluid typography is a technique that allows text to **scale according to the viewport width**. This is particularly useful for responsive designs, where you want the text to grow or shrink based on the available space.

> [!NOTE]
>
> While fluid typography is a cool technique, **hand-crafted typographic scales** can often look more polished. You may want to read more in the [typographic scale basics article](/css/s/typographic-scale-basics).

In order to create fluid typography, you can use the `clamp()` CSS function to **clamp the value** of `font-size` between a minimum and maximum value. This ensures that the text size will never be smaller than the minimum value or larger than the maximum value.

It is advised to use `rem` units for the minimum and maximum values, as they are **relative to the root font size**. This allows you to set a base font size on the `html` element and have the text scale accordingly.

Finally, you should use a **formula to calculate the responsive value** for `font-size`. This formula should be based on the viewport width, so that the text size grows or shrinks as the viewport changes, thus you can use the `vw` unit.

In the example below, the `font-size` is clamped between `1rem` and `3rem`, and the formula `8vw - 2rem` is used to calculate the responsive value. This formula ensures that the text size will be `1rem` at `600px` viewport width and `3rem` at `1000px` viewport width.

```css
.fluid-type {
  font-size: clamp(1rem, 8vw - 2rem, 3rem);
}
```
