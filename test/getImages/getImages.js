const getImages = (elem, duplicates) => {
    const images = [...elem.getElementsByTagName("img")].map(img => img.getAttribute("src"));

    return duplicates ? images : [...(new Set(images))];
};
module.exports = getImages;
