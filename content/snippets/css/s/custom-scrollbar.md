---
title: Create a custom scrollbar with CSS
language: css
tags: [visual]
cover: sea-view
excerpt: Customize the scrollbar style for elements with scrollable overflow, using just CSS.
listed: true
dateModified: 2024-09-17
---

Scrollbar styling is one of the longest-awaited features in CSS. While it's not officially supported, there are still ways to style scrollbars in certain browsers.

> [!CAUTION]
>
> Scrollbar styling doesn't appear to be on any standards track. This technique only works on **WebKit-based browsers** (Chrome, Edge, Safari).

In general, you can use the `::-webkit-scrollbar` pseudo-element to style the **scrollbar element**, `::-webkit-scrollbar-track` to style the **scrollbar track** (the background of the scrollbar), and `::-webkit-scrollbar-thumb` to style the **scrollbar thumb** (the draggable element).

Putting everything together, you can create a style for the scrollbar like this:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #4a7856;
  border-radius: 12px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #70bceb;
  border-radius: 12px;
}
```

https://codepen.io/chalarangelo/pen/JjgXePq
