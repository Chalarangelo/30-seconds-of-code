const isSimilar = (pattern, str) =>
  [...str].reduce(
    (matchIndex, char) =>
      char.toLowerCase() === (pattern[matchIndex] || '').toLowerCase()
        ? matchIndex + 1
        : matchIndex,
    0
  ) === pattern.length
    ? true
    : false;
module.exports = isSimilar;
