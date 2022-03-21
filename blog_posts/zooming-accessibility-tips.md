---
title: Why using maximum-scale can harm your page's accessibility
shortTitle: Accessibility and maximum-scale
type: story
tags: webdev
expertise: intermediate
author: chalarangelo
cover: blog_images/camera-zoom.jpg
excerpt: Using the viewport meta tag incorrectly can harm your website's accessibility. Learn how to prevent problems with this handy guide.
unlisted: true
firstSeen: 2020-09-16T23:12:17+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Using the `"viewport"` meta tag incorrectly can cause some serious accessibility issues for people with low vision.

The most common and, for the vast majority of cases, correct setup for said tag looks something like the first example below. However, there are websites that might do something like the second example, employing `maximum-scale=1.0` as part of their meta tag:

```html
<!-- Good in most scenarios -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Bad in most scenarios -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
```

The reason this is a bad practice is that `maximum-scale=1.0` will disable the pinch zoom functionality on certain mobile devices, forcing people to view the website a certain way and taking away their ability to zoom in and out. This is the exact reason you should avoid it, allowing you to meet user's needs and provide a better user experience.

On a side note, even if you have some extraordinary reason for applying this, you should know that some browser and device combos such as Chrome on Android might respect the meta tag's suggestion, while others such as iOS 10 ignore the suggestion entirely, so you should be aware that you might not be delivering a consistent user experience for all of your users.
