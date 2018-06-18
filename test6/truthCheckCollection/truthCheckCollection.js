const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);
module.exports = truthCheckCollection;