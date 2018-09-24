const indentString = (str, count, indent = ' ') =>
  str.replace(/^/mg, indent.repeat(count));
module.exports = indentString;
