const binarySearch = (arr, val, start = 0, end = arr.length - 1) => {
if (start > end) return -1;
const mid = Math.floor((start + end) / 2);
if (arr[mid] > val) return binarySearch(arr, val, start, mid - 1);
if (arr[mid] < val) return binarySearch(arr, val, mid + 1, end);
return mid;
}
module.exports = binarySearch