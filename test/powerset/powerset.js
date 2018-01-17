const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
 module.exports = powerset