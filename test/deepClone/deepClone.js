const deepClone = obj => {
let clone = Object.assign({}, obj);
Object.keys(clone).forEach(
key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
);
return Array.isArray(obj) ? Array.from(clone) : clone;
};
module.exports = deepClone;