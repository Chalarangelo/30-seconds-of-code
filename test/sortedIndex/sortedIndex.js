const sortedIndex = (arr, n) => {
const isDescending = arr[0] > arr[arr.length - 1];
const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
return index === -1 ? arr.length : index;
};
module.exports = sortedIndex;