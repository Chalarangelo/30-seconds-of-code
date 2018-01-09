module.exports = (arr, func) => {
while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
return arr;
};