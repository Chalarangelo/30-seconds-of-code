module.exports = (arr, func) =>
Array.isArray(arr)
? arr.filter(func).reduce((acc, val) => {
arr.splice(arr.indexOf(val), 1);
return acc.concat(val);
}, [])
: [];