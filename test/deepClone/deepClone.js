const deepClone = obj => {
if (Array.isArray(obj)){
let arr = [];
obj.forEach(
(i,v) => (arr[i] = typeof v === 'object' ? deepClone(v) : v)
)
return arr;
}else {
let clone = Object.assign({}, obj);
Object.keys(clone).forEach(
key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
);
return clone;
}
};
module.exports = deepClone;