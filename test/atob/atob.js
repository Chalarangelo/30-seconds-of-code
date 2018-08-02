const atob = str => new Buffer(str, 'base64').toString('binary');
module.exports = atob;
