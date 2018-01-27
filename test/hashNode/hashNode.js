const crypto = require('crypto');
const hashNode = val =>
new Promise(resolve =>
setTimeout(
() =>
resolve(
crypto
.createHash('sha256')
.update(val)
.digest('hex')
),
0
)
);
module.exports = hashNode