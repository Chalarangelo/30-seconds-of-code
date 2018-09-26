const shank = (arr, index = 0, delCount = 0, ...elements) => 
  arr.slice(0, index)
     .concat(elements)
     .concat(arr.slice(index + delCount));
module.exports = shank;
