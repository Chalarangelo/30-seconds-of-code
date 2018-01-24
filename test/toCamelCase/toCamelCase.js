const toCamelCase = str => {
let s =
str &&
str
.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
.map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
.join('');
return s.slice(0, 1).toLowerCase() + s.slice(1);
};
module.exports = toCamelCase