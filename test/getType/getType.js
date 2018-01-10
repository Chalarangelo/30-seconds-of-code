module.exports = getType = v =>
v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();