const indentString = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count));
module.exports = indentString;
