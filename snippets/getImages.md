### getImages

Fetches all images from within an element and puts them into an array

Use `Element.getElementsByTagName()` to fetch all `<img>` elements inside `Element`, `Element.getAttribute()` to get the `src` attribute from `<img>`, `Array.includes()` for checking if `src` attribute already exists in `Array`, finally `Array.push()` to add the `src` attribute in the returned `Array`

```js
const getImages = (elem) => {
    const pageImages = elem.getElementsByTagName('img');
    let imageList = [];

    for (i=0, l=pageImages.length; i < l; i++) {
        const imgSrc = pageImages[i].getAttribute('src');

        if (!imageList.includes(imgSrc)) { imageList.push(imgSrc); }
    }

    return imageList;
};
```

```js
getImages(document); // ['image1.jpg', 'image2.png', '...']
```