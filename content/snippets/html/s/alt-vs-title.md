---
title: What is the difference between alt and title?
shortTitle: Difference between alt and title
language: html
tags: [image]
cover: stars-n-snow
excerpt: Learn the difference between the `alt` and `title` attributes on images in HTML.
listed: true
dateModified: 2023-07-02
---

As mention in the [previous article](/html/s/image-alt), the `alt` attribute provides **alternative information** for an image if a user cannot view it. When an image can't be loaded, the browser will display the `alt` text in its place so the user can get an idea of why the image was included.

The `title` attribute, on the other hand, provides **additional information** about an image. This information is displayed as a tooltip when a user hovers over the image.

```html
<img src="image.jpg" alt="Alternative text" title="Additional information">
```

Overall, the `alt` attribute should be specified for all `<img>` elements as it is important for both accessibility and SEO. The `title` attribute, on the other hand, is optional and should only be used when you need to provids additional information about the image.
