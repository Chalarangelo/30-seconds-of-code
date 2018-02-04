const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);
module.exports = isAbsoluteURL;