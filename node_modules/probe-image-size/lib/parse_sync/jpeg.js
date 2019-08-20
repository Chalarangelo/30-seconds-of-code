'use strict';

/* eslint-disable consistent-return */

var readUInt16BE = require('../common').readUInt16BE;


module.exports = function (data) {
  if (data.length < 2) return;

  // first marker of the file MUST be 0xFFD8
  if (data[0] !== 0xFF || data[1] !== 0xD8) return;

  var offset = 2;

  for (;;) {
    if (data.length - offset < 2) return;
    // not a JPEG marker
    if (data[offset++] !== 0xFF) return;

    var code = data[offset++];
    var length;

    // skip padding bytes
    while (code === 0xFF) code = data[offset++];

    // standalone markers, according to JPEG 1992,
    // http://www.w3.org/Graphics/JPEG/itu-t81.pdf, see Table B.1
    if ((0xD0 <= code && code <= 0xD9) || code === 0x01) {
      length = 0;
    } else if (0xC0 <= code && code <= 0xFE) {
      // the rest of the unreserved markers
      if (data.length - offset < 2) return;

      length = readUInt16BE(data, offset) - 2;
      offset += 2;
    } else {
      // unknown markers
      return;
    }

    if (code === 0xD9 /* EOI */ || code === 0xDA /* SOS */) {
      // end of the datastream
      return;
    }

    if (length >= 5 &&
        (0xC0 <= code && code <= 0xCF) &&
        code !== 0xC4 && code !== 0xC8 && code !== 0xCC) {

      if (data.length - offset < length) return;

      return {
        width:  readUInt16BE(data, offset + 3),
        height: readUInt16BE(data, offset + 1),
        type:   'jpg',
        mime:   'image/jpeg',
        wUnits: 'px',
        hUnits: 'px'
      };
    }

    offset += length;
  }
};
