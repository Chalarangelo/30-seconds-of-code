module.exports = decapitalize = ([first, ...rest], upperRest = false) =>
first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));