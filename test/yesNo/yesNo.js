const yesNo = (val, def = false) =>
/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;
module.exports = yesNo