const btoa = str => Buffer.from(str, 'binary').toString('base64');
module.exports = btoa;
