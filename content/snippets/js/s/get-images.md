---
title: Use JavaScript to find all the images in an element
shortTitle: Get all images in element
language: javascript
tags: [browser]
cover: portal-timelapse
excerpt: Use simple DOM queries to find all the images contained within an element.
listed: true
dateModified: 2024-05-31
---

JavaScript is extremely powerful when it comes to DOM querying and manipulation, especially if you need to perform well-defined tasks. One task I've found myself solving a handful of times is **finding all the images within an element**. This can be useful for a variety of reasons, such as lazy-loading images or extracting image URLs for further processing.

First and foremost, a less often used selector such as `Element.getElementsByTagName()` can be used to **get all the elements of a specific type** within an element. In this case, we're looking for all the `<img>` elements. This method returns an `HTMLCollection` of elements, which can be converted to an array using the spread operator (`...`).

```js
const getImages = el => [...el.getElementsByTagName('img')];

const images = getImages(document);
// [HTMLImageElement, HTMLImageElement, ...]
```

We could stop here, but most likely we want the **URL where each image asset is located**. To get the `src` attribute of each image, we can use `Array.prototype.map()` to iterate over the array of images and extract the `src` attribute, using `Element.getAttribute()`.

```js
const getImages = el =>
  [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));

const imageUrls = getImages(document);
// ['image1.jpg', 'image2.png', ...]
```

If you want to **eliminate duplicate URLs**, you can use a `Set` to store the unique values. As this might not be always the desired behavior, we can use an optional second argument, `includeDuplicates`, to control this behavior. Then, we can conditionally return the array or the `Set` converted back to an array.

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img =>
    img.getAttribute('src')
  );
  return includeDuplicates ? images : [...new Set(images)];
};

getImages(document, true);
// ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false);
// ['image1.jpg', 'image2.png', '...']
```
