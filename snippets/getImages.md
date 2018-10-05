### getImages

Fetches all images from within an element and puts them into an array

Use `Element.getElementsByTagName()` to fetch all `<img>` elements inside `Element`, `Array.prototype.map()` to map every `src` attribute of their respective `<img>` element. `New Set()` creates a `Set` of unique images which is then converted into an `Array` with the `...` operator.

```js
const getImages = (elem, duplicates) => {
    const imgElements = [...elem.getElementsByTagName("img")];
    const images = imgElements.map(img => img.getAttribute("src"));

    return duplicates ? images : [...(new Set(images))];
};
```

```js
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```