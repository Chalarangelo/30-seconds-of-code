const sortedLastIndex = (arr, n) => {
const isDescending = arr[0] > arr[arr.length - 1];
const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
return index === -1 ? 0 : arr.length - index;
};
module.exports = sortedLastIndex;