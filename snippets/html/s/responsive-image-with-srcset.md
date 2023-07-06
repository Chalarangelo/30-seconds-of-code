---
title: Responsive Image with srcset
type: snippet
language: html
tags: [HTML, link, image]
cover: river-flow
excerpt: Create a responsive image with different resolutions using the srcset attribute in HTML.
dateModified: 2021-06-13T05:00:00-04:00
---

- The snippet demonstrates how to create a responsive image using the srcset attribute in HTML.
- The srcset attribute provides multiple image sources with different resolutions to ensure 
  optimal display on different devices.
- The browser selects the most appropriate image source based on the device's pixel density.

```html
<img src="image.jpg" srcset="image.jpg 1x, image@2x.jpg 2x" alt="Image">
```

The above code snippet showcases an img tag in HTML with the srcset attribute.

- The src attribute specifies the default image source to be used if the browser doesn't support srcset.
- The srcset attribute contains a list of image sources and their respective pixel densities (indicated by the number followed by 'x').
- In this example, image.jpg is the default image source for devices with a pixel density of 1x, while image@2x.jpg is the image source for devices with a pixel density of 2x.
- The alt attribute provides alternative text for the image, which is displayed if the image fails to load or for accessibility purposes.

This snippet provides a code example and a brief explanation of how to create a responsive image using the `srcset` attribute in HTML.