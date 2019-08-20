'use strict';

/* eslint-disable consistent-return */

var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;
var readUInt16LE = require('../common').readUInt16LE;

var SIG_BM = str2arr('BM');


module.exports = function (data) {
  if (data.length < 26) return;

  if (!sliceEq(data, 0, SIG_BM)) return;

  return {
    width:  readUInt16LE(data, 18),
    height: readUInt16LE(data, 22),
    type: 'bmp',
    mime: 'image/bmp',
    wUnits: 'px',
    hUnits: 'px'
  };
};
