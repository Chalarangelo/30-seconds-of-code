'use strict';


var ParserStream = require('../common').ParserStream;


// part of parseJpegMarker called after skipping initial FF
function parseJpegMarker_afterFF(parser, callback) {
  parser._bytes(1, function (data) {
    var code = data[0];

    if (code === 0xFF) {
      // padding byte, skip it
      parseJpegMarker_afterFF(parser, callback);
      return;
    }

    // standalone markers, according to JPEG 1992,
    // http://www.w3.org/Graphics/JPEG/itu-t81.pdf, see Table B.1
    if ((0xD0 <= code && code <= 0xD9) || code === 0x01) {
      callback(code, 0);
      return;
    }

    // the rest of the unreserved markers
    if (0xC0 <= code && code <= 0xFE) {
      parser._bytes(2, function (length) {
        callback(code, length.readUInt16BE(0) - 2);
      });
      return;
    }

    // unknown markers
    callback();
  });
}


function parseJpegMarker(parser, callback) {
  parser._bytes(1, function (data) {
    if (data[0] !== 0xFF) {
      // not a JPEG marker
      callback();
      return;
    }

    parseJpegMarker_afterFF(parser, callback);
  });
}


function getJpegSize(parser) {
  parseJpegMarker(parser, function (code, length) {
    if (!code || length < 0) {
      // invalid jpeg
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    if (code === 0xD9 /* EOI */ || code === 0xDA /* SOS */) {
      // end of the datastream
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    if (length <= 0) {
      // e.g. empty comment
      getJpegSize(parser);
      return;
    }

    if (length >= 5 &&
        (0xC0 <= code && code <= 0xCF) &&
        code !== 0xC4 && code !== 0xC8 && code !== 0xCC) {

      parser._bytes(length, function (data) {
        parser._skipBytes(Infinity);

        parser.push({
          width:  data.readUInt16BE(3),
          height: data.readUInt16BE(1),
          type: 'jpg',
          mime: 'image/jpeg',
          wUnits: 'px',
          hUnits: 'px'
        });

        parser.push(null);
      });
      return;
    }

    parser._skipBytes(length, function () {
      getJpegSize(parser);
    });
  });
}


module.exports = function () {
  var parser   = new ParserStream();

  parser._bytes(2, function (data) {
    if (data[0] !== 0xFF || data[1] !== 0xD8) {
      // first marker of the file MUST be 0xFFD8
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    getJpegSize(parser);
  });

  return parser;
};
