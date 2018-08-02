const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

module.exports = mapString;