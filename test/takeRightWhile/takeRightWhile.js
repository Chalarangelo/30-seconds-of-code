const takeRightWhile = (arr, func) => {
  for (let i of arr.reverse().keys())
    if (func(arr[i])) return arr.reverse().slice(arr.length - i, arr.length);
  return arr;
};

module.exports = takeRightWhile;