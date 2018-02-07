const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
module.exports = escapeRegExp;