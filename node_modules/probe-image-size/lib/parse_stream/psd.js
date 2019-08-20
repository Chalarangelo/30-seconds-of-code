'use strict';


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;


var SIG_8BPS  = str2arr('8BPS\x00\x01');


module.exports = function () {
  var parser = new ParserStream();

  parser._bytes(6, function (data) {
    // signature + version
    if (!sliceEq(data, 0, SIG_8BPS)) {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    parser._bytes(16, function (data) {
      parser._skipBytes(Infinity);

      parser.push({
        width:  data.readUInt32BE(12),
        height: data.readUInt32BE(8),
        type: 'psd',
        mime: 'image/vnd.adobe.photoshop',
        wUnits: 'px',
        hUnits: 'px'
      });

      parser.push(null);
    });
  });

  return parser;
};
