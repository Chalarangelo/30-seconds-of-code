const sortedLastIndex = (arr, n) => {
const isDescending = arr[0] > arr[arr.length - 1];
const index = arr
.map((val, i) => [i, val])
.filter(el => (isDescending ? n >= el[1] : n >= el[1]))
.slice(-1)[0][0];
return index === -1 ? arr.length : index;
};
module.exports = sortedLastIndex