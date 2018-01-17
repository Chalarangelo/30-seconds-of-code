const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
 module.exports = cloneRegExp