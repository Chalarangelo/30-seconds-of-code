const getImages = (elem, duplicates) => {
    const imgElements = [...elem.getElementsByTagName("img")];
    const images = imgElements.map(img => img.getAttribute("src"));

    return duplicates ? images : [...(new Set(images))];
};
module.exports = getImages;
