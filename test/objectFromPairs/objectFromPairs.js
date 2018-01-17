const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
 module.exports = objectFromPairs