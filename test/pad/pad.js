const pad = (string, length = 8, char = ' ') =>
  string.padStart((string.length + length) / 2, char).padEnd(length, char);
module.exports = pad;
