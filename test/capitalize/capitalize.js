module.exports = ([first, ...rest], lowerRest = false) =>
first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));