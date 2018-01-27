const btoa = str => new Buffer(str, 'binary').toString('base64');
module.exports = btoa