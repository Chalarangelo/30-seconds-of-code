const takeWhile = (arr, func) => {
for (let i of arr.keys()) if (func(arr[i])) return arr.slice(0, i);
return arr;
};
module.exports = takeWhile;