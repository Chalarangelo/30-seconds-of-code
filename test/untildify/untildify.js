const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);
module.exports = untildify;