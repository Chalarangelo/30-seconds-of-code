/**
 * shank
 * @param arr:any[] - the base array
 * @param index:number - the index to make the change at
 * @param delCount:number - the number of elements to omit
 * @param ...elements:any[] - additional elements to concatinate onto the end of the new array
 * @returns any[]
 */
const shank = (arr, index = 0, delCount = 0, ...elements) => 
  arr.slice(0, index)
     .concat(elements)
     .concat(arr.slice(index + delCount));
module.exports = shank;
