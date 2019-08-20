'use strict';

const lengthArray = [
  'PX',
  'IN',
  'CM',
  'MM',
  'EM',
  'REM',
  'POINTS',
  'PC',
  'EX',
  'CH',
  'VW',
  'VH',
  'VMIN',
  'VMAX',
  '%',
];

function isCSSLengthUnit(unit) {
  return lengthArray.indexOf(unit.toUpperCase()) >= 0;
}

module.exports = isCSSLengthUnit;
