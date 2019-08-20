'use strict';

/* eslint-disable consistent-return */

var str2arr      = require('../common').str2arr;
var sliceEq      = require('../common').sliceEq;
var readUInt16LE = require('../common').readUInt16LE;


var SIG_GIF87a = str2arr('GIF87a');
var SIG_GIF89a = str2arr('GIF89a');


module.exports = function (data) {
  if (data.length < 10) return;

  if (!sliceEq(data, 0, SIG_GIF87a) && !sliceEq(data, 0, SIG_GIF89a)) return;

  return {
    width:  readUInt16LE(data, 6),
    height: readUInt16LE(data, 8),
    type: 'gif',
    mime: 'image/gif',
    wUnits: 'px',
    hUnits: 'px'
  };
};
