const indexOfAll = (arr, val) => {
    return arr.reduce((acc, el, index) => el === val ? [...acc, index] : acc, []);
};
module.exports = indexOfAll;