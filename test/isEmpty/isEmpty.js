const isEmpty = val => val == null || !(Object.keys(val) || val).length;
module.exports = isEmpty