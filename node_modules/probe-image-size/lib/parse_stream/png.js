'use strict';


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;


var SIG_PNG  = str2arr('\x89PNG\r\n\x1a\n');
var SIG_IHDR = str2arr('IHDR');


module.exports = function () {
  var parser = new ParserStream();

  parser._bytes(24, function (data) {
    parser._skipBytes(Infinity);

    // check PNG signature
    if (!sliceEq(data, 0, SIG_PNG)) {
      parser.push(null);
      return;
    }

    // check that first chunk is IHDR
    if (!sliceEq(data, 12, SIG_IHDR)) {
      parser.push(null);
      return;
    }

    parser.push({
      width:  data.readUInt32BE(16),
      height: data.readUInt32BE(20),
      type: 'png',
      mime: 'image/png',
      wUnits: 'px',
      hUnits: 'px'
    });

    parser.push(null);
  });

  return parser;
};
