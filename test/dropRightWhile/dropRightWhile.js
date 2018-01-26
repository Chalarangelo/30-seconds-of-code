const dropRightWhile = (arr, func) => {
while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
return arr;
};
module.exports = dropRightWhile