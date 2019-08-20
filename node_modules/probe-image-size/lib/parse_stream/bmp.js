'use strict';


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;


var SIG_BM = str2arr('BM');


module.exports = function () {
  var parser = new ParserStream();

  parser._bytes(26, function (data) {
    parser._skipBytes(Infinity);

    if (!sliceEq(data, 0, SIG_BM)) {
      parser.push(null);
      return;
    }

    parser.push({
      width:  data.readUInt16LE(18),
      height: data.readUInt16LE(22),
      type: 'bmp',
      mime: 'image/bmp',
      wUnits: 'px',
      hUnits: 'px'
    });

    parser.push(null);
  });

  return parser;
};
