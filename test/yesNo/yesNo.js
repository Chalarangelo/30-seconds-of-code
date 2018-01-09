module.exports = (val, def = false) =>
/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;