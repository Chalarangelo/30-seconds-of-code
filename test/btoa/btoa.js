const btoa = str => new Buffer.from(str, 'binary').toString('base64');
module.exports = btoa;
