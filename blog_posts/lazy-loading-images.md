---
title: "Tip: Lazy load images in HTML"
type: tip
tags: webdev,html,image
authors: chalarangelo
cover: blog_images/bridge.jpg
excerpt: Did you know you can use a native HTML attribute to add lazy load to images? Learn all you need to know with this quick tip.
firstSeen: 2021-05-31T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Images are nowadays a crucial part of any webpage, but, as with most things, they come at a cost. Images are usually a major percentage of a page's load, which is why they make for a great candidate for optimization. The most common technique is that of lazy loading, usually in the form of delaying loading images outside the initial viewport until they are close to being scrolled into view.

This exact behavior is already part of the HTML standard in the form of the `loading` attribute. All you have to do to reap its benefits is add `loading="lazy"` to any images you want to add lazy loading to:

```html
<img src="/img/duck.png" alt="A rubber duck" loading="lazy" />
```

**Caveat:** At the time of writing, the `loading` attribute is supported in most modern browsers, except for Safari, but not in legacy browsers, such as IE. On that note, lazy loading can be seen as a progressive enhancement for browsers that support it, so it's still worth adding for any users that can benefit from it.
