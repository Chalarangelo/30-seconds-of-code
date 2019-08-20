'use strict';

var iconv_package;
var Iconv;

try {
    // this is to fool browserify so it doesn't try (in vain) to install iconv.
    iconv_package = 'iconv';
    Iconv = require(iconv_package).Iconv;
} catch (E) {
    // node-iconv not present
}

module.exports = Iconv;
