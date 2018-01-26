const deepClone = obj => {
let clone = Object.assign({}, obj);
Object.keys(clone).forEach(
key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
);
return clone;
};
module.exports = deepClone