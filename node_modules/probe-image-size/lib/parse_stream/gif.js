'use strict';


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;


var SIG_GIF87a = str2arr('GIF87a');
var SIG_GIF89a = str2arr('GIF89a');


module.exports = function () {
  var parser = new ParserStream();

  parser._bytes(10, function (data) {
    parser._skipBytes(Infinity);

    if (!sliceEq(data, 0, SIG_GIF87a) && !sliceEq(data, 0, SIG_GIF89a)) {
      parser.push(null);
      return;
    }

    parser.push({
      width:  data.readUInt16LE(6),
      height: data.readUInt16LE(8),
      type: 'gif',
      mime: 'image/gif',
      wUnits: 'px',
      hUnits: 'px'
    });

    parser.push(null);
  });

  return parser;
};
