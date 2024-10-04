---
title: Lazy load images in HTML
shortTitle: Image lazy loading
language: html
tags: [image]
cover: bridge
excerpt: Discover how to improve your website's performance by implementing lazy loading for images using a native HTML attribute.
listed: true
dateModified: 2021-06-12
---

In today's digital landscape, images play a pivotal role in capturing users' attention and conveying information. However, their impact on a webpage's **load time** can be significant, leading to suboptimal user experiences and lower search engine rankings. This makes **image optimization** a crucial part of any website's performance optimization strategy.

The most common technique for optimizing images is that of **lazy loading**. This usually comes in the form of delaying loading images outside the initial viewport until they are close to being scrolled into view. By deferring the loading of images until they're about to be needed, lazy loading optimizes page performance and ensures a seamless browsing experience.

Fortunately, the HTML standard already includes a built-in solution to effortlessly achieve lazy loading, the `loading` attribute. By simply adding `loading="lazy"` to the desired images, you unlock the power of lazy loading and allow browsers to optimize resource allocation and loading priorities.

```html
<img src="/img/duck.png" alt="A rubber duck" loading="lazy" />
```
> [!NOTE]
>
> At the time of writing, the `loading` attribute is supported in most modern browsers, except for Safari, but not in legacy browsers, such as IE. On that note, lazy loading can be seen as a progressive enhancement for browsers that support it, so it's still worth adding for any users that can benefit from it.
