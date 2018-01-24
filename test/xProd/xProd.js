const xProd = (a, b) => a.reduce((acc,x) => acc.concat(b.map(y => [x, y])),[]);
module.exports = xProd