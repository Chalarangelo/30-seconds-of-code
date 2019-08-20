'use strict';


var ParserStream = require('../common').ParserStream;
var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;


var SIG_1 = str2arr('II\x2A\0');
var SIG_2 = str2arr('MM\0\x2A');


function readUInt16(buffer, offset, is_big_endian) {
  return is_big_endian ? buffer.readUInt16BE(offset) : buffer.readUInt16LE(offset);
}

function readUInt32(buffer, offset, is_big_endian) {
  return is_big_endian ? buffer.readUInt32BE(offset) : buffer.readUInt32LE(offset);
}

function readIFDValue(data, data_offset, is_big_endian) {
  var type       = readUInt16(data, data_offset + 2, is_big_endian);
  var values     = readUInt32(data, data_offset + 4, is_big_endian);

  if (values !== 1 || (type !== 3 && type !== 4)) {
    return null;
  }

  if (type === 3) {
    return readUInt16(data, data_offset + 8, is_big_endian);
  }

  return readUInt32(data, data_offset + 8, is_big_endian);
}

module.exports = function () {
  var parser = new ParserStream();

  // read header
  parser._bytes(8, function (data) {
    // check TIFF signature
    if (!sliceEq(data, 0, SIG_1) && !sliceEq(data, 0, SIG_2)) {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    var is_big_endian = (data[0] === 77 /* 'MM' */);
    var count = readUInt32(data, 4, is_big_endian) - 8;

    if (count < 0) {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    function safeSkip(parser, count, callback) {
      if (count === 0) { // parser._skipBytes throws error if count === 0
        callback();
        return;
      }

      parser._skipBytes(count, callback);
    }

    // skip until IFD
    safeSkip(parser, count, function () {
      // read number of IFD entries
      parser._bytes(2, function (data) {
        var ifd_size = readUInt16(data, 0, is_big_endian) * 12;

        if (ifd_size <= 0) {
          parser._skipBytes(Infinity);
          parser.push(null);
          return;
        }

        // read all IFD entries
        parser._bytes(ifd_size, function (data) {
          parser._skipBytes(Infinity);

          var i, width, height, tag;

          for (i = 0; i < ifd_size; i += 12) {
            tag = readUInt16(data, i, is_big_endian);

            if (tag === 256) {
              width = readIFDValue(data, i, is_big_endian);
            } else if (tag === 257) {
              height = readIFDValue(data, i, is_big_endian);
            }
          }

          if (width && height) {
            parser.push({
              width:  width,
              height: height,
              type:   'tiff',
              mime:   'image/tiff',
              wUnits: 'px',
              hUnits: 'px'
            });
          }

          parser.push(null);
        });
      });
    });
  });

  return parser;
};
