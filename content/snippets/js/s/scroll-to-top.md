---
title: Smooth scroll to the top of the page using JavaScript
shortTitle: Scroll to page top
language: javascript
tags: [browser]
cover: tranquil-lake
excerpt: Smooth-scrolls to the top of the page.
listed: true
dateModified: 2024-08-07
---

When you want to scroll to the top of the page, you can do so instantly or smoothly. **Smooth scrolling** can provide a more pleasant user experience, especially when the page is long. But _how_ do you do it using JavaScript?

The first step is to determine the total **distance to the top of the page**. This can be done with the help of `Document.documentElement` or `Document.body` and `Element.scrollTop`. Then, as long as the distance is greater than zero, you can **scroll by a fraction** of the distance from the top. This fraction can be adjusted to control the speed of the scroll.

Finally, to **animate the scrolling**, you can use `Window.requestAnimationFrame()`. This method allows you to perform animations in a more efficient way, ensuring that the browser can optimize the animation and avoid unnecessary repaints.

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, Math.floor(0.05 * c));
  }
};

scrollToTop(); // Smooth-scrolls to the top of the page
```

> [!IMPORTANT]
>
> Smooth scrolling raises some **accessibility concerns**. It is highly recommended to allow users to disable this feature or use a media query to disable it on devices with reduced motion.
