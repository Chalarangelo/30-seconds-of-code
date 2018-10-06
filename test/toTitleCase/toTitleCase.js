const toTitleCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x[0].toUpperCase() + x.slice(1).toLowerCase())
    .join(' ');
module.exports = toTitleCase;
