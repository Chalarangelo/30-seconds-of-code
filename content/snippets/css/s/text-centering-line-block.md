---
title: Are text-align and align-items the same when it comes to text alignment in CSS?
shortTitle: Text-align vs Align-items
language: css
tags: [layout]
cover: sunrise-over-mountains
excerpt: In the age of flexbox and grid, text alignment may seem simpler than ever, but there are a few things you should be aware of.
listed: true
dateModified: 2025-05-19
---

**Text alignment** in CSS may seem straightforward, especially given how far modern browsers have come. However, one often overlooked aspect is the difference between `text-align` and `align-items`. While both properties can be used to center content, they serve **different purposes** and are applied in different contexts. Let's dive in!

## `text-align: center`

The `text-align` property is used to **align inline content**, such as text, within a block-level element. For example, if you want to center text, you can use `text-align: center` on a paragraph.

```css
p {
  /* Centers the text inside the paragraph */
  text-align: center;
}
```

This moves all the **individual characters of the text** to the middle of each line, centering them horizontally within the block. Think of it as the CSS equivalent of centering text in a word processor or rich text editor. It only affects the inline content inside the element, not the element itself.

## `align-items: center`

On the other hand, `align-items` is a property used in **Flexbox** (and Grid) layouts. It aligns the items (child elements) within a flex container along the cross axis (usually vertical, unless the `flex-direction` is changed).

When you use `align-items: center`, it **centers the entire block-level element** (e.g., a paragraph) within the flex container. However, it **does not affect the alignment of the text** inside that block.

```css
.container {
  display: flex;
  /* Centers the block element */
  align-items: center;
}
```

## Comparison

https://codepen.io/chalarangelo/pen/azzOxGX

As demonstrated in the CodePen above, the key difference between the two properties is their scope of influence:

- `text-align: center` affects the **inline content within a block element**.
- `align-items: center` affects the alignment of the **block element itself within a flex container**.

You may also combine the two to center both the block and its content:

```css
.container {
  display: flex;
  /* Centers the block element */
  align-items: center;
}

p {
  /* Centers the text inside the paragraph */
  text-align: center;
}
```

## Conclusion

In summary, while both `text-align` and `align-items` can be used to center content, they serve different purposes and are applied in different contexts. Understanding the distinction between the two will help you create more effective and visually appealing layouts in your web projects.
