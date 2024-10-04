---
title: Text truncation, using CSS
shortTitle: Text truncation
language: css
tags: [layout]
cover: houses-rock-sea
excerpt: Truncate both single and multiline text with CSS, adding an ellipsis at the end.
listed: true
dateModified: 2024-08-22
---

Text truncation is a tool that many designs make use of to prevent text from overflowing its container. It can be applied both to single line and multiline text, and it is a great way to ensure that the text fits within the design constraints.

https://codepen.io/chalarangelo/pen/rNEggmY

## Truncate single line text

**Single line text** can be easily truncated using a couple of CSS fundamentals. First off, you'll need to use `white-space: nowrap` to **prevent the text from wrapping** to the next line. Then, you can use `overflow: hidden` to **hide any overflow**, and `text-overflow: ellipsis` to **add an ellipsis** at the end of the text.

> [!NOTE]
>
> For this technique to work, a **fixed** `width` must be set on the element or its parent.

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

## Truncate multi line text

For **multi-line text**, you'll still need to use `overflow: hidden` to **prevent the text from overflowing** its container. However, you can't use `text-overflow: ellipsis` to add an ellipsis at the end of the text.

Instead, you can use the `-webkit-line-clamp` property to **limit the number of lines** displayed. This property accepts an **integer value** that specifies the maximum number of lines to be displayed. You'll also need to use `display: -webkit-box` and `-webkit-box-orient: vertical` to ensure that `-webkit-line-clamp` is applied correctly.

> [!NOTE]
>
> At the time of writing, `-webkit-line-clamp` is still a **working draft**, but is supported across most modern browsers. Always check the [current browser support](https://caniuse.com/css-line-clamp) beforehand.

```css
.truncate-text-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```
