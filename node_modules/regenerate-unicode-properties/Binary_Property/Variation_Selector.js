const set = require('regenerate')();
set.addRange(0x180B, 0x180D).addRange(0xFE00, 0xFE0F).addRange(0xE0100, 0xE01EF);
module.exports = set;
