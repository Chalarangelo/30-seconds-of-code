const atob = str => Buffer.from(str, 'base64').toString('binary');
module.exports = atob;
