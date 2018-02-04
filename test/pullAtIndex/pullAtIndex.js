const pullAtIndex = (arr, pullArr) => {
let removed = [];
let pulled = arr
.map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
.filter((v, i) => !pullArr.includes(i));
arr.length = 0;
pulled.forEach(v => arr.push(v));
return removed;
};
module.exports = pullAtIndex;