const sortedLastIndex = (arr, n) => {
const isDescending = arr[0] > arr[arr.length - 1];
const index = arr
.map((val, i) => [i, val])
.reverse()
.findIndex(el => (isDescending ? n <= el[1] : n >= el[1]));
return index === -1 ? 0 : arr.length - index - 1;
};
module.exports = sortedLastIndex;