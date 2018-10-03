const multiSplit = (str, arr = [ " " ]) => str.split(new RegExp(`[${arr.join("")}]`));
module.exports = multiSplit;
