module.exports = (arr, val) => {
const indices = [];
arr.forEach((el, i) => el === val && indices.push(i));
return indices;
};