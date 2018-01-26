const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
module.exports = objectToPairs