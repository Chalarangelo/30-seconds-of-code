const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));
module.exports = findKey