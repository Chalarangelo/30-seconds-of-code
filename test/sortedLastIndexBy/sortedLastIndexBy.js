const sortedLastIndexBy = (arr, n, fn) => {
const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
const val = fn(n);
const index = arr
.map((val, i) => [i, fn(val)])
.reverse()
.findIndex(el => (isDescending ? val <= el[1] : val >= el[1]));
return index === -1 ? 0 : arr.length - index;
};
module.exports = sortedLastIndexBy