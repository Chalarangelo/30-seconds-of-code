'use strict';

/* eslint-disable consistent-return */

var str2arr = require('../common').str2arr;
var sliceEq = require('../common').sliceEq;
var readUInt16LE = require('../common').readUInt16LE;
var readUInt16BE = require('../common').readUInt16BE;
var readUInt32LE = require('../common').readUInt32LE;
var readUInt32BE = require('../common').readUInt32BE;


var SIG_1 = str2arr('II\x2A\0');
var SIG_2 = str2arr('MM\0\x2A');


function readUInt16(buffer, offset, is_big_endian) {
  return is_big_endian ? readUInt16BE(buffer, offset) : readUInt16LE(buffer, offset);
}

function readUInt32(buffer, offset, is_big_endian) {
  return is_big_endian ? readUInt32BE(buffer, offset) : readUInt32LE(buffer, offset);
}

function readIFDValue(data, data_offset, is_big_endian) {
  var type       = readUInt16(data, data_offset + 2, is_big_endian);
  var values     = readUInt32(data, data_offset + 4, is_big_endian);

  if (values !== 1 || (type !== 3 && type !== 4)) return null;

  if (type === 3) {
    return readUInt16(data, data_offset + 8, is_big_endian);
  }

  return readUInt32(data, data_offset + 8, is_big_endian);
}

module.exports = function (data) {
  if (data.length < 8) return;

  // check TIFF signature
  if (!sliceEq(data, 0, SIG_1) && !sliceEq(data, 0, SIG_2)) return;

  var is_big_endian = (data[0] === 77 /* 'MM' */);
  var count = readUInt32(data, 4, is_big_endian) - 8;

  if (count < 0) return;

  // skip until IFD
  var offset = count + 8;

  if (data.length - offset < 2) return;

  // read number of IFD entries
  var ifd_size = readUInt16(data, offset + 0, is_big_endian) * 12;

  if (ifd_size <= 0) return;

  offset += 2;

  // read all IFD entries
  if (data.length - offset < ifd_size) return;

  var i, width, height, tag;

  for (i = 0; i < ifd_size; i += 12) {
    tag = readUInt16(data, offset + i, is_big_endian);

    if (tag === 256) {
      width = readIFDValue(data, offset + i, is_big_endian);
    } else if (tag === 257) {
      height = readIFDValue(data, offset + i, is_big_endian);
    }
  }

  if (width && height) {
    return {
      width:  width,
      height: height,
      type:   'tiff',
      mime:   'image/tiff',
      wUnits: 'px',
      hUnits: 'px'
    };
  }
};
