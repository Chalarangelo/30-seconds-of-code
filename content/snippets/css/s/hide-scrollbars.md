---
title: Hide scroll bars on an element
shortTitle: Hide scrollbars
language: css
tags: [visual]
cover: by-the-lighthouse
excerpt: Learn how to hide scrollbars on an element, while still allowing it to be scrollable.
listed: true
dateModified: 2024-09-07
---

Scrollbars are a common pain point when styling pages, mainly due to a lack of customization options and inconsistencies between browsers. You can **hide scrollbars** on an element while still allowing it to be **scrollable** by using the `overflow` property and some vendor-specific properties.

First off, you need to ensure your content remains scrollable, by setting `overflow: auto` on the element. Then, you can hide the scrollbars using `scrollbar-width: none` on Firefox and `display: none` on the `::-webkit-scrollbar` pseudo-element on WebKit browsers (Chrome, Edge, Safari).

```css
.no-scrollbars {
  overflow: auto;
  scrollbar-width: none;
}

.no-scrollbars::-webkit-scrollbar {
  display: none;
}
```
