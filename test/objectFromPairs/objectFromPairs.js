const objectFromPairs = arr => arr.reduce((a, [key, val]) => ((a[key] = val), a), {});
module.exports = objectFromPairs;
