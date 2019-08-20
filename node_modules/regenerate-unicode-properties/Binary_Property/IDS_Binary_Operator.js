const set = require('regenerate')();
set.addRange(0x2FF0, 0x2FF1).addRange(0x2FF4, 0x2FFB);
module.exports = set;
