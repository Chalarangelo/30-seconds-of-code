---
title: "Tip: Improve scroll listener performance"
shortTitle: Improve scroll listener performance
type: tip
tags: javascript,browser,event
author: chalarangelo
cover: chill-surfing
excerpt: Scroll listeners can easily become a performance bottleneck for your web application. Here's how to fix that.
firstSeen: 2023-03-07T05:00:00-04:00
---

When working with scroll listeners in JavaScript, one can often run into performance issues. This is because scroll listeners are triggered on **every single scroll event**, which can be quite frequent. Most of the time, such listeners are used for infinite scrolling and lazy loading, meaning that the scroll event won't be intercepted. As such, `Event.preventDefault()` will not be called, guving us an optimization opportunity.

```js
window.addEventListener('scroll', () => {
  // Do something
  // Can't use `preventDefault` here
}, { passive: true });
```

As demonstrated in this code snippet, setting the `passive` option to `true` will enable certain **performance optimizations** in the browser. This way, the browser will know that it can safely skip the event queue and execute the scroll listener immediately. The result is a much smoother experience for the user, as the scroll event will be handled immediately, instead of being queued and handled later.
