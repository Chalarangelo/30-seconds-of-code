const hasFlags = (...flags) =>
flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));
 module.exports = hasFlags