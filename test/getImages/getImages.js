const getImages = (elem) => {
    const pageImages = elem.getElementsByTagName('img');
    let imageList = [];

    for (i=0, l=pageImages.length; i < l; i++) {
        const imgSrc = pageImages[i].getAttribute('src');

        if (!imageList.includes(imgSrc)) { imageList.push(imgSrc); }
    }

    return imageList;
};
module.exports = getImages;
