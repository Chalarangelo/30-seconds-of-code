---
title: Get all images in element
type: snippet
tags: [browser]
cover: portal-timelapse
dateModified: 2020-10-22T20:23:47+03:00
---

Fetches all images from within an element and puts them into an array.

- Use `Element.getElementsByTagName()` to get all `<img>` elements inside the provided element.
- Use `Array.prototype.map()` to map every `src` attribute of each `<img>` element.
- If `includeDuplicates` is `false`, create a new `Set` to eliminate duplicates and return it after spreading into an array.
- Omit the second argument, `includeDuplicates`, to discard duplicates by default.

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img =>
    img.getAttribute('src')
  );
  return includeDuplicates ? images : [...new Set(images)];
};
```

```js
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```
