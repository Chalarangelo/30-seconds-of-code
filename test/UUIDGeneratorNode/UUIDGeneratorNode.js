const crypto = require('crypto');
const UUIDGeneratorNode = () =>
([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
);
module.exports = UUIDGeneratorNode