const symmetricDifferenceWith = (arr, val, comp) => [
...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];
module.exports = symmetricDifferenceWith;