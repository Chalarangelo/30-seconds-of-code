---
title: Style elements when in fullscreen mode
shortTitle: Fullscreen element styling
language: css
tags: [visual]
cover: flower-portrait-3
excerpt: Did you know you can differentiate an element's styles when it's in fullscreen mode? Learn how to do it with this code snippet!
listed: true
dateModified: 2024-09-08
---

Did you know you can differentiate an element's styles when it's in fullscreen mode? It doesn't even require special classes or JavaScript, as you can use the `:fullscreen` *pseudo-class* to style an element when it's displayed in fullscreen mode.

This pseudo-class is particularly useful in adjusting an element's appearance when it's in fullscreen mode. Perhaps, you want to adjust the text size, background color, or even the layout of the element to better fit the screen. This can be especially useful for media players, slideshows, or any other content that benefits from a fullscreen view.

https://codepen.io/chalarangelo/pen/bGXpEoP

```css
.element {
  /* Default styles */
}

.element:fullscreen {
  /* Styles when in fullscreen mode */
}
```

> [!NOTE]
>
> You can learn more about **requesting fullscreen access** in the [related JavaScript article](/js/s/fullscreen). The gist of it is that you can use `Element.requestFullscreen()` to make an element fullscreen and `Document.exitFullscreen()` to exit fullscreen mode.
