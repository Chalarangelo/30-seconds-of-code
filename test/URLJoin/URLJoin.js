const URLJoin = (...args) =>
args
.join('/')
.replace(/[\/]+/g, '/')
.replace(/^(.+):\
.replace(/^file:/, 'file:/')
.replace(/\/(\?|&|#[^!])/g, '$1')
.replace(/\?/g, '&')
.replace('&', '?');
module.exports = URLJoin;