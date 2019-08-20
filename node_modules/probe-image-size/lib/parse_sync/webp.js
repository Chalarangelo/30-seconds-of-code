'use strict';

/* eslint-disable no-bitwise */
/* eslint-disable consistent-return */

var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;
var readUInt16LE = require('../common').readUInt16LE;
var readUInt32LE = require('../common').readUInt32LE;


var SIG_RIFF    = str2arr('RIFF');
var SIG_WEBPVP8 = str2arr('WEBPVP8');


function parseVP8(data) {
  if (data.length < 16 + 14) return;

  if (data[16 + 7] !== 0x9D || data[16 + 8] !== 0x01 || data[16 + 9] !== 0x2A) {
    // bad code block signature
    return;
  }

  return {
    width:  readUInt16LE(data, 16 + 10) & 0x3FFF,
    height: readUInt16LE(data, 16 + 12) & 0x3FFF,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}


function parseVP8L(data) {
  if (data.length < 16 + 9) return;

  if (data[16 + 4] !== 0x2F) return;

  var bits = readUInt32LE(data, 16 + 5);

  return {
    width:  (bits & 0x3FFF) + 1,
    height: ((bits >> 14) & 0x3FFF) + 1,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}


function parseVP8X(data) {
  if (data.length < 16 + 14) return;

  return  {
    // TODO: replace with `data.readUIntLE(8, 3) + 1`
    //       when 0.10 support is dropped
    width:  ((data[16 + 10] << 16) | (data[16 + 9] << 8) | data[16 + 8]) + 1,
    height: ((data[16 + 13] << 16) | (data[16 + 12] << 8) | data[16 + 11]) + 1,
    type:   'webp',
    mime:   'image/webp',
    wUnits: 'px',
    hUnits: 'px'
  };
}


module.exports = function (data) {
  if (data.length < 16) return;

  // check /^RIFF....WEBPVP8([ LX])$/ signature
  if (sliceEq(data, 0, SIG_RIFF) && sliceEq(data, 8, SIG_WEBPVP8)) {
    switch (data[15]) {
      case 32/*' '*/: return parseVP8(data);
      case 76/* L */: return parseVP8L(data);
      case 88/* X */: return parseVP8X(data);
    }
  }
};
